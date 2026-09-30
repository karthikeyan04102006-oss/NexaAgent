import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'google';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  isLoading?: boolean;
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  icon,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles = "inline-flex items-center justify-center font-semibold tracking-tight rounded-[10px] transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#A78BFA]/50 focus:ring-offset-1 dark:focus:ring-offset-[#08080A] disabled:bg-[#E7E4EA] dark:disabled:bg-[#29272D] disabled:text-[#A09AA8] dark:disabled:text-[#77727F] disabled:border-transparent disabled:cursor-not-allowed disabled:shadow-none disabled:transform-none shrink-0 cursor-pointer select-none";

  const variants = {
    primary: [
      "bg-[#A78BFA] text-[#17151C] border border-transparent shadow-[0_4px_16px_rgba(167,139,250,0.18)] hover:bg-[#8B73E8] hover:-translate-y-[1px] active:bg-[#7C3AED]",
      "dark:bg-[#A78BFA] dark:text-[#100D16] dark:shadow-[0_4px_20px_rgba(167,139,250,0.20)] dark:hover:bg-[#C4B5FD] dark:active:bg-[#DDD6FE]"
    ].join(" "),

    secondary: [
      "bg-transparent text-[#6D5BA6] border border-[#D8D0E5] hover:bg-[#F0EBF8] hover:border-[#C4B5FD] active:scale-[0.99]",
      "dark:text-[#C4B5FD] dark:border-[#37313F] dark:hover:bg-[#1C1722] dark:hover:border-[#A78BFA]"
    ].join(" "),

    outline: [
      "bg-transparent text-[#6D5BA6] border border-[#CFC7DA] hover:border-[#A78BFA] hover:text-[#A78BFA] active:scale-[0.99]",
      "dark:text-[#C4B5FD] dark:border-[#4A4254] dark:hover:border-[#A78BFA] dark:hover:text-[#A78BFA]"
    ].join(" "),

    ghost: [
      "bg-transparent text-[#696572] hover:bg-[#F0EDF5] hover:text-[#6D5BA6]",
      "dark:text-[#A7A3B2] dark:hover:bg-[#1A1720] dark:hover:text-[#C4B5FD]"
    ].join(" "),

    danger: [
      "bg-[#FFF1F2] text-[#B42318] border border-[#FECACA] hover:bg-[#FEE2E2] active:scale-[0.99]",
      "dark:bg-[#2A1518] dark:text-[#FDA4AF] dark:border-[#542027] dark:hover:bg-[#38191D]"
    ].join(" "),

    google: [
      "bg-[#FFFFFF] text-[#17151C] border border-[#DAD7DF] hover:bg-[#F7F7F8] active:scale-[0.99]",
      "dark:bg-[#151519] dark:text-[#F5F3FF] dark:border-[#35323A] dark:hover:bg-[#1E1E23]"
    ].join(" ")
  };

  const sizes = {
    sm: "h-[36px] px-[14px] text-[13px] gap-1.5",
    md: "h-[42px] px-[18px] text-[14px] gap-2",
    lg: "h-[48px] px-[22px] text-[15px] gap-2.5",
    icon: "w-[40px] h-[40px] p-0 flex items-center justify-center text-sm"
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <svg className="animate-spin h-4 w-4 text-current shrink-0" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      ) : icon ? (
        <span className="shrink-0 flex items-center justify-center">{icon}</span>
      ) : null}
      {children}
    </button>
  );
};

