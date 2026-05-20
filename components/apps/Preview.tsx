"use client";

import { useLocale } from "next-intl";
import { PROJECTS } from "@/lib/projects";
import { useWindowStore } from "@/lib/store";
import { FileText } from "lucide-react";

interface Props {
  windowId: string;
}

export function Preview({ windowId }: Props) {
  const locale = useLocale() as "fr" | "en";
  const windowData = useWindowStore((s) => s.windows.find((w) => w.id === windowId)?.data);
  const pdfId = (windowData?.pdfId as string) ?? null;

  const project = pdfId ? PROJECTS.find((p) => p.id === pdfId) : PROJECTS.find((p) => p.folder === "decks");
  const pdfUrl = project?.pdfUrl ?? null;

  if (!pdfUrl) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-3 bg-zinc-50 dark:bg-zinc-900">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-100 dark:bg-zinc-800">
          <FileText size={20} className="text-zinc-400 dark:text-zinc-500" />
        </div>
        <p className="text-[13px] font-medium text-zinc-500 dark:text-zinc-400">No document selected</p>
        <p className="text-[11px] text-zinc-400 dark:text-zinc-500">Open a deck from Finder to preview it here</p>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col bg-zinc-200 dark:bg-zinc-800">
      {/* Toolbar */}
      <div className="flex shrink-0 items-center gap-2.5 border-b border-black/8 bg-zinc-100/90 px-3.5 py-2 dark:border-white/8 dark:bg-zinc-700/80">
        <div className="flex h-5 w-5 items-center justify-center rounded bg-red-500/10 dark:bg-red-400/10">
          <FileText size={11} className="text-red-500 dark:text-red-400" aria-hidden="true" />
        </div>
        <div className="flex flex-1 flex-col min-w-0">
          <span className="truncate text-[11.5px] font-medium text-zinc-800 dark:text-zinc-200">
            {project?.title}
          </span>
        </div>
        <span className="shrink-0 text-[10px] text-zinc-400 dark:text-zinc-500">
          {project?.role[locale]}
        </span>
      </div>

      {/* PDF iframe */}
      <iframe
        src={pdfUrl}
        title={project?.title ?? "Document"}
        className="flex-1 w-full border-0"
      />
    </div>
  );
}
