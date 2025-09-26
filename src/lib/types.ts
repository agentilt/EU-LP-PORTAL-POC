export type Fund = {
  id: string;
  name: string;
  domicile: string;
  vintage: number;
  manager: string;
  commitment: number;
  paid_in: number;
  nav: number;
  irr: number;
  tvpi: number;
  dpi?: number;
  nav_history: { date: string; nav: number }[];
  documents: string[];
  last_report_date: string;
};

export type DocumentItem = {
  id: string;
  fund_id: string;
  type: "capital_call" | "quarterly_report";
  title: string;
  call_amount?: number;
  due_date?: string;
  wire_reference?: string;
  issuer: string;
  raw_url: string;
  created_at?: string;
};

export type KYC = {
  id: string;
  name: string;
  jurisdiction: string;
  entity_type: string;
  aml_status: "Verified" | "Needs Review";
  documents: string[];
  audit: { actor: string; action: string; at: string }[];
};

export type LocaleKey = "en" | "fr" | "de";

export type Scenario = "all" | "missing-doc" | "late-payment";

export type AppOverlayState = {
  acknowledgedDocuments: Record<string, boolean>;
  extraDocuments: DocumentItem[];
  reusedKycForFundId?: string;
  scenario: Scenario;
  locale: LocaleKey;
};


