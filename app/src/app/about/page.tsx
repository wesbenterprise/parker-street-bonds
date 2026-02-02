import Link from "next/link";
import {
  DollarSign,
  ArrowLeft,
  ExternalLink,
  Calendar,
  PiggyBank,
  FileText,
  TrendingUp,
  Users,
  Gift,
  ShieldCheck,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-4">
          <Link
            href="/"
            className="text-slate-400 hover:text-slate-600 transition-colors"
          >
            <ArrowLeft size={20} />
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary-600 flex items-center justify-center">
              <DollarSign className="text-gold-300" size={24} />
            </div>
            <h1 className="text-lg font-bold text-primary-800">
              About Trump Accounts
            </h1>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        {/* Intro */}
        <section>
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            What is a Trump Account?
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed mb-4">
            A <strong>Trump Account</strong> (officially a <strong>§530A Account</strong>)
            is a new type of tax-advantaged savings account created for American children
            under age 18. Established by the{" "}
            <em>One Big Beautiful Bill Act</em>, these accounts are designed to build
            long-term wealth starting from childhood.
          </p>
          <p className="text-slate-600 leading-relaxed">
            Think of it as an IRA for kids — but with special rules that make it
            even more powerful. Contributions grow tax-deferred, investments are
            in low-cost U.S. index funds, and the federal government provides a
            seed contribution for eligible children.
          </p>
        </section>

        {/* Key Features */}
        <div className="grid grid-cols-2 gap-6">
          <Card>
            <CardContent className="pt-6">
              <Gift className="text-gold-500 mb-3" size={32} />
              <h3 className="font-semibold text-slate-900 mb-2">
                $1,000 Government Seed
              </h3>
              <p className="text-sm text-slate-600">
                Children born between January 1, 2025 and December 31, 2028 who
                are U.S. citizens with a valid Social Security number receive a{" "}
                <strong>$1,000 pilot program contribution</strong> from the
                federal government. This does NOT count against annual limits.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <PiggyBank className="text-primary-600 mb-3" size={32} />
              <h3 className="font-semibold text-slate-900 mb-2">
                $5,000 Annual Contribution Limit
              </h3>
              <p className="text-sm text-slate-600">
                Parents, family, friends, employers, and nonprofits can
                contribute up to <strong>$5,000 per child per year</strong>.
                Employer contributions are capped at $2,500/year. The government
                seed and qualified general contributions are separate.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <TrendingUp className="text-primary-600 mb-3" size={32} />
              <h3 className="font-semibold text-slate-900 mb-2">
                Tax-Deferred Growth
              </h3>
              <p className="text-sm text-slate-600">
                Money in Trump Accounts grows <strong>tax-deferred</strong> in
                low-cost U.S. equity index funds (expense ratios under 0.1%).
                During the &ldquo;growth period&rdquo; (until age 18), withdrawals are
                restricted to protect the investment.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <ShieldCheck className="text-gold-500 mb-3" size={32} />
              <h3 className="font-semibold text-slate-900 mb-2">
                No Income Requirements
              </h3>
              <p className="text-sm text-slate-600">
                Unlike traditional IRAs, Trump Accounts{" "}
                <strong>do not require earned income</strong> and have no income
                limits for contributors. Any child under 18 with a Social
                Security number is eligible.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* How to Open */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="text-primary-600" size={20} />
              How to Open a Trump Account
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="space-y-4">
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-gold-400 text-white font-bold flex items-center justify-center text-sm">
                  1
                </span>
                <div>
                  <p className="font-medium text-slate-900">
                    File Form 4547 with the IRS
                  </p>
                  <p className="text-sm text-slate-600">
                    You can file Form 4547 (&ldquo;Trump Account Election&rdquo;) with your
                    tax return or use the IRS online tool. This registers the
                    child for a Trump Account and assigns a trustee (usually a bank).
                  </p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-gold-400 text-white font-bold flex items-center justify-center text-sm">
                  2
                </span>
                <div>
                  <p className="font-medium text-slate-900">
                    Visit trumpaccounts.gov
                  </p>
                  <p className="text-sm text-slate-600">
                    Alternatively, you can use the government&apos;s online portal at{" "}
                    <strong>trumpaccounts.gov</strong> to file your election and
                    manage your account.
                  </p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-gold-400 text-white font-bold flex items-center justify-center text-sm">
                  3
                </span>
                <div>
                  <p className="font-medium text-slate-900">
                    Contributions begin July 4, 2026
                  </p>
                  <p className="text-sm text-slate-600">
                    The first day contributions can be made to Trump Accounts is{" "}
                    <strong>July 4, 2026</strong> — the 250th anniversary of the
                    Declaration of Independence. File Form 4547 early so your
                    account is ready.
                  </p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-gold-400 text-white font-bold flex items-center justify-center text-sm">
                  4
                </span>
                <div>
                  <p className="font-medium text-slate-900">
                    Funds become accessible at 18
                  </p>
                  <p className="text-sm text-slate-600">
                    The &ldquo;growth period&rdquo; ends on January 1 of the year the child
                    turns 18. After that, the account functions like a standard
                    traditional IRA under §408(a), with full access to the funds.
                  </p>
                </div>
              </li>
            </ol>
          </CardContent>
        </Card>

        {/* Dell Foundation Bonus */}
        <Card className="border-gold-200 bg-gold-50">
          <CardContent className="pt-6">
            <h3 className="font-semibold text-slate-900 mb-2 flex items-center gap-2">
              <Users className="text-gold-600" size={20} />
              Dell Foundation $250 Bonus
            </h3>
            <p className="text-sm text-slate-700">
              Michael and Susan Dell announced <strong>$250 deposits</strong>{" "}
              for up to 25 million children born between 2014–2024 who live in
              ZIP codes where the median family income is $150,000 or less. Many
              children in the Parker Street community may qualify for this bonus
              on top of the program contributions.
            </p>
          </CardContent>
        </Card>

        {/* Parker Street Program */}
        <Card className="border-primary-200 bg-primary-50">
          <CardContent className="pt-6">
            <h3 className="text-xl font-bold text-primary-800 mb-3">
              The Parker Street Program
            </h3>
            <p className="text-slate-700 mb-4">
              Through the Bell Barnett Fund at GiveWell Community Foundation,
              Parker Street Ministries contributes <strong>$2,500 per year</strong>{" "}
              to Trump Accounts for hand-selected children in the Parker Street
              service area. This is in addition to any government seed money or
              Dell Foundation contributions the child may receive.
            </p>
            <p className="text-slate-700 mb-4">
              If you have received a PIN from Parker Street Ministries, you have
              been selected for this program.
            </p>
            <div className="flex gap-4">
              <Link href="/login">
                <Button variant="primary">
                  Enter My PIN
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Key Dates */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="text-primary-600" size={20} />
              Key Dates
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                {
                  date: "February 20, 2026",
                  event: "Treasury comment period closes for Trump Account regulations",
                },
                {
                  date: "July 4, 2026",
                  event: "First day contributions can be made to Trump Accounts",
                },
                {
                  date: "2027+",
                  event: "Annual contribution limit indexed to inflation",
                },
              ].map((item) => (
                <div
                  key={item.date}
                  className="flex gap-4 items-start py-2 border-b border-slate-100 last:border-0"
                >
                  <span className="text-sm font-semibold text-gold-600 min-w-[160px]">
                    {item.date}
                  </span>
                  <span className="text-sm text-slate-600">{item.event}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Official Resources */}
        <Card>
          <CardHeader>
            <CardTitle>Official Resources</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                {
                  label: "Trump Accounts Offical Website",
                  url: "https://trumpaccounts.gov/",
                },
                {
                  label: "IRS: Trump Accounts",
                  url: "https://www.irs.gov/trumpaccounts",
                },
                {
                  label: "IRS: Form 4547 Instructions",
                  url: "https://www.irs.gov/pub/irs-pdf/i4547.pdf",
                },
                {
                  label: "trumpaccounts.gov — Official Portal",
                  url: "https://trumpaccounts.gov",
                },
                {
                  label: "IRS Notice 2025-68 — Initial Guidance",
                  url: "https://www.irs.gov/newsroom/treasury-irs-issue-guidance-on-trump-accounts-established-under-the-working-families-tax-cuts-notice-announces-upcoming-regulations",
                },
              ].map((link) => (
                <a
                  key={link.url}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-primary-700 hover:text-primary-900 hover:underline"
                >
                  <ExternalLink size={14} />
                  {link.label}
                </a>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
