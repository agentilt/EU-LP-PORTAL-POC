import { NextResponse } from "next/server";

export async function GET() {
  const { readFile } = await import("node:fs/promises");
  const base = process.cwd();
  const raw = await readFile(`${base}/src/data/sample-crypto.json`, "utf8");
  const data = JSON.parse(raw);
  return NextResponse.json(data);
}


