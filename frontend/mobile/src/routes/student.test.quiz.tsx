import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { MobileShell } from "@/components/mobile/MobileShell";
import { quizQuestions } from "@/lib/mock-data";
import { apiUpdateProgress } from "@/lib/api";
import { useAppStore } from "@/lib/store";
import { useT } from "@/lib/i18n";

export const Route = createFileRoute("/student/test/quiz")({
  component: QuizPage,
});

function QuizPage() {
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const navigate = useNavigate();
  const completeTest = useAppStore((s) => s.completeTest);
  const userId = useAppStore((s) => s.userId);
  const t = useT();
  const q = quizQuestions[idx];
  const progress = ((idx + 1) / quizQuestions.length) * 100;

  const choose = async (i: number) => {
    const next = [...answers, i];
    setAnswers(next);

    // Update progress for this question
    try {
      const isCorrect = i === q.answer;
      await apiUpdateProgress({
        studentId: userId || "unknown",
        knowledgePointId: q.pointId,
        mastery: isCorrect ? "MASTERED" : "PARTIAL",
        studyTimeSeconds: 60,
      });
    } catch {
      // Silent fail — don't block the quiz flow
    }

    if (idx + 1 < quizQuestions.length) {
      setIdx(idx + 1);
    } else {
      const correct = next.filter((a, k) => a === quizQuestions[k].answer).length;
      const score = Math.round((correct / quizQuestions.length) * 100);
      completeTest(score);
      navigate({ to: "/student/test/result" });
    }
  };

  const optionLabel = (oIdx: number) => {
    if (q.id === "q2") return t(`quiz.${q.id}.o${oIdx}`);
    return q.options[oIdx];
  };

  return (
    <MobileShell title={t("test.qNum", { i: idx + 1, n: quizQuestions.length })} back>
      {/* Progress bar */}
      <div className="mb-5">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-muted-foreground/60">第 {idx + 1} 题</span>
          <span className="text-xs font-medium text-primary">{Math.round(progress)}%</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-muted/60">
          <div
            className="h-full rounded-full bg-gradient-to-r from-primary to-primary/70 transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question card */}
      <div className="rounded-2xl border border-border/50 bg-card p-5 shadow-sm">
        <p className="text-[15px] font-medium leading-relaxed">{t(`quiz.${q.id}.q`)}</p>
      </div>

      {/* Options */}
      <div className="mt-4 space-y-2.5 stagger-children">
        {q.options.map((_, i) => (
          <button
            key={i}
            onClick={() => choose(i)}
            className="flex w-full items-center gap-3.5 rounded-2xl border border-border/50 bg-card p-4 text-left text-sm transition-all hover:border-primary/30 hover:bg-primary-soft/20 active:scale-[0.97]"
          >
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-muted/60 text-xs font-bold text-muted-foreground">
              {String.fromCharCode(65 + i)}
            </span>
            <span className="font-medium">{optionLabel(i)}</span>
          </button>
        ))}
      </div>
    </MobileShell>
  );
}
