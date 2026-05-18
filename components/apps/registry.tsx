"use client";

import type { AppId } from "@/lib/store";
import { Notes } from "./Notes";
import { Finder } from "./Finder";
import { Higgsfield } from "./Higgsfield";
import { Safari } from "./Safari";
import { Preview } from "./Preview";
import { Cursor } from "./Cursor";
import { Mail } from "./Mail";

export type AppProps = { windowId: string };

type AppEntry = {
  Component: React.ComponentType<AppProps>;
  titleKey: string;
};

export const APP_REGISTRY: Partial<Record<AppId, AppEntry>> = {
  notes: { Component: Notes, titleKey: "notes" },
  finder: { Component: Finder, titleKey: "finder" },
  safari: { Component: Safari, titleKey: "safari" },
  higgsfield: { Component: Higgsfield, titleKey: "higgsfield" },
  preview: { Component: Preview, titleKey: "preview" },
  cursor: { Component: Cursor, titleKey: "cursor" },
  mail: { Component: Mail, titleKey: "mail" },
  // "resume" is intentionally absent — clicking the resume dock icon triggers
  // a PDF download, it never opens a window.
};
