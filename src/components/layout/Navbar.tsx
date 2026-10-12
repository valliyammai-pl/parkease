import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { Logo } from '../common/Logo';
import { ThemeSwitcher } from '../common/ThemeSwitcher';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import {
  Bell,
  Menu,
  X,
  User,
  Car,
  Zap,
  CreditCard,
  Shield,
  Wrench,
  LayoutDashboard,
  LogOut,
  Sparkles,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { unreadNotificationCount, liveSimulationActive } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const navLinks = [
    { name: 'Find Parking', path: '/parking', icon: Car },
    { name: 'FASTag', path: '/fastag', icon: CreditCard },
    { name: 'Insurance', path: '/insurance', icon: Shield },
    { name: 'EV Charging', path: '/ev-charging', icon: Zap },
    { name: 'Services', path: '/services', icon: Wrench },
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  ];

  const handleLogout = () => {
    logout();
    setUserDropdownOpen(false);
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-30 bg-[var(--color-surface)]/90 backdrop-blur-md border-b border-[var(--color-border)] shadow-xs transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
          {/* Brand Logo */}
          <div className="flex items-center gap-6">
            <Logo size="md" showTagline />

            {/* Live simulation pill */}
            {liveSimulationActive && (
              <div
                className="hidden xl:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-[11px] font-semibold text-emerald-700 dark:text-emerald-300"
                title="Demo availability updates periodically in real-time"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                <span>Simulated Live Grid</span>
              </div>
            )}
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-xl text-sm font-semibold transition-all duration-150 ${
                    isActive
                      ? 'text-[var(--color-primary)] bg-[var(--color-accent-subtle)] font-bold'
                      : 'text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-black/5'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Theme Switcher */}
            <ThemeSwitcher />

            {/* Notifications Button */}
            <Link
              to="/notifications"
              className="relative p-2.5 rounded-xl border border-[var(--color-border)] text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-black/5 transition-colors"
              aria-label={`View notifications (${unreadNotificationCount} unread)`}
            >
              <Bell className="w-4 h-4" />
              {unreadNotificationCount > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-[var(--color-primary)] text-white text-[10px] font-black flex items-center justify-center ring-2 ring-white">
                  {unreadNotificationCount}
                </span>
              )}
            </Link>

            {/* User Profile or Log In Buttons */}
            {isAuthenticated && user ? (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setUserDropdownOpen((prev) => !prev)}
                  className="flex items-center gap-2.5 pl-2 pr-3 py-1.5 rounded-xl border border-[var(--color-border)] hover:border-[var(--color-primary)] bg-[var(--color-surface)] transition-all"
                  aria-expanded={userDropdownOpen}
                >
                  <img
                    src={user.avatarUrl || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80'}
                    alt={user.name}
                    className="w-7 h-7 rounded-lg object-cover ring-1 ring-[var(--color-primary)]/30"
                  />
                  <span className="text-xs font-bold text-[var(--color-text)] max-w-[100px] truncate">
                    {user.name}
                  </span>
                </button>

                {/* Dropdown Menu */}
                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] shadow-xl p-2 z-50 animate-in fade-in slide-in-from-top-2">
                    <div className="px-3 py-2 border-b border-[var(--color-border)] mb-1">
                      <p className="text-xs font-bold text-[var(--color-text)] truncate">{user.name}</p>
                      <p className="text-[11px] text-[var(--color-text-muted)] truncate">{user.email}</p>
                    </div>
                    <Link
                      to="/dashboard"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-[var(--color-text)] hover:bg-[var(--color-surface-hover)]"
                    >
                      <LayoutDashboard className="w-4 h-4 text-[var(--color-primary)]" />
                      Dashboard
                    </Link>
                    <Link
                      to="/vehicles"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-[var(--color-text)] hover:bg-[var(--color-surface-hover)]"
                    >
                      <Car className="w-4 h-4 text-[var(--color-primary)]" />
                      My Vehicles
                    </Link>
                    <Link
                      to="/settings"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-[var(--color-text)] hover:bg-[var(--color-surface-hover)]"
                    >
                      <User className="w-4 h-4 text-[var(--color-primary)]" />
                      Account Settings
                    </Link>
                    <div className="my-1 border-t border-[var(--color-border)]" />
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 text-left transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      Log Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="px-3 py-2 rounded-xl text-xs font-bold text-[var(--color-text)] hover:bg-black/5 transition-colors"
                >
                  Log In
                </Link>
                <Link
                  to="/signup"
                  className="px-3.5 py-2 rounded-xl text-xs font-bold text-white bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] transition-colors shadow-xs"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex sm:hidden items-center gap-2">
            <Link
              to="/notifications"
              className="relative p-2 rounded-xl border border-[var(--color-border)] text-[var(--color-text-muted)]"
              aria-label="Notifications"
            >
              <Bell className="w-4 h-4" />
              {unreadNotificationCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[var(--color-primary)] text-white text-[9px] font-bold flex items-center justify-center">
                  {unreadNotificationCount}
                </span>
              )}
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="p-2 rounded-xl border border-[var(--color-border)] text-[var(--color-text)]"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-t border-[var(--color-border)] bg-[var(--color-surface)] px-4 pt-3 pb-6 space-y-4 animate-in slide-in-from-top-3">
          {/* Mobile Theme Switcher */}
          <div className="flex items-center justify-between pb-3 border-b border-[var(--color-border)]">
            <span className="text-xs font-semibold text-[var(--color-text-muted)]">Switch Theme:</span>
            <ThemeSwitcher />
          </div>

          {/* Mobile Links */}
          <nav className="flex flex-col gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                      isActive
                        ? 'text-[var(--color-primary)] bg-[var(--color-accent-subtle)] font-bold'
                        : 'text-[var(--color-text)] hover:bg-[var(--color-surface-hover)]'
                    }`
                  }
                >
                  <Icon className="w-4 h-4 text-[var(--color-primary)]" />
                  <span>{link.name}</span>
                </NavLink>
              );
            })}
          </nav>

          {/* Additional mobile routes */}
          <div className="pt-2 border-t border-[var(--color-border)] flex flex-col gap-1">
            <Link
              to="/vehicles"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-semibold text-[var(--color-text)] hover:bg-[var(--color-surface-hover)]"
            >
              <Car className="w-4 h-4 text-[var(--color-primary)]" />
              <span>My Vehicles</span>
            </Link>
            <Link
              to="/settings"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-semibold text-[var(--color-text)] hover:bg-[var(--color-surface-hover)]"
            >
              <User className="w-4 h-4 text-[var(--color-primary)]" />
              <span>Settings</span>
            </Link>
          </div>

          {/* Auth section */}
          <div className="pt-3 border-t border-[var(--color-border)]">
            {isAuthenticated && user ? (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <img
                    src={user.avatarUrl}
                    alt={user.name}
                    className="w-8 h-8 rounded-lg object-cover"
                  />
                  <div>
                    <p className="text-xs font-bold text-[var(--color-text)]">{user.name}</p>
                    <p className="text-[10px] text-[var(--color-text-muted)] truncate max-w-[160px]">{user.email}</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="text-xs font-bold text-rose-600 px-3 py-1.5 rounded-lg border border-rose-200 hover:bg-rose-50"
                >
                  Log Out
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-center py-2 text-xs font-bold rounded-xl border border-[var(--color-border)] text-[var(--color-text)]"
                >
                  Log In
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-center py-2 text-xs font-bold rounded-xl bg-[var(--color-primary)] text-white"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
