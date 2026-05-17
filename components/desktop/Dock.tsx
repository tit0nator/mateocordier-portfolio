"use client";

import {
  Folder,
  Compass,
  PlayCircle,
  FileText,
  Code2,
  Mail,
  StickyNote,
  Download,
  type LucideIcon,
} from "lucide-react";
import { useTranslations } from "next-intl";

type DockApp = {
  id: string;
  labelKey: string;
  Icon: LucideIcon;
};

const DOCK_APPS: DockApp[] = [
  { id: "finder", labelKey: "finder", Icon: Folder },
  { id: "safari", labelKey: "safari", Icon: Compass },
  { id: "higgsfield", labelKey: "higgsfield", Icon: PlayCircle },
  { id: "preview", labelKey: "preview", Icon: FileText },
  { id: "cursor", labelKey: "cursor", Icon: Code2 },
  { id: "mail", labelKey: "mail", Icon: Mail },
  { id: "notes", labelKey: "notes", Icon: StickyNote },
  { id: "resume", labelKey: "resume", Icon: Download },
];

export function Dock() {
  const t = useTranslations("dock");

  return (
    <nav
      aria-label="Dock"
      className="pointer-events-auto absolute bottom-3 left-1/2 z-30 -translate-x-1/2"
    >
      <ul
        className="flex items-end gap-1.5 rounded-2xl border px-2 py-1.5 backdrop-blur-xl"
        style={{
          background: "var(--dock-bg)",
          borderColor: "var(--dock-border)",
        }}
      >
        {DOCK_APPS.map(({ id, labelKey, Icon }) => (
          <li key={id} className="group relative">
            <button
              type="button"
              aria-label={t(labelKey)}
              className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/70 transition-transform duration-150 hover:-translate-y-1 hover:scale-105 active:scale-95 dark:bg-zinc-800/70"
            >
              <Icon size={22} strokeWidth={1.5} aria-hidden="true" />
            </button>
            <span className="pointer-events-none absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-black/80 px-2 py-1 text-[11px] text-white opacity-0 transition-opacity duration-150 group-hover:opacity-100 dark:bg-white/90 dark:text-black">
              {t(labelKey)}
            </span>
          </li>
        ))}
      </ul>
    </nav>
  );
}
