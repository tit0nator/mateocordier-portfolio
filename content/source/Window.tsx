"use client";

import { useEffect, type ReactNode } from "react";
import { motion, useDragControls, useMotionValue } from "framer-motion";
import { useWindowStore, type WindowState } from "@/lib/store";

interface WindowProps {
  window: WindowState;
  title: string;
  children: ReactNode;
}

export function Window({ window: w, title, children }: WindowProps) {
  const moveWindow = useWindowStore((s) => s.moveWindow);
  const closeWindow = useWindowStore((s) => s.closeWindow);
  const focusWindow = useWindowStore((s) => s.focusWindow);
  const focusedId = useWindowStore((s) => s.focusedId);

  // The motion values are the source of truth during drag.
  const x = useMotionValue(w.position.x);
  const y = useMotionValue(w.position.y);

  // If the store moves us externally (e.g., reopen at staggered position), sync the motion values.
  useEffect(() => {
    x.set(w.position.x);
    y.set(w.position.y);
  }, [w.position.x, w.position.y, x, y]);

  const dragControls = useDragControls();
  const isFocused = focusedId === w.id;

  return (
    <motion.div
      drag
      dragMomentum={false}
      dragElastic={0}
      dragListener={false}
      dragControls={dragControls}
      onDragEnd={() => moveWindow(w.id, { x: x.get(), y: y.get() })}
      style={{
        x,
        y,
        zIndex: w.zIndex,
        width: w.size.width,
        height: w.size.height,
        position: "absolute",
      }}
      onPointerDown={() => focusWindow(w.id)}
      className={`overflow-hidden rounded-xl border backdrop-blur-xl shadow-2xl transition-opacity ${
        isFocused
          ? "border-black/15 dark:border-white/15"
          : "border-black/8 dark:border-white/10 opacity-95"
      }`}
    >
      <div
        // Drag handle. pointer-down on the header starts the drag via dragControls.
        onPointerDown={(e) => dragControls.start(e)}
        className={`flex h-8 cursor-grab items-center gap-2 border-b px-3 select-none active:cursor-grabbing ${
          isFocused
            ? "border-black/8 bg-white/85 dark:border-white/8 dark:bg-zinc-800/85"
            : "border-black/5 bg-white/70 dark:border-white/5 dark:bg-zinc-800/70"
        }`}
      >
        <WindowChrome onClose={() => closeWindow(w.id)} isFocused={isFocused} />
        <span className="ml-1 truncate text-[12px] font-medium text-zinc-700 dark:text-zinc-200">
          {title}
        </span>
      </div>
      <div className="h-[calc(100%-2rem)] overflow-auto bg-white/95 dark:bg-zinc-900/95">
        {children}
      </div>
    </motion.div>
  );
}

function WindowChrome({
  onClose,
  isFocused,
}: {
  onClose: () => void;
  isFocused: boolean;
}) {
  // Chrome buttons stop pointer propagation so clicking them doesn't start a drag.
  const stop = (e: React.PointerEvent) => e.stopPropagation();
  const colorClose = isFocused ? "bg-[#ff5f57]" : "bg-zinc-400/60";
  const colorMin = isFocused ? "bg-[#febc2e]" : "bg-zinc-400/60";
  const colorMax = isFocused ? "bg-[#28c840]" : "bg-zinc-400/60";

  return (
    <div className="group/chrome flex items-center gap-1.5">
      <button
        type="button"
        aria-label="Close"
        onPointerDown={stop}
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        className={`flex h-3 w-3 items-center justify-center rounded-full transition-colors ${colorClose}`}
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 6 6"
          className="h-1.5 w-1.5 opacity-0 group-hover/chrome:opacity-70"
          fill="none"
          stroke="#4d0000"
          strokeWidth="1"
        >
          <path d="M1 1l4 4M5 1L1 5" />
        </svg>
      </button>
      <span aria-hidden="true" className={`h-3 w-3 rounded-full ${colorMin}`} />
      <span aria-hidden="true" className={`h-3 w-3 rounded-full ${colorMax}`} />
    </div>
  );
}
