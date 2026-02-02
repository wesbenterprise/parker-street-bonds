import Link from "next/link";
import {
  DollarSign,
  Users,
  Shield,
  ArrowRight,
  Landmark,
  Heart,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary-600 flex items-center justify-center">
              <DollarSign className="text-gold-300" size={24} />
            </div>
            <div>
              <h1 className="text-lg font-bold text-primary-800">
                Parker Street Bonds
              </h1>
              <p className="text-xs text-slate-500">Trump Account Initiative</p>
            </div>
          </div>
          <nav className="flex items-center gap-4">
            <Link
              href="/about"
              className="text-sm text-slate-600 hover:text-primary-700 transition-colors"
            >
              About Trump Accounts
            </Link>
            <Link href="/login">
              <Button variant="outline" size="sm">
                Applicant Login
              </Button>
            </Link>
            <Link href="/admin/dashboard">
              <Button variant="primary" size="sm">
                Admin Portal
              </Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-700 via-primary-800 to-primary-950 text-white">
        <div className="max-w-6xl mx-auto px-4 py-20">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-4">
              <Landmark size={20} className="text-gold-400" />
              <span className="text-gold-300 text-sm font-medium uppercase tracking-wider">
                Parker Street Ministries
              </span>
            </div>
            <h2 className="text-4xl font-bold mb-4 leading-tight">
              Building Futures Through
              <span className="text-gold-400"> Trump Accounts</span>
            </h2>
            <p className="text-lg text-primary-200 mb-8 leading-relaxed">
              Seeding tax-advantaged savings accounts for children in the Parker
              Street community. Powered by the Bell Barnett Fund and guided by
              the new §530A federal program.
            </p>
            <div className="flex gap-4">
              <Link href="/about">
                <Button variant="gold" size="lg">
                  Learn About Trump Accounts
                  <ArrowRight size={18} className="ml-2" />
                </Button>
              </Link>
              <Link href="/login">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-primary-400 text-white hover:bg-primary-700"
                >
                  Check My Application
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Key Stats */}
      <section className="max-w-6xl mx-auto px-4 -mt-8">
        <div className="grid grid-cols-3 gap-6">
          {[
            {
              icon: <Users size={24} />,
              label: "Initial Cohort",
              value: "100 Children",
              sub: "Launching 2026",
            },
            {
              icon: <DollarSign size={24} />,
              label: "Per Child / Year",
              value: "$2,500",
              sub: "Up to $5,000 annual limit",
            },
            {
              icon: <Heart size={24} />,
              label: "Year 1 Budget",
              value: "$250,000",
              sub: "Bell Barnett Fund",
            },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-white rounded-xl border border-slate-200 shadow-lg p-6 flex items-start gap-4"
            >
              <div className="rounded-lg bg-primary-50 p-3 text-primary-600">
                {stat.icon}
              </div>
              <div>
                <p className="text-sm text-slate-500">{stat.label}</p>
                <p className="text-2xl font-bold text-slate-900">
                  {stat.value}
                </p>
                <p className="text-sm text-slate-400">{stat.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Program Overview */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h3 className="text-2xl font-bold text-slate-900 mb-8 text-center">
          How It Works
        </h3>
        <div className="grid grid-cols-4 gap-8">
          {[
            {
              step: "1",
              title: "Selection",
              desc: "Children in the Parker Street service area are identified and families receive a PIN to begin enrollment.",
            },
            {
              step: "2",
              title: "Form 4547",
              desc: "Families file Form 4547 with the IRS (or at trumpaccounts.gov) to open a Trump Account for their child.",
            },
            {
              step: "3",
              title: "Contributions",
              desc: "Parker Street Ministries contributes $2,500/year per child using funds from the Bell Barnett Fund.",
            },
            {
              step: "4",
              title: "Growth",
              desc: "Funds grow tax-deferred in low-cost U.S. index funds until the child turns 18.",
            },
          ].map((item) => (
            <div key={item.step} className="text-center">
              <div className="w-12 h-12 rounded-full bg-gold-400 text-white font-bold text-xl flex items-center justify-center mx-auto mb-4">
                {item.step}
              </div>
              <h4 className="font-semibold text-slate-900 mb-2">
                {item.title}
              </h4>
              <p className="text-sm text-slate-500 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary-950 text-primary-300 py-8">
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield size={16} />
            <span className="text-sm">
              Parker Street Ministries &middot; Internal Use Only
            </span>
          </div>
          <span className="text-xs text-primary-500">
            Powered by GiveWell Community Foundation &amp; Bell Barnett Fund
          </span>
        </div>
      </footer>
    </div>
  );
}
