import Topbar from "@/components/Topbar";
import Sidebar from "@/components/Sidebar";
import FundCard from "@/components/FundCard";
import type { Fund } from "@/lib/types";
import { formatCurrency } from "@/lib/format";
import { absoluteUrl } from "@/lib/server";

async function getFunds(): Promise<Fund[]> {
  const res = await fetch(absoluteUrl("/api/funds"), { cache: "no-store" });
  return res.json();
}

export default async function DashboardPage() {
  const funds = await getFunds();
  const totalCommitment = funds.reduce((a, f) => a + f.commitment, 0);
  const totalNav = funds.reduce((a, f) => a + f.nav, 0);
  const activeCalls = funds.filter((f) => f.documents.some((d) => d.includes("call"))).length;
  const tvpi = funds.length ? (funds.reduce((a, f) => a + f.tvpi, 0) / funds.length) : 0;

  return (
    <div className="min-h-screen">
      <Topbar />
      <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-[240px_1fr] gap-6 px-4 py-6">
        <Sidebar />
        <main className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="rounded-lg border p-4"><div className="text-xs text-black/60 dark:text-white/60">Total Commitments</div><div className="text-lg font-semibold">{formatCurrency(totalCommitment)}</div></div>
            <div className="rounded-lg border p-4"><div className="text-xs text-black/60 dark:text-white/60">Total NAV</div><div className="text-lg font-semibold">{formatCurrency(totalNav)}</div></div>
            <div className="rounded-lg border p-4"><div className="text-xs text-black/60 dark:text-white/60">Portfolio TVPI</div><div className="text-lg font-semibold">{tvpi.toFixed(2)}x</div></div>
            <div className="rounded-lg border p-4"><div className="text-xs text-black/60 dark:text-white/60">Active Capital Calls</div><div className="text-lg font-semibold">{activeCalls}</div></div>
          </div>
          <section>
            <h2 className="text-sm font-semibold mb-3">Funds</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {funds.map((f) => (
                <FundCard key={f.id} fund={f} />
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

