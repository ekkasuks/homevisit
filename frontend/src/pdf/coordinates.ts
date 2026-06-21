/**
 * pdf-lib coordinate map: origin = bottom-left.
 * Pages 1-2: A3 landscape (841.9 x 595.3)
 * Pages 3-5: A4 portrait  (595.3 x 841.9)
 *
 * y values derived from pdfplumber: pdfl_y = page.height - word.bottom
 */
export type Point   = { page: number; x: number; y: number };
export type BoxRect = { page: number; x: number; y: number; w: number; h: number };

export const FONT_SIZE: { default: number; small: number } = { default: 9.5, small: 8 };

// ─── PAGE 1  (A3 landscape) ───────────────────────────────────────────────────
export const PAGE1 = {
  school_name:        { page: 1, x: 270,  y: 492   } as Point,
  school_affiliation: { page: 1, x: 510,  y: 492   } as Point,
  student_photo:      { page: 1, x: 736,  y: 455, w: 70, h: 95 } as BoxRect,

  first_name:  { page: 1, x: 168, y: 472 } as Point,
  last_name:   { page: 1, x: 333, y: 472 } as Point,
  grade_level: { page: 1, x: 491, y: 472 } as Point,
  citizen_id:  { page: 1, x: 217, y: 452 } as Point,

  family_status: {
    parents_together:  { page: 1, x: 178, y: 433 } as Point,
    parents_separated: { page: 1, x: 256, y: 433 } as Point,
    parents_divorced:  { page: 1, x: 343, y: 433 } as Point,
    father_deceased:   { page: 1, x: 430, y: 433 } as Point,
    mother_deceased:   { page: 1, x: 525, y: 433 } as Point,
    both_deceased:     { page: 1, x: 620, y: 433 } as Point,
    abandoned:         { page: 1, x: 740, y: 433 } as Point
  } as Record<string, Point>,

  lives_with: {
    parents:            { page: 1, x: 178, y: 412 } as Point,
    relatives:          { page: 1, x: 247, y: 412 } as Point,
    alone:              { page: 1, x: 300, y: 412 } as Point,
    caregiver_employer: { page: 1, x: 378, y: 412 } as Point,
    institution:        { page: 1, x: 476, y: 412 } as Point
  } as Record<string, Point>,

  guardian_first_name:        { page: 1, x: 175, y: 391 } as Point,
  guardian_last_name:         { page: 1, x: 308, y: 391 } as Point,
  guardian_relationship:      { page: 1, x: 510, y: 391 } as Point,
  guardian_highest_education: { page: 1, x: 663, y: 391 } as Point,
  guardian_occupation:        { page: 1, x:  92, y: 371 } as Point,
  guardian_phone:             { page: 1, x: 343, y: 371 } as Point,
  guardian_citizen_id:        { page: 1, x: 580, y: 371 } as Point,
  no_citizen_id:              { page: 1, x: 564, y: 351 } as Point,
  has_state_welfare:          { page: 1, x:  43, y: 332 } as Point,
  household_size:             { page: 1, x: 196, y: 314 } as Point,

  table_rows_page1: {
    first_y: 222,
    pitch:   16,
    cols: {
      full_name:            { x:  62, w: 110 },
      relationship:         { x: 175, w:  55 },
      citizen_id:           { x: 233, w:  85 },
      highest_education:    { x: 322, w:  55 },
      age:                  { x: 380, w:  20 },
      has_disability:       { x: 412 },
      has_chronic_disease:  { x: 448 },
      income_salary:        { x: 485, w:  55 },
      income_agriculture:   { x: 544, w:  55 },
      income_business:      { x: 605, w:  55 },
      income_state_welfare: { x: 666, w:  60 },
      income_other:         { x: 730, w:  55 },
      total_monthly_income: { x: 790, w:  50 }
    }
  }
};

// ─── PAGE 2  (A3 landscape) ───────────────────────────────────────────────────
// household members rows 6-10 + section 3.1 + section 3.2 at bottom
export const PAGE2 = {
  table_rows_page2: { first_y: 415, pitch: 16, cols: PAGE1.table_rows_page1.cols },
  sum_total_income:   { page: 2, x: 790, y: 296.7 } as Point,
  sum_income_per_cap: { page: 2, x: 790, y: 280.4 } as Point,

  // Section 3.1 – ภาระพึ่งพิง
  dep_burden_no:        { page: 2, x: 186, y: 232.5 } as Point,
  dep_burden_yes:       { page: 2, x: 321, y: 232.5 } as Point,
  dep_disability:       { page: 2, x: 184, y: 212.9 } as Point,
  dep_chronic_disease:  { page: 2, x: 343, y: 212.9 } as Point,
  dep_elderly_60plus:   { page: 2, x: 509, y: 212.9 } as Point,
  dep_single_parent:    { page: 2, x: 184, y: 193.2 } as Point,
  dep_unemployed_15_65: { page: 2, x: 319, y: 193.2 } as Point,

  // Section 3.2 – การอยู่อาศัย
  housing_own:          { page: 2, x: 186, y: 173.5 } as Point,
  housing_rent:         { page: 2, x: 321, y: 173.5 } as Point,
  rent_amount:          { page: 2, x: 463, y: 173.5 } as Point,
  housing_with_others:  { page: 2, x: 186, y: 153.8 } as Point,
  housing_dorm:         { page: 2, x: 321, y: 153.8 } as Point,
};

// ─── PAGE 3  (A4 portrait) ────────────────────────────────────────────────────
// sections 3.3 – 3.8 + section 4 (สถาบัน)
export const PAGE3 = {
  // 3.3 ห้องส้วม
  has_toilet_yes:       { page: 3, x: 210, y: 618.7 } as Point,
  has_toilet_no:        { page: 3, x: 258, y: 618.7 } as Point,

  // 3.4 ที่ดินเกษตร
  no_farming:           { page: 3, x: 200, y: 591.0 } as Point,
  yes_farming:          { page: 3, x: 280, y: 591.0 } as Point,

  // 3.6 ไฟฟ้า
  no_electricity:       { page: 3, x: 186, y: 532.0 } as Point,
  has_electricity:      { page: 3, x: 186, y: 512.3 } as Point,

  // 3.7 ยานพาหนะ
  no_vehicle:           { page: 3, x: 220, y: 492.6 } as Point,
  has_vehicle:          { page: 3, x: 363, y: 492.6 } as Point,

  // 3.8 ของใช้
  no_appliances:        { page: 3, x: 204, y: 394.4 } as Point,
  has_appliances:       { page: 3, x: 300, y: 394.4 } as Point,

  // Section 4 – สถาบัน
  institution_name:     { page: 3, x: 100, y: 290.2 } as Point,
  institution_province: { page: 3, x: 360, y: 290.2 } as Point,
  inst_wants_yes:       { page: 3, x:  73, y: 54.4  } as Point,
  inst_wants_no:        { page: 3, x: 186, y: 54.4  } as Point,
};

// ─── PAGE 4  (A4 portrait) ────────────────────────────────────────────────────
// sections 5 (การเดินทาง) + 6 (ที่ตั้ง) + 7 (ภาพถ่าย)
export const PAGE4 = {
  // Section 5 – การเดินทาง
  distance_km:           { page: 4, x: 170, y: 707.2 } as Point,
  travel_time_hours:     { page: 4, x: 390, y: 707.2 } as Point,
  travel_cost_per_month: { page: 4, x: 160, y: 688.4 } as Point,
  daily_pocket_money:    { page: 4, x: 430, y: 688.4 } as Point,

  // Section 6 – ที่ตั้ง
  house_no:    { page: 4, x: 100, y: 638.1 } as Point,
  moo:         { page: 4, x: 200, y: 638.1 } as Point,
  soi:         { page: 4, x: 275, y: 638.1 } as Point,
  road:        { page: 4, x: 385, y: 638.1 } as Point,
  subdistrict: { page: 4, x: 105, y: 617.1 } as Point,
  district:    { page: 4, x: 220, y: 617.1 } as Point,
  province:    { page: 4, x: 350, y: 617.1 } as Point,
  postal_code: { page: 4, x: 480, y: 617.1 } as Point,

  // Section 7 – แหล่งภาพ
  photo_source_teacher: { page: 4, x: 216, y: 571.3 } as Point,
  photo_source_student: { page: 4, x: 397, y: 571.3 } as Point,

  // กรอบภาพ (fit จะ scale ให้พอดีกรอบ)
  photo_outside: { page: 4, x:  52, y: 200, w: 235, h: 280 } as BoxRect,
  photo_inside:  { page: 4, x: 307, y: 200, w: 235, h: 280 } as BoxRect,
};

// ─── PAGE 5  (A4 portrait) ────────────────────────────────────────────────────
// sections 8-10 (ลายเซ็น / รับรอง)
export const PAGE5 = {
  // 9. ลายเซ็นนักเรียน + ผู้ปกครอง
  sig_student:       { page: 5, x:  80, y: 763, w: 165, h: 18 } as BoxRect,
  sig_student_name:  { page: 5, x: 100, y: 753 } as Point,
  sig_guardian:      { page: 5, x: 350, y: 763, w: 165, h: 18 } as BoxRect,
  sig_guardian_name: { page: 5, x: 380, y: 753 } as Point,

  // 10. ข้อมูลเจ้าหน้าที่
  officer_name:          { page: 5, x:  85, y: 687.5 } as Point,
  officer_citizen_id:    { page: 5, x: 400, y: 687.5 } as Point,
  officer_position:      { page: 5, x:  85, y: 664.9 } as Point,
  officer_certifies:     { page: 5, x:  54, y: 643.0 } as Point,
  officer_rejects:       { page: 5, x:  54, y: 596.2 } as Point,
  officer_reject_reason: { page: 5, x: 130, y: 596.2 } as Point,
  sig_officer:           { page: 5, x: 195, y: 532, w: 165, h: 16 } as BoxRect,

  // ผู้อำนวยการ
  principal_name:   { page: 5, x: 140, y: 481.1 } as Point,
  sig_principal:    { page: 5, x: 195, y: 398, w: 165, h: 16 } as BoxRect,

  // ครูผู้เยี่ยมบ้าน
  sig_teacher:            { page: 5, x: 352, y: 238, w: 145, h: 14 } as BoxRect,
  sig_teacher_name:       { page: 5, x: 370, y: 230 } as Point,
  teacher_position_line1: { page: 5, x: 360, y: 209 } as Point,
  teacher_position_line2: { page: 5, x: 360, y: 195 } as Point,

  // ข้อมูลระบบ
  created_by:   { page: 5, x: 115, y: 151.5 } as Point,
  created_date: { page: 5, x: 305, y: 151.5 } as Point,
  printed_date: { page: 5, x: 145, y: 133.2 } as Point,
};
