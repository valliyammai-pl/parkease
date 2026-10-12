import React from 'react';
import { Link } from 'react-router-dom';

interface LogoProps {
  className?: string;
  showTagline?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const Logo: React.FC<LogoProps> = ({ className = '', showTagline = false, size = 'md' }) => {
  const iconSizes = {
    sm: 'w-7 h-7 text-xs',
    md: 'w-9 h-9 text-sm',
    lg: 'w-11 h-11 text-base',
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
  };

  return (
    <Link
      to="/"
      className={`inline-flex items-center gap-2.5 group transition-transform duration-150 active:scale-95 ${className}`}
      aria-label="ParkEase Home"
    >
      {/* Custom Distinctive Parking Emblem */}
      <div
        className={`${iconSizes[size]} relative rounded-xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-dark)] text-white font-bold flex items-center justify-center shadow-md shadow-[var(--color-card-border)] ring-2 ring-[var(--color-accent)]/30 group-hover:ring-[var(--color-accent)] transition-all`}
      >
        <span className="font-extrabold tracking-tight">P</span>
        {/* Subtle smart transit pulse dot */}
        <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[var(--color-accent)] ring-2 ring-white animate-pulse" />
      </div>

      <div className="flex flex-col">
        <span className={`font-black tracking-tight leading-none ${textSizes[size]} text-[var(--color-text)]`}>
          Park<span className="text-[var(--color-primary)]">Ease</span>
        </span>
        {showTagline && (
          <span className="text-[10px] tracking-wide font-medium text-[var(--color-text-muted)] uppercase mt-0.5">
            Smart Station Parking
          </span>
        )}
      </div>
    </Link>
  );
};
