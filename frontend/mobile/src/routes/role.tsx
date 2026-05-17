import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useAppStore, type Role } from "@/lib/store";
import { useT } from "@/lib/i18n";
import { BookOpen, Users, ChevronRight } from "lucide-react";

export const Route = createFileRoute("/role")({
  head: () => ({ meta: [{ title: "选择角色" }] }),
  component: RolePage,
});

function RolePage() {
  const setRole = useAppStore((s) => s.setRole);
  const navigate = useNavigate();
  const t = useT();

  const choose = (r: Role) => {
    setRole(r);
    navigate({ to: r === "student" ? "/student/learn" : "/parent/overview" });
  };

  const cards = [
    {
      role: "student" as const,
      title: t("role.student.title"),
      desc: t("role.student.desc"),
      icon: BookOpen,
      grad: "from-primary via-primary/90 to-primary/75",
      shadow: "shadow-primary/20",
    },
    {
      role: "parent" as const,
      title: t("role.parent.title"),
      desc: t("role.parent.desc"),
      icon: Users,
      grad: "from-mastered via-mastered/90 to-mastered/75",
      shadow: "shadow-mastered/20",
    },
  ];

  return (
    <div className="phone-frame">
      <div className="flex flex-1 flex-col px-6 pt-16">
        <h2 className="text-2xl font-bold tracking-tight">{t("role.title")}</h2>
        <p className="mt-1.5 text-sm text-muted-foreground/70">{t("role.subtitle")}</p>

        <div className="mt-8 space-y-4 stagger-children">
          {cards.map((c) => {
            const Icon = c.icon;
            return (
              <button
                key={c.role}
                onClick={() => choose(c.role)}
                className={`group relative w-full overflow-hidden rounded-2xl bg-gradient-to-br ${c.grad} p-5 text-left text-primary-foreground shadow-lg ${c.shadow} transition-all active:scale-[0.97]`}
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 backdrop-blur-sm">
                    <Icon className="h-7 w-7" strokeWidth={2} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold">{c.title}</h3>
                    <p className="mt-1 text-xs text-white/70">{c.desc}</p>
                  </div>
                  <ChevronRight className="h-5 w-5 self-center text-white/40 transition-transform group-hover:translate-x-0.5" />
                </div>
                <div className="pointer-events-none absolute -right-8 -bottom-8 h-28 w-28 rounded-full bg-white/5" />
                <div className="pointer-events-none absolute -left-4 -top-4 h-16 w-16 rounded-full bg-white/5" />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
