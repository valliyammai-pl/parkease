import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { ParkingCard } from '../components/parking/ParkingCard';
import { InteractiveMap } from '../components/common/InteractiveMap';
import {
  Car,
  Search,
  Calendar,
  Clock,
  ArrowRight,
  ShieldCheck,
  Zap,
  CreditCard,
  Wrench,
  Train,
  CheckCircle2,
  ChevronDown,
  Sparkles,
  TreePine,
  Shield,
  Star,
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const { parkingLocations, liveSimulationActive } = useApp();
  const navigate = useNavigate();

  // Search Bar state
  const [searchLocation, setSearchLocation] = useState('Chennai');
  const [arrivalDate, setArrivalDate] = useState('2026-10-15');
  const [arrivalTime, setArrivalTime] = useState('09:00');
  const [departureTime, setDepartureTime] = useState('18:00');
  const [vehicleType, setVehicleType] = useState('car');

  // FAQ Accordion state
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/parking?query=${encodeURIComponent(searchLocation)}&type=${vehicleType}`);
  };

  const featuredLocations = parkingLocations.slice(0, 3);

  const popularStations = [
    { name: 'Chennai Central (MAS)', city: 'Chennai', spots: 49, code: 'chennai-central-hub' },
    { name: 'KSR Bengaluru (SBC)', city: 'Bengaluru', spots: 44, code: 'ksr-bengaluru-techpark' },
    { name: 'Hyderabad Deccan (HYB)', city: 'Hyderabad', spots: 52, code: 'hyderabad-deccan-express' },
    { name: 'New Delhi (NDLS)', city: 'New Delhi', spots: 36, code: 'new-delhi-capital-park' },
    { name: 'Pune Junction (PUNE)', city: 'Pune', spots: 54, code: 'pune-junction-sahyadri' },
    { name: 'Mumbai CSMT', city: 'Mumbai', spots: 29, code: 'mumbai-csmt-heritage' },
  ];

  const faqs = [
    {
      q: 'How does ParkEase guarantee a reserved parking spot at Indian railway stations?',
      a: 'ParkEase integrates real-time automated bay sensors and FASTag boom barriers. When you book a slot, the system locks that specific bay (e.g. CCG-03) and syncs with automated station barriers to authorize your vehicle registration.',
    },
    {
      q: 'Can I pay automatically using my existing FASTag wallet?',
      a: 'Absolutely! Our partner station decks feature high-speed RFID overhead scanners. Upon entering and exiting, your parking fee is auto-debited with 0% convenience fees.',
    },
    {
      q: 'Can my electric vehicle charge while parked during my train trip?',
      a: 'Yes, select parking hubs feature dedicated 22kW to 120kW EV chargers (CCS2 & Type 2). You can reserve a charging bay and schedule a charge so your battery is full when your return train arrives.',
    },
    {
      q: 'What vehicle services can I request during parking?',
      a: 'You can book waterless eco-car washes, tyre nitrogen top-ups, puncture repairs, battery jump-starts, and pre-highway inspections handled by background-verified station technicians.',
    },
    {
      q: 'Is this an official IRCTC or Indian Railways application?',
      a: 'No. ParkEase is an independent smart mobility software showcase designed to illustrate how seamless transit parking, FASTag, EV charging, and vehicle protection can be unified in a modern web experience.',
    },
  ];

  return (
    <div className="space-y-16 sm:space-y-24 pb-20">
      {/* HERO SECTION */}
      <section className="relative pt-10 sm:pt-16 pb-12 overflow-hidden">
        {/* Soft atmospheric gradient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-primary)]/10 via-[var(--color-accent-subtle)]/40 to-transparent pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-3xl mx-auto space-y-5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--color-surface)] border border-[var(--color-card-border)] shadow-xs text-xs font-bold text-[var(--color-primary)]">
              <Sparkles className="w-4 h-4 text-[var(--color-accent)]" />
              <span>Smart Railway Station Parking & Transit Services</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-black text-[var(--color-text)] tracking-tight leading-[1.1]">
              Your parking spot.{' '}
              <span className="text-[var(--color-primary)] underline decoration-[var(--color-accent)] decoration-wavy decoration-2">
                Before you even arrive.
              </span>
            </h1>

            <p className="text-sm sm:text-lg text-[var(--color-text-muted)] leading-relaxed max-w-2xl mx-auto">
              Eliminate station traffic stress across India. Pre-book guaranteed covered parking bays, charge your EV, pay seamlessly via FASTag, and access on-demand vehicle care while you travel by train.
            </p>

            <div className="flex items-center justify-center gap-3 pt-2">
              <Link
                to="/parking"
                className="px-6 py-3.5 rounded-2xl bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white text-sm font-bold shadow-lg shadow-[var(--color-card-border)] hover:scale-102 active:scale-98 transition-all flex items-center gap-2"
              >
                <Car className="w-4 h-4" />
                <span>Find Parking Now</span>
              </Link>
              <Link
                to="/services"
                className="px-6 py-3.5 rounded-2xl bg-[var(--color-surface)] hover:bg-[var(--color-surface-hover)] border border-[var(--color-border)] text-[var(--color-text)] text-sm font-bold transition-all flex items-center gap-2"
              >
                <span>Explore Services</span>
                <ArrowRight className="w-4 h-4 text-[var(--color-primary)]" />
              </Link>
            </div>
          </div>

          {/* QUICK SEARCH WIDGET */}
          <div className="mt-10 sm:mt-12 max-w-5xl mx-auto">
            <form
              onSubmit={handleHeroSearch}
              className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-3xl p-5 sm:p-6 shadow-2xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-end"
            >
              {/* Station / City */}
              <div>
                <label className="block text-xs font-bold text-[var(--color-text)] mb-1.5 flex items-center gap-1.5">
                  <Train className="w-3.5 h-3.5 text-[var(--color-primary)]" />
                  Railway Station / City
                </label>
                <select
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                  className="w-full py-2.5 px-3 text-xs sm:text-sm rounded-xl bg-[var(--color-background)] border border-[var(--color-border)] text-[var(--color-text)] font-semibold focus:outline-hidden focus:ring-2 focus:ring-[var(--color-accent)]"
                >
                  <option value="Chennai">Chennai Central (MAS)</option>
                  <option value="Bengaluru">KSR Bengaluru (SBC)</option>
                  <option value="Hyderabad">Hyderabad Deccan (HYB)</option>
                  <option value="Delhi">New Delhi (NDLS)</option>
                  <option value="Pune">Pune Junction (PUNE)</option>
                  <option value="Mumbai">Mumbai CSMT</option>
                </select>
              </div>

              {/* Arrival Date */}
              <div>
                <label className="block text-xs font-bold text-[var(--color-text)] mb-1.5 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[var(--color-primary)]" />
                  Arrival Date
                </label>
                <input
                  type="date"
                  value={arrivalDate}
                  onChange={(e) => setArrivalDate(e.target.value)}
                  className="w-full py-2 px-3 text-xs sm:text-sm rounded-xl bg-[var(--color-background)] border border-[var(--color-border)] text-[var(--color-text)] font-medium"
                />
              </div>

              {/* Arrival Time */}
              <div>
                <label className="block text-xs font-bold text-[var(--color-text)] mb-1.5 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[var(--color-primary)]" />
                  Arrival Time
                </label>
                <input
                  type="time"
                  value={arrivalTime}
                  onChange={(e) => setArrivalTime(e.target.value)}
                  className="w-full py-2 px-3 text-xs sm:text-sm rounded-xl bg-[var(--color-background)] border border-[var(--color-border)] text-[var(--color-text)] font-medium"
                />
              </div>

              {/* Vehicle Type */}
              <div>
                <label className="block text-xs font-bold text-[var(--color-text)] mb-1.5 flex items-center gap-1.5">
                  <Car className="w-3.5 h-3.5 text-[var(--color-primary)]" />
                  Vehicle Type
                </label>
                <select
                  value={vehicleType}
                  onChange={(e) => setVehicleType(e.target.value)}
                  className="w-full py-2.5 px-3 text-xs sm:text-sm rounded-xl bg-[var(--color-background)] border border-[var(--color-border)] text-[var(--color-text)] font-semibold"
                >
                  <option value="car">Car (Sedan/Hatch)</option>
                  <option value="suv">SUV / MUV</option>
                  <option value="ev">Electric Vehicle (EV)</option>
                  <option value="bike">Two-Wheeler (Bike/Scooter)</option>
                </select>
              </div>

              {/* Submit CTA */}
              <div>
                <button
                  type="submit"
                  className="w-full py-3 px-4 rounded-xl bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white text-xs sm:text-sm font-extrabold shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-98"
                >
                  <Search className="w-4 h-4" />
                  <span>Check Slots</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* POPULAR STATIONS FAST ACCESS BAR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-extrabold text-lg text-[var(--color-text)]">
              High-Traffic Railway Stations Covered
            </h3>
            <p className="text-xs text-[var(--color-text-muted)]">
              Simulated demonstration data across India&apos;s major transit corridors
            </p>
          </div>
          <Link
            to="/parking"
            className="text-xs font-bold text-[var(--color-primary)] hover:underline flex items-center gap-1"
          >
            <span>View All Hubs</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {popularStations.map((station) => (
            <Link
              key={station.code}
              to={`/parking?query=${encodeURIComponent(station.city)}`}
              className="p-3.5 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-[var(--color-primary)]/50 hover:shadow-md transition-all group"
            >
              <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-primary)]">
                {station.city}
              </span>
              <p className="text-xs font-bold text-[var(--color-text)] group-hover:text-[var(--color-primary)] transition-colors mt-0.5 truncate">
                {station.name}
              </p>
              <div className="flex items-center gap-1.5 mt-2 text-[11px] text-emerald-600 font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>{station.spots} slots free</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* DASHBOARD PREVIEW / INTERACTIVE MAP SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-[var(--color-surface)] border border-[var(--color-border)] p-6 sm:p-8 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 text-xs font-bold border border-emerald-200">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                <span>Simulated Real-Time Availability Network</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-[var(--color-text)] mt-2">
                Live Station Parking Hub Visualizer
              </h2>
              <p className="text-xs sm:text-sm text-[var(--color-text-muted)] mt-1">
                Explore nearby slots, verify amenities, and reserve your bay directly from the map.
              </p>
            </div>
            <Link
              to="/parking"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[var(--color-primary)] text-white text-xs font-bold shadow-sm"
            >
              <span>Full Screen Explorer</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <InteractiveMap locations={parkingLocations} height="420px" />
        </div>
      </section>

      {/* FEATURED PARKING SPACES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-black text-[var(--color-text)]">
              Featured Transit Parking Decks
            </h2>
            <p className="text-xs sm:text-sm text-[var(--color-text-muted)]">
              Multi-level covered decks with direct pedestrian concourse connections
            </p>
          </div>
          <Link
            to="/parking"
            className="text-xs font-bold text-[var(--color-primary)] hover:underline flex items-center gap-1"
          >
            <span>See All Hubs</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredLocations.map((p) => (
            <ParkingCard key={p.id} parking={p} />
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-[var(--color-surface)] border-y border-[var(--color-border)] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-primary)]">
              Step-by-Step Experience
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[var(--color-text)] mt-1">
              How ParkEase Works
            </h2>
            <p className="text-xs sm:text-sm text-[var(--color-text-muted)] mt-2">
              From reservation to automated boom gate departure in 4 frictionless steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                step: '01',
                title: 'Search & Pick Spot',
                desc: 'Select your train departure station, trip duration, and preferred floor or EV bay.',
                icon: Search,
              },
              {
                step: '02',
                title: 'Lock Specific Slot',
                desc: 'View real-time slot grid (e.g. Bay CCG-03) and reserve it before leaving home.',
                icon: Car,
              },
              {
                step: '03',
                title: 'FASTag Auto-Entry',
                desc: 'Overhead RFID scanners read your tag. Barrier lifts in under 2 seconds without paper tickets.',
                icon: CreditCard,
              },
              {
                step: '04',
                title: 'Care While Away',
                desc: 'Have your EV charged or waterless wash completed while you travel by train.',
                icon: Wrench,
              },
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-[var(--color-background)] border border-[var(--color-border)] relative space-y-3 group hover:border-[var(--color-primary)] transition-colors"
                >
                  <span className="text-3xl font-black text-[var(--color-primary)]/20 group-hover:text-[var(--color-primary)]/40 transition-colors">
                    {item.step}
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-[var(--color-accent-subtle)] text-[var(--color-primary)] flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-base text-[var(--color-text)]">{item.title}</h3>
                  <p className="text-xs text-[var(--color-text-muted)] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CORE MOBILITY PILLARS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-primary)]">
            Complete Mobility Ecosystem
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[var(--color-text)] mt-1">
            Integrated Mobility Solutions
          </h2>
          <p className="text-xs sm:text-sm text-[var(--color-text-muted)] mt-2">
            Everything your vehicle requires connected in one smart dashboard
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* FASTag Card */}
          <div className="p-6 rounded-3xl bg-[var(--color-surface)] border border-[var(--color-border)] space-y-4 hover:shadow-xl transition-all">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center">
              <CreditCard className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg text-[var(--color-text)]">
              FASTag Auto-Debit & Recharge
            </h3>
            <p className="text-xs text-[var(--color-text-muted)] leading-relaxed">
              Never get stuck at station parking barriers. Check balance, set auto-recharge thresholds, and monitor electronic toll records.
            </p>
            <Link
              to="/fastag"
              className="inline-flex items-center gap-1 text-xs font-bold text-[var(--color-primary)] hover:underline pt-2"
            >
              <span>Manage FASTag</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Insurance & Claims Card */}
          <div className="p-6 rounded-3xl bg-[var(--color-surface)] border border-[var(--color-border)] space-y-4 hover:shadow-xl transition-all">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-600 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg text-[var(--color-text)]">
              Vehicle Insurance & Instant Claims
            </h3>
            <p className="text-xs text-[var(--color-text-muted)] leading-relaxed">
              Compare plans, renew policies before expiration, and file quick simulated digital claims with live surveyor progress tracking.
            </p>
            <Link
              to="/insurance"
              className="inline-flex items-center gap-1 text-xs font-bold text-[var(--color-primary)] hover:underline pt-2"
            >
              <span>Explore Insurance</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* EV Charging Hubs Card */}
          <div className="p-6 rounded-3xl bg-[var(--color-surface)] border border-[var(--color-border)] space-y-4 hover:shadow-xl transition-all">
            <div className="w-12 h-12 rounded-2xl bg-teal-500/10 text-teal-600 flex items-center justify-center">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg text-[var(--color-text)]">
              EV Supercharger Discovery & Calculator
            </h3>
            <p className="text-xs text-[var(--color-text-muted)] leading-relaxed">
              Discover high-speed DC chargers at transit terminals, calculate kWh duration and costs, and start simulated charging sessions.
            </p>
            <Link
              to="/ev-charging"
              className="inline-flex items-center gap-1 text-xs font-bold text-[var(--color-primary)] hover:underline pt-2"
            >
              <span>Find EV Chargers</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* SUSTAINABILITY & SMART MOBILITY IMPACT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-br from-[var(--color-primary-dark)] to-[var(--color-primary)] text-white p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          <div className="max-w-2xl space-y-4 relative z-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-xs font-bold border border-white/20">
              <TreePine className="w-4 h-4 text-emerald-300" />
              <span>Decarbonizing Indian Railway Corridors</span>
            </span>
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
              Combating Urban Congestion Through Smart Parking
            </h2>
            <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
              Studies show vehicles circling railway concourses for parking generate over 30% of local traffic jams and idle emissions. ParkEase slot reservations eliminate search cruising, supporting green multimodal rail journeys.
            </p>
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/20 text-center">
              <div>
                <p className="text-2xl font-black text-emerald-300">18 min</p>
                <p className="text-[11px] text-white/70">Avg. time saved per trip</p>
              </div>
              <div>
                <p className="text-2xl font-black text-emerald-300">-420g</p>
                <p className="text-[11px] text-white/70">CO₂ idling eliminated</p>
              </div>
              <div>
                <p className="text-2xl font-black text-emerald-300">100%</p>
                <p className="text-[11px] text-white/70">FASTag barrier automation</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SAMPLE TESTIMONIALS (CLEARLY MARKED DEMO) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--color-primary)] bg-[var(--color-accent-subtle)] px-2.5 py-1 rounded-full">
            Demonstration User Feedback
          </span>
          <h2 className="text-2xl font-black text-[var(--color-text)] mt-2">
            What Commuters Experience
          </h2>
          <p className="text-xs text-[var(--color-text-muted)] mt-1">
            Simulated quotes reflecting typical daily intercity passenger scenarios
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              quote: 'Booking slot CCG-03 at Chennai Central saved me from missing the Shatabdi Express. The FASTag gate opened right as I pulled up.',
              name: 'Priya Ramanathan',
              role: 'Frequent Train Commuter, Chennai',
              stars: 5,
            },
            {
              quote: 'Left my Tata Nexon EV at KSR Bengaluru with 25% charge and booked the 50kW port. Came back from Mysuru with 100% battery!',
              name: 'Karthik Hegde',
              role: 'Software Architect, Bengaluru',
              stars: 5,
            },
            {
              quote: 'Had my car detailed with waterless foam while attending meetings in Agra. Cleaned and ready when I stepped off the train at NDLS.',
              name: 'Vikramaditya Sengupta',
              role: 'Business Consultant, New Delhi',
              stars: 5,
            },
          ].map((t, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] space-y-3 shadow-xs"
            >
              <div className="flex items-center gap-1">
                {Array.from({ length: t.stars }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-xs text-[var(--color-text)] leading-relaxed italic">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="pt-2 border-t border-[var(--color-border)]">
                <p className="text-xs font-bold text-[var(--color-text)]">{t.name}</p>
                <p className="text-[11px] text-[var(--color-text-muted)]">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ ACCORDION */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-primary)]">
            Got Questions?
          </span>
          <h2 className="text-2xl font-black text-[var(--color-text)] mt-1">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] overflow-hidden transition-all"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 font-bold text-sm text-[var(--color-text)] hover:text-[var(--color-primary)] transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 shrink-0 transition-transform ${
                      isOpen ? 'rotate-180 text-[var(--color-primary)]' : 'text-[var(--color-text-muted)]'
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-4 sm:px-5 pb-5 text-xs text-[var(--color-text-muted)] leading-relaxed border-t border-[var(--color-border)]/50 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
