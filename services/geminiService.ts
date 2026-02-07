
import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import { GroundingSource } from '../types';

let chatInstance: Chat | null = null;

export const resetChat = () => {
    chatInstance = null;
};

let ai: GoogleGenAI | null = null;

function getAiInstance(): GoogleGenAI | null {
    if (ai) return ai;
const apiKey = typeof process !== 'undefined' && process.env ? process.env.API_KEY : '';    if (!apiKey) return null;
    try {
        ai = new GoogleGenAI({ apiKey });
        return ai;
    } catch (error) {
        return null;
    }
}

const SYSTEM_INSTRUCTION = `Eres "TradeVision Strategist", el mentor de élite de la academia TradeVision Latam. Tu misión es profesionalizar el trading en Latinoamérica.

REGLAS DE SEGURIDAD Y ÉTICA (MANDATORIO):
1. DISCLAIMER: Ante cualquier mención de inversiones, tu respuesta DEBE iniciar con: "⚠️ Nota: Soy una IA educativa. El trading conlleva un alto riesgo de pérdida de capital. No proporciono asesoramiento financiero ni señales de inversión."
2. FILTRO DE CALIDAD: Solo respondes sobre temas de Trading (Forex, Binarias, Cripto), Psicología, Gestión de Riesgo y el ecosistema de TradeVision Latam.
3. CONVERSIÓN: Transforma dudas técnicas en interés por nuestros cursos (Binarias Intermedio $79, Pro $199, Forex Élite $349).
4. ÉTICA DE AFILIADOS: Explica con orgullo que nuestros enlaces de afiliados financian la educación gratuita y que no gestionamos fondos de terceros.

TONO: Autoritario, clínico, directo y disciplinado. Estilo "Trading en la Zona".

DISCLAIMER FINAL:
---
*Advertencia: Contenido estrictamente educativo. Opere bajo su propia responsabilidad.*`;

function getChatInstance(): Chat | null {
    const aiInstance = getAiInstance();
    if (!aiInstance) return null;

    if (!chatInstance) {
        // Upgrade to Gemini 3 Pro for higher quality strategic advice
        const model = 'gemini-3-pro-preview';
        const config = { 
            systemInstruction: SYSTEM_INSTRUCTION,
            tools: [{ googleSearch: {} }] // Enable search grounding for the chat
        };
        chatInstance = aiInstance.chats.create({ model, config });
    }
    return chatInstance;
}

export const sendMessageToGemini = async (
    message: string,
    onStream: (chunk: string, sources: GroundingSource[]) => void,
    context?: string
): Promise<void> => {
    try {
        const chat = getChatInstance();
        if (!chat) {
            onStream("Sistema de IA no disponible. Contacte a soporte.", []);
            return;
        }

        let finalMessage = message;
        if (context) {
            finalMessage = `[CONTEXTO ACADÉMICO: ${context}]\n\nUSUARIO: ${message}`;
        }

        const result = await chat.sendMessageStream({ message: finalMessage });
        let fullSources: GroundingSource[] = [];

        for await (const chunk of result) {
            const response = chunk as GenerateContentResponse;
            
            // Extract grounding sources if available in this chunk
            const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
            if (chunks) {
                const newSources = chunks
                    .filter(c => c.web)
                    .map(c => ({
                        uri: c.web!.uri,
                        title: c.web!.title || 'Fuente de Información'
                    }));
                fullSources = [...fullSources, ...newSources];
            }

            onStream(response.text || '', fullSources);
        }
    } catch (error) {
        console.error("Gemini Chat Error:", error);
        onStream("Error de conexión con la red neuronal. Intente nuevamente.", []);
    }
};

export const fetchFinancialNews = async (): Promise<string[]> => {
    const aiInstance = getAiInstance();
    if (!aiInstance) return ["Sistema offline."];
    try {
        const response = await aiInstance.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: "Dame 5 titulares críticos y breves sobre el mercado de divisas (Forex) y Cripto para hoy. Solo los titulares.",
            config: { tools: [{ googleSearch: {} }] },
        });
        return response.text?.split('\n').filter(l => l.trim().length > 0).map(s => s.replace(/^\d+\.\s*/, '')) || ["Cargando datos de mercado..."];
    } catch (error) {
        return ["Error al sincronizar noticias."];
    }
};
