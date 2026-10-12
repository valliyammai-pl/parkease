import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { EmptyState } from '../components/common/EmptyState';
import {
  Bell,
  CheckCheck,
  Trash2,
  Car,
  CreditCard,
  ShieldCheck,
  Wrench,
  Info,
  ArrowRight,
} from 'lucide-react';

export const NotificationsPage: React.FC = () => {
  const {
    notifications,
    markNotificationRead,
    markAllNotificationsRead,
    clearAllNotifications,
    unreadNotificationCount,
  } = useApp();

  const [filterType, setFilterType] = useState<string>('all');

  const filteredNotifications = notifications.filter((n) => {
    if (filterType === 'all') return true;
    return n.type === filterType;
  });

  const getIcon = (type: string) => {
    switch (type) {
      case 'booking':
        return <Car className="w-4 h-4 text-[var(--color-primary)]" />;
      case 'fastag':
        return <CreditCard className="w-4 h-4 text-amber-500" />;
      case 'insurance':
        return <ShieldCheck className="w-4 h-4 text-rose-500" />;
      case 'service':
        return <Wrench className="w-4 h-4 text-blue-500" />;
      default:
        return <Info className="w-4 h-4 text-slate-400" />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--color-accent-subtle)] text-[var(--color-primary)] text-xs font-bold border border-[var(--color-card-border)]">
            <Bell className="w-3.5 h-3.5" />
            <span>Smart Transit Alerts</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[var(--color-text)] tracking-tight mt-1">
            Notifications Center
          </h1>
          <p className="text-xs text-[var(--color-text-muted)]">
            {unreadNotificationCount} unread alert{unreadNotificationCount === 1 ? '' : 's'} across bookings, FASTag, and vehicle services
          </p>
        </div>

        {/* Global actions */}
        <div className="flex items-center gap-2">
          {unreadNotificationCount > 0 && (
            <button
              type="button"
              onClick={markAllNotificationsRead}
              className="px-3 py-2 rounded-xl border border-[var(--color-border)] hover:bg-[var(--color-surface-hover)] text-xs font-bold text-[var(--color-text)] flex items-center gap-1.5 transition-colors"
            >
              <CheckCheck className="w-4 h-4 text-emerald-600" />
              <span>Mark all read</span>
            </button>
          )}
          {notifications.length > 0 && (
            <button
              type="button"
              onClick={clearAllNotifications}
              className="p-2 rounded-xl border border-rose-200 text-rose-600 hover:bg-rose-50 transition-colors"
              title="Clear all notifications"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar text-xs">
        {[
          { id: 'all', label: 'All Alerts' },
          { id: 'booking', label: 'Parking Bookings' },
          { id: 'fastag', label: 'FASTag' },
          { id: 'insurance', label: 'Insurance' },
          { id: 'service', label: 'Vehicle Services' },
        ].map((f) => (
          <button
            key={f.id}
            type="button"
            onClick={() => setFilterType(f.id)}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all shrink-0 ${
              filterType === f.id
                ? 'bg-[var(--color-primary)] text-white shadow-xs'
                : 'bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text-muted)] hover:text-[var(--color-text)]'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* List */}
      {filteredNotifications.length === 0 ? (
        <EmptyState
          icon={Bell}
          title="All Caught Up!"
          description="You have no notifications in this category. We will notify you when a slot is confirmed or FASTag balance changes."
        />
      ) : (
        <div className="space-y-3">
          {filteredNotifications.map((notif) => (
            <div
              key={notif.id}
              onClick={() => markNotificationRead(notif.id)}
              className={`p-4 sm:p-5 rounded-2xl border transition-all flex items-start gap-4 cursor-pointer ${
                notif.read
                  ? 'bg-[var(--color-surface)] border-[var(--color-border)] opacity-80'
                  : 'bg-[var(--color-surface)] border-[var(--color-primary)] ring-1 ring-[var(--color-primary)]/20 shadow-xs'
              }`}
            >
              <div className="w-10 h-10 rounded-xl bg-[var(--color-surface-hover)] border border-[var(--color-border)] flex items-center justify-center shrink-0 mt-0.5">
                {getIcon(notif.type)}
              </div>

              <div className="flex-1 min-w-0 space-y-1">
                <div className="flex items-center justify-between gap-2">
                  <h4 className="font-bold text-sm text-[var(--color-text)]">
                    {notif.title}
                  </h4>
                  <span className="text-[11px] text-[var(--color-text-muted)] shrink-0">
                    {notif.timestamp}
                  </span>
                </div>
                <p className="text-xs text-[var(--color-text-muted)] leading-relaxed">
                  {notif.message}
                </p>

                {notif.link && (
                  <div className="pt-1">
                    <Link
                      to={notif.link}
                      className="inline-flex items-center gap-1 text-xs font-bold text-[var(--color-primary)] hover:underline"
                    >
                      <span>Take Action</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                )}
              </div>

              {!notif.read && (
                <span className="w-2.5 h-2.5 rounded-full bg-[var(--color-primary)] shrink-0 mt-2" />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
