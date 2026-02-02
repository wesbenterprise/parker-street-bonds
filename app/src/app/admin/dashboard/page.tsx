"use client";

import { mockChildren, mockContributions, mockFunds, mockRegulatoryItems } from "@/lib/mock-data";
import { StatCard } from "@/components/ui/stat-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ProgressBar } from "@/components/ui/progress-bar";
import { formatCurrency } from "@/lib/utils";
import { ENROLLMENT_STATUS_LABELS, EnrollmentStatus } from "@/types";
import {
  Users,
  DollarSign,
  Landmark,
  AlertTriangle,
  TrendingUp,
  Calendar,
} from "lucide-react";
import { format, differenceInDays } from "date-fns";

export default function DashboardPage() {
  const totalChildren = mockChildren.length;
  const activeChildren = mockChildren.filter(
    (c) => c.enrollment_status === "contributions_active"
  ).length;
  const totalContributed = mockContributions.reduce(
    (sum, c) => sum + c.amount,
    0
  );
  const totalFundsReceived = mockFunds.reduce((sum, f) => sum + f.amount, 0);
  const totalAllocated = totalContributed;
  const unallocated = totalFundsReceived - totalAllocated;

  const urgentRegItems = mockRegulatoryItems.filter(
    (r) => r.status === "action_required" || r.status === "pending"
  );

  // Status breakdown
  const statusCounts = mockChildren.reduce<Record<string, number>>(
    (acc, child) => {
      acc[child.enrollment_status] = (acc[child.enrollment_status] || 0) + 1;
      return acc;
    },
    {}
  );

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Dashboard</h2>
        <p className="text-slate-500 mt-1">
          Overview of the Parker Street Trump Account Initiative
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-4 gap-6">
        <StatCard
          title="Children Enrolled"
          value={totalChildren}
          subtitle={`${activeChildren} with active contributions`}
          icon={<Users size={24} />}
        />
        <StatCard
          title="Total Contributed"
          value={formatCurrency(totalContributed)}
          subtitle="All time"
          icon={<DollarSign size={24} />}
        />
        <StatCard
          title="Funds Received"
          value={formatCurrency(totalFundsReceived)}
          subtitle={`${formatCurrency(unallocated)} unallocated`}
          icon={<Landmark size={24} />}
        />
        <StatCard
          title="Regulatory Items"
          value={urgentRegItems.length}
          subtitle="Pending / Action Required"
          icon={<AlertTriangle size={24} />}
        />
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Enrollment Pipeline */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp size={18} className="text-primary-600" />
              Enrollment Pipeline
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {Object.entries(ENROLLMENT_STATUS_LABELS).map(([status, label]) => {
              const count = statusCounts[status] || 0;
              return (
                <div key={status}>
                  <ProgressBar
                    value={count}
                    max={totalChildren || 1}
                    label={label}
                    showPercentage={false}
                    color={
                      status === "contributions_active" ? "primary" : "gold"
                    }
                  />
                  <p className="text-xs text-slate-400 mt-0.5 text-right">
                    {count} {count === 1 ? "child" : "children"}
                  </p>
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* Budget Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign size={18} className="text-gold-500" />
              Budget Overview
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <ProgressBar
                value={totalAllocated}
                max={totalFundsReceived || 1}
                label="Funds Allocated"
                color="primary"
              />
              <div className="flex justify-between mt-1">
                <span className="text-xs text-slate-400">
                  {formatCurrency(totalAllocated)} allocated
                </span>
                <span className="text-xs text-slate-400">
                  {formatCurrency(unallocated)} remaining
                </span>
              </div>
            </div>

            <div className="border-t border-slate-100 pt-4">
              <h4 className="text-sm font-medium text-slate-700 mb-3">
                Fund Sources
              </h4>
              {mockFunds.map((fund) => (
                <div
                  key={fund.id}
                  className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0"
                >
                  <div>
                    <p className="text-sm font-medium text-slate-800">
                      {fund.source}
                    </p>
                    <p className="text-xs text-slate-400">
                      Received {format(new Date(fund.date_received), "MMM d, yyyy")}
                    </p>
                  </div>
                  <p className="text-sm font-bold text-primary-700">
                    {formatCurrency(fund.amount)}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Regulatory Alerts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar size={18} className="text-primary-600" />
            Upcoming Regulatory Milestones
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {urgentRegItems.map((item) => {
              const daysLeft = item.due_date
                ? differenceInDays(new Date(item.due_date), new Date())
                : null;
              return (
                <div
                  key={item.id}
                  className="flex items-start justify-between py-3 border-b border-slate-100 last:border-0"
                >
                  <div className="flex items-start gap-3">
                    <Badge
                      variant={
                        item.status === "action_required" ? "danger" : "warning"
                      }
                    >
                      {item.status === "action_required"
                        ? "Action Required"
                        : "Pending"}
                    </Badge>
                    <div>
                      <p className="font-medium text-sm text-slate-900">
                        {item.title}
                      </p>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {item.description}
                      </p>
                    </div>
                  </div>
                  {item.due_date && (
                    <div className="text-right flex-shrink-0 ml-4">
                      <p className="text-sm font-medium text-slate-700">
                        {format(new Date(item.due_date), "MMM d, yyyy")}
                      </p>
                      {daysLeft !== null && daysLeft >= 0 && (
                        <p className="text-xs text-gold-600">
                          {daysLeft} days left
                        </p>
                      )}
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
