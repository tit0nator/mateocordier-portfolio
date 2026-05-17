// Day 1 placeholder wallpaper — a quiet two-tone gradient.
// When Mateo delivers the final Higgsfield render, swap this for an <img>.
export function Wallpaper() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 z-0"
      style={{
        background:
          "radial-gradient(120% 80% at 20% 10%, #d7c8e0 0%, #b7a6c7 45%, #6f6383 100%)",
      }}
    />
  );
}
