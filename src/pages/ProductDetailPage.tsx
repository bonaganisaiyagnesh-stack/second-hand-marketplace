import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Heart,
  Share2,
  MapPin,
  Eye,
  ShieldCheck,
  RotateCcw,
  Sparkles,
  MessageSquare,
  DollarSign,
  ChevronLeft,
  Truck,
  Layers,
  ArrowRight,
  TrendingDown,
  CheckCircle2,
  Calendar,
  Zap,
} from 'lucide-react';
import { Product } from '../types';
import { api } from '../services/api';
import { GlassCard } from '../components/GlassCard';
import { GaugeChart } from '../components/GaugeChart';
import { ConditionBadge } from '../components/ConditionBadge';
import { ProgressBar } from '../components/ProgressBar';
import { ProductCard } from '../components/ProductCard';
import { ContactSellerModal } from '../components/ContactSellerModal';
import { useWishlist } from '../context/WishlistContext';
import { formatINR } from '../utils/currency';
import { useToast } from '../context/ToastContext';

export const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { success, info } = useToast();

  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  // Modals
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [defaultOfferMode, setDefaultOfferMode] = useState(false);
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    api
      .getProduct(id)
      .then((item) => {
        setProduct(item);
        if (item) {
          // Load related products in same category
          api.getProducts({ category: item.category }).then((list) => {
            setRelatedProducts(list.filter((p) => p.id !== item.id).slice(0, 4));
          });
        }
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 md:px-8 py-12 flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 rounded-full border-4 border-violet-600 border-t-transparent animate-spin" />
          <span className="font-sora text-xs uppercase tracking-widest text-violet-600 dark:text-violet-400 font-bold">
            Calibrating Telemetry...
          </span>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 md:px-8 py-16 text-center">
        <h2 className="font-sora text-2xl font-bold text-slate-900 dark:text-white mb-2">
          Asset Not Found
        </h2>
        <p className="text-sm text-slate-500 mb-6">
          This listing may have been de-listed or acquired by another collector.
        </p>
        <Link
          to="/browse"
          className="px-6 py-2.5 rounded-full bg-violet-600 text-white font-sora text-xs uppercase font-bold"
        >
          Return to Catalog
        </Link>
      </div>
    );
  }

  const isSaved = isInWishlist(product.id);
  const deltaPercent = product.marketPrice
    ? Math.round(((product.marketPrice - product.price) / product.marketPrice) * 100)
    : null;

  return (
    <div className="w-full px-4 sm:px-6 md:px-8 max-w-[1720px] mx-auto pb-24">
      {/* Back button */}
      <div className="mb-4">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-1.5 text-xs font-sora font-semibold text-slate-600 dark:text-slate-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back to Catalog Telemetry</span>
        </button>
      </div>

      {/* Main 2-Column Split: Sticky Gallery Left, Contiguous Purchase Module Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: Image Gallery & Inspection (7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          {/* Main Visual Frame */}
          <div className="relative aspect-4/3 w-full rounded-3xl overflow-hidden glass-panel border border-white/80 dark:border-white/10 shadow-xl bg-slate-900">
            <img
              src={product.images[activeImageIndex] || product.images[0]}
              alt={product.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

            {/* Badges Over Image */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
              <ConditionBadge condition={product.condition} score={product.conditionScore} size="lg" />
              <button
                type="button"
                onClick={() => toggleWishlist(product.id, product.title)}
                className={`w-10 h-10 rounded-full backdrop-blur-md flex items-center justify-center transition-all ${
                  isSaved
                    ? 'bg-rose-500 text-white shadow-lg scale-105'
                    : 'bg-white/80 dark:bg-black/60 text-slate-700 dark:text-white hover:text-rose-500 hover:scale-110'
                }`}
              >
                <Heart className={`w-5 h-5 ${isSaved ? 'fill-current' : ''}`} />
              </button>
            </div>

            {/* Bottom Scrim Info */}
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white z-10">
              {product.sku && (
                <span className="px-3 py-1 rounded-md bg-black/70 backdrop-blur-md font-mono-telemetry text-xs tracking-wider">
                  SKU: {product.sku}
                </span>
              )}
              <span className="px-3 py-1 rounded-md bg-cyan-950/80 backdrop-blur-md text-cyan-300 font-sora text-xs font-bold border border-cyan-400/30">
                Verified Asset #{product.id.slice(-4)}
              </span>
            </div>
          </div>

          {/* Thumbnails row */}
          {product.images.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto pb-1">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${
                    activeImageIndex === idx
                      ? 'border-violet-600 shadow-md shadow-violet-500/20 scale-105'
                      : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`View ${idx}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Detailed Specifications & Telemetric Inspection Log */}
          <div className="p-6 rounded-3xl glass-panel space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200/60 dark:border-white/10">
              <span className="font-sora text-xs font-bold uppercase tracking-wider text-violet-600 dark:text-violet-400">
                Telemetry Log & Mechanical Authenticity
              </span>
              <span className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400 font-mono-telemetry">
                <Eye className="w-3.5 h-3.5" />
                <span className="tabular-nums">{product.views} Inspections Logged</span>
              </span>
            </div>

            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line">
              {product.description}
            </p>

            {product.inspectionNotes && (
              <div className="p-3.5 rounded-2xl bg-cyan-50/70 dark:bg-cyan-950/30 border border-cyan-200/60 dark:border-cyan-800/30 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-cyan-600 dark:text-cyan-400 shrink-0 mt-0.5" />
                <div className="text-xs text-cyan-900 dark:text-cyan-200 leading-relaxed">
                  <strong className="font-sora font-semibold block mb-0.5">
                    Maison Inspection Report:
                  </strong>
                  {product.inspectionNotes}
                </div>
              </div>
            )}

            {/* Specs Table */}
            {product.specs && Object.keys(product.specs).length > 0 && (
              <div className="pt-2">
                <h4 className="font-sora text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                  Technical Characteristics
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {Object.entries(product.specs).map(([k, v]) => (
                    <div
                      key={k}
                      className="p-2.5 rounded-xl bg-white/60 dark:bg-white/5 flex items-center justify-between"
                    >
                      <span className="text-slate-500 dark:text-slate-400">{k}</span>
                      <span className="font-sora font-semibold text-slate-900 dark:text-white">
                        {v}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: Contiguous Purchase Module & Seller HUD (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-6 sticky top-20">
          {/* Main Purchase Card */}
          <div className="p-6 sm:p-8 rounded-3xl glass-panel-elevated flex flex-col gap-5 shadow-2xl relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="font-sora text-[10px] uppercase font-bold tracking-widest text-violet-600 dark:text-violet-400">
                {product.category}
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-violet-100 dark:bg-violet-950 text-violet-700 dark:text-violet-300 font-sora text-[10px] font-bold">
                {product.status.toUpperCase()}
              </span>
            </div>

            <div>
              <h1 className="font-sora text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
                {product.title}
              </h1>
              <div className="flex items-center gap-2 mt-2 text-xs text-slate-500 dark:text-slate-400">
                <MapPin className="w-3.5 h-3.5 text-violet-500" />
                <span>{product.location}</span>
                {product.distanceKm && <span>• {product.distanceKm} km from Hub</span>}
              </div>
            </div>

            {/* Price & Deal Analysis Strip */}
            <div className="p-4 rounded-2xl bg-white/60 dark:bg-white/5 border border-white/80 dark:border-white/10 flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-sora text-slate-400 block font-bold">
                  Valuation Asking Price
                </span>
                <div className="flex items-baseline gap-2.5 mt-0.5">
                  <span className="font-sora text-3xl font-extrabold text-slate-900 dark:text-white tabular-nums tracking-tight">
                    {formatINR(product.price)}
                  </span>
                  {product.marketPrice && (
                    <span className="text-sm text-slate-400 line-through tabular-nums">
                      {formatINR(product.marketPrice)}
                    </span>
                  )}
                </div>
              </div>

              {deltaPercent && deltaPercent > 0 && (
                <div className="px-3 py-1.5 rounded-xl bg-cyan-100 dark:bg-cyan-950/80 text-cyan-800 dark:text-cyan-300 font-sora text-xs font-bold flex flex-col items-end">
                  <span className="flex items-center gap-1">
                    <TrendingDown className="w-3.5 h-3.5" />
                    -{deltaPercent}%
                  </span>
                  <span className="text-[10px] font-normal">Below Median</span>
                </div>
              )}
            </div>

            {/* Telemetry Deal Score Radar Dial */}
            {product.dealScore && (
              <div className="flex items-center justify-between p-3.5 rounded-2xl bg-violet-50/70 dark:bg-white/5 border border-violet-100 dark:border-white/5">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-violet-600 text-white flex items-center justify-center font-sora font-extrabold text-base shadow-md">
                    {product.dealScore}
                  </div>
                  <div>
                    <h4 className="font-sora text-xs font-bold text-slate-900 dark:text-white">
                      Telemetric Deal Score
                    </h4>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      Top tier market valuation algorithm
                    </p>
                  </div>
                </div>
                <span className="font-sora text-[10px] uppercase font-bold text-violet-700 dark:text-violet-300">
                  OPTIMAL
                </span>
              </div>
            )}

            {/* Primary Action Buttons */}
            <div className="flex flex-col gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => setCheckoutModalOpen(true)}
                className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#6D28D9] via-[#7C3AED] to-[#8B5CF6] text-white font-sora text-xs uppercase font-bold tracking-wider shadow-xl shadow-violet-500/30 hover:shadow-violet-500/50 hover:scale-[1.01] active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Zap className="w-4 h-4 fill-current" />
                <span>Acquire Asset • {formatINR(product.price)}</span>
              </button>

              <div className="grid grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={() => {
                    setDefaultOfferMode(false);
                    setContactModalOpen(true);
                  }}
                  className="py-3 rounded-full bg-slate-100 dark:bg-white/10 text-slate-800 dark:text-white font-sora text-xs font-bold tracking-wider hover:bg-slate-200 dark:hover:bg-white/20 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Contact Seller</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setDefaultOfferMode(true);
                    setContactModalOpen(true);
                  }}
                  className="py-3 rounded-full bg-slate-100 dark:bg-white/10 text-slate-800 dark:text-white font-sora text-xs font-bold tracking-wider hover:bg-slate-200 dark:hover:bg-white/20 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span className="font-bold text-xs font-sora">₹</span>
                  <span>Make Offer</span>
                </button>
              </div>
            </div>

            {/* Trust Assurances */}
            <div className="pt-3 border-t border-slate-200/60 dark:border-white/10 space-y-2 text-xs text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>ReLoop 48h Inspection Window & Return Escrow</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-violet-500 shrink-0" />
                <span>Insured Curbside Handover or Global Courier Express</span>
              </div>
            </div>
          </div>

          {/* Seller Card */}
          <div className="p-6 rounded-3xl glass-panel space-y-3">
            <span className="font-sora text-[10px] uppercase font-bold tracking-wider text-slate-400">
              Verified Collector Profile
            </span>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-violet-600 to-cyan-500 flex items-center justify-center text-white font-sora font-bold text-base shadow-md">
                {product.sellerName ? product.sellerName.charAt(0) : 'J'}
              </div>
              <div>
                <h4 className="font-sora text-sm font-bold text-slate-900 dark:text-white">
                  {product.sellerName || 'Julian V. (Private Collector)'}
                </h4>
                <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  <span className="text-violet-600 dark:text-violet-400 font-bold">
                    ★ {product.sellerRating || 4.98}
                  </span>
                  <span>• 142 Completed Exchanges</span>
                </div>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 border-t border-slate-200/60 dark:border-white/5">
              <span>Member since Sept 2021</span>
              <span className="text-cyan-600 dark:text-cyan-400 font-semibold">
                KYC Identity Cleared
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products Grid */}
      {relatedProducts.length > 0 && (
        <section className="mt-16">
          <div className="flex items-center justify-between mb-6">
            <div>
              <span className="font-sora text-[10px] uppercase font-bold tracking-widest text-violet-600 dark:text-violet-400">
                Circular Recommendations
              </span>
              <h2 className="font-sora text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                Related {product.category} Assets
              </h2>
            </div>
            <Link
              to={`/browse?category=${product.category}`}
              className="text-xs font-sora font-bold text-violet-600 dark:text-violet-400 hover:underline"
            >
              View More →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      {/* Contact Seller / Offer Modal */}
      <ContactSellerModal
        product={product}
        isOpen={contactModalOpen}
        onClose={() => setContactModalOpen(false)}
        defaultOffer={defaultOfferMode}
      />

      {/* Instant Checkout Simulation Modal */}
      {checkoutModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/65 backdrop-blur-md animate-in fade-in duration-150">
          <div className="relative w-full max-w-md rounded-3xl glass-panel-elevated p-6 sm:p-7 shadow-2xl">
            <div className="text-center">
              <div className="w-14 h-14 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto mb-3">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <span className="font-sora text-[10px] font-bold uppercase tracking-widest text-violet-600 dark:text-violet-400">
                Encrypted Vault Transaction
              </span>
              <h3 className="font-sora text-xl font-bold text-slate-900 dark:text-white mt-1">
                Confirm Acquisition
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 mb-5">
                Funds will be held in ReLoop Smart Escrow until the 48-hour mechanical inspection concludes.
              </p>

              <div className="p-4 rounded-2xl bg-white/60 dark:bg-white/5 border border-slate-200/60 dark:border-white/10 text-left space-y-2 mb-5">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500">Asset:</span>
                  <span className="font-sora font-bold text-slate-900 dark:text-white truncate max-w-[200px]">
                    {product.title}
                  </span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500">Item Total:</span>
                  <span className="font-sora font-bold text-slate-900 dark:text-white tabular-nums">
                    {formatINR(product.price)}
                  </span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500">Escrow Assurance Fee:</span>
                  <span className="font-sora font-bold text-emerald-600 dark:text-emerald-400">
                    Complimentary (₹0)
                  </span>
                </div>
                <div className="pt-2 border-t border-slate-200/60 dark:border-white/10 flex justify-between text-sm font-bold">
                  <span>Grand Total:</span>
                  <span className="text-violet-600 dark:text-violet-400 tabular-nums font-sora">
                    {formatINR(product.price)}
                  </span>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setCheckoutModalOpen(false)}
                  className="flex-1 py-3 rounded-full text-xs font-sora font-semibold bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-slate-300 hover:bg-slate-200 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={async () => {
                    await api.updateStatus(product.id, 'reserved');
                    setProduct({ ...product, status: 'reserved' });
                    setCheckoutModalOpen(false);
                    success('Transaction Initiated!', `Escrow reservation opened for "${product.title}".`);
                  }}
                  className="flex-1 py-3 rounded-full text-xs font-sora font-bold uppercase tracking-wider bg-gradient-to-r from-[#6D28D9] to-[#8B5CF6] text-white shadow-lg shadow-violet-500/25 hover:scale-[1.02] cursor-pointer"
                >
                  Confirm Escrow
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
