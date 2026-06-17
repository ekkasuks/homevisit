import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Students } from '../api/students';
import { Plus, Search, Trash2, Edit } from 'lucide-react';

export default function StudentList() {
  const [list, setList] = useState<any[]>([]);
  const [q, setQ] = useState('');
  const [err, setErr] = useState('');

  useEffect(() => { Students.list().then(setList).catch(e => setErr(e.message)); }, []);

  const filtered = list.filter(s =>
    !q || `${s.first_name} ${s.last_name} ${s.citizen_id || ''} ${s.grade_level || ''}`.toLowerCase().includes(q.toLowerCase()));

  const del = async (id: string) => {
    if (!confirm('ลบข้อมูลนักเรียนนี้?')) return;
    await Students.remove(id);
    setList(list.filter(s => s.student_id !== id));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">รายชื่อนักเรียน</h1>
        <Link to="/students/new" className="btn-pri"><Plus size={18} />เพิ่มนักเรียน</Link>
      </div>
      {err && <div className="card text-red-600 text-sm">{err}</div>}
      <div className="card space-y-3">
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input value={q} onChange={e => setQ(e.target.value)}
            placeholder="ค้นหาชื่อ/เลขประจำตัวประชาชน/ชั้น"
            className="input pl-9" />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-left text-slate-500 border-b">
              <tr><th className="py-2">ชื่อ-นามสกุล</th><th>ชั้น</th><th>โรงเรียน</th><th>เลข ปชช.</th><th></th></tr>
            </thead>
            <tbody className="divide-y">
              {filtered.map(s => (
                <tr key={s.student_id} className="hover:bg-slate-50">
                  <td className="py-2">
                    <Link to={`/students/${s.student_id}`} className="text-brand-700 font-medium">
                      {s.first_name} {s.last_name}
                    </Link>
                  </td>
                  <td>{s.grade_level}</td>
                  <td className="text-slate-500">{s.school_name}</td>
                  <td className="font-mono text-xs">{s.citizen_id}</td>
                  <td className="text-right">
                    <Link to={`/students/${s.student_id}`} className="inline-flex p-1"><Edit size={16} /></Link>
                    <button onClick={() => del(s.student_id)} className="inline-flex p-1 text-red-600"><Trash2 size={16} /></button>
                  </td>
                </tr>
              ))}
              {!filtered.length && <tr><td colSpan={5} className="text-center text-slate-400 py-8">ไม่พบข้อมูล</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
