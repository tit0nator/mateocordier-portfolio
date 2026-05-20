"use client";

import { useTranslations } from "next-intl";

export function Notes(_: { windowId: string }) {
  const t = useTranslations("apps.notes");

  return (
    <div className="flex h-full flex-col bg-[#fefcf3] dark:bg-zinc-900">
      {/* Toolbar — macOS Notes style */}
      <div
        className="flex shrink-0 items-center justify-between border-b px-4 py-2"
        style={{
          background: "linear-gradient(to bottom, #fdfaf0, #faf6e8)",
          borderColor: "rgba(0,0,0,0.08)",
        }}
      >
        <div className="dark:hidden">
          <span className="text-[11px] font-medium text-amber-800/60">Notes</span>
        </div>
        <div className="hidden dark:block">
          <span className="text-[11px] font-medium text-zinc-400">Notes</span>
        </div>
        <span className="text-[10px] text-zinc-400 dark:text-zinc-500">
          {new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
        </span>
      </div>

      {/* Dark mode toolbar override */}
      <style>{`
        .dark .notes-toolbar-light { display: none; }
        @media (prefers-color-scheme: dark) {
          .notes-toolbar-light { display: none; }
        }
      `}</style>

      {/* Content */}
      <article className="flex-1 overflow-y-auto px-6 py-5">
        {/* Title — bold, large, macOS Notes style */}
        <h1 className="text-[20px] font-bold leading-tight text-zinc-900 dark:text-zinc-50">
          {t("hello")}
        </h1>

        <div className="mt-1 mb-4 h-px bg-amber-900/8 dark:bg-white/8" />

        <div className="space-y-3 text-[13px] leading-[1.7] text-zinc-700 dark:text-zinc-300">
          <p>{t("intro")}</p>
          <p>{t("invite")}</p>
        </div>
      </article>
    </div>
  );
}
