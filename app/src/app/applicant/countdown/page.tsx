"use client";

import { mockChildren, mockFamilies } from "@/lib/mock-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CountdownDisplay } from "@/components/ui/countdown-display";
import { Clock } from "lucide-react";

export default function CountdownPage() {
  const family = mockFamilies[0];
  const children = mockChildren.filter((c) => c.family_id === family.id);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Account Countdown</h2>
        <p className="text-slate-500 mt-1">
          See when your children&apos;s Trump Account funds become accessible.
          The growth period ends on January 1 of the year the child turns 18.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {children.map((child) => (
          <Card key={child.id}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="text-primary-600" size={18} />
                {child.first_name} {child.last_name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CountdownDisplay
                dob={child.dob}
                childName={child.first_name}
              />
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-gold-50 border-gold-200">
        <CardContent className="py-6">
          <h3 className="font-semibold text-slate-900 mb-2">
            What happens when the countdown ends?
          </h3>
          <p className="text-sm text-slate-700">
            When the growth period ends (January 1 of the year the child turns
            18), the Trump Account converts to a standard traditional IRA under
            §408(a). At that point, the account holder has full access to the
            funds and can make withdrawals, change investments, or continue
            growing the account.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
