import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { MobileShell } from "@/components/mobile/MobileShell";
import { subjects as mockSubjects } from "@/lib/mock-data";
import { useCurriculum } from "@/lib/useCurriculum";
import { MasteryBadge } from "@/components/cards/MasteryBadge";
import { useT } from "@/lib/i18n";
import { useAppStore } from "@/lib/store";
import { BookOpen, Play } from "lucide-react";

export const Route = createFileRoute("/student/progress/$subject")({
  component: SubjectProgressPage,
});

function SubjectProgressPage() {
  const { subject } = Route.useParams();
  const userId = useAppStore((s) => s.userId);
  const { data: apiSubjects } = useCurriculum(userId);
  const allSubjects = (apiSubjects && apiSubjects.length > 0) ? apiSubjects : mockSubjects;
  const s = allSubjects.find((x) => x.id === subject);
  const t = useT();

  if (!s) throw notFound();

  const totalPoints = s.chapters.reduce((a, c) => a + c.points.length, 0);
  const masteredCount = s.chapters.reduce(
    (a, c) => a + c.points.filter((p) => p.mastery === "mastered").length,
    0,
  );
  const partialCount = s.chapters.reduce(
    (a, c) => a + c.points.filter((p) => p.mastery === "partial").length,
    0,
  );
  const weakCount = totalPoints - masteredCount - partialCount;
  const masteryRate = totalPoints > 0 ? Math.round((masteredCount / totalPoints) * 100) : 0;

  const chapterName = (ch: { id: string; name: string }) => ch.name;

  return (
    <MobileShell title={t("progress.subject.title", { s: s.name })} back>
      {/* Subject header card */}
      <div className="mb-4 rounded-2xl border border-border bg-card p-4 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-soft text-3xl">
            {s.emoji}
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-bold">{s.name}</h2>
            <p className="text-xs text-muted-foreground">
              {t("progress.subject.chapters", { n: s.chapters.length })} · {t("progress.subject.points", { n: totalPoints })}
            </p>
          </div>
        </div>

        {/* Mastery progress bar */}
        <div className="mt-4">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">{t("progress.subject.masteryRate")}</span>
            <span className="font-semibold text-primary">{masteryRate}%</span>
          </div>
          <div className="mt-1.5 flex h-2.5 overflow-hidden rounded-full bg-muted">
            <div className="h-full bg-mastered transition-all" style={{ width: `${totalPoints > 0 ? (masteredCount / totalPoints) * 100 : 0}%` }} />
            <div className="h-full bg-partial transition-all" style={{ width: `${totalPoints > 0 ? (partialCount / totalPoints) * 100 : 0}%` }} />
            <div className="h-full bg-weak transition-all" style={{ width: `${totalPoints > 0 ? (weakCount / totalPoints) * 100 : 0}%` }} />
          </div>
          <div className="mt-2 flex items-center gap-4 text-[11px] text-muted-foreground">
            <span className="flex items-center gap-1">
              <span className="inline-block h-2 w-2 rounded-full bg-mastered" />
              {t("mastery.mastered")} {masteredCount}
            </span>
            <span className="flex items-center gap-1">
              <span className="inline-block h-2 w-2 rounded-full bg-partial" />
              {t("mastery.partial")} {partialCount}
            </span>
            <span className="flex items-center gap-1">
              <span className="inline-block h-2 w-2 rounded-full bg-weak" />
              {t("mastery.weak")} {weakCount}
            </span>
          </div>
        </div>
      </div>

      {/* Quick action: continue learning */}
      <Link
        to="/student/learn/$subject"
        params={{ subject: s.id }}
        className="mb-4 flex items-center gap-3 rounded-2xl border border-primary/30 bg-primary-soft p-4 transition-transform active:scale-[0.98]"
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
          <Play className="h-5 w-5" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold text-primary">{t("progress.subject.studyNow")}</p>
          <p className="text-xs text-muted-foreground">{t("learn.chaptersAndPoints", { c: s.chapters.length, p: totalPoints })}</p>
        </div>
      </Link>

      {/* Chapters and knowledge points */}
      <div className="space-y-3">
        {s.chapters.map((c) => {
          const chapterMastered = c.points.filter((p) => p.mastery === "mastered").length;
          return (
            <div key={c.id} className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
              <div className="flex items-center justify-between p-4">
                <div>
                  <h3 className="font-semibold">{chapterName(c)}</h3>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {t("progress.masteredOf", { m: chapterMastered, t: c.points.length })}
                  </p>
                </div>
                <span className="text-sm font-bold text-primary">
                  {c.points.length > 0 ? Math.round((chapterMastered / c.points.length) * 100) : 0}%
                </span>
              </div>
              <div className="border-t border-border bg-muted/30 p-3 space-y-1.5">
                {c.points.map((p) => {
                  const name = p.name;
                  return (
                    <Link
                      key={p.id}
                      to="/student/knowledge-point"
                      search={{ kp: p.id, subject: s.id, chapter: c.id }}
                      className="flex items-center gap-3 rounded-xl bg-card p-3 text-left transition-all active:scale-[0.98] active:bg-primary-soft/30"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">{name}</span>
                          <MasteryBadge level={p.mastery} />
                        </div>
                      </div>
                      <BookOpen className="h-4 w-4 text-muted-foreground" />
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </MobileShell>
  );
}
