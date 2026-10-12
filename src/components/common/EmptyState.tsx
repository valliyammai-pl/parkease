import React from 'react';
import { LucideIcon } from 'lucide-react';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  actionText?: string;
  onAction?: () => void;
  actionHref?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon: Icon,
  title,
  description,
  actionText,
  onAction,
  actionHref,
}) => {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8 sm:p-12 border border-dashed border-[var(--color-border)] rounded-2xl bg-[var(--color-surface)]/50 my-4">
      <div className="w-14 h-14 rounded-2xl bg-[var(--color-accent-subtle)] border border-[var(--color-card-border)] flex items-center justify-center text-[var(--color-primary)] mb-4 shadow-xs">
        <Icon className="w-7 h-7" />
      </div>
      <h4 className="text-base sm:text-lg font-bold text-[var(--color-text)] mb-1.5">{title}</h4>
      <p className="text-sm text-[var(--color-text-muted)] max-w-md mb-6 leading-relaxed">
        {description}
      </p>
      {actionText && (
        <>
          {actionHref ? (
            <a
              href={actionHref}
              className="inline-flex items-center justify-center px-4 py-2 rounded-xl text-sm font-semibold text-white bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] transition-colors shadow-sm"
            >
              {actionText}
            </a>
          ) : (
            <button
              type="button"
              onClick={onAction}
              className="inline-flex items-center justify-center px-4 py-2 rounded-xl text-sm font-semibold text-white bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] transition-colors shadow-sm"
            >
              {actionText}
            </button>
          )}
        </>
      )}
    </div>
  );
};
