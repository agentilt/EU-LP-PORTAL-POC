import Topbar from "@/components/Topbar";
import Sidebar from "@/components/Sidebar";
import NotificationsList from "@/components/NotificationsList";
import type { DocumentItem, Fund } from "@/lib/types";
import { absoluteUrl } from "@/lib/server";
import MockDataUploader from "@/components/MockDataUploader";

async function getData(): Promise<{ funds: Fund[]; docs: DocumentItem[] }> {
  const [fr, dr] = await Promise.all([
    fetch(await absoluteUrl("/api/funds"), { cache: "no-store" }),
    fetch(await absoluteUrl("/api/state"), { cache: "no-store" }),
  ]);
  const funds: Fund[] = await fr.json();
  const state = await dr.json();
  const docsRes = await Promise.all(
    funds.flatMap((f) => f.documents).map(async (id) => fetch(await absoluteUrl(`/api/documents/${id}`), { cache: "no-store" }))
  );
  const docs = (await Promise.all(docsRes.map(async (r) => (r.ok ? r.json() : null)))).filter(Boolean) as DocumentItem[];
  return { funds, docs };
}

export default async function DemoPage() {
  const { funds, docs } = await getData();
  async function resetState() {
    "use server";
    await fetch(await absoluteUrl("/api/state"), { method: "POST", body: JSON.stringify({ reset: true }) });
  }
  return (
    <div className="min-h-screen">
      <Topbar />
      <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-[240px_1fr] gap-6 px-4 py-6">
        <Sidebar />
        <main className="space-y-6">
          <h1 className="text-xl font-semibold">Demo Controls</h1>
          <section className="grid md:grid-cols-2 gap-4">
            <div className="rounded-lg border p-4">
              <h2 className="text-sm font-semibold mb-2">Notifications</h2>
              <NotificationsList docs={docs} funds={funds} />
            </div>
            <MockDataUploader />
          </section>
          <form action={resetState}>
            <button className="rounded-md border px-3 py-1 text-xs hover:bg-black/5 dark:hover:bg-white/10">Reset mock data</button>
          </form>
        </main>
      </div>
    </div>
  );
}

