"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { ACTIVITIES as FALLBACK_ACTIVITIES, type Activity } from "@/lib/strava";

const ACTIVITY_EMOJI: Record<Activity["type"], string> = {
  run:  "\u{1F3C3}",
  ride: "\u{1F6B4}",
  hike: "\u{1F97E}",
};

const ROUTE_PATHS = [
  "M5,50 C20,40 30,20 45,30 S65,10 80,25 S90,45 95,35",
  "M5,30 C15,50 25,15 40,35 S55,55 70,30 S85,45 95,25",
  "M5,45 C20,15 35,50 50,25 S65,55 80,30 S90,20 95,40",
  "M5,20 C15,45 30,10 48,40 S60,15 75,45 S88,30 95,50",
  "M5,35 C18,55 28,25 42,45 S56,20 72,40 S82,55 95,30",
];

function RouteSquiggle({ index }: { index: number }) {
  const path = ROUTE_PATHS[index % ROUTE_PATHS.length];
  return (
    <div
      className="flex-shrink-0 overflow-hidden rounded-md"
      style={{ width: 80, height: 48, background: "rgba(252,76,2,0.08)" }}
    >
      <svg width="80" height="48" viewBox="0 0 100 60" fill="none" aria-hidden="true">
        <path
          d={path}
          stroke="#FC4C02"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          opacity="0.85"
        />
      </svg>
    </div>
  );
}

function SkeletonCard() {
  return (
    <div className="flex flex-col gap-2 rounded-xl border border-zinc-200 bg-white p-3 dark:border-zinc-700/60 dark:bg-zinc-800/70 animate-pulse">
      <div className="h-4 w-3/4 rounded bg-zinc-200 dark:bg-zinc-700" />
      <div className="h-3 w-1/2 rounded bg-zinc-200 dark:bg-zinc-700" />
      <div className="h-10 w-20 rounded bg-zinc-200 dark:bg-zinc-700" />
    </div>
  );
}

function ActivityCard({ activity }: { activity: Activity }) {
  const t = useTranslations("apps.strava");
  return (
    <div className="flex flex-col gap-2 rounded-xl border border-zinc-200 bg-white p-3 shadow-sm dark:border-zinc-700/60 dark:bg-zinc-800/70">
      <div className="flex items-start gap-2">
        <span className="text-[15px]" role="img" aria-label={activity.type}>
          {ACTIVITY_EMOJI[activity.type]}
        </span>
        <p className="flex-1 text-[12.5px] font-semibold leading-tight text-zinc-900 dark:text-zinc-100">
          {activity.title}
        </p>
      </div>
      <div className="flex items-center gap-3 text-[11px] font-medium text-zinc-600 dark:text-zinc-400">
        <span>{activity.distance}</span>
        <span className="text-zinc-300 dark:text-zinc-600">&middot;</span>
        <span>{activity.time}</span>
        <span className="text-zinc-300 dark:text-zinc-600">&middot;</span>
        <span>{activity.pace}</span>
      </div>
      <div className="flex items-center justify-between">
        <RouteSquiggle index={activity.routeIndex} />
        <div className="flex flex-col items-end gap-0.5">
          <span className="text-[10.5px] text-zinc-500 dark:text-zinc-500">{activity.date}</span>
          <span className="text-[10.5px] text-zinc-500 dark:text-zinc-500">
            {"❤️"} {activity.kudos} kudos
          </span>
        </div>
      </div>
    </div>
  );
}

export function Strava(_: { windowId: string }) {
  const t = useTranslations("apps.strava");
  const [activities, setActivities] = useState<Activity[]>(FALLBACK_ACTIVITIES);
  const [isLive, setIsLive] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/strava")
      .then((r) => r.json())
      .then((data: { fallback: boolean; activities: Activity[] }) => {
        if (cancelled) return;
        setActivities(data.activities);
        setIsLive(!data.fallback);
      })
      .catch(() => {})
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, []);

  const totalKm = activities.reduce((sum, a) => sum + parseFloat(a.distance), 0).toFixed(1);

  return (
    <div className="flex h-full flex-col bg-white dark:bg-zinc-900">
      <div
        className="shrink-0 border-b border-zinc-200 px-4 py-3 dark:border-zinc-800"
        style={{ borderTop: "3px solid #FC4C02" }}
      >
        <div className="flex items-center gap-3">
          <div
            className="flex h-9 w-9 items-center justify-center rounded-full text-[13px] font-bold text-white"
            style={{ background: "#FC4C02" }}
          >
            MC
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <p className="text-[13px] font-semibold text-zinc-900 dark:text-zinc-100">
                Mateo Cordier
              </p>
              {isLive && (
                <span className="flex items-center gap-1 rounded-full bg-green-100 px-1.5 py-0.5 text-[9px] font-semibold text-green-700 dark:bg-green-900/40 dark:text-green-400">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-green-500" />
                  Live
                </span>
              )}
            </div>
            <p className="text-[10.5px] text-zinc-500 dark:text-zinc-400">Lyon, France</p>
          </div>
        </div>
        <div
          className="mt-2.5 flex items-center gap-2 rounded-lg px-3 py-2 text-[11px] font-medium"
          style={{ background: "rgba(252,76,2,0.08)", color: "#FC4C02" }}
        >
          <span>{"\u{1F525}"}</span>
          <span>
            {t("weekSummary")} &mdash; {totalKm} km &middot; {activities.length} activities
          </span>
        </div>
      </div>
      <div className="flex-1 space-y-2.5 overflow-y-auto px-3 py-3">
        {loading ? (
          <>
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </>
        ) : (
          activities.map((activity) => (
            <ActivityCard key={activity.id} activity={activity} />
          ))
        )}
        <button
          type="button"
          onClick={() => window.open("https://strava.app.link/Cs1xdDaWg3b", "_blank", "noopener,noreferrer")}
          className="w-full rounded-xl py-2.5 text-[12px] font-semibold text-white transition-opacity hover:opacity-90 active:opacity-75"
          style={{ background: "#FC4C02" }}
        >
          {t("viewOnStrava")} &rarr;
        </button>
      </div>
    </div>
  );
}
