# Automated Expense Tracker

Bot Telegram untuk mencatat pengeluaran dan pemasukan harian yang terintegrasi dengan Google Sheets dan NLP Gemini.

## Fitur
- **Input Alami (NLP):** Catat transaksi menggunakan bahasa manusia (misal: "makan 20rb kemarin", "terima gaji 5jt").
- **Google Sheets:** Data tersimpan rapi di spreadsheet.
- **Kustomisasi:** Kelola kategori pengeluaran langsung dari bot.
- **Rekap & Laporan:** Lihat laporan keuangan harian, bulanan, atau total dengan tabel interaktif.
- **Manajemen Transaksi:** Hapus data berdasarkan tanggal.

## Instalasi

### Prasyarat
- [Node.js](https://nodejs.org/) terinstal di sistem Anda.

### Langkah-langkah
1. **Clone repositori:**
   ```bash
   git clone <URL_REPOSITORI_GITHUB_ANDA>
   cd gemini-cli/expense-tracker
   ```

2. **Instal dependensi:**
   ```bash
   npm install
   ```

3. **Konfigurasi Environment:**
   Buat file `.env` di dalam folder `expense-tracker/` dan isi dengan kredensial Anda:
   ```env
   TELEGRAM_TOKEN=isi_token_bot_telegram_anda
   GEMINI_API_KEY=isi_api_key_gemini_anda
   GOOGLE_SHEET_ID=isi_id_google_sheet_anda
   GOOGLE_CLIENT_EMAIL=isi_email_service_account_anda
   GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nisi_private_key_anda\n-----END PRIVATE KEY-----\n"
   ```

## Cara Pemakaian

1. **Menjalankan Bot:**
   Gunakan perintah berikut untuk menjalankan bot:
   ```bash
   npm run dev
   ```

2. **Perintah Bot:**
   Kirim pesan ke bot Telegram Anda dengan format:
   - **Mencatat Transaksi:** Cukup ketik kalimat natural, contoh:
     - "Beli kopi 15000"
     - "Terima gaji 5000000"
     - "Bayar kos 500000 kemarin"
   - **Perintah Menu:**
     - `/rekap`: Melihat rekapitulasi keuangan (Total Masuk, Total Keluar, Saldo).
     - `/laporan`: Menampilkan pilihan laporan detail (Pemasukan/Pengeluaran/Total) dalam tabel.
     - `/hapus tanggal [DD]`: Menghapus semua transaksi pada tanggal tertentu di bulan berjalan.
     - `/help`: Menampilkan menu bantuan.

## Lisensi
ISC
