"use client";

import { useTranslations } from "next-intl";

// The Notes window content. Bio is the locked Option D — pulled from messages.
export function Notes(_: { windowId: string }) {
  const t = useTranslations("apps.notes");

  return (
    <article className="space-y-3 p-5 text-[13px] leading-relaxed text-zinc-800 dark:text-zinc-100">
      <p className="font-medium text-zinc-900 dark:text-zinc-50">{t("hello")}</p>
      <p>{t("intro")}</p>
      <p>{t("invite")}</p>
    </article>
  );
}
