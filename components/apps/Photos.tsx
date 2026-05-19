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
      className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black/90"
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
              className="absolute -left-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-white hover:bg-white/40"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Next"
              className="absolute -right-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-white hover:bg-white/40"
            >
              ›
            </button>
          </>
        )}
      </div>

      {/* Caption */}
      {p.caption && (
        <p className="mt-3 text-[12px] text-white/70" onClick={(e) => e.stopPropagation()}>
          {p.caption}
        </p>
      )}

      {/* Close */}
      <button
        type="button"
        onClick={onClose}
        className="absolute top-3 right-3 flex h-7 w-7 items-center justify-center rounded-full bg-white/20 text-white hover:bg-white/40 text-[14px]"
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
      <main className="flex-1 overflow-y-auto">
        <div
          className="grid p-0.5"
          style={{ gridTemplateColumns: "repeat(3, 1fr)", gap: 2 }}
        >
          {visiblePhotos.map((photo) => (
            <button
              key={photo.id}
              type="button"
              onClick={() => setLightboxPhoto(photo)}
              className="group relative aspect-square overflow-hidden bg-zinc-100 dark:bg-zinc-800"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={photo.src}
                alt={photo.caption ?? ""}
                className="h-full w-full object-cover transition-[filter] duration-150 group-hover:brightness-110"
              />
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
