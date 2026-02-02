"use client";

import { calculateCountdown } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { Clock, PartyPopper } from "lucide-react";
import { format } from "date-fns";

export function CountdownDisplay({
  dob,
  childName,
  className,
}: {
  dob: string;
  childName: string;
  className?: string;
}) {
  const { years, months, accessDate, isPast } = calculateCountdown(dob);

  if (isPast) {
    return (
      <div className={cn("text-center", className)}>
        <PartyPopper className="mx-auto text-gold-500 mb-2" size={48} />
        <p className="text-lg font-semibold text-primary-700">
          {childName}&apos;s funds are accessible!
        </p>
        <p className="text-sm text-slate-500">
          Growth period ended {format(accessDate, "MMMM d, yyyy")}
        </p>
      </div>
    );
  }

  return (
    <div className={cn("text-center", className)}>
      <Clock className="mx-auto text-primary-600 mb-3" size={40} />
      <p className="text-sm text-slate-500 mb-2">
        {childName}&apos;s funds become accessible
      </p>
      <div className="flex items-center justify-center gap-4">
        <div className="text-center">
          <p className="text-4xl font-bold text-primary-700">{years}</p>
          <p className="text-xs text-slate-500 uppercase tracking-wider">
            {years === 1 ? "Year" : "Years"}
          </p>
        </div>
        <div className="text-2xl text-slate-300 font-light">:</div>
        <div className="text-center">
          <p className="text-4xl font-bold text-gold-500">{months}</p>
          <p className="text-xs text-slate-500 uppercase tracking-wider">
            {months === 1 ? "Month" : "Months"}
          </p>
        </div>
      </div>
      <p className="mt-3 text-sm text-slate-400">
        Access date: {format(accessDate, "MMMM d, yyyy")}
      </p>
    </div>
  );
}
