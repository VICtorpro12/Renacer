import { useState } from 'react';
import { motion } from 'motion/react';
import { Leaf, LogIn, Loader2 } from 'lucide-react';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../lib/firebase';

export default function Home() {
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleLogin = async () => {
    setIsLoggingIn(true);
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Error logging in:", error);
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="min-h-screen flex flex-col items-center justify-center bg-teal-50 px-4 py-12 text-center"
    >
      <div className="max-w-3xl w-full bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-teal-100 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-teal-400 to-emerald-400"></div>
        
        <div className="flex justify-center mb-8">
          <div className="bg-teal-100 p-4 rounded-full">
            <Leaf className="w-12 h-12 text-teal-600" />
          </div>
        </div>

        <h1 className="text-4xl md:text-5xl font-serif text-teal-900 mb-4 tracking-tight">
          Renacer
        </h1>
        <p className="text-xl text-teal-700 mb-8 font-light">
          Tratamientos alternativos de meditación para el síndrome de abstinencia
        </p>

        <div className="space-y-6 mb-8 text-gray-600">
          <p className="text-lg">
            Una guía compasiva para tu recuperación, utilizando meditación, respiración e hipnosis para restaurar tu equilibrio natural. Guarda tu progreso, lleva un registro automático y accede a terapias personalizadas.
          </p>
        </div>

        <div className="bg-amber-50 rounded-xl p-4 mb-10 text-left border border-amber-200">
          <p className="text-xs text-amber-800 leading-relaxed font-medium">
            <strong>Aviso Médico:</strong> Esta aplicación es una herramienta alternativa y complementaria. No sustituye el consejo, diagnóstico o tratamiento médico profesional. Si tienes síntomas agudos acude de inmediato a un centro de salud profesional.
          </p>
        </div>

        <button
          onClick={handleLogin}
          disabled={isLoggingIn}
          className="bg-white border-2 border-teal-600 text-teal-700 hover:bg-teal-50 disabled:opacity-70 disabled:cursor-not-allowed text-lg font-medium py-4 px-10 rounded-full transition-all transform hover:scale-105 shadow-md hover:shadow-lg flex items-center justify-center gap-3 mx-auto"
        >
          {isLoggingIn ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <LogIn className="w-5 h-5" />
          )}
          <span>Entrar con Google</span>
        </button>

        <div className="mt-16 pt-8 border-t border-teal-100">
          <h2 className="text-sm font-bold text-teal-800 uppercase tracking-wider mb-4">
            Centro Universitario UTEG
          </h2>
          <div className="flex flex-col md:flex-row justify-center items-center gap-4 text-sm text-gray-500">
            <span>Gabriel Kim Ruiz</span>
            <span className="hidden md:inline">•</span>
            <span>Amellatli Getzemani Hernández Estrada</span>
            <span className="hidden md:inline">•</span>
            <span>Víctor Gabriel Zanabria Rivera</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
