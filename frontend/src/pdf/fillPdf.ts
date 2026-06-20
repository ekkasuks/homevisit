import { renderToString } from 'react-dom/server';
import { createElement } from 'react';
import PrintableForm from './PrintableForm';
import { PRINT_CSS } from './printStyles';
import { Photos } from '../api/photos';

interface Bundle {
  student: any; guardian: any;
  household_members: any[]; household_status: any;
  home_visits: any[]; photos: any[];
}

/**
 * Resolve Drive photo URLs to data: URLs via Apps Script proxy
 * (to bypass CORS for private Drive files).
 */
async function resolvePhotos(bundle: Bundle, visit: any): Promise<Record<string, string>> {
  const out: Record<string, string> = {};
  const portrait = bundle.photos.find(p => p.photo_type === 'student_portrait');
  const outside  = bundle.photos.find(p => p.photo_type === 'house_outside' && (!visit?.visit_id || p.visit_id === visit.visit_id));
  const inside   = bundle.photos.find(p => p.photo_type === 'house_inside'  && (!visit?.visit_id || p.visit_id === visit.visit_id));

  for (const [key, photo] of [['portrait', portrait], ['outside', outside], ['inside', inside]] as const) {
    if (!photo?.drive_file_id) continue;
    try {
      const data = await Photos.fetch(photo.drive_file_id);
      out[key] = `data:${data.mime_type};base64,${data.base64}`;
    } catch (e) {
      console.warn(`failed to fetch ${key}:`, e);
    }
  }
  return out;
}

async function renderHtml(bundle: Bundle, visit: any): Promise<string> {
  const photoUrls = await resolvePhotos(bundle, visit);
  const body = renderToString(createElement(PrintableForm, { bundle, visit, photoUrls }));
  const studentName = `${bundle.student?.first_name || ''} ${bundle.student?.last_name || ''}`.trim();

  return `<!DOCTYPE html>
<html lang="th">
<head>
<meta charset="utf-8">
<title>กสศ.01 ${studentName}</title>
<style>${PRINT_CSS}</style>
</head>
<body>${body}</body>
</html>`;
}

function openPrintWindow(html: string): Window | null {
  const w = window.open('', '_blank', 'width=900,height=1100');
  if (!w) {
    alert('Pop-up ถูกบล็อก กรุณาอนุญาต pop-up สำหรับเว็บนี้');
    return null;
  }
  w.document.open();
  w.document.write(html);
  w.document.close();
  return w;
}

export async function previewPdf(bundle: Bundle, visit: any) {
  const html = await renderHtml(bundle, visit);
  openPrintWindow(html);
}

export async function printPdf(bundle: Bundle, visit: any) {
  const html = await renderHtml(bundle, visit);
  const w = openPrintWindow(html);
  if (!w) return;
  setTimeout(() => { w.focus(); w.print(); }, 800);
}

export async function exportPdf(bundle: Bundle, visit: any) {
  const html = await renderHtml(bundle, visit);
  const w = openPrintWindow(html);
  if (!w) return;
  setTimeout(() => {
    w.focus(); w.print();
    // user uses "Save as PDF" in print dialog
  }, 800);
}
