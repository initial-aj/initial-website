import { NextResponse } from 'next/server';

// Rate limiting state (in-memory for now)
const rateLimits = {
  newsdata: {
    lastRequest: 0,
    requestCount: 0,
    dailyLimit: 200,
    lastResetDate: new Date().toDateString(),
  },
  cryptopanic: {
    lastRequest: 0,
    requestCount: 0,
    monthlyLimit: 100,
    lastResetDate: new Date().toISOString().slice(0, 7), // YYYY-MM
  },
};

// Reset counters if needed
function checkAndResetLimits() {
  const today = new Date().toDateString();
  const currentMonth = new Date().toISOString().slice(0, 7);

  if (rateLimits.newsdata.lastResetDate !== today) {
    rateLimits.newsdata.requestCount = 0;
    rateLimits.newsdata.lastResetDate = today;
  }

  if (rateLimits.cryptopanic.lastResetDate !== currentMonth) {
    rateLimits.cryptopanic.requestCount = 0;
    rateLimits.cryptopanic.lastResetDate = currentMonth;
  }
}

// Fetch from NewsData.io
async function fetchNewsDataArticles(query: string, limit: number = 10) {
  checkAndResetLimits();

  // Check daily limit
  if (rateLimits.newsdata.requestCount >= rateLimits.newsdata.dailyLimit) {
    console.log('NewsData daily limit reached');
    return [];
  }

  try {
    const apiKey = 'pub_f5022e23ece64ef9848721e115342e26';

    // Simplify complex OR queries to avoid 422 error
    // NewsData.io free tier doesn't support complex boolean queries
    let searchQuery = query;
    if (query.includes(' OR ')) {
      // Extract first company name from "Company1 OR Company2 OR Company3"
      searchQuery = query.split(' OR ')[0].trim();
      console.log('[NewsData] Simplified complex query to:', searchQuery);
    }

    // Limit query length to avoid 422 error
    if (searchQuery.length > 50) {
      searchQuery = 'crypto blockchain';
      console.log('[NewsData] Query too long, using fallback:', searchQuery);
    }

    const url = `https://newsdata.io/api/1/latest?apikey=${apiKey}&q=${encodeURIComponent(searchQuery)}&language=en&category=technology`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('NewsData API error:', response.status, errorText);
      return [];
    }

    const data = await response.json();

    // Check for API error response
    if (data.status === 'error') {
      console.error('NewsData API error:', data.results?.message || 'Unknown error');
      return [];
    }
    rateLimits.newsdata.requestCount++;
    rateLimits.newsdata.lastRequest = Date.now();

    // Transform to our format
    const articles = (data.results || []).slice(0, limit).map((article: any, index: number) => ({
      id: `newsdata-${index}-${Date.now()}`,
      title: article.title || 'Untitled',
      summary: article.description || article.content || 'No description available',
      url: article.link || '#',
      source: article.source_id || 'NewsData',
      company: query,
      date: article.pubDate || new Date().toISOString(),
      category: 'News',
      apiSource: 'newsdata',
    }));

    return articles;
  } catch (error) {
    console.error('Error fetching from NewsData:', error);
    return [];
  }
}

// Fetch from CryptoPanic
async function fetchCryptoPanicArticles(currencies: string, limit: number = 20) {
  checkAndResetLimits();

  // Check monthly limit
  if (rateLimits.cryptopanic.requestCount >= rateLimits.cryptopanic.monthlyLimit) {
    console.log('CryptoPanic monthly limit reached');
    return [];
  }

  // Check rate limit (2 requests per second)
  const now = Date.now();
  const timeSinceLastRequest = now - rateLimits.cryptopanic.lastRequest;
  if (timeSinceLastRequest < 500) {
    // Wait to avoid rate limit
    await new Promise(resolve => setTimeout(resolve, 500 - timeSinceLastRequest));
  }

  try {
    const authToken = 'd887d60dc3910442d91d2117776e0e7d12d66145';
    const url = `https://cryptopanic.com/api/developer/v2/posts/?auth_token=${authToken}&public=true&currencies=${encodeURIComponent(currencies)}&kind=news`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      console.error('CryptoPanic API error:', response.status);
      return [];
    }

    const data = await response.json();
    rateLimits.cryptopanic.requestCount++;
    rateLimits.cryptopanic.lastRequest = Date.now();

    // Transform to our format
    const articles = (data.results || []).slice(0, limit).map((post: any, index: number) => ({
      id: `cryptopanic-${post.id || index}`,
      title: post.title || 'Untitled',
      summary: post.title || 'No description available', // CryptoPanic doesn't provide descriptions
      url: post.url || '#',
      source: post.source?.title || 'CryptoPanic',
      company: currencies,
      date: post.published_at || new Date().toISOString(),
      category: post.kind || 'News',
      apiSource: 'cryptopanic',
      votes: post.votes || {},
    }));

    return articles;
  } catch (error) {
    console.error('Error fetching from CryptoPanic:', error);
    return [];
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const company = searchParams.get('company') || 'crypto';
    const currency = searchParams.get('currency') || 'BTC,ETH,SOL';
    const limit = parseInt(searchParams.get('limit') || '10');

    // Fetch from both sources
    const [newsdataArticles, cryptoPanicArticles] = await Promise.all([
      fetchNewsDataArticles(company, Math.min(limit, 10)),
      fetchCryptoPanicArticles(currency, Math.min(limit, 20)),
    ]);

    // Combine and sort by date
    const allArticles = [...newsdataArticles, ...cryptoPanicArticles]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, limit);

    return NextResponse.json({
      success: true,
      count: allArticles.length,
      articles: allArticles,
      rateLimits: {
        newsdata: {
          used: rateLimits.newsdata.requestCount,
          limit: rateLimits.newsdata.dailyLimit,
        },
        cryptopanic: {
          used: rateLimits.cryptopanic.requestCount,
          limit: rateLimits.cryptopanic.monthlyLimit,
        },
      },
    });
  } catch (error) {
    console.error('Error in news API:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch news' },
      { status: 500 }
    );
  }
}
