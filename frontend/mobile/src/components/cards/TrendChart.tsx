import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useT } from "@/lib/i18n";

interface Props {
  data: { day: string; mastery: number; time: number }[];
}

const DAY_KEYS = ["day.mon", "day.tue", "day.wed", "day.thu", "day.fri", "day.sat", "day.sun"];

export function TrendChart({ data }: Props) {
  const t = useT();
  const localized = data.map((d, i) => ({ ...d, day: t(DAY_KEYS[i] ?? "") || d.day }));
  return (
    <div className="h-44 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={localized} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="masteryGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="oklch(0.42 0.14 270)" stopOpacity={0.35} />
              <stop offset="100%" stopColor="oklch(0.42 0.14 270)" stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <XAxis dataKey="day" tick={{ fontSize: 11, fill: "oklch(0.52 0.025 70)" }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 11, fill: "oklch(0.52 0.025 70)" }} axisLine={false} tickLine={false} width={28} />
          <Tooltip
            contentStyle={{
              borderRadius: 16,
              border: "1px solid oklch(0.91 0.008 80)",
              fontSize: 12,
              boxShadow: "0 8px 24px -8px oklch(0.2 0.02 65 / 0.12)",
            }}
            formatter={((v: unknown) => [`${v}%`, t("po.mastery")]) as never}
          />
          <Area type="monotone" dataKey="mastery" stroke="oklch(0.42 0.14 270)" strokeWidth={2.5} fill="url(#masteryGrad)" dot={false} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
