"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useThemeStore } from "@/lib/themeStore";

export function Wallpaper() {
  const isDark = useThemeStore((s) => s.isDark);
  const src = isDark ? "/wallpaper/dark.jpg" : "/wallpaper/light.jpg";

  return (
    <div aria-hidden="true" className="absolute inset-0 z-0 overflow-hidden">
      <AnimatePresence initial={false}>
        <motion.div
          key={src}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0"
        >
          <Image
            src={src}
            alt=""
            fill
            priority
            quality={90}
            sizes="100vw"
            className="object-cover"
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
