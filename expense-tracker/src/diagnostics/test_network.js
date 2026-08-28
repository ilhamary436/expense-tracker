require('dotenv').config({ path: require('path').join(__dirname, '../../.env') });
const token = process.env.TELEGRAM_TOKEN;
const url = `https://api.telegram.org/bot${token}/getMe`;

console.log("Mencoba koneksi ke Telegram API...");
fetch(url)
    .then(res => res.json())
    .then(data => console.log("Hasil respons:", JSON.stringify(data, null, 2)))
    .catch(err => console.error("Error Koneksi:", err));
