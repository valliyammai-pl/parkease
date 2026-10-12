import React, { useState } from 'react';
import { EvChargerStation, Vehicle } from '../../types';
import { Modal } from '../common/Modal';
import { Zap, Clock, Calculator, Play, BatteryCharging } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface EvCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  charger: EvChargerStation | null;
  vehicles: Vehicle[];
}

export const EvCalculatorModal: React.FC<EvCalculatorModalProps> = ({
  isOpen,
  onClose,
  charger,
  vehicles,
}) => {
  const { addEvSession } = useApp();

  const [batteryKwh, setBatteryKwh] = useState<number>(40.5); // Default Tata Nexon EV
  const [currentSoc, setCurrentSoc] = useState<number>(20);
  const [targetSoc, setTargetSoc] = useState<number>(80);
  const [selectedVehicleReg, setSelectedVehicleReg] = useState<string>(
    vehicles.find((v) => v.fuelType === 'ev')?.registrationNumber || vehicles[0]?.registrationNumber || 'KA 01 MJ 4589'
  );
  const [sessionStarted, setSessionStarted] = useState(false);

  if (!charger) return null;

  // Calculation logic
  const powerKw = charger.powerKw || 50;
  const pricePerKwh = charger.pricePerKwh || 18.5;

  const socDelta = Math.max(0, targetSoc - currentSoc);
  const requiredKwh = Number(((batteryKwh * socDelta) / 100).toFixed(2));
  // Charging time in minutes (accounting for 10% thermal taper at higher speeds)
  const estimatedHours = requiredKwh / (powerKw * 0.9);
  const estimatedMinutes = Math.round(estimatedHours * 60);
  const estimatedCost = Math.round(requiredKwh * pricePerKwh);

  const handleStartSimulatedSession = () => {
    addEvSession({
      stationId: charger.id,
      stationName: charger.name,
      vehicleReg: selectedVehicleReg,
      startTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      durationMinutes: estimatedMinutes,
      energyKwh: requiredKwh,
      cost: estimatedCost,
      status: 'in_progress',
      connectorUsed: charger.connectorTypes[0] || 'CCS2',
    });
    setSessionStarted(true);
    setTimeout(() => {
      setSessionStarted(false);
      onClose();
    }, 2000);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="EV Smart Charging Calculator"
      description={`Estimate time and simulated cost at ${charger.name}`}
      maxWidth="lg"
    >
      <div className="space-y-6">
        {/* Charger Specs Banner */}
        <div className="p-4 rounded-xl bg-[var(--color-surface-hover)] border border-[var(--color-border)] flex items-center justify-between flex-wrap gap-2 text-xs">
          <div>
            <span className="font-bold text-[var(--color-text)]">{charger.name}</span>
            <p className="text-[11px] text-[var(--color-text-muted)]">{charger.locationName}</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-bold text-teal-600 bg-teal-50 px-2.5 py-1 rounded-lg">
              {charger.powerKw} kW DC
            </span>
            <span className="font-bold text-[var(--color-text)]">
              ₹{charger.pricePerKwh} / kWh
            </span>
          </div>
        </div>

        {/* Input Form */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-[var(--color-text)] mb-1.5">
              Select EV Vehicle
            </label>
            <select
              value={selectedVehicleReg}
              onChange={(e) => setSelectedVehicleReg(e.target.value)}
              className="w-full py-2 px-3 text-xs rounded-xl bg-[var(--color-background)] border border-[var(--color-border)] text-[var(--color-text)]"
            >
              {vehicles.map((v) => (
                <option key={v.id} value={v.registrationNumber}>
                  {v.make} {v.model} ({v.registrationNumber})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-[var(--color-text)] mb-1.5">
              Battery Pack Capacity (kWh)
            </label>
            <input
              type="number"
              min="10"
              max="150"
              value={batteryKwh}
              onChange={(e) => setBatteryKwh(Number(e.target.value))}
              className="w-full py-2 px-3 text-xs rounded-xl bg-[var(--color-background)] border border-[var(--color-border)] text-[var(--color-text)]"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs font-bold text-[var(--color-text)] mb-1">
              <span>Current Charge</span>
              <span className="text-[var(--color-primary)]">{currentSoc}%</span>
            </div>
            <input
              type="range"
              min="5"
              max="95"
              value={currentSoc}
              onChange={(e) => setCurrentSoc(Number(e.target.value))}
              className="w-full accent-[var(--color-primary)]"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs font-bold text-[var(--color-text)] mb-1">
              <span>Target Charge</span>
              <span className="text-teal-600">{targetSoc}%</span>
            </div>
            <input
              type="range"
              min={currentSoc + 5}
              max="100"
              value={targetSoc}
              onChange={(e) => setTargetSoc(Number(e.target.value))}
              className="w-full accent-teal-600"
            />
          </div>
        </div>

        {/* Calculated Results Box */}
        <div className="p-4 rounded-xl bg-[var(--color-accent-subtle)] border border-[var(--color-card-border)] grid grid-cols-3 gap-3 text-center">
          <div>
            <span className="text-[10px] uppercase font-bold text-[var(--color-text-muted)]">
              Energy Required
            </span>
            <p className="text-lg font-black text-[var(--color-text)] mt-1">{requiredKwh} kWh</p>
          </div>

          <div>
            <span className="text-[10px] uppercase font-bold text-[var(--color-text-muted)]">
              Estimated Duration
            </span>
            <p className="text-lg font-black text-teal-700 mt-1">{estimatedMinutes} mins</p>
          </div>

          <div>
            <span className="text-[10px] uppercase font-bold text-[var(--color-text-muted)]">
              Estimated Cost
            </span>
            <p className="text-lg font-black text-[var(--color-primary)] mt-1">₹{estimatedCost}</p>
          </div>
        </div>

        {/* Action Button */}
        <button
          type="button"
          onClick={handleStartSimulatedSession}
          disabled={sessionStarted}
          className="w-full py-3 px-4 rounded-xl font-bold text-xs text-white bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer"
        >
          {sessionStarted ? (
            <>
              <BatteryCharging className="w-4 h-4 animate-bounce" />
              <span>Starting Simulated Charging Session...</span>
            </>
          ) : (
            <>
              <Play className="w-4 h-4" />
              <span>Start Simulated Charging Session</span>
            </>
          )}
        </button>
      </div>
    </Modal>
  );
};
