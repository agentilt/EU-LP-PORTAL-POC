import { NextResponse } from "next/server";
import { loadFunds } from "@/lib/mock";

export async function GET() {
  const data = await loadFunds();
  return NextResponse.json(data);
}

