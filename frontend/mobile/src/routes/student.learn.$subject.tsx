import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { MobileShell } from "@/components/mobile/MobileShell";
import { subjects as mockSubjects } from "@/lib/mock-data";
import { useCurriculum } from "@/lib/useCurriculum";
import { MasteryBadge } from "@/components/cards/MasteryBadge";
import { ChevronRight, ChevronDown, Bot, BookOpen } from "lucide-react";
import { useT } from "@/lib/i18n";
import { useAppStore } from "@/lib/store";

export const Route = createFileRoute("/student/learn/$subject")({
  component: SubjectPage,
});

function SubjectPage() {
  const { subject } = Route.useParams();
  const userId = useAppStore((s) => s.userId);
  const { data: apiSubjects } = useCurriculum(userId);
  const allSubjects = (apiSubjects && apiSubjects.length > 0) ? apiSubjects : mockSubjects;
  const s = allSubjects.find((x) => x.id === subject);
  const t = useT();
  const navigate = useNavigate();
  const [openChapter, setOpenChapter] = useState<string | null>(null);

  if (!s) throw notFound();

  const toggleChapter = (chapterId: string) => {
    setOpenChapter(openChapter === chapterId ? null : chapterId);
  };

  const startAiGuide = (pointId: string, chapterId: string) => {
    navigate({
      to: "/student/ai",
      search: { kp: pointId, subject: s.id, chapter: chapterId },
    });
  };

  const totalPoints = s.chapters.reduce((a, c) => a + c.points.length, 0);
  const masteredPoints = s.chapters.reduce(
    (a, c) => a + c.points.filter((p) => p.mastery === "mastered").length,
    0,
  );

  const chapterName = (ch: { id: string; name: string }) => {
    const key = `ch.${s.id}.${ch.id}`;
    const translated = t(key);
    return translated === key ? ch.name : translated;
  };

  const kpName = (p: { id: string; name: string }) => {
    const key = `kp.${p.id}.n`;
    const translated = t(key);
    return translated === key ? p.name : translated;
  };

  const kpDesc = (p: { id: string; desc: string }) => {
    const key = `kp.${p.id}.d`;
    const translated = t(key);
    return translated === key ? p.desc : translated;
  };

  return (
    <MobileShell title={t(`subj.${s.id}`)} back>
      {/* Subject stats bar */}
      <div className="mb-4 flex items-center gap-3 rounded-2xl border border-border/50 bg-card p-3.5 shadow-sm">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-soft text-xl">
          {s.emoji}
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground/70">总进度</span>
            <span className="text-xs font-bold text-primary">
              {totalPoints > 0 ? Math.round((masteredPoints / totalPoints) * 100) : 0}%
            </span>
          </div>
          <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-muted/60">
            <div
              className="h-full rounded-full bg-gradient-to-r from-primary to-primary/70"
              style={{ width: `${totalPoints > 0 ? Math.round((masteredPoints / totalPoints) * 100) : 0}%` }}
            />
          </div>
        </div>
        <div className="flex items-center gap-1 text-xs text-muted-foreground/60">
          <BookOpen className="h-3.5 w-3.5" />
          <span>{s.chapters.length} 章</span>
        </div>
      </div>

      {/* Chapter list */}
      <div className="space-y-2.5 stagger-children">
        {s.chapters.map((c) => {
          const isOpen = openChapter === c.id;
          const chapterMastered = c.points.filter((p) => p.mastery === "mastered").length;
          return (
            <div
              key={c.id}
              className="overflow-hidden rounded-2xl border border-border/50 bg-card shadow-sm transition-shadow hover:shadow-md"
            >
              <button
                onClick={() => toggleChapter(c.id)}
                className="flex w-full items-center justify-between p-4 text-left transition-colors active:bg-muted/50"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-[15px]">{chapterName(c)}</h3>
                    <span className="text-[10px] text-muted-foreground/50">
                      {chapterMastered}/{c.points.length}
                    </span>
                  </div>
                  <p className="mt-0.5 text-xs text-muted-foreground/60">
                    {t("learn.pointsCount", { n: c.points.length })}
                  </p>
                </div>
                <ChevronDown className={`ml-2 h-5 w-5 text-muted-foreground/40 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
              </button>
              {isOpen && (
                <div className="border-t border-border/40 bg-muted/20 p-2.5 space-y-1.5">
                  {c.points.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => startAiGuide(p.id, c.id)}
                      className="flex w-full items-center gap-3 rounded-xl bg-card p-3 text-left transition-all hover:bg-primary-soft/20 active:scale-[0.98]"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">{kpName(p)}</span>
                          <MasteryBadge level={p.mastery} />
                        </div>
                        <p className="mt-0.5 text-xs text-muted-foreground/60 truncate">{kpDesc(p)}</p>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-primary/70">
                        <Bot className="h-3.5 w-3.5" />
                        <ChevronRight className="h-4 w-4" />
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </MobileShell>
  );
}
