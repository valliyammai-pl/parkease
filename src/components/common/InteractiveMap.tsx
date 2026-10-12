import React, { useEffect, useRef, useState } from 'react';
import { ParkingLocation } from '../../types';
import { Link } from 'react-router-dom';
import { MapPin, Navigation, Car, AlertTriangle, ShieldCheck, Zap } from 'lucide-react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

interface InteractiveMapProps {
  locations: ParkingLocation[];
  selectedLocationId?: string;
  onSelectLocation?: (location: ParkingLocation) => void;
  className?: string;
  height?: string;
}

export const InteractiveMap: React.FC<InteractiveMapProps> = ({
  locations,
  selectedLocationId,
  onSelectLocation,
  className = '',
  height = '500px',
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<{ [id: string]: L.Marker }>({});
  const [mapError, setMapError] = useState<boolean>(false);
  const [activeLocation, setActiveLocation] = useState<ParkingLocation | null>(() => {
    return locations.find((l) => l.id === selectedLocationId) || locations[0] || null;
  });

  useEffect(() => {
    if (!mapContainerRef.current) return;

    try {
      if (!mapInstanceRef.current) {
        // Center around India (Chennai / Bengaluru / Deccan latitude band)
        const initialLoc = locations[0];
        const centerLat = initialLoc ? initialLoc.lat : 20.5937;
        const centerLng = initialLoc ? initialLoc.lng : 78.9629;

        const map = L.map(mapContainerRef.current, {
          center: [centerLat, centerLng],
          zoom: 5,
          zoomControl: true,
          scrollWheelZoom: false,
        });

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          maxZoom: 19,
        }).addTo(map);

        mapInstanceRef.current = map;
      }

      const map = mapInstanceRef.current;
      if (!map) return;

      // Clear existing markers
      Object.values(markersRef.current).forEach((m) => m.remove());
      markersRef.current = {};

      const bounds: L.LatLngExpression[] = [];

      locations.forEach((loc) => {
        const isSelected = loc.id === selectedLocationId;
        const customIcon = L.divIcon({
          className: 'custom-map-marker',
          html: `
            <div style="
              background: ${isSelected ? 'var(--color-primary)' : '#0F766E'};
              color: white;
              padding: 4px 8px;
              border-radius: 9999px;
              font-weight: 700;
              font-size: 11px;
              box-shadow: 0 4px 10px rgba(0,0,0,0.3);
              border: 2px solid white;
              display: flex;
              align-items: center;
              gap: 4px;
              white-space: nowrap;
              cursor: pointer;
            ">
              <span>₹${loc.pricePerHour}/hr</span>
              <span style="background: rgba(255,255,255,0.25); border-radius: 9999px; padding: 1px 4px; font-size: 9px;">${loc.availableSlots} left</span>
            </div>
          `,
          iconSize: [80, 30],
          iconAnchor: [40, 15],
        });

        const marker = L.marker([loc.lat, loc.lng], { icon: customIcon }).addTo(map);

        marker.on('click', () => {
          setActiveLocation(loc);
          if (onSelectLocation) onSelectLocation(loc);
        });

        markersRef.current[loc.id] = marker;
        bounds.push([loc.lat, loc.lng]);
      });

      if (bounds.length > 0 && !selectedLocationId) {
        map.fitBounds(L.latLngBounds(bounds), { padding: [50, 50], maxZoom: 14 });
      } else if (selectedLocationId) {
        const target = locations.find((l) => l.id === selectedLocationId);
        if (target) {
          map.setView([target.lat, target.lng], 14, { animate: true });
        }
      }
    } catch (err) {
      console.warn('Leaflet interactive map failed to initialize:', err);
      setMapError(true);
    }

    return () => {
      // Keep map instance unless component unmounts
    };
  }, [locations, selectedLocationId, onSelectLocation]);

  useEffect(() => {
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  if (mapError) {
    return (
      <div
        className={`w-full rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-8 flex flex-col items-center justify-center text-center ${className}`}
        style={{ minHeight: height }}
      >
        <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center mb-3">
          <AlertTriangle className="w-6 h-6" />
        </div>
        <h4 className="font-bold text-[var(--color-text)]">Interactive Map Unavailable</h4>
        <p className="text-sm text-[var(--color-text-muted)] max-w-sm mt-1 mb-4">
          OpenStreetMap tiles could not be loaded directly. You can browse all parking hubs in the List View below.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-lg text-left">
          {locations.slice(0, 4).map((loc) => (
            <div
              key={loc.id}
              className="p-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-hover)]"
            >
              <p className="font-bold text-sm text-[var(--color-text)]">{loc.name}</p>
              <p className="text-xs text-[var(--color-text-muted)]">{loc.stationName}</p>
              <p className="text-xs font-semibold text-[var(--color-primary)] mt-1">
                ₹{loc.pricePerHour}/hr • {loc.availableSlots} slots left
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={`relative w-full rounded-2xl overflow-hidden border border-[var(--color-border)] shadow-md ${className}`}>
      {/* Map Element */}
      <div ref={mapContainerRef} style={{ width: '100%', height }} className="z-0" />

      {/* Floating Active Location Card Preview */}
      {activeLocation && (
        <div className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:w-96 z-10 bg-[var(--color-surface)]/95 backdrop-blur-md border border-[var(--color-border)] rounded-2xl p-4 shadow-2xl transition-all">
          <div className="flex items-start gap-3">
            <img
              src={activeLocation.imageUrl}
              alt={activeLocation.name}
              className="w-16 h-16 rounded-xl object-cover shrink-0 border border-[var(--color-border)]"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 text-xs text-[var(--color-primary)] font-semibold">
                <Navigation className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">{activeLocation.stationName}</span>
              </div>
              <h4 className="font-bold text-sm text-[var(--color-text)] truncate mt-0.5">
                {activeLocation.name}
              </h4>
              <p className="text-xs text-[var(--color-text-muted)] truncate">
                {activeLocation.address}
              </p>
              <div className="flex items-center gap-2 mt-2 flex-wrap text-xs">
                <span className="font-bold text-[var(--color-text)]">
                  ₹{activeLocation.pricePerHour}
                  <span className="text-[10px] text-[var(--color-text-muted)] font-normal">/hr</span>
                </span>
                <span className="w-1 h-1 rounded-full bg-slate-300" />
                <span className="text-emerald-600 font-medium">
                  {activeLocation.availableSlots} slots open
                </span>
                {activeLocation.evCharging && (
                  <span className="inline-flex items-center gap-0.5 text-[10px] text-teal-700 bg-teal-50 px-1.5 py-0.5 rounded font-medium">
                    <Zap className="w-2.5 h-2.5" /> EV
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="mt-3.5 pt-3 border-t border-[var(--color-border)] flex items-center justify-between gap-2">
            <Link
              to={`/parking/${activeLocation.id}`}
              className="text-xs font-semibold text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors px-2 py-1"
            >
              View Amenities
            </Link>
            <Link
              to={`/booking/${activeLocation.id}`}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold text-white bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] transition-colors shadow-xs"
            >
              <Car className="w-3.5 h-3.5" />
              <span>Reserve Slot</span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};
