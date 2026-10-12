import React from 'react';
import { ParkingLocation, ParkingSlot, Vehicle } from '../../types';
import { Clock, ShieldCheck, Car, CreditCard, Sparkles } from 'lucide-react';

interface BookingSummaryCardProps {
  parking: ParkingLocation;
  slot: ParkingSlot | null;
  vehicles: Vehicle[];
  selectedVehicleId: string;
  onSelectVehicle: (id: string) => void;
  arrivalDateTime: string;
  departureDateTime: string;
  durationHours: number;
  paymentMethod: string;
  onSelectPaymentMethod: (method: string) => void;
  onConfirmBooking: () => void;
  isLoading?: boolean;
}

export const BookingSummaryCard: React.FC<BookingSummaryCardProps> = ({
  parking,
  slot,
  vehicles,
  selectedVehicleId,
  onSelectVehicle,
  arrivalDateTime,
  departureDateTime,
  durationHours,
  paymentMethod,
  onSelectPaymentMethod,
  onConfirmBooking,
  isLoading = false,
}) => {
  const multiplier = slot ? slot.pricePerHourMultiplier : 1.0;
  const baseRate = Math.round(parking.pricePerHour * multiplier);
  const subtotal = baseRate * Math.max(1, durationHours);
  const gst = Math.round(subtotal * 0.18);
  const total = subtotal + gst;

  const paymentOptions = [
    { id: 'FASTag Auto-Debit (Demo)', label: 'FASTag Auto-Debit', sub: 'Express boom-barrier entry' },
    { id: 'UPI Instant (Demo)', label: 'UPI / QR Scan', sub: 'GPay, PhonePe, Paytm' },
    { id: 'Card / NetBanking (Demo)', label: 'Card / NetBanking', sub: 'Visa, Mastercard, RuPay' },
  ];

  const canConfirm = !!slot && !!selectedVehicleId && durationHours > 0;

  return (
    <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-6 shadow-xl space-y-6 sticky top-24">
      <div className="border-b border-[var(--color-border)] pb-4">
        <h3 className="font-extrabold text-lg text-[var(--color-text)]">
          Reservation Summary
        </h3>
        <p className="text-xs text-[var(--color-text-muted)] mt-0.5">
          {parking.name} • {parking.stationName}
        </p>
      </div>

      {/* Vehicle Selection */}
      <div>
        <label className="block text-xs font-bold text-[var(--color-text)] mb-2">
          Select Vehicle to Park
        </label>
        {vehicles.length === 0 ? (
          <p className="text-xs text-rose-500">Please register a vehicle in My Vehicles first.</p>
        ) : (
          <select
            value={selectedVehicleId}
            onChange={(e) => onSelectVehicle(e.target.value)}
            className="w-full py-2.5 px-3 text-xs sm:text-sm rounded-xl bg-[var(--color-background)] border border-[var(--color-border)] text-[var(--color-text)] font-semibold focus:outline-hidden focus:ring-2 focus:ring-[var(--color-accent)]"
          >
            {vehicles.map((v) => (
              <option key={v.id} value={v.id}>
                {v.make} {v.model} ({v.registrationNumber}) {v.isDefault ? '• Default' : ''}
              </option>
            ))}
          </select>
        )}
      </div>

      {/* Duration & Slot details */}
      <div className="space-y-2 text-xs bg-[var(--color-surface-hover)] p-4 rounded-xl border border-[var(--color-border)]">
        <div className="flex items-center justify-between">
          <span className="text-[var(--color-text-muted)]">Selected Slot:</span>
          <span className="font-bold text-[var(--color-text)]">
            {slot ? `${slot.number} (${slot.floor})` : 'Select a green slot above'}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-[var(--color-text-muted)]">Parking Duration:</span>
          <span className="font-bold text-[var(--color-text)]">
            {durationHours} {durationHours === 1 ? 'Hour' : 'Hours'}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-[var(--color-text-muted)]">Base Slot Rate:</span>
          <span className="font-bold text-[var(--color-text)]">
            ₹{baseRate} / hr {multiplier !== 1 && `(${slot?.type})`}
          </span>
        </div>
      </div>

      {/* Payment Method Selector */}
      <div>
        <label className="block text-xs font-bold text-[var(--color-text)] mb-2">
          Payment Simulation Method
        </label>
        <div className="space-y-2">
          {paymentOptions.map((opt) => (
            <label
              key={opt.id}
              className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                paymentMethod === opt.id
                  ? 'border-[var(--color-primary)] bg-[var(--color-accent-subtle)]/40 shadow-xs'
                  : 'border-[var(--color-border)] hover:bg-[var(--color-surface-hover)]'
              }`}
            >
              <input
                type="radio"
                name="paymentMethod"
                value={opt.id}
                checked={paymentMethod === opt.id}
                onChange={() => onSelectPaymentMethod(opt.id)}
                className="mt-0.5 text-[var(--color-primary)] focus:ring-[var(--color-primary)]"
              />
              <div className="flex-1">
                <span className="block text-xs font-bold text-[var(--color-text)]">
                  {opt.label}
                </span>
                <span className="block text-[11px] text-[var(--color-text-muted)]">
                  {opt.sub}
                </span>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Bill Calculation */}
      <div className="border-t border-[var(--color-border)] pt-4 space-y-2 text-xs">
        <div className="flex justify-between text-[var(--color-text-muted)]">
          <span>Parking Charge ({durationHours} hrs × ₹{baseRate}):</span>
          <span>₹{subtotal}</span>
        </div>
        <div className="flex justify-between text-[var(--color-text-muted)]">
          <span>GST (18% Statutory):</span>
          <span>₹{gst}</span>
        </div>
        <div className="flex justify-between text-base font-black text-[var(--color-text)] pt-2 border-t border-[var(--color-border)]">
          <span>Total Payable:</span>
          <span className="text-[var(--color-primary)]">₹{total}</span>
        </div>
      </div>

      {/* Confirm Button */}
      <button
        type="button"
        disabled={!canConfirm || isLoading}
        onClick={onConfirmBooking}
        className={`w-full py-3.5 px-4 rounded-xl font-bold text-sm text-white shadow-md transition-all flex items-center justify-center gap-2 ${
          canConfirm && !isLoading
            ? 'bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] cursor-pointer scale-100 hover:scale-102 active:scale-98'
            : 'bg-slate-300 dark:bg-slate-700 cursor-not-allowed opacity-70'
        }`}
      >
        <Sparkles className="w-4 h-4" />
        <span>
          {isLoading ? 'Processing Simulation...' : slot ? `Confirm & Reserve Slot ${slot.number}` : 'Select a Slot to Continue'}
        </span>
      </button>

      <p className="text-[10px] text-center text-[var(--color-text-muted)]">
        🔒 Demo transaction. No actual money will be charged.
      </p>
    </div>
  );
};
