import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  ParkingLocation,
  ParkingBooking,
  Vehicle,
  FastagAccount,
  InsurancePolicy,
  InsuranceClaim,
  EvChargerStation,
  EvChargingSession,
  ServiceRequest,
  AppNotification,
} from '../types';
import { initialParkingLocations } from '../data/mockParking';
import { initialEvChargers } from '../data/mockChargers';
import { initialFastagAccounts } from '../data/mockFastag';
import { initialInsurancePolicies, initialInsuranceClaims } from '../data/mockInsurance';
import {
  initialVehicles,
  initialBookings,
  initialEvSessions,
  initialServiceRequests,
  initialNotifications,
} from '../data/initialState';
import { useToast } from './ToastContext';

interface AppContextType {
  parkingLocations: ParkingLocation[];
  savedParkingIds: string[];
  toggleSaveParking: (id: string) => void;
  isParkingSaved: (id: string) => boolean;
  bookings: ParkingBooking[];
  addBooking: (booking: Omit<ParkingBooking, 'id' | 'createdAt' | 'bookingReference' | 'qrCodeSeed'>) => ParkingBooking;
  cancelBooking: (id: string) => void;
  vehicles: Vehicle[];
  addVehicle: (vehicle: Omit<Vehicle, 'id'>) => Vehicle;
  updateVehicle: (id: string, data: Partial<Vehicle>) => void;
  deleteVehicle: (id: string) => void;
  setDefaultVehicle: (id: string) => void;
  fastagAccounts: FastagAccount[];
  rechargeFastag: (tagId: string, amount: number) => void;
  updateFastagAutoRecharge: (tagId: string, enabled: boolean, threshold: number, amount: number) => void;
  renewFastag: (tagId: string, newExpiryYear: number) => void;
  insurancePolicies: InsurancePolicy[];
  renewPolicy: (policyId: string, planTier: string, newPremium: number) => void;
  insuranceClaims: InsuranceClaim[];
  addClaim: (claim: Omit<InsuranceClaim, 'id' | 'claimReference' | 'submittedAt' | 'timeline'>) => InsuranceClaim;
  evChargers: EvChargerStation[];
  evSessions: EvChargingSession[];
  addEvSession: (session: Omit<EvChargingSession, 'id'>) => EvChargingSession;
  serviceRequests: ServiceRequest[];
  addServiceRequest: (request: Omit<ServiceRequest, 'id' | 'bookingRef' | 'createdAt' | 'status'>) => ServiceRequest;
  notifications: AppNotification[];
  unreadNotificationCount: number;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  clearAllNotifications: () => void;
  resetDemoData: () => void;
  liveSimulationActive: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEYS = {
  PARKING: 'parkease_parking_locations',
  SAVED_PARKING: 'parkease_saved_parking',
  BOOKINGS: 'parkease_bookings',
  VEHICLES: 'parkease_vehicles',
  FASTAG: 'parkease_fastag_accounts',
  POLICIES: 'parkease_insurance_policies',
  CLAIMS: 'parkease_insurance_claims',
  EV_SESSIONS: 'parkease_ev_sessions',
  SERVICES: 'parkease_service_requests',
  NOTIFICATIONS: 'parkease_notifications',
};

function getStorageOrDefault<T>(key: string, defaultValue: T): T {
  try {
    const item = localStorage.getItem(key);
    if (item) {
      return JSON.parse(item);
    }
  } catch {
    // fallback
  }
  return defaultValue;
}

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const toast = useToast();

  const [parkingLocations, setParkingLocations] = useState<ParkingLocation[]>(() =>
    getStorageOrDefault(STORAGE_KEYS.PARKING, initialParkingLocations)
  );

  const [savedParkingIds, setSavedParkingIds] = useState<string[]>(() =>
    getStorageOrDefault(STORAGE_KEYS.SAVED_PARKING, ['chennai-central-hub', 'ksr-bengaluru-techpark'])
  );

  const [bookings, setBookings] = useState<ParkingBooking[]>(() =>
    getStorageOrDefault(STORAGE_KEYS.BOOKINGS, initialBookings)
  );

  const [vehicles, setVehicles] = useState<Vehicle[]>(() =>
    getStorageOrDefault(STORAGE_KEYS.VEHICLES, initialVehicles)
  );

  const [fastagAccounts, setFastagAccounts] = useState<FastagAccount[]>(() =>
    getStorageOrDefault(STORAGE_KEYS.FASTAG, initialFastagAccounts)
  );

  const [insurancePolicies, setInsurancePolicies] = useState<InsurancePolicy[]>(() =>
    getStorageOrDefault(STORAGE_KEYS.POLICIES, initialInsurancePolicies)
  );

  const [insuranceClaims, setInsuranceClaims] = useState<InsuranceClaim[]>(() =>
    getStorageOrDefault(STORAGE_KEYS.CLAIMS, initialInsuranceClaims)
  );

  const [evChargers] = useState<EvChargerStation[]>(initialEvChargers);

  const [evSessions, setEvSessions] = useState<EvChargingSession[]>(() =>
    getStorageOrDefault(STORAGE_KEYS.EV_SESSIONS, initialEvSessions)
  );

  const [serviceRequests, setServiceRequests] = useState<ServiceRequest[]>(() =>
    getStorageOrDefault(STORAGE_KEYS.SERVICES, initialServiceRequests)
  );

  const [notifications, setNotifications] = useState<AppNotification[]>(() =>
    getStorageOrDefault(STORAGE_KEYS.NOTIFICATIONS, initialNotifications)
  );

  const [liveSimulationActive] = useState(true);

  // Sync state changes to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PARKING, JSON.stringify(parkingLocations));
  }, [parkingLocations]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SAVED_PARKING, JSON.stringify(savedParkingIds));
  }, [savedParkingIds]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.VEHICLES, JSON.stringify(vehicles));
  }, [vehicles]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.FASTAG, JSON.stringify(fastagAccounts));
  }, [fastagAccounts]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.POLICIES, JSON.stringify(insurancePolicies));
  }, [insurancePolicies]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CLAIMS, JSON.stringify(insuranceClaims));
  }, [insuranceClaims]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.EV_SESSIONS, JSON.stringify(evSessions));
  }, [evSessions]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(serviceRequests));
  }, [serviceRequests]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(notifications));
  }, [notifications]);

  // Periodic Demo Live Simulation: Simulates organic parking occupancy changes
  useEffect(() => {
    const interval = setInterval(() => {
      setParkingLocations((prevLocations) =>
        prevLocations.map((loc) => {
          // 40% chance of fluctuation on any location
          if (Math.random() > 0.4) {
            const delta = Math.random() > 0.5 ? 1 : -1;
            const newAvailable = Math.max(2, Math.min(loc.totalSlots - 2, loc.availableSlots + delta));
            return {
              ...loc,
              availableSlots: newAvailable,
            };
          }
          return loc;
        })
      );
    }, 18000); // every 18 seconds

    return () => clearInterval(interval);
  }, []);

  const toggleSaveParking = (id: string) => {
    setSavedParkingIds((prev) => {
      const exists = prev.includes(id);
      if (exists) {
        toast.info('Removed from Saved Places', 'Location unbookmarked.');
        return prev.filter((item) => item !== id);
      } else {
        toast.success('Saved to Favorites', 'Access this parking spot quickly from your dashboard.');
        return [...prev, id];
      }
    });
  };

  const isParkingSaved = (id: string) => savedParkingIds.includes(id);

  const addBooking = (
    bookingData: Omit<ParkingBooking, 'id' | 'createdAt' | 'bookingReference' | 'qrCodeSeed'>
  ): ParkingBooking => {
    const refCode = `PE-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`;
    const newBooking: ParkingBooking = {
      ...bookingData,
      id: `bk-${Date.now()}`,
      bookingReference: refCode,
      createdAt: new Date().toISOString(),
      qrCodeSeed: `PARKEASE:${refCode}:${bookingData.slotNumber}:${bookingData.vehicleReg}`,
    };

    setBookings((prev) => [newBooking, ...prev]);

    // Update available slots in the parking location & slot state
    setParkingLocations((prev) =>
      prev.map((loc) => {
        if (loc.id === bookingData.parkingId) {
          return {
            ...loc,
            availableSlots: Math.max(0, loc.availableSlots - 1),
            floors: loc.floors.map((floor) => ({
              ...floor,
              slots: floor.slots.map((slot) =>
                slot.number === bookingData.slotNumber ? { ...slot, status: 'reserved' as const } : slot
              ),
            })),
          };
        }
        return loc;
      })
    );

    // Create confirmation notification
    const newNotif: AppNotification = {
      id: `notif-${Date.now()}`,
      title: 'Parking Reservation Confirmed',
      message: `Slot ${newBooking.slotNumber} at ${newBooking.parkingName} is reserved for vehicle ${newBooking.vehicleReg}.`,
      type: 'booking',
      read: false,
      timestamp: 'Just now',
      link: '/dashboard',
    };
    setNotifications((prev) => [newNotif, ...prev]);

    toast.success('Reservation Confirmed! 🚗', `Slot ${newBooking.slotNumber} booked with Ref #${refCode}`);
    return newBooking;
  };

  const cancelBooking = (id: string) => {
    const booking = bookings.find((b) => b.id === id);
    if (!booking) return;

    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: 'cancelled' as const } : b))
    );

    // Release slot
    setParkingLocations((prev) =>
      prev.map((loc) => {
        if (loc.id === booking.parkingId) {
          return {
            ...loc,
            availableSlots: Math.min(loc.totalSlots, loc.availableSlots + 1),
            floors: loc.floors.map((floor) => ({
              ...floor,
              slots: floor.slots.map((slot) =>
                slot.number === booking.slotNumber ? { ...slot, status: 'available' as const } : slot
              ),
            })),
          };
        }
        return loc;
      })
    );

    toast.info('Booking Cancelled', `Reservation #${booking.bookingReference} has been cancelled.`);
  };

  const addVehicle = (vehicleData: Omit<Vehicle, 'id'>): Vehicle => {
    const newVehicle: Vehicle = {
      ...vehicleData,
      id: `veh-${Date.now()}`,
    };

    setVehicles((prev) => {
      if (newVehicle.isDefault) {
        return [...prev.map((v) => ({ ...v, isDefault: false })), newVehicle];
      }
      return [...prev, newVehicle];
    });

    toast.success('Vehicle Added Successfully', `${newVehicle.make} ${newVehicle.model} (${newVehicle.registrationNumber})`);
    return newVehicle;
  };

  const updateVehicle = (id: string, data: Partial<Vehicle>) => {
    setVehicles((prev) =>
      prev.map((v) => {
        if (v.id === id) {
          return { ...v, ...data };
        }
        if (data.isDefault) {
          return { ...v, isDefault: false };
        }
        return v;
      })
    );
    toast.success('Vehicle Updated', 'Vehicle details updated in your profile.');
  };

  const deleteVehicle = (id: string) => {
    const vehicle = vehicles.find((v) => v.id === id);
    setVehicles((prev) => prev.filter((v) => v.id !== id));
    toast.info('Vehicle Removed', `${vehicle?.registrationNumber || 'Vehicle'} deleted.`);
  };

  const setDefaultVehicle = (id: string) => {
    setVehicles((prev) =>
      prev.map((v) => ({ ...v, isDefault: v.id === id }))
    );
    toast.success('Default Vehicle Set', 'Updated primary vehicle for auto-booking.');
  };

  const rechargeFastag = (tagId: string, amount: number) => {
    setFastagAccounts((prev) =>
      prev.map((acc) => {
        if (acc.tagId === tagId || acc.id === tagId) {
          const newBal = acc.balance + amount;
          const newTx: FastagAccount['transactions'][0] = {
            id: `tx-${Date.now()}`,
            date: new Date().toLocaleString('en-IN', {
              day: '2-digit',
              month: 'short',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            }),
            amount,
            type: 'recharge',
            description: `Simulated FASTag Top-Up via Demo UPI (₹${amount})`,
            reference: `UPI-REC-${Math.floor(100000 + Math.random() * 900000)}`,
            status: 'success',
          };
          return {
            ...acc,
            balance: newBal,
            status: newBal > acc.thresholdAmount ? ('active' as const) : acc.status,
            transactions: [newTx, ...acc.transactions],
          };
        }
        return acc;
      })
    );
    toast.success(`FASTag Recharged: ₹${amount}`, 'Simulated wallet balance updated instantly.');
  };

  const updateFastagAutoRecharge = (tagId: string, enabled: boolean, threshold: number, amount: number) => {
    setFastagAccounts((prev) =>
      prev.map((acc) => {
        if (acc.tagId === tagId || acc.id === tagId) {
          return {
            ...acc,
            autoRecharge: enabled,
            thresholdAmount: threshold,
            autoRechargeAmount: amount,
          };
        }
        return acc;
      })
    );
    toast.success('FASTag Auto-Recharge Preferences Updated');
  };

  const renewFastag = (tagId: string, newExpiryYear: number) => {
    setFastagAccounts((prev) =>
      prev.map((acc) => {
        if (acc.tagId === tagId || acc.id === tagId) {
          return {
            ...acc,
            expiryDate: `${newExpiryYear}-12-31`,
            status: 'active' as const,
          };
        }
        return acc;
      })
    );
    toast.success('FASTag Validity Extended', `Tag extended until Dec ${newExpiryYear}.`);
  };

  const renewPolicy = (policyId: string, planTier: string, newPremium: number) => {
    const nextYear = new Date().getFullYear() + 1;
    setInsurancePolicies((prev) =>
      prev.map((pol) => {
        if (pol.id === policyId) {
          return {
            ...pol,
            coverageType: planTier as any,
            premiumAmount: newPremium,
            startDate: new Date().toISOString().split('T')[0],
            expiryDate: `${nextYear}-10-31`,
            status: 'active' as const,
            daysUntilExpiry: 365,
          };
        }
        return pol;
      })
    );
    toast.success('Insurance Policy Renewed', `Coverage updated to ${planTier}. New expiry: Oct ${nextYear}.`);
  };

  const addClaim = (
    claimData: Omit<InsuranceClaim, 'id' | 'claimReference' | 'submittedAt' | 'timeline'>
  ): InsuranceClaim => {
    const claimRef = `CLM-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`;
    const now = new Date();
    const newClaim: InsuranceClaim = {
      ...claimData,
      id: `clm-${Date.now()}`,
      claimReference: claimRef,
      submittedAt: now.toISOString(),
      timeline: [
        {
          step: 'Claim Submitted Online',
          timestamp: now.toLocaleString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
          done: true,
        },
        {
          step: 'Claim Reference Generated & Surveyor Appointed',
          timestamp: 'Under Review',
          done: false,
        },
        {
          step: 'Digital Inspection & Damage Assessment',
          timestamp: 'Pending Survey',
          done: false,
        },
        {
          step: 'Settlement Approval & Cashless Payout',
          timestamp: 'Pending Approval',
          done: false,
        },
      ],
    };

    setInsuranceClaims((prev) => [newClaim, ...prev]);

    const notif: AppNotification = {
      id: `notif-${Date.now()}`,
      title: 'Insurance Claim Submitted',
      message: `Claim ${claimRef} registered for ${claimData.vehicleReg}. Surveyor verification initiated.`,
      type: 'insurance',
      read: false,
      timestamp: 'Just now',
      link: '/insurance',
    };
    setNotifications((prev) => [notif, ...prev]);

    toast.success('Claim Registered Successfully', `Reference: ${claimRef}. Track status in Claims tab.`);
    return newClaim;
  };

  const addEvSession = (sessionData: Omit<EvChargingSession, 'id'>): EvChargingSession => {
    const newSession: EvChargingSession = {
      ...sessionData,
      id: `ev-${Date.now()}`,
    };
    setEvSessions((prev) => [newSession, ...prev]);
    toast.success('EV Session Logged', `${sessionData.energyKwh} kWh delivered at ${sessionData.stationName}`);
    return newSession;
  };

  const addServiceRequest = (
    requestData: Omit<ServiceRequest, 'id' | 'bookingRef' | 'createdAt' | 'status'>
  ): ServiceRequest => {
    const ref = `SRV-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`;
    const newReq: ServiceRequest = {
      ...requestData,
      id: `sr-${Date.now()}`,
      bookingRef: ref,
      createdAt: new Date().toISOString(),
      status: 'Requested',
      technicianName: 'ParkEase Station Care Tech',
      technicianPhone: '+91 98400 11223',
    };

    setServiceRequests((prev) => [newReq, ...prev]);

    const notif: AppNotification = {
      id: `notif-${Date.now()}`,
      title: 'Service Appointment Booked',
      message: `${requestData.serviceTitle} scheduled for ${requestData.appointmentDate} at ${requestData.appointmentTime}.`,
      type: 'service',
      read: false,
      timestamp: 'Just now',
      link: '/services',
    };
    setNotifications((prev) => [notif, ...prev]);

    toast.success('Service Request Confirmed', `${requestData.serviceTitle} scheduled.`);
    return newReq;
  };

  const markNotificationRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    toast.info('All Notifications Marked as Read');
  };

  const clearAllNotifications = () => {
    setNotifications([]);
    toast.info('Notifications Cleared');
  };

  const resetDemoData = () => {
    Object.values(STORAGE_KEYS).forEach((k) => localStorage.removeItem(k));
    setParkingLocations(initialParkingLocations);
    setSavedParkingIds(['chennai-central-hub', 'ksr-bengaluru-techpark']);
    setBookings(initialBookings);
    setVehicles(initialVehicles);
    setFastagAccounts(initialFastagAccounts);
    setInsurancePolicies(initialInsurancePolicies);
    setInsuranceClaims(initialInsuranceClaims);
    setEvSessions(initialEvSessions);
    setServiceRequests(initialServiceRequests);
    setNotifications(initialNotifications);
    toast.success('Demo Data Reset Successfully', 'All mock data restored to default portfolio state.');
  };

  const unreadNotificationCount = notifications.filter((n) => !n.read).length;

  return (
    <AppContext.Provider
      value={{
        parkingLocations,
        savedParkingIds,
        toggleSaveParking,
        isParkingSaved,
        bookings,
        addBooking,
        cancelBooking,
        vehicles,
        addVehicle,
        updateVehicle,
        deleteVehicle,
        setDefaultVehicle,
        fastagAccounts,
        rechargeFastag,
        updateFastagAutoRecharge,
        renewFastag,
        insurancePolicies,
        renewPolicy,
        insuranceClaims,
        addClaim,
        evChargers,
        evSessions,
        addEvSession,
        serviceRequests,
        addServiceRequest,
        notifications,
        unreadNotificationCount,
        markNotificationRead,
        markAllNotificationsRead,
        clearAllNotifications,
        resetDemoData,
        liveSimulationActive,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
