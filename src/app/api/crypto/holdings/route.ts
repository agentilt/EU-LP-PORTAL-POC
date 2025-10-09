import { NextResponse } from "next/server";
import { loadCryptoPortfolio } from "@/lib/mock";

export async function GET() {
  const data = await loadCryptoPortfolio();
  return NextResponse.json(data);
}


