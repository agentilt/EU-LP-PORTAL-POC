import Topbar from "@/components/Topbar";
import Sidebar from "@/components/Sidebar";
import FundDetail from "@/components/FundDetail";
import type { Fund } from "@/lib/types";
import { absoluteUrl } from "@/lib/server";
import { notFound } from "next/navigation";

async function getFund(id: string): Promise<Fund | null> {
  const res = await fetch(await absoluteUrl(`/api/funds/${id}`), { cache: "no-store" });
  if (!res.ok) return null;
  return res.json();
}

type Params = { params: Promise<{ id: string }> };

export default async function FundPage({ params }: Params) {
  const { id } = await params;
  const fund = await getFund(id);
  if (!fund) return notFound();
  return (
    <div className="min-h-screen">
      <Topbar />
      <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-[240px_1fr] gap-6 px-4 py-6">
        <Sidebar />
        <main className="space-y-6">
          <header>
            <h1 className="text-xl font-semibold">{fund.name}</h1>
            <p className="text-xs text-black/60 dark:text-white/60">{fund.domicile} • {fund.vintage} • {fund.manager}</p>
          </header>
          <FundDetail fund={fund} />
        </main>
      </div>
    </div>
  );
}

