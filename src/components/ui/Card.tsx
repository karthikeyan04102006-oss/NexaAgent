import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'glow' | 'glass';
  className?: string;
  hoverEffect?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  className = '',
  hoverEffect = false,
  ...props
}) => {
  const base = "rounded-xl border transition-all duration-200 overflow-hidden";

  const variants = {
    default: "bg-surface-elevated/90 border-surface-border text-zinc-100 shadow-subtle",
    glow: "bg-surface-elevated/95 border-nexa-crimson/30 shadow-red-glow text-zinc-100",
    glass: "bg-zinc-950/60 backdrop-blur-xl border-zinc-800/80 text-zinc-100"
  };

  const hover = hoverEffect ? "hover:border-nexa-crimson/50 hover:shadow-red-glow hover:-translate-y-0.5" : "";

  return (
    <div className={`${base} ${variants[variant]} ${hover} ${className}`} {...props}>
      {children}
    </div>
  );
};
