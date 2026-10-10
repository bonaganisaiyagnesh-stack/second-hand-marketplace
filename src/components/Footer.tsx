import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Sparkles, Navigation } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-white/40 dark:bg-[#0c0918]/60 backdrop-blur-md border-t border-white/60 dark:border-white/5 py-8 mt-12 mb-20 sm:mb-16">
      <div className="w-full px-4 sm:px-6 md:px-8 max-w-[1720px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
          <span className="font-sora text-[11px] font-bold tracking-wider uppercase text-slate-900 dark:text-white">
            ReLoop Resale Maison
          </span>
          <span>•</span>
          <span>Verified Luxury Automotive HUD Exchange</span>
          <span>•</span>
          <span className="text-violet-600 dark:text-violet-400 font-medium">
            Circular Economy Score: 98.4
          </span>
        </div>

        <div className="flex items-center gap-4 text-[11px]">
          <Link to="/browse" className="hover:text-violet-600 transition-colors">
            Browse
          </Link>
          <Link to="/seller" className="hover:text-violet-600 transition-colors">
            Seller Dashboard
          </Link>
          <Link to="/admin" className="hover:text-violet-600 transition-colors">
            Admin Console
          </Link>
          <span>© 2025 ReLoop Inc. Precision Certified Authenticity.</span>
        </div>
      </div>
    </footer>
  );
};
