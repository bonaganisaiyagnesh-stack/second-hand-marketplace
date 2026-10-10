import React from 'react';
import { Link } from 'react-router-dom';
import { AlertCircle, ArrowLeft, Home, Compass } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="w-full px-4 max-w-lg mx-auto py-24 text-center">
      <div className="p-8 rounded-3xl glass-panel-elevated shadow-2xl flex flex-col items-center">
        <div className="w-16 h-16 rounded-2xl bg-violet-100 dark:bg-violet-950/80 flex items-center justify-center text-violet-600 dark:text-violet-400 mb-4">
          <AlertCircle className="w-8 h-8" />
        </div>

        <span className="font-sora text-[11px] font-bold uppercase tracking-widest text-violet-600 dark:text-violet-400">
          Telemetry Signal Lost
        </span>

        <h1 className="font-sora text-4xl font-extrabold text-slate-900 dark:text-white mt-1 mb-2">
          404 Not Found
        </h1>

        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-6">
          The requested coordinate or asset route is not calibrated in the current ReLoop grid.
        </p>

        <div className="flex gap-3">
          <Link
            to="/"
            className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#6D28D9] to-[#8B5CF6] text-white font-sora text-xs uppercase font-bold tracking-wider shadow-lg shadow-violet-500/25 hover:scale-105 transition-all flex items-center gap-2"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Return to Cockpit</span>
          </Link>

          <Link
            to="/browse"
            className="px-5 py-2.5 rounded-full bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-slate-300 font-sora text-xs font-semibold hover:bg-slate-200 transition-colors"
          >
            Browse Catalog
          </Link>
        </div>
      </div>
    </div>
  );
};
