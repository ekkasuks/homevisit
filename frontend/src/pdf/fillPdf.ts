import { PDFDocument } from 'pdf-lib';
import { embedThaiFont } from './fontLoader';
import { PAGE1, PAGE2, PAGE3, PAGE4, PAGE5, FONT_SIZE } from './coordinates';
import { text, textRight, check, image, DrawCtx } from './drawHelpers';

const TEMPLATE_URL = (import.meta.env.BASE_URL || '/') + 'template.pdf';

interface Bundle {
  student: any; guardian: any;
  household_members: any[]; household_status: any;
  home_visits: any[]; photos: any[];
}

export async function fillTemplate(bundle: Bundle, visit: any): Promise<Uint8Array> {
  const tplBytes = await fetch(TEMPLATE_URL).then(r => r.arrayBuffer());
  const doc = await PDFDocument.load(tplBytes);
  const font = await embedThaiFont(doc);
  const ctx: DrawCtx = { doc, font };

  fillPage1(ctx, bundle);
  fillPage2(ctx, bundle);
  fillPage3(ctx, bundle);
  fillPage4(ctx, bundle, visit);
  await fillPhotos(ctx, bundle, visit);
  await fillPage5(ctx, bundle, visit);
  fillSystem(ctx, bundle);

  return doc.save();
}

function fillPage1(ctx: DrawCtx, b: Bundle) {
  const s = b.student || {};
  const g = b.guardian || {};

  text(ctx, PAGE1.school_name, s.school_name);
  text(ctx, PAGE1.school_affiliation, s.school_affiliation);
  text(ctx, PAGE1.first_name, s.first_name);
  text(ctx, PAGE1.last_name, s.last_name);
  text(ctx, PAGE1.grade_level, s.grade_level);
  text(ctx, PAGE1.citizen_id, s.citizen_id);

  check(ctx, PAGE1.family_status[s.family_status], true);
  check(ctx, PAGE1.lives_with[s.lives_with], true);

  text(ctx, PAGE1.guardian_first_name, g.first_name);
  text(ctx, PAGE1.guardian_last_name, g.last_name);
  text(ctx, PAGE1.guardian_relationship, g.relationship);
  text(ctx, PAGE1.guardian_highest_education, g.highest_education);
  text(ctx, PAGE1.guardian_occupation, g.occupation);
  text(ctx, PAGE1.guardian_phone, g.phone);
  text(ctx, PAGE1.guardian_citizen_id, g.citizen_id);
  check(ctx, PAGE1.no_citizen_id, g.no_citizen_id);
  check(ctx, PAGE1.has_state_welfare, g.has_state_welfare);
  text(ctx, PAGE1.household_size, s.household_size);

  drawTableRows(ctx, b.household_members.filter(m => m.row_no <= 5),
    PAGE1.table_rows_page1.first_y, PAGE1.table_rows_page1.pitch,
    PAGE1.table_rows_page1.cols, 1);
}

function fillPage2(ctx: DrawCtx, b: Bundle) {
  drawTableRows(ctx, b.household_members.filter(m => m.row_no >= 6),
    PAGE2.table_rows_page2.first_y, PAGE2.table_rows_page2.pitch,
    PAGE2.table_rows_page2.cols, 6);
  const s = b.student || {};
  textRight(ctx, PAGE2.sum_total_income, fmt(s.total_household_income));
  textRight(ctx, PAGE2.sum_income_per_cap, fmt(s.income_per_capita));
}

function drawTableRows(ctx: DrawCtx, members: any[], firstY: number, pitch: number, cols: any, startRowNo: number) {
  const pageNo = startRowNo <= 5 ? 1 : 2;
  members.forEach(m => {
    const rowIdx = m.row_no - startRowNo;
    const y = firstY - rowIdx * pitch;
    text(ctx, { page: pageNo, x: cols.full_name.x, y }, m.full_name, FONT_SIZE.small);
    text(ctx, { page: pageNo, x: cols.relationship.x, y }, m.relationship, FONT_SIZE.small);
    text(ctx, { page: pageNo, x: cols.citizen_id.x, y }, m.citizen_id, FONT_SIZE.small);
    text(ctx, { page: pageNo, x: cols.highest_education.x, y }, m.highest_education, FONT_SIZE.small);
    text(ctx, { page: pageNo, x: cols.age.x, y }, m.age, FONT_SIZE.small);
    check(ctx, { page: pageNo, x: cols.has_disability.x, y }, m.has_disability);
    check(ctx, { page: pageNo, x: cols.has_chronic_disease.x, y }, m.has_chronic_disease);
    textRight(ctx, { page: pageNo, x: cols.income_salary.x + cols.income_salary.w, y }, fmt(m.income_salary), FONT_SIZE.small);
    textRight(ctx, { page: pageNo, x: cols.income_agriculture.x + cols.income_agriculture.w, y }, fmt(m.income_agriculture), FONT_SIZE.small);
    textRight(ctx, { page: pageNo, x: cols.income_business.x + cols.income_business.w, y }, fmt(m.income_business), FONT_SIZE.small);
    textRight(ctx, { page: pageNo, x: cols.income_state_welfare.x + cols.income_state_welfare.w, y }, fmt(m.income_state_welfare), FONT_SIZE.small);
    textRight(ctx, { page: pageNo, x: cols.income_other.x + cols.income_other.w, y }, fmt(m.income_other), FONT_SIZE.small);
    const total = Number(m.income_salary || 0) + Number(m.income_agriculture || 0) + Number(m.income_business || 0) + Number(m.income_state_welfare || 0) + Number(m.income_other || 0);
    textRight(ctx, { page: pageNo, x: cols.total_monthly_income.x + cols.total_monthly_income.w, y }, fmt(total || m.total_monthly_income), FONT_SIZE.small);
  });
}

function fillPage3(ctx: DrawCtx, b: Bundle) {
  const h = b.household_status || {};
  check(ctx, h.has_dependency_burden ? PAGE3.dep_burden_yes : PAGE3.dep_burden_no, true);
  check(ctx, PAGE3.dep_disability, h.dep_disability);
  check(ctx, PAGE3.dep_chronic_disease, h.dep_chronic_disease);
  check(ctx, PAGE3.dep_elderly_60plus, h.dep_elderly_60plus);
  check(ctx, PAGE3.dep_single_parent, h.dep_single_parent);
  check(ctx, PAGE3.dep_unemployed_15_65, h.dep_unemployed_15_65);

  const housingMap: any = {
    own: PAGE3.housing_own, rent: PAGE3.housing_rent,
    with_others: PAGE3.housing_with_others, dorm: PAGE3.housing_dorm
  };
  check(ctx, housingMap[h.housing_type], true);
  if (h.housing_type === 'rent') text(ctx, PAGE3.rent_amount, fmt(h.rent_amount));

  check(ctx, h.has_toilet ? PAGE3.has_toilet_yes : PAGE3.has_toilet_no, true);
  check(ctx, h.does_farming ? PAGE3.yes_farming : PAGE3.no_farming, true);
  check(ctx, h.has_electricity ? PAGE3.has_electricity : PAGE3.no_electricity, true);
  check(ctx, h.has_vehicle ? PAGE3.has_vehicle : PAGE3.no_vehicle, true);
  check(ctx, h.has_appliances ? PAGE3.has_appliances : PAGE3.no_appliances, true);

  text(ctx, PAGE3.institution_name, h.institution_name);
  text(ctx, PAGE3.institution_province, h.institution_province);
  check(ctx, h.institution_wants_subsidy ? PAGE3.inst_wants_yes : PAGE3.inst_wants_no, true);
}

function fillPage4(ctx: DrawCtx, b: Bundle, v: any) {
  const h = b.household_status || {};
  text(ctx, PAGE4.distance_km, fmt(h.distance_km));
  text(ctx, PAGE4.travel_time_hours, fmt(h.travel_time_hours));
  text(ctx, PAGE4.travel_cost_per_month, fmt(h.travel_cost_per_month));
  text(ctx, PAGE4.daily_pocket_money, fmt(h.daily_pocket_money));

  text(ctx, PAGE4.house_no, h.house_no);
  text(ctx, PAGE4.moo, h.moo);
  text(ctx, PAGE4.soi, h.soi);
  text(ctx, PAGE4.road, h.road);
  text(ctx, PAGE4.subdistrict, h.subdistrict);
  text(ctx, PAGE4.district, h.district);
  text(ctx, PAGE4.province, h.province);
  text(ctx, PAGE4.postal_code, h.postal_code);

  check(ctx, v?.photo_source === 'teacher' ? PAGE4.photo_source_teacher : null, true);
  check(ctx, v?.photo_source === 'student' ? PAGE4.photo_source_student : null, true);
}

async function fillPhotos(ctx: DrawCtx, b: Bundle, v: any) {
  const portrait = b.photos.find(p => p.photo_type === 'student_portrait');
  const outside = b.photos.find(p => p.photo_type === 'house_outside' && (!v?.visit_id || p.visit_id === v.visit_id));
  const inside = b.photos.find(p => p.photo_type === 'house_inside' && (!v?.visit_id || p.visit_id === v.visit_id));

  await image(ctx, PAGE1.student_photo, portrait?.drive_url, 'jpg');
  await image(ctx, PAGE4.photo_outside, outside?.drive_url, 'jpg');
  await image(ctx, PAGE4.photo_inside, inside?.drive_url, 'jpg');
}

async function fillPage5(ctx: DrawCtx, b: Bundle, v: any) {
  if (!v) return;
  await image(ctx, PAGE5.sig_student, v.student_signature_url, 'png');
  text(ctx, PAGE5.sig_student_name, v.student_signature_name);
  await image(ctx, PAGE5.sig_guardian, v.guardian_signature_url, 'png');
  text(ctx, PAGE5.sig_guardian_name, v.guardian_signature_name);

  text(ctx, PAGE5.officer_name, v.officer_name);
  text(ctx, PAGE5.officer_citizen_id, v.officer_citizen_id);
  text(ctx, PAGE5.officer_position, v.officer_position);
  check(ctx, PAGE5.officer_certifies, v.officer_certifies === true);
  check(ctx, PAGE5.officer_rejects, v.officer_certifies === false);
  text(ctx, PAGE5.officer_reject_reason, v.officer_reject_reason);
  await image(ctx, PAGE5.sig_officer, v.officer_signature_url, 'png');

  text(ctx, PAGE5.principal_name, v.principal_name);
  await image(ctx, PAGE5.sig_principal, v.principal_signature_url, 'png');

  await image(ctx, PAGE5.sig_teacher, v.teacher_signature_url, 'png');
  text(ctx, PAGE5.sig_teacher_name, v.teacher_name);
  text(ctx, PAGE5.teacher_position_line1, v.teacher_position_line1);
  text(ctx, PAGE5.teacher_position_line2, v.teacher_position_line2);
}

function fillSystem(ctx: DrawCtx, b: Bundle) {
  const s = b.student || {};
  text(ctx, PAGE5.created_by, s.created_by || '');
  text(ctx, PAGE5.created_date, fmtDate(s.created_at));
  text(ctx, PAGE5.printed_date, fmtDate(new Date().toISOString()));
}

function fmt(n: any): string {
  if (n === null || n === undefined || n === '') return '';
  const num = Number(n);
  if (isNaN(num)) return String(n);
  return num.toLocaleString('th-TH');
}

function fmtDate(iso?: string): string {
  if (!iso) return '';
  const d = new Date(iso);
  if (isNaN(d.getTime())) return '';
  return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear() + 543}`;
}

export async function exportPdf(bundle: Bundle, visit: any) {
  const bytes = await fillTemplate(bundle, visit);
  const blob = new Blob([bytes as BlobPart], { type: 'application/pdf' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = buildFilename(bundle);
  a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 5000);
}

export async function previewPdf(bundle: Bundle, visit: any) {
  const bytes = await fillTemplate(bundle, visit);
  const blob = new Blob([bytes as BlobPart], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);
  window.open(url, '_blank', 'noopener,noreferrer');
  setTimeout(() => URL.revokeObjectURL(url), 60_000);
}

export async function printPdf(bundle: Bundle, visit: any) {
  const bytes = await fillTemplate(bundle, visit);
  const blob = new Blob([bytes as BlobPart], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);
  const iframe = document.createElement('iframe');
  iframe.style.cssText = 'position:fixed;right:0;bottom:0;width:0;height:0;border:0;';
  iframe.src = url;
  iframe.onload = () => setTimeout(() => { iframe.contentWindow?.focus(); iframe.contentWindow?.print(); }, 300);
  document.body.appendChild(iframe);
  setTimeout(() => { URL.revokeObjectURL(url); iframe.remove(); }, 120_000);
}

function buildFilename(bundle: Bundle) {
  const s = bundle.student || {};
  const safe = (x: any) => String(x || '').replace(/[^\p{L}\p{N}_-]/gu, '_');
  return `กสศ01_${safe(s.first_name)}_${safe(s.last_name)}_${safe(s.grade_level)}.pdf`;
}
