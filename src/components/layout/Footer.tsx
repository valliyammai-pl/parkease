import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from '../common/Logo';
import {
  MapPin,
  ShieldCheck,
  Zap,
  CreditCard,
  Train,
  Heart,
  Globe,
  Mail,
  Phone,
} from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[var(--color-surface)] border-t border-[var(--color-border)] text-[var(--color-text-muted)] transition-colors mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Logo size="lg" showTagline />
            <p className="text-xs sm:text-sm leading-relaxed max-w-sm">
              ParkEase is India&apos;s smart transit mobility platform solving first-and-last mile parking congestion across high-density railway stations through AI-guided slots, FASTag integration, and EV charging hubs.
            </p>
            <div className="flex items-center gap-3 text-xs pt-1">
              <span className="inline-flex items-center gap-1 text-[var(--color-primary)] font-semibold">
                <Train className="w-4 h-4" /> Transit Station First
              </span>
              <span>•</span>
              <span className="inline-flex items-center gap-1 text-emerald-600 font-semibold">
                <Zap className="w-4 h-4" /> 100% EV Ready
              </span>
            </div>
            <div className="pt-2 text-xs text-[var(--color-text-muted)]">
              <p className="font-semibold text-[var(--color-text)]">Demonstration Portfolio Project</p>
              <p className="text-[11px] mt-0.5">Frontend simulated interactions using React, Vite, TypeScript & Tailwind CSS.</p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--color-text)] mb-4">
              Parking Hubs
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link to="/parking?station=Chennai" className="hover:text-[var(--color-primary)] transition-colors">
                  Chennai Central (MAS)
                </Link>
              </li>
              <li>
                <Link to="/parking?station=Bengaluru" className="hover:text-[var(--color-primary)] transition-colors">
                  KSR Bengaluru (SBC)
                </Link>
              </li>
              <li>
                <Link to="/parking?station=Hyderabad" className="hover:text-[var(--color-primary)] transition-colors">
                  Hyderabad Deccan (HYB)
                </Link>
              </li>
              <li>
                <Link to="/parking?station=Delhi" className="hover:text-[var(--color-primary)] transition-colors">
                  New Delhi (NDLS)
                </Link>
              </li>
              <li>
                <Link to="/parking?station=Pune" className="hover:text-[var(--color-primary)] transition-colors">
                  Pune Junction (PUNE)
                </Link>
              </li>
              <li>
                <Link to="/parking?station=Mumbai" className="hover:text-[var(--color-primary)] transition-colors">
                  Mumbai CSMT
                </Link>
              </li>
            </ul>
          </div>

          {/* Smart Mobility Solutions */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--color-text)] mb-4">
              Smart Mobility
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link to="/fastag" className="hover:text-[var(--color-primary)] transition-colors">
                  FASTag Auto-Debit & Recharge
                </Link>
              </li>
              <li>
                <Link to="/ev-charging" className="hover:text-[var(--color-primary)] transition-colors">
                  EV Supercharger Network
                </Link>
              </li>
              <li>
                <Link to="/insurance" className="hover:text-[var(--color-primary)] transition-colors">
                  Vehicle Insurance & Instant Claims
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-[var(--color-primary)] transition-colors">
                  Station Eco Wash & Servicing
                </Link>
              </li>
              <li>
                <Link to="/vehicles" className="hover:text-[var(--color-primary)] transition-colors">
                  Multi-Vehicle Fleet Manager
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="hover:text-[var(--color-primary)] transition-colors">
                  Transit Analytics Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Sustainability & Policies */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--color-text)] mb-4">
              Sustainability
            </h4>
            <p className="text-xs leading-relaxed mb-3">
              By reducing cruising time around busy railway stations by an estimated 18 minutes per vehicle, ParkEase simulations reduce urban tailpipe idling emissions and boost multi-modal rail adoption.
            </p>
            <div className="pt-2 border-t border-[var(--color-border)] text-[11px] space-y-1">
              <p>Demo Support Hotline:</p>
              <p className="font-semibold text-[var(--color-text)]">+91 1800-PARK-EASE (Toll Free)</p>
              <p className="text-[var(--color-primary)]">support@parkease.demo.in</p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-[var(--color-border)] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p>© {new Date().getFullYear()} ParkEase Inc. Crafted as a portfolio showcase. All mock rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link to="/settings" className="hover:text-[var(--color-primary)] transition-colors">
              Reset Demo State
            </Link>
            <span>•</span>
            <span className="inline-flex items-center gap-1 text-[var(--color-text-muted)]">
              Made with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" /> for Indian Urban Mobility
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
