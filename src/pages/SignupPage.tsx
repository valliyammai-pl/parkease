import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { Logo } from '../components/common/Logo';
import {
  User,
  Mail,
  Phone,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';

export const SignupPage: React.FC = () => {
  const { signup } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  // Password strength calculation
  const getPasswordStrength = (pwd: string) => {
    if (!pwd) return { score: 0, label: 'None', color: 'bg-slate-200' };
    let score = 0;
    if (pwd.length >= 6) score += 1;
    if (/[A-Z]/.test(pwd)) score += 1;
    if (/[0-9]/.test(pwd)) score += 1;
    if (/[^A-Za-z0-9]/.test(pwd)) score += 1;

    if (score <= 1) return { score: 1, label: 'Weak', color: 'bg-rose-500' };
    if (score <= 3) return { score: 2, label: 'Moderate', color: 'bg-amber-500' };
    return { score: 3, label: 'Strong', color: 'bg-emerald-500' };
  };

  const strength = getPasswordStrength(password);

  const handleQuickFillDemo = () => {
    setName('Ananya Sen');
    setEmail('ananya.sen@mobility.in');
    setPhone('+91 94321 87654');
    setPassword('ParkEase2026!');
    setConfirmPassword('ParkEase2026!');
    setErrorMsg('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      setErrorMsg('Please enter your full name.');
      return;
    }
    if (!email || !email.includes('@')) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }
    if (!phone || phone.length < 10) {
      setErrorMsg('Please enter a valid 10-digit phone number.');
      return;
    }
    if (password.length < 6) {
      setErrorMsg('Password must be at least 6 characters.');
      return;
    }
    if (password !== confirmPassword) {
      setErrorMsg('Passwords do not match.');
      return;
    }
    if (!agreeTerms) {
      setErrorMsg('Please accept the simulated demonstration terms.');
      return;
    }

    signup(name, email, phone);
    toast.success('Account Created! 🚀', `Welcome to ParkEase, ${name}!`);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center p-4 sm:p-8">
      <div className="w-full max-w-4xl bg-[var(--color-surface)] border border-[var(--color-border)] rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-2">
        {/* Left Branded Visual Panel */}
        <div className="hidden lg:flex flex-col justify-between p-10 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-dark)] text-white relative overflow-hidden">
          <div className="space-y-4 relative z-10">
            <Logo size="lg" className="text-white" />
            <h2 className="text-2xl font-black leading-tight pt-4">
              Join India&apos;s Smartest Transit Parking Platform.
            </h2>
            <p className="text-xs text-white/80 leading-relaxed">
              Create your demonstration account to register vehicles, reserve railway concourse bays, access EV chargers, and manage FASTag balances.
            </p>
          </div>

          <div className="space-y-3 relative z-10 pt-8 border-t border-white/10 text-xs">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-300" />
              <span>Free instant account setup with seeded vehicles</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-300" />
              <span>Simulated FASTag & Insurance management</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-300" />
              <span>Zero data shared externally</span>
            </div>
          </div>
        </div>

        {/* Right Form Panel */}
        <div className="p-8 sm:p-10 flex flex-col justify-center space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-black text-[var(--color-text)]">
                Create Account
              </h2>
              <p className="text-xs text-[var(--color-text-muted)] mt-0.5">
                Start parking stress-free across Indian stations
              </p>
            </div>
            <button
              type="button"
              onClick={handleQuickFillDemo}
              className="text-[11px] font-bold text-[var(--color-primary)] bg-[var(--color-accent-subtle)] px-2.5 py-1 rounded-lg border border-[var(--color-card-border)] hover:bg-[var(--color-primary)]/10 transition-colors"
            >
              Fill Demo Data
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3.5">
            {errorMsg && (
              <div className="p-3 rounded-xl bg-rose-50 text-rose-700 text-xs font-semibold border border-rose-200">
                {errorMsg}
              </div>
            )}

            {/* Name */}
            <div>
              <label className="block text-xs font-bold text-[var(--color-text)] mb-1">
                Full Name
              </label>
              <div className="relative">
                <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    setErrorMsg('');
                  }}
                  placeholder="e.g. Ananya Sen"
                  className="w-full pl-10 pr-4 py-2 text-xs rounded-xl bg-[var(--color-background)] border border-[var(--color-border)] text-[var(--color-text)] focus:outline-hidden focus:ring-2 focus:ring-[var(--color-accent)]"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-bold text-[var(--color-text)] mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setErrorMsg('');
                  }}
                  placeholder="name@example.in"
                  className="w-full pl-10 pr-4 py-2 text-xs rounded-xl bg-[var(--color-background)] border border-[var(--color-border)] text-[var(--color-text)] focus:outline-hidden focus:ring-2 focus:ring-[var(--color-accent)]"
                />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className="block text-xs font-bold text-[var(--color-text)] mb-1">
                Mobile Number
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                    setErrorMsg('');
                  }}
                  placeholder="+91 98765 43210"
                  className="w-full pl-10 pr-4 py-2 text-xs rounded-xl bg-[var(--color-background)] border border-[var(--color-border)] text-[var(--color-text)] focus:outline-hidden focus:ring-2 focus:ring-[var(--color-accent)]"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-bold text-[var(--color-text)] mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setErrorMsg('');
                  }}
                  placeholder="Create strong password"
                  className="w-full pl-10 pr-10 py-2 text-xs rounded-xl bg-[var(--color-background)] border border-[var(--color-border)] text-[var(--color-text)] focus:outline-hidden focus:ring-2 focus:ring-[var(--color-accent)]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {/* Password Strength Meter */}
              {password && (
                <div className="mt-1.5 flex items-center gap-2">
                  <div className="flex-1 h-1.5 rounded-full bg-slate-200 overflow-hidden flex">
                    <div
                      className={`h-full transition-all ${strength.color}`}
                      style={{ width: `${(strength.score / 3) * 100}%` }}
                    />
                  </div>
                  <span className="text-[10px] font-bold text-[var(--color-text-muted)]">
                    {strength.label}
                  </span>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-xs font-bold text-[var(--color-text)] mb-1">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    setErrorMsg('');
                  }}
                  placeholder="Repeat password"
                  className="w-full pl-10 pr-4 py-2 text-xs rounded-xl bg-[var(--color-background)] border border-[var(--color-border)] text-[var(--color-text)] focus:outline-hidden focus:ring-2 focus:ring-[var(--color-accent)]"
                />
              </div>
            </div>

            {/* Terms checkbox */}
            <div className="flex items-start gap-2 pt-1">
              <input
                type="checkbox"
                id="agreeTerms"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="rounded text-[var(--color-primary)] focus:ring-[var(--color-primary)] w-4 h-4 mt-0.5"
              />
              <label htmlFor="agreeTerms" className="text-[11px] text-[var(--color-text-muted)] leading-tight cursor-pointer">
                I agree to the simulated portfolio terms of service and acknowledge that all transactions are frontend demonstrations.
              </label>
            </div>

            {/* Submit CTA */}
            <button
              type="submit"
              className="w-full py-3 px-4 rounded-xl bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white text-xs font-extrabold shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
            >
              <span>Create Account</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <p className="text-center text-xs text-[var(--color-text-muted)]">
            Already registered?{' '}
            <Link to="/login" className="font-bold text-[var(--color-primary)] hover:underline">
              Log In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
