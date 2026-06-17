import { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Students } from '../api/students';
import { Guardians } from '../api/guardians';
import { Members, Status } from '../api/household';
import { FAMILY_STATUS, LIVES_WITH, HOUSING_TYPE } from '../lib/enums';
import { Save, Plus, Trash2 } from 'lucide-react';

export default function StudentDetail() {
  const { id } = useParams();
  const nav = useNavigate();
  const isNew = !id;
  const [tab, setTab] = useState<'student' | 'guardian' | 'members' | 'status' | 'visits'>('student');
  const [bundle, setBundle] = useState<any>(null);

  const sForm = useForm<any>({ defaultValues: { semester: '1', academic_year: '2569' } });
  const gForm = useForm<any>({});

  useEffect(() => {
    if (!isNew && id) {
      Students.full(id).then((d: any) => {
        setBundle(d);
        sForm.reset(d.student || {});
        gForm.reset(d.guardian || { student_id: id });
      });
    }
  }, [id]);

  const saveStudent = async (data: any) => {
    const saved: any = isNew ? await Students.create(data) : await Students.update(id!, data);
    if (isNew) nav(`/students/${saved.student_id}`);
    else alert('บันทึกแล้ว');
  };

  const saveGuardian = async (data: any) => {
    await Guardians.upsert({ ...data, student_id: id });
    alert('บันทึกผู้ปกครองแล้ว');
  };

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">{isNew ? 'เพิ่มนักเรียน' : 'ข้อมูลนักเรียน'}</h1>

      <div className="flex gap-1 overflow-x-auto border-b">
        {[
          ['student', 'ข้อมูลนักเรียน'],
          ['guardian', 'ผู้ปกครอง'],
          ['members', 'สมาชิกครัวเรือน'],
          ['status', 'สถานะครัวเรือน'],
          ['visits', 'การเยี่ยมบ้าน']
        ].map(([k, l]) => (
          <button key={k} disabled={isNew && k !== 'student'} onClick={() => setTab(k as any)}
            className={`px-4 py-2 text-sm whitespace-nowrap ${tab === k ? 'border-b-2 border-brand-600 text-brand-700 font-medium' : 'text-slate-500'} disabled:opacity-30`}>
            {l}
          </button>
        ))}
      </div>

      {tab === 'student' && (
        <form onSubmit={sForm.handleSubmit(saveStudent)} className="card space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div><label className="label">โรงเรียน</label><input className="input" {...sForm.register('school_name', { required: true })} /></div>
            <div><label className="label">สังกัด</label><input className="input" {...sForm.register('school_affiliation')} /></div>
            <div><label className="label">ชื่อ</label><input className="input" {...sForm.register('first_name', { required: true })} /></div>
            <div><label className="label">นามสกุล</label><input className="input" {...sForm.register('last_name', { required: true })} /></div>
            <div><label className="label">ชั้น</label><input className="input" {...sForm.register('grade_level')} /></div>
            <div><label className="label">เลขประจำตัวประชาชน / รหัส G</label><input className="input" {...sForm.register('citizen_id')} /></div>
            <div>
              <label className="label">สถานภาพครอบครัว</label>
              <select className="input" {...sForm.register('family_status')}>
                <option value="">-- เลือก --</option>
                {Object.entries(FAMILY_STATUS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
              </select>
            </div>
            <div>
              <label className="label">นักเรียนอาศัยอยู่กับ</label>
              <select className="input" {...sForm.register('lives_with')}>
                <option value="">-- เลือก --</option>
                {Object.entries(LIVES_WITH).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
              </select>
            </div>
            <div>
              <label className="label">จำนวนสมาชิกในครัวเรือน</label>
              <input type="number" className="input" {...sForm.register('household_size', { valueAsNumber: true })} />
            </div>
            <div>
              <label className="label">ภาคเรียน</label>
              <input className="input" {...sForm.register('semester')} />
            </div>
            <div>
              <label className="label">ปีการศึกษา (พ.ศ.)</label>
              <input className="input" {...sForm.register('academic_year')} />
            </div>
          </div>
          <button className="btn-pri"><Save size={16} />บันทึก</button>
        </form>
      )}

      {tab === 'guardian' && (
        <form onSubmit={gForm.handleSubmit(saveGuardian)} className="card space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div><label className="label">ชื่อผู้ปกครอง</label><input className="input" {...gForm.register('first_name')} /></div>
            <div><label className="label">นามสกุล</label><input className="input" {...gForm.register('last_name')} /></div>
            <div><label className="label">ความสัมพันธ์</label><input className="input" {...gForm.register('relationship')} /></div>
            <div><label className="label">การศึกษาสูงสุด</label><input className="input" {...gForm.register('highest_education')} /></div>
            <div><label className="label">อาชีพ</label><input className="input" {...gForm.register('occupation')} /></div>
            <div><label className="label">เบอร์โทร</label><input className="input" {...gForm.register('phone')} /></div>
            <div><label className="label">เลขประจำตัวประชาชน</label><input className="input" {...gForm.register('citizen_id')} /></div>
            <label className="flex items-center gap-2 mt-6"><input type="checkbox" {...gForm.register('no_citizen_id')} /> ไม่มีเลขประจำตัวประชาชน</label>
            <label className="flex items-center gap-2"><input type="checkbox" {...gForm.register('has_state_welfare')} /> ได้สวัสดิการแห่งรัฐ</label>
          </div>
          <button className="btn-pri"><Save size={16} />บันทึกผู้ปกครอง</button>
        </form>
      )}

      {tab === 'members' && <MembersTab studentId={id!} existing={bundle?.household_members || []} />}
      {tab === 'status' && <StatusTab studentId={id!} existing={bundle?.household_status} />}

      {tab === 'visits' && (
        <div className="card space-y-3">
          <Link to={`/students/${id}/visit/new`} className="btn-pri inline-flex"><Plus size={16} />เพิ่มการเยี่ยมบ้าน</Link>
          <ul className="divide-y">
            {(bundle?.home_visits || []).map((v: any) => (
              <li key={v.visit_id} className="py-2 flex justify-between text-sm">
                <Link className="text-brand-700" to={`/students/${id}/visit/${v.visit_id}`}>
                  {v.visit_date || 'ไม่ระบุวันที่'} — สถานะ: {v.status}
                </Link>
                <span className="chip">{v.semester}/{v.academic_year}</span>
              </li>
            ))}
            {!bundle?.home_visits?.length && <li className="text-slate-400 text-sm py-2">ยังไม่มีการเยี่ยมบ้าน</li>}
          </ul>
        </div>
      )}
    </div>
  );
}

function MembersTab({ studentId, existing }: { studentId: string; existing: any[] }) {
  const [rows, setRows] = useState<any[]>(existing.length ? existing : []);
  const add = () => rows.length < 10 && setRows([...rows, { row_no: rows.length + 1 }]);
  const update = (i: number, key: string, val: any) => {
    const r = [...rows]; r[i] = { ...r[i], [key]: val }; setRows(r);
  };
  const del = (i: number) => setRows(rows.filter((_, k) => k !== i).map((r, k) => ({ ...r, row_no: k + 1 })));
  const save = async () => {
    await Members.replaceAll(studentId, rows);
    alert('บันทึกสมาชิกครัวเรือนแล้ว');
  };

  return (
    <div className="card space-y-3">
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead className="text-slate-500 border-b">
            <tr>
              <th>#</th><th>ชื่อ-นามสกุล</th><th>ความสัมพันธ์</th><th>เลข ปชช.</th>
              <th>การศึกษา</th><th>อายุ</th><th>เงินเดือน</th><th>เกษตร</th><th>ธุรกิจ</th>
              <th>สวัสดิการ</th><th>อื่นๆ</th><th>รวม</th><th></th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {rows.map((r, i) => (
              <tr key={i}>
                <td className="text-center">{r.row_no}</td>
                <td><input className="input py-1" value={r.full_name || ''} onChange={e => update(i, 'full_name', e.target.value)} /></td>
                <td><input className="input py-1 w-20" value={r.relationship || ''} onChange={e => update(i, 'relationship', e.target.value)} /></td>
                <td><input className="input py-1" value={r.citizen_id || ''} onChange={e => update(i, 'citizen_id', e.target.value)} /></td>
                <td><input className="input py-1 w-20" value={r.highest_education || ''} onChange={e => update(i, 'highest_education', e.target.value)} /></td>
                <td><input type="number" className="input py-1 w-14" value={r.age || ''} onChange={e => update(i, 'age', Number(e.target.value))} /></td>
                <td><input type="number" className="input py-1 w-20" value={r.income_salary || ''} onChange={e => update(i, 'income_salary', Number(e.target.value))} /></td>
                <td><input type="number" className="input py-1 w-20" value={r.income_agriculture || ''} onChange={e => update(i, 'income_agriculture', Number(e.target.value))} /></td>
                <td><input type="number" className="input py-1 w-20" value={r.income_business || ''} onChange={e => update(i, 'income_business', Number(e.target.value))} /></td>
                <td><input type="number" className="input py-1 w-20" value={r.income_state_welfare || ''} onChange={e => update(i, 'income_state_welfare', Number(e.target.value))} /></td>
                <td><input type="number" className="input py-1 w-20" value={r.income_other || ''} onChange={e => update(i, 'income_other', Number(e.target.value))} /></td>
                <td className="font-semibold text-right">{
                  (Number(r.income_salary || 0) + Number(r.income_agriculture || 0) + Number(r.income_business || 0) + Number(r.income_state_welfare || 0) + Number(r.income_other || 0)).toLocaleString('th-TH')
                }</td>
                <td><button onClick={() => del(i)} className="text-red-600"><Trash2 size={14} /></button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex gap-2">
        <button onClick={add} className="btn-ghost" disabled={rows.length >= 10}><Plus size={14} />เพิ่มสมาชิก ({rows.length}/10)</button>
        <button onClick={save} className="btn-pri"><Save size={14} />บันทึกทั้งหมด</button>
      </div>
    </div>
  );
}

function StatusTab({ studentId, existing }: { studentId: string; existing: any }) {
  const form = useForm<any>({ defaultValues: existing || { student_id: studentId } });

  useEffect(() => { if (existing) form.reset(existing); }, [existing]);

  const save = async (data: any) => {
    await Status.upsert({ ...data, student_id: studentId });
    alert('บันทึกสถานะครัวเรือนแล้ว');
  };

  return (
    <form onSubmit={form.handleSubmit(save)} className="card space-y-6">
      <section>
        <h3 className="font-semibold mb-2">3.1 ภาระพึ่งพิง</h3>
        <label className="flex items-center gap-2"><input type="checkbox" {...form.register('has_dependency_burden')} /> ครัวเรือนมีภาระพึ่งพิง</label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 mt-2 text-sm">
          <label><input type="checkbox" {...form.register('dep_disability')} /> มีความพิการทางร่างกาย/สติปัญญา</label>
          <label><input type="checkbox" {...form.register('dep_chronic_disease')} /> มีโรคเรื้อรัง</label>
          <label><input type="checkbox" {...form.register('dep_elderly_60plus')} /> ผู้สูงอายุ 60+</label>
          <label><input type="checkbox" {...form.register('dep_single_parent')} /> พ่อ/แม่เลี้ยงเดี่ยว</label>
          <label><input type="checkbox" {...form.register('dep_unemployed_15_65')} /> มีคน 15-65 ปีที่ว่างงาน</label>
        </div>
      </section>

      <section>
        <h3 className="font-semibold mb-2">3.2 การอยู่อาศัย</h3>
        <select className="input mb-2" {...form.register('housing_type')}>
          <option value="">-- เลือก --</option>
          {Object.entries(HOUSING_TYPE).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
        </select>
        <input type="number" placeholder="ค่าเช่า บาท/เดือน" className="input" {...form.register('rent_amount', { valueAsNumber: true })} />
      </section>

      <section>
        <h3 className="font-semibold mb-2">6. ที่ตั้งที่พักอาศัย</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          <input placeholder="บ้านเลขที่" className="input" {...form.register('house_no')} />
          <input placeholder="หมู่ที่" className="input" {...form.register('moo')} />
          <input placeholder="ตรอก/ซอย" className="input" {...form.register('soi')} />
          <input placeholder="ถนน" className="input" {...form.register('road')} />
          <input placeholder="ตำบล/แขวง" className="input" {...form.register('subdistrict')} />
          <input placeholder="อำเภอ/เขต" className="input" {...form.register('district')} />
          <input placeholder="จังหวัด" className="input" {...form.register('province')} />
          <input placeholder="รหัสไปรษณีย์" className="input" {...form.register('postal_code')} />
        </div>
      </section>

      <button className="btn-pri"><Save size={16} />บันทึกสถานะครัวเรือน</button>
    </form>
  );
}
