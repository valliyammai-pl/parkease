import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { Sparkles } from 'lucide-react';

interface ThemeSwitcherProps {
  compact?: boolean;
}

export const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({ compact = false }) => {
  const { theme, setTheme } = useTheme();

  return (
    <div
      className={`inline-flex items-center p-1 rounded-xl bg-black/5 dark:bg-white/10 border border-[var(--color-border)] ${
        compact ? 'gap-1' : 'gap-1.5'
      }`}
      role="radiogroup"
      aria-label="Select website theme"
    >
      <button
        type="button"
        role="radio"
        aria-checked={theme === 'teal'}
        onClick={() => setTheme('teal')}
        className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all duration-200 ${
          theme === 'teal'
            ? 'bg-white text-[#0F766E] shadow-sm ring-1 ring-[#0F766E]/20'
            : 'text-[var(--color-text-muted)] hover:text-[var(--color-text)]'
        }`}
        title="Switch to Teal Theme (Smart Transit Modern)"
      >
        <span className="w-2.5 h-2.5 rounded-full bg-[#0F766E] inline-block shadow-xs" />
        {!compact && <span>Teal</span>}
      </button>

      <button
        type="button"
        role="radio"
        aria-checked={theme === 'burgundy'}
        onClick={() => setTheme('burgundy')}
        className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all duration-200 ${
          theme === 'burgundy'
            ? 'bg-white text-[#701F3D] shadow-sm ring-1 ring-[#701F3D]/20'
            : 'text-[var(--color-text-muted)] hover:text-[var(--color-text)]'
        }`}
        title="Switch to Burgundy Theme (Premium Regal Heritage)"
      >
        <span className="w-2.5 h-2.5 rounded-full bg-[#701F3D] inline-block shadow-xs" />
        {!compact && <span>Burgundy</span>}
      </button>

      {compact && (
        <span className="text-[10px] text-[var(--color-text-muted)] px-1" title="Theme active">
          <Sparkles className="w-3 h-3 text-[var(--color-accent)] inline" />
        </span>
      )}
    </div>
  );
};
