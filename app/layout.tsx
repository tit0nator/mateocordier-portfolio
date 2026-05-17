import "./globals.css";

// The root layout is intentionally minimal — the locale-aware layout
// at app/[locale]/layout.tsx is the real one. This file exists because
// Next requires a root layout, but everything that matters lives below.
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
