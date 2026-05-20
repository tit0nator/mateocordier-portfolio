"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

const PLAYLIST_ID = "15305026663";
const WIDGET_URL  = `https://widget.deezer.com/widget/dark/playlist/${PLAYLIST_ID}`;
const PROFILE_URL = `https://www.deezer.com/fr/playlist/${PLAYLIST_ID}`;
const DEEZER_PURPLE = "#A238FF";

export function Deezer(_: { windowId: string }) {
  const t = useTranslations("apps.deezer");
  const [embedError, setEmbedError] = useState(false);

  return (
    <div className="flex h-full flex-col bg-zinc-950 text-white">
      {/* Header */}
      <div
        className="shrink-0 flex items-center gap-2.5 px-4 py-2.5 border-b"
        style={{ borderColor: "rgba(162,56,255,0.15)" }}
      >
        <div
          className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg shadow-sm"
          style={{ background: DEEZER_PURPLE }}
        >
          <svg width="11" height="11" viewBox="0 0 24 24" fill="white" aria-hidden="true">
            <path d="M18.81 4.16c-.77-.38-2.05-.38-2.82 0L12 6.34 7.01 4.16c-.77-.38-2.05-.38-2.82 0L2 5.5v13.16l2.19 1.34c.77.38 2.05.38 2.82 0L12 17.66l4.99 2.34c.77.38 2.05.38 2.82 0L22 18.66V5.5l-3.19-1.34zM12 15.16L7.01 12.98V8.84L12 11.02v4.14zm0-6.14L7.01 6.84V2.7L12 4.88v4.14zm4.99 6.14L12 12.98V8.84l4.99 2.18v4.14z" />
          </svg>
        </div>
        <span className="text-[13px] font-semibold tracking-tight">{t("title")}</span>
        <span className="text-[10px] text-white/30 ml-auto">{"Mateo's Playlist"}</span>
      </div>

      {/* Embed or fallback */}
      <div className="flex-1 overflow-hidden">
        {embedError ? (
          <div className="flex h-full flex-col items-center justify-center gap-3 px-4">
            <div
              className="flex h-14 w-14 items-center justify-center rounded-2xl text-[28px]"
              style={{ background: DEEZER_PURPLE }}
            >
              {"🎵"}
            </div>
            <p className="text-[13px] font-medium text-white/80">Playlist unavailable in your browser</p>
            <a
              href={PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 rounded-full px-5 py-2 text-[12px] font-semibold text-white transition-opacity hover:opacity-85"
              style={{ background: DEEZER_PURPLE }}
            >
              {t("fallback")} {"→"}
            </a>
          </div>
        ) : (
          <iframe
            title="deezer-widget"
            src={WIDGET_URL}
            width="100%"
            height="100%"
            frameBorder="0"
            allow="encrypted-media; clipboard-write"
            style={{ display: "block" }}
            onError={() => setEmbedError(true)}
          />
        )}
      </div>
    </div>
  );
}
