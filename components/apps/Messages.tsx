"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useTranslations, useLocale } from "next-intl";
import { useWindowStore } from "@/lib/store";

interface Message {
  id: string;
  sender: "visitor" | "mateo";
  text: string;
}

type Phase = "autoplay" | "interactive";

interface AutoPlayMsg {
  sender: "visitor" | "mateo";
  text: string;
}

interface QAItem {
  question: string;
  answer: string;
}

const TYPING_DELAYS: Record<"visitor" | "mateo", number[]> = {
  visitor: [800, 700, 500],
  mateo:   [600, 1000, 900],
};

function TypingIndicator() {
  return (
    <div className="flex items-end gap-1 px-3 py-2">
      <div className="flex items-center gap-1 rounded-[18px] rounded-bl-[4px] bg-zinc-200 px-3 py-2.5 dark:bg-zinc-700">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="h-1.5 w-1.5 rounded-full bg-zinc-500 dark:bg-zinc-400"
            style={{ animation: `msgBounce 1.2s ease-in-out ${i * 0.15}s infinite` }}
          />
        ))}
      </div>
    </div>
  );
}

function Bubble({ msg }: { msg: Message }) {
  const isMateo = msg.sender === "mateo";
  return (
    <div className={`flex px-3 py-0.5 ${isMateo ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[72%] rounded-[18px] px-3 py-2 text-[13px] leading-[1.4] ${
          isMateo
            ? "rounded-br-[4px] bg-[#007AFF] text-white"
            : "rounded-bl-[4px] bg-zinc-200 text-zinc-900 dark:bg-zinc-700 dark:text-zinc-100"
        }`}
      >
        {msg.text}
      </div>
    </div>
  );
}

export function Messages(_: { windowId: string }) {
  const t = useTranslations("apps.messages");
  const locale = useLocale();
  const closeWindow = useWindowStore((s) => s.closeWindow);
  const windows = useWindowStore((s) => s.windows);

  const [messages, setMessages] = useState<Message[]>([]);
  const [phase, setPhase] = useState<Phase>("autoplay");
  const [showTyping, setShowTyping] = useState(false);
  const [answeredRound1, setAnsweredRound1] = useState<Set<number>>(new Set());
  const [round2Unlocked, setRound2Unlocked] = useState(false);

  const bottomRef = useRef<HTMLDivElement>(null);
  const cancelRef = useRef(false);

  const scrollToBottom = useCallback(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const wait = (ms: number) =>
    new Promise<void>((resolve) => {
      const id = setTimeout(resolve, ms);
      // store timeout so we can cancel if locale changes
      return () => clearTimeout(id);
    });

  // Auto-play the intro conversation on mount / locale change
  useEffect(() => {
    cancelRef.current = false;
    setMessages([]);
    setPhase("autoplay");
    setShowTyping(false);
    setAnsweredRound1(new Set());
    setRound2Unlocked(false);

    const autoPlayMsgs = t.raw("autoPlay") as AutoPlayMsg[];

    async function runAutoPlay() {
      // Alternate visitor/mateo typing delays by index
      const delays = [800, 600, 700, 1000, 500, 900];

      for (let i = 0; i < autoPlayMsgs.length; i++) {
        if (cancelRef.current) return;
        setShowTyping(true);
        scrollToBottom();

        await wait(delays[i] ?? 800);
        if (cancelRef.current) return;

        const msg = autoPlayMsgs[i];
        setShowTyping(false);
        setMessages((prev) => [
          ...prev,
          { id: `auto-${i}`, sender: msg.sender, text: msg.text },
        ]);
        scrollToBottom();

        await wait(300);
      }

      if (!cancelRef.current) {
        setPhase("interactive");
      }
    }

    runAutoPlay();

    return () => {
      cancelRef.current = true;
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locale]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, showTyping, scrollToBottom]);

  async function handleQuestion(item: QAItem, roundIndex: number, isRound2: boolean) {
    if (phase !== "interactive") return;

    // CV download special case
    if (item.answer === "__DOWNLOAD_CV__") {
      const filename = `Resume-Mateo-Cordier-${locale.toUpperCase()}.pdf`;
      const link = document.createElement("a");
      link.href = `/${filename}`;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setMessages((prev) => [
        ...prev,
        { id: `q-${Date.now()}`, sender: "visitor", text: item.question },
        { id: `a-${Date.now()}`, sender: "mateo", text: locale === "fr" ? "Voilà — le téléchargement devrait démarrer !" : "Here you go — the download should start!" },
      ]);
      return;
    }

    // Mark round1 answered, unlock round2
    if (!isRound2) {
      setAnsweredRound1((prev) => new Set([...prev, roundIndex]));
      setRound2Unlocked(true);
    }

    setPhase("autoplay");

    // Add visitor question
    setMessages((prev) => [...prev, { id: `q-${Date.now()}`, sender: "visitor", text: item.question }]);
    scrollToBottom();

    await wait(200);
    setShowTyping(true);
    scrollToBottom();

    await wait(900);
    setShowTyping(false);
    setMessages((prev) => [...prev, { id: `a-${Date.now()}`, sender: "mateo", text: item.answer }]);
    scrollToBottom();

    await wait(300);
    setPhase("interactive");
  }

  const round1 = t.raw("questions.round1") as QAItem[];
  const round2 = t.raw("questions.round2") as QAItem[];

  // Visible chips: unanswered round1 + (if unlocked) round2
  const visibleChips: { item: QAItem; index: number; isRound2: boolean }[] = [
    ...round1
      .map((item, i) => ({ item, index: i, isRound2: false }))
      .filter(({ index }) => !answeredRound1.has(index)),
    ...(round2Unlocked
      ? round2.map((item, i) => ({ item, index: i, isRound2: true }))
      : []),
  ];

  return (
    <div className="flex h-full flex-col bg-white dark:bg-zinc-900">
      {/* iMessage-style header */}
      <div className="flex shrink-0 flex-col items-center gap-0.5 border-b border-black/10 bg-zinc-100/80 px-4 py-2 dark:border-white/10 dark:bg-zinc-800/80">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#007AFF] text-[12px] font-semibold text-white">
          MC
        </div>
        <p className="text-[12px] font-semibold text-zinc-900 dark:text-zinc-100">
          {t("header.name")}
        </p>
        <p className="text-[10px] text-zinc-500 dark:text-zinc-400">
          {t("header.status")}
        </p>
      </div>

      {/* Chat area */}
      <div className="flex-1 overflow-y-auto py-2">
        {messages.map((msg) => (
          <Bubble key={msg.id} msg={msg} />
        ))}
        {showTyping && <TypingIndicator />}
        <div ref={bottomRef} />
      </div>

      {/* Question chips */}
      {phase === "interactive" && visibleChips.length > 0 && (
        <div className="shrink-0 border-t border-black/10 px-3 py-2 dark:border-white/10">
          <div className="flex flex-wrap gap-1.5">
            {visibleChips.map(({ item, index, isRound2 }) => (
              <button
                key={`${isRound2 ? "r2" : "r1"}-${index}`}
                type="button"
                onClick={() => handleQuestion(item, index, isRound2)}
                className="rounded-full border border-[#007AFF] px-3 py-1 text-[11.5px] text-[#007AFF] transition-colors hover:bg-[#007AFF] hover:text-white active:bg-[#007AFF] active:text-white"
              >
                {item.question}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Fake input bar */}
      <div className="shrink-0 flex items-center gap-2 border-t border-black/10 bg-zinc-50/80 px-3 py-2 dark:border-white/10 dark:bg-zinc-900/80">
        <div className="flex-1 rounded-full border border-zinc-300 bg-white px-3 py-1.5 text-[12px] text-zinc-400 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-600">
          {t("inputPlaceholder")}
        </div>
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#007AFF]">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="white" aria-hidden="true">
            <path d="M2 12L22 4L14 22L12 14L2 12Z" />
          </svg>
        </div>
      </div>

      <style>{`
        @keyframes msgBounce {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-4px); }
        }
      `}</style>
    </div>
  );
}
