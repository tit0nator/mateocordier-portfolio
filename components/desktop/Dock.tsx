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
import { useTranslations, useLocale } from "next-intl";
import { useWindowStore, type AppId } from "@/lib/store";

type DockApp = {
  id: AppId;
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
  const locale = useLocale();
  const openApp = useWindowStore((s) => s.openApp);

  function handleClick(id: AppId) {
    if (id === "resume") {
      // Resume is a download trigger — serve the FR or EN PDF based on active locale.
      const filename = `Resume-Mateo-Cordier-${locale.toUpperCase()}.pdf`;
      const link = document.createElement("a");
      link.href = `/${filename}`;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      return;
    }
    openApp(id);
  }

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
              onClick={() => handleClick(id)}
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
