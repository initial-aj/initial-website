"use client";

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Search,
  ChevronDown,
  X,
  Facebook,
  Linkedin,
  Instagram,
  ArrowRight,
  Twitter,
  Check,
  Youtube,
  Menu,
  Globe,
} from 'lucide-react';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import SearchModal from '@/components/SearchModal';

// --- TYPES & DATA ---
type Company = {
  id: number;
  name: string;
  description: string;
  longDescription?: string;
  status: string; 
  stage: "Listed" | "Growth" | "Seed" | "Idea" | "IPO" | "Acquired"; 
  focusArea: "DeFi" | "AI" | "Infrastructure" | "Payments" | "Exchange" | "BTC" | "Crosschain" | "Privacy" | "Consumer" | "Enterprise" | "Platform" | "RWA"; 
  color?: string; 
  image?: string; 
  logo?: string; 
  founders?: string; 
  newsTitle?: string; 
  newsSnippet?: string;
  twitterUrl?: string;
  websiteUrl?: string;
};

const featuredCompanies: Company[] = [
  {
    id: 1,
    name: "Backpack Exchange",
    description: "A fully regulated one-stop exchange for seamlessly trading and asset management experience",
    longDescription: "Backpack is a fully licensed crypto centralized exchange (CEX) operates across the world provides one-stop product solutions for trading, asset management and securing custody digital assets.",
    status: "Growth",
    stage: "Growth",
    focusArea: "Exchange",
    color: "from-orange-400 to-pink-600",
    image: "/logo/backpack/Default_Logo_Vertical_RedAndWhite.png",
    founders: "Armani Ferrante, Can Sun",
    newsTitle: "Backpack x Superstate: Bringing Tokenized Public Equities Onchain",
    newsSnippet: "Backpack is excited to announce its partnership with Superstate, marking a major step toward connecting regulated public markets with crypto-native infrastructure....",
    twitterUrl: "https://x.com/Backpack",
    websiteUrl: "https://backpack.exchange/"
  },
  {
    id: 2,
    name: "Rate X",
    description: "World's 1st leveraged yield exchange and structured finance layer",
    longDescription: "Rate X is pioneering a new era of decentralized finance by creating efficient markets for yield trading, allowing users to hedge and speculate on interest rates with institutional-grade tools.",
    status: "Ticker: RTX",
    stage: "Listed",
    focusArea: "DeFi",
    color: "from-orange-400 to-pink-600",
    image: "/logo/RateX/ratex_logo_no_text_Color_Text.svg",
    founders: "Sean Hu",
    newsTitle: "Rate X Q4 Updates",
    newsSnippet: "Rate X expands its structured finance offerings, bringing new yield opportunities to the Solana ecosystem...",
    twitterUrl: "https://x.com/RateX_Dex",
    websiteUrl: "https://rate-x.io/"
  },
  {
    id: 3,
    name: "Raiku",
    description: "An institutional-grade infrastructure that improves applications scalability, reliability and performance.",
    longDescription: "Raiku provides the critical connective tissue for the Solana ecosystem, ensuring that high-frequency trading and institutional applications can operate with absolute predictability and speed.",
    status: "Active",
    stage: "Seed",
    focusArea: "Infrastructure",
    color: "from-blue-600 to-indigo-900",
    image: "/logo/Raiku/raiku_logo.svg",
    founders: "Robin Nordnes, Joel R.",
    newsTitle: "Pantera-backed Raiku raises $13.5M",
    newsSnippet: "Raiku announced today that it has raised $13.5 million to bring the power of predictability to high-performance blockchains.",
    twitterUrl: "https://x.com/raikucom",
    websiteUrl: "https://raiku.com/"
  },
  {
    id: 4,
    name: "Primus Labs",
    description: "A production-ready on-chain and off-chain Proof-of-Reserves platform for institutions.",
    longDescription: "Bridging the gap between web2 and web3, Primus utilizes zkTLS technology to make the world's data useful on-chain, ensuring transparency and trust for institutional assets.",
    status: "Active",
    stage: "Seed",
    focusArea: "Infrastructure",
    color: "from-purple-500 to-orange-400",
    image: "/logo/Primus Labs/primuslabs_Logo-orange.svg",
    founders: "Xiang Xie, Vicky, Xavier Bham",
    newsTitle: "Primus: Make the World's Data Useful Onchain",
    newsSnippet: "Bridging the gap between web2 and web3 with Primus' zkTLS technology...",
    twitterUrl: "https://x.com/primus_labs",
    websiteUrl: "https://primuslabs.xyz/"
  },
  {
    id: 5,
    name: "Solayer",
    description: "A high performance SVM to build a vertically integrated financial infrastructure",
    longDescription: "A hardware-accelerated, high performance SVM network that designed to move transactions at the speed of light without constrained by the blockchains.",
    status: "Active",
    stage: "Seed",
    focusArea: "Infrastructure",
    color: "from-purple-500 to-orange-400",
    image: "/logo/Solayer/solayer_green_icon-gg.svg",
    founders: "Jason Li, Rachal Chu",
    newsTitle: "Solayer Updates",
    newsSnippet: "Bridging the gap between web2 and web3...",
    twitterUrl: "https://x.com/solayer_labs",
    websiteUrl: "https://solayer.org/"
  },
  {
    id: 6,
    name: "Lombard Finance",
    description: "A decentralized Bitcoin liquid staking platform for Bitcoin staking.",
    longDescription: "A decentralized liquid Bitcoin staking platform that designed to let Bitcoin holders earn staking rewards without locking up their assets, making it a DeFi platform for Bitcoin holders.",
    status: "Active",
    stage: "Seed",
    focusArea: "Infrastructure",
    color: "from-purple-500 to-orange-400",
    image: "/logo/Lombard/lombard-icon-black.svg",
    founders: "Jacob Phillips",
    newsTitle: "Lombard Finance acquires BTC.b Avalance's bridged Bitcoin asset, from Ava Labs",
    newsSnippet: "Lombard Finance has acquired BTC.b, Avalance's bridged bitcoin asset and infrastructure...",
    twitterUrl: "https://x.com/Lombard_Finance",
    websiteUrl: "https://www.lombard.finance/"
  },
];

const logoCompanies: Company[] = [
  { 
    id: 101, 
    name: "Perena", 
    status: "Growth", 
    description: "Simplify and accelerate stablecoin adoption", 
    longDescription: "Perena is building the liquidity layer that powers the next generation of stablecoin usability across the ecosystem.",
    founders: "Anna Yuan", 
    stage: "Growth",
    focusArea: "DeFi",
    twitterUrl: "https://x.com/perena",
    websiteUrl: "https://app.perena.org/"
  },
  { 
    id: 102, 
    name: "StackingDAO", 
    status: "Growth", 
    description: "Stacking DAO provides liquid staking on Stacks", 
    longDescription: "Unlocking liquidity for the Bitcoin economy, Stacking DAO allows users to earn yield on their BTC while maintaining liquidity.",
    founders: "Philip de Smedt", 
    stage: "Growth",
    focusArea: "BTC",
    twitterUrl: "https://x.com/StackingDao",
    websiteUrl: "https://www.stackingdao.com/"
  },
  { 
    id: 103, 
    name: "ZEUS Network", 
    status: "Listed: ZEUS", 
    description: "Enabling seamless interoperability of liquidity and assets on Solana", 
    longDescription: "ZEUS Network connects Solana and Bitcoin, creating a seamless communication layer for cross-chain decentralized applications.",
    founders: "Justin Wang", 
    stage: "Listed",
    focusArea: "Crosschain"
  },
  { id: 104, 
    name: "Titan Exchange", 
    status: "Active", 
    description: "A decentralized exchange aggregator", 
    founders: "Chris Chung, Andrew Tan", 
    stage: "Seed", 
    focusArea: "Exchange" 
  },
  { id: 105, name: "Sperm Racing (SR)", 
    status: "Active", 
    description: "A firm focuses on building longevity and male healthy with blockchain technology", 
    founders: "Eric Zhu, Nick Small, Shane Fan, Garrett Niconienko", 
    stage: "Seed", 
    focusArea: "Infrastructure" },
  { id: 106, name: "OpenEden", 
    status: "Listed: EDEN", 
    description: "A regulated platform issues real-world assets (RWA) to DeFi and unlock liquidities", 
    founders: "Jeremy Ng", 
    stage: "Growth", 
    focusArea: "RWA" },
  { id: 107, name: "Vanish Trading", 
    status: "Active", 
    description: "A trading platform Offers stealth swaps on Solana for top privacy-focused users.", 
    founders: "@SpikeShhh", 
    stage: "Seed", 
    focusArea: "Privacy" },
  { id: 108, name: "Yield Basis (YB)", 
    status: "Listed: YB", 
    description: "Trading yield earns from the markets activity or Token Yield earns YB emissions by depositing liquidity", 
    founders: "Michael Egorov", 
    stage: "Seed", 
    focusArea: "DeFi" },
  { id: 109, name: "Tensorblock AI", 
    status: "Active", 
    description: "An open-source middleware to simplify AI model provider management.", 
    founders: "Wilson Chen, Morris Cheung, Dennis Wu", 
    stage: "Seed", 
    focusArea: "AI" },
  { 
    id: 110, 
    name: "Sidekick", 
    status: "Listed: K", 
    description: "A livestream and trading platform", 
    longDescription: "Sidekick merges social engagement with trading, creating a dedicated platform for creators and traders to interact in real-time.",
    founders: "Jonny Chen", 
    stage: "Listed",
    focusArea: "Platform",
    twitterUrl: "https://x.com/Sidekick_Labs",
    websiteUrl: "https://sidekick.fans/"
  },
  { 
    id: 111, 
    name: "BitFlow Finance", 
    status: "Active", 
    description: "A decentralized exchange for Bitcoin asset trading", 
    longDescription: "A layer 2 for bitcoin asset trading.",
    founders: "Jonny Chen", 
    stage: "Seed",
    focusArea: "Platform",
    twitterUrl: "https://x.com/Sidekick_Labs",
    websiteUrl: "https://sidekick.fans/"
  },
];


export default function Portfolio() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const [filters, setFilters] = useState({
    focusArea: "",
    stage: "",
    status: ""
  });

  const dropdownRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (isSidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isSidebarOpen]);

  const filterOptions = {
    "Focus Area": ["DeFi", "AI", "Infrastructure", "Payments", "Exchange", "BTC", "Crosschain", "Privacy", "Consumer", "Enterprise", "Platform", "RWA"],
    "Stage": ["Listed", "Growth", "Seed", "Idea"],
    "Status": ["Active", "Exits"]
  };

  const filterCompany = (company: Company) => {
    const matchesSearch = company.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFocus = filters.focusArea === "" || company.focusArea === filters.focusArea;
    let matchesStage = true;
    if (filters.stage) {
        if (filters.stage === "Listed") matchesStage = ["Listed", "IPO", "Acquired"].includes(company.stage);
        else matchesStage = company.stage === filters.stage;
    }
    let matchesStatus = true;
    if (filters.status === "Exits") {
        matchesStatus = ["IPO", "Acquired", "Listed"].includes(company.stage);
    } else if (filters.status === "Active") {
        matchesStatus = ["Growth", "Seed", "Idea"].includes(company.stage);
    }
    return matchesSearch && matchesFocus && matchesStage && matchesStatus;
  };

  const filteredFeatured = featuredCompanies.filter(filterCompany);
  const filteredLogos = logoCompanies.filter(filterCompany);

  const handleFilterSelect = (category: string, value: string) => {
    const key = category === "Focus Area" ? "focusArea" : category.toLowerCase();
    setFilters(prev => ({
      ...prev,
      [key]: prev[key as keyof typeof prev] === value ? "" : value 
    }));
    setActiveDropdown(null); 
  };

  return (
    <>
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      <main className="min-h-screen bg-white text-slate-900 font-sans relative flex flex-col" style={{ fontFamily: 'Inter, sans-serif' }}>
      
      {/* ================= NAVIGATION BAR ================= */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-sm py-4' : 'bg-white py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          
          <Link href="/" className="flex items-center gap-4 group">
             <div className="relative w-12 h-12 rounded-lg overflow-hidden shadow-sm">
                <Image src="/logo.png" alt="Logo" fill className="object-cover" />
             </div>
             <h2 className="text-xl font-bold uppercase tracking-[0.2em] text-slate-900 group-hover:opacity-80 transition-opacity font-sans">
               Initial Ventures
             </h2>
          </Link>

          <div className="hidden md:flex items-center gap-8 font-medium text-sm text-slate-600 font-sans">
            <Link href="/" className="hover:text-slate-900 transition-colors">About</Link>
            <Link href="/portfolio" className="text-slate-900 font-bold transition-colors">Portfolio</Link>
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


      {/* --- SIDEBAR NAVIGATION --- */}
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


      {/* --- CONTENT WRAPPER --- */}
      <div className="flex-grow pt-24"> 
        
        {/* --- HEADER TITLE --- */}
        <div className="max-w-7xl mx-auto px-6 pt-12 pb-10">
            <div className="flex items-center gap-4 mb-12">
                <div className="h-8 w-1 bg-blue-500"></div>
                <h1 className="text-5xl md:text-6xl font-serif font-medium text-[#1C2B4B]">
                    Builders We've Supported
                </h1>
            </div>

            {/* --- INTERACTIVE FILTER BAR --- */}
            <div className="flex flex-col md:flex-row gap-4 border-t border-b border-gray-200 py-6 items-center justify-between z-20 relative" ref={dropdownRef}>
            
            <div className="flex gap-4 w-full md:w-auto overflow-visible">
                {Object.entries(filterOptions).map(([label, options]) => {
                    const stateKey = label === "Focus Area" ? "focusArea" : label.toLowerCase();
                    const currentValue = filters[stateKey as keyof typeof filters];
                    const isOpen = activeDropdown === label;

                    return (
                        <div key={label} className="relative">
                            <button 
                                onClick={() => setActiveDropdown(isOpen ? null : label)}
                                className={`flex items-center gap-2 text-sm font-semibold uppercase tracking-wider whitespace-nowrap px-3 py-2 rounded-md transition-colors
                                    ${currentValue || isOpen ? 'text-black bg-gray-100' : 'text-gray-500 hover:text-black hover:bg-gray-50'}`}
                            >
                                {currentValue || label} 
                                <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                            </button>

                            {isOpen && (
                                <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-200 shadow-xl rounded-md overflow-hidden z-30 animate-in fade-in zoom-in-95 duration-150">
                                    {options.map((option) => (
                                        <button
                                            key={option}
                                            onClick={() => handleFilterSelect(label, option)}
                                            className="w-full text-left px-4 py-3 text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600 flex items-center justify-between"
                                        >
                                            {option}
                                            {currentValue === option && <Check className="w-4 h-4 text-blue-600" />}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    );
                })}
                
                {(filters.focusArea || filters.stage || filters.status) && (
                    <button 
                        onClick={() => setFilters({ focusArea: "", stage: "", status: "" })}
                        className="text-xs font-bold text-red-400 hover:text-red-600 uppercase tracking-widest ml-2 self-center"
                    >
                        Reset
                    </button>
                )}
            </div>

            <div className="relative w-full md:w-64">
                <input 
                type="text" placeholder="SEARCH" 
                className="w-full pl-2 pr-10 py-2 border-b border-gray-300 focus:outline-none focus:border-blue-600 uppercase text-sm tracking-widest"
                onChange={(e) => setSearchTerm(e.target.value)} 
                value={searchTerm}
                />
                <Search className="w-4 h-4 text-gray-400 absolute right-2 top-3" />
            </div>
            </div>
        </div>

        {/* --- SECTION 1: FEATURED CARDS --- */}
        {filteredFeatured.length > 0 && (
            <div className="max-w-7xl mx-auto px-6 pb-16">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {filteredFeatured.map((company) => (
                    <div
                        key={company.id}
                        id={company.name.toLowerCase().replace(/\s+/g, '').replace(/[^a-z0-9]/g, '')}
                        onClick={() => setSelectedCompany(company)}
                        className="group relative h-[400px] w-full cursor-pointer overflow-hidden rounded-sm scroll-mt-32"
                    >
                    <div className={`absolute inset-0 bg-gradient-to-br ${company.color} transition-transform duration-500 group-hover:scale-105`}>
                         <img src={company.image} alt={company.name} className="w-full h-full object-cover opacity-20 mix-blend-overlay" /> 
                    </div>
                    <div className="absolute inset-0 p-8 flex flex-col justify-between text-white">
                        <h3 className="text-3xl font-bold">{company.name}</h3> 
                        <div>
                            <p className="text-lg leading-snug font-medium opacity-95 mb-6 line-clamp-3">
                            {company.description}
                            </p>
                            <div className="flex gap-3">
                                <div className="text-xs font-bold uppercase tracking-widest opacity-80 border border-white/30 px-2 py-1 rounded-sm">
                                    {company.status}
                                </div>
                                <div className="text-xs font-bold uppercase tracking-widest opacity-80 bg-white/20 px-2 py-1 rounded-sm">
                                    {company.focusArea}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                    </div>
                ))}
                </div>
            </div>
        )}

        {/* --- SECTION 2: LOGO GRID --- */}
        <div className="max-w-7xl mx-auto px-6 pb-24">
            {filteredFeatured.length > 0 && <hr className="border-gray-200 mb-12" />}
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-1">
                {filteredLogos.map((company) => (
                <div
                    key={company.id}
                    id={company.name.toLowerCase().replace(/\s+/g, '').replace(/[^a-z0-9]/g, '')}
                    onClick={() => setSelectedCompany(company)}
                    className="group bg-white flex flex-col cursor-pointer transition-all duration-300 hover:shadow-md rounded-sm border border-gray-200 overflow-hidden scroll-mt-32"
                >
                    <div className="h-40 flex items-center justify-center p-6 relative bg-gray-50 group-hover:bg-white transition-colors">
                        <span className="text-2xl md:text-3xl font-bold text-slate-700 z-10 text-center">
                            {company.name}
                        </span>
                    </div>
                    {/* Changed: Added group-hover:bg-blue-600 and transition-colors */}
                    <div className="bg-slate-800 group-hover:bg-blue-800 transition-colors py-2 px-2 text-center h-auto min-h-[32px] flex items-center justify-center">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-white/90 leading-tight">
                            {company.status}
                        </span>
                    </div>
                </div>
                ))}
            </div>
            
            {filteredFeatured.length === 0 && filteredLogos.length === 0 && (
                <div className="text-center py-20 text-gray-400 font-bold tracking-widest uppercase">
                    No companies match your filters
                </div>
            )}
        </div>
      </div>

      {/* --- FOOTER SECTION --- */}
      <footer className="bg-[#4d4d4f] text-[#c2c2c2] text-sm py-12">
        <div className="max-w-7xl mx-auto px-6">
            <div className="mb-6 text-xs leading-relaxed opacity-80 italic font-light font-serif">
                <p>
                    Any investments or portfolio companies mentioned, referred to, or described on this page are not representative of all investments in vehicles managed by Initial Ventures...
                </p>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-end gap-8 border-t border-gray-600 pt-8">
                <div className="flex flex-col gap-4">
                    <h3 className="text-2xl font-bold text-white tracking-widest uppercase">
                        INITIAL VENTURES
                    </h3>
                    <p className="text-lg text-[#8e8e90] font-light max-w-md font-serif italic">
                        Going Infinite
                    </p>
                </div>

                <div className="flex flex-col gap-6 items-end">
                    <div className="flex gap-4">
                        <a href="https://x.com/InitialVentures" target="_blank" rel="noopener noreferrer" className="bg-[#6b6b6d] hover:bg-white hover:text-black text-white w-8 h-8 flex items-center justify-center rounded-sm transition-colors">
                            <Twitter className="w-4 h-4" />
                        </a>
                        <a href="#" className="bg-[#6b6b6d] hover:bg-white hover:text-black text-white w-8 h-8 flex items-center justify-center rounded-sm transition-colors"><Linkedin className="w-4 h-4" /></a>
                    </div>

                    <div className="flex flex-col md:flex-row gap-4 md:gap-8 text-xs font-bold tracking-widest uppercase">
                        <span>© 2026 Initial Ventures</span>
                        <div className="flex gap-4">
                            <a href="#" className="hover:text-white transition-colors">Terms of Use</a>
                            <a href="#" className="hover:text-white transition-colors">Conduct</a>
                            <a href="#" className="hover:text-white transition-colors">Disclosures</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </footer>


      {/* --- MODAL OVERLAY --- */}
      {selectedCompany && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={() => setSelectedCompany(null)} />

          <div className="relative w-full max-w-5xl bg-white shadow-2xl rounded-sm overflow-hidden flex flex-col max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in duration-300">
            <button 
                onClick={() => setSelectedCompany(null)}
                className="absolute top-6 right-6 p-2 rounded-full hover:bg-gray-100 transition-colors z-10"
            >
                <X className="w-6 h-6 text-gray-500" />
            </button>

            <div className="flex flex-col">
                <div className="relative pt-16 pb-12 px-12 border-b border-gray-100 bg-slate-50">
                     <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                     <div className="relative flex justify-center mb-8">
                        <div className="text-5xl font-bold text-slate-800 tracking-tight">
                            {selectedCompany.name}
                        </div>
                     </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 p-12">
                    <div className="md:col-span-7 space-y-12">
                        <div>
                            <h4 className="text-orange-500 font-bold text-lg mb-4">Milestones</h4>
                            <div className="space-y-2">
                                <div className="flex gap-2">
                                    <span className="font-bold text-slate-900">Current Stage:</span>
                                    <span className="text-slate-600">{selectedCompany.stage}</span>
                                </div>
                                <div className="flex gap-2">
                                    <span className="font-bold text-slate-900">Focus Area:</span>
                                    <span className="text-slate-600">{selectedCompany.focusArea}</span>
                                </div>
                                <div className="flex gap-2">
                                    <span className="font-bold text-slate-900">Status:</span>
                                    <span className="text-slate-600">{selectedCompany.status}</span>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h4 className="text-orange-500 font-bold text-lg mb-4">Company Profile</h4>
                            <p className="text-slate-600 leading-relaxed text-lg">
                                {selectedCompany.description}
                                <br /><br />
                                {selectedCompany.longDescription || `${selectedCompany.name} is an industry leader redefining the landscape of their sector through innovative technology.`}
                            </p>
                        </div>

                        <div>
                            <h4 className="text-orange-500 font-bold text-lg mb-4">Investment News</h4>
                            <div className="bg-slate-50 border border-slate-100 flex flex-col sm:flex-row gap-6 p-6 rounded-lg hover:shadow-md transition-shadow cursor-pointer group">
                                <div className={`w-full sm:w-32 h-24 rounded-md bg-gradient-to-br ${selectedCompany.color || 'from-gray-300 to-gray-500'} flex-shrink-0`}></div>
                                <div className="flex flex-col justify-center">
                                    <h5 className="font-bold text-slate-900 text-lg mb-2 group-hover:text-blue-600 transition-colors">
                                        {selectedCompany.newsTitle || `Why we invested in ${selectedCompany.name}`}
                                    </h5>
                                    <p className="text-slate-500 text-sm mb-3 line-clamp-2">
                                        {selectedCompany.newsSnippet || "Read about the journey, the founders, and the vision that drove our decision to partner with this incredible team."}
                                    </p>
                                    <div className="flex items-center text-blue-600 font-bold text-sm uppercase tracking-wider">
                                        Read More <ArrowRight className="w-4 h-4 ml-2" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="md:col-span-5 space-y-12">
                        <div>
                            <h4 className="text-orange-500 font-bold text-lg mb-4">Builders</h4>
                            <p className="text-slate-900 font-medium text-lg border-l-4 border-gray-200 pl-4">
                                {selectedCompany.founders || "Founding Team"}
                            </p>
                        </div>

                        <div className="flex gap-3">
                            {selectedCompany.websiteUrl ? (
                              <a href={selectedCompany.websiteUrl} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-blue-400 hover:bg-blue-600 text-white flex items-center justify-center rounded-sm transition-colors">
                                <Globe className="w-5 h-5" />
                              </a>
                            ) : (
                              <div className="w-10 h-10 bg-gray-200 text-gray-400 flex items-center justify-center rounded-sm cursor-not-allowed"><Globe className="w-5 h-5" /></div>
                            )}

                            {selectedCompany.twitterUrl ? (
                              <a href={selectedCompany.twitterUrl} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-blue-400 hover:bg-blue-600 text-white flex items-center justify-center rounded-sm transition-colors">
                                <Twitter className="w-5 h-5" />
                              </a>
                            ) : (
                              <div className="w-10 h-10 bg-gray-200 text-gray-400 flex items-center justify-center rounded-sm cursor-not-allowed"><Twitter className="w-5 h-5" /></div>
                            )}

                            {[Linkedin, Instagram, Facebook].map((Icon, i) => (
                                <div key={i} className="w-10 h-10 bg-gray-200 text-gray-400 flex items-center justify-center rounded-sm cursor-not-allowed">
                                    <Icon className="w-5 h-5" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
          </div>
        </div>
      )}

    </main>
    </>
  );
}