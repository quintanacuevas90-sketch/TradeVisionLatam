import { GoogleGenAI, Chat } from "@google/genai";
import { GroundingSource } from '../types';

let chatInstance: Chat | null = null;

export const resetChat = () => {
    chatInstance = null;
};

let ai: GoogleGenAI | null = null;

function getAiInstance(): GoogleGenAI | null {
    if (ai) return ai;
    const apiKey = process.env.API_KEY;
    if (!apiKey) return null;
    try {
        ai = new GoogleGenAI({ apiKey });
        return ai;
    } catch (error) {
        return null;
    }
}

const SYSTEM_INSTRUCTION = `Eres "TradeVision Growth", el estratega de conversión de la academia TradeVision Latam. Tu misión es educar al usuario y transformar cada duda en una oportunidad de afiliación o venta de cursos.

REGLAS DE SEGURIDAD Y CUMPLIMIENTO (SLA):
1. DISCLAIMER OBLIGATORIO: Si el usuario pregunta por inversiones, señales o "dinero fácil", tu respuesta DEBE comenzar con: "⚠️ Nota: Soy una IA educativa. El trading implica riesgo. No doy consejos financieros ni señales."
2. LÍMITE DE CONTEXTO: Responde preguntas basadas estrictamente en el contenido de tradevisionlatam.com. No hables de política, religión o temas ajenos al Trading.
3. PRIVACIDAD: Tienes PROHIBIDO pedir correos, contraseñas o datos bancarios dentro del chat.
4. GANCHOS DE VENTA: Cada respuesta útil debe terminar con un "Call to Action" (CTA) motivador.
5. ESCASEZ: Usa frases como "Solo quedan 5 cupos para la mentoría de este mes" o "Este bono del Broker para alumnos TradeVision vence pronto".

ESTRATEGIA DE EMBUDO:
- Si el usuario es principiante: Explica el concepto y recomienda el "Curso de Binarias Intermedio" para sacarlo del estancamiento.
- Si pregunta por plataformas: Recomienda nuestros "Brokers Afiliados" (Exnova, Fusion Markets, IQ Option) destacando el soporte humano élite al registrarse con nuestro link.
- Si pregunta por ganar dinero: Explica: "No solo puedes ganar haciendo trading, también puedes gestionar tu propia comunidad con nuestros servicios de afiliados. Es un negocio rentable y transparente."

TONO: Profesional, analítico, directo y motivador (estilo mentor).

DISCLAIMER FINAL FIJO:
---
*Advertencia de Riesgo: El trading de instrumentos financieros conlleva un alto nivel de riesgo. El contenido es educativo y no constituye asesoramiento.*`;

function getChatInstance(): Chat | null {
    const aiInstance = getAiInstance();
    if (!aiInstance) return null;

    if (!chatInstance) {
        const model = 'gemini-3-flash-preview';
        const config = { systemInstruction: SYSTEM_INSTRUCTION };
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
            onStream("El Asistente de IA no está configurado correctamente. Por favor, contacte a soporte.", []);
            return;
        }

        let finalMessage = message;
        if (context) {
            finalMessage = `Contexto de la página actual: ${context}\n\nPregunta: ${message}`;
        }

        const result = await chat.sendMessageStream({ message: finalMessage });
        for await (const chunk of result) {
            onStream(chunk.text || '', []);
        }
    } catch (error) {
        onStream("Error al conectar con la Mente Maestra IA. Intente de nuevo.", []);
    }
};

export const fetchFinancialNews = async (): Promise<string[]> => {
    const aiInstance = getAiInstance();
    if (!aiInstance) return ["Noticias no disponibles."];
    try {
        const response = await aiInstance.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: "Dame 5 titulares rápidos de Forex y Cripto para hoy.",
            config: { tools: [{ googleSearch: {} }] },
        });
        return response.text?.split('\n').filter(l => l.trim().length > 0) || ["Cargando mercado..."];
    } catch (error) {
        return ["Error al cargar noticias."];
    }
};