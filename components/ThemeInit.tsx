"use client";

import { useEffect } from "react";
import { useThemeStore } from "@/lib/themeStore";

/** Reads localStorage/system preference once on mount and seeds the Zustand theme store. */
export function ThemeInit() {
  const init = useThemeStore((s) => s.init);
  useEffect(() => { init(); }, [init]);
  return null;
}
