require('dotenv').config({ path: require('path').join(__dirname, '../../.env') });
console.log("TELEGRAM_TOKEN:", process.env.TELEGRAM_TOKEN);
