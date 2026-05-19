import { Wallpaper } from "./Wallpaper";
import { Menubar } from "./Menubar";
import { Dock } from "./Dock";
import { AutoOpen } from "./AutoOpen";
import { KonamiEasterEgg } from "./KonamiEasterEgg";
import { WindowCanvas } from "@/components/window/WindowCanvas";

// Top-level desktop shell. The wallpaper fills the viewport; the menubar
// sits at the top; the dock floats at the bottom. The WindowCanvas renders
// every open window between them; AutoOpen seeds the initial set.
export function Desktop() {
  return (
    <div className="relative h-screen w-screen overflow-hidden">
      <Wallpaper />
      <Menubar />
      <div
        className="absolute inset-x-0 top-[28px] bottom-0 z-10"
        id="window-canvas"
      >
        <WindowCanvas />
      </div>
      <KonamiEasterEgg />
      <Dock />
      <AutoOpen />
    </div>
  );
}
