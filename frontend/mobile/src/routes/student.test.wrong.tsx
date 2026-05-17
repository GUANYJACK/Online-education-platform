import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { MobileShell } from "@/components/mobile/MobileShell";
import { useT } from "@/lib/i18n";
import { Camera, Image as ImageIcon, FileSearch } from "lucide-react";

export const Route = createFileRoute("/student/test/wrong")({
  component: WrongEntry,
});

function WrongEntry() {
  const [file, setFile] = useState<File | null>(null);
  const [recognizing, setRecognizing] = useState(false);
  const t = useT();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] ?? null;
    setFile(f);
    if (f) {
      setRecognizing(true);
      setTimeout(() => setRecognizing(false), 2000);
    }
  };

  return (
    <MobileShell title={t("test.wrong.title")} back>
      <label className="flex h-52 cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-border/50 bg-muted/20 text-muted-foreground/50 transition-all hover:border-primary/30 hover:bg-primary-soft/10">
        <input
          type="file"
          accept="image/*"
          capture="environment"
          className="hidden"
          onChange={handleFileChange}
        />
        {file ? (
          recognizing ? (
            <>
              <ImageIcon className="h-10 w-10 text-primary animate-pulse" />
              <span className="text-sm font-medium text-foreground">{file.name}</span>
              <span className="text-xs text-primary">{t("test.wrong.recognizing")}</span>
            </>
          ) : (
            <>
              <FileSearch className="h-10 w-10 text-primary" />
              <span className="text-sm font-medium text-foreground">{file.name}</span>
              <span className="text-xs text-muted-foreground/60">{t("test.wrong.recognizeDone")}</span>
            </>
          )
        ) : (
          <>
            <Camera className="h-10 w-10" />
            <span className="text-sm font-medium">{t("test.wrong.upload")}</span>
            <span className="text-[11px] text-muted-foreground/40">支持拍照或从相册选择</span>
          </>
        )}
      </label>
      {file && !recognizing && (
        <div className="mt-4 rounded-2xl border border-border/50 bg-card p-4 shadow-sm">
          <p className="text-xs font-medium text-muted-foreground/60">{t("test.wrong.aiResult")}</p>
          <p className="mt-2 text-sm font-bold">{t("test.wrong.subjectVal")}</p>
          <p className="text-sm text-muted-foreground/70">{t("test.wrong.pointVal")}</p>
          <p className="mt-2 text-xs text-muted-foreground/50">{t("test.wrong.added")}</p>
        </div>
      )}
    </MobileShell>
  );
}
