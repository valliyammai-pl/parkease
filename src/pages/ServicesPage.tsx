import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { useToast } from '../context/ToastContext';
import { initialVehicleServices } from '../data/mockServices';
import { Modal } from '../components/common/Modal';
import { StatusBadge } from '../components/common/StatusBadge';
import { VehicleServiceItem, ServiceCategory, ServiceRequest } from '../types';
import {
  Wrench,
  Search,
  Clock,
  Star,
  CheckCircle2,
  Calendar,
  Car,
  Sparkles,
  Phone,
  ShieldCheck,
  ChevronRight,
} from 'lucide-react';

export const ServicesPage: React.FC = () => {
  const { vehicles, addServiceRequest, serviceRequests } = useApp();
  const toast = useToast();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [bookingService, setBookingService] = useState<VehicleServiceItem | null>(null);

  // Appointment Form state
  const [appointmentVehicleReg, setAppointmentVehicleReg] = useState<string>(
    vehicles[0]?.registrationNumber || 'KA 01 MJ 4589'
  );
  const [appointmentDate, setAppointmentDate] = useState<string>('2026-10-16');
  const [appointmentTime, setAppointmentTime] = useState<string>('11:00 AM');
  const [serviceNotes, setServiceNotes] = useState<string>('');

  const categories: { id: string; label: string }[] = [
    { id: 'all', label: 'All Services' },
    { id: 'wash', label: 'Eco Wash' },
    { id: 'cleaning', label: 'Interior Detailing' },
    { id: 'puncture', label: 'Puncture & Air' },
    { id: 'tyre_battery', label: 'Battery Jump' },
    { id: 'breakdown', label: '24/7 Roadside' },
    { id: 'inspection', label: 'Safety Check' },
    { id: 'ev_support', label: 'EV Diagnostics' },
  ];

  const filteredServices = useMemo(() => {
    return initialVehicleServices.filter((srv) => {
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const matches =
          srv.title.toLowerCase().includes(q) ||
          srv.shortDesc.toLowerCase().includes(q) ||
          srv.provider.toLowerCase().includes(q);
        if (!matches) return false;
      }
      if (selectedCategory !== 'all' && srv.category !== selectedCategory) {
        return false;
      }
      return true;
    });
  }, [searchQuery, selectedCategory]);

  const handleBookServiceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingService) return;

    const matchedVeh = vehicles.find((v) => v.registrationNumber === appointmentVehicleReg) || vehicles[0];

    addServiceRequest({
      serviceId: bookingService.id,
      serviceTitle: bookingService.title,
      category: bookingService.category,
      vehicleReg: matchedVeh.registrationNumber,
      vehicleName: `${matchedVeh.make} ${matchedVeh.model}`,
      appointmentDate,
      appointmentTime,
      totalAmount: bookingService.price,
      notes: serviceNotes,
    });

    setBookingService(null);
    setServiceNotes('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 text-xs font-bold border border-blue-200 dark:border-blue-800">
          <Wrench className="w-3.5 h-3.5" />
          <span>While-You-Travel Vehicle Care • Station Mechanics</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-[var(--color-text)] tracking-tight">
          Railway Station Vehicle Services
        </h1>
        <p className="text-xs sm:text-sm text-[var(--color-text-muted)] max-w-2xl">
          Book waterless eco foam washes, battery health scans, puncture repairs, and pre-trip inspections serviced in your reserved parking bay while you travel by train.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-4 shadow-xs space-y-3">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" />
          <input
            type="text"
            placeholder="Search wash, detailing, puncture, jump-start, battery scan..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-xl bg-[var(--color-background)] border border-[var(--color-border)] text-[var(--color-text)] focus:outline-hidden focus:ring-2 focus:ring-[var(--color-accent)]"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar text-xs">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all shrink-0 ${
                selectedCategory === cat.id
                  ? 'bg-[var(--color-primary)] text-white shadow-xs'
                  : 'bg-[var(--color-surface-hover)] border border-[var(--color-border)] text-[var(--color-text-muted)] hover:text-[var(--color-text)]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map((service) => (
          <div
            key={service.id}
            className="rounded-3xl bg-[var(--color-surface)] border border-[var(--color-border)] p-6 shadow-xs flex flex-col justify-between hover:border-[var(--color-primary)]/40 hover:shadow-xl transition-all group"
          >
            <div className="space-y-4">
              <div className="flex items-start justify-between gap-3">
                <span className="text-[10px] uppercase font-bold text-[var(--color-primary)] bg-[var(--color-accent-subtle)] px-2.5 py-1 rounded-full">
                  {service.badge || service.category.toUpperCase()}
                </span>
                <div className="flex items-center gap-1 text-xs font-bold text-[var(--color-text)]">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>{service.rating}</span>
                  <span className="text-[10px] text-[var(--color-text-muted)]">({service.reviewCount})</span>
                </div>
              </div>

              <div>
                <h3 className="font-extrabold text-base text-[var(--color-text)] group-hover:text-[var(--color-primary)] transition-colors">
                  {service.title}
                </h3>
                <p className="text-xs text-[var(--color-text-muted)] mt-1 leading-relaxed">
                  {service.shortDesc}
                </p>
              </div>

              {/* Price & Duration */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-[var(--color-surface-hover)] border border-[var(--color-border)] text-xs">
                <div>
                  <span className="text-[10px] uppercase text-[var(--color-text-muted)] font-bold">Price</span>
                  <p className="font-black text-base text-[var(--color-primary)]">₹{service.price}</p>
                </div>
                <div className="text-right">
                  <span className="text-[10px] uppercase text-[var(--color-text-muted)] font-bold">Est. Duration</span>
                  <p className="font-bold text-[var(--color-text)] flex items-center gap-1 justify-end">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>{service.durationMinutes} mins</span>
                  </p>
                </div>
              </div>

              {/* What's included */}
              <div className="space-y-1.5 text-xs">
                <span className="text-[11px] font-bold text-[var(--color-text-muted)] block">
                  Service Checklist
                </span>
                {service.includes.map((inc, i) => (
                  <div key={i} className="flex items-start gap-2 text-[var(--color-text)]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                    <span className="text-[11px]">{inc}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action */}
            <div className="pt-4 mt-4 border-t border-[var(--color-border)]">
              <button
                type="button"
                onClick={() => setBookingService(service)}
                className="w-full py-2.5 px-4 rounded-xl bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white text-xs font-bold shadow-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <span>Book Service for Station Stay</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Active Service Appointments Tracker */}
      <div className="rounded-3xl bg-[var(--color-surface)] border border-[var(--color-border)] p-6 sm:p-8 shadow-xs space-y-4">
        <h3 className="font-extrabold text-base text-[var(--color-text)]">
          Scheduled Service Requests ({serviceRequests.length})
        </h3>
        {serviceRequests.length === 0 ? (
          <p className="text-xs text-[var(--color-text-muted)]">No active service appointments.</p>
        ) : (
          <div className="space-y-3">
            {serviceRequests.map((req) => (
              <div
                key={req.id}
                className="p-4 rounded-2xl bg-[var(--color-background)] border border-[var(--color-border)] flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-[var(--color-text)]">{req.serviceTitle}</span>
                    <StatusBadge label={req.status} variant="info" size="sm" />
                  </div>
                  <p className="text-[11px] text-[var(--color-text-muted)] mt-0.5">
                    Vehicle: {req.vehicleName} ({req.vehicleReg}) • Ref #{req.bookingRef}
                  </p>
                  <p className="text-[11px] text-[var(--color-text-muted)]">
                    Date: {req.appointmentDate} at {req.appointmentTime} • Technician: {req.technicianName} ({req.technicianPhone})
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-base font-black text-[var(--color-primary)]">
                    ₹{req.totalAmount}
                  </span>
                  <p className="text-[10px] text-emerald-600 font-semibold">Simulated Payment</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Booking Appointment Modal */}
      <Modal
        isOpen={!!bookingService}
        onClose={() => setBookingService(null)}
        title={bookingService ? `Schedule ${bookingService.title}` : 'Schedule Service'}
        description={`Price: ₹${bookingService?.price} • Provider: ${bookingService?.provider}`}
        maxWidth="md"
      >
        <form onSubmit={handleBookServiceSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-[var(--color-text)] mb-1">
              Select Parked Vehicle
            </label>
            <select
              value={appointmentVehicleReg}
              onChange={(e) => setAppointmentVehicleReg(e.target.value)}
              className="w-full py-2 px-3 text-xs rounded-xl bg-[var(--color-background)] border border-[var(--color-border)] text-[var(--color-text)] font-semibold"
            >
              {vehicles.map((v) => (
                <option key={v.id} value={v.registrationNumber}>
                  {v.make} {v.model} ({v.registrationNumber})
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-[var(--color-text)] mb-1">
                Appointment Date
              </label>
              <input
                type="date"
                value={appointmentDate}
                onChange={(e) => setAppointmentDate(e.target.value)}
                className="w-full py-2 px-3 text-xs rounded-xl bg-[var(--color-background)] border border-[var(--color-border)] text-[var(--color-text)]"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[var(--color-text)] mb-1">
                Preferred Time
              </label>
              <select
                value={appointmentTime}
                onChange={(e) => setAppointmentTime(e.target.value)}
                className="w-full py-2 px-3 text-xs rounded-xl bg-[var(--color-background)] border border-[var(--color-border)] text-[var(--color-text)]"
              >
                <option value="09:00 AM">09:00 AM</option>
                <option value="11:00 AM">11:00 AM</option>
                <option value="02:00 PM">02:00 PM</option>
                <option value="04:30 PM">04:30 PM</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[var(--color-text)] mb-1">
              Special Instructions for Bay Technician
            </label>
            <textarea
              rows={2}
              value={serviceNotes}
              onChange={(e) => setServiceNotes(e.target.value)}
              placeholder="e.g. Please focus on bird drops on windshield, vehicle parked in Bay CCG-03..."
              className="w-full py-2 px-3 text-xs rounded-xl bg-[var(--color-background)] border border-[var(--color-border)] text-[var(--color-text)]"
            />
          </div>

          <p className="text-[10px] text-[var(--color-text-muted)] bg-black/5 dark:bg-white/5 p-2.5 rounded-lg">
            🔒 Simulated booking. A certified technician will be assigned to service your vehicle while you travel.
          </p>

          <div className="flex items-center gap-2 pt-2">
            <button
              type="button"
              onClick={() => setBookingService(null)}
              className="w-1/2 py-2 text-xs font-bold rounded-xl border border-[var(--color-border)] text-[var(--color-text-muted)]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-1/2 py-2 text-xs font-bold rounded-xl bg-[var(--color-primary)] text-white shadow-xs"
            >
              Confirm Appointment (₹{bookingService?.price})
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
