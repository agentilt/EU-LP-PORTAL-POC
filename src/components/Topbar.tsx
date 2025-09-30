"use client";
import { useEffect, useState } from "react";
import { Languages, Globe, Bell, Moon, Sun } from "lucide-react";
import { useRouter } from "next/navigation";
import { i18nStrings } from "@/lib/mock";
import type { LocaleKey, Scenario } from "@/lib/types";
import { toast } from "sonner";

export function Topbar() {
  const [locale, setLocale] = useState<LocaleKey>("en");
  const [scenario, setScenario] = useState<Scenario>("all");
  const [dark, setDark] = useState(false);
  const router = useRouter();

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  // Initialize from server overlay state on mount
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await fetch("/api/state", { cache: "no-store" });
        if (!res.ok) return;
        const data = await res.json();
        if (!mounted) return;
        if (data?.locale) setLocale(data.locale);
        if (data?.scenario) setScenario(data.scenario);
      } catch {}
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const notify = (detail: any) => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("overlay-change", { detail }));
    }
  };

  const onChangeLocale = async (l: LocaleKey) => {
    setLocale(l);
    await fetch("/api/state", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ locale: l }) });
    notify({ locale: l });
    router.refresh();
    toast.success(`Locale set to ${l}`);
  };

  const onChangeScenario = async (s: Scenario) => {
    setScenario(s);
    await fetch("/api/state", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ scenario: s }) });
    notify({ scenario: s });
    router.refresh();
    toast.info(`Scenario: ${s}`);
  };

  return (
    <header className="sticky top-0 z-30 w-full border-b border-black/10 dark:border-white/10 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Globe className="size-5" aria-hidden />
          <span className="text-sm font-semibold">EuroLP Portal — PoC</span>
        </div>
        <div className="flex items-center gap-3">
          <button aria-label="Toggle dark mode" className="inline-flex items-center gap-2 rounded-md border px-3 py-1 text-xs hover:bg-black/5 dark:hover:bg-white/10" onClick={() => setDark((d) => !d)}>
            {dark ? <Sun className="size-4" /> : <Moon className="size-4" />}<span>{dark ? "Light" : "Dark"}</span>
          </button>
          <div className="flex items-center gap-2">
            <Languages className="size-4" aria-hidden />
            <select aria-label="Locale" className="rounded-md border bg-transparent px-2 py-1 text-xs" value={locale} onChange={(e) => onChangeLocale(e.target.value as LocaleKey)}>
              <option value="en">EN</option>
              <option value="fr">FR</option>
              <option value="de">DE</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <Bell className="size-4" aria-hidden />
            <select aria-label="Scenario" className="rounded-md border bg-transparent px-2 py-1 text-xs" value={scenario} onChange={(e) => onChangeScenario(e.target.value as Scenario)}>
              <option value="all">All docs present</option>
              <option value="missing-doc">Missing doc</option>
              <option value="late-payment">Late payment</option>
            </select>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Topbar;


