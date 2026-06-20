import { PDFDocument, PDFFont } from 'pdf-lib';
import fontkit from '@pdf-lib/fontkit';

let cachedFontBytes: ArrayBuffer | null = null;

const FONT_URL = (import.meta.env.BASE_URL || '/') + 'fonts/Sarabun-Regular.ttf';

export async function embedThaiFont(doc: PDFDocument): Promise<PDFFont> {
  if (!cachedFontBytes) {
    const res = await fetch(FONT_URL);
    if (!res.ok) throw new Error('โหลดฟอนต์ Sarabun ไม่สำเร็จ');
    cachedFontBytes = await res.arrayBuffer();
  }
  doc.registerFontkit(fontkit);
  return doc.embedFont(cachedFontBytes, { subset: true });
}
