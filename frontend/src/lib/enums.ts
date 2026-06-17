export const FAMILY_STATUS = {
  parents_together:  'พ่อแม่อยู่ด้วยกัน',
  parents_separated: 'พ่อแม่แยกกันอยู่',
  parents_divorced:  'พ่อแม่หย่าร้าง',
  father_deceased:   'พ่อเสียชีวิต/สาบสูญ',
  mother_deceased:   'แม่เสียชีวิต/สาบสูญ',
  both_deceased:     'เสียชีวิตทั้งคู่/สาบสูญ',
  abandoned:         'พ่อ/แม่ทอดทิ้ง'
} as const;

export const LIVES_WITH = {
  parents:            'พ่อ/แม่',
  relatives:          'ญาติ',
  alone:              'อยู่ลำพัง',
  caregiver_employer: 'ผู้อุปการะ/นายจ้าง',
  institution:        'ครัวเรือนสถาบัน'
} as const;

export const HOUSING_TYPE = {
  own:         'อยู่บ้านตนเอง/เจ้าของบ้าน',
  rent:        'อยู่บ้านเช่า',
  with_others: 'อยู่กับผู้อื่น/อยู่ฟรี',
  dorm:        'หอพัก'
} as const;

export const FLOOR_MATERIAL = {
  tile:       'กระเบื้อง/เซรามิค',
  parquet:    'ปาเก้/ไม้ขัดเงา',
  cement:     'ซีเมนต์เปลือย',
  wood_plank: 'ไม้กระดาน',
  vinyl:      'ไวนิล/กระเบื้องยาง/เสื่อน้ำมัน',
  bamboo:     'ไม้ไผ่',
  dirt_sand:  'ดิน/ทราย',
  other:      'อื่นๆ'
} as const;

export const WALL_MATERIAL = {
  cement_plaster: 'ฉาบซีเมนต์',
  brick_block:    'อิฐ/ก้อนปูน/อิฐบล็อก',
  zinc:           'สังกะสี',
  wood_plank:     'ไม้กระดาน',
  plywood:        'ไม้อัด',
  smartboard:     'สมาร์ทบอร์ด/ไฟเบอร์/ซีเมนต์บอร์ด',
  bamboo_wood:    'ไม้ไผ่/ท่อนไม้/เศษไม้',
  dirt:           'ดิน',
  vinyl_other:    'ไวนิลและอื่นๆ'
} as const;

export const ROOF_MATERIAL = {
  metal:               'โลหะ (สังกะสี/เหล็ก/อะลูมิเนียม)',
  tile:                'กระเบื้อง/เซรามิค',
  wood_plank:          'ไม้กระดาน',
  leaf_natural:        'ใบไม้/วัสดุธรรมชาติ',
  vinyl_paper_plastic: 'ไวนิล/กระดาษ/แผ่นพลาสติก',
  other:               'อื่นๆ'
} as const;

export const WATER_SOURCES = {
  bottled:              'น้ำดื่มบรรจุขวด/ตู้หยอดน้ำ',
  tap_water:            'น้ำประปา',
  well_groundwater:     'น้ำบ่อ/น้ำบาดาล',
  rain_mountain_stream: 'น้ำฝน/น้ำประปาภูเขา/ลำธาร'
} as const;

export const ELECTRICITY_TYPE = {
  generator_solar:   'เครื่องปั่นไฟ/โซลาเซลล์',
  piggyback_battery: 'ไฟต่อพ่วง/แบตเตอรี่',
  meter:             'ไฟบ้านหรือมิเตอร์'
} as const;

export const TRAVEL_METHODS = {
  walk:               'เดิน',
  bicycle:            'จักรยาน',
  school_bus:         'รถโรงเรียน',
  private_motorcycle: 'จักรยานยนต์ส่วนตัว',
  private_car:        'รถส่วนตัว',
  private_boat:       'เรือส่วนตัว',
  motorcycle_taxi:    'จักรยานยนต์รับจ้าง',
  public_bus:         'รถโดยสารประจำทาง/รับจ้าง',
  public_boat:        'เรือโดยสารประจำทาง/รับจ้าง'
} as const;

export const INSTITUTION_TYPE = {
  gov_registered:       'สถานสงเคราะห์รัฐ (จดทะเบียน)',
  gov_unregistered:     'สถานสงเคราะห์รัฐ (ไม่จดทะเบียน)',
  private_registered:   'มูลนิธิ/สถานสงเคราะห์เอกชน (จดทะเบียน)',
  private_unregistered: 'มูลนิธิ/สถานสงเคราะห์เอกชน (ไม่จดทะเบียน)',
  temple:               'วัด/ศาสนสถาน',
  other:                'อื่นๆ'
} as const;

export const HELP_TYPES = {
  cash:      'ให้เงินสด',
  items:     'ให้สิ่งของ',
  housing:   'ให้ที่พักอาศัย',
  food:      'ให้อาหาร',
  transport: 'ให้การเดินทาง',
  education: 'ดูแลด้านการศึกษา',
  health:    'ดูแลด้านสุขภาพ'
} as const;
