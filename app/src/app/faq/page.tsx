"use client";

import { useState } from "react";
import Link from "next/link";
import { mockFAQs } from "@/lib/mock-data";
import {
  DollarSign,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  ArrowLeft,
  Shield,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function FAQPage() {
  const [openId, setOpenId] = useState<string | null>(null);
  const publishedFAQs = mockFAQs
    .filter((f) => f.published)
    .sort((a, b) => a.order - b.order);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="text-slate-400 hover:text-slate-600 transition-colors"
            >
              <ArrowLeft size={20} />
            </Link>
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
          </div>
          <nav className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="outline" size="sm">
                Applicant Login
              </Button>
            </Link>
          </nav>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-12">
        {/* Title */}
        <div className="text-center mb-12 animate-fade-in-up">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-50 mb-4">
            <HelpCircle className="text-primary-600" size={32} />
          </div>
          <h2 className="text-3xl font-bold text-slate-900 mb-3">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto">
            Everything you need to know about the Parker Street Trump Account
            initiative and the federal §530A program.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-3">
          {publishedFAQs.map((faq, i) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="animate-fade-in-up"
                style={{ animationDelay: `${i * 50}ms` }}
              >
                <button
                  onClick={() => setOpenId(isOpen ? null : faq.id)}
                  className="w-full bg-white rounded-xl border border-slate-200 px-6 py-5 text-left hover:shadow-md transition-all duration-300 group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-start gap-4">
                      <span className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-gold-400 to-gold-500 text-white font-bold text-sm flex items-center justify-center mt-0.5 transition-transform duration-300 group-hover:scale-110">
                        {faq.order}
                      </span>
                      <h3 className="font-semibold text-slate-900 text-lg">
                        {faq.question}
                      </h3>
                    </div>
                    <div className="flex-shrink-0 ml-4">
                      {isOpen ? (
                        <ChevronUp
                          size={20}
                          className="text-primary-600 transition-transform duration-300"
                        />
                      ) : (
                        <ChevronDown
                          size={20}
                          className="text-slate-400 transition-transform duration-300 group-hover:text-primary-600"
                        />
                      )}
                    </div>
                  </div>
                  {isOpen && (
                    <div className="mt-4 ml-12 animate-slide-down">
                      <p className="text-slate-600 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </button>
              </div>
            );
          })}
        </div>

        {/* Still have questions */}
        <div className="mt-12 text-center animate-fade-in-up animation-delay-400">
          <div className="bg-gradient-to-r from-primary-50 to-gold-50 rounded-2xl p-8 border border-primary-100">
            <h3 className="text-xl font-bold text-slate-900 mb-3">
              Still have questions?
            </h3>
            <p className="text-slate-600 mb-6">
              If you&apos;ve been selected for the program and received a PIN,
              log in to check your application status or contact Parker Street
              Ministries directly.
            </p>
            <div className="flex justify-center gap-4">
              <Link href="/login">
                <Button variant="primary" className="group">
                  Enter My PIN
                </Button>
              </Link>
              <Link href="/about">
                <Button variant="outline">
                  Learn About Trump Accounts
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-primary-950 text-primary-300 py-8 mt-12">
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield size={16} />
            <span className="text-sm">
              Parker Street Ministries &middot; Internal Use Only
            </span>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/" className="text-xs text-primary-400 hover:text-primary-200 transition-colors">
              Home
            </Link>
            <Link href="/about" className="text-xs text-primary-400 hover:text-primary-200 transition-colors">
              About Trump Accounts
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
