import React from 'react';

interface GaugeChartProps {
  score: number; // 0 to 100
  size?: number;
  label?: string;
  sublabel?: string;
  badge?: string;
  className?: string;
}

export const GaugeChart: React.FC<GaugeChartProps> = ({
  score = 92,
  size = 208, // 52 * 4 = 208px default
  label = 'SCORE GAUGE',
  badge = 'TOP 2% VALUATION',
  className = '',
}) => {
  // Radius 48, Circumference = 2 * PI * 48 ≈ 301.6
  const radius = 48;
  const circumference = 2 * Math.PI * radius;
  // Calculate arc offset: full circle is 301.6; arc spans ~260 degrees (leaving a gap at bottom or side)
  // Or match the exact prompt mockup:
  // stroke-dasharray="301.6", dashoffset calculated from score percentage
  const progressPercent = Math.min(Math.max(score, 0), 100) / 100;
  // Sweep of 280 degrees max
  const maxSweep = 0.78 * circumference;
  const strokeDashoffset = circumference - progressPercent * maxSweep;

  return (
    <div
      className={`relative flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        className="w-full h-full -rotate-90 transform drop-shadow-[0_0_12px_rgba(124,58,237,0.3)]"
        viewBox="0 0 120 120"
      >
        <defs>
          <linearGradient id="gaugeGradientViolet" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#630ED4" />
            <stop offset="60%" stopColor="#8B5CF6" />
            <stop offset="100%" stopColor="#06B6D4" />
          </linearGradient>
        </defs>

        {/* Background track circle */}
        <circle
          cx="60"
          cy="60"
          r={radius}
          fill="none"
          stroke="currentColor"
          className="text-slate-200/60 dark:text-white/10"
          strokeWidth="8"
          strokeDasharray={circumference}
          strokeDashoffset={circumference * 0.22}
          strokeLinecap="round"
        />

        {/* Dynamic active electric gradient arc */}
        <circle
          cx="60"
          cy="60"
          r={radius}
          fill="none"
          stroke="url(#gaugeGradientViolet)"
          strokeWidth="8"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
        />
      </svg>

      {/* Center Readout */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none px-2">
        <span className="font-sora text-[11px] font-bold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
          {label}
        </span>
        <span className="font-sora text-4xl sm:text-[42px] font-bold tracking-tight text-slate-900 dark:text-white tabular-nums my-0.5 leading-none">
          {score}
        </span>
        {badge && (
          <span className="mt-1 px-2.5 py-0.5 rounded-full bg-cyan-100 dark:bg-cyan-950/80 text-cyan-800 dark:text-cyan-300 font-sora text-[10px] font-bold tracking-wider uppercase shadow-xs">
            {badge}
          </span>
        )}
      </div>
    </div>
  );
};
