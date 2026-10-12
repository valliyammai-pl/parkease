import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  badge?: string;
  badgeVariant?: 'success' | 'warning' | 'danger' | 'info' | 'neutral';
  trend?: string;
  onClick?: () => void;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  icon: Icon,
  badge,
  badgeVariant = 'info',
  trend,
  onClick,
}) => {
  const badgeColors = {
    success: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300',
    warning: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300',
    danger: 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/40 dark:text-rose-300',
    info: 'bg-[var(--color-accent-subtle)] text-[var(--color-primary)] border-[var(--color-card-border)]',
    neutral: 'bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300',
  };

  return (
    <div
      onClick={onClick}
      className={`rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] p-5 shadow-xs transition-all ${
        onClick ? 'hover:border-[var(--color-primary)]/50 hover:shadow-md cursor-pointer' : ''
      }`}
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="w-10 h-10 rounded-xl bg-[var(--color-accent-subtle)] border border-[var(--color-card-border)] text-[var(--color-primary)] flex items-center justify-center shrink-0">
          <Icon className="w-5 h-5" />
        </div>
        {badge && (
          <span
            className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${badgeColors[badgeVariant]}`}
          >
            {badge}
          </span>
        )}
      </div>

      <p className="text-xs font-semibold text-[var(--color-text-muted)] truncate">{title}</p>
      <div className="flex items-baseline gap-2 mt-1">
        <h4 className="text-xl sm:text-2xl font-black text-[var(--color-text)] tracking-tight">
          {value}
        </h4>
        {trend && (
          <span className="text-[11px] font-bold text-emerald-600">
            {trend}
          </span>
        )}
      </div>
      {subtitle && (
        <p className="text-xs text-[var(--color-text-muted)] mt-1 truncate">{subtitle}</p>
      )}
    </div>
  );
};
