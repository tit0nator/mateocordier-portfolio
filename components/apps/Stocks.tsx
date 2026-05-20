"use client";

import { useTranslations } from "next-intl";
import { STATS, type Stat } from "@/lib/stats";

const TREND_COLOR: Record<Stat["trend"], string> = {
  up:      "#34C759",
  down:    "#FF3B30",
  neutral: "#8e8e93",
};

const TREND_ARROW: Record<Stat["trend"], string> = {
  up:      "▲",
  down:    "▼",
  neutral: "—",
};

function Sparkline({ data, trend }: { data: number[]; trend: Stat["trend"] }) {
  if (data.length < 2) return null;

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const W = 52;
  const H = 22;
  const xStep = W / (data.length - 1);

  const points = data
    .map((v, i) => `${i * xStep},${H - ((v - min) / range) * H}`)
    .join(" ");

  return (
    <svg width={W} height={H} aria-hidden="true" className="shrink-0">
      <polyline
        points={points}
        fill="none"
        stroke={TREND_COLOR[trend]}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function StatCard({ stat }: { stat: Stat }) {
  const t = useTranslations("apps.stocks.metrics");
  const color = TREND_COLOR[stat.trend];

  return (
    <div
      className="flex flex-col gap-1.5 rounded-xl p-3"
      style={{ background: "#2c2c2e" }}
    >
      <p className="text-[10px] font-medium uppercase tracking-wide" style={{ color: "#8e8e93" }}>
        {t(stat.labelKey as Parameters<typeof t>[0])}
      </p>
      <p className="text-[22px] font-bold leading-none tracking-tight text-white">
        {stat.value}
      </p>
      <div className="flex items-center justify-between pt-0.5">
        <span className="text-[10px] font-medium" style={{ color }}>
          {TREND_ARROW[stat.trend]} {stat.trendLabel}
        </span>
        <Sparkline data={stat.sparkline} trend={stat.trend} />
      </div>
    </div>
  );
}

export function Stocks(_: { windowId: string }) {
  const t = useTranslations("apps.stocks");

  return (
    <div
      className="flex h-full flex-col overflow-y-auto"
      style={{ background: "#1c1c1e", color: "#e5e5e5" }}
    >
      {/* Header */}
      <div className="shrink-0 px-4 pt-4 pb-1">
        <h1 className="text-[24px] font-bold leading-tight tracking-tight text-white">
          Mateo Cordier
        </h1>
        <p className="mt-0.5 text-[11px] font-medium" style={{ color: "#8e8e93" }}>
          Freelance Dev & Marketing · Lyon, FR
        </p>
        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-[32px] font-bold tracking-tight text-white">12</span>
          <span
            className="rounded-md px-1.5 py-0.5 text-[11px] font-semibold"
            style={{ background: "rgba(52,199,89,0.15)", color: "#34C759" }}
          >
            ▲ {t("headline")}
          </span>
        </div>
      </div>

      {/* Divider */}
      <div className="mx-4 my-3 h-px" style={{ background: "rgba(255,255,255,0.06)" }} />

      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-2.5 px-3.5 pb-4">
        {STATS.map((stat) => (
          <StatCard key={stat.id} stat={stat} />
        ))}
      </div>
    </div>
  );
}
