import type { Metadata } from "next";
import { cookies } from "next/headers";
import "./globals.css";
import { routing } from "@/i18n/routing";

export const metadata: Metadata = {
  title: "Mateo Cordier",
  description: "Sites web et vidéos IA. Depuis Lyon.",
};

// Next 16 requires <html> and <body> in the root layout. The next-intl middleware
// sets a NEXT_LOCALE cookie on every request, so we read it here to set the
// correct lang attribute (avoids hydration mismatches between /fr and /en).
export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const cookieStore = await cookies();
  const cookieLocale = cookieStore.get("NEXT_LOCALE")?.value;
  const lang =
    cookieLocale && routing.locales.includes(cookieLocale as (typeof routing.locales)[number])
      ? cookieLocale
      : routing.defaultLocale;

  return (
    <html lang={lang} className="h-full antialiased" suppressHydrationWarning>
      <body className="h-full">{children}</body>
    </html>
  );
}
