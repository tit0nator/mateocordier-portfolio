"use client";

import { useTranslations } from "next-intl";

interface LinkItem {
  id: string;
  platform: string;
  url: string;
  accentColor: string;
  icon: React.ReactNode;
}

function LinkedInIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

function MaltIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 100 100" fill="currentColor" aria-hidden="true">
      <path d="M50 5L5 30v40l45 25 45-25V30L50 5zm0 10l35 19.4V65.6L50 85 15 65.6V34.4L50 15zm0 10L22 41v18l28 16 28-16V41L50 25zm0 10l18 10v12l-18 10-18-10V45l18-10z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function ExternalArrow() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

const LINKS: LinkItem[] = [
  {
    id: "linkedin",
    platform: "LinkedIn",
    url: "https://linkedin.com/in/mateo-cordier",
    accentColor: "#0A66C2",
    icon: <LinkedInIcon />,
  },
  {
    id: "github",
    platform: "GitHub",
    url: "https://github.com/tit0nator",
    accentColor: "#333",
    icon: <GitHubIcon />,
  },
  {
    id: "malt",
    platform: "Malt",
    url: "https://www.malt.fr/profile/mateocordier",
    accentColor: "#FC5757",
    icon: <MaltIcon />,
  },
  {
    id: "instagram",
    platform: "Instagram",
    url: "https://www.instagram.com/mateotito19/",
    accentColor: "#E4405F",
    icon: <InstagramIcon />,
  },
  {
    id: "email",
    platform: "Email",
    url: "mailto:mateo.cordier@gmail.com",
    accentColor: "#007AFF",
    icon: <MailIcon />,
  },
];

export function Links(_: { windowId: string }) {
  const t = useTranslations("apps.links");

  return (
    <div className="flex h-full flex-col overflow-y-auto bg-white dark:bg-zinc-900">
      {/* Profile header */}
      <div className="flex flex-col items-center px-5 pt-7 pb-5">
        <div
          className="flex h-[72px] w-[72px] items-center justify-center rounded-full text-[24px] font-bold text-white shadow-lg"
          style={{
            background: "linear-gradient(135deg, #007AFF, #5856D6)",
          }}
        >
          MC
        </div>
        <p className="mt-3 text-[16px] font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
          Mateo Cordier
        </p>
        <p className="mt-0.5 text-[12px] text-zinc-500 dark:text-zinc-400">
          {t("tagline")}
        </p>
      </div>

      {/* Link list */}
      <div className="flex flex-col gap-2 px-5 pb-6">
        {LINKS.map((link) => (
          <button
            key={link.id}
            type="button"
            onClick={() => window.open(link.url, "_blank", "noopener,noreferrer")}
            className="group flex w-full items-center gap-3 rounded-xl border border-zinc-100 bg-zinc-50/80 px-3.5 py-3 text-left transition-all duration-150 hover:bg-zinc-100 hover:shadow-sm active:scale-[0.98] dark:border-zinc-800 dark:bg-zinc-800/50 dark:hover:bg-zinc-800"
          >
            {/* Icon circle */}
            <div
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
              style={{ background: `${link.accentColor}12`, color: link.accentColor }}
            >
              {link.icon}
            </div>

            {/* Label */}
            <span className="flex-1 text-[13px] font-medium text-zinc-800 dark:text-zinc-200">
              {link.platform}
            </span>

            {/* Arrow */}
            <span className="text-zinc-300 transition-colors group-hover:text-zinc-500 dark:text-zinc-600 dark:group-hover:text-zinc-400">
              <ExternalArrow />
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
