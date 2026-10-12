import { InsurancePolicy, InsuranceClaim } from '../types';

export interface InsurancePlanComparison {
  id: string;
  name: string;
  tier: 'Basic' | 'Standard' | 'Premium';
  tagline: string;
  recommended?: boolean;
  basePrice: number;
  idvCoveragePercentage: number;
  features: { name: string; included: boolean }[];
  deductible: number;
}

export const sampleInsurancePlans: InsurancePlanComparison[] = [
  {
    id: 'plan-third-party',
    name: 'Third-Party Liability Shield',
    tier: 'Basic',
    tagline: 'Mandatory statutory legal compliance for Indian public roads.',
    basePrice: 2094,
    idvCoveragePercentage: 0,
    deductible: 0,
    features: [
      { name: 'Third-Party Property Damage (up to ₹7.5 Lakhs)', included: true },
      { name: 'Third-Party Bodily Injury / Death Cover', included: true },
      { name: 'Personal Accident Cover for Owner-Driver (₹15 Lakhs)', included: true },
      { name: 'Own Damage (Accident / Dent / Theft)', included: false },
      { name: 'Zero Depreciation (100% parts reimbursement)', included: false },
      { name: '24/7 Roadside Assistance & Towing', included: false },
      { name: 'Engine & Gearbox Hydrostatic Lock Protection', included: false },
      { name: 'Consumables & Key Replacement Cover', included: false },
    ],
  },
  {
    id: 'plan-comprehensive',
    name: 'Comprehensive Drive Guard',
    tier: 'Standard',
    tagline: 'Balanced protection for damage, theft, disasters, and third-party liabilities.',
    recommended: false,
    basePrice: 6850,
    idvCoveragePercentage: 85,
    deductible: 1000,
    features: [
      { name: 'Third-Party Property & Bodily Liability', included: true },
      { name: 'Accidental Own Damage Cover', included: true },
      { name: 'Theft & Total Loss Protection', included: true },
      { name: 'Fire, Flood, & Natural Calamity Shield', included: true },
      { name: 'Personal Accident Cover (₹15 Lakhs)', included: true },
      { name: 'Standard Depreciation on Fiber/Plastic parts', included: true },
      { name: 'Zero Depreciation (Full bumper-to-bumper)', included: false },
      { name: 'Engine Protect & Water Ingress', included: false },
    ],
  },
  {
    id: 'plan-zero-dep',
    name: 'Titanium Bumper-to-Bumper Zero-Dep',
    tier: 'Premium',
    tagline: 'Maximized IDV, zero depreciation deduction, engine safeguard & 24/7 roadside rescue.',
    recommended: true,
    basePrice: 11420,
    idvCoveragePercentage: 100,
    deductible: 500,
    features: [
      { name: 'Third-Party Legal & Bodily Liabilities', included: true },
      { name: '100% Zero-Depreciation on Metal, Plastic, Glass & Rubber', included: true },
      { name: 'Accidental Damage, Fire & Theft Shield', included: true },
      { name: '24/7 On-Demand Roadside Assistance & Free Towing', included: true },
      { name: 'Engine & Battery Pack Water Ingress Protection', included: true },
      { name: 'Consumables Cover (Nuts, bolts, AC gas, engine oil)', included: true },
      { name: 'Lost Key Replacement Reimbursement (up to ₹10,000)', included: true },
      { name: 'No-Claim-Bonus (NCB) Retention Protect', included: true },
    ],
  },
];

export const initialInsurancePolicies: InsurancePolicy[] = [
  {
    id: 'pol-nexon-ev',
    policyNumber: 'BA-2025-NEX-884192',
    vehicleReg: 'KA 01 MJ 4589',
    vehicleName: 'Tata Nexon EV Max',
    insurer: 'HDFC ERGO General Insurance',
    coverageType: 'Zero Depreciation',
    startDate: '2025-11-01',
    expiryDate: '2026-10-31',
    premiumAmount: 11420,
    idvAmount: 1420000,
    status: 'expiring_soon',
    daysUntilExpiry: 19,
    features: ['Zero Depreciation', '24/7 Roadside Assistance', 'High-Voltage EV Battery Protection', 'Consumables Cover'],
    ncbDiscountPercentage: 35,
  },
  {
    id: 'pol-creta-petrol',
    policyNumber: 'IC-2026-CRT-319042',
    vehicleReg: 'TN 07 BQ 9124',
    vehicleName: 'Hyundai Creta SX (O)',
    insurer: 'ICICI Lombard General Insurance',
    coverageType: 'Comprehensive',
    startDate: '2026-03-15',
    expiryDate: '2027-03-14',
    premiumAmount: 8950,
    idvAmount: 1180000,
    status: 'active',
    daysUntilExpiry: 153,
    features: ['Comprehensive Own Damage', 'Personal Accident Cover', 'Third-Party Liability', 'Emergency Towing'],
    ncbDiscountPercentage: 20,
  },
];

export const initialInsuranceClaims: InsuranceClaim[] = [
  {
    id: 'clm-88319',
    claimReference: 'CLM-2026-98214',
    policyId: 'pol-nexon-ev',
    policyNumber: 'BA-2025-NEX-884192',
    vehicleReg: 'KA 01 MJ 4589',
    incidentDate: '2026-09-28',
    incidentType: 'Glass/Dent Damage',
    description: 'Minor rear bumper scuff and left tail-lamp glass crack while reversing out of railway parking slot.',
    estimatedDamage: 6500,
    documentNames: ['Rear_Bumper_Damage.jpg', 'TailLamp_CloseUp.jpg', 'Driving_License_Aarav.pdf'],
    status: 'Under Review',
    submittedAt: '2026-09-29T10:30:00Z',
    timeline: [
      { step: 'Claim Submitted Online', timestamp: '29 Sep 2026, 10:30 AM', done: true },
      { step: 'Claim Reference Generated & Surveyor Appointed', timestamp: '29 Sep 2026, 02:15 PM', done: true },
      { step: 'Digital Evidence & Garage Quotation Under Review', timestamp: '30 Sep 2026, 11:00 AM', done: true },
      { step: 'Surveyor Physical / Video Inspection', timestamp: 'Scheduled for Tomorrow', done: false },
      { step: 'Final Claim Settlement & Payment Approval', timestamp: 'Pending Inspection', done: false },
    ],
  },
];
