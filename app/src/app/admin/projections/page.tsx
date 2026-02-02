"use client";

import { useState } from "react";
import { mockProjections, mockChildren } from "@/lib/mock-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatCard } from "@/components/ui/stat-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";
import { LineChart, Plus, Calculator, Users, DollarSign } from "lucide-react";

export default function ProjectionsPage() {
  const [projections, setProjections] = useState(mockProjections);

  // Calculate cumulative projections
  const cumulativeData = projections
    .sort((a, b) => a.cohort_year - b.cohort_year)
    .reduce<
      {
        year: number;
        newChildren: number;
        totalChildren: number;
        newCost: number;
        totalAnnualCost: number;
        cumulativeCost: number;
        notes: string | null;
      }[]
    >((acc, proj) => {
      const prevTotal = acc.length > 0 ? acc[acc.length - 1].totalChildren : 0;
      const prevAnnualCost =
        acc.length > 0 ? acc[acc.length - 1].totalAnnualCost : 0;
      const prevCumulative =
        acc.length > 0 ? acc[acc.length - 1].cumulativeCost : 0;

      const totalChildren = prevTotal + proj.cohort_size;
      const newCost = proj.cohort_size * proj.contribution_per_child;
      const totalAnnualCost =
        totalChildren * proj.contribution_per_child;
      const cumulativeCost = prevCumulative + totalAnnualCost;

      acc.push({
        year: proj.cohort_year,
        newChildren: proj.cohort_size,
        totalChildren,
        newCost,
        totalAnnualCost,
        cumulativeCost,
        notes: proj.notes,
      });
      return acc;
    }, []);

  const totalProjectedChildren =
    cumulativeData.length > 0
      ? cumulativeData[cumulativeData.length - 1].totalChildren
      : 0;
  const totalProjectedCost =
    cumulativeData.length > 0
      ? cumulativeData[cumulativeData.length - 1].cumulativeCost
      : 0;
  const peakAnnualCost =
    cumulativeData.length > 0
      ? Math.max(...cumulativeData.map((d) => d.totalAnnualCost))
      : 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">
            Projections Tool
          </h2>
          <p className="text-slate-500 mt-1">
            Model future cohorts and budget requirements. Cohorts start January
            1 each year.
          </p>
        </div>
        <Button variant="primary">
          <Plus size={16} className="mr-2" />
          Add Projection
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <StatCard
          title="Projected Total Children"
          value={totalProjectedChildren}
          subtitle={`Across ${projections.length} cohorts`}
          icon={<Users size={24} />}
        />
        <StatCard
          title="Peak Annual Cost"
          value={formatCurrency(peakAnnualCost)}
          subtitle="At full enrollment"
          icon={<DollarSign size={24} />}
        />
        <StatCard
          title="Cumulative Investment"
          value={formatCurrency(totalProjectedCost)}
          subtitle={`Over ${projections.length} years`}
          icon={<Calculator size={24} />}
        />
      </div>

      {/* Projection Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <LineChart className="text-primary-600" size={18} />
            Year-by-Year Projection
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border border-slate-200 rounded-lg overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-slate-50">
                <tr>
                  <th className="text-left px-4 py-3 text-slate-500 font-medium">
                    Cohort Year
                  </th>
                  <th className="text-right px-4 py-3 text-slate-500 font-medium">
                    New Children
                  </th>
                  <th className="text-right px-4 py-3 text-slate-500 font-medium">
                    Total Children
                  </th>
                  <th className="text-right px-4 py-3 text-slate-500 font-medium">
                    Per Child
                  </th>
                  <th className="text-right px-4 py-3 text-slate-500 font-medium">
                    Annual Budget
                  </th>
                  <th className="text-right px-4 py-3 text-slate-500 font-medium">
                    Cumulative
                  </th>
                  <th className="text-left px-4 py-3 text-slate-500 font-medium">
                    Notes
                  </th>
                </tr>
              </thead>
              <tbody>
                {cumulativeData.map((row) => (
                  <tr
                    key={row.year}
                    className="border-t border-slate-100 hover:bg-slate-50"
                  >
                    <td className="px-4 py-3">
                      <Badge variant="info">{row.year}</Badge>
                    </td>
                    <td className="px-4 py-3 text-right">
                      +{row.newChildren}
                    </td>
                    <td className="px-4 py-3 text-right font-medium">
                      {row.totalChildren}
                    </td>
                    <td className="px-4 py-3 text-right text-slate-500">
                      {formatCurrency(
                        projections.find((p) => p.cohort_year === row.year)
                          ?.contribution_per_child || 2500
                      )}
                    </td>
                    <td className="px-4 py-3 text-right font-bold text-primary-700">
                      {formatCurrency(row.totalAnnualCost)}
                    </td>
                    <td className="px-4 py-3 text-right text-slate-500">
                      {formatCurrency(row.cumulativeCost)}
                    </td>
                    <td className="px-4 py-3 text-slate-400 text-xs max-w-[200px] truncate">
                      {row.notes || "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Visual Bar Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Annual Budget Projection</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {cumulativeData.map((row) => (
              <div key={row.year} className="flex items-center gap-4">
                <span className="text-sm font-medium text-slate-700 w-12">
                  {row.year}
                </span>
                <div className="flex-1 h-8 bg-slate-100 rounded-lg overflow-hidden relative">
                  <div
                    className="h-full bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg transition-all duration-500 flex items-center justify-end pr-3"
                    style={{
                      width: `${
                        (row.totalAnnualCost / peakAnnualCost) * 100
                      }%`,
                    }}
                  >
                    <span className="text-xs font-medium text-white">
                      {formatCurrency(row.totalAnnualCost)}
                    </span>
                  </div>
                </div>
                <span className="text-xs text-slate-400 w-24 text-right">
                  {row.totalChildren} children
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gold-50 border-gold-200">
        <CardContent className="py-4">
          <p className="text-sm text-gold-800">
            <strong>Note:</strong> Projections assume cohorts begin January 1 of
            each year, with contributions starting July 4 for the first cohort
            (per program launch date). Annual contribution amounts may be
            adjusted based on Treasury regulations and inflation indexing after
            2027.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
