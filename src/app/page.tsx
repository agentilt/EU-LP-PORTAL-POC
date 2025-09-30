import Link from "next/link";
import Topbar from "@/components/Topbar";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Topbar />
      <main className="mx-auto max-w-5xl px-6 py-16 grid items-center gap-10 md:grid-cols-2">
        <div className="space-y-5">
          <h1 className="text-3xl font-semibold tracking-tight">One login, all funds</h1>
          <p className="text-black/70 dark:text-white/70">EuroLP Portal — PoC showcases a unified LP/VC portal with an aggregated view across all your funds. No real backend — believable mock data only.</p>
          <div className="flex gap-3">
            <Link href="/dashboard" className="rounded-md border px-4 py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10">Enter demo</Link>
            <Link href="/kyc" className="rounded-md border px-4 py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10">KYC</Link>
          </div>
        </div>
        <div className="rounded-xl border p-6">
          <ul className="list-disc pl-5 text-sm space-y-2">
            <li>Dashboard with KPIs and multi-fund cards</li>
            <li>Fund detail: parsed call/report and NAV mini-chart</li>
            <li>KYC: reusable profile with audit trail</li>
            <li>Demo controls: scenarios, notifications, reset</li>
          </ul>
        </div>
      </main>
    </div>
  );
}
