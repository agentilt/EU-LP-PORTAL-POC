import { NextResponse } from "next/server";
import { loadKyc } from "@/lib/mock";

type Params = { params: Promise<{ id: string }> };

export async function GET() {
  // PoC returns the single mock regardless of id
  const kyc = await loadKyc();
  if (!kyc) return NextResponse.json({ message: "Not found" }, { status: 404 });
  return NextResponse.json(kyc);
}

