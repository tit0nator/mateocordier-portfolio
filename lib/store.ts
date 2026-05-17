// Window store skeleton — full implementation lands on Day 2.
// Today this exists so Day 1 components can import the types without crashing.
import { create } from "zustand";

export type AppId =
  | "finder"
  | "safari"
  | "higgsfield"
  | "preview"
  | "cursor"
  | "mail"
  | "notes"
  | "resume";

export interface WindowState {
  id: string;
  app: AppId;
  title: string;
  position: { x: number; y: number };
  size: { width: number; height: number };
  zIndex: number;
  isFocused: boolean;
}

interface WindowStore {
  windows: WindowState[];
  nextZ: number;
  // Day 2 will fill these in.
  openApp: (app: AppId) => void;
  closeWindow: (id: string) => void;
  focusWindow: (id: string) => void;
  moveWindow: (id: string, position: { x: number; y: number }) => void;
}

export const useWindowStore = create<WindowStore>(() => ({
  windows: [],
  nextZ: 1,
  openApp: () => {},
  closeWindow: () => {},
  focusWindow: () => {},
  moveWindow: () => {},
}));
