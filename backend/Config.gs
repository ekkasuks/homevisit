const CONFIG = {
  SPREADSHEET_ID: '<<PASTE_SHEET_ID>>',
  DRIVE_ROOT_FOLDER_ID: '<<PASTE_DRIVE_FOLDER_ID>>',
  PDF_TEMPLATE_FILE_ID: '<<PASTE_PDF_TEMPLATE_FILE_ID>>',
  DAILY_PIN: '127',
  SHEETS: {
    STUDENTS:          'students',
    GUARDIANS:         'guardians',
    HOUSEHOLD_MEMBERS: 'household_members',
    HOUSEHOLD_STATUS:  'household_status',
    HOME_VISITS:       'home_visits',
    PHOTOS:            'photos',
    SETTINGS:          'settings'
  }
};

const SHEET_HEADERS = {
  students: [
    'student_id','created_at','updated_at','printed_at','created_by',
    'school_name','school_affiliation','semester','academic_year',
    'student_photo_url','first_name','last_name','grade_level',
    'citizen_id','g_code','family_status','lives_with',
    'household_size','total_household_income','income_per_capita'
  ],
  guardians: [
    'guardian_id','student_id','first_name','last_name','relationship',
    'highest_education','occupation','phone','citizen_id',
    'no_citizen_id','has_state_welfare'
  ],
  household_members: [
    'member_id','student_id','row_no','full_name','relationship',
    'citizen_id','highest_education','age','has_disability','has_chronic_disease',
    'income_salary','income_agriculture','income_business',
    'income_state_welfare','income_other','total_monthly_income'
  ],
  household_status: [
    'status_id','student_id',
    'has_dependency_burden','dep_disability','dep_chronic_disease',
    'dep_elderly_60plus','dep_single_parent','dep_unemployed_15_65',
    'housing_type','rent_amount',
    'floor_material','wall_material','roof_material','has_toilet',
    'does_farming','farm_land_size',
    'water_sources',
    'has_electricity','electricity_type',
    'has_vehicle','car_personal','pickup_truck','tractor','motorcycle_small_boat',
    'has_appliances','app_computer','app_air_conditioner','app_flat_tv',
    'app_washing_machine','app_refrigerator',
    'institution_type','institution_name','institution_province',
    'institution_director_name','institution_phone',
    'institution_join_month','institution_join_year','institution_stay_type',
    'institution_help_types','institution_cost_per_student',
    'institution_total_students','institution_annual_donations',
    'institution_land_rai','institution_land_ngan',
    'institution_buildings','institution_vehicles','institution_wants_subsidy',
    'travel_methods','distance_km','travel_time_hours',
    'travel_cost_per_month','daily_pocket_money',
    'house_no','moo','soi','road','subdistrict','district','province','postal_code'
  ],
  home_visits: [
    'visit_id','student_id','visit_date','semester','academic_year',
    'photo_source','photo_category',
    'photo_reason_other_province','photo_reason_abroad','photo_reason_not_permitted',
    'officer_name','officer_citizen_id','officer_position',
    'officer_certifies','officer_reject_reason','officer_signature_url',
    'principal_name','principal_signature_url',
    'teacher_name','teacher_position_line1','teacher_position_line2','teacher_signature_url',
    'student_signature_url','student_signature_name',
    'guardian_signature_url','guardian_signature_name',
    'status','created_at','updated_at'
  ],
  photos: [
    'photo_id','student_id','visit_id','photo_type',
    'drive_file_id','drive_url','uploaded_at','uploaded_by',
    'file_size_bytes','mime_type'
  ],
  settings: ['key','value']
};
