import React, { useState } from 'react';
import {
  Search,
  SlidersHorizontal,
  Map,
  List,
  X,
  RotateCcw,
  Sparkles,
  Zap,
  Umbrella,
  ShieldCheck,
} from 'lucide-react';
import { VehicleCategory } from '../../types';

export interface ParkingFiltersState {
  searchQuery: string;
  selectedCity: string;
  vehicleType: VehicleCategory | 'all';
  maxPrice: number;
  coveredOnly: boolean;
  evChargingOnly: boolean;
  cctvOnly: boolean;
  open247Only: boolean;
  sortBy: 'recommended' | 'price_low' | 'distance' | 'availability';
  viewMode: 'list' | 'map';
}

interface ParkingFilterBarProps {
  filters: ParkingFiltersState;
  onChange: (filters: ParkingFiltersState) => void;
  onReset: () => void;
  cities: string[];
  totalResults: number;
}

export const ParkingFilterBar: React.FC<ParkingFilterBarProps> = ({
  filters,
  onChange,
  onReset,
  cities,
  totalResults,
}) => {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  const update = <K extends keyof ParkingFiltersState>(key: K, value: ParkingFiltersState[K]) => {
    onChange({ ...filters, [key]: value });
  };

  const hasActiveFilters =
    filters.searchQuery !== '' ||
    filters.selectedCity !== 'all' ||
    filters.vehicleType !== 'all' ||
    filters.coveredOnly ||
    filters.evChargingOnly ||
    filters.cctvOnly ||
    filters.open247Only ||
    filters.maxPrice < 100;

  return (
    <div className="space-y-4">
      {/* Top Search & Primary Controls */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 bg-[var(--color-surface)] p-3 sm:p-4 rounded-2xl border border-[var(--color-border)] shadow-xs">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" />
          <input
            type="text"
            placeholder="Search Chennai Central, Bengaluru, NDLS, Hyderabad..."
            value={filters.searchQuery}
            onChange={(e) => update('searchQuery', e.target.value)}
            className="w-full pl-10 pr-9 py-2.5 text-xs sm:text-sm rounded-xl bg-[var(--color-background)] border border-[var(--color-border)] text-[var(--color-text)] placeholder-[var(--color-text-muted)] focus:outline-hidden focus:ring-2 focus:ring-[var(--color-accent)] transition-all"
          />
          {filters.searchQuery && (
            <button
              type="button"
              onClick={() => update('searchQuery', '')}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* City Filter Dropdown */}
        <div className="flex items-center gap-2">
          <select
            value={filters.selectedCity}
            onChange={(e) => update('selectedCity', e.target.value)}
            className="py-2.5 px-3 text-xs sm:text-sm rounded-xl bg-[var(--color-background)] border border-[var(--color-border)] text-[var(--color-text)] focus:outline-hidden focus:ring-2 focus:ring-[var(--color-accent)] font-medium"
          >
            <option value="all">All Indian Cities</option>
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>

          {/* Sort By Dropdown */}
          <select
            value={filters.sortBy}
            onChange={(e) => update('sortBy', e.target.value as any)}
            className="py-2.5 px-3 text-xs sm:text-sm rounded-xl bg-[var(--color-background)] border border-[var(--color-border)] text-[var(--color-text)] focus:outline-hidden focus:ring-2 focus:ring-[var(--color-accent)] font-medium"
          >
            <option value="recommended">Best Recommended</option>
            <option value="price_low">Price: Low to High</option>
            <option value="distance">Closest to Concourse</option>
            <option value="availability">Max Available Slots</option>
          </select>

          {/* Mobile Filter Button */}
          <button
            type="button"
            onClick={() => setMobileDrawerOpen(true)}
            className="md:hidden flex items-center gap-1.5 py-2.5 px-3 rounded-xl border border-[var(--color-border)] text-xs font-semibold bg-[var(--color-background)] text-[var(--color-text)]"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-[var(--color-primary)]" />
            <span>Filters</span>
            {hasActiveFilters && (
              <span className="w-2 h-2 rounded-full bg-[var(--color-accent)]" />
            )}
          </button>

          {/* View Mode Switcher (List vs Map) */}
          <div className="hidden sm:inline-flex p-1 rounded-xl bg-[var(--color-background)] border border-[var(--color-border)]">
            <button
              type="button"
              onClick={() => update('viewMode', 'list')}
              className={`p-1.5 rounded-lg text-xs font-semibold transition-all ${
                filters.viewMode === 'list'
                  ? 'bg-white shadow-xs text-[var(--color-primary)] font-bold'
                  : 'text-[var(--color-text-muted)] hover:text-[var(--color-text)]'
              }`}
              title="List View"
            >
              <List className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => update('viewMode', 'map')}
              className={`p-1.5 rounded-lg text-xs font-semibold transition-all ${
                filters.viewMode === 'map'
                  ? 'bg-white shadow-xs text-[var(--color-primary)] font-bold'
                  : 'text-[var(--color-text-muted)] hover:text-[var(--color-text)]'
              }`}
              title="Interactive Map View"
            >
              <Map className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Desktop Filter Pills */}
      <div className="hidden md:flex items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-[var(--color-text-muted)] font-medium">Quick Filters:</span>

          {/* Vehicle Type */}
          {(['all', 'car', 'suv', 'bike', 'ev'] as const).map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => update('vehicleType', type)}
              className={`px-3 py-1.5 rounded-xl font-semibold transition-all capitalize ${
                filters.vehicleType === type
                  ? 'bg-[var(--color-primary)] text-white shadow-xs'
                  : 'bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text-muted)] hover:text-[var(--color-text)]'
              }`}
            >
              {type === 'all' ? 'All Vehicles' : type}
            </button>
          ))}

          <span className="text-slate-300">|</span>

          {/* Amenity toggles */}
          <button
            type="button"
            onClick={() => update('evChargingOnly', !filters.evChargingOnly)}
            className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-xl font-semibold transition-all ${
              filters.evChargingOnly
                ? 'bg-teal-700 text-white shadow-xs'
                : 'bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text-muted)] hover:text-[var(--color-text)]'
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            <span>EV Charging</span>
          </button>

          <button
            type="button"
            onClick={() => update('coveredOnly', !filters.coveredOnly)}
            className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-xl font-semibold transition-all ${
              filters.coveredOnly
                ? 'bg-[var(--color-primary)] text-white shadow-xs'
                : 'bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text-muted)] hover:text-[var(--color-text)]'
            }`}
          >
            <Umbrella className="w-3.5 h-3.5" />
            <span>Covered Roof</span>
          </button>

          <button
            type="button"
            onClick={() => update('cctvOnly', !filters.cctvOnly)}
            className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-xl font-semibold transition-all ${
              filters.cctvOnly
                ? 'bg-[var(--color-primary)] text-white shadow-xs'
                : 'bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text-muted)] hover:text-[var(--color-text)]'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>24/7 CCTV</span>
          </button>
        </div>

        {/* Clear Filters / Count */}
        <div className="flex items-center gap-3 shrink-0">
          <span className="text-[var(--color-text-muted)]">
            Showing <strong className="text-[var(--color-text)]">{totalResults}</strong> hubs
          </span>
          {hasActiveFilters && (
            <button
              type="button"
              onClick={onReset}
              className="inline-flex items-center gap-1 text-[var(--color-primary)] font-bold hover:underline"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>

      {/* Mobile Filters Drawer */}
      {mobileDrawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end md:hidden">
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs"
            onClick={() => setMobileDrawerOpen(false)}
          />
          <div className="relative w-full max-w-xs bg-[var(--color-surface)] h-full p-6 shadow-2xl flex flex-col justify-between overflow-y-auto z-10 animate-in slide-in-from-right">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-[var(--color-border)]">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-[var(--color-primary)]" />
                  <h3 className="font-bold text-base text-[var(--color-text)]">Filter Parking</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setMobileDrawerOpen(false)}
                  className="p-1 rounded-lg text-[var(--color-text-muted)]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Vehicle Type */}
              <div>
                <label className="block text-xs font-bold text-[var(--color-text)] mb-2">
                  Vehicle Type
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {(['all', 'car', 'suv', 'bike', 'ev'] as const).map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => update('vehicleType', type)}
                      className={`p-2 rounded-xl text-xs font-semibold capitalize border ${
                        filters.vehicleType === type
                          ? 'bg-[var(--color-primary)] text-white border-[var(--color-primary)]'
                          : 'bg-[var(--color-surface-hover)] border-[var(--color-border)] text-[var(--color-text-muted)]'
                      }`}
                    >
                      {type === 'all' ? 'All Types' : type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Amenities */}
              <div className="space-y-3">
                <label className="block text-xs font-bold text-[var(--color-text)]">
                  Amenities & Security
                </label>
                <label className="flex items-center gap-2.5 text-xs text-[var(--color-text)] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.evChargingOnly}
                    onChange={(e) => update('evChargingOnly', e.target.checked)}
                    className="rounded text-[var(--color-primary)] focus:ring-[var(--color-primary)] w-4 h-4"
                  />
                  <span>EV Charging Hub On-Site</span>
                </label>
                <label className="flex items-center gap-2.5 text-xs text-[var(--color-text)] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.coveredOnly}
                    onChange={(e) => update('coveredOnly', e.target.checked)}
                    className="rounded text-[var(--color-primary)] focus:ring-[var(--color-primary)] w-4 h-4"
                  />
                  <span>Covered Multi-Level Deck</span>
                </label>
                <label className="flex items-center gap-2.5 text-xs text-[var(--color-text)] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.cctvOnly}
                    onChange={(e) => update('cctvOnly', e.target.checked)}
                    className="rounded text-[var(--color-primary)] focus:ring-[var(--color-primary)] w-4 h-4"
                  />
                  <span>24/7 CCTV & Security Guard</span>
                </label>
                <label className="flex items-center gap-2.5 text-xs text-[var(--color-text)] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.open247Only}
                    onChange={(e) => update('open247Only', e.target.checked)}
                    className="rounded text-[var(--color-primary)] focus:ring-[var(--color-primary)] w-4 h-4"
                  />
                  <span>Open 24/7 Hours</span>
                </label>
              </div>

              {/* View Switch */}
              <div>
                <label className="block text-xs font-bold text-[var(--color-text)] mb-2">
                  Display Mode
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => update('viewMode', 'list')}
                    className={`py-2 px-3 rounded-xl text-xs font-bold border ${
                      filters.viewMode === 'list'
                        ? 'bg-[var(--color-primary)] text-white border-[var(--color-primary)]'
                        : 'border-[var(--color-border)] text-[var(--color-text-muted)]'
                    }`}
                  >
                    List View
                  </button>
                  <button
                    type="button"
                    onClick={() => update('viewMode', 'map')}
                    className={`py-2 px-3 rounded-xl text-xs font-bold border ${
                      filters.viewMode === 'map'
                        ? 'bg-[var(--color-primary)] text-white border-[var(--color-primary)]'
                        : 'border-[var(--color-border)] text-[var(--color-text-muted)]'
                    }`}
                  >
                    Map View
                  </button>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[var(--color-border)] flex items-center gap-2">
              <button
                type="button"
                onClick={onReset}
                className="w-1/2 py-2.5 rounded-xl border border-[var(--color-border)] text-xs font-bold text-[var(--color-text-muted)]"
              >
                Reset
              </button>
              <button
                type="button"
                onClick={() => setMobileDrawerOpen(false)}
                className="w-1/2 py-2.5 rounded-xl bg-[var(--color-primary)] text-white text-xs font-bold"
              >
                Apply ({totalResults})
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
