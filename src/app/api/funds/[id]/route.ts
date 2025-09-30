import { NextResponse } from "next/server";
import { loadFundById } from "@/lib/mock";

type Params = { params: Promise<{ id: string }> };

export async function GET(_: Request, { params }: Params) {
  const { id } = await params;
  const fund = await loadFundById(id);
  if (!fund) return NextResponse.json({ message: "Not found" }, { status: 404 });
  return NextResponse.json(fund);
}

