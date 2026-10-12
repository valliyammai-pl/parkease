export type ThemeMode = 'teal' | 'burgundy';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatarUrl?: string;
  joinedDate: string;
  rememberMe?: boolean;
}

export type VehicleCategory = 'car' | 'suv' | 'bike' | 'ev';
export type FuelType = 'petrol' | 'diesel' | 'ev' | 'hybrid';

export interface Vehicle {
  id: string;
  registrationNumber: string;
  make: string;
  model: string;
  category: VehicleCategory;
  fuelType: FuelType;
  color?: string;
  isDefault: boolean;
  fastagId?: string;
}

export type SlotType = 'standard' | 'ev' | 'accessible' | 'premium' | 'bike';
export type SlotStatus = 'available' | 'reserved' | 'occupied' | 'selected' | 'maintenance';

export interface ParkingSlot {
  id: string;
  number: string;
  floor: string;
  type: SlotType;
  status: SlotStatus;
  pricePerHourMultiplier: number;
}

export interface ParkingFloor {
  id: string;
  name: string;
  totalSlots: number;
  availableSlots: number;
  slots: ParkingSlot[];
}

export interface ParkingLocation {
  id: string;
  name: string;
  stationName: string;
  city: string;
  state: string;
  address: string;
  distanceFromStationKm: number;
  lat: number;
  lng: number;
  pricePerHour: number;
  pricePerDay: number;
  totalSlots: number;
  availableSlots: number;
  rating: number;
  reviewCount: number;
  imageUrl: string;
  covered: boolean;
  evCharging: boolean;
  cctvSecurity: boolean;
  valetParking: boolean;
  open247: boolean;
  disabledAccessible: boolean;
  supportedVehicles: VehicleCategory[];
  floors: ParkingFloor[];
  features: string[];
}

export type BookingStatus = 'confirmed' | 'active' | 'completed' | 'cancelled';

export interface ParkingBooking {
  id: string;
  bookingReference: string;
  parkingId: string;
  parkingName: string;
  stationName: string;
  city: string;
  slotNumber: string;
  floorName: string;
  vehicleId: string;
  vehicleReg: string;
  vehicleName: string;
  arrivalDateTime: string;
  departureDateTime: string;
  durationHours: number;
  baseAmount: number;
  taxAmount: number;
  totalAmount: number;
  status: BookingStatus;
  paymentMethod: string;
  createdAt: string;
  qrCodeSeed: string;
}

export type FastagIssuer = 'ICICI Bank' | 'HDFC Bank' | 'State Bank of India' | 'Airtel Payments Bank' | 'Paytm Payments Bank';

export interface FastagTransaction {
  id: string;
  date: string;
  amount: number;
  type: 'recharge' | 'toll' | 'parking';
  description: string;
  reference: string;
  status: 'success' | 'pending' | 'failed';
}

export interface FastagAccount {
  id: string;
  vehicleReg: string;
  vehicleClass: string;
  tagId: string;
  issuer: FastagIssuer;
  balance: number;
  status: 'active' | 'low_balance' | 'inactive';
  kycStatus: 'verified' | 'pending';
  expiryDate: string;
  autoRecharge: boolean;
  thresholdAmount: number;
  autoRechargeAmount: number;
  transactions: FastagTransaction[];
}

export type InsuranceCoverage = 'Comprehensive' | 'Zero Depreciation' | 'Third Party Only';

export interface InsurancePolicy {
  id: string;
  policyNumber: string;
  vehicleReg: string;
  vehicleName: string;
  insurer: string;
  coverageType: InsuranceCoverage;
  startDate: string;
  expiryDate: string;
  premiumAmount: number;
  idvAmount: number;
  status: 'active' | 'expiring_soon' | 'expired';
  daysUntilExpiry: number;
  features: string[];
  ncbDiscountPercentage: number;
}

export type ClaimStatus = 'Submitted' | 'Under Review' | 'Inspection Scheduled' | 'Approved' | 'Settled' | 'Rejected';

export interface InsuranceClaim {
  id: string;
  claimReference: string;
  policyId: string;
  policyNumber: string;
  vehicleReg: string;
  incidentDate: string;
  incidentType: 'Accident' | 'Theft' | 'Glass/Dent Damage' | 'Natural Calamity' | 'Vandalism';
  description: string;
  estimatedDamage: number;
  documentNames: string[];
  status: ClaimStatus;
  approvedAmount?: number;
  submittedAt: string;
  timeline: { step: string; timestamp: string; done: boolean }[];
}

export type ConnectorType = 'CCS2' | 'Type 2' | 'CHAdeMO' | 'GB/T' | 'Wall Socket 15A';
export type ChargerSpeedType = 'Slow (3.3-7 kW)' | 'Fast (11-22 kW)' | 'Rapid (50-60 kW)' | 'Ultra-Fast (120-150 kW)';

export interface EvChargerStation {
  id: string;
  name: string;
  locationName: string;
  stationName: string;
  city: string;
  address: string;
  lat: number;
  lng: number;
  powerKw: number;
  speedType: ChargerSpeedType;
  connectorTypes: ConnectorType[];
  pricePerKwh: number;
  status: 'available' | 'busy' | 'offline';
  totalPorts: number;
  availablePorts: number;
  rating: number;
  reviewCount: number;
  amenities: string[];
  open247: boolean;
}

export interface EvChargingSession {
  id: string;
  stationId: string;
  stationName: string;
  vehicleReg: string;
  startTime: string;
  durationMinutes: number;
  energyKwh: number;
  cost: number;
  status: 'completed' | 'in_progress' | 'cancelled';
  connectorUsed: ConnectorType;
}

export type ServiceCategory = 'wash' | 'cleaning' | 'servicing' | 'tyre_battery' | 'puncture' | 'breakdown' | 'inspection' | 'ev_support';

export interface VehicleServiceItem {
  id: string;
  title: string;
  category: ServiceCategory;
  shortDesc: string;
  detailedDesc: string;
  price: number;
  durationMinutes: number;
  rating: number;
  reviewCount: number;
  provider: string;
  includes: string[];
  stationAffiliated: string;
  badge?: string;
}

export interface ServiceRequest {
  id: string;
  bookingRef: string;
  serviceId: string;
  serviceTitle: string;
  category: ServiceCategory;
  vehicleReg: string;
  vehicleName: string;
  appointmentDate: string;
  appointmentTime: string;
  status: 'Requested' | 'Assigned' | 'In Progress' | 'Completed';
  totalAmount: number;
  notes?: string;
  createdAt: string;
  technicianName?: string;
  technicianPhone?: string;
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  type: 'booking' | 'fastag' | 'insurance' | 'service' | 'system';
  read: boolean;
  timestamp: string;
  link?: string;
}

export interface AssistantFAQ {
  id: string;
  category: 'Parking' | 'FASTag' | 'Insurance' | 'EV Charging' | 'Services' | 'General';
  question: string;
  answer: string;
  relatedLink?: string;
}
