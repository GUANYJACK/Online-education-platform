import { ReactNode } from "react";

export function EmptyState({
  icon,
  title,
  desc,
  action,
}: {
  icon?: ReactNode;
  title: string;
  desc?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border/40 bg-muted/15 px-6 py-12 text-center">
      {icon && <div className="mb-3 opacity-40">{icon}</div>}
      <p className="text-sm font-medium text-foreground/60">{title}</p>
      {desc && <p className="mt-1 text-xs text-muted-foreground/40">{desc}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
