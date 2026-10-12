import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { InteractiveMap } from '../components/common/InteractiveMap';
import {
  MapPin,
  Star,
  Zap,
  ShieldCheck,
  Umbrella,
  Clock,
  Heart,
  Car,
  Train,
  CheckCircle2,
  ArrowLeft,
  Navigation,
  Accessibility,
} from 'lucide-react';

export const ParkingDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { parkingLocations, toggleSaveParking, isParkingSaved } = useApp();
  const navigate = useNavigate();

  const parking = parkingLocations.find((p) => p.id === id);

  if (!parking) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-black text-[var(--color-text)]">
          Parking Location Not Found
        </h2>
        <p className="text-sm text-[var(--color-text-muted)] mt-2 mb-6">
          The requested station parking hub does not exist in our mock database.
        </p>
        <Link
          to="/parking"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[var(--color-primary)] text-white text-xs font-bold"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Parking Hubs</span>
        </Link>
      </div>
    );
  }

  const saved = isParkingSaved(parking.id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Back button */}
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-1.5 text-xs font-bold text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Parking Search</span>
      </button>

      {/* Hero Header Card */}
      <div className="rounded-3xl bg-[var(--color-surface)] border border-[var(--color-border)] overflow-hidden shadow-xl">
        <div className="relative h-64 sm:h-96 w-full">
          <img
            src={parking.imageUrl}
            alt={parking.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

          {/* Floating Actions on Image */}
          <div className="absolute top-4 right-4 flex items-center gap-2">
            <button
              type="button"
              onClick={() => toggleSaveParking(parking.id)}
              className={`p-3 rounded-full backdrop-blur-md transition-all ${
                saved
                  ? 'bg-rose-500 text-white shadow-lg'
                  : 'bg-black/50 text-white hover:bg-black/70'
              }`}
              aria-label={saved ? 'Remove from favorites' : 'Save to favorites'}
            >
              <Heart className={`w-4 h-4 ${saved ? 'fill-white' : ''}`} />
            </button>
          </div>

          {/* Bottom Title on Image */}
          <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4 text-white">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold border border-white/20">
                <Train className="w-3.5 h-3.5 text-[var(--color-accent)]" />
                <span>{parking.stationName}</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-black tracking-tight">{parking.name}</h1>
              <p className="text-xs sm:text-sm text-white/80 max-w-xl">{parking.address}</p>
            </div>

            <div className="flex sm:flex-col items-center sm:items-end justify-between shrink-0 bg-black/40 sm:bg-transparent p-3 sm:p-0 rounded-2xl backdrop-blur-md sm:backdrop-blur-none">
              <span className="text-2xl sm:text-3xl font-black">₹{parking.pricePerHour}</span>
              <span className="text-xs text-white/80">per hour • ₹{parking.pricePerDay}/day</span>
            </div>
          </div>
        </div>

        {/* Quick Highlights Bar */}
        <div className="p-6 bg-[var(--color-surface)] grid grid-cols-2 sm:grid-cols-4 gap-4 border-b border-[var(--color-border)] text-xs">
          <div>
            <span className="text-[10px] uppercase font-bold text-[var(--color-text-muted)]">
              Station Distance
            </span>
            <p className="font-extrabold text-sm text-[var(--color-text)] mt-0.5">
              {parking.distanceFromStationKm} km (Direct Skywalk)
            </p>
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-[var(--color-text-muted)]">
              Available Slots
            </span>
            <p className="font-extrabold text-sm text-emerald-600 mt-0.5">
              {parking.availableSlots} of {parking.totalSlots} Slots Free
            </p>
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-[var(--color-text-muted)]">
              User Rating
            </span>
            <p className="font-extrabold text-sm text-[var(--color-text)] mt-0.5 flex items-center gap-1">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span>{parking.rating} / 5.0</span>
              <span className="text-xs font-normal text-[var(--color-text-muted)]">({parking.reviewCount})</span>
            </p>
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-[var(--color-text-muted)]">
              FASTag Barrier
            </span>
            <p className="font-extrabold text-sm text-[var(--color-primary)] mt-0.5">
              Contactless RFID Entry
            </p>
          </div>
        </div>
      </div>

      {/* Main Grid: Details + Booking Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Details & Amenities */}
        <div className="lg:col-span-2 space-y-8">
          {/* Features and Amenities */}
          <div className="rounded-3xl bg-[var(--color-surface)] border border-[var(--color-border)] p-6 sm:p-8 space-y-4">
            <h3 className="text-lg font-black text-[var(--color-text)]">
              Deck Amenities & Security Standards
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {parking.features.map((feat, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-[var(--color-text)]">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Floor Layout Breakdown */}
          <div className="rounded-3xl bg-[var(--color-surface)] border border-[var(--color-border)] p-6 sm:p-8 space-y-4">
            <h3 className="text-lg font-black text-[var(--color-text)]">
              Multi-Level Deck Capacity
            </h3>
            <div className="space-y-3">
              {parking.floors.map((floor) => (
                <div
                  key={floor.id}
                  className="p-4 rounded-2xl bg-[var(--color-background)] border border-[var(--color-border)] flex items-center justify-between"
                >
                  <div>
                    <h4 className="font-bold text-sm text-[var(--color-text)]">{floor.name}</h4>
                    <p className="text-xs text-[var(--color-text-muted)]">
                      Standard, EV Chargers & Disabled bays
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-1 rounded-lg">
                      {floor.availableSlots} available
                    </span>
                    <span className="block text-[10px] text-[var(--color-text-muted)] mt-1">
                      {floor.totalSlots} total capacity
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Station Map Preview */}
          <div className="rounded-3xl bg-[var(--color-surface)] border border-[var(--color-border)] p-6 sm:p-8 space-y-4">
            <h3 className="text-lg font-black text-[var(--color-text)]">
              Concourse Location & Directions
            </h3>
            <InteractiveMap
              locations={[parking]}
              selectedLocationId={parking.id}
              height="300px"
            />
          </div>
        </div>

        {/* Right Column: Sticky Booking Callout */}
        <div>
          <div className="rounded-3xl bg-[var(--color-surface)] border border-[var(--color-border)] p-6 sm:p-8 shadow-xl space-y-6 sticky top-24">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-primary)] bg-[var(--color-accent-subtle)] px-2.5 py-1 rounded-full">
                Interactive Slot Grid Ready
              </span>
              <h3 className="text-xl font-black text-[var(--color-text)] mt-2">
                Lock Your Parking Slot
              </h3>
              <p className="text-xs text-[var(--color-text-muted)] mt-1">
                Choose your specific parking bay, floor level, and vehicle type on the interactive grid.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[var(--color-surface-hover)] border border-[var(--color-border)] space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-[var(--color-text-muted)]">Hourly Rate:</span>
                <span className="font-bold text-[var(--color-text)]">₹{parking.pricePerHour}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--color-text-muted)]">Full Day Rate:</span>
                <span className="font-bold text-[var(--color-text)]">₹{parking.pricePerDay}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--color-text-muted)]">FASTag Convenience:</span>
                <span className="font-bold text-emerald-600">Free (₹0 Surcharge)</span>
              </div>
            </div>

            <Link
              to={`/booking/${parking.id}`}
              className="w-full py-4 px-4 rounded-2xl bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white text-sm font-extrabold shadow-lg shadow-[var(--color-card-border)] flex items-center justify-center gap-2 hover:scale-102 active:scale-98 transition-all"
            >
              <Car className="w-4 h-4" />
              <span>Choose Slot & Book</span>
            </Link>

            <div className="space-y-2 pt-2 border-t border-[var(--color-border)] text-[11px] text-[var(--color-text-muted)]">
              <p className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                <span>Instant simulated cancellation anytime</span>
              </p>
              <p className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                <span>Guaranteed spot held until 45 mins after train arrival</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
