# Automated Expense Tracker

Bot Telegram untuk mencatat pengeluaran dan pemasukan harian yang terintegrasi dengan Google Sheets dan NLP Gemini.

## Fitur
- **Input Alami (NLP):** Catat transaksi menggunakan bahasa manusia ("makan 20rb kemarin", "terima gaji 5jt").
- **Google Sheets:** Data tersimpan rapi di spreadsheet.
- **Kustomisasi:** Kelola kategori pengeluaran langsung dari bot.
- **Rekap & Laporan:** Lihat laporan keuangan harian, bulanan, atau total dengan tabel interaktif.
- **Manajemen Transaksi:** Hapus data berdasarkan tanggal.

## Setup
1. Pastikan Node.js terinstal.
2. Clone repo ini.
3. Buat file `.env` di direktori utama `expense-tracker/` dengan isi:
   ```env
   TELEGRAM_TOKEN=...
   GEMINI_API_KEY=...
   GOOGLE_SHEET_ID=...
   GOOGLE_CLIENT_EMAIL=...
   GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
   ```
4. Jalankan `npm install`.
5. Jalankan `npm run dev` untuk memulai bot.

## Struktur Proyek
- `src/`: Kode sumber utama.
- `src/diagnostics/`: Skrip pengujian dan diagnosa bot.
- `tasks/`: Dokumentasi PRD dan manajemen tugas.

## Lisensi
ISC
