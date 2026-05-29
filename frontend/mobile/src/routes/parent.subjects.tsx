import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { MobileShell } from "@/components/mobile/MobileShell";
import { parentTabs } from "@/components/mobile/parent-tabs";
import { PermissionNotice } from "@/components/cards/PermissionNotice";
import { useT } from "@/lib/i18n";
import { useAppStore } from "@/lib/store";
import { apiGetChildren, apiGetLearningReport } from "@/lib/api";
import type { ApiMastery } from "@/lib/api";
import { BookOpen, RefreshCw, Bug } from "lucide-react";

export const Route = createFileRoute("/parent/subjects")({
  component: ParentSubjects,
});

type UiMastery = "mastered" | "partial" | "weak";

function mapMastery(m: ApiMastery): UiMastery {
  if (m === "MASTERED") return "mastered";
  if (m === "PARTIAL") return "partial";
  return "weak";
}

interface SubjectSummary {
  name: string;
  emoji: string;
  total: number;
  mastered: number;
  partial: number;
  weak: number;
}

function ParentSubjects() {
  const boundChildId = useAppStore((s) => s.boundChildId);
  const t = useT();

  const [subjects, setSubjects] = useState<SubjectSummary[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [ready, setReady] = useState(false);
  const [showDebug, setShowDebug] = useState(false);
  const [rawReport, setRawReport] = useState<any>(null);

  // Wait for children to load first so we have a real child ID
  useEffect(() => {
    let cancelled = false;
    apiGetChildren()
      .then(() => {
        if (!cancelled) setReady(true);
      })
      .catch(() => {
        if (!cancelled) setReady(true); // proceed anyway, will show empty
      });
    return () => { cancelled = true; };
  }, []); // mount-only

  // Fetch report only after children are loaded AND we have a real child ID
  useEffect(() => {
    if (!ready) return;
    if (!boundChildId) {
      setSubjects([]);
      return;
    }
    let cancelled = false;
    setLoading(true);
    setError(null);

    apiGetLearningReport(boundChildId)
      .then((report) => {
        if (cancelled) return;
        setRawReport(report);
        const subjs: SubjectSummary[] = report.subjects.map((s) => {
          let total = 0;
          let mastered = 0;
          let partial = 0;
          for (const chap of s.chapters) {
            for (const kp of chap.knowledgePoints) {
              total += 1;
              const m = mapMastery(kp.mastery);
              if (m === "mastered") mastered += 1;
              else if (m === "partial") partial += 1;
            }
          }
          return {
            name: s.subject,
            emoji:
              s.subject.toLowerCase().includes("math") || s.subject.includes("數") ? "📐"
              : s.subject.toLowerCase().includes("eng") || s.subject.includes("英") ? "🌍"
              : s.subject.toLowerCase().includes("chi") || s.subject.includes("語") ? "📖"
              : "📚",
            total, mastered, partial, weak: total - mastered - partial,
          };
        });
        setSubjects(subjs);
      })
      .catch(() => {
        if (!cancelled) setError(t("ps.fetchError"));
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => { cancelled = true; };
  }, [boundChildId, ready]); // t removed from deps

  return (
    <MobileShell title={t("ps.title")} tabs={parentTabs}>
      <div className="space-y-3 stagger-children">
        {loading && (
          <div className="flex flex-col items-center justify-center py-10">
            <RefreshCw className="h-6 w-6 animate-spin text-primary/40" />
            <p className="mt-2 text-xs text-muted-foreground/50">Loading…</p>
          </div>
        )}

        {error && !loading && (
          <div className="rounded-2xl border border-weak/20 bg-weak/5 p-4 text-center">
            <p className="text-sm text-weak">{error}</p>
          </div>
        )}

        {!loading && !error && subjects.length === 0 && (
          <div className="flex flex-col items-center justify-center py-10">
            <p className="text-sm text-muted-foreground/60">{t("ps.noData")}</p>
          </div>
        )}

        {subjects.map((s) => {
          const pct = s.total > 0 ? Math.round(((s.mastered * 100) + (s.partial * 50)) / s.total) : 0;
          return (
            <div key={s.name} className="rounded-2xl border border-border/50 bg-card p-4 shadow-sm transition-all hover:shadow-md">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-soft/60 text-2xl">
                  {s.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold">{s.name}</h3>
                  <div className="mt-0.5 flex items-center gap-1.5 text-xs text-muted-foreground/60">
                    <BookOpen className="h-3 w-3" />
                    <span>{t("ps.points", { n: s.total })}</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-primary">{pct}%</p>
                  <p className="text-[10px] text-muted-foreground/50">{t("ps.masteredLabel")}</p>
                </div>
              </div>
              {s.total > 0 && (
                <>
                  <div className="mt-3 flex h-2 overflow-hidden rounded-full bg-muted/40">
                    <div className="bg-mastered transition-all duration-500" style={{ width: `${(s.mastered / s.total) * 100}%` }} />
                    <div className="bg-partial transition-all duration-500" style={{ width: `${(s.partial / s.total) * 100}%` }} />
                    <div className="bg-weak transition-all duration-500" style={{ width: `${(s.weak / s.total) * 100}%` }} />
                  </div>
                  <div className="mt-2.5 flex justify-between text-[11px] text-muted-foreground/50">
                    <span className="flex items-center gap-1">
                      <span className="inline-block h-2 w-2 rounded-full bg-mastered" />
                      {t("ps.legend.mastered", { n: s.mastered })}
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="inline-block h-2 w-2 rounded-full bg-partial" />
                      {t("ps.legend.partial", { n: s.partial })}
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="inline-block h-2 w-2 rounded-full bg-weak" />
                      {t("ps.legend.weak", { n: s.weak })}
                    </span>
                  </div>
                </>
              )}
            </div>
          );
        })}

        <PermissionNotice text={t("ps.permission")} />

        {/* Debug: raw API response */}
        {rawReport && (
          <div className="mt-4">
            <button
              onClick={() => setShowDebug(!showDebug)}
              className="flex items-center gap-1 text-[10px] text-muted-foreground/30 hover:text-muted-foreground/60"
            >
              <Bug className="h-3 w-3" /> {showDebug ? "Hide" : "Show"} raw data
            </button>
            {showDebug && (
              <pre className="mt-1 max-h-60 overflow-auto rounded-xl bg-muted/20 p-3 text-[9px] text-muted-foreground/50">
                {JSON.stringify(rawReport, null, 2)}
              </pre>
            )}
          </div>
        )}
      </div>
    </MobileShell>
  );
}
