"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useThemeStore } from "@/lib/themeStore";
import { useWindowStore, type AppId } from "@/lib/store";
import { APP_REGISTRY } from "@/components/apps/registry";
import { MobileMenubar } from "./MobileMenubar";
import { MobileTabBar } from "./MobileTabBar";
import { IPhoneFrame } from "./IPhoneFrame";

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

function MobileHome() {
  const isDark = useThemeStore((s) => s.isDark);
  const src = isDark ? "/wallpaper/dark.jpg" : "/wallpaper/light.jpg";
  return (
    <div className="relative flex flex-1 flex-col items-center justify-center gap-2">
      <Image
        src={src}
        alt=""
        fill
        priority
        quality={85}
        sizes="100vw"
        className="object-cover"
      />
      <p className="relative z-10 text-[13px] text-white/60 select-none drop-shadow-sm">
        Tap an icon below to explore
      </p>
    </div>
  );
}

export function MobileLayout() {
  const [activeApp, setActiveApp] = useState<AppId | null>(null);

  const focusedId = useWindowStore((s) => s.focusedId);
  const windows = useWindowStore((s) => s.windows);
  useEffect(() => {
    if (!focusedId) return;
    const w = windows.find((win) => win.id === focusedId);
    if (w && w.app !== "resume") setActiveApp(w.app);
  }, [focusedId, windows]);

  const storeWindow = windows.find((w) => w.app === activeApp);
  const windowId = storeWindow?.id ?? `mobile-${activeApp ?? "none"}`;

  return (
    <div
      className="flex h-screen flex-col"
      style={{ color: "var(--foreground)" }}
    >
      <IPhoneFrame />
      <MobileMenubar />

      <div className="relative flex-1 overflow-hidden">
        {activeApp ? (
          <>
            <div
              className="flex shrink-0 items-center border-b border-black/8 px-4 py-2 text-[12px] dark:border-white/8"
              style={{ background: "var(--menubar-bg)" }}
            >
              <button
                type="button"
                onClick={() => setActiveApp(null)}
                className="flex items-center gap-1 font-medium opacity-70 hover:opacity-100"
              >
                &larr; Back
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
          useWindowStore.getState().openApp(id);
        }}
      />
    </div>
  );
}
