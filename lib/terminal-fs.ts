/**
 * Virtual filesystem for the Terminal app.
 * Files pull content from i18n at render time — this module only defines the tree structure.
 */

export type FSNodeType = "dir" | "file";

export interface FSFile {
  type: "file";
  contentKey: string; // i18n key under apps.terminal.files
}

export interface FSDir {
  type: "dir";
  children: Record<string, FSNode>;
}

export type FSNode = FSFile | FSDir;

/** The filesystem tree rooted at ~/mateo/ */
export const FS_ROOT: FSDir = {
  type: "dir",
  children: {
    "about.txt":   { type: "file", contentKey: "about" },
    "skills.txt":  { type: "file", contentKey: "skills" },
    "contact.txt": { type: "file", contentKey: "contact" },
    projects: {
      type: "dir",
      children: {
        "surge.txt":        { type: "file", contentKey: "projects_surge" },
        "reserve.txt":      { type: "file", contentKey: "projects_reserve" },
        "body-spirit.txt":  { type: "file", contentKey: "projects_body_spirit" },
        "pedalos.txt":      { type: "file", contentKey: "projects_pedalos" },
      },
    },
    lab: {
      type: "dir",
      children: {
        "ap-swatch.txt": { type: "file", contentKey: "lab_ap_swatch" },
        "prime.txt":      { type: "file", contentKey: "lab_prime" },
        "fanta.txt":      { type: "file", contentKey: "lab_fanta" },
        "kiprun.txt":     { type: "file", contentKey: "lab_kiprun" },
      },
    },
    ".secret": { type: "file", contentKey: "secret" },
  },
};

/** Resolve a path relative to a current working directory. Returns the node or null. */
export function resolvePath(cwd: string[], pathStr: string): { segments: string[]; node: FSNode | null } {
  const parts = pathStr.startsWith("~") || pathStr.startsWith("/")
    ? pathStr.replace(/^~\/?/, "").replace(/^\//, "").split("/").filter(Boolean)
    : [...cwd, ...pathStr.split("/").filter(Boolean)];

  // Normalize . and ..
  const normalized: string[] = [];
  for (const p of parts) {
    if (p === ".") continue;
    if (p === "..") { normalized.pop(); continue; }
    normalized.push(p);
  }

  let current: FSNode = FS_ROOT;
  for (const segment of normalized) {
    if (current.type !== "dir") return { segments: normalized, node: null };
    const child: FSNode | undefined = current.children[segment];
    if (!child) return { segments: normalized, node: null };
    current = child;
  }

  return { segments: normalized, node: current };
}

/** List entries in a directory, colorized for display. */
export function listDir(node: FSDir): { name: string; isDir: boolean }[] {
  return Object.entries(node.children)
    .filter(([name]) => !name.startsWith(".")) // hide dotfiles from plain ls
    .map(([name, child]) => ({ name, isDir: child.type === "dir" }))
    .sort((a, b) => {
      // dirs first, then alphabetical
      if (a.isDir !== b.isDir) return a.isDir ? -1 : 1;
      return a.name.localeCompare(b.name);
    });
}

/** List ALL entries including hidden ones (ls -a). */
export function listDirAll(node: FSDir): { name: string; isDir: boolean }[] {
  return Object.entries(node.children)
    .map(([name, child]) => ({ name, isDir: child.type === "dir" }))
    .sort((a, b) => {
      if (a.isDir !== b.isDir) return a.isDir ? -1 : 1;
      return a.name.localeCompare(b.name);
    });
}
