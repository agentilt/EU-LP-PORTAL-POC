import { NextResponse } from "next/server";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

type Params = { params: Promise<{ name: string }> };

export async function GET(_: Request, { params }: Params) {
  const { name } = await params;
  const doc = await PDFDocument.create();
  const page = doc.addPage([595.28, 841.89]); // A4
  const font = await doc.embedFont(StandardFonts.Helvetica);
  const title = decodeURIComponent(name).replace(/\.[Pp][Dd][Ff]$/, "");
  page.drawText("EuroVC Portal — Mock PDF", { x: 50, y: 780, size: 18, font, color: rgb(0.2, 0.2, 0.2) });
  page.drawText(`Title: ${title}`, { x: 50, y: 750, size: 12, font });
  page.drawText(`Generated: ${new Date().toISOString()}` , { x: 50, y: 730, size: 12, font });
  page.drawText("This is a placeholder PDF used for demo purposes only.", { x: 50, y: 700, size: 12, font });

  const bytes = await doc.save();
  return new NextResponse(Buffer.from(bytes), {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `inline; filename="${name}"`,
      "Cache-Control": "no-store",
    },
  });
}

