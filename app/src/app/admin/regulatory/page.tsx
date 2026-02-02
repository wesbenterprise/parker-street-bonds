"use client";

import { mockRegulatoryItems } from "@/lib/mock-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus, Scale, Calendar, AlertTriangle, CheckCircle, Clock } from "lucide-react";
import { format, differenceInDays } from "date-fns";
import { RegulatoryStatus } from "@/types";

const statusConfig: Record<
  RegulatoryStatus,
  { label: string; variant: "warning" | "danger" | "success" | "info"; icon: typeof Clock }
> = {
  pending: { label: "Pending", variant: "warning", icon: Clock },
  in_progress: { label: "In Progress", variant: "info", icon: Calendar },
  resolved: { label: "Resolved", variant: "success", icon: CheckCircle },
  action_required: {
    label: "Action Required",
    variant: "danger",
    icon: AlertTriangle,
  },
};

export default function RegulatoryPage() {
  const sorted = [...mockRegulatoryItems].sort((a, b) => {
    const priority: Record<RegulatoryStatus, number> = {
      action_required: 0,
      pending: 1,
      in_progress: 2,
      resolved: 3,
    };
    return priority[a.status] - priority[b.status];
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">
            Regulatory Tracker
          </h2>
          <p className="text-slate-500 mt-1">
            Track regulatory milestones, deadlines, and compliance items
          </p>
        </div>
        <Button variant="primary">
          <Plus size={16} className="mr-2" />
          Add Item
        </Button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-4 gap-4">
        {(
          ["action_required", "pending", "in_progress", "resolved"] as const
        ).map((status) => {
          const count = mockRegulatoryItems.filter(
            (r) => r.status === status
          ).length;
          const config = statusConfig[status];
          return (
            <Card key={status}>
              <CardContent className="py-4 flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    status === "action_required"
                      ? "bg-red-50 text-red-600"
                      : status === "pending"
                      ? "bg-gold-50 text-gold-600"
                      : status === "in_progress"
                      ? "bg-blue-50 text-blue-600"
                      : "bg-primary-50 text-primary-600"
                  }`}
                >
                  <config.icon size={20} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-900">{count}</p>
                  <p className="text-xs text-slate-500">{config.label}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Items */}
      <div className="space-y-3">
        {sorted.map((item) => {
          const config = statusConfig[item.status];
          const daysLeft = item.due_date
            ? differenceInDays(new Date(item.due_date), new Date())
            : null;
          const isOverdue = daysLeft !== null && daysLeft < 0;

          return (
            <Card key={item.id}>
              <CardContent className="py-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div
                      className={`mt-0.5 w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                        item.status === "action_required"
                          ? "bg-red-50 text-red-600"
                          : item.status === "pending"
                          ? "bg-gold-50 text-gold-600"
                          : item.status === "in_progress"
                          ? "bg-blue-50 text-blue-600"
                          : "bg-primary-50 text-primary-600"
                      }`}
                    >
                      <config.icon size={16} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-semibold text-slate-900">
                          {item.title}
                        </p>
                        <Badge variant={config.variant}>{config.label}</Badge>
                      </div>
                      {item.description && (
                        <p className="text-sm text-slate-500 mt-1">
                          {item.description}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0 ml-6">
                    {item.due_date ? (
                      <>
                        <p className="text-sm font-medium text-slate-700">
                          {format(new Date(item.due_date), "MMM d, yyyy")}
                        </p>
                        {isOverdue ? (
                          <p className="text-xs text-red-600 font-medium">
                            {Math.abs(daysLeft!)} days overdue
                          </p>
                        ) : (
                          <p className="text-xs text-gold-600">
                            {daysLeft} days left
                          </p>
                        )}
                      </>
                    ) : (
                      <p className="text-sm text-slate-400">No deadline</p>
                    )}
                    <div className="mt-2 flex gap-1 justify-end">
                      <Button variant="ghost" size="sm">
                        Edit
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
