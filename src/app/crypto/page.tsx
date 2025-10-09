import Topbar from "@/components/Topbar";
import Sidebar from "@/components/Sidebar";
import CryptoPortfolio from "@/components/CryptoPortfolio";
import type { CryptoPortfolio as CryptoPortfolioType } from "@/lib/types";
import { absoluteUrl } from "@/lib/server";

async function getPortfolio(): Promise<CryptoPortfolioType> {
  const res = await fetch(await absoluteUrl("/api/crypto/holdings"), { cache: "no-store" });
  return res.json();
}

export default async function CryptoPage() {
  const portfolio = await getPortfolio();
  return (
    <div className="min-h-screen">
      <Topbar />
      <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-[240px_1fr] gap-6 px-4 py-6">
        <Sidebar />
        <main className="space-y-6">
          <h1 className="text-base font-semibold">Crypto (Read-only Demo)</h1>
          <CryptoPortfolio portfolio={portfolio} />
        </main>
      </div>
    </div>
  );
}


