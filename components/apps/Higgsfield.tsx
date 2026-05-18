"use client";

import { useEffect, useRef, useState } from "react";
import { Play, Pause } from "lucide-react";
import { PROJECTS } from "@/lib/projects";
import { useWindowStore } from "@/lib/store";

const LAB_VIDEOS = PROJECTS.filter((p) => p.folder === "lab");

function formatTime(s: number) {
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
}

interface Props {
  windowId: string;
}

export function Higgsfield({ windowId }: Props) {
  const windowData = useWindowStore((s) => s.windows.find((w) => w.id === windowId)?.data);
  const initialId = (windowData?.videoId as string) ?? LAB_VIDEOS[0]?.id ?? "";

  const [activeId, setActiveId] = useState(initialId);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const videoRef = useRef<HTMLVideoElement>(null);
  const activeProject = LAB_VIDEOS.find((p) => p.id === activeId) ?? LAB_VIDEOS[0];

  // When switching videos, reset playback state.
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.load();
    setCurrentTime(0);
    setDuration(0);
    setPlaying(false);
  }, [activeId]);

  function togglePlay() {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play();
      setPlaying(true);
    } else {
      v.pause();
      setPlaying(false);
    }
  }

  function handleScrub(e: React.ChangeEvent<HTMLInputElement>) {
    const v = videoRef.current;
    if (!v) return;
    const t = Number(e.target.value);
    v.currentTime = t;
    setCurrentTime(t);
  }

  return (
    <div className="flex h-full bg-zinc-950 text-zinc-100">
      {/* Sidebar */}
      <aside className="w-36 shrink-0 overflow-y-auto border-r border-white/10 bg-zinc-900/80 py-2">
        <p className="px-3 pb-1.5 text-[9.5px] font-semibold uppercase tracking-widest text-zinc-500">
          Lab Videos
        </p>
        <ul className="space-y-0.5 px-1.5">
          {LAB_VIDEOS.map((p) => (
            <li key={p.id}>
              <button
                type="button"
                onClick={() => setActiveId(p.id)}
                className={`w-full rounded-md px-2 py-1.5 text-left text-[11px] transition-colors ${
                  p.id === activeId
                    ? "bg-zinc-700 text-white"
                    : "text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200"
                }`}
              >
                {p.title}
              </button>
            </li>
          ))}
        </ul>
      </aside>

      {/* Player */}
      <div className="flex flex-1 flex-col">
        {/* Video */}
        <div className="relative flex-1 bg-black">
          {activeProject?.videoUrl ? (
            <video
              ref={videoRef}
              key={activeProject.videoUrl}
              src={activeProject.videoUrl}
              loop
              playsInline
              className="h-full w-full object-contain"
              onTimeUpdate={() => setCurrentTime(videoRef.current?.currentTime ?? 0)}
              onLoadedMetadata={() => setDuration(videoRef.current?.duration ?? 0)}
              onPlay={() => setPlaying(true)}
              onPause={() => setPlaying(false)}
            />
          ) : (
            <div className="flex h-full items-center justify-center text-zinc-600 text-sm">
              No video
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="flex flex-col gap-1.5 border-t border-white/10 bg-zinc-900 px-3 py-2">
          {/* Title */}
          <p className="truncate text-[11px] font-medium text-zinc-200">
            {activeProject?.title}
          </p>

          {/* Scrubber */}
          <input
            type="range"
            min={0}
            max={duration || 1}
            step={0.1}
            value={currentTime}
            onChange={handleScrub}
            className="h-1 w-full cursor-pointer appearance-none rounded-full bg-zinc-700 accent-white"
          />

          {/* Play + time */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={togglePlay}
              className="flex items-center justify-center rounded-full bg-white/10 p-1.5 text-white hover:bg-white/20"
            >
              {playing ? <Pause size={12} /> : <Play size={12} />}
            </button>
            <span className="text-[10px] tabular-nums text-zinc-500">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
