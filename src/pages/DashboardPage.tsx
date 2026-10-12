import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';
import { StatCard } from '../components/dashboard/StatCard';
import { ExpenseChart } from '../components/dashboard/ExpenseChart';
import { BookingTicketModal } from '../components/booking/BookingTicketModal';
import { RechargeModal } from '../components/fastag/RechargeModal';
import { StatusBadge } from '../components/common/StatusBadge';
import { EmptyState } from '../components/common/EmptyState';
import { ParkingBooking, FastagAccount } from '../types';
import {
  Car,
  CreditCard,
  ShieldCheck,
  Zap,
  Wrench,
  Clock,
  MapPin,
  Calendar,
  AlertTriangle,
  ArrowRight,
  Plus,
  Ticket,
  XCircle,
  ExternalLink,
  ChevronRight,
  TrendingUp,
} from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const {
    bookings,
    cancelBooking,
    savedParkingIds,
    parkingLocations,
    vehicles,
    fastagAccounts,
    insurancePolicies,
    evSessions,
    serviceRequests,
    notifications,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'overview' | 'bookings' | 'saved' | 'services'>('overview');
  const [selectedTicketBooking, setSelectedTicketBooking] = useState<ParkingBooking | null>(null);
  const [rechargeAccount, setRechargeAccount] = useState<FastagAccount | null>(null);

  const upcomingBookings = bookings.filter((b) => b.status === 'confirmed' || b.status === 'active');
  const pastBookings = bookings.filter((b) => b.status === 'completed' || b.status === 'cancelled');

  const savedParkings = parkingLocations.filter((p) => savedParkingIds.includes(p.id));

  // Low balance FASTag warning
  const lowBalanceTag = fastagAccounts.find((t) => t.balance <= t.thresholdAmount);

  // Expiring insurance warning
  const expiringPolicy = insurancePolicies.find((p) => p.status === 'expiring_soon');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Greeting Banner */}
      <div className="rounded-3xl bg-[var(--color-surface)] border border-[var(--color-border)] p-6 sm:p-8 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <img
            src={user?.avatarUrl || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80'}
            alt={user?.name || 'User'}
            className="w-16 h-16 rounded-2xl object-cover ring-2 ring-[var(--color-primary)]/20 shadow-md"
          />
          <div>
            <div className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[var(--color-primary)] uppercase tracking-wider">
              <span>Transit Passenger Dashboard</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-[var(--color-text)]">
              Namaste, {user?.name || 'Aarav'}! 👋
            </h1>
            <p className="text-xs text-[var(--color-text-muted)] mt-0.5">
              {user?.email} • {vehicles.length} Registered Vehicles • Member since {user?.joinedDate || '2026'}
            </p>
          </div>
        </div>

        {/* Quick Action Buttons */}
        <div className="flex items-center gap-2 flex-wrap">
          <Link
            to="/parking"
            className="px-4 py-2.5 rounded-xl bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white text-xs font-bold shadow-sm transition-all flex items-center gap-1.5"
          >
            <Car className="w-3.5 h-3.5" />
            <span>Book Slot</span>
          </Link>
          <Link
            to="/fastag"
            className="px-4 py-2.5 rounded-xl bg-[var(--color-surface-hover)] border border-[var(--color-border)] text-[var(--color-text)] text-xs font-bold hover:bg-black/5 transition-all flex items-center gap-1.5"
          >
            <CreditCard className="w-3.5 h-3.5 text-amber-500" />
            <span>FASTag Wallet</span>
          </Link>
          <Link
            to="/services"
            className="px-4 py-2.5 rounded-xl bg-[var(--color-surface-hover)] border border-[var(--color-border)] text-[var(--color-text)] text-xs font-bold hover:bg-black/5 transition-all flex items-center gap-1.5"
          >
            <Wrench className="w-3.5 h-3.5 text-blue-500" />
            <span>Car Services</span>
          </Link>
        </div>
      </div>

      {/* Critical Smart Alerts (FASTag low balance or Insurance expiring) */}
      {(lowBalanceTag || expiringPolicy) && (
        <div className="space-y-3">
          {lowBalanceTag && (
            <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-300 dark:border-amber-800 text-amber-900 dark:text-amber-200 flex items-center justify-between gap-4 flex-wrap">
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
                <div className="text-xs">
                  <span className="font-bold block">
                    FASTag Balance Low on {lowBalanceTag.vehicleReg}
                  </span>
                  <span>
                    Current wallet balance is <strong>₹{lowBalanceTag.balance}</strong> (Threshold: ₹{lowBalanceTag.thresholdAmount}). Top up to avoid toll & parking barrier delay.
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setRechargeAccount(lowBalanceTag)}
                className="px-3.5 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold shadow-xs cursor-pointer"
              >
                Instant Recharge
              </button>
            </div>
          )}

          {expiringPolicy && (
            <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/30 border border-rose-300 dark:border-rose-800 text-rose-900 dark:text-rose-200 flex items-center justify-between gap-4 flex-wrap">
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-rose-600 shrink-0" />
                <div className="text-xs">
                  <span className="font-bold block">
                    Insurance Expiring Soon ({expiringPolicy.daysUntilExpiry} days remaining)
                  </span>
                  <span>
                    {expiringPolicy.vehicleName} ({expiringPolicy.vehicleReg}) policy expires on {expiringPolicy.expiryDate}.
                  </span>
                </div>
              </div>
              <Link
                to="/insurance"
                className="px-3.5 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-xs"
              >
                Renew Coverage
              </Link>
            </div>
          )}
        </div>
      )}

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Active Slot Bookings"
          value={upcomingBookings.length}
          subtitle="Confirmed Station Bays"
          icon={Car}
          badge={upcomingBookings.length > 0 ? 'Upcoming Trip' : 'No trips'}
          badgeVariant={upcomingBookings.length > 0 ? 'success' : 'neutral'}
        />
        <StatCard
          title="Total FASTag Balance"
          value={`₹${fastagAccounts.reduce((acc, c) => acc + c.balance, 0)}`}
          subtitle="Linked across vehicles"
          icon={CreditCard}
          badge={lowBalanceTag ? 'Low Balance' : 'Optimal'}
          badgeVariant={lowBalanceTag ? 'warning' : 'success'}
        />
        <StatCard
          title="Protected Vehicles"
          value={vehicles.length}
          subtitle="Vehicles registered"
          icon={ShieldCheck}
          badge="Active"
          badgeVariant="info"
        />
        <StatCard
          title="Total Hours Parked"
          value="28h"
          subtitle="Current month"
          icon={Clock}
          trend="+14% MoM"
        />
      </div>

      {/* Tab Navigation */}
      <div className="flex items-center gap-2 border-b border-[var(--color-border)] pb-2 overflow-x-auto no-scrollbar">
        {[
          { id: 'overview', label: 'Transit Overview & Analytics' },
          { id: 'bookings', label: `My Bookings (${bookings.length})` },
          { id: 'saved', label: `Saved Stations (${savedParkings.length})` },
          { id: 'services', label: `Service Requests (${serviceRequests.length})` },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold shrink-0 transition-all ${
              activeTab === tab.id
                ? 'bg-[var(--color-primary)] text-white shadow-xs'
                : 'text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-black/5'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* TAB CONTENT */}

      {/* TAB 1: OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
          {/* Upcoming Reservations Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-extrabold text-lg text-[var(--color-text)]">
                  Upcoming Parking Reservations
                </h3>
                <p className="text-xs text-[var(--color-text-muted)]">
                  Guaranteed bays awaiting your arrival
                </p>
              </div>
              <Link
                to="/parking"
                className="text-xs font-bold text-[var(--color-primary)] hover:underline flex items-center gap-1"
              >
                <span>Reserve Another</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            {upcomingBookings.length === 0 ? (
              <EmptyState
                icon={Calendar}
                title="No Upcoming Parking Reservations"
                description="You don't have any active reservations. Search your train station and book a slot before you start driving."
                actionText="Find Station Parking"
                actionHref="/parking"
              />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {upcomingBookings.map((b) => (
                  <div
                    key={b.id}
                    className="p-5 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] shadow-xs space-y-4 hover:border-[var(--color-primary)]/40 transition-all"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-primary)] bg-[var(--color-accent-subtle)] px-2 py-0.5 rounded">
                          {b.stationName}
                        </span>
                        <h4 className="font-black text-base text-[var(--color-text)] mt-1.5">
                          {b.parkingName}
                        </h4>
                        <p className="text-xs text-[var(--color-text-muted)]">
                          Ref #{b.bookingReference}
                        </p>
                      </div>
                      <div className="w-12 h-12 rounded-xl bg-[var(--color-primary)] text-white font-black text-base flex items-center justify-center shadow-sm">
                        {b.slotNumber}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs bg-[var(--color-surface-hover)] p-3 rounded-xl border border-[var(--color-border)]">
                      <div>
                        <span className="text-[10px] text-[var(--color-text-muted)] uppercase font-semibold">Vehicle</span>
                        <p className="font-bold text-[var(--color-text)]">{b.vehicleReg}</p>
                      </div>
                      <div>
                        <span className="text-[10px] text-[var(--color-text-muted)] uppercase font-semibold">Bay / Floor</span>
                        <p className="font-bold text-[var(--color-text)]">{b.floorName}</p>
                      </div>
                      <div>
                        <span className="text-[10px] text-[var(--color-text-muted)] uppercase font-semibold">Arrival</span>
                        <p className="font-bold text-[var(--color-text)]">
                          {new Date(b.arrivalDateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })},{' '}
                          {new Date(b.arrivalDateTime).toLocaleDateString([], { month: 'short', day: 'numeric' })}
                        </p>
                      </div>
                      <div>
                        <span className="text-[10px] text-[var(--color-text-muted)] uppercase font-semibold">Total Paid</span>
                        <p className="font-black text-[var(--color-primary)]">₹{b.totalAmount}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 pt-1">
                      <button
                        type="button"
                        onClick={() => setSelectedTicketBooking(b)}
                        className="flex-1 py-2 px-3 rounded-xl bg-[var(--color-primary)] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs"
                      >
                        <Ticket className="w-3.5 h-3.5" />
                        <span>View Digital Pass</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => cancelBooking(b.id)}
                        className="py-2 px-3 rounded-xl border border-rose-200 text-rose-600 hover:bg-rose-50 text-xs font-bold transition-colors"
                        title="Cancel reservation"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Recharts Analytics Visualization */}
          <div className="space-y-4">
            <h3 className="font-extrabold text-lg text-[var(--color-text)]">
              Transit Expense & Usage Analytics
            </h3>
            <ExpenseChart />
          </div>

          {/* Quick Ecosystem Modules: Vehicles & FASTag & Services */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Vehicles card */}
            <div className="p-5 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-sm text-[var(--color-text)] flex items-center gap-2">
                  <Car className="w-4 h-4 text-[var(--color-primary)]" />
                  <span>My Vehicles ({vehicles.length})</span>
                </h4>
                <Link to="/vehicles" className="text-xs font-bold text-[var(--color-primary)] hover:underline">
                  Manage
                </Link>
              </div>
              <div className="space-y-2">
                {vehicles.map((v) => (
                  <div
                    key={v.id}
                    className="p-2.5 rounded-xl bg-[var(--color-background)] border border-[var(--color-border)] flex items-center justify-between text-xs"
                  >
                    <div>
                      <p className="font-bold text-[var(--color-text)]">
                        {v.make} {v.model}
                      </p>
                      <p className="text-[11px] text-[var(--color-text-muted)]">{v.registrationNumber}</p>
                    </div>
                    {v.isDefault && (
                      <span className="text-[10px] font-bold text-[var(--color-primary)] bg-[var(--color-accent-subtle)] px-2 py-0.5 rounded">
                        Default
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* FASTag Card */}
            <div className="p-5 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-sm text-[var(--color-text)] flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-amber-500" />
                  <span>FASTag Accounts</span>
                </h4>
                <Link to="/fastag" className="text-xs font-bold text-[var(--color-primary)] hover:underline">
                  Details
                </Link>
              </div>
              <div className="space-y-2">
                {fastagAccounts.map((fa) => (
                  <div
                    key={fa.id}
                    className="p-2.5 rounded-xl bg-[var(--color-background)] border border-[var(--color-border)] flex items-center justify-between text-xs"
                  >
                    <div>
                      <p className="font-bold text-[var(--color-text)]">{fa.vehicleReg}</p>
                      <p className="text-[11px] text-[var(--color-text-muted)]">{fa.issuer}</p>
                    </div>
                    <div className="text-right">
                      <p className={`font-black ${fa.balance <= fa.thresholdAmount ? 'text-amber-600' : 'text-emerald-600'}`}>
                        ₹{fa.balance}
                      </p>
                      <button
                        type="button"
                        onClick={() => setRechargeAccount(fa)}
                        className="text-[10px] text-[var(--color-primary)] font-bold hover:underline"
                      >
                        + Top-up
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* EV Sessions Card */}
            <div className="p-5 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-sm text-[var(--color-text)] flex items-center gap-2">
                  <Zap className="w-4 h-4 text-teal-600" />
                  <span>EV Charging History</span>
                </h4>
                <Link to="/ev-charging" className="text-xs font-bold text-[var(--color-primary)] hover:underline">
                  Hubs
                </Link>
              </div>
              {evSessions.length === 0 ? (
                <p className="text-xs text-[var(--color-text-muted)]">No EV charging sessions logged yet.</p>
              ) : (
                <div className="space-y-2">
                  {evSessions.slice(0, 2).map((ev) => (
                    <div
                      key={ev.id}
                      className="p-2.5 rounded-xl bg-[var(--color-background)] border border-[var(--color-border)] text-xs space-y-1"
                    >
                      <div className="flex justify-between font-bold text-[var(--color-text)]">
                        <span className="truncate max-w-[150px]">{ev.stationName}</span>
                        <span className="text-teal-600">₹{ev.cost}</span>
                      </div>
                      <p className="text-[11px] text-[var(--color-text-muted)]">
                        {ev.energyKwh} kWh • {ev.durationMinutes} mins • {ev.vehicleReg}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: ALL BOOKINGS */}
      {activeTab === 'bookings' && (
        <div className="space-y-6">
          <div>
            <h3 className="font-extrabold text-lg text-[var(--color-text)]">All Parking Bookings</h3>
            <p className="text-xs text-[var(--color-text-muted)]">
              Complete history of confirmed, completed, and cancelled station parking passes
            </p>
          </div>

          <div className="space-y-3">
            {bookings.map((b) => (
              <div
                key={b.id}
                className="p-4 sm:p-5 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[var(--color-accent-subtle)] text-[var(--color-primary)] font-black text-sm flex items-center justify-center shrink-0">
                    {b.slotNumber}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-sm text-[var(--color-text)]">{b.parkingName}</h4>
                      <StatusBadge
                        label={b.status}
                        variant={
                          b.status === 'confirmed'
                            ? 'success'
                            : b.status === 'completed'
                            ? 'neutral'
                            : 'danger'
                        }
                        size="sm"
                      />
                    </div>
                    <p className="text-xs text-[var(--color-text-muted)] mt-0.5">
                      {b.stationName} • Vehicle: {b.vehicleReg} • Slot #{b.slotNumber} ({b.floorName})
                    </p>
                    <p className="text-[11px] text-[var(--color-text-muted)] mt-1">
                      {new Date(b.arrivalDateTime).toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' })} • Duration: {b.durationHours} hrs • Ref #{b.bookingReference}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 self-end sm:self-center">
                  <div className="text-right">
                    <p className="text-sm font-black text-[var(--color-primary)]">₹{b.totalAmount}</p>
                    <p className="text-[10px] text-[var(--color-text-muted)]">{b.paymentMethod}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelectedTicketBooking(b)}
                    className="p-2 rounded-xl border border-[var(--color-border)] hover:bg-[var(--color-surface-hover)] text-[var(--color-primary)]"
                    title="View Ticket"
                  >
                    <Ticket className="w-4 h-4" />
                  </button>
                  {b.status === 'confirmed' && (
                    <button
                      type="button"
                      onClick={() => cancelBooking(b.id)}
                      className="p-2 rounded-xl border border-rose-200 text-rose-600 hover:bg-rose-50"
                      title="Cancel Booking"
                    >
                      <XCircle className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: SAVED PARKING HUBS */}
      {activeTab === 'saved' && (
        <div className="space-y-6">
          <div>
            <h3 className="font-extrabold text-lg text-[var(--color-text)]">
              Saved Favorite Railway Hubs
            </h3>
            <p className="text-xs text-[var(--color-text-muted)]">
              Your bookmarked station parking locations for rapid one-click reservation
            </p>
          </div>

          {savedParkings.length === 0 ? (
            <EmptyState
              icon={MapPin}
              title="No Saved Locations Yet"
              description="Click the heart icon on any parking card to save it here for fast reservations."
              actionText="Explore Parking Hubs"
              actionHref="/parking"
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedParkings.map((p) => (
                <div
                  key={p.id}
                  className="rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] overflow-hidden shadow-xs flex flex-col justify-between"
                >
                  <img src={p.imageUrl} alt={p.name} className="h-36 w-full object-cover" />
                  <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-[var(--color-primary)]">
                        {p.stationName}
                      </span>
                      <h4 className="font-bold text-sm text-[var(--color-text)] mt-0.5">{p.name}</h4>
                      <p className="text-xs text-[var(--color-text-muted)] line-clamp-1">{p.address}</p>
                    </div>
                    <div className="pt-2 border-t border-[var(--color-border)] flex items-center justify-between">
                      <span className="font-black text-sm text-[var(--color-text)]">
                        ₹{p.pricePerHour}
                        <span className="text-[10px] text-[var(--color-text-muted)] font-normal">/hr</span>
                      </span>
                      <Link
                        to={`/booking/${p.id}`}
                        className="px-3 py-1.5 rounded-xl bg-[var(--color-primary)] text-white text-xs font-bold shadow-xs"
                      >
                        Book Bay
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 4: SERVICE REQUESTS */}
      {activeTab === 'services' && (
        <div className="space-y-6">
          <div>
            <h3 className="font-extrabold text-lg text-[var(--color-text)]">
              Station Vehicle Care Requests
            </h3>
            <p className="text-xs text-[var(--color-text-muted)]">
              Services scheduled to be performed while your vehicle is stationed
            </p>
          </div>

          {serviceRequests.length === 0 ? (
            <EmptyState
              icon={Wrench}
              title="No Service Appointments"
              description="Book an eco foam wash, battery check, or puncture repair to be serviced while you travel by train."
              actionText="Browse Vehicle Services"
              actionHref="/services"
            />
          ) : (
            <div className="space-y-3">
              {serviceRequests.map((sr) => (
                <div
                  key={sr.id}
                  className="p-5 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-sm text-[var(--color-text)]">{sr.serviceTitle}</h4>
                      <StatusBadge label={sr.status} variant="info" size="sm" />
                    </div>
                    <p className="text-xs text-[var(--color-text-muted)] mt-1">
                      Vehicle: {sr.vehicleName} ({sr.vehicleReg}) • Ref #{sr.bookingRef}
                    </p>
                    <p className="text-[11px] text-[var(--color-text-muted)] mt-0.5">
                      Scheduled for: {sr.appointmentDate} at {sr.appointmentTime} • Assigned to: {sr.technicianName}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-base font-black text-[var(--color-primary)]">₹{sr.totalAmount}</p>
                    <span className="text-[10px] text-emerald-600 font-semibold">Simulated Payment</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Pass Modal */}
      <BookingTicketModal
        isOpen={!!selectedTicketBooking}
        onClose={() => setSelectedTicketBooking(null)}
        booking={selectedTicketBooking}
      />

      {/* Recharge Modal */}
      <RechargeModal
        isOpen={!!rechargeAccount}
        onClose={() => setRechargeAccount(null)}
        account={rechargeAccount}
      />
    </div>
  );
};
