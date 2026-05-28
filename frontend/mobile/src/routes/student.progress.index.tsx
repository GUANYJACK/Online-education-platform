import { createFileRoute, Link } from "@tanstack/react-router";
import { MobileShell } from "@/components/mobile/MobileShell";
import { studentTabs } from "@/components/mobile/student-tabs";
import { subjects as mockSubjects, trendData } from "@/lib/mock-data";
import { useCurriculum, type Subject } from "@/lib/useCurriculum";
import { MasteryBadge } from "@/components/cards/MasteryBadge";
import { useT } from "@/lib/i18n";
import { useAppStore } from "@/lib/store";
import { BookOpen, TrendingUp, Clock, Award } from "lucide-react";

export const Route = createFileRoute("/student/progress/")({
  component: ProgressPage,
});

interface ProgressPoint {
  id: string;
  name: string;
  desc: string;
  mastery: "mastered" | "partial" | "weak";
  subjectId: string;
  subjectName: string;
  subjectEmoji: string;
  chapterId: string;
  chapterName: string;
}

function ProgressPage() {
  const userId = useAppStore((s) => s.userId);
  const t = useT();
  const { data: apiSubjects } = useCurriculum(userId);
  const subjects: Subject[] = (apiSubjects && apiSubjects.length > 0) ? apiSubjects : mockSubjects;

  const allPoints: ProgressPoint[] = subjects.flatMap((s) =>
    s.chapters.flatMap((c) =>
      c.points.map((p) => ({
        id: p.id,
        name: p.name,
        desc: p.desc,
        mastery: p.mastery,
        subjectId: s.id,
        subjectName: s.name,
        subjectEmoji: s.emoji,
        chapterId: c.id,
        chapterName: c.name,
      })),
    ),
  );

  const masteryOrder = { weak: 0, partial: 1, mastered: 2 };
  const recentPoints = [...allPoints].sort(
    (a, b) => masteryOrder[a.mastery] - masteryOrder[b.mastery],
  );

  const totalPoints = allPoints.length;
  const masteredCount = allPoints.filter((p) => p.mastery === "mastered").length;
  const totalMastery = totalPoints > 0 ? Math.round((masteredCount / totalPoints) * 100) : 0;

  const subjectOrder = subjects.map((s) => s.id);
  const groupedBySubject = recentPoints.reduce<Record<string, typeof recentPoints>>((acc, p) => {
    if (!acc[p.subjectId]) acc[p.subjectId] = [];
    acc[p.subjectId].push(p);
    return acc;
  }, {});
  const sortedSubjectIds = subjectOrder.filter((id) => groupedBySubject[id]?.length);

  return (
    <MobileShell title={t("progress.title")} tabs={studentTabs}>
      {/* Stats row */}
      <div className="mb-5 grid grid-cols-3 gap-2.5">
        <StatCard label={t("progress.totalMastery")} value={`${totalMastery}%`} icon={<TrendingUp className="h-3.5 w-3.5" />} tint="primary" />
        <StatCard label={t("progress.weekTime")} value="3.5h" icon={<Clock className="h-3.5 w-3.5" />} tint="mastered" />
        <StatCard label={t("progress.completion")} value={`${totalMastery}%`} icon={<Award className="h-3.5 w-3.5" />} tint="partial" />
      </div>

      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-sm font-bold">{t("progress.recent")}</h2>
      </div>

      {recentPoints.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <BookOpen className="mb-3 h-10 w-10 text-muted-foreground/30" />
          <p className="text-sm text-muted-foreground/60">{t("progress.recentEmpty")}</p>
        </div>
      ) : (
        <div className="space-y-5 stagger-children">
          {sortedSubjectIds.map((subjectId) => {
            const points = groupedBySubject[subjectId];
            const firstPoint = points[0];
            return (
              <div key={subjectId}>
                <div className="mb-2.5 flex items-center gap-2">
                  <span className="text-base">{firstPoint.subjectEmoji}</span>
                  <h3 className="text-sm font-bold">{firstPoint.subjectName}</h3>
                  <span className="rounded-full bg-muted/60 px-2 py-0.5 text-[10px] text-muted-foreground/60">{points.length}</span>
                </div>
                <div className="space-y-2">
                  {points.map((p) => (
                    <Link
                      key={`${p.subjectId}-${p.id}`}
                      to="/student/knowledge-point"
                      search={{ kp: p.id, subject: p.subjectId, chapter: p.chapterId }}
                      className="flex items-center gap-3 rounded-2xl border border-border/50 bg-card p-3.5 shadow-sm transition-all hover:shadow-md active:scale-[0.98]"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium truncate">{p.name}</span>
                          <MasteryBadge level={p.mastery} />
                        </div>
                        <p className="mt-0.5 text-xs text-muted-foreground/60 truncate">
                          {p.chapterName}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </MobileShell>
  );
}

function StatCard({ label, value, icon, tint }: { label: string; value: string; icon: React.ReactNode; tint: "primary" | "mastered" | "partial" }) {
  const tintMap = {
    primary: "bg-primary-soft/80 text-primary",
    mastered: "bg-mastered-soft/80 text-mastered",
    partial: "bg-partial-soft/80 text-partial",
  } as const;
  return (
    <div className="rounded-2xl border border-border/50 bg-card p-3.5 text-center shadow-sm">
      <div className={`mx-auto mb-2 flex h-7 w-7 items-center justify-center rounded-lg ${tintMap[tint]}`}>
        {icon}
      </div>
      <p className="text-lg font-bold tracking-tight">{value}</p>
      <p className="mt-0.5 text-[10px] text-muted-foreground/60">{label}</p>
    </div>
  );
}
