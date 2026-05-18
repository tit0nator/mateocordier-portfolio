"use client";

import { useEffect, useState } from "react";
import { Desktop } from "@/components/desktop/Desktop";
import { MobileLayout } from "@/components/mobile/MobileLayout";

export function RootView() {
  // Initialise from the data-mobile attribute the anti-flash script set synchronously,
  // so the first render matches reality without a layout flash.
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof document === "undefined") return false;
    return document.documentElement.hasAttribute("data-mobile");
  });

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return isMobile ? <MobileLayout /> : <Desktop />;
}
