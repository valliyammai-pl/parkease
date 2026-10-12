import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { EvCalculatorModal } from '../components/ev/EvCalculatorModal';
import { StatusBadge } from '../components/common/StatusBadge';
import { EvChargerStation, ConnectorType } from '../types';
import {
  Zap,
  Search,
  Filter,
  BatteryCharging,
  Clock,
  Sparkles,
  MapPin,
  CheckCircle2,
  Play,
  RotateCcw,
} from 'lucide-react';

export const EvChargingPage: React.FC = () => {
  const { evChargers, evSessions, vehicles } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedConnector, setSelectedConnector] = useState<ConnectorType | 'all'>('all');
  const [selectedSpeed, setSelectedSpeed] = useState<string>('all');
  const [availableOnly, setAvailableOnly] = useState<boolean>(false);

  const [selectedChargerForCalc, setSelectedChargerForCalc] = useState<EvChargerStation | null>(null);

  const filteredChargers = useMemo(() => {
    return evChargers.filter((ch) => {
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const matches =
          ch.name.toLowerCase().includes(q) ||
          ch.stationName.toLowerCase().includes(q) ||
          ch.city.toLowerCase().includes(q);
        if (!matches) return false;
      }
      if (selectedConnector !== 'all' && !ch.connectorTypes.includes(selectedConnector)) {
        return false;
      }
      if (selectedSpeed !== 'all' && ch.speedType !== selectedSpeed) {
        return false;
      }
      if (availableOnly && ch.status !== 'available') {
        return false;
      }
      return true;
    });
  }, [evChargers, searchQuery, selectedConnector, selectedSpeed, availableOnly]);

  const connectorOptions: (ConnectorType | 'all')[] = ['all', 'CCS2', 'Type 2', 'CHAdeMO', 'GB/T'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-950/40 text-teal-700 dark:text-teal-300 text-xs font-bold border border-teal-200 dark:border-teal-800">
          <Zap className="w-3.5 h-3.5" />
          <span>High-Speed Transit EV Hubs • Simulated Network</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-[var(--color-text)] tracking-tight">
          Electric Vehicle Superchargers
        </h1>
        <p className="text-xs sm:text-sm text-[var(--color-text-muted)] max-w-2xl">
          Discover high-speed DC fast chargers located directly at railway parking decks. Calculate charging duration, cost per kWh, and schedule charges before boarding your train.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-4 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" />
            <input
              type="text"
              placeholder="Search station or city (e.g. Chennai Central, Bengaluru, NDLS)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-xl bg-[var(--color-background)] border border-[var(--color-border)] text-[var(--color-text)] focus:outline-hidden focus:ring-2 focus:ring-[var(--color-accent)]"
            />
          </div>

          <label className="flex items-center gap-2 text-xs font-bold text-[var(--color-text)] cursor-pointer shrink-0">
            <input
              type="checkbox"
              checked={availableOnly}
              onChange={(e) => setAvailableOnly(e.target.checked)}
              className="rounded text-[var(--color-primary)] focus:ring-[var(--color-primary)] w-4 h-4"
            />
            <span>Available Ports Only</span>
          </label>
        </div>

        {/* Connector Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar text-xs">
          <span className="text-[var(--color-text-muted)] font-medium shrink-0">Connector Type:</span>
          {connectorOptions.map((conn) => (
            <button
              key={conn}
              type="button"
              onClick={() => setSelectedConnector(conn)}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all shrink-0 ${
                selectedConnector === conn
                  ? 'bg-teal-700 text-white shadow-xs'
                  : 'bg-[var(--color-surface-hover)] border border-[var(--color-border)] text-[var(--color-text-muted)] hover:text-[var(--color-text)]'
              }`}
            >
              {conn === 'all' ? 'All Connectors' : conn}
            </button>
          ))}
        </div>
      </div>

      {/* Chargers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredChargers.map((charger) => {
          const isAvailable = charger.status === 'available';
          return (
            <div
              key={charger.id}
              className="rounded-3xl bg-[var(--color-surface)] border border-[var(--color-border)] p-6 shadow-xs flex flex-col justify-between hover:border-teal-500/50 hover:shadow-xl transition-all group"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-teal-700 dark:text-teal-400 bg-teal-50 dark:bg-teal-950/40 px-2.5 py-0.5 rounded-full">
                      {charger.city} • {charger.stationName}
                    </span>
                    <h3 className="font-extrabold text-base text-[var(--color-text)] mt-1.5 group-hover:text-teal-700 transition-colors">
                      {charger.name}
                    </h3>
                    <p className="text-xs text-[var(--color-text-muted)] mt-0.5">
                      {charger.locationName}
                    </p>
                  </div>
                  <StatusBadge
                    label={isAvailable ? `${charger.availablePorts} Ports Free` : 'Busy'}
                    variant={isAvailable ? 'success' : 'warning'}
                    size="sm"
                  />
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-2 gap-2 text-xs bg-[var(--color-surface-hover)] p-3.5 rounded-xl border border-[var(--color-border)]">
                  <div>
                    <span className="text-[10px] text-[var(--color-text-muted)] uppercase font-semibold">Max Power</span>
                    <p className="font-black text-sm text-[var(--color-text)]">{charger.powerKw} kW DC</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-[var(--color-text-muted)] uppercase font-semibold">Tariff</span>
                    <p className="font-black text-sm text-[var(--color-primary)]">₹{charger.pricePerKwh} / kWh</p>
                  </div>
                </div>

                {/* Connectors */}
                <div>
                  <span className="text-[11px] font-bold text-[var(--color-text-muted)] block mb-1.5">
                    Supported Connectors
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {charger.connectorTypes.map((c, i) => (
                      <span
                        key={i}
                        className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-black/5 dark:bg-white/5 border border-[var(--color-border)] text-[var(--color-text)]"
                      >
                        ⚡ {c}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Amenities */}
                <div className="text-[11px] text-[var(--color-text-muted)] flex items-center gap-1.5 flex-wrap">
                  {charger.amenities.slice(0, 3).map((a, i) => (
                    <span key={i} className="inline-flex items-center gap-0.5">
                      ✓ {a}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-4 mt-4 border-t border-[var(--color-border)]">
                <button
                  type="button"
                  onClick={() => setSelectedChargerForCalc(charger)}
                  className="w-full py-2.5 px-4 rounded-xl bg-teal-700 hover:bg-teal-800 text-white text-xs font-bold shadow-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <BatteryCharging className="w-4 h-4" />
                  <span>Calculate Duration & Cost</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charging Sessions History */}
      <div className="rounded-3xl bg-[var(--color-surface)] border border-[var(--color-border)] p-6 sm:p-8 shadow-xs space-y-4">
        <h3 className="font-extrabold text-base text-[var(--color-text)]">
          Charging Session History ({evSessions.length})
        </h3>
        {evSessions.length === 0 ? (
          <p className="text-xs text-[var(--color-text-muted)]">No past charging sessions.</p>
        ) : (
          <div className="space-y-3">
            {evSessions.map((sess) => (
              <div
                key={sess.id}
                className="p-4 rounded-2xl bg-[var(--color-background)] border border-[var(--color-border)] flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[var(--color-text)]">{sess.stationName}</span>
                    <StatusBadge label={sess.status} variant="success" size="sm" />
                  </div>
                  <p className="text-[11px] text-[var(--color-text-muted)] mt-0.5">
                    Vehicle: {sess.vehicleReg} • Started: {sess.startTime} • Connector: {sess.connectorUsed}
                  </p>
                </div>
                <div className="flex items-center gap-4 self-end sm:self-center">
                  <div className="text-right">
                    <span className="font-bold text-[var(--color-text)] block">{sess.energyKwh} kWh</span>
                    <span className="text-[10px] text-[var(--color-text-muted)]">{sess.durationMinutes} mins</span>
                  </div>
                  <span className="font-black text-sm text-[var(--color-primary)]">
                    ₹{sess.cost}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Calculator Modal */}
      <EvCalculatorModal
        isOpen={!!selectedChargerForCalc}
        onClose={() => setSelectedChargerForCalc(null)}
        charger={selectedChargerForCalc}
        vehicles={vehicles}
      />
    </div>
  );
};
