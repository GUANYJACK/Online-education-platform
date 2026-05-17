import { ShieldCheck } from "lucide-react";

export function PermissionNotice({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-2.5 rounded-2xl border border-border/40 bg-accent/40 px-3.5 py-2.5 text-[12px] text-accent-foreground/80 leading-relaxed">
      <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 opacity-60" />
      <span>{text}</span>
    </div>
  );
}
