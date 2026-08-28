require('dotenv').config({ path: require('path').join(__dirname, '../../.env') });
const { Bot } = require('node-telegram-bot-api');

console.log("Mencoba inisialisasi bot dengan token:", process.env.TELEGRAM_TOKEN);

try {
    const bot = new Bot(process.env.TELEGRAM_TOKEN, { polling: true });
    
    bot.on('polling_error', (err) => {
        console.error("Polling Error (ini penyebab bot mungkin mati):", err);
    });

    bot.on('message', (msg) => {
        console.log("Pesan diterima, bot bekerja!");
        bot.sendMessage(msg.chat.id, "Bot aktif!");
    });

    console.log("Bot sedang mendengarkan...");
} catch (e) {
    console.error("GAGAL INISIALISASI:", e);
}
