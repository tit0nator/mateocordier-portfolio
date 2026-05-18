import type { Metadata } from "next";
import { cookies } from "next/headers";
import "./globals.css";
import { routing } from "@/i18n/routing";

export const metadata: Metadata = {
  title: "Mateo Cordier",
  description: "Sites web et vidéos IA. Depuis Lyon.",
};

// Runs before React hydrates — sets .dark/.light on <html> and data-mobile
// so the first paint matches the user's preference (no flash).
const antiFlashScript = `(function(){
  var t=localStorage.getItem('theme');
  var dark=t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme: dark)').matches);
  document.documentElement.classList.add(dark?'dark':'light');
  if(window.matchMedia('(max-width: 767px)').matches){
    document.documentElement.setAttribute('data-mobile','1');
  }
})();`;

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
      <head>
        {/* eslint-disable-next-line @next/next/no-sync-scripts */}
        <script dangerouslySetInnerHTML={{ __html: antiFlashScript }} />
      </head>
      <body className="h-full">{children}</body>
    </html>
  );
}
