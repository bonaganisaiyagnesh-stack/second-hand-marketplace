import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Search,
  SlidersHorizontal,
  ArrowUpDown,
  X,
  RotateCcw,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Filter,
} from 'lucide-react';
import { Product, Category, ConditionType, ProductStatus } from '../types';
import { formatINR } from '../utils/currency';
import { api } from '../services/api';
import { ProductCard } from '../components/ProductCard';
import { SkeletonCard } from '../components/SkeletonCard';
import { ConditionBadge } from '../components/ConditionBadge';

const ITEMS_PER_PAGE = 8;

export const BrowsePage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters State
  const [search, setSearch] = useState(searchParams.get('q') || '');
  const [selectedCategory, setSelectedCategory] = useState<string>(
    searchParams.get('category') || 'all'
  );
  const [selectedCondition, setSelectedCondition] = useState<ConditionType | 'all'>(
    (searchParams.get('condition') as ConditionType) || 'all'
  );
  const [statusFilter, setStatusFilter] = useState<ProductStatus | 'all'>('all');
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(1000000);
  const [negotiableOnly, setNegotiableOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<'newest' | 'price-asc' | 'price-desc' | 'deal-score' | 'views'>('newest');

  // UI state
  const [filterPanelOpen, setFilterPanelOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  // Load initial categories
  useEffect(() => {
    api.getCategories().then((cats) => setCategories(cats));
  }, []);

  // Sync with searchParams
  useEffect(() => {
    const cond = searchParams.get('condition');
    if (cond) setSelectedCondition(cond as ConditionType);
    const cat = searchParams.get('category');
    if (cat) setSelectedCategory(cat);
  }, [searchParams]);

  // Load Products with filters
  useEffect(() => {
    setLoading(true);
    api
      .getProducts({
        search: search.trim() || undefined,
        category: selectedCategory !== 'all' ? selectedCategory : undefined,
        condition: selectedCondition !== 'all' ? selectedCondition : undefined,
        status: statusFilter !== 'all' ? statusFilter : undefined,
        minPrice,
        maxPrice,
        negotiableOnly: negotiableOnly || undefined,
        sort: sortBy,
      })
      .then((data) => {
        setProducts(data);
        setCurrentPage(1); // Reset page on filter change
      })
      .finally(() => {
        setLoading(false);
      });
  }, [search, selectedCategory, selectedCondition, statusFilter, minPrice, maxPrice, negotiableOnly, sortBy]);

  // Reset Filters
  const handleResetFilters = () => {
    setSearch('');
    setSelectedCategory('all');
    setSelectedCondition('all');
    setStatusFilter('all');
    setMinPrice(0);
    setMaxPrice(1000000);
    setNegotiableOnly(false);
    setSortBy('newest');
    setSearchParams({});
  };

  // Pagination calculation
  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE) || 1;
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return products.slice(start, start + ITEMS_PER_PAGE);
  }, [products, currentPage]);

  const activeFiltersCount = [
    selectedCategory !== 'all',
    selectedCondition !== 'all',
    statusFilter !== 'all',
    minPrice > 0 || maxPrice < 1000000,
    negotiableOnly,
    Boolean(search.trim()),
  ].filter(Boolean).length;

  return (
    <div className="w-full px-4 sm:px-6 md:px-8 max-w-[1720px] mx-auto pb-24">
      {/* Page Title & Search Header */}
      <div className="flex flex-col gap-4 mb-6">
        <div>
          <span className="font-sora text-[10px] font-bold uppercase tracking-widest text-violet-600 dark:text-violet-400">
            Catalog Telemetry
          </span>
          <h1 className="font-sora text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Browse Second-Hand Assets
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
            Inspected precision optics, audiophile gear, mechanical horology, and high-performance computing.
          </p>
        </div>

        {/* Live Search and Filter Controls Strip */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          {/* Live Search Bar */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by title, Leica, Sony, SKU or keywords..."
              className="w-full pl-11 pr-10 py-3 rounded-full bg-white/70 dark:bg-white/[0.05] border border-white/80 dark:border-white/10 text-sm font-medium text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-violet-500 shadow-sm"
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Sort Dropdown */}
          <div className="relative flex items-center gap-2">
            <div className="flex items-center gap-1.5 px-3 py-3 rounded-full bg-white/70 dark:bg-white/[0.05] border border-white/80 dark:border-white/10 shadow-sm text-xs font-semibold text-slate-700 dark:text-slate-300">
              <ArrowUpDown className="w-3.5 h-3.5 text-violet-600 dark:text-violet-400" />
              <select
                value={sortBy}
                onChange={(e: any) => setSortBy(e.target.value)}
                className="bg-transparent focus:outline-hidden cursor-pointer font-sora pr-2"
              >
                <option value="newest" className="dark:bg-[#1a1530]">Newest First</option>
                <option value="deal-score" className="dark:bg-[#1a1530]">Highest Deal Score</option>
                <option value="price-asc" className="dark:bg-[#1a1530]">Price: Low to High</option>
                <option value="price-desc" className="dark:bg-[#1a1530]">Price: High to Low</option>
                <option value="views" className="dark:bg-[#1a1530]">Most Viewed</option>
              </select>
            </div>

            {/* Filter Toggle Button */}
            <button
              type="button"
              onClick={() => setFilterPanelOpen(!filterPanelOpen)}
              className={`flex items-center gap-2 px-4 py-3 rounded-full text-xs font-sora font-semibold transition-all shadow-sm cursor-pointer ${
                filterPanelOpen || activeFiltersCount > 0
                  ? 'bg-gradient-to-r from-[#6D28D9] to-[#8B5CF6] text-white shadow-violet-500/25'
                  : 'bg-white/70 dark:bg-white/[0.05] border border-white/80 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:bg-white/90'
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Filters</span>
              {activeFiltersCount > 0 && (
                <span className="w-4 h-4 rounded-full bg-cyan-400 text-slate-950 font-bold text-[10px] flex items-center justify-center">
                  {activeFiltersCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Category Chips Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 pt-1 scrollbar-none">
          <button
            type="button"
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-1.5 rounded-full font-sora text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              selectedCategory === 'all'
                ? 'bg-violet-600 text-white shadow-md shadow-violet-500/20'
                : 'bg-white/60 dark:bg-white/[0.05] border border-white/60 dark:border-white/10 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            All Categories
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.name)}
              className={`px-3.5 py-1.5 rounded-full font-sora text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat.name
                  ? 'bg-violet-600 text-white shadow-md shadow-violet-500/20'
                  : 'bg-white/60 dark:bg-white/[0.05] border border-white/60 dark:border-white/10 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Collapsible Filter Panel */}
      {filterPanelOpen && (
        <div className="mb-6 p-6 rounded-3xl glass-panel-elevated animate-in fade-in slide-in-from-top-3 duration-200">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200/60 dark:border-white/10 mb-4">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-violet-600 dark:text-violet-400" />
              <h3 className="font-sora text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                Precision Filter Matrix
              </h3>
            </div>
            <button
              type="button"
              onClick={handleResetFilters}
              className="flex items-center gap-1 text-xs font-sora text-violet-600 dark:text-violet-400 hover:underline cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset All</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Condition Tier */}
            <div>
              <label className="font-sora text-[11px] font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 block mb-2">
                Certified Condition
              </label>
              <div className="flex flex-wrap gap-1.5">
                {(['all', 'New', 'Like New', 'Good', 'Fair', 'Poor'] as const).map((cond) => (
                  <button
                    key={cond}
                    type="button"
                    onClick={() => setSelectedCondition(cond)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-sora font-semibold transition-all cursor-pointer ${
                      selectedCondition === cond
                        ? 'bg-violet-600 text-white'
                        : 'bg-white/60 dark:bg-white/5 border border-slate-200/60 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10'
                    }`}
                  >
                    {cond === 'all' ? 'Any Grade' : cond}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range Slider */}
            <div>
              <div className="flex justify-between items-center mb-2 font-sora text-[11px] font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                <span>Price Ceiling</span>
                <span className="text-violet-600 dark:text-violet-400 font-mono-telemetry tabular-nums font-bold">
                  Up to {formatINR(maxPrice)}
                </span>
              </div>
              <input
                type="range"
                min={5000}
                max={1000000}
                step={5000}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-violet-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono-telemetry mt-1">
                <span>₹5,000</span>
                <span>₹5,00,000</span>
                <span>₹10,00,000+</span>
              </div>
            </div>

            {/* Status & Negotiable Toggle */}
            <div className="space-y-3">
              <div>
                <label className="font-sora text-[11px] font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 block mb-2">
                  Inventory Status
                </label>
                <div className="flex gap-2">
                  {(['all', 'available', 'reserved', 'sold'] as const).map((st) => (
                    <button
                      key={st}
                      type="button"
                      onClick={() => setStatusFilter(st)}
                      className={`px-2.5 py-1 rounded-xl text-xs font-sora font-semibold capitalize transition-all cursor-pointer ${
                        statusFilter === st
                          ? 'bg-violet-600 text-white'
                          : 'bg-white/60 dark:bg-white/5 border border-slate-200/60 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-3 pt-1">
                <input
                  type="checkbox"
                  id="negotiableOnly"
                  checked={negotiableOnly}
                  onChange={(e) => setNegotiableOnly(e.target.checked)}
                  className="rounded-sm accent-violet-600 cursor-pointer w-4 h-4"
                />
                <label
                  htmlFor="negotiableOnly"
                  className="text-xs font-sora font-semibold text-slate-700 dark:text-slate-300 cursor-pointer"
                >
                  Negotiable Listings Only
                </label>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Results Telemetry Count */}
      <div className="flex items-center justify-between mb-4">
        <span className="font-sora text-xs text-slate-500 dark:text-slate-400 font-medium">
          Showing <strong className="text-slate-900 dark:text-white tabular-nums">{products.length}</strong> verified assets
        </span>
        {activeFiltersCount > 0 && (
          <button
            type="button"
            onClick={handleResetFilters}
            className="text-xs font-sora text-violet-600 dark:text-violet-400 hover:underline cursor-pointer"
          >
            Clear {activeFiltersCount} active {activeFiltersCount === 1 ? 'filter' : 'filters'}
          </button>
        )}
      </div>

      {/* Grid Cards Display */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : paginatedProducts.length === 0 ? (
        /* Empty State */
        <div className="rounded-3xl glass-panel p-12 text-center flex flex-col items-center justify-center my-8">
          <div className="w-16 h-16 rounded-2xl bg-violet-100 dark:bg-violet-950/60 flex items-center justify-center text-violet-600 dark:text-violet-400 mb-4">
            <Search className="w-8 h-8" />
          </div>
          <h3 className="font-sora text-lg font-bold text-slate-900 dark:text-white">
            No Telemetric Matches Found
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-md mt-1 mb-6 leading-relaxed">
            No items matched your current search parameters. Try expanding your price range, clearing condition filters, or browsing other categories.
          </p>
          <button
            type="button"
            onClick={handleResetFilters}
            className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#6D28D9] to-[#8B5CF6] text-white font-sora text-xs uppercase font-bold tracking-wider shadow-lg shadow-violet-500/25 hover:scale-105 transition-all cursor-pointer"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {paginatedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="mt-10 flex items-center justify-center gap-2">
          <button
            type="button"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            className="w-9 h-9 rounded-full bg-white/70 dark:bg-white/10 flex items-center justify-center text-slate-600 dark:text-slate-300 disabled:opacity-40 hover:bg-white dark:hover:bg-white/20 transition-all cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {Array.from({ length: totalPages }).map((_, i) => {
            const pageNum = i + 1;
            return (
              <button
                key={pageNum}
                type="button"
                onClick={() => setCurrentPage(pageNum)}
                className={`w-9 h-9 rounded-full font-sora text-xs font-bold transition-all cursor-pointer ${
                  currentPage === pageNum
                    ? 'bg-violet-600 text-white shadow-md shadow-violet-500/25'
                    : 'bg-white/70 dark:bg-white/10 text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-white/20'
                }`}
              >
                {pageNum}
              </button>
            );
          })}

          <button
            type="button"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            className="w-9 h-9 rounded-full bg-white/70 dark:bg-white/10 flex items-center justify-center text-slate-600 dark:text-slate-300 disabled:opacity-40 hover:bg-white dark:hover:bg-white/20 transition-all cursor-pointer"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};
