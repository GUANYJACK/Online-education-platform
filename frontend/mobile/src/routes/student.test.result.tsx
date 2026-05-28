import { createFileRoute, Link } from "@tanstack/react-router";
import { MobileShell } from "@/components/mobile/MobileShell";
import { useAppStore } from "@/lib/store";
import { TrendChart } from "@/components/cards/TrendChart";
import { trendData } from "@/lib/mock-data";
import { useT } from "@/lib/i18n";
import { TrendingUp, ArrowRight, Trophy } from "lucide-react";

export const Route = createFileRoute("/student/test/result")({
  component: ResultPage,
});

function ResultPage() {
  const score = useAppStore((s) => s.lastScore) ?? 0;
  const t = useT();
  const levelKey = score >= 80 ? "excellent" : score >= 60 ? "good" : "needWork";
  const tone =
    score >= 80
      ? { bg: "bg-gradient-to-br from-mastered-soft to-mastered-soft/60", text: "text-mastered", ring: "ring-mastered/20" }
      : score >= 60
        ? { bg: "bg-gradient-to-br from-partial-soft to-partial-soft/60", text: "text-partial", ring: "ring-partial/20" }
        : { bg: "bg-gradient-to-br from-weak-soft to-weak-soft/60", text: "text-weak", ring: "ring-weak/20" };

  const changes = [
    { name: "二次方程", from: "partial", to: "mastered", up: true },
    { name: "一次函数", from: "mastered", to: "mastered", up: false },
    { name: "指数函数", from: "weak", to: "partial", up: true },
  ];

  return (
    <MobileShell title={t("test.result.title")} back>
      {/* Score hero */}
      <div className={`relative overflow-hidden rounded-3xl ${tone.bg} p-7 text-center`}>
        <div className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-white/10" />
        <Trophy className={`mx-auto h-8 w-8 ${tone.text} opacity-60`} />
        <p className="mt-3 text-xs text-muted-foreground/60">{t("test.result.thisScore")}</p>
        <p className={`mt-1 text-6xl font-bold ${tone.text} tracking-tight`}>{score}</p>
        <p className={`mt-2 text-sm font-semibold ${tone.text}`}>{t(`test.result.level.${levelKey}`)}</p>
      </div>

      {/* Changes */}
      <h3 className="mb-2.5 mt-6 text-sm font-bold">{t("test.result.changes")}</h3>
      <div className="space-y-2">
        {changes.map((p) => (
          <div key={p.name} className="flex items-center justify-between rounded-2xl border border-border/50 bg-card p-3.5 shadow-sm">
            <span className="text-sm font-medium">{p.name}</span>
            <div className="flex items-center gap-2 text-xs text-muted-foreground/60">
              <span>{t(`mastery.${p.from}`)}</span>
              <ArrowRight className="h-3 w-3" />
              <span className={p.up ? "font-semibold text-mastered" : ""}>{t(`mastery.${p.to}`)}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Trend chart */}
      <div className="mt-6 rounded-2xl border border-border/50 bg-card p-4 shadow-sm">
        <div className="mb-3 flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-primary" />
          <h3 className="text-sm font-bold">{t("test.result.trend7")}</h3>
        </div>
        <TrendChart data={trendData} />
      </div>

      <Link
        to="/student/progress"
        className="mt-6 block rounded-2xl bg-primary py-3.5 text-center text-sm font-bold text-primary-foreground shadow-lg shadow-primary/20 transition-all active:scale-[0.97]"
      >
        {t("test.result.viewProgress")}
      </Link>
    </MobileShell>
  );
}
