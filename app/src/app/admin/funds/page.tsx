"use client";

import { mockFunds, mockFundAllocations, mockChildren, mockContributions } from "@/lib/mock-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatCard } from "@/components/ui/stat-card";
import { Button } from "@/components/ui/button";
import { ProgressBar } from "@/components/ui/progress-bar";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";
import { Landmark, Plus, ArrowRight } from "lucide-react";
import { format } from "date-fns";

export default function FundsPage() {
  const totalReceived = mockFunds.reduce((sum, f) => sum + f.amount, 0);
  const totalAllocated = mockFundAllocations.reduce(
    (sum, a) => sum + a.amount,
    0
  );
  const unallocated = totalReceived - totalAllocated;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Fund Manager</h2>
          <p className="text-slate-500 mt-1">
            Track incoming grants from Bell Barnett Fund / GiveWell Community
            Foundation
          </p>
        </div>
        <Button variant="primary">
          <Plus size={16} className="mr-2" />
          Record Fund Receipt
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <StatCard
          title="Total Funds Received"
          value={formatCurrency(totalReceived)}
          icon={<Landmark size={24} />}
        />
        <StatCard
          title="Allocated"
          value={formatCurrency(totalAllocated)}
          subtitle={`${Math.round(
            (totalAllocated / (totalReceived || 1)) * 100
          )}% of total`}
        />
        <StatCard
          title="Unallocated"
          value={formatCurrency(unallocated)}
          subtitle="Available for contributions"
        />
      </div>

      {/* Fund Flow Diagram */}
      <Card className="bg-primary-50 border-primary-200">
        <CardContent className="py-6">
          <h3 className="text-sm font-semibold text-primary-800 mb-4">
            Fund Flow
          </h3>
          <div className="flex items-center justify-center gap-4 text-sm">
            <div className="text-center px-4 py-3 bg-white rounded-lg border border-primary-200">
              <p className="font-semibold text-primary-800">
                Bell Barnett Fund
              </p>
              <p className="text-xs text-primary-500">DAF at GiveWell</p>
            </div>
            <ArrowRight className="text-primary-400" size={20} />
            <div className="text-center px-4 py-3 bg-white rounded-lg border border-primary-200">
              <p className="font-semibold text-primary-800">GiveWell Grant</p>
              <p className="text-xs text-primary-500">
                {formatCurrency(totalReceived)}
              </p>
            </div>
            <ArrowRight className="text-primary-400" size={20} />
            <div className="text-center px-4 py-3 bg-white rounded-lg border border-primary-200">
              <p className="font-semibold text-primary-800">
                Parker Street Ministries
              </p>
              <p className="text-xs text-primary-500">Program Operator</p>
            </div>
            <ArrowRight className="text-primary-400" size={20} />
            <div className="text-center px-4 py-3 bg-white rounded-lg border border-gold-200 bg-gold-50">
              <p className="font-semibold text-gold-800">Trump Accounts</p>
              <p className="text-xs text-gold-600">
                {formatCurrency(totalAllocated)} distributed
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Fund Records */}
      <Card>
        <CardHeader>
          <CardTitle>Fund Records</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockFunds.map((fund) => {
              const allocations = mockFundAllocations.filter(
                (a) => a.fund_id === fund.id
              );
              const allocated = allocations.reduce(
                (sum, a) => sum + a.amount,
                0
              );
              const remaining = fund.amount - allocated;

              return (
                <div
                  key={fund.id}
                  className="border border-slate-200 rounded-lg p-4"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="font-semibold text-slate-900">
                        {fund.source}
                      </p>
                      <p className="text-xs text-slate-500">
                        Received{" "}
                        {format(new Date(fund.date_received), "MMMM d, yyyy")}
                      </p>
                      {fund.notes && (
                        <p className="text-xs text-slate-400 mt-1">
                          {fund.notes}
                        </p>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-primary-700">
                        {formatCurrency(fund.amount)}
                      </p>
                      <Badge variant={remaining > 0 ? "warning" : "success"}>
                        {remaining > 0
                          ? `${formatCurrency(remaining)} remaining`
                          : "Fully allocated"}
                      </Badge>
                    </div>
                  </div>

                  <ProgressBar
                    value={allocated}
                    max={fund.amount}
                    label="Allocation Progress"
                    color="primary"
                  />

                  {allocations.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-slate-100">
                      <p className="text-xs font-medium text-slate-500 mb-2">
                        Allocations ({allocations.length})
                      </p>
                      <div className="grid grid-cols-2 gap-2">
                        {allocations.map((alloc) => {
                          const child = mockChildren.find(
                            (c) => c.id === alloc.child_id
                          );
                          return (
                            <div
                              key={alloc.id}
                              className="flex items-center justify-between text-xs bg-slate-50 rounded px-3 py-2"
                            >
                              <span className="text-slate-600">
                                {child
                                  ? `${child.first_name} ${child.last_name}`
                                  : "Unknown"}
                              </span>
                              <span className="font-medium text-primary-700">
                                {formatCurrency(alloc.amount)}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
