import React, { useState } from 'react';
import { FastagAccount } from '../../types';
import { Modal } from '../common/Modal';
import { CreditCard, Zap, CheckCircle2, AlertCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface RechargeModalProps {
  isOpen: boolean;
  onClose: () => void;
  account: FastagAccount | null;
}

export const RechargeModal: React.FC<RechargeModalProps> = ({ isOpen, onClose, account }) => {
  const { rechargeFastag } = useApp();
  const [selectedAmount, setSelectedAmount] = useState<number>(500);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [paymentMode, setPaymentMode] = useState<string>('UPI (Demo)');

  if (!account) return null;

  const quickAmounts = [200, 500, 1000, 2000];

  const handleAmountClick = (amt: number) => {
    setSelectedAmount(amt);
    setCustomAmount('');
  };

  const handleCustomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/[^0-9]/g, '');
    setCustomAmount(val);
    if (val) {
      setSelectedAmount(Number(val));
    }
  };

  const finalAmount = customAmount ? Number(customAmount) : selectedAmount;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (finalAmount <= 0) return;
    rechargeFastag(account.id, finalAmount);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Simulated FASTag Wallet Recharge"
      description={`Top up FASTag linked to ${account.vehicleReg} (${account.issuer})`}
      maxWidth="md"
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Current Balance Card */}
        <div className="p-4 rounded-xl bg-[var(--color-surface-hover)] border border-[var(--color-border)] flex items-center justify-between">
          <div>
            <span className="text-[11px] text-[var(--color-text-muted)] font-semibold uppercase">
              Current Balance
            </span>
            <p className="text-xl font-black text-[var(--color-text)]">₹{account.balance}</p>
          </div>
          <div className="text-right">
            <span className="text-[11px] text-[var(--color-text-muted)] font-semibold uppercase">
              New Projected Balance
            </span>
            <p className="text-xl font-black text-emerald-600">
              ₹{account.balance + (finalAmount || 0)}
            </p>
          </div>
        </div>

        {/* Quick Amount Selection */}
        <div>
          <label className="block text-xs font-bold text-[var(--color-text)] mb-2">
            Select Top-Up Amount (₹)
          </label>
          <div className="grid grid-cols-4 gap-2">
            {quickAmounts.map((amt) => (
              <button
                key={amt}
                type="button"
                onClick={() => handleAmountClick(amt)}
                className={`py-2.5 px-2 rounded-xl text-xs font-black border transition-all ${
                  selectedAmount === amt && !customAmount
                    ? 'bg-[var(--color-primary)] text-white border-[var(--color-primary)] shadow-sm'
                    : 'bg-[var(--color-surface)] border-[var(--color-border)] text-[var(--color-text)] hover:bg-[var(--color-surface-hover)]'
                }`}
              >
                ₹{amt}
              </button>
            ))}
          </div>

          <div className="mt-3">
            <input
              type="text"
              placeholder="Or enter custom amount (e.g. 750)"
              value={customAmount}
              onChange={handleCustomChange}
              className="w-full py-2 px-3 text-xs rounded-xl bg-[var(--color-background)] border border-[var(--color-border)] text-[var(--color-text)] focus:outline-hidden focus:ring-2 focus:ring-[var(--color-accent)]"
            />
          </div>
        </div>

        {/* Payment Simulation Mode */}
        <div>
          <label className="block text-xs font-bold text-[var(--color-text)] mb-2">
            Simulated Payment Mode
          </label>
          <div className="grid grid-cols-3 gap-2 text-xs">
            {['UPI (Demo)', 'NetBanking (Demo)', 'Debit Card (Demo)'].map((mode) => (
              <button
                key={mode}
                type="button"
                onClick={() => setPaymentMode(mode)}
                className={`py-2 px-2 rounded-xl font-semibold border text-center transition-all ${
                  paymentMode === mode
                    ? 'border-[var(--color-primary)] bg-[var(--color-accent-subtle)] text-[var(--color-primary)] font-bold'
                    : 'border-[var(--color-border)] text-[var(--color-text-muted)] hover:bg-[var(--color-surface-hover)]'
                }`}
              >
                {mode.replace(' (Demo)', '')}
              </button>
            ))}
          </div>
        </div>

        {/* Notice */}
        <p className="text-[11px] text-[var(--color-text-muted)] bg-black/5 dark:bg-white/5 p-3 rounded-xl leading-relaxed">
          ℹ️ <strong>Demo Simulation Notice:</strong> No actual financial transaction will take place. Balance will instantly update in your local profile.
        </p>

        {/* Actions */}
        <div className="flex items-center gap-2 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="w-1/2 py-2.5 rounded-xl border border-[var(--color-border)] text-xs font-bold text-[var(--color-text-muted)]"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={!finalAmount || finalAmount <= 0}
            className="w-1/2 py-2.5 rounded-xl bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white text-xs font-bold shadow-md transition-all cursor-pointer"
          >
            Confirm Recharge (₹{finalAmount})
          </button>
        </div>
      </form>
    </Modal>
  );
};
