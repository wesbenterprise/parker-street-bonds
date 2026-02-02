"use client";

import { mockDocuments, mockChildren, mockFamilies } from "@/lib/mock-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, Upload, Download, Search, Folder } from "lucide-react";
import { format } from "date-fns";
import { useState } from "react";

export default function DocumentsPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = mockDocuments.filter((doc) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      doc.file_name.toLowerCase().includes(q) ||
      (doc.category || "").toLowerCase().includes(q)
    );
  });

  // Group by category
  const categories = [...new Set(mockDocuments.map((d) => d.category || "Uncategorized"))];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">
            Document Management
          </h2>
          <p className="text-slate-500 mt-1">
            Store and manage compliance documents, Form 4547s, and other files
          </p>
        </div>
        <Button variant="primary">
          <Upload size={16} className="mr-2" />
          Upload Document
        </Button>
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
        />
        <input
          type="text"
          placeholder="Search documents..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-9 pr-4 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
      </div>

      {/* Category Overview */}
      <div className="grid grid-cols-4 gap-4">
        {categories.map((cat) => {
          const count = mockDocuments.filter(
            (d) => (d.category || "Uncategorized") === cat
          ).length;
          return (
            <Card key={cat}>
              <CardContent className="py-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary-50 text-primary-600 flex items-center justify-center">
                  <Folder size={20} />
                </div>
                <div>
                  <p className="font-semibold text-sm text-slate-900">{cat}</p>
                  <p className="text-xs text-slate-400">
                    {count} {count === 1 ? "document" : "documents"}
                  </p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Document List */}
      <Card>
        <CardHeader>
          <CardTitle>All Documents ({filtered.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {filtered.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="mx-auto text-slate-300 mb-3" size={40} />
              <p className="text-slate-500">No documents found.</p>
            </div>
          ) : (
            <div className="border border-slate-200 rounded-lg overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="text-left px-4 py-3 text-slate-500 font-medium">
                      Document
                    </th>
                    <th className="text-left px-4 py-3 text-slate-500 font-medium">
                      Category
                    </th>
                    <th className="text-left px-4 py-3 text-slate-500 font-medium">
                      Child / Family
                    </th>
                    <th className="text-left px-4 py-3 text-slate-500 font-medium">
                      Uploaded
                    </th>
                    <th className="text-left px-4 py-3 text-slate-500 font-medium">
                      By
                    </th>
                    <th className="px-4 py-3"></th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((doc) => {
                    const child = doc.child_id
                      ? mockChildren.find((c) => c.id === doc.child_id)
                      : null;
                    const family = doc.family_id
                      ? mockFamilies.find((f) => f.id === doc.family_id)
                      : null;

                    return (
                      <tr
                        key={doc.id}
                        className="border-t border-slate-100 hover:bg-slate-50"
                      >
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <FileText
                              size={16}
                              className="text-primary-500 flex-shrink-0"
                            />
                            <span className="font-medium">{doc.file_name}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          {doc.category ? (
                            <Badge variant="info">{doc.category}</Badge>
                          ) : (
                            <span className="text-slate-400">—</span>
                          )}
                        </td>
                        <td className="px-4 py-3 text-slate-500">
                          {child
                            ? `${child.first_name} ${child.last_name}`
                            : family
                            ? family.name
                            : "—"}
                        </td>
                        <td className="px-4 py-3 text-slate-500">
                          {format(new Date(doc.created_at), "MMM d, yyyy")}
                        </td>
                        <td className="px-4 py-3 text-slate-400">
                          {doc.uploaded_by || "—"}
                        </td>
                        <td className="px-4 py-3">
                          <Button variant="ghost" size="sm">
                            <Download size={14} />
                          </Button>
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
