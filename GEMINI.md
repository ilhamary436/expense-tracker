# Project Memory: gemini-cli

Setiap perubahan penting yang dilakukan pada proyek atau folder ini harus dicatat secara persisten di dalam folder ini (misalnya di dalam file ini atau dokumentasi memori yang relevan).

## Aturan & Konvensi
1. **Pencatatan Memori Persisten:** Rekam semua perubahan, aturan baru, atau keputusan proyek di dalam direktori `gemini-cli` ini.

## Riwayat Perubahan
- **2026-08-23:** Pembuatan folder `gemini-cli` dan inisialisasi berkas memori persisten (`GEMINI.md`).
- **2026-08-23:** Mengubah label 'ARCH LINUX' menjadi 'KALI HUNTER' di dalam file `/data/data/com.termux/files/home/.bashrc`.
- **2026-08-23:** Membuat file `TODO.md` untuk manajemen tugas proyek.
- **2026-08-23:** Membuat file `ARCHITECTURE.md` untuk dokumentasi arsitektur proyek.
- **2026-08-23:** Menyiapkan struktur untuk manajemen tugas dan PRD:
  - Membuat direktori `/tasks/` untuk menyimpan file PRD.
  - Menerapkan aturan pembuatan PRD: Tanyakan 3-5 pertanyaan klarifikasi sebelum membuat PRD, simpan sebagai `prd-[nama-fitur].md` di folder `/tasks/`.
- **2026-08-23:** Membuat PRD pertama: `prd-automated-expense-tracker.md` di direktori `/tasks/`.
- **2026-08-23:** Membuat file `WORKFLOWS.md` untuk dokumentasi alur kerja pengembangan.
- **2026-08-23:** Mengonfirmasi status proyek: Bot Telegram dan NLP sudah diimplementasikan. Langkah selanjutnya: Integrasi Google Sheets.
- **2026-08-23:** Berhasil mengimplementasikan integrasi Google Sheets (`src/sheets.js`) dan menghubungkannya dengan bot Telegram (`src/index.js`).
- **2026-08-23:** Catatan Penting: Jika terjadi error `403 Permission Denied` terkait API, pastikan Google Sheets API sudah diaktifkan di Google Cloud Console untuk proyek terkait.
- **2026-08-23:** Implementasi Fase 1: Penambahan fitur `Kustomisasi Kategori` dengan membaca dari sheet 'Kategori' dan perintah `/categories`.
- **2026-08-23:** Implementasi Fase 3 & 4: Penambahan fitur `Ringkasan Laporan` (/report) dan `Manajemen Kategori` (/addcategory, /delcategory). Proyek Automated Expense Tracker kini sudah fungsional sesuai PRD.
- **2026-08-23:** Implementasi Fitur Filter & Laporan Interaktif: Penambahan command `/laporan` dengan menu Inline Keyboard untuk memfilter pemasukan/pengeluaran berdasarkan tipe atau bulan.
- **2026-08-23:** Peningkatan Estetika Laporan: Mengubah format laporan menjadi tabel (monospaced) dan menambahkan dukungan filter tanggal spesifik (`DD/MM/YYYY`) di `getExpenses`.
- **2026-08-23:** Restrukturisasi Perintah Laporan: Mengembalikan perintah `/laporan` ke format gabungan (Pemasukan & Pengeluaran) dalam satu tabel, dan memindahkan logika filter ke `/rekap`.
- **2026-08-23:** Optimasi Menu Laporan: Memperbarui perintah `/laporan` untuk menggunakan Inline Keyboard dengan 3 opsi: Pemasukan, Pengeluaran, dan Total (Gabungan).
- **2026-08-23:** Fitur Hapus Transaksi: Implementasi command `/hapus tanggal [DD]` untuk menghapus seluruh transaksi pada tanggal tertentu di bulan berjalan.
- **2026-08-23:** Menginstal `nodemon` dan menambahkan skrip `npm run dev` untuk mempermudah pengembangan (restart otomatis saat kode berubah).
- **2026-08-23:** Implementasi perintah `/help` untuk menampilkan menu bantuan.
