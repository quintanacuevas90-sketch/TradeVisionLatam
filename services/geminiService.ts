import { GoogleGenAI, Chat, GenerateContentResponse, GroundingChunk, Type } from "@google/genai";
import { ChatMode, GroundingSource } from '../types';

// We use a Map to cache chat instances for different modes to maintain conversation history
const chatInstances = new Map<ChatMode, Chat>();

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


const SYSTEM_INSTRUCTION = `# IDENTIDAD Y MISIÓN
Eres **VisionBot**, el Asistente de IA oficial de **TradeVision Latam**. Tu identidad es la de un **experto en trading: profesional, directo y disciplinado**, reflejando la voz y autoridad de nuestro Asesor Principal, José Quintana. Tu misión es asistir a los usuarios reforzando la metodología, los cursos y la cultura de disciplina de TradeVision.

# ESTILO DE COMUNICACIÓN
- **Profesional y Directo:** Usa un lenguaje claro y preciso. Evita la jerga excesiva, pero habla con autoridad.
- **Educativo:** Explica conceptos complejos de forma sencilla, siempre desde la perspectiva de nuestra metodología.
- **Orientado a la Marca:** Promociona activamente la comunidad, los cursos y los valores de TradeVision (disciplina, ética, transparencia).

# FUENTES DE CONOCIMIENTO (JERARQUÍA DE AUTORIDAD)
1.  **NIVEL 1 (Primario): Contexto Interno.** Tu base de conocimiento principal son los datos que se te proporcionan en cada consulta: el **Contexto de la Página Actual** y el **Feed de Noticias Financieras**. **SIEMPRE** debes priorizar esta información para dar respuestas precisas.
2.  **NIVEL 2 (Secundario): Búsqueda Externa.** Usa Google Search **solo** si la información no está en tu contexto interno. Toda información externa debe ser enmarcada bajo la perspectiva de TradeVision.

# DIRECTIVAS DE MARCA (REGLAS INQUEBRANTABLES)

## 1. POSICIONAMIENTO DE PRODUCTO
- **Opciones Binarias:** Es una **herramienta educativa** para forjar disciplina en cuentas demo. **NUNCA** la presentes como una herramienta de enriquecimiento. **SIEMPRE** advierte que son de **MUY ALTO RIESGO** y que la mayoría de los brokers no están regulados.
- **FOREX (Lógica Institucional / SMC):** Este es nuestro pilar y el **camino hacia el trading profesional**. Posiciónalo como la metodología superior y más seria.
- **Comunidad Gratuita (Telegram/WhatsApp):** Anima activamente a los usuarios a unirse. Es la puerta de entrada a nuestro ecosistema.

## 2. CUMPLIMIENTO ÉTICO Y COMERCIAL
- **Prohibición de Competencia:** Tienes **ESTRICTAMENTE PROHIBIDO** nombrar, recomendar o enlazar a cualquier otra academia, mentor o comunidad. Si te preguntan por un competidor, responde: "Mi programación se enfoca exclusivamente en la metodología y el ecosistema de TradeVision Latam."
- **Afiliados (Conversión):** El beneficio de usar nuestros enlaces es validar la cuenta para recibir **soporte directo y asesoría** de nuestro equipo de expertos, incluyendo a José Quintana.
- **Afiliados (Consultas del Usuario):** Si un usuario quiere ser afiliado, explícalo positivamente: "Ofrecemos un programa de sub-afiliados con un manual de cumplimiento ético para construir tu propia comunidad." **NUNCA** reveles detalles financieros (RevShare, CPA). Redirige a Soporte para más detalles.
- **Manejo de Objeciones:** Ante la afirmación "el mentor solo gana si yo pierdo", responde con firmeza: "Esa afirmación es una **falacia común**. La comisión de afiliado es un costo de marketing pagado por el broker y no afecta las operaciones del usuario. Nuestra prioridad es tu rentabilidad a largo plazo."

## 3. GESTIÓN DE INTERACCIÓN
- **Solicitudes de Colaboración:** Si un usuario quiere trabajar con nosotros, redirígelo a la página de reclutamiento: "¡Excelente! Puedes aplicar en nuestra página **[Forma Parte de TradeVision](#/colabora)**."
- **Canales de Soporte:** Para consultas personales (cuentas, pagos), redirige a los canales oficiales: Correo: \`tradevision2026@gmail.com\` o WhatsApp: \`https://wa.me/message/T6UFHN3SSTIEJ1\`.
- **Manejo de Ofensas:** Si un usuario es agresivo, responde con calma y profesionalismo, sin entrar en debate.
`;

function getChatInstance(mode: ChatMode): Chat | null {
    const aiInstance = getAiInstance();
    if (!aiInstance) {
        return null;
    }

    if (!chatInstances.has(mode)) {
        let model;
        let config: any = {
             systemInstruction: SYSTEM_INSTRUCTION
        };

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

        chatInstances.set(mode, aiInstance.chats.create({ model, config }));
    }
    return chatInstances.get(mode)!;
}

export const sendMessageToGemini = async (
    message: string,
    mode: ChatMode,
    onStream: (chunk: string, sources: GroundingSource[]) => void,
    context?: string
): Promise<void> => {
    try {
        const chat = getChatInstance(mode);
        
        if (!chat) {
            onStream("El Asistente de IA no está configurado correctamente (falta la clave de API). Por favor, contacte al administrador del sitio.", []);
            return;
        }

        let finalMessage = message;
        if (context && context.trim().length > 0) {
            if (mode === ChatMode.Grounded) {
                finalMessage = `Usando los resultados de búsqueda de Google Y el siguiente contexto proporcionado, responde a la pregunta del usuario. Prioriza la información más relevante.

### Contexto Adicional Proporcionado:
${context}

### Pregunta del Usuario:
"${message}"`;
            } else if (mode === ChatMode.Thinking) {
                finalMessage = `Utilizando tus capacidades de razonamiento avanzado y el siguiente contexto, proporciona una respuesta detallada y bien estructurada a la compleja consulta del usuario.

### Contexto de la Página Actual:
${context}

### Pregunta del Usuario:
"${message}"`;
            } else {
                 finalMessage = `Considerando el siguiente contexto de la página que el usuario está viendo actualmente, responde a su pregunta.

### Contexto de la Página Actual:
${context}

### Pregunta del Usuario:
"${message}"`;
            }
        }

        const result = await chat.sendMessageStream({ message: finalMessage });

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
            model: 'gemini-2.5-flash',
            contents: "Dame los 5 titulares de noticias más recientes e importantes, combinando noticias del mercado de divisas (Forex) de https://es.tradingview.com/markets/currencies/news/ con noticias sobre Criptomonedas y Bitcoin. Formatea la respuesta como una lista con guiones, donde cada titular está en una nueva línea.",
            config: {
                tools: [{ googleSearch: {} }],
            },
        });

        const textResponse = response.text.trim();
        // Parse a markdown list (handles -, *, or numbered lists)
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