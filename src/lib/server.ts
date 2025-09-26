import { headers } from "next/headers";

export function absoluteUrl(path: string): string {
  const envBase = process.env.NEXT_PUBLIC_BASE_URL;
  if (envBase && envBase.startsWith("http")) {
    return `${envBase}${path.startsWith("/") ? path : `/${path}`}`;
  }
  const h = headers();
  const proto = h.get("x-forwarded-proto") ?? "http";
  const host = h.get("host") ?? "localhost:3000";
  return `${proto}://${host}${path.startsWith("/") ? path : `/${path}`}`;
}

