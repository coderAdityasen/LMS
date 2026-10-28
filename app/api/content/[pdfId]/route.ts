import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth/current-user";
import { readPdfResponse } from "@/lib/data/repository";

export async function GET(_request: Request, context: { params: Promise<{ pdfId: string }> }) {
  const { pdfId } = await context.params;
  const user = await getCurrentUser();
  if (!user) return new NextResponse("Sign in required.", { status: 401 });
  const result = await readPdfResponse(pdfId, user);
  if (!result) return new NextResponse("Reading not found.", { status: 404 });
  if ("forbidden" in result) return new NextResponse("Purchase this course to open the reading.", { status: 403 });
  const filename = result.filename.replace(/[^a-z0-9.\- ]+/gi, "").trim() || "lesson.pdf";
  return new NextResponse(new Uint8Array(result.bytes), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `inline; filename="${filename}"`,
      "Cache-Control": "private, no-store",
    },
  });
}
