import { useEffect, useState } from 'react';
import { Students } from '../api/students';
import { Users, FileCheck2, Camera, AlertTriangle } from 'lucide-react';

export default function Dashboard() {
  const [stats, setStats] = useState({ total: 0, withVisit: 0, withPhotos: 0, pending: 0 });
  const [recent, setRecent] = useState<any[]>([]);
  const [err, setErr] = useState('');

  useEffect(() => {
    Students.list().then(list => {
      const arr = list || [];
      setStats({
        total: arr.length,
        withVisit: arr.filter((s: any) => s.has_visit).length,
        withPhotos: arr.filter((s: any) => s.student_photo_url).length,
        pending: arr.filter((s: any) => !s.total_household_income).length
      });
      setRecent(arr.slice(-5).reverse());
    }).catch(e => setErr(e.message));
  }, []);

  const cards = [
    { icon: Users, label: 'นักเรียนทั้งหมด', value: stats.total },
    { icon: FileCheck2, label: 'เยี่ยมบ้านแล้ว', value: stats.withVisit },
    { icon: Camera, label: 'มีรูปภาพ', value: stats.withPhotos },
    { icon: AlertTriangle, label: 'ข้อมูลไม่ครบ', value: stats.pending }
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">แดชบอร์ด</h1>
      {err && <div className="card text-red-600 text-sm">เชื่อมต่อ API ไม่ได้: {err}</div>}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {cards.map(c => (
          <div key={c.label} className="card">
            <div className="flex items-center gap-3">
              <c.icon className="text-brand-600" />
              <div>
                <div className="text-xs text-slate-500">{c.label}</div>
                <div className="text-2xl font-bold">{c.value}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="card">
        <h2 className="font-semibold mb-3">นักเรียนที่เพิ่มล่าสุด</h2>
        <ul className="divide-y">
          {recent.map(s => (
            <li key={s.student_id} className="py-2 flex justify-between text-sm">
              <span>{s.first_name} {s.last_name} — {s.grade_level}</span>
              <span className="chip">{s.school_name}</span>
            </li>
          ))}
          {!recent.length && <li className="py-2 text-slate-400 text-sm">ยังไม่มีข้อมูล</li>}
        </ul>
      </div>
    </div>
  );
}
