import { AssistantFAQ } from '../types';

export const mockAssistantFaqs: AssistantFAQ[] = [
  {
    id: 'faq-1',
    category: 'Parking',
    question: 'How do I reserve a parking slot before reaching the railway station?',
    answer: 'Navigate to the "Find Parking" page, choose your city or railway station, select your planned arrival and departure time, and pick an available slot from the interactive grid. Confirm your booking to receive an instant QR pass.',
    relatedLink: '/parking',
  },
  {
    id: 'faq-2',
    category: 'Parking',
    question: 'Can I pay for parking using my vehicle\'s FASTag?',
    answer: 'Yes! ParkEase automated partner parking decks feature RFID FASTag boom barriers. When you enter, the scanner logs your tag and automatically debits your parking charge upon exit without physical tickets.',
    relatedLink: '/fastag',
  },
  {
    id: 'faq-3',
    category: 'FASTag',
    question: 'What happens if my FASTag balance falls below the threshold?',
    answer: 'ParkEase sends you a low-balance alert. You can instantly simulate a top-up (₹200, ₹500, ₹1000) or toggle auto-recharge in the FASTag Management section.',
    relatedLink: '/fastag',
  },
  {
    id: 'faq-4',
    category: 'Insurance',
    question: 'How do I submit a simulated insurance claim for parking damage?',
    answer: 'Go to Insurance > Claims tab, select your policy, enter the incident details (dent/scratch/glass), upload demo photos, and submit. You will receive an instant claim reference and can follow the live status tracker.',
    relatedLink: '/insurance',
  },
  {
    id: 'faq-5',
    category: 'EV Charging',
    question: 'How does the EV charging calculator estimate duration and cost?',
    answer: 'The calculator uses your EV battery capacity (kWh), current percentage, target percentage, and charger power rating (kW) to compute required kWh, charge time in minutes, and total cost at local rates (e.g. ₹18.5/kWh).',
    relatedLink: '/ev-charging',
  },
  {
    id: 'faq-6',
    category: 'Services',
    question: 'Can I get my car washed while I travel on a train?',
    answer: 'Yes! Under Vehicle Services, book an Eco Foam Wash or Deep Interior Detail. Certified technicians service your parked car in the parking bay before your return train arrives.',
    relatedLink: '/services',
  },
  {
    id: 'faq-7',
    category: 'General',
    question: 'Is this real government railway station data or a demo?',
    answer: 'This is a portfolio demonstration website created for showcasing frontend product architecture, interactive UX, and state persistence. All transactions and slot allocations are simulated locally.',
    relatedLink: '/',
  },
];
