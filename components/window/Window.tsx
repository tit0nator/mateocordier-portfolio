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

  const x = useMotionValue(w.position.x);
  const y = useMotionValue(w.position.y);

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
      initial={{ opacity: 0, scale: 0.88, y: 8 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.94, y: -4 }}
      transition={{ type: "spring", stiffness: 420, damping: 32 }}
      style={{
        x,
        y,
        zIndex: w.zIndex,
        width: w.size.width,
        height: w.size.height,
        position: "absolute",
        borderRadius: "var(--radius-window)",
        boxShadow: isFocused
          ? "var(--shadow-window-focused)"
          : "var(--shadow-window-unfocused)",
        transition: "box-shadow 200ms ease",
        overflow: "hidden",
      }}
      onPointerDown={() => focusWindow(w.id)}
      className={`border ${
        isFocused
          ? "border-black/12 dark:border-white/12"
          : "border-black/8 dark:border-white/8 opacity-95"
      }`}
    >
      {/* Title bar */}
      <div
        onPointerDown={(e) => dragControls.start(e)}
        className={`relative flex cursor-grab items-center border-b px-3 select-none active:cursor-grabbing ${
          isFocused
            ? "border-black/8 dark:border-white/8"
            : "border-black/5 dark:border-white/5"
        }`}
        style={{
          height: "var(--titlebar-height)",
          background: "var(--glass-bg)",
          backdropFilter: "blur(var(--glass-blur-light))",
          WebkitBackdropFilter: "blur(var(--glass-blur-light))",
          opacity: isFocused ? 1 : 0.75,
        }}
      >
        {/* Glass highlight on title bar top edge */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0"
          style={{ height: 1, background: "var(--glass-highlight)", opacity: isFocused ? 1 : 0.4 }}
        />
        {/* Traffic lights -- left */}
        <WindowChrome onClose={() => closeWindow(w.id)} isFocused={isFocused} />
        {/* Title -- centered absolutely so traffic lights do not push it */}
        <span
          className="pointer-events-none absolute inset-x-0 text-center truncate px-16 text-[12px] font-medium"
          style={{ opacity: isFocused ? 0.75 : 0.4, color: "var(--foreground)" }}
        >
          {title}
        </span>
      </div>

      {/* Content area */}
      <div
        className={`overflow-auto transition-opacity duration-200 ${isFocused ? "opacity-100" : "opacity-95"}`}
        style={{
          height: "calc(100% - var(--titlebar-height))",
          background: "var(--window-content-bg, rgba(255,255,255,0.97))",
        }}
      >
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
  const stop = (e: React.PointerEvent) => e.stopPropagation();
  const colorClose = isFocused ? "#ff5f57" : "#d4d4d8";
  const colorMin   = isFocused ? "#febc2e" : "#d4d4d8";
  const colorMax   = isFocused ? "#28c840" : "#d4d4d8";

  return (
    <div className="group/chrome flex items-center gap-2">
      {/* Close */}
      <button
        type="button"
        aria-label="Close"
        onPointerDown={stop}
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        className="group/btn flex h-3.5 w-3.5 items-center justify-center rounded-full transition-colors"
        style={{
          background: colorClose,
          boxShadow: "inset 0 1px 2px rgba(0,0,0,0.15)",
        }}
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

      {/* Minimize */}
      <span
        aria-hidden="true"
        className="h-3.5 w-3.5 rounded-full"
        style={{
          background: colorMin,
          boxShadow: "inset 0 1px 2px rgba(0,0,0,0.15)",
        }}
      />

      {/* Maximize */}
      <span
        aria-hidden="true"
        className="h-3.5 w-3.5 rounded-full"
        style={{
          background: colorMax,
          boxShadow: "inset 0 1px 2px rgba(0,0,0,0.15)",
        }}
      />
    </div>
  );
}
