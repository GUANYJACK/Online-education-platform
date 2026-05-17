import { createFileRoute, notFound, useNavigate } from "@tanstack/react-router";
import { MobileShell } from "@/components/mobile/MobileShell";
import { subjects } from "@/lib/mock-data";
import { MasteryBadge } from "@/components/cards/MasteryBadge";
import { Bot, Sparkles } from "lucide-react";
import { useT } from "@/lib/i18n";

export const Route = createFileRoute("/student/learn/$subject/$chapter")({
  component: ChapterPage,
});

function ChapterPage() {
  const { subject, chapter } = Route.useParams();
  const s = subjects.find((x) => x.id === subject);
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

  return (
    <MobileShell title={t(`ch.${s.id}.${c.id}`)} back>
      <p className="mb-4 text-xs text-muted-foreground/60">
        {t("learn.subjectDot", { s: t(`subj.${s.id}`), n: c.points.length })}
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
                <h3 className="font-bold text-[15px]">{t(`kp.${p.id}.n`)}</h3>
                <p className="mt-1 text-xs text-muted-foreground/60 leading-relaxed">{t(`kp.${p.id}.d`)}</p>
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
