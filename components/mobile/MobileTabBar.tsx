"use client";

import {
  Folder, Compass, PlayCircle, FileText,
  Code2, Mail, StickyNote, Download, type LucideIcon,
} from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import type { AppId } from "@/lib/store";

type TabApp = { id: AppId; Icon: LucideIcon; labelKey: string };

const TAB_APPS: TabApp[] = [
  { id: "finder",     Icon: Folder,      labelKey: "finder" },
  { id: "safari",     Icon: Compass,     labelKey: "safari" },
  { id: "titoflix",   Icon: PlayCircle,  labelKey: "titoflix" },
  { id: "preview",    Icon: FileText,    labelKey: "preview" },
  { id: "cursor",     Icon: Code2,       labelKey: "cursor" },
  { id: "mail",       Icon: Mail,        labelKey: "mail" },
  { id: "notes",      Icon: StickyNote,  labelKey: "notes" },
  { id: "resume",     Icon: Download,    labelKey: "resume" },
];

interface Props {
  activeApp: AppId | null;
  onSelect: (id: AppId) => void;
}

export function MobileTabBar({ activeApp, onSelect }: Props) {
  const t = useTranslations("dock");
  const locale = useLocale();

  function handleTap(id: AppId) {
    if (id === "resume") {
      const filename = `Resume-Mateo-Cordier-${locale.toUpperCase()}.pdf`;
      const a = document.createElement("a");
      a.href = `/${filename}`;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      return;
    }
    onSelect(id);
  }

  return (
    <nav
      aria-label="Tab bar"
      className="shrink-0 border-t border-black/10 backdrop-blur-xl dark:border-white/10"
      style={{ background: "var(--dock-bg)" }}
    >
      <ul className="flex items-center justify-around px-1 py-1.5">
        {TAB_APPS.map(({ id, Icon, labelKey }) => {
          const active = id === activeApp;
          return (
            <li key={id}>
              <button
                type="button"
                aria-label={t(labelKey)}
                onClick={() => handleTap(id)}
                className={`flex flex-col items-center gap-0.5 px-2 py-1 transition-opacity ${
                  active ? "opacity-100" : "opacity-60 active:opacity-100"
                }`}
              >
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-xl transition-colors ${
                    active
                      ? "bg-zinc-900/15 dark:bg-white/20"
                      : "bg-transparent"
                  }`}
                >
                  <Icon size={20} strokeWidth={1.5} aria-hidden="true" />
                </div>
                <span className={`text-[9px] ${active ? "font-semibold" : ""}`}>
                  {t(labelKey)}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
