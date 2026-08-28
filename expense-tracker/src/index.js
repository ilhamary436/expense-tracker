require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const { Telegraf, Markup } = require('telegraf');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const { appendExpense, getCategories, addCategory, deleteCategory, getExpenses, deleteByDate } = require('./sheets');

if (!process.env.TELEGRAM_TOKEN || !process.env.GEMINI_API_KEY) {
  console.error("❌ Token atau API Key tidak ditemukan!");
  process.exit(1);
}

const bot = new Telegraf(process.env.TELEGRAM_TOKEN);
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

console.log("--- BOT TELEGRAF INITIALIZATION START ---");
// NLP Function
async function parseExpense(text) {
  const today = new Date().toLocaleDateString('id-ID', { day: '2-digit', month: '2-digit', year: 'numeric' });

  const model = genAI.getGenerativeModel({ model: "gemini-3.1-flash-lite" });
  const prompt = `Ekstrak data transaksi dari teks berikut: "${text}". 
  Jika ada lebih dari satu transaksi, pisahkan menjadi beberapa objek.
  Berikan hasil dalam format JSON array dengan kunci: 
  - waktu (format "DD/MM/YYYY HH:mm", gunakan "${today} 12:00" jika tidak disebutkan, handle tanggal lampau seperti "kemarin"),
  - tipe ("Pemasukan" atau "Pengeluaran"),
  - nominal (angka saja), 
  - keterangan.

  Contoh input: "makan 20k, kemarin terima gaji 5000k"
  Contoh output: [{"waktu": "${today} 12:00", "tipe": "Pengeluaran", "nominal": 20000, "keterangan": "makan"}, {"waktu": "22/08/2026 12:00", "tipe": "Pemasukan", "nominal": 5000000, "keterangan": "terima gaji"}]`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const jsonString = response.text().replace(/```json|```/g, '').trim();
  return JSON.parse(jsonString);
}


// Commands
bot.command('help', (ctx) => {
  ctx.reply(`🤖 *Automated Expense Tracker - Help Menu*

Commands:
- /rekap : Melihat rekapitulasi keuangan
- /laporan : Laporan detail pemasukan/pengeluaran
- /hapus tanggal [DD] : Hapus semua transaksi di tanggal tertentu
- /help : Menampilkan menu bantuan

*Cara penggunaan:*
Kirim teks transaksi (misal: "makan 20k, kemarin terima gaji 5000k") untuk mencatat.`, { parse_mode: 'Markdown' });
});

bot.command('rekap', async (ctx) => {
    const expenses = await getExpenses(); 
    if (expenses.length === 0) return ctx.reply("Belum ada transaksi.");
    
    let totalMasuk = 0;
    let totalKeluar = 0;
    
    expenses.forEach(e => {
        if (e.tipe === 'Pemasukan') totalMasuk += Number(e.nominal);
        else totalKeluar += Number(e.nominal);
    });
    
    const saldo = totalMasuk - totalKeluar;
    
    let reportText = "📊 *Rekap Keuangan:*\n\n";
    reportText += `💰 Total Masuk: Rp ${totalMasuk.toLocaleString()}\n`;
    reportText += `💸 Total Keluar: Rp ${totalKeluar.toLocaleString()}\n\n`;
    reportText += `📈 *Saldo Akhir: Rp ${saldo.toLocaleString()}*`;
    
    ctx.reply(reportText, { parse_mode: 'Markdown' });
});

bot.command('laporan', (ctx) => {
    ctx.reply('Pilih jenis laporan:', Markup.inlineKeyboard([
        [Markup.button.callback('Pemasukan', 'laporan_Pemasukan'), Markup.button.callback('Pengeluaran', 'laporan_Pengeluaran')],
        [Markup.button.callback('Total', 'laporan_Total')]
    ]));
});

bot.command('hapus', async (ctx) => {
    const text = ctx.message.text;
    const datePart = text.split('tanggal ')[1];
    if (!datePart) return ctx.reply("❌ Format salah. Contoh: /hapus tanggal 18");
    
    const today = new Date();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();
    const dateString = `${datePart.padStart(2, '0')}/${month}/${year}`;
    
    const deletedCount = await deleteByDate(dateString);
    if (deletedCount >= 0) ctx.reply(`✅ Berhasil menghapus ${deletedCount} transaksi tanggal ${dateString}`);
    else ctx.reply("❌ Gagal menghapus transaksi.");
});

bot.action(/laporan_(.+)/, async (ctx) => {
    const filterType = ctx.match[1];
    let filter = {};
    if (filterType === 'Pemasukan' || filterType === 'Pengeluaran') {
        filter.tipe = filterType;
    }
    
    const expenses = await getExpenses(filter);
    if (expenses.length === 0) return ctx.answerCbQuery("Tidak ada data.");
    
    let total = 0;
    const rows = expenses.map(e => {
        const nominal = Number(e.nominal);
        if (e.tipe === 'Pemasukan') total += nominal;
        else total -= nominal;
        
        const typeLabel = e.tipe === 'Pemasukan' ? 'M' : 'K';
        const nominalStr = nominal.toLocaleString();
        
        // Memperlebar keterangan dan menyesuaikan padding
        const desc = e.keterangan.length > 15 ? e.keterangan.substring(0, 13) + '..' : e.keterangan.padEnd(15);
        
        return `${e.waktu.split(' ')[0]} | ${typeLabel} | ${nominalStr.padStart(8)} | ${desc}`;
    }).join('\n');
    
    let reportText = `📊 *Laporan ${filterType}:*\n\n`;
    reportText += '```\n';
    reportText += 'Tgl        | T | Nominal  | Keterangan\n';
    reportText += '-----------|---|----------|---------------\n';
    reportText += rows;
    reportText += '\n------------------------------------------\n';
    reportText += `Total Saldo: Rp ${total.toLocaleString()}`;
    reportText += '\n```';
    
    ctx.editMessageText(reportText, { parse_mode: 'Markdown' });
    ctx.answerCbQuery();
});

bot.on('text', async (ctx) => {
  const text = ctx.message.text;
  if (text.startsWith('/')) return;

  try {
    await ctx.reply("🔍 Menganalisis...");
    const parsedData = await parseExpense(text);
    const expenses = Array.isArray(parsedData) ? parsedData : [parsedData];
    
    for (const expense of expenses) {
        await appendExpense(expense);
    }
    
    const replyText = expenses.map(e => 
        `✅ *Berhasil dicatat:*\n` +
        `📅 *Waktu:* ${e.waktu}\n` +
        `📊 *Tipe:* ${e.tipe}\n` +
        `💰 *Nominal:* Rp ${e.nominal.toLocaleString()}\n` +
        `📝 *Keterangan:* ${e.keterangan}`
    ).join('\n\n');

    await ctx.reply(replyText, { parse_mode: 'Markdown' });
  } catch (error) {
    console.error("Error:", error);
    ctx.reply("❌ Terjadi kesalahan saat memproses data: " + error.message);
  }
});

bot.telegram.deleteWebhook().then(() => {
  bot.launch();
  console.log("--- BOT TELEGRAF BERJALAN & LISTENING ---");
}).catch(console.error);

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
