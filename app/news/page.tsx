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
  Linkedin,
  Newspaper
} from 'lucide-react';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import SearchModal from '@/components/SearchModal';

// News article type definition
interface NewsArticle {
  id: number;
  title: string;
  company: string;
  date: string;
  source: string;
  summary: string;
  url: string;
  category: string;
}

// This will be populated by the API in production
const newsArticles: NewsArticle[] = [
  {
    id: 1,
    title: "Backpack Raises $17M Series A Led by Placeholder",
    company: "Backpack",
    date: "2024-01-18",
    source: "The Block",
    summary: "Backpack, the crypto wallet and exchange platform, announced a $17 million Series A funding round led by Placeholder VC. The funds will be used to expand the platform's multi-chain capabilities and enhance security features for both retail and institutional users.",
    url: "https://www.theblock.co/",
    category: "Funding"
  },
  {
    id: 2,
    title: "Solayer Launches Restaking Protocol on Solana Mainnet",
    company: "Solayer",
    date: "2024-01-15",
    source: "CoinDesk",
    summary: "Solayer officially launched its restaking protocol on Solana mainnet, enabling SOL holders to secure additional networks while maintaining their staking positions. The protocol aims to improve capital efficiency and expand Solana's validator ecosystem.",
    url: "https://www.coindesk.com/",
    category: "Product Launch"
  },
  {
    id: 3,
    title: "RateX Surpasses $500M in Trading Volume",
    company: "RateX",
    date: "2024-01-12",
    source: "Decrypt",
    summary: "RateX, a decentralized derivatives exchange, has crossed $500 million in cumulative trading volume since its launch. The platform's innovative leveraged yield trading features have attracted significant attention from DeFi traders.",
    url: "https://decrypt.co/",
    category: "Milestone"
  },
  {
    id: 4,
    title: "Lombard Integrates with EigenLayer for Bitcoin Restaking",
    company: "Lombard",
    date: "2024-01-10",
    source: "The Block",
    summary: "Lombard announced a strategic integration with EigenLayer, enabling Bitcoin holders to participate in restaking through wrapped BTC derivatives. This integration opens new yield opportunities for Bitcoin holders while contributing to Ethereum's security.",
    url: "https://www.theblock.co/",
    category: "Partnership"
  },
  {
    id: 5,
    title: "Raiku Launches AI-Powered Trading Infrastructure",
    company: "Raiku",
    date: "2024-01-08",
    source: "CoinTelegraph",
    summary: "Raiku unveiled its AI-powered infrastructure platform designed to optimize trading strategies for institutional clients. The platform leverages machine learning algorithms to provide real-time market analysis and automated execution.",
    url: "https://cointelegraph.com/",
    category: "Product Launch"
  },
  {
    id: 6,
    title: "Primus Labs Secures Audit from Trail of Bits",
    company: "Primus Labs",
    date: "2024-01-05",
    source: "Messari",
    summary: "Primus Labs announced the successful completion of a comprehensive security audit by Trail of Bits ahead of its mainnet launch. The audit covered smart contract security, consensus mechanisms, and network architecture.",
    url: "https://messari.io/",
    category: "Security"
  },
  {
    id: 7,
    title: "Backpack Exchange Adds Support for 50 New Trading Pairs",
    company: "Backpack",
    date: "2024-01-03",
    source: "CoinDesk",
    summary: "Backpack Exchange expanded its offerings with 50 new trading pairs across major blockchains. The update includes support for emerging DeFi tokens and cross-chain liquidity pools, further solidifying its position in the multi-chain exchange landscape.",
    url: "https://www.coindesk.com/",
    category: "Product Update"
  },
  {
    id: 8,
    title: "Solayer TVL Reaches $200M in First Month",
    company: "Solayer",
    date: "2023-12-28",
    source: "DeFi Llama",
    summary: "Just one month after launch, Solayer's total value locked (TVL) has surpassed $200 million, demonstrating strong market demand for restaking solutions on Solana. The protocol has attracted over 15,000 unique stakers.",
    url: "https://defillama.com/",
    category: "Milestone"
  },
  {
    id: 9,
    title: "RateX Partners with Pyth Network for Price Feeds",
    company: "RateX",
    date: "2023-12-25",
    source: "The Block",
    summary: "RateX integrated Pyth Network's high-fidelity price feeds to enhance the accuracy and reliability of its derivatives trading platform. The partnership ensures low-latency price updates crucial for leveraged trading.",
    url: "https://www.theblock.co/",
    category: "Partnership"
  },
  {
    id: 10,
    title: "Lombard Announces $8M Seed Round",
    company: "Lombard",
    date: "2023-12-20",
    source: "TechCrunch",
    summary: "Lombard raised $8 million in seed funding to build Bitcoin liquid staking infrastructure. The round was led by Polychain Capital with participation from Robot Ventures and several prominent angel investors.",
    url: "https://techcrunch.com/",
    category: "Funding"
  }
];

export default function NewsPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedCompany, setSelectedCompany] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const categories = ['All', 'Funding', 'Product Launch', 'Milestone', 'Partnership', 'Security', 'Product Update'];
  const companies = ['All', 'Backpack', 'Solayer', 'RateX', 'Lombard', 'Raiku', 'Primus Labs'];

  const filteredNews = newsArticles.filter(article => {
    const matchesCategory = selectedCategory === 'All' || article.category === selectedCategory;
    const matchesCompany = selectedCompany === 'All' || article.company === selectedCompany;
    const matchesSearch = searchQuery === '' ||
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.company.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesCompany && matchesSearch;
  });

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
              <Link href="/insights" className="hover:text-slate-900 transition-colors">Insights</Link>
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
            <div className="flex items-center gap-3 mb-4">
              <Newspaper className="w-12 h-12 text-blue-600" />
              <h1 className="text-5xl font-bold tracking-tight text-slate-900">
                Portfolio News Archive
              </h1>
            </div>
            <p className="text-xl text-slate-600 max-w-3xl">
              Stay updated with the latest news and announcements from our portfolio companies. All news is automatically sourced from leading crypto media outlets.
            </p>
          </div>

          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search news by title, company, or content..."
                className="w-full pl-12 pr-4 py-3 border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-lg"
              />
            </div>
          </div>

          {/* Filters */}
          <div className="mb-8 space-y-4">
            <div>
              <h3 className="text-sm font-semibold text-slate-700 mb-3">Filter by Category</h3>
              <div className="flex flex-wrap gap-2">
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-lg font-semibold text-sm transition-colors ${
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

            <div>
              <h3 className="text-sm font-semibold text-slate-700 mb-3">Filter by Company</h3>
              <div className="flex flex-wrap gap-2">
                {companies.map(company => (
                  <button
                    key={company}
                    onClick={() => setSelectedCompany(company)}
                    className={`px-4 py-2 rounded-lg font-semibold text-sm transition-colors ${
                      selectedCompany === company
                        ? 'bg-orange-600 text-white'
                        : 'bg-white text-slate-600 border border-slate-300 hover:border-orange-600 hover:text-orange-600'
                    }`}
                  >
                    {company}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div className="mb-6">
            <p className="text-sm text-slate-600">
              Showing <span className="font-semibold text-slate-900">{filteredNews.length}</span> {filteredNews.length === 1 ? 'article' : 'articles'}
            </p>
          </div>

          {/* News Articles Grid */}
          <div className="space-y-6">
            {filteredNews.map(article => (
              <div key={article.id} className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-slate-200 group">
                <div className="flex flex-col gap-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3 flex-wrap">
                        <span className="px-3 py-1 bg-orange-100 text-orange-700 text-xs font-semibold rounded-full">
                          {article.company}
                        </span>
                        <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">
                          {article.category}
                        </span>
                        <div className="flex items-center gap-1 text-sm text-slate-600">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(article.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                        </div>
                      </div>

                      <h3 className="text-2xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                        {article.title}
                      </h3>

                      <p className="text-slate-700 leading-relaxed mb-4">
                        {article.summary}
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="text-sm text-slate-600">
                          Source: <span className="font-semibold">{article.source}</span>
                        </div>

                        <a
                          href={article.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
                        >
                          Read More
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredNews.length === 0 && (
            <div className="text-center py-20 bg-white rounded-xl border border-slate-200">
              <Newspaper className="w-16 h-16 text-slate-400 mx-auto mb-4" />
              <p className="text-xl text-slate-600">No news articles found matching your criteria.</p>
              <p className="text-sm text-slate-500 mt-2">Try adjusting your filters or search query.</p>
            </div>
          )}
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
