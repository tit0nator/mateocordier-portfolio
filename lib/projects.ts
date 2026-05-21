// The full content map for the Finder. Each entry is a card in one of
// three folders. Days 4+ wire the Lab videos into TitoFlix and the
// Decks PDFs into Preview; today's job is just to render the cards and
// the Selected Work detail view.

export type ProjectFolder = "selected" | "lab" | "decks";

type Localized = { fr: string; en: string };

export interface Project {
  id: string;
  slug: string;
  folder: ProjectFolder;
  title: string;
  role: Localized;
  year: number;
  tags: string[];
  description: Localized;
  /** /public path to the hero thumbnail. If absent, render a placeholder card. */
  hero?: string;
  /** /public paths to additional images shown in the detail view. */
  assets?: string[];
  /** External URL for the live site (Selected Work only). */
  externalUrl?: string;
  /** /public path to the video file (Lab folder). Wired to TitoFlix on Day 4. */
  videoUrl?: string;
  /** /public path to the PDF (Decks folder). Wired to Preview on Day 4. */
  pdfUrl?: string;
  /** Background color for placeholder cards when hero is absent. */
  placeholderColor?: string;
}

export const PROJECTS: Project[] = [
  // ── Selected Work ────────────────────────────────────────────────────
  {
    id: "body-spirit",
    slug: "body-spirit",
    folder: "selected",
    title: "Body & Spirit",
    role: { fr: "Site + Stripe · 2025", en: "Site + Stripe · 2025" },
    year: 2025,
    tags: ["site web", "e-commerce", "stripe", "client payé"],
    description: {
      fr: "Site vitrine + prise en charge Stripe pour un studio de fitness lyonnais. Livré en 4 jours, en production depuis 2025.",
      en: "Landing page and Stripe checkout for a Lyon fitness studio. Live in 4 days, still running.",
    },
    externalUrl: "https://bodyspirit-8ukwc26w.manus.space",
    hero: "/projects/body-spirit/hero.jpg",
    videoUrl: "/projects/body-spirit/video.mp4",
    placeholderColor: "#c75c4a",
  },
  {
    id: "surge",
    slug: "surge",
    folder: "selected",
    title: "Surge",
    role: { fr: "Mon agence · 2024", en: "My own agency · 2024" },
    year: 2024,
    tags: ["agence", "marketing IA", "site web"],
    description: {
      fr: "Mon agence en propre : sites web et marketing IA pour PME et créateurs. Promesse de livraison en 7 jours.",
      en: "My own agency — websites and AI marketing for SMBs and creators. 7-day delivery, no exceptions.",
    },
    externalUrl: "https://www.lesurge.com",
    hero: "/projects/surge/hero.jpg",
    videoUrl: "/projects/surge/video.mp4",
  },
  {
    id: "reserve",
    slug: "reserve",
    folder: "selected",
    title: "RÉSERVE",
    role: { fr: "Brand · E-commerce · 2024", en: "Brand · E-commerce · 2024" },
    year: 2024,
    tags: ["e-commerce", "drop culture", "branding", "épicerie"],
    description: {
      fr: "Concept e-commerce drop-culture pour une épicerie de quartier — identité visuelle complète et site Shopify de bout en bout.",
      en: "Drop-culture e-commerce concept for a neighbourhood store — full brand identity and Shopify build.",
    },
    externalUrl: "https://reserveepic-treosgst.manus.space",
    hero: "/projects/reserve/hero.jpg",
    videoUrl: "/projects/reserve/video.mp4",
    assets: [
      "/projects/reserve/02-ramune.jpg",
      "/projects/reserve/03-takis.jpg",
      "/projects/reserve/04-grid.jpg",
    ],
  },
  {
    id: "pedalos",
    slug: "pedalos",
    folder: "selected",
    title: "Pedalos",
    role: { fr: "Site mobile · 2024", en: "Mobile site · 2024" },
    year: 2024,
    tags: ["mobile-first", "projet famille"],
    description: {
      fr: "Site mobile-first conçu pour le projet professionnel de mon père. Priorité à la lisibilité et à la vitesse sur téléphone.",
      en: "Mobile-first site built for my dad's business. Optimised for readability and speed on a small screen.",
    },
    placeholderColor: "#3e6e8e",
  },

  // ── Lab ──────────────────────────────────────────────────────────────
  {
    id: "ap-swatch",
    slug: "ap-swatch",
    folder: "lab",
    title: "AP × Swatch",
    role: { fr: "TitoFlix · Hypermotion · 2026", en: "TitoFlix · Hypermotion · 2026" },
    year: 2026,
    tags: ["IA motion", "TitoFlix", "watch culture"],
    description: {
      fr: "Pièce motion IA — collab imaginaire AP × Swatch en hypermotion. Générée sur TitoFlix.",
      en: "AI motion piece — imagined AP × Swatch hypermotion collab. Generated on TitoFlix.",
    },
    videoUrl: "/lab/ap-swatch.mp4",
    placeholderColor: "#2a2a2f",
  },
  {
    id: "prime",
    slug: "prime",
    folder: "lab",
    title: "Prime",
    role: { fr: "TitoFlix · Hypermotion · 2026", en: "TitoFlix · Hypermotion · 2026" },
    year: 2026,
    tags: ["IA motion", "TitoFlix", "beverage"],
    description: {
      fr: "Pièce motion IA pour Prime Energy — hypermotion généré sur TitoFlix.",
      en: "AI motion piece for Prime Energy — hypermotion generated on TitoFlix.",
    },
    videoUrl: "/lab/prime.mp4",
    placeholderColor: "#1f4d8c",
  },
  {
    id: "fanta",
    slug: "fanta",
    folder: "lab",
    title: "Fanta",
    role: { fr: "TitoFlix · Hypermotion · 2026", en: "TitoFlix · Hypermotion · 2026" },
    year: 2026,
    tags: ["IA motion", "TitoFlix", "beverage"],
    description: {
      fr: "Pièce motion IA pour Fanta — couleurs saturées, énergie maximale, rendu TitoFlix.",
      en: "AI motion piece for Fanta — saturated colours, maximum energy, rendered on TitoFlix.",
    },
    videoUrl: "/lab/fanta.mp4",
    placeholderColor: "#d96d2a",
  },
  {
    id: "kiprun",
    slug: "kiprun",
    folder: "lab",
    title: "Kiprun",
    role: { fr: "TitoFlix · Hypermotion · 2026", en: "TitoFlix · Hypermotion · 2026" },
    year: 2026,
    tags: ["IA motion", "TitoFlix", "running"],
    description: {
      fr: "Pièce motion IA pour Kiprun (running Decathlon) — dynamisme et terrain, rendu TitoFlix.",
      en: "AI motion piece for Kiprun (Decathlon running) — terrain energy and pace, rendered on TitoFlix.",
    },
    videoUrl: "/lab/kiprun.mp4",
    placeholderColor: "#3b6e3d",
  },

  {
    id: "pabs-1",
    slug: "pabs-1",
    folder: "lab",
    title: "The Bear of Main St",
    role: { fr: "TitoFlix · Hypermotion · 2026", en: "TitoFlix · Hypermotion · 2026" },
    year: 2026,
    tags: ["IA motion", "TitoFlix"],
    description: {
      fr: "Piece motion IA — rendu TitoFlix.",
      en: "AI motion piece — rendered on TitoFlix.",
    },
    videoUrl: "/lab/pabs-1.mp4",
    placeholderColor: "#2b1a0e",
  },
  {
    id: "pabs-2",
    slug: "pabs-2",
    folder: "lab",
    title: "Thank You",
    role: { fr: "TitoFlix · Hypermotion · 2026", en: "TitoFlix · Hypermotion · 2026" },
    year: 2026,
    tags: ["IA motion", "TitoFlix"],
    description: {
      fr: "Piece motion IA — rendu TitoFlix.",
      en: "AI motion piece — rendered on TitoFlix.",
    },
    videoUrl: "/lab/pabs-2.mp4",
    placeholderColor: "#1a0e2b",
  },

  // -- Decks ────────────────────────────────────────────────────────────
  {
    id: "mon-pitou",
    slug: "mon-pitou",
    folder: "decks",
    title: "Mon Pitou × Out of the Blue",
    role: { fr: "Stratégie 360° · 2023", en: "Full-stack strategy · 2023" },
    year: 2023,
    tags: ["stratégie", "café-bistro", "Vancouver"],
    description: {
      fr: "Stratégie complète pour Mon Pitou — café, bistro et épicerie à Vancouver. Projet école sur vrai client : positionnement, offre, communication.",
      en: "Full strategy for Mon Pitou — café, bistro and corner shop in Vancouver. School project for a real client: positioning, offer, communications.",
    },
    pdfUrl: "/decks/mon-pitou.pdf",
    placeholderColor: "#7a5a3c",
  },
];
