import { cn } from "@/lib/utils";

export function ProgressBar({
  value,
  max = 100,
  label,
  showPercentage = true,
  color = "primary",
  className,
}: {
  value: number;
  max?: number;
  label?: string;
  showPercentage?: boolean;
  color?: "primary" | "gold";
  className?: string;
}) {
  const percentage = Math.min(100, Math.round((value / max) * 100));
  const colors = {
    primary: "bg-primary-500",
    gold: "bg-gold-400",
  };

  return (
    <div className={className}>
      {(label || showPercentage) && (
        <div className="flex justify-between mb-1">
          {label && <span className="text-sm text-slate-600">{label}</span>}
          {showPercentage && (
            <span className="text-sm font-medium text-slate-700">
              {percentage}%
            </span>
          )}
        </div>
      )}
      <div className="h-2.5 rounded-full bg-slate-100 overflow-hidden">
        <div
          className={cn("h-full rounded-full transition-all duration-500", colors[color])}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
