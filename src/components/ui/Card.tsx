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
  const base = "rounded-lg border transition-all duration-200 overflow-hidden";

  const variants = {
    default: "bg-[#FFFFFF] border-[#E7E3EC] text-[#17151C] shadow-subtle",
    glow: "bg-[#FFFFFF] border-[#A78BFA]/40 text-[#17151C]",
    glass: "bg-[#FAF9FC]/90 backdrop-blur-md border-[#E7E3EC] text-[#17151C]"
  };

  const hover = hoverEffect ? "hover:border-[#A78BFA] hover:shadow-editorial hover:-translate-y-[1px]" : "";

  return (
    <div className={`${base} ${variants[variant]} ${hover} ${className}`} {...props}>
      {children}
    </div>
  );
};

