'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Menu,
  X,
  Search,
  ExternalLink,
  Calendar,
  Building2,
  TrendingUp,
  Twitter,
  Linkedin
} from 'lucide-react';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import SearchModal from '@/components/SearchModal';

// Research paper type definition
interface ResearchPaper {
  id: number;
  title: string;
  source: string;
  author: string;
  publishDate: string;
  category: string;
  summary: string;
  url: string;
  imageUrl?: string;
}

// Research papers from top crypto firms - 2026 published articles
const researchPapers: ResearchPaper[] = [
  {
    id: 1,
    title: "The Crypto Theses 2026",
    source: "Messari",
    author: "Ryan Selkis",
    publishDate: "2026-01-20",
    category: "Market Analysis",
    summary: "Messari's flagship annual report analyzing seven core sectors: Cryptomoney, TradFi, Chains, DeFi, AI, DePIN, and Consumer Apps. Emphasizes a shift from speculation to systemic integration, with deep analysis of institutional adoption trends, regulatory clarity, and the path to mainstream crypto adoption in 2026 and beyond.",
    url: "https://messari.io/report/the-crypto-theses-2026",
  },
  {
    id: 2,
    title: "2026 Digital Asset Outlook: Dawn of the Institutional Era",
    source: "Grayscale",
    author: "Grayscale Research Team",
    publishDate: "2026-01-18",
    category: "Institutional Research",
    summary: "Grayscale positions 2026 as the dawn of crypto's institutional era, with structural shifts driven by regulatory clarity and macro demand for alternative stores of value. Features Top 10 crypto investing themes including dollar debasement risk, stablecoin expansion following the GENIUS Act, privacy infrastructure, DeFi growth, and asset tokenization reaching critical inflection points.",
    url: "https://research.grayscale.com/reports/2026-digital-asset-outlook-dawn-of-the-institutional-era",
  },
  {
    id: 3,
    title: "2026 Crypto Market Outlook",
    source: "Coinbase Institutional",
    author: "Coinbase Research Team",
    publishDate: "2026-01-15",
    category: "Market Analysis",
    summary: "Coinbase positions 2026 as a transformative year for crypto markets, driven by clearer regulation and accelerating institutional integration. The report compares the 2026 setup to '1996' rather than '1999', suggesting constructive growth without bubble conditions. Covers stablecoin market projections to $1.2T by 2028, DAT 2.0 models, and prediction market expansion.",
    url: "https://www.coinbase.com/institutional/research-insights/research/market-intelligence/2026-crypto-market-outlook",
  },
  {
    id: 4,
    title: "Big Ideas 2026: Part 3",
    source: "a16z Crypto",
    author: "a16z Research Team",
    publishDate: "2026-01-12",
    category: "Innovation",
    summary: "The third installment of a16z's Big Ideas 2026 series, featuring 17 key predictions covering AI agents, stablecoins, tokenization, privacy, security, prediction markets, and SNARKs. Argues that privacy features will create stronger competitive advantages than performance improvements, with zkVM provers hitting 10,000X overhead enabling verifiable cloud computing.",
    url: "https://a16z.com/newsletter/big-ideas-2026-part-3/",
  },
  {
    id: 5,
    title: "3 Ways Crypto Goes Beyond Crypto in 2026",
    source: "a16z Crypto",
    author: "a16z Crypto Team",
    publishDate: "2026-01-10",
    category: "Innovation",
    summary: "Explores how cryptocurrency technology is expanding beyond traditional crypto use cases in 2026. Examines the integration of blockchain into mainstream industries, real-world applications gaining traction, and how crypto infrastructure is becoming the backbone for innovation in fintech, identity, and data ownership.",
    url: "https://a16zcrypto.com/posts/article/trends-crypto-in-other-industries/",
  },
  {
    id: 6,
    title: "State of Crypto #16: Market Outlook 2026",
    source: "21Shares",
    author: "21Shares Research Team",
    publishDate: "2026-01-08",
    category: "Market Analysis",
    summary: "21Shares' comprehensive 2026 outlook featuring ten bold predictions, exploring themes including institutional capital driving a new onchain era, Bitcoin's maturation as a macro asset, DeFi's rise through improved UX, tokenization's structural breakout, stablecoins surpassing $1T, and the emergence of agentic finance with AI automating capital allocation. Projects crypto ETPs to reach $400B by end of 2026.",
    url: "https://www.21shares.com/en-us/research/state-of-crypto-16-market-outlook-2026",
  },
  {
    id: 7,
    title: "Navigating Crypto in 2026",
    source: "Pantera Capital",
    author: "Pantera Capital Team",
    publishDate: "2026-01-05",
    category: "Market Analysis",
    summary: "Pantera Capital's strategic outlook identifying major catalysts for crypto success in 2026, including institutional adoption acceleration with examples like Robinhood's tokenized equities and JPMorgan initiatives, Real-World Assets expected to double, and 2026 positioned as a landmark year for crypto IPOs. Discusses how major fintechs like Stripe, Ramp, and Brex will increasingly rely on stablecoins for cross-border payments.",
    url: "https://panteracapital.com/blockchain-letter/navigating-crypto-in-2026/",
  },
  {
    id: 8,
    title: "The Year Ahead for Markets 2026",
    source: "Delphi Digital",
    author: "Delphi Digital Research",
    publishDate: "2025-12-28",
    category: "Markets & Trading",
    summary: "Delphi Digital's comprehensive market outlook for 2026, analyzing the critical inflection point after two years of liquidity withdrawal and elevated policy rates. Covers macro liquidity pivots, the shift to Consumer Apps and the Global Money Layer, and predicts that perp DEXs will continue taking market share from TradFi. Notes the era of mass alt seasons is likely over due to increased competition and large token unlocks.",
    url: "https://members.delphidigital.io/reports/the-year-ahead-for-markets-2026",
  },
  {
    id: 9,
    title: "The Year Ahead for Apps 2026",
    source: "Delphi Digital",
    author: "Delphi Digital Research",
    publishDate: "2025-12-26",
    category: "Consumer Apps",
    summary: "Explores how crypto is closer than ever to a breakout consumer application in 2026. Analyzes the applications poised to onboard the masses, discussing improvements in user experience, wallet abstractions, and how Consumer Apps are becoming the new frontier for mainstream crypto adoption with better product-market fit.",
    url: "https://members.delphidigital.io/reports/the-year-ahead-for-apps-2026",
  },
  {
    id: 10,
    title: "Crypto Sectors Quarterly: A Preference for Privacy",
    source: "Grayscale",
    author: "Grayscale Research Team",
    publishDate: "2025-12-20",
    category: "Privacy & Security",
    summary: "Quarterly analysis examining the growing importance of privacy in crypto markets. Discusses how privacy infrastructure is becoming essential, with zero-knowledge proofs, confidential transactions, and privacy-preserving technologies gaining adoption. Explores the balance between regulatory compliance and user privacy in the evolving crypto landscape.",
    url: "https://research.grayscale.com/market-commentary/crypto-sectors-quarterly-a-preference-for-privacy",
  },
  {
    id: 11,
    title: "Bitcoin Long-Term Capital Market Assumptions",
    source: "VanEck",
    author: "Matthew Sigel",
    publishDate: "2025-12-15",
    category: "Bitcoin Research",
    summary: "VanEck's head of digital assets research provides long-term capital market assumptions for Bitcoin. Describes 2026 as a consolidation year rather than dramatic regime shift, with Bitcoin's four-year cycle remaining intact. Analyzes Bitcoin miners pivoting to AI/HPC, scaling from 7 GW to 20 GW by 2027, with 20-30% repurposed to AI workloads. Notes Bitcoin's Relative Unrealized Profit suggests mid-cycle positioning.",
    url: "https://www.vaneck.com/us/en/blogs/digital-assets/matthew-sigel-vaneck-bitcoin-long-term-capital-market-assumptions/",
  },
  {
    id: 12,
    title: "Messari Crypto Venture Weekly: January 12-16, 2026",
    source: "Messari",
    author: "Messari Research",
    publishDate: "2026-01-16",
    category: "Venture & Funding",
    summary: "Weekly analysis of crypto venture funding activity, covering recent fundraising rounds, acquisitions, and investment trends from January 12-16, 2026. Provides insights into where capital is flowing in the crypto ecosystem, notable deals, and emerging sectors attracting venture attention.",
    url: "https://messari.io/report/crypto-venture-weekly-january-12-16-2026",
  },
  {
    id: 13,
    title: "Messari Crypto Venture Weekly: January 5-9, 2026",
    source: "Messari",
    author: "Messari Research",
    publishDate: "2026-01-09",
    category: "Venture & Funding",
    summary: "Weekly digest covering crypto venture activity from the first week of 2026, analyzing funding announcements, strategic acquisitions, and investment patterns. Tracks how institutional capital and VC funding are positioning for 2026 opportunities across infrastructure, DeFi, and consumer applications.",
    url: "https://messari.io/report/crypto-venture-weekly-january-5-9-2026",
  },
  {
    id: 14,
    title: "Big Ideas 2026: Bitcoin and Tokenization",
    source: "ARK Invest",
    author: "Cathie Wood & ARK Research Team",
    publishDate: "2025-12-28",
    category: "Innovation",
    summary: "ARK Invest's 2026 strategy targeting a $28T digital asset market by 2030 through Bitcoin institutionalization and tokenized assets expanding from $22B to $11T. Forecasts Bitcoin market cap reaching $16 trillion by 2030 ($761,900 per BTC), driven by digital gold narrative and institutional adoption. Notes U.S. ETFs and public companies now hold 12% of total Bitcoin supply, with $50B+ in spot ETF inflows.",
    url: "https://www.ark-invest.com/strategy/cryptocurrency",
  },
  {
    id: 15,
    title: "Galaxy Digital: 5 Crypto Predictions for 2026",
    source: "Galaxy Digital",
    author: "Alex Thorn",
    publishDate: "2025-12-21",
    category: "Market Analysis",
    summary: "Galaxy Digital's head of research provides five impactful predictions despite calling 2026 'too chaotic to predict'. Forecasts decentralized exchanges capturing 25%+ of spot trading volume, crypto-backed loans exceeding $90B, $500M+ in DAO treasuries governed by futarchy, leading wealth platforms adding 1-2% Bitcoin allocations, and Bitcoin reaching $250,000 by end of 2027. Options markets price equal odds of BTC hitting $70K or $130K by mid-2026.",
    url: "https://www.coindesk.com/markets/2025/12/21/galaxy-digital-s-head-of-research-explains-why-bitcoin-s-outlook-is-so-uncertain-in-2026",
  }
];

export default function InsightsPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [news, setNews] = useState<any[]>([]);
  const [isLoadingNews, setIsLoadingNews] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fetch live news
  useEffect(() => {
    const fetchNews = async () => {
      setIsLoadingNews(true);
      try {
        const response = await fetch('/api/news?company=crypto blockchain web3 defi bitcoin ethereum solana&currency=BTC,ETH,SOL&limit=20');
        const data = await response.json();

        if (data.success && data.articles.length > 0) {
          setNews(data.articles);
        }
      } catch (error) {
        console.error('Error fetching news:', error);
      } finally {
        setIsLoadingNews(false);
      }
    };

    fetchNews();
  }, []);

  const categories = ['All', 'Market Analysis', 'Innovation', 'Institutional Research', 'Markets & Trading', 'Consumer Apps', 'Privacy & Security', 'Bitcoin Research', 'Venture & Funding'];

  const filteredPapers = selectedCategory === 'All'
    ? researchPapers
    : researchPapers.filter(paper => paper.category === selectedCategory);

  return (
    <>
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      <main className="min-h-screen bg-[#FBFBFB] text-slate-900 font-sans" style={{ fontFamily: 'Inter, sans-serif' }}>

        {/* NAVIGATION BAR */}
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'}`}>
          <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">

            {/* Logo & Text */}
            <Link href="/" className="flex items-center gap-4 group">
               <div className="relative w-12 h-12 rounded-lg overflow-hidden shadow-sm">
                  <Image src="/logo.png" alt="Logo" fill className="object-cover" />
               </div>
               <h2 className="text-xl font-bold uppercase tracking-[0.2em] text-slate-900 group-hover:opacity-80 transition-opacity font-sans">
                 Initial Ventures
               </h2>
            </Link>

            {/* Desktop Links */}
            <div className="hidden md:flex items-center gap-8 font-medium text-sm text-slate-600 font-sans">
              <Link href="/" className="hover:text-slate-900 transition-colors">About</Link>
              <Link href="/portfolio" className="hover:text-slate-900 transition-colors">Portfolio</Link>
              <Link href="/insights" className="text-slate-900 font-bold transition-colors">Insights</Link>
              <Link href="/jobs" className="hover:text-slate-900 transition-colors">Jobs</Link>
              <Link href="/connect" className="hover:text-slate-900 transition-colors">Connect</Link>
            </div>

            <div className="flex items-center gap-4">
               <div className="hidden md:flex gap-2">
                  <LanguageSwitcher />
               </div>

               <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 text-slate-600 hover:text-slate-900 transition-colors"
               >
                  <Search className="w-5 h-5" />
              </button>

              <button
                  onClick={() => setIsSidebarOpen(true)}
                  className="p-2 hover:bg-slate-100 rounded-md transition-colors border border-slate-200"
              >
                  <Menu className="w-6 h-6 text-slate-900" />
              </button>
            </div>
          </div>
        </nav>

        {/* SIDEBAR NAVIGATION */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-[60] transition-opacity duration-300"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        <div className={`fixed top-0 right-0 h-full w-full sm:w-[400px] bg-white z-[70] shadow-2xl transform transition-transform duration-300 ease-in-out overflow-y-auto ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="p-8 font-sans">
              <div className="flex justify-between items-start mb-12">
                   <Link href="/" onClick={() => setIsSidebarOpen(false)} className="flex flex-col cursor-pointer hover:opacity-80">
                      <span className="text-xl font-bold uppercase tracking-widest text-slate-900">Initial</span>
                      <span className="text-xl font-bold uppercase tracking-widest text-slate-900">Ventures</span>
                  </Link>
                  <button
                      onClick={() => setIsSidebarOpen(false)}
                      className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                  >
                      <X className="w-8 h-8 text-blue-500" />
                  </button>
              </div>

              <div className="space-y-12">
                  <div>
                      <h4 className="text-orange-500 font-bold text-xs uppercase tracking-widest mb-6">About Us</h4>
                      <ul className="space-y-4 text-xl font-medium text-slate-800">
                          <li><Link href="/" className="hover:text-blue-600 transition-colors">About</Link></li>
                          <li><Link href="/portfolio" className="hover:text-blue-600 transition-colors">Portfolio</Link></li>
                          <li><Link href="/insights" className="hover:text-blue-600 transition-colors">Insights</Link></li>
                          <li><Link href="/jobs" className="hover:text-blue-600 transition-colors">Jobs</Link></li>
                          <li><Link href="/connect" className="hover:text-blue-600 transition-colors">Connect</Link></li>
                      </ul>
                  </div>
              </div>

               <div className="mt-16 pt-8 border-t border-gray-100">
                  <h4 className="text-orange-500 font-bold text-xs uppercase tracking-widest mb-6">Follow Initial Ventures</h4>
                  <div className="flex gap-3">
                      <a href="https://x.com/InitialVentures" target="_blank" rel="noopener noreferrer" className="bg-blue-400 hover:bg-blue-600 text-white w-10 h-10 flex items-center justify-center rounded-sm transition-colors">
                          <Twitter className="w-5 h-5" />
                      </a>
                      <a href="#" className="bg-blue-400 hover:bg-blue-600 text-white w-10 h-10 flex items-center justify-center rounded-sm transition-colors"><Linkedin className="w-5 h-5" /></a>
                  </div>
              </div>
          </div>
        </div>

        {/* Spacer for Fixed Nav */}
        <div className="h-24"></div>

        {/* MAIN CONTENT */}
        <div className="max-w-7xl mx-auto px-6 py-12">

          {/* Header */}
          <div className="mb-12">
            <div className="flex items-center gap-4 mb-4">
                <div className="h-8 w-1 bg-blue-500"></div>
                <h1 className="text-5xl md:text-6xl font-serif font-medium text-[#1C2B4B]">
                  Research & Insights
                </h1>
            </div>
            <p className="text-xl text-slate-600 max-w-3xl">
              Curated research from leading crypto firms. Stay informed on the latest trends, technologies, and market analysis in Web3.
            </p>
          </div>

          {/* Two Column Layout: Research & News */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

            {/* LEFT COLUMN - Research Articles (60%) */}
            <div className="lg:col-span-7">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Research Articles</h2>

              {/* Category Filter */}
              <div className="mb-6">
                <div className="flex flex-wrap gap-2">
                  {categories.map(category => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-3 py-1.5 rounded-lg font-semibold text-xs transition-colors ${
                        selectedCategory === category
                          ? 'bg-blue-600 text-white'
                          : 'bg-white text-slate-600 border border-slate-300 hover:border-blue-600 hover:text-blue-600'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Research Papers */}
              <div className="space-y-6">
            {filteredPapers.map(paper => (
              <div key={paper.id} className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-slate-200 group">
                <div className="flex flex-col gap-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">
                          {paper.category}
                        </span>
                        <div className="flex items-center gap-1 text-sm text-slate-600">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(paper.publishDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                        </div>
                      </div>

                      <h3 className="text-2xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                        {paper.title}
                      </h3>

                      <div className="flex items-center gap-4 text-sm text-slate-600 mb-3">
                        <div className="flex items-center gap-1">
                          <Building2 className="w-4 h-4" />
                          <span className="font-semibold">{paper.source}</span>
                        </div>
                        <span>•</span>
                        <span>by {paper.author}</span>
                      </div>

                      <p className="text-slate-700 leading-relaxed mb-4">
                        {paper.summary}
                      </p>

                      <a
                        href={paper.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-slate-600 hover:text-blue-600 font-semibold transition-colors"
                      >
                        Read Full Report
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

                {filteredPapers.length === 0 && (
                  <div className="text-center py-20 bg-white rounded-xl border border-slate-200">
                    <p className="text-xl text-slate-600">No research papers found in this category.</p>
                  </div>
                )}
            </div>

            {/* RIGHT COLUMN - Live News Feed (40%) */}
            <div className="lg:col-span-5">
              <div className="sticky top-28">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-slate-900">Latest News</h2>
                  {isLoadingNews && (
                    <div className="text-sm text-slate-500 animate-pulse">Loading...</div>
                  )}
                </div>

                <div className="space-y-4 max-h-[800px] overflow-y-auto pr-2">
                  {news.slice(0, 15).map((article, index) => (
                    <a
                      key={article.id || index}
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 p-4 border border-slate-200 hover:border-blue-300 group"
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm font-semibold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2 mb-2">
                            {article.title}
                          </h3>
                          <div className="flex items-center gap-2 text-xs text-slate-500">
                            <span className="font-medium">{article.source}</span>
                            <span>•</span>
                            <span>{new Date(article.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                          </div>
                        </div>
                        <ExternalLink className="w-3 h-3 text-slate-400 group-hover:text-blue-600 flex-shrink-0 mt-1" />
                      </div>
                    </a>
                  ))}

                  {!isLoadingNews && news.length === 0 && (
                    <div className="text-center py-10 bg-white rounded-lg border border-slate-200">
                      <p className="text-sm text-slate-600">No news available at the moment.</p>
                    </div>
                  )}
                </div>

                <div className="mt-4 text-center">
                  <Link
                    href="/news"
                    className="text-sm text-blue-600 hover:text-blue-700 font-semibold inline-flex items-center gap-1"
                  >
                    View All News
                    <ExternalLink className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Footer */}
        <footer className="bg-[#1C2B4B] text-[#c2c2c2] text-sm py-16 font-sans mt-20">
          <div className="max-w-7xl mx-auto px-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
                  <div className="space-y-6">
                      <h3 className="text-2xl font-bold font-bold text-white tracking-wider uppercase">
                          INITIAL VENTURES
                      </h3>
                      <p className="text-lg text-[#8e8e90] font-light max-w-md font-serif italic">
                          Going Infinite
                      </p>
                  </div>
                  <div className="flex flex-col md:items-end justify-between">
                      <div className="flex gap-4">
                          <a href="https://x.com/InitialVentures" target="_blank" rel="noopener noreferrer" className="bg-[#2a3f6b] hover:bg-white hover:text-[#1C2B4B] text-white w-10 h-10 flex items-center justify-center rounded-sm transition-colors"><Twitter className="w-5 h-5" /></a>
                          <a href="#" className="bg-[#2a3f6b] hover:bg-white hover:text-[#1C2B4B] text-white w-10 h-10 flex items-center justify-center rounded-sm transition-colors"><Linkedin className="w-5 h-5" /></a>
                      </div>
                  </div>
              </div>
              <div className="border-t border-[#2a3f6b] pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-bold tracking-widest uppercase text-slate-500 font-sans">
                  <span>© 2026 Initial Ventures. All Rights Reserved.</span>
                  <div className="flex gap-6">
                      <a href="#" className="hover:text-white transition-colors">Terms</a>
                      <a href="#" className="hover:text-white transition-colors">Privacy</a>
                  </div>
              </div>
          </div>
        </footer>
      </main>
    </>
  );
}
