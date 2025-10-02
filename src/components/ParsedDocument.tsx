"use client";
import type { DocumentItem } from "@/lib/types";
import { formatCurrency, formatDate } from "@/lib/format";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ParsedDocument({ doc, fundName }: { doc: DocumentItem; fundName?: string }) {
  const router = useRouter();
  const [resolvedUrl, setResolvedUrl] = useState<string>(doc.raw_url);

  useEffect(() => {
    let canceled = false;
    const sanitize = (s: string) =>
      s
        .trim()
        .replace(/\s+/g, "_")
        .replace(/[^A-Za-z0-9_]/g, "");
    const fundNameSan = fundName ? sanitize(fundName) : undefined;
    // Try static assets first using multiple naming heuristics
    const candidates = Array.from(
      new Set([
        // Prefer user-provided static PDFs first
        doc.wire_reference ? `/assets/${doc.wire_reference}.pdf` : undefined,
        `/assets/${doc.id}.pdf`,
        `/assets/${doc.fund_id}.pdf`,
        // Title-based guesses
        `/assets/${sanitize(doc.title)}.pdf`,
        fundNameSan ? `/assets/${sanitize(doc.title.split("—")[0]).trim()}_${fundNameSan}.pdf` : undefined,
        // Common naming for capital calls: Capital_Call_Notice_<Fund_Name>.pdf
        doc.type === "capital_call" && fundNameSan ? `/assets/Capital_Call_Notice_${fundNameSan}.pdf` : undefined,
        // Fallback to the mock generator/API URL
        doc.raw_url,
      ].filter(Boolean) as string[])
    );
    (async () => {
      for (const url of candidates) {
        try {
          const res = await fetch(url, { method: "HEAD", cache: "no-store" });
          if (res.ok) {
            if (!canceled) setResolvedUrl(url);
            break;
          }
        } catch {}
      }
    })();
    return () => {
      canceled = true;
    };
  }, [doc.id, doc.wire_reference, doc.raw_url, doc.fund_id, doc.title, doc.type, fundName]);
  const acknowledge = async () => {
    await fetch("/api/state", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ acknowledgeDocId: doc.id }) });
    router.refresh();
    toast.success("Acknowledged");
  };
  return (
    <div className="space-y-3">
      <h3 className="text-base font-semibold">{doc.title}</h3>
      <div className="grid grid-cols-2 gap-3 text-sm">
        {doc.call_amount != null && (
          <div>
            <div className="text-xs text-black/60 dark:text-white/60">Call amount</div>
            <div className="font-medium">{formatCurrency(doc.call_amount)}</div>
          </div>
        )}
        {doc.due_date && (
          <div>
            <div className="text-xs text-black/60 dark:text-white/60">Due date</div>
            <div className="font-medium">{formatDate(doc.due_date)}</div>
          </div>
        )}
        {doc.wire_reference && (
          <div>
            <div className="text-xs text-black/60 dark:text-white/60">Wire reference</div>
            <div className="font-medium">{doc.wire_reference}</div>
          </div>
        )}
        {doc.created_at && (
          <div>
            <div className="text-xs text-black/60 dark:text-white/60">Created</div>
            <div className="font-medium">{formatDate(doc.created_at)}</div>
          </div>
        )}
      </div>
      <div className="flex gap-2">
        <a className="rounded-md border px-3 py-1 text-xs hover:bg-black/5 dark:hover:bg-white/10" href={resolvedUrl} target="_blank" rel="noopener noreferrer">Open original document</a>
        <a className="rounded-md border px-3 py-1 text-xs hover:bg-black/5 dark:hover:bg-white/10" href={resolvedUrl} download>Download report</a>
        <button className="rounded-md border px-3 py-1 text-xs hover:bg-black/5 dark:hover:bg-white/10" onClick={acknowledge}>Mark as acknowledged</button>
      </div>
      <p className="text-xs text-black/60 dark:text-white/60">Sourced from: Mock Admin (CSV) — {new Date().toISOString()}</p>
    </div>
  );
}


