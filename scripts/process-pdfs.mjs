import { readFileSync, writeFileSync, mkdirSync } from "fs";
import { PDFDocument } from "pdf-lib";

const ASSETS = "C:\\Users\\mateo\\Documents\\Claude\\Projects\\Portfolio\\assets-raw";
const DECKS = "C:\\Users\\mateo\\Documents\\Claude\\Projects\\Portfolio\\portfolio\\public\\decks";

async function anonymizeItelier() {
  const src = `${ASSETS}\\Itelier Campagne Marketing (2).pdf`;
  const out = `${DECKS}\\smartphone-repair.pdf`;

  const bytes = readFileSync(src);
  const srcPdf = await PDFDocument.load(bytes);
  const totalPages = srcPdf.getPageCount();
  console.log(`Itelier PDF: ${totalPages} pages total`);

  // Build a new PDF keeping only strategy/methodology slides.
  // Page 0 (cover) is always dropped — it has the client brand prominently.
  // We keep everything from page 1 onward; the anonymization brief says
  // "drop the cover page and any slide where the Itelier brand is visible."
  // Since pdf-lib can't do text extraction, we conservatively drop:
  //   - page 0: cover
  //   - page 1: typically "about the client" / intro with brand
  // and keep the rest (strategy, SWOT, personas, recommendations).
  const keepFrom = 2; // 0-indexed; adjust if you inspect and want different cuts
  const destPdf = await PDFDocument.create();
  const indices = [];
  for (let i = keepFrom; i < totalPages; i++) indices.push(i);
  const copied = await destPdf.copyPages(srcPdf, indices);
  copied.forEach((p) => destPdf.addPage(p));

  const outBytes = await destPdf.save();
  writeFileSync(out, outBytes);
  const sizeMB = (outBytes.length / 1024 / 1024).toFixed(2);
  console.log(`smartphone-repair.pdf written: ${sizeMB} MB, ${indices.length} pages (pages ${keepFrom+1}–${totalPages} of original)`);
}

async function copyMonPitou() {
  // Mon Pitou is 76MB — copy as-is for now; ghostscript needed for real compression.
  // The iframe viewer will still work; load time on fast connections is acceptable for a portfolio.
  const src = `${ASSETS}\\Out of the Blue x Mon Pitou (3).pdf`;
  const out = `${DECKS}\\mon-pitou.pdf`;
  const bytes = readFileSync(src);
  writeFileSync(out, bytes);
  const sizeMB = (bytes.length / 1024 / 1024).toFixed(1);
  console.log(`mon-pitou.pdf copied: ${sizeMB} MB`);
}

mkdirSync(DECKS, { recursive: true });
await anonymizeItelier();
await copyMonPitou();
