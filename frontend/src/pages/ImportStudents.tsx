import { useState } from 'react';
import { Upload, FileSpreadsheet, Check, X, Loader2 } from 'lucide-react';
import { parseDmcFile, DmcRow } from '../lib/dmcImport';
import { Students } from '../api/students';
import { Guardians } from '../api/guardians';
import { Status } from '../api/household';

export default function ImportStudents() {
  const [rows, setRows] = useState<DmcRow[]>([]);
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState({ done: 0, total: 0, errors: [] as string[] });
  const [err, setErr] = useState('');

  const onFile = async (file: File) => {
    setErr('');
    try {
      const parsed = await parseDmcFile(file);
      setRows(parsed);
      setSelected(new Set(parsed.map((_, i) => i)));
    } catch (e: any) {
      setErr(e.message || 'อ่านไฟล์ไม่สำเร็จ');
    }
  };

  const toggle = (i: number) => {
    const s = new Set(selected);
    s.has(i) ? s.delete(i) : s.add(i);
    setSelected(s);
  };

  const toggleAll = () => {
    if (selected.size === rows.length) setSelected(new Set());
    else setSelected(new Set(rows.map((_, i) => i)));
  };

  const importAll = async () => {
    const toImport = rows.filter((_, i) => selected.has(i));
    setBusy(true);
    setProgress({ done: 0, total: toImport.length, errors: [] });

    for (let i = 0; i < toImport.length; i++) {
      const row = toImport[i];
      try {
        const student: any = await Students.create(row.student);
        const sid = student.student_id;
        if (row.guardian.first_name) {
          await Guardians.upsert({ ...row.guardian, student_id: sid });
        }
        if (row.household_status.house_no) {
          await Status.upsert({ ...row.household_status, student_id: sid });
        }
        setProgress(p => ({ ...p, done: p.done + 1 }));
      } catch (e: any) {
        setProgress(p => ({
          ...p, done: p.done + 1,
          errors: [...p.errors, `${row.student.first_name} ${row.student.last_name}: ${e.message}`]
        }));
      }
    }

    setBusy(false);
    alert(`นำเข้าเสร็จ ${toImport.length} ราย`);
  };

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">นำเข้าข้อมูลนักเรียน (DMC)</h1>

      <div className="card space-y-3">
        <div className="flex items-start gap-2 text-sm text-slate-600">
          <FileSpreadsheet className="text-brand-600 shrink-0" />
          <div>
            <p>อัปโหลดไฟล์ Excel จากระบบ <strong>DMC</strong> (data.bopp-obec.info)</p>
            <p className="text-xs text-slate-500">รูปแบบไฟล์: studentInSchoolList.xlsx (91 คอลัมน์)</p>
          </div>
        </div>

        <label className="btn-pri inline-flex cursor-pointer w-fit">
          <Upload size={16} /> เลือกไฟล์ .xlsx
          <input type="file" accept=".xlsx,.xls" className="hidden"
            onChange={e => e.target.files?.[0] && onFile(e.target.files[0])} />
        </label>

        {err && <p className="text-red-600 text-sm">{err}</p>}
      </div>

      {rows.length > 0 && (
        <div className="card space-y-3">
          <div className="flex items-center justify-between">
            <div className="text-sm text-slate-600">
              พบ <strong>{rows.length}</strong> รายการ — เลือก <strong>{selected.size}</strong> รายการ
            </div>
            <div className="flex gap-2">
              <button onClick={toggleAll} className="btn-ghost text-sm">
                {selected.size === rows.length ? 'ยกเลิกทั้งหมด' : 'เลือกทั้งหมด'}
              </button>
              <button onClick={importAll} disabled={busy || !selected.size} className="btn-pri">
                {busy ? <Loader2 className="animate-spin" size={16} /> : <Check size={16} />}
                นำเข้า {selected.size} ราย
              </button>
            </div>
          </div>

          {busy && (
            <div className="bg-brand-50 rounded-lg p-3 text-sm">
              กำลังนำเข้า {progress.done}/{progress.total} ราย…
              <div className="w-full bg-white rounded-full h-2 mt-2">
                <div className="bg-brand-600 h-2 rounded-full transition-all"
                  style={{ width: `${(progress.done / progress.total) * 100}%` }} />
              </div>
            </div>
          )}

          {progress.errors.length > 0 && (
            <div className="bg-red-50 rounded-lg p-3 text-xs space-y-1">
              <div className="font-semibold text-red-700">เกิดข้อผิดพลาด {progress.errors.length} ราย:</div>
              {progress.errors.slice(0, 5).map((e, i) => <div key={i} className="text-red-600">• {e}</div>)}
            </div>
          )}

          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead className="text-left text-slate-500 border-b">
                <tr>
                  <th className="py-2 w-8"></th>
                  <th>ชื่อ-นามสกุล</th>
                  <th>ชั้น</th>
                  <th>เลข ปชช.</th>
                  <th>ผู้ปกครอง</th>
                  <th>สถานภาพ</th>
                  <th>ที่อยู่</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {rows.map((r, i) => (
                  <tr key={i} className={selected.has(i) ? '' : 'opacity-40'}>
                    <td className="py-2">
                      <input type="checkbox" checked={selected.has(i)} onChange={() => toggle(i)} />
                    </td>
                    <td>{r.student.first_name} {r.student.last_name}</td>
                    <td>{r.student.grade_level}</td>
                    <td className="font-mono">{r.student.citizen_id}</td>
                    <td>{r.guardian.first_name} {r.guardian.last_name} <span className="chip">{r.guardian.relationship}</span></td>
                    <td>{r.student.family_status}</td>
                    <td className="text-slate-500">{r.household_status.subdistrict} {r.household_status.district} {r.household_status.province}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
