# Eventiq Event OS — Enterprise Full-Stack Monorepo

<div align="center">

![Eventiq Platform](https://img.shields.io/badge/Platform-Eventiq%20Event%20OS-FF5722?style=for-the-badge)
![Next.js 15](https://img.shields.io/badge/Frontend-Next.js%2015%20(App%20Router)-black?style=for-the-badge&logo=next.js)
![NestJS 10](https://img.shields.io/badge/Backend-NestJS%2010%20(TypeScript)-E0234E?style=for-the-badge&logo=nestjs)
![Neon PostgreSQL](https://img.shields.io/badge/Database-Neon%20Serverless%20PostgreSQL-00E599?style=for-the-badge&logo=postgresql)
![Prisma](https://img.shields.io/badge/ORM-Prisma%205.22-2D3748?style=for-the-badge&logo=prisma)

An enterprise-grade, multi-role Event Management Operating System designed to power the complete lifecycle of events across platform administrators, independent organizers, production agencies, convention venues, turnstile gate staff, and attendees.

</div>

---

## 🌐 Live Deployments & Endpoints

| Environment | Service | Live URL | Hosting Provider | Notes |
| :--- | :--- | :--- | :--- | :--- |
| **Production** | **Frontend Web App** | [https://eventiq-ochre.vercel.app](https://eventiq-ochre.vercel.app) | **Vercel** | Universal multi-role portal & PWA scanner |
| **Production** | **Backend REST API** | [https://eventiq-m71e.onrender.com/api](https://eventiq-m71e.onrender.com/api) | **Render** | Global prefix: `/api` |
| **Production** | **Interactive API Docs** | [https://eventiq-m71e.onrender.com/api/docs](https://eventiq-m71e.onrender.com/api/docs) | **Render** | Swagger OpenAPI 3.0 specification |
| **Production** | **Cloud Database** | `ep-autumn-star-bdxa09a7-pooler.c-8.us-east-2.aws.neon.tech` | **Neon** | Serverless PostgreSQL with PgBouncer |

---

## 👥 Seeded User Accounts (All 6 Roles)

All accounts are pre-seeded in the production Neon database with the shared password: **`Password123!`**

| Role | Email | Password | Full Name | Target Portal / Route | Capabilities & Pre-loaded Data |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Platform Super Admin** (`ADMIN`) | `admin@eventiq.com` | `Password123!` | Eventiq Platform Admin | [/admin](https://eventiq-ochre.vercel.app/admin) | Platform telemetry, KYC approvals, organizer mix, revenue GMV, membership plan management, system settings. |
| **Individual Organizer** (`INDIVIDUAL`) | `individual@eventiq.com` | `Password123!` | Sarah Jenkins | [/organizer/individual](https://eventiq-ochre.vercel.app/organizer/individual) | Event wizard, ticketing tiers, guest roster, table seating, broadcast dispatch. Pre-loaded with *Tech Innovators Summit 2026*. |
| **Agency Organizer** (`AGENCY`) | `agency@eventiq.com` | `Password123!` | Marcus Sterling | [/organizer/agency](https://eventiq-ochre.vercel.app/organizer/agency) | Corporate retainers, B2B invoicing, cross-client calendar, team permissions. Pre-loaded with *Apex Event Partners* & client *Global Fintech Alliance*. |
| **Venue Manager** (`VENUE`) | `venue@eventiq.com` | `Password123!` | Elena Vance | [/organizer/venue](https://eventiq-ochre.vercel.app/organizer/venue) | Hall availability calendar, space lease catalog, banquet table floorplan designer. Pre-loaded with *The Imperial Ballroom* & *Skyline Rooftop Terrace*. |
| **Gate Staff Scanner** (`GATE`) | `gate@eventiq.com` | `Password123!` | David Kalu | [/gate-staff](https://eventiq-ochre.vercel.app/gate-staff) | High-speed QR scanner (`jsqr`), sub-second validation, offline cache (`sw-gate.js`), turnstile code `GATE-A1`. Dedicated login: [/gate-staff/login](https://eventiq-ochre.vercel.app/gate-staff/login). |
| **Guest / Attendee** (`GUEST`) | `guest@eventiq.com` | `Password123!` | Amara Okafor | [/guest](https://eventiq-ochre.vercel.app/guest) | Public catalog browsing, multi-tier checkout, digital pass wallet with cryptographic QR code, speech-to-text RSVP. |

---

## 🏛️ High-Level System Architecture

The following diagram illustrates the multi-tier topology connecting clients, edge delivery, application services, database clustering, and external cloud integrations:

```mermaid
flowchart TD
    subgraph Clients["Client Access Layer"]
        B["Desktop Web Browser"]
        M["Mobile Responsive PWA"]
        G["Turnstile Gate Scanner (Camera / jsqr)"]
    end

    subgraph Edge["Edge & CDN Layer (Vercel)"]
        V["Vercel Global Edge Network"]
        SSR["Next.js 15 Server-Side Renderer"]
        API_PROXY["Next.js Route Handlers (/app/api/*)"]
    end

    subgraph FrontendApp["Frontend Application Layer"]
        RTK["Redux Toolkit & RTK Query (baseAPI)"]
        AUTH_CTX["Universal Auth & Role Router"]
        SW["Offline Service Worker (sw-gate.js)"]
    end

    subgraph BackendAPI["Backend Service Layer (Render / NestJS)"]
        EXPRESS["Express Gateway (Prefix: /api)"]
        GUARDS["Guards (JwtAuthGuard, RolesGuard)"]
        INTERCEPT["Transform & HttpException Interceptors"]
        
        subgraph DomainModules["Domain Modules"]
            MOD_AUTH["AuthModule (JWT & RBAC)"]
            MOD_ADMIN["AdminModule (Analytics & Governance)"]
            MOD_EVENTS["EventsModule (Wizard & Catalog)"]
            MOD_TICKETS["TicketsModule (Tiers & Capacity)"]
            MOD_GATE["GateModule (Verification & Logging)"]
            MOD_AGENCY["AgencyModule (Clients & Invoicing)"]
            MOD_VENUE["VenueModule (Spaces & Floorplans)"]
            MOD_COMMS["CommunicationsModule (Omnichannel Dispatch)"]
            MOD_PAY["PaymentsModule (Gateway Routing)"]
        end
    end

    subgraph DataLayer["Persistence & Database Layer"]
        PRISMA["Prisma ORM 5.22 (Connection Pooler)"]
        NEON[("Neon Serverless PostgreSQL (AWS us-east-2)")]
    end

    subgraph CloudServices["External Cloud Integrations"]
        FLW["Flutterwave (Card / Mobile Money)"]
        RESEND["Resend (Transactional Email)"]
        WHATSAPP["Meta WhatsApp Cloud API"]
        TWILIO["Twilio (SMS Gateway)"]
        CLOUDINARY["Cloudinary (Media & Image CDN)"]
        GEMINI["Google Gemini API (Voice RSVP)"]
    end

    %% Client Interactions
    B --> V
    M --> V
    G --> V
    V --> SSR
    V --> API_PROXY
    SSR --> RTK
    RTK --> AUTH_CTX
    G -.-> SW

    %% Frontend to Backend
    RTK -- "HTTPS / JSON (Bearer Token)" --> EXPRESS
    API_PROXY -- "Proxy Requests" --> EXPRESS

    %% Backend Flow
    EXPRESS --> GUARDS
    GUARDS --> INTERCEPT
    INTERCEPT --> DomainModules

    %% Database Flow
    DomainModules --> PRISMA
    PRISMA -- "Pooled TCP (pgbouncer)" --> NEON

    %% External Connections
    MOD_PAY <--> FLW
    MOD_COMMS <--> RESEND
    MOD_COMMS <--> WHATSAPP
    MOD_COMMS <--> TWILIO
    MOD_ADMIN <--> CLOUDINARY
    DomainModules <--> GEMINI
```

---

## 💻 Frontend Architecture (`/frontend`)

The frontend application is built on **Next.js 15** utilizing the **React 19** runtime and the **App Router**, styled with **Tailwind CSS** and **Radix UI** component primitives.

### 1. Architectural Highlights
* **Universal Multi-Role Sign-In**: A single entry point at `/` that automatically reads the authenticated user's `UserRole` and seamlessly redirects them to their designated dashboard.
* **Centralized Data & State Engine**: Driven by **Redux Toolkit** and **RTK Query** ([frontend/store/BaseApi/baseAPI.ts](file:///d:/ramjan/event-os-fullstack/frontend/store/BaseApi/baseAPI.ts)):
  * Injects `Authorization: Bearer <token>` automatically on every outbound HTTP call.
  * Intercepts `401 Unauthorized` responses to clear expired credentials and redirect to login.
  * Displays standardized notifications via `react-toastify`.
* **Turnstile Offline Resilience**: A custom PWA Service Worker (`sw-gate.js`) stores the attendee manifest in client-side IndexedDB/localStorage, enabling ticket gate scanners to validate tickets even when internet connection drops, synchronizing scan logs upon reconnect.
* **Interactive Floorplan Designer**: Visual banquet table layout manager supporting Round, Rectangular, and Square table arrangements with seat assignment logic.
* **Internationalization**: Configured with `next-intl` for localized event interfaces.

### 2. Frontend Directory Structure

```
frontend/
├── app/                              # Next.js App Router root
│   ├── page.tsx                      # Root route: UniversalSignIn component
│   ├── (auth)/                       # Sign-up, forgot password, reset flows
│   ├── admin/                        # Super Admin dashboard, KPI cards, payouts, settings
│   ├── organizer/                    # Event Organizer workspaces
│   │   ├── individual/               # 4-step wizard, ticket tiers, guest rosters
│   │   ├── agency/                   # B2B clients, invoice generator, team roles
│   │   └── venue/                    # Space calendar, bookings, table seating designer
│   ├── gate-staff/                   # Camera QR scanner interface, offline sync banner
│   ├── guest/                        # Public catalog, event details, pass checkout
│   └── api/                          # Serverless Next.js route handlers
├── components/                       # Shared & role-scoped UI components
│   ├── auth/                         # UniversalSignIn, AuthShowcase, Onboarding
│   ├── common/                       # Buttons, modals, data tables, badges
│   ├── shared/                       # Navigation headers, sidebar drawers
│   └── ui/                           # Radix UI primitives (dialog, dropdown, tabs)
├── store/                            # Redux State Management
│   ├── store.ts                      # Central store configuration
│   ├── Auth/                         # AuthSlice & AuthApi mutations
│   └── BaseApi/                      # baseAPI.ts RTK Query client with live fallbacks
├── lib/                              # Utility libraries & direct fetch API clients
│   ├── api/                          # Role-scoped REST clients (admin, agency, venue, etc.)
│   ├── liveChat.ts                   # Socket.io client for real-time guest/organizer chat
│   └── validations/                  # Zod schemas for forms and registration
├── public/
│   ├── sw-gate.js                    # PWA Service Worker for offline gate operations
│   └── images/                       # Branding logos and placeholders
└── next.config.ts                    # Next.js configuration with next-intl plugin
```

---

## ⚙️ Backend Architecture (`/backend`)

The backend is built as an enterprise **NestJS 10** modular monolith with strict TypeScript typing, Dependency Injection, and **Prisma ORM 5.22**.

### 1. Architectural Patterns
* **Modular Monolith**: 15 self-contained domain modules, each encapsulating its own Controllers, Services, DTOs, and event publishers.
* **Global Prefix & Response Uniformity**:
  * Global prefix: `/api`
  * Global interceptor (`TransformInterceptor`) standardizes all HTTP responses into `{ statusCode, success, message, data }`.
  * Global exception filter (`HttpExceptionFilter`) intercepts all `HttpException` and Prisma errors for clean, uniform error reporting.
* **Authentication & RBAC**:
  * JWT access tokens (50m expiry) and refresh tokens (7d expiry) managed via `@nestjs/passport` and `PassportStrategy`.
  * Passwords hashed using `bcryptjs` with salt round 10.
  * Role enforcement with `@UseGuards(JwtAuthGuard, RolesGuard)` and `@Roles(...)`.
* **Prisma ORM & Connection Pooling**:
  * Connected to Neon Serverless PostgreSQL with PgBouncer connection pooling (`pgbouncer=true`).
  * Automatic admin bootstrapping in `PrismaService.ensureDefaultAdmin()` on application startup.
  * Dedicated database seed script (`prisma/seed.ts` via `npm run seed`) creating test environments across all 6 roles.

### 2. Backend Directory Structure

```
backend/
├── prisma/
│   ├── schema.prisma                 # 25+ models, 18 enums, full relational schema
│   └── seed.ts                       # Multi-role database seeder (all 6 accounts + plans)
├── src/
│   ├── main.ts                       # Application bootstrap, CORS, Swagger setup
│   ├── app.module.ts                 # Root module wiring domain modules and ConfigModule
│   ├── common/                       # Reusable cross-cutting infrastructure
│   │   ├── decorators/               # @CurrentUser(), @Roles(), @ResponseMessage()
│   │   ├── filters/                  # HttpExceptionFilter
│   │   ├── guards/                   # JwtAuthGuard, RolesGuard
│   │   ├── interceptors/             # TransformInterceptor (JSON envelope)
│   │   └── dto/                      # Shared pagination, filter, and user DTOs
│   ├── prisma/
│   │   └── prisma.service.ts         # PrismaClient lifecycle, connection retries & admin seeding
│   ├── swagger/
│   │   └── swagger.config.ts         # Tag grouping, API definitions, role matrix docs
│   └── modules/                      # Domain Modules
│       ├── auth/                     # Login, registration (Individual/Agency/Venue), password reset
│       ├── admin/                    # Platform metrics, revenue GMV, KYC approvals, plans
│       ├── events/                   # Event lifecycle (Draft, Published, Live, Completed)
│       ├── tickets/                  # Tier management (Free, VIP, Early Bird), digital passes
│       ├── gate/                     # QR verification, turnstile logs, duplicate check-in flags
│       ├── agency/                   # Agency profile, clients, invoices, team permissions
│       ├── venue/                    # Spaces, booking calendar, banquet table floorplan zones
│       ├── individual/               # Individual organizer dashboard & event wizard
│       ├── guest/                    # Public event catalog, digital pass wallet, guest profile
│       ├── communications/           # Omnichannel campaigns (WhatsApp Cloud API, Twilio SMS, Email)
│       ├── payments/                 # Flutterwave checkout, webhooks, verification
│       ├── uploads/                  # Cloudinary image upload and media optimization
│       └── voice-rsvp/               # Multilingual Voice RSVP with Google Cloud / Gemini
└── package.json
```

---

## 🔐 Environment Variables Reference

### Backend Configuration (`backend/.env`)

```env
# Application Port & Environment
PORT=5000
NODE_ENV=production

# Database Connection (Neon Serverless PostgreSQL)
DATABASE_URL="postgresql://neondb_owner:npg_c0oTJBlF3Rnh@ep-autumn-star-bdxa09a7-pooler.c-8.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require"

# JWT Authentication Secrets & Expiry
JWT_ACCESS_SECRET="eventiq-secret-access-key-2026"
JWT_REFRESH_SECRET="eventiq-secret-refresh-key-2026"
JWT_ACCESS_EXPIRES_IN="50m"
JWT_REFRESH_EXPIRES_IN="7d"

# Default Platform Super Admin (Auto-seeded on start)
ADMIN_EMAIL="admin@eventiq.com"
ADMIN_PASSWORD="Password123!"
ADMIN_NAME="Eventiq Platform Admin"

# Application URLs
FRONTEND_URL="https://eventiq-ochre.vercel.app"
BACKEND_URL="https://eventiq-m71e.onrender.com"

# Transactional Email (Resend)
RESEND_API_KEY="re_..."
RESEND_FROM_EMAIL="Eventiq <onboarding@resend.dev>"
RESEND_TEST_INBOX="your-inbox@example.com"

# Payment Gateway (Flutterwave)
FLUTTERWAVE_PUBLIC_KEY="FLWPUBK_TEST-..."
FLUTTERWAVE_SECRET_KEY="FLWSECK_TEST-..."
FLUTTERWAVE_ENCRYPTION_KEY="..."
FLUTTERWAVE_SECRET_HASH="..."

# Meta WhatsApp Cloud API
WHATSAPP_PHONE_NUMBER_ID="..."
WHATSAPP_BUSINESS_ACCOUNT_ID="..."
WHATSAPP_ACCESS_TOKEN="..."
WHATSAPP_WEBHOOK_VERIFY_TOKEN="eventiq_whatsapp_webhook_secret_verify_token_2026"

# SMS Gateway (Twilio)
TWILIO_ACCOUNT_SID="..."
TWILIO_AUTH_TOKEN="..."
TWILIO_FROM_NUMBER="+1..."

# Media Uploads (Cloudinary)
CLOUDINARY_CLOUD_NAME="..."
CLOUDINARY_API_KEY="..."
CLOUDINARY_API_SECRET="..."

# Voice RSVP (Gemini API)
GEMINI_API_KEY="..."
```

### Frontend Configuration (`frontend/.env.local`)

```env
# Target Backend API URL (Points to Live Render Backend)
NEXT_PUBLIC_API_URL="https://eventiq-m71e.onrender.com/api"

# For Local Development against local NestJS backend:
# NEXT_PUBLIC_API_URL="http://localhost:5000/api"
```

---

## 🛠️ Local Development Setup

### 1. Prerequisites
* **Node.js**: `v20.x` or higher
* **npm**: `v10.x` or higher
* **Git**: Installed and configured

### 2. Clone and Setup Backend

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Push Prisma schema to your PostgreSQL database
npx prisma db push

# Generate Prisma Client
npx prisma generate

# Seed all 6 roles, membership plans, and sample workspaces
npm run seed

# Start NestJS development server
npm run dev
```

* Backend API: `http://localhost:5000/api`
* Interactive Swagger Docs: `http://localhost:5000/api/docs`

### 3. Setup Frontend

```bash
# Navigate to frontend directory
cd ../frontend

# Install dependencies
npm install

# Start Next.js development server
npm run dev
```

* Frontend Web App: `http://localhost:3000`

---

## 🚢 Deployment Guidelines

### Vercel (Frontend)
1. Import repository on [Vercel](https://vercel.com).
2. Set Root Directory to `frontend`.
3. Add Environment Variable:
   * **Key**: `NEXT_PUBLIC_API_URL`
   * **Value**: `https://eventiq-m71e.onrender.com/api`
4. Deploy.

### Render (Backend)
1. Connect repository on [Render](https://dashboard.render.com) as a **Web Service**.
2. Root Directory: `backend`.
3. Build Command: `npm install && npm run build`.
4. Start Command: `npm start`.
5. Set Environment Variables as defined in the **Backend Configuration** section above.

---

## 🛡️ Security & Integrity Notice

* **Legacy Script Removal**: All legacy malicious injection scripts (`backend/api.js`, `init`) and unsafe npm lifecycle hooks have been permanently removed and blocked in `.gitignore`.
* **CORS Governance**: Configured in `main.ts` with credential support and origin protection.
* **Sanitization**: ValidationPipe strips non-whitelisted properties and enforces strict payload validation across all endpoints.

---

<div align="center">
  <b>Eventiq Event OS</b> &bull; Built with Next.js, NestJS, Prisma & Neon
</div>
