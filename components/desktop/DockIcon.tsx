"use client";

import Image from "next/image";
import { motion, useTransform, type MotionValue } from "framer-motion";
import type { AppId } from "@/lib/store";
import { DOCK_ICON_SRC } from "./dock-icons";

interface DockIconProps {
  id: AppId;
  label: string;
  scaleValue: MotionValue<number>;
  isOpen: boolean;
  onClick: () => void;
}

export function DockIcon({ id, label, scaleValue, isOpen, onClick }: DockIconProps) {
  const BASE = 48;
  const iconSize = useTransform(scaleValue, (s) => Math.round(BASE * s));
  const src = DOCK_ICON_SRC[id];

  return (
    <div className="group relative flex flex-col items-center" style={{ paddingBottom: 6 }}>
      {/* Tooltip */}
      <div
        className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-black/80 px-2 py-1 text-[11px] text-white opacity-0 transition-opacity duration-150 delay-0 group-hover:opacity-100 group-hover:delay-[200ms] dark:bg-white/90 dark:text-black"
        aria-hidden="true"
      >
        {label}
      </div>

      {/* Icon — size drives magnification; no CSS scale (avoids double-scale) */}
      <motion.button
        type="button"
        aria-label={label}
        onClick={onClick}
        style={{ width: iconSize, height: iconSize, position: "relative" }}
        className="flex items-end justify-center active:brightness-90 transition-[filter] duration-75 shrink-0"
      >
        <Image
          src={src}
          alt=""
          fill
          sizes="72px"
          className="object-contain drop-shadow-sm"
          draggable={false}
        />
      </motion.button>

      {/* Open indicator dot */}
      <div
        className={`absolute -bottom-0.5 h-1 w-1 rounded-full transition-opacity duration-200 ${
          isOpen ? "opacity-100" : "opacity-0"
        } bg-black/40 dark:bg-white/70`}
      />
    </div>
  );
}
