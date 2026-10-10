import React from 'react';

interface ProgressBarProps {
  label: string;
  valueText: string;
  percent: number; // 0 to 100
  icon?: React.ReactNode;
  subLeft?: string;
  subRight?: string;
  gradient?: string;
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  label,
  valueText,
  percent,
  icon,
  subLeft,
  subRight,
  gradient = 'from-[#630ED4] to-[#8B5CF6]',
  className = '',
}) => {
  const clamped = Math.min(Math.max(percent, 0), 100);

  return (
    <div
      className={`p-3.5 rounded-2xl bg-white/50 dark:bg-white/[0.04] border border-white/60 dark:border-white/5 flex flex-col gap-2 transition-all hover:bg-white/70 dark:hover:bg-white/[0.07] ${className}`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {icon && <span className="text-violet-600 dark:text-violet-400">{icon}</span>}
          <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
            {label}
          </span>
        </div>
        <span className="font-sora text-[11px] font-bold text-violet-700 dark:text-violet-300">
          {valueText}
        </span>
      </div>

      {/* Progress Track */}
      <div className="w-full h-2 rounded-full bg-slate-200/80 dark:bg-white/10 overflow-hidden">
        <div
          className={`h-full bg-gradient-to-r ${gradient} rounded-full transition-all duration-700 ease-out`}
          style={{ width: `${clamped}%` }}
        />
      </div>

      {(subLeft || subRight) && (
        <div className="flex justify-between items-center text-[10px] text-slate-500 dark:text-slate-400 font-mono-telemetry tabular-nums">
          <span>{subLeft}</span>
          <span>{subRight}</span>
        </div>
      )}
    </div>
  );
};
