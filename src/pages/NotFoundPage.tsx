import React from 'react';
import { Link } from 'react-router-dom';
import { MapPinOff, ArrowLeft, Home, Car, LayoutDashboard } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center p-4 sm:p-8">
      <div className="text-center max-w-md mx-auto space-y-6">
        <div className="w-20 h-20 rounded-3xl bg-[var(--color-accent-subtle)] text-[var(--color-primary)] border border-[var(--color-card-border)] flex items-center justify-center mx-auto shadow-md">
          <MapPinOff className="w-10 h-10" />
        </div>

        <div>
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-[var(--color-primary)]">
            Error 404 • Lost in Transit
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-[var(--color-text)] tracking-tight mt-1">
            Slot Not Found
          </h1>
          <p className="text-xs sm:text-sm text-[var(--color-text-muted)] mt-2 leading-relaxed">
            The parking concourse or page you are searching for does not exist or has been relocated to another station deck.
          </p>
        </div>

        <div className="flex items-center justify-center gap-3 pt-2">
          <Link
            to="/"
            className="px-4 py-2.5 rounded-xl bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white text-xs font-bold shadow-sm transition-all flex items-center gap-1.5"
          >
            <Home className="w-4 h-4" />
            <span>Return Home</span>
          </Link>
          <Link
            to="/parking"
            className="px-4 py-2.5 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] hover:bg-[var(--color-surface-hover)] text-[var(--color-text)] text-xs font-bold transition-all flex items-center gap-1.5"
          >
            <Car className="w-4 h-4 text-[var(--color-primary)]" />
            <span>Find Parking</span>
          </Link>
          <Link
            to="/dashboard"
            className="px-4 py-2.5 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] hover:bg-[var(--color-surface-hover)] text-[var(--color-text)] text-xs font-bold transition-all flex items-center gap-1.5"
          >
            <LayoutDashboard className="w-4 h-4 text-[var(--color-primary)]" />
            <span>Dashboard</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
