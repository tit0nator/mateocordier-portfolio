"use client";

export function ComingSoon() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-2 bg-white/95 dark:bg-zinc-900/95">
      <span className="text-3xl">🚧</span>
      <p className="text-[13px] font-medium text-zinc-700 dark:text-zinc-200">Coming Soon</p>
      <p className="text-[11px] text-zinc-400 dark:text-zinc-500">This app is in Phase 2.</p>
    </div>
  );
}
