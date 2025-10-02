import { NextResponse } from "next/server";
import { addMockDocument, getOverlayState, resetOverlay, setLocale, setScenario, toggleAcknowledged } from "@/lib/mock";
import type { DocumentItem, LocaleKey, Scenario } from "@/lib/types";

export async function GET() {
  return NextResponse.json(getOverlayState());
}

export async function POST(req: Request) {
  type StateBody = {
    scenario?: Scenario;
    locale?: LocaleKey;
    acknowledgeDocId?: string;
    acknowledgeValue?: boolean;
    reset?: boolean;
    addDocument?: DocumentItem;
    reuseForFundId?: string;
  };
  const raw = await req.json().catch(() => ({}));
  const body = raw as Partial<StateBody>;
  const { scenario, locale, acknowledgeDocId, acknowledgeValue, reset, addDocument, reuseForFundId } = body || {};
  if (scenario) setScenario(scenario as Scenario);
  if (locale) setLocale(locale as LocaleKey);
  if (acknowledgeDocId) toggleAcknowledged(String(acknowledgeDocId), acknowledgeValue as boolean | undefined);
  if (addDocument) addMockDocument(addDocument as DocumentItem);
  if (reuseForFundId) {
    const state = getOverlayState();
    state.reusedKycForFundId = String(reuseForFundId);
  }
  if (reset) resetOverlay();
  return NextResponse.json(getOverlayState());
}

