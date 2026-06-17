import { useEffect, useState } from 'react';
import { SettingsApi } from '../api/settings';
import { Save } from 'lucide-react';

export default function SettingsPage() {
  const [list, setList] = useState<any[]>([]);
  const [err, setErr] = useState('');

  const load = () => SettingsApi.list().then(setList).catch(e => setErr(e.message));
  useEffect(() => { load(); }, []);

  const save = async (key: string, value: string) => {
    await SettingsApi.set(key, value);
    load();
  };

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">ตั้งค่า</h1>
      {err && <div className="card text-red-600 text-sm">{err}</div>}
      <div className="card">
        <table className="w-full text-sm">
          <thead className="text-left text-slate-500 border-b">
            <tr><th className="py-2">Key</th><th>Value</th><th></th></tr>
          </thead>
          <tbody className="divide-y">
            {list.map(s => (
              <Row key={s.key} k={s.key} v={s.value} onSave={save} />
            ))}
            {!list.length && <tr><td colSpan={3} className="text-center text-slate-400 py-6">ยังไม่มีข้อมูลตั้งค่า</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Row({ k, v, onSave }: { k: string; v: string; onSave: (k: string, v: string) => void }) {
  const [val, setVal] = useState(v || '');
  return (
    <tr>
      <td className="font-mono text-xs py-2">{k}</td>
      <td><input className="input" value={val} onChange={e => setVal(e.target.value)} /></td>
      <td><button onClick={() => onSave(k, val)} className="btn-pri text-xs"><Save size={12} />บันทึก</button></td>
    </tr>
  );
}
