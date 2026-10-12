import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useToast } from '../context/ToastContext';
import { RechargeModal } from '../components/fastag/RechargeModal';
import { StatusBadge } from '../components/common/StatusBadge';
import { FastagAccount, FastagIssuer } from '../types';
import { sampleFastagIssuers } from '../data/mockFastag';
import {
  CreditCard,
  AlertTriangle,
  RotateCcw,
  ShieldCheck,
  Zap,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  Sparkles,
  CheckCircle2,
  Sliders,
  Calendar,
} from 'lucide-react';

export const FastagPage: React.FC = () => {
  const {
    fastagAccounts,
    updateFastagAutoRecharge,
    renewFastag,
  } = useApp();
  const toast = useToast();

  const [selectedTagId, setSelectedTagId] = useState<string>(fastagAccounts[0]?.id || '');
  const [rechargeModalOpen, setRechargeModalOpen] = useState(false);

  // Renewal form state
  const [renewalYear, setRenewalYear] = useState<number>(2031);
  const [renewalChassis, setRenewalChassis] = useState<string>('MA3ERB21S0019284');
  const [renewalStep, setRenewalStep] = useState<'form' | 'success'>('form');

  const currentAccount = fastagAccounts.find((t) => t.id === selectedTagId) || fastagAccounts[0];

  const handleToggleAutoRecharge = (enabled: boolean) => {
    if (!currentAccount) return;
    updateFastagAutoRecharge(
      currentAccount.id,
      enabled,
      currentAccount.thresholdAmount,
      currentAccount.autoRechargeAmount
    );
  };

  const handleUpdateThreshold = (threshold: number) => {
    if (!currentAccount) return;
    updateFastagAutoRecharge(
      currentAccount.id,
      currentAccount.autoRecharge,
      threshold,
      currentAccount.autoRechargeAmount
    );
  };

  const handleRenewalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!renewalChassis || renewalChassis.length < 8) {
      toast.error('Invalid Chassis', 'Please enter a valid 17-digit or 8-digit vehicle Chassis / VIN number.');
      return;
    }
    renewFastag(currentAccount.id, renewalYear);
    setRenewalStep('success');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Header with Demo Notice */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 text-xs font-bold border border-amber-200 dark:border-amber-800">
          <CreditCard className="w-3.5 h-3.5" />
          <span>NETC National Electronic Toll Collection • FASTag Simulation</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-[var(--color-text)] tracking-tight">
          FASTag Management & Parking Auto-Debit
        </h1>
        <p className="text-xs sm:text-sm text-[var(--color-text-muted)] max-w-2xl">
          Link your vehicle&apos;s RFID tag for barrier-free railway station entry, instant simulated recharges, balance alerts, and tag renewal.
        </p>
      </div>

      {/* Account Selector Tabs (if multiple vehicles) */}
      <div className="flex items-center gap-3 overflow-x-auto pb-1 no-scrollbar">
        {fastagAccounts.map((acc) => (
          <button
            key={acc.id}
            type="button"
            onClick={() => setSelectedTagId(acc.id)}
            className={`p-4 rounded-2xl border text-left shrink-0 transition-all min-w-[240px] ${
              acc.id === currentAccount?.id
                ? 'bg-[var(--color-surface)] border-[var(--color-primary)] shadow-md ring-2 ring-[var(--color-accent)]/20'
                : 'bg-[var(--color-surface)]/50 border-[var(--color-border)] hover:bg-[var(--color-surface)]'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase text-[var(--color-text-muted)]">
                {acc.issuer}
              </span>
              <StatusBadge
                label={acc.status === 'low_balance' ? 'Low Balance' : 'Active'}
                variant={acc.status === 'low_balance' ? 'warning' : 'success'}
                size="sm"
              />
            </div>
            <p className="font-extrabold text-sm text-[var(--color-text)] mt-1">{acc.vehicleReg}</p>
            <p className="text-xs font-black text-[var(--color-primary)] mt-1">₹{acc.balance}</p>
          </button>
        ))}
      </div>

      {/* Main Grid: Card Details & Top-Up (Left) + Renewal & Transactions (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left Column: Visual RFID Card & Controls */}
        <div className="lg:col-span-1 space-y-6">
          {/* Visual Credit/RFID Card Representation */}
          <div className="relative rounded-3xl bg-gradient-to-br from-[#1E293B] via-[#0F172A] to-[#020617] text-white p-7 shadow-2xl overflow-hidden border border-slate-700/50">
            {/* Hologram / RFID Logo */}
            <div className="flex items-center justify-between mb-8">
              <span className="font-mono text-xs tracking-widest text-slate-400 font-bold">
                FASTag • NETC
              </span>
              <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-white/10 text-slate-200">
                {currentAccount.issuer}
              </span>
            </div>

            {/* Chip & NFC symbol */}
            <div className="w-10 h-7 rounded-md bg-gradient-to-tr from-amber-300 to-amber-500 mb-6 shadow-inner" />

            <div className="space-y-1">
              <span className="text-[10px] tracking-wider text-slate-400 uppercase font-bold">
                Vehicle Plate
              </span>
              <p className="font-mono font-black text-xl tracking-wider text-white">
                {currentAccount.vehicleReg}
              </p>
              <p className="text-[11px] font-mono text-slate-400">
                Tag ID: {currentAccount.tagId}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-700/60 flex items-center justify-between text-xs">
              <div>
                <span className="text-[10px] text-slate-400 uppercase block">Wallet Balance</span>
                <span className="text-xl font-black text-emerald-400">₹{currentAccount.balance}</span>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-slate-400 uppercase block">Valid Thru</span>
                <span className="font-semibold text-slate-200">{currentAccount.expiryDate}</span>
              </div>
            </div>
          </div>

          {/* Quick Recharge Button */}
          <button
            type="button"
            onClick={() => setRechargeModalOpen(true)}
            className="w-full py-3.5 px-4 rounded-2xl bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white text-xs font-extrabold shadow-lg shadow-[var(--color-card-border)] flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-98"
          >
            <Zap className="w-4 h-4" />
            <span>Recharge FASTag Wallet (Simulated)</span>
          </button>

          {/* Auto-Recharge & Balance Threshold Rules */}
          <div className="rounded-3xl bg-[var(--color-surface)] border border-[var(--color-border)] p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-bold text-sm text-[var(--color-text)]">
                  Smart Auto-Reload
                </h4>
                <p className="text-[11px] text-[var(--color-text-muted)]">
                  Auto-debit when balance falls below threshold
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={currentAccount.autoRecharge}
                  onChange={(e) => handleToggleAutoRecharge(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--color-primary)]" />
              </label>
            </div>

            {currentAccount.autoRecharge && (
              <div className="space-y-3 pt-3 border-t border-[var(--color-border)] text-xs">
                <div>
                  <div className="flex justify-between font-bold text-[var(--color-text)] mb-1">
                    <span>Low Balance Alert Threshold</span>
                    <span className="text-[var(--color-primary)]">₹{currentAccount.thresholdAmount}</span>
                  </div>
                  <input
                    type="range"
                    min="100"
                    max="1000"
                    step="50"
                    value={currentAccount.thresholdAmount}
                    onChange={(e) => handleUpdateThreshold(Number(e.target.value))}
                    className="w-full accent-[var(--color-primary)]"
                  />
                </div>
                <div className="p-3 rounded-xl bg-[var(--color-surface-hover)] border border-[var(--color-border)] flex justify-between items-center">
                  <span className="text-[var(--color-text-muted)]">Auto Reload Amount:</span>
                  <span className="font-bold text-[var(--color-text)]">₹{currentAccount.autoRechargeAmount}</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Renewal Form & Transaction History */}
        <div className="lg:col-span-2 space-y-8">
          {/* FASTag Validity Renewal Form */}
          <div className="rounded-3xl bg-[var(--color-surface)] border border-[var(--color-border)] p-6 sm:p-8 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-extrabold text-base text-[var(--color-text)] flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[var(--color-primary)]" />
                  <span>FASTag Validity & KYC Renewal</span>
                </h3>
                <p className="text-xs text-[var(--color-text-muted)] mt-0.5">
                  Extend tag expiry date under NPCI regulations for vehicle {currentAccount.vehicleReg}
                </p>
              </div>
              <StatusBadge label={currentAccount.kycStatus} variant="success" size="sm" />
            </div>

            {renewalStep === 'success' ? (
              <div className="p-5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200 text-xs space-y-2">
                <div className="flex items-center gap-2 font-bold text-sm">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Validity Extended Successfully (Demo Simulation)</span>
                </div>
                <p>
                  Your FASTag validity for {currentAccount.vehicleReg} is now active until{' '}
                  <strong>31 Dec {renewalYear}</strong>. No physical tag replacement required.
                </p>
                <button
                  type="button"
                  onClick={() => setRenewalStep('form')}
                  className="mt-2 text-xs font-bold text-emerald-700 underline"
                >
                  Renew Another Tag
                </button>
              </div>
            ) : (
              <form onSubmit={handleRenewalSubmit} className="space-y-4 pt-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[var(--color-text)] mb-1">
                      Vehicle Chassis Number (Last 8 or 17 Digits)
                    </label>
                    <input
                      type="text"
                      value={renewalChassis}
                      onChange={(e) => setRenewalChassis(e.target.value.toUpperCase())}
                      className="w-full py-2 px-3 text-xs rounded-xl bg-[var(--color-background)] border border-[var(--color-border)] text-[var(--color-text)] font-mono"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[var(--color-text)] mb-1">
                      Extend Expiry Year Until
                    </label>
                    <select
                      value={renewalYear}
                      onChange={(e) => setRenewalYear(Number(e.target.value))}
                      className="w-full py-2 px-3 text-xs rounded-xl bg-[var(--color-background)] border border-[var(--color-border)] text-[var(--color-text)] font-semibold"
                    >
                      <option value={2030}>2030 (4 Years)</option>
                      <option value={2031}>2031 (5 Years Standard)</option>
                      <option value={2033}>2033 (7 Years Extended)</option>
                    </select>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-[var(--color-surface-hover)] border border-[var(--color-border)] text-xs text-[var(--color-text-muted)] flex items-center justify-between">
                  <span>Simulated NPCI Processing Fee:</span>
                  <span className="font-bold text-emerald-600">₹0 (Waived for ParkEase users)</span>
                </div>

                <button
                  type="submit"
                  className="py-2.5 px-4 rounded-xl bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white text-xs font-bold shadow-xs transition-colors"
                >
                  Submit Simulated Renewal
                </button>
              </form>
            )}
          </div>

          {/* Transaction History */}
          <div className="rounded-3xl bg-[var(--color-surface)] border border-[var(--color-border)] p-6 sm:p-8 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-extrabold text-base text-[var(--color-text)]">
                  Transaction & Toll History
                </h3>
                <p className="text-xs text-[var(--color-text-muted)]">
                  All station parking debits, highway tolls, and recharges
                </p>
              </div>
              <span className="text-xs text-[var(--color-text-muted)]">
                {currentAccount.transactions.length} records
              </span>
            </div>

            <div className="space-y-3">
              {currentAccount.transactions.map((tx) => {
                const isCredit = tx.amount > 0;
                return (
                  <div
                    key={tx.id}
                    className="p-3.5 rounded-2xl bg-[var(--color-background)] border border-[var(--color-border)] flex items-center justify-between gap-3 text-xs"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                          isCredit
                            ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40'
                            : 'bg-rose-50 text-rose-600 dark:bg-rose-950/40'
                        }`}
                      >
                        {isCredit ? <ArrowDownRight className="w-4 h-4" /> : <ArrowUpRight className="w-4 h-4" />}
                      </div>
                      <div>
                        <p className="font-bold text-[var(--color-text)]">{tx.description}</p>
                        <p className="text-[11px] text-[var(--color-text-muted)]">
                          {tx.date} • Ref #{tx.reference}
                        </p>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span
                        className={`font-black text-sm ${
                          isCredit ? 'text-emerald-600' : 'text-[var(--color-text)]'
                        }`}
                      >
                        {isCredit ? `+₹${tx.amount}` : `-₹${Math.abs(tx.amount)}`}
                      </span>
                      <StatusBadge label={tx.status} variant="success" size="sm" className="block mt-0.5" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Recharge Modal */}
      <RechargeModal
        isOpen={rechargeModalOpen}
        onClose={() => setRechargeModalOpen(false)}
        account={currentAccount}
      />
    </div>
  );
};
