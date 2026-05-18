"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Send } from "lucide-react";

type State = "idle" | "sent";

export function Mail(_: { windowId: string }) {
  const t = useTranslations("apps.mail");
  const [state, setState] = useState<State>("idle");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio contact from ${name}`);
    const body = encodeURIComponent(`${message}\n\nFrom: ${name} (${email})`);
    window.location.href = `mailto:mateo.cordier@gmail.com?subject=${subject}&body=${body}`;
    setState("sent");
  }

  return (
    <div className="flex h-full flex-col bg-white dark:bg-zinc-900">
      {/* Toolbar stripe */}
      <div className="flex shrink-0 items-center gap-2 border-b border-black/10 bg-zinc-50/80 px-4 py-2 dark:border-white/10 dark:bg-zinc-800/60">
        <span className="text-[12px] font-medium text-zinc-700 dark:text-zinc-200">
          {t("title")} — mateo.cordier@gmail.com
        </span>
      </div>

      <div className="flex flex-1 flex-col overflow-auto p-5">
        {state === "sent" ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 text-center">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/40">
              <Send size={18} className="text-green-600 dark:text-green-400" />
            </div>
            <p className="text-[13px] text-zinc-700 dark:text-zinc-200">{t("sent")}</p>
            <button
              type="button"
              onClick={() => setState("idle")}
              className="text-[11.5px] text-zinc-400 underline hover:text-zinc-600 dark:hover:text-zinc-200"
            >
              ← {t("back")}
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Field label={t("name")} id="mail-name">
              <input
                id="mail-name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Prénom Nom"
                className={inputCls}
              />
            </Field>

            <Field label={t("email")} id="mail-email">
              <input
                id="mail-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className={inputCls}
              />
            </Field>

            <Field label={t("message")} id="mail-msg">
              <textarea
                id="mail-msg"
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={5}
                placeholder="…"
                className={`${inputCls} resize-none`}
              />
            </Field>

            <button
              type="submit"
              className="mt-1 flex items-center justify-center gap-2 self-end rounded-lg bg-zinc-900 px-5 py-2 text-[12.5px] font-medium text-white transition-colors hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
            >
              <Send size={12} aria-hidden="true" />
              {t("send")}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

function Field({
  label,
  id,
  children,
}: {
  label: string;
  id: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-[11px] font-medium text-zinc-500 dark:text-zinc-400">
        {label}
      </label>
      {children}
    </div>
  );
}

const inputCls =
  "rounded-lg border border-black/10 bg-zinc-50 px-3 py-2 text-[12.5px] text-zinc-800 placeholder-zinc-400 outline-none focus:border-zinc-400 focus:ring-1 focus:ring-zinc-300 dark:border-white/10 dark:bg-zinc-800 dark:text-zinc-100 dark:placeholder-zinc-600 dark:focus:border-zinc-500 dark:focus:ring-zinc-600";
