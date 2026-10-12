import React, { useState } from 'react';
import { Info, X, ShieldAlert } from 'lucide-react';

interface DemoNoticeProps {
  className?: string;
}

export const DemoNotice: React.FC<DemoNoticeProps> = ({ className = '' }) => {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <aside
      aria-label="Demo mode disclaimer"
      className={`bg-[var(--color-primary)]/10 border-b border-[var(--color-card-border)] text-xs text-[var(--color-text)] px-4 py-2 flex items-center justify-between gap-3 ${className}`}
    >
      <div className="max-w-7xl mx-auto flex items-center gap-2 flex-wrap">
        <span className="inline-flex items-center gap-1 font-semibold text-[var(--color-primary)]">
          <ShieldAlert className="w-3.5 h-3.5" />
          <span>Interactive Portfolio Simulation:</span>
        </span>
        <span className="text-[var(--color-text-muted)]">
          All railway stations, parking availability, FASTag balances, EV chargers, and insurance policies are simulated mock data stored locally in your browser. No live government APIs or payment gateways are accessed.
        </span>
      </div>
      <button
        type="button"
        onClick={() => setDismissed(true)}
        className="shrink-0 p-1 text-[var(--color-text-muted)] hover:text-[var(--color-text)] rounded transition-colors"
        aria-label="Dismiss disclaimer"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </aside>
  );
};
