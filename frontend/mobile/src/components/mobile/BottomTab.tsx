import { Link } from "@tanstack/react-router";
import type { LucideIcon } from "lucide-react";
import { useT } from "@/lib/i18n";

export interface TabItem {
  to: string;
  label: string;
  icon: LucideIcon;
}

export function BottomTab({ items }: { items: TabItem[] }) {
  const t = useT();
  return (
    <nav className="fixed bottom-0 left-1/2 z-20 w-full max-w-[430px] -translate-x-1/2 border-t border-border/60 bg-background/92 backdrop-blur-xl">
      <ul className="grid grid-cols-5 px-1 pb-[calc(env(safe-area-inset-bottom)+8px)] pt-1.5">
        {items.map((it) => {
          const Icon = it.icon;
          return (
            <li key={it.to}>
              <Link
                to={it.to}
                activeOptions={{ exact: false }}
                className="group flex flex-col items-center gap-0.5 rounded-xl px-1 py-1.5 transition-all"
              >
                {({ isActive }) => (
                  <>
                    <div className={`flex h-8 w-8 items-center justify-center rounded-xl transition-all duration-200 ${
                      isActive
                        ? "bg-primary text-primary-foreground shadow-md shadow-primary/20 scale-105"
                        : "text-muted-foreground group-active:scale-90"
                    }`}>
                      <Icon className="h-[18px] w-[18px]" strokeWidth={isActive ? 2.2 : 1.8} />
                    </div>
                    <span className={`text-[10px] font-medium transition-colors ${
                      isActive ? "text-primary" : "text-muted-foreground/70"
                    }`}>
                      {t(it.label)}
                    </span>
                  </>
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
