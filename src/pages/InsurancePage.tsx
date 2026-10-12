import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useToast } from '../context/ToastContext';
import { sampleInsurancePlans } from '../data/mockInsurance';
import { ClaimTrackerModal } from '../components/insurance/ClaimTrackerModal';
import { StatusBadge } from '../components/common/StatusBadge';
import { InsurancePolicy, InsuranceClaim } from '../types';
import {
  ShieldCheck,
  ShieldAlert,
  FileText,
  AlertTriangle,
  Upload,
  CheckCircle2,
  Calendar,
  Car,
  Clock,
  Sparkles,
  ArrowRight,
  Plus,
} from 'lucide-react';

export const InsurancePage: React.FC = () => {
  const {
    insurancePolicies,
    renewPolicy,
    insuranceClaims,
    addClaim,
    vehicles,
  } = useApp();
  const toast = useToast();

  const [activeTab, setActiveTab] = useState<'overview' | 'renew' | 'claims'>('overview');
  const [selectedClaimForDetail, setSelectedClaimForDetail] = useState<InsuranceClaim | null>(null);

  // Renewal Form state
  const [renewalVehicleReg, setRenewalVehicleReg] = useState<string>(
    insurancePolicies[0]?.vehicleReg || 'KA 01 MJ 4589'
  );
  const [selectedPlanId, setSelectedPlanId] = useState<string>('plan-zero-dep');
  const [addRoadsideAssist, setAddRoadsideAssist] = useState<boolean>(true);
  const [addEngineProtect, setAddEngineProtect] = useState<boolean>(true);

  // New Claim Form state
  const [claimPolicyId, setClaimPolicyId] = useState<string>(insurancePolicies[0]?.id || '');
  const [incidentDate, setIncidentDate] = useState<string>('2026-10-10');
  const [incidentType, setIncidentType] = useState<InsuranceClaim['incidentType']>('Glass/Dent Damage');
  const [damageDescription, setDamageDescription] = useState<string>('');
  const [damageEstimate, setDamageEstimate] = useState<number>(4500);
  const [uploadedFiles, setUploadedFiles] = useState<string[]>(['Damage_Photo_1.jpg']);

  const currentPolicyToRenew = insurancePolicies.find((p) => p.vehicleReg === renewalVehicleReg) || insurancePolicies[0];
  const chosenPlan = sampleInsurancePlans.find((p) => p.id === selectedPlanId) || sampleInsurancePlans[2];

  // Dynamic renewal price estimate
  const basePlanPrice = chosenPlan.basePrice;
  const addOnCost = (addRoadsideAssist ? 450 : 0) + (addEngineProtect ? 850 : 0);
  const ncbDiscount = Math.round(basePlanPrice * ((currentPolicyToRenew?.ncbDiscountPercentage || 20) / 100));
  const estimatedPremium = Math.max(1800, basePlanPrice + addOnCost - ncbDiscount);

  const handleRenewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPolicyToRenew) return;
    renewPolicy(currentPolicyToRenew.id, chosenPlan.name, estimatedPremium);
    setActiveTab('overview');
  };

  const handleFileUploadSimulated = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const names = Array.from(e.target.files).map((f) => f.name);
      setUploadedFiles((prev) => [...prev, ...names]);
      toast.info('File Staged', `${names.length} simulated image(s) attached.`);
    }
  };

  const handleClaimSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const policy = insurancePolicies.find((p) => p.id === claimPolicyId) || insurancePolicies[0];
    if (!damageDescription.trim()) {
      toast.error('Description Required', 'Please provide a brief description of the incident damage.');
      return;
    }

    const created = addClaim({
      policyId: policy.id,
      policyNumber: policy.policyNumber,
      vehicleReg: policy.vehicleReg,
      incidentDate,
      incidentType,
      description: damageDescription,
      estimatedDamage: Number(damageEstimate),
      documentNames: uploadedFiles,
      status: 'Submitted',
    });

    setDamageDescription('');
    setSelectedClaimForDetail(created);
    setActiveTab('claims');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 text-xs font-bold border border-blue-200 dark:border-blue-800">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Vehicle Protection & Cashless Station Claims Simulation</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-[var(--color-text)] tracking-tight">
          Vehicle Insurance & Fast-Track Claims
        </h1>
        <p className="text-xs sm:text-sm text-[var(--color-text-muted)] max-w-2xl">
          Review active policies, calculate instant renewal quotes with Zero-Depreciation, and file simulated digital claims with surveyor audit tracking.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-[var(--color-border)] pb-2 overflow-x-auto no-scrollbar">
        {[
          { id: 'overview', label: `1. Policy Overview (${insurancePolicies.length})` },
          { id: 'renew', label: '2. Insurance Renewal & Plan Compare' },
          { id: 'claims', label: `3. Insurance Claims (${insuranceClaims.length})` },
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

      {/* TAB 1: POLICY OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {insurancePolicies.map((pol) => {
              const isExpiring = pol.status === 'expiring_soon';
              return (
                <div
                  key={pol.id}
                  className={`rounded-3xl bg-[var(--color-surface)] border p-6 sm:p-7 shadow-xs space-y-5 transition-all ${
                    isExpiring
                      ? 'border-rose-300 ring-2 ring-rose-500/20'
                      : 'border-[var(--color-border)]'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-[var(--color-text-muted)]">
                        {pol.insurer}
                      </span>
                      <h3 className="font-extrabold text-lg text-[var(--color-text)] mt-0.5">
                        {pol.vehicleName}
                      </h3>
                      <p className="text-xs font-mono text-[var(--color-primary)] font-bold">
                        {pol.vehicleReg}
                      </p>
                    </div>
                    <StatusBadge
                      label={isExpiring ? `Expires in ${pol.daysUntilExpiry}d` : 'Active'}
                      variant={isExpiring ? 'danger' : 'success'}
                      size="sm"
                    />
                  </div>

                  {/* Policy Highlights Grid */}
                  <div className="grid grid-cols-2 gap-3 text-xs bg-[var(--color-surface-hover)] p-4 rounded-2xl border border-[var(--color-border)]">
                    <div>
                      <span className="text-[10px] text-[var(--color-text-muted)] uppercase font-semibold">Policy No.</span>
                      <p className="font-mono font-bold text-[var(--color-text)]">{pol.policyNumber}</p>
                    </div>
                    <div>
                      <span className="text-[10px] text-[var(--color-text-muted)] uppercase font-semibold">Coverage Tier</span>
                      <p className="font-bold text-[var(--color-text)]">{pol.coverageType}</p>
                    </div>
                    <div>
                      <span className="text-[10px] text-[var(--color-text-muted)] uppercase font-semibold">Insured Declared Value</span>
                      <p className="font-bold text-[var(--color-text)]">₹{(pol.idvAmount / 100000).toFixed(1)} Lakhs</p>
                    </div>
                    <div>
                      <span className="text-[10px] text-[var(--color-text-muted)] uppercase font-semibold">Annual Premium</span>
                      <p className="font-black text-[var(--color-primary)]">₹{pol.premiumAmount}</p>
                    </div>
                    <div>
                      <span className="text-[10px] text-[var(--color-text-muted)] uppercase font-semibold">Valid Period</span>
                      <p className="text-[var(--color-text)] font-semibold">{pol.startDate} to {pol.expiryDate}</p>
                    </div>
                    <div>
                      <span className="text-[10px] text-[var(--color-text-muted)] uppercase font-semibold">NCB Discount</span>
                      <p className="text-emerald-600 font-bold">{pol.ncbDiscountPercentage}% Bonus</p>
                    </div>
                  </div>

                  {/* Included features */}
                  <div>
                    <span className="text-[11px] font-bold text-[var(--color-text)] block mb-1.5">
                      Included Endorsements
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {pol.features.map((f, i) => (
                        <span
                          key={i}
                          className="text-[11px] px-2.5 py-1 rounded-lg bg-[var(--color-background)] border border-[var(--color-border)] text-[var(--color-text-muted)] font-medium"
                        >
                          ✓ {f}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action */}
                  <div className="pt-2 border-t border-[var(--color-border)] flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => {
                        setRenewalVehicleReg(pol.vehicleReg);
                        setActiveTab('renew');
                      }}
                      className="px-4 py-2 rounded-xl bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white text-xs font-bold shadow-xs transition-colors"
                    >
                      Renew / Upgrade Coverage
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setClaimPolicyId(pol.id);
                        setActiveTab('claims');
                      }}
                      className="text-xs font-bold text-[var(--color-primary)] hover:underline"
                    >
                      File a Claim
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 2: INSURANCE RENEWAL & PLAN COMPARISON */}
      {activeTab === 'renew' && (
        <div className="space-y-8">
          {/* Vehicle selector banner */}
          <div className="p-5 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-extrabold text-sm text-[var(--color-text)]">
                Selecting Vehicle for Simulated Insurance Renewal
              </h3>
              <p className="text-xs text-[var(--color-text-muted)]">
                NCB bonus and IDV estimates update according to your choice
              </p>
            </div>
            <select
              value={renewalVehicleReg}
              onChange={(e) => setRenewalVehicleReg(e.target.value)}
              className="py-2 px-3 text-xs rounded-xl bg-[var(--color-background)] border border-[var(--color-border)] text-[var(--color-text)] font-bold"
            >
              {insurancePolicies.map((p) => (
                <option key={p.id} value={p.vehicleReg}>
                  {p.vehicleName} ({p.vehicleReg})
                </option>
              ))}
            </select>
          </div>

          {/* Plan Comparison Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            {sampleInsurancePlans.map((plan) => {
              const isSelected = plan.id === selectedPlanId;
              return (
                <div
                  key={plan.id}
                  onClick={() => setSelectedPlanId(plan.id)}
                  className={`rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all cursor-pointer border ${
                    isSelected
                      ? 'bg-[var(--color-surface)] border-[var(--color-primary)] ring-2 ring-[var(--color-accent)] shadow-xl scale-102'
                      : 'bg-[var(--color-surface)]/70 border-[var(--color-border)] hover:bg-[var(--color-surface)]'
                  }`}
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] uppercase font-bold tracking-wider text-[var(--color-primary)] bg-[var(--color-accent-subtle)] px-2.5 py-1 rounded-full">
                        {plan.tier} Tier
                      </span>
                      {plan.recommended && (
                        <span className="text-[10px] font-black uppercase text-white bg-[var(--color-primary)] px-2 py-0.5 rounded-full">
                          Recommended
                        </span>
                      )}
                    </div>

                    <div>
                      <h4 className="font-black text-lg text-[var(--color-text)]">{plan.name}</h4>
                      <p className="text-xs text-[var(--color-text-muted)] mt-1">{plan.tagline}</p>
                    </div>

                    <div className="pt-2 border-t border-[var(--color-border)]">
                      <span className="text-2xl font-black text-[var(--color-text)]">₹{plan.basePrice}</span>
                      <span className="text-xs text-[var(--color-text-muted)]"> / year (before NCB)</span>
                    </div>

                    {/* Features list */}
                    <div className="space-y-2 pt-2 border-t border-[var(--color-border)] text-xs">
                      {plan.features.map((feat, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <CheckCircle2
                            className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${
                              feat.included ? 'text-emerald-500' : 'text-slate-300 dark:text-slate-600'
                            }`}
                          />
                          <span
                            className={
                              feat.included ? 'text-[var(--color-text)]' : 'text-[var(--color-text-muted)] line-through'
                            }
                          >
                            {feat.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6">
                    <button
                      type="button"
                      className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all ${
                        isSelected
                          ? 'bg-[var(--color-primary)] text-white shadow-xs'
                          : 'border border-[var(--color-border)] text-[var(--color-text)]'
                      }`}
                    >
                      {isSelected ? 'Plan Selected ✓' : 'Select Plan'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Add-ons & Final Premium Summary */}
          <div className="rounded-3xl bg-[var(--color-surface)] border border-[var(--color-border)] p-6 sm:p-8 shadow-xs grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h4 className="font-bold text-sm text-[var(--color-text)]">
                Optional Railway & Highway Add-On Riders
              </h4>
              <label className="flex items-start gap-3 p-3.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-background)] cursor-pointer">
                <input
                  type="checkbox"
                  checked={addRoadsideAssist}
                  onChange={(e) => setAddRoadsideAssist(e.target.checked)}
                  className="rounded text-[var(--color-primary)] focus:ring-[var(--color-primary)] w-4 h-4 mt-0.5"
                />
                <div className="text-xs">
                  <span className="font-bold text-[var(--color-text)] block">
                    24/7 Station & Highway Roadside Assistance (+₹450)
                  </span>
                  <span className="text-[var(--color-text-muted)]">
                    Free mechanical triage, battery jump-start, and flat-bed towing within 50 km.
                  </span>
                </div>
              </label>

              <label className="flex items-start gap-3 p-3.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-background)] cursor-pointer">
                <input
                  type="checkbox"
                  checked={addEngineProtect}
                  onChange={(e) => setAddEngineProtect(e.target.checked)}
                  className="rounded text-[var(--color-primary)] focus:ring-[var(--color-primary)] w-4 h-4 mt-0.5"
                />
                <div className="text-xs">
                  <span className="font-bold text-[var(--color-text)] block">
                    Engine & EV High-Voltage Battery Shield (+₹850)
                  </span>
                  <span className="text-[var(--color-text-muted)]">
                    Covers monsoon water ingress, hydrostatic engine lock, and battery thermal surge.
                  </span>
                </div>
              </label>
            </div>

            {/* Bill Summary */}
            <div className="space-y-4 bg-[var(--color-surface-hover)] p-6 rounded-2xl border border-[var(--color-border)] flex flex-col justify-between">
              <div>
                <h4 className="font-bold text-sm text-[var(--color-text)] mb-3">
                  Estimated Renewal Calculation
                </h4>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between text-[var(--color-text-muted)]">
                    <span>Base Tier Premium ({chosenPlan.name}):</span>
                    <span>₹{basePlanPrice}</span>
                  </div>
                  <div className="flex justify-between text-[var(--color-text-muted)]">
                    <span>Selected Add-On Endorsements:</span>
                    <span>+₹{addOnCost}</span>
                  </div>
                  <div className="flex justify-between text-emerald-600 font-semibold">
                    <span>No Claim Bonus (NCB) Discount:</span>
                    <span>-₹{ncbDiscount}</span>
                  </div>
                  <div className="border-t border-[var(--color-border)] pt-2 flex justify-between text-base font-black text-[var(--color-text)]">
                    <span>Final Estimated Premium:</span>
                    <span className="text-[var(--color-primary)]">₹{estimatedPremium}</span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={handleRenewSubmit}
                className="w-full py-3 rounded-xl bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white text-xs font-bold shadow-md transition-all cursor-pointer"
              >
                Confirm Simulated Policy Renewal (₹{estimatedPremium})
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: INSURANCE CLAIMS */}
      {activeTab === 'claims' && (
        <div className="space-y-8">
          {/* Claim Submission Form */}
          <div className="rounded-3xl bg-[var(--color-surface)] border border-[var(--color-border)] p-6 sm:p-8 shadow-xs space-y-6">
            <div>
              <span className="text-[10px] uppercase font-bold text-[var(--color-primary)] tracking-wider bg-[var(--color-accent-subtle)] px-2.5 py-1 rounded-full">
                Fast-Track Cashless Form
              </span>
              <h3 className="font-black text-xl text-[var(--color-text)] mt-2">
                File a Parking / Transit Damage Claim
              </h3>
              <p className="text-xs text-[var(--color-text-muted)] mt-0.5">
                Submit damage details with simulated document upload to initiate surveyor review.
              </p>
            </div>

            <form onSubmit={handleClaimSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[var(--color-text)] mb-1">
                    Select Insured Vehicle & Policy
                  </label>
                  <select
                    value={claimPolicyId}
                    onChange={(e) => setClaimPolicyId(e.target.value)}
                    className="w-full py-2 px-3 text-xs rounded-xl bg-[var(--color-background)] border border-[var(--color-border)] text-[var(--color-text)] font-semibold"
                  >
                    {insurancePolicies.map((pol) => (
                      <option key={pol.id} value={pol.id}>
                        {pol.vehicleName} ({pol.vehicleReg})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[var(--color-text)] mb-1">
                    Date of Incident
                  </label>
                  <input
                    type="date"
                    value={incidentDate}
                    onChange={(e) => setIncidentDate(e.target.value)}
                    className="w-full py-2 px-3 text-xs rounded-xl bg-[var(--color-background)] border border-[var(--color-border)] text-[var(--color-text)]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[var(--color-text)] mb-1">
                    Incident Classification
                  </label>
                  <select
                    value={incidentType}
                    onChange={(e) => setIncidentType(e.target.value as any)}
                    className="w-full py-2 px-3 text-xs rounded-xl bg-[var(--color-background)] border border-[var(--color-border)] text-[var(--color-text)] font-semibold"
                  >
                    <option value="Glass/Dent Damage">Glass / Minor Dent Damage</option>
                    <option value="Accident">Accidental Collision</option>
                    <option value="Theft">Theft / Break-In</option>
                    <option value="Natural Calamity">Rain / Flood Water Damage</option>
                    <option value="Vandalism">Scratch / Vandalism</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[var(--color-text)] mb-1">
                  Incident Description & Circumstances
                </label>
                <textarea
                  rows={3}
                  value={damageDescription}
                  onChange={(e) => setDamageDescription(e.target.value)}
                  placeholder="Describe where the damage occurred (e.g., while reversing out of railway parking slot B-04)..."
                  className="w-full py-2 px-3 text-xs rounded-xl bg-[var(--color-background)] border border-[var(--color-border)] text-[var(--color-text)]"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                <div>
                  <label className="block text-xs font-bold text-[var(--color-text)] mb-1">
                    Estimated Repair Quotation (₹)
                  </label>
                  <input
                    type="number"
                    min="500"
                    max="500000"
                    value={damageEstimate}
                    onChange={(e) => setDamageEstimate(Number(e.target.value))}
                    className="w-full py-2 px-3 text-xs rounded-xl bg-[var(--color-background)] border border-[var(--color-border)] text-[var(--color-text)]"
                  />
                </div>

                {/* Simulated Document Upload */}
                <div>
                  <label className="block text-xs font-bold text-[var(--color-text)] mb-1">
                    Upload Damage Evidence Photos
                  </label>
                  <label className="flex items-center gap-2 py-2 px-3 rounded-xl border border-dashed border-[var(--color-border)] bg-[var(--color-background)] cursor-pointer text-xs text-[var(--color-text-muted)] hover:border-[var(--color-primary)]">
                    <Upload className="w-4 h-4 text-[var(--color-primary)]" />
                    <span>Attach image files (simulated)</span>
                    <input
                      type="file"
                      multiple
                      onChange={handleFileUploadSimulated}
                      className="hidden"
                    />
                  </label>
                  <div className="flex flex-wrap gap-1 mt-1.5">
                    {uploadedFiles.map((fn, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] bg-black/5 dark:bg-white/5 px-2 py-0.5 rounded text-[var(--color-text)]"
                      >
                        {fn}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="py-3 px-6 rounded-xl bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white text-xs font-bold shadow-md transition-all cursor-pointer"
              >
                Submit Demo Claim
              </button>
            </form>
          </div>

          {/* Past Claims History & Tracker */}
          <div className="rounded-3xl bg-[var(--color-surface)] border border-[var(--color-border)] p-6 sm:p-8 shadow-xs space-y-4">
            <h3 className="font-extrabold text-base text-[var(--color-text)]">
              Claim Audit Records & Tracking ({insuranceClaims.length})
            </h3>

            <div className="space-y-3">
              {insuranceClaims.map((claim) => (
                <div
                  key={claim.id}
                  className="p-4 sm:p-5 rounded-2xl bg-[var(--color-background)] border border-[var(--color-border)] flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-[var(--color-primary)]">
                        #{claim.claimReference}
                      </span>
                      <StatusBadge label={claim.status} variant="warning" size="sm" />
                    </div>
                    <p className="font-bold text-sm text-[var(--color-text)] mt-1">
                      {claim.incidentType} on {claim.vehicleReg}
                    </p>
                    <p className="text-xs text-[var(--color-text-muted)] mt-0.5 line-clamp-1">
                      {claim.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-4 self-end sm:self-center">
                    <div className="text-right">
                      <span className="text-[10px] uppercase font-bold text-[var(--color-text-muted)] block">Estimated</span>
                      <span className="font-black text-sm text-[var(--color-text)]">₹{claim.estimatedDamage}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setSelectedClaimForDetail(claim)}
                      className="px-3 py-1.5 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] hover:bg-[var(--color-surface-hover)] text-xs font-bold text-[var(--color-primary)] transition-colors shadow-xs"
                    >
                      Track Claim
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Claim Detail Tracker Modal */}
      <ClaimTrackerModal
        isOpen={!!selectedClaimForDetail}
        onClose={() => setSelectedClaimForDetail(null)}
        claim={selectedClaimForDetail}
      />
    </div>
  );
};
