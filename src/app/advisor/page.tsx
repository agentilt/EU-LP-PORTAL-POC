import Topbar from "@/components/Topbar";
import Sidebar from "@/components/Sidebar";
import AdvisorFunds from "@/components/AdvisorFunds";
import DragDropDemo from "@/components/DragDropDemo";
import type { Fund } from "@/lib/types";
import { absoluteUrl } from "@/lib/server";

async function getFunds(): Promise<Fund[]> {
  const res = await fetch(await absoluteUrl("/api/funds"), { cache: "no-store" });
  return res.json();
}

export default async function AdvisorPage() {
  const funds = await getFunds();
  return (
    <div className="min-h-screen">
      <Topbar />
      <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-[240px_1fr] gap-6 px-4 py-6">
        <Sidebar />
        <main className="space-y-6">
          <h1 className="text-base font-semibold">Advisor — Filter & Export</h1>
          
          <div className="rounded-lg border p-4">
            <h2 className="text-sm font-semibold mb-3">Document Upload (Demo Feature)</h2>
            <p className="text-xs text-gray-600 dark:text-gray-400 mb-4">
              The final product will support drag & drop for uploading capital calls, quarterly reports, and KYC documents.
            </p>
            <DragDropDemo />
          </div>

          <AdvisorFunds initialFunds={funds} />
        </main>
      </div>
    </div>
  );
}


