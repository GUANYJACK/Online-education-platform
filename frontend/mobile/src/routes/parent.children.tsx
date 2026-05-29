import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { MobileShell } from "@/components/mobile/MobileShell";
import { parentTabs } from "@/components/mobile/parent-tabs";
import { useAppStore } from "@/lib/store";
import { useT } from "@/lib/i18n";
import { Plus, Check, QrCode, Smartphone, X, UserPlus, RefreshCw } from "lucide-react";
import { apiGetChildren, apiBindChild } from "@/lib/api";

export const Route = createFileRoute("/parent/children")({
  component: ChildrenPage,
});

interface ChildInfo {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
}

function ChildrenPage() {
  const { boundChildId, bindChild } = useAppStore();
  const [showBind, setShowBind] = useState(false);
  const [bindToast, setBindToast] = useState("");
  const [children, setChildren] = useState<ChildInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const t = useT();

  const fetchChildren = async () => {
    setLoading(true);
    setError(null);
    try {
      const list = await apiGetChildren();
      setChildren(list);
    } catch {
      setError(t("pc.fetchError"));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChildren();
  }, []);

  const handleBind = async (method: string) => {
    // In a real flow this would open a form to enter child email/phone,
    // but for now show toast and close (matching original UX)
    setBindToast(t("pc.bindToast", { method }));
    setShowBind(false);
    setTimeout(() => setBindToast(""), 2000);
  };

  const avatars = ["👦", "👧", "🧒"];

  return (
    <MobileShell title={t("pc.title")} tabs={parentTabs}>
      <div className="space-y-2.5 stagger-children">
        {/* Loading state */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-10">
            <RefreshCw className="h-6 w-6 animate-spin text-primary/40" />
            <p className="mt-2 text-xs text-muted-foreground/50">Loading…</p>
          </div>
        )}

        {/* Error state */}
        {error && !loading && (
          <div className="rounded-2xl border border-weak/20 bg-weak/5 p-4 text-center">
            <p className="text-sm text-weak">{error}</p>
            <button
              onClick={fetchChildren}
              className="mt-2 text-xs font-medium text-primary underline"
            >
              {t("common.retry")}
            </button>
          </div>
        )}

        {/* Children list */}
        {!loading && !error && children.length === 0 && (
          <div className="flex flex-col items-center justify-center py-10">
            <p className="text-sm text-muted-foreground/60">{t("pc.noChildren")}</p>
          </div>
        )}

        {!loading &&
          children.map((c, i) => {
            const active = c.id === boundChildId;
            return (
              <button
                key={c.id}
                onClick={() => bindChild(c.id)}
                className={`flex w-full items-center gap-4 rounded-2xl border p-4 text-left shadow-sm transition-all ${
                  active
                    ? "border-primary/40 bg-primary-soft/40"
                    : "border-border/50 bg-card hover:border-border hover:shadow-md"
                }`}
              >
                <div className={`flex h-12 w-12 items-center justify-center rounded-full text-2xl ${active ? "bg-primary/10" : "bg-muted/50"}`}>
                  {avatars[i % avatars.length]}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold">{c.name}</h3>
                  <p className="text-xs text-muted-foreground/60">
                    {c.email || c.phone || ""}
                  </p>
                </div>
                {active && (
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground scale-in">
                    <Check className="h-3.5 w-3.5" />
                  </div>
                )}
              </button>
            );
          })}

        {/* Add child button */}
        <button
          onClick={() => setShowBind(true)}
          className="flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-border/40 py-4.5 text-sm font-medium text-muted-foreground/50 transition-all hover:border-primary/30 hover:text-primary/60 active:scale-[0.98]"
        >
          <UserPlus className="h-4 w-4" /> {t("pc.bind")}
        </button>
      </div>

      {/* Bind modal */}
      {showBind && (
        <div className="fixed inset-0 z-30 flex items-end justify-center bg-black/40 backdrop-blur-sm" onClick={() => setShowBind(false)}>
          <div className="w-full max-w-[430px] rounded-t-3xl bg-background p-5 shadow-2xl slide-up" onClick={(e) => e.stopPropagation()}>
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-base font-bold">{t("pc.bindTitle")}</h3>
              <button onClick={() => setShowBind(false)} className="flex h-7 w-7 items-center justify-center rounded-full hover:bg-muted">
                <X className="h-4 w-4 text-muted-foreground/60" />
              </button>
            </div>
            <div className="space-y-2.5">
              <button
                onClick={() => handleBind(t("pc.bindPhone"))}
                className="flex w-full items-center gap-3 rounded-2xl border border-border/50 p-4 text-left transition-all hover:bg-muted/30 active:scale-[0.98]"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-soft">
                  <Smartphone className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{t("pc.bindPhone")}</p>
                  <p className="text-xs text-muted-foreground/50">{t("pc.bindPhoneDesc")}</p>
                </div>
              </button>
              <button
                onClick={() => handleBind(t("pc.bindScan"))}
                className="flex w-full items-center gap-3 rounded-2xl border border-border/50 p-4 text-left transition-all hover:bg-muted/30 active:scale-[0.98]"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-soft">
                  <QrCode className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{t("pc.bindScan")}</p>
                  <p className="text-xs text-muted-foreground/50">{t("pc.bindScanDesc")}</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {bindToast && (
        <div className="fixed bottom-20 left-1/2 z-40 -translate-x-1/2 rounded-2xl bg-foreground px-5 py-3 text-sm text-background shadow-xl fade-in">
          {bindToast}
        </div>
      )}
    </MobileShell>
  );
}
