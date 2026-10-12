# ParkEase — Smart Solutions for Stress-Free Parking 🚗⚡🚆

> **Portfolio-Grade Smart Mobility & Railway Concourse Parking Platform**  
> Designed to reduce urban congestion, tailpipe idling, and commuter parking anxiety around high-density transit hubs and railway stations across India.

[![Vite](https://img.shields.io/badge/Vite-6.x-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-19.x-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-emerald.svg)](LICENSE)

---

## 📌 Executive Summary

Railway stations in major Indian metropolitan hubs (such as Chennai Central, KSR Bengaluru, Hyderabad Deccan, New Delhi NDLS, Pune Junction, and Mumbai CSMT) experience intense peak-hour vehicle traffic. Commuters often circle concourses for 15–25 minutes searching for parking, causing severe bottleneck jams, fuel waste, and missed trains.

**ParkEase** is a comprehensive smart transit platform solving this friction by enabling commuters to pre-reserve guaranteed parking bays before departure, leverage automated RFID FASTag boom barriers, recharge electric vehicles, protect vehicles with Zero-Dep insurance, and access on-demand vehicle care while traveling by train.

> [!NOTE]  
> **Portfolio Demonstration Notice:** ParkEase is an interactive, frontend-only engineering demonstration. All slot availability, FASTag balances, EV sessions, and insurance transactions are realistically simulated in-browser with `localStorage` persistence. No live government, IRCTC, banking, or payment gateway APIs are accessed.

---

## 🎨 Dual Brand Identity & Dynamic Design Tokens

ParkEase includes two complete, fully designed brand themes selectable instantly via the header switch and persisted across sessions:

| Theme | Primary | Dark | Accent | Background | Surface | Text | Aesthetic Rationale |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Theme A: Teal** (Default) | `#0F766E` | `#134E4A` | `#14B8A6` | `#F5F8F7` | `#FFFFFF` | `#172B2A` | Modern, clean sustainability aesthetic evoking EV charging and green transit corridors. |
| **Theme B: Burgundy** | `#701F3D` | `#491326` | `#B85C78` | `#FAF5F6` | `#FFFFFF` | `#302126` | Regal heritage palette inspired by classic Indian railway architecture and executive express travel. |

Both themes maintain strict WCAG-conscious contrast, warm neutral surfaces, subtle borders, and smooth CSS transitions.

---

## 🚀 Key Functional Modules

### 1. 🅿️ Smart Parking Discovery (`/parking`)
- **Multi-City Railway Hubs:** Pre-seeded with realistic data for Dr. MGR Chennai Central, KSR Bengaluru City, Hyderabad Deccan Nampally, New Delhi Railway Station (NDLS), Pune Junction, and Mumbai CSMT.
- **Dynamic Filtering:** Filter by vehicle type (Car, SUV, EV, Bike), price threshold, covered multi-level decks, EV fast-chargers, 24/7 security patrol, and CCTV.
- **Sort & Search:** Sort by recommendation score, lowest hourly rate, distance from train concourse, or maximum free bays.
- **Dual View Modes:** Seamless toggle between interactive card grid and **Leaflet OpenStreetMap** with custom price badges and quick booking popups.
- **Live Grid Simulation:** Periodically simulates organic bay fluctuations (±1 slot) to emulate a live IoT sensor network.

### 2. 🎟️ Interactive Slot Grid & Digital Pass Booking (`/parking/:id` and `/booking/:id`)
- **Visual Multi-Level Bay Grid:** Select floors (Ground Floor, Level 1, Level 2) and pick specific numbered slots (e.g. `CCG-03`) categorized into Standard, EV Dedicated, Accessible, Premium Wide, and Two-Wheeler.
- **Slot States:** Real-time visual feedback for Available (Free), Selected (Locked), Reserved, and Occupied.
- **Dynamic Cost Calculator:** Automatically calculates duration from arrival/departure timestamps, applies slot multipliers, computes 18% statutory GST, and displays total payable in INR.
- **Digital Pass Modal:** Generates an instant booking reference code (`PE-2026-XXXXX`), QR code representation, bay directions, and simulated receipt download.

### 3. 💳 NETC FASTag Auto-Debit & Management (`/fastag`)
- **Virtual RFID Tag Card:** Displays linked vehicle plate, tag ID, issuer bank (ICICI, HDFC, SBI, Airtel, Paytm), and live wallet balance.
- **Low-Balance Smart Trigger:** Automatically prompts commuters when balance falls below the threshold (e.g. < ₹200).
- **Simulated Top-Up:** Instant 1-click recharges (₹200, ₹500, ₹1000, or custom amounts) with simulated UPI / NetBanking options.
- **Auto-Reload Rules:** Configurable threshold sliders and automatic recharge preferences.
- **NPCI Tag Renewal:** Interactive renewal form to validate chassis VIN and extend tag validity up to 2033.
- **Detailed Transaction Log:** Complete credit/debit records showing toll plazas, parking deductions, and wallet reloads.

### 4. 🛡️ Vehicle Insurance & Cashless Claims (`/insurance`)
- **Policy Overview:** Active policy inspection displaying IDV valuation, policy numbers, validity periods, and NCB discounts.
- **Plan Comparison Matrix:** Side-by-side tier comparison across *Basic Third-Party*, *Comprehensive Drive Guard*, and *Titanium Zero-Depreciation* with roadside assistance and engine protect add-ons.
- **Interactive Damage Claims Form:** File incident reports with classification (Dent, Accident, Flood, Theft), repair quotations in INR, and simulated photo attachments.
- **Claim Progress Tracker:** Live 5-stage progress timeline (*Submitted → Surveyor Assigned → Digital Inspection → Cashless Payout Approved*).

### 5. ⚡ EV Supercharger Network & Duration Calculator (`/ev-charging`)
- **Transit EV Hubs:** Discovery of 22kW to 150kW fast DC chargers located directly within station parking structures.
- **Connector Filtering:** Filter by CCS2, Type 2, CHAdeMO, and GB/T standards.
- **Mathematical Charge Calculator:** Calculates exact kWh required based on battery size (e.g. 40.5 kWh for Nexon EV), starting %, and target %; computes estimated charging duration in minutes and energy cost in ₹.
- **Simulated Charging Session:** 1-click session starter with live timer and past charging session history.

### 6. 🧰 Station Vehicle Care Services (`/services`)
- **Service Catalog:** Waterless eco foam wash & wax, deep cabin interior extraction & sanitization, puncture repair & nitrogen top-up, 12V battery jump-start, and pre-trip 40-point safety check.
- **Bay Servicing:** Schedule background-verified technicians to service your vehicle while you travel by train.
- **Appointment Tracker:** Real-time service milestones (*Requested → Assigned → In Progress → Completed*).

### 7. 🚘 Multi-Vehicle Garage (`/vehicles`)
- Register, edit, and delete vehicles with registration numbers (e.g., `TN 07 BQ 9124`), make/model, fuel type (EV, Petrol, Diesel, Hybrid), and category.
- Designate primary default vehicle automatically selected in booking workflows.

### 8. 📊 Passenger Analytics Dashboard (`/dashboard`)
- Personalized passenger profile with summary metrics.
- Active ticket cards with 1-click pass modal and cancellation capability.
- **Recharts Data Visualization:** Monthly transit parking expenditure in INR and total parked hours.
- Saved favorite railway stations for rapid booking.

### 9. 🤖 Built-In Demo Assistant Widget
- Persistent floating help drawer answering common questions about parking reservations, FASTag barriers, insurance claims, and EV calculations without external API dependencies.

---

## 🛠️ Technology Stack

| Layer | Technology |
| :--- | :--- |
| **Framework & Build** | React 19, Vite 6, TypeScript |
| **Styling & Design Tokens** | Tailwind CSS v4, Custom CSS Variables, Inter Font |
| **Routing** | React Router v7 (`HashRouter` for zero-configuration GitHub Pages hosting) |
| **Icons & Micro-Interactions** | Lucide React (`lucide-react`) |
| **Data Visualization** | Recharts (`recharts`) |
| **Maps & Geospatial** | Leaflet with OpenStreetMap tiles & graceful offline fallback |
| **Persistence** | Browser `localStorage` with unified seed and reset utilities |

---

## 📁 Project Architecture

```
parkease/
├── public/
│   └── favicon.svg
├── src/
│   ├── app/
│   │   ├── App.tsx             # Root provider setup
│   │   └── router.tsx          # HashRouter route configuration
│   ├── components/
│   │   ├── booking/            # Summary card, digital pass modal
│   │   ├── common/             # Logo, theme switcher, badges, modal, empty states, map, assistant
│   │   ├── dashboard/          # Metric stat cards, Recharts expense charts
│   │   ├── ev/                 # EV calculator and charging simulator
│   │   ├── fastag/             # FASTag recharge modal
│   │   ├── insurance/          # Claim progression tracker modal
│   │   ├── layout/             # Responsive navbar, mobile drawer, footer, disclaimer
│   │   └── parking/            # Parking card, filter drawer, slot matrix grid
│   ├── context/
│   │   ├── AppContext.tsx      # Unified state store & localStorage sync
│   │   ├── AuthContext.tsx     # Demo authentication & user profile
│   │   ├── ThemeContext.tsx    # Teal / Burgundy token switcher
│   │   └── ToastContext.tsx    # Global alert toast system
│   ├── data/
│   │   ├── initialState.ts     # Seed vehicles, bookings, notifications
│   │   ├── mockAssistant.ts    # FAQ questions and knowledge base
│   │   ├── mockChargers.ts     # Transit EV fast charging hubs
│   │   ├── mockFastag.ts       # FASTag accounts and toll records
│   │   ├── mockInsurance.ts    # Policy tiers, quotes, and claims
│   │   ├── mockParking.ts      # Indian railway stations and parking floors
│   │   └── mockServices.ts     # Vehicle care services
│   ├── pages/                  # Top-level routed pages
│   ├── types/                  # Strict TypeScript data models
│   ├── index.css               # Tailwind v4 import & CSS theme tokens
│   └── main.tsx                # Application bootstrap
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** v18 or higher (tested on Node v20 LTS)
- **npm** or **pnpm** / **yarn**

### 1. Installation
Clone the repository and install dependencies:
```bash
git clone https://github.com/valliyammai-pl/parkease.git
cd parkease
npm install --legacy-peer-deps
```

### 2. Development Server
Start the local Vite dev server:
```bash
npm run dev
```
Open your browser at `http://localhost:5173`.

### 3. Production Build
Verify TypeScript compilation and bundle the production assets:
```bash
npm run build
```
The optimized static bundle will be generated in `dist/`.

### 4. Local Production Preview
Preview the production build locally:
```bash
npm run preview
```

---

## 🌐 GitHub Pages Deployment

This project uses relative base paths (`base: './'`) and `HashRouter` from `react-router-dom`. It can be deployed to GitHub Pages without server-side rewrite rules:

1. Build the production assets:
   ```bash
   npm run build
   ```
2. Deploy the `dist` folder to your `gh-pages` branch or configure GitHub Actions:
   ```yaml
   name: Deploy to GitHub Pages
   on:
     push:
       branches: [ main ]
   jobs:
     deploy:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v4
         - uses: actions/setup-node@v4
           with:
             node-version: 20
         - run: npm install --legacy-peer-deps
         - run: npm run build
         - uses: peaceiris/actions-gh-pages@v3
           with:
             github_token: ${{ secrets.GITHUB_TOKEN }}
             publish_dir: ./dist
   ```

---

## 🔒 Security & Privacy Notice

- **No Sensitive Data:** ParkEase never collects passwords, real credit card credentials, bank accounts, or government IDs.
- **Client-Side Demo:** All user modifications and simulated transactions are stored exclusively in the browser's `localStorage` and can be wiped at any moment via **Settings → Reset Demo Data**.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE). Built for portfolio demonstration and smart mobility showcase.
