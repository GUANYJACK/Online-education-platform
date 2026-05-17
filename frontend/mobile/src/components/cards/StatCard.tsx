import { ReactNode } from "react";

export function StatCard({
  label,
  value,
  unit,
  icon,
  tint = "primary",
}: {
  label: string;
  value: string | number;
  unit?: string;
  icon?: ReactNode;
  tint?: "primary" | "mastered" | "partial" | "weak";
}) {
  const tintMap = {
    primary: "bg-primary-soft/70 text-primary",
    mastered: "bg-mastered-soft/70 text-mastered",
    partial: "bg-partial-soft/70 text-partial",
    weak: "bg-weak-soft/70 text-weak",
  } as const;
  return (
    <div className="rounded-2xl border border-border/50 bg-card p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <span className="text-[11px] text-muted-foreground/60">{label}</span>
        {icon && <span className={`flex h-8 w-8 items-center justify-center rounded-xl ${tintMap[tint]}`}>{icon}</span>}
      </div>
      <div className="mt-2.5 flex items-baseline gap-1">
        <span className="text-2xl font-bold tracking-tight">{value}</span>
        {unit && <span className="text-xs text-muted-foreground/50">{unit}</span>}
      </div>
    </div>
  );
}
