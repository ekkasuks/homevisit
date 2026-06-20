import { FAMILY_STATUS, LIVES_WITH, HOUSING_TYPE, FLOOR_MATERIAL, WALL_MATERIAL, ROOF_MATERIAL, WATER_SOURCES, ELECTRICITY_TYPE, TRAVEL_METHODS, INSTITUTION_TYPE, HELP_TYPES } from '../lib/enums';

interface Bundle {
  student: any; guardian: any;
  household_members: any[]; household_status: any;
  home_visits: any[]; photos: any[];
}
interface Props { bundle: Bundle; visit: any; photoUrls: Record<string, string>; }

const Chk = ({ on }: { on?: any }) => <span className={`chk ${on ? 'on' : ''}`} />;
const V  = ({ children, w }: any) => <span className="val" style={w ? { minWidth: w } : undefined}>{children || ''}</span>;
const fmt = (n: any) => (n == null || n === '' ? '' : Number(n).toLocaleString('th-TH'));
const fmtDate = (iso?: string) => {
  if (!iso) return '';
  const d = new Date(iso);
  if (isNaN(d.getTime())) return '';
  return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear() + 543}`;
};

export default function PrintableForm({ bundle, visit, photoUrls }: Props) {
  const s = bundle.student || {};
  const g = bundle.guardian || {};
  const h = bundle.household_status || {};
  const v = visit || {};
  const members = bundle.household_members || [];
  while (members.length < 10) members.push({ row_no: members.length + 1 });

  return (
    <div className="kasor-form">
      {/* PAGE 1: Header + Section 1 + Section 2 part 1 */}
      <div className="kasor-page">
        <div className="student-photo">
          {photoUrls.portrait && <img src={photoUrls.portrait} alt="" />}
        </div>
        <div className="header-row">
          <div className="header-title">
            <h1>แบบขอรับเงินอุดหนุนนักเรียนยากจน (กสศ.01)</h1>
            <div>ภาคเรียนที่ <V w={30}>{s.semester}</V> ปีการศึกษา <V w={40}>{s.academic_year}</V></div>
          </div>
        </div>

        <div className="row">
          <div className="col"><span className="lbl">โรงเรียน:</span><V>{s.school_name}</V></div>
          <div className="col"><span className="lbl">สังกัด:</span><V>{s.school_affiliation}</V></div>
        </div>

        <h2>ส่วนที่ 1 ข้อมูลนักเรียน</h2>
        <div className="row">
          <div><span className="lbl">ชื่อ:</span><V>{s.first_name}</V></div>
          <div><span className="lbl">นามสกุล:</span><V>{s.last_name}</V></div>
          <div><span className="lbl">ชั้น:</span><V w={50}>{s.grade_level}</V></div>
        </div>
        <div className="row">
          <div className="col"><span className="lbl">เลขประจำตัวประชาชน:</span><V w={150}>{s.citizen_id}</V></div>
        </div>

        <h3>1.5 สถานภาพครอบครัว</h3>
        <div className="chk-group">
          {Object.entries(FAMILY_STATUS).map(([k, l]) =>
            <label key={k}><Chk on={s.family_status === k} />{l}</label>)}
        </div>

        <h3>1.6 นักเรียนอาศัยอยู่กับ</h3>
        <div className="chk-group">
          {Object.entries(LIVES_WITH).map(([k, l]) =>
            <label key={k}><Chk on={s.lives_with === k} />{l}</label>)}
        </div>

        <h3>1.7-1.13 ข้อมูลผู้ปกครอง</h3>
        <div className="row">
          <div><span className="lbl">ชื่อ:</span><V>{g.first_name}</V></div>
          <div><span className="lbl">นามสกุล:</span><V>{g.last_name}</V></div>
          <div><span className="lbl">ความสัมพันธ์:</span><V w={80}>{g.relationship}</V></div>
        </div>
        <div className="row">
          <div><span className="lbl">การศึกษาสูงสุด:</span><V>{g.highest_education}</V></div>
          <div><span className="lbl">อาชีพ:</span><V>{g.occupation}</V></div>
        </div>
        <div className="row">
          <div><span className="lbl">เบอร์โทร:</span><V w={100}>{g.phone}</V></div>
          <div><span className="lbl">เลขประจำตัวประชาชน:</span><V w={150}>{g.citizen_id}</V></div>
          <label><Chk on={g.no_citizen_id} />ไม่มีเลขประจำตัวประชาชน</label>
        </div>
        <div><label><Chk on={g.has_state_welfare} />ได้สวัสดิการแห่งรัฐ</label></div>

        <h2>ส่วนที่ 2 สมาชิกครัวเรือน (รวม {s.household_size || ''} คน รวมตัวนักเรียน)</h2>
        <table>
          <thead>
            <tr>
              <th>ลำดับ</th><th>ชื่อ-นามสกุล</th><th>ความสัมพันธ์</th><th>เลข ปชช.</th>
              <th>การศึกษา</th><th>อายุ</th><th>พิการ</th><th>โรคเรื้อรัง</th>
              <th>เงินเดือน</th><th>เกษตร</th><th>ธุรกิจ</th><th>สวัสดิการ</th><th>อื่นๆ</th><th>รวม/เดือน</th>
            </tr>
          </thead>
          <tbody>
            {members.slice(0, 10).map((m, i) => {
              const total = ['income_salary','income_agriculture','income_business','income_state_welfare','income_other']
                .reduce((s, k) => s + Number(m[k] || 0), 0);
              return (
                <tr key={i}>
                  <td className="ctr">{i + 1}</td>
                  <td>{m.full_name || ''}</td>
                  <td>{m.relationship || ''}</td>
                  <td>{m.citizen_id || ''}</td>
                  <td>{m.highest_education || ''}</td>
                  <td className="ctr">{m.age || ''}</td>
                  <td className="ctr"><Chk on={m.has_disability} /></td>
                  <td className="ctr"><Chk on={m.has_chronic_disease} /></td>
                  <td className="num">{fmt(m.income_salary)}</td>
                  <td className="num">{fmt(m.income_agriculture)}</td>
                  <td className="num">{fmt(m.income_business)}</td>
                  <td className="num">{fmt(m.income_state_welfare)}</td>
                  <td className="num">{fmt(m.income_other)}</td>
                  <td className="num">{total ? fmt(total) : ''}</td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={13} className="num"><b>รวมรายได้ครัวเรือนต่อเดือน</b></td>
              <td className="num"><b>{fmt(s.total_household_income)}</b></td>
            </tr>
            <tr>
              <td colSpan={13} className="num"><b>รายได้เฉลี่ยต่อคน/เดือน</b></td>
              <td className="num"><b>{fmt(s.income_per_capita)}</b></td>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* PAGE 2: Section 3 + 4 */}
      <div className="kasor-page">
        <h2>ส่วนที่ 3 สถานะของครัวเรือน</h2>

        <h3>3.1 ภาระพึ่งพิงในครัวเรือน</h3>
        <div className="chk-group">
          <label><Chk on={!h.has_dependency_burden} />ไม่มี</label>
          <label><Chk on={h.has_dependency_burden} />มี</label>
        </div>
        {h.has_dependency_burden && (
          <div className="chk-group">
            <label><Chk on={h.dep_disability} />ผู้พิการ</label>
            <label><Chk on={h.dep_chronic_disease} />ผู้ป่วยเรื้อรัง</label>
            <label><Chk on={h.dep_elderly_60plus} />ผู้สูงอายุ 60+</label>
            <label><Chk on={h.dep_single_parent} />พ่อ/แม่เลี้ยงเดี่ยว</label>
            <label><Chk on={h.dep_unemployed_15_65} />ว่างงาน 15-65</label>
          </div>
        )}

        <h3>3.2 การอยู่อาศัย</h3>
        <div className="chk-group">
          {Object.entries(HOUSING_TYPE).map(([k, l]) =>
            <label key={k}><Chk on={h.housing_type === k} />{l}</label>)}
          {h.housing_type === 'rent' && <span>ค่าเช่า <V w={60}>{fmt(h.rent_amount)}</V> บาท/เดือน</span>}
        </div>

        <h3>3.3 วัสดุของบ้าน</h3>
        <div><b>พื้น:</b> <div className="chk-group">
          {Object.entries(FLOOR_MATERIAL).map(([k, l]) =>
            <label key={k}><Chk on={h.floor_material?.includes(k)} />{l}</label>)}
        </div></div>
        <div><b>ผนัง:</b> <div className="chk-group">
          {Object.entries(WALL_MATERIAL).map(([k, l]) =>
            <label key={k}><Chk on={h.wall_material?.includes(k)} />{l}</label>)}
        </div></div>
        <div><b>หลังคา:</b> <div className="chk-group">
          {Object.entries(ROOF_MATERIAL).map(([k, l]) =>
            <label key={k}><Chk on={h.roof_material?.includes(k)} />{l}</label>)}
        </div></div>
        <div><b>ห้องน้ำ:</b> <label><Chk on={h.has_toilet} />มี</label> <label><Chk on={h.has_toilet === false} />ไม่มี</label></div>

        <h3>3.4 การทำเกษตร</h3>
        <div className="chk-group">
          <label><Chk on={!h.does_farming} />ไม่ทำเกษตร</label>
          <label><Chk on={h.does_farming} />ทำเกษตร</label>
          {h.does_farming && <>
            <label><Chk on={h.farm_land_size === 'lt_1'} />น้อยกว่า 1 ไร่</label>
            <label><Chk on={h.farm_land_size === '1_to_5'} />1-5 ไร่</label>
            <label><Chk on={h.farm_land_size === 'gt_5'} />มากกว่า 5 ไร่</label>
          </>}
        </div>

        <h3>3.5 แหล่งน้ำดื่ม</h3>
        <div className="chk-group">
          {Object.entries(WATER_SOURCES).map(([k, l]) =>
            <label key={k}><Chk on={h.water_sources?.includes(k)} />{l}</label>)}
        </div>

        <h3>3.6 ไฟฟ้า</h3>
        <div className="chk-group">
          <label><Chk on={!h.has_electricity} />ไม่มีไฟฟ้า</label>
          <label><Chk on={h.has_electricity} />มีไฟฟ้า</label>
          {h.has_electricity && Object.entries(ELECTRICITY_TYPE).map(([k, l]) =>
            <label key={k}><Chk on={h.electricity_type === k} />{l}</label>)}
        </div>

        <h3>3.7 ยานพาหนะในครัวเรือน</h3>
        <div className="chk-group">
          <label><Chk on={!h.has_vehicle} />ไม่มี</label>
          <label><Chk on={h.has_vehicle} />มี</label>
        </div>
        {h.has_vehicle && (
          <div className="chk-group">
            <span>รถยนต์ส่วนบุคคล:</span>
            <label><Chk on={h.car_personal === 'over_15'} />อายุเกิน 15 ปี</label>
            <label><Chk on={h.car_personal === 'under_15'} />อายุไม่เกิน 15 ปี</label>
            <span>รถปิคอัพ:</span>
            <label><Chk on={h.pickup_truck === 'over_15'} />เกิน 15 ปี</label>
            <label><Chk on={h.pickup_truck === 'under_15'} />ไม่เกิน 15 ปี</label>
            <span>รถไถ:</span>
            <label><Chk on={h.tractor === 'over_15'} />เกิน 15 ปี</label>
            <label><Chk on={h.tractor === 'under_15'} />ไม่เกิน 15 ปี</label>
            <label><Chk on={h.motorcycle_small_boat} />รถจักรยานยนต์/เรือเล็ก</label>
          </div>
        )}

        <h3>3.8 ของใช้ในครัวเรือน</h3>
        <div className="chk-group">
          <label><Chk on={!h.has_appliances} />ไม่มี</label>
          <label><Chk on={h.has_appliances} />มี</label>
          {h.has_appliances && <>
            <label><Chk on={h.app_computer} />คอมพิวเตอร์</label>
            <label><Chk on={h.app_air_conditioner} />แอร์</label>
            <label><Chk on={h.app_flat_tv} />ทีวีจอแบน</label>
            <label><Chk on={h.app_washing_machine} />เครื่องซักผ้า</label>
            <label><Chk on={h.app_refrigerator} />ตู้เย็น</label>
          </>}
        </div>

        <h2>ส่วนที่ 4 ครัวเรือนสถาบัน (ถ้าใช่)</h2>
        <div className="chk-group">
          {Object.entries(INSTITUTION_TYPE).map(([k, l]) =>
            <label key={k}><Chk on={h.institution_type === k} />{l}</label>)}
        </div>
        <div className="row">
          <div><span className="lbl">ชื่อสถาบัน:</span><V>{h.institution_name}</V></div>
          <div><span className="lbl">จังหวัด:</span><V>{h.institution_province}</V></div>
        </div>
        <div className="row">
          <div><span className="lbl">ผู้อำนวยการ:</span><V>{h.institution_director_name}</V></div>
          <div><span className="lbl">โทร:</span><V>{h.institution_phone}</V></div>
        </div>
        <div className="chk-group">
          <b>ลักษณะการช่วยเหลือ:</b>
          {Object.entries(HELP_TYPES).map(([k, l]) =>
            <label key={k}><Chk on={h.institution_help_types?.includes(k)} />{l}</label>)}
        </div>
      </div>

      {/* PAGE 3: Section 5+6+7 */}
      <div className="kasor-page">
        <h2>ส่วนที่ 5 การเดินทางจากที่พักอาศัยไปโรงเรียน</h2>
        <div className="chk-group">
          {Object.entries(TRAVEL_METHODS).map(([k, l]) =>
            <label key={k}><Chk on={h.travel_methods?.includes(k)} />{l}</label>)}
        </div>
        <div className="row">
          <div><span className="lbl">ระยะทาง:</span><V w={60}>{fmt(h.distance_km)}</V> กิโลเมตร</div>
          <div><span className="lbl">ใช้เวลา:</span><V w={60}>{fmt(h.travel_time_hours)}</V> ชั่วโมง</div>
        </div>
        <div className="row">
          <div><span className="lbl">ค่าใช้จ่ายในการเดินทาง:</span><V w={80}>{fmt(h.travel_cost_per_month)}</V> บาท/เดือน</div>
          <div><span className="lbl">เงินที่ได้รับ:</span><V w={60}>{fmt(h.daily_pocket_money)}</V> บาท/วัน</div>
        </div>

        <h2>ส่วนที่ 6 ที่ตั้งที่พักอาศัย</h2>
        <div className="row">
          <div><span className="lbl">บ้านเลขที่:</span><V>{h.house_no}</V></div>
          <div><span className="lbl">หมู่:</span><V w={40}>{h.moo}</V></div>
          <div><span className="lbl">ตรอก/ซอย:</span><V>{h.soi}</V></div>
          <div><span className="lbl">ถนน:</span><V>{h.road}</V></div>
        </div>
        <div className="row">
          <div><span className="lbl">ตำบล:</span><V>{h.subdistrict}</V></div>
          <div><span className="lbl">อำเภอ:</span><V>{h.district}</V></div>
          <div><span className="lbl">จังหวัด:</span><V>{h.province}</V></div>
          <div><span className="lbl">ไปรษณีย์:</span><V w={60}>{h.postal_code}</V></div>
        </div>

        <h2>ส่วนที่ 7 ภาพถ่ายที่พักอาศัย</h2>
        <div className="chk-group">
          <label><Chk on={v.photo_source === 'teacher'} />คุณครูลงเยี่ยมบ้านด้วยตนเอง</label>
          <label><Chk on={v.photo_source === 'student'} />ให้นักเรียนถ่ายภาพมาให้</label>
        </div>

        <div className="row">
          <div className="col">
            <div className="photo-box">{photoUrls.outside && <img src={photoUrls.outside} alt="" />}</div>
            <div className="photo-caption">รูปที่ 1 ภายนอกที่พักอาศัย</div>
          </div>
          <div className="col">
            <div className="photo-box">{photoUrls.inside && <img src={photoUrls.inside} alt="" />}</div>
            <div className="photo-caption">รูปที่ 2 ภายในที่พักอาศัย</div>
          </div>
        </div>
      </div>

      {/* PAGE 4: Signatures + Certifications */}
      <div className="kasor-page">
        <h2>ส่วนที่ 9 ลายเซ็นรับรองข้อมูล</h2>
        <div className="row">
          <div className="col">
            <div className="sig-box">{v.student_signature_url && <img src={v.student_signature_url} alt="" />}</div>
            <div className="sig-cap">ลงชื่อ ({v.student_signature_name || ''})<br />นักเรียน</div>
          </div>
          <div className="col">
            <div className="sig-box">{v.guardian_signature_url && <img src={v.guardian_signature_url} alt="" />}</div>
            <div className="sig-cap">ลงชื่อ ({v.guardian_signature_name || ''})<br />ผู้ปกครอง</div>
          </div>
        </div>

        <h2>ส่วนที่ 10 การรับรองจากเจ้าหน้าที่</h2>
        <div className="row">
          <div><span className="lbl">ข้าพเจ้า:</span><V>{v.officer_name}</V></div>
          <div><span className="lbl">เลขประจำตัวประชาชน:</span><V w={150}>{v.officer_citizen_id}</V></div>
        </div>
        <div><span className="lbl">ตำแหน่ง:</span><V w={300}>{v.officer_position}</V></div>
        <div className="chk-group">
          <label><Chk on={v.officer_certifies === true} />ขอรับรอง</label>
          <label><Chk on={v.officer_certifies === false} />ไม่ขอรับรอง เพราะ</label>
          <V w={250}>{v.officer_reject_reason}</V>
        </div>

        <div className="row">
          <div className="col">
            <div className="sig-box">{v.officer_signature_url && <img src={v.officer_signature_url} alt="" />}</div>
            <div className="sig-cap">ลงชื่อ ({v.officer_name || ''})<br />เจ้าหน้าที่ของรัฐ</div>
          </div>
          <div className="col">
            <div className="sig-box">{v.principal_signature_url && <img src={v.principal_signature_url} alt="" />}</div>
            <div className="sig-cap">ลงชื่อ ({v.principal_name || ''})<br />ผู้อำนวยการสถานศึกษา</div>
          </div>
        </div>

        <div className="row">
          <div className="col" style={{ maxWidth: '50%' }}>
            <div className="sig-box">{v.teacher_signature_url && <img src={v.teacher_signature_url} alt="" />}</div>
            <div className="sig-cap">
              ลงชื่อ ({v.teacher_name || ''})<br />
              {v.teacher_position_line1 || 'ครูผู้เยี่ยมบ้าน/สำรวจข้อมูล'}<br />
              {v.teacher_position_line2 || ''}
            </div>
          </div>
        </div>

        <div style={{ marginTop: 30, fontSize: '9pt', color: '#666' }}>
          <div>ผู้บันทึกข้อมูล: {s.created_by || ''} &nbsp; วันที่บันทึก: {fmtDate(s.created_at)}</div>
          <div>วันที่พิมพ์เอกสาร: {fmtDate(new Date().toISOString())}</div>
        </div>
      </div>
    </div>
  );
}
