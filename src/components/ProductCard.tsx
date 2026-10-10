import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Sparkles, MapPin, Eye, ArrowUpRight } from 'lucide-react';
import { Product } from '../types';
import { ConditionBadge } from './ConditionBadge';
import { useWishlist } from '../context/WishlistContext';
import { formatINR } from '../utils/currency';

interface ProductCardProps {
  product: Product;
  className?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, className = '' }) => {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const [imageError, setImageError] = useState(false);
  const isSaved = isInWishlist(product.id);

  const priceDelta = product.marketPrice
    ? Math.round(((product.marketPrice - product.price) / product.marketPrice) * 100)
    : null;

  return (
    <div
      className={`group rounded-3xl glass-panel p-4 flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:shadow-violet-500/10 hover:-translate-y-1 relative overflow-hidden ${className}`}
    >
      {/* Top Media Container */}
      <div className="relative w-full aspect-4/3 rounded-2xl overflow-hidden bg-slate-100 dark:bg-white/[0.03] mb-3.5">
        {imageError || !product.images?.[0] ? (
          <div className="w-full h-full flex flex-col items-center justify-center p-4 bg-gradient-to-tr from-violet-900/10 via-slate-100 to-cyan-500/10 dark:from-violet-950/40 dark:to-slate-900 text-center">
            <Sparkles className="w-8 h-8 text-violet-500/50 mb-2" />
            <span className="font-sora text-xs font-semibold text-slate-700 dark:text-slate-300">
              {product.title}
            </span>
            <span className="text-[10px] text-slate-400 mt-1 uppercase font-sora">
              Verified Asset
            </span>
          </div>
        ) : (
          <img
            src={product.images[0]}
            alt={product.title}
            referrerPolicy="no-referrer"
            onError={() => setImageError(true)}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}

        {/* Gradient Scrim for contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 pointer-events-none" />

        {/* Top Badges */}
        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between z-10">
          <ConditionBadge condition={product.condition} score={product.conditionScore} size="sm" />

          {/* Wishlist Button */}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleWishlist(product.id, product.title);
            }}
            aria-label={isSaved ? 'Remove from Wishlist' : 'Add to Wishlist'}
            className={`w-8 h-8 rounded-full backdrop-blur-md flex items-center justify-center transition-all ${
              isSaved
                ? 'bg-rose-500 text-white shadow-md shadow-rose-500/30 scale-105'
                : 'bg-white/80 dark:bg-black/50 text-slate-700 dark:text-white hover:text-rose-500 hover:scale-110'
            }`}
          >
            <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Bottom Media Bar: SKU & Deal Score */}
        <div className="absolute bottom-2 left-2.5 right-2.5 flex items-center justify-between z-10">
          {product.sku && (
            <span className="px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-md text-white font-mono-telemetry text-[10px] tracking-wider">
              {product.sku}
            </span>
          )}
          {product.dealScore && (
            <span className="px-2 py-0.5 rounded-md bg-cyan-950/80 backdrop-blur-md text-cyan-300 font-sora text-[10px] font-bold tracking-tight border border-cyan-400/20">
              Deal Score: {product.dealScore}
            </span>
          )}
        </div>
      </div>

      {/* Information Body */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 font-medium mb-1">
            <span className="uppercase tracking-wider font-sora text-[10px] text-violet-600 dark:text-violet-400 font-bold">
              {product.category}
            </span>
            <div className="flex items-center gap-1">
              <Eye className="w-3 h-3" />
              <span className="tabular-nums">{product.views}</span>
            </div>
          </div>

          <Link to={`/product/${product.id}`} className="block group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
            <h3 className="font-sora text-base font-bold text-slate-900 dark:text-white tracking-tight line-clamp-1">
              {product.title}
            </h3>
          </Link>

          <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 mt-1 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Pricing & Telemetric Bar */}
        <div className="mt-3.5 pt-3 border-t border-slate-200/60 dark:border-white/5">
          <div className="flex items-baseline justify-between mb-2">
            <div className="flex items-baseline gap-2">
              <span className="font-sora text-xl font-bold text-slate-900 dark:text-white tabular-nums tracking-tight">
                {formatINR(product.price)}
              </span>
              {product.marketPrice && (
                <span className="text-xs text-slate-400 line-through tabular-nums">
                  {formatINR(product.marketPrice)}
                </span>
              )}
            </div>

            {priceDelta && priceDelta > 0 && (
              <span className="px-2 py-0.5 rounded-full bg-cyan-50 dark:bg-cyan-950/60 text-cyan-700 dark:text-cyan-300 font-sora text-[10px] font-bold tabular-nums">
                -{priceDelta}% Below
              </span>
            )}
          </div>

          {/* Location & Action row */}
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <div className="flex items-center gap-1 truncate max-w-[150px]">
              <MapPin className="w-3.5 h-3.5 text-violet-500 shrink-0" />
              <span className="truncate">{product.location}</span>
            </div>

            <Link
              to={`/product/${product.id}`}
              className="inline-flex items-center gap-1 font-sora text-xs font-semibold text-violet-600 dark:text-violet-400 hover:text-violet-700 dark:hover:text-violet-300 transition-colors"
            >
              <span>Inspect</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
