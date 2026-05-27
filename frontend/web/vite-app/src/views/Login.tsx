import { useState, FormEvent } from "react";
import type { Lang } from "../types";
import { apiLogin, apiRegister, apiSelectRole } from "../lib/api";
import { setLang as setI18nLang, t, useLang } from "../lib/i18n";
import { classNames } from "../lib/format";

interface LoginProps {
  onLogin: (
    token: string,
    user: { id: number; name: string; role: string },
  ) => void;
}

const ROLES = [
  {
    value: "TEACHER",
    label: "Teacher",
    desc: "Manage classes and track student progress",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="4" width="18" height="13" rx="2" stroke="currentColor" strokeWidth="1.6"/>
        <path d="M8 20h8M12 17v3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
        <path d="M8 9h8M8 12h5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    value: "SCHOOL_ADMIN",
    label: "School Admin",
    desc: "Oversee the entire school and its staff",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <path d="M3 21h18M6 21V9l6-6 6 6v12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
        <rect x="9" y="14" width="6" height="7" rx="1" stroke="currentColor" strokeWidth="1.4"/>
      </svg>
    ),
  },
] as const;

type RoleValue = typeof ROLES[number]["value"];

export function ViewLogin({ onLogin }: LoginProps) {
  const [lang, setLangState] = useState<Lang>(
    () => (localStorage.getItem("lumen_lang") as Lang) || "en",
  );
  const [tab, setTab] = useState<"login" | "register">("login");

  // register flow steps
  const [step, setStep] = useState<"form" | "pick-role">("form");
  const [pendingUserId, setPendingUserId] = useState("");
  const [pendingEmail, setPendingEmail] = useState("");
  const [pendingPassword, setPendingPassword] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useLang();

  function handleLangChange(l: Lang) {
    setLangState(l);
    setI18nLang(l);
    localStorage.setItem("lumen_lang", l);
  }

  function switchTab(t: "login" | "register") {
    setTab(t);
    setError("");
    setStep("form");
  }

  async function handleLogin(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const data = await apiLogin(email, password);
      onLogin(data.token, data.user);
    } catch (err) {
      setError(err instanceof Error ? err.message : t("Login failed"));
    } finally {
      setLoading(false);
    }
  }

  async function handleRegister(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const { userId } = await apiRegister(name, email, password);
      setPendingUserId(userId);
      setPendingEmail(email);
      setPendingPassword(password);
      setStep("pick-role");
    } catch (err) {
      setError(err instanceof Error ? err.message : t("Registration failed"));
    } finally {
      setLoading(false);
    }
  }

  async function handleSelectRole(role: RoleValue) {
    setError("");
    setLoading(true);
    try {
      await apiSelectRole(pendingUserId, role);
      const data = await apiLogin(pendingEmail, pendingPassword);
      onLogin(data.token, data.user);
    } catch (err) {
      setError(err instanceof Error ? err.message : t("Role selection failed"));
      setLoading(false);
    }
  }

  return (
    <div className="auth-page">
      <div className={classNames("auth-card", step === "pick-role" && "auth-card--wide")}>
        <div className="auth-card__toprow">
          <div className="auth-brand">
            <div className="brand-mark">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 3L4 7v5c0 4.4 3.4 8.5 8 9.5 4.6-1 8-5.1 8-9.5V7l-8-4z"
                  fill="currentColor"
                  fillOpacity=".9"
                />
                <path
                  d="M9 12l2 2 4-4"
                  stroke="#fff"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <span className="auth-brand__name">{t("Smart Learn")}</span>
          </div>
          <div className="role-switch" role="tablist" aria-label="Language">
            <button
              role="tab"
              aria-selected={lang === "en"}
              className={classNames("role-switch__opt", lang === "en" && "is-active")}
              onClick={() => handleLangChange("en")}
            >
              EN
            </button>
            <button
              role="tab"
              aria-selected={lang === "zh-TW"}
              className={classNames("role-switch__opt", lang === "zh-TW" && "is-active")}
              onClick={() => handleLangChange("zh-TW")}
            >
              繁中
            </button>
          </div>
        </div>

        {step === "pick-role" ? (
          <>
            <div className="auth-pick-role-header">
              <p className="auth-pick-role-title">{t("Choose your role")}</p>
              <p className="auth-pick-role-sub">{t("You can change this later in settings")}</p>
            </div>
            {error && <p className="auth-error">{error}</p>}
            <div className="auth-role-grid">
              {ROLES.map((r) => (
                <button
                  key={r.value}
                  className="auth-role-card"
                  onClick={() => handleSelectRole(r.value)}
                  disabled={loading}
                >
                  <span className="auth-role-card__icon">{r.icon}</span>
                  <span className="auth-role-card__label">{t(r.label)}</span>
                  <span className="auth-role-card__desc">{t(r.desc)}</span>
                </button>
              ))}
            </div>
          </>
        ) : (
          <>
            <div className="auth-tabs">
              <button
                className={`auth-tab${tab === "login" ? " auth-tab--active" : ""}`}
                onClick={() => switchTab("login")}
              >
                {t("Sign in")}
              </button>
              <button
                className={`auth-tab${tab === "register" ? " auth-tab--active" : ""}`}
                onClick={() => switchTab("register")}
              >
                {t("Create account")}
              </button>
            </div>

            {tab === "login" ? (
              <form className="auth-form" onSubmit={handleLogin}>
                <label className="auth-label">
                  {t("Email")}
                  <input
                    className="auth-input"
                    type="email"
                    autoComplete="email"
                    placeholder="you@school.edu"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </label>
                <label className="auth-label">
                  {t("Password")}
                  <input
                    className="auth-input"
                    type="password"
                    autoComplete="current-password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </label>
                {error && <p className="auth-error">{error}</p>}
                <button className="auth-submit" type="submit" disabled={loading}>
                  {loading ? t("Signing in…") : t("Sign in")}
                </button>
              </form>
            ) : (
              <form className="auth-form" onSubmit={handleRegister}>
                <label className="auth-label">
                  {t("Full name")}
                  <input
                    className="auth-input"
                    type="text"
                    autoComplete="name"
                    placeholder="Jane Smith"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </label>
                <label className="auth-label">
                  {t("Email")}
                  <input
                    className="auth-input"
                    type="email"
                    autoComplete="email"
                    placeholder="you@school.edu"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </label>
                <label className="auth-label">
                  {t("Password")}
                  <input
                    className="auth-input"
                    type="password"
                    autoComplete="new-password"
                    placeholder={t("Min. 8 characters")}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </label>
                {error && <p className="auth-error">{error}</p>}
                <button className="auth-submit" type="submit" disabled={loading}>
                  {loading ? t("Creating account…") : t("Create account")}
                </button>
              </form>
            )}
          </>
        )}
      </div>
    </div>
  );
}
