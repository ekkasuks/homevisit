# Deployment Guide

## ส่วนที่ 1 — Google Cloud Setup

### 1.1 สร้าง Google Sheet
1. ไปที่ https://sheets.google.com → New blank spreadsheet
2. ตั้งชื่อ: `HomeVisit_DB_2569`
3. คัดลอก **Sheet ID** จาก URL
   ```
   https://docs.google.com/spreadsheets/d/SHEET_ID_HERE/edit
   ```

### 1.2 สร้าง Google Drive Folder
1. https://drive.google.com → New → Folder → `HomeVisit_Photos`
2. คัดลอก Folder ID จาก URL
3. อัปโหลด `templates/template.pdf` เข้าโฟลเดอร์เดียวกัน → คัดลอก File ID

---

## ส่วนที่ 2 — Apps Script Backend

### 2.1 สร้างโปรเจกต์
1. https://script.google.com → New project → ตั้งชื่อ `HomeVisit_API`
2. คัดลอก `.gs` ทั้ง 10 ไฟล์จาก `backend/` เข้าโปรเจกต์
3. แก้ไข `Config.gs` ตรง 3 ค่า:
   ```javascript
   SPREADSHEET_ID: '<<paste>>',
   DRIVE_ROOT_FOLDER_ID: '<<paste>>',
   PDF_TEMPLATE_FILE_ID: '<<paste>>',
   ```

### 2.2 ติดตั้งฐานข้อมูล (ครั้งเดียว)
1. เลือกฟังก์ชัน `initializeDatabase` → กด **Run**
2. ยินยอม OAuth scopes (Sheets, Drive, External requests)
3. กลับไปที่ Sheet จะเห็นแท็บใหม่ครบ 7 แท็บ

### 2.3 Deploy เป็น Web App
1. **Deploy** → **New deployment** → Type: **Web app**
2. ตั้งค่า:
   - **Execute as:** Me
   - **Who has access:** Anyone
3. **Deploy** → คัดลอก URL ที่ลงท้ายด้วย `/exec`

> ⚠️ ทุกครั้งที่แก้โค้ดต้อง **New version** ใน Manage Deployments

---

## ส่วนที่ 3 — Frontend Local Dev

```bash
cd frontend
cp .env.example .env
# แก้ VITE_API_URL ในไฟล์ .env
npm install
npm run dev
```

เปิด http://localhost:5173 → ใส่ PIN `127`

---

## ส่วนที่ 4 — Deploy ขึ้น GitHub Pages

### 4.1 Push เข้า GitHub
```bash
cd /Users/eakkasakpreetiprasong/Desktop/homevisit
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/<user>/homevisit.git
git push -u origin main
```

### 4.2 ตั้งค่า Secrets
**Settings → Secrets and variables → Actions** เพิ่ม:

| Name | Value |
|---|---|
| `VITE_API_URL` | URL `/exec` |
| `VITE_DAILY_PIN` | `127` |

### 4.3 เปิด GitHub Pages
**Settings → Pages → Source: GitHub Actions**

### 4.4 Trigger Deploy
Push ไป `main` → GitHub Action รันอัตโนมัติ → เปิด URL:
```
https://<user>.github.io/homevisit/
```

---

## ส่วนที่ 5 — Calibrate PDF (ครั้งเดียวหลัง deploy)

1. ตั้ง `VITE_PDF_DEBUG=1` ใน Secrets → re-deploy
2. กรอกข้อมูลตัวอย่าง 1 ราย → Export PDF
3. ดู grid + จุดสีแดง/น้ำเงิน → ปรับค่าใน `src/pdf/coordinates.ts`
4. Push อีกครั้ง → ตั้ง `VITE_PDF_DEBUG=0`

---

## ส่วนที่ 6 — Maintenance

- **เปลี่ยน PIN รายวัน:** แก้ `daily_pin` ในแท็บ `settings` ของ Google Sheet หรือใน `Config.gs`
- **ดู Logs:** Apps Script → Executions
- **Backup:** Google Sheet → File → Version history
- **Quota:** Apps Script ฟรี 90 นาที execution/วัน
