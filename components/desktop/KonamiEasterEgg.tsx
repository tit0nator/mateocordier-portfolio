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
  downloadPath: string;
  position: { x: string; y: string };
}

const FOLDERS: Folder[] = [
  {
    id: "sneakers",
    icon: "/sneakers-box easter egg 2.png",
    label: "Sneakers",
    downloadPath: "/easter-egg/sneakers.pdf",
    position: { x: "75%", y: "15%" },
  },
  {
    id: "ashtray",
    icon: "/ashtray easter egg 3.png",
    label: "Lounge",
    downloadPath: "/easter-egg/lounge.pdf",
    position: { x: "80%", y: "32%" },
  },
  {
    id: "ipod",
    icon: "/ipod easter egg1.png",
    label: "Music",
    downloadPath: "/easter-egg/music.pdf",
    position: { x: "70%", y: "49%" },
  },
];

const SESSION_KEY = "konami_revealed";

export function KonamiEasterEgg() {
  const [revealed, setRevealed] = useState(false);
  const [sequence, setSequence] = useState<string[]>([]);

  // Restore from session on mount
  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY) === "1") {
      setRevealed(true);
    }
  }, []);

  // Global keydown listener
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

  function handleFolderClick(folder: Folder) {
    const link = document.createElement("a");
    link.href = folder.downloadPath;
    link.download = `${folder.label}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return (
    <AnimatePresence>
      {revealed &&
        FOLDERS.map((folder, i) => (
          <motion.button
            key={folder.id}
            type="button"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 20,
              delay: i * 0.15,
            }}
            onClick={() => handleFolderClick(folder)}
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
            <span className="text-[11px] font-medium text-white drop-shadow-md px-1 text-center"
              style={{ textShadow: "0 1px 3px rgba(0,0,0,0.8)" }}>
              {folder.label}
            </span>
          </motion.button>
        ))}
    </AnimatePresence>
  );
}
