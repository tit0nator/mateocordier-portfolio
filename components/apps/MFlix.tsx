"use client";

import { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { PROJECTS, type Project } from "@/lib/projects";
import { useWindowStore } from "@/lib/store";

const LAB_VIDEOS = PROJECTS.filter((p) => p.folder === "lab");
const SITE_REELS = PROJECTS.filter((p) => p.folder === "selected" && p.videoUrl);
const NETFLIX_RED = "#E50914";

interface VideoRowProps {
  label: string;
  projects: Project[];
  featuredId: string;
  onSelect: (p: Project) => void;
}

function VideoRow({ label, projects, featuredId, onSelect }: VideoRowProps) {
  return (
    <div className="shrink-0">
      <p className="mb-2 text-[13px] font-semibold text-white/90">{label}</p>
      <div className="flex gap-2.5 overflow-x-auto pb-1" style={{ scrollSnapType: "x mandatory" }}>
        {projects.map((project) => {
          const isActive = project.id === featuredId;
          return (
            <button
              key={project.id}
              type="button"
              onClick={() => onSelect(project)}
              className="group relative shrink-0 overflow-hidden transition-transform duration-200 hover:scale-105 active:scale-95"
              style={{
                width: 120,
                aspectRatio: "16/9",
                borderRadius: 6,
                scrollSnapAlign: "start",
                border: isActive ? ("2px solid " + NETFLIX_RED) : "2px solid transparent",
                boxShadow: isActive ? ("0 2px 8px " + NETFLIX_RED + "55") : "none",
              }}
            >
              {project.videoUrl ? (
                <video
                  src={project.videoUrl}
                  muted
                  playsInline
                  preload="metadata"
                  className="h-full w-full object-cover"
                />
              ) : project.hero ? (
                <img
                  src={project.hero}
                  alt={project.title}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="h-full w-full" style={{ background: project.placeholderColor ?? "#2a2a2f" }} />
              )}
              <div
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-150 group-hover:opacity-100"
                style={{ background: "linear-gradient(transparent 40%, " + NETFLIX_RED + "33)" }}
              />
              <div
                className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-full p-1.5 transition-transform duration-200 group-hover:translate-y-0"
                style={{ background: "linear-gradient(transparent, rgba(0,0,0,0.85))" }}
              >
                <p className="truncate text-[10px] font-semibold text-white">{project.title}</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

interface Props {
  windowId: string;
}

export function MFlix({ windowId }: Props) {
  const t = useTranslations("apps.mflix");
  const windowData = useWindowStore((s) => s.windows.find((w) => w.id === windowId)?.data);
  const initialId = (windowData?.videoId as string) ?? LAB_VIDEOS[0]?.id ?? "";

  const [featuredId, setFeaturedId] = useState(initialId);
  const [isPlaying, setIsPlaying] = useState(false);

  const heroVideoRef = useRef<HTMLVideoElement>(null);
  const featured = [...LAB_VIDEOS, ...SITE_REELS].find((p) => p.id === featuredId) ?? LAB_VIDEOS[0];

  function handlePlay() {
    const v = heroVideoRef.current;
    if (!v) return;
    if (v.paused) { v.play(); setIsPlaying(true); }
    else          { v.pause(); setIsPlaying(false); }
  }

  function handleSelectVideo(project: Project) {
    if (project.id === featuredId) { handlePlay(); return; }
    setFeaturedId(project.id);
    setIsPlaying(false);
  }

  return (
    <div className="flex h-full flex-col overflow-hidden select-none" style={{ background: "#141414", color: "#e5e5e5" }}>

      {/* Top nav bar */}
      <div className="shrink-0 flex items-center gap-5 px-4 pt-3 pb-1">
        <span
          className="text-[22px] font-black tracking-tighter leading-none"
          style={{ color: NETFLIX_RED, fontWeight: 900, letterSpacing: "-0.03em" }}
        >
          mFlix
        </span>
        <nav className="flex items-center gap-4">
          <span className="text-[12px] font-medium text-white">Home</span>
          <span className="text-[12px] text-white/40">My List</span>
        </nav>
      </div>

      {/* Hero */}
      <div className="relative shrink-0" style={{ height: "52%" }}>
        {featured?.videoUrl ? (
          <video
            ref={heroVideoRef}
            key={featured.videoUrl}
            src={featured.videoUrl}
            muted
            loop
            playsInline
            preload="metadata"
            aria-label={featured.title}
            className="h-full w-full object-cover"
          />
        ) : featured?.hero ? (
          <img src={featured.hero} alt={featured.title} className="h-full w-full object-cover" />
        ) : (
          <div className="h-full w-full" style={{ background: featured?.placeholderColor ?? "#2a2a2f" }} />
        )}

        <div
          className="pointer-events-none absolute inset-x-0 top-0"
          style={{ height: "30%", background: "linear-gradient(to bottom, #141414, transparent)" }}
        />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0"
          style={{ height: "70%", background: "linear-gradient(to bottom, transparent, #141414)" }}
        />

        <div className="absolute bottom-0 left-0 px-4 pb-3 w-full">
          <p className="text-[9.5px] font-bold tracking-[0.15em] uppercase mb-1" style={{ color: NETFLIX_RED }}>
            {featured?.folder === "lab" ? "Higgsfield Original" : "Site Reel"}
          </p>
          <h2 className="text-[22px] font-black tracking-tight text-white leading-tight drop-shadow-md">
            {featured?.title}
          </h2>
          <p className="mt-1 text-[10.5px] text-white/50 leading-snug max-w-[260px]">
            {featured?.description?.en?.split(".")[0] ?? "AI motion piece · 2026"}
          </p>
          <div className="mt-2.5 flex items-center gap-2">
            <button
              type="button"
              onClick={handlePlay}
              className="flex items-center gap-1.5 rounded px-3.5 py-1.5 text-[12px] font-bold text-white transition-opacity hover:opacity-85 active:opacity-70"
              style={{ background: NETFLIX_RED }}
            >
              <svg width="10" height="11" viewBox="0 0 10 11" fill="currentColor" aria-hidden="true">
                <path d="M1 1.5L9 5.5L1 9.5V1.5Z" />
              </svg>
              {isPlaying ? "Pause" : t("playButton")}
            </button>
            <button
              type="button"
              className="flex items-center gap-1.5 rounded px-3.5 py-1.5 text-[12px] font-medium text-white transition-opacity hover:opacity-85"
              style={{ background: "rgba(255,255,255,0.15)", backdropFilter: "blur(8px)" }}
            >
              <span aria-hidden="true">i</span>
              More Info
            </button>
          </div>
        </div>
      </div>

      {/* Rows */}
      <div className="flex flex-1 flex-col gap-3 overflow-y-auto overflow-x-hidden px-4 py-2">
        <VideoRow
          label="Higgsfield Originals"
          projects={LAB_VIDEOS}
          featuredId={featuredId}
          onSelect={handleSelectVideo}
        />
        <VideoRow
          label="Site Reels"
          projects={SITE_REELS}
          featuredId={featuredId}
          onSelect={handleSelectVideo}
        />
      </div>
    </div>
  );
}
