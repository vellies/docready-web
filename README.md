# DocReady — eSeva Document Formatter

A web app that lets computer centers upload scanned images and instantly get government-ready files. Reduces per-user processing time from ~10 minutes to ~10 seconds.

## What it does

- Upload multiple scanned images at once
- Select a document preset (Passport Photo, Signature, Aadhaar, Certificate)
- Files are automatically resized, compressed, converted, and OCR-extracted
- Download processed files ready for government submission

## Presets

| Preset | Output | Size |
|---|---|---|
| Passport Photo | JPG, 200×200px | < 50 KB |
| Signature | JPG, 300×100px | — |
| Aadhaar | JPG | < 200 KB |
| Certificate | PDF + OCR text | — |

Custom overrides are available for any preset.

## Tech Stack

**Frontend** — `docready-web`
- Next.js 16, React 18, Tailwind CSS

**Backend** — `docready-api`
- Node.js + Express
- Multer (file uploads)
- Sharp (image processing)
- Tesseract.js (OCR)
- pdf-lib (PDF generation)

## Project Structure

```
doc-ready/
├── docready-web/       # Next.js frontend
│   ├── app/
│   ├── components/
│   └── lib/
└── docready-api/       # Express backend
    ├── server/
    ├── routes/
    ├── controllers/
    └── services/
```

## Getting Started

### Backend

```bash
cd docready-api
npm install
npm run dev       # starts with nodemon on default port
```

### Frontend

```bash
cd docready-web
npm install
npm run dev       # starts Next.js at http://localhost:3000
```

## Repositories

- Frontend: https://github.com/vellies/docready-web
- Backend: https://github.com/vellies/docready-api

## Processing Flow

1. Upload files
2. Select preset (or use custom mode)
3. Backend resizes, compresses, converts, and runs OCR
4. Download processed files as a ZIP
