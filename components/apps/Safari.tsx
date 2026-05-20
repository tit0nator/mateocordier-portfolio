"use client";

import { useState } from "react";
import Image from "next/image";
import { ExternalLink, Lock } from "lucide-react";

interface Tab {
  id: string;
  domain: string;
  url: string;
  screenshotPath: string;
}

const TABS: Tab[] = [
  {
    id: "surge",
    domain: "lesurge.com",
    url: "https://www.lesurge.com",
    screenshotPath: "/projects/surge/hero.jpg",
  },
  {
    id: "reserve",
    domain: "reserve.shop",
    url: "https://reserveepic-treosgst.manus.space",
    screenshotPath: "/projects/reserve/hero.jpg",
  },
  {
    id: "bodyspirit",
    domain: "bodyspirit.studio",
    url: "https://bodyspirit-8ukwc26w.manus.space",
    screenshotPath: "/projects/body-spirit/hero.jpg",
  },
];

const TAB_FAVICONS: Record<string, { letter: string; bg: string }> = {
  surge:      { letter: "S", bg: "#111" },
  reserve:    { letter: "R", bg: "#7a5a3c" },
  bodyspirit: { letter: "B", bg: "#c75c4a" },
};

export function Safari(_: { windowId: string }) {
  const [activeId, setActiveId] = useState(TABS[0].id);
  const [imgError, setImgError] = useState<Record<string, boolean>>({});

  const active = TABS.find((t) => t.id === activeId)!;
  const favicon = TAB_FAVICONS[activeId];

  return (
    <div className="flex h-full flex-col bg-white dark:bg-zinc-900">
      {/* Tab bar */}
      <div className="flex shrink-0 items-end gap-px bg-zinc-100/90 px-2 pt-1 dark:bg-zinc-800/90">
        {TABS.map((tab) => {
          const fav = TAB_FAVICONS[tab.id];
          const isActive = tab.id === activeId;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveId(tab.id)}
              className={`flex items-center gap-1.5 rounded-t-lg px-3 py-1.5 text-[11px] transition-all ${
                isActive
                  ? "bg-white text-zinc-800 shadow-sm dark:bg-zinc-700 dark:text-zinc-100"
                  : "text-zinc-400 hover:text-zinc-600 dark:text-zinc-500 dark:hover:text-zinc-300"
              }`}
              style={{ minWidth: 100, maxWidth: 160 }}
            >
              <span
                className="flex h-4 w-4 shrink-0 items-center justify-center rounded text-[8px] font-bold text-white"
                style={{ background: fav.bg }}
                aria-hidden="true"
              >
                {fav.letter}
              </span>
              <span className="truncate">{tab.domain}</span>
            </button>
          );
        })}
      </div>

      {/* Toolbar */}
      <div className="flex shrink-0 items-center gap-2 border-b border-black/6 bg-white px-3 py-1.5 dark:border-white/6 dark:bg-zinc-800/60">
        {/* Nav arrows */}
        <div className="flex gap-0.5">
          {["←", "→"].map((ch) => (
            <span
              key={ch}
              aria-hidden="true"
              className="flex h-5 w-5 items-center justify-center rounded text-[11px] text-zinc-300 dark:text-zinc-600"
            >
              {ch}
            </span>
          ))}
        </div>

        {/* URL bar */}
        <div className="flex flex-1 items-center gap-1.5 rounded-lg bg-zinc-100 px-2.5 py-1.5 text-[11px] text-zinc-500 dark:bg-zinc-700 dark:text-zinc-400">
          <Lock size={10} className="shrink-0 text-green-500" aria-hidden="true" />
          <span className="truncate font-medium">{active.domain}</span>
        </div>

        {/* Visit button */}
        <a
          href={active.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 rounded-lg bg-zinc-900 px-2.5 py-1.5 text-[10.5px] font-medium text-white transition-colors hover:bg-zinc-700 dark:bg-zinc-200 dark:text-zinc-900 dark:hover:bg-zinc-100"
        >
          Visit
          <ExternalLink size={10} aria-hidden="true" />
        </a>
      </div>

      {/* Screenshot */}
      <div key={activeId} className="relative flex-1 overflow-hidden" style={{ animation: "safariTabFade 0.2s ease" }}>
        {!imgError[activeId] ? (
          <Image
            src={active.screenshotPath}
            alt={`${active.domain} screenshot`}
            fill
            className="object-cover object-top"
            sizes="720px"
            priority
            onError={() => setImgError((prev) => ({ ...prev, [activeId]: true }))}
          />
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-3 bg-zinc-50 dark:bg-zinc-800">
            <p className="text-[13px] font-medium text-zinc-500 dark:text-zinc-400">{active.domain}</p>
            <a
              href={active.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg bg-zinc-900 px-3.5 py-2 text-[12px] font-medium text-white hover:bg-zinc-700 dark:bg-zinc-200 dark:text-zinc-900"
            >
              Visit site <ExternalLink size={11} aria-hidden="true" />
            </a>
          </div>
        )}
      </div>

      <style>{`
        @keyframes safariTabFade {
          from { opacity: 0.4; }
          to   { opacity: 1; }
        }
      `}</style>
    </div>
  );
}
