"use client";

import { useState } from "react";
import { mockChildren, mockFamilies, mockContributions } from "@/lib/mock-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { StatusStepper } from "@/components/ui/status-stepper";
import { CountdownDisplay } from "@/components/ui/countdown-display";
import { ProgressBar } from "@/components/ui/progress-bar";
import { formatCurrency, calculateCountdown } from "@/lib/utils";
import {
  ENROLLMENT_STATUS_LABELS,
  ENROLLMENT_STATUS_ORDER,
  EnrollmentStatus,
} from "@/types";
import {
  Users,
  Plus,
  Search,
  Filter,
  ChevronDown,
  ChevronUp,
  Calendar,
  DollarSign,
} from "lucide-react";
import { format } from "date-fns";

export default function ChildrenPage() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<EnrollmentStatus | "all">(
    "all"
  );
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = mockChildren.filter((child) => {
    if (statusFilter !== "all" && child.enrollment_status !== statusFilter)
      return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        child.first_name.toLowerCase().includes(q) ||
        child.last_name.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">
            Enrollment Manager
          </h2>
          <p className="text-slate-500 mt-1">
            {mockChildren.length} children across{" "}
            {mockFamilies.length} families
          </p>
        </div>
        <Button variant="primary">
          <Plus size={16} className="mr-2" />
          Add Child
        </Button>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="text"
            placeholder="Search by name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter size={16} className="text-slate-400" />
          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value as EnrollmentStatus | "all")
            }
            className="px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="all">All Statuses</option>
            {ENROLLMENT_STATUS_ORDER.map((status) => (
              <option key={status} value={status}>
                {ENROLLMENT_STATUS_LABELS[status]}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Children List */}
      <div className="space-y-3">
        {filtered.map((child) => {
          const family = mockFamilies.find((f) => f.id === child.family_id);
          const contributions = mockContributions.filter(
            (c) => c.child_id === child.id
          );
          const totalContributed = contributions.reduce(
            (sum, c) => sum + c.amount,
            0
          );
          const isExpanded = expandedId === child.id;
          const countdown = calculateCountdown(child.dob);

          const statusVariant =
            child.enrollment_status === "contributions_active"
              ? "success"
              : child.enrollment_status === "account_opened"
              ? "info"
              : child.enrollment_status === "identified" ||
                child.enrollment_status === "invited"
              ? "warning"
              : "default";

          return (
            <Card key={child.id}>
              <button
                onClick={() =>
                  setExpandedId(isExpanded ? null : child.id)
                }
                className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-slate-50 transition-colors rounded-xl"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center font-semibold text-sm">
                    {child.first_name[0]}
                    {child.last_name[0]}
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">
                      {child.first_name} {child.last_name}
                    </p>
                    <p className="text-xs text-slate-500">
                      {family?.name} &middot; Cohort {child.cohort_year}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-sm font-medium text-slate-700">
                      {formatCurrency(totalContributed)}
                    </p>
                    <p className="text-xs text-slate-400">contributed</p>
                  </div>
                  <Badge variant={statusVariant}>
                    {ENROLLMENT_STATUS_LABELS[child.enrollment_status]}
                  </Badge>
                  {!countdown.isPast && (
                    <span className="text-xs text-slate-400 min-w-[60px] text-right">
                      {countdown.years}y {countdown.months}m
                    </span>
                  )}
                  {isExpanded ? (
                    <ChevronUp size={16} className="text-slate-400" />
                  ) : (
                    <ChevronDown size={16} className="text-slate-400" />
                  )}
                </div>
              </button>

              {isExpanded && (
                <CardContent className="border-t border-slate-100 space-y-6">
                  <StatusStepper currentStatus={child.enrollment_status} />

                  <div className="grid grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-slate-500">Date of Birth</p>
                      <p className="font-medium">
                        {format(new Date(child.dob), "MMMM d, yyyy")}
                      </p>
                    </div>
                    <div>
                      <p className="text-slate-500">SSN (last 4)</p>
                      <p className="font-medium">
                        •••• {child.ssn_last4 || "—"}
                      </p>
                    </div>
                    <div>
                      <p className="text-slate-500">Form 4547</p>
                      <p className="font-medium">
                        {child.form_4547_filed_at
                          ? format(
                              new Date(child.form_4547_filed_at),
                              "MMM d, yyyy"
                            )
                          : "Not filed"}
                      </p>
                    </div>
                    <div>
                      <p className="text-slate-500">Account Opened</p>
                      <p className="font-medium">
                        {child.account_opened_at
                          ? format(
                              new Date(child.account_opened_at),
                              "MMM d, yyyy"
                            )
                          : "Not yet"}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-sm font-medium text-slate-700">
                          Annual Contributions
                        </p>
                        <p className="text-sm text-slate-500">
                          {formatCurrency(totalContributed)} / {formatCurrency(5000)}
                        </p>
                      </div>
                      <ProgressBar
                        value={totalContributed}
                        max={5000}
                        color="gold"
                        showPercentage={false}
                      />
                    </div>
                    <div className="bg-slate-50 rounded-lg p-4">
                      <CountdownDisplay
                        dob={child.dob}
                        childName={child.first_name}
                        className="scale-75 origin-center"
                      />
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      Edit Details
                    </Button>
                    <Button variant="outline" size="sm">
                      <DollarSign size={14} className="mr-1" />
                      Record Contribution
                    </Button>
                    <Button variant="outline" size="sm">
                      <Calendar size={14} className="mr-1" />
                      Update Status
                    </Button>
                  </div>
                </CardContent>
              )}
            </Card>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 text-slate-400">
          <Users className="mx-auto mb-3" size={40} />
          <p>No children match your filters.</p>
        </div>
      )}
    </div>
  );
}
