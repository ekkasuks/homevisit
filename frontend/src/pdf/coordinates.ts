/**
 * pdf-lib coordinate map: origin = bottom-left.
 * Pages 1-2: A3 landscape (841.9 x 595.3)
 * Pages 3-5: A4 portrait  (595.3 x 841.9)
 */
export type Point = { page: number; x: number; y: number };
export type BoxRect = { page: number; x: number; y: number; w: number; h: number };

export const FONT_SIZE: { default: number; small: number } = { default: 9.5, small: 8 };

export const PAGE1 = {
  school_name:        { page: 1, x: 270, y: 492 } as Point,
  school_affiliation: { page: 1, x: 510, y: 492 } as Point,
  student_photo:      { page: 1, x: 736, y: 460, w: 70, h: 90 } as BoxRect,

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
    parents:            { page: 1, x: 192, y: 412 } as Point,
    relatives:          { page: 1, x: 261, y: 412 } as Point,
    alone:              { page: 1, x: 314, y: 412 } as Point,
    caregiver_employer: { page: 1, x: 392, y: 412 } as Point,
    institution:        { page: 1, x: 490, y: 412 } as Point
  } as Record<string, Point>,

  guardian_first_name:        { page: 1, x: 175, y: 391 } as Point,
  guardian_last_name:         { page: 1, x: 308, y: 391 } as Point,
  guardian_relationship:      { page: 1, x: 510, y: 391 } as Point,
  guardian_highest_education: { page: 1, x: 663, y: 391 } as Point,
  guardian_occupation:        { page: 1, x:  92, y: 371 } as Point,
  guardian_phone:             { page: 1, x: 343, y: 371 } as Point,
  guardian_citizen_id:        { page: 1, x: 580, y: 371 } as Point,
  no_citizen_id:              { page: 1, x: 564, y: 351 } as Point,
  has_state_welfare:          { page: 1, x:  56, y: 332 } as Point,
  household_size:             { page: 1, x: 196, y: 314 } as Point,

  table_rows_page1: {
    first_y: 222,
    pitch:   16,
    cols: {
      full_name:           { x:  62, w: 110 },
      relationship:        { x: 175, w:  55 },
      citizen_id:          { x: 233, w:  85 },
      highest_education:   { x: 322, w:  55 },
      age:                 { x: 380, w:  20 },
      has_disability:      { x: 412 },
      has_chronic_disease: { x: 448 },
      income_salary:       { x: 485, w:  55 },
      income_agriculture:  { x: 544, w:  55 },
      income_business:     { x: 605, w:  55 },
      income_state_welfare:{ x: 666, w:  60 },
      income_other:        { x: 730, w:  55 },
      total_monthly_income:{ x: 790, w:  50 }
    }
  }
};

export const PAGE2 = {
  table_rows_page2: { first_y: 415, pitch: 16, cols: PAGE1.table_rows_page1.cols },
  sum_total_income:   { page: 2, x: 790, y: 296.7 } as Point,
  sum_income_per_cap: { page: 2, x: 790, y: 280.4 } as Point
};

export const PAGE3 = {
  dep_burden_no:        { page: 3, x: 196, y: 803 } as Point,
  dep_burden_yes:       { page: 3, x: 314, y: 803 } as Point,
  dep_disability:       { page: 3, x:  60, y: 786 } as Point,
  dep_chronic_disease:  { page: 3, x: 245, y: 786 } as Point,
  dep_elderly_60plus:   { page: 3, x: 435, y: 786 } as Point,
  dep_single_parent:    { page: 3, x:  60, y: 770 } as Point,
  dep_unemployed_15_65: { page: 3, x: 200, y: 770 } as Point,
  housing_own:          { page: 3, x: 165, y: 745 } as Point,
  housing_rent:         { page: 3, x: 295, y: 745 } as Point,
  rent_amount:          { page: 3, x: 460, y: 745 } as Point,
  housing_with_others:  { page: 3, x: 165, y: 730 } as Point,
  housing_dorm:         { page: 3, x: 295, y: 730 } as Point,
  has_toilet_yes:       { page: 3, x: 260, y: 622 } as Point,
  has_toilet_no:        { page: 3, x: 290, y: 622 } as Point,
  no_farming:           { page: 3, x: 200, y: 591 } as Point,
  yes_farming:          { page: 3, x: 275, y: 591 } as Point,
  no_electricity:       { page: 3, x: 195, y: 532 } as Point,
  has_electricity:      { page: 3, x: 195, y: 512.3 } as Point,
  no_vehicle:           { page: 3, x: 220, y: 492.6 } as Point,
  has_vehicle:          { page: 3, x: 360, y: 492.6 } as Point,
  no_appliances:        { page: 3, x: 207, y: 394.4 } as Point,
  has_appliances:       { page: 3, x: 350, y: 394.4 } as Point,
  institution_name:     { page: 3, x: 100, y: 290.2 } as Point,
  institution_province: { page: 3, x: 360, y: 290.2 } as Point,
  inst_wants_yes:       { page: 3, x: 150, y:  60 } as Point,
  inst_wants_no:        { page: 3, x: 195, y:  54.4 } as Point
};

export const PAGE4 = {
  distance_km:           { page: 4, x: 220, y: 709.4 } as Point,
  travel_time_hours:     { page: 4, x: 415, y: 709.4 } as Point,
  travel_cost_per_month: { page: 4, x: 240, y: 688.4 } as Point,
  daily_pocket_money:    { page: 4, x: 488, y: 688.4 } as Point,
  house_no:    { page: 4, x: 100, y: 640.3 } as Point,
  moo:         { page: 4, x: 200, y: 640.3 } as Point,
  soi:         { page: 4, x: 275, y: 640.3 } as Point,
  road:        { page: 4, x: 385, y: 640.3 } as Point,
  subdistrict: { page: 4, x: 105, y: 619.3 } as Point,
  district:    { page: 4, x: 220, y: 619.3 } as Point,
  province:    { page: 4, x: 350, y: 619.3 } as Point,
  postal_code: { page: 4, x: 480, y: 619.3 } as Point,
  photo_source_teacher: { page: 4, x: 225, y: 571.3 } as Point,
  photo_source_student: { page: 4, x: 405, y: 571.3 } as Point,
  photo_outside: { page: 4, x:  50, y: 200, w: 240, h: 280 } as BoxRect,
  photo_inside:  { page: 4, x: 305, y: 200, w: 240, h: 280 } as BoxRect
};

export const PAGE5 = {
  sig_student:        { page: 5, x:  90, y: 770, w: 150, h: 40 } as BoxRect,
  sig_student_name:   { page: 5, x: 130, y: 740 } as Point,
  sig_guardian:       { page: 5, x: 340, y: 770, w: 150, h: 40 } as BoxRect,
  sig_guardian_name:  { page: 5, x: 380, y: 740 } as Point,
  officer_name:         { page: 5, x:  85, y: 689.7 } as Point,
  officer_citizen_id:   { page: 5, x: 400, y: 689.7 } as Point,
  officer_position:     { page: 5, x:  85, y: 667.1 } as Point,
  officer_certifies:    { page: 5, x:  60, y: 643 } as Point,
  officer_rejects:      { page: 5, x:  60, y: 596.2 } as Point,
  officer_reject_reason:{ page: 5, x: 150, y: 596.2 } as Point,
  sig_officer:          { page: 5, x: 340, y: 540, w: 150, h: 40 } as BoxRect,
  principal_name:      { page: 5, x: 140, y: 483.3 } as Point,
  sig_principal:       { page: 5, x: 340, y: 440, w: 150, h: 40 } as BoxRect,
  sig_teacher:            { page: 5, x: 340, y: 340, w: 150, h: 40 } as BoxRect,
  sig_teacher_name:       { page: 5, x: 380, y: 315 } as Point,
  teacher_position_line1: { page: 5, x: 340, y: 295 } as Point,
  teacher_position_line2: { page: 5, x: 340, y: 280 } as Point,
  created_by:   { page: 5, x: 115, y: 153.7 } as Point,
  created_date: { page: 5, x: 305, y: 153.7 } as Point,
  printed_date: { page: 5, x: 145, y: 135.4 } as Point
};
