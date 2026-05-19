"use client";

import type { AppId } from "@/lib/store";
import { Notes } from "./Notes";
import { Finder } from "./Finder";
import { MFlix } from "./MFlix";
import { Safari } from "./Safari";
import { Preview } from "./Preview";
import { Cursor } from "./Cursor";
import { Mail } from "./Mail";
import { Messages } from "./Messages";
import { Stocks } from "./Stocks";
import { Strava } from "./Strava";
import { Links } from "./Links";

export type AppProps = { windowId: string };

type AppEntry = {
  Component: React.ComponentType<AppProps>;
  titleKey: string;
};

export const APP_REGISTRY: Partial<Record<AppId, AppEntry>> = {
  notes:    { Component: Notes,    titleKey: "notes"    },
  finder:   { Component: Finder,   titleKey: "finder"   },
  safari:   { Component: Safari,   titleKey: "safari"   },
  mflix:    { Component: MFlix,    titleKey: "mflix"    },
  preview:  { Component: Preview,  titleKey: "preview"  },
  cursor:   { Component: Cursor,   titleKey: "cursor"   },
  mail:     { Component: Mail,     titleKey: "mail"     },
  messages: { Component: Messages, titleKey: "messages" },
  stocks:   { Component: Stocks,   titleKey: "stocks"   },
  strava:   { Component: Strava,   titleKey: "strava"   },
  links:    { Component: Links,    titleKey: "links"    },
  // "resume" is intentionally absent — clicking the resume dock icon triggers
  // a PDF download, it never opens a window.
};
