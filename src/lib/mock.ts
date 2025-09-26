import { AppOverlayState, DocumentItem, Fund, KYC, LocaleKey, Scenario } from "@/lib/types";

// Simple in-memory overlay state for PoC runtime only
const overlay: AppOverlayState = {
  acknowledgedDocuments: {},
  extraDocuments: [],
  scenario: "all",
  locale: "en",
};

export function getOverlayState(): AppOverlayState {
  return overlay;
}

export function setScenario(s: Scenario) {
  overlay.scenario = s;
}

export function setLocale(l: LocaleKey) {
  overlay.locale = l;
}

export function toggleAcknowledged(docId: string, value?: boolean) {
  overlay.acknowledgedDocuments[docId] = value ?? !overlay.acknowledgedDocuments[docId];
}

export function addMockDocument(doc: DocumentItem) {
  overlay.extraDocuments.push(doc);
}

export function resetOverlay() {
  overlay.acknowledgedDocuments = {};
  overlay.extraDocuments = [];
  overlay.reusedKycForFundId = undefined;
  overlay.scenario = "all";
  overlay.locale = "en";
}

// File-backed loaders with artificial latency and error conditions
async function readJsonFile<T>(path: string): Promise<T> {
  const { readFile } = await import("node:fs/promises");
  const content = await readFile(path, "utf8");
  return JSON.parse(content) as T;
}

function sleep(ms: number) {
  return new Promise((res) => setTimeout(res, ms));
}

export async function loadFunds(): Promise<Fund[]> {
  const latency = 300 + Math.floor(Math.random() * 300);
  await sleep(latency);
  const base = process.cwd();
  const funds = await readJsonFile<Fund[]>(`${base}/src/data/sample-funds.json`);
  return funds;
}

export async function loadFundById(id: string): Promise<Fund | undefined> {
  const funds = await loadFunds();
  return funds.find((f) => f.id === id);
}

export async function loadDocuments(): Promise<DocumentItem[]> {
  const latency = 300 + Math.floor(Math.random() * 300);
  await sleep(latency);
  const base = process.cwd();
  const docs = await readJsonFile<DocumentItem[]>(`${base}/src/data/sample-documents.json`);
  // Include any uploaded docs in overlay
  return [...docs, ...overlay.extraDocuments];
}

export async function loadDocumentById(id: string): Promise<DocumentItem | undefined> {
  // Simulate missing-doc scenario
  if (overlay.scenario === "missing-doc") {
    return undefined;
  }
  const docs = await loadDocuments();
  return docs.find((d) => d.id === id);
}

export async function loadKyc(): Promise<KYC> {
  const latency = 300 + Math.floor(Math.random() * 300);
  await sleep(latency);
  const base = process.cwd();
  const kyc = await readJsonFile<KYC>(`${base}/src/data/sample-kyc.json`);
  return kyc;
}

export const i18nStrings: Record<LocaleKey, Record<string, string>> = {
  en: {
    appTitle: "EuroVC Portal — PoC",
    enterDemo: "Enter demo",
    totalCommitments: "Total Commitments",
    totalNav: "Total NAV",
    tvpi: "Portfolio TVPI",
    activeCalls: "Active Capital Calls",
    acknowledge: "Mark as acknowledged",
    downloadReport: "Download report",
    openOriginal: "Open original document",
  },
  fr: {
    appTitle: "EuroVC Portail — PoC",
    enterDemo: "Entrer la démo",
    totalCommitments: "Engagements totaux",
    totalNav: "Valeur nette d'inventaire",
    tvpi: "TVPI du portefeuille",
    activeCalls: "Appels de fonds actifs",
    acknowledge: "Marquer comme reconnu",
    downloadReport: "Télécharger le rapport",
    openOriginal: "Ouvrir le document original",
  },
  de: {
    appTitle: "EuroVC Portal — PoC",
    enterDemo: "Demo starten",
    totalCommitments: "Gesamte Zusagen",
    totalNav: "Gesamter NAV",
    tvpi: "Portfolio-TVPI",
    activeCalls: "Aktive Kapitalabrufe",
    acknowledge: "Als bestätigt markieren",
    downloadReport: "Bericht herunterladen",
    openOriginal: "Originaldokument öffnen",
  },
};


