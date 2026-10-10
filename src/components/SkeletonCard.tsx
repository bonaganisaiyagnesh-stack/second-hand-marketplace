import React from 'react';

export const SkeletonCard: React.FC = () => {
  return (
    <div className="rounded-3xl glass-panel p-4 flex flex-col justify-between animate-pulse">
      {/* Media skeleton */}
      <div className="w-full aspect-4/3 rounded-2xl bg-slate-200/70 dark:bg-white/10 mb-3.5" />

      {/* Text skeletons */}
      <div className="space-y-2.5">
        <div className="flex justify-between">
          <div className="h-3 w-20 bg-slate-200/70 dark:bg-white/10 rounded-full" />
          <div className="h-3 w-10 bg-slate-200/70 dark:bg-white/10 rounded-full" />
        </div>
        <div className="h-5 w-4/5 bg-slate-200/70 dark:bg-white/10 rounded-lg" />
        <div className="h-3.5 w-full bg-slate-200/60 dark:bg-white/5 rounded-md" />
        <div className="h-3.5 w-2/3 bg-slate-200/60 dark:bg-white/5 rounded-md" />
      </div>

      {/* Footer skeleton */}
      <div className="mt-4 pt-3 border-t border-slate-200/50 dark:border-white/5 flex justify-between items-center">
        <div className="h-6 w-24 bg-slate-200/70 dark:bg-white/10 rounded-md" />
        <div className="h-4 w-16 bg-slate-200/70 dark:bg-white/10 rounded-full" />
      </div>
    </div>
  );
};
