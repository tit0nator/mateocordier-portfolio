"use client";

import type { AppId } from "@/lib/store";
import { Notes } from "./Notes";
import { Finder } from "./Finder";
import { Titoflix } from "./Titoflix";
import { Safari } from "./Safari";
import { Preview } from "./Preview";
import { Cursor } from "./Cursor";
import { Mail } from "./Mail";
import { ComingSoon } from "./ComingSoon";

export type AppProps = { windowId: string };

type AppEntry = {
  Component: React.ComponentType<AppProps>;
  titleKey: string;
};

export const APP_REGISTRY: Partial<Record<AppId, AppEntry>> = {
  notes: { Component: Notes, titleKey: "notes" },
  finder: { Component: Finder, titleKey: "finder" },
  safari: { Component: Safari, titleKey: "safari" },
  titoflix: { Component: Titoflix, titleKey: "titoflix" },
  preview: { Component: Preview, titleKey: "preview" },
  cursor: { Component: Cursor, titleKey: "cursor" },
  mail: { Component: Mail, titleKey: "mail" },
  messages: { Component: ComingSoon, titleKey: "messages" },
  stocks: { Component: ComingSoon, titleKey: "stocks" },
  strava: { Component: ComingSoon, titleKey: "strava" },
  links: { Component: ComingSoon, titleKey: "links" },
  // "resume" is intentionally absent — clicking the resume dock icon triggers
  // a PDF download, it never opens a window.
};
