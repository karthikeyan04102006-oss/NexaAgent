import React from 'react';

interface LogoProps {
  className?: string;
  size?: number; // Size of the icon in pixels (default: 36)
  showWordmark?: boolean;
  variant?: 'cyan' | 'editorial' | 'monochrome';
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  size = 36,
  showWordmark = true,
  variant = 'cyan',
}) => {
  const isCyan = variant === 'cyan';
  const isEditorial = variant === 'editorial';

  // Unique IDs for SVG gradients
  const idPrefix = React.useId().replace(/:/g, '');
  const gradLeft = `${idPrefix}-grad-left`;
  const gradCenter = `${idPrefix}-grad-center`;
  const gradRight = `${idPrefix}-grad-right`;

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* NEXA "N" ICON MARK */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 transition-transform duration-300 hover:scale-105"
      >
        <defs>
          {isCyan ? (
            <>
              {/* Left Bar Gradient: Deep Cyan-Blue */}
              <linearGradient id={gradLeft} x1="40" y1="40" x2="80" y2="160" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#0062FF" />
                <stop offset="60%" stopColor="#00A2FF" />
                <stop offset="100%" stopColor="#00C8FF" />
              </linearGradient>

              {/* Center Ribbon Gradient: Soft Blue to Bright Sky Cyan with Translucency */}
              <linearGradient id={gradCenter} x1="30" y1="30" x2="170" y2="170" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#00C8FF" />
                <stop offset="45%" stopColor="#E2F4FF" />
                <stop offset="80%" stopColor="#64B5F6" />
                <stop offset="100%" stopColor="#0077FF" />
              </linearGradient>

              {/* Right Bar Gradient: Electric Blue */}
              <linearGradient id={gradRight} x1="120" y1="40" x2="160" y2="160" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#00C8FF" />
                <stop offset="70%" stopColor="#0055FF" />
                <stop offset="100%" stopColor="#0033CC" />
              </linearGradient>
            </>
          ) : isEditorial ? (
            <>
              <linearGradient id={gradLeft} x1="40" y1="40" x2="80" y2="160" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#C4B5FD" />
                <stop offset="100%" stopColor="#7C3AED" />
              </linearGradient>

              <linearGradient id={gradCenter} x1="30" y1="30" x2="170" y2="170" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#A78BFA" />
                <stop offset="50%" stopColor="#FAF9FC" />
                <stop offset="100%" stopColor="#6D5BA6" />
              </linearGradient>

              <linearGradient id={gradRight} x1="120" y1="40" x2="160" y2="160" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#C4B5FD" />
                <stop offset="100%" stopColor="#7C3AED" />
              </linearGradient>
            </>
          ) : (
            <>
              <linearGradient id={gradLeft} x1="40" y1="40" x2="80" y2="160" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#111111" />
                <stop offset="100%" stopColor="#333333" />
              </linearGradient>

              <linearGradient id={gradCenter} x1="30" y1="30" x2="170" y2="170" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#555555" />
                <stop offset="100%" stopColor="#111111" />
              </linearGradient>

              <linearGradient id={gradRight} x1="120" y1="40" x2="160" y2="160" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#111111" />
                <stop offset="100%" stopColor="#333333" />
              </linearGradient>
            </>
          )}
        </defs>

        {/* LEFT VERTICAL SHAPE (SLANTED TOP, ROUNDED BOTTOM) */}
        <path
          d="M 40,75 L 80,115 V 150 C 80,158.2 73.2,165 65,165 H 55 C 46.7,165 40,158.2 40,150 V 75 Z"
          fill={`url(#${gradLeft})`}
        />

        {/* RIGHT VERTICAL SHAPE (ROUNDED TOP, SLANTED BOTTOM) */}
        <path
          d="M 160,50 V 125 L 120,85 V 50 C 120,41.7 126.7,35 135,35 H 145 C 153.3,35 160,41.7 160,50 Z"
          fill={`url(#${gradRight})`}
        />

        {/* SWEEPING CONTINUOUS RIBBON (TOP-LEFT TO BOTTOM-RIGHT DIAGONAL FOLD) */}
        <path
          d="M 35,35 L 105,35 C 113.3,35 120,41.7 120,50 L 50,150 L 35,135 C 35,135 110,60 115,55 C 117,53 115,50 112,50 L 35,35 Z"
          fill={`url(#${gradCenter})`}
        />
        <path
          d="M 35,35 L 140,140 C 148.3,148.3 160,145 165,135 L 165,165 L 120,165 L 35,80 V 35 Z"
          fill={`url(#${gradCenter})`}
        />
        <path
          d="M 35,35 H 100 L 165,100 L 165,165 H 145 C 136.7,165 130,158.3 130,150 L 35,55 V 35 Z"
          fill={`url(#${gradCenter})`}
        />
      </svg>

      {/* WORDMARK: NEXAAGENT WITH STYLIZED CARET A's */}
      {showWordmark && (
        <div className="flex items-center font-extrabold tracking-[0.18em] uppercase text-xl font-sans leading-none">
          <span className="text-[#17151C] dark:text-[#F3EEFB]">NEX</span>
          <span className={isCyan ? 'text-[#0088FF] px-[1px]' : isEditorial ? 'text-[#A78BFA] px-[1px]' : 'text-[#17151C] px-[1px]'}>
            <svg className="w-[0.7em] h-[0.7em] inline-block -mt-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="square">
              <path d="M4 20 L12 4 L20 20" />
            </svg>
          </span>
          <span className={isCyan ? 'text-[#0088FF]' : isEditorial ? 'text-[#A78BFA]' : 'text-[#17151C]'}>
            <svg className="w-[0.7em] h-[0.7em] inline-block -mt-1 mr-[1px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="square">
              <path d="M4 20 L12 4 L20 20" />
            </svg>
            GENT
          </span>
        </div>
      )}
    </div>
  );
};
