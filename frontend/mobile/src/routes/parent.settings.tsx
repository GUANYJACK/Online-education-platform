import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { MobileShell } from "@/components/mobile/MobileShell";
import { parentTabs } from "@/components/mobile/parent-tabs";
import { useT } from "@/lib/i18n";
import { LanguagePopup } from "@/components/LanguagePopup";
import { Bell, Shield, ChevronRight, Globe } from "lucide-react";

export const Route = createFileRoute("/parent/settings")({
  component: ParentSettings,
});

function ParentSettings() {
  const t = useT();
  const [toast, setToast] = useState("");

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2000);
  };

  const items: { Icon: typeof Bell; label: string; value: string; action: () => void }[] = [
    { Icon: Bell, label: t("me.notify"), value: t("me.notify.value"), action: () => showToast(t("settings.comingSoon")) },
    { Icon: Shield, label: t("me.privacy"), value: "", action: () => showToast(t("settings.comingSoon")) },
  ];

  return (
    <MobileShell title={t("me.settings")} back tabs={parentTabs}>
      <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
        {items.map(({ Icon, label, value, action }, i) => (
          <button
            key={label}
            onClick={action}
            className={`flex w-full items-center gap-3 px-4 py-3.5 text-left ${i > 0 ? "border-t border-border" : ""} active:bg-muted`}
          >
            <Icon className="h-4 w-4 text-muted-foreground" />
            <span className="flex-1 text-sm">{label}</span>
            {value && <span className="text-xs text-muted-foreground">{value}</span>}
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </button>
        ))}
      </div>

      {/* Language — uses bottom-sheet popup */}
      <div className="mt-4 overflow-hidden rounded-2xl border border-border bg-card p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Globe className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{t("lang.label")}</span>
          </div>
          <LanguagePopup />
        </div>
      </div>

      {toast && (
        <div className="fixed bottom-20 left-1/2 z-40 -translate-x-1/2 rounded-xl bg-foreground px-4 py-2.5 text-sm text-background shadow-lg">
          {toast}
        </div>
      )}
    </MobileShell>
  );
}
