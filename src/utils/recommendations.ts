import { UserData } from '../types';

export interface Recommendation {
  title: string;
  description: string;
  type: 'meditation' | 'exercise' | 'breathing' | 'hypnosis';
  spotifyUrl?: string;
  warning?: string;
}

export function getRecommendations(data: UserData): Recommendation[] {
  const recs: Recommendation[] = [];

  const hasSymptom = (keywords: string[]) => 
    data.symptoms.some(s => keywords.some(k => s.toLowerCase().includes(k.toLowerCase())));

  // 1. Exercise Recommendations based on Substance
  const stimulants = ['Metanfetamina', 'Cocaína', 'Anfetaminas'];
  const isStimulant = data.substance && stimulants.includes(data.substance);

  if (isStimulant) {
    recs.push({
      title: 'Yoga Suave y Estiramientos',
      description: 'Debido al historial de estimulantes, es crucial evitar ejercicios cardiovasculares intensos para proteger tu corazón. Enfócate en movimientos lentos y controlados.',
      type: 'exercise',
      warning: '⚠️ Evita el cardio de alta intensidad (HIIT, correr rápido) para prevenir estrés cardíaco.',
    });
  } else {
    recs.push({
      title: 'Caminata Ligera o Natación',
      description: 'El ejercicio aeróbico moderado ayuda a liberar endorfinas naturales y mejorar el estado de ánimo sin sobrecargar el cuerpo.',
      type: 'exercise',
    });
  }

  // 2. Meditation & Hypnosis based on Symptoms
  if (hasSymptom(['ansiedad', 'insomnio', 'sueño', 'inquietud', 'agitación', 'somnolencia'])) {
    recs.push({
      title: 'Meditación con Ondas Theta (4-8 Hz)',
      description: 'Las ondas Theta inducen un estado de relajación profunda, ideal para combatir la ansiedad severa y preparar el cerebro para regular el sueño.',
      type: 'meditation',
      spotifyUrl: 'https://open.spotify.com/embed/track/7o3DoxE6sIG10H7qOxWoYk?utm_source=generator&theme=0', // Theta Waves Track
    });
  }

  if (hasSymptom(['depresión', 'fatiga', 'lentitud', 'energía', 'motivación', 'anhedonia'])) {
    recs.push({
      title: 'Estimulación con Ondas Gamma (30-100 Hz)',
      description: 'Las ondas Gamma están asociadas con altos niveles de procesamiento cognitivo y pueden ayudar a mejorar el enfoque y combatir la niebla mental y fatiga extrema.',
      type: 'meditation',
      spotifyUrl: 'https://open.spotify.com/embed/track/4QMjqFPRxgHXgNaKFkLolx?utm_source=generator&theme=0', // Gamma Waves Track
    });
  }

  if (hasSymptom(['antojo', 'craving'])) {
    recs.push({
      title: 'Hipnosis para Reprogramación Subconsciente',
      description: 'La hipnosis clínica ayuda a reescribir las asociaciones neuronales que desencadenan los antojos, reduciendo la urgencia de consumir.',
      type: 'hypnosis',
      spotifyUrl: 'https://open.spotify.com/embed/track/2LjLP9FzbwwUQ0Z1Gsua6e?utm_source=generator&theme=0', // Deep Sleep / Hypnosis Track
    });
  }

  if (hasSymptom(['irritabilidad', 'concentrar', 'niebla', 'frustración', 'enojo', 'humor', 'agresividad'])) {
    recs.push({
      title: 'Relajación con Ondas Alpha (8-12 Hz)',
      description: 'Las ondas Alpha promueven un estado de calma alerta, ideal para reducir la irritabilidad y restablecer la concentración sin causar gran somnolencia.',
      type: 'meditation',
      spotifyUrl: 'https://open.spotify.com/embed/track/3ITjint9eGsKR8RFZIZ0cS?utm_source=generator&theme=0', // Alpha Waves Track
    });
  }

  if (hasSymptom(['apetito', 'náuseas', 'vómitos', 'diarrea', 'estomacal', 'sudoración', 'escalofríos', 'dolores', 'muscular', 'articular'])) {
    recs.push({
      title: 'Equilibrio Físico y Nutricional',
      description: 'Las alteraciones en tu sistema digestivo, variaciones de apetito y dolores físicos son la forma en la que tu cuerpo se reajusta y elimina toxinas. Considera comer porciones pequeñas y blandas si hay falta de apetito, o snacks saludables si hay aumento excesivo.',
      type: 'breathing',
      warning: 'Asegúrate de mantener una hidratación constante y reponer electrolitos si estás experimentando sudoración excesiva, vómitos o hipertermia.',
    });
  }

  // General Breathing
  if (!recs.some(r => r.type === 'breathing' && r.title === 'Equilibrio Físico y Nutricional')) {
    recs.push({
      title: 'Respiración 4-7-8',
      description: 'Inhala por 4 segundos, sostén por 7, exhala por 8. Esta técnica activa el sistema nervioso parasimpático, calmando la respuesta de "lucha o huida".',
      type: 'breathing',
    });
  }

  return recs;
}
