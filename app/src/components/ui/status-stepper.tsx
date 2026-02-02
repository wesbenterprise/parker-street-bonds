"use client";

import { cn } from "@/lib/utils";
import { EnrollmentStatus, ENROLLMENT_STATUS_LABELS, ENROLLMENT_STATUS_ORDER } from "@/types";
import { Check } from "lucide-react";

export function StatusStepper({
  currentStatus,
  className,
}: {
  currentStatus: EnrollmentStatus;
  className?: string;
}) {
  const currentIndex = ENROLLMENT_STATUS_ORDER.indexOf(currentStatus);

  return (
    <div className={cn("flex items-center gap-1", className)}>
      {ENROLLMENT_STATUS_ORDER.map((status, index) => {
        const isCompleted = index < currentIndex;
        const isCurrent = index === currentIndex;

        return (
          <div key={status} className="flex items-center gap-1">
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium border-2 transition-colors",
                  isCompleted && "bg-primary-600 border-primary-600 text-white",
                  isCurrent && "bg-gold-400 border-gold-400 text-white",
                  !isCompleted && !isCurrent && "bg-white border-slate-300 text-slate-400"
                )}
              >
                {isCompleted ? <Check size={14} /> : index + 1}
              </div>
              <span
                className={cn(
                  "text-[10px] mt-1 text-center max-w-[72px] leading-tight",
                  isCurrent ? "text-gold-700 font-semibold" : "text-slate-400"
                )}
              >
                {ENROLLMENT_STATUS_LABELS[status]}
              </span>
            </div>
            {index < ENROLLMENT_STATUS_ORDER.length - 1 && (
              <div
                className={cn(
                  "h-0.5 w-6 mb-5",
                  isCompleted ? "bg-primary-500" : "bg-slate-200"
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
