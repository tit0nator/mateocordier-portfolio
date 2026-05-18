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
      <div className="flex h-full items-center justify-center gap-2 text-sm text-zinc-500 dark:text-zinc-400">
        <FileText size={16} />
        <span>No document selected</span>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col bg-zinc-100 dark:bg-zinc-800">
      {/* Toolbar */}
      <div className="flex shrink-0 items-center gap-2 border-b border-black/10 bg-zinc-200/80 px-3 py-1.5 dark:border-white/10 dark:bg-zinc-700/80">
        <FileText size={12} className="text-zinc-500 dark:text-zinc-400" aria-hidden="true" />
        <span className="truncate text-[11px] text-zinc-700 dark:text-zinc-200">
          {project?.title}
        </span>
        <span className="ml-auto text-[10px] text-zinc-400 dark:text-zinc-500">
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
