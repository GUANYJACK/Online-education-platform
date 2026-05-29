import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useEffect, useMemo } from "react";
import { MobileShell } from "@/components/mobile/MobileShell";
import { parentTabs } from "@/components/mobile/parent-tabs";
import { EmptyState } from "@/components/cards/EmptyState";
import { PermissionNotice } from "@/components/cards/PermissionNotice";
import { StatCard } from "@/components/cards/StatCard";
import { TrendChart } from "@/components/cards/TrendChart";
import { useT } from "@/lib/i18n";
import { useAppStore } from "@/lib/store";
import { apiGetMentalHealthHistory, apiGetChildren } from "@/lib/api";
import type { MentalHealthHistory, MentalHealthTrendPoint } from "@/lib/api";
import { LucideProps } from "lucide-react";
import {
  Activity,
  Heart,
  TrendingUp,
  TrendingDown,
  Minus,
  RefreshCw,
  ChevronDown,
} from "lucide-react";

export const Route = createFileRoute("/parent/wellbeing")({
  component: WellbeingPage,
});

function statusColor(label: string): "primary" | "mastered" | "partial" | "weak" {
  if (label === "GOOD") return "mastered";
  if (label === "BAD") return "weak";
  return "primary";
}

function StatusIcon({ label, ...props }: { label: string } & LucideProps) {
  if (label === "GOOD") return <TrendingUp {...props} />;
  if (label === "BAD") return <TrendingDown {...props} />;
  return <Minus {...props} />;
}

function riskBg(r: string): string {
  if (r === "LOW") return "bg-mastered/10 border-mastered/20 text-mastered";
  if (r === "HIGH") return "bg-weak/10 border-weak/20 text-weak";
  return "bg-partial/10 border-partial/20 text-partial";
}

function riskBadgeClass(r: string): string {
  if (r === "LOW") return "risk--low";
  if (r === "HIGH") return "risk--high";
  return "risk--medium";
}

/** Build SVG path + area sparkline from trend data */
function buildSparkline(trend: MentalHealthTrendPoint[]): { areaPath: string; linePath: string } {
  if (trend.length < 2) return { areaPath: "", linePath: "" };
  const w = 240;
  const h = 40;
  const n = trend.length;
  const scores = trend.map((p) => p.statusScore);
  const min = Math.min(...scores);
  const max = Math.max(...scores);
  const range = Math.max(0.001, max - min);
  const xs = (i: number) => (i / (n - 1)) * w;
  const ys = (v: number) => h - ((v - min) / range) * (h - 4) - 2;

  const linePts = trend.map((p, i) => `${i === 0 ? "M" : "L"}${xs(i).toFixed(1)} ${ys(p.statusScore).toFixed(1)}`);
  const linePath = linePts.join(" ");
  const areaPath = `${linePath} L${w} ${h} L0 ${h} Z`;
  return { areaPath, linePath };
}

function WellbeingPage() {
  const t = useT();
  const navigate = useNavigate();
  const { boundChildId } = useAppStore();

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<MentalHealthHistory | null>(null);

  // Resolve children list from backend
  const [backendChildren, setBackendChildren] = useState<
    Array<{ id: string; name: string; avatar: string }>
  >([]);
  const [childrenReady, setChildrenReady] = useState(false);
  const children = backendChildren;
  const child = useMemo(
    () => children.find((c) => c.id === boundChildId) ?? children[0],
    [children, boundChildId],
  );

  // Fetch children once on mount
  useEffect(() => {
    let cancelled = false;
    apiGetChildren()
      .then((list) => {
        if (cancelled) return;
        setBackendChildren(
          list.map((c, i) => ({
            id: c.id,
            name: c.name,
            avatar: i % 2 === 0 ? "👦" : "👧",
          })),
        );
      })
      .catch(() => {
        /* keep empty */
      })
      .finally(() => {
        if (!cancelled) setChildrenReady(true);
      });
    return () => { cancelled = true; };
  }, []); // mount-only

  // Fetch mental health history only after children are loaded AND we have a child selected
  useEffect(() => {
    if (!childrenReady) return;
    if (!child) return;
    let cancelled = false;
    setLoading(true);

    apiGetMentalHealthHistory(child.id, { limit: 30 })
      .then((res) => {
        if (!cancelled) setData(res);
      })
      .catch(() => {
        /* silently ignore — show dashboard with defaults */
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => { cancelled = true; };
  }, [child?.id, childrenReady]); // t removed from deps

  const hasData = data !== null && data.records.length > 0;
  const latestStatusLabel = hasData ? data!.latestStatusLabel : "NEUTRAL";
  const latestRiskLevel = hasData ? data!.latestRiskLevel : "LOW";
  const latestScore = hasData ? data!.latestScore : 0;

  const riskText =
    latestRiskLevel === "LOW"
      ? t("pw.risk.low")
      : latestRiskLevel === "HIGH"
        ? t("pw.risk.high")
        : t("pw.risk.medium");

  // Sentiment marker position: normalize latestScore (-100..100) → 0..100%
  const sentimentPos = hasData
    ? Math.min(100, Math.max(0, ((latestScore + 100) / 200) * 100))
    : 50;

  // Sparkline paths
  const sparkPaths = useMemo(() => {
    if (!data || data.trend.length < 2) return { areaPath: "", linePath: "" };
    return buildSparkline(data.trend);
  }, [data]);

  const chartData = useMemo(() => {
    if (!data || data.trend.length < 2) return [];
    return data.trend.map((p) => ({
      day: new Date(p.date).toLocaleDateString(undefined, { weekday: "short" }),
      mastery: p.statusScore,
      time: Math.abs(p.scoreDelta),
    }));
  }, [data]);

  return (
    <MobileShell title={t("pw.title")} tabs={parentTabs}>
      {/* Hero / child selector */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/85 via-primary/75 to-primary/60 px-4 pb-5 pt-5 text-primary-foreground">
        <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/5" />
        <div className="relative">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-xl backdrop-blur-sm">
              {child?.avatar ?? "👤"}
            </div>
            <div className="flex-1">
              <h1 className="text-lg font-bold">
                {child?.name ?? t("pw.selectChild")}
              </h1>
              <p className="text-xs text-white/60">{t("pw.childStatus")}</p>
            </div>
            <button
              onClick={() => navigate({ to: "/parent/children" })}
              className="flex items-center gap-1 rounded-full bg-white/15 px-3 py-1.5 text-xs font-medium backdrop-blur-sm transition-all hover:bg-white/25 active:scale-95"
            >
              {t("po.switch")} <ChevronDown className="h-3 w-3" />
            </button>
          </div>
        </div>
      </div>

      {/* Loading */}
      {loading && (
        <div className="mt-6 flex flex-col items-center justify-center py-8">
          <RefreshCw className="h-6 w-6 animate-spin text-primary/40" />
          <p className="mt-2 text-xs text-muted-foreground/50">Loading…</p>
        </div>
      )}

      {/* Dashboard — render once loading is done */}
      {!loading && (
        <div className="mt-4 space-y-4">
          {/* Mental Health Dashboard Card */}
          <div className="rounded-2xl border border-border/50 bg-card shadow-sm p-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold">{t("pw.title")}</h3>
              <span className={`risk ${riskBadgeClass(latestRiskLevel)}`}>
                <span className="risk__bullet" />
                {latestRiskLevel === "LOW" ? t("pw.riskLow") : riskText}
              </span>
            </div>
            <div className="mh-section">
              {/* Sentiment gauge */}
              <div className="mh-row">
                <span className="mh-label">{t("pw.moodIndicator")}</span>
                <div className="senti">
                  <div className="senti__track" />
                  <div className="senti__marker" style={{ left: `${sentimentPos}%` }} />
                  <div className="senti__labels">
                    <span>{t("pw.moodLow")}</span>
                    <span>{t("pw.moodNeutral")}</span>
                    <span>{t("pw.moodPositive")}</span>
                  </div>
                </div>
              </div>
              {/* Sparkline */}
              {sparkPaths.areaPath && (
                <div className="mh-row mh-row--block">
                  <span className="mh-label">{t("pw.moodTrend")}</span>
                  <svg viewBox="0 0 240 40" className="spark">
                    <path d={sparkPaths.areaPath} fill="oklch(0.95 0.04 60)" />
                    <path
                      d={sparkPaths.linePath}
                      fill="none"
                      stroke="var(--color-risk-mid)"
                      strokeWidth="1.5"
                      strokeLinejoin="round"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              )}
            </div>
          </div>

          {/* Score + Risk cards */}
          {hasData && (
            <div className="grid grid-cols-2 gap-2.5">
              <StatCard
                label={t("pw.wellbeingScore")}
                value={data!.latestScore}
                icon={<StatusIcon label={latestStatusLabel} className="h-3.5 w-3.5" />}
                tint={statusColor(latestStatusLabel)}
              />
              <div className={`rounded-2xl border p-4 shadow-sm ${riskBg(latestRiskLevel)}`}>
                <span className="text-[11px] opacity-70">{t("pw.risk")}</span>
                <div className="mt-2 flex items-center gap-1">
                  <span className="text-2xl font-bold tracking-tight">{riskText}</span>
                </div>
              </div>
            </div>
          )}

          {/* Detailed trend chart */}
          {chartData.length >= 2 && (
            <div className="rounded-2xl border border-border/50 bg-card p-4 shadow-sm">
              <div className="mb-3 flex items-center gap-2">
                <Activity className="h-4 w-4 text-primary/60" />
                <h3 className="text-sm font-bold">{t("pw.trend")}</h3>
              </div>
              <TrendChart data={chartData} />
            </div>
          )}

          {hasData && data!.records[0] && (
            <p className="text-center text-[10px] text-muted-foreground/30">
              {t("pw.lastUpdated")}: {new Date(data!.records[0].createdAt).toLocaleString()}
            </p>
          )}
        </div>
      )}

      <div className="mt-4">
        <PermissionNotice text={t("pw.permission")} />
      </div>
    </MobileShell>
  );
}
