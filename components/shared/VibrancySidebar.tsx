"use client";

import type { HTMLAttributes, ReactNode } from "react";

interface VibrancySidebarProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  width?: number | string;
}

export function VibrancySidebar({ children, className = "", width = 144, style, ...rest }: VibrancySidebarProps) {
  return (
    <aside
      className={`shrink-0 border-r border-black/10 bg-white/40 dark:border-white/10 dark:bg-zinc-900/40 ${className}`}
      style={{
        width,
        backdropFilter: "blur(40px)",
        WebkitBackdropFilter: "blur(40px)",
        ...style,
      }}
      {...rest}
    >
      {children}
    </aside>
  );
}
