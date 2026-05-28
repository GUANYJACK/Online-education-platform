import { createFileRoute, notFound, useNavigate } from "@tanstack/react-router";
import { MobileShell } from "@/components/mobile/MobileShell";
import { subjects as mockSubjects } from "@/lib/mock-data";
import { useCurriculum } from "@/lib/useCurriculum";
import { MasteryBadge } from "@/components/cards/MasteryBadge";
import { Bot, Sparkles } from "lucide-react";
import { useT } from "@/lib/i18n";
import { useAppStore } from "@/lib/store";

export const Route = createFileRoute("/student/learn/$subject/$chapter")({
  component: ChapterPage,
});

function ChapterPage() {
  const { subject, chapter } = Route.useParams();
  const userId = useAppStore((s) => s.userId);
  const { data: apiSubjects } = useCurriculum(userId);
  const allSubjects = (apiSubjects && apiSubjects.length > 0) ? apiSubjects : mockSubjects;
  const s = allSubjects.find((x) => x.id === subject);
  const c = s?.chapters.find((x) => x.id === chapter);
  const navigate = useNavigate();
  const t = useT();
  if (!s || !c) throw notFound();

  const startAiGuide = (pointId: string) => {
    navigate({
      to: "/student/ai",
      search: { kp: pointId, subject: s.id, chapter: c.id },
    });
  };

  const chapterName = (ch: { id: string; name: string }) => ch.name;

  const kpName = (p: { id: string; name: string }) => p.name;

  const kpDesc = (p: { id: string; desc: string }) => p.desc;

  return (
    <MobileShell title={chapterName(c)} back>
      <p className="mb-4 text-xs text-muted-foreground/60">
        {t("learn.subjectDot", { s: t(s.name), n: c.points.length })}
      </p>
      <div className="space-y-2.5 stagger-children">
        {c.points.map((p) => (
          <button
            key={p.id}
            onClick={() => startAiGuide(p.id)}
            className="w-full rounded-2xl border border-border/50 bg-card p-4 shadow-sm text-left transition-all hover:shadow-md active:scale-[0.97]"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-[15px]">{kpName(p)}</h3>
                <p className="mt-1 text-xs text-muted-foreground/60 leading-relaxed">{kpDesc(p)}</p>
              </div>
              <MasteryBadge level={p.mastery} />
            </div>
            <div className="mt-3.5 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary-soft to-primary-soft/60 py-2.5 text-xs font-semibold text-primary">
              <Bot className="h-3.5 w-3.5" />
              {t("learn.useAI")}
              <Sparkles className="h-3 w-3" />
            </div>
          </button>
        ))}
      </div>
    </MobileShell>
  );
}
