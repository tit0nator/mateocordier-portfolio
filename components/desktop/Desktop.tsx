import { Wallpaper } from "./Wallpaper";
import { Menubar } from "./Menubar";
import { Dock } from "./Dock";

// Top-level desktop shell. The wallpaper fills the viewport; the menubar
// sits at the top; the dock floats at the bottom. Day 2 will add the
// windowing layer between menubar and dock.
export function Desktop() {
  return (
    <div className="relative h-screen w-screen overflow-hidden">
      <Wallpaper />
      <Menubar />
      {/* Window canvas — windows will be absolutely positioned here from Day 2 onward */}
      <div className="absolute inset-x-0 top-[28px] bottom-0 z-10" id="window-canvas" />
      <Dock />
    </div>
  );
}
