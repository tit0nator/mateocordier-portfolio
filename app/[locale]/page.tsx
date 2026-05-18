import { setRequestLocale } from "next-intl/server";
import { RootView } from "@/components/RootView";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <RootView />;
}
