"use client";

import { useEffect, useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { Sun, Moon } from "lucide-react";
import { useThemeStore } from "@/lib/themeStore";

function lyonTime(date: Date) {
  return new Intl.DateTimeFormat("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Europe/Paris",
  }).format(date);
}

export function MobileMenubar() {
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

  return (
    <header
      className="flex h-10 shrink-0 items-center justify-between px-4 text-[13px] backdrop-blur-md"
      style={{ background: "var(--menubar-bg)", color: "var(--menubar-fg)" }}
    >
      <span className="font-semibold tracking-tight">{t("ownerName")}</span>

      <div className="flex items-center gap-3">
        <span className="tabular-nums text-[12px] opacity-70">
          Lyon · {now ? lyonTime(now) : "--:--"}
        </span>
        <button
          type="button"
          aria-label={isDark ? "Mode clair" : "Mode sombre"}
          onClick={toggle}
          className="opacity-75 hover:opacity-100"
        >
          {isDark ? <Sun size={14} /> : <Moon size={14} />}
        </button>
        <button
          type="button"
          aria-label="Switch language"
          onClick={() => router.replace(pathname, { locale: locale === "fr" ? "en" : "fr" })}
          className="text-[11px] font-semibold opacity-65 hover:opacity-100"
        >
          {locale === "fr" ? "EN" : "FR"}
        </button>
      </div>
    </header>
  );
}
