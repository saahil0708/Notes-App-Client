import { GoogleGenAI } from '@google/genai';

// Initialize the SDK. We use VITE_ prefix as this is a Vite project.
// The user added the API key to the .env file.
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

let ai = null;

if (apiKey) {
    ai = new GoogleGenAI({ apiKey: apiKey });
} else {
    console.error("VITE_GEMINI_API_KEY is not defined in the environment variables. Chatbot will not function correctly.");
}

/**
 * Sends a message history to the Gemini model and returns the response text.
 * @param {Array<{text: string, isBot: boolean}>} messages 
 * @returns {Promise<string>}
 */
export async function generateChatResponse(messages) {
    if (!ai) {
        throw new Error("Gemini API client is not initialized. Check your API key.");
    }

    try {
        // Format messages for the Gemini API
        // For simple text generation, we can convert the history into a single structured prompt,
        // or use the chat session features. We will use a structured prompt for simplicity.
        const formattedHistory = messages.map(msg =>
            `${msg.isBot ? 'Bot' : 'User'}: ${msg.text}`
        ).join('\n');

        const prompt = `You are a helpful customer support chatbot for our website.
Answer the user's latest query based on the preceding conversation history. Keep responses concise and helpful.

Conversation History:
${formattedHistory}

Bot:`;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });

        return response.text;
    } catch (error) {
        console.error("Error generating response from Gemini:", error);
        throw error;
    }
}
