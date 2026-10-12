import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useToast } from '../context/ToastContext';
import { Modal } from '../components/common/Modal';
import { StatusBadge } from '../components/common/StatusBadge';
import { Vehicle, VehicleCategory, FuelType } from '../types';
import {
  Car,
  Plus,
  Trash2,
  Edit2,
  CheckCircle2,
  Zap,
  ShieldCheck,
  Star,
  Fuel,
} from 'lucide-react';

export const VehiclesPage: React.FC = () => {
  const { vehicles, addVehicle, updateVehicle, deleteVehicle, setDefaultVehicle } = useApp();
  const toast = useToast();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingVehicleId, setEditingVehicleId] = useState<string | null>(null);

  // Form state
  const [regNumber, setRegNumber] = useState('');
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [category, setCategory] = useState<VehicleCategory>('car');
  const [fuelType, setFuelType] = useState<FuelType>('petrol');
  const [color, setColor] = useState('');
  const [isDefault, setIsDefault] = useState(false);

  const openAddModal = () => {
    setEditingVehicleId(null);
    setRegNumber('');
    setMake('');
    setModel('');
    setCategory('car');
    setFuelType('petrol');
    setColor('');
    setIsDefault(vehicles.length === 0);
    setModalOpen(true);
  };

  const openEditModal = (v: Vehicle) => {
    setEditingVehicleId(v.id);
    setRegNumber(v.registrationNumber);
    setMake(v.make);
    setModel(v.model);
    setCategory(v.category);
    setFuelType(v.fuelType);
    setColor(v.color || '');
    setIsDefault(v.isDefault);
    setModalOpen(true);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!regNumber.trim() || !make.trim() || !model.trim()) {
      toast.error('Incomplete Fields', 'Please enter registration number, make, and model.');
      return;
    }

    if (editingVehicleId) {
      updateVehicle(editingVehicleId, {
        registrationNumber: regNumber.toUpperCase().trim(),
        make: make.trim(),
        model: model.trim(),
        category,
        fuelType,
        color: color.trim() || undefined,
        isDefault,
      });
    } else {
      addVehicle({
        registrationNumber: regNumber.toUpperCase().trim(),
        make: make.trim(),
        model: model.trim(),
        category,
        fuelType,
        color: color.trim() || undefined,
        isDefault,
      });
    }

    setModalOpen(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--color-accent-subtle)] text-[var(--color-primary)] text-xs font-bold border border-[var(--color-card-border)]">
            <Car className="w-3.5 h-3.5" />
            <span>Multi-Vehicle Garage</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-[var(--color-text)] tracking-tight mt-1">
            My Vehicles
          </h1>
          <p className="text-xs sm:text-sm text-[var(--color-text-muted)] max-w-2xl">
            Register and manage your fleet for seamless FASTag auto-debit, instant slot reservation, and insurance tracking.
          </p>
        </div>

        <button
          type="button"
          onClick={openAddModal}
          className="px-4 py-2.5 rounded-xl bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white text-xs font-bold shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Vehicle</span>
        </button>
      </div>

      {/* Vehicle Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {vehicles.map((v) => {
          const isEv = v.fuelType === 'ev';
          return (
            <div
              key={v.id}
              className={`rounded-3xl bg-[var(--color-surface)] border p-6 shadow-xs flex flex-col justify-between transition-all ${
                v.isDefault
                  ? 'border-[var(--color-primary)] ring-2 ring-[var(--color-accent)]/20 shadow-md'
                  : 'border-[var(--color-border)] hover:border-[var(--color-primary)]/40'
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] uppercase font-bold text-[var(--color-primary)] bg-[var(--color-accent-subtle)] px-2 py-0.5 rounded">
                      {v.category}
                    </span>
                    {isEv && (
                      <span className="text-[10px] uppercase font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded flex items-center gap-0.5">
                        <Zap className="w-2.5 h-2.5" /> EV
                      </span>
                    )}
                  </div>
                  {v.isDefault && (
                    <span className="text-[10px] font-black uppercase text-white bg-[var(--color-primary)] px-2 py-0.5 rounded-full flex items-center gap-1">
                      <Star className="w-3 h-3 fill-white" /> Default
                    </span>
                  )}
                </div>

                {/* Make & Model */}
                <div>
                  <h3 className="font-extrabold text-xl text-[var(--color-text)]">
                    {v.make} {v.model}
                  </h3>
                  <div className="mt-2 inline-block px-3 py-1 rounded-xl bg-[var(--color-background)] border border-[var(--color-border)] font-mono font-black text-sm text-[var(--color-primary)] tracking-wider">
                    {v.registrationNumber}
                  </div>
                </div>

                {/* Specs */}
                <div className="grid grid-cols-2 gap-2 text-xs bg-[var(--color-surface-hover)] p-3 rounded-xl border border-[var(--color-border)]">
                  <div>
                    <span className="text-[10px] uppercase text-[var(--color-text-muted)] font-bold">Fuel Type</span>
                    <p className="font-bold text-[var(--color-text)] capitalize">{v.fuelType}</p>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase text-[var(--color-text-muted)] font-bold">Exterior Color</span>
                    <p className="font-bold text-[var(--color-text)]">{v.color || 'Standard'}</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 mt-4 border-t border-[var(--color-border)] flex items-center justify-between text-xs">
                {!v.isDefault ? (
                  <button
                    type="button"
                    onClick={() => setDefaultVehicle(v.id)}
                    className="font-bold text-[var(--color-primary)] hover:underline"
                  >
                    Set as Default
                  </button>
                ) : (
                  <span className="text-[11px] text-emerald-600 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Auto-Selected in Booking
                  </span>
                )}

                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => openEditModal(v)}
                    className="p-2 rounded-xl text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-black/5"
                    title="Edit vehicle"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  {vehicles.length > 1 && (
                    <button
                      type="button"
                      onClick={() => deleteVehicle(v.id)}
                      className="p-2 rounded-xl text-rose-500 hover:bg-rose-50"
                      title="Delete vehicle"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add / Edit Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingVehicleId ? 'Edit Vehicle Details' : 'Register New Vehicle'}
        description="Save your vehicle for smart slot matching and FASTag auto-debit"
        maxWidth="md"
      >
        <form onSubmit={handleFormSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-[var(--color-text)] mb-1">
              Vehicle Registration Number (Indian Standard)
            </label>
            <input
              type="text"
              placeholder="e.g. TN 01 AB 1234"
              value={regNumber}
              onChange={(e) => setRegNumber(e.target.value.toUpperCase())}
              className="w-full py-2 px-3 text-xs rounded-xl bg-[var(--color-background)] border border-[var(--color-border)] text-[var(--color-text)] font-mono font-bold"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-[var(--color-text)] mb-1">
                Manufacturer / Make
              </label>
              <input
                type="text"
                placeholder="e.g. Tata, Hyundai, Mahindra"
                value={make}
                onChange={(e) => setMake(e.target.value)}
                className="w-full py-2 px-3 text-xs rounded-xl bg-[var(--color-background)] border border-[var(--color-border)] text-[var(--color-text)]"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[var(--color-text)] mb-1">
                Model Name
              </label>
              <input
                type="text"
                placeholder="e.g. Nexon EV, Creta, Thar"
                value={model}
                onChange={(e) => setModel(e.target.value)}
                className="w-full py-2 px-3 text-xs rounded-xl bg-[var(--color-background)] border border-[var(--color-border)] text-[var(--color-text)]"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-[var(--color-text)] mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full py-2 px-3 text-xs rounded-xl bg-[var(--color-background)] border border-[var(--color-border)] text-[var(--color-text)] font-semibold"
              >
                <option value="car">Car (Sedan/Hatch)</option>
                <option value="suv">SUV / MUV</option>
                <option value="ev">Electric Vehicle (EV)</option>
                <option value="bike">Two-Wheeler (Motorcycle/Scooter)</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-[var(--color-text)] mb-1">
                Fuel Type
              </label>
              <select
                value={fuelType}
                onChange={(e) => setFuelType(e.target.value as any)}
                className="w-full py-2 px-3 text-xs rounded-xl bg-[var(--color-background)] border border-[var(--color-border)] text-[var(--color-text)] font-semibold"
              >
                <option value="petrol">Petrol</option>
                <option value="diesel">Diesel</option>
                <option value="ev">Electric (EV)</option>
                <option value="hybrid">Strong Hybrid</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[var(--color-text)] mb-1">
              Color Shade (Optional)
            </label>
            <input
              type="text"
              placeholder="e.g. Teal Blue, Arctic White"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="w-full py-2 px-3 text-xs rounded-xl bg-[var(--color-background)] border border-[var(--color-border)] text-[var(--color-text)]"
            />
          </div>

          <div className="flex items-center gap-2 pt-1">
            <input
              type="checkbox"
              id="setDefault"
              checked={isDefault}
              onChange={(e) => setIsDefault(e.target.checked)}
              className="rounded text-[var(--color-primary)] focus:ring-[var(--color-primary)] w-4 h-4"
            />
            <label htmlFor="setDefault" className="text-xs text-[var(--color-text)] cursor-pointer font-medium">
              Mark as default primary vehicle for parking reservations
            </label>
          </div>

          <div className="flex items-center gap-2 pt-2">
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              className="w-1/2 py-2 text-xs font-bold rounded-xl border border-[var(--color-border)] text-[var(--color-text-muted)]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-1/2 py-2 text-xs font-bold rounded-xl bg-[var(--color-primary)] text-white shadow-xs"
            >
              {editingVehicleId ? 'Update Vehicle' : 'Register Vehicle'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
