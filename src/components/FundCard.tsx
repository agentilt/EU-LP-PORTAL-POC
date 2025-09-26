"use client";
import Link from "next/link";
import type { Fund } from "@/lib/types";
import { formatCurrency, formatPercent } from "@/lib/format";
import { motion } from "framer-motion";

function Sparkline({ points }: { points: { date: string; nav: number }[] }) {
  const values = points.map((p) => p.nav);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const norm = values.map((v) => (v - min) / (max - min || 1));
  const d = norm.map((n, i) => `${(i / (norm.length - 1)) * 100},${100 - n * 100}`).join(" ");
  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="h-8 w-full">
      <polyline fill="none" strokeWidth="2" stroke="currentColor" points={d} />
    </svg>
  );
}

export default function FundCard({ fund }: { fund: Fund }) {
  return (
    <motion.div whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 300, damping: 20 }} className="rounded-lg border p-4 hover:shadow-md focus-within:ring-2 focus-within:ring-blue-500">
      <Link href={`/funds/${fund.id}`} className="block outline-none">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-semibold">{fund.name}</h3>
            <p className="text-xs text-black/60 dark:text-white/60">{fund.domicile} • {fund.vintage} • {fund.manager}</p>
          </div>
          <span className="text-xs text-black/60 dark:text-white/60">Last report: {fund.last_report_date}</span>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-3 text-sm">
          <div>
            <div className="text-xs text-black/60 dark:text-white/60">Commitment</div>
            <div className="font-medium">{formatCurrency(fund.commitment)}</div>
          </div>
          <div>
            <div className="text-xs text-black/60 dark:text-white/60">Paid-in</div>
            <div className="font-medium">{formatCurrency(fund.paid_in)}</div>
          </div>
          <div>
            <div className="text-xs text-black/60 dark:text-white/60">NAV</div>
            <div className="font-medium">{formatCurrency(fund.nav)}</div>
          </div>
        </div>
        <div className="mt-2 grid grid-cols-3 gap-3 text-sm">
          <div>
            <div className="text-xs text-black/60 dark:text-white/60">IRR</div>
            <div className="font-medium">{formatPercent(fund.irr)}</div>
          </div>
          <div>
            <div className="text-xs text-black/60 dark:text-white/60">TVPI</div>
            <div className="font-medium">{fund.tvpi.toFixed(2)}x</div>
          </div>
          <div>
            <div className="text-xs text-black/60 dark:text-white/60">DPI</div>
            <div className="font-medium">{(fund.dpi ?? 0).toFixed(2)}x</div>
          </div>
        </div>
        <div className="mt-4 text-blue-600 dark:text-blue-400">
          <Sparkline points={fund.nav_history} />
        </div>
      </Link>
    </motion.div>
  );
}


