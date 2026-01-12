"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Playfair_Display, Inter } from 'next/font/google'; 
import { 
  Search, 
  Menu, 
  X, 
  ArrowRight, 
  Moon, 
  Globe 
} from 'lucide-react';

// --- FONTS SETUP ---
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' });
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

// --- MOCK DATA (Updated with URLs) ---
// In a real live version, you would replace this array with data fetched from an API
// like CryptoPanic or NewsAPI inside a useEffect hook.
const latestNews = [
  { 
    id: 1, 
    company: "Rate X", 
    title: "Rate X launches leveraged yield trading on Solana Mainnet", 
    date: "JAN 5, 2026", 
    source: "CoinDesk",
    url: "https://www.coindesk.com" // Replace with real link
  },
  { 
    id: 2, 
    company: "Raiku", 
    title: "Pantera leads $13.5M Series A in Raiku", 
    date: "JAN 3, 2026", 
    source: "TechCrunch",
    url: "https://techcrunch.com" 
  },
  { 
    id: 3, 
    company: "Primus Labs", 
    title: "Bridging Web2 Data to Web3: The Primus Vision", 
    date: "DEC 28, 2025", 
    source: "Medium",
    url: "https://medium.com" 
  },
  { 
    id: 4, 
    company: "Sidekick", 
    title: "Sidekick surpasses 100k daily active users", 
    date: "DEC 20, 2025", 
    source: "VentureBeat",
    url: "https://venturebeat.com" 
  },
  { 
    id: 5, 
    company: "Zeus Network", 
    title: "Bitcoin interoperability layer Zeus confirms airdrop details", 
    date: "DEC 15, 2025", 
    source: "The Block",
    url: "https://www.theblock.co" 
  },
  { 
    id: 6, 
    company: "Perena", 
    title: "Perena introduces new stablecoin liquidity pools", 
    date: "DEC 10, 2025", 
    source: "DeFi Llama",
    url: "https://defillama.com" 
  },
];

const DiscordIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 127.14 96.36" className={className} fill="currentColor">
    <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.11,77.11,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.89,105.89,0,0,0,126.6,80.22c2.36-24.44-4.2-50.22-18.9-72.15ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,46,96.12,53,91.08,65.69,84.69,65.69Z"/>
  </svg>
);

const TelegramIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
  </svg>
);


export default function LandingPage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <main className={`${playfair.variable} ${inter.variable} min-h-screen bg-[#FBFBFB] text-slate-900 font-sans selection:bg-orange-200`}>
      
      {/* ================= SECTION 1: NAVIGATION BAR ================= */}
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
            <Link href="/" className="text-slate-900 font-bold transition-colors">About</Link>
            <Link href="/portfolio" className="hover:text-slate-900 transition-colors">Portfolio</Link>
            <Link href="#" className="hover:text-slate-900 transition-colors">Insights</Link>
            <Link href="#" className="hover:text-slate-900 transition-colors">Careers</Link>
          </div>

          {/* Right Actions */}
          <div className="hidden md:flex items-center gap-4">
            <button className="p-2 text-slate-600 hover:text-slate-900 transition-colors">
                <Globe className="w-5 h-5" />
            </button>
            <button className="p-2 text-slate-600 hover:text-slate-900 transition-colors">
                <Moon className="w-5 h-5" />
            </button>
            <button className="p-2 text-slate-600 hover:text-slate-900 transition-colors">
                <Search className="w-5 h-5" />
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 text-slate-900 hover:bg-slate-100 rounded-md transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
            <div className="absolute top-full left-0 w-full bg-white border-t border-gray-100 shadow-lg p-6 flex flex-col gap-4 md:hidden font-sans">
                <Link href="/" className="text-lg font-medium">About</Link>
                <Link href="/portfolio" className="text-lg font-medium">Portfolio</Link>
                <a href="#" className="text-lg font-medium">Insights</a>
                <a href="#" className="text-lg font-medium">Policy</a>
                <a href="#" className="text-lg font-medium">Careers</a>
            </div>
        )}
      </nav>

      {/* Spacer for Fixed Nav */}
      <div className="h-24"></div>


      {/* ================= SECTION 2: FUND INTRODUCTION ================= */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="flex items-center gap-4 mb-16">
            <div className="h-8 w-1 bg-blue-500"></div>
            <h2 className="text-5xl md:text-6xl font-serif font-medium text-[#1C2B4B]">
                Our Funds
            </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24">
            {/* Fund 01 */}
            <div className="group">
                <div className="flex items-baseline gap-4 mb-6">
                    <span className="text-xl font-bold text-blue-500">//</span>
                    <h3 className="text-3xl md:text-4xl font-serif text-[#1C2B4B] group-hover:text-blue-700 transition-colors">
                        Ultron Fund
                    </h3>
                </div>
                <p className="text-lg leading-relaxed text-slate-600 font-light mb-8">
                    Ultron is a quantitative hedge fund that delivers strong absolute returns across market cycles through a proprietary automated strategy based on the machine learning of the market data analysis; 
                    Ultron investing predominantly in leveraged Bitcoin markets to generate consistent alpha over a proven track record.
                </p>
                <Link href="/connect" className="text-sm font-bold uppercase tracking-widest text-slate-500 hover:text-orange-600 transition-colors flex items-center gap-2 font-sans">
                    Request Information <ArrowRight className="w-4 h-4" />
                </Link>
            </div>

            {/* Fund 02 */}
            <div className="group">
                <div className="flex items-baseline gap-4 mb-6">
                    <span className="text-xl font-bold text-blue-500">//</span>
                    <h3 className="text-3xl md:text-4xl font-serif text-[#1C2B4B] group-hover:text-blue-700 transition-colors">
                        Venture Fund
                    </h3>
                </div>
                <p className="text-lg leading-relaxed text-slate-600 font-light mb-8">
                    We work closely with builders to innovate the traditional market and infrastructure environment. This is our first venture fund that 
                    backs early-stage companies and founders. We are focusing on DeFi, Infrastructure, AI, Robotics and Consumer apps.
                </p>
                <Link href="/connect" className="text-sm font-bold uppercase tracking-widest text-slate-500 hover:text-orange-600 transition-colors flex items-center gap-2 font-sans">
                    Request Information <ArrowRight className="w-4 h-4" />
                </Link>
            </div>
        </div>
      </section>

      <hr className="border-gray-200 max-w-7xl mx-auto" />

      {/* ================= SECTION 3: LATEST PORTFOLIO NEWS ================= */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="flex justify-between items-end mb-12">
            <div>
                <h4 className="text-orange-500 font-bold text-xs uppercase tracking-widest mb-2 font-sans">Updates</h4>
                <h2 className="text-4xl font-serif text-[#1C2B4B]">Portfolio News</h2>
            </div>
            <a href="#" className="hidden md:flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-orange-500 transition-colors font-sans">
                View Archive <ArrowRight className="w-4 h-4" />
            </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {latestNews.map((news) => (
                <div key={news.id} className="bg-white border border-gray-50 p-8 hover:shadow-xl hover:-translate-y-0.25 transition-all duration-100 group">
                    <div className="flex justify-between items-start mb-6">
                        <span className="text-xs font-bold uppercase tracking-widest text-blue-700 font-sans">
                            {news.company}
                        </span>
                        <span className="text-xs text-slate-400 font-mono">
                            {news.date}
                        </span>
                    </div>
                    {/* UPDATED: Title is now a link to the external URL */}
                    <h3 className="text-xl font-serif text-[#1C2B4B] mb-4 decoration-orange-500 underline-offset-4">
                        <a href={news.url} target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 hover:underline transition-colors">
                            {news.title}
                        </a>
                    </h3>
                    <div className="flex items-center gap-2 text-xs font-medium text-slate-500 mt-auto font-sans">
                        <span>Source: {news.source}</span>
                        <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity -ml-2 group-hover:ml-0 text-orange-500" />
                    </div>
                </div>
            ))}
        </div>
        
        <div className="mt-8 md:hidden">
            <a href="#" className="flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-orange-500 transition-colors font-sans">
                View Archive <ArrowRight className="w-4 h-4" />
            </a>
        </div>
      </section>


      {/* ================= SECTION 4: FOOTER ================= */}
      <footer id="contact" className="bg-[#1C2B4B] text-[#c2c2c2] text-sm py-16 font-sans">
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

                <div className="flex flex-col md:items-end justify-between gap-10">
                    <div className="flex gap-4">
                        <a href="#" className="bg-[#2a3f6b] hover:bg-white hover:text-[#1C2B4B] text-white w-10 h-10 flex items-center justify-center rounded-sm transition-colors" title="Discord">
                            <DiscordIcon className="w-5 h-5" />
                        </a>
                        <a href="#" className="bg-[#2a3f6b] hover:bg-white hover:text-[#1C2B4B] text-white w-10 h-10 flex items-center justify-center rounded-sm transition-colors" title="Telegram">
                            <TelegramIcon className="w-5 h-5" />
                        </a>
                        <a href="https://x.com/InitialVentures" target="_blank" className="bg-[#2a3f6b] hover:bg-white hover:text-[#1C2B4B] text-white w-10 h-10 flex items-center justify-center rounded-sm transition-colors" title="X / Twitter">
                            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                        </a>
                    </div>

                    <div className="mt-8 md:mt-0 md:text-right flex flex-col items-end">
                        <Link 
                            href="/contact" 
                            className="px-8 py-3 bg-white text-[#1C2B4B] text-sm font-bold rounded-sm hover:bg-gray-100 transition-colors font-sans uppercase tracking-wider"
                        >
                            Connect Us
                        </Link>
                    </div>
                </div>
            </div>

            <div className="border-t border-[#2a3f6b] pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-bold tracking-widest uppercase text-slate-500 font-sans">
                <span>© 2026 Initial Ventures. All Rights Reserved.</span>
                <div className="flex gap-6">
                    <a href="#" className="hover:text-white transition-colors">Terms</a>
                    <a href="#" className="hover:text-white transition-colors">Privacy</a>
                    <a href="#" className="hover:text-white transition-colors">Disclosures</a>
                </div>
            </div>
        </div>
      </footer>
    </main>
  );
}