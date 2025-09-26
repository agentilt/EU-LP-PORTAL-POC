import Link from "next/link";
import type { DocumentItem, Fund } from "@/lib/types";
import { formatDate, formatCurrency } from "@/lib/format";

export default function NotificationsList({ docs, funds }: { docs: DocumentItem[]; funds: Fund[] }) {
  const calls = docs.filter((d) => d.type === "capital_call");
  const byFund: Record<string, Fund | undefined> = Object.fromEntries(funds.map((f) => [f.id, f]));
  return (
    <div className="space-y-2">
      {calls.map((d) => (
        <Link key={d.id} href={`/funds/${d.fund_id}`} className="block rounded-md border p-3 text-sm hover:bg-black/5 dark:hover:bg-white/10">
          <div className="font-medium">Capital call — {byFund[d.fund_id]?.name ?? d.fund_id}</div>
          <div className="text-xs text-black/60 dark:text-white/60">Due {d.due_date ? formatDate(d.due_date) : "n/a"} • {d.call_amount ? formatCurrency(d.call_amount) : "amount n/a"}</div>
        </Link>
      ))}
      {calls.length === 0 && <div className="text-xs text-black/60 dark:text-white/60">No upcoming calls.</div>}
    </div>
  );
}


