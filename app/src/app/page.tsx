"use client";

import Link from "next/link";
import {
  DollarSign,
  Users,
  Shield,
  ArrowRight,
  Landmark,
  Heart,
  Sparkles,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-lg bg-primary-600 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
              <DollarSign className="text-gold-300" size={24} />
            </div>
            <div>
              <h1 className="text-lg font-bold text-primary-800">
                Parker Street Bonds
              </h1>
              <p className="text-xs text-slate-500">A Trump Accounts Initiative</p>
            </div>
          </Link>
          <nav className="flex items-center gap-4">
            <Link href="/faq" className="text-sm text-slate-600 hover:text-primary-700 transition-colors">
              FAQ
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
      <section className="bg-gradient-to-br from-primary-700 via-primary-800 to-primary-950 text-white relative overflow-hidden">
        {/* Animated background shapes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary-600/20 rounded-full blur-3xl animate-float" />
          <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] bg-gold-500/10 rounded-full blur-3xl animate-float-delayed" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-500/5 rounded-full blur-3xl animate-pulse-slow" />
        </div>

        <div className="max-w-6xl mx-auto px-4 py-24 relative z-10">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-4 animate-fade-in-up">
              <Landmark size={20} className="text-gold-400" />
              <span className="text-gold-300 text-sm font-medium uppercase tracking-wider">
                Parker Street Ministries
              </span>
            </div>
            <h2 className="text-5xl font-bold mb-6 leading-tight animate-fade-in-up animation-delay-100">
              Building Futures Through
              <span className="text-gold-400 relative">
                {" "}Trump Accounts
                <Sparkles size={20} className="absolute -top-2 -right-6 text-gold-300 animate-sparkle" />
              </span>
            </h2>
            <p className="text-lg text-primary-200 mb-10 leading-relaxed animate-fade-in-up animation-delay-200">
              Seeding tax-advantaged savings accounts for children in the Parker
              Street community. Powered by the Bell Barnett Fund and guided by
              the new §530A federal program.
            </p>
            <div className="flex gap-4 animate-fade-in-up animation-delay-300">
              <Link href="/about">
                <Button variant="gold" size="lg" className="group">
                  Learn About Trump Accounts
                  <ArrowRight size={18} className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href="/login">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-primary-400 text-white hover:bg-primary-700 transition-all duration-300"
                >
                  Check My Application
                </Button>
              </Link>
              <Link href="Parker_Street_Qualified_Geographic_Area_One_Pager.pdf"
                <Button
                  variant="outline"
                  size="lg"
                  className="border-primary-400 text-white hover:bg-primary-700 transition-all duration-300"
                >
                  DRAFT VERSION ONLY -- NOT LIVE
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="flex justify-center pb-6 animate-bounce-slow">
          <ChevronDown size={24} className="text-primary-400" />
        </div>
      </section>

      {/* Key Stats */}
      <section className="max-w-6xl mx-auto px-4 -mt-10 relative z-20">
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
              label: "PSM Contributes Per Child / Year",
              value: "$2,500",
              sub: "Up to $5,000 annual limit per account",
            },
            {
              icon: <Heart size={24} />,
              label: "Year 1 Budget",
              value: "$250,000",
              sub: "Bell Barnett Fund",
            },
          ].map((stat, i) => (
            <div
              key={stat.label}
              className="bg-white rounded-xl border border-slate-200 shadow-lg p-6 flex items-start gap-4 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 animate-fade-in-up"
              style={{ animationDelay: `${400 + i * 100}ms` }}
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
      <section className="max-w-6xl mx-auto px-4 py-20">
        <h3 className="text-2xl font-bold text-slate-900 mb-2 text-center">
          How It Works
        </h3>
        <p className="text-slate-500 text-center mb-12 max-w-xl mx-auto">
          From selection to long-term growth, here&apos;s how the Parker Street
          Trump Account initiative works for families.
        </p>
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
              desc: "Parker Street Ministries contributes $2,500/year per child using funds from the Bell Barnett Fund. Others may also contribute up to the $5,000 annual limit.",
            },
            {
              step: "4",
              title: "Growth",
              desc: "Funds grow tax-deferred in low-cost U.S. index funds until the child turns 18.",
            },
          ].map((item) => (
            <div
              key={item.step}
              className="text-center group"
            >
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-gold-400 to-gold-500 text-white font-bold text-xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-gold-200/50 transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl group-hover:shadow-gold-300/50">
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

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary-50 to-gold-50 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold text-slate-900 mb-4">
            Want to learn more about the federal program?
          </h3>
          <p className="text-slate-600 mb-8 max-w-2xl mx-auto">
            Trump Accounts are a new §530A tax-advantaged savings vehicle for
            American children. Learn how the government program works, how to
            apply, and what it means for your family.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/about">
              <Button variant="primary" size="lg" className="group">
                Learn About Trump Accounts
                <ArrowRight size={18} className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </Link>
            <a
              href="https://trumpaccounts.gov"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="outline" size="lg">
                Official Website for Trump Accounts
              </Button>
            </a>
          </div>
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
          <div className="flex items-center gap-6">
            <Link href="/faq" className="text-xs text-primary-400 hover:text-primary-200 transition-colors">
              FAQ
            </Link>
            <Link href="/about" className="text-xs text-primary-400 hover:text-primary-200 transition-colors">
              About Trump Accounts
            </Link>
            <span className="text-xs text-primary-500">
              Powered by GiveWell Community Foundation &amp; Bell Barnett Fund
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
