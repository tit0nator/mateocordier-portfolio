"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Send, Paperclip } from "lucide-react";

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
      {/* Toolbar */}
      <div className="flex shrink-0 items-center gap-2 border-b border-black/8 bg-zinc-50/80 px-4 py-2 dark:border-white/8 dark:bg-zinc-800/60">
        <div className="flex h-6 w-6 items-center justify-center rounded-md bg-blue-500/10 dark:bg-blue-400/10">
          <Send size={11} className="text-blue-600 dark:text-blue-400" />
        </div>
        <span className="text-[12px] font-medium text-zinc-700 dark:text-zinc-200">
          {t("title")}
        </span>
        <span className="ml-auto text-[10.5px] text-zinc-400 dark:text-zinc-500">
          mateo.cordier@gmail.com
        </span>
      </div>

      <div className="flex flex-1 flex-col overflow-auto">
        {state === "sent" ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-50 dark:bg-green-900/30">
              <Send size={20} className="text-green-600 dark:text-green-400" />
            </div>
            <p className="text-[14px] font-medium text-zinc-800 dark:text-zinc-100">{t("sent")}</p>
            <button
              type="button"
              onClick={() => setState("idle")}
              className="mt-1 text-[11.5px] text-zinc-400 underline underline-offset-2 hover:text-zinc-600 dark:hover:text-zinc-200"
            >
              ← {t("back")}
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-1 flex-col">
            {/* To/From fields — mail header style */}
            <div className="border-b border-black/6 dark:border-white/6">
              <div className="flex items-center border-b border-black/4 px-4 py-2 dark:border-white/4">
                <span className="w-12 text-[11.5px] text-zinc-400 dark:text-zinc-500">{t("name")}</span>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Prénom Nom"
                  className="flex-1 bg-transparent text-[12.5px] text-zinc-800 outline-none placeholder:text-zinc-300 dark:text-zinc-100 dark:placeholder:text-zinc-600"
                />
              </div>
              <div className="flex items-center px-4 py-2">
                <span className="w-12 text-[11.5px] text-zinc-400 dark:text-zinc-500">{t("email")}</span>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="flex-1 bg-transparent text-[12.5px] text-zinc-800 outline-none placeholder:text-zinc-300 dark:text-zinc-100 dark:placeholder:text-zinc-600"
                />
              </div>
            </div>

            {/* Message body */}
            <div className="flex-1 px-4 py-3">
              <textarea
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={t("message") + "…"}
                className="h-full w-full resize-none bg-transparent text-[12.5px] leading-relaxed text-zinc-800 outline-none placeholder:text-zinc-300 dark:text-zinc-100 dark:placeholder:text-zinc-600"
              />
            </div>

            {/* Bottom bar */}
            <div className="flex shrink-0 items-center justify-between border-t border-black/6 px-4 py-2 dark:border-white/6">
              <div className="flex items-center gap-1 text-zinc-400 dark:text-zinc-500">
                <Paperclip size={13} />
              </div>
              <button
                type="submit"
                className="flex items-center gap-1.5 rounded-lg bg-[#007AFF] px-4 py-1.5 text-[12px] font-medium text-white transition-colors hover:bg-[#006AE0] active:bg-[#005BC0]"
              >
                <Send size={11} aria-hidden="true" />
                {t("send")}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
