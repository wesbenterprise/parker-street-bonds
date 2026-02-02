"use client";

import { mockDocuments, mockFamilies } from "@/lib/mock-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, Upload, Download } from "lucide-react";
import { format } from "date-fns";

export default function ApplicantDocumentsPage() {
  const family = mockFamilies[0];
  const documents = mockDocuments.filter((d) => d.family_id === family.id);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">My Documents</h2>
          <p className="text-slate-500 mt-1">
            View and upload documents related to your application.
          </p>
        </div>
        <Button variant="primary">
          <Upload size={16} className="mr-2" />
          Upload Document
        </Button>
      </div>

      {documents.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <FileText
              className="mx-auto text-slate-300 mb-4"
              size={48}
            />
            <p className="text-slate-500">No documents uploaded yet.</p>
            <p className="text-sm text-slate-400 mt-1">
              If Parker Street Ministries has requested documents from you,
              use the Upload button above.
            </p>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Uploaded Documents</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {documents.map((doc) => (
                <div
                  key={doc.id}
                  className="flex items-center justify-between py-3 border-b border-slate-100 last:border-0"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary-50 flex items-center justify-center">
                      <FileText className="text-primary-600" size={20} />
                    </div>
                    <div>
                      <p className="font-medium text-sm text-slate-900">
                        {doc.file_name}
                      </p>
                      <p className="text-xs text-slate-400">
                        Uploaded{" "}
                        {format(new Date(doc.created_at), "MMM d, yyyy")}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {doc.category && (
                      <Badge variant="info">{doc.category}</Badge>
                    )}
                    <Button variant="ghost" size="sm">
                      <Download size={14} />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
