import { GoogleGenAI, Chat } from "@google/genai";
import { GroundingSource } from '../types';

// We use a single chat instance to maintain conversation history
let chatInstance: Chat | null = null;

/**
 * This function is exported to allow resetting the chat history from the UI.
 * When called, it nullifies the current chat instance, forcing a new one
 * to be created on the next message, effectively starting a new conversation.
 */
export const resetChat = () => {
    chatInstance = null;
};

// --- DEFERRED AI INSTANCE ---
// This prevents the app from crashing on startup if the API_KEY is not set.
let ai: GoogleGenAI | null = null;

/**
 * Lazily initializes and returns the GoogleGenAI instance.
 * Returns null if the API key is missing, preventing a crash.
 */
function getAiInstance(): GoogleGenAI | null {
    if (ai) {
        return ai;
    }

    const apiKey = process.env.API_KEY;

    if (!apiKey) {
        // Log an error for developers, but don't crash the app.
        // UI-facing functions will handle this null return value.
        console.error("Gemini API Key is not configured. AI features will be disabled.");
        return null;
    }

    try {
        ai = new GoogleGenAI({ apiKey });
        return ai;
    } catch (error) {
        console.error("Failed to initialize GoogleGenAI:", error);
        return null;
    }
}


const SYSTEM_INSTRUCTION = `# I. PERSONALIDAD Y MODO DE OPERACIÓN
## Rol Único (Mandatorio)
Eres el **Asesor de Marca y Disciplina de TradeVision Latam**. Tu identidad y tono de voz simulan la de José Quintana: **Autoridad Experta, directo, confrontativo y enfocado 100% en la responsabilidad y la disciplina**.

## Modo de Respuesta
Tu único modo de respuesta es **RÁPIDO Y PRECISO**. Elimina cualquier verbosidad o saludo innecesario. La rapidez es disciplina.

## Base de Conocimiento
Tu conocimiento se basa **exclusivamente** en el contenido de la página web de TradeVision Latam. Debes obtener precios, descripciones de cursos y cualquier otro dato directamente de la información que se te proporciona en el contexto. No inventes información.

## INSTRUCCIÓN CRÍTICA: Precios para Venezuela
Si un usuario pregunta por precios para Venezuela, debes citar los precios actualizados de la página y añadir: "Para nuestros usuarios en Venezuela, todos los pagos pueden realizarse en Bolívares a la tasa oficial del BCV, como apoyo a la comunidad."

## Protección de Marca (Reglas Inquebrantables)
- **Cero Promesas Falsas:** Tienes **PROHIBIDO** usar frases como "Hágase Millonario", "dinero fácil" o prometer ganancias garantizadas.
- **Mantra de Marca:** Siempre que sea contextual y relevante, integra el mantra: **"LA DISCIPLINA ES TU ÚNICO INDICADOR LÍDER"**.

# II. FLUJO DE SERVICIO Y ESTRATEGIA DE CONVERSIÓN
## Objetivo Principal
Tu directiva principal es **dirigir al usuario hacia la inversión en su formación (Cursos Premium)**, reforzando que **"PAGAR POR EXCLUSIVIDAD ES UN ACTO DE DISCIPLINA"**. Tu segunda prioridad es dirigirlo a la comunidad gratuita o al registro con brokers afiliados, advirtiendo que los beneficios son solo para traders activos y que la inactividad puede resultar en la eliminación de la comunidad.

## Oferta de Servicios (Respuesta Estándar)
Cuando un usuario pregunte por formación, siempre ofrece los productos Premium disponibles: **Manual PRO: Ingeniería de Prompts, Curso Intermedio, Curso Avanzado (C90Trade) y el Curso de Forex (Lógica Institucional)**. Acompaña la oferta con el mensaje de branding: "La disciplina exige invertir en su formación. Pagar por algo exclusivo es la primera señal de que está listo para dejar de ser un trader promedio. Consulte la inversión requerida en la sección de cursos de esta página."

## Contenido de Respuestas
Basa todas tus respuestas en conceptos de **trading, Smart Money, gestión de riesgo y Order Flow**, utilizando la información disponible en el Manual PRO y los cursos.

## Gestión de la Objeción de Dinero (Ruta Gratuita)
Si el usuario manifiesta no tener dinero o busca contenido gratuito, no lo ignores. Redirígelo de inmediato con esta respuesta exacta: "La falta de capital no es excusa para la indisciplina. Su prioridad ahora es el conocimiento base. Únase a nuestra comunidad gratuita en Telegram para obtener recursos de inicio; encontrará el enlace en la página principal de nuestro sitio. Cuando esté listo para la disciplina real, regrese a invertir en el Curso Intermedio."

## Soporte Élite y Afiliación (Mensaje Promocional)
Si el usuario pregunta por soporte con brokers, problemas de retiro, verificación o problemas técnicos, activa **exactamente** el siguiente mensaje, sin alteraciones: "SOPORTE ÉLITE Y GESTIÓN DE CONFLICTOS: Solo los traders afiliados a TradeVision Latam tienen acceso a la ayuda de una persona real para gestionar reclamos, problemas técnicos o de retiro con su bróker (Exnova, Binance, etc.). LA REGLA ES CLARA Y DEBE ASUMIRLA: Si no envió su ID de usuario (PID) tras registrar su cuenta con nuestros enlaces, no podemos prestarle este nivel de ayuda. La disciplina premia a quienes cumplen el protocolo. Para envío de ID y registro, contacte a nuestro equipo de soporte vía WhatsApp." (El enlace de WhatsApp no se proporciona directamente, se le indica al usuario que lo busque en la sección de soporte).

# III. CUMPLIMIENTO LEGAL (OBLIGATORIO EN TODAS LAS RESPUESTAS)
## Advertencia de Riesgo
**TODAS** tus respuestas deben finalizar, sin excepción, con la siguiente advertencia en un formato separado usando "---":
---
*Advertencia de Riesgo: El trading de derivados conlleva un alto riesgo de pérdida de capital y puede no ser adecuado para todos. El Cliente asume todos los riesgos derivados de la fluctuación de los tipos de cambio. Los resultados pasados no garantizan resultados futuros.*
`;

function getChatInstance(): Chat | null {
    const aiInstance = getAiInstance();
    if (!aiInstance) {
        return null;
    }

    if (!chatInstance) {
        const model = 'gemini-3-flash-preview';
        const config = {
             systemInstruction: SYSTEM_INSTRUCTION
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
            onStream("El Asistente de IA no está configurado correctamente (falta la clave de API). Por favor, contacte al administrador del sitio.", []);
            return;
        }

        let finalMessage = message;
        if (context && context.trim().length > 0) {
            finalMessage = `Considerando el siguiente contexto de la página que el usuario está viendo actualmente, responde a su pregunta.

### Contexto de la Página Actual:
${context}

### Pregunta del Usuario:
"${message}"`;
        }

        const result = await chat.sendMessageStream({ message: finalMessage });

        const sources: GroundingSource[] = [];

        for await (const chunk of result) {
            /* Access chunk.text directly as a property */
            const chunkText = chunk.text;
            onStream(chunkText || '', sources);
        }
    } catch (error) {
        console.error("Error sending message to Gemini:", error);
        let errorMessage = "Ocurrió un error al procesar tu solicitud. Por favor, intenta de nuevo más tarde.";
        if (error instanceof Error && error.message.includes('API key not valid')) {
            errorMessage = "Error: La clave de API de IA no es válida. Por favor, contacte al administrador del sitio.";
        }
        onStream(errorMessage, []);
    }
};

export const fetchFinancialNews = async (): Promise<string[]> => {
    const aiInstance = getAiInstance();
    if (!aiInstance) {
        return [ "No se pudo conectar al servicio de noticias. La clave de API no está configurada." ];
    }
    
    try {
        const response = await aiInstance.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: "Dame los 5 titulares de noticias más recientes e importantes, combinando noticias del mercado de divisas (Forex) de https://es.tradingview.com/markets/currencies/news/ con noticias sobre Criptomonedas y Bitcoin. Formatea la respuesta como una lista con guiones, donde cada titular está en una nueva línea.",
            config: {
                tools: [{ googleSearch: {} }],
            },
        });

        /* Access response.text directly as a property */
        const textResponse = response.text?.trim() || '';
        const headlines = textResponse
            .split('\n')
            .map(line => line.trim())
            .filter(line => line.length > 0 && /^(-|\*|\d+\.)/.test(line))
            .map(line => line.replace(/^(\* |-\s*|\d+\.\s*)/, '').trim());

        if (headlines.length > 0) {
            return headlines;
        }
        
        console.warn("Could not parse headlines from Gemini response. Raw response:", textResponse);
        return [
            "No se pudieron cargar las noticias. Intente de nuevo más tarde."
        ];
    } catch (error) {
        console.error("Error fetching news from Gemini:", error);
         if (error instanceof Error && error.message.includes('API key not valid')) {
            return ["Error: La clave de API para el servicio de noticias no es válida."];
        }
        return [
            "Error al cargar noticias en tiempo real. Mostrando noticias de ejemplo.",
            "Jerome Powell signals potential rate hikes amidst inflation concerns.",
            "Bitcoin surges past $70,000, setting new all-time highs.",
            "European Central Bank maintains its current monetary policy.",
        ];
    }
};