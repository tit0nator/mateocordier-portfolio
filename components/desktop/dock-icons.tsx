"use client";

import type { AppId } from "@/lib/store";

interface IconProps {
  size: number;
}

function IconShell({
  size,
  bg,
  children,
}: {
  size: number;
  bg: string;
  children: React.ReactNode;
}) {
  const r = Math.round(size * 0.25); // ~12px at 48px base
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: r,
        background: bg,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      {children}
    </div>
  );
}

// Finder — blue, dual-face icon
function FinderIcon({ size }: IconProps) {
  const s = size * 0.54;
  return (
    <IconShell size={size} bg="#4A90D9">
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        {/* Left face */}
        <ellipse cx="9" cy="10" rx="3.5" ry="4" fill="white" opacity="0.9" />
        <circle cx="7.5" cy="9" r="1" fill="#4A90D9" />
        <path d="M6 13.5 Q9 15.5 12 13.5" stroke="#4A90D9" strokeWidth="1.2" fill="none" strokeLinecap="round" />
        {/* Right face */}
        <ellipse cx="16" cy="10" rx="3.5" ry="4" fill="white" />
        <circle cx="17" cy="9" r="1" fill="#4A90D9" />
        <path d="M13 13.5 Q16 15.5 19 13.5" stroke="#4A90D9" strokeWidth="1.2" fill="none" strokeLinecap="round" />
      </svg>
    </IconShell>
  );
}

// Safari — gradient blue, compass
function SafariIcon({ size }: IconProps) {
  const s = size * 0.5;
  return (
    <IconShell size={size} bg="linear-gradient(135deg, #1A73E8, #34AADC)">
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="9" stroke="white" strokeWidth="1.5" opacity="0.6" />
        <polygon points="12,4 14.5,13.5 12,12 9.5,13.5" fill="white" />
        <polygon points="12,20 9.5,10.5 12,12 14.5,10.5" fill="rgba(255,255,255,0.5)" />
      </svg>
    </IconShell>
  );
}

// TitoFlix — Netflix red, play triangle
function TitoflixIcon({ size }: IconProps) {
  const s = size * 0.44;
  return (
    <IconShell size={size} bg="#E50914">
      <svg width={s} height={s} viewBox="0 0 24 24" fill="white" aria-hidden="true">
        <path d="M6 4.5L19 12 6 19.5V4.5Z" />
      </svg>
    </IconShell>
  );
}

// Preview — purple, overlapping rectangles
function PreviewIcon({ size }: IconProps) {
  const s = size * 0.5;
  return (
    <IconShell size={size} bg="#8E44AD">
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="3" y="6" width="13" height="16" rx="2" fill="rgba(255,255,255,0.4)" stroke="white" strokeWidth="1.5" />
        <rect x="8" y="2" width="13" height="16" rx="2" fill="rgba(255,255,255,0.7)" stroke="white" strokeWidth="1.5" />
      </svg>
    </IconShell>
  );
}

// Cursor — dark, code brackets
function CursorIcon({ size }: IconProps) {
  const s = size * 0.5;
  return (
    <IconShell size={size} bg="#1A1A2E">
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M7 8L3 12L7 16" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M17 8L21 12L17 16" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M14 4L10 20" stroke="rgba(255,255,255,0.5)" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    </IconShell>
  );
}

// Mail — blue, envelope
function MailIcon({ size }: IconProps) {
  const s = size * 0.52;
  return (
    <IconShell size={size} bg="#4A90D9">
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="2" y="5" width="20" height="14" rx="2" fill="rgba(255,255,255,0.2)" stroke="white" strokeWidth="1.5" />
        <path d="M2 8L12 14L22 8" stroke="white" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    </IconShell>
  );
}

// Notes — yellow, notepad lines
function NotesIcon({ size }: IconProps) {
  const s = size * 0.5;
  return (
    <IconShell size={size} bg="#F5C542">
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="3" y="2" width="18" height="20" rx="2" fill="rgba(0,0,0,0.15)" />
        <line x1="7" y1="8" x2="17" y2="8" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
        <line x1="7" y1="12" x2="17" y2="12" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
        <line x1="7" y1="16" x2="13" y2="16" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    </IconShell>
  );
}

// Messages — green, chat bubble
function MessagesIcon({ size }: IconProps) {
  const s = size * 0.52;
  return (
    <IconShell size={size} bg="#34C759">
      <svg width={s} height={s} viewBox="0 0 24 24" fill="white" aria-hidden="true">
        <path d="M12 2C6.48 2 2 6.03 2 11c0 2.52 1.09 4.79 2.86 6.43L4 22l4.57-1.15A10.4 10.4 0 0 0 12 21c5.52 0 10-4.03 10-9S17.52 2 12 2z" />
      </svg>
    </IconShell>
  );
}

// Stocks — green→blue gradient, upward chart
function StocksIcon({ size }: IconProps) {
  const s = size * 0.5;
  const id = "stocks-grad";
  return (
    <IconShell size={size} bg="linear-gradient(135deg, #30D158, #007AFF)">
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <polyline points="2,18 8,11 13,15 22,5" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        <polyline points="17,5 22,5 22,10" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </IconShell>
  );
}

// Strava — orange, running figure
function StravaIcon({ size }: IconProps) {
  const s = size * 0.52;
  return (
    <IconShell size={size} bg="#FC4C02">
      <svg width={s} height={s} viewBox="0 0 24 24" fill="white" aria-hidden="true">
        <circle cx="14" cy="3.5" r="2" />
        <path d="M10 8.5c1.5-1 3-1.5 4.5-.5L17 12l-3 2-1.5-3L11 13l-2 5H6l3-7-2-1 3-1.5z" />
      </svg>
    </IconShell>
  );
}

// Links — coral, chain link
function LinksIcon({ size }: IconProps) {
  const s = size * 0.52;
  return (
    <IconShell size={size} bg="#FF6B6B">
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </IconShell>
  );
}

// Resume — gray, download arrow
function ResumeIcon({ size }: IconProps) {
  const s = size * 0.5;
  return (
    <IconShell size={size} bg="#6C6C70">
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 3v13" stroke="white" strokeWidth="2.2" strokeLinecap="round" />
        <path d="M7 12l5 5 5-5" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M4 20h16" stroke="white" strokeWidth="2" strokeLinecap="round" />
      </svg>
    </IconShell>
  );
}

export const DOCK_ICON_MAP: Record<AppId, React.FC<IconProps>> = {
  finder: FinderIcon,
  safari: SafariIcon,
  titoflix: TitoflixIcon,
  preview: PreviewIcon,
  cursor: CursorIcon,
  mail: MailIcon,
  notes: NotesIcon,
  messages: MessagesIcon,
  stocks: StocksIcon,
  strava: StravaIcon,
  links: LinksIcon,
  resume: ResumeIcon,
};
