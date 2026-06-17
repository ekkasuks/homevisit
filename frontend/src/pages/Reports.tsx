import { useEffect, useState } from 'react';
import { Students } from '../api/students';
import { Download } from 'lucide-react';

export default function Reports() {
  const [list, setList] = useState<any[]>([]);
  useEffect(() => { Students.list().then(setList).catch(() => {}); }, []);

  const bySchool: Record<string, number> = {};
  const byGrade: Record<string, number> = {};
  list.forEach(s => {
    bySchool[s.school_name || '-'] = (bySchool[s.school_name || '-'] || 0) + 1;
    byGrade[s.grade_level || '-'] = (byGrade[s.grade_level || '-'] || 0) + 1;
  });

  const downloadCSV = () => {
    if (!list.length) return;
    const cols = Object.keys(list[0]);
    const csv = [
      cols.join(','),
      ...list.map(r => cols.map(c => JSON.stringify(r[c] ?? '')).join(','))
    ].join('\n');
    const blob = new Blob(['﻿' + csv], { type: 'text/csv;charset=utf-8' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `students_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">รายงาน</h1>
        <button onClick={downloadCSV} className="btn-ghost"><Download size={16} />ดาวน์โหลด CSV</button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="card">
          <h2 className="font-semibold mb-2">จำนวนนักเรียนตามโรงเรียน</h2>
          <ul className="divide-y text-sm">
            {Object.entries(bySchool).map(([k, v]) =>
              <li key={k} className="py-1.5 flex justify-between"><span>{k}</span><span className="font-semibold">{v}</span></li>)}
          </ul>
        </div>
        <div className="card">
          <h2 className="font-semibold mb-2">จำนวนนักเรียนตามชั้น</h2>
          <ul className="divide-y text-sm">
            {Object.entries(byGrade).map(([k, v]) =>
              <li key={k} className="py-1.5 flex justify-between"><span>{k}</span><span className="font-semibold">{v}</span></li>)}
          </ul>
        </div>
      </div>
    </div>
  );
}
