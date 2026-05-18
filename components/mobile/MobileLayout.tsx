"use client";

import { useEffect, useState } from "react";
import { useThemeStore } from "@/lib/themeStore";
import { useWindowStore, type AppId } from "@/lib/store";
import { APP_REGISTRY } from "@/components/apps/registry";
import { MobileMenubar } from "./MobileMenubar";
import { MobileTabBar } from "./MobileTabBar";

/** Full-screen app view with a back button. */
function MobileAppView({
  appId,
  windowId,
  onClose,
}: {
  appId: AppId;
  windowId: string;
  onClose: () => void;
}) {
  const entry = APP_REGISTRY[appId];
  if (!entry) return null;
  const { Component } = entry;

  return (
    <div className="flex h-full flex-col">
      <Component windowId={windowId} />
    </div>
  );
}

/** Wallpaper gradient for the mobile home screen. */
function MobileHome() {
  const isDark = useThemeStore((s) => s.isDark);
  const gradient = isDark
    ? "radial-gradient(120% 80% at 20% 10%, #1a1228 0%, #0e0c1a 50%, #060510 100%)"
    : "radial-gradient(120% 80% at 20% 10%, #d7c8e0 0%, #b7a6c7 45%, #6f6383 100%)";

  return (
    <div
      className="flex flex-1 flex-col items-center justify-center gap-2 transition-all duration-700"
      style={{ background: gradient }}
    >
      <p className="text-[13px] text-white/60 select-none">
        Tap an icon below to explore
      </p>
    </div>
  );
}

export function MobileLayout() {
  const [activeApp, setActiveApp] = useState<AppId | null>(null);

  // When openApp() is called from anywhere (e.g. Finder clicking a Lab card),
  // navigate to that app on mobile just as WindowCanvas would on desktop.
  const focusedId = useWindowStore((s) => s.focusedId);
  const windows = useWindowStore((s) => s.windows);
  useEffect(() => {
    if (!focusedId) return;
    const w = windows.find((win) => win.id === focusedId);
    if (w && w.app !== "resume") setActiveApp(w.app);
  }, [focusedId, windows]);

  // Resolve the windowId for the active app so app components can read
  // their data payload (e.g. Higgsfield videoId) from the store.
  const storeWindow = windows.find((w) => w.app === activeApp);
  const windowId = storeWindow?.id ?? `mobile-${activeApp ?? "none"}`;

  return (
    <div
      className="flex h-screen flex-col"
      style={{ color: "var(--foreground)" }}
    >
      <MobileMenubar />

      {/* Content area */}
      <div className="relative flex-1 overflow-hidden">
        {activeApp ? (
          <>
            {/* Back bar */}
            <div
              className="flex shrink-0 items-center border-b border-black/8 px-4 py-2 text-[12px] dark:border-white/8"
              style={{ background: "var(--menubar-bg)" }}
            >
              <button
                type="button"
                onClick={() => setActiveApp(null)}
                className="flex items-center gap-1 font-medium opacity-70 hover:opacity-100"
              >
                ← Back
              </button>
            </div>
            <div className="h-[calc(100%-2.25rem)] overflow-auto bg-white dark:bg-zinc-900">
              <MobileAppView
                appId={activeApp}
                windowId={windowId}
                onClose={() => setActiveApp(null)}
              />
            </div>
          </>
        ) : (
          <MobileHome />
        )}
      </div>

      <MobileTabBar
        activeApp={activeApp}
        onSelect={(id) => {
          setActiveApp(id);
          // Also open in store so app components with windowId can read data.
          useWindowStore.getState().openApp(id);
        }}
      />
    </div>
  );
}
