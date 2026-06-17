import { PDFDocument, PDFFont } from 'pdf-lib';
import fontkit from '@pdf-lib/fontkit';

let cachedFontBytes: ArrayBuffer | null = null;

const FONT_URL =
  'https://cdn.jsdelivr.net/gh/google/fonts/ofl/sarabun/Sarabun-Regular.ttf';

export async function embedThaiFont(doc: PDFDocument): Promise<PDFFont> {
  if (!cachedFontBytes) {
    const res = await fetch(FONT_URL);
    cachedFontBytes = await res.arrayBuffer();
  }
  doc.registerFontkit(fontkit);
  return doc.embedFont(cachedFontBytes, { subset: true });
}
