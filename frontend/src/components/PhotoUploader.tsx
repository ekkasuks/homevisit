import { useEffect, useRef, useState } from 'react';
import { Camera, X, RotateCw } from 'lucide-react';
import { Photos } from '../api/photos';

interface Props {
  studentId: string;
  visitId?: string;
  photoType: 'house_outside' | 'house_inside' | 'student_portrait';
  label: string;
  existingUrl?: string;
  onUploaded?: (url: string) => void;
}

const MAX_BYTES = 5 * 1024 * 1024;
const TARGET_W = 1280;

export default function PhotoUploader({
  studentId, visitId, photoType, label, existingUrl, onUploaded
}: Props) {
  const [preview, setPreview] = useState<string | null>(existingUrl || null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => { setPreview(existingUrl || null); }, [existingUrl]);

  const pick = () => fileRef.current?.click();

  const handle = async (file: File) => {
    setErr('');
    if (!file.type.startsWith('image/')) return setErr('ไฟล์ต้องเป็นรูปภาพ');
    if (file.size > MAX_BYTES) return setErr('ไฟล์ใหญ่เกิน 5 MB');

    setBusy(true);
    try {
      const resized = await resize(file, TARGET_W);
      const b64 = await toBase64(resized);
      setPreview(URL.createObjectURL(resized));
      const saved: any = await Photos.upload({
        student_id: studentId,
        visit_id: visitId,
        photo_type: photoType,
        filename: file.name,
        mime_type: 'image/jpeg',
        base64_data: b64
      });
      onUploaded?.(saved.drive_url);
    } catch (e: any) {
      setErr(e.message || 'อัปโหลดไม่สำเร็จ');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="border-2 border-dashed border-slate-300 rounded-2xl p-4 text-center space-y-2 bg-slate-50">
      <div className="text-sm font-medium text-slate-700">{label}</div>
      {preview ? (
        <div className="relative">
          <img src={preview} alt={label} className="w-full max-h-64 object-cover rounded-lg" />
          <button type="button" onClick={pick}
            className="absolute top-2 right-2 bg-white/90 rounded-full p-1.5 shadow hover:bg-white">
            <RotateCw size={16} />
          </button>
        </div>
      ) : (
        <button type="button" onClick={pick}
          className="w-full py-10 flex flex-col items-center gap-2 text-slate-500 hover:text-brand-600">
          <Camera size={32} />
          <span className="text-sm">แตะเพื่อถ่ายหรือเลือกรูป</span>
        </button>
      )}
      <input ref={fileRef} type="file" accept="image/*" capture="environment" className="hidden"
        onChange={e => e.target.files?.[0] && handle(e.target.files[0])} />
      {busy && <p className="text-xs text-brand-600">กำลังอัปโหลด…</p>}
      {err && <p className="text-xs text-red-600">{err}</p>}
      {preview && !busy && (
        <button type="button" onClick={() => { setPreview(null); onUploaded?.(''); }}
          className="text-xs text-red-600 inline-flex items-center gap-1">
          <X size={14} />ลบรูป
        </button>
      )}
    </div>
  );
}

async function resize(file: File, maxW: number): Promise<Blob> {
  const img = await fileToImage(file);
  const ratio = Math.min(1, maxW / img.width);
  const w = Math.round(img.width * ratio);
  const h = Math.round(img.height * ratio);
  const canvas = document.createElement('canvas');
  canvas.width = w; canvas.height = h;
  canvas.getContext('2d')!.drawImage(img, 0, 0, w, h);
  return new Promise<Blob>(res => canvas.toBlob(b => res(b!), 'image/jpeg', 0.85));
}

function fileToImage(file: File): Promise<HTMLImageElement> {
  return new Promise((res, rej) => {
    const img = new Image();
    img.onload = () => res(img);
    img.onerror = rej;
    img.src = URL.createObjectURL(file);
  });
}

function toBase64(blob: Blob): Promise<string> {
  return new Promise((res, rej) => {
    const r = new FileReader();
    r.onload = () => res(String(r.result).split(',')[1]);
    r.onerror = rej;
    r.readAsDataURL(blob);
  });
}
