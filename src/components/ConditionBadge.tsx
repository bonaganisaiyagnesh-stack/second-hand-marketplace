import React from 'react';
import { ConditionType } from '../types';

interface ConditionBadgeProps {
  condition: ConditionType;
  score?: number;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const ConditionBadge: React.FC<ConditionBadgeProps> = ({
  condition,
  score,
  className = '',
  size = 'md',
}) => {
  const styles: Record<ConditionType, { bg: string; text: string; dot: string; label: string }> = {
    'New': {
      bg: 'bg-cyan-500/10 dark:bg-cyan-500/20 border-cyan-500/30',
      text: 'text-cyan-700 dark:text-cyan-300',
      dot: 'bg-cyan-400',
      label: 'Pristine 10/10',
    },
    'Like New': {
      bg: 'bg-violet-500/15 dark:bg-violet-500/25 border-violet-500/30',
      text: 'text-violet-700 dark:text-violet-300',
      dot: 'bg-violet-500',
      label: score ? `Mint ${score}/10` : 'Like New (Mint)',
    },
    'Good': {
      bg: 'bg-emerald-500/10 dark:bg-emerald-500/20 border-emerald-500/30',
      text: 'text-emerald-700 dark:text-emerald-300',
      dot: 'bg-emerald-500',
      label: score ? `Grade ${score}/10` : 'Good (Certified)',
    },
    'Fair': {
      bg: 'bg-amber-500/10 dark:bg-amber-500/20 border-amber-500/30',
      text: 'text-amber-700 dark:text-amber-300',
      dot: 'bg-amber-500',
      label: 'Fair (Functional)',
    },
    'Poor': {
      bg: 'bg-rose-500/10 dark:bg-rose-500/20 border-rose-500/30',
      text: 'text-rose-700 dark:text-rose-300',
      dot: 'bg-rose-500',
      label: 'Parts / Restore',
    },
  };

  const current = styles[condition] || styles['Good'];
  const sizeClasses = {
    sm: 'text-[10px] px-2 py-0.5 gap-1',
    md: 'text-[11px] px-2.5 py-1 gap-1.5',
    lg: 'text-xs px-3 py-1.5 gap-2',
  }[size];

  return (
    <span
      className={`inline-flex items-center rounded-full border font-sora font-semibold tracking-wider uppercase backdrop-blur-md shadow-xs ${current.bg} ${current.text} ${sizeClasses} ${className}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${current.dot}`} />
      <span>{current.label}</span>
    </span>
  );
};
