"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Apple, Battery, Wifi, Search, Music } from "lucide-react";

function formatTime(date: Date, timeZone: string, locale: string) {
  return new Intl.DateTimeFormat(locale, {
    hour: "2-digit",
    minute: "2-digit",
    timeZone,
  }).format(date);
}

export function Menubar() {
  const t = useTranslations("menubar");
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const tick = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(tick);
  }, []);

  const lyon = now ? formatTime(now, "Europe/Paris", "fr-FR") : "--:--";
  const local = now
    ? formatTime(now, Intl.DateTimeFormat().resolvedOptions().timeZone, "en-US")
    : "--:--";

  return (
    <header
      className="absolute inset-x-0 top-0 z-30 flex h-7 items-center gap-4 px-3 text-[12px] backdrop-blur-md"
      style={{ background: "var(--menubar-bg)", color: "var(--menubar-fg)" }}
    >
      <div className="flex items-center gap-3">
        <Apple size={14} className="opacity-90" aria-hidden="true" />
        <span className="font-semibold tracking-tight">{t("ownerName")}</span>
        <span className="opacity-80">Finder</span>
      </div>

      <div className="ml-auto flex items-center gap-4 opacity-90">
        <span className="flex items-center gap-1.5">
          <Music size={12} aria-hidden="true" />
          <span className="hidden sm:inline">{t("nowPlaying")}</span>
        </span>
        <Search size={13} aria-hidden="true" />
        <Wifi size={13} aria-hidden="true" />
        <Battery size={14} aria-hidden="true" />
        <span className="tabular-nums">Lyon · {lyon}</span>
        <span className="hidden md:inline tabular-nums opacity-70">· {local}</span>
      </div>
    </header>
  );
}
