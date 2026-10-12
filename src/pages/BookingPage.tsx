import React, { useState, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { useToast } from '../context/ToastContext';
import { ParkingSlotGrid } from '../components/parking/ParkingSlotGrid';
import { BookingSummaryCard } from '../components/booking/BookingSummaryCard';
import { BookingTicketModal } from '../components/booking/BookingTicketModal';
import { ParkingSlot, ParkingBooking } from '../types';
import {
  Calendar,
  Clock,
  Car,
  Train,
  ArrowLeft,
  ShieldCheck,
  AlertCircle,
} from 'lucide-react';

export const BookingPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { parkingLocations, vehicles, addBooking } = useApp();
  const toast = useToast();
  const navigate = useNavigate();

  const parking = parkingLocations.find((p) => p.id === id) || parkingLocations[0];

  // Date and Time selection
  const now = new Date();
  const todayStr = now.toISOString().split('T')[0];

  const [arrivalDate, setArrivalDate] = useState<string>(todayStr);
  const [arrivalTime, setArrivalTime] = useState<string>('09:30');
  const [departureDate, setDepartureDate] = useState<string>(todayStr);
  const [departureTime, setDepartureTime] = useState<string>('18:30');

  // Selected vehicle & slot
  const defaultVehicleId = vehicles.find((v) => v.isDefault)?.id || vehicles[0]?.id || '';
  const [selectedVehicleId, setSelectedVehicleId] = useState<string>(defaultVehicleId);
  const [selectedSlot, setSelectedSlot] = useState<ParkingSlot | null>(() => {
    // Pick the first available slot as a sensible default
    return parking?.floors[0]?.slots.find((s) => s.status === 'available') || null;
  });

  const [paymentMethod, setPaymentMethod] = useState<string>('FASTag Auto-Debit (Demo)');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [confirmedBooking, setConfirmedBooking] = useState<ParkingBooking | null>(null);
  const [ticketModalOpen, setTicketModalOpen] = useState<boolean>(false);

  // Compute duration in hours
  const durationHours = useMemo(() => {
    try {
      const start = new Date(`${arrivalDate}T${arrivalTime}`);
      const end = new Date(`${departureDate}T${departureTime}`);
      const diffMs = end.getTime() - start.getTime();
      const diffHrs = Math.ceil(diffMs / (1000 * 60 * 60));
      return Math.max(1, diffHrs);
    } catch {
      return 1;
    }
  }, [arrivalDate, arrivalTime, departureDate, departureTime]);

  const selectedVehicle = vehicles.find((v) => v.id === selectedVehicleId) || vehicles[0];

  const handleConfirm = () => {
    if (!selectedSlot) {
      toast.error('No Slot Selected', 'Please click on an available green parking slot.');
      return;
    }
    if (!selectedVehicle) {
      toast.error('No Vehicle Selected', 'Please select or add a vehicle to proceed.');
      return;
    }

    const start = new Date(`${arrivalDate}T${arrivalTime}`);
    const end = new Date(`${departureDate}T${departureTime}`);
    if (end <= start) {
      toast.error('Invalid Time Range', 'Departure time must be after arrival time.');
      return;
    }

    setIsSubmitting(true);

    const multiplier = selectedSlot.pricePerHourMultiplier || 1.0;
    const baseRate = Math.round(parking.pricePerHour * multiplier);
    const subtotal = baseRate * durationHours;
    const tax = Math.round(subtotal * 0.18);
    const total = subtotal + tax;

    setTimeout(() => {
      const created = addBooking({
        parkingId: parking.id,
        parkingName: parking.name,
        stationName: parking.stationName,
        city: parking.city,
        slotNumber: selectedSlot.number,
        floorName: selectedSlot.floor,
        vehicleId: selectedVehicle.id,
        vehicleReg: selectedVehicle.registrationNumber,
        vehicleName: `${selectedVehicle.make} ${selectedVehicle.model}`,
        arrivalDateTime: `${arrivalDate}T${arrivalTime}:00`,
        departureDateTime: `${departureDate}T${departureTime}:00`,
        durationHours,
        baseAmount: subtotal,
        taxAmount: tax,
        totalAmount: total,
        status: 'confirmed',
        paymentMethod,
      });

      setIsSubmitting(false);
      setConfirmedBooking(created);
      setTicketModalOpen(true);
    }, 600);
  };

  if (!parking) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-black text-[var(--color-text)]">
          Parking Facility Not Found
        </h2>
        <Link to="/parking" className="text-xs font-bold text-[var(--color-primary)] mt-4 inline-block">
          Return to Parking Discovery
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Back button */}
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-1.5 text-xs font-bold text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Parking Overview</span>
      </button>

      {/* Header Info Banner */}
      <div className="rounded-3xl bg-[var(--color-surface)] border border-[var(--color-border)] p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[var(--color-primary)]">
            <Train className="w-3.5 h-3.5" />
            <span>{parking.stationName}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[var(--color-text)] mt-1">
            Reserve Slot at {parking.name}
          </h1>
          <p className="text-xs text-[var(--color-text-muted)] mt-0.5">
            {parking.address} • Direct Concourse Access
          </p>
        </div>

        <div className="flex items-center gap-3 bg-[var(--color-surface-hover)] p-3 rounded-2xl border border-[var(--color-border)] shrink-0">
          <ShieldCheck className="w-8 h-8 text-[var(--color-primary)]" />
          <div className="text-xs">
            <span className="font-extrabold text-[var(--color-text)] block">
              FASTag Auto-Debit Enabled
            </span>
            <span className="text-[var(--color-text-muted)]">Zero Paper Ticket Required</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Date/Slot Picker (Left) & Summary (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left Column: DateTime Form & Slot Matrix */}
        <div className="lg:col-span-2 space-y-6">
          {/* DateTime Picker Card */}
          <div className="rounded-3xl bg-[var(--color-surface)] border border-[var(--color-border)] p-6 shadow-xs space-y-4">
            <h3 className="font-extrabold text-base text-[var(--color-text)] flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[var(--color-primary)]" />
              <span>Select Arrival & Departure Time</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Arrival */}
              <div className="space-y-2 p-3.5 rounded-2xl bg-[var(--color-background)] border border-[var(--color-border)]">
                <span className="text-xs font-bold text-[var(--color-text)] block">
                  Arrival at Station
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="date"
                    value={arrivalDate}
                    onChange={(e) => setArrivalDate(e.target.value)}
                    className="w-full py-2 px-2.5 text-xs rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text)] font-semibold"
                  />
                  <input
                    type="time"
                    value={arrivalTime}
                    onChange={(e) => setArrivalTime(e.target.value)}
                    className="w-full py-2 px-2.5 text-xs rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text)] font-semibold"
                  />
                </div>
              </div>

              {/* Departure */}
              <div className="space-y-2 p-3.5 rounded-2xl bg-[var(--color-background)] border border-[var(--color-border)]">
                <span className="text-xs font-bold text-[var(--color-text)] block">
                  Departure from Station
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="date"
                    value={departureDate}
                    onChange={(e) => setDepartureDate(e.target.value)}
                    className="w-full py-2 px-2.5 text-xs rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text)] font-semibold"
                  />
                  <input
                    type="time"
                    value={departureTime}
                    onChange={(e) => setDepartureTime(e.target.value)}
                    className="w-full py-2 px-2.5 text-xs rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text)] font-semibold"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-[var(--color-text-muted)] pt-1">
              <span>Estimated stay duration:</span>
              <span className="font-extrabold text-[var(--color-primary)]">
                {durationHours} Hours ({durationHours > 24 ? `${Math.floor(durationHours / 24)}d ${durationHours % 24}h` : `${durationHours}h`})
              </span>
            </div>
          </div>

          {/* Interactive Parking Slot Grid */}
          <div className="rounded-3xl bg-[var(--color-surface)] border border-[var(--color-border)] p-6 shadow-xs space-y-4">
            <div>
              <h3 className="font-extrabold text-base text-[var(--color-text)] flex items-center gap-2">
                <Car className="w-4 h-4 text-[var(--color-primary)]" />
                <span>Select Your Specific Parking Bay</span>
              </h3>
              <p className="text-xs text-[var(--color-text-muted)] mt-1">
                Choose an available slot from the visual multi-level deck matrix below.
              </p>
            </div>

            <ParkingSlotGrid
              floors={parking.floors}
              selectedSlot={selectedSlot}
              onSelectSlot={(slot) => setSelectedSlot(slot)}
              basePricePerHour={parking.pricePerHour}
            />
          </div>
        </div>

        {/* Right Column: Sticky Summary & Payment Simulation */}
        <div>
          <BookingSummaryCard
            parking={parking}
            slot={selectedSlot}
            vehicles={vehicles}
            selectedVehicleId={selectedVehicleId}
            onSelectVehicle={setSelectedVehicleId}
            arrivalDateTime={`${arrivalDate}T${arrivalTime}`}
            departureDateTime={`${departureDate}T${departureTime}`}
            durationHours={durationHours}
            paymentMethod={paymentMethod}
            onSelectPaymentMethod={setPaymentMethod}
            onConfirmBooking={handleConfirm}
            isLoading={isSubmitting}
          />
        </div>
      </div>

      {/* Confirmation Ticket Modal */}
      <BookingTicketModal
        isOpen={ticketModalOpen}
        onClose={() => setTicketModalOpen(false)}
        booking={confirmedBooking}
      />
    </div>
  );
};
