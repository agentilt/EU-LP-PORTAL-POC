"use client";
import type { Fund, DocumentItem } from "@/lib/types";
import { formatCurrency, formatPercent } from "@/lib/format";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import ParsedDocument from "./ParsedDocument";
import { useEffect, useState } from "react";

export default function FundDetail({ fund }: { fund: Fund }) {
  const [doc, setDoc] = useState<DocumentItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError(null);
      // pick latest document id
      const last = fund.documents[0];
      if (!last) return;
      const res = await fetch(`/api/documents/${last}`, { cache: "no-store" });
      if (res.ok) {
        setDoc(await res.json());
      } else {
        setDoc(null);
        setError("Document unavailable in current scenario.");
      }
      setLoading(false);
    };
    load();
  }, [fund]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-4">
        {loading ? (
          <div className="rounded-lg border p-4 h-64 animate-pulse bg-black/5 dark:bg-white/5" />
        ) : doc ? (
          <div className="rounded-lg border p-4">
            <ParsedDocument doc={doc} fundName={fund.name} />
          </div>
        ) : (
          <div className="rounded-lg border p-4 text-sm text-black/60 dark:text-white/60">{error ?? "Document missing in this scenario."}</div>
        )}
      </div>
      <div className="space-y-4">
        <div className="rounded-lg border p-4">
          <h4 className="text-sm font-semibold mb-2">NAV</h4>
          <div className="h-40">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={fund.nav_history}>
                <XAxis dataKey="date" hide />
                <YAxis hide domain={["dataMin", "dataMax"]} />
                <Tooltip formatter={(v) => formatCurrency(Number(v))} />
                <Line type="monotone" dataKey="nav" stroke="#3b82f6" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="rounded-lg border p-4 grid grid-cols-2 gap-3 text-sm">
          <div>
            <div className="text-xs text-black/60 dark:text-white/60">IRR</div>
            <div className="font-medium">{formatPercent(fund.irr)}</div>
          </div>
          <div>
            <div className="text-xs text-black/60 dark:text-white/60">TVPI</div>
            <div className="font-medium">{fund.tvpi.toFixed(2)}x</div>
          </div>
          <div>
            <div className="text-xs text-black/60 dark:text-white/60">DPI</div>
            <div className="font-medium">{(fund.dpi ?? 0).toFixed(2)}x</div>
          </div>
          <div>
            <div className="text-xs text-black/60 dark:text-white/60">Commitment</div>
            <div className="font-medium">{formatCurrency(fund.commitment)}</div>
          </div>
        </div>
        <div className="rounded-lg border p-4">
          <h4 className="text-sm font-semibold mb-2">Recent capital calls</h4>
          <table className="w-full text-xs">
            <thead className="text-black/60 dark:text-white/60">
              <tr>
                <th className="text-left font-normal">Title</th>
                <th className="text-left font-normal">Due</th>
                <th className="text-left font-normal">Amount</th>
                <th className="text-left font-normal">Status</th>
              </tr>
            </thead>
            <tbody>
              {fund.documents
                .filter((id) => id.startsWith("call-"))
                .map((id) => (
                  <CapitalCallRow key={id} id={id} />
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function CapitalCallRow({ id }: { id: string }) {
  const [item, setItem] = useState<DocumentItem | null>(null);
  useEffect(() => {
    (async () => {
      const res = await fetch(`/api/documents/${id}`, { cache: "no-store" });
      if (!res.ok) return setItem(null);
      setItem(await res.json());
    })();
  }, [id]);
  if (!item) return null;
  return (
    <tr className="border-t">
      <td className="py-1 pr-2">{item.title}</td>
      <td className="py-1 pr-2">{item.due_date ?? "—"}</td>
      <td className="py-1 pr-2">{item.call_amount ? formatCurrency(item.call_amount) : "—"}</td>
      <td className="py-1">
        <span className={
          item.payment_status === "Late" ? "text-red-600" : item.payment_status === "Paid" ? "text-green-600" : "text-yellow-600"
        }>
          {item.payment_status ?? "—"}
        </span>
      </td>
    </tr>
  );
}


