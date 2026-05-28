import { createFileRoute, useNavigate, notFound } from "@tanstack/react-router";
import { MobileShell } from "@/components/mobile/MobileShell";
import { subjects as mockSubjects } from "@/lib/mock-data";
import { useCurriculum } from "@/lib/useCurriculum";
import { MasteryBadge } from "@/components/cards/MasteryBadge";
import { useT } from "@/lib/i18n";
import { Bot, BookOpen, ChevronRight } from "lucide-react";
import { useAppStore } from "@/lib/store";

export const Route = createFileRoute("/student/knowledge-point")({
  validateSearch: (search: Record<string, unknown>) => ({
    kp: (search.kp as string) || undefined,
    subject: (search.subject as string) || undefined,
    chapter: (search.chapter as string) || undefined,
  }),
  component: KnowledgePointPage,
});

function KnowledgePointPage() {
  const { kp, subject: subjectId, chapter: chapterId } = Route.useSearch();
  const userId = useAppStore((s) => s.userId);
  const t = useT();
  const navigate = useNavigate();

  const { data: apiSubjects } = useCurriculum(userId);
  const allSubjects = (apiSubjects && apiSubjects.length > 0) ? apiSubjects : mockSubjects;

  if (!kp || !subjectId || !chapterId) throw notFound();

  const subj = allSubjects.find((s) => s.id === subjectId);
  const chap = subj?.chapters.find((c) => c.id === chapterId);
  const point = chap?.points.find((p) => p.id === kp);

  if (!point || !subj || !chap) throw notFound();

  const pointName = t(point.name);
  const pointDesc = t(point.desc);
  const subjectName = t(subj.name);
  const chapterName = t(chap.name);

  const startAiGuide = () => {
    navigate({
      to: "/student/ai",
      search: { kp: point.id, subject: subj.id, chapter: chap.id },
    });
  };

  return (
    <MobileShell title={t("kpDetail.title")} back>
      {/* Knowledge point header */}
      <div className="mb-4 rounded-2xl border border-border bg-card p-5 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary-soft text-3xl">
            {subj.emoji}
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-lg font-bold">{pointName}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{pointDesc}</p>
            <div className="mt-2 flex items-center gap-2">
              <MasteryBadge level={point.mastery} />
            </div>
          </div>
        </div>
      </div>

      {/* What you'll learn */}
      <div className="mb-4 rounded-2xl border border-border bg-card p-5 shadow-sm">
        <div className="flex items-center gap-2 mb-3">
          <BookOpen className="h-4 w-4 text-primary" />
          <h3 className="text-sm font-semibold">{t("kpDetail.whatYouWillLearn")}</h3>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">{pointDesc}</p>
      </div>

      {/* Belongs to */}
      <div className="mb-4 rounded-2xl border border-border bg-card p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-muted-foreground">{t("kpDetail.belongs")}</p>
            <p className="mt-1 text-sm font-medium">{chapterName} · {subjectName}</p>
          </div>
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
        </div>
      </div>

      {/* Start AI guided learning button */}
      <button
        onClick={startAiGuide}
        className="flex w-full items-center justify-center gap-2 rounded-2xl bg-primary py-4 text-sm font-semibold text-primary-foreground shadow-md transition-transform active:scale-[0.98]"
      >
        <Bot className="h-5 w-5" />
        {t("kpDetail.startAI")}
      </button>
    </MobileShell>
  );
}
