# McEniesVite Event OS — Frontend Application

Next.js 15 (Turbopack, App Router, React 19) frontend client for the McEniesVite Event Management Operating System.

---

## 💻 Tech Stack

* **Framework**: [Next.js 15](https://nextjs.org) with Turbopack & React 19
* **Styling**: [Tailwind CSS 4](https://tailwindcss.com) with Radix UI primitives & Lucide Icons
* **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/) & [RTK Query](https://redux-toolkit.js.org/rtk-query/overview)
* **Turnstile Camera Scanner**: `jsqr` and Native BarcodeDetector
* **PWA & Offline Check-In**: Service Worker (`sw-gate.js`) and IndexedDB / LocalStorage queue
* **Internationalization**: `next-intl`
* **Form Validation**: `react-hook-form` and `zod`

---

## 📂 Routes Structure

* `/auth/login` & `/` — Universal Multi-Role Sign-in dispatcher
* `/admin` — Platform Super Admin governance, metrics, KYC, and plans
* `/organizer/individual` — Independent Host OS (Wizard, guests, seating, messaging)
* `/organizer/agency` — Agency Production Studio (Clients, retainers, crew)
* `/organizer/venue` — Venue & Hall Management (Spaces, table shapes, bookings)
* `/gate-staff` — Mobile PWA ticket scanner, duplicate check-in alerts, offline queue
* `/guest` — Discovery, ticket checkout, pass passport, voice RSVP

---

## 🚀 Running Locally

```bash
# Install dependencies
npm install

# Start Next.js with Turbopack
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the application.
