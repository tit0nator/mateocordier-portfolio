"use client";

import { useEffect } from "react";
import { useWindowStore } from "@/lib/store";

// On first paint, populate the desktop with three windows as specified:
// Notes front-left, Safari mid-right, Higgsfield bottom-right.
export function AutoOpen() {
  const openApp = useWindowStore((s) => s.openApp);
  const windowsLength = useWindowStore((s) => s.windows.length);

  useEffect(() => {
    // Don't auto-open on mobile — MobileLayout handles its own home state.
    if (window.matchMedia("(max-width: 767px)").matches) return;
    if (windowsLength === 0) {
      openApp("notes", { position: { x: 60, y: 60 } });
      openApp("safari", { position: { x: 320, y: 50 } });
      openApp("titoflix", {
        position: { x: 260, y: 310 },
        data: { videoId: "ap-swatch" },
      });
    }
    // Intentional: run once on mount only.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
