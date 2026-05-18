import { create } from "zustand";

interface ThemeStore {
  isDark: boolean;
  /** Called once on mount to sync store with localStorage / system preference. */
  init: () => void;
  toggle: () => void;
}

function applyToDOM(dark: boolean) {
  if (typeof document === "undefined") return;
  document.documentElement.classList.toggle("dark", dark);
  document.documentElement.classList.toggle("light", !dark);
}

export const useThemeStore = create<ThemeStore>((set, get) => ({
  isDark: false,

  init() {
    const stored = localStorage.getItem("theme");
    const dark =
      stored === "dark" ||
      (!stored && window.matchMedia("(prefers-color-scheme: dark)").matches);
    applyToDOM(dark);
    set({ isDark: dark });
  },

  toggle() {
    const next = !get().isDark;
    applyToDOM(next);
    localStorage.setItem("theme", next ? "dark" : "light");
    set({ isDark: next });
  },
}));
