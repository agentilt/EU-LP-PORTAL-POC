"use client";
import type { KYC } from "@/lib/types";
import { toast } from "sonner";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function KYCProfileCard({ profile }: { profile: KYC }) {
  const router = useRouter();
  const [fundId, setFundId] = useState("");
  const reuse = async () => {
    await fetch("/api/state", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ reuseForFundId: fundId || "lx-venture-i" }) });
    router.refresh();
    toast.success(`Reused profile for ${fundId || "selected fund"}`);
  };
  return (
    <div className="rounded-lg border p-4 space-y-3">
      <div>
        <h3 className="text-base font-semibold">{profile.name}</h3>
        <p className="text-xs text-black/60 dark:text-white/60">{profile.entity_type} • {profile.jurisdiction}</p>
      </div>
      <div className="text-sm">
        <div className="text-xs text-black/60 dark:text-white/60">AML status</div>
        <div className="font-medium">{profile.aml_status}</div>
      </div>
      {profile.contacts && profile.contacts.length > 0 && (
        <div className="text-sm">
          <div className="text-xs text-black/60 dark:text-white/60 mb-1">Contacts</div>
          <ul className="space-y-1">
            {profile.contacts.map((c, idx) => (
              <li key={idx} className="text-xs text-black/70 dark:text-white/70">
                {c.name} — {c.role} — <a className="underline" href={`mailto:${c.email}`}>{c.email}</a>
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className="flex gap-2 items-center">
        <input aria-label="Fund" value={fundId} onChange={(e) => setFundId(e.target.value)} placeholder="Fund ID" className="rounded-md border px-2 py-1 text-sm bg-transparent" />
        <button className="rounded-md border px-3 py-1 text-xs hover:bg-black/5 dark:hover:bg-white/10" onClick={reuse}>Reuse profile for Fund</button>
      </div>
      <div>
        <h4 className="text-sm font-semibold">Audit trail</h4>
        <ul className="mt-1 text-xs space-y-1">
          {profile.audit.map((a, i) => (
            <li key={i} className="text-black/70 dark:text-white/70">{a.at} — {a.actor}: {a.action}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}


