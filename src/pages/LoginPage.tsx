import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { Logo } from '../components/common/Logo';
import { Modal } from '../components/common/Modal';
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Train,
  Car,
} from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { login, demoLogin } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state as any)?.from?.pathname || '/dashboard';

  const [email, setEmail] = useState('aarav.sharma@example.in');
  const [password, setPassword] = useState('DemoSecurePass123!');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);
  const [resetEmail, setResetEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }
    if (!password || password.length < 6) {
      setErrorMsg('Password must be at least 6 characters.');
      return;
    }

    login(email, rememberMe);
    toast.success('Welcome Back!', `Signed in as ${email}`);
    navigate(from, { replace: true });
  };

  const handleDemoSignIn = () => {
    demoLogin();
    toast.success('Welcome, Aarav!', 'Logged in with demonstration portfolio account.');
    navigate(from, { replace: true });
  };

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!resetEmail || !resetEmail.includes('@')) {
      toast.error('Invalid Email', 'Please provide a valid registered email.');
      return;
    }
    setForgotPasswordOpen(false);
    toast.info('Simulated Password Link Sent', `Password reset instructions sent to ${resetEmail}.`);
    setResetEmail('');
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center p-4 sm:p-8">
      <div className="w-full max-w-4xl bg-[var(--color-surface)] border border-[var(--color-border)] rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-2">
        {/* Left Branded Visual Panel (Desktop) */}
        <div className="hidden lg:flex flex-col justify-between p-10 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-dark)] text-white relative overflow-hidden">
          {/* Subtle design pattern */}
          <div className="space-y-4 relative z-10">
            <Logo size="lg" className="text-white" />
            <h2 className="text-2xl font-black leading-tight pt-4">
              Stress-Free Transit Starts Here.
            </h2>
            <p className="text-xs text-white/80 leading-relaxed">
              Log in to manage your reserved parking bays, check live railway slot availability, track FASTag debits, and oversee EV charging across India.
            </p>
          </div>

          <div className="space-y-3 relative z-10 pt-8 border-t border-white/10 text-xs">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-300" />
              <span>Simulated Local Profile Storage</span>
            </div>
            <div className="flex items-center gap-2">
              <Train className="w-4 h-4 text-[var(--color-accent)]" />
              <span>Direct Railway Station Integrations</span>
            </div>
            <div className="flex items-center gap-2">
              <Car className="w-4 h-4 text-emerald-300" />
              <span>FASTag 0% Surcharge Barrier Clearance</span>
            </div>
          </div>
        </div>

        {/* Right Form Panel */}
        <div className="p-8 sm:p-10 flex flex-col justify-center space-y-6">
          <div>
            <h2 className="text-2xl font-black text-[var(--color-text)]">
              Welcome Back
            </h2>
            <p className="text-xs text-[var(--color-text-muted)] mt-1">
              Enter your credentials or use 1-click Demo Login below
            </p>
          </div>

          {/* 1-Click Demo Login Button */}
          <button
            type="button"
            onClick={handleDemoSignIn}
            className="w-full py-3 px-4 rounded-xl bg-[var(--color-accent-subtle)] border border-[var(--color-card-border)] hover:bg-[var(--color-primary)]/10 text-[var(--color-primary)] text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            <span>1-Click Log In with Demo Account (Aarav Sharma)</span>
          </button>

          <div className="flex items-center gap-2 text-xs text-[var(--color-text-muted)]">
            <div className="flex-1 border-t border-[var(--color-border)]" />
            <span>or email credentials</span>
            <div className="flex-1 border-t border-[var(--color-border)]" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {errorMsg && (
              <div className="p-3 rounded-xl bg-rose-50 text-rose-700 text-xs font-semibold border border-rose-200">
                {errorMsg}
              </div>
            )}

            {/* Email */}
            <div>
              <label className="block text-xs font-bold text-[var(--color-text)] mb-1.5">
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
                  className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl bg-[var(--color-background)] border border-[var(--color-border)] text-[var(--color-text)] focus:outline-hidden focus:ring-2 focus:ring-[var(--color-accent)]"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-[var(--color-text)]">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => setForgotPasswordOpen(true)}
                  className="text-[11px] font-bold text-[var(--color-primary)] hover:underline"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setErrorMsg('');
                  }}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-2.5 text-xs rounded-xl bg-[var(--color-background)] border border-[var(--color-border)] text-[var(--color-text)] focus:outline-hidden focus:ring-2 focus:ring-[var(--color-accent)]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember me */}
            <div className="flex items-center gap-2 pt-1">
              <input
                type="checkbox"
                id="rememberMe"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="rounded text-[var(--color-primary)] focus:ring-[var(--color-primary)] w-4 h-4"
              />
              <label htmlFor="rememberMe" className="text-xs text-[var(--color-text-muted)] cursor-pointer">
                Remember this demonstration session
              </label>
            </div>

            {/* Submit CTA */}
            <button
              type="submit"
              className="w-full py-3 px-4 rounded-xl bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white text-xs font-extrabold shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
            >
              <span>Log In</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <p className="text-center text-xs text-[var(--color-text-muted)]">
            Don&apos;t have an account?{' '}
            <Link to="/signup" className="font-bold text-[var(--color-primary)] hover:underline">
              Create an account
            </Link>
          </p>
        </div>
      </div>

      {/* Forgot Password Modal */}
      <Modal
        isOpen={forgotPasswordOpen}
        onClose={() => setForgotPasswordOpen(false)}
        title="Reset Password (Demo)"
        description="Enter your email to simulate a reset instructions link"
        maxWidth="sm"
      >
        <form onSubmit={handleResetPassword} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-[var(--color-text)] mb-1">
              Registered Email
            </label>
            <input
              type="email"
              value={resetEmail}
              onChange={(e) => setResetEmail(e.target.value)}
              placeholder="aarav.sharma@example.in"
              className="w-full py-2 px-3 text-xs rounded-xl bg-[var(--color-background)] border border-[var(--color-border)] text-[var(--color-text)] focus:outline-hidden"
              required
            />
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setForgotPasswordOpen(false)}
              className="w-1/2 py-2 text-xs font-bold rounded-xl border border-[var(--color-border)] text-[var(--color-text-muted)]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-1/2 py-2 text-xs font-bold rounded-xl bg-[var(--color-primary)] text-white"
            >
              Send Reset Link
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
