"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, DollarSign, KeyRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockFamilies } from "@/lib/mock-data";

export default function LoginPage() {
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    // Mock PIN validation — in production this hits a Supabase API route
    const family = mockFamilies.find(
      (f) => f.pin.toLowerCase() === pin.trim().toLowerCase()
    );

    if (family) {
      // In production, set a session cookie/token
      localStorage.setItem("applicant_family_id", family.id);
      localStorage.setItem("applicant_pin", family.pin);
      router.push("/applicant/application");
    } else {
      setError("Invalid PIN. Please check your PIN and try again.");
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-700 via-primary-800 to-primary-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-primary-300 hover:text-white transition-colors text-sm mb-6"
          >
            <ArrowLeft size={16} />
            Back to home
          </Link>
          <div className="w-16 h-16 rounded-xl bg-primary-600 border-2 border-primary-500 flex items-center justify-center mx-auto mb-4">
            <DollarSign className="text-gold-300" size={32} />
          </div>
          <h1 className="text-2xl font-bold text-white">
            Parker Street Bonds
          </h1>
          <p className="text-primary-300 text-sm mt-1">
            Applicant Portal
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <KeyRound className="text-primary-600" size={20} />
              Enter Your PIN
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-slate-500 mb-4">
              Enter the PIN provided to you by Parker Street Ministries to
              access your application.
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="pin"
                  className="block text-sm font-medium text-slate-700 mb-1"
                >
                  PIN Code
                </label>
                <input
                  id="pin"
                  type="text"
                  value={pin}
                  onChange={(e) => setPin(e.target.value.toUpperCase())}
                  placeholder="e.g. J482917"
                  maxLength={7}
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 text-center text-2xl font-mono tracking-widest focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
                <p className="text-xs text-slate-400 mt-1">
                  Format: 1 letter + 6 digits (e.g. J482917)
                </p>
              </div>

              {error && (
                <div className="text-sm text-red-600 bg-red-50 rounded-lg px-4 py-2">
                  {error}
                </div>
              )}

              <Button type="submit" variant="primary" className="w-full" size="lg">
                Access My Application
              </Button>
            </form>

            <div className="mt-6 pt-4 border-t border-slate-100 text-center">
              <p className="text-xs text-slate-400">
                Don&apos;t have a PIN? The Parker Street Trump Account program is
                by invitation only. Contact Parker Street Ministries for more
                information.
              </p>
            </div>
          </CardContent>
        </Card>

        <p className="text-center text-xs text-primary-400 mt-6">
          Admin?{" "}
          <Link
            href="/admin/dashboard"
            className="underline hover:text-primary-200"
          >
            Go to Admin Portal
          </Link>
        </p>
      </div>
    </div>
  );
}
