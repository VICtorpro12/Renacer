import { GoogleGenAI } from '@google/genai';
import { UserData } from '../types';

export async function generateHypnosisScript(data: UserData): Promise<string[]> {
  const apiKey = process.env.GEMINI_API_KEY;
  
  if (!apiKey) {
    throw new Error('La clave de la API de Gemini no está configurada.');
  }

  const ai = new GoogleGenAI({ apiKey });

  const prompt = `
    Actúa como un guía de meditación experto y compasivo. Tu objetivo es generar una meditación guiada profundamente relajante, diseñada específicamente para apoyar la recuperación de adicciones y aliviar el síndrome de abstinencia.
    
    DATOS DEL USUARIO:
    - Sustancia de recuperación: ${data.substance}
    - Tiempo de abstinencia: ${data.cleanDays || 0} días
    - Síntomas a aliviar: ${data.symptoms.join(', ')}
    
    ESTRUCTURA DE LA MEDITACIÓN (DEBE SEGUIR ESTE ORDEN EXACTO):
    1. INICIO Y CONTEXTO: Utiliza un tono inmensamente relajado, sereno y puro. Pide al usuario que preste atención a la música de fondo y a las ondas sonoras, sintiendo cómo lo envuelven y lo calman. Fija su atención en una respiración muy lenta.
    2. PROFUNDIZACIÓN (SOLTAR): Guíalo lentamente hacia un estado de paz total. Usa imágenes vívidas y suaves, como flotar, derretir la tensión y hundirse en un océano de tranquilidad.
    3. SANACIÓN INTEGRAL: Aborda sus síntomas con compasión. Si siente malestar o "craving", enséñale a observarlo como una nube pasajera. Recuerda y celebra sus ${data.cleanDays || 0} días de limpieza; enséñale que su cuerpo ya se está purificando.
    4. RETORNO Y ANCLAJE: Cierra dándole una sugestión de calma permanente, volviendo al presente con una sensación de renovación absoluta.

    REGLAS DE FORMATO (CRÍTICO PARA LA VOZ GENERADA):
    - Escribe en frases muy cortas, poéticas, susurradas y contundentes.
    - Separa cada frase con un salto de línea (enter). El salto de línea dictará la pausa del audio.
    - Haz mención explícita a la música de fondo en la inducción ("déjate llevar por el sonido de fondo...", "escucha estas frecuencias...").
    - Usa imperativos suaves como "respira", "suelta", "descansa", "siente".
    - Inicia directamente la meditación desde la primera línea. No agregues introducciones, títulos ni despedidas de texto.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });

    const text = response.text || '';
    // Clean up empty lines and separate by lines to feed into TTS sentence by sentence
    const lines = text
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 5);

    return lines;
  } catch (error: any) {
    console.error('Error generating hypnosis:', error);
    throw new Error(error.message || 'Error desconocido al conectar con la API de Gemini. Verifica tu API Key.');
  }
}
