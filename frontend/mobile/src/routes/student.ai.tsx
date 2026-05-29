import { createFileRoute, Link, useSearch } from "@tanstack/react-router";
import { useState, useRef, useEffect, Fragment, useMemo, useCallback } from "react";
import { createPortal } from "react-dom";
import { MobileShell } from "@/components/mobile/MobileShell";
import { studentTabs } from "@/components/mobile/student-tabs";
import { MarkdownContent } from "@/components/MarkdownContent";
import { subjects as mockSubjects } from "@/lib/mock-data";
import { useCurriculum } from "@/lib/useCurriculum";
import { apiChat, apiCreateChatSession, apiGetChatSessions, apiGetChatSession, apiDeleteChatSession } from "@/lib/api";
import { useT, useLang } from "@/lib/i18n";
import { useAppStore } from "@/lib/store";
import { getSocraticPrompt, getGuidedPrompt } from "@/lib/prompts";
import { Send, Mic, Sparkles, MessageSquare, ShieldAlert, History, Plus, X, Trash2, Bot } from "lucide-react";

export const Route = createFileRoute("/student/ai")({
  component: AIChat,
  validateSearch: (search: Record<string, unknown>) => ({
    kp: (search.kp as string) || undefined,
    subject: (search.subject as string) || undefined,
    chapter: (search.chapter as string) || undefined,
  }),
});

interface Msg {
  role: "user" | "ai";
  text: string;
  blocked?: boolean;
  kps?: { name: string; subject: string; chapter: string }[];
}

function AIChat() {
  const t = useT();
  const lang = useLang();
  const userId = useAppStore((s) => s.userId);
  const { aiSessions, saveSession, removeSession } = useAppStore();
  const { kp, subject: urlSubject, chapter: urlChapter } = Route.useSearch();
  const [mode, setMode] = useState<"free" | "guided">("free");
  const [input, setInput] = useState("");
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [sending, setSending] = useState(false);
  const [loadingSession, setLoadingSession] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);
  const initializedRef = useRef(false);

  const { data: apiSubjects } = useCurriculum(userId);
  const subjects = (apiSubjects && apiSubjects.length > 0) ? apiSubjects : mockSubjects;

  const kpIndex = useMemo(
    () =>
      subjects.flatMap((s) =>
        s.chapters.flatMap((c) =>
          c.points.map((p) => ({
            name: t(p.name),
            subject: s.id,
            chapter: c.id,
          })),
        ),
      ),
    [t, subjects],
  );

  const kpInfo = useMemo(() => {
    if (!kp || !urlSubject || !urlChapter) return null;
    const subj = subjects.find((s) => s.id === urlSubject);
    const chap = subj?.chapters.find((c) => c.id === urlChapter);
    const point = chap?.points.find((p) => p.id === kp);
    if (!point) return null;
    return {
      id: point.id,
      name: t(point.name),
      desc: t(point.desc),
      subjectName: t(subj!.name),
      chapterName: t(chap!.name),
    };
  }, [kp, urlSubject, urlChapter, t, subjects]);

  useEffect(() => {
    if (initializedRef.current) return;
    initializedRef.current = true;
    if (kpInfo) {
      setMessages([{ role: "ai", text: t("ai.greet.kp", { kp: kpInfo.name, desc: kpInfo.desc, subject: kpInfo.subjectName, chapter: kpInfo.chapterName }), kps: kpIndex }]);
      setMode("guided");
    } else {
      setMessages([{ role: "ai", text: t("ai.greet.free"), kps: kpIndex }]);
    }
  }, [kpInfo, t, kpIndex]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, sending]);

  // ── Fetch session list from backend when history drawer opens ──
  const refreshSessions = useCallback(async () => {
    try {
      const res = await apiGetChatSessions();
      useAppStore.setState({ aiSessions: [] });
      res.sessions.forEach((s: any) => {
        saveSession({
          id: s.sessionId,
          title: s.title,
          mode: "guided",
          subject: s.subject,
          topic: s.topic,
          createdAt: new Date(s.createdAt).getTime(),
          updatedAt: new Date(s.updatedAt).getTime(),
        });
      });
    } catch {
      // Backend unavailable — keep local cache
    }
  }, [saveSession]);

  const switchMode = (m: "free" | "guided") => {
    if (m === mode) return;
    setMode(m);
    setMessages([{ role: "ai", text: t(m === "guided" ? "ai.greet.guided" : "ai.greet.free"), kps: kpIndex }]);
    setSessionId(null);
  };

  const newChat = async () => {
    setMessages([{ role: "ai", text: t(mode === "guided" ? "ai.greet.guided" : "ai.greet.free"), kps: kpIndex }]);
    try {
      const subject = kpInfo?.subjectName || undefined;
      const topic = kpInfo?.name || undefined;
      const chapter = kpInfo ? urlChapter : undefined;
      const knowledgepoint = kpInfo?.name || undefined;
      const grade = useAppStore.getState().grade;

      const basePrompt = mode === "guided"
        ? getGuidedPrompt(lang)
        : getSocraticPrompt(lang, grade);

      let systemPrompt = "";
      if (mode === "guided" && kpInfo) {
        systemPrompt = `${basePrompt}\n\n# Current Context\nSubject: ${kpInfo.subjectName}\nChapter: ${kpInfo.chapterName}\nKnowledge Point: ${kpInfo.name}\nGrade: ${grade}`;
      } else {
        systemPrompt = basePrompt;
      }

      const res = await apiCreateChatSession({
        type: "Socratic",
        title: mode === "guided" ? (kpInfo?.name || "Guided Learning") : "Free Chat",
        subject,
        topic,
        chapter,
        knowledgepoint,
        systemPrompt,
      });
      setSessionId(res.session.sessionId);
      saveSession({
        id: res.session.sessionId,
        title: res.session.title,
        mode,
        subject: res.session.subject,
        topic: res.session.topic,
        createdAt: Date.now(),
      });
    } catch {
      setSessionId(null);
    }
    setHistoryOpen(false);
  };

  const loadSession = async (sid: string) => {
    setLoadingSession(true);
    setHistoryOpen(false);
    try {
      const res = await apiGetChatSession(sid);
      const history: Msg[] = res.session.chatHistories.map((h: any) => ({
        role: h.sender === "USER" ? "user" : "ai",
        text: h.message,
        kps: kpIndex,
      }));
      setMessages(history.length > 0 ? history : [{ role: "ai", text: t("ai.greet.guided"), kps: kpIndex }]);
      setSessionId(sid);
    } catch {
      const s = aiSessions.find((x) => x.id === sid);
      if (s) {
        setMessages([{ role: "ai", text: t("ai.greet.guided"), kps: kpIndex }]);
        setSessionId(s.id);
      }
    } finally {
      setLoadingSession(false);
    }
  };

  const deleteSession = async (sid: string) => {
    removeSession(sid);
    try {
      await apiDeleteChatSession(sid);
    } catch {
      // Ignore delete errors
    }
  };

  const send = async () => {
    if (!input.trim() || sending) return;
    const text = input.trim();
    setInput("");
    setMessages((m) => [...m, { role: "user", text }]);
    setSending(true);
    try {
      let currentSessionId = sessionId;
      if (!currentSessionId) {
        try {
          const subject = kpInfo?.subjectName || undefined;
          const topic = kpInfo?.name || undefined;
          const chapter = kpInfo ? urlChapter : undefined;
          const knowledgepoint = kpInfo?.name || undefined;
          const grade = useAppStore.getState().grade;

          const basePrompt = mode === "guided"
            ? getGuidedPrompt(lang)
            : getSocraticPrompt(lang, grade);

          let systemPrompt = "";
          if (mode === "guided" && kpInfo) {
            systemPrompt = `${basePrompt}\n\n# Current Context\nSubject: ${kpInfo.subjectName}\nChapter: ${kpInfo.chapterName}\nKnowledge Point: ${kpInfo.name}\nGrade: ${grade}`;
          } else {
            systemPrompt = basePrompt;
          }

          const res = await apiCreateChatSession({
            type: "Socratic",
            title: mode === "guided" ? (kpInfo?.name || "Guided Learning") : "Free Chat",
            subject,
            topic,
            chapter,
            knowledgepoint,
            systemPrompt,
          });
          currentSessionId = res.session.sessionId;
          setSessionId(currentSessionId);
          saveSession({
            id: currentSessionId,
            title: res.session.title,
            mode,
            subject: res.session.subject,
            topic: res.session.topic,
            createdAt: Date.now(),
          });
        } catch {
          // Backend unavailable
        }
      }

      if (currentSessionId) {
        const res = await apiChat({ sessionId: currentSessionId, message: text });
        setMessages((m) => [...m, { role: "ai", text: res.response, kps: kpIndex }]);
      } else {
        throw new Error("No session available");
      }
    } catch (err: any) {
      const errorMsg = err?.message || t("ai.error.unknown");
      setMessages((m) => [...m, { role: "ai", text: t("ai.error.prefix") + errorMsg, blocked: true }]);
    } finally {
      setSending(false);
    }
  };

  const tryVoice = () => alert(t("ai.voiceAlert"));

  // Pre-process text: replace knowledge point names with markdown links
  const processTextWithKpLinks = useCallback(
    (text: string): string => {
      let processed = text;
      // Sort by length descending so longer names match first
      const sorted = [...kpIndex].sort((a, b) => b.name.length - a.name.length);
      for (const kpItem of sorted) {
        const escaped = kpItem.name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        const regex = new RegExp(`(?<!\\[)${escaped}(?!\\))`, "g");
        processed = processed.replace(
          regex,
          `[${kpItem.name}](/student/learn/${kpItem.subject}/${kpItem.chapter})`,
        );
      }
      return processed;
    },
    [kpIndex],
  );

  const modeBg = mode === "guided"
    ? "bg-gradient-to-b from-primary-soft/30 via-background to-background"
    : "bg-gradient-to-b from-mastered-soft/30 via-background to-background";

  const historyDrawer = useMemo(() => {
    if (!historyOpen) return null;
    return createPortal(
      <div className="fixed inset-0 z-50" onClick={() => setHistoryOpen(false)}>
        <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />
        <div className="pointer-events-none absolute inset-0 mx-auto flex max-w-[430px] justify-end">
          <div
            className="pointer-events-auto flex h-full w-[78%] max-w-[320px] flex-col bg-background shadow-2xl slide-in-right"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-border/40 px-4 py-3.5">
              <h3 className="text-sm font-bold">{t("ai.history")}</h3>
              <button onClick={() => setHistoryOpen(false)} className="flex h-7 w-7 items-center justify-center rounded-full hover:bg-muted">
                <X className="h-4 w-4 text-muted-foreground/60" />
              </button>
            </div>
            <button
              onClick={newChat}
              className="m-3 flex items-center justify-center gap-2 rounded-2xl bg-primary py-2.5 text-xs font-semibold text-primary-foreground shadow-sm"
            >
              <Plus className="h-3.5 w-3.5" />
              {t("ai.newChat")}
            </button>
            <div className="flex-1 overflow-y-auto px-3 pb-4">
              {aiSessions.length === 0 ? (
                <p className="mt-8 text-center text-xs text-muted-foreground/50">{t("ai.noHistory")}</p>
              ) : (
                <ul className="space-y-2">
                  {aiSessions.map((s) => (
                    <li
                      key={s.id}
                      className={`flex items-center gap-2 rounded-xl border px-3 py-2.5 transition-all ${
                        s.id === sessionId ? "border-primary/40 bg-primary-soft/50" : "border-border/40 bg-card hover:bg-muted/30"
                      }`}
                    >
                      <button onClick={() => loadSession(s.id)} className="flex-1 text-left">
                        <p className="line-clamp-1 text-xs font-medium">{s.title}</p>
                        <p className="mt-0.5 text-[10px] text-muted-foreground/50">
                          {s.topic ? `${s.topic} · ` : ""}{s.subject || t(`ai.mode.${s.mode}`)} · {new Date(s.createdAt).toLocaleString()}
                        </p>
                      </button>
                      <button onClick={() => deleteSession(s.id)} className="text-muted-foreground/40 hover:text-destructive transition-colors">
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>,
      document.body,
    );
  }, [historyOpen, aiSessions, sessionId, mode, t, newChat, loadSession]);

  return (
    <>
      <MobileShell
        title={t("ai.title")}
        tabs={studentTabs}
        noPad
        right={
          <div className="flex items-center gap-0.5">
            <button onClick={newChat} className="flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground/70 transition-all hover:bg-muted active:scale-90" aria-label="new">
              <Plus className="h-4 w-4" />
            </button>
            <button onClick={() => { setHistoryOpen(true); refreshSessions(); }} className="flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground/70 transition-all hover:bg-muted active:scale-90" aria-label="history">
              <History className="h-4 w-4" />
            </button>
          </div>
        }
      >
        <div className={`flex min-h-full flex-col ${modeBg}`}>
          {/* Mode switcher */}
          <div className="border-b border-border/40 bg-background/80 px-4 py-2.5 backdrop-blur-xl">
            <div className="flex gap-1 rounded-2xl bg-muted/60 p-1">
              {[
                { k: "free", label: t("ai.mode.free"), Icon: MessageSquare },
                { k: "guided", label: t("ai.mode.guided"), Icon: Sparkles },
              ].map(({ k, label, Icon }) => (
                <button
                  key={k}
                  onClick={() => switchMode(k as "free" | "guided")}
                  className={`flex flex-1 items-center justify-center gap-1.5 rounded-xl py-2 text-xs font-medium transition-all duration-200 ${
                    mode === k ? "bg-card text-foreground shadow-sm" : "text-muted-foreground/60"
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {label}
                </button>
              ))}
            </div>
            <p className={`mt-1.5 px-1 text-[11px] ${mode === "guided" ? "text-primary/70" : "text-mastered/70"}`}>
              {t(mode === "guided" ? "ai.guidedHint" : "ai.freeHint")}
            </p>
          </div>

          {/* Messages */}
          <div className="flex-1 px-4 py-4 pb-28">
            {messages.map((m, i) => (
              <div key={i} className={m.role === "user" ? "mb-4 flex justify-end" : "mb-6"}>
                {m.role === "ai" ? (
                  <div className="flex gap-2.5">
                    {/* AI avatar */}
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-primary-soft/60 mt-0.5">
                      <Bot className="h-4 w-4 text-primary/70" />
                    </div>
                    {/* Flat content — no bubble */}
                    <div className="flex-1 min-w-0 pt-0.5">
                      {m.blocked ? (
                        <div className="flex items-start gap-1.5 rounded-lg border border-destructive/15 bg-weak-soft/50 px-3 py-2.5">
                          <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0 text-weak" />
                          <p className="text-sm leading-[1.7] text-weak">{m.text}</p>
                        </div>
                      ) : (
                        <MarkdownContent content={processTextWithKpLinks(m.text)} />
                      )}
                    </div>
                  </div>
                ) : (
                  /* User message — keep as bubble */
                  <div className="max-w-[78%] rounded-2xl rounded-br-md bg-primary px-4 py-3 text-sm leading-relaxed text-primary-foreground shadow-sm shadow-primary/10">
                    {m.text}
                  </div>
                )}
              </div>
            ))}

            {/* Loading indicator — flat, no bubble */}
            {(sending || loadingSession) && (
              <div className="mb-6 flex gap-2.5">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-primary-soft/60 mt-0.5">
                  <Bot className="h-4 w-4 text-primary/70" />
                </div>
                <div className="flex items-center gap-1.5 pt-2">
                  <span className="inline-block h-2 w-2 rounded-full bg-primary/50 animate-bounce [animation-delay:0ms]" />
                  <span className="inline-block h-2 w-2 rounded-full bg-primary/50 animate-bounce [animation-delay:150ms]" />
                  <span className="inline-block h-2 w-2 rounded-full bg-primary/50 animate-bounce [animation-delay:300ms]" />
                </div>
              </div>
            )}

            <div ref={endRef} />
          </div>
        </div>

        {/* Input bar */}
        <div className="fixed bottom-[68px] left-1/2 z-10 w-full max-w-[430px] -translate-x-1/2 border-t border-border/40 bg-background/92 px-3 py-2.5 backdrop-blur-xl">
          <div className="flex items-center gap-2">
            <button onClick={tryVoice} className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted/60 text-muted-foreground/60 transition-all hover:bg-muted active:scale-90" disabled={sending}>
              <Mic className="h-4 w-4" />
            </button>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder={sending ? t("ai.thinking") : t("ai.placeholder")}
              disabled={sending || loadingSession}
              className="flex-1 rounded-full border border-border/60 bg-muted/40 px-4 py-2.5 text-sm outline-none transition-all focus:border-primary/40 focus:bg-background disabled:opacity-60"
            />
            <button onClick={send} disabled={sending || loadingSession} className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-md shadow-primary/20 transition-all active:scale-90 disabled:opacity-70 disabled:shadow-none">
              {sending ? (
                <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
              ) : (
                <Send className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>
      </MobileShell>
      {historyDrawer}
    </>
  );
}
