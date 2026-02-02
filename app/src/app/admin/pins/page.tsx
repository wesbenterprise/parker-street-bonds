"use client";

import { useState } from "react";
import { mockFamilies, mockChildren } from "@/lib/mock-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { generatePin } from "@/lib/utils";
import { KeyRound, Plus, Copy, Check, Users } from "lucide-react";

export default function PinsPage() {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [newLastName, setNewLastName] = useState("");
  const [generatedPin, setGeneratedPin] = useState<string | null>(null);

  function handleCopy(pin: string, familyId: string) {
    navigator.clipboard.writeText(pin);
    setCopiedId(familyId);
    setTimeout(() => setCopiedId(null), 2000);
  }

  function handleGenerate() {
    if (newLastName.trim()) {
      setGeneratedPin(generatePin(newLastName.trim()));
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">
            PIN Management
          </h2>
          <p className="text-slate-500 mt-1">
            Generate and manage PINs for hand-selected applicants. Format: 1
            letter (from last name) + 6 digits.
          </p>
        </div>
      </div>

      {/* PIN Generator */}
      <Card className="border-gold-200 bg-gold-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <KeyRound className="text-gold-600" size={18} />
            Generate New PIN
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-end gap-4">
            <div className="flex-1 max-w-xs">
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Family Last Name
              </label>
              <input
                type="text"
                value={newLastName}
                onChange={(e) => {
                  setNewLastName(e.target.value);
                  setGeneratedPin(null);
                }}
                placeholder="e.g. Johnson"
                className="w-full px-4 py-2 rounded-lg border border-gold-300 text-sm focus:outline-none focus:ring-2 focus:ring-gold-500 bg-white"
              />
            </div>
            <Button variant="gold" onClick={handleGenerate}>
              Generate PIN
            </Button>
          </div>

          {generatedPin && (
            <div className="mt-4 p-4 bg-white rounded-lg border border-gold-200 flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">Generated PIN:</p>
                <p className="text-3xl font-mono font-bold text-primary-700 tracking-widest mt-1">
                  {generatedPin}
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  navigator.clipboard.writeText(generatedPin);
                }}
              >
                <Copy size={14} className="mr-1" />
                Copy
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Existing PINs */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="text-primary-600" size={18} />
            Assigned PINs ({mockFamilies.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border border-slate-200 rounded-lg overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-slate-50">
                <tr>
                  <th className="text-left px-4 py-3 text-slate-500 font-medium">
                    Family
                  </th>
                  <th className="text-left px-4 py-3 text-slate-500 font-medium">
                    PIN
                  </th>
                  <th className="text-left px-4 py-3 text-slate-500 font-medium">
                    Children
                  </th>
                  <th className="text-left px-4 py-3 text-slate-500 font-medium">
                    Email
                  </th>
                  <th className="text-left px-4 py-3 text-slate-500 font-medium">
                    Status
                  </th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {mockFamilies.map((family) => {
                  const familyChildren = mockChildren.filter(
                    (c) => c.family_id === family.id
                  );
                  const hasActiveApp = familyChildren.some(
                    (c) =>
                      c.enrollment_status !== "identified" &&
                      c.enrollment_status !== "invited"
                  );

                  return (
                    <tr
                      key={family.id}
                      className="border-t border-slate-100 hover:bg-slate-50"
                    >
                      <td className="px-4 py-3 font-medium">{family.name}</td>
                      <td className="px-4 py-3">
                        <code className="bg-slate-100 px-2 py-1 rounded text-sm font-mono font-bold text-primary-700">
                          {family.pin}
                        </code>
                      </td>
                      <td className="px-4 py-3 text-slate-500">
                        {familyChildren.length}{" "}
                        {familyChildren.length === 1 ? "child" : "children"}
                      </td>
                      <td className="px-4 py-3 text-slate-500">
                        {family.contact_email || "—"}
                      </td>
                      <td className="px-4 py-3">
                        <Badge variant={hasActiveApp ? "success" : "warning"}>
                          {hasActiveApp ? "Active" : "Pending"}
                        </Badge>
                      </td>
                      <td className="px-4 py-3">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleCopy(family.pin, family.id)}
                        >
                          {copiedId === family.id ? (
                            <>
                              <Check size={14} className="mr-1 text-primary-600" />
                              Copied
                            </>
                          ) : (
                            <>
                              <Copy size={14} className="mr-1" />
                              Copy
                            </>
                          )}
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
