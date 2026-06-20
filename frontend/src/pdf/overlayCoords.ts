/**
 * Overlay coordinates (in px) for กสศ.01 HTML template.
 * Each page = 842px wide. Coords are relative to .page div.
 * Adjust by viewing template + editing here.
 */
export interface OL { page: number; x: number; y: number; w?: number; text?: boolean; check?: boolean; img?: boolean; }

export const OVERLAYS: Record<string, OL> = {
  // PAGE 1
  school_name:        { page: 1, x: 200, y: 130 },
  school_affiliation: { page: 1, x: 540, y: 130 },
  first_name:         { page: 1, x: 150, y: 160 },
  last_name:          { page: 1, x: 340, y: 160 },
  grade_level:        { page: 1, x: 545, y: 160 },
  citizen_id:         { page: 1, x: 245, y: 188 },

  fs_parents_together:  { page: 1, x: 175, y: 218, check: true },
  fs_parents_separated: { page: 1, x: 255, y: 218, check: true },
  fs_parents_divorced:  { page: 1, x: 350, y: 218, check: true },
  fs_father_deceased:   { page: 1, x: 440, y: 218, check: true },
  fs_mother_deceased:   { page: 1, x: 540, y: 218, check: true },
  fs_both_deceased:     { page: 1, x: 640, y: 218, check: true },
  fs_abandoned:         { page: 1, x: 760, y: 218, check: true },

  lw_parents:            { page: 1, x: 190, y: 245, check: true },
  lw_relatives:          { page: 1, x: 265, y: 245, check: true },
  lw_alone:              { page: 1, x: 320, y: 245, check: true },
  lw_caregiver_employer: { page: 1, x: 400, y: 245, check: true },
  lw_institution:        { page: 1, x: 500, y: 245, check: true },

  guardian_first_name:   { page: 1, x: 175, y: 278 },
  guardian_last_name:    { page: 1, x: 320, y: 278 },
  guardian_relationship: { page: 1, x: 530, y: 278 },
  guardian_occupation:   { page: 1, x:  95, y: 305 },
  guardian_phone:        { page: 1, x: 350, y: 305 },
  guardian_citizen_id:   { page: 1, x: 600, y: 305 },

  household_size:        { page: 1, x: 200, y: 360 },

  student_photo:         { page: 1, x: 740, y: 90, w: 90, img: true },

  // PAGE 3
  house_no:    { page: 3, x: 130, y: 220 },
  moo:         { page: 3, x: 240, y: 220, w: 50 },
  soi:         { page: 3, x: 320, y: 220, w: 100 },
  road:        { page: 3, x: 450, y: 220, w: 100 },
  subdistrict: { page: 3, x: 130, y: 247 },
  district:    { page: 3, x: 270, y: 247 },
  province:    { page: 3, x: 410, y: 247 },
  postal_code: { page: 3, x: 540, y: 247, w: 80 },

  distance_km:           { page: 3, x: 260, y: 130 },
  travel_time_hours:     { page: 3, x: 460, y: 130 },
  travel_cost_per_month: { page: 3, x: 280, y: 158 },
  daily_pocket_money:    { page: 3, x: 540, y: 158 },

  photo_outside:         { page: 3, x:  50, y: 380, w: 350, img: true },
  photo_inside:          { page: 3, x: 420, y: 380, w: 350, img: true },

  // PAGE 4 (signatures)
  sig_student:     { page: 4, x: 100, y: 130, w: 180, img: true },
  sig_guardian:    { page: 4, x: 400, y: 130, w: 180, img: true },
  sig_officer:     { page: 4, x: 400, y: 470, w: 180, img: true },
  sig_principal:   { page: 4, x: 400, y: 600, w: 180, img: true },

  officer_name:    { page: 4, x:  90, y: 250 },
  officer_position:{ page: 4, x:  90, y: 280 },
  principal_name:  { page: 4, x: 160, y: 580 },
  teacher_name:    { page: 4, x: 400, y: 720 }
};
