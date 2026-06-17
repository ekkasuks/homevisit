# Student Home Visit Management System

ระบบบริหารจัดการแบบขอรับเงินอุดหนุนนักเรียนยากจน (กสศ.01) — ครอบคลุมการเก็บข้อมูลครัวเรือน เยี่ยมบ้าน อัปโหลดภาพถ่าย ลายเซ็น และส่งออก PDF ที่ตรงกับแบบฟอร์มทางการ 100%

## คุณสมบัติ

- บันทึกข้อมูลนักเรียน ผู้ปกครอง สมาชิกครัวเรือน (สูงสุด 10 คน)
- บันทึกสถานะครัวเรือน 8 หัวข้อ + ข้อมูลสถาบัน
- อัปโหลดรูปภาพ 2 รูป (นอก/ใน) เก็บใน Google Drive
- ลายเซ็นดิจิทัล (นักเรียน/ผู้ปกครอง/เจ้าหน้าที่/ผอ./ครู)
- ส่งออก PDF ที่ใช้ template ต้นฉบับ
- ระบบ PIN รายวัน (PIN = 127)
- รองรับมือถือ (Mobile First)
- ฟรี 100% — Google Sheets + Drive + GitHub Pages

## Tech Stack

- **Frontend:** React 18 · TypeScript · Vite · TailwindCSS
- **Backend:** Google Apps Script (Web App)
- **Database:** Google Sheets
- **Storage:** Google Drive
- **PDF Engine:** pdf-lib + Sarabun font
- **Hosting:** GitHub Pages

## Quick Start

```bash
cd frontend
npm install
cp .env.example .env
# แก้ VITE_API_URL ในไฟล์ .env
npm run dev
```

ดู [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) สำหรับขั้นตอน deploy เต็ม

## License

MIT
