import { ReactNode } from "react";
import { useRouter } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";

export function AppBar({ title, back, right }: { title: string; back?: boolean; right?: ReactNode }) {
  const router = useRouter();
  return (
    <header className="sticky top-0 z-10 flex items-center gap-2 border-b border-border/60 bg-background/90 px-4 py-3 backdrop-blur-xl">
      {back ? (
        <button
          onClick={() => router.history.back()}
          className="-ml-1 flex h-9 w-9 items-center justify-center rounded-full text-foreground/80 transition-all hover:bg-muted active:scale-90"
          aria-label="返回"
        >
          <ChevronLeft className="h-5 w-5" strokeWidth={2.5} />
        </button>
      ) : (
        <span className="w-8" />
      )}
      <h1 className="flex-1 text-[17px] font-bold tracking-tight">{title}</h1>
      {right && <div className="flex items-center gap-0.5">{right}</div>}
    </header>
  );
}
