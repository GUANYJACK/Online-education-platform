import { createFileRoute } from "@tanstack/react-router";
import { MobileShell } from "@/components/mobile/MobileShell";
import { parentTabs } from "@/components/mobile/parent-tabs";
import { subjects as mockSubjects } from "@/lib/mock-data";
import { useCurriculum } from "@/lib/useCurriculum";
import { PermissionNotice } from "@/components/cards/PermissionNotice";
import { useT } from "@/lib/i18n";
import { useAppStore } from "@/lib/store";
import { BookOpen } from "lucide-react";

export const Route = createFileRoute("/parent/subjects")({
  component: ParentSubjects,
});

function ParentSubjects() {
  const boundChildId = useAppStore((s) => s.boundChildId);
  const t = useT();

  const { data: apiSubjects } = useCurriculum(boundChildId);
  const subjects = (apiSubjects && apiSubjects.length > 0) ? apiSubjects : mockSubjects;

  return (
    <MobileShell title={t("ps.title")} tabs={parentTabs}>
      <div className="space-y-3 stagger-children">
        {subjects.map((s) => {
          const total = s.chapters.reduce((a, c) => a + c.points.length, 0);
          const mastered = s.chapters.reduce((a, c) => a + c.points.filter((p) => p.mastery === "mastered").length, 0);
          const partial = s.chapters.reduce((a, c) => a + c.points.filter((p) => p.mastery === "partial").length, 0);
          const weak = total - mastered - partial;
          const pct = total > 0 ? Math.round((mastered / total) * 100) : 0;
          return (
            <div key={s.id} className="rounded-2xl border border-border/50 bg-card p-4 shadow-sm transition-all hover:shadow-md">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-soft/60 text-2xl">
                  {s.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold">{t(s.name)}</h3>
                  <div className="mt-0.5 flex items-center gap-1.5 text-xs text-muted-foreground/60">
                    <BookOpen className="h-3 w-3" />
                    <span>{t("ps.points", { n: total })}</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-primary">{pct}%</p>
                  <p className="text-[10px] text-muted-foreground/50">{t("ps.masteredLabel")}</p>
                </div>
              </div>
              {/* Stacked progress bar */}
              {total > 0 && (
                <>
                  <div className="mt-3 flex h-2 overflow-hidden rounded-full bg-muted/40">
                    <div className="bg-mastered transition-all duration-500" style={{ width: `${(mastered / total) * 100}%` }} />
                    <div className="bg-partial transition-all duration-500" style={{ width: `${(partial / total) * 100}%` }} />
                    <div className="bg-weak transition-all duration-500" style={{ width: `${(weak / total) * 100}%` }} />
                  </div>
                  {/* Legend */}
                  <div className="mt-2.5 flex justify-between text-[11px] text-muted-foreground/50">
                    <span className="flex items-center gap-1"><span className="inline-block h-2 w-2 rounded-full bg-mastered" />{t("ps.legend.mastered", { n: mastered })}</span>
                    <span className="flex items-center gap-1"><span className="inline-block h-2 w-2 rounded-full bg-partial" />{t("ps.legend.partial", { n: partial })}</span>
                    <span className="flex items-center gap-1"><span className="inline-block h-2 w-2 rounded-full bg-weak" />{t("ps.legend.weak", { n: weak })}</span>
                  </div>
                </>
              )}
            </div>
          );
        })}

        <PermissionNotice text={t("ps.permission")} />
      </div>
    </MobileShell>
  );
}
