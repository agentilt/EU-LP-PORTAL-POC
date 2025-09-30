# EuroVC Portal — User & Technical Guide

## Part 1. User Tutorial (How to use the demo)

- Launch
  - Install: `npm install`
  - Run: `npm run dev` and open `http://localhost:3000`

- Landing ("One login, all funds")
  - Click "Enter demo" to go to the Dashboard. No real authentication is used in this PoC.

- Dashboard
  - KPI cards: Total Commitments, Total NAV, Portfolio TVPI, Active Capital Calls.
  - Fund grid: Each card shows name, domicile, commitment/paid-in/NAV, IRR/TVPI/DPI, last report date, and a sparkline of NAV.
  - Click any fund card to open its details.

- Fund Detail
  - Header shows fund name, vintage, domicile, manager.
  - Left panel: the most recent document (capital call or quarterly report) with parsed fields.
    - Buttons:
      - "Open original document" opens a mock PDF in a new tab.
      - "Download report" downloads the same mock PDF.
      - "Mark as acknowledged" toggles the ack state (demo-only) and shows a toast.
    - Provenance string explains source is mock.
  - Right panel:
    - NAV mini-chart (Recharts).
    - KPIs (IRR/TVPI/DPI) and a "Recent capital calls" table with amount, due date, and payment status (Due/Late/Paid).

- KYC
  - Shows KYC profile (name, entity, jurisdiction, AML status) and contacts.
  - "Reuse profile for Fund" simulates KYC passporting in the demo and shows a toast.

- Demo Controls
  - Notifications: upcoming capital calls; clicking navigates to the relevant fund.
  - Scenario toggles in the top bar:
    - All docs present: all sample document IDs resolve.
    - Missing doc: randomly returns 404 for some documents (to simulate gaps).
    - Late payment: visualizes late status where available.
  - Locale toggle (EN/FR/DE): changes key strings and number/date formatting.
  - Reset mock data: resets demo overlay state.

- Accessibility & keyboard
  - All primary actions are keyboard accessible; focus rings are visible.
  - Tooltips/labels and contrast are tuned for demo clarity.

- Notes
  - The PoC is frontend-only. All data is local; there are no real external calls or authentication.

---

## Part 2. Technical Overview (How the PoC works)

- Stack
  - Next.js 15 (App Router) + TypeScript
  - Tailwind CSS v4 for styles
  - Icons: `lucide-react`; Charts: `recharts`; Animations: `framer-motion`
  - Toasts: `sonner`

- Project structure (selected)
  - `src/app/` — routes (App Router): `page.tsx`, `dashboard`, `funds/[id]`, `kyc`, `demo`
  - `src/components/` — UI: `Topbar`, `Sidebar`, `FundCard`, `FundDetail`, `ParsedDocument`, `KYCProfileCard`, `NotificationsList`, `MockDataUploader`
  - `src/lib/` — helpers: `types.ts`, `format.ts`, `mock.ts` (overlay + loaders), `server.ts` (absoluteUrl helper)
  - `src/data/` — local JSON: `sample-funds.json`, `sample-documents.json`, `sample-kyc.json`
  - `public/assets/` — static placeholders (not required since PDFs are generated dynamically)

- Mock data and API surface
  - No external calls. All data is read from JSON files in `src/data/*` via Next API routes under `/api/*`.
  - API routes simulate latency (300–600 ms) and, in "Missing doc" scenario, occasional 404s.
  - Endpoints:
    - `GET /api/funds` — all funds
    - `GET /api/funds/:id` — a single fund
    - `GET /api/documents/:id` — document detail
    - `GET /api/kyc/:id` — KYC profile
    - `GET/POST /api/state` — overlay state (scenario, locale, acknowledgements, uploaded mock docs, reused KYC)
    - `GET /api/assets/:name` — dynamic mock PDFs (generated with `pdf-lib`)

- Overlay state (demo-only)
  - Implemented in `src/lib/mock.ts` as in-memory state for: acknowledged documents, extra uploaded docs, `scenario`, `locale`, `reusedKycForFundId`.
  - `POST /api/state` updates overlay state; client UI calls `router.refresh()` to re-render Server Components after changes.

- Types
  - `src/lib/types.ts` defines core types: `Fund`, `DocumentItem` (includes `payment_status`), `KYC` (includes `contacts`), `Scenario`, etc.

- Rendering model
  - Server Components: pages fetch from local API using `absoluteUrl()` (awaits Next 15 `headers()`), ensuring correct SSR.
  - Client Components: interactive widgets (e.g., `FundCard` with Framer Motion, `Topbar`, `ParsedDocument`).
  - `Topbar` initializes locale/scenario from `/api/state` on mount and refreshes the router after changes.

- Documents (PDFs)
  - `/api/assets/[name]` returns a generated valid PDF using `pdf-lib` to ensure reliable browser rendering.

- Internationalization (lightweight)
  - String maps live in `mock.ts`; locale toggle switches text and formatting (via `Intl`).

- Known constraints (by design for the PoC)
  - No auth, no real backend, no external vendor integrations.
  - Overlay state is in-memory; it resets on server restart. (Could be persisted to localStorage for demo if desired.)

- Run & build
  - Dev: `npm run dev`
  - Build: `npm run build` and `npm start`

- Where real integrations would go (// TODO markers found in code)
  - Replace local JSON loaders with a backend API (e.g., BFF) + database
  - Real doc ingestion, OCR/LLM parsing, and KYC providers
  - AuthN/AuthZ, audit trail, and signed document URLs