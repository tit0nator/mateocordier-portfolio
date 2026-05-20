"use client";

import { useState } from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { ChevronLeft, ExternalLink, PlayCircle, FileText } from "lucide-react";
import { PROJECTS, type Project, type ProjectFolder } from "@/lib/projects";
import { useWindowStore } from "@/lib/store";
import { VibrancySidebar } from "@/components/shared/VibrancySidebar";

const FOLDERS: { id: ProjectFolder; key: string }[] = [
  { id: "selected", key: "selected" },
  { id: "lab", key: "lab" },
  { id: "decks", key: "decks" },
];

export function Finder(_: { windowId: string }) {
  const t = useTranslations("apps.finder");
  const locale = useLocale() as "fr" | "en";
  const openApp = useWindowStore((s) => s.openApp);

  const [activeFolder, setActiveFolder] = useState<ProjectFolder>("selected");
  const [activeSlug, setActiveSlug] = useState<string | null>(null);

  const folderProjects = PROJECTS.filter((p) => p.folder === activeFolder);
  const detail = activeSlug ? PROJECTS.find((p) => p.slug === activeSlug) ?? null : null;

  function handleCardClick(project: Project) {
    if (project.folder === "selected") {
      setActiveSlug(project.slug);
      return;
    }
    if (project.folder === "lab") {
      openApp("mflix", { data: { videoId: project.id } });
      return;
    }
    if (project.folder === "decks") {
      openApp("preview", { data: { pdfId: project.id } });
      return;
    }
  }

  return (
    <div className="flex h-full text-zinc-800 dark:text-zinc-100">
      {/* Sidebar */}
      <VibrancySidebar className="px-2 py-3">
        <p className="px-2 pb-1.5 text-[9.5px] font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
          Folders
        </p>
        <ul className="space-y-0.5">
          {FOLDERS.map((f) => {
            const active = f.id === activeFolder && !detail;
            const count = PROJECTS.filter((p) => p.folder === f.id).length;
            return (
              <li key={f.id}>
                <button
                  type="button"
                  onClick={() => {
                    setActiveFolder(f.id);
                    setActiveSlug(null);
                  }}
                  className={`flex w-full items-center justify-between rounded-md px-2 py-1.5 text-left text-[12px] transition-colors ${
                    active
                      ? "bg-zinc-200/70 font-medium text-zinc-900 dark:bg-zinc-700/80 dark:text-white"
                      : "text-zinc-600 hover:bg-zinc-200/40 dark:text-zinc-300 dark:hover:bg-zinc-700/40"
                  }`}
                >
                  <span>{t(`folders.${f.key}`)}</span>
                  <span className="text-[10px] text-zinc-400 dark:text-zinc-500">{count}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </VibrancySidebar>

      {/* Right pane */}
      <main className="flex-1 overflow-auto bg-white/50 dark:bg-zinc-900/50">
        {detail ? (
          <DetailView
            project={detail}
            locale={locale}
            tBack={t("back")}
            tVisit={t("visit")}
            tPlay={t("play")}
            tOpenDeck={t("openDeck")}
            onBack={() => setActiveSlug(null)}
          />
        ) : (
          <Grid
            projects={folderProjects}
            locale={locale}
            tNoPreview={t("noPreview")}
            onCardClick={handleCardClick}
          />
        )}
      </main>
    </div>
  );
}

function Grid({
  projects,
  locale,
  tNoPreview,
  onCardClick,
}: {
  projects: Project[];
  locale: "fr" | "en";
  tNoPreview: string;
  onCardClick: (p: Project) => void;
}) {
  return (
    <div className="grid grid-cols-2 gap-3.5 p-4 sm:grid-cols-3">
      {projects.map((p) => (
        <button
          key={p.slug}
          type="button"
          onClick={() => onCardClick(p)}
          className="group flex flex-col overflow-hidden rounded-xl bg-white text-left shadow-sm ring-1 ring-black/[0.04] transition-all duration-150 hover:-translate-y-0.5 hover:shadow-md active:scale-[0.98] dark:bg-zinc-800 dark:ring-white/[0.06]"
        >
          <Thumb project={p} tNoPreview={tNoPreview} />
          <div className="px-3 py-2.5">
            <p className="truncate text-[12px] font-semibold text-zinc-900 dark:text-zinc-50">
              {p.title}
            </p>
            <p className="mt-0.5 truncate text-[10.5px] text-zinc-500 dark:text-zinc-400">
              {p.role[locale]}
            </p>
          </div>
        </button>
      ))}
    </div>
  );
}

function Thumb({ project, tNoPreview }: { project: Project; tNoPreview: string }) {
  if (project.hero) {
    return (
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <Image
          src={project.hero}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="240px"
          loading="lazy"
        />
      </div>
    );
  }
  return (
    <div
      className="flex aspect-[4/3] w-full flex-col items-center justify-center gap-1 px-3 text-center"
      style={{ background: project.placeholderColor ?? "#52525b" }}
    >
      <span className="text-[13px] font-semibold tracking-tight text-white">
        {project.title}
      </span>
      <span className="text-[9.5px] text-white/50">{tNoPreview}</span>
    </div>
  );
}

function DetailView({
  project,
  locale,
  tBack,
  tVisit,
  tPlay,
  tOpenDeck,
  onBack,
}: {
  project: Project;
  locale: "fr" | "en";
  tBack: string;
  tVisit: string;
  tPlay: string;
  tOpenDeck: string;
  onBack: () => void;
}) {
  return (
    <div className="p-5">
      <button
        type="button"
        onClick={onBack}
        className="mb-4 inline-flex items-center gap-1 rounded-md px-2 py-1 text-[11.5px] font-medium text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-700 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-200"
      >
        <ChevronLeft size={12} aria-hidden="true" />
        {tBack}
      </button>

      {/* Hero */}
      <div className="overflow-hidden rounded-xl shadow-sm ring-1 ring-black/[0.04] dark:ring-white/[0.06]">
        {project.hero ? (
          <div className="relative aspect-video w-full overflow-hidden">
            <Image
              src={project.hero}
              alt={project.title}
              fill
              className="object-cover"
              sizes="680px"
            />
          </div>
        ) : (
          <div
            className="flex aspect-video w-full items-center justify-center"
            style={{ background: project.placeholderColor ?? "#52525b" }}
          >
            <span className="text-base font-semibold text-white">{project.title}</span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="mt-5">
        <h2 className="text-[17px] font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          {project.title}
        </h2>
        <p className="mt-1 text-[11.5px] font-medium text-zinc-500 dark:text-zinc-400">
          {project.role[locale]}
        </p>
        <p className="mt-3 text-[12.5px] leading-[1.65] text-zinc-600 dark:text-zinc-300">
          {project.description[locale]}
        </p>

        {/* Tags */}
        <div className="mt-3 flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md bg-zinc-100 px-2 py-0.5 text-[10px] font-medium text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Actions */}
      {(project.externalUrl || project.videoUrl || project.pdfUrl) && (
        <div className="mt-4 flex flex-wrap gap-2">
          {project.externalUrl && (
            <a
              href={project.externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg bg-zinc-900 px-3.5 py-2 text-[12px] font-medium text-white transition-colors hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
            >
              {tVisit}
              <ExternalLink size={11} aria-hidden="true" />
            </a>
          )}
          {project.videoUrl && (
            <span className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-200 px-3.5 py-2 text-[12px] text-zinc-600 dark:border-zinc-700 dark:text-zinc-300">
              <PlayCircle size={12} aria-hidden="true" />
              {tPlay}
            </span>
          )}
          {project.pdfUrl && (
            <span className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-200 px-3.5 py-2 text-[12px] text-zinc-600 dark:border-zinc-700 dark:text-zinc-300">
              <FileText size={12} aria-hidden="true" />
              {tOpenDeck}
            </span>
          )}
        </div>
      )}

      {/* Asset grid */}
      {project.assets && project.assets.length > 0 && (
        <div className="mt-5 grid grid-cols-3 gap-2">
          {project.assets.map((src) => (
            <div key={src} className="relative aspect-[4/3] w-full overflow-hidden rounded-lg shadow-sm ring-1 ring-black/[0.04] dark:ring-white/[0.06]">
              <Image
                src={src}
                alt=""
                fill
                className="object-cover"
                sizes="220px"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
