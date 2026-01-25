"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area
} from 'recharts';
import { ShieldAlert, TrendingUp, Activity, Lock, Search, Menu, X } from 'lucide-react';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import SearchModal from '@/components/SearchModal';

// --- Social Media Icons ---
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

// --- Types ---
interface Metrics {
  cagr: string;
  maxDrawdown: string;
  calmar: string;
  sharpe: string;
}

interface ChartPoint {
  date: string;
  ultronNav: number;
  btcNav: number;
}

interface StrategyData {
  chartData: ChartPoint[];
  metrics: Metrics;
}

export default function UltronPage() {
  const [data, setData] = useState<StrategyData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Scroll handler
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Change the tab title
  useEffect(() => {
    document.title = "Ultron Fund | Initial Ventures";
  }, []);

  // Prevent scrolling when sidebar is open
  useEffect(() => {
    if (isSidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isSidebarOpen]);

  // Fetch data
  useEffect(() => {
    fetch('/api/ultron')
      .then(res => {
        if (!res.ok) throw new Error(`Server Error: ${res.statusText}`);
        return res.json();
      })
      .then((json: StrategyData) => {
        setData(json);
        setLoading(false);
      })
      .catch(err => {
        console.error("Fetch error:", err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="min-h-screen bg-[#FBFBFB] text-slate-900 flex items-center justify-center">Loading Ultron Strategy Data...</div>;
  if (error) return <div className="min-h-screen bg-[#FBFBFB] text-red-500 flex items-center justify-center">Error: {error}</div>;
  if (!data) return null;

  const { chartData, metrics } = data;

  return (
    <>
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      <main className="min-h-screen bg-[#FBFBFB] text-slate-900 font-sans selection:bg-orange-200 flex flex-col" style={{ fontFamily: 'Inter, sans-serif' }}>

        {/* ================= NAVIGATION BAR ================= */}
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'}`}>
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

              {/* Trigger Sidebar */}
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="p-2 hover:bg-slate-100 rounded-md transition-colors border border-slate-200"
              >
                <Menu className="w-6 h-6 text-slate-900" />
              </button>
            </div>
          </div>
        </nav>

        {/* ================= SIDEBAR NAVIGATION ================= */}
        {/* Backdrop */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-[60] transition-opacity duration-300"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Sidebar Panel */}
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
                  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Spacer */}
        <div className="h-24"></div>

        {/* ================= MAIN CONTENT ================= */}
        <section className="flex-grow max-w-7xl mx-auto px-6 py-12 md:py-20 w-full">
          {/* Page Title */}
          <div className="flex items-center gap-4 mb-8">
            <div className="h-8 w-1 bg-blue-500"></div>
            <h1 className="text-5xl md:text-6xl font-serif font-medium text-[#1C2B4B]">
              Ultron Fund
            </h1>
          </div>

          <p className="text-xl text-slate-600 font-light max-w-3xl mb-16 leading-relaxed">
            An automated quantitative strategy leveraging volatility indexing and machine learning to outperform BTC.
          </p>

          {/* Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
            <MetricCard
              label="CAGR"
              value={metrics.cagr}
              sub="Annualized Return"
              icon={<TrendingUp className="text-blue-500" />}
            />
            <MetricCard
              label="Max Drawdown"
              value={metrics.maxDrawdown}
              sub="Risk Management"
              icon={<ShieldAlert className="text-orange-500" />}
            />
            <MetricCard
              label="Calmar Ratio"
              value={metrics.calmar}
              sub="Return vs Risk"
              icon={<Activity className="text-teal-500" />}
            />
            <MetricCard
              label="Sharpe Ratio"
              value={metrics.sharpe}
              sub="Risk-Adjusted Return"
              icon={<Lock className="text-purple-500" />}
            />
          </div>

          {/* Chart 1: Equity Curve */}
          <div className="bg-white p-8 rounded-lg border border-gray-200 shadow-sm mb-12">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
              <div>
                <h2 className="text-2xl font-serif font-medium text-[#1C2B4B] mb-2">Performance vs Benchmark</h2>
                <p className="text-sm text-slate-500">Cumulative returns comparison over time</p>
              </div>
              <div className="flex gap-6 text-sm">
                <span className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-slate-600 font-medium">Ultron</span>
                </span>
                <span className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                  <span className="text-slate-600 font-medium">BTC</span>
                </span>
              </div>
            </div>

            <div className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                  <XAxis
                    dataKey="date"
                    stroke="#94a3b8"
                    tickFormatter={(val: string) => {
                      const date = new Date(val);
                      return `${date.getFullYear()}/${String(date.getMonth() + 1).padStart(2, '0')}`;
                    }}
                    minTickGap={50}
                    style={{ fontSize: '12px' }}
                  />
                  <YAxis
                    stroke="#94a3b8"
                    domain={[0.8, 'auto']}
                    label={{ value: 'Normalized NAV', angle: -90, position: 'insideLeft', style: { fontSize: '12px', fill: '#64748b' } }}
                    style={{ fontSize: '12px' }}
                  />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#fff', borderColor: '#e5e7eb', borderRadius: '8px' }}
                    labelStyle={{ color: '#1e293b', fontWeight: 600 }}
                    formatter={(value: any) => Number(value).toFixed(2) + "x"}
                  />
                  <Line
                    type="monotone"
                    dataKey="ultronNav"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    dot={false}
                    name="Ultron Strategy"
                  />
                  <Line
                    type="monotone"
                    dataKey="btcNav"
                    stroke="#9ca3af"
                    strokeWidth={2}
                    dot={false}
                    name="BTC"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Chart 2: Area Chart */}
          <div className="bg-white p-8 rounded-lg border border-gray-200 shadow-sm">
            <div className="mb-8">
              <h2 className="text-2xl font-serif font-medium text-[#1C2B4B] mb-2">Strategy Growth</h2>
              <p className="text-sm text-slate-500">Visualizing the compounding effect over time</p>
            </div>

            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorGrowth" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                  <XAxis dataKey="date" hide />
                  <YAxis stroke="#94a3b8" domain={[0.8, 'auto']} style={{ fontSize: '12px' }} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#fff', borderColor: '#e5e7eb', borderRadius: '8px' }}
                    labelStyle={{ color: '#1e293b', fontWeight: 600 }}
                    formatter={(value: any) => Number(value).toFixed(2) + "x"}
                  />
                  <Area
                    type="monotone"
                    dataKey="ultronNav"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorGrowth)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </section>

        {/* ================= FOOTER ================= */}
        <footer className="bg-[#1C2B4B] text-[#c2c2c2] text-sm py-16 font-sans mt-auto">
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
                  <a href="#" className="bg-[#2a3f6b] hover:bg-white hover:text-[#1C2B4B] text-white w-10 h-10 flex items-center justify-center rounded-sm transition-colors">
                    <DiscordIcon className="w-5 h-5" />
                  </a>
                  <a href="#" className="bg-[#2a3f6b] hover:bg-white hover:text-[#1C2B4B] text-white w-10 h-10 flex items-center justify-center rounded-sm transition-colors">
                    <TelegramIcon className="w-5 h-5" />
                  </a>
                  <a href="https://x.com/InitialVentures" target="_blank" rel="noopener noreferrer" className="bg-[#2a3f6b] hover:bg-white hover:text-[#1C2B4B] text-white w-10 h-10 flex items-center justify-center rounded-sm transition-colors">
                    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                  </a>
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

// Helper Component
function MetricCard({ label, value, sub, icon }: { label: string, value: string, sub: string, icon: React.ReactNode }) {
  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md hover:border-blue-300 transition-all">
      <div className="flex justify-between items-start mb-4">
        <span className="text-slate-500 text-sm font-bold uppercase tracking-wider">{label}</span>
        {icon}
      </div>
      <div className="text-3xl font-bold text-[#1C2B4B] mb-1">{value}</div>
      <div className="text-xs text-slate-500 font-medium">{sub}</div>
    </div>
  );
}