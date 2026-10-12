import React from 'react';
import { ParkingLocation } from '../../types';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  MapPin,
  Star,
  Zap,
  ShieldCheck,
  Umbrella,
  Heart,
  Clock,
  Car,
  ChevronRight,
} from 'lucide-react';

interface ParkingCardProps {
  parking: ParkingLocation;
}

export const ParkingCard: React.FC<ParkingCardProps> = ({ parking }) => {
  const { toggleSaveParking, isParkingSaved } = useApp();
  const saved = isParkingSaved(parking.id);

  const availabilityPercentage = Math.round((parking.availableSlots / parking.totalSlots) * 100);
  const isHighAvailability = availabilityPercentage > 40;
  const isLowAvailability = availabilityPercentage < 20;

  return (
    <div className="group rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-[var(--color-primary)]/40 hover:shadow-xl transition-all duration-200 overflow-hidden flex flex-col">
      {/* Top Image Banner */}
      <div className="relative h-48 w-full overflow-hidden bg-slate-100">
        <img
          src={parking.imageUrl}
          alt={parking.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
          <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[11px] font-semibold border border-white/10">
            <MapPin className="w-3 h-3 text-[var(--color-accent)] shrink-0" />
            <span className="truncate max-w-[140px]">{parking.stationName}</span>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              toggleSaveParking(parking.id);
            }}
            className={`p-2 rounded-full backdrop-blur-md transition-all ${
              saved
                ? 'bg-rose-500 text-white shadow-md'
                : 'bg-black/50 text-white/80 hover:text-white hover:bg-black/70'
            }`}
            aria-label={saved ? 'Remove from saved parking' : 'Save parking location'}
          >
            <Heart className={`w-3.5 h-3.5 ${saved ? 'fill-white' : ''}`} />
          </button>
        </div>

        {/* Bottom Image Stats */}
        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between text-white">
          <div>
            <span className="text-xl font-black leading-none">₹{parking.pricePerHour}</span>
            <span className="text-xs text-white/80"> / hour</span>
            <span className="block text-[10px] text-white/70">₹{parking.pricePerDay}/day pass</span>
          </div>

          <div
            className={`px-2.5 py-1 rounded-lg text-xs font-bold backdrop-blur-md border ${
              isLowAvailability
                ? 'bg-rose-500/80 text-white border-rose-400/40'
                : isHighAvailability
                ? 'bg-emerald-600/80 text-white border-emerald-400/40'
                : 'bg-amber-500/80 text-white border-amber-400/40'
            }`}
          >
            {parking.availableSlots} slots left
          </div>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <div className="flex items-center justify-between gap-2 text-xs text-[var(--color-text-muted)]">
            <span className="font-semibold text-[var(--color-primary)]">
              {parking.distanceFromStationKm} km from concourse
            </span>
            <div className="flex items-center gap-1 font-bold text-[var(--color-text)]">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{parking.rating}</span>
              <span className="text-[10px] text-[var(--color-text-muted)]">({parking.reviewCount})</span>
            </div>
          </div>

          <h3 className="font-bold text-base text-[var(--color-text)] mt-1.5 group-hover:text-[var(--color-primary)] transition-colors leading-snug">
            {parking.name}
          </h3>

          <p className="text-xs text-[var(--color-text-muted)] line-clamp-2 mt-1">
            {parking.address}
          </p>

          {/* Amenities Pills */}
          <div className="flex items-center gap-1.5 flex-wrap mt-3 pt-3 border-t border-[var(--color-border)]">
            {parking.covered && (
              <span className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-md bg-black/5 text-[var(--color-text-muted)] font-medium">
                <Umbrella className="w-3 h-3 text-[var(--color-primary)]" />
                Covered
              </span>
            )}
            {parking.evCharging && (
              <span className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-md bg-teal-50 dark:bg-teal-950/40 text-teal-700 dark:text-teal-300 font-medium">
                <Zap className="w-3 h-3" />
                EV Supercharger
              </span>
            )}
            {parking.cctvSecurity && (
              <span className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-md bg-black/5 text-[var(--color-text-muted)] font-medium">
                <ShieldCheck className="w-3 h-3 text-emerald-600" />
                24/7 CCTV
              </span>
            )}
            {parking.open247 && (
              <span className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-md bg-black/5 text-[var(--color-text-muted)] font-medium">
                <Clock className="w-3 h-3 text-slate-500" />
                Open 24/7
              </span>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[var(--color-border)]">
          <Link
            to={`/parking/${parking.id}`}
            className="text-center py-2 px-3 rounded-xl text-xs font-bold text-[var(--color-text)] border border-[var(--color-border)] hover:bg-[var(--color-surface-hover)] transition-colors"
          >
            Details & Map
          </Link>
          <Link
            to={`/booking/${parking.id}`}
            className="inline-flex items-center justify-center gap-1 py-2 px-3 rounded-xl text-xs font-bold text-white bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] transition-colors shadow-xs"
          >
            <Car className="w-3.5 h-3.5" />
            <span>Book Slot</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
