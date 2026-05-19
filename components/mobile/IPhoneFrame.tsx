"use client";

/**
 * Static iPhone frame overlays — Dynamic Island + home indicator.
 * Purely cosmetic: makes the mobile view feel like a real iPhone screen.
 * Only renders on mobile (< 768px) via the data-mobile attribute.
 */
export function IPhoneFrame() {
  return (
    <>
      {/* Dynamic Island */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed left-1/2 top-[2px] z-[9999] -translate-x-1/2 md:hidden"
        style={{
          width: 126,
          height: 37,
          borderRadius: 22,
          background: "#000",
        }}
      />

      {/* Home Indicator */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed bottom-2 left-1/2 z-[9999] -translate-x-1/2 md:hidden"
        style={{
          width: 134,
          height: 5,
          borderRadius: 3,
        }}
      >
        <div className="h-full w-full rounded-full bg-black/20 dark:bg-white/30" />
      </div>
    </>
  );
}
