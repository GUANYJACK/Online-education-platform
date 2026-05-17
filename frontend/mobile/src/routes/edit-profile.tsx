import { createFileRoute, Navigate, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useAppStore } from "@/lib/store";
import { useT } from "@/lib/i18n";
import { Camera, Check } from "lucide-react";

export const Route = createFileRoute("/edit-profile")({
  head: () => ({ meta: [{ title: "编辑资料 — 智学" }] }),
  component: EditProfilePage,
});

function EditProfilePage() {
  const { loggedIn, nickname, setNickname } = useAppStore();
  const [editName, setEditName] = useState(nickname);
  const [saved, setSaved] = useState(false);
  const navigate = useNavigate();
  const t = useT();

  if (!loggedIn) return <Navigate to="/login" />;

  const role = useAppStore((s) => s.role);
  const handleSave = () => {
    setNickname(editName.trim());
    setSaved(true);
    const to = role === "parent" ? "/parent/me" : "/student/me";
    setTimeout(() => navigate({ to }), 600);
  };

  return (
    <div className="phone-frame">
      <div className="flex flex-1 flex-col px-6 pt-14 pb-8">
        <h2 className="text-xl font-bold tracking-tight">{t("editProfile.title")}</h2>

        {/* Avatar */}
        <div className="mt-8 flex flex-col items-center">
          <div className="relative">
            <div className="flex h-22 w-22 items-center justify-center rounded-full bg-primary-soft text-4xl shadow-inner" style={{ width: 88, height: 88 }}>
              👦
            </div>
            <button className="absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/25">
              <Camera className="h-3.5 w-3.5" />
            </button>
          </div>
          <p className="mt-3 text-xs text-muted-foreground/50">{t("editProfile.avatar")}</p>
        </div>

        {/* Nickname */}
        <div className="mt-8">
          <label className="text-xs font-medium text-muted-foreground/70">{t("editProfile.nickname")}</label>
          <input
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
            placeholder={t("editProfile.nicknamePh")}
            className="mt-1.5 w-full rounded-2xl border border-border/80 bg-card px-4 py-3.5 text-sm outline-none transition-all focus:border-primary/50 focus:ring-2 focus:ring-primary/10"
          />
        </div>

        {/* Save */}
        <div className="mt-auto pt-8">
          <button
            onClick={handleSave}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-primary py-3.5 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/25 transition-all active:scale-[0.97]"
          >
            {saved ? (
              <>
                <Check className="h-4 w-4" />
                {t("common.save")}
              </>
            ) : (
              t("common.save")
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
