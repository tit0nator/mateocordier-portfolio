"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const KONAMI = [
  "ArrowUp","ArrowUp","ArrowDown","ArrowDown",
  "ArrowLeft","ArrowRight","ArrowLeft","ArrowRight",
  "KeyB","KeyA",
];

interface Folder {
  id: string;
  icon: string;
  label: string;
  position: { x: string; y: string };
}

const FOLDERS: Folder[] = [
  {
    id: "sneakers",
    icon: "/sneakers-box easter egg 2.png",
    label: "Sneakers",
    position: { x: "75%", y: "15%" },
  },
  {
    id: "ashtray",
    icon: "/ashtray easter egg 3.png",
    label: "Lounge",
    position: { x: "80%", y: "32%" },
  },
  {
    id: "ipod",
    icon: "/ipod easter egg1.png",
    label: "Music",
    position: { x: "70%", y: "49%" },
  },
];

const PUNKS = [
  { id: "cowboy", src: "/easter-egg/punk-cowboy.jpg", label: "CryptoPunk #7804" },
  { id: "vr",     src: "/easter-egg/punk-vr.jpg",     label: "CryptoPunk #3100" },
  { id: "purple", src: "/easter-egg/punk-purple.jpg", label: "CryptoPunk #5822" },
];

const SESSION_KEY = "konami_revealed";

function PunkGallery({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.92 }}
      transition={{ type: "spring", stiffness: 380, damping: 26 }}
      className="absolute inset-0 z-50 flex items-center justify-center"
      style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(8px)" }}
      onClick={onClose}
    >
      <div
        className="relative flex flex-col items-center gap-5 rounded-2xl px-8 py-7"
        style={{
          background: "rgba(20,20,20,0.92)",
          border: "1px solid rgba(255,255,255,0.1)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col items-center gap-1">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/40">
            NFT Wallet
          </p>
          <p className="text-[15px] font-semibold text-white">My Collection</p>
        </div>

        <div className="flex gap-4">
          {PUNKS.map((punk, i) => (
            <motion.div
              key={punk.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, type: "spring", stiffness: 400, damping: 28 }}
              className="flex flex-col items-center gap-2"
            >
              <div
                className="relative overflow-hidden rounded-xl"
                style={{
                  width: 96,
                  height: 96,
                  boxShadow: "0 0 0 1px rgba(255,255,255,0.08), 0 8px 24px rgba(0,0,0,0.5)",
                }}
              >
                <Image
                  src={punk.src}
                  alt={punk.label}
                  fill
                  className="object-cover"
                  style={{ imageRendering: "pixelated" }}
                  sizes="96px"
                />
              </div>
              <p className="text-[10px] text-white/50">{punk.label}</p>
            </motion.div>
          ))}
        </div>

        <p className="text-[9px] text-white/25 tracking-wide">gm</p>

        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 flex h-6 w-6 items-center justify-center rounded-full text-[11px] text-white/50 transition-colors hover:bg-white/10 hover:text-white/80"
          aria-label="Close"
        >
          x
        </button>
      </div>
    </motion.div>
  );
}

export function KonamiEasterEgg() {
  const [revealed, setRevealed] = useState(false);
  const [showGallery, setShowGallery] = useState(false);
  const [sequence, setSequence] = useState<string[]>([]);

  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY) === "1") {
      setRevealed(true);
    }
  }, []);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (revealed) return;
      setSequence((prev) => {
        const next = [...prev, e.code].slice(-KONAMI.length);
        if (next.join(",") === KONAMI.join(",")) {
          setRevealed(true);
          sessionStorage.setItem(SESSION_KEY, "1");
        }
        return next;
      });
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [revealed]);

  return (
    <>
      <AnimatePresence>
        {revealed &&
          FOLDERS.map((folder, i) => (
            <motion.button
              key={folder.id}
              type="button"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 20, delay: i * 0.15 }}
              onClick={() => setShowGallery(true)}
              className="absolute flex flex-col items-center gap-1 p-1.5 rounded-lg hover:bg-white/15 active:bg-white/25 transition-colors cursor-pointer group"
              style={{
                left: folder.position.x,
                top: folder.position.y,
                transform: "translate(-50%, -50%)",
                zIndex: 25,
              }}
              aria-label={folder.label}
            >
              <div className="relative h-16 w-16 drop-shadow-xl group-hover:scale-110 transition-transform">
                <Image
                  src={folder.icon}
                  alt={folder.label}
                  fill
                  className="object-contain"
                  sizes="64px"
                />
              </div>
              <span
                className="text-[11px] font-medium text-white drop-shadow-md px-1 text-center"
                style={{ textShadow: "0 1px 3px rgba(0,0,0,0.8)" }}
              >
                {folder.label}
              </span>
            </motion.button>
          ))}
      </AnimatePresence>

      <AnimatePresence>
        {showGallery && <PunkGallery onClose={() => setShowGallery(false)} />}
      </AnimatePresence>
    </>
  );
}
