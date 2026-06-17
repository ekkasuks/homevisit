# System Architecture

```
┌─────────────────┐      HTTPS POST       ┌──────────────────────┐
│  React (Pages)  │ ────────────────────▶ │   Apps Script /exec  │
│  GitHub Pages   │ ◀──────────────────── │      (Web App)       │
└────────┬────────┘       JSON            └──────────┬───────────┘
         │                                            │
         │ pdf-lib                                    │ SpreadsheetApp
         │ (load /template.pdf,                       │ DriveApp
         │  fill, save)                               ▼
         │                              ┌─────────────────────────┐
         │                              │   Google Sheets (DB)    │
         │                              │   - students            │
         │                              │   - guardians           │
         │                              │   - household_members   │
         │                              │   - household_status    │
         │                              │   - home_visits         │
         │                              │   - photos              │
         │                              │   - settings            │
         │                              └─────────────────────────┘
         │
         │                              ┌─────────────────────────┐
         └────── fetch Drive URL ──────▶│   Google Drive          │
                 for photos             │   {student_id}/         │
                                        │   ├── portrait/         │
                                        │   └── visits/{vid}/     │
                                        └─────────────────────────┘
```

Auth: daily PIN stored in `localStorage` (`verifiedDate`).
Bundling: Vite → `dist/` → uploaded as Pages artifact by GitHub Action.
