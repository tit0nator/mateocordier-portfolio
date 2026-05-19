"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { useWindowStore, type AppId } from "@/lib/store";
import { useThemeStore } from "@/lib/themeStore";
import {
  FS_ROOT,
  resolvePath,
  listDir,
  listDirAll,
  type FSDir,
} from "@/lib/terminal-fs";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type LineType = "input" | "output" | "error" | "system";
interface Line {
  id: number;
  type: LineType;
  text: string;
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

const GREEN = "#00ff41";
const RED   = "#ff5555";
const BLUE  = "#5c9aff";
const DIM   = "#6b737e";

function colorSpan(text: string, color: string) {
  return `<span style="color:${color}">${text}</span>`;
}

function promptStr(cwd: string[]) {
  const path = cwd.length === 0 ? "~" : `~/${cwd.join("/")}`;
  return `${colorSpan("mateo@portfolio", GREEN)} ${colorSpan(path, BLUE)} $ `;
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function Terminal({ windowId }: { windowId: string }) {
  const t = useTranslations("apps.terminal");
  const locale = useLocale();
  const openApp = useWindowStore((s) => s.openApp);
  const closeWindow = useWindowStore((s) => s.closeWindow);
  const toggleTheme = useThemeStore((s) => s.toggle);
  const isDark = useThemeStore((s) => s.isDark);

  const [lines, setLines] = useState<Line[]>([]);
  const [input, setInput] = useState("");
  const [cwd, setCwd] = useState<string[]>([]); // relative to FS_ROOT (~/mateo)
  const [history, setHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState(-1);

  const lineIdRef = useRef(0);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const startTime = useRef(Date.now());

  const nextId = useCallback(() => ++lineIdRef.current, []);

  const addLine = useCallback(
    (type: LineType, text: string) => {
      setLines((prev) => [...prev, { id: nextId(), type, text }]);
    },
    [nextId],
  );

  const addLines = useCallback(
    (items: { type: LineType; text: string }[]) => {
      setLines((prev) => [
        ...prev,
        ...items.map((item) => ({ ...item, id: nextId() })),
      ]);
    },
    [nextId],
  );

  // Scroll to bottom on new output
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines]);

  // Focus input on mount + click
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Welcome message
  useEffect(() => {
    const welcome = t("welcome").split("\n");
    setLines(
      welcome.map((text) => ({ id: ++lineIdRef.current, type: "system" as LineType, text })),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ---------------------------------------------------------------- */
  /*  Command execution                                                */
  /* ---------------------------------------------------------------- */

  const exec = useCallback(
    (raw: string) => {
      const trimmed = raw.trim();
      if (!trimmed) return;

      // Echo the input line with prompt
      addLine("input", `${promptStr(cwd)}${trimmed}`);

      const [cmd, ...args] = trimmed.split(/\s+/);
      const arg = args.join(" ");

      switch (cmd.toLowerCase()) {
        /* -- Navigation -- */
        case "ls": {
          const target = arg || ".";
          const showAll = arg === "-a" || args.includes("-a");
          const pathArg = args.find((a) => !a.startsWith("-")) || ".";
          const { node } = resolvePath(cwd, pathArg);
          if (!node || node.type !== "dir") {
            addLine("error", t("errors.notDir", { path: pathArg }));
            break;
          }
          const entries = showAll ? listDirAll(node as FSDir) : listDir(node as FSDir);
          const formatted = entries
            .map((e) => (e.isDir ? colorSpan(e.name + "/", BLUE) : e.name))
            .join("  ");
          addLine("output", formatted);
          break;
        }

        case "cd": {
          if (!arg || arg === "~") {
            setCwd([]);
            break;
          }
          const { segments, node } = resolvePath(cwd, arg);
          if (!node || node.type !== "dir") {
            addLine("error", t("errors.notDir", { path: arg }));
            break;
          }
          setCwd(segments);
          break;
        }

        case "pwd":
          addLine("output", `~/mateo${cwd.length ? "/" + cwd.join("/") : ""}`);
          break;

        case "cat": {
          if (!arg) { addLine("error", t("errors.usage", { cmd: "cat <file>" })); break; }
          const { node } = resolvePath(cwd, arg);
          if (!node) { addLine("error", t("errors.notFound", { path: arg })); break; }
          if (node.type === "dir") { addLine("error", t("errors.isDir", { path: arg })); break; }
          const content = t(`files.${node.contentKey}`);
          content.split("\n").forEach((line) => addLine("output", line));
          break;
        }

        /* -- Portfolio control -- */
        case "open": {
          if (!arg) { addLine("error", t("errors.usage", { cmd: "open <app>" })); break; }
          const appName = arg.toLowerCase() as AppId;
          const validApps: AppId[] = [
            "finder","safari","mflix","preview","cursor","mail",
            "notes","messages","stocks","strava","deezer","photos","chess","links",
          ];
          if (validApps.includes(appName)) {
            openApp(appName);
            addLine("output", t("opened", { app: arg }));
          } else {
            addLine("error", t("errors.unknownApp", { app: arg }));
          }
          break;
        }

        case "theme": {
          const mode = arg.toLowerCase();
          if (mode === "toggle" || !mode) {
            toggleTheme();
            addLine("output", t("themeToggled"));
          } else if (mode === "dark" && !isDark) {
            toggleTheme();
            addLine("output", t("themeSet", { mode: "dark" }));
          } else if (mode === "light" && isDark) {
            toggleTheme();
            addLine("output", t("themeSet", { mode: "light" }));
          } else {
            addLine("output", t("themeAlready", { mode }));
          }
          break;
        }

        case "lang": {
          const target = arg.toLowerCase();
          if (target === "fr" || target === "en") {
            document.cookie = `NEXT_LOCALE=${target};path=/;max-age=31536000`;
            window.location.href = `/${target}`;
          } else {
            addLine("error", t("errors.usage", { cmd: "lang [fr|en]" }));
          }
          break;
        }

        /* -- Info / Fun -- */
        case "neofetch": {
          const uptime = Math.floor((Date.now() - startTime.current) / 60000);
          const uptimeStr = uptime < 1 ? "<1 min" : `${uptime} min`;
          const info = [
            `${colorSpan("mateo@portfolio", GREEN)}`,
            `${colorSpan("─".repeat(20), DIM)}`,
            `${colorSpan("OS:", DIM)}      macOS Workspace`,
            `${colorSpan("Shell:", DIM)}   zsh 5.9`,
            `${colorSpan("DE:", DIM)}      Portfolio v1.0`,
            `${colorSpan("Theme:", DIM)}   ${isDark ? "Dark" : "Light"}`,
            `${colorSpan("Locale:", DIM)}  ${locale.toUpperCase()}`,
            `${colorSpan("Uptime:", DIM)}  ${uptimeStr}`,
            `${colorSpan("Projects:", DIM)} 4`,
            `${colorSpan("Videos:", DIM)}  4`,
            `${colorSpan("─".repeat(20), DIM)}`,
            [GREEN, "#5c9aff", "#ff5555", "#f59e0b", "#a855f7", "#14b8a6", "#ec4899", "#6366f1"]
              .map((c) => `<span style="color:${c}">●</span>`)
              .join(" "),
          ];
          info.forEach((line) => addLine("output", line));
          break;
        }

        case "whoami":
          addLine("output", "mateo");
          break;

        case "help": {
          const cmds = [
            ["ls [path]",       t("help.ls")],
            ["cd <path>",       t("help.cd")],
            ["cat <file>",      t("help.cat")],
            ["pwd",             t("help.pwd")],
            ["open <app>",      t("help.open")],
            ["theme [dark|light|toggle]", t("help.theme")],
            ["lang [fr|en]",    t("help.lang")],
            ["neofetch",        t("help.neofetch")],
            ["whoami",          t("help.whoami")],
            ["echo <text>",     t("help.echo")],
            ["clear",           t("help.clear")],
            ["exit",            t("help.exit")],
          ];
          cmds.forEach(([cmd, desc]) => {
            addLine("output", `  ${colorSpan(cmd.padEnd(30), GREEN)}${desc}`);
          });
          break;
        }

        case "clear":
          setLines([]);
          break;

        case "echo":
          addLine("output", arg);
          break;

        case "exit":
          closeWindow(windowId);
          break;

        case "sudo":
          addLine("output", t("sudo"));
          break;

        case "rm":
          if (arg.includes("-rf")) {
            addLine("system", t("rmrf"));
          } else {
            addLine("error", t("errors.notFound", { path: arg }));
          }
          break;

        default:
          addLine("error", t("errors.unknown", { cmd }));
      }
    },
    [cwd, addLine, addLines, t, openApp, closeWindow, toggleTheme, isDark, locale, windowId],
  );

  /* ---------------------------------------------------------------- */
  /*  Key handling                                                     */
  /* ---------------------------------------------------------------- */

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter") {
      e.preventDefault();
      const cmd = input;
      setInput("");
      if (cmd.trim()) {
        setHistory((prev) => [...prev, cmd]);
        setHistoryIdx(-1);
      }
      exec(cmd);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length === 0) return;
      const nextIdx = historyIdx === -1 ? history.length - 1 : Math.max(0, historyIdx - 1);
      setHistoryIdx(nextIdx);
      setInput(history[nextIdx]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIdx === -1) return;
      const nextIdx = historyIdx + 1;
      if (nextIdx >= history.length) {
        setHistoryIdx(-1);
        setInput("");
      } else {
        setHistoryIdx(nextIdx);
        setInput(history[nextIdx]);
      }
    } else if (e.key === "l" && e.ctrlKey) {
      e.preventDefault();
      setLines([]);
    }
  }

  /* ---------------------------------------------------------------- */
  /*  Render                                                           */
  /* ---------------------------------------------------------------- */

  return (
    <div
      className="flex h-full flex-col overflow-hidden font-mono"
      style={{ background: "#1e1e1e", color: "#d4d4d4", fontSize: "12.5px", lineHeight: 1.6 }}
      onClick={() => inputRef.current?.focus()}
    >
      {/* Output area */}
      <div className="flex-1 overflow-y-auto px-3 py-2 select-text">
        {lines.map((line) => (
          <div
            key={line.id}
            style={{
              color:
                line.type === "error"
                  ? RED
                  : line.type === "system"
                    ? DIM
                    : undefined,
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
            }}
            dangerouslySetInnerHTML={{ __html: line.text }}
          />
        ))}

        {/* Active prompt + input */}
        <div className="flex items-center" style={{ whiteSpace: "pre" }}>
          <span dangerouslySetInnerHTML={{ __html: promptStr(cwd) }} />
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => { setInput(e.target.value); setHistoryIdx(-1); }}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent text-white outline-none caret-green-400"
            style={{ fontFamily: "inherit", fontSize: "inherit", lineHeight: "inherit" }}
            spellCheck={false}
            autoComplete="off"
            autoCapitalize="off"
          />
        </div>

        <div ref={bottomRef} />
      </div>
    </div>
  );
}
