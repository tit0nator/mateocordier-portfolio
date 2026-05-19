"use client";

import { useRef, useCallback } from "react";
import { useTranslations, useLocale } from "next-intl";
import { motionValue, animate, type MotionValue } from "framer-motion";
import { useWindowStore, type AppId } from "@/lib/store";
import { DockIcon } from "./DockIcon";

const DOCK_APPS: AppId[] = [
  "finder", "safari", "mflix", "preview", "cursor",
  "mail", "notes", "messages", "stocks", "strava", "links",
];
const ALL_APPS: AppId[] = [...DOCK_APPS, "resume"];

const INFLUENCE_RADIUS = 150;
const BASE_SCALE = 1;
const PEAK_SCALE = 1.5;

function initScales(): Record<AppId, MotionValue<number>> {
  return Object.fromEntries(
    ALL_APPS.map((id) => [id, motionValue(BASE_SCALE)])
  ) as Record<AppId, MotionValue<number>>;
}

export function Dock() {
  const t = useTranslations("dock");
  const locale = useLocale();
  const openApp = useWindowStore((s) => s.openApp);
  const windows = useWindowStore((s) => s.windows);

  // Motion values live in a ref so they're stable across renders (no hooks in loops).
  const scales = useRef<Record<AppId, MotionValue<number>>>(initScales());

  // Refs to icon containers for measuring center X on mousemove.
  const iconRefs = useRef<Partial<Record<AppId, HTMLDivElement>>>({});

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const mouseX = e.clientX;
    ALL_APPS.forEach((id) => {
      const el = iconRefs.current[id];
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const distance = Math.abs(centerX - mouseX);
      const scale =
        BASE_SCALE +
        (PEAK_SCALE - BASE_SCALE) * Math.max(0, 1 - (distance / INFLUENCE_RADIUS) ** 2);
      scales.current[id].set(scale);
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    ALL_APPS.forEach((id) => {
      animate(scales.current[id], BASE_SCALE, { duration: 0.15, ease: "easeOut" });
    });
  }, []);

  function handleClick(id: AppId) {
    if (id === "resume") {
      const filename = `Resume-Mateo-Cordier-${locale.toUpperCase()}.pdf`;
      const link = document.createElement("a");
      link.href = `/${filename}`;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      return;
    }
    openApp(id);
  }

  return (
    <nav
      aria-label="Dock"
      className="pointer-events-auto absolute bottom-3 left-1/2 z-30 -translate-x-1/2"
    >
      <div
        className="flex items-end px-1.5 py-1"
        style={{
          background: "var(--glass-bg)",
          backdropFilter: "blur(var(--glass-blur-heavy))",
          WebkitBackdropFilter: "blur(var(--glass-blur-heavy))",
          border: "0.5px solid var(--glass-border)",
          borderRadius: "var(--radius-dock)",
          boxShadow: "var(--shadow-dock)",
          gap: 2,
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {ALL_APPS.map((id) => {
          const isSeparatorSlot = id === "resume";
          const isOpen = windows.some((w) => w.app === id);

          return (
            <div key={id} className="flex items-end">
              {isSeparatorSlot && (
                <div
                  aria-hidden="true"
                  className="mx-1 self-center opacity-15"
                  style={{ width: 1, height: 24, background: "currentColor" }}
                />
              )}
              <div ref={(el) => { if (el) iconRefs.current[id] = el; }}>
                <DockIcon
                  id={id}
                  label={t(id as Parameters<typeof t>[0])}
                  scaleValue={scales.current[id]}
                  isOpen={isOpen}
                  onClick={() => handleClick(id)}
                />
              </div>
            </div>
          );
        })}
      </div>
    </nav>
  );
}
