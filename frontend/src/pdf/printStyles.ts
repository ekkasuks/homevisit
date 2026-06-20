export const PRINT_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Sarabun:wght@400;600;700&display=swap');

body { margin: 0; background: #ddd; }
.kasor-form { font-family: 'Sarabun', sans-serif; color: #000; font-size: 11pt; line-height: 1.4; }
.kasor-form * { box-sizing: border-box; }

.kasor-page {
  width: 210mm; min-height: 297mm;
  padding: 12mm 14mm; margin: 10mm auto;
  background: #fff; page-break-after: always;
  box-shadow: 0 0 8px rgba(0,0,0,.15);
  position: relative;
}
.kasor-page:last-child { page-break-after: auto; }

.kasor-form h1 { font-size: 14pt; text-align: center; margin: 0 0 4pt; font-weight: 700; }
.kasor-form h2 { font-size: 12pt; margin: 8pt 0 4pt; font-weight: 700; background: #f0f0f0; padding: 3pt 6pt; border-left: 3pt solid #000; }
.kasor-form h3 { font-size: 11pt; margin: 6pt 0 3pt; font-weight: 600; }

.kasor-form .row { display: flex; gap: 8pt; flex-wrap: wrap; margin: 2pt 0; align-items: baseline; }
.kasor-form .col { flex: 1; min-width: 0; }
.kasor-form .lbl { display: inline-block; font-weight: 600; margin-right: 4pt; }
.kasor-form .val { display: inline-block; border-bottom: 1px dotted #666; min-width: 80pt; padding: 0 4pt; min-height: 14pt; }

.kasor-form .chk { display: inline-block; width: 11pt; height: 11pt; border: 1px solid #000; vertical-align: -1pt; margin-right: 3pt; text-align: center; line-height: 10pt; font-size: 10pt; }
.kasor-form .chk.on::before { content: '✔'; }

.kasor-form .chk-group { display: flex; gap: 10pt 16pt; flex-wrap: wrap; margin: 2pt 0 6pt; }
.kasor-form .chk-group label { display: inline-flex; align-items: center; white-space: nowrap; }

.kasor-form table { width: 100%; border-collapse: collapse; font-size: 9pt; margin: 4pt 0; }
.kasor-form table th, .kasor-form table td { border: 1px solid #000; padding: 2pt 4pt; vertical-align: middle; }
.kasor-form table th { background: #e8e8e8; font-weight: 600; text-align: center; font-size: 8pt; }
.kasor-form table td.num { text-align: right; }
.kasor-form table td.ctr { text-align: center; }

.kasor-form .sig-box {
  border-bottom: 1px solid #000; height: 60pt; display: flex;
  align-items: flex-end; justify-content: center; padding-bottom: 2pt; margin-top: 14pt;
}
.kasor-form .sig-box img { max-height: 58pt; max-width: 100%; }
.kasor-form .sig-cap { text-align: center; font-size: 10pt; margin-top: 2pt; }

.kasor-form .photo-box {
  border: 1px solid #999; height: 220pt; display: flex;
  align-items: center; justify-content: center; background: #fafafa; overflow: hidden;
}
.kasor-form .photo-box img { max-width: 100%; max-height: 100%; object-fit: contain; }
.kasor-form .photo-caption { text-align: center; font-size: 10pt; margin-top: 4pt; font-weight: 600; }

.kasor-form .student-photo {
  position: absolute; top: 12mm; right: 14mm;
  width: 80pt; height: 100pt; border: 1px solid #999; overflow: hidden;
  display: flex; align-items: center; justify-content: center;
}
.kasor-form .student-photo img { max-width: 100%; max-height: 100%; object-fit: cover; }

.kasor-form .header-row { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8pt; padding-right: 100pt; }
.kasor-form .header-title { font-weight: 700; text-align: center; flex: 1; }

@media print {
  body { background: #fff !important; }
  .kasor-page { box-shadow: none !important; margin: 0 !important; }
  @page { size: A4; margin: 8mm; }
}
`;
