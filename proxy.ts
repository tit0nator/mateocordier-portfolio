import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

// Renamed from middleware.ts in Next.js 16 — same job, new convention name.
export default createMiddleware(routing);

export const config = {
  matcher: "/((?!api|_next|_vercel|.*\\..*).*)",
};
