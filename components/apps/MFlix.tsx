"use client";

import { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { PROJECTS, type Project } from "@/lib/projects";
import { useWindowStore } from "@/lib/store";

const LAB_VIDEOS = PROJECTS.filter((p) => p.folder === "lab");

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
  const featured = LAB_VIDEOS.find((p) => p.id === featuredId) ?? LAB_VIDEOS[0];

  function handlePlay() {
    const v = heroVideoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play();
      setIsPlaying(true);
    } else {
      v.pause();
      setIsPlaying(false);
    }
  }

  function handleSelectVideo(project: Project) {
    if (project.id === featuredId) {
      handlePlay();
      return;
    }
    setFeaturedId(project.id);
    setIsPlaying(false);
  }

  return (
    <div className="flex h-full flex-col overflow-hidden" style={{ background: "#141414", color: "#e5e5e5" }}>
      {/* Hero — 60% height */}
      <div className="relative shrink-0" style={{ height: "60%" }}>
        {featured?.videoUrl && (
          <video
            ref={heroVideoRef}
            key={featured.videoUrl}
            src={featured.videoUrl}
            muted
            autoPlay={false}
            loop
            playsInline
            preload="metadata"
            aria-label={featured.title}
            className="h-full w-full object-cover"
          />
        )}
        {!featured?.videoUrl && (
          <div
            className="h-full w-full"
            style={{ background: featured?.placeholderColor ?? "#2a2a2f" }}
          />
        )}

        {/* Bottom gradient overlay */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0"
          style={{
            height: "70%",
            background: "linear-gradient(to bottom, transparent, #141414)",
          }}
        />

        {/* Hero info overlay */}
        <div className="absolute bottom-0 left-0 px-4 pb-4">
          <h2 className="text-[22px] font-bold tracking-tight text-white drop-shadow-lg">
            {featured?.title}
          </h2>
          <p className="mt-0.5 text-[11px] text-white/60">
            Higgsfield · Hypermotion · 2026
          </p>
          <button
            type="button"
            onClick={handlePlay}
            className="mt-2.5 flex items-center gap-1.5 rounded-full bg-white px-4 py-1.5 text-[12px] font-semibold text-zinc-900 transition-opacity hover:opacity-90 active:opacity-75"
          >
            <svg width="10" height="11" viewBox="0 0 10 11" fill="currentColor" aria-hidden="true">
              <path d="M1 1.5L9 5.5L1 9.5V1.5Z" />
            </svg>
            {isPlaying ? "⏸" : t("playButton")}
          </button>
        </div>
      </div>

      {/* Thumbnail row — 40% height */}
      <div className="flex flex-1 flex-col overflow-hidden px-4 py-3">
        <p className="mb-2 shrink-0 text-[13px] font-semibold text-white/90">
          {t("sectionLabel")}
        </p>
        <div
          className="flex gap-2.5 overflow-x-auto pb-1"
          style={{ scrollSnapType: "x mandatory" }}
        >
          {LAB_VIDEOS.map((project) => {
            const isActive = project.id === featuredId;
            return (
              <button
                key={project.id}
                type="button"
                onClick={() => handleSelectVideo(project)}
                className="group relative shrink-0 overflow-hidden transition-transform duration-200 hover:scale-105 active:scale-95"
                style={{
                  width: 120,
                  aspectRatio: "16/9",
                  borderRadius: 8,
                  scrollSnapAlign: "start",
                  border: isActive ? "2px solid white" : "2px solid transparent",
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
                ) : (
                  <div
                    className="h-full w-full"
                    style={{ background: project.placeholderColor ?? "#2a2a2f" }}
                  />
                )}
                {/* Title overlay on hover */}
                <div className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-full p-1.5 transition-transform duration-200 group-hover:translate-y-0" style={{ background: "linear-gradient(transparent, rgba(0,0,0,0.8))" }}>
                  <p className="truncate text-[10px] font-medium text-white">{project.title}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
