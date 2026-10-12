import React, { useState } from 'react';
import { ParkingFloor, ParkingSlot } from '../../types';
import { Zap, Accessibility, ShieldCheck, Bike, Check, Car } from 'lucide-react';

interface ParkingSlotGridProps {
  floors: ParkingFloor[];
  selectedSlot: ParkingSlot | null;
  onSelectSlot: (slot: ParkingSlot) => void;
  basePricePerHour: number;
}

export const ParkingSlotGrid: React.FC<ParkingSlotGridProps> = ({
  floors,
  selectedSlot,
  onSelectSlot,
  basePricePerHour,
}) => {
  const [selectedFloorId, setSelectedFloorId] = useState<string>(floors[0]?.id || '');

  const currentFloor = floors.find((f) => f.id === selectedFloorId) || floors[0];

  const getSlotTypeIcon = (type: ParkingSlot['type']) => {
    switch (type) {
      case 'ev':
        return <Zap className="w-3.5 h-3.5 text-teal-500" />;
      case 'accessible':
        return <Accessibility className="w-3.5 h-3.5 text-blue-500" />;
      case 'premium':
        return <ShieldCheck className="w-3.5 h-3.5 text-amber-500" />;
      case 'bike':
        return <Bike className="w-3.5 h-3.5 text-indigo-500" />;
      default:
        return <Car className="w-3.5 h-3.5 text-slate-400" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Floor Selection Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
        {floors.map((floor) => {
          const isFloorActive = floor.id === currentFloor?.id;
          return (
            <button
              key={floor.id}
              type="button"
              onClick={() => setSelectedFloorId(floor.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold shrink-0 transition-all ${
                isFloorActive
                  ? 'bg-[var(--color-primary)] text-white shadow-md'
                  : 'bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text-muted)] hover:text-[var(--color-text)]'
              }`}
            >
              <span>{floor.name}</span>
              <span className="ml-2 text-[10px] opacity-80">
                ({floor.availableSlots} free)
              </span>
            </button>
          );
        })}
      </div>

      {/* Grid Legend */}
      <div className="flex items-center justify-between flex-wrap gap-3 p-3.5 rounded-xl bg-[var(--color-surface-hover)] border border-[var(--color-border)] text-xs">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-1.5">
            <span className="w-3.5 h-3.5 rounded-md bg-emerald-100 border border-emerald-400 dark:bg-emerald-950" />
            <span className="text-[var(--color-text-muted)]">Available</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3.5 h-3.5 rounded-md bg-[var(--color-primary)] border border-[var(--color-primary)]" />
            <span className="text-[var(--color-text)] font-semibold">Your Selected</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3.5 h-3.5 rounded-md bg-amber-100 border border-amber-300 dark:bg-amber-950/40" />
            <span className="text-[var(--color-text-muted)]">Reserved</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3.5 h-3.5 rounded-md bg-slate-200 border border-slate-300 dark:bg-slate-800" />
            <span className="text-[var(--color-text-muted)]">Occupied</span>
          </div>
        </div>

        <div className="flex items-center gap-3 text-[11px] text-[var(--color-text-muted)]">
          <span className="inline-flex items-center gap-1">
            <Zap className="w-3 h-3 text-teal-600" /> EV Port
          </span>
          <span className="inline-flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-amber-600" /> Premium Wide
          </span>
        </div>
      </div>

      {/* Parking Slot Matrix */}
      <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-5 shadow-xs">
        <div className="mb-4 flex items-center justify-between text-xs text-[var(--color-text-muted)]">
          <span className="font-semibold text-[var(--color-text)]">
            Lane A & B (Entry Barrier Side)
          </span>
          <span>Click any green slot to reserve</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2.5">
          {currentFloor?.slots.map((slot) => {
            const isSelected = selectedSlot?.id === slot.id;
            const isAvailable = slot.status === 'available';
            const isOccupied = slot.status === 'occupied';
            const isReserved = slot.status === 'reserved';

            const slotPrice = Math.round(basePricePerHour * slot.pricePerHourMultiplier);

            return (
              <button
                key={slot.id}
                type="button"
                disabled={!isAvailable && !isSelected}
                onClick={() => onSelectSlot(slot)}
                className={`group relative p-2.5 rounded-xl border flex flex-col items-center justify-between transition-all min-h-[82px] text-left ${
                  isSelected
                    ? 'bg-[var(--color-primary)] text-white border-[var(--color-primary)] shadow-lg scale-105 z-10'
                    : isAvailable
                    ? 'bg-emerald-50/60 hover:bg-emerald-100/80 dark:bg-emerald-950/20 dark:hover:bg-emerald-950/40 border-emerald-300 text-emerald-950 dark:text-emerald-200 hover:scale-102 cursor-pointer'
                    : isReserved
                    ? 'bg-amber-50/50 dark:bg-amber-950/20 border-amber-200/80 text-amber-800 dark:text-amber-300 opacity-60 cursor-not-allowed'
                    : 'bg-slate-100 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 text-slate-400 opacity-50 cursor-not-allowed'
                }`}
                aria-label={`Slot ${slot.number}, Type: ${slot.type}, Status: ${
                  isSelected ? 'Selected' : slot.status
                }, Rate: ₹${slotPrice}/hr`}
              >
                {/* Header Icon + Type */}
                <div className="w-full flex items-center justify-between">
                  <span className="text-[10px] font-bold tracking-wider">{slot.number}</span>
                  <div className="shrink-0">{isSelected ? <Check className="w-3.5 h-3.5" /> : getSlotTypeIcon(slot.type)}</div>
                </div>

                {/* Middle state indicator */}
                <div className="my-1 text-center">
                  <span
                    className={`text-[9px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded ${
                      isSelected
                        ? 'bg-white/20 text-white'
                        : isAvailable
                        ? 'text-emerald-700 dark:text-emerald-300'
                        : isReserved
                        ? 'text-amber-700'
                        : 'text-slate-500'
                    }`}
                  >
                    {isSelected ? 'SELECTED' : isAvailable ? 'FREE' : slot.status}
                  </span>
                </div>

                {/* Footer price */}
                <div className="w-full text-right">
                  <span className={`text-[10px] font-extrabold ${isSelected ? 'text-white' : 'text-[var(--color-text-muted)]'}`}>
                    ₹{slotPrice}/hr
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Slot Confirmation Bar */}
      {selectedSlot && (
        <div className="p-4 rounded-xl bg-[var(--color-accent-subtle)] border border-[var(--color-card-border)] flex items-center justify-between flex-wrap gap-3 animate-in fade-in">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[var(--color-primary)] text-white flex items-center justify-center font-black">
              {selectedSlot.number}
            </div>
            <div>
              <p className="text-xs font-bold text-[var(--color-text)]">
                Selected: Slot {selectedSlot.number} ({selectedSlot.floor})
              </p>
              <p className="text-[11px] text-[var(--color-text-muted)] capitalize">
                Type: {selectedSlot.type} slot • Rate: ₹
                {Math.round(basePricePerHour * selectedSlot.pricePerHourMultiplier)}/hr
              </p>
            </div>
          </div>
          <span className="text-xs font-bold text-[var(--color-primary)] bg-white px-3 py-1.5 rounded-lg border border-[var(--color-card-border)] shadow-xs">
            Slot Locked for Booking
          </span>
        </div>
      )}
    </div>
  );
};
