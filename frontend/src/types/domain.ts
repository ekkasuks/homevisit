export type FamilyStatus =
  | 'parents_together' | 'parents_separated' | 'parents_divorced'
  | 'father_deceased' | 'mother_deceased' | 'both_deceased' | 'abandoned';

export type LivesWith =
  | 'parents' | 'relatives' | 'alone' | 'caregiver_employer' | 'institution';

export interface Student {
  student_id?: string;
  school_name: string;
  school_affiliation: string;
  semester: string;
  academic_year: string;
  student_photo_url?: string;
  first_name: string;
  last_name: string;
  grade_level: string;
  citizen_id?: string;
  g_code?: string;
  family_status: FamilyStatus;
  lives_with: LivesWith;
  household_size: number;
  total_household_income?: number;
  income_per_capita?: number;
  created_at?: string;
  updated_at?: string;
  created_by?: string;
}

export interface Guardian {
  guardian_id?: string;
  student_id: string;
  first_name: string;
  last_name: string;
  relationship: string;
  highest_education: string;
  occupation: string;
  phone: string;
  citizen_id?: string;
  no_citizen_id?: boolean;
  has_state_welfare?: boolean;
}

export interface HouseholdMember {
  member_id?: string;
  student_id: string;
  row_no: number;
  full_name: string;
  relationship: string;
  citizen_id?: string;
  highest_education?: string;
  age?: number;
  has_disability?: boolean;
  has_chronic_disease?: boolean;
  income_salary?: number;
  income_agriculture?: number;
  income_business?: number;
  income_state_welfare?: number;
  income_other?: number;
  total_monthly_income?: number;
}

export interface HouseholdStatus {
  status_id?: string;
  student_id: string;
  has_dependency_burden?: boolean;
  dep_disability?: boolean;
  dep_chronic_disease?: boolean;
  dep_elderly_60plus?: boolean;
  dep_single_parent?: boolean;
  dep_unemployed_15_65?: boolean;
  housing_type?: 'own' | 'rent' | 'with_others' | 'dorm';
  rent_amount?: number;
  floor_material?: string[];
  wall_material?: string[];
  roof_material?: string[];
  has_toilet?: boolean;
  does_farming?: boolean;
  farm_land_size?: 'lt_1' | '1_to_5' | 'gt_5';
  water_sources?: string[];
  has_electricity?: boolean;
  electricity_type?: 'generator_solar' | 'piggyback_battery' | 'meter';
  has_vehicle?: boolean;
  car_personal?: 'none' | 'over_15' | 'under_15';
  pickup_truck?: 'none' | 'over_15' | 'under_15';
  tractor?: 'none' | 'over_15' | 'under_15';
  motorcycle_small_boat?: boolean;
  has_appliances?: boolean;
  app_computer?: boolean;
  app_air_conditioner?: boolean;
  app_flat_tv?: boolean;
  app_washing_machine?: boolean;
  app_refrigerator?: boolean;
  institution_type?: string;
  institution_name?: string;
  institution_province?: string;
  institution_director_name?: string;
  institution_phone?: string;
  institution_join_month?: string;
  institution_join_year?: string;
  institution_stay_type?: 'boarding' | 'weekly_return';
  institution_help_types?: string[];
  institution_cost_per_student?: number;
  institution_total_students?: number;
  institution_annual_donations?: number;
  institution_land_rai?: number;
  institution_land_ngan?: number;
  institution_buildings?: number;
  institution_vehicles?: number;
  institution_wants_subsidy?: boolean;
  travel_methods?: string[];
  distance_km?: number;
  travel_time_hours?: number;
  travel_cost_per_month?: number;
  daily_pocket_money?: number;
  house_no?: string;
  moo?: string;
  soi?: string;
  road?: string;
  subdistrict?: string;
  district?: string;
  province?: string;
  postal_code?: string;
}

export interface HomeVisit {
  visit_id?: string;
  student_id: string;
  visit_date: string;
  semester: string;
  academic_year: string;
  photo_source?: 'teacher' | 'student';
  photo_category?: 'house' | 'institution' | 'school_sign';
  photo_reason_other_province?: boolean;
  photo_reason_abroad?: boolean;
  photo_reason_not_permitted?: boolean;
  officer_name?: string;
  officer_citizen_id?: string;
  officer_position?: string;
  officer_certifies?: boolean;
  officer_reject_reason?: string;
  officer_signature_url?: string;
  principal_name?: string;
  principal_signature_url?: string;
  teacher_name?: string;
  teacher_position_line1?: string;
  teacher_position_line2?: string;
  teacher_signature_url?: string;
  student_signature_url?: string;
  student_signature_name?: string;
  guardian_signature_url?: string;
  guardian_signature_name?: string;
  status?: 'draft' | 'submitted' | 'approved';
}

export interface Photo {
  photo_id?: string;
  student_id: string;
  visit_id?: string;
  photo_type: 'student_portrait' | 'house_outside' | 'house_inside';
  drive_file_id?: string;
  drive_url?: string;
}

export interface FullBundle {
  student: Student;
  guardian: Guardian;
  household_members: HouseholdMember[];
  household_status: HouseholdStatus;
  home_visits: HomeVisit[];
  photos: Photo[];
}
