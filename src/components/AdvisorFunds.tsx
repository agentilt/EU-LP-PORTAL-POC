"use client";
import { useMemo, useState } from "react";
import type { Fund } from "@/lib/types";
import { formatCurrency } from "@/lib/format";

type Props = { initialFunds: Fund[] };

export default function AdvisorFunds({ initialFunds }: Props) {
  const [query, setQuery] = useState("");
  const [minCommit, setMinCommit] = useState<string>("");
  const [vintage, setVintage] = useState<string>("");
  const [format, setFormat] = useState<"csv" | "pdf">("csv");

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    const mc = Number(minCommit || 0);
    const v = Number(vintage || 0);
    return initialFunds.filter((f) => {
      if (q && !(f.name.toLowerCase().includes(q) || f.manager.toLowerCase().includes(q) || f.domicile.toLowerCase().includes(q))) return false;
      if (mc && f.commitment < mc) return false;
      if (v && f.vintage !== v) return false;
      return true;
    });
  }, [initialFunds, query, minCommit, vintage]);

  const onDownload = async () => {
    const res = await fetch("/api/exports/funds", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ format, funds: filtered }),
    });
    if (!res.ok) return;
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = format === "csv" ? "funds.csv" : "funds.pdf";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2 items-end">
        <div className="flex flex-col">
          <label className="text-xs mb-1">Search</label>
          <input className="rounded-md border px-2 py-1 text-sm" placeholder="Name, manager, domicile" value={query} onChange={(e) => setQuery(e.target.value)} />
        </div>
        <div className="flex flex-col">
          <label className="text-xs mb-1">Min commitment</label>
          <input className="rounded-md border px-2 py-1 text-sm" placeholder="0" value={minCommit} onChange={(e) => setMinCommit(e.target.value)} />
        </div>
        <div className="flex flex-col">
          <label className="text-xs mb-1">Vintage</label>
          <input className="rounded-md border px-2 py-1 text-sm" placeholder="2023" value={vintage} onChange={(e) => setVintage(e.target.value)} />
        </div>
        <div className="flex items-center gap-2 ml-auto">
          <select className="rounded-md border bg-transparent px-2 py-1 text-sm" value={format} onChange={(e) => setFormat(e.target.value as "csv" | "pdf")}> 
            <option value="csv">CSV</option>
            <option value="pdf">PDF</option>
          </select>
          <button className="rounded-md border px-3 py-1 text-sm hover:bg-black/5 dark:hover:bg-white/10" onClick={onDownload}>Download</button>
        </div>
      </div>

      <div className="rounded-lg border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-black/5 dark:bg-white/10 text-left">
            <tr>
              <th className="px-3 py-2">Fund</th>
              <th className="px-3 py-2">Manager</th>
              <th className="px-3 py-2">Domicile</th>
              <th className="px-3 py-2">Vintage</th>
              <th className="px-3 py-2 text-right">Commitment</th>
              <th className="px-3 py-2 text-right">NAV</th>
              <th className="px-3 py-2 text-right">TVPI</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((f) => (
              <tr key={f.id} className="border-t">
                <td className="px-3 py-2">{f.name}</td>
                <td className="px-3 py-2">{f.manager}</td>
                <td className="px-3 py-2">{f.domicile}</td>
                <td className="px-3 py-2">{f.vintage}</td>
                <td className="px-3 py-2 text-right">{formatCurrency(f.commitment)}</td>
                <td className="px-3 py-2 text-right">{formatCurrency(f.nav)}</td>
                <td className="px-3 py-2 text-right">{f.tvpi.toFixed(2)}x</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}


