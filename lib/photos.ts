export interface Photo {
  id: string;
  src: string;
  album: string;
  caption?: string;
}

export interface Album {
  id: string;
  labelKey: string;
}

export const ALBUMS: Album[] = [
  { id: "all",    labelKey: "all"    },
  { id: "travel", labelKey: "travel" },
  { id: "street", labelKey: "street" },
  { id: "lyon",   labelKey: "lyon"   },
  { id: "food",   labelKey: "food"   },
];

// Placeholder photos using solid-color data URIs until Mateo uploads real ones.
// Replace src values with /photos/<album>/<filename>.jpg when ready.
const PLACEHOLDER_COLORS = [
  "#3b82f6", "#8b5cf6", "#ec4899", "#f59e0b",
  "#10b981", "#6366f1", "#ef4444", "#14b8a6",
  "#f97316", "#84cc16", "#06b6d4", "#a855f7",
];

function placeholder(color: string) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400"><rect width="400" height="400" fill="${color}"/></svg>`;
  return `data:image/svg+xml;base64,${btoa(svg)}`;
}

export const PHOTOS: Photo[] = [
  { id: "t1",  src: placeholder(PLACEHOLDER_COLORS[0]),  album: "travel", caption: "Tokyo, 2024" },
  { id: "t2",  src: placeholder(PLACEHOLDER_COLORS[1]),  album: "travel", caption: "Lisbon, 2023" },
  { id: "t3",  src: placeholder(PLACEHOLDER_COLORS[2]),  album: "travel", caption: "Montreal, 2022" },
  { id: "s1",  src: placeholder(PLACEHOLDER_COLORS[3]),  album: "street", caption: "Croix-Rousse" },
  { id: "s2",  src: placeholder(PLACEHOLDER_COLORS[4]),  album: "street", caption: "Bellecour" },
  { id: "s3",  src: placeholder(PLACEHOLDER_COLORS[5]),  album: "street", caption: "Confluence" },
  { id: "l1",  src: placeholder(PLACEHOLDER_COLORS[6]),  album: "lyon",   caption: "Presqu'île" },
  { id: "l2",  src: placeholder(PLACEHOLDER_COLORS[7]),  album: "lyon",   caption: "Fourvière" },
  { id: "l3",  src: placeholder(PLACEHOLDER_COLORS[8]),  album: "lyon",   caption: "Tête d'Or" },
  { id: "f1",  src: placeholder(PLACEHOLDER_COLORS[9]),  album: "food",   caption: "Bouchon lyonnais" },
  { id: "f2",  src: placeholder(PLACEHOLDER_COLORS[10]), album: "food",   caption: "Ramen" },
  { id: "f3",  src: placeholder(PLACEHOLDER_COLORS[11]), album: "food",   caption: "Brunch" },
];
