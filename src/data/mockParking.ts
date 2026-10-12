import { ParkingLocation, ParkingFloor, ParkingSlot } from '../types';

function generateFloorSlots(floorName: string, prefix: string, count: number): ParkingSlot[] {
  const slots: ParkingSlot[] = [];
  for (let i = 1; i <= count; i++) {
    const num = `${prefix}-${String(i).padStart(2, '0')}`;
    let type: ParkingSlot['type'] = 'standard';
    let status: ParkingSlot['status'] = 'available';
    let multiplier = 1.0;

    if (i <= 4) {
      type = 'ev';
      multiplier = 1.25;
    } else if (i <= 6) {
      type = 'accessible';
      multiplier = 1.0;
    } else if (i <= 10) {
      type = 'premium';
      multiplier = 1.35;
    } else if (i >= count - 4) {
      type = 'bike';
      multiplier = 0.5;
    }

    // Realistic distribution: some occupied, some reserved, majority available
    if (i % 7 === 0) {
      status = 'occupied';
    } else if (i % 11 === 0) {
      status = 'reserved';
    }

    slots.push({
      id: `${floorName.toLowerCase().replace(/\s+/g, '-')}-${num}`,
      number: num,
      floor: floorName,
      type,
      status,
      pricePerHourMultiplier: multiplier,
    });
  }
  return slots;
}

function makeFloors(prefix: string): ParkingFloor[] {
  const gSlots = generateFloorSlots('Ground Floor (G)', `${prefix}G`, 24);
  const f1Slots = generateFloorSlots('Level 1 (L1)', `${prefix}1`, 24);
  const f2Slots = generateFloorSlots('Level 2 (L2)', `${prefix}2`, 20);

  return [
    {
      id: `${prefix.toLowerCase()}-g`,
      name: 'Ground Floor (G)',
      totalSlots: gSlots.length,
      availableSlots: gSlots.filter((s) => s.status === 'available').length,
      slots: gSlots,
    },
    {
      id: `${prefix.toLowerCase()}-1`,
      name: 'Level 1 (L1)',
      totalSlots: f1Slots.length,
      availableSlots: f1Slots.filter((s) => s.status === 'available').length,
      slots: f1Slots,
    },
    {
      id: `${prefix.toLowerCase()}-2`,
      name: 'Level 2 (L2)',
      totalSlots: f2Slots.length,
      availableSlots: f2Slots.filter((s) => s.status === 'available').length,
      slots: f2Slots,
    },
  ];
}

export const initialParkingLocations: ParkingLocation[] = [
  {
    id: 'chennai-central-hub',
    name: 'Chennai Central Smart Hub Parking',
    stationName: 'Dr. MGR Chennai Central (MAS)',
    city: 'Chennai',
    state: 'Tamil Nadu',
    address: 'Near Central Station Main Concourse, Wall Tax Rd & Poonamallee High Rd, Chennai 600003',
    distanceFromStationKm: 0.15,
    lat: 13.0827,
    lng: 80.2755,
    pricePerHour: 40,
    pricePerDay: 400,
    totalSlots: 68,
    availableSlots: 49,
    rating: 4.8,
    reviewCount: 382,
    imageUrl: 'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&w=800&q=80',
    covered: true,
    evCharging: true,
    cctvSecurity: true,
    valetParking: true,
    open247: true,
    disabledAccessible: true,
    supportedVehicles: ['car', 'suv', 'bike', 'ev'],
    floors: makeFloors('CC'),
    features: [
      'Automated Boom Barrier with FASTag Auto-Debit',
      'EV Superchargers (60 kW CCS2 & Type 2)',
      'Covered Multi-Level Parking with Elevators',
      '24/7 Security Patrol & 4K CCTV Monitoring',
      'Direct Skywalk to Railway Station Platform 1',
      'On-demand Eco Car Wash & Tyre Air Station',
    ],
  },
  {
    id: 'ksr-bengaluru-techpark',
    name: 'KSR Bengaluru TechTransit Park',
    stationName: 'Krantivira Sangolli Rayanna (SBC)',
    city: 'Bengaluru',
    state: 'Karnataka',
    address: 'Gubbi Thotadappa Rd, Sevashrama, Gandhi Nagar, Bengaluru 560023',
    distanceFromStationKm: 0.25,
    lat: 12.9784,
    lng: 77.5684,
    pricePerHour: 50,
    pricePerDay: 500,
    totalSlots: 68,
    availableSlots: 44,
    rating: 4.7,
    reviewCount: 412,
    imageUrl: 'https://images.unsplash.com/photo-1590674899484-d5640e854abe?auto=format&fit=crop&w=800&q=80',
    covered: true,
    evCharging: true,
    cctvSecurity: true,
    valetParking: false,
    open247: true,
    disabledAccessible: true,
    supportedVehicles: ['car', 'suv', 'bike', 'ev'],
    floors: makeFloors('BLR'),
    features: [
      'Smart Sensor-Guided Slot Indicator Lights',
      '4 Dedicated 50kW DC EV Fast Chargers',
      'Subterranean Cool Parking Protection',
      'ANPR Number Plate Recognition Entry',
      'Pedestrian Subway Access to Metro & Train Concourse',
      'Emergency Jump-Start & Tyre Assistance',
    ],
  },
  {
    id: 'hyderabad-deccan-express',
    name: 'Hyderabad Deccan Pearl Transit Parking',
    stationName: 'Hyderabad Deccan Nampally (HYB)',
    city: 'Hyderabad',
    state: 'Telangana',
    address: 'Station Rd, Public Garden Rd, Nampally, Hyderabad 500001',
    distanceFromStationKm: 0.2,
    lat: 17.3916,
    lng: 78.4673,
    pricePerHour: 35,
    pricePerDay: 350,
    totalSlots: 68,
    availableSlots: 52,
    rating: 4.6,
    reviewCount: 228,
    imageUrl: 'https://images.unsplash.com/photo-1573348722427-f1d6819fdf98?auto=format&fit=crop&w=800&q=80',
    covered: true,
    evCharging: true,
    cctvSecurity: true,
    valetParking: true,
    open247: true,
    disabledAccessible: true,
    supportedVehicles: ['car', 'suv', 'bike', 'ev'],
    floors: makeFloors('HYD'),
    features: [
      'FASTag Seamless Contactless Payment',
      'Solar Canopy Rooftop Protection',
      'EV Charging Bays with Universal Connectors',
      'Dedicated Two-Wheeler Priority Section',
      'Wheelchair Ramps & Tactile Pathways',
    ],
  },
  {
    id: 'new-delhi-capital-park',
    name: 'New Delhi Capital Express Multi-Level Parking',
    stationName: 'New Delhi Railway Station (NDLS)',
    city: 'New Delhi',
    state: 'Delhi NCR',
    address: 'Bhavbhuti Marg, Ajmeri Gate Side, Kamla Market, New Delhi 110006',
    distanceFromStationKm: 0.1,
    lat: 28.643,
    lng: 77.2195,
    pricePerHour: 60,
    pricePerDay: 600,
    totalSlots: 68,
    availableSlots: 36,
    rating: 4.9,
    reviewCount: 650,
    imageUrl: 'https://images.unsplash.com/photo-1621929747188-0b4dc28498d2?auto=format&fit=crop&w=800&q=80',
    covered: true,
    evCharging: true,
    cctvSecurity: true,
    valetParking: true,
    open247: true,
    disabledAccessible: true,
    supportedVehicles: ['car', 'suv', 'bike', 'ev'],
    floors: makeFloors('NDLS'),
    features: [
      'State-of-the-Art 5-Story Multi-Level Robotic System',
      'Direct Access to Airport Express Metro Line & Platform 16',
      '120kW Ultra-Fast DC EV Charging Hub',
      'Automated Anti-Theft Barriers & Biometric Checkpoint',
      'Luggage Trolley Availability at Parking Elevator',
    ],
  },
  {
    id: 'pune-junction-sahyadri',
    name: 'Pune Junction Transit Smart Yard',
    stationName: 'Pune Railway Junction (PUNE)',
    city: 'Pune',
    state: 'Maharashtra',
    address: 'Agarkar Nagar, Near Platform 6 Entrance, Pune 411001',
    distanceFromStationKm: 0.3,
    lat: 18.5284,
    lng: 73.8744,
    pricePerHour: 35,
    pricePerDay: 320,
    totalSlots: 68,
    availableSlots: 54,
    rating: 4.5,
    reviewCount: 195,
    imageUrl: 'https://images.unsplash.com/photo-1545179605-1296651e4d43?auto=format&fit=crop&w=800&q=80',
    covered: false,
    evCharging: true,
    cctvSecurity: true,
    valetParking: false,
    open247: true,
    disabledAccessible: true,
    supportedVehicles: ['car', 'suv', 'bike', 'ev'],
    floors: makeFloors('PUN'),
    features: [
      'Quick Pick-up & Drop-off 15-Minute Free Grace Period',
      'Secure Fenced Yard with Night Illumination',
      'FASTag In & Out lanes',
      'EV AC Type-2 Chargers',
      'Mobile Phone Assisted Slot Finding',
    ],
  },
  {
    id: 'mumbai-csmt-heritage',
    name: 'Mumbai CSMT Gateway Plaza Parking',
    stationName: 'Chhatrapati Shivaji Maharaj Terminus (CSMT)',
    city: 'Mumbai',
    state: 'Maharashtra',
    address: 'D.N. Road, Fort, Opposite GPO, Mumbai 400001',
    distanceFromStationKm: 0.2,
    lat: 18.9401,
    lng: 72.8354,
    pricePerHour: 65,
    pricePerDay: 650,
    totalSlots: 68,
    availableSlots: 29,
    rating: 4.7,
    reviewCount: 540,
    imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
    covered: true,
    evCharging: true,
    cctvSecurity: true,
    valetParking: true,
    open247: true,
    disabledAccessible: true,
    supportedVehicles: ['car', 'suv', 'bike', 'ev'],
    floors: makeFloors('CSMT'),
    features: [
      'Valet Concierge & Covered Premium Bays',
      'FASTag Integrated Automated Entry/Exit',
      '50kW Fast Charging Stations for Electric Vehicles',
      'Surveillance Command Center Monitored 24/7',
      'Express Exit to Eastern Freeway Corridor',
    ],
  },
];
