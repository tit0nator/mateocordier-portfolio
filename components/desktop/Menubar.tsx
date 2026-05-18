"use client";

import { useEffect, useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { Apple, Battery, Wifi, Music, Sun, Moon } from "lucide-react";
import { useThemeStore } from "@/lib/themeStore";

function formatTime(date: Date, timeZone: string, locale: string) {
  return new Intl.DateTimeFormat(locale, {
    hour: "2-digit",
    minute: "2-digit",
    timeZone,
  }).format(date);
}

export function Menubar() {
  const t = useTranslations("menubar");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const isDark = useThemeStore((s) => s.isDark);
  const toggle = useThemeStore((s) => s.toggle);

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

  function switchLocale() {
    router.replace(pathname, { locale: locale === "fr" ? "en" : "fr" });
  }

  return (
    <header
      className="absolute inset-x-0 top-0 z-30 flex h-7 items-center gap-4 px-3 text-[12px] backdrop-blur-md"
      style={{ background: "var(--menubar-bg)", color: "var(--menubar-fg)" }}
    >
      {/* Left cluster */}
      <div className="flex items-center gap-3">
        <Apple size={14} className="opacity-90" aria-hidden="true" />
        <span className="font-semibold tracking-tight">{t("ownerName")}</span>
        <span className="opacity-70">Finder</span>
      </div>

      {/* Right cluster */}
      <div className="ml-auto flex items-center gap-3 opacity-90">
        {/* Now playing */}
        <span className="hidden items-center gap-1.5 sm:flex">
          <Music size={11} aria-hidden="true" />
          <span className="hidden lg:inline">{t("nowPlaying")}</span>
        </span>

        {/* Fake status icons */}
        <Wifi size={13} aria-hidden="true" />
        <Battery size={14} aria-hidden="true" />

        {/* Dark mode toggle */}
        <button
          type="button"
          aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
          onClick={toggle}
          className="flex items-center justify-center opacity-80 hover:opacity-100 transition-opacity"
        >
          {isDark ? <Sun size={13} aria-hidden="true" /> : <Moon size={13} aria-hidden="true" />}
        </button>

        {/* Locale toggle */}
        <button
          type="button"
          aria-label="Switch language"
          onClick={switchLocale}
          className="rounded px-1.5 py-0.5 text-[11px] font-semibold opacity-70 hover:opacity-100 hover:bg-black/8 dark:hover:bg-white/10 transition-all"
        >
          {locale === "fr" ? "EN" : "FR"}
        </button>

        {/* Clocks */}
        <span className="tabular-nums">Lyon · {lyon}</span>
        <span className="hidden md:inline tabular-nums opacity-60">· {local}</span>
      </div>
    </header>
  );
}
