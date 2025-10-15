"use client";
import { useEffect, useState } from "react";
import { Globe, Moon, Sun } from "lucide-react";

export function Topbar() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

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
        </div>
      </div>
    </header>
  );
}

export default Topbar;


