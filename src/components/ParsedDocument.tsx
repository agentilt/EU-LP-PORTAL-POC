"use client";
import type { DocumentItem } from "@/lib/types";
import { formatCurrency, formatDate } from "@/lib/format";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function ParsedDocument({ doc }: { doc: DocumentItem }) {
  const router = useRouter();
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
        <a className="rounded-md border px-3 py-1 text-xs hover:bg-black/5 dark:hover:bg-white/10" href={doc.raw_url} target="_blank" rel="noopener noreferrer">Open original document</a>
        <a className="rounded-md border px-3 py-1 text-xs hover:bg-black/5 dark:hover:bg-white/10" href={doc.raw_url} download>Download report</a>
        <button className="rounded-md border px-3 py-1 text-xs hover:bg-black/5 dark:hover:bg-white/10" onClick={acknowledge}>Mark as acknowledged</button>
      </div>
      <p className="text-xs text-black/60 dark:text-white/60">Sourced from: Mock Admin (CSV) — {new Date().toISOString()}</p>
    </div>
  );
}


