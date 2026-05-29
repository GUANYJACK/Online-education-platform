import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useEffect, useMemo } from "react";
import { MobileShell } from "@/components/mobile/MobileShell";
import { parentTabs } from "@/components/mobile/parent-tabs";
import { StatCard } from "@/components/cards/StatCard";
import { TrendChart } from "@/components/cards/TrendChart";
import { PermissionNotice } from "@/components/cards/PermissionNotice";
import { useAppStore } from "@/lib/store";
import { useT } from "@/lib/i18n";
import { apiGetChildren, apiGetLearningReport } from "@/lib/api";
import type { LearningReport } from "@/lib/api";
import { Target, Award, ChevronDown, Clock, RefreshCw, Bug } from "lucide-react";

export const Route = createFileRoute("/parent/overview")({
  component: ParentOverview,
});

interface ChildInfo {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
}

function ParentOverview() {
  const boundChildId = useAppStore((s) => s.boundChildId);
  const bindChild = useAppStore((s) => s.bindChild);
  const navigate = useNavigate();
  const t = useT();

  const [children, setChildren] = useState<ChildInfo[]>([]);
  const [childrenLoaded, setChildrenLoaded] = useState(false);
  const [report, setReport] = useState<LearningReport | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showDebug, setShowDebug] = useState(false);

  // Fetch children once on mount
  useEffect(() => {
    let cancelled = false;
    apiGetChildren()
      .then((list) => {
        if (cancelled) return;
        setChildren(list);
        setChildrenLoaded(true);
        // Auto-select first child only if we have children AND no real child is bound
        if (list.length > 0 && !boundChildId) {
          bindChild(list[0].id);
        }
      })
      .catch(() => {
        if (cancelled) setChildrenLoaded(true);
      });
    return () => { cancelled = true; };
  }, []); // mount-only

  // Fetch learning report when a real bound child is set (after children are loaded)
  useEffect(() => {
    if (!childrenLoaded) return; // wait for children to load first
    if (!boundChildId) {
      setReport(null);
      setLoading(false);
      return;
    }
    let cancelled = false;
    setLoading(true);
    setError(null);

    apiGetLearningReport(boundChildId)
      .then((r) => {
        if (!cancelled) setReport(r);
      })
      .catch(() => {
        if (!cancelled) setError(t("po.fetchError"));
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [boundChildId, childrenLoaded]); // t removed from deps — only refetch when child changes

  // Resolve active child
  const child = useMemo(
    () => children.find((c) => c.id === boundChildId),
    [children, boundChildId],
  );

  const summary = report?.summary;
  const masteryPct = summary
    ? summary.totalKnowledgePoints > 0
      ? Math.round(((summary.mastered * 100) + (summary.partial * 50)) / summary.totalKnowledgePoints)
      : 0
    : 0;

  const chartData = useMemo(() => {
    if (!report) return [];
    const dateMap: Record<string, { total: number; count: number }> = {};
    for (const subj of report.subjects) {
      for (const chap of subj.chapters) {
        for (const kp of chap.knowledgePoints) {
          const day = new Date(kp.updatedAt).toLocaleDateString(undefined, { weekday: "short" });
          const score = kp.mastery === "MASTERED" ? 3 : kp.mastery === "PARTIAL" ? 2 : 1;
          if (!dateMap[day]) dateMap[day] = { total: 0, count: 0 };
          dateMap[day].total += score;
          dateMap[day].count += 1;
        }
      }
    }
    const days = Object.keys(dateMap);
    if (days.length < 2) return [];
    return days.map((day) => ({
      day,
      mastery: Math.round((dateMap[day].total / dateMap[day].count) * 33),
      time: dateMap[day].count * 15,
    }));
  }, [report]);

  const acts = useMemo(() => {
    if (!report) return [];
    const events: { t: string; d: string; ts: string }[] = [];
    for (const subj of report.subjects) {
      for (const chap of subj.chapters) {
        for (const kp of chap.knowledgePoints) {
          const masteryLabel =
            kp.mastery === "MASTERED" ? t("po.act.mastered")
            : kp.mastery === "PARTIAL" ? t("po.act.partial")
            : t("po.act.unmastered");
          events.push({
            t: new Date(kp.updatedAt).toLocaleString(),
            d: t("po.act.template", { subj: subj.subject, kp: kp.name, mastery: masteryLabel }),
            ts: kp.updatedAt,
          });
        }
      }
    }
    events.sort((a, b) => new Date(b.ts).getTime() - new Date(a.ts).getTime());
    return events.slice(0, 5);
  }, [report, t]);

  return (
    <MobileShell tabs={parentTabs} noPad>
      {/* Hero header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-mastered via-mastered/85 to-mastered/70 px-5 pb-10 pt-14 text-primary-foreground">
        <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/5" />
        <div className="pointer-events-none absolute -bottom-10 -left-6 h-24 w-24 rounded-full bg-white/5" />
        <div className="relative">
          <p className="text-xs font-medium text-white/50">{t("po.viewing")}</p>
          <div className="mt-1.5 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-xl backdrop-blur-sm">
              {child ? "👦" : "👤"}
            </div>
            <div className="flex-1">
              <h1 className="text-xl font-bold">{child?.name ?? t("po.selectChild")}</h1>
              <p className="text-xs text-white/60">{child?.email || child?.phone || ""}</p>
            </div>
            <button
              onClick={() => navigate({ to: "/parent/children" })}
              className="flex items-center gap-1 rounded-full bg-white/15 px-3.5 py-1.5 text-xs font-medium backdrop-blur-sm transition-all hover:bg-white/25 active:scale-95"
            >
              {t("po.switch")} <ChevronDown className="h-3 w-3" />
            </button>
          </div>
        </div>
      </div>

      <div className="-mt-5 rounded-t-[28px] bg-background px-4 pb-4 pt-6">
        {/* Loading */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-10">
            <RefreshCw className="h-6 w-6 animate-spin text-primary/40" />
            <p className="mt-2 text-xs text-muted-foreground/50">Loading…</p>
          </div>
        )}

        {/* Error */}
        {error && !loading && (
          <div className="rounded-2xl border border-weak/20 bg-weak/5 p-4 text-center">
            <p className="text-sm text-weak">{error}</p>
          </div>
        )}

        {/* Stats */}
        {!loading && !error && (
          <>
            <div className="grid grid-cols-2 gap-2.5">
              <StatCard label={t("po.completion")} value={`${masteryPct}`} unit="%" icon={<Target className="h-3.5 w-3.5" />} tint="primary" />
              <StatCard label={t("po.mastery")} value={`${masteryPct}`} unit="%" icon={<Award className="h-3.5 w-3.5" />} tint="mastered" />
            </div>

            {chartData.length >= 2 && (
              <div className="mt-4 rounded-2xl border border-border/50 bg-card p-4 shadow-sm">
                <div className="mb-3 flex items-center gap-2">
                  <Clock className="h-4 w-4 text-primary/60" />
                  <h3 className="text-sm font-bold">{t("po.trend7")}</h3>
                </div>
                <TrendChart data={chartData} />
              </div>
            )}

            <div className="mt-4">
              <PermissionNotice text={t("po.permission")} />
            </div>

            {acts.length > 0 && (
              <div className="mt-4 rounded-2xl border border-border/50 bg-card p-4 shadow-sm">
                <h3 className="mb-3 text-sm font-bold">{t("po.recent")}</h3>
                <ul className="space-y-3">
                  {acts.map((a, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/60" />
                      <div>
                        <p className="text-sm text-foreground/90">{a.d}</p>
                        <p className="mt-0.5 text-xs text-muted-foreground/50">{a.t}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {summary && summary.totalKnowledgePoints > 0 && (
              <div className="mt-4 rounded-2xl border border-border/50 bg-card p-4 shadow-sm">
                <h3 className="mb-3 text-sm font-bold">{t("po.summary")}</h3>
                <div className="grid grid-cols-2 gap-3 text-center">
                  <div>
                    <p className="text-2xl font-bold text-mastered">{summary.mastered}</p>
                    <p className="text-[10px] text-muted-foreground/50">{t("po.mastered")}</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-partial">{summary.partial}</p>
                    <p className="text-[10px] text-muted-foreground/50">{t("po.partial")}</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-weak">{summary.unmastered}</p>
                    <p className="text-[10px] text-muted-foreground/50">{t("po.unmastered")}</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-primary">{Math.round(summary.totalStudyTimeSeconds / 60)}</p>
                    <p className="text-[10px] text-muted-foreground/50">{t("po.studyMin")}</p>
                  </div>
                </div>
              </div>
            )}
            {/* Debug: raw API response */}
            {report && (
              <div className="mt-4">
                <button
                  onClick={() => setShowDebug(!showDebug)}
                  className="flex items-center gap-1 text-[10px] text-muted-foreground/30 hover:text-muted-foreground/60"
                >
                  <Bug className="h-3 w-3" /> {showDebug ? "Hide" : "Show"} raw data
                </button>
                {showDebug && (
                  <pre className="mt-1 max-h-60 overflow-auto rounded-xl bg-muted/20 p-3 text-[9px] text-muted-foreground/50">
                    {JSON.stringify(report, null, 2)}
                  </pre>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </MobileShell>
  );
}
