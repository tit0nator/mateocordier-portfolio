"use client";

import { useThemeStore } from "@/lib/themeStore";

export function Wallpaper() {
  const isDark = useThemeStore((s) => s.isDark);

  const gradient = isDark
    ? "radial-gradient(120% 80% at 20% 10%, #1a1228 0%, #0e0c1a 50%, #060510 100%)"
    : "radial-gradient(120% 80% at 20% 10%, #d7c8e0 0%, #b7a6c7 45%, #6f6383 100%)";

  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 z-0 transition-all duration-700"
      style={{ background: gradient }}
    />
  );
}
