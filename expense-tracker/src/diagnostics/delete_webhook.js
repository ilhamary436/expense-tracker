// Simpan sebagai src/delete_webhook.js
require('dotenv').config({ path: require('path').join(__dirname, '../../.env') });
const { Bot } = require('node-telegram-bot-api');
const bot = new Bot(process.env.TELEGRAM_TOKEN);
bot.deleteWebHook().then(() => console.log("Webhook dihapus! Silakan jalankan index.js lagi."));
