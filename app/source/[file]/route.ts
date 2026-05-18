import { readFileSync } from "fs";
import { join } from "path";
import { NextResponse } from "next/server";

const ALLOWED = new Set(["Window.tsx", "Finder.tsx", "projects.ts", "Desktop.tsx"]);

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ file: string }> }
) {
  const { file } = await params;

  if (!ALLOWED.has(file)) {
    return new NextResponse("Not found", { status: 404 });
  }

  const filePath = join(process.cwd(), "content", "source", file);
  const content = readFileSync(filePath, "utf-8");
  return new NextResponse(content, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
