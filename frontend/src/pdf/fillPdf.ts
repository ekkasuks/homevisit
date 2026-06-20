import { OVERLAYS } from './overlayCoords';
import { Photos } from '../api/photos';

interface Bundle {
  student: any; guardian: any;
  household_members: any[]; household_status: any;
  home_visits: any[]; photos: any[];
}

const TEMPLATE_URL = (import.meta.env.BASE_URL || '/') + 'form-template.html';

async function resolvePhoto(photo: any): Promise<string> {
  if (!photo?.drive_file_id) return '';
  try {
    const data = await Photos.fetch(photo.drive_file_id);
    return `data:${data.mime_type};base64,${data.base64}`;
  } catch { return ''; }
}

async function buildOverlayData(bundle: Bundle, visit: any) {
  const s = bundle.student || {};
  const g = bundle.guardian || {};
  const h = bundle.household_status || {};
  const v = visit || {};

  const portrait = bundle.photos.find(p => p.photo_type === 'student_portrait');
  const outside  = bundle.photos.find(p => p.photo_type === 'house_outside' && (!v.visit_id || p.visit_id === v.visit_id));
  const inside   = bundle.photos.find(p => p.photo_type === 'house_inside' && (!v.visit_id || p.visit_id === v.visit_id));

  const [portraitUrl, outsideUrl, insideUrl] = await Promise.all([
    resolvePhoto(portrait), resolvePhoto(outside), resolvePhoto(inside)
  ]);

  return {
    school_name: s.school_name, school_affiliation: s.school_affiliation,
    first_name: s.first_name, last_name: s.last_name,
    grade_level: s.grade_level, citizen_id: s.citizen_id,
    household_size: s.household_size,

    [`fs_${s.family_status}`]: true,
    [`lw_${s.lives_with}`]: true,

    guardian_first_name: g.first_name, guardian_last_name: g.last_name,
    guardian_relationship: g.relationship, guardian_occupation: g.occupation,
    guardian_phone: g.phone, guardian_citizen_id: g.citizen_id,

    house_no: h.house_no, moo: h.moo, soi: h.soi, road: h.road,
    subdistrict: h.subdistrict, district: h.district,
    province: h.province, postal_code: h.postal_code,

    distance_km: h.distance_km, travel_time_hours: h.travel_time_hours,
    travel_cost_per_month: h.travel_cost_per_month, daily_pocket_money: h.daily_pocket_money,

    student_photo: portraitUrl,
    photo_outside: outsideUrl,
    photo_inside: insideUrl,

    sig_student: v.student_signature_url,
    sig_guardian: v.guardian_signature_url,
    sig_officer: v.officer_signature_url,
    sig_principal: v.principal_signature_url,

    officer_name: v.officer_name,
    officer_position: v.officer_position,
    principal_name: v.principal_name,
    teacher_name: v.teacher_name
  } as Record<string, any>;
}

function buildOverlayHtml(data: Record<string, any>): string {
  const items: string[] = [];
  for (const [key, ol] of Object.entries(OVERLAYS)) {
    const value = data[key];
    if (value === undefined || value === null || value === '' || value === false) continue;

    const style = `position:absolute;left:${ol.x}px;top:${ol.y}px;` +
      (ol.w ? `width:${ol.w}px;` : '') + 'font-family:Sarabun,sans-serif;font-size:13px;color:#000;';

    const pageSelector = `.page:nth-of-type(${ol.page})`;

    if ((ol as any).check) {
      items.push(`<div data-page="${pageSelector}" style="${style}font-size:18px;font-weight:bold;">✔</div>`);
    } else if ((ol as any).img) {
      items.push(`<div data-page="${pageSelector}" style="${style}"><img src="${value}" style="width:100%;height:auto;display:block;" /></div>`);
    } else {
      items.push(`<div data-page="${pageSelector}" style="${style}">${escapeHtml(String(value))}</div>`);
    }
  }
  return items.join('\n');
}

function escapeHtml(s: string) {
  return s.replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]!));
}

async function renderHtml(bundle: Bundle, visit: any): Promise<string> {
  const [tplRes, data] = await Promise.all([
    fetch(TEMPLATE_URL),
    buildOverlayData(bundle, visit)
  ]);
  const template = await tplRes.text();
  const overlays = buildOverlayHtml(data);

  // inject a script that wraps each .page in relative + appends overlays
  const injection = `
<style>
@import url('https://fonts.googleapis.com/css2?family=Sarabun:wght@400;600;700&display=swap');
.page { position:relative !important; }
</style>
<script>
window.addEventListener('DOMContentLoaded', function() {
  const overlays = ${JSON.stringify(Array.from(buildOverlayList(data)))};
  document.querySelectorAll('.page').forEach((pg, idx) => {
    const pageNo = idx + 1;
    overlays.filter(o => o.page === pageNo).forEach(o => {
      const el = document.createElement('div');
      el.style.cssText = o.style;
      el.innerHTML = o.content;
      pg.appendChild(el);
    });
  });
});
</script>`;
  void overlays;
  return template.replace('</head>', injection + '</head>');
}

function* buildOverlayList(data: Record<string, any>) {
  for (const [key, ol] of Object.entries(OVERLAYS)) {
    const value = data[key];
    if (value === undefined || value === null || value === '' || value === false) continue;
    const baseStyle = `position:absolute;left:${ol.x}px;top:${ol.y}px;` +
      ((ol as any).w ? `width:${(ol as any).w}px;` : '') +
      `font-family:Sarabun,sans-serif;font-size:13px;color:#000;`;
    if ((ol as any).check) {
      yield { page: ol.page, style: baseStyle + 'font-size:18px;font-weight:bold;', content: '✔' };
    } else if ((ol as any).img) {
      yield { page: ol.page, style: baseStyle, content: `<img src="${value}" style="width:100%;height:auto;display:block;" />` };
    } else {
      yield { page: ol.page, style: baseStyle, content: escapeHtml(String(value)) };
    }
  }
}

function openPrintWindow(html: string): Window | null {
  const w = window.open('', '_blank', 'width=900,height=1100');
  if (!w) { alert('Pop-up ถูกบล็อก — กรุณาอนุญาต pop-up'); return null; }
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
  setTimeout(() => { w.focus(); w.print(); }, 1200);
}

export async function exportPdf(bundle: Bundle, visit: any) {
  const html = await renderHtml(bundle, visit);
  const w = openPrintWindow(html);
  if (!w) return;
  setTimeout(() => { w.focus(); w.print(); }, 1200);
}
