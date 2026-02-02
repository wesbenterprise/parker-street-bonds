import { Card } from "./card";
import { cn } from "@/lib/utils";

export function StatCard({
  title,
  value,
  subtitle,
  icon,
  trend,
  className,
}: {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: React.ReactNode;
  trend?: { value: string; positive: boolean };
  className?: string;
}) {
  return (
    <Card className={cn("relative overflow-hidden", className)}>
      <div className="px-6 py-5">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500">{title}</p>
            <p className="mt-1 text-3xl font-bold text-slate-900">{value}</p>
            {subtitle && (
              <p className="mt-1 text-sm text-slate-500">{subtitle}</p>
            )}
            {trend && (
              <p
                className={cn(
                  "mt-1 text-sm font-medium",
                  trend.positive ? "text-primary-600" : "text-red-600"
                )}
              >
                {trend.value}
              </p>
            )}
          </div>
          {icon && (
            <div className="rounded-lg bg-primary-50 p-3 text-primary-600">
              {icon}
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
