import React from 'react';
import { ParkingBooking } from '../../types';
import { Modal } from '../common/Modal';
import { Link } from 'react-router-dom';
import { CheckCircle2, Download, QrCode, Calendar, MapPin, Car, ArrowRight, ShieldCheck } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

interface BookingTicketModalProps {
  isOpen: boolean;
  onClose: () => void;
  booking: ParkingBooking | null;
}

export const BookingTicketModal: React.FC<BookingTicketModalProps> = ({
  isOpen,
  onClose,
  booking,
}) => {
  const toast = useToast();

  if (!booking) return null;

  const handleDownloadDemo = () => {
    toast.success('Pass Saved', `Digital parking pass #${booking.bookingReference} downloaded to device.`);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Slot Confirmed! Your Transit Pass is Ready"
      description={`Booking reference #${booking.bookingReference} registered at ${booking.stationName}`}
      maxWidth="md"
    >
      <div className="space-y-6">
        {/* Pass Card Container */}
        <div className="relative rounded-2xl bg-gradient-to-b from-[var(--color-surface)] to-[var(--color-surface-hover)] border-2 border-[var(--color-primary)] p-6 shadow-xl overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-[var(--color-border)]">
            <div>
              <span className="text-[10px] font-bold tracking-widest text-[var(--color-primary)] uppercase bg-[var(--color-accent-subtle)] px-2 py-0.5 rounded">
                PARKEASE DIGITAL PASS
              </span>
              <h4 className="font-black text-base text-[var(--color-text)] mt-1">
                {booking.parkingName}
              </h4>
            </div>
            <div className="w-12 h-12 rounded-xl bg-[var(--color-primary)] text-white font-black text-lg flex items-center justify-center shadow-md">
              {booking.slotNumber}
            </div>
          </div>

          {/* Core Info Grid */}
          <div className="grid grid-cols-2 gap-4 my-5 text-xs">
            <div>
              <span className="text-[10px] uppercase text-[var(--color-text-muted)] font-bold">Vehicle</span>
              <p className="font-extrabold text-[var(--color-text)] text-sm">{booking.vehicleReg}</p>
              <p className="text-[11px] text-[var(--color-text-muted)]">{booking.vehicleName}</p>
            </div>
            <div>
              <span className="text-[10px] uppercase text-[var(--color-text-muted)] font-bold">Floor & Bay</span>
              <p className="font-extrabold text-[var(--color-text)] text-sm">{booking.floorName}</p>
              <p className="text-[11px] text-emerald-600 font-semibold">Bay #{booking.slotNumber}</p>
            </div>
            <div>
              <span className="text-[10px] uppercase text-[var(--color-text-muted)] font-bold">Arrival</span>
              <p className="font-bold text-[var(--color-text)]">
                {new Date(booking.arrivalDateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
              <p className="text-[11px] text-[var(--color-text-muted)]">
                {new Date(booking.arrivalDateTime).toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' })}
              </p>
            </div>
            <div>
              <span className="text-[10px] uppercase text-[var(--color-text-muted)] font-bold">Departure</span>
              <p className="font-bold text-[var(--color-text)]">
                {new Date(booking.departureDateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
              <p className="text-[11px] text-[var(--color-text-muted)]">
                {new Date(booking.departureDateTime).toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' })}
              </p>
            </div>
          </div>

          {/* Simulated QR Code / Barcode Display */}
          <div className="bg-[var(--color-surface)] border border-dashed border-[var(--color-border)] rounded-xl p-4 flex flex-col items-center justify-center text-center">
            {/* Visual SVG QR representation */}
            <div className="w-32 h-32 bg-white p-2 rounded-lg border border-slate-300 shadow-xs flex items-center justify-center">
              <QrCode className="w-28 h-28 text-slate-900" />
            </div>
            <p className="font-mono text-[11px] tracking-widest text-[var(--color-text-muted)] mt-2">
              {booking.qrCodeSeed}
            </p>
            <p className="text-[10px] text-emerald-600 font-bold mt-1">
              ✓ Automated FASTag Reader Ready at Entry Gate
            </p>
          </div>

          {/* Amount Paid */}
          <div className="mt-4 pt-4 border-t border-[var(--color-border)] flex items-center justify-between text-xs">
            <span className="text-[var(--color-text-muted)]">Total Amount Paid (Simulated):</span>
            <span className="font-black text-sm text-[var(--color-primary)]">₹{booking.totalAmount}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleDownloadDemo}
            className="flex-1 py-3 px-4 rounded-xl border border-[var(--color-border)] hover:bg-[var(--color-surface-hover)] font-bold text-xs text-[var(--color-text)] flex items-center justify-center gap-1.5 transition-colors"
          >
            <Download className="w-4 h-4 text-[var(--color-primary)]" />
            <span>Download Pass</span>
          </button>
          <Link
            to="/dashboard"
            onClick={onClose}
            className="flex-1 py-3 px-4 rounded-xl bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] font-bold text-xs text-white flex items-center justify-center gap-1.5 shadow-md transition-colors"
          >
            <span>View Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </Modal>
  );
};
