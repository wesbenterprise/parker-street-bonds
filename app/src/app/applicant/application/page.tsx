"use client";

import { mockChildren, mockFamilies, mockContributions } from "@/lib/mock-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StatusStepper } from "@/components/ui/status-stepper";
import { CountdownDisplay } from "@/components/ui/countdown-display";
import { ProgressBar } from "@/components/ui/progress-bar";
import { formatCurrency } from "@/lib/utils";
import { ENROLLMENT_STATUS_LABELS } from "@/types";
import { User, DollarSign, Calendar } from "lucide-react";
import { format } from "date-fns";

export default function ApplicationPage() {
  // Mock: use first family. In production, read from session/cookie.
  const family = mockFamilies[0];
  const children = mockChildren.filter((c) => c.family_id === family.id);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">My Application</h2>
        <p className="text-slate-500 mt-1">
          Welcome, {family.name}. View your enrollment status and contribution
          history below.
        </p>
      </div>

      {/* Family Info */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="text-primary-600" size={18} />
            Family Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-slate-500">Name</p>
              <p className="font-medium">{family.name}</p>
            </div>
            <div>
              <p className="text-slate-500">Email</p>
              <p className="font-medium">{family.contact_email || "—"}</p>
            </div>
            <div>
              <p className="text-slate-500">Phone</p>
              <p className="font-medium">{family.phone || "—"}</p>
            </div>
            <div>
              <p className="text-slate-500">Address</p>
              <p className="font-medium">{family.address || "—"}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Children */}
      {children.map((child) => {
        const contributions = mockContributions.filter(
          (c) => c.child_id === child.id
        );
        const totalContributed = contributions.reduce(
          (sum, c) => sum + c.amount,
          0
        );
        const statusVariant =
          child.enrollment_status === "contributions_active"
            ? "success"
            : child.enrollment_status === "account_opened"
            ? "info"
            : "warning";

        return (
          <Card key={child.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>
                  {child.first_name} {child.last_name}
                </CardTitle>
                <Badge variant={statusVariant}>
                  {ENROLLMENT_STATUS_LABELS[child.enrollment_status]}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Status Stepper */}
              <StatusStepper currentStatus={child.enrollment_status} />

              {/* Details */}
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-slate-500">Date of Birth</p>
                  <p className="font-medium">
                    {format(new Date(child.dob), "MMMM d, yyyy")}
                  </p>
                </div>
                <div>
                  <p className="text-slate-500">Cohort Year</p>
                  <p className="font-medium">{child.cohort_year}</p>
                </div>
                <div>
                  <p className="text-slate-500">Form 4547</p>
                  <p className="font-medium">
                    {child.form_4547_filed_at
                      ? format(new Date(child.form_4547_filed_at), "MMM d, yyyy")
                      : "Not yet filed"}
                  </p>
                </div>
              </div>

              {/* Contributions */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-medium text-slate-700 flex items-center gap-1">
                    <DollarSign size={14} className="text-gold-500" />
                    Contributions This Year
                  </p>
                  <p className="text-sm text-slate-500">
                    {formatCurrency(totalContributed)} of {formatCurrency(5000)}
                  </p>
                </div>
                <ProgressBar
                  value={totalContributed}
                  max={5000}
                  color="gold"
                />
              </div>

              {/* Contribution History */}
              {contributions.length > 0 && (
                <div>
                  <p className="text-sm font-medium text-slate-700 mb-2">
                    Contribution History
                  </p>
                  <div className="border border-slate-200 rounded-lg overflow-hidden">
                    <table className="w-full text-sm">
                      <thead className="bg-slate-50">
                        <tr>
                          <th className="text-left px-4 py-2 text-slate-500 font-medium">
                            Date
                          </th>
                          <th className="text-left px-4 py-2 text-slate-500 font-medium">
                            Amount
                          </th>
                          <th className="text-left px-4 py-2 text-slate-500 font-medium">
                            Source
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {contributions.map((c) => (
                          <tr key={c.id} className="border-t border-slate-100">
                            <td className="px-4 py-2">
                              {format(new Date(c.date), "MMM d, yyyy")}
                            </td>
                            <td className="px-4 py-2 font-medium text-primary-700">
                              {formatCurrency(c.amount)}
                            </td>
                            <td className="px-4 py-2 text-slate-500">
                              {c.source}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Countdown */}
              <div className="bg-slate-50 rounded-lg p-6">
                <CountdownDisplay
                  dob={child.dob}
                  childName={child.first_name}
                />
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
