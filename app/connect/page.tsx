"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Globe,
  Moon,
  Search,
  Menu,
  X,
  Twitter,
  Linkedin,
  Facebook,
  Instagram,
  Youtube,
  Check,
  ChevronDown
} from 'lucide-react';



export default function ContactPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Renamed to match Portfolio page logic
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    topic: '',
    message: ''
  });

// change the tab title instantly
  useEffect(() => {
    document.title = "Connect | Initial Ventures";
  }, []);

  // Prevent scrolling when sidebar is open
  useEffect(() => {
    if (isSidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isSidebarOpen]);

  const topics = ["Investment", "Pitch", "Press", "General Inquiry"];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Thank you for reaching out. We will get back to you shortly.");
    console.log(formData);
  };

  return (
    <main className="min-h-screen bg-[#FBFBFB] text-slate-900 font-sans selection:bg-orange-200 flex flex-col"style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
      
      {/* ================= NAVIGATION BAR ================= */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-sm py-4">
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
            <Link href="#" className="hover:text-slate-900 transition-colors">Insights</Link>
            <Link href="#" className="hover:text-slate-900 transition-colors">Policy</Link>
            <Link href="#" className="hover:text-slate-900 transition-colors">Careers</Link>
          </div>

          <div className="flex items-center gap-4">
             <div className="hidden md:flex gap-2">
                <button className="p-2 text-slate-600 hover:text-slate-900 transition-colors"><Globe className="w-5 h-5" /></button>
                <button className="p-2 text-slate-600 hover:text-slate-900 transition-colors"><Moon className="w-5 h-5" /></button>
             </div>
             <button className="p-2 text-slate-600 hover:text-slate-900 transition-colors"><Search className="w-5 h-5" /></button>
             
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

      {/* ================= SIDEBAR NAVIGATION (Matches Portfolio Page) ================= */}
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
                        <li><a href="#" className="hover:text-blue-600 transition-colors">Team</a></li>
                        <li><a href="#" className="hover:text-blue-600 transition-colors">Jobs</a></li>
                        <li><a href="#" className="hover:text-blue-600 transition-colors">Connect</a></li>
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
                    <a href="#" className="bg-blue-400 hover:bg-blue-600 text-white w-10 h-10 flex items-center justify-center rounded-sm transition-colors"><Facebook className="w-5 h-5" /></a>
                    <a href="#" className="bg-blue-400 hover:bg-blue-600 text-white w-10 h-10 flex items-center justify-center rounded-sm transition-colors"><Instagram className="w-5 h-5" /></a>
                    <a href="#" className="bg-blue-400 hover:bg-blue-600 text-white w-10 h-10 flex items-center justify-center rounded-sm transition-colors"><Youtube className="w-5 h-5" /></a>
                </div>
            </div>
        </div>
      </div>

      {/* Spacer */}
      <div className="h-24"></div>

      {/* ================= CONTACT CONTENT ================= */}
      <section className="flex-grow max-w-7xl mx-auto px-6 py-12 md:py-20 w-full">
        
        {/* Page Title */}
        <div className="flex items-center gap-4 mb-16">
            <div className="h-8 w-1 bg-blue-700"></div>
            <h1 className="text-5xl md:text-6xl font-serif font-medium text-[#1C2B4B]">
                Connect
            </h1>
        </div>

        {/* UPDATED GRID: 12-Column Layout for resizing */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
            
            {/* LEFT COLUMN: Smaller (Spans 4 of 12 columns = 33%) */}
            <div className="space-y-7 lg:col-span-4">
                <div className="prose prose-lg text-slate-600 font-light leading-relaxed">
                    <p className="text-lg">
                        We look forward to hearing about your ideas and learning more about your products.
                    </p>
                </div>
            </div>

            {/* RIGHT COLUMN: Bigger (Spans 8 of 12 columns = 66%) */}
            <div className="bg-white p-8 md:p-10 border border-gray-200 rounded-sm shadow-sm lg:col-span-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-slate-500">First Name*</label>
                            <input 
                                type="text" 
                                required
                                className="w-full bg-gray-50 border border-gray-300 p-3 text-slate-900 focus:outline-none focus:border-slate-900 focus:bg-white transition-colors rounded-sm"
                                value={formData.firstName}
                                onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Last Name*</label>
                            <input 
                                type="text" 
                                required
                                className="w-full bg-gray-50 border border-gray-300 p-3 text-slate-900 focus:outline-none focus:border-slate-900 focus:bg-white transition-colors rounded-sm"
                                value={formData.lastName}
                                onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Email*</label>
                        <input 
                            type="email" 
                            required
                            className="w-full bg-gray-50 border border-gray-300 p-3 text-slate-900 focus:outline-none focus:border-slate-900 focus:bg-white transition-colors rounded-sm"
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Company / Organization*</label>
                        <input 
                            type="text" 
                            required
                            className="w-full bg-gray-50 border border-gray-300 p-3 text-slate-900 focus:outline-none focus:border-slate-900 focus:bg-white transition-colors rounded-sm"
                            value={formData.company}
                            onChange={(e) => setFormData({...formData, company: e.target.value})}
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Select Topic of Interest*</label>
                        <div className="grid grid-cols-2 gap-3">
                            {topics.map((topic) => (
                                <button
                                    key={topic}
                                    type="button"
                                    onClick={() => setFormData({...formData, topic})}
                                    className={`py-3 px-4 text-sm font-bold uppercase tracking-wide border rounded-sm transition-all
                                        ${formData.topic === topic 
                                            ? 'bg-slate-900 text-white border-slate-900' 
                                            : 'bg-white text-slate-600 border-gray-300 hover:border-slate-500'
                                        }`}
                                >
                                    {topic}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Message*</label>
                        <textarea 
                            required
                            rows={6}
                            className="w-full bg-gray-50 border border-gray-300 p-3 text-slate-900 focus:outline-none focus:border-slate-900 focus:bg-white transition-colors rounded-sm resize-none"
                            value={formData.message}
                            onChange={(e) => setFormData({...formData, message: e.target.value})}
                        />
                    </div>

                    <div className="pt-4">
                        <button 
                            type="submit" 
                            className="w-full md:w-auto px-10 py-4 bg-slate-900 text-white font-bold uppercase tracking-widest text-sm hover:bg-slate-800 transition-colors rounded-sm"
                        >
                            Submit Inquiry
                        </button>
                    </div>

                </form>
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
                        <a href="#" className="bg-[#2a3f6b] hover:bg-white hover:text-[#1C2B4B] text-white w-10 h-10 flex items-center justify-center rounded-sm transition-colors"><Twitter className="w-5 h-5" /></a>
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
  );
}