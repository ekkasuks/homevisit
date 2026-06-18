import { PDFDocument } from 'pdf-lib';
import { embedThaiFont } from './fontLoader';
import { PAGE1, PAGE2, PAGE3, PAGE4, PAGE5, FONT_SIZE } from './coordinates';
import { text, textRight, check, image, DrawCtx } from './drawHelpers';

const TEMPLATE_URL = import.meta.env.VITE_PDF_TEMPLATE || '/template.pdf';
const DEBUG = import.meta.env.VITE_PDF_DEBUG === '1';

interface Bundle {
  student: any;
  guardian: any;
  household_members: any[];
  household_status: any;
  home_visits: any[];
  photos: any[];
}

export async function fillTemplate(bundle: Bundle, visit: any): Promise<Uint8Array> {
  const tplBytes = await fetch(TEMPLATE_URL).then(r => r.arrayBuffer());
  const doc = await PDFDocument.load(tplBytes);
  const font = await embedThaiFont(doc);
  const ctx: DrawCtx = { doc, font, debug: DEBUG };

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

function drawTableRows(
  ctx: DrawCtx, members: any[], firstY: number, pitch: number, cols: any, startRowNo: number
) {
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

  (h.floor_material || []).forEach((k: string) => check(ctx, PAGE3.floor[k], true));
  (h.wall_material || []).forEach((k: string) => check(ctx, PAGE3.wall[k], true));
  (h.roof_material || []).forEach((k: string) => check(ctx, PAGE3.roof[k], true));
  check(ctx, h.has_toilet ? PAGE3.has_toilet_yes : PAGE3.has_toilet_no, true);

  check(ctx, h.does_farming ? PAGE3.yes_farming : PAGE3.no_farming, true);
  if (h.does_farming) {
    const m: any = { lt_1: PAGE3.farm_lt_1, '1_to_5': PAGE3.farm_1_5, gt_5: PAGE3.farm_gt_5 };
    check(ctx, m[h.farm_land_size], true);
  }

  const waterMap: any = {
    bottled: PAGE3.water_bottled, tap_water: PAGE3.water_tap,
    well_groundwater: PAGE3.water_well, rain_mountain_stream: PAGE3.water_rain
  };
  (h.water_sources || []).forEach((k: string) => check(ctx, waterMap[k], true));

  check(ctx, h.has_electricity ? PAGE3.has_electricity : PAGE3.no_electricity, true);
  const elecMap: any = {
    generator_solar: PAGE3.elec_generator_solar,
    piggyback_battery: PAGE3.elec_piggyback_battery,
    meter: PAGE3.elec_meter
  };
  check(ctx, elecMap[h.electricity_type], true);

  check(ctx, h.has_vehicle ? PAGE3.has_vehicle : PAGE3.no_vehicle, true);
  if (h.car_personal === 'over_15') check(ctx, PAGE3.car_over_15, true);
  if (h.car_personal === 'under_15') check(ctx, PAGE3.car_under_15, true);
  if (h.pickup_truck === 'over_15') check(ctx, PAGE3.pickup_over_15, true);
  if (h.pickup_truck === 'under_15') check(ctx, PAGE3.pickup_under_15, true);
  if (h.tractor === 'over_15') check(ctx, PAGE3.tractor_over_15, true);
  if (h.tractor === 'under_15') check(ctx, PAGE3.tractor_under_15, true);
  check(ctx, PAGE3.motorcycle_small_boat, h.motorcycle_small_boat);

  check(ctx, h.has_appliances ? PAGE3.has_appliances : PAGE3.no_appliances, true);
  check(ctx, PAGE3.app_computer, h.app_computer);
  check(ctx, PAGE3.app_air_conditioner, h.app_air_conditioner);
  check(ctx, PAGE3.app_flat_tv, h.app_flat_tv);
  check(ctx, PAGE3.app_washing_machine, h.app_washing_machine);
  check(ctx, PAGE3.app_refrigerator, h.app_refrigerator);

  const instType: any = {
    gov_registered: PAGE3.inst_type_gov_reg,
    gov_unregistered: PAGE3.inst_type_gov_noreg,
    private_registered: PAGE3.inst_type_priv_reg,
    private_unregistered: PAGE3.inst_type_priv_noreg,
    temple: PAGE3.inst_type_temple,
    other: PAGE3.inst_type_other
  };
  check(ctx, instType[h.institution_type], true);
  text(ctx, PAGE3.institution_name, h.institution_name);
  text(ctx, PAGE3.institution_province, h.institution_province);
  text(ctx, PAGE3.institution_director_name, h.institution_director_name);
  text(ctx, PAGE3.institution_phone, h.institution_phone);
  text(ctx, PAGE3.institution_join_month, h.institution_join_month);
  text(ctx, PAGE3.institution_join_year, h.institution_join_year);
  check(ctx, h.institution_stay_type === 'boarding' ? PAGE3.stay_boarding : null, true);
  check(ctx, h.institution_stay_type === 'weekly_return' ? PAGE3.stay_weekly_return : null, true);

  const helpMap: any = {
    cash: PAGE3.help_cash, items: PAGE3.help_items,
    housing: PAGE3.help_housing, food: PAGE3.help_food,
    transport: PAGE3.help_transport, education: PAGE3.help_education, health: PAGE3.help_health
  };
  (h.institution_help_types || []).forEach((k: string) => check(ctx, helpMap[k], true));

  textRight(ctx, PAGE3.inst_cost_per_student, fmt(h.institution_cost_per_student));
  textRight(ctx, PAGE3.inst_total_students, fmt(h.institution_total_students));
  textRight(ctx, PAGE3.inst_annual_donations, fmt(h.institution_annual_donations));
  textRight(ctx, PAGE3.inst_land_rai, fmt(h.institution_land_rai));
  textRight(ctx, PAGE3.inst_land_ngan, fmt(h.institution_land_ngan));
  textRight(ctx, PAGE3.inst_buildings, fmt(h.institution_buildings));
  textRight(ctx, PAGE3.inst_vehicles, fmt(h.institution_vehicles));
  check(ctx, h.institution_wants_subsidy ? PAGE3.inst_wants_yes : PAGE3.inst_wants_no, true);
}

function fillPage4(ctx: DrawCtx, b: Bundle, v: any) {
  const h = b.household_status || {};
  const travelMap: any = {
    walk: PAGE4.travel_walk, bicycle: PAGE4.travel_bicycle,
    school_bus: PAGE4.travel_school_bus, private_motorcycle: PAGE4.travel_private_motorcycle,
    private_car: PAGE4.travel_private_car, private_boat: PAGE4.travel_private_boat,
    motorcycle_taxi: PAGE4.travel_motorcycle_taxi,
    public_bus: PAGE4.travel_public_bus, public_boat: PAGE4.travel_public_boat
  };
  (h.travel_methods || []).forEach((k: string) => check(ctx, travelMap[k], true));

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
  const catMap: any = {
    house: PAGE4.photo_cat_house,
    institution: PAGE4.photo_cat_institution,
    school_sign: PAGE4.photo_cat_school_sign
  };
  check(ctx, catMap[v?.photo_category], true);
  check(ctx, PAGE4.reason_other_province, v?.photo_reason_other_province);
  check(ctx, PAGE4.reason_abroad, v?.photo_reason_abroad);
  check(ctx, PAGE4.reason_not_permitted, v?.photo_reason_not_permitted);
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
  text(ctx, PAGE5.sig_officer_name, v.officer_name);

  text(ctx, PAGE5.principal_name, v.principal_name);
  await image(ctx, PAGE5.sig_principal, v.principal_signature_url, 'png');
  text(ctx, PAGE5.sig_principal_name, v.principal_name);

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
  const by = d.getFullYear() + 543;
  return `${d.getDate()}/${d.getMonth() + 1}/${by}`;
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
  iframe.style.position = 'fixed';
  iframe.style.right = '0'; iframe.style.bottom = '0';
  iframe.style.width = '0'; iframe.style.height = '0';
  iframe.style.border = '0';
  iframe.src = url;
  iframe.onload = () => {
    setTimeout(() => {
      iframe.contentWindow?.focus();
      iframe.contentWindow?.print();
    }, 300);
  };
  document.body.appendChild(iframe);
  setTimeout(() => {
    URL.revokeObjectURL(url);
    iframe.remove();
  }, 120_000);
}

function buildFilename(bundle: Bundle) {
  const s = bundle.student || {};
  const safe = (x: any) => String(x || '').replace(/[^\p{L}\p{N}_-]/gu, '_');
  return `กสศ01_${safe(s.first_name)}_${safe(s.last_name)}_${safe(s.grade_level)}.pdf`;
}
