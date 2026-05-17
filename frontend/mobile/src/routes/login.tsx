import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useAppStore } from "@/lib/store";
import { useT } from "@/lib/i18n";
import { LanguagePopup } from "@/components/LanguagePopup";
import { GraduationCap, Smartphone, Mail, User as UserIcon } from "lucide-react";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "登录 — 智学" }] }),
  component: LoginPage,
});

function LoginPage() {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [tab, setTab] = useState<"phone" | "email">("phone");
  const [account, setAccount] = useState("");
  const [nickname, setNickname] = useState("");
  const [code, setCode] = useState("");
  const [countdown, setCountdown] = useState(0);
  const setLogin = useAppStore((s) => s.setLogin);
  const navigate = useNavigate();
  const t = useT();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!account) return;
    setLogin(account, nickname.trim(), "gaokao");
    if (mode === "register") {
      navigate({ to: "/onboarding" });
    } else {
      useAppStore.getState().setOnboarded();
      navigate({ to: "/role" });
    }
  };

  return (
    <div className="phone-frame paper-texture">
      <div className="flex flex-1 flex-col px-7 pt-14 pb-10">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/25">
              <GraduationCap className="h-6 w-6" strokeWidth={2.2} />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">{t("app.name")}</h1>
              <p className="text-[11px] text-muted-foreground/80">{t("app.tagline")}</p>
            </div>
          </div>
          <LanguagePopup />
        </div>

        {/* Welcome text */}
        <div className="mt-10">
          <h2 className="text-[26px] font-bold tracking-tight leading-tight">
            {mode === "login" ? t("login.welcome") : t("login.welcome")}
          </h2>
          <p className="mt-2 text-sm text-muted-foreground/80">
            {mode === "login" ? t("login.subtitle") : t("register.subtitle")}
          </p>
        </div>

        {/* Tab switcher */}
        <div className="mt-6 flex items-center gap-3">
          <div className="flex flex-1 gap-1 rounded-2xl bg-muted/80 p-1">
            {[
              { k: "phone", label: t("login.tab.phone"), Icon: Smartphone },
              { k: "email", label: t("login.tab.email"), Icon: Mail },
            ].map(({ k, label, Icon }) => (
              <button
                key={k}
                onClick={() => setTab(k as "phone" | "email")}
                className={`flex flex-1 items-center justify-center gap-1.5 rounded-xl py-2.5 text-[13px] font-medium transition-all duration-200 ${
                  tab === k
                    ? "bg-card text-foreground shadow-sm"
                    : "text-muted-foreground/70"
                }`}
              >
                <Icon className="h-4 w-4" />
                {label}
              </button>
            ))}
          </div>
          <button
            onClick={() => setMode(mode === "login" ? "register" : "login")}
            className="shrink-0 rounded-xl px-3.5 py-2 text-xs font-semibold text-primary transition-all hover:bg-primary-soft active:scale-95 whitespace-nowrap"
          >
            {mode === "login" ? t("login.toRegister") : t("login.toLogin")}
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-5 space-y-3">
          {mode === "register" && (
            <div className="relative">
              <UserIcon className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/50" />
              <input
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                placeholder={t("login.placeholder.nickname")}
                className="w-full rounded-2xl border border-border/80 bg-card py-3 pl-10 pr-4 text-sm outline-none transition-all focus:border-primary/50 focus:ring-2 focus:ring-primary/10"
              />
            </div>
          )}
          <input
            value={account}
            onChange={(e) => setAccount(e.target.value)}
            placeholder={tab === "phone" ? t("login.placeholder.phone") : t("login.placeholder.email")}
            className="w-full rounded-2xl border border-border/80 bg-card px-4 py-3.5 text-sm outline-none transition-all focus:border-primary/50 focus:ring-2 focus:ring-primary/10"
          />
          <div className="relative">
            <input
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder={tab === "phone" ? t("login.placeholder.code") : t("login.placeholder.password")}
              type={tab === "email" ? "password" : "text"}
              className="w-full rounded-2xl border border-border/80 bg-card px-4 py-3.5 pr-24 text-sm outline-none transition-all focus:border-primary/50 focus:ring-2 focus:ring-primary/10"
            />
            {tab === "phone" && (
              <button
                type="button"
                disabled={countdown > 0}
                onClick={() => {
                  if (!account) return;
                  setCountdown(60);
                  const timer = setInterval(() => {
                    setCountdown((c) => {
                      if (c <= 1) { clearInterval(timer); return 0; }
                      return c - 1;
                    });
                  }, 1000);
                }}
                className={`absolute right-2 top-1/2 -translate-y-1/2 rounded-xl px-3.5 py-1.5 text-xs font-semibold transition-all ${
                  countdown > 0
                    ? "bg-muted text-muted-foreground/50"
                    : "bg-primary-soft text-primary hover:bg-primary/15 active:scale-95"
                }`}
              >
                {countdown > 0 ? `${countdown}s` : t("login.getCode")}
              </button>
            )}
          </div>

          <button
            type="submit"
            className="mt-2 w-full rounded-2xl bg-primary py-3.5 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/25 transition-all active:scale-[0.97] hover:shadow-xl hover:shadow-primary/30"
          >
            {mode === "login" ? t("login.submit") : t("register.submit")}
          </button>
        </form>

        {/* Divider */}
        <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-border/60" />
          <span className="text-[11px] text-muted-foreground/50">{t("login.thirdParty")}</span>
          <div className="h-px flex-1 bg-border/60" />
        </div>

        {/* Third party */}
        <div className="flex justify-center gap-5">
          {["微信", "QQ"].map((p) => (
            <button
              key={p}
              onClick={() => alert(t("login.toast.thirdParty", { p }))}
              className="flex h-13 w-13 items-center justify-center rounded-2xl border border-border/60 bg-card text-lg shadow-sm transition-all hover:shadow-md active:scale-95"
              style={{ width: 52, height: 52 }}
            >
              {p === "微信" ? "💬" : "🐧"}
            </button>
          ))}
        </div>

        <p className="mt-8 text-center text-[11px] text-muted-foreground/50 leading-relaxed">
          {t("login.terms")}
        </p>
      </div>
    </div>
  );
}
