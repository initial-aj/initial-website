'use client';

import { useState, useEffect, useRef } from 'react';
import { Search, X, Filter, Building2, MapPin, Briefcase, Tag } from 'lucide-react';
import Link from 'next/link';
import { useTranslation } from '@/hooks/useTranslation';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const modalRef = useRef<HTMLDivElement>(null);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  // Sample search data - in a real app, this would come from an API
  const searchableContent = [
    { type: 'Company', name: 'Backpack Exchange', category: 'Exchange', status: 'Active', url: '/portfolio#backpackexchange' },
    { type: 'Company', name: 'Solayer SVM', category: 'DeFi', status: 'Active', url: '/portfolio#solayersvm' },
    { type: 'Company', name: 'RateX_Dex', category: 'DeFi', status: 'Active', url: '/portfolio#ratex_dex' },
    { type: 'Company', name: 'Lombard Finance', category: 'BTC', status: 'Active', url: '/portfolio#lombardfinance' },
    { type: 'Company', name: 'Raiku', category: 'Infrastructure', status: 'Active', url: '/portfolio#raiku' },
    { type: 'Company', name: 'Primus Labs', category: 'Infrastructure', status: 'Active', url: '/portfolio#primuslabs' },
    { type: 'Company', name: 'Perena', category: 'DeFi', status: 'Active', url: '/portfolio#perena' },
    { type: 'Company', name: 'StackingDAO', category: 'DeFi', status: 'Active', url: '/portfolio#stackingdao' },
    { type: 'Company', name: 'ZEUS Network', category: 'Crosschain', status: 'Active', url: '/portfolio#zeusnetwork' },
    { type: 'Company', name: 'Titan Exchange', category: 'Exchange', status: 'Active', url: '/portfolio#titanexchange' },
    { type: 'Company', name: 'OpenEden', category: 'RWA', status: 'Active', url: '/portfolio#openeden' },
    { type: 'Company', name: 'Sidekick', category: 'Consumer', status: 'Active', url: '/portfolio#sidekick' },
    { type: 'Company', name: 'BitFlow', category: 'DeFi', status: 'Active', url: '/portfolio#bitflow' },
    { type: 'Page', name: 'Portfolio', category: 'Navigation', status: 'Active', url: '/portfolio' },
    { type: 'Page', name: 'Jobs', category: 'Navigation', status: 'Active', url: '/jobs' },
    { type: 'Page', name: 'Connect', category: 'Navigation', status: 'Active', url: '/connect' },
    { type: 'Page', name: 'Insights', category: 'Navigation', status: 'Active', url: '/insights' },
    { type: 'Fund', name: 'Ultron Fund', category: 'Quantitative', status: 'Active', url: '/ultron' },
    { type: 'Fund', name: 'Venture Fund', category: 'Venture', status: 'Active', url: '/' },
  ];

  const filteredResults = searchableContent.filter(item => {
    const matchesQuery = searchQuery === '' ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesType = selectedType === 'All' || item.type === selectedType;
    const matchesStatus = selectedStatus === 'All' || item.status === selectedStatus;

    return matchesQuery && matchesCategory && matchesType && matchesStatus;
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-start justify-center pt-20 px-4">
      <div
        ref={modalRef}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[80vh] overflow-hidden animate-in fade-in slide-in-from-top-4 duration-200"
      >
        {/* Header */}
        <div className="border-b border-slate-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-slate-900">{t('search.title')}</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              aria-label="Close search"
            >
              <X className="w-6 h-6 text-slate-600" />
            </button>
          </div>

          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              autoFocus
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('search.placeholder')}
              className="w-full pl-12 pr-4 py-3 border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-lg"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="border-b border-slate-200 p-6 bg-slate-50">
          <div className="flex items-center gap-2 mb-3">
            <Filter className="w-4 h-4 text-slate-600" />
            <span className="text-sm font-semibold text-slate-700 uppercase tracking-wide">{t('search.filters')}</span>
          </div>
          <div className="flex flex-wrap gap-3">
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white text-sm"
            >
              <option>All Types</option>
              <option>Company</option>
              <option>Page</option>
              <option>Fund</option>
            </select>

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white text-sm"
            >
              <option>All Categories</option>
              <option>DeFi</option>
              <option>Exchange</option>
              <option>Infrastructure</option>
              <option>BTC</option>
              <option>Navigation</option>
              <option>Quantitative</option>
              <option>Venture</option>
            </select>

            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white text-sm"
            >
              <option>All Status</option>
              <option>Active</option>
              <option>Archived</option>
            </select>

            {(selectedType !== 'All' || selectedCategory !== 'All' || selectedStatus !== 'All') && (
              <button
                onClick={() => {
                  setSelectedType('All');
                  setSelectedCategory('All');
                  setSelectedStatus('All');
                }}
                className="px-4 py-2 text-sm text-blue-600 hover:text-blue-700 font-semibold"
              >
                Clear Filters
              </button>
            )}
          </div>
        </div>

        {/* Results */}
        <div className="overflow-y-auto max-h-96 p-6">
          {filteredResults.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <p className="text-xl font-semibold text-slate-900 mb-2">No results found</p>
              <p className="text-slate-600">Try adjusting your search or filters</p>
            </div>
          ) : (
            <div className="space-y-2">
              <p className="text-sm text-slate-600 mb-4">
                {filteredResults.length} {filteredResults.length === 1 ? 'result' : 'results'} found
              </p>
              {filteredResults.map((result, index) => (
                <Link
                  key={index}
                  href={result.url}
                  onClick={onClose}
                  className="block p-4 rounded-lg hover:bg-slate-50 border border-slate-200 hover:border-blue-300 transition-all group"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        {result.type === 'Company' && <Building2 className="w-4 h-4 text-blue-600" />}
                        {result.type === 'Page' && <MapPin className="w-4 h-4 text-green-600" />}
                        {result.type === 'Fund' && <Briefcase className="w-4 h-4 text-purple-600" />}
                        <h3 className="text-lg font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
                          {result.name}
                        </h3>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-slate-600">
                        <span className="flex items-center gap-1">
                          <Tag className="w-3 h-3" />
                          {result.type}
                        </span>
                        <span>•</span>
                        <span>{result.category}</span>
                      </div>
                    </div>
                    <div className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full font-semibold">
                      {result.status}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-slate-200 p-4 bg-slate-50">
          <div className="flex items-center justify-between text-sm text-slate-600">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <kbd className="px-2 py-1 bg-white border border-slate-300 rounded text-xs font-mono">ESC</kbd>
                to close
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-2 py-1 bg-white border border-slate-300 rounded text-xs font-mono">↑</kbd>
                <kbd className="px-2 py-1 bg-white border border-slate-300 rounded text-xs font-mono">↓</kbd>
                to navigate
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
