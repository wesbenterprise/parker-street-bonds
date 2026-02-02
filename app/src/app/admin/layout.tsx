"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Users,
  DollarSign,
  Landmark,
  Scale,
  FileText,
  LineChart,
  KeyRound,
  LogOut,
} from "lucide-react";

const navItems = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/children", label: "Enrollment", icon: Users },
  { href: "/admin/contributions", label: "Contributions", icon: DollarSign },
  { href: "/admin/funds", label: "Funds", icon: Landmark },
  { href: "/admin/regulatory", label: "Regulatory", icon: Scale },
  { href: "/admin/documents", label: "Documents", icon: FileText },
  { href: "/admin/projections", label: "Projections", icon: LineChart },
  { href: "/admin/pins", label: "PIN Management", icon: KeyRound },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-primary-950 text-white flex flex-col fixed inset-y-0 left-0 z-30">
        <div className="px-6 py-5 border-b border-primary-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-primary-700 flex items-center justify-center">
              <DollarSign className="text-gold-400" size={20} />
            </div>
            <div>
              <h1 className="font-bold text-sm">Parker Street Bonds</h1>
              <p className="text-xs text-primary-400">Admin Portal</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors",
                  isActive
                    ? "bg-primary-700 text-white font-medium"
                    : "text-primary-300 hover:bg-primary-800 hover:text-white"
                )}
              >
                <item.icon size={18} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="px-3 py-4 border-t border-primary-800">
          <Link
            href="/"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-primary-400 hover:bg-primary-800 hover:text-white transition-colors"
          >
            <LogOut size={18} />
            Back to Site
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64">
        <div className="p-8">{children}</div>
      </main>
    </div>
  );
}
