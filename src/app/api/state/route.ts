import { NextResponse } from "next/server";
import { addMockDocument, getOverlayState, resetOverlay, setLocale, setScenario, toggleAcknowledged } from "@/lib/mock";
import type { DocumentItem, LocaleKey, Scenario } from "@/lib/types";

export async function GET() {
  return NextResponse.json(getOverlayState());
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({} as any));
  const { scenario, locale, acknowledgeDocId, acknowledgeValue, reset, addDocument } = body || {};
  if (scenario) setScenario(scenario as Scenario);
  if (locale) setLocale(locale as LocaleKey);
  if (acknowledgeDocId) toggleAcknowledged(String(acknowledgeDocId), acknowledgeValue as boolean | undefined);
  if (addDocument) addMockDocument(addDocument as DocumentItem);
  if (reset) resetOverlay();
  return NextResponse.json(getOverlayState());
}

