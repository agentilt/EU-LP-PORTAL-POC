# EuroVC Portal — 90‑Day MVP Plan (with partner targets and templates)

## 0) Objectives and acceptance criteria
- Primary objective: Convert the PoC into an MVP proven with live data from 2–3 design partners (LPs) and at least 1 fund administrator.
- Success criteria by Day 90:
  - ≥3 LP orgs onboarded (20–50 funds combined), ≥1 administrator integration/pilot.
  - ≥90% auto-parse accuracy on supported document templates; remaining through reviewer queue <24h.
  - Capital calls visible in portal within 24h of receipt; KYC reuse accepted by ≥2 different funds/managers.
  - No P1 security incidents; basic audit and signed URL downloads in place.

## 1) Scope (what the MVP includes)
- Backend/API: Node (NestJS/Express) + Postgres (Prisma), object storage (S3/GCS), signed URLs.
- Ingestion v1: Email intake + SFTP; template-based parsers for top 10 doc types (capital call, quarterly report, statements).
- Reviewer console: human-in-the-loop UI with confidence scores and provenance; audit events appended.
- AuthN/AuthZ: SSO (OIDC), MFA, org+role scoping (LP/Viewer/Admin).
- KYC v1: Provider integration (e.g., ComplyAdvantage or Onfido) + consent; reuse flows; audit.
- Observability: logs/metrics/traces (OpenTelemetry), error capture; data retention policy.
- Compliance baseline: data encryption, AV scan, access logs, SOC 2 readiness roadmap.

## 2) Timeline (week-by-week)
- Weeks 1–2: Foundations
  - Stand up repo(s), infra (dev/stage), Postgres + Prisma, object storage bucket, CI/CD.
  - Auth baseline (OIDC, sessions), org/tenant model, users/roles.
  - Email intake webhook + S3 archive; skeleton reviewer console.
  - Outreach wave #1 (see §5) and LOI circulation (see §6). Target commitments from 2 LPs + 1 admin.
- Weeks 3–4: Ingestion v1 + parsing templates
  - Build 10 template parsers (capital call/QR statements from partner exemplars), confidence scoring.
  - Reconciliation jobs and NAV/TVPI/DPI computation server-side.
  - Reviewer console v1 with approve/fix; audit events.
  - Portal connects to live backend; switch PoC mocks → API.
- Weeks 5–8: KYC v1 + workflows
  - Integrate KYC provider; consent flows; store evidence; simple policy checks.
  - LP reuse to multiple funds/admins; audit trail UI.
  - Notifications (email + in-app), due‑date reminders, ICS export.
  - Admin uploader UI (drag&drop) as fallback to email/SFTP.
- Weeks 9–12: Hardening + pilot success
  - Observability SLOs; backfill automation; rate limits; signed downloads.
  - A11y/i18n pass; performance budget; Lighthouse checks.
  - Pilot runbook; weekly reporting to partners; close loop on gaps.

## 3) Workstream owners (suggested)
- Product/Partnerships: you (founder) — partners, success criteria, demos.
- Backend lead: ingestion, parsers, security, KYC integration, API.
- Frontend lead: portal UX, reviewer console, notifications, i18n/A11y.
- DevOps: CI/CD, IaC (Terraform), secrets, monitoring.

## 4) Technical deliverables checklist
- Data model: Fund, Document, CapitalCall, Report, KYCProfile, User, Org, AccessGrant, AuditEvent.
- Storage: originals + checksums in S3; AV scan; signed URL downloads.
- Ingestion: Email → S3; SFTP → S3; parser workers; provenance & confidence.
- Reviewer: queue, diff viewer, reprocess; append-only audit.
- Security: MFA, RBAC, signed URLs, encrypted secrets, least‑privilege IAM.
- Observability: structured logs, dashboard, alerts; weekly pilot KPIs.

## 5) Design partner targets (examples)
- Administrators (EU mid‑market; accessible innovation appetite)
  - Apex Group, IQ‑EQ, Ocorian, Aztec Group, Alter Domus
- Family offices / FoFs (multi‑manager LPs)
  - LGT Capital Partners, HQ Trust, Cambridge Associates (EU teams), Partners Group (LP ops), Flexstone Partners
- Private banks / wealth platforms (multi‑LP distribution)
  - Lombard Odier, Julius Baer, Pictet, BNP Paribas Wealth, UBS Global Wealth (EU desks)
- Mid‑market GPs with lean ops (more open to collaboration)
  - Nordic/Benelux/CEE growth and buyout managers with ≤€1B AUM

Tip: prioritize partners who already suffer portal sprawl and have internal champion(s) in Ops/IT.

## 6) Outreach templates
- Short cold email (LP)
  - Subject: Reducing portal sprawl for your LP team
  - Body (100–150 words):
    - 1) Problem we solve (one login, all funds; capital calls consolidated; KYC reuse).
    - 2) 4‑week pilot offer: we ingest your statements/calls from 3–5 managers; no vendor lock‑in.
    - 3) Ask: 30‑minute call next week to outline data access and success metrics.
- Short cold email (Administrator)
  - Subject: Co‑pilot: modern LP portal for your clients (free pilot)
  - Body: emphasize speed to modern UX for their clients; limited integration (email/SFTP) to start; co‑branding.
- LinkedIn connect note (≤300 chars)
  - “Working on an LP‑aggregated portal with KYC reuse for EU LPs. Would value 15 minutes to share what we’ve built and explore a small pilot with your ops team.”

## 7) Pilot LOI (lightweight) — content checklist
- Parties; non‑exclusive; 60–90 days; no fees during pilot; each party covers costs.
- Data scope: list of documents, cadence, sources (email/SFTP), retention & deletion policy.
- Security: storage, encryption, access controls, signed URLs; AV scan; audit log access.
- KPIs: timeliness (<24h), parsing accuracy (≥90% on supported templates), user feedback cadence.
- Termination and data deletion; press/name use (opt‑in only).

## 8) Risks and mitigations
- Data quality variability → template library + confidence thresholds + reviewer queue.
- Admin bandwidth → low‑friction intake (email/SFTP) + minimal IT lift; weekly pilot syncs.
- Trust/compliance → share SOC 2 roadmap; implement signed URLs, AV scan, basic audit from Day 1.

## 9) Pilot KPIs and weekly reporting
- % docs auto‑parsed at ≥90% confidence; average time-to-portal.
- Acknowledgement time for capital calls (baseline vs with portal).
- KYC reuse accepted across ≥2 funds/managers; cycle time.
- Weekly active LP users; doc opens/downloads; NPS of ops users.

## 10) Next steps (actionable)
- Send 10 outreach emails this week across 2 LP segments + 1 admin segment.
- Stand up MVP repos/infra; start with two sample template parsers from a signed partner.
- Prepare pilot runbook + weekly KPI dashboard for partners.

---

This plan can be adapted as partners confirm availability of sample documents and preferred intake. I can also convert this into tracked GitHub issues and a Gantt if you’d like.