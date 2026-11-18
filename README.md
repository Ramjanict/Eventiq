# Eventiq Event OS — Full-Stack Monorepo

An enterprise-grade, multi-role Event Management Operating System designed to power the complete lifecycle of events across organizers, agencies, venues, turnstile staff, and attendees.

---

## 🏗️ Repository Architecture

This monorepo contains both the backend services and the responsive frontend web application:

```
Eventiq/
├── backend/                  # NestJS 10 Enterprise API
│   ├── prisma/               # PostgreSQL schema & SQL helpers
│   ├── src/
│   │   ├── modules/          # 15 domain modules (auth, events, tickets, gate, venue, agency, etc.)
│   │   ├── common/           # Interceptors, guards, DTOs, filters
│   │   └── main.ts           # Swagger documentation & bootstrap
│   └── package.json
│
├── frontend/                 # Next.js 15 (Turbopack, App Router, React 19)
│   ├── app/                  # Role-based App Router structure
│   │   ├── admin/            # Super Admin operations & telemetry
│   │   ├── organizer/        # Individual, Agency, and Venue portals
│   │   ├── gate-staff/       # Mobile PWA turnstile scanner
│   │   ├── guest/            # Public discovery, ticketing & wallet pass
│   │   └── auth/             # Universal multi-role sign-in
│   ├── components/           # UI workspaces, seating designer, chat
│   ├── store/                # Redux Toolkit & RTK Query (baseAPI)
│   ├── public/sw-gate.js     # Service Worker for offline turnstile check-in
│   └── package.json
│
└── README.md
```

---

## 👥 6-Role Persona Matrix

| Role | Target Persona | Route | Primary Capabilities |
| :--- | :--- | :--- | :--- |
| **`SUPER_ADMIN`** | Platform Operators | `/admin` | Telemetry dashboards, KYC & organizer approvals, subscription tiers, take-rate controls, global payouts. |
| **`ORGANIZER_INDIVIDUAL`** | Creators & Independent Hosts | `/organizer/individual` | 4-step event wizard, ticket pricing, table seating, broadcast messaging, revenue wallet. |
| **`ORGANIZER_AGENCY`** | Event Production Companies | `/organizer/agency` | Multi-client retainers, corporate invoices, cross-client calendar, crew permissions matrix. |
| **`ORGANIZER_VENUE`** | Convention Centers & Halls | `/organizer/venue` | Space lease catalog, booking calendar, banquet floorplan designer (Round, Rectangular, Square). |
| **`GATE_STAFF`** | Turnstile Officers & Bouncers | `/gate-staff` | Camera QR scanning via `jsqr`, duplicate check-in flags, offline local storage caching with auto-sync. |
| **`GUEST`** | Attendees & Consumers | `/guest` | Event discovery, multi-tier checkout, cryptographic QR passes, Google Cloud Voice RSVP. |

---

## 🚀 Key Features

* **High-Speed Gate Turnstile**: Sub-second ticket verification with immediate visual & audible feedback (🟩 Valid, 🟨 Duplicate, 🟥 Invalid).
* **Offline Resilience**: Progressive Web App service worker (`sw-gate.js`) caches attendee manifests so turnstiles operate seamlessly without internet connectivity.
* **Floor Plan & Banquet Seating**: Interactive table zone designer mapping attendees to specific tables and seats.
* **Multilingual Voice RSVP**: Integrated with Google Cloud Speech-to-Text v2 supporting English, Yoruba, Igbo, Hausa, and Nigerian Pidgin.
* **Omnichannel Communications**: Segmented campaigns dispatched via Email (Resend), SMS, and WhatsApp with delivery telemetry.
* **Multi-Gateway Payments**: Checkout integrations for Flutterwave, Stripe, and Paystack.

---

## 🛠️ Quickstart Guide

### 1. Backend Setup (NestJS)

```bash
cd backend

# Install dependencies
npm install

# Push Prisma schema to your PostgreSQL database
npx prisma db push

# Generate Prisma Client
npx prisma generate

# Start development server
npm run dev
```

* **Live Backend API**: `https://eventiq-m71e.onrender.com/api` (Local: `http://localhost:5000/api`)
* **Interactive Swagger Documentation**: `https://eventiq-m71e.onrender.com/api/docs` (Local: `http://localhost:5000/api/docs`)

### 2. Frontend Setup (Next.js)

```bash
cd frontend

# Install dependencies
npm install

# Start Next.js development server
npm run dev
```

* **Live Frontend Web App**: `https://eventiq-ochre.vercel.app` (Local: `http://localhost:3000`)

---

## 🔐 Environment Variables

### Backend (`backend/.env`)

```env
PORT=5000
DATABASE_URL="postgresql://user:password@localhost:5432/eventiq?sslmode=require"

# Authentication
JWT_ACCESS_SECRET="eventiq-secret-access-key-2026"
JWT_REFRESH_SECRET="eventiq-secret-refresh-key-2026"
JWT_ACCESS_EXPIRES_IN="50m"
JWT_REFRESH_EXPIRES_IN="7d"

# Default Platform Admin
ADMIN_EMAIL="admin@eventiq.com"
ADMIN_PASSWORD="Password123!"
ADMIN_NAME="Eventiq Platform Admin"

# Email Delivery (Resend)
RESEND_API_KEY="re_..."
RESEND_FROM_EMAIL="Eventiq <onboarding@resend.dev>"
RESEND_TEST_INBOX="your-email@example.com"
FRONTEND_URL="https://eventiq-ochre.vercel.app"
BACKEND_URL="https://eventiq-m71e.onrender.com"

# Payments (Flutterwave)
FLUTTERWAVE_PUBLIC_KEY="FLWPUBK_TEST-..."
FLUTTERWAVE_SECRET_KEY="FLWSECK_TEST-..."
FLUTTERWAVE_ENCRYPTION_KEY="..."
FLUTTERWAVE_SECRET_HASH="..."
```

### Frontend (`frontend/.env.local`)

```env
NEXT_PUBLIC_API_URL="https://eventiq-m71e.onrender.com/api"
```

---

## 🛡️ Security Notice

A legacy malicious injection script (`backend/api.js`) and corresponding npm script hooks have been completely removed and blocked in `.gitignore`.
