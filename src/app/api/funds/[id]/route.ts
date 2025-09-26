import { NextResponse } from "next/server";
import { loadFundById } from "@/lib/mock";

type Params = { params: { id: string } };

export async function GET(_: Request, { params }: Params) {
  const fund = await loadFundById(params.id);
  if (!fund) return NextResponse.json({ message: "Not found" }, { status: 404 });
  return NextResponse.json(fund);
}

