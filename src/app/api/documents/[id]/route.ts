import { NextResponse } from "next/server";
import { loadDocumentById } from "@/lib/mock";

type Params = { params: Promise<{ id: string }> };

export async function GET(_: Request, { params }: Params) {
  const { id } = await params;
  const doc = await loadDocumentById(id);
  if (!doc) return NextResponse.json({ message: "Not found" }, { status: 404 });
  return NextResponse.json(doc);
}

