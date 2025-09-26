import Link from "next/link";
import { LayoutDashboard, FileText, UserSquare2, FlaskConical } from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="hidden md:block w-60 shrink-0 border-r border-black/10 dark:border-white/10 min-h-[calc(100vh-48px)]">
      <nav className="p-4 space-y-1">
        <Link className="group flex items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-black/5 dark:hover:bg-white/10" href="/dashboard">
          <LayoutDashboard className="size-4" /> Dashboard
        </Link>
        <Link className="group flex items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-black/5 dark:hover:bg-white/10" href="/kyc">
          <UserSquare2 className="size-4" /> KYC
        </Link>
        <Link className="group flex items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-black/5 dark:hover:bg-white/10" href="/demo">
          <FlaskConical className="size-4" /> Demo Controls
        </Link>
      </nav>
    </aside>
  );
}


