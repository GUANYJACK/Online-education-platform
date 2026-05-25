import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { MobileShell } from "@/components/mobile/MobileShell";
import { parentTabs } from "@/components/mobile/parent-tabs";
import { StatCard } from "@/components/cards/StatCard";
import { TrendChart } from "@/components/cards/TrendChart";
import { PermissionNotice } from "@/components/cards/PermissionNotice";
import { mockChildren, trendData } from "@/lib/mock-data";
import { useCurriculum } from "@/lib/useCurriculum";
import { useAppStore } from "@/lib/store";
import { useT } from "@/lib/i18n";
import { Target, Award, ChevronDown, Clock } from "lucide-react";

export const Route = createFileRoute("/parent/overview")({
  component: ParentOverview,
});

function ParentOverview() {
  const boundChildId = useAppStore((s) => s.boundChildId);
  const child = mockChildren.find((c) => c.id === boundChildId) ?? mockChildren[0];
  const navigate = useNavigate();
  const t = useT();

  const { data: apiSubjects } = useCurriculum(boundChildId);

  // Compute real stats from API data
  const subjects = apiSubjects ?? [];
  const allPoints = subjects.flatMap((s) => s.chapters.flatMap((c) => c.points));
  const totalPoints = allPoints.length;
  const masteredCount = allPoints.filter((p) => p.mastery === "mastered").length;
  const masteryPct = totalPoints > 0 ? Math.round((masteredCount / totalPoints) * 100) : 0;

  const acts = [
    { t: t("po.act1.t"), d: t("po.act1.d") },
    { t: t("po.act2.t"), d: t("po.act2.d") },
    { t: t("po.act3.t"), d: t("po.act3.d") },
  ];

  return (
    <MobileShell tabs={parentTabs} noPad>
      {/* Hero header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-mastered via-mastered/85 to-mastered/70 px-5 pb-10 pt-14 text-primary-foreground">
        <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/5" />
        <div className="pointer-events-none absolute -bottom-10 -left-6 h-24 w-24 rounded-full bg-white/5" />
        <div className="relative">
          <p className="text-xs font-medium text-white/50">{t("po.viewing")}</p>
          <div className="mt-1.5 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-xl backdrop-blur-sm">
              {child.avatar}
            </div>
            <div className="flex-1">
              <h1 className="text-xl font-bold">{t(`child.${child.id}.name`)}</h1>
              <p className="text-xs text-white/60">{t(`child.${child.id}.grade`)}</p>
            </div>
            <button
              onClick={() => navigate({ to: "/parent/children" })}
              className="flex items-center gap-1 rounded-full bg-white/15 px-3.5 py-1.5 text-xs font-medium backdrop-blur-sm transition-all hover:bg-white/25 active:scale-95"
            >
              {t("po.switch")} <ChevronDown className="h-3 w-3" />
            </button>
          </div>
        </div>
      </div>

      <div className="-mt-5 rounded-t-[28px] bg-background px-4 pb-4 pt-6">
        {/* Stats */}
        <div className="grid grid-cols-2 gap-2.5">
          <StatCard label={t("po.completion")} value={`${masteryPct}`} unit="%" icon={<Target className="h-3.5 w-3.5" />} tint="primary" />
          <StatCard label={t("po.mastery")} value={`${masteryPct}`} unit="%" icon={<Award className="h-3.5 w-3.5" />} tint="mastered" />
        </div>

        {/* Trend chart */}
        <div className="mt-4 rounded-2xl border border-border/50 bg-card p-4 shadow-sm">
          <div className="mb-3 flex items-center gap-2">
            <Clock className="h-4 w-4 text-primary/60" />
            <h3 className="text-sm font-bold">{t("po.trend7")}</h3>
          </div>
          <TrendChart data={trendData} />
        </div>

        {/* Permission notice */}
        <div className="mt-4">
          <PermissionNotice text={t("po.permission")} />
        </div>

        {/* Recent activity */}
        <div className="mt-4 rounded-2xl border border-border/50 bg-card p-4 shadow-sm">
          <h3 className="mb-3 text-sm font-bold">{t("po.recent")}</h3>
          <ul className="space-y-3">
            {acts.map((a) => (
              <li key={a.d} className="flex items-start gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/60" />
                <div>
                  <p className="text-sm text-foreground/90">{a.d}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground/50">{a.t}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </MobileShell>
  );
}
