"use client";
import { useState } from "react";
import type { DocumentItem } from "@/lib/types";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function MockDataUploader() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [fundId, setFundId] = useState("");
  const [amount, setAmount] = useState<number | "">("");

  const upload = async () => {
    const doc: DocumentItem = {
      id: `call-${Date.now()}-${fundId || "fund"}`,
      fund_id: fundId || "lx-venture-i",
      type: "capital_call",
      title: title || "Capital Call (uploaded)",
      call_amount: typeof amount === "number" ? amount : 100000,
      due_date: new Date(Date.now() + 7 * 86400000).toISOString().slice(0, 10),
      wire_reference: "MOCK-UPLOAD-001",
      issuer: "Mock Upload",
      raw_url: "/assets/sample-capital-call.pdf",
      created_at: new Date().toISOString().slice(0, 10),
    };
    await fetch("/api/state", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ addDocument: doc }) });
    router.refresh();
    toast.success("Mock document added");
    setTitle(""); setFundId(""); setAmount("");
  };

  return (
    <div className="rounded-lg border p-4 space-y-2">
      <h4 className="text-sm font-semibold">Mock Data Uploader</h4>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
        <input aria-label="Fund ID" value={fundId} onChange={(e) => setFundId(e.target.value)} placeholder="Fund ID" className="rounded-md border px-2 py-1 text-sm bg-transparent" />
        <input aria-label="Title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" className="rounded-md border px-2 py-1 text-sm bg-transparent" />
        <input aria-label="Amount" value={amount} onChange={(e) => setAmount(e.target.value ? Number(e.target.value) : "")} placeholder="Amount (EUR)" type="number" className="rounded-md border px-2 py-1 text-sm bg-transparent" />
      </div>
      <button onClick={upload} className="rounded-md border px-3 py-1 text-xs hover:bg-black/5 dark:hover:bg-white/10">Upload mock capital call</button>
    </div>
  );
}


