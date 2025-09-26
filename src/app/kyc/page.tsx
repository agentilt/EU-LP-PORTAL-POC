import Topbar from "@/components/Topbar";
import Sidebar from "@/components/Sidebar";
import KYCProfileCard from "@/components/KYCProfileCard";
import type { KYC } from "@/lib/types";
import { absoluteUrl } from "@/lib/server";

async function getKyc(): Promise<KYC> {
  const res = await fetch(absoluteUrl("/api/kyc/lp-acme-1"), { cache: "no-store" });
  return res.json();
}

export default async function KycPage() {
  const profile = await getKyc();
  return (
    <div className="min-h-screen">
      <Topbar />
      <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-[240px_1fr] gap-6 px-4 py-6">
        <Sidebar />
        <main className="space-y-6">
          <h1 className="text-xl font-semibold">KYC</h1>
          <KYCProfileCard profile={profile} />
        </main>
      </div>
    </div>
  );
}

