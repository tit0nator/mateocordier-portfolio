// The full content map for the Finder. Each entry is a card in one of
// three folders. Days 4+ wire the Lab videos into Higgsfield and the
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
  /** /public path to the video file (Lab folder). Wired to Higgsfield on Day 4. */
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
      fr: "Site vitrine + paiement Stripe pour studio de fitness. Livré en 4 jours.",
      en: "Landing site + Stripe checkout for a fitness studio. Delivered in 4 days.",
    },
    externalUrl: "https://bodyspirit-8ukwc26w.manus.space",
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
      fr: "Mon agence : sites web & marketing IA, livraisons sous 7 jours.",
      en: "My agency: websites & AI marketing, delivered in under 7 days.",
    },
    externalUrl: "https://www.lesurge.com",
    hero: "/projects/surge/hero.jpg",
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
      fr: "Concept e-commerce drop-culture pour une épicerie de quartier — branding + site complet.",
      en: "Drop-culture e-commerce concept for a corner store — branding + full site.",
    },
    externalUrl: "https://reserveepic-treosgst.manus.space",
    hero: "/projects/reserve/hero.jpg",
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
      fr: "Site mobile-first construit pour le projet de mon père.",
      en: "Mobile-first site built for my dad's project.",
    },
    placeholderColor: "#3e6e8e",
  },

  // ── Lab ──────────────────────────────────────────────────────────────
  {
    id: "ap-swatch",
    slug: "ap-swatch",
    folder: "lab",
    title: "AP × Swatch",
    role: { fr: "Higgsfield · Hypermotion · 2026", en: "Higgsfield · Hypermotion · 2026" },
    year: 2026,
    tags: ["IA motion", "Higgsfield", "watch culture"],
    description: {
      fr: "Vidéo motion IA — collab AP × Swatch en hypermotion.",
      en: "AI motion piece — AP × Swatch hypermotion collab.",
    },
    videoUrl: "/lab/ap-swatch.mp4",
    placeholderColor: "#2a2a2f",
  },
  {
    id: "prime",
    slug: "prime",
    folder: "lab",
    title: "Prime",
    role: { fr: "Higgsfield · Hypermotion · 2026", en: "Higgsfield · Hypermotion · 2026" },
    year: 2026,
    tags: ["IA motion", "Higgsfield", "beverage"],
    description: {
      fr: "Vidéo motion IA pour Prime — hypermotion.",
      en: "AI motion piece for Prime — hypermotion.",
    },
    videoUrl: "/lab/prime.mp4",
    placeholderColor: "#1f4d8c",
  },
  {
    id: "fanta",
    slug: "fanta",
    folder: "lab",
    title: "Fanta",
    role: { fr: "Higgsfield · Hypermotion · 2026", en: "Higgsfield · Hypermotion · 2026" },
    year: 2026,
    tags: ["IA motion", "Higgsfield", "beverage"],
    description: {
      fr: "Vidéo motion IA pour Fanta.",
      en: "AI motion piece for Fanta.",
    },
    videoUrl: "/lab/fanta.mp4",
    placeholderColor: "#d96d2a",
  },
  {
    id: "kiprun",
    slug: "kiprun",
    folder: "lab",
    title: "Kiprun",
    role: { fr: "Higgsfield · Hypermotion · 2026", en: "Higgsfield · Hypermotion · 2026" },
    year: 2026,
    tags: ["IA motion", "Higgsfield", "running"],
    description: {
      fr: "Vidéo motion IA pour Kiprun (Decathlon running).",
      en: "AI motion piece for Kiprun (Decathlon running).",
    },
    videoUrl: "/lab/kiprun.mp4",
    placeholderColor: "#3b6e3d",
  },

  // ── Decks ────────────────────────────────────────────────────────────
  {
    id: "smartphone-repair",
    slug: "smartphone-repair",
    folder: "decks",
    title: "Smartphone repair — FR",
    role: { fr: "Étude de cas anonymisée · 2025", en: "Anonymized case study · 2025" },
    year: 2025,
    tags: ["stratégie", "marketing local", "personas", "audit"],
    description: {
      fr: "Audit + stratégie 360° pour une enseigne française de réparation smartphones. SWOT, personas, recommandations d'acquisition locale.",
      en: "Audit + 360 strategy for a French smartphone repair brand. SWOT, personas, local-acquisition recommendations.",
    },
    pdfUrl: "/decks/smartphone-repair.pdf",
    placeholderColor: "#5a5a62",
  },
  {
    id: "mon-pitou",
    slug: "mon-pitou",
    folder: "decks",
    title: "Mon Pitou × Out of the Blue",
    role: { fr: "Stratégie 360° · 2023", en: "Full-stack strategy · 2023" },
    year: 2023,
    tags: ["stratégie", "café-bistro", "Vancouver"],
    description: {
      fr: "Stratégie complète pour Mon Pitou — café / bistro / épicerie à Vancouver. Projet d'école pour un vrai restaurant.",
      en: "Full strategy for Mon Pitou — café / bistro / corner shop in Vancouver. School project for a real client.",
    },
    pdfUrl: "/decks/mon-pitou.pdf",
    placeholderColor: "#7a5a3c",
  },
];
