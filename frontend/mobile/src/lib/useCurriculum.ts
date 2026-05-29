import { useQuery } from "@tanstack/react-query";
import { apiGetLearningReport } from "./api";
import type { ApiMastery } from "./api";

export type Mastery = "mastered" | "partial" | "weak";

export interface KnowledgePoint {
  id: string;
  name: string;
  desc: string;
  mastery: Mastery;
}

export interface Chapter {
  id: string;
  name: string;
  points: KnowledgePoint[];
}

export interface Subject {
  id: string;
  name: string;
  emoji: string;
  chapters: Chapter[];
}

function mapMastery(m: ApiMastery): Mastery {
  if (m === "MASTERED") return "mastered";
  if (m === "PARTIAL") return "partial";
  return "weak";
}

const subjectEmojis: Record<string, string> = {
  mathematics: "📐",
  數學: "📐",
  math: "📐",
  english: "🌍",
  英語: "🌍",
  chinese: "📖",
  語文: "📖",
};

function getSubjectEmoji(name: string): string {
  const key = name.toLowerCase();
  for (const [k, v] of Object.entries(subjectEmojis)) {
    if (key.includes(k)) return v;
  }
  return "📚";
}

/**
 * Build curriculum tree from the learning report API.
 * The report already returns subject → chapter → knowledgePoints hierarchy.
 */
function buildCurriculumFromReport(report: Awaited<ReturnType<typeof apiGetLearningReport>>): Subject[] {
  return report.subjects.map((s, idx) => ({
    id: String(idx),
    name: s.subject,
    emoji: getSubjectEmoji(s.subject),
    chapters: s.chapters.map((c, cIdx) => ({
      id: String(cIdx),
      name: c.chapter,
      points: c.knowledgePoints.map((kp, kpIdx) => ({
        id: String(kpIdx),
        name: kp.name,
        desc: "",
        mastery: mapMastery(kp.mastery),
      })),
    })),
  }));
}

export function useCurriculum(studentId: string | null) {
  return useQuery({
    queryKey: ["curriculum", studentId] as const,
    queryFn: async (): Promise<Subject[]> => {
      if (!studentId) return [];
      const report = await apiGetLearningReport(studentId);
      return buildCurriculumFromReport(report);
    },
    enabled: !!studentId,
    staleTime: 30_000,
  });
}
