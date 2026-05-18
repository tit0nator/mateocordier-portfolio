"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { ChevronLeft, ExternalLink, PlayCircle, FileText } from "lucide-react";
import { PROJECTS, type Project, type ProjectFolder } from "@/lib/projects";
import { useWindowStore } from "@/lib/store";

const FOLDERS: { id: ProjectFolder; key: string }[] = [
  { id: "selected", key: "selected" },
  { id: "lab", key: "lab" },
  { id: "decks", key: "decks" },
];

export function Finder() {
  const t = useTranslations("apps.finder");
  const locale = useLocale() as "fr" | "en";
  const openApp = useWindowStore((s) => s.openApp);

  const [activeFolder, setActiveFolder] = useState<ProjectFolder>("selected");
  const [activeSlug, setActiveSlug] = useState<string | null>(null);

  const folderProjects = PROJECTS.filter((p) => p.folder === activeFolder);
  const detail = activeSlug ? PROJECTS.find((p) => p.slug === activeSlug) ?? null : null;

  function handleCardClick(project: Project) {
    // Selected Work opens a detail view inside Finder.
    // Lab and Decks hand off to their respective apps.
    if (project.folder === "selected") {
      setActiveSlug(project.slug);
      return;
    }
    if (project.folder === "lab") {
      openApp("higgsfield");
      return;
    }
    if (project.folder === "decks") {
      openApp("preview");
      return;
    }
  }

  return (
    <div className="flex h-full text-zinc-800 dark:text-zinc-100">
      {/* Sidebar */}
      <aside className="w-36 shrink-0 border-r border-black/10 bg-zinc-50/80 px-2 py-3 dark:border-white/10 dark:bg-zinc-800/60">
        <p className="px-2 pb-1 text-[10px] font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
          Folders
        </p>
        <ul className="space-y-0.5">
          {FOLDERS.map((f) => {
            const active = f.id === activeFolder && !detail;
            return (
              <li key={f.id}>
                <button
                  type="button"
                  onClick={() => {
                    setActiveFolder(f.id);
                    setActiveSlug(null);
                  }}
                  className={`w-full rounded-md px-2 py-1.5 text-left text-[12px] ${
                    active
                      ? "bg-zinc-200/70 font-medium text-zinc-900 dark:bg-zinc-700/80 dark:text-white"
                      : "text-zinc-600 hover:bg-zinc-200/40 dark:text-zinc-300 dark:hover:bg-zinc-700/40"
                  }`}
                >
                  {t(`folders.${f.key}`)}
                </button>
              </li>
            );
          })}
        </ul>
      </aside>

      {/* Right pane */}
      <main className="flex-1 overflow-auto">
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
    <div className="grid grid-cols-2 gap-3 p-4 sm:grid-cols-3">
      {projects.map((p) => (
        <button
          key={p.slug}
          type="button"
          onClick={() => onCardClick(p)}
          className="group flex flex-col overflow-hidden rounded-lg border border-black/10 bg-white text-left transition-transform hover:-translate-y-0.5 hover:shadow-md dark:border-white/10 dark:bg-zinc-800"
        >
          <Thumb project={p} tNoPreview={tNoPreview} />
          <div className="p-2.5">
            <p className="truncate text-[12px] font-medium text-zinc-900 dark:text-zinc-50">
              {p.title}
            </p>
            <p className="truncate text-[10.5px] text-zinc-500 dark:text-zinc-400">
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
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={project.hero}
        alt={project.title}
        className="aspect-[4/3] w-full object-cover"
      />
    );
  }
  // Placeholder: solid color block with the project title overlaid.
  return (
    <div
      className="flex aspect-[4/3] w-full flex-col items-center justify-center gap-1 px-3 text-center"
      style={{ background: project.placeholderColor ?? "#52525b" }}
    >
      <span className="text-[13px] font-medium tracking-tight text-white">
        {project.title}
      </span>
      <span className="text-[9.5px] text-white/60">{tNoPreview}</span>
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
    <div className="space-y-4 p-4">
      <button
        type="button"
        onClick={onBack}
        className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-[11.5px] text-zinc-600 hover:bg-zinc-200/50 dark:text-zinc-300 dark:hover:bg-zinc-700/50"
      >
        <ChevronLeft size={12} aria-hidden="true" />
        {tBack}
      </button>

      <div className="overflow-hidden rounded-lg border border-black/10 dark:border-white/10">
        {project.hero ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={project.hero}
            alt={project.title}
            className="aspect-video w-full object-cover"
          />
        ) : (
          <div
            className="flex aspect-video w-full items-center justify-center"
            style={{ background: project.placeholderColor ?? "#52525b" }}
          >
            <span className="text-base font-medium text-white">{project.title}</span>
          </div>
        )}
      </div>

      <div>
        <h2 className="text-[15px] font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          {project.title}
        </h2>
        <p className="mt-0.5 text-[11.5px] text-zinc-500 dark:text-zinc-400">
          {project.role[locale]}
        </p>
        <p className="mt-2 text-[12.5px] leading-relaxed text-zinc-700 dark:text-zinc-200">
          {project.description[locale]}
        </p>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-zinc-100 px-2 py-0.5 text-[10px] text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {(project.externalUrl || project.videoUrl || project.pdfUrl) && (
        <div className="flex flex-wrap gap-2">
          {project.externalUrl && (
            <a
              href={project.externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-md bg-zinc-900 px-3 py-1.5 text-[12px] font-medium text-white hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
            >
              {tVisit}
              <ExternalLink size={11} aria-hidden="true" />
            </a>
          )}
          {project.videoUrl && (
            <span className="inline-flex items-center gap-1.5 rounded-md border border-zinc-300 px-3 py-1.5 text-[12px] text-zinc-700 dark:border-zinc-700 dark:text-zinc-200">
              <PlayCircle size={12} aria-hidden="true" />
              {tPlay}
            </span>
          )}
          {project.pdfUrl && (
            <span className="inline-flex items-center gap-1.5 rounded-md border border-zinc-300 px-3 py-1.5 text-[12px] text-zinc-700 dark:border-zinc-700 dark:text-zinc-200">
              <FileText size={12} aria-hidden="true" />
              {tOpenDeck}
            </span>
          )}
        </div>
      )}

      {project.assets && project.assets.length > 0 && (
        <div className="grid grid-cols-3 gap-2 pt-1">
          {project.assets.map((src) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={src}
              src={src}
              alt=""
              className="aspect-[4/3] w-full rounded-md border border-black/10 object-cover dark:border-white/10"
            />
          ))}
        </div>
      )}
    </div>
  );
}
