import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Visits } from '../api/visits';
import { Students } from '../api/students';
import PhotoUploader from '../components/PhotoUploader';
import SignaturePad from '../components/SignaturePad';
import { Download, Eye, Printer, Save } from 'lucide-react';
import { exportPdf, previewPdf, printPdf } from '../pdf/fillPdf';

export default function HomeVisitForm() {
  const { id, vid } = useParams();
  const nav = useNavigate();
  const isNew = !vid;
  const form = useForm<any>({
    defaultValues: { student_id: id, photo_source: 'teacher', status: 'draft', semester: '1', academic_year: '2569' }
  });
  const [photos, setPhotos] = useState<Record<string, string>>({});

  useEffect(() => { if (vid) Visits.get(vid).then((d: any) => form.reset(d)); }, [vid]);

  const save = async (data: any) => {
    const saved: any = isNew ? await Visits.create(data) : await Visits.update(vid!, data);
    if (isNew) nav(`/students/${id}/visit/${saved.visit_id}`);
    else alert('บันทึกแล้ว');
  };

  const onExport = async (mode: 'download' | 'preview' | 'print') => {
    const bundle: any = await Students.full(id!);
    const visit = form.getValues();
    if (mode === 'download') return exportPdf(bundle, visit);
    if (mode === 'preview') return previewPdf(bundle, visit);
    return printPdf(bundle, visit);
  };

  const hasBothPhotos = !!(photos.house_outside && photos.house_inside);

  return (
    <form onSubmit={form.handleSubmit(save)} className="space-y-4">
      <h1 className="text-2xl font-bold">แบบเยี่ยมบ้าน</h1>

      <section className="card space-y-3">
        <h2 className="font-semibold">วันที่เยี่ยมบ้าน</h2>
        <input type="date" className="input" {...form.register('visit_date')} />
      </section>

      <section className="card space-y-3">
        <h2 className="font-semibold">7. ภาพถ่าย</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <label className="flex items-center gap-2"><input type="radio" value="teacher" {...form.register('photo_source')} />คุณครูลงเยี่ยมบ้านด้วยตนเอง</label>
          <label className="flex items-center gap-2"><input type="radio" value="student" {...form.register('photo_source')} />ให้นักเรียนถ่ายภาพมาให้</label>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <PhotoUploader studentId={id!} visitId={vid} photoType="house_outside"
            label="รูปที่ 1 ภาพถ่ายนอกที่พักอาศัยนักเรียน"
            onUploaded={url => setPhotos(p => ({ ...p, house_outside: url }))} />
          <PhotoUploader studentId={id!} visitId={vid} photoType="house_inside"
            label="รูปที่ 2 ภาพถ่ายภายในที่พักอาศัยนักเรียน"
            onUploaded={url => setPhotos(p => ({ ...p, house_inside: url }))} />
        </div>
        {!hasBothPhotos && <p className="text-xs text-amber-600">* กรุณาอัปโหลดรูป 2 ภาพ (นอก/ใน) ก่อนส่งออก PDF</p>}
      </section>

      <section className="card space-y-3">
        <h2 className="font-semibold">9. ลายเซ็น</h2>
        <SignaturePad label="ลายเซ็นนักเรียน" onChange={url => form.setValue('student_signature_url', url)} />
        <input className="input" placeholder="ชื่อนักเรียน (ในวงเล็บ)" {...form.register('student_signature_name')} />
        <SignaturePad label="ลายเซ็นผู้ปกครอง" onChange={url => form.setValue('guardian_signature_url', url)} />
        <input className="input" placeholder="ชื่อผู้ปกครอง (ในวงเล็บ)" {...form.register('guardian_signature_name')} />
      </section>

      <section className="card space-y-3">
        <h2 className="font-semibold">10. การรับรอง</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <input className="input" placeholder="ชื่อเจ้าหน้าที่ของรัฐ" {...form.register('officer_name')} />
          <input className="input" placeholder="เลขประจำตัวประชาชนเจ้าหน้าที่" {...form.register('officer_citizen_id')} />
          <input className="input" placeholder="ตำแหน่ง" {...form.register('officer_position')} />
          <label className="flex items-center gap-2"><input type="checkbox" {...form.register('officer_certifies')} /> ขอรับรอง</label>
          <input className="input sm:col-span-2" placeholder="เหตุผลไม่รับรอง (ถ้ามี)" {...form.register('officer_reject_reason')} />
        </div>
        <SignaturePad label="ลายเซ็นเจ้าหน้าที่รัฐ" onChange={url => form.setValue('officer_signature_url', url)} />

        <input className="input" placeholder="ชื่อผู้อำนวยการสถานศึกษา" {...form.register('principal_name')} />
        <SignaturePad label="ลายเซ็นผู้อำนวยการ" onChange={url => form.setValue('principal_signature_url', url)} />

        <input className="input" placeholder="ชื่อครูผู้เยี่ยมบ้าน" {...form.register('teacher_name')} />
        <input className="input" placeholder="ตำแหน่ง (บรรทัด 1)" {...form.register('teacher_position_line1')} />
        <input className="input" placeholder="ตำแหน่ง (บรรทัด 2)" {...form.register('teacher_position_line2')} />
        <SignaturePad label="ลายเซ็นครูผู้เยี่ยมบ้าน" onChange={url => form.setValue('teacher_signature_url', url)} />
      </section>

      <div className="flex flex-wrap gap-2">
        <button type="submit" className="btn-pri"><Save size={16} />บันทึก</button>
        <button type="button" onClick={() => onExport('preview')} className="btn-ghost"><Eye size={16} />ดูตัวอย่าง</button>
        <button type="button" onClick={() => onExport('download')} className="btn-ghost"><Download size={16} />ดาวน์โหลด PDF</button>
        <button type="button" onClick={() => onExport('print')} className="btn-ghost"><Printer size={16} />พิมพ์</button>
      </div>
    </form>
  );
}
