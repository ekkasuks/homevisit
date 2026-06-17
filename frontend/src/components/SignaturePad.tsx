import SignaturePadLib from 'signature_pad';
import { useEffect, useRef } from 'react';
import { Eraser } from 'lucide-react';

export default function SignaturePad({
  label, onChange
}: { label: string; onChange: (dataUrl: string) => void }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const padRef = useRef<SignaturePadLib | null>(null);

  useEffect(() => {
    if (!ref.current) return;
    const c = ref.current;
    c.width = c.offsetWidth;
    c.height = 160;
    const pad = new SignaturePadLib(c, { backgroundColor: '#fff' });
    pad.addEventListener('endStroke', () => onChange(pad.toDataURL('image/png')));
    padRef.current = pad;
  }, [onChange]);

  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between">
        <span className="label">{label}</span>
        <button type="button" onClick={() => { padRef.current?.clear(); onChange(''); }}
          className="text-xs inline-flex items-center gap-1 text-slate-500"><Eraser size={14} />ล้าง</button>
      </div>
      <canvas ref={ref} className="w-full border border-slate-300 rounded-lg bg-white touch-none" />
    </div>
  );
}
