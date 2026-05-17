# Mateo Cordier — portfolio

Personal portfolio built as a macOS-style workspace. Visitors land on a populated desktop with a menubar, a dock, and a few windows already open.

Stack: Next.js 16 (App Router) · React 19 · Tailwind v4 · framer-motion · zustand · next-intl · lucide-react.

Companion docs in the parent folder:

- `../2026-05-17-portfolio-workspace-design.md` — the design spec
- `../2026-05-17-portfolio-implementation-plan.md` — the 7-day build plan

## Local development

```bash
npm install
npm run dev
```

The site runs at <http://localhost:3000>. Root redirects to `/fr` (default locale); `/en` is the alternate.

## Day 1 (this commit)

- Next.js + Tailwind scaffold
- next-intl wired for FR + EN routing
- Desktop shell: wallpaper (placeholder gradient), menubar with live Lyon clock, dock with 8 app icons (no behavior yet)
- Empty Zustand window store (filled on Day 2)

## Roadmap

See `../2026-05-17-portfolio-implementation-plan.md`. Days 2–7 add the Window component, all 8 apps, content, polish, mobile fallback, and deploy.
