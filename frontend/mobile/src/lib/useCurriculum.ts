import { useQuery } from "@tanstack/react-query";
import { apiGetProgress, ApiProgressItem, ApiMastery } from "./api";

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

const EMOJIS: Record<string, string> = {
  chinese: "📖",
  english: "🌍",
  math: "📐",
};

function mapMastery(m: ApiMastery): Mastery {
  if (m === "MASTERED") return "mastered";
  if (m === "PARTIAL") return "partial";
  return "weak";
}

/**
 * Extract subjects/chapters/KPs from the progress API response.
 * Each progress item contains knowledgePoint → chapter → subject.
 * We build the curriculum tree and merge mastery from progress records.
 */
function buildCurriculum(progressItems: ApiProgressItem[]): Subject[] {
  const subjectMap = new Map<string, Subject>();

  for (const item of progressItems) {
    const { knowledgePoint } = item;
    const { chapter } = knowledgePoint;
    const { subject } = chapter;

    if (!subjectMap.has(subject.id)) {
      subjectMap.set(subject.id, {
        id: subject.id,
        name: subject.name,
        emoji: EMOJIS[subject.id] || "📚",
        chapters: [],
      });
    }
    const subj = subjectMap.get(subject.id)!;

    let chap = subj.chapters.find((c) => c.id === chapter.id);
    if (!chap) {
      chap = { id: chapter.id, name: chapter.name, points: [] };
      subj.chapters.push(chap);
    }

    if (!chap.points.find((p) => p.id === knowledgePoint.id)) {
      chap.points.push({
        id: knowledgePoint.id,
        name: knowledgePoint.name,
        desc: knowledgePoint.desc,
        mastery: mapMastery(item.mastery),
      });
    }
  }

  return Array.from(subjectMap.values());
}

export function useCurriculum(studentId: string | null) {
  return useQuery({
    queryKey: ["curriculum", studentId] as const,
    queryFn: async (): Promise<Subject[]> => {
      if (!studentId) return [];
      const progress = await apiGetProgress(studentId);
      return buildCurriculum(progress);
    },
    enabled: !!studentId,
    staleTime: 30_000,
  });
}
