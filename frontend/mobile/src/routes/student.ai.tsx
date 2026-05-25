import { createFileRoute, Link, useSearch } from "@tanstack/react-router";
import { useState, useRef, useEffect, Fragment, useMemo } from "react";
import { MobileShell } from "@/components/mobile/MobileShell";
import { studentTabs } from "@/components/mobile/student-tabs";
import { subjects as mockSubjects } from "@/lib/mock-data";
import { useCurriculum } from "@/lib/useCurriculum";
import { apiChat } from "@/lib/api";
import { useT } from "@/lib/i18n";
import { useAppStore } from "@/lib/store";
import { Send, Mic, Sparkles, MessageSquare, ShieldAlert, History, Plus, X, Trash2 } from "lucide-react";

export const Route = createFileRoute("/student/ai")({
  component: AIChat,
  validateSearch: (search: Record<string, unknown>) => ({
    kp: (search.kp as string) || undefined,
    subject: (search.subject as string) || undefined,
    chapter: (search.chapter as string) || undefined,
  }),
});

interface Msg { role: "user" | "ai"; text: string; blocked?: boolean }

function AIChat() {
  const t = useT();
  const userId = useAppStore((s) => s.userId);
  const { aiSessions, saveSession, removeSession } = useAppStore();
  const { kp, subject: urlSubject, chapter: urlChapter } = Route.useSearch();
  const [mode, setMode] = useState<"free" | "guided">("guided");
  const [input, setInput] = useState("");
  const [sessionId, setSessionId] = useState(() => `s_${Date.now()}`);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [sending, setSending] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);
  const initializedRef = useRef(false);

  const { data: apiSubjects } = useCurriculum(userId);
  const subjects = (apiSubjects && apiSubjects.length > 0) ? apiSubjects : mockSubjects;

  const kpIndex = useMemo(
    () =>
      subjects.flatMap((s) =>
        s.chapters.flatMap((c) =>
          c.points.map((p) => ({
            name: t(`kp.${p.id}.n`),
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
      name: t(`kp.${point.id}.n`),
      desc: t(`kp.${point.id}.d`),
      subjectName: t(`subj.${subj!.id}`),
      chapterName: t(`ch.${subj!.id}.${chap!.id}`),
    };
  }, [kp, urlSubject, urlChapter, t, subjects]);

  useEffect(() => {
    if (initializedRef.current) return;
    initializedRef.current = true;
    if (kpInfo) {
      setMessages([{ role: "ai", text: t("ai.greet.kp", { kp: kpInfo.name, desc: kpInfo.desc, subject: kpInfo.subjectName, chapter: kpInfo.chapterName }) }]);
      setMode("guided");
    } else {
      setMessages([{ role: "ai", text: t("ai.greet.guided") }]);
    }
  }, [kpInfo, t]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const userMsgs = messages.filter((m) => m.role === "user");
    if (userMsgs.length === 0) return;
    saveSession({ id: sessionId, title: userMsgs[0].text.slice(0, 20), mode, createdAt: Date.now(), messages });
  }, [messages, sessionId, mode, saveSession]);

  const switchMode = (m: "free" | "guided") => {
    if (m === mode) return;
    const hasUserMessages = messages.some((msg) => msg.role === "user");
    if (hasUserMessages) {
      const confirmed = window.confirm(t("ai.switchConfirm"));
      if (!confirmed) return;
    }
    setMode(m);
    setMessages([{ role: "ai", text: t(m === "guided" ? "ai.greet.guided" : "ai.greet.free") }]);
    setSessionId(`s_${Date.now()}`);
  };

  const newChat = () => {
    setMessages([{ role: "ai", text: t(mode === "guided" ? "ai.greet.guided" : "ai.greet.free") }]);
    setSessionId(`s_${Date.now()}`);
    setHistoryOpen(false);
  };

  const loadSession = (sid: string) => {
    const s = aiSessions.find((x) => x.id === sid);
    if (!s) return;
    setMessages(s.messages);
    setMode(s.mode);
    setSessionId(s.id);
    setHistoryOpen(false);
  };

  const send = async () => {
    if (!input.trim() || sending) return;
    const text = input.trim();
    setInput("");
    setMessages((m) => [...m, { role: "user", text }]);
    setSending(true);
    try {
      const res = await apiChat({
        studentId: userId || "unknown",
        message: text,
        context: kpInfo ? { kp: kpInfo.name, subject: kpInfo.subjectName, chapter: kpInfo.chapterName } : {},
      });
      setMessages((m) => [...m, { role: "ai", text: res.response }]);
    } catch {
      // Fallback to local reply if API unavailable
      setMessages((m) => [...m, { role: "ai", text: t(mode === "guided" ? "ai.reply.guided" : "ai.reply.free") }]);
    } finally {
      setSending(false);
    }
  };

  const tryVoice = () => alert(t("ai.voiceAlert"));

  const renderText = (text: string) => {
    const matches: { start: number; end: number; subject: string; chapter: string; name: string }[] = [];
    for (const kpItem of kpIndex) {
      let i = 0;
      while ((i = text.indexOf(kpItem.name, i)) !== -1) {
        matches.push({ start: i, end: i + kpItem.name.length, ...kpItem });
        i += kpItem.name.length;
      }
    }
    matches.sort((a, b) => a.start - b.start);
    const filtered: typeof matches = [];
    let lastEnd = -1;
    for (const m of matches) {
      if (m.start >= lastEnd) { filtered.push(m); lastEnd = m.end; }
    }
    if (filtered.length === 0) return text;
    const parts: React.ReactNode[] = [];
    let pos = 0;
    filtered.forEach((m, i) => {
      if (pos < m.start) parts.push(<Fragment key={`t${i}`}>{text.slice(pos, m.start)}</Fragment>);
      parts.push(
        <Link key={`l${i}`} to="/student/learn/$subject/$chapter" params={{ subject: m.subject, chapter: m.chapter }} className="font-semibold text-primary underline underline-offset-2 decoration-primary/30">
          {m.name}
        </Link>,
      );
      pos = m.end;
    });
    if (pos < text.length) parts.push(<Fragment key="tail">{text.slice(pos)}</Fragment>);
    return parts;
  };

  const modeBg = mode === "guided"
    ? "bg-gradient-to-b from-primary-soft/30 via-background to-background"
    : "bg-gradient-to-b from-mastered-soft/30 via-background to-background";

  return (
    <MobileShell
      title={t("ai.title")}
      tabs={studentTabs}
      noPad
      right={
        <div className="flex items-center gap-0.5">
          <button onClick={newChat} className="flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground/70 transition-all hover:bg-muted active:scale-90" aria-label="new">
            <Plus className="h-4 w-4" />
          </button>
          <button onClick={() => setHistoryOpen(true)} className="flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground/70 transition-all hover:bg-muted active:scale-90" aria-label="history">
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
              { k: "guided", label: t("ai.mode.guided"), Icon: Sparkles },
              { k: "free", label: t("ai.mode.free"), Icon: MessageSquare },
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
        <div className="flex-1 space-y-3 px-4 py-4 pb-28">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm ${
                  m.role === "user"
                    ? "rounded-br-md bg-primary text-primary-foreground"
                    : m.blocked
                      ? "rounded-bl-md border border-destructive/20 bg-weak-soft/80 text-weak"
                      : "rounded-bl-md border border-border/40 bg-card text-foreground"
                }`}
              >
                {m.blocked && <ShieldAlert className="mb-1 inline h-3.5 w-3.5 mr-1" />}
                {m.role === "ai" && !m.blocked ? renderText(m.text) : m.text}
              </div>
            </div>
          ))}
          <div ref={endRef} />
        </div>
      </div>

      {/* Input bar */}
      <div className="fixed bottom-[68px] left-1/2 z-10 w-full max-w-[430px] -translate-x-1/2 border-t border-border/40 bg-background/92 px-3 py-2.5 backdrop-blur-xl">
        <div className="flex items-center gap-2">
          <button onClick={tryVoice} className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted/60 text-muted-foreground/60 transition-all hover:bg-muted active:scale-90">
            <Mic className="h-4 w-4" />
          </button>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
            placeholder={t("ai.placeholder")}
            disabled={sending}
            className="flex-1 rounded-full border border-border/60 bg-muted/40 px-4 py-2.5 text-sm outline-none transition-all focus:border-primary/40 focus:bg-background"
          />
          <button onClick={send} className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-md shadow-primary/20 transition-all active:scale-90">
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* History drawer */}
      {historyOpen && (
        <div className="fixed inset-0 z-30 flex" onClick={() => setHistoryOpen(false)}>
          <div className="flex-1 bg-black/30 backdrop-blur-sm" />
          <div
            className="ml-auto flex h-full w-[78%] max-w-[320px] flex-col bg-background shadow-2xl slide-up"
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
                          {t(`ai.mode.${s.mode}`)} · {new Date(s.createdAt).toLocaleString()}
                        </p>
                      </button>
                      <button onClick={() => removeSession(s.id)} className="text-muted-foreground/40 hover:text-destructive transition-colors">
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      )}
    </MobileShell>
  );
}
