import { create } from "zustand";

export type AppId =
  | "finder"
  | "safari"
  | "mflix"
  | "preview"
  | "cursor"
  | "mail"
  | "notes"
  | "messages"
  | "stocks"
  | "strava"
  | "deezer"
  | "photos"
  | "chess"
  | "links"
  | "resume";

export interface WindowState {
  id: string;
  app: AppId;
  position: { x: number; y: number };
  size: { width: number; height: number };
  zIndex: number;
  // Optional payload an app can read on mount (e.g. which video or PDF to pre-load).
  data?: Record<string, unknown>;
}

interface WindowStore {
  windows: WindowState[];
  nextZ: number;
  focusedId: string | null;
  openCount: number; // used to stagger new window positions
  openApp: (app: AppId, opts?: { position?: { x: number; y: number }; size?: { width: number; height: number }; data?: Record<string, unknown> }) => void;
  closeWindow: (id: string) => void;
  focusWindow: (id: string) => void;
  moveWindow: (id: string, position: { x: number; y: number }) => void;
}

// Default size per app — Window component falls back to these if no override.
const DEFAULT_SIZES: Record<AppId, { width: number; height: number }> = {
  finder: { width: 720, height: 460 },
  safari: { width: 720, height: 480 },
  mflix: { width: 640, height: 420 },
  preview: { width: 560, height: 740 },
  cursor: { width: 700, height: 460 },
  mail: { width: 460, height: 420 },
  notes: { width: 360, height: 260 },
  messages: { width: 380, height: 520 },
  stocks: { width: 520, height: 400 },
  strava: { width: 440, height: 500 },
  deezer: { width: 380, height: 480 },
  photos: { width: 580, height: 460 },
  chess:  { width: 440, height: 420 },
  links:  { width: 340, height: 400 },
  resume: { width: 0, height: 0 }, // resume is a download, not a window
};

// Staggered default position so new windows don't all stack at the same point.
function staggeredPosition(index: number) {
  const baseX = 80;
  const baseY = 60;
  const step = 28;
  return {
    x: baseX + (index % 8) * step,
    y: baseY + (index % 8) * step,
  };
}

export const useWindowStore = create<WindowStore>((set, get) => ({
  windows: [],
  nextZ: 1,
  focusedId: null,
  openCount: 0,

  openApp: (app, opts) => {
    if (app === "resume") {
      return;
    }

    const existing = get().windows.find((w) => w.app === app);
    if (existing) {
      get().focusWindow(existing.id);
      return;
    }

    set((state) => {
      const z = state.nextZ;
      const id = `${app}-${Date.now()}`;
      const position = opts?.position ?? staggeredPosition(state.openCount);
      const size = opts?.size ?? DEFAULT_SIZES[app];
      const data = opts?.data;
      return {
        windows: [...state.windows, { id, app, position, size, zIndex: z, data }],
        nextZ: z + 1,
        focusedId: id,
        openCount: state.openCount + 1,
      };
    });
  },

  closeWindow: (id) => {
    set((state) => {
      const windows = state.windows.filter((w) => w.id !== id);
      const focusedId =
        state.focusedId === id
          ? // Refocus the topmost remaining window, if any.
            windows.reduce<string | null>(
              (top, w) => (top === null || w.zIndex > (windows.find((x) => x.id === top)?.zIndex ?? -1) ? w.id : top),
              null,
            )
          : state.focusedId;
      return { windows, focusedId };
    });
  },

  focusWindow: (id) => {
    set((state) => {
      const target = state.windows.find((w) => w.id === id);
      if (!target) return state;
      // Already on top — no change needed.
      if (target.zIndex === state.nextZ - 1 && state.focusedId === id) return state;

      const z = state.nextZ;
      return {
        windows: state.windows.map((w) => (w.id === id ? { ...w, zIndex: z } : w)),
        nextZ: z + 1,
        focusedId: id,
      };
    });
  },

  moveWindow: (id, position) => {
    set((state) => ({
      windows: state.windows.map((w) => (w.id === id ? { ...w, position } : w)),
    }));
  },
}));
