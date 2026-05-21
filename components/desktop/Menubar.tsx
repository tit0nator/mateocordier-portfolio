"use client";

import { useEffect, useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { Sun, Moon } from "lucide-react";
import { useThemeStore } from "@/lib/themeStore";
import { useWindowStore } from "@/lib/store";
import { APP_REGISTRY } from "@/components/apps/registry";

function formatLocalTime(date: Date) {
  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const weekday = new Intl.DateTimeFormat("en-US", { weekday: "short", timeZone: tz }).format(date);
  const month   = new Intl.DateTimeFormat("en-US", { month: "short",   timeZone: tz }).format(date);
  const day     = new Intl.DateTimeFormat("en-US", { day: "numeric",   timeZone: tz }).format(date);
  const time    = new Intl.DateTimeFormat("en-US", {
    hour: "2-digit", minute: "2-digit", hour12: false, timeZone: tz,
  }).format(date);
  return weekday + " " + month + " " + day + "  " + time;
}

function AppleLogo() {
  return (
    <svg
      width="14"
      height="17"
      viewBox="0 0 14 17"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M13.23 12.26c-.28.65-.41.94-.77 1.51-.5.77-1.2 1.73-2.07 1.74-.77.01-1-.49-2.07-.48-1.08 0-1.33.49-2.1.48-.87-.01-1.53-.88-2.03-1.65C2.45 11.54 2.16 8.6 3.17 6.9c.73-1.22 1.88-1.94 2.97-1.94 1.1 0 1.8.5 2.71.5.88 0 1.42-.51 2.69-.51 1 0 2.01.55 2.74 1.49-2.41 1.32-2.02 4.77.27 5.54l-.32.28zM9.3 3.53C9.74 2.96 10.08 2.16 9.96 1.34c-.69.05-1.5.49-1.97 1.07-.44.54-.82 1.35-.68 2.14.76.02 1.54-.43 1.99-1.02z" />
    </svg>
  );
}

function WifiIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" aria-hidden="true">
      <path d="M6 9a1 1 0 1 1 0 2A1 1 0 0 1 6 9zm0-3c1.1 0 2.1.4 2.83 1.06l.95-.95A5.45 5.45 0 0 0 6 5c-1.45 0-2.77.56-3.75 1.48l.95.95A3.95 3.95 0 0 1 6 6zm0-3c2.05 0 3.9.8 5.27 2.09l.94-.94A8.43 8.43 0 0 0 6 2C4.3 2 2.73 2.62 1.53 3.64l.93.93A6.95 6.95 0 0 1 6 3z" />
    </svg>
  );
}

function BatteryIcon() {
  return (
    <svg width="14" height="12" viewBox="0 0 20 12" fill="currentColor" aria-hidden="true">
      <rect x="0.5" y="1.5" width="16" height="9" rx="2" stroke="currentColor" strokeWidth="1.2" fill="none" />
      <rect x="2" y="3" width="12" height="6" rx="1" />
      <path d="M17 4.5v3a1.5 1.5 0 0 0 0-3z" />
    </svg>
  );
}

export function Menubar() {
  const t = useTranslations("menubar");
  const tDock = useTranslations("dock");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const isDark = useThemeStore((s) => s.isDark);
  const toggle = useThemeStore((s) => s.toggle);

  const focusedId = useWindowStore((s) => s.focusedId);
  const windows = useWindowStore((s) => s.windows);

  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const tick = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(tick);
  }, []);

  const time = now ? formatLocalTime(now) : "--:--";

  const focusedApp = focusedId ? windows.find((w) => w.id === focusedId)?.app : null;
  const activeAppName = focusedApp && APP_REGISTRY[focusedApp]
    ? tDock(focusedApp as Parameters<typeof tDock>[0])
    : "Finder";

  function switchLocale() {
    router.replace(pathname, { locale: locale === "fr" ? "en" : "fr" });
  }

  const menuItem = "px-2 py-1 rounded cursor-default hover:bg-black/8 dark:hover:bg-white/10 transition-colors";

  return (
    <header
      className="absolute inset-x-0 top-0 z-30 flex items-center text-[12px] select-none"
      style={{
        height: "var(--menubar-height)",
        background: "var(--glass-bg)",
        backdropFilter: "blur(var(--glass-blur-heavy))",
        WebkitBackdropFilter: "blur(var(--glass-blur-heavy))",
        borderBottom: "0.5px solid var(--glass-border)",
        color: "var(--menubar-fg)",
      }}
    >
      {/* Left cluster */}
      <div className="flex items-center gap-0.5 pl-1">
        <button
          type="button"
          aria-label="Apple menu"
          className={menuItem + " px-2.5"}
        >
          <AppleLogo />
        </button>
        <span className={"font-semibold tracking-tight " + menuItem}>
          {activeAppName}
        </span>
        <span className={"opacity-70 " + menuItem}>File</span>
        <span className={"opacity-70 " + menuItem}>Edit</span>
        <span className={"opacity-70 " + menuItem}>View</span>
        <span className={"opacity-70 " + menuItem}>Window</span>
        <span className={"opacity-70 " + menuItem}>Help</span>
      </div>

      {/* Right cluster */}
      <div className="ml-auto flex items-center pr-1 opacity-85">
        <button type="button" className={menuItem + " flex items-center"}>
          <WifiIcon />
        </button>
        <button type="button" className={menuItem + " flex items-center gap-1"}>
          <BatteryIcon />
          <span className="text-[11px] tabular-nums">100%</span>
        </button>
        <button
          type="button"
          aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
          onClick={toggle}
          className={menuItem + " flex items-center"}
        >
          {isDark ? <Sun size={12} aria-hidden="true" /> : <Moon size={12} aria-hidden="true" />}
        </button>
        <button
          type="button"
          aria-label="Switch language"
          onClick={switchLocale}
          className={menuItem + " text-[11px] font-semibold"}
        >
          {locale === "fr" ? "EN" : "FR"}
        </button>
        <span className={"tabular-nums text-[11px] font-medium " + menuItem}>{time}</span>
      </div>
    </header>
  );
}
