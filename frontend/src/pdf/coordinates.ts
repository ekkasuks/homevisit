/**
 * pdf-lib coordinate map: origin = bottom-left.
 * Pages 1-2: A3 landscape (841.9 x 595.3)
 * Pages 3-5: A4 portrait  (595.3 x 841.9)
 */
export type Point = { page: number; x: number; y: number };
export type BoxRect = { page: number; x: number; y: number; w: number; h: number };

export const PAGE_SIZE = {
  1: { w: 841.9, h: 595.3 },
  2: { w: 841.9, h: 595.3 },
  3: { w: 595.3, h: 841.9 },
  4: { w: 595.3, h: 841.9 },
  5: { w: 595.3, h: 841.9 }
} as const;

export const FONT_SIZE: { default: number; small: number; signature_label: number } = {
  default: 9.5, small: 8, signature_label: 9
};
export const CHECK_GLYPH = '✔';

export const PAGE1 = {
  school_name:        { page: 1, x: 270, y: 487.5 } as Point,
  school_affiliation: { page: 1, x: 510, y: 487.5 } as Point,
  student_photo:      { page: 1, x: 736, y: 460, w: 70, h: 90 } as BoxRect,

  first_name:  { page: 1, x: 168, y: 467.6 } as Point,
  last_name:   { page: 1, x: 333, y: 467.6 } as Point,
  grade_level: { page: 1, x: 491, y: 467.6 } as Point,
  citizen_id:  { page: 1, x: 217, y: 447.9 } as Point,

  family_status: {
    parents_together:  { page: 1, x: 178, y: 428.2 } as Point,
    parents_separated: { page: 1, x: 256, y: 428.2 } as Point,
    parents_divorced:  { page: 1, x: 343, y: 428.2 } as Point,
    father_deceased:   { page: 1, x: 430, y: 428.2 } as Point,
    mother_deceased:   { page: 1, x: 525, y: 428.2 } as Point,
    both_deceased:     { page: 1, x: 620, y: 428.2 } as Point,
    abandoned:         { page: 1, x: 740, y: 428.2 } as Point
  } as Record<string, Point>,

  lives_with: {
    parents:            { page: 1, x: 192, y: 407.3 } as Point,
    relatives:          { page: 1, x: 261, y: 407.3 } as Point,
    alone:              { page: 1, x: 314, y: 407.3 } as Point,
    caregiver_employer: { page: 1, x: 392, y: 407.3 } as Point,
    institution:        { page: 1, x: 490, y: 407.3 } as Point
  } as Record<string, Point>,

  guardian_first_name:        { page: 1, x: 175, y: 386.3 } as Point,
  guardian_last_name:         { page: 1, x: 308, y: 386.3 } as Point,
  guardian_relationship:      { page: 1, x: 510, y: 386.3 } as Point,
  guardian_highest_education: { page: 1, x: 663, y: 386.3 } as Point,
  guardian_occupation:        { page: 1, x:  92, y: 366.8 } as Point,
  guardian_phone:             { page: 1, x: 343, y: 366.8 } as Point,
  guardian_citizen_id:        { page: 1, x: 580, y: 366.8 } as Point,
  no_citizen_id:              { page: 1, x: 564, y: 347.1 } as Point,
  has_state_welfare:          { page: 1, x:  56, y: 327.4 } as Point,
  household_size:             { page: 1, x: 196, y: 310.0 } as Point,

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
  table_rows_page2: {
    first_y: 415,
    pitch:   16,
    cols: PAGE1.table_rows_page1.cols
  },
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

  housing_own:         { page: 3, x: 165, y: 745 } as Point,
  housing_rent:        { page: 3, x: 295, y: 745 } as Point,
  rent_amount:         { page: 3, x: 460, y: 745 } as Point,
  housing_with_others: { page: 3, x: 165, y: 730 } as Point,
  housing_dorm:        { page: 3, x: 295, y: 730 } as Point,

  floor: {
    tile:       { page: 3, x: 215, y: 756.1 } as Point,
    parquet:    { page: 3, x: 310, y: 756.1 } as Point,
    cement:     { page: 3, x: 400, y: 756.1 } as Point,
    wood_plank: { page: 3, x: 478, y: 756.1 } as Point,
    vinyl:      { page: 3, x: 215, y: 740 } as Point,
    bamboo:     { page: 3, x: 348, y: 740 } as Point,
    dirt_sand:  { page: 3, x: 408, y: 740 } as Point,
    other:      { page: 3, x: 478, y: 740 } as Point
  } as Record<string, Point>,
  wall: {
    cement_plaster: { page: 3, x: 195, y: 716.8 } as Point,
    brick_block:    { page: 3, x: 290, y: 716.8 } as Point,
    zinc:           { page: 3, x: 410, y: 716.8 } as Point,
    wood_plank:     { page: 3, x: 478, y: 716.8 } as Point,
    plywood:        { page: 3, x: 195, y: 700 } as Point,
    smartboard:     { page: 3, x: 260, y: 700 } as Point,
    bamboo_wood:    { page: 3, x: 440, y: 700 } as Point,
    dirt:           { page: 3, x: 195, y: 684 } as Point,
    vinyl_other:    { page: 3, x: 245, y: 684 } as Point
  } as Record<string, Point>,
  roof: {
    metal:               { page: 3, x: 195, y: 657.9 } as Point,
    tile:                { page: 3, x: 365, y: 657.9 } as Point,
    wood_plank:          { page: 3, x: 465, y: 657.9 } as Point,
    leaf_natural:        { page: 3, x: 195, y: 640 } as Point,
    vinyl_paper_plastic: { page: 3, x: 305, y: 640 } as Point,
    other:               { page: 3, x: 440, y: 640 } as Point
  } as Record<string, Point>,
  has_toilet_yes: { page: 3, x: 260, y: 622 } as Point,
  has_toilet_no:  { page: 3, x: 290, y: 622 } as Point,

  no_farming:  { page: 3, x: 200, y: 591 } as Point,
  yes_farming: { page: 3, x: 275, y: 591 } as Point,
  farm_lt_1:   { page: 3, x: 195, y: 575 } as Point,
  farm_1_5:    { page: 3, x: 295, y: 575 } as Point,
  farm_gt_5:   { page: 3, x: 410, y: 575 } as Point,

  water_bottled: { page: 3, x: 130, y: 551.6 } as Point,
  water_tap:     { page: 3, x: 255, y: 551.6 } as Point,
  water_well:    { page: 3, x: 330, y: 551.6 } as Point,
  water_rain:    { page: 3, x: 410, y: 551.6 } as Point,

  no_electricity:         { page: 3, x: 195, y: 532 } as Point,
  has_electricity:        { page: 3, x: 195, y: 512.3 } as Point,
  elec_generator_solar:   { page: 3, x: 268, y: 512.3 } as Point,
  elec_piggyback_battery: { page: 3, x: 380, y: 512.3 } as Point,
  elec_meter:             { page: 3, x: 478, y: 512.3 } as Point,

  no_vehicle:            { page: 3, x: 220, y: 492.6 } as Point,
  has_vehicle:           { page: 3, x: 360, y: 492.6 } as Point,
  car_personal:          { page: 3, x:  60, y: 476 } as Point,
  car_over_15:           { page: 3, x: 245, y: 476 } as Point,
  car_under_15:          { page: 3, x: 330, y: 476 } as Point,
  pickup:                { page: 3, x:  60, y: 460 } as Point,
  pickup_over_15:        { page: 3, x: 290, y: 460 } as Point,
  pickup_under_15:       { page: 3, x: 375, y: 460 } as Point,
  tractor:               { page: 3, x:  60, y: 444 } as Point,
  tractor_over_15:       { page: 3, x: 320, y: 444 } as Point,
  tractor_under_15:      { page: 3, x: 405, y: 444 } as Point,
  motorcycle_small_boat: { page: 3, x:  60, y: 428 } as Point,

  no_appliances:       { page: 3, x: 207, y: 394.4 } as Point,
  has_appliances:      { page: 3, x: 350, y: 394.4 } as Point,
  app_computer:        { page: 3, x: 195, y: 374.8 } as Point,
  app_air_conditioner: { page: 3, x: 266, y: 374.8 } as Point,
  app_flat_tv:         { page: 3, x: 308, y: 374.8 } as Point,
  app_washing_machine: { page: 3, x: 372, y: 374.8 } as Point,
  app_refrigerator:    { page: 3, x: 443, y: 374.8 } as Point,

  inst_type_gov_reg:    { page: 3, x: 165, y: 320 } as Point,
  inst_type_gov_noreg:  { page: 3, x: 265, y: 320 } as Point,
  inst_type_priv_reg:   { page: 3, x:  65, y: 305 } as Point,
  inst_type_priv_noreg: { page: 3, x: 245, y: 305 } as Point,
  inst_type_temple:     { page: 3, x: 365, y: 305 } as Point,
  inst_type_other:      { page: 3, x: 450, y: 305 } as Point,

  institution_name:           { page: 3, x: 100, y: 290.2 } as Point,
  institution_province:       { page: 3, x: 360, y: 290.2 } as Point,
  institution_director_name:  { page: 3, x: 140, y: 270 } as Point,
  institution_phone:          { page: 3, x: 420, y: 270 } as Point,
  institution_join_month:     { page: 3, x: 200, y: 252 } as Point,
  institution_join_year:      { page: 3, x: 300, y: 252 } as Point,
  stay_boarding:              { page: 3, x: 423, y: 252 } as Point,
  stay_weekly_return:         { page: 3, x:  60, y: 235 } as Point,

  help_cash:      { page: 3, x:  60, y: 205 } as Point,
  help_items:     { page: 3, x: 150, y: 205 } as Point,
  help_housing:   { page: 3, x: 230, y: 205 } as Point,
  help_food:      { page: 3, x: 330, y: 205 } as Point,
  help_transport: { page: 3, x: 410, y: 205 } as Point,
  help_education: { page: 3, x:  60, y: 190 } as Point,
  help_health:    { page: 3, x: 165, y: 190 } as Point,

  inst_cost_per_student: { page: 3, x: 260, y: 173 } as Point,
  inst_total_students:   { page: 3, x: 270, y: 156 } as Point,
  inst_annual_donations: { page: 3, x: 410, y: 138 } as Point,
  inst_land_rai:         { page: 3, x: 105, y: 121 } as Point,
  inst_land_ngan:        { page: 3, x: 180, y: 121 } as Point,
  inst_buildings:        { page: 3, x: 268, y: 121 } as Point,
  inst_vehicles:         { page: 3, x: 410, y: 121 } as Point,
  inst_wants_yes:        { page: 3, x: 150, y:  60 } as Point,
  inst_wants_no:         { page: 3, x: 195, y:  54.4 } as Point
};

export const PAGE4 = {
  travel_walk:               { page: 4, x: 173, y: 751.5 } as Point,
  travel_bicycle:            { page: 4, x: 230, y: 751.5 } as Point,
  travel_school_bus:         { page: 4, x: 295, y: 751.5 } as Point,
  travel_private_motorcycle: { page: 4, x: 372, y: 751.5 } as Point,
  travel_private_car:        { page: 4, x: 462, y: 751.5 } as Point,
  travel_private_boat:       { page: 4, x: 525, y: 751.5 } as Point,
  travel_motorcycle_taxi:    { page: 4, x: 130, y: 735 } as Point,
  travel_public_bus:         { page: 4, x: 250, y: 735 } as Point,
  travel_public_boat:        { page: 4, x: 410, y: 735 } as Point,

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

  photo_source_teacher:  { page: 4, x: 225, y: 571.3 } as Point,
  photo_source_student:  { page: 4, x: 405, y: 571.3 } as Point,
  photo_cat_house:       { page: 4, x: 120, y: 555 } as Point,
  photo_cat_institution: { page: 4, x: 280, y: 555 } as Point,
  photo_cat_school_sign: { page: 4, x: 410, y: 555 } as Point,
  reason_other_province: { page: 4, x:  60, y: 540 } as Point,
  reason_abroad:         { page: 4, x: 220, y: 540 } as Point,
  reason_not_permitted:  { page: 4, x: 370, y: 540 } as Point,

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
  sig_officer_name:     { page: 5, x: 380, y: 515 } as Point,

  principal_name:      { page: 5, x: 140, y: 483.3 } as Point,
  sig_principal:       { page: 5, x: 340, y: 440, w: 150, h: 40 } as BoxRect,
  sig_principal_name:  { page: 5, x: 380, y: 415 } as Point,

  sig_teacher:            { page: 5, x: 340, y: 340, w: 150, h: 40 } as BoxRect,
  sig_teacher_name:       { page: 5, x: 380, y: 315 } as Point,
  teacher_position_line1: { page: 5, x: 340, y: 295 } as Point,
  teacher_position_line2: { page: 5, x: 340, y: 280 } as Point,

  created_by:   { page: 5, x: 115, y: 153.7 } as Point,
  created_date: { page: 5, x: 305, y: 153.7 } as Point,
  printed_date: { page: 5, x: 145, y: 135.4 } as Point
};
