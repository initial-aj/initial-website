"use client";

import { useEffect, useState } from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area 
} from 'recharts';
import { ShieldAlert, TrendingUp, Activity, Lock } from 'lucide-react';

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

  if (loading) return <div className="min-h-screen bg-[#0A0A0A] text-white flex items-center justify-center">Loading Strategy Data...</div>;
  if (error) return <div className="min-h-screen bg-[#0A0A0A] text-red-500 flex items-center justify-center">Error: {error}</div>;
  if (!data) return null;

  const { chartData, metrics } = data;

  return (
    <main className="min-h-screen bg-[#0A0A0A] text-white font-sans">
      <div className="max-w-7xl mx-auto px-6 py-20">
        <h1 className="text-5xl font-serif mb-6">Ultron Fund</h1>
        <p className="text-xl text-gray-400 max-w-2xl mb-12">
          An automated quantitative strategy leveraging volatility indexing and machine learning to outperform BTC.
        </p>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-20">
          <MetricCard 
            label="CAGR" 
            value={metrics.cagr} 
            sub="Annualized Return" 
            icon={<TrendingUp className="text-teal-400" />} 
          />
          <MetricCard 
            label="Max Drawdown" 
            value={metrics.maxDrawdown} 
            sub="Better than BTC (-36%)" 
            icon={<ShieldAlert className="text-red-400" />} 
          />
          <MetricCard 
            label="Calmar Ratio" 
            value={metrics.calmar} 
            sub="Return vs Risk" 
            icon={<Activity className="text-blue-400" />} 
          />
          <MetricCard 
            label="Sharpe Ratio" 
            value={metrics.sharpe} 
            sub="Risk-Adjusted Return" 
            icon={<Lock className="text-purple-400" />} 
          />
        </div>

        {/* Chart 1: Equity Curve */}
        <div className="bg-[#111] p-8 rounded-2xl border border-gray-800 mb-12">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-semibold">Performance vs Benchmark</h2>
            <div className="flex gap-4 text-sm">
              <span className="flex items-center gap-2">
                <div className="w-3 h-3 bg-teal-400 rounded-full"></div> Ultron
              </span>
              <span className="flex items-center gap-2">
                <div className="w-3 h-3 bg-gray-500 rounded-full"></div> BTC
              </span>
            </div>
          </div>
          
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                <XAxis 
                  dataKey="date" 
                  stroke="#666" 
                  tickFormatter={(val: string) => val.slice(5)} 
                  minTickGap={30}
                />
                <YAxis stroke="#666" domain={['auto', 'auto']} />
                <Tooltip 
                    contentStyle={{ backgroundColor: '#111', borderColor: '#333' }}
                    // Change 'value: number' to 'value: any' and wrap in Number() for safety
                    formatter={(value: any) => Number(value).toFixed(2) + "x"}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Area Chart */}
        <div className="bg-[#111] p-8 rounded-2xl border border-gray-800">
          <h2 className="text-2xl font-semibold mb-2">Strategy Growth</h2>
          <p className="text-gray-400 mb-8 text-sm">Visualizing the compounding effect over time.</p>
          
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorGrowth" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2dd4bf" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#2dd4bf" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                <XAxis dataKey="date" hide />
                <YAxis stroke="#666" />
                <Tooltip contentStyle={{ backgroundColor: '#111', borderColor: '#333' }} />
                <Area 
                  type="monotone" 
                  dataKey="ultronNav" 
                  stroke="#2dd4bf" 
                  fillOpacity={1} 
                  fill="url(#colorGrowth)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </main>
  );
}

// Helper Component
function MetricCard({ label, value, sub, icon }: { label: string, value: string, sub: string, icon: React.ReactNode }) {
  return (
    <div className="bg-[#111] p-6 rounded-xl border border-gray-800 hover:border-teal-500/30 transition-all">
      <div className="flex justify-between items-start mb-4">
        <span className="text-gray-400 text-sm font-medium">{label}</span>
        {icon}
      </div>
      <div className="text-3xl font-bold text-white mb-1">{value}</div>
      <div className="text-xs text-gray-500">{sub}</div>
    </div>
  );
}