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

export const subjects: Subject[] = [
  {
    id: "chinese",
    name: "subj.chinese",
    emoji: "📖",
    chapters: [
      {
        id: "reading",
        name: "ch.chinese.reading",
        points: [
          { id: "prose", name: "kp.prose.n", desc: "kp.prose.d", mastery: "mastered" },
          { id: "classical", name: "kp.classical.n", desc: "kp.classical.d", mastery: "partial" },
        ],
      },
      {
        id: "writing",
        name: "ch.chinese.writing",
        points: [
          { id: "narrative", name: "kp.narrative.n", desc: "kp.narrative.d", mastery: "partial" },
          { id: "argumentative", name: "kp.argumentative.n", desc: "kp.argumentative.d", mastery: "weak" },
        ],
      },
      {
        id: "oral",
        name: "ch.chinese.oral",
        points: [
          { id: "listening", name: "kp.listening.n", desc: "kp.listening.d", mastery: "mastered" },
          { id: "integrated", name: "kp.integrated.n", desc: "kp.integrated.d", mastery: "partial" },
        ],
      },
    ],
  },
  {
    id: "english",
    name: "subj.english",
    emoji: "🌍",
    chapters: [
      {
        id: "reading",
        name: "ch.english.reading",
        points: [
          { id: "comprehension", name: "kp.comprehension.n", desc: "kp.comprehension.d", mastery: "partial" },
          { id: "vocabulary", name: "kp.vocabulary.n", desc: "kp.vocabulary.d", mastery: "mastered" },
        ],
      },
      {
        id: "writing",
        name: "ch.english.writing",
        points: [
          { id: "part1", name: "kp.part1.n", desc: "kp.part1.d", mastery: "mastered" },
          { id: "part2", name: "kp.part2.n", desc: "kp.part2.d", mastery: "partial" },
        ],
      },
      {
        id: "listening",
        name: "ch.english.listening",
        points: [
          { id: "dictation", name: "kp.dictation.n", desc: "kp.dictation.d", mastery: "weak" },
          { id: "integrated", name: "kp.integrated.n", desc: "kp.integrated.d", mastery: "partial" },
        ],
      },
    ],
  },
  {
    id: "math",
    name: "subj.math",
    emoji: "📐",
    chapters: [
      {
        id: "algebra",
        name: "ch.math.algebra",
        points: [
          { id: "quadratic", name: "kp.quadratic.n", desc: "kp.quadratic.d", mastery: "mastered" },
          { id: "functions", name: "kp.functions.n", desc: "kp.functions.d", mastery: "partial" },
          { id: "polynomial", name: "kp.polynomial.n", desc: "kp.polynomial.d", mastery: "weak" },
        ],
      },
      {
        id: "geometry",
        name: "ch.math.geometry",
        points: [
          { id: "trigonometry", name: "kp.trigonometry.n", desc: "kp.trigonometry.d", mastery: "partial" },
          { id: "circle", name: "kp.circle.n", desc: "kp.circle.d", mastery: "weak" },
          { id: "coordinate", name: "kp.coordinate.n", desc: "kp.coordinate.d", mastery: "mastered" },
        ],
      },
      {
        id: "statistics",
        name: "ch.math.statistics",
        points: [
          { id: "probability", name: "kp.probability.n", desc: "kp.probability.d", mastery: "partial" },
          { id: "distribution", name: "kp.distribution.n", desc: "kp.distribution.d", mastery: "weak" },
        ],
      },
    ],
  },
];

export const trendData = [
  { day: "Mon", mastery: 52, time: 35 },
  { day: "Tue", mastery: 55, time: 42 },
  { day: "Wed", mastery: 58, time: 28 },
  { day: "Thu", mastery: 60, time: 50 },
  { day: "Fri", mastery: 63, time: 45 },
  { day: "Sat", mastery: 67, time: 60 },
  { day: "Sun", mastery: 70, time: 55 },
];

export const mockChildren = [
  { id: "c1", name: "梓軒", grade: "中五", lastSync: "2分鐘前", avatar: "👦" },
  { id: "c2", name: "曉晴", grade: "中三", lastSync: "1小時前", avatar: "👧" },
];

export const sensitiveKeywords = ["暴力", "色情", "犯罪", "自殺"];

export interface QuizQuestion {
  id: string;
  q: string;
  options: string[];
  answer: number;
  pointId: string;
}
export const quizQuestions: QuizQuestion[] = [
  {
    id: "q1",
    q: "二次方程 x²-2x+1=0 的解為？",
    options: ["x=1（重根）", "x=1 或 x=-1", "x=2", "無解"],
    answer: 0,
    pointId: "quadratic",
  },
  {
    id: "q2",
    q: "下列哪個函數的圖像是一條直線？",
    options: ["y=x²+1", "y=2x-3", "y=1/x", "y=√x"],
    answer: 1,
    pointId: "functions",
  },
  {
    id: "q3",
    q: "sin 30° 的值是？",
    options: ["1/2", "√3/2", "√2/2", "1"],
    answer: 0,
    pointId: "trigonometry",
  },
];
