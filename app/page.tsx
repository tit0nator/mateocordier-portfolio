import { redirect } from "next/navigation";
import { routing } from "@/i18n/routing";

// Safety-net redirect — the next-intl middleware should normally
// catch the root path and route to /fr, but this is here in case.
export default function RootIndex() {
  redirect(`/${routing.defaultLocale}`);
}
