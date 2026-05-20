"use client";

import { useCallback, useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { ALBUMS, PHOTOS, type Photo } from "@/lib/photos";
import { VibrancySidebar } from "@/components/shared/VibrancySidebar";

function Lightbox({
  photo,
  photos,
  onClose,
}: {
  photo: Photo;
  photos: Photo[];
  onClose: () => void;
}) {
  const t = useTranslations("apps.photos");
  const idx = photos.findIndex((p) => p.id === photo.id);

  const [current, setCurrent] = useState(idx);

  const prev = useCallback(() => setCurrent((i) => (i - 1 + photos.length) % photos.length), [photos.length]);
  const next = useCallback(() => setCurrent((i) => (i + 1) % photos.length), [photos.length]);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape")     onClose();
      if (e.key === "ArrowLeft")  prev();
      if (e.key === "ArrowRight") next();
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose, prev, next]);

  const p = photos[current];

  return (
    <div
      className="absolute inset-0 z-50 flex flex-col items-center justify-center"
      style={{ background: "rgba(0,0,0,0.92)" }}
      onClick={onClose}
    >
      {/* Image */}
      <div
        className="relative flex max-h-[80%] max-w-[90%] items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={p.src}
          alt={p.caption ?? ""}
          className="max-h-[65vh] max-w-full rounded-lg object-contain shadow-2xl"
        />

        {/* Arrows */}
        {photos.length > 1 && (
          <>
            <button
              type="button"
              onClick={prev}
              aria-label="Previous"
              className="absolute -left-12 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-[16px] text-white/80 backdrop-blur-sm transition-colors hover:bg-white/20"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Next"
              className="absolute -right-12 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-[16px] text-white/80 backdrop-blur-sm transition-colors hover:bg-white/20"
            >
              ›
            </button>
          </>
        )}
      </div>

      {/* Caption + counter */}
      <div className="mt-3 flex flex-col items-center gap-1" onClick={(e) => e.stopPropagation()}>
        {p.caption && (
          <p className="text-[12px] font-medium text-white/70">{p.caption}</p>
        )}
        <p className="text-[10px] text-white/40">
          {current + 1} / {photos.length}
        </p>
      </div>

      {/* Close */}
      <button
        type="button"
        onClick={onClose}
        className="absolute top-3 right-3 flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-[13px] text-white/80 backdrop-blur-sm transition-colors hover:bg-white/20"
        aria-label={t("close")}
      >
        ✕
      </button>
    </div>
  );
}

export function Photos(_: { windowId: string }) {
  const t = useTranslations("apps.photos.albums");
  const [activeAlbum, setActiveAlbum] = useState("all");
  const [lightboxPhoto, setLightboxPhoto] = useState<Photo | null>(null);

  const visiblePhotos = activeAlbum === "all"
    ? PHOTOS
    : PHOTOS.filter((p) => p.album === activeAlbum);

  return (
    <div className="relative flex h-full text-zinc-800 dark:text-zinc-100">
      {/* Sidebar */}
      <VibrancySidebar className="py-3 px-2">
        <p className="px-2 pb-1.5 text-[9.5px] font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
          Library
        </p>
        <ul className="space-y-0.5">
          {ALBUMS.map((album) => {
            const active = album.id === activeAlbum;
            const count = album.id === "all" ? PHOTOS.length : PHOTOS.filter((p) => p.album === album.id).length;
            return (
              <li key={album.id}>
                <button
                  type="button"
                  onClick={() => setActiveAlbum(album.id)}
                  className={`flex w-full items-center justify-between rounded-md px-2 py-1.5 text-left text-[12px] transition-colors ${
                    active
                      ? "bg-zinc-200/70 font-medium text-zinc-900 dark:bg-zinc-700/80 dark:text-white"
                      : "text-zinc-600 hover:bg-zinc-200/40 dark:text-zinc-300 dark:hover:bg-zinc-700/40"
                  }`}
                >
                  <span>{t(album.labelKey as Parameters<typeof t>[0])}</span>
                  <span className="text-[10px] text-zinc-400 dark:text-zinc-500">{count}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </VibrancySidebar>

      {/* Grid */}
      <main className="flex-1 overflow-y-auto bg-white dark:bg-zinc-900">
        <div
          className="grid p-1"
          style={{ gridTemplateColumns: "repeat(3, 1fr)", gap: 3 }}
        >
          {visiblePhotos.map((photo) => (
            <button
              key={photo.id}
              type="button"
              onClick={() => setLightboxPhoto(photo)}
              className="group relative aspect-square overflow-hidden rounded-[2px] bg-zinc-100 dark:bg-zinc-800"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={photo.src}
                alt={photo.caption ?? ""}
                className="h-full w-full object-cover transition-all duration-200 group-hover:brightness-110 group-hover:scale-[1.02]"
              />
              {/* Caption on hover */}
              {photo.caption && (
                <div className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-full bg-gradient-to-t from-black/60 to-transparent px-2 pb-1.5 pt-4 transition-transform duration-200 group-hover:translate-y-0">
                  <p className="text-[9.5px] font-medium text-white/90">{photo.caption}</p>
                </div>
              )}
            </button>
          ))}
        </div>
      </main>

      {/* Lightbox */}
      {lightboxPhoto && (
        <Lightbox
          photo={lightboxPhoto}
          photos={visiblePhotos}
          onClose={() => setLightboxPhoto(null)}
        />
      )}
    </div>
  );
}
