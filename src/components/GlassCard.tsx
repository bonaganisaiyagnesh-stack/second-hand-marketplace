import React from 'react';

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  elevated?: boolean;
  glow?: boolean;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className = '',
  elevated = false,
  glow = false,
  ...props
}) => {
  return (
    <div
      className={`rounded-3xl transition-all duration-300 relative overflow-hidden ${
        elevated ? 'glass-panel-elevated' : 'glass-panel'
      } ${glow ? 'violet-glow' : ''} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
