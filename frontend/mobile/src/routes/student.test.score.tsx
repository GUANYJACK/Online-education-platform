import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { MobileShell } from "@/components/mobile/MobileShell";
import { subjects as mockSubjects } from "@/lib/mock-data";
import { useCurriculum } from "@/lib/useCurriculum";
import { useT } from "@/lib/i18n";
import { useAppStore } from "@/lib/store";

export const Route = createFileRoute("/student/test/score")({
  component: ScoreEntry,
});

function ScoreEntry() {
  const t = useT();
  const userId = useAppStore((s) => s.userId);
  const { data: apiSubjects } = useCurriculum(userId);
  const subjectList = (apiSubjects && apiSubjects.length > 0) ? apiSubjects : mockSubjects;
  const [subject, setSubject] = useState<string>(subjectList[0]?.id || "math");
  const [score, setScore] = useState("");
  const [exam, setExam] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const submit = () => {
    if (!score) { setError(t("test.score.error.empty")); return; }
    const num = Number(score);
    if (isNaN(num) || num < 0 || num > 100) { setError(t("test.score.error.range")); return; }
    setError("");
    const subjectName = subjectList.find((s) => s.id === subject)?.name || subject;
    alert(t("test.score.toast", { s: t(subjectName), e: exam || t("test.score.examDefault"), n: Math.round(num) }));
    navigate({ to: "/student/test" });
  };

  return (
    <MobileShell title={t("test.scoreEntry")} back>
      <div className="space-y-4">
        <div>
          <label className="text-xs font-medium text-muted-foreground/70">{t("test.score.subject")}</label>
          <select
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="mt-1.5 w-full rounded-2xl border border-border/80 bg-card px-4 py-3.5 text-sm outline-none transition-all focus:border-primary/50 focus:ring-2 focus:ring-primary/10"
          >
            {subjectList.map((s) => (
              <option key={s.id} value={s.id}>{t(s.name)}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-xs font-medium text-muted-foreground/70">{t("test.score.exam")}</label>
          <input
            value={exam}
            onChange={(e) => setExam(e.target.value)}
            placeholder={t("test.score.examPh")}
            className="mt-1.5 w-full rounded-2xl border border-border/80 bg-card px-4 py-3.5 text-sm outline-none transition-all focus:border-primary/50 focus:ring-2 focus:ring-primary/10"
          />
        </div>
        <div>
          <label className="text-xs font-medium text-muted-foreground/70">{t("test.score.score")}</label>
          <input
            value={score}
            onChange={(e) => { setScore(e.target.value); setError(""); }}
            type="number"
            min={0}
            max={100}
            placeholder="0 - 100"
            className={`mt-1.5 w-full rounded-2xl border bg-card px-4 py-3.5 text-sm outline-none transition-all focus:ring-2 ${
              error ? "border-destructive/50 focus:border-destructive focus:ring-destructive/10" : "border-border/80 focus:border-primary/50 focus:ring-primary/10"
            }`}
          />
          {error && <p className="mt-1.5 text-xs text-destructive">{error}</p>}
        </div>
        <button
          onClick={submit}
          className="mt-4 w-full rounded-2xl bg-primary py-3.5 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/20 transition-all active:scale-[0.97]"
        >
          {t("common.save")}
        </button>
      </div>
    </MobileShell>
  );
}
