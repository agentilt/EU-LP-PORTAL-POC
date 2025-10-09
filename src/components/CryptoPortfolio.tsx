"use client";
import { useMemo } from "react";
import { formatCurrency } from "@/lib/format";

type Props = { portfolio: { wallets: { address: string; chain: string; label?: string }[]; holdings: Array<{ wallet: string; chain: string; symbol: string; name: string; amount: number; priceUsd: number; valueUsd: number; category: "stablecoin" | "bluechip" | "defi" | "other" }>; asOf: string } };

export default function CryptoPortfolio({ portfolio }: Props) {
  const totals = useMemo(() => {
    const totalValue = portfolio.holdings.reduce((a, h) => a + h.valueUsd, 0);
    const byCategory = portfolio.holdings.reduce<Record<string, number>>((acc, h) => {
      acc[h.category] = (acc[h.category] || 0) + h.valueUsd;
      return acc;
    }, {});
    const byChain = portfolio.holdings.reduce<Record<string, number>>((acc, h) => {
      acc[h.chain] = (acc[h.chain] || 0) + h.valueUsd;
      return acc;
    }, {});
    return { totalValue, byCategory, byChain };
  }, [portfolio]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="rounded-lg border p-4"><div className="text-xs text-black/60 dark:text-white/60">Total Crypto Value</div><div className="text-lg font-semibold">{formatCurrency(totals.totalValue)}</div></div>
        <div className="rounded-lg border p-4"><div className="text-xs text-black/60 dark:text-white/60">Stablecoins</div><div className="text-lg font-semibold">{formatCurrency(totals.byCategory["stablecoin"] || 0)}</div></div>
        <div className="rounded-lg border p-4"><div className="text-xs text-black/60 dark:text-white/60">Bluechips</div><div className="text-lg font-semibold">{formatCurrency(totals.byCategory["bluechip"] || 0)}</div></div>
        <div className="rounded-lg border p-4"><div className="text-xs text-black/60 dark:text-white/60">DeFi/Other</div><div className="text-lg font-semibold">{formatCurrency((totals.byCategory["defi"] || 0) + (totals.byCategory["other"] || 0))}</div></div>
      </div>

      <section>
        <h2 className="text-sm font-semibold mb-3">Linked Wallets</h2>
        <div className="rounded-lg border divide-y">
          {portfolio.wallets.map((w, i) => (
            <div key={i} className="flex items-center justify-between px-4 py-3 text-sm">
              <div className="space-y-0.5">
                <div className="font-medium">{w.label || "Wallet"} · {w.chain}</div>
                <div className="text-black/60 dark:text-white/60">{w.address}</div>
              </div>
              <div className="text-xs text-black/60 dark:text-white/60">as of {new Date(portfolio.asOf).toLocaleString()}</div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-sm font-semibold mb-3">Holdings</h2>
        <div className="rounded-lg border overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-black/5 dark:bg-white/10 text-left">
              <tr>
                <th className="px-3 py-2">Asset</th>
                <th className="px-3 py-2">Chain</th>
                <th className="px-3 py-2 text-right">Amount</th>
                <th className="px-3 py-2 text-right">Price</th>
                <th className="px-3 py-2 text-right">Value</th>
              </tr>
            </thead>
            <tbody>
              {portfolio.holdings.map((h, i) => (
                <tr key={i} className="border-t">
                  <td className="px-3 py-2">{h.name} <span className="text-black/60 dark:text-white/60">({h.symbol})</span></td>
                  <td className="px-3 py-2">{h.chain}</td>
                  <td className="px-3 py-2 text-right">{h.amount.toLocaleString()}</td>
                  <td className="px-3 py-2 text-right">{formatCurrency(h.priceUsd)}</td>
                  <td className="px-3 py-2 text-right font-medium">{formatCurrency(h.valueUsd)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}


