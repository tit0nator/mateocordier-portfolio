"use client";

import type { AppId } from "@/lib/store";
import { Notes } from "./Notes";
import { Finder } from "./Finder";
import { Higgsfield } from "./Higgsfield";
import { Safari } from "./Safari";
import { Preview } from "./Preview";

export type AppProps = { windowId: string };

type AppEntry = {
  Component: React.ComponentType<AppProps>;
  titleKey: string;
};

function Placeholder({ name }: { name: string }) {
  return (
    <div className="flex h-full items-center justify-center p-6 text-center text-sm text-zinc-500 dark:text-zinc-400">
      <p>{name} — coming soon.</p>
    </div>
  );
}

const make = (name: string) => () => <Placeholder name={name} />;

export const APP_REGISTRY: Partial<Record<AppId, AppEntry>> = {
  notes: { Component: Notes, titleKey: "notes" },
  finder: { Component: Finder, titleKey: "finder" },
  safari: { Component: Safari, titleKey: "safari" },
  higgsfield: { Component: Higgsfield, titleKey: "higgsfield" },
  preview: { Component: Preview, titleKey: "preview" },
  cursor: { Component: make("Cursor"), titleKey: "cursor" },
  mail: { Component: make("Mail"), titleKey: "mail" },
  // "resume" is intentionally absent — clicking the resume dock icon triggers
  // a PDF download, it never opens a window.
};
