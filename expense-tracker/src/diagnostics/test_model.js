require('dotenv').config({ path: require('path').join(__dirname, '../../.env') });
const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function listModels() {
    try {
        // The SDK might not expose listModels directly easily, 
        // but we can try to fetch the list via the underlying API or just guess a safe model like 'gemini-pro'.
        // Since we cannot easily list, let's try 'gemini-pro' as it is a common standard.
        console.log("Trying 'gemini-pro'...");
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const result = await model.generateContent("Hello");
        console.log("Successfully used 'gemini-pro'!");
    } catch (e) {
        console.error("Failed with 'gemini-pro':", e.message);
        console.log("Trying 'gemini-1.5-pro'...");
        try {
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
            const result = await model.generateContent("Hello");
            console.log("Successfully used 'gemini-1.5-pro'!");
        } catch (e2) {
            console.error("Failed with 'gemini-1.5-pro':", e2.message);
        }
    }
}

listModels();
