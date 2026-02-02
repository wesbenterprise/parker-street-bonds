"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  DollarSign,
  ClipboardList,
  FileText,
  Clock,
  LogOut,
} from "lucide-react";

const navItems = [
  { href: "/applicant/application", label: "My Application", icon: ClipboardList },
  { href: "/applicant/documents", label: "My Documents", icon: FileText },
  { href: "/applicant/countdown", label: "Account Countdown", icon: Clock },
];

export default function ApplicantLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top bar */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-primary-600 flex items-center justify-center">
              <DollarSign className="text-gold-300" size={20} />
            </div>
            <div>
              <h1 className="font-bold text-sm text-primary-800">
                Parker Street Bonds
              </h1>
              <p className="text-xs text-slate-500">My Application</p>
            </div>
          </div>
          <nav className="flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors",
                    isActive
                      ? "bg-primary-50 text-primary-700 font-medium"
                      : "text-slate-500 hover:bg-slate-50 hover:text-slate-700"
                  )}
                >
                  <item.icon size={16} />
                  {item.label}
                </Link>
              );
            })}
            <div className="w-px h-6 bg-slate-200 mx-2" />
            <Link
              href="/"
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-slate-400 hover:bg-slate-50 hover:text-slate-600 transition-colors"
            >
              <LogOut size={16} />
              Logout
            </Link>
          </nav>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8">{children}</main>
    </div>
  );
}
