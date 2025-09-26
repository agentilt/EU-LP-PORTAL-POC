EuroVC Portal — PoC is a frontend-only Next.js app demonstrating a unified LP/VC portal UI with believable mock data.

### Getting started

1. Install dependencies
```bash
npm install
```
2. Run dev server
```bash
npm run dev
```
3. Open http://localhost:3000

### Tech
- Next.js (App Router) + TypeScript + Tailwind CSS v4
- Icons: lucide-react; Charts: recharts; Animations: framer-motion; Headless UI
- Mocking via Next API routes serving local JSON with latency

### Routes
- /            Landing
- /dashboard   Aggregated KPIs + Fund cards
- /funds/[id]  Fund detail with parsed document + chart
- /kyc         KYC profile with reuse action
- /demo        Notifications, scenario toggles, reset, mock upload

### Notes
- No real backend or external calls. All data from /src/data and /public/assets
- // TODO: markers indicate where real integrations would go later
