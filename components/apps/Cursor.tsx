"use client";

import { useEffect, useState } from "react";
import { FileCode2, Folder } from "lucide-react";
import { createHighlighter, type Highlighter } from "shiki";

const SOURCE_FILES: { name: string; lang: "tsx" | "ts" }[] = [
  { name: "Window.tsx", lang: "tsx" },
  { name: "Finder.tsx", lang: "tsx" },
  { name: "projects.ts", lang: "ts" },
  { name: "Desktop.tsx", lang: "tsx" },
];

// Module-level singleton — created once, reused across all renders and file switches.
let _highlighterPromise: Promise<Highlighter> | null = null;
function getHighlighter(): Promise<Highlighter> {
  if (!_highlighterPromise) {
    _highlighterPromise = createHighlighter({
      themes: ["vitesse-dark"],
      langs: ["tsx", "typescript"],
    });
  }
  return _highlighterPromise;
}

// Snapshots live in content/source/ — served as plain text via /source/[file] route.
async function fetchSource(name: string): Promise<string> {
  const res = await fetch(`/source/${name}`);
  if (!res.ok) throw new Error(`Failed to load ${name}`);
  return res.text();
}

export function Cursor(_: { windowId: string }) {
  const [activeFile, setActiveFile] = useState(SOURCE_FILES[0].name);
  const [html, setHtml] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setHtml("");

    const entry = SOURCE_FILES.find((f) => f.name === activeFile);
    if (!entry) return;

    Promise.all([getHighlighter(), fetchSource(entry.name)])
      .then(([hl, code]) =>
        hl.codeToHtml(code, { lang: entry.lang, theme: "vitesse-dark" })
      )
      .then((result) => {
        if (!cancelled) {
          setHtml(result);
          setLoading(false);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setHtml("<pre style='color:#888;padding:1rem'>Could not load file.</pre>");
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [activeFile]);

  return (
    <div className="flex h-full bg-[#1e1e1e] font-mono text-[12px] text-zinc-100">
      {/* Sidebar */}
      <aside aria-label="File explorer" className="w-44 shrink-0 border-r border-white/8 bg-[#252526] py-2">
        <div className="flex items-center gap-1.5 px-3 pb-1.5 text-[10px] font-semibold uppercase tracking-widest text-zinc-500">
          <Folder size={11} aria-hidden="true" />
          <span>portfolio</span>
        </div>
        <ul>
          {SOURCE_FILES.map((f) => (
            <li key={f.name}>
              <button
                type="button"
                onClick={() => setActiveFile(f.name)}
                className={`flex w-full items-center gap-2 px-4 py-1 text-left text-[11.5px] transition-colors ${
                  f.name === activeFile
                    ? "bg-[#37373d] text-white"
                    : "text-zinc-400 hover:bg-[#2a2d2e] hover:text-zinc-200"
                }`}
              >
                <FileCode2 size={11} className="shrink-0 text-blue-400" aria-hidden="true" />
                {f.name}
              </button>
            </li>
          ))}
        </ul>
      </aside>

      {/* Editor pane */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Tab bar */}
        <div className="flex shrink-0 border-b border-white/8 bg-[#1e1e1e]">
          <div className="flex items-center gap-2 border-b-2 border-b-[#007acc] border-r border-white/8 bg-[#1e1e1e] px-4 py-1.5 text-[11.5px] text-zinc-200">
            <FileCode2 size={11} className="text-blue-400" aria-hidden="true" />
            {activeFile}
          </div>
        </div>

        {/* Code */}
        <div className="flex-1 overflow-auto">
          {loading ? (
            <div className="flex h-full items-center justify-center text-xs text-zinc-600">
              Loading…
            </div>
          ) : (
            <div
              className="[&>pre]:!bg-transparent [&>pre]:p-4 [&>pre]:text-[11.5px] [&>pre]:leading-[1.6]"
              // Shiki produces safe, self-contained HTML with no user-controlled input.
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{ __html: html }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
