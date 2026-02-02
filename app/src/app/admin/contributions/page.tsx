"use client";

import { mockContributions, mockChildren } from "@/lib/mock-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatCard } from "@/components/ui/stat-card";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";
import { DollarSign, Plus, TrendingUp, Calendar } from "lucide-react";
import { format } from "date-fns";

export default function ContributionsPage() {
  const totalContributed = mockContributions.reduce(
    (sum, c) => sum + c.amount,
    0
  );
  const childrenWithContributions = new Set(
    mockContributions.map((c) => c.child_id)
  ).size;

  // Per-child summary
  const childSummaries = mockChildren.map((child) => {
    const contributions = mockContributions.filter(
      (c) => c.child_id === child.id
    );
    const total = contributions.reduce((sum, c) => sum + c.amount, 0);
    const remaining = 5000 - total;
    return { child, contributions, total, remaining };
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">
            Contribution Tracker
          </h2>
          <p className="text-slate-500 mt-1">
            Track all contributions to children&apos;s Trump Accounts
          </p>
        </div>
        <Button variant="primary">
          <Plus size={16} className="mr-2" />
          Record Contribution
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <StatCard
          title="Total Contributed"
          value={formatCurrency(totalContributed)}
          icon={<DollarSign size={24} />}
        />
        <StatCard
          title="Children with Contributions"
          value={childrenWithContributions}
          subtitle={`of ${mockChildren.length} enrolled`}
          icon={<TrendingUp size={24} />}
        />
        <StatCard
          title="Avg. per Child"
          value={
            childrenWithContributions > 0
              ? formatCurrency(totalContributed / childrenWithContributions)
              : "$0"
          }
          subtitle="This year"
          icon={<Calendar size={24} />}
        />
      </div>

      {/* Per-Child Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Per-Child Contribution Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border border-slate-200 rounded-lg overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-slate-50">
                <tr>
                  <th className="text-left px-4 py-3 text-slate-500 font-medium">
                    Child
                  </th>
                  <th className="text-left px-4 py-3 text-slate-500 font-medium">
                    Cohort
                  </th>
                  <th className="text-right px-4 py-3 text-slate-500 font-medium">
                    Contributed
                  </th>
                  <th className="text-right px-4 py-3 text-slate-500 font-medium">
                    Remaining Capacity
                  </th>
                  <th className="text-right px-4 py-3 text-slate-500 font-medium">
                    # Contributions
                  </th>
                </tr>
              </thead>
              <tbody>
                {childSummaries.map(({ child, contributions, total, remaining }) => (
                  <tr
                    key={child.id}
                    className="border-t border-slate-100 hover:bg-slate-50"
                  >
                    <td className="px-4 py-3 font-medium">
                      {child.first_name} {child.last_name}
                    </td>
                    <td className="px-4 py-3 text-slate-500">
                      {child.cohort_year}
                    </td>
                    <td className="px-4 py-3 text-right font-medium text-primary-700">
                      {formatCurrency(total)}
                    </td>
                    <td className="px-4 py-3 text-right text-slate-500">
                      {formatCurrency(remaining > 0 ? remaining : 0)}
                    </td>
                    <td className="px-4 py-3 text-right text-slate-400">
                      {contributions.length}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* All Contributions */}
      <Card>
        <CardHeader>
          <CardTitle>All Contributions</CardTitle>
        </CardHeader>
        <CardContent>
          {mockContributions.length === 0 ? (
            <p className="text-center text-slate-400 py-8">
              No contributions recorded yet.
            </p>
          ) : (
            <div className="border border-slate-200 rounded-lg overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="text-left px-4 py-3 text-slate-500 font-medium">
                      Date
                    </th>
                    <th className="text-left px-4 py-3 text-slate-500 font-medium">
                      Child
                    </th>
                    <th className="text-right px-4 py-3 text-slate-500 font-medium">
                      Amount
                    </th>
                    <th className="text-left px-4 py-3 text-slate-500 font-medium">
                      Source
                    </th>
                    <th className="text-left px-4 py-3 text-slate-500 font-medium">
                      Notes
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {mockContributions.map((contribution) => {
                    const child = mockChildren.find(
                      (c) => c.id === contribution.child_id
                    );
                    return (
                      <tr
                        key={contribution.id}
                        className="border-t border-slate-100 hover:bg-slate-50"
                      >
                        <td className="px-4 py-3">
                          {format(new Date(contribution.date), "MMM d, yyyy")}
                        </td>
                        <td className="px-4 py-3 font-medium">
                          {child
                            ? `${child.first_name} ${child.last_name}`
                            : "Unknown"}
                        </td>
                        <td className="px-4 py-3 text-right font-bold text-primary-700">
                          {formatCurrency(contribution.amount)}
                        </td>
                        <td className="px-4 py-3 text-slate-500">
                          {contribution.source}
                        </td>
                        <td className="px-4 py-3 text-slate-400">
                          {contribution.notes || "—"}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
