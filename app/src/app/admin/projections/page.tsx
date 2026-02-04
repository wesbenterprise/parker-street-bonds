"use client";

import { useState } from "react";
import { mockProjections } from "@/lib/mock-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatCard } from "@/components/ui/stat-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";
import { Projection } from "@/types";
import {
  LineChart,
  Plus,
  Calculator,
  Users,
  DollarSign,
  Pencil,
  Trash2,
  RotateCcw,
  Save,
  X,
  Clock,
} from "lucide-react";

type EditingProjection = {
  id?: string;
  name: string;
  cohort_year: number;
  cohort_size: number;
  contribution_per_child: number;
  default_funding_age: number;
  notes: string;
};

export default function ProjectionsPage() {
  const [projections, setProjections] = useState<Projection[]>(mockProjections);
  const [editing, setEditing] = useState<EditingProjection | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showDeleted, setShowDeleted] = useState(false);

  const activeProjections = projections
    .filter((p) => !p.deleted)
    .sort((a, b) => a.cohort_year - b.cohort_year);

  const deletedProjections = projections.filter((p) => p.deleted);

  function handleAdd() {
    const nextYear = activeProjections.length > 0
      ? Math.max(...activeProjections.map((p) => p.cohort_year)) + 1
      : new Date().getFullYear();
    setEditingId(null);
    setEditing({
      name: `Year ${activeProjections.length + 1}`,
      cohort_year: nextYear,
      cohort_size: 20,
      contribution_per_child: 2500,
      default_funding_age: 10,
      notes: "",
    });
  }

  function handleEdit(proj: Projection) {
    setEditingId(proj.id);
    setEditing({
      id: proj.id,
      name: proj.name,
      cohort_year: proj.cohort_year,
      cohort_size: proj.cohort_size,
      contribution_per_child: proj.contribution_per_child,
      default_funding_age: proj.default_funding_age,
      notes: proj.notes || "",
    });
  }

  function handleSave() {
    if (!editing) return;
    if (editingId) {
      setProjections((prev) =>
        prev.map((p) =>
          p.id === editingId
            ? {
                ...p,
                name: editing.name,
                cohort_year: editing.cohort_year,
                cohort_size: editing.cohort_size,
                contribution_per_child: editing.contribution_per_child,
                default_funding_age: editing.default_funding_age,
                notes: editing.notes || null,
              }
            : p
        )
      );
    } else {
      const newProj: Projection = {
        id: `p-${Date.now()}`,
        name: editing.name,
        cohort_year: editing.cohort_year,
        cohort_size: editing.cohort_size,
        contribution_per_child: editing.contribution_per_child,
        default_funding_age: editing.default_funding_age,
        notes: editing.notes || null,
        deleted: false,
        created_at: new Date().toISOString(),
      };
      setProjections((prev) => [...prev, newProj]);
    }
    setEditing(null);
    setEditingId(null);
  }

  function handleDelete(id: string) {
    setProjections((prev) =>
      prev.map((p) => (p.id === id ? { ...p, deleted: true } : p))
    );
  }

  function handleRestore(id: string) {
    setProjections((prev) =>
      prev.map((p) => (p.id === id ? { ...p, deleted: false } : p))
    );
  }

  // Calculate cumulative projections with aging-out logic
  // Children age out after default_funding_age years of funding
  const cumulativeData = activeProjections.reduce<
    {
      year: number;
      newChildren: number;
      agedOut: number;
      activeChildren: number;
      perChild: number;
      fundingAge: number;
      annualCost: number;
      cumulativeCost: number;
      notes: string | null;
    }[]
  >((acc, proj) => {
    // Count children who aged out this year (enrolled default_funding_age years ago)
    let agedOut = 0;
    for (const prev of activeProjections) {
      if (proj.cohort_year - prev.cohort_year >= prev.default_funding_age) {
        // This cohort has aged out by this year — but only count the delta
        const agedOutYear = prev.cohort_year + prev.default_funding_age;
        if (agedOutYear === proj.cohort_year) {
          agedOut += prev.cohort_size;
        }
      }
    }

    // Active children = all enrolled who haven't aged out
    let activeChildren = 0;
    for (const prev of activeProjections) {
      if (
        prev.cohort_year <= proj.cohort_year &&
        proj.cohort_year - prev.cohort_year < prev.default_funding_age
      ) {
        activeChildren += prev.cohort_size;
      }
    }

    const prevCumulative =
      acc.length > 0 ? acc[acc.length - 1].cumulativeCost : 0;
    const annualCost = activeChildren * proj.contribution_per_child;

    acc.push({
      year: proj.cohort_year,
      newChildren: proj.cohort_size,
      agedOut,
      activeChildren,
      perChild: proj.contribution_per_child,
      fundingAge: proj.default_funding_age,
      annualCost,
      cumulativeCost: prevCumulative + annualCost,
      notes: proj.notes,
    });
    return acc;
  }, []);

  const totalProjectedChildren =
    cumulativeData.length > 0
      ? cumulativeData[cumulativeData.length - 1].activeChildren
      : 0;
  const totalProjectedCost =
    cumulativeData.length > 0
      ? cumulativeData[cumulativeData.length - 1].cumulativeCost
      : 0;
  const peakAnnualCost =
    cumulativeData.length > 0
      ? Math.max(...cumulativeData.map((d) => d.annualCost))
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
            1 each year. Children age out after the configured funding period.
          </p>
        </div>
        <div className="flex gap-2">
          {deletedProjections.length > 0 && (
            <Button
              variant="outline"
              onClick={() => setShowDeleted(!showDeleted)}
            >
              <Trash2 size={16} className="mr-2" />
              Deleted ({deletedProjections.length})
            </Button>
          )}
          <Button variant="primary" onClick={handleAdd}>
            <Plus size={16} className="mr-2" />
            Add Projection
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <StatCard
          title="Active Children (Final Year)"
          value={totalProjectedChildren}
          subtitle={`Across ${activeProjections.length} cohorts`}
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
          subtitle={`Over ${activeProjections.length} years`}
          icon={<Calculator size={24} />}
        />
      </div>

      {/* Edit/Add Form */}
      {editing && (
        <Card className="border-primary-200 bg-primary-50 animate-scale-in">
          <CardHeader>
            <CardTitle>
              {editingId ? "Edit Projection" : "Add New Projection"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    value={editing.name}
                    onChange={(e) =>
                      setEditing({ ...editing, name: e.target.value })
                    }
                    className="w-full px-4 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Cohort Year
                  </label>
                  <input
                    type="number"
                    value={editing.cohort_year}
                    onChange={(e) =>
                      setEditing({
                        ...editing,
                        cohort_year: parseInt(e.target.value) || 2026,
                      })
                    }
                    className="w-full px-4 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
                  />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    New Children
                  </label>
                  <input
                    type="number"
                    value={editing.cohort_size}
                    onChange={(e) =>
                      setEditing({
                        ...editing,
                        cohort_size: parseInt(e.target.value) || 0,
                      })
                    }
                    min={0}
                    className="w-full px-4 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Contribution Per Child ($)
                  </label>
                  <input
                    type="number"
                    value={editing.contribution_per_child}
                    onChange={(e) =>
                      setEditing({
                        ...editing,
                        contribution_per_child:
                          parseInt(e.target.value) || 0,
                      })
                    }
                    min={0}
                    step={100}
                    className="w-full px-4 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Funding Duration (years)
                  </label>
                  <input
                    type="number"
                    value={editing.default_funding_age}
                    onChange={(e) =>
                      setEditing({
                        ...editing,
                        default_funding_age:
                          parseInt(e.target.value) || 10,
                      })
                    }
                    min={1}
                    max={18}
                    className="w-full px-4 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Notes
                </label>
                <input
                  type="text"
                  value={editing.notes}
                  onChange={(e) =>
                    setEditing({ ...editing, notes: e.target.value })
                  }
                  placeholder="Optional notes..."
                  className="w-full px-4 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
                />
              </div>
              <div className="flex gap-2">
                <Button variant="primary" onClick={handleSave}>
                  <Save size={16} className="mr-2" />
                  {editingId ? "Save Changes" : "Add Projection"}
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => {
                    setEditing(null);
                    setEditingId(null);
                  }}
                >
                  <X size={16} className="mr-2" />
                  Cancel
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Deleted Projections */}
      {showDeleted && deletedProjections.length > 0 && (
        <Card className="border-red-200 bg-red-50 animate-slide-down">
          <CardHeader>
            <CardTitle className="text-red-800">
              Deleted Projections ({deletedProjections.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {deletedProjections.map((proj) => (
                <div
                  key={proj.id}
                  className="flex items-center justify-between bg-white rounded-lg px-4 py-3 border border-red-100"
                >
                  <div>
                    <span className="text-sm text-slate-600 line-through">
                      {proj.name}
                    </span>
                    <span className="text-xs text-slate-400 ml-2">
                      ({proj.cohort_year})
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRestore(proj.id)}
                  >
                    <RotateCcw size={14} className="mr-1" />
                    Restore
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Cohort Cards */}
      <div className="grid grid-cols-1 gap-3">
        {activeProjections.map((proj) => (
          <Card
            key={proj.id}
            className="hover:shadow-md transition-all duration-200"
          >
            <CardContent className="py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Badge variant="info">{proj.cohort_year}</Badge>
                  <div>
                    <p className="font-semibold text-slate-900">{proj.name}</p>
                    {proj.notes && (
                      <p className="text-xs text-slate-400 mt-0.5">
                        {proj.notes}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <p className="text-sm text-slate-500">
                      <span className="font-semibold text-slate-900">
                        {proj.cohort_size}
                      </span>{" "}
                      children
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-slate-500">
                      <span className="font-semibold text-primary-700">
                        {formatCurrency(proj.contribution_per_child)}
                      </span>
                      /child
                    </p>
                  </div>
                  <div className="text-right flex items-center gap-1">
                    <Clock size={12} className="text-slate-400" />
                    <p className="text-sm text-slate-500">
                      {proj.default_funding_age} yrs
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEdit(proj)}
                    >
                      <Pencil size={14} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(proj.id)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 size={14} />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
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
                    Year
                  </th>
                  <th className="text-right px-4 py-3 text-slate-500 font-medium">
                    New
                  </th>
                  <th className="text-right px-4 py-3 text-slate-500 font-medium">
                    Aged Out
                  </th>
                  <th className="text-right px-4 py-3 text-slate-500 font-medium">
                    Active
                  </th>
                  <th className="text-right px-4 py-3 text-slate-500 font-medium">
                    Per Child
                  </th>
                  <th className="text-right px-4 py-3 text-slate-500 font-medium">
                    Funding Yrs
                  </th>
                  <th className="text-right px-4 py-3 text-slate-500 font-medium">
                    Annual Budget
                  </th>
                  <th className="text-right px-4 py-3 text-slate-500 font-medium">
                    Cumulative
                  </th>
                </tr>
              </thead>
              <tbody>
                {cumulativeData.map((row) => (
                  <tr
                    key={row.year}
                    className="border-t border-slate-100 hover:bg-slate-50 transition-colors"
                  >
                    <td className="px-4 py-3">
                      <Badge variant="info">{row.year}</Badge>
                    </td>
                    <td className="px-4 py-3 text-right text-primary-600 font-medium">
                      +{row.newChildren}
                    </td>
                    <td className="px-4 py-3 text-right text-red-500">
                      {row.agedOut > 0 ? `-${row.agedOut}` : "—"}
                    </td>
                    <td className="px-4 py-3 text-right font-bold text-slate-900">
                      {row.activeChildren}
                    </td>
                    <td className="px-4 py-3 text-right text-slate-500">
                      {formatCurrency(row.perChild)}
                    </td>
                    <td className="px-4 py-3 text-right text-slate-400">
                      {row.fundingAge}
                    </td>
                    <td className="px-4 py-3 text-right font-bold text-primary-700">
                      {formatCurrency(row.annualCost)}
                    </td>
                    <td className="px-4 py-3 text-right text-slate-500">
                      {formatCurrency(row.cumulativeCost)}
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
            {cumulativeData.map((row, i) => (
              <div
                key={row.year}
                className="flex items-center gap-4 animate-fade-in-up"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <span className="text-sm font-medium text-slate-700 w-12">
                  {row.year}
                </span>
                <div className="flex-1 h-10 bg-slate-100 rounded-lg overflow-hidden relative">
                  <div
                    className="h-full bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg transition-all duration-700 ease-out flex items-center justify-end pr-3"
                    style={{
                      width: `${peakAnnualCost > 0 ? (row.annualCost / peakAnnualCost) * 100 : 0}%`,
                    }}
                  >
                    <span className="text-xs font-bold text-white drop-shadow-sm">
                      {formatCurrency(row.annualCost)}
                    </span>
                  </div>
                </div>
                <div className="text-right w-32">
                  <span className="text-xs font-medium text-slate-600">
                    {row.activeChildren} children
                  </span>
                  {row.agedOut > 0 && (
                    <span className="text-xs text-red-400 ml-1">
                      (-{row.agedOut})
                    </span>
                  )}
                </div>
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
            (per program launch date). Children age out after the configured
            funding duration (default: 10 years). Annual contribution amounts
            may be adjusted based on Treasury regulations and inflation indexing
            after 2027.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
