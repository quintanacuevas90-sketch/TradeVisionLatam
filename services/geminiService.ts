
import { GoogleGenAI, Chat, GenerateContentResponse, GroundingChunk } from "@google/genai";
import { ChatMode, GroundingSource } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// We use a Map to cache chat instances for different modes to maintain conversation history
const chatInstances = new Map<ChatMode, Chat>();

function getChatInstance(mode: ChatMode): Chat {
    if (!chatInstances.has(mode)) {
        let model;
        let config: any = {};

        switch (mode) {
            case ChatMode.Thinking:
                model = 'gemini-2.5-pro';
                config.thinkingConfig = { thinkingBudget: 32768 };
                break;
            case ChatMode.Grounded:
                model = 'gemini-2.5-flash';
                config.tools = [{ googleSearch: {} }];
                break;
            case ChatMode.Standard:
            default:
                model = 'gemini-2.5-flash';
                break;
        }

        chatInstances.set(mode, ai.chats.create({ model, config }));
    }
    return chatInstances.get(mode)!;
}

export const sendMessageToGemini = async (
    message: string,
    mode: ChatMode,
    onStream: (chunk: string, sources: GroundingSource[]) => void
): Promise<void> => {
    try {
        const chat = getChatInstance(mode);
        const result = await chat.sendMessageStream({ message });

        let fullText = "";
        let sources: GroundingSource[] = [];

        for await (const chunk of result) {
            const chunkText = chunk.text;
            fullText += chunkText;

            if (mode === ChatMode.Grounded && chunk.candidates?.[0]?.groundingMetadata?.groundingChunks) {
                const newSources = chunk.candidates[0].groundingMetadata.groundingChunks
                    .filter((c: GroundingChunk) => c.web)
                    .map((c: GroundingChunk) => ({
                        uri: c.web!.uri,
                        title: c.web!.title,
                    }));
                
                // Simple way to avoid duplicate sources
                newSources.forEach(ns => {
                    if (!sources.some(s => s.uri === ns.uri)) {
                        sources.push(ns);
                    }
                });
            }
            
            onStream(chunkText, sources);
        }
    } catch (error) {
        console.error("Error sending message to Gemini:", error);
        onStream("An error occurred. Please check the console for details.", []);
    }
};
