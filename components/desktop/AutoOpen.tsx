"use client";

import { useEffect } from "react";
import { useWindowStore } from "@/lib/store";

// On first paint, populate the desktop with the windows specified in the spec.
// Day 2: Notes only. Days 4+: add Safari (Body & Spirit) and Higgsfield rendering bar.
export function AutoOpen() {
  const openApp = useWindowStore((s) => s.openApp);
  const windowsLength = useWindowStore((s) => s.windows.length);

  useEffect(() => {
    if (windowsLength === 0) {
      openApp("notes", { position: { x: 60, y: 60 } });
    }
    // Intentional: run once on mount only.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
