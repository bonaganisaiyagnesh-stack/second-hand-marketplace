import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Bookmark, Sparkles, ArrowRight, Trash2 } from 'lucide-react';
import { Product } from '../types';
import { api } from '../services/api';
import { useWishlist } from '../context/WishlistContext';
import { ProductCard } from '../components/ProductCard';

export const WishlistPage: React.FC = () => {
  const { wishlistIds } = useWishlist();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api.getProducts().then((all) => {
      const saved = all.filter((p) => wishlistIds.includes(p.id));
      setProducts(saved);
      setLoading(false);
    });
  }, [wishlistIds]);

  return (
    <div className="w-full px-4 sm:px-6 md:px-8 max-w-[1720px] mx-auto pb-24">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <span className="font-sora text-[10px] font-bold uppercase tracking-widest text-violet-600 dark:text-violet-400">
            Collector Vault
          </span>
          <h1 className="font-sora text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Saved Telemetric Assets
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Monitored hardware and luxury timepieces tracked for price deltas and condition updates.
          </p>
        </div>

        {products.length > 0 && (
          <span className="px-3.5 py-1.5 rounded-full bg-violet-100 dark:bg-violet-950 text-violet-700 dark:text-violet-300 font-sora text-xs font-bold tabular-nums">
            {products.length} Tracked Units
          </span>
        )}
      </div>

      {loading ? (
        <div className="py-20 flex justify-center">
          <div className="w-10 h-10 border-4 border-violet-600 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : products.length === 0 ? (
        /* Empty State */
        <div className="rounded-3xl glass-panel p-12 text-center flex flex-col items-center justify-center my-8">
          <div className="w-16 h-16 rounded-2xl bg-violet-100 dark:bg-violet-950/60 flex items-center justify-center text-violet-600 dark:text-violet-400 mb-4">
            <Bookmark className="w-8 h-8" />
          </div>
          <h3 className="font-sora text-xl font-bold text-slate-900 dark:text-white">
            Your Vault is Empty
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-md mt-1 mb-6 leading-relaxed">
            You haven't bookmarked any hardware assets yet. Browse the catalog and tap the heart icon on any listing to track its price in your personal vault.
          </p>
          <Link
            to="/browse"
            className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#6D28D9] to-[#8B5CF6] text-white font-sora text-xs uppercase font-bold tracking-wider shadow-lg shadow-violet-500/25 hover:scale-105 transition-all"
          >
            Explore Catalog
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};
