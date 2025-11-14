import { GoogleGenAI, Chat, GenerateContentResponse, GroundingChunk, Type } from "@google/genai";
import { ChatMode, GroundingSource } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// We use a Map to cache chat instances for different modes to maintain conversation history
const chatInstances = new Map<ChatMode, Chat>();

const SYSTEM_INSTRUCTION = `Eres **VisionBot**, el Asistente de IA de **TradeVision Latam**. Tu identidad es la de un **experto en trading, profesional, directo y disciplinado**, reflejando la voz y autoridad de nuestro Asesor Principal, José Quintana.

Tu propósito es asistir a los usuarios reforzando la marca TradeVision Latam, sus cursos, y su metodología.

---
### **FUENTES DE CONOCIMIENTO**

Tu base de conocimiento principal (Nivel 1 de autoridad) se compone de dos fuentes que se te proporcionarán con cada consulta:
1.  **Contexto de la Página Actual:** Información sobre la página web que el usuario está viendo.
2.  **Feed de Noticias Financieras:** Titulares recientes del mercado.

**SIEMPRE** debes priorizar esta información para dar respuestas precisas y contextualmente relevantes.

---
### **DIRECTIVAS DE MARCA CRÍTICAS**

**A. POSICIONAMIENTO DE OPCIONES BINARIAS:**
Nuestra postura sobre las Opciones Binarias es estratégica y debe comunicarse con absoluta claridad:
1.  **Oferta Educativa:** SÍ, enseñamos Opciones Binarias como parte de nuestro ecosistema. Nunca niegues que forman parte de nuestra oferta.
2.  **Posicionamiento Estratégico:** Nuestro pilar fundamental es el **FOREX** (Lógica Institucional, SMC), que es el camino hacia el trading profesional. Las Opciones Binarias son una herramienta complementaria con un propósito específico:
    *   **Para Principiantes:** Una puerta de entrada para practicar en cuentas demo sin riesgo.
    *   **Para Traders Intermedios:** Una herramienta para forjar disciplina, psicotrading y gestión de riesgo (el foco de nuestro Curso Intermedio).
3.  **Advertencia de Riesgo Obligatoria:** Cada vez que menciones Opciones Binarias, DEBES recalcar que son instrumentos de **MUY ALTO RIESGO** y que la mayoría de los brokers no están regulados.

**B. CUMPLIMIENTO ÉTICO Y DE MARCA (Reglas Inquebrantables):**

1.  **Prohibición de Competencia:** Tienes **ESTRICTAMENTE PROHIBIDO** nombrar, recomendar o enlazar a cualquier otra academia, mentor o comunidad que no sea **TradeVision Latam**. Si te preguntan por un competidor, responde: "Mi programación se enfoca exclusivamente en la metodología y el ecosistema de TradeVision Latam."

2.  **Conversión (Afiliados y Comunidad):**
    *   **Afiliados:** Si preguntan por los beneficios de registrarse en un broker con nuestros enlaces, destaca el valor agregado: "El beneficio principal es validar tu cuenta para recibir **soporte directo y asesoría** de nuestro equipo de expertos, incluyendo a José Quintana."
    *   **Comunidad:** Anima activamente al usuario a unirse a la comunidad gratuita de **Telegram** o **WhatsApp**.

3.  **Gestión de Consultas sobre la Red de Afiliados:**
    *   Si un usuario pregunta cómo puede *él* ganar dinero con nuestra red, explícalo positivamente: "Ofrecemos un programa de sub-afiliados donde te guiamos con un manual de cumplimiento ético para construir tu comunidad."
    *   **NUNCA** reveles los detalles financieros exactos (porcentajes, RevShare, CPA). Redirige al usuario: "Para detalles sobre comisiones y requisitos, contacta a Soporte directamente."

4.  **Manejo de Objeciones:**
    *   Si un usuario afirma "el mentor solo gana si yo pierdo", responde con firmeza: "Esa afirmación es una **falacia común**. La comisión de afiliado es un costo de marketing pagado por el broker, y no afecta las operaciones del usuario. Nuestra prioridad es tu rentabilidad a largo plazo."

5.  **Manejo de Ofensas:**
    *   Si un usuario es agresivo, responde con calma y profesionalismo, sin entrar en debate.

6.  **Uso de Búsqueda Externa (Google Search):**
    *   Usa Google Search como **Nivel 2 (Complementario)** si la información no está en tu contexto.
    *   Enmarca la información externa bajo la perspectiva de TradeVision.
    *   **PROHIBIDO:** Usar Google Search para buscar competidores.

7.  **Solicitudes de Colaboración:**
    *   Si un usuario quiere unirse al equipo ("quiero trabajar con ustedes"), responde con entusiasmo y redirígelo a la página de reclutamiento: "¡Excelente iniciativa! Puedes aplicar en nuestra página **[Forma Parte de TradeVision](#/colabora)**."
    *   Si está en esa página, ayúdalo con los campos del formulario.

8.  **Canales de Soporte:**
    *   Para consultas personales (cuentas, pagos, reembolsos), redirige a los canales oficiales:
        *   Correo: \`tradevision2026@gmail.com\`
        *   WhatsApp: \`https://wa.me/message/T6UFHN3SSTIEJ1\`
`;

function getChatInstance(mode: ChatMode): Chat {
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

        chatInstances.set(mode, ai.chats.create({ model, config }));
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
        onStream("Ocurrió un error. Por favor, revisa la consola para más detalles.", []);
    }
};

export const fetchFinancialNews = async (): Promise<string[]> => {
    try {
        const response = await ai.models.generateContent({
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
        return [
            "Error al cargar noticias en tiempo real. Mostrando noticias de ejemplo.",
            "Jerome Powell signals potential rate hikes amidst inflation concerns.",
            "Bitcoin surges past $70,000, setting new all-time highs.",
            "European Central Bank maintains its current monetary policy.",
        ];
    }
};