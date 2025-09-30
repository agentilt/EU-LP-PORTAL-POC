import { headers } from "next/headers";

export async function absoluteUrl(path: string): Promise<string> {
  const envBase = process.env.NEXT_PUBLIC_BASE_URL;
  if (envBase && envBase.startsWith("http")) {
    return `${envBase}${path.startsWith("/") ? path : `/${path}`}`;
  }
  const h = await headers();
  const proto = h.get("x-forwarded-proto") ?? "http";
  const host = h.get("host") ?? "localhost:3000";
  return `${proto}://${host}${path.startsWith("/") ? path : `/${path}`}`;
}

