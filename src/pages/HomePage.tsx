import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Radar,
  Navigation,
  Verified,
  TrendingDown,
  CheckCircle2,
  Sparkles,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Bookmark,
  ChevronRight,
  ShieldCheck,
  ArrowRight,
  Gavel,
  SlidersHorizontal,
  Flame,
  ArrowUpRight,
  RotateCw,
} from 'lucide-react';
import { Product, ConditionType } from '../types';
import { formatINR } from '../utils/currency';
import { api } from '../services/api';
import { GlassCard } from '../components/GlassCard';
import { GaugeChart } from '../components/GaugeChart';
import { ProgressBar } from '../components/ProgressBar';
import { ConditionSelector } from '../components/ConditionSelector';
import { ProductCard } from '../components/ProductCard';
import { ContactSellerModal } from '../components/ContactSellerModal';
import { useWishlist } from '../context/WishlistContext';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const [products, setProducts] = useState<Product[]>([]);
  const [featuredProduct, setFeaturedProduct] = useState<Product | null>(null);
  const [trendingIndex, setTrendingIndex] = useState(0);
  const [selectedCondition, setSelectedCondition] = useState<ConditionType | null>('Like New');
  const [isPlayingAudio, setIsPlayingAudio] = useState(true);

  // Quick Bid modal
  const [quickBidModalOpen, setQuickBidModalOpen] = useState(false);
  const [selectedBidProduct, setSelectedBidProduct] = useState<Product | null>(null);

  useEffect(() => {
    api.getProducts().then((data) => {
      setProducts(data);
      const featured = data.find((p) => p.id === 'prod-leica-m6') || data[0];
      setFeaturedProduct(featured);
    });
  }, []);

  // Audio / Trending Products subset
  const trendingProducts = products.filter((p) => p.category === 'Audio & Hi-Fi' || p.category === 'Cameras & Optics');
  const currentTrending = trendingProducts[trendingIndex % Math.max(trendingProducts.length, 1)] || products[1];

  const handleOpenBid = (prod: Product) => {
    setSelectedBidProduct(prod);
    setQuickBidModalOpen(true);
  };

  return (
    <div className="w-full px-4 sm:px-6 md:px-8 max-w-[1720px] mx-auto flex flex-col gap-8 pb-16">
      {/* 1. TOP COCKPIT STATUS RIBBON */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 px-5 py-2.5 bg-white/70 dark:bg-white/[0.04] backdrop-blur-2xl rounded-full border border-white/80 dark:border-white/5 shadow-xs">
        <div className="flex items-center gap-3">
          <span className="flex h-3 w-3 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-violet-600" />
          </span>
          <span className="font-sora text-[11px] uppercase tracking-widest text-slate-900 dark:text-white font-bold">
            HUD Link Active
          </span>
          <span className="text-slate-300 dark:text-slate-600 font-sora">•</span>
          <span className="font-sora text-[11px] text-slate-600 dark:text-slate-300 font-medium tracking-wide">
            NEO-CIRCUIT RADAR: CALIBRATED (5.0 KM)
          </span>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="font-sora text-[11px] uppercase text-slate-500 dark:text-slate-400">
              Live Latency
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-white/10 text-violet-700 dark:text-violet-300 font-sora text-[11px] font-bold tabular-nums">
              14 ms
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-sora text-[11px] uppercase text-slate-500 dark:text-slate-400">
              Auth Protocol
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-violet-100 dark:bg-violet-950 text-violet-800 dark:text-violet-300 font-sora text-[11px] font-bold">
              ISO-26262 LUX
            </span>
          </div>
        </div>
      </div>

      {/* 2. UPPER HERO GRID (3 COLUMNS) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* CARD 1: LEFT ('NEARBY LISTINGS • 4.2 KM RADAR') */}
        <div className="lg:col-span-4 flex flex-col justify-between p-6 sm:p-7 rounded-3xl glass-panel relative overflow-hidden group">
          <div className="absolute -right-16 -top-16 w-48 h-48 bg-violet-500/10 rounded-full blur-3xl pointer-events-none" />

          <div>
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Radar className="w-5 h-5 text-violet-600 dark:text-violet-400" />
                <span className="font-sora text-[11px] uppercase tracking-wider text-violet-600 dark:text-violet-400 font-bold">
                  Nearby Listings • 4.2 KM Radar
                </span>
              </div>
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-white/10 text-slate-800 dark:text-slate-200 font-sora text-[11px] font-bold">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                3 Target Nodes
              </span>
            </div>

            {/* Radar Map Visual Container */}
            <div
              className="relative w-full h-56 rounded-2xl overflow-hidden bg-cover bg-center shadow-inner flex flex-col justify-between p-3.5 border border-white/20"
              style={{
                backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuBYlnL-ENMscN_-bmxQL14FT6mpTFJ861P1kawPwSXroBSaEONvc_wnzzk32HBl7eOgLBJGjjy8lv1LOyr_vNsCLePVnKWplYk8ENVDshYVgmcF8VVpv3nSY23naQ75mWbGA3Xv-RZCaUKPLNvz9jrzuVNPJxVgOKi9EwOcGJG9LNAAyTmZ-J2ZNNY7MJr-9fJVQm8TJ8R0ddeUJshTiiSkEHhE4VV-Oz0XKmn14o5HRHNeGTpYNxsf')`,
              }}
            >
              {/* Glass Scrim */}
              <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-[1.5px] pointer-events-none" />

              {/* Route Overlay */}
              <div className="relative z-10 flex items-center justify-between w-full">
                <div className="px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-white flex items-center gap-2 shadow-md">
                  <Navigation className="w-3.5 h-3.5 text-cyan-300 fill-cyan-300" />
                  <span className="font-sora text-[11px]">
                    Route ETA: <strong className="text-white font-bold">8 min</strong>
                  </span>
                </div>
                <span className="px-2.5 py-0.5 rounded-md bg-white/80 dark:bg-black/80 backdrop-blur-md text-violet-700 dark:text-violet-300 font-sora text-[11px] font-bold">
                  34 km/h avg
                </span>
              </div>

              {/* Dynamic Interactive Pin Markers */}
              <div className="relative z-10 flex flex-col gap-2">
                <Link
                  to="/product/prod-leica-m6"
                  className="flex items-center gap-2 bg-white/95 dark:bg-slate-900/90 backdrop-blur-md px-3 py-1 rounded-full self-start shadow-lg transform translate-x-3 hover:scale-105 transition-transform"
                >
                  <span className="w-2 h-2 rounded-full bg-violet-600 animate-ping" />
                  <span className="font-sora text-[11px] text-slate-900 dark:text-white font-semibold">
                    Leica M6 (0.8 km)
                  </span>
                </Link>

                <Link
                  to="/product/prod-hm-aeron"
                  className="flex items-center gap-2 bg-white/95 dark:bg-slate-900/90 backdrop-blur-md px-3 py-1 rounded-full self-end shadow-lg transform -translate-x-4 hover:scale-105 transition-transform"
                >
                  <span className="w-2 h-2 rounded-full bg-cyan-500" />
                  <span className="font-sora text-[11px] text-slate-900 dark:text-white font-semibold">
                    HM Aeron (2.1 km)
                  </span>
                </Link>
              </div>
            </div>

            {/* Listing Target Previews */}
            <div className="mt-4 flex flex-col gap-2.5">
              <Link
                to="/product/prod-leica-m6"
                className="flex items-center justify-between p-2.5 rounded-2xl bg-white/50 dark:bg-white/[0.04] hover:bg-white/80 dark:hover:bg-white/[0.08] transition-colors border border-white/60 dark:border-white/5 cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-violet-100 dark:bg-violet-950/80 flex items-center justify-center text-violet-700 dark:text-violet-300 font-bold text-xs font-sora">
                    M6
                  </div>
                  <div>
                    <p className="font-sora text-xs font-bold text-slate-900 dark:text-white">
                      Leica M6 Classic '84
                    </p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      Verified Collector • Hub East
                    </p>
                  </div>
                </div>
                <span className="font-sora text-sm font-bold text-slate-900 dark:text-white tabular-nums">
                  ₹2,05,000
                </span>
              </Link>

              <Link
                to="/product/prod-hm-aeron"
                className="flex items-center justify-between p-2.5 rounded-2xl bg-white/50 dark:bg-white/[0.04] hover:bg-white/80 dark:hover:bg-white/[0.08] transition-colors border border-white/60 dark:border-white/5 cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-cyan-100 dark:bg-cyan-950/80 flex items-center justify-center text-cyan-700 dark:text-cyan-300 font-bold text-xs font-sora">
                    HM
                  </div>
                  <div>
                    <p className="font-sora text-xs font-bold text-slate-900 dark:text-white">
                      Aeron Remastered (Size B)
                    </p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      Studio Clearance • 2.1 km
                    </p>
                  </div>
                </div>
                <span className="font-sora text-sm font-bold text-slate-900 dark:text-white tabular-nums">
                  ₹74,500
                </span>
              </Link>
            </div>
          </div>

          {/* Radar Footprint Indicator */}
          <div className="mt-4 pt-3 flex items-center justify-between border-t border-slate-200/60 dark:border-white/5">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-600 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-600" />
              </span>
              <span className="text-xs text-slate-600 dark:text-slate-400">
                3 listings within 5 km perimeter
              </span>
            </div>
            <Link
              to="/browse"
              className="text-slate-500 hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
              title="Tune Radar"
            >
              <SlidersHorizontal className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* CARD 2: CENTER HERO ('TELEMETRIC DEAL ANALYSIS') */}
        <div className="lg:col-span-4 flex flex-col justify-between p-6 sm:p-7 rounded-3xl glass-panel relative overflow-hidden group">
          {/* Ambient Glow */}
          <div className="absolute inset-0 bg-gradient-to-b from-violet-600/5 via-transparent to-violet-600/10 pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-violet-600/15 rounded-full blur-3xl pointer-events-none" />

          {/* Top Header */}
          <div className="relative z-10 flex items-center justify-between">
            <span className="px-3 py-1 rounded-full bg-violet-100 dark:bg-violet-950/80 text-violet-700 dark:text-violet-300 font-sora text-[10px] font-bold uppercase tracking-wider">
              Telemetric Deal Analysis
            </span>
            <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-violet-100/80 dark:bg-white/10 text-violet-800 dark:text-violet-300 font-sora text-[11px] font-semibold">
              <Verified className="w-3.5 h-3.5 text-violet-600 dark:text-violet-400" />
              <span>Grade Alpha</span>
            </div>
          </div>

          {/* Precision Center Radial Instrument */}
          <div className="relative z-10 my-2 flex flex-col items-center justify-center">
            <GaugeChart score={92} size={208} label="SCORE GAUGE" badge="TOP 2% VALUATION" />

            {/* Product Hero Presentation */}
            <div className="mt-2 w-full flex flex-col items-center">
              <div className="relative w-48 h-28 rounded-2xl overflow-hidden shadow-xl mb-2.5 border border-white/40 dark:border-white/10">
                <img
                  src={
                    featuredProduct?.images[0] ||
                    'https://lh3.googleusercontent.com/aida-public/AB6AXuBjj3PyBoPw3WInewy4E0JROq9Hd2ZNNd95N7TI_DSYDm7nrrtVGqPpg0tKMrOLsZda74-_Tk3N90nr8AiL6-trlOgEviPIbBXWR-mPRr2-uNgc1Gv3qJ9l9vD3jfkIq5Drzeu_bwUQUmU2DgqBQjbVbgtc0vPIL9tbTpWbbab7r6bYvjVusO_CjzejuujMgemjILPLz_URfoAo-6BvTjzdlahX0hUsoMzxAx3LMsqLNlwArcD9iUrI'
                  }
                  alt="Leica M6 Classic (1984)"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <span className="absolute bottom-1.5 left-2 px-2 py-0.5 rounded-md bg-white/90 dark:bg-black/80 text-slate-900 dark:text-white font-mono-telemetry text-[10px] font-semibold">
                  Ref: LM6-1984
                </span>
              </div>

              <h3 className="font-sora text-lg sm:text-xl font-bold text-slate-900 dark:text-white text-center tracking-tight">
                Leica M6 Classic (1984)
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 text-center mt-0.5">
                0.72x Viewfinder • Original Leitz Wetzlar
              </p>
            </div>

            {/* Price Pill Matrix */}
            <div className="mt-2.5 flex items-center gap-3">
              <span className="font-sora text-2xl font-bold text-slate-900 dark:text-white tabular-nums">
                ₹2,05,000
              </span>
              <span className="px-2.5 py-1 rounded-full bg-cyan-100 dark:bg-cyan-950/80 text-cyan-800 dark:text-cyan-300 font-sora text-[11px] font-bold flex items-center gap-1 shadow-xs">
                <TrendingDown className="w-3.5 h-3.5" />
                <span>18% Below Median</span>
              </span>
            </div>
          </div>

          {/* CTA Cluster */}
          <div className="relative z-10 flex items-center gap-3 w-full mt-3">
            <Link
              to="/product/prod-leica-m6"
              className="flex-1 py-3 px-4 rounded-full bg-gradient-to-r from-[#630ED4] via-[#7C3AED] to-[#8B5CF6] text-white font-sora text-xs uppercase text-center font-bold tracking-wider shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 hover:scale-[1.02] active:scale-98 transition-all"
            >
              Inspect Telemetry
            </Link>
            <button
              type="button"
              onClick={() => featuredProduct && handleOpenBid(featuredProduct)}
              className="py-3 px-5 rounded-full bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/15 text-slate-900 dark:text-white font-sora text-xs font-bold tracking-wider transition-all cursor-pointer"
            >
              Quick Bid
            </button>
          </div>
        </div>

        {/* CARD 3: RIGHT ('PRODUCT STATUS & SENSORS') */}
        <div className="lg:col-span-4 flex flex-col justify-between p-6 sm:p-7 rounded-3xl glass-panel relative overflow-hidden">
          <div className="absolute -left-12 -bottom-12 w-48 h-48 bg-cyan-400/10 rounded-full blur-3xl pointer-events-none" />

          <div>
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <RotateCw className="w-5 h-5 text-violet-600 dark:text-violet-400" />
                <span className="font-sora text-[11px] uppercase tracking-wider text-violet-600 dark:text-violet-400 font-bold">
                  Telemetry Status Sensors
                </span>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-slate-300 font-sora text-[11px]">
                4 Channels Online
              </span>
            </div>

            {/* Sensor Bars List */}
            <div className="flex flex-col gap-3">
              <ProgressBar
                label="Price vs Market"
                valueText="-18% • Optimal Value"
                percent={88}
                subLeft="Fair Market ₹2,49,000"
                subRight="Delta: -₹44,000"
                gradient="from-[#630ED4] to-[#7C3AED]"
              />

              <ProgressBar
                label="Certified Condition"
                valueText="Mint 9.8 / 10"
                percent={98}
                subLeft="Optical Grade A+"
                subRight="Zero Shutter Rust"
                gradient="from-[#7C3AED] to-[#A78BFA]"
              />

              <ProgressBar
                label="Seller Trust Rating"
                valueText="4.98 ★ (142 Deals)"
                percent={99}
                subLeft="Julian V. (Private Collector)"
                subRight="KYC Verified 2021"
                gradient="from-[#630ED4] to-[#06B6D4]"
              />

              <ProgressBar
                label="Inventory Logistics"
                valueText="100% Hub Ready"
                percent={100}
                subLeft="Vault Locker: Mun-04"
                subRight="Instant Curbside Handover"
                gradient="from-[#7C3AED] to-[#9333EA]"
              />
            </div>
          </div>

          {/* Sensor Verification Signoff */}
          <div className="mt-4 flex items-center justify-between pt-3 border-t border-slate-200/60 dark:border-white/5">
            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
              <Gavel className="w-4 h-4 text-violet-600 dark:text-violet-400" />
              <span className="text-xs">Maison Authenticated by Horologist Team</span>
            </div>
            <Link
              to="/product/prod-leica-m6"
              className="font-sora text-[11px] text-violet-600 dark:text-violet-400 font-bold hover:underline"
            >
              Full Log →
            </Link>
          </div>
        </div>
      </div>

      {/* 3. BOTTOM ROW METRICS (4 MODULAR COCKPIT CARDS) */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 items-stretch">
        {/* Metric 1: TOTAL VERIFIED INVENTORY */}
        <div className="p-6 rounded-3xl glass-panel flex flex-col justify-between relative overflow-hidden group">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="font-sora text-[11px] uppercase tracking-wider text-slate-500 dark:text-slate-400 font-bold">
                Total Verified Inventory
              </span>
              <ShieldCheck className="w-5 h-5 text-violet-600 dark:text-violet-400" />
            </div>
            <div className="flex items-baseline gap-3 my-2">
              <span className="font-sora text-3xl sm:text-4xl text-slate-900 dark:text-white font-extrabold tracking-tight tabular-nums">
                14,892
              </span>
              <span className="font-sora text-xs text-violet-600 dark:text-violet-400 font-bold flex items-center">
                +12.4%
                <ArrowUpRight className="w-3.5 h-3.5" />
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Active catalog luxury assets verified under ISO inspection standard.
            </p>
          </div>

          {/* Sparkline Trendline SVG */}
          <div className="mt-4 pt-3 border-t border-slate-200/60 dark:border-white/5">
            <svg className="w-full h-10 overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 25">
              <defs>
                <linearGradient id="sparklineGrad1" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#7C3AED" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#7C3AED" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              <path d="M 0,22 Q 15,18 30,12 T 60,15 T 85,6 T 100,2 L 100,25 L 0,25 Z" fill="url(#sparklineGrad1)" />
              <path d="M 0,22 Q 15,18 30,12 T 60,15 T 85,6 T 100,2" fill="none" stroke="#7C3AED" strokeLinecap="round" strokeWidth="2.5" />
            </svg>
            <div className="flex justify-between font-mono-telemetry text-[10px] text-slate-400 mt-1">
              <span>7 Days Ago</span>
              <span>Live Peak</span>
            </div>
          </div>
        </div>

        {/* Metric 2: CIRCULAR ITEMS RECYCLED */}
        <div className="p-6 rounded-3xl glass-panel flex flex-col justify-between relative overflow-hidden group">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="font-sora text-[11px] uppercase tracking-wider text-slate-500 dark:text-slate-400 font-bold">
                Circular Items Recycled
              </span>
              <Sparkles className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
            </div>
            <div className="flex items-baseline gap-3 my-2">
              <span className="font-sora text-3xl sm:text-4xl text-slate-900 dark:text-white font-extrabold tracking-tight tabular-nums">
                3,410
              </span>
              <span className="font-sora text-sm text-slate-500 dark:text-slate-400 font-medium">
                Units
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Hardware diverted from waste cycles through verified refurbishment.
            </p>
          </div>

          <div className="mt-4 pt-3 flex flex-col gap-2 border-t border-slate-200/60 dark:border-white/5">
            <div className="flex items-center justify-between p-2.5 rounded-2xl bg-cyan-100/70 dark:bg-cyan-950/60 text-cyan-900 dark:text-cyan-200">
              <div className="flex items-center gap-1.5">
                <span className="font-sora text-[11px] font-bold">CO₂ Footprint Saved</span>
              </div>
              <span className="font-sora text-sm font-bold tabular-nums">-4.8 Tons</span>
            </div>
            <div className="flex justify-between text-[11px] text-slate-500 dark:text-slate-400 font-mono-telemetry px-1">
              <span>Water offset: 42,000L</span>
              <span>Maison Circular Score: 98.4</span>
            </div>
          </div>
        </div>

        {/* Metric 3: NOW TRENDING • AUDIO STREAM */}
        <div className="p-6 rounded-3xl glass-panel flex flex-col justify-between relative overflow-hidden group">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="font-sora text-[11px] uppercase tracking-wider text-violet-600 dark:text-violet-400 font-bold">
                Now Trending • Audio Stream
              </span>
              <span className="px-2 py-0.5 rounded-full bg-violet-100 dark:bg-white/10 text-violet-700 dark:text-violet-300 font-sora text-[10px] font-semibold">
                14m ago
              </span>
            </div>

            {/* Product Media Player Cluster */}
            <div className="flex items-center gap-3">
              <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-md shrink-0 relative bg-slate-100 dark:bg-white/5">
                <img
                  src={
                    currentTrending?.images[0] ||
                    'https://lh3.googleusercontent.com/aida-public/AB6AXuCnmIXMMOyX1pyoFtTy0opRFdKVJ7DuS63hZR8njNNaEyM7XBDdh87SRlIfquSUQ5QSk99HB2kkxJRAJ9cl6hD5rdrCwLlQk6HS8X8Vb2A3Uf0Xqj75F9lJAoQLaYv5noMmawIdlicdcdmtGAyOZCBvLY0lGRijlscniXJ5KivvfjaQo7uME4RWqx604SNBpuAbuA8aqChOTF28zbt7QftyEHM1v_4sy7JZ1znhYKvbmO_O418XKWz_'
                  }
                  alt={currentTrending?.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="font-sora text-sm font-bold text-slate-900 dark:text-white truncate">
                  {currentTrending?.title || 'Sony WH-1000XM5'}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                  Platinum Silver • Anc Grade 10
                </p>
                <span className="font-sora text-sm text-violet-600 dark:text-violet-400 font-bold tabular-nums">
                  {formatINR(currentTrending?.price || 24500)}
                </span>
              </div>
            </div>
          </div>

          {/* Waveform Dynamic Animated Bar Indicator */}
          <div className="my-3 flex items-center justify-between gap-1 h-6 px-1">
            {[12, 20, 24, 8, 16, 24, 12, 20, 8, 16].map((h, i) => (
              <div
                key={i}
                className="w-1 bg-violet-600 dark:bg-violet-400 rounded-full transition-all duration-300"
                style={{
                  height: isPlayingAudio ? `${h}px` : '4px',
                  opacity: isPlayingAudio ? 0.9 : 0.3,
                  animation: isPlayingAudio ? `pulse 1.2s infinite ease-in-out ${i * 120}ms` : 'none',
                }}
              />
            ))}
          </div>

          {/* Infotainment Audio Controls */}
          <div className="flex items-center justify-between pt-2 border-t border-slate-200/60 dark:border-white/5">
            <button
              type="button"
              onClick={() => setTrendingIndex((prev) => (prev > 0 ? prev - 1 : trendingProducts.length - 1))}
              aria-label="Previous listing"
              className="w-8 h-8 rounded-full bg-slate-100 dark:bg-white/10 flex items-center justify-center text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/20 transition-colors cursor-pointer"
            >
              <SkipBack className="w-3.5 h-3.5" />
            </button>

            <button
              type="button"
              onClick={() => setIsPlayingAudio(!isPlayingAudio)}
              aria-label="Toggle waveform preview"
              className="w-10 h-10 rounded-full bg-violet-600 text-white flex items-center justify-center shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              {isPlayingAudio ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
            </button>

            <button
              type="button"
              onClick={() => setTrendingIndex((prev) => (prev + 1) % trendingProducts.length)}
              aria-label="Next listing"
              className="w-8 h-8 rounded-full bg-slate-100 dark:bg-white/10 flex items-center justify-center text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/20 transition-colors cursor-pointer"
            >
              <SkipForward className="w-3.5 h-3.5" />
            </button>

            <button
              type="button"
              onClick={() => currentTrending && toggleWishlist(currentTrending.id, currentTrending.title)}
              aria-label="Bookmark listing"
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors cursor-pointer ${
                currentTrending && isInWishlist(currentTrending.id)
                  ? 'bg-rose-500 text-white'
                  : 'bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-slate-300 hover:text-violet-600'
              }`}
            >
              <Bookmark className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Metric 4: CONDITION FILTER DIAL */}
        <div className="p-6 rounded-3xl glass-panel flex flex-col justify-between relative overflow-hidden group">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="font-sora text-[11px] uppercase tracking-wider text-slate-500 dark:text-slate-400 font-bold">
                Condition Filter Dial
              </span>
              <RotateCw className="w-5 h-5 text-violet-600 dark:text-violet-400" />
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              HUD grading threshold filter for search discovery.
            </p>
          </div>

          <ConditionSelector
            selectedCondition={selectedCondition}
            onSelect={(cond) => {
              setSelectedCondition(cond);
              navigate(cond ? `/browse?condition=${cond}` : '/browse');
            }}
            matchesCount={8420}
          />
        </div>
      </div>

      {/* 4. DISCOVERY CAROUSEL & CATALOG SECTION */}
      <section className="mt-4">
        <div className="flex items-center justify-between mb-6">
          <div>
            <span className="font-sora text-[10px] uppercase font-bold tracking-widest text-violet-600 dark:text-violet-400">
              Verified Marketplace
            </span>
            <h2 className="font-sora text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
              Featured Telemetry Listings
            </h2>
          </div>
          <Link
            to="/browse"
            className="flex items-center gap-1 font-sora text-xs uppercase font-bold text-violet-600 dark:text-violet-400 hover:text-violet-700 dark:hover:text-violet-300 transition-colors"
          >
            <span>Explore All 20 Units</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.slice(0, 8).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Quick Bid Modal */}
      {selectedBidProduct && (
        <ContactSellerModal
          product={selectedBidProduct}
          isOpen={quickBidModalOpen}
          onClose={() => setQuickBidModalOpen(false)}
          defaultOffer={true}
        />
      )}
    </div>
  );
};
