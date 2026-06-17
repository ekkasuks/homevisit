import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../store/auth';
import { KeyRound } from 'lucide-react';

export default function PinPage() {
  const [pin, setPin] = useState('');
  const [err, setErr] = useState('');
  const verify = useAuth(s => s.verify);
  const nav = useNavigate();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (verify(pin)) nav('/');
    else setErr('PIN ไม่ถูกต้อง');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-brand-50 to-white p-4">
      <form onSubmit={submit} className="card w-full max-w-sm space-y-4">
        <div className="flex flex-col items-center gap-2">
          <div className="w-14 h-14 rounded-full bg-brand-50 flex items-center justify-center">
            <KeyRound className="text-brand-600" />
          </div>
          <h1 className="text-xl font-bold">ระบบเยี่ยมบ้านนักเรียน</h1>
          <p className="text-sm text-slate-500">กรุณาใส่รหัส PIN ประจำวัน</p>
        </div>
        <input
          autoFocus inputMode="numeric" maxLength={4}
          className="input text-center text-2xl tracking-widest"
          value={pin} onChange={e => { setPin(e.target.value); setErr(''); }}
          placeholder="••••"
        />
        {err && <p className="text-red-600 text-sm text-center">{err}</p>}
        <button className="btn-pri w-full">เข้าสู่ระบบ</button>
        <p className="text-xs text-center text-slate-400">PIN ใช้ได้ 1 วัน — ระบบจะถามใหม่พรุ่งนี้</p>
      </form>
    </div>
  );
}
