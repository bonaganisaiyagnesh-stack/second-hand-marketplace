import React from 'react';
import { ConditionType } from '../types';
import { Filter } from 'lucide-react';

interface ConditionSelectorProps {
  selectedCondition: ConditionType | null;
  onSelect: (condition: ConditionType | null) => void;
  matchesCount?: number;
  className?: string;
}

export const ConditionSelector: React.FC<ConditionSelectorProps> = ({
  selectedCondition = 'Like New',
  onSelect,
  matchesCount = 8420,
  className = '',
}) => {
  const tiers: { tier: string; condition: ConditionType; label: string; threshold: string }[] = [
    { tier: 'TIER 1', condition: 'New', label: 'Pristine', threshold: 'Grade 9.9+' },
    { tier: 'TIER 2', condition: 'Like New', label: 'Like New', threshold: 'Grade 9.5+' },
    { tier: 'TIER 3', condition: 'Good', label: 'Good', threshold: 'Grade 8.8+' },
    { tier: 'TIER 4', condition: 'Fair', label: 'Fair', threshold: 'Grade 7.5+' },
  ];

  const activeLabel = selectedCondition
    ? `Active: ${selectedCondition}`
    : 'All Grades Included';

  return (
    <div className={`flex flex-col justify-between ${className}`}>
      {/* 2x2 Matrix */}
      <div className="grid grid-cols-2 gap-2 my-2">
        {tiers.map((item) => {
          const isActive = selectedCondition === item.condition;
          return (
            <button
              key={item.condition}
              type="button"
              onClick={() => onSelect(isActive ? null : item.condition)}
              className={`p-2.5 rounded-2xl text-left transition-all flex flex-col gap-1 cursor-pointer ${
                isActive
                  ? 'bg-gradient-to-br from-[#6D28D9] to-[#8B5CF6] text-white shadow-lg shadow-violet-500/25 scale-[1.02]'
                  : 'bg-white/60 dark:bg-white/[0.05] border border-white/60 dark:border-white/5 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white/80 dark:hover:bg-white/[0.08]'
              }`}
            >
              <div className="flex items-center justify-between">
                <span
                  className={`font-sora text-[10px] font-bold tracking-wider ${
                    isActive ? 'text-violet-200' : 'text-slate-400 dark:text-slate-500'
                  }`}
                >
                  {isActive ? 'ACTIVE' : item.tier}
                </span>
                {isActive && <span className="w-2 h-2 rounded-full bg-cyan-300 animate-pulse" />}
              </div>
              <span className="font-sora text-sm font-bold tracking-tight">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Current Filter Summary readout */}
      <div className="flex items-center justify-between pt-2 border-t border-slate-200/60 dark:border-white/5">
        <div className="flex items-center gap-1.5 text-xs text-slate-700 dark:text-slate-300">
          <Filter className="w-3.5 h-3.5 text-violet-600 dark:text-violet-400" />
          <span className="font-sora text-[11px] font-semibold">{activeLabel}</span>
        </div>
        <span className="font-sora text-[11px] font-bold text-violet-600 dark:text-violet-400 tabular-nums">
          {matchesCount.toLocaleString()} Matches
        </span>
      </div>
    </div>
  );
};
