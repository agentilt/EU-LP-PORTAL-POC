# EuroVC Portal — Delivery Plan

## Scope
Turn the PoC into a working, demoable product with correct SSR behavior, resilient UI, and clear next steps to production.

## Blocking fixes (Today)
- Fix Next 15 async dynamic APIs
  - Make `absoluteUrl` async and await `headers()`.
  - Await `absoluteUrl(...)` in server pages.
  - Await `params` in dynamic routes and API routes.
  - Acceptance: logs are clean; all routes respond.

- Loading/Error states
  - Add skeletons and error banners for dashboard, fund detail, KYC, demo pages.
  - Acceptance: no blank screens on latency/404.

## UX/i18n (1–2 days)
- i18n
  - Move strings to `src/lib/i18n.ts`, provide context/provider.
  - Localize dates/numbers/currency, persist locale.
- Accessibility
  - Keyboard navigation, focus rings, aria labels, color contrast.
- Acceptance: Axe/Lighthouse clean; strings/locales consistent.

## State hardening (0.5 day)
- Persist overlay state (acknowledge, scenario, uploads) to localStorage; hydrate on load.
- Acceptance: state survives reload.

## Testing & CI (1–2 days)
- Unit: `src/lib/format.ts` and i18n helpers.
- Component: `FundCard`, `FundDetail` happy path.
- E2E: landing → dashboard → fund → download → kyc → demo toggles.
- Setup: Vitest + RTL + Playwright; GitHub Actions workflow.
- Acceptance: CI green for unit + E2E.

## Observability & errors (0.5 day)
- App error boundary `src/app/error.tsx`.
- API routes: structured error logs.
- Optional Sentry.
- Acceptance: friendly error UI; traceable API errors.

## Performance polish (0.5–1 day)
- Limit Client Components to where required.
- Optimize charts; reduce CLS; refine animations.
- Acceptance: Good Lighthouse; snappy nav.

## Documentation (0.5 day)
- Expand `README.md` setup/troubleshooting.
- Enrich `DEMO.md` with screenshots.
- Acceptance: New dev can run demo in <5 minutes.

## Optional Deployment (0.5 day)
- Vercel project or Docker dev image.
- `NEXT_PUBLIC_BASE_URL` config for absolute fetch in non-proxy envs.
- Acceptance: Hosted demo available.

---

## Resourcing
- 1 experienced Next.js engineer can complete the above in ~3–5 days.
- Add QA/design for a11y and visual polish if available.

## Risks & mitigations
- Next 15 API semantics: addressed by awaiting `headers`/`params`.
- Chart bundle bloat: keep Recharts minimal; prefer lazy load if needed.
- i18n sprawl: centralize keys; add type-safe dictionary.

## Out-of-scope (for PoC→MVP)
- Real auth, payments, vendor KYC integrations, OCR/LLM pipelines, RBAC, SOC2.

## Acceptance checklist
- [ ] No console/server errors for headers/params.
- [ ] Pages resilient under latency and 404.
- [ ] Locale toggles update UI and formats.
- [ ] Keyboard-only usable; Axe clean.
- [ ] Unit + E2E passing in CI.
- [ ] Demo script runnable end-to-end.