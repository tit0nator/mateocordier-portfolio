"use client";

import Image from "next/image";
import { ExternalLink, Lock } from "lucide-react";

const SITES: Record<string, { label: string; url: string; hero: string }> = {
  bodyspirit: {
    label: "bodyspirit-8ukwc26w.manus.space",
    url: "https://bodyspirit-8ukwc26w.manus.space",
    hero: "/projects/body-spirit/hero.jpg",
  },
};

export function Safari(_: { windowId: string }) {
  const site = SITES["bodyspirit"];

  return (
    <div className="flex h-full flex-col bg-white dark:bg-zinc-900">
      {/* Fake Safari toolbar */}
      <div className="flex shrink-0 items-center gap-2 border-b border-black/10 bg-zinc-100/80 px-3 py-1.5 dark:border-white/10 dark:bg-zinc-800/80">
        {/* Nav buttons (decorative) */}
        <div className="flex gap-1">
          {["←", "→"].map((ch) => (
            <span
              key={ch}
              aria-hidden="true"
              className="flex h-5 w-5 items-center justify-center rounded text-[11px] text-zinc-400 dark:text-zinc-500"
            >
              {ch}
            </span>
          ))}
        </div>

        {/* URL bar */}
        <div className="flex flex-1 items-center gap-1.5 rounded-md bg-white px-2.5 py-0.5 text-[11px] text-zinc-500 shadow-inner dark:bg-zinc-700 dark:text-zinc-400">
          <Lock size={10} className="text-green-500 shrink-0" aria-hidden="true" />
          <span className="truncate">{site.label}</span>
        </div>

        {/* Visit live site */}
        <a
          href={site.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 rounded-md bg-zinc-900 px-2.5 py-1 text-[10.5px] font-medium text-white hover:bg-zinc-700 dark:bg-zinc-200 dark:text-zinc-900 dark:hover:bg-zinc-100"
        >
          Visit site
          <ExternalLink size={10} aria-hidden="true" />
        </a>
      </div>

      {/* Screenshot */}
      <div className="relative flex-1 overflow-hidden">
        <Image
          src={site.hero}
          alt="Body & Spirit website screenshot"
          fill
          className="object-cover object-top"
          sizes="720px"
          priority
        />
      </div>
    </div>
  );
}
