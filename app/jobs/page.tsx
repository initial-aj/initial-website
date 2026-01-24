'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Menu,
  X,
  Search,
  MapPin,
  Briefcase,
  DollarSign,
  Clock,
  Building2,
  Filter,
  ChevronDown,
  Twitter,
  Linkedin
} from 'lucide-react';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import SearchModal from '@/components/SearchModal';

// Job type definition
interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  type: string; // Full-time, Part-time, Contract
  category: string; // Engineering, Marketing, etc.
  salary: string;
  postedDate: string;
  description: string;
  requirements: string[];
  applyUrl: string;
}

// Sample job data
const sampleJobs: Job[] = [
  {
    id: 1,
    title: "Senior Smart Contract Engineer",
    company: "Backpack",
    location: "Remote",
    type: "Full-time",
    category: "Engineering",
    salary: "$150k - $250k",
    postedDate: "2024-01-20",
    description: "Join our team to build the next generation of blockchain infrastructure.",
    requirements: ["5+ years of Solidity experience", "Strong understanding of DeFi protocols", "Experience with Rust"],
    applyUrl: "#"
  },
  {
    id: 2,
    title: "Product Marketing Manager",
    company: "Solayer",
    location: "San Francisco, CA",
    type: "Full-time",
    category: "Marketing",
    salary: "$120k - $180k",
    postedDate: "2024-01-18",
    description: "Drive marketing strategy for our restaking protocol.",
    requirements: ["3+ years in product marketing", "Web3 experience preferred", "Strong analytical skills"],
    applyUrl: "#"
  },
  {
    id: 3,
    title: "Frontend Developer",
    company: "RateX",
    location: "Remote",
    type: "Full-time",
    category: "Engineering",
    salary: "$100k - $150k",
    postedDate: "2024-01-15",
    description: "Build beautiful and performant user interfaces for our DeFi platform.",
    requirements: ["React/Next.js expertise", "TypeScript proficiency", "Web3.js or Ethers.js experience"],
    applyUrl: "#"
  },
  {
    id: 4,
    title: "Community Manager",
    company: "Lombard",
    location: "Remote",
    type: "Part-time",
    category: "Community",
    salary: "$60k - $90k",
    postedDate: "2024-01-12",
    description: "Engage and grow our community across social platforms.",
    requirements: ["2+ years in community management", "Crypto-native", "Excellent communication skills"],
    applyUrl: "#"
  }
];

export default function JobsPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [showSubmitForm, setShowSubmitForm] = useState(false);
  const [jobs] = useState<Job[]>(sampleJobs);

  // Form states
  const [jobForm, setJobForm] = useState({
    title: '',
    company: '',
    location: '',
    type: 'Full-time',
    category: 'Engineering',
    salary: '',
    description: '',
    requirements: '',
    applyUrl: ''
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === 'All' || job.type === selectedType;
    const matchesCategory = selectedCategory === 'All' || job.category === selectedCategory;
    const matchesLocation = selectedLocation === 'All' || job.location.includes(selectedLocation);

    return matchesSearch && matchesType && matchesCategory && matchesLocation;
  });

  const handleSubmitJob = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send this to an API
    console.log('Job submitted:', jobForm);
    alert('Thank you! Your job posting has been submitted for review.');
    setShowSubmitForm(false);
    setJobForm({
      title: '',
      company: '',
      location: '',
      type: 'Full-time',
      category: 'Engineering',
      salary: '',
      description: '',
      requirements: '',
      applyUrl: ''
    });
  };

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
            <Link href="/jobs" className="text-slate-900 font-bold transition-colors">Jobs</Link>
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
          <h1 className="text-5xl md:text-6xl font-serif font-medium text-[#1C2B4B]">
            Career Opportunities
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl">
            Join the teams building the future of Web3. Explore opportunities across our portfolio companies.
          </p>
        </div>

        {/* Submit Job Button */}
        <div className="mb-8 flex justify-between items-center">
          <button
            onClick={() => setShowSubmitForm(!showSubmitForm)}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors shadow-md"
          >
            {showSubmitForm ? 'Cancel' : 'Post a Job'}
          </button>
          <div className="text-sm text-slate-600">
            <span className="font-semibold text-slate-900">{filteredJobs.length}</span> {filteredJobs.length === 1 ? 'position' : 'positions'} available
          </div>
        </div>

        {/* Job Submission Form */}
        {showSubmitForm && (
          <div className="mb-12 bg-white rounded-xl shadow-lg p-8 border border-slate-200">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Submit a Job Posting</h2>
            <form onSubmit={handleSubmitJob} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Job Title *</label>
                  <input
                    type="text"
                    required
                    value={jobForm.title}
                    onChange={(e) => setJobForm({...jobForm, title: e.target.value})}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    placeholder="e.g. Senior Smart Contract Engineer"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Company *</label>
                  <input
                    type="text"
                    required
                    value={jobForm.company}
                    onChange={(e) => setJobForm({...jobForm, company: e.target.value})}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    placeholder="Your Company"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Location *</label>
                  <input
                    type="text"
                    required
                    value={jobForm.location}
                    onChange={(e) => setJobForm({...jobForm, location: e.target.value})}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    placeholder="e.g. Remote, San Francisco, etc."
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Job Type *</label>
                  <select
                    value={jobForm.type}
                    onChange={(e) => setJobForm({...jobForm, type: e.target.value})}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  >
                    <option>Full-time</option>
                    <option>Part-time</option>
                    <option>Contract</option>
                    <option>Internship</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Category *</label>
                  <select
                    value={jobForm.category}
                    onChange={(e) => setJobForm({...jobForm, category: e.target.value})}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  >
                    <option>Engineering</option>
                    <option>Marketing</option>
                    <option>Design</option>
                    <option>Community</option>
                    <option>Operations</option>
                    <option>Business Development</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Salary Range</label>
                  <input
                    type="text"
                    value={jobForm.salary}
                    onChange={(e) => setJobForm({...jobForm, salary: e.target.value})}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    placeholder="e.g. $100k - $150k"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Job Description *</label>
                <textarea
                  required
                  rows={4}
                  value={jobForm.description}
                  onChange={(e) => setJobForm({...jobForm, description: e.target.value})}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  placeholder="Describe the role, responsibilities, and what makes this opportunity unique..."
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Requirements (one per line)</label>
                <textarea
                  rows={4}
                  value={jobForm.requirements}
                  onChange={(e) => setJobForm({...jobForm, requirements: e.target.value})}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  placeholder="e.g.&#10;5+ years of experience in...&#10;Strong understanding of...&#10;Experience with..."
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Application URL *</label>
                <input
                  type="url"
                  required
                  value={jobForm.applyUrl}
                  onChange={(e) => setJobForm({...jobForm, applyUrl: e.target.value})}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  placeholder="https://..."
                />
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors shadow-md"
                >
                  Submit Job Posting
                </button>
                <button
                  type="button"
                  onClick={() => setShowSubmitForm(false)}
                  className="px-8 py-3 bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold rounded-lg transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Search and Filters */}
        <div className="mb-8 bg-white rounded-xl shadow-md p-6 border border-slate-200">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search jobs, companies, keywords..."
                  className="w-full pl-11 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
              </div>
            </div>

            {/* Filters */}
            <div className="flex gap-3">
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white"
              >
                <option>All</option>
                <option>Full-time</option>
                <option>Part-time</option>
                <option>Contract</option>
                <option>Internship</option>
              </select>

              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white"
              >
                <option>All</option>
                <option>Engineering</option>
                <option>Marketing</option>
                <option>Design</option>
                <option>Community</option>
                <option>Operations</option>
                <option>Business Development</option>
              </select>

              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white"
              >
                <option>All</option>
                <option>Remote</option>
                <option>San Francisco</option>
                <option>New York</option>
                <option>London</option>
                <option>Singapore</option>
              </select>
            </div>
          </div>
        </div>

        {/* Job Listings */}
        <div className="space-y-4">
          {filteredJobs.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-xl border border-slate-200">
              <p className="text-xl text-slate-600">No jobs found matching your criteria.</p>
            </div>
          ) : (
            filteredJobs.map(job => (
              <div key={job.id} className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-slate-200 group">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {job.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600 mb-3">
                      <div className="flex items-center gap-1">
                        <Building2 className="w-4 h-4" />
                        <span className="font-semibold">{job.company}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Briefcase className="w-4 h-4" />
                        <span>{job.type}</span>
                      </div>
                      {job.salary && (
                        <div className="flex items-center gap-1">
                          <DollarSign className="w-4 h-4" />
                          <span>{job.salary}</span>
                        </div>
                      )}
                    </div>
                    <p className="text-slate-700 mb-3">{job.description}</p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">
                        {job.category}
                      </span>
                      <span className="px-3 py-1 bg-orange-100 text-orange-700 text-xs font-semibold rounded-full flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        Posted {new Date(job.postedDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <div>
                    <a
                      href={job.applyUrl}
                      className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors shadow-md whitespace-nowrap"
                    >
                      Apply Now
                    </a>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12 mt-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <h3 className="text-xl font-bold uppercase tracking-widest mb-2">Initial Ventures</h3>
              <p className="text-slate-400">Building the future of Web3</p>
            </div>
            <div className="flex gap-4">
              <a href="https://x.com/InitialVentures" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">
                <Twitter className="w-6 h-6" />
              </a>
              <a href="#" className="hover:text-blue-400 transition-colors">
                <Linkedin className="w-6 h-6" />
              </a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-slate-700 text-center text-slate-400 text-sm">
            © 2024 Initial Ventures. All rights reserved.
          </div>
        </div>
      </footer>
    </main>
    </>
  );
}
