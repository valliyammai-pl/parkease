import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { ParkingCard } from '../components/parking/ParkingCard';
import {
  ParkingFilterBar,
  ParkingFiltersState,
} from '../components/parking/ParkingFilterBar';
import { InteractiveMap } from '../components/common/InteractiveMap';
import { EmptyState } from '../components/common/EmptyState';
import { Car, Sparkles, Filter, MapPin } from 'lucide-react';

export const ParkingPage: React.FC = () => {
  const { parkingLocations } = useApp();
  const [searchParams] = useSearchParams();

  const queryParam = searchParams.get('query') || searchParams.get('station') || '';
  const typeParam = searchParams.get('type') as any;

  const defaultFilters: ParkingFiltersState = {
    searchQuery: queryParam,
    selectedCity: 'all',
    vehicleType: typeParam || 'all',
    maxPrice: 100,
    coveredOnly: false,
    evChargingOnly: false,
    cctvOnly: false,
    open247Only: false,
    sortBy: 'recommended',
    viewMode: 'list',
  };

  const [filters, setFilters] = useState<ParkingFiltersState>(defaultFilters);

  // Extract distinct Indian cities
  const cities = useMemo(() => {
    const set = new Set(parkingLocations.map((p) => p.city));
    return Array.from(set);
  }, [parkingLocations]);

  // Filter & sort logic
  const filteredParking = useMemo(() => {
    return parkingLocations
      .filter((loc) => {
        // Search query
        if (filters.searchQuery) {
          const q = filters.searchQuery.toLowerCase();
          const matches =
            loc.name.toLowerCase().includes(q) ||
            loc.stationName.toLowerCase().includes(q) ||
            loc.city.toLowerCase().includes(q) ||
            loc.address.toLowerCase().includes(q);
          if (!matches) return false;
        }

        // City
        if (filters.selectedCity !== 'all' && loc.city !== filters.selectedCity) {
          return false;
        }

        // Vehicle type
        if (
          filters.vehicleType !== 'all' &&
          !loc.supportedVehicles.includes(filters.vehicleType)
        ) {
          return false;
        }

        // Max price
        if (loc.pricePerHour > filters.maxPrice) {
          return false;
        }

        // Amenities
        if (filters.coveredOnly && !loc.covered) return false;
        if (filters.evChargingOnly && !loc.evCharging) return false;
        if (filters.cctvOnly && !loc.cctvSecurity) return false;
        if (filters.open247Only && !loc.open247) return false;

        return true;
      })
      .sort((a, b) => {
        if (filters.sortBy === 'price_low') {
          return a.pricePerHour - b.pricePerHour;
        }
        if (filters.sortBy === 'distance') {
          return a.distanceFromStationKm - b.distanceFromStationKm;
        }
        if (filters.sortBy === 'availability') {
          return b.availableSlots - a.availableSlots;
        }
        // Recommended
        return b.rating - a.rating;
      });
  }, [parkingLocations, filters]);

  const handleResetFilters = () => {
    setFilters({
      searchQuery: '',
      selectedCity: 'all',
      vehicleType: 'all',
      maxPrice: 100,
      coveredOnly: false,
      evChargingOnly: false,
      cctvOnly: false,
      open247Only: false,
      sortBy: 'recommended',
      viewMode: 'list',
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Page Title */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--color-accent-subtle)] text-[var(--color-primary)] text-xs font-bold border border-[var(--color-card-border)]">
          <MapPin className="w-3.5 h-3.5" />
          <span>Indian Railway Stations & Transit Terminals</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-[var(--color-text)] tracking-tight">
          Find Railway Station Parking
        </h1>
        <p className="text-xs sm:text-sm text-[var(--color-text-muted)] max-w-2xl">
          Search guaranteed covered parking decks with FASTag automated barriers, EV fast charging, and pedestrian concourse skywalks.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <ParkingFilterBar
        filters={filters}
        onChange={setFilters}
        onReset={handleResetFilters}
        cities={cities}
        totalResults={filteredParking.length}
      />

      {/* Content: List View or Map View */}
      {filteredParking.length === 0 ? (
        <EmptyState
          icon={Car}
          title="No Parking Hubs Match Your Filters"
          description="We couldn't find any parking facilities matching your criteria. Try loosening your price or amenity filters to explore all railway hubs."
          actionText="Reset All Filters"
          onAction={handleResetFilters}
        />
      ) : filters.viewMode === 'map' ? (
        <div className="space-y-4">
          <InteractiveMap locations={filteredParking} height="600px" />
          <p className="text-xs text-[var(--color-text-muted)] text-center">
            Click any pin on the map to preview parking details and book a bay directly.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredParking.map((parking) => (
            <ParkingCard key={parking.id} parking={parking} />
          ))}
        </div>
      )}
    </div>
  );
};
