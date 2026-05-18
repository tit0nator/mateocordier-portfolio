"use client";

import { AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { useWindowStore } from "@/lib/store";
import { APP_REGISTRY } from "@/components/apps/registry";
import { Window } from "./Window";

export function WindowCanvas() {
  const windows = useWindowStore((s) => s.windows);
  const t = useTranslations("dock");

  return (
    <AnimatePresence>
      {windows.map((w) => {
        const entry = APP_REGISTRY[w.app];
        if (!entry) return null;
        const { Component, titleKey } = entry;
        return (
          <Window key={w.id} window={w} title={t(titleKey)}>
            <Component windowId={w.id} />
          </Window>
        );
      })}
    </AnimatePresence>
  );
}
