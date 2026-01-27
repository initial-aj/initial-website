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

// Research papers from top crypto firms - Real published articles
const researchPapers: ResearchPaper[] = [
  {
    id: 1,
    title: "State of Crypto 2025",
    source: "a16z Crypto",
    author: "a16z Crypto Research Team",
    publishDate: "2025-01-15",
    category: "Market Analysis",
    summary: "Comprehensive annual report examining the state of the crypto industry in 2025, covering market trends, regulatory developments, technological innovations, and key insights across DeFi, infrastructure, and emerging applications. Essential reading for understanding the current crypto landscape.",
    url: "https://a16zcrypto.com/posts/article/state-of-crypto-report-2025/",
  },
  {
    id: 2,
    title: "Big Ideas in Crypto 2025",
    source: "a16z Crypto",
    author: "a16z Crypto Research Team",
    publishDate: "2025-01-10",
    category: "Innovation",
    summary: "Explores the most promising technological and business innovations shaping the future of crypto. Covers AI integration, decentralized infrastructure, regulatory developments, and breakthrough applications that could define the next generation of Web3.",
    url: "https://a16zcrypto.com/posts/article/big-ideas-crypto-2025/",
  },
  {
    id: 3,
    title: "The Crypto Theses 2025",
    source: "Messari",
    author: "Ryan Selkis",
    publishDate: "2025-01-08",
    category: "Market Analysis",
    summary: "Messari's flagship annual report providing deep analysis of crypto market trends, investment themes, and predictions for 2025. Covers blockchain infrastructure, DeFi evolution, NFT markets, regulatory landscape, and emerging opportunities across the entire digital asset ecosystem.",
    url: "https://messari.io/report/the-crypto-theses-2025",
  },
  {
    id: 4,
    title: "2025 Crypto Market Outlook",
    source: "Coinbase Institutional",
    author: "Coinbase Research Team",
    publishDate: "2025-01-05",
    category: "Market Analysis",
    summary: "Institutional perspective on crypto market trends for 2025, analyzing macroeconomic factors, regulatory developments, and key opportunities for institutional investors. Includes market forecasts, risk analysis, and strategic recommendations for digital asset allocation.",
    url: "https://www.coinbase.com/institutional/research-insights/research/market-intelligence/2025-crypto-market-outlook",
  },
  {
    id: 5,
    title: "2025 Institutional Digital Assets Survey",
    source: "Coinbase Institutional",
    author: "Coinbase Research Team",
    publishDate: "2025-01-03",
    category: "Institutional Research",
    summary: "Survey results from institutional investors revealing adoption trends, investment strategies, and sentiment toward digital assets. Provides insights into how traditional finance institutions are approaching crypto integration and what barriers remain.",
    url: "https://www.coinbase.com/institutional/research-insights/research/insights-reports/2025-institutional-investor-survey",
  },
  {
    id: 6,
    title: "The Year of Structural Progress for Crypto",
    source: "Pantera Capital",
    author: "Pantera Capital Team",
    publishDate: "2025-01-02",
    category: "Market Analysis",
    summary: "Pantera Capital's outlook on structural improvements in crypto infrastructure, regulation, and institutional adoption. Discusses how foundational changes in 2025 are setting the stage for mainstream adoption and the next phase of market growth.",
    url: "https://panteracapital.com/blockchain-letter/2025-the-year-of-structural-progress-for-crypto-pantera-capital/",
  },
  {
    id: 7,
    title: "The Year Ahead for AI + DePIN 2025",
    source: "Delphi Digital",
    author: "Delphi Digital Research",
    publishDate: "2024-12-28",
    category: "AI & Infrastructure",
    summary: "Analysis of the convergence between artificial intelligence and decentralized physical infrastructure networks (DePIN). Explores how blockchain-based AI compute markets, decentralized data networks, and crypto-economic incentives are creating new infrastructure paradigms.",
    url: "https://members.delphidigital.io/reports/the-year-ahead-for-ai-depin-2025",
  },
  {
    id: 8,
    title: "The Evolution of Digital Asset Secondary Markets 2025",
    source: "Delphi Digital",
    author: "Delphi Digital Research",
    publishDate: "2024-12-20",
    category: "Markets & Trading",
    summary: "Comprehensive study of how secondary markets for digital assets are evolving, including NFT marketplaces, token trading venues, and new liquidity mechanisms. Examines market structure changes, regulatory impacts, and emerging opportunities.",
    url: "https://members.delphidigital.io/reports/the-evolution-of-digital-asset-secondary-markets-2025",
  },
  {
    id: 9,
    title: "Q1 2025 Guide to Crypto Markets",
    source: "Coinbase Institutional",
    author: "Coinbase Research Team",
    publishDate: "2024-12-15",
    category: "Market Analysis",
    summary: "Quarterly outlook providing institutional investors with market analysis, key trends, and investment themes for Q1 2025. Covers Bitcoin and Ethereum dynamics, altcoin opportunities, DeFi developments, and macroeconomic factors affecting digital assets.",
    url: "https://www.coinbase.com/institutional/research-insights/research/market-intelligence/guide-to-crypto-markets-q1-2025",
  },
  {
    id: 10,
    title: "State of Solana Q3 2025",
    source: "Messari",
    author: "Messari Research",
    publishDate: "2024-10-01",
    category: "Infrastructure",
    summary: "In-depth quarterly analysis of Solana's ecosystem growth, network performance, DeFi activity, and developer adoption. Covers Firedancer progress, transaction volume trends, MEV dynamics, and the competitive landscape among high-performance blockchains.",
    url: "https://messari.io/project/solana/research",
  },
  {
    id: 11,
    title: "Charting Crypto Q4 2025",
    source: "Coinbase Institutional",
    author: "Coinbase Research Team",
    publishDate: "2024-09-30",
    category: "Market Analysis",
    summary: "Visual and data-driven analysis of crypto market trends heading into Q4 2025. Features charts, metrics, and insights on market cycles, on-chain activity, institutional flows, and key indicators for digital asset investors.",
    url: "https://www.coinbase.com/institutional/research-insights/research/insights-reports/charting-crypto-q4-2025",
  },
  {
    id: 12,
    title: "Policy Market Mapping Exercise Spring 2025",
    source: "Paradigm",
    author: "Paradigm Policy Team",
    publishDate: "2024-07-15",
    category: "Policy & Regulation",
    summary: "Comprehensive mapping of the crypto policy landscape, analyzing regulatory frameworks across jurisdictions, legislative initiatives, and their market impacts. Essential resource for understanding the evolving regulatory environment for digital assets.",
    url: "https://www.paradigm.xyz/2025/07/paradigm-policy-market-mapping-exercise-spring-2025",
  },
  {
    id: 13,
    title: "Messari Monthly: September 2025",
    source: "Messari",
    author: "Messari Research",
    publishDate: "2024-09-01",
    category: "Market Analysis",
    summary: "Monthly digest of the most important developments in crypto, including market performance, notable protocol updates, funding activity, and emerging trends. Provides concise insights into what matters most in the rapidly evolving crypto landscape.",
    url: "https://messari.io/report/messari-monthly-september-2025",
  },
  {
    id: 14,
    title: "The Great Onchain Migration",
    source: "Pantera Capital",
    author: "Pantera Capital Team",
    publishDate: "2024-08-15",
    category: "Infrastructure",
    summary: "Analysis of the ongoing migration of financial services, assets, and applications onto blockchain infrastructure. Explores how traditional finance is moving on-chain, the infrastructure enabling this transition, and the implications for the future of finance.",
    url: "https://panteracapital.com/blockchain-letter/the-great-onchain-migration/",
  },
  {
    id: 15,
    title: "Crypto Markets, Privacy, And Payments",
    source: "Pantera Capital",
    author: "Pantera Capital Team",
    publishDate: "2024-07-20",
    category: "Privacy & Payments",
    summary: "Examination of privacy technologies in crypto, the evolution of digital payments, and the balance between regulatory compliance and user privacy. Discusses zero-knowledge proofs, privacy coins, and the future of confidential transactions in a regulated environment.",
    url: "https://panteracapital.com/blockchain-letter/crypto-markets-privacy-and-payments/",
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

  const categories = ['All', 'Market Analysis', 'Innovation', 'Institutional Research', 'AI & Infrastructure', 'Markets & Trading', 'Infrastructure', 'Policy & Regulation', 'Privacy & Payments'];

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
