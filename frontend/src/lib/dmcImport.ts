import * as XLSX from 'xlsx';

export interface DmcRow {
  student: any;
  guardian: any;
  household_status: any;
}

const FAMILY_STATUS_MAP: Record<string, string> = {
  'อยู่ด้วยกันจดทะเบียนสมรส': 'parents_together',
  'อยู่ด้วยกันไม่ได้จดทะเบียนสมรส': 'parents_together',
  'แยกกันอยู่': 'parents_separated',
  'หย่าร้าง': 'parents_divorced',
  'บิดาเสียชีวิต': 'father_deceased',
  'มารดาเสียชีวิต': 'mother_deceased',
  'เสียชีวิตทั้งคู่': 'both_deceased',
  'ทอดทิ้ง': 'abandoned'
};

const TRAVEL_MAP: Record<string, string> = {
  'เดิน': 'walk',
  'จักรยาน': 'bicycle',
  'รถโรงเรียน': 'school_bus',
  'จักรยานยนต์ส่วนตัว': 'private_motorcycle',
  'รถส่วนตัว': 'private_car',
  'พาหนะไม่เสียค่าโดยสาร': 'private_motorcycle',
  'พาหนะเสียค่าโดยสาร': 'public_bus'
};

const num = (v: any): number | undefined => {
  if (v === '' || v === null || v === undefined) return undefined;
  const n = Number(v);
  return isNaN(n) ? undefined : n;
};

const str = (v: any): string => (v === null || v === undefined ? '' : String(v).trim());

export function parseDmcFile(file: File): Promise<DmcRow[]> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = e => {
      try {
        const wb = XLSX.read(e.target!.result, { type: 'array' });
        const ws = wb.Sheets[wb.SheetNames[0]];
        const rows: any[][] = XLSX.utils.sheet_to_json(ws, { header: 1, defval: '' });
        if (rows.length < 2) return resolve([]);
        const headers = rows[0].map(h => str(h));
        const data = rows.slice(1).filter(r => str(r[2])); // need citizen_id
        resolve(data.map(r => mapRow(headers, r)));
      } catch (err) {
        reject(err);
      }
    };
    reader.onerror = reject;
    reader.readAsArrayBuffer(file);
  });
}

function mapRow(h: string[], r: any[]): DmcRow {
  const col = (name: string) => {
    const idx = h.indexOf(name);
    return idx >= 0 ? r[idx] : '';
  };

  const grade = `${str(col('ชั้น'))}/${str(col('ห้อง'))}`;
  const familyStatus = FAMILY_STATUS_MAP[str(col('สถานภาพสมรสของบิดามารดา'))] || 'parents_together';

  const travelMethodRaw = str(col('ลักษณะการเดินทางมาโรงเรียน'));
  const travelMethod = TRAVEL_MAP[travelMethodRaw];

  return {
    student: {
      school_name: str(col('ชื่อโรงเรียน')),
      first_name: str(col('ชื่อ')),
      last_name: str(col('นามสกุล')),
      grade_level: grade,
      citizen_id: str(col('เลขประจำตัวประชาชน')),
      family_status: familyStatus,
      lives_with: 'parents',
      household_size: 0,
      semester: '1',
      academic_year: '2569'
    },
    guardian: {
      first_name: str(col('ชื่อผู้ปกครอง')),
      last_name: str(col('นามสกุลผู้ปกครอง')),
      relationship: str(col('ความเกี่ยวข้องของผู้ปกครองกับนักเรียน')) || str(col('ความเกี่ยวข้องของผู้ปกครองกับน')),
      highest_education: '',
      occupation: str(col('อาชีพผู้ปกครอง')),
      phone: str(col('หมายเลขโทรศัพท์ของผู้ปกครอง')),
      citizen_id: str(col('หมายเลขบัตรประชาชนผู้ปกครอง'))
    },
    household_status: {
      house_no: str(col('เลขที่บ้าน (ที่อยู่ปัจจุบัน)')),
      moo: str(col('หมู่ (ที่อยู่ปัจจุบัน)')),
      road: str(col('ถนน (ที่อยู่ปัจจุบัน)')),
      subdistrict: str(col('ตำบล (ที่อยู่ปัจจุบัน)')),
      district: str(col('อำเภอ (ที่อยู่ปัจจุบัน)')),
      province: str(col('จังหวัด (ที่อยู่ปัจจุบัน)')),
      postal_code: str(col('รหัสไปรษณีย์ (ที่อยู่ปัจจุบัน)')),
      distance_km: num(col('ระยะทางจากบ้านถึงโรงเรียน (ถนนลาดยาง)')) || num(col('ระยะทางจากบ้านถึงโรงเรียน (ถนน')),
      travel_time_hours: (num(col('ระยะเวลาจากบ้านถึงโรงเรียน')) || 0) / 60,
      travel_methods: travelMethod ? [travelMethod] : []
    }
  };
}
