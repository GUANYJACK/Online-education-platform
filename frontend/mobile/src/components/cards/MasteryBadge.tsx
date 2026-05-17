import type { Mastery } from "@/lib/mock-data";
import { useT } from "@/lib/i18n";

const STYLE: Record<Mastery, { bg: string; text: string; dot: string }> = {
  mastered: { bg: "bg-mastered-soft/70", text: "text-mastered", dot: "bg-mastered" },
  partial: { bg: "bg-partial-soft/70", text: "text-partial", dot: "bg-partial" },
  weak: { bg: "bg-weak-soft/70", text: "text-weak", dot: "bg-weak" },
};

export function MasteryBadge({ level }: { level: Mastery }) {
  const t = useT();
  const m = STYLE[level];
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold ${m.bg} ${m.text} scale-in`}>
      <span className={`inline-block h-1.5 w-1.5 rounded-full ${m.dot}`} />
      {t(`mastery.${level}`)}
    </span>
  );
}
