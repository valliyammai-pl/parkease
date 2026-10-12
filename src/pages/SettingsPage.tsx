import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useApp } from '../context/AppContext';
import { useToast } from '../context/ToastContext';
import { Modal } from '../components/common/Modal';
import {
  User,
  Palette,
  Bell,
  Car,
  RotateCcw,
  LogOut,
  ShieldAlert,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const { user, updateProfile, logout } = useAuth();
  const { theme, setTheme } = useTheme();
  const { vehicles, setDefaultVehicle, resetDemoData } = useApp();
  const toast = useToast();
  const navigate = useNavigate();

  // Profile fields state
  const [name, setName] = useState(user?.name || 'Aarav Sharma');
  const [email, setEmail] = useState(user?.email || 'aarav.sharma@example.in');
  const [phone, setPhone] = useState(user?.phone || '+91 98765 43210');

  // Preferences toggles
  const [parkingAlerts, setParkingAlerts] = useState(true);
  const [fastagAlerts, setFastagAlerts] = useState(true);
  const [insuranceAlerts, setInsuranceAlerts] = useState(true);
  const [serviceUpdates, setServiceUpdates] = useState(true);

  // Reset confirmation modal state
  const [resetModalOpen, setResetModalOpen] = useState(false);

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({ name, email, phone });
    toast.success('Profile Updated', 'Demo profile changes saved to local session.');
  };

  const handleConfirmReset = () => {
    resetDemoData();
    setResetModalOpen(false);
  };

  const handleLogout = () => {
    logout();
    toast.info('Logged Out', 'You have been signed out of the demo account.');
    navigate('/');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-black text-[var(--color-text)] tracking-tight">
          Account & Demo Preferences
        </h1>
        <p className="text-xs sm:text-sm text-[var(--color-text-muted)] mt-1">
          Customize your profile, active website theme, smart reminders, and reset demo data.
        </p>
      </div>

      {/* 1. PROFILE INFORMATION */}
      <div className="rounded-3xl bg-[var(--color-surface)] border border-[var(--color-border)] p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex items-center gap-3 pb-4 border-b border-[var(--color-border)]">
          <div className="w-10 h-10 rounded-xl bg-[var(--color-accent-subtle)] text-[var(--color-primary)] flex items-center justify-center">
            <User className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-extrabold text-base text-[var(--color-text)]">
              Personal Profile
            </h3>
            <p className="text-xs text-[var(--color-text-muted)]">
              Stored locally for demo persistence
            </p>
          </div>
        </div>

        <form onSubmit={handleProfileSave} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[var(--color-text)] mb-1">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full py-2 px-3 text-xs rounded-xl bg-[var(--color-background)] border border-[var(--color-border)] text-[var(--color-text)] font-semibold"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[var(--color-text)] mb-1">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full py-2 px-3 text-xs rounded-xl bg-[var(--color-background)] border border-[var(--color-border)] text-[var(--color-text)]"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[var(--color-text)] mb-1">
                Mobile Number
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full py-2 px-3 text-xs rounded-xl bg-[var(--color-background)] border border-[var(--color-border)] text-[var(--color-text)]"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[var(--color-text)] mb-1">
                Default Primary Vehicle
              </label>
              <select
                value={vehicles.find((v) => v.isDefault)?.id || vehicles[0]?.id || ''}
                onChange={(e) => setDefaultVehicle(e.target.value)}
                className="w-full py-2 px-3 text-xs rounded-xl bg-[var(--color-background)] border border-[var(--color-border)] text-[var(--color-text)] font-semibold"
              >
                {vehicles.map((v) => (
                  <option key={v.id} value={v.id}>
                    {v.make} {v.model} ({v.registrationNumber})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="py-2.5 px-4 rounded-xl bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white text-xs font-bold shadow-xs transition-colors cursor-pointer"
            >
              Save Profile Changes
            </button>
          </div>
        </form>
      </div>

      {/* 2. BRAND THEME SELECTION */}
      <div className="rounded-3xl bg-[var(--color-surface)] border border-[var(--color-border)] p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex items-center gap-3 pb-4 border-b border-[var(--color-border)]">
          <div className="w-10 h-10 rounded-xl bg-[var(--color-accent-subtle)] text-[var(--color-primary)] flex items-center justify-center">
            <Palette className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-extrabold text-base text-[var(--color-text)]">
              Appearance & Brand Theme
            </h3>
            <p className="text-xs text-[var(--color-text-muted)]">
              Switch entire website palettes instantly with design tokens
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Theme A: Teal */}
          <div
            onClick={() => setTheme('teal')}
            className={`p-5 rounded-2xl border cursor-pointer transition-all ${
              theme === 'teal'
                ? 'border-[#0F766E] ring-2 ring-[#14B8A6]/40 bg-[#F5F8F7] shadow-md'
                : 'border-[var(--color-border)] bg-[var(--color-surface)] hover:bg-black/5'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-full bg-[#0F766E] border border-white shadow-xs" />
                <h4 className="font-extrabold text-sm text-[#172B2A]">Theme A: Teal</h4>
              </div>
              {theme === 'teal' && (
                <span className="text-[10px] font-black uppercase text-[#0F766E] bg-teal-100 px-2 py-0.5 rounded-full">
                  Active
                </span>
              )}
            </div>
            <p className="text-xs text-[#526362] leading-relaxed">
              Modern smart transit aesthetic inspired by sustainable mobility, EV infrastructure, and high-efficiency rail corridors.
            </p>
            <div className="flex items-center gap-1.5 mt-4">
              <span className="w-5 h-5 rounded-md bg-[#0F766E]" title="Primary #0F766E" />
              <span className="w-5 h-5 rounded-md bg-[#134E4A]" title="Dark #134E4A" />
              <span className="w-5 h-5 rounded-md bg-[#14B8A6]" title="Accent #14B8A6" />
              <span className="w-5 h-5 rounded-md bg-[#F5F8F7] border border-slate-300" title="Background #F5F8F7" />
            </div>
          </div>

          {/* Theme B: Burgundy */}
          <div
            onClick={() => setTheme('burgundy')}
            className={`p-5 rounded-2xl border cursor-pointer transition-all ${
              theme === 'burgundy'
                ? 'border-[#701F3D] ring-2 ring-[#B85C78]/40 bg-[#FAF5F6] shadow-md'
                : 'border-[var(--color-border)] bg-[var(--color-surface)] hover:bg-black/5'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-full bg-[#701F3D] border border-white shadow-xs" />
                <h4 className="font-extrabold text-sm text-[#302126]">Theme B: Burgundy</h4>
              </div>
              {theme === 'burgundy' && (
                <span className="text-[10px] font-black uppercase text-[#701F3D] bg-rose-100 px-2 py-0.5 rounded-full">
                  Active
                </span>
              )}
            </div>
            <p className="text-xs text-[#6B555D] leading-relaxed">
              Warm regal palette drawing from classic Indian railway station architecture, heritage brick concourses, and executive travel.
            </p>
            <div className="flex items-center gap-1.5 mt-4">
              <span className="w-5 h-5 rounded-md bg-[#701F3D]" title="Primary #701F3D" />
              <span className="w-5 h-5 rounded-md bg-[#491326]" title="Dark #491326" />
              <span className="w-5 h-5 rounded-md bg-[#B85C78]" title="Accent #B85C78" />
              <span className="w-5 h-5 rounded-md bg-[#FAF5F6] border border-rose-200" title="Background #FAF5F6" />
            </div>
          </div>
        </div>
      </div>

      {/* 3. NOTIFICATION PREFERENCES */}
      <div className="rounded-3xl bg-[var(--color-surface)] border border-[var(--color-border)] p-6 sm:p-8 shadow-xs space-y-4">
        <div className="flex items-center gap-3 pb-4 border-b border-[var(--color-border)]">
          <div className="w-10 h-10 rounded-xl bg-[var(--color-accent-subtle)] text-[var(--color-primary)] flex items-center justify-center">
            <Bell className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-extrabold text-base text-[var(--color-text)]">
              Alert Preferences
            </h3>
            <p className="text-xs text-[var(--color-text-muted)]">
              Control which simulated system alerts appear in your notifications panel
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {[
            {
              title: 'Parking Reservation & Slot Reminders',
              desc: 'Updates about bay holds, departure grace period, and booking receipts.',
              checked: parkingAlerts,
              toggle: () => setParkingAlerts(!parkingAlerts),
            },
            {
              title: 'FASTag Low-Balance Warnings',
              desc: 'Trigger automatic notifications when wallet falls below configured threshold.',
              checked: fastagAlerts,
              toggle: () => setFastagAlerts(!fastagAlerts),
            },
            {
              title: 'Insurance Policy Expiry Reminders',
              desc: 'Alerts 30 and 15 days before policy expiration to preserve NCB discounts.',
              checked: insuranceAlerts,
              toggle: () => setInsuranceAlerts(!insuranceAlerts),
            },
            {
              title: 'Vehicle Care & Technician Updates',
              desc: 'Live milestones when car wash or tyre assistance is assigned and completed.',
              checked: serviceUpdates,
              toggle: () => setServiceUpdates(!serviceUpdates),
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-3.5 rounded-xl bg-[var(--color-surface-hover)] border border-[var(--color-border)]"
            >
              <div>
                <p className="font-bold text-xs text-[var(--color-text)]">{item.title}</p>
                <p className="text-[11px] text-[var(--color-text-muted)]">{item.desc}</p>
              </div>
              <input
                type="checkbox"
                checked={item.checked}
                onChange={item.toggle}
                className="rounded text-[var(--color-primary)] focus:ring-[var(--color-primary)] w-4 h-4 cursor-pointer"
              />
            </div>
          ))}
        </div>
      </div>

      {/* 4. DANGER ZONE: RESET DEMO DATA & LOGOUT */}
      <div className="rounded-3xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900 p-6 sm:p-8 space-y-4">
        <h3 className="font-extrabold text-base text-rose-700 dark:text-rose-300 flex items-center gap-2">
          <ShieldAlert className="w-5 h-5 text-rose-600" />
          <span>Demo Data Management & Session</span>
        </h3>
        <p className="text-xs text-[var(--color-text-muted)]">
          Need to test the initial portfolio experience from scratch? Clear modified localStorage states to restore default seed bookings, vehicles, and FASTag balances.
        </p>

        <div className="flex items-center gap-3 pt-2 flex-wrap">
          <button
            type="button"
            onClick={() => setResetModalOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-xs flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset All Demo Data</span>
          </button>

          <button
            type="button"
            onClick={handleLogout}
            className="px-4 py-2.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] hover:bg-[var(--color-surface-hover)] text-xs font-bold text-[var(--color-text)] flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4 text-rose-500" />
            <span>Log Out</span>
          </button>
        </div>
      </div>

      {/* Reset Confirmation Modal */}
      <Modal
        isOpen={resetModalOpen}
        onClose={() => setResetModalOpen(false)}
        title="Confirm Reset Demo Data?"
        description="This will clear your local storage and restore all seed values to default."
        maxWidth="sm"
      >
        <div className="space-y-4">
          <p className="text-xs text-[var(--color-text-muted)] leading-relaxed">
            All created bookings, custom vehicles, recharged FASTag funds, and insurance claims will be reverted to the original mock demonstration state.
          </p>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setResetModalOpen(false)}
              className="w-1/2 py-2 text-xs font-bold rounded-xl border border-[var(--color-border)] text-[var(--color-text-muted)]"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleConfirmReset}
              className="w-1/2 py-2 text-xs font-bold rounded-xl bg-rose-600 text-white shadow-xs"
            >
              Yes, Reset Data
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
