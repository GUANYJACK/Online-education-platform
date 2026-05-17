import { createFileRoute, Link } from "@tanstack/react-router";
import { MobileShell } from "@/components/mobile/MobileShell";
import { studentTabs } from "@/components/mobile/student-tabs";
import { subjects } from "@/lib/mock-data";
import { ChevronRight, Flame, Sparkles } from "lucide-react";
import { useAppStore } from "@/lib/store";
import { useT } from "@/lib/i18n";

export const Route = createFileRoute("/student/learn/")({
  component: LearnHome,
});

function LearnHome() {
  const nickname = useAppStore((s) => s.nickname);
  const account = useAppStore((s) => s.account);
  const t = useT();
  const displayName = nickname || account || t("me.student.user");

  return (
    <MobileShell tabs={studentTabs} noPad>
      {/* Hero header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-primary/75 px-5 pb-10 pt-14 text-primary-foreground">
        {/* Decorative circles */}
        <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/5" />
        <div className="pointer-events-none absolute -bottom-10 -left-6 h-24 w-24 rounded-full bg-white/5" />

        <div className="relative">
          <p className="text-xs font-medium text-white/60">{t("learn.hello")}</p>
          <h1 className="mt-1.5 text-[26px] font-bold tracking-tight leading-tight">
            {displayName} 👋
          </h1>
          <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/15 px-3.5 py-1.5 text-xs font-medium backdrop-blur-sm">
            <Flame className="h-3.5 w-3.5" />
            <span>{t("learn.streak")}</span>
          </div>
        </div>
      </div>

      {/* Subject cards */}
      <div className="-mt-5 rounded-t-[28px] bg-background px-4 pb-4 pt-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-base font-bold">{t("learn.chooseSubject")}</h2>
          <div className="flex items-center gap-1 text-xs text-muted-foreground/60">
            <Sparkles className="h-3.5 w-3.5" />
            <span>{subjects.length} 门学科</span>
          </div>
        </div>
        <div className="space-y-3 stagger-children">
          {subjects.map((s) => {
            const total = s.chapters.reduce((a, c) => a + c.points.length, 0);
            const mastered = s.chapters.reduce(
              (a, c) => a + c.points.filter((p) => p.mastery === "mastered").length,
              0,
            );
            const pct = Math.round((mastered / total) * 100);
            return (
              <Link
                key={s.id}
                to="/student/learn/$subject"
                params={{ subject: s.id }}
                className="flex items-center gap-4 rounded-2xl border border-border/50 bg-card p-4 shadow-sm transition-all hover:shadow-md active:scale-[0.98]"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-soft/80 text-3xl shadow-inner">
                  {s.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-[15px]">{t(`subj.${s.id}`)}</h3>
                  <p className="mt-0.5 text-xs text-muted-foreground/70">
                    {t("learn.chaptersAndPoints", { c: s.chapters.length, p: total })}
                  </p>
                  <div className="mt-2.5 flex items-center gap-2.5">
                    <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted/60">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-primary to-primary/70 transition-all duration-500"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <span className="text-xs font-bold text-primary tabular-nums">{pct}%</span>
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground/40" />
              </Link>
            );
          })}
        </div>
      </div>
    </MobileShell>
  );
}
