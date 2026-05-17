import { createFileRoute } from "@tanstack/react-router";
import { MobileShell } from "@/components/mobile/MobileShell";
import { parentTabs } from "@/components/mobile/parent-tabs";
import { EmptyState } from "@/components/cards/EmptyState";
import { PermissionNotice } from "@/components/cards/PermissionNotice";
import { useT } from "@/lib/i18n";
import { Smile, AlertCircle, Activity, Heart } from "lucide-react";

export const Route = createFileRoute("/parent/wellbeing")({
  component: WellbeingPage,
});

function WellbeingPage() {
  const t = useT();
  const indicators = [
    { Icon: Smile, label: t("pw.mood"), value: "—", color: "text-partial" },
    { Icon: Activity, label: t("pw.stress"), value: "—", color: "text-primary" },
    { Icon: AlertCircle, label: t("pw.risk"), value: t("pw.riskLow"), color: "text-mastered" },
  ];

  return (
    <MobileShell title={t("pw.title")} tabs={parentTabs}>
      <div className="grid grid-cols-3 gap-2.5">
        {indicators.map(({ Icon, label, value, color }) => (
          <div key={label} className="rounded-2xl border border-border/50 bg-card p-3.5 text-center shadow-sm">
            <Icon className={`mx-auto h-5 w-5 ${color} opacity-60`} />
            <p className="mt-2 text-xl font-bold">{value}</p>
            <p className="mt-0.5 text-[10px] text-muted-foreground/50">{label}</p>
          </div>
        ))}
      </div>

      <div className="mt-4">
        <EmptyState icon={<Heart className="h-8 w-8 text-muted-foreground/20" />} title={t("pw.empty.title")} desc={t("pw.empty.desc")} />
      </div>

      <div className="mt-4">
        <PermissionNotice text={t("pw.permission")} />
      </div>
    </MobileShell>
  );
}
