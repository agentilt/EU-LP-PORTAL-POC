import { NextResponse } from "next/server";
import type { Fund } from "@/lib/types";
import { PDFDocument, StandardFonts } from "pdf-lib";

type ExportBody = { format: "csv" | "pdf"; funds: Fund[] };

function toCsv(funds: Fund[]): string {
  const header = ["Fund","Manager","Domicile","Vintage","Commitment","NAV","TVPI"]; 
  const rows = funds.map((f) => [
    f.name,
    f.manager,
    f.domicile,
    String(f.vintage),
    String(f.commitment),
    String(f.nav),
    String(f.tvpi)
  ]);
  return [header, ...rows].map((r) => r.map((v) => `"${String(v).replaceAll('"','""')}"`).join(",")).join("\n");
}

async function toPdf(funds: Fund[]): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([595.28, 841.89]); // A4 portrait
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  let x = 40; let y = 800; const leading = 16;
  page.drawText("Funds Export", { x, y, size: 14, font: fontBold });
  y -= 24;

  const headers = ["Fund","Manager","Domicile","Vintage","Commitment","NAV","TVPI"]; 
  page.drawText(headers.join("  |  "), { x, y, size: 10, font: fontBold });
  y -= 14;

  for (const f of funds) {
    const line = [f.name, f.manager, f.domicile, String(f.vintage), String(f.commitment), String(f.nav), String(f.tvpi.toFixed(2))].join("  |  ");
    if (y < 60) { y = 800; pdfDoc.addPage([595.28, 841.89]); }
    page.drawText(line, { x, y, size: 10, font });
    y -= leading;
  }

  return await pdfDoc.save();
}

export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as ExportBody | null;
  if (!body || !body.format || !Array.isArray(body.funds)) {
    return NextResponse.json({ message: "Invalid body" }, { status: 400 });
  }
  const { format, funds } = body;

  if (format === "csv") {
    const csv = toCsv(funds);
    return new NextResponse(csv, {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": "attachment; filename=funds.csv",
      },
    });
  }

  const pdfBytes = await toPdf(funds);
  return new NextResponse(Buffer.from(pdfBytes), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": "attachment; filename=funds.pdf",
    },
  });
}


