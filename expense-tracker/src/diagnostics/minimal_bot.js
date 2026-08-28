require('dotenv').config({ path: require('path').join(__dirname, '../../.env') });
const { Bot } = require('node-telegram-bot-api');

console.log("Memulai bot minimal...");

if (!process.env.TELEGRAM_TOKEN) {
    console.error("TELEGRAM_TOKEN tidak ditemukan!");
    process.exit(1);
}

const bot = new Bot(process.env.TELEGRAM_TOKEN, { polling: true });

bot.on('message', (msg) => {
  console.log("Pesan masuk:", msg.text);
  bot.sendMessage(msg.chat.id, "Halo! Bot aktif.");
});

bot.on('polling_error', (err) => {
  console.error("Polling error:", err);
});

console.log("Bot minimal berjalan. Kirim pesan ke bot untuk tes.");
