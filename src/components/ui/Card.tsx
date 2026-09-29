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
    default: "bg-surface border-surface-border text-foreground shadow-subtle",
    glow: "bg-surface border-nexa-crimson/40 shadow-red-glow text-foreground",
    glass: "bg-surface/90 backdrop-blur-xl border-surface-border text-foreground"
  };

  const hover = hoverEffect ? "hover:border-nexa-crimson/60 hover:shadow-red-glow hover:-translate-y-0.5" : "";

  return (
    <div className={`${base} ${variants[variant]} ${hover} ${className}`} {...props}>
      {children}
    </div>
  );
};
