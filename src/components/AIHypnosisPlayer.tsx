import { useState, useEffect, useRef } from 'react';
import { UserData } from '../types';
import { generateHypnosisScript } from '../services/aiHypnosis';
import { Brain, Play, Square, Loader2, Sparkles, Volume2, Waves } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface AIHypnosisPlayerProps {
  data: UserData;
}

type Status = 'idle' | 'generating' | 'ready' | 'playing' | 'error';

export default function AIHypnosisPlayer({ data }: AIHypnosisPlayerProps) {
  const [status, setStatus] = useState<Status>('idle');
  const [scriptLines, setScriptLines] = useState<string[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(-1);
  const [errorMsg, setErrorMsg] = useState('');

  const isPlayingRef = useRef(false);

  const hasSymptom = (keywords: string[]) => 
    data.symptoms.some(s => keywords.some(k => s.toLowerCase().includes(k.toLowerCase())));

  const isGamma = hasSymptom(['depresión', 'fatiga', 'lentitud', 'energía', 'motivación', 'anhedonia']);
  const isAlpha = hasSymptom(['ansiedad', 'estrés', 'nervios', 'tensión', 'pánico', 'miedo']);
  
  const waveType = isGamma ? 'Gamma' : (isAlpha ? 'Alpha' : 'Theta');
  const activeWaveName = `Frecuencia Base ${waveType} + Melodía de Sanación`;

  // Enlaces de Spotify (Canciones/Tracks) según la frecuencia
  let spotifyEmbedUrl = '';
  if (isGamma) {
    // Canción de Ondas Gamma para energía
    spotifyEmbedUrl = 'https://open.spotify.com/embed/track/4QMjqFPRxgHXgNaKFkLolx?utm_source=generator&theme=0&autoplay=1&loop=1';
  } else if (isAlpha) {
    // Canción de Ondas Alpha para relajación
    spotifyEmbedUrl = 'https://open.spotify.com/embed/track/3ITjint9eGsKR8RFZIZ0cS?utm_source=generator&theme=0&autoplay=1&loop=1';
  } else {
    // Canción de ondas Theta profundas
    spotifyEmbedUrl = 'https://open.spotify.com/embed/track/7o3DoxE6sIG10H7qOxWoYk?utm_source=generator&theme=0&autoplay=1&loop=1';
  }

  useEffect(() => {
    // Cargar voces en background para tenerlas listas
    window.speechSynthesis.getVoices();

    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  const handleGenerate = async () => {
    setStatus('generating');
    setErrorMsg('');
    try {
      const lines = await generateHypnosisScript(data);
      if (!lines || lines.length === 0) throw new Error("Guion vacío");
      setScriptLines(lines);
      setStatus('ready');
    } catch (err: any) {
      setErrorMsg(err.message || 'Error al conectar con la IA');
      setStatus('error');
    }
  };

  const startReading = (index: number) => {
    if (!isPlayingRef.current) return;

    if (index >= scriptLines.length) {
      stopSession();
      return;
    }

    setCurrentLineIndex(index);
    const textToSpeak = scriptLines[index];
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    
    // Configuración para voz femenina hipnótica y realista
    utterance.rate = 0.75; // Pausada y lenta
    utterance.pitch = 1.1; // Tonada sutilmente más aguda para forzar claridad femenina

    const voices = window.speechSynthesis.getVoices();
    const esVoices = voices.filter(v => v.lang.startsWith('es'));
    
    // Jerarquía estricta para forzar una voz realista de mujer
    let selectedVoice = 
      esVoices.find(v => v.name.includes('Monica') || v.name.includes('Paulina') || v.name.includes('Victoria')) ||
      esVoices.find(v => v.name.toLowerCase().includes('female') || v.name.toLowerCase().includes('mujer')) ||
      esVoices.find(v => v.name.includes('Google') && v.lang.includes('es-')) ||
      esVoices.find(v => v.name.includes('Microsoft') && (v.name.includes('Sabina') || v.name.includes('Helena') || v.name.includes('Laura'))) ||
      esVoices[0];

    if (selectedVoice) utterance.voice = selectedVoice;

    utterance.onend = () => {
      // Pausa clínica entre sugestiones
      setTimeout(() => {
        if (isPlayingRef.current) {
          startReading(index + 1);
        }
      }, 2500); 
    };

    utterance.onerror = (e) => {
       console.error("Speech Synthesis Error:", e);
       stopSession();
    };

    window.speechSynthesis.speak(utterance);
  };

  const playSession = () => {
    if (status !== 'ready' && status !== 'playing') return;

    isPlayingRef.current = true;
    setStatus('playing');
    
    window.speechSynthesis.cancel(); 
    startReading(0);
  };

  const stopSession = () => {
    isPlayingRef.current = false;
    window.speechSynthesis.cancel();
    setStatus('ready');
    setCurrentLineIndex(-1);
  };

  return (
    <div className="bg-gradient-to-br from-indigo-900 to-purple-900 rounded-3xl p-6 md:p-8 text-white shadow-xl relative overflow-hidden mb-8 border border-white/10">
      
      <div className="absolute top-0 right-0 -mr-16 -mt-16 text-white/5">
        <Brain className="w-64 h-64" />
      </div>

      <div className="relative z-10 flex flex-col md:flex-row md:items-start justify-between gap-6">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-white/20 p-2 rounded-xl backdrop-blur-sm">
              <Sparkles className="w-6 h-6 text-indigo-200" />
            </div>
            <h2 className="text-2xl font-serif font-medium">Sesión Viva: Meditación y Relajación IA</h2>
          </div>
          <p className="text-indigo-200 text-sm max-w-lg mb-4 font-light leading-relaxed">
            Nuestra IA sintetiza en tiempo real una meditación guiada inmersiva con música terapéutica de fondo, adaptada para calmar tus síntomas de {data.substance}.
          </p>
          <div className="inline-flex items-center px-3 py-1.5 bg-indigo-950/50 rounded-full border border-indigo-400/30 text-xs text-indigo-300 font-medium">
            <Waves className="w-3.5 h-3.5 mr-2" />
            Frecuencia base: {activeWaveName}
          </div>
        </div>

        <div className="flex-shrink-0 w-full md:w-auto">
          {status === 'idle' && (
            <button
              onClick={handleGenerate}
              className="w-full justify-center flex items-center px-6 py-3.5 bg-white text-indigo-900 rounded-xl font-medium hover:bg-indigo-50 transition-all shadow-lg hover:shadow-xl"
            >
              Generar mi sesión
              <Brain className="w-5 h-5 ml-2 text-indigo-600" />
            </button>
          )}

          {status === 'generating' && (
            <div className="flex items-center justify-center px-6 py-3.5 bg-white/10 text-white rounded-xl backdrop-blur-sm border border-white/20">
              <Loader2 className="w-5 h-5 mr-3 animate-spin text-indigo-300" />
              Sintetizando meditación...
            </div>
          )}

          {status === 'ready' && (
            <button
              onClick={playSession}
              className="w-full justify-center flex items-center px-8 py-3.5 bg-indigo-500 text-white rounded-xl font-medium hover:bg-indigo-400 transition-all shadow-lg hover:shadow-indigo-500/25"
            >
              <Play className="w-5 h-5 mr-2 fill-current" />
              Iniciar Meditación
            </button>
          )}

          {status === 'playing' && (
            <button
              onClick={stopSession}
              className="w-full justify-center flex items-center px-8 py-3.5 bg-white/10 text-white rounded-xl backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all"
            >
              <Square className="w-5 h-5 mr-2 fill-current" />
              Detener Sesión
            </button>
          )}
        </div>
      </div>

      {status === 'error' && (
        <div className="mt-4 p-4 bg-red-500/20 text-red-200 rounded-xl text-sm border border-red-500/30">
          {errorMsg}
          <button onClick={() => setStatus('idle')} className="ml-4 underline hover:text-white">Reintentar</button>
        </div>
      )}

      <AnimatePresence>
        {status === 'playing' && currentLineIndex >= 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-8 pt-8 border-t border-white/10 flex flex-col items-center text-center"
          >
            <div className="relative mb-6">
              <Volume2 className="w-6 h-6 text-indigo-300 animate-pulse relative z-10" />
              <div className="absolute inset-0 bg-indigo-400 blur-xl opacity-50 rounded-full animate-ping"></div>
            </div>
            
            {currentLineIndex > 0 && (
              <p className="text-sm md:text-base text-indigo-300/40 mb-4 transition-all duration-1000">
                "{scriptLines[currentLineIndex - 1]}"
              </p>
            )}

            <motion.p
              key={currentLineIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xl md:text-3xl font-serif text-white mb-4 drop-shadow-md leading-relaxed max-w-3xl"
            >
              "{scriptLines[currentLineIndex]}"
            </motion.p>
            
            {currentLineIndex < scriptLines.length - 1 && (
              <p className="text-sm md:text-base text-indigo-300/40 mt-4 transition-all duration-1000">
                "{scriptLines[currentLineIndex + 1]}"
              </p>
            )}

            <div className="mt-8 w-full max-w-sm mx-auto overflow-hidden rounded-xl border border-white/10 shadow-lg bg-black/40">
              <iframe 
                src={spotifyEmbedUrl} 
                width="100%" 
                height="80" 
                frameBorder="0" 
                allowFullScreen={false} 
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                loading="lazy"
              ></iframe>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
