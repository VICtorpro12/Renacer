import { motion } from 'motion/react';
import { UserData } from '../types';
import { getRecommendations } from '../utils/recommendations';
import { Calendar, Phone, Heart, Activity, Brain, Info, AlertTriangle, DollarSign, CheckCircle2, Volume2, LogOut } from 'lucide-react';
import AIHypnosisPlayer from './AIHypnosisPlayer';
import { auth } from '../lib/firebase';
import { signOut } from 'firebase/auth';

interface DashboardProps {
  data: UserData;
  onNavigate: (view: 'education') => void;
}

export default function Dashboard({ data, onNavigate }: DashboardProps) {
  const recommendations = getRecommendations(data);
  const moneySaved = (data.cleanDays || 0) * data.dailyCost;

  const handleLogout = () => {
    signOut(auth);
  };

  return (
    <div className="min-h-screen bg-teal-50/50 p-4 md:p-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-3xl shadow-sm border border-teal-100">
          <div>
            <h1 className="text-3xl font-serif text-teal-900">Tu Progreso</h1>
            <p className="text-teal-600">
              Recuperación de {data.substance} • Etapa: {data.stage}
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => onNavigate('education')}
              className="flex items-center px-4 py-2 bg-teal-100 text-teal-800 rounded-full hover:bg-teal-200 transition-colors text-sm font-medium"
            >
              <Info className="w-4 h-4 md:mr-2" />
              <span className="hidden md:inline">¿Por qué funciona esto?</span>
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center px-4 py-2 border border-gray-200 text-gray-600 rounded-full hover:bg-gray-100 transition-colors text-sm font-medium"
            >
              <LogOut className="w-4 h-4 md:mr-2" />
              <span className="hidden md:inline">Cerrar Sesión</span>
            </button>
          </div>
        </header>

        {/* AI Dynamic Hypnosis Player */}
        <AIHypnosisPlayer data={data} />


        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-emerald-500 to-teal-600 p-6 rounded-3xl text-white shadow-md relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-4 opacity-20">
              <Calendar className="w-24 h-24" />
            </div>
            <h3 className="text-emerald-100 font-medium mb-2">Días Limpio</h3>
            <div className="text-5xl font-light tracking-tight mb-2">
              {data.cleanDays || 0}
            </div>
            <p className="text-sm text-emerald-100">
              Cada día es una victoria para tu cerebro.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white p-6 rounded-3xl border border-teal-100 shadow-sm"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-500 font-medium">Ahorro Estimado</h3>
              <div className="bg-green-100 p-2 rounded-full">
                <DollarSign className="w-5 h-5 text-green-600" />
              </div>
            </div>
            <div className="text-4xl font-light text-gray-900 mb-2">
              ${moneySaved.toLocaleString()}
            </div>
            <p className="text-sm text-gray-500">
              Dinero ahorrado al no consumir.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white p-6 rounded-3xl border border-teal-100 shadow-sm"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-500 font-medium">Síntomas Reportados</h3>
              <div className="bg-orange-100 p-2 rounded-full">
                <Activity className="w-5 h-5 text-orange-600" />
              </div>
            </div>
            <div className="text-4xl font-light text-gray-900 mb-2">
              {data.symptoms.length}
            </div>
            <p className="text-sm text-gray-500">
              Estamos adaptando tu plan a estos síntomas.
            </p>
          </motion.div>
        </div>

        {/* Medical Disclaimer */}
        <div className="bg-amber-50 border-l-4 border-amber-500 p-5 rounded-r-2xl shadow-sm flex flex-col sm:flex-row items-start gap-4">
          <div className="bg-amber-100 p-2 rounded-full flex-shrink-0">
            <AlertTriangle className="w-6 h-6 text-amber-600" />
          </div>
          <div>
            <h4 className="font-semibold text-amber-900 mb-1">Aviso Médico Importante</h4>
            <p className="text-sm text-amber-800 leading-relaxed">
              Las herramientas de meditación, hipnosis y seguimiento proporcionadas en esta aplicación son de carácter complementario y <strong>bajo ninguna circunstancia sustituyen el tratamiento, diagnóstico o seguimiento de un profesional de la salud médica o psiquiátrica</strong>. En caso de sentir síntomas agudos, crisis de abstinencia, o si crees que tu salud está en riesgo, <strong>debes acudir inmediatamente a un profesional o contactar a las líneas de emergencia médica</strong>.
            </p>
          </div>
        </div>

        {/* Recommendations */}
        <div className="space-y-6">
          <h2 className="text-2xl font-serif text-teal-900">Tu Plan Personalizado</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {recommendations.map((rec, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 * index }}
                className="bg-white rounded-3xl p-6 border border-teal-100 shadow-sm flex flex-col h-full"
              >
                <div className="flex items-center gap-3 mb-4">
                  {rec.type === 'exercise' && <Heart className="w-6 h-6 text-rose-500" />}
                  {rec.type === 'meditation' && <Brain className="w-6 h-6 text-purple-500" />}
                  {rec.type === 'breathing' && <Activity className="w-6 h-6 text-sky-500" />}
                  {rec.type === 'hypnosis' && <Brain className="w-6 h-6 text-indigo-500" />}
                  <h3 className="text-lg font-medium text-gray-900">{rec.title}</h3>
                </div>
                
                <p className="text-gray-600 mb-4 flex-grow">{rec.description}</p>
                
                {rec.warning && (
                  <div className="bg-rose-50 text-rose-800 text-sm p-3 rounded-xl mb-4">
                    {rec.warning}
                  </div>
                )}

                {rec.spotifyUrl && (
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <p className="text-sm text-gray-500 mb-3 font-medium flex items-center gap-2">
                      <Volume2 className="w-4 h-4" />
                      Sesión recomendada en Spotify:
                    </p>
                    <iframe 
                      src={`${rec.spotifyUrl}&autoplay=1&loop=1`} 
                      width="100%" 
                      height="80" 
                      frameBorder="0" 
                      allowFullScreen={false} 
                      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                      loading="lazy"
                      className="rounded-lg shadow-sm"
                    ></iframe>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Calendar / Daily Plan */}
        <div className="bg-white rounded-3xl p-6 md:p-8 border border-teal-100 shadow-sm">
          <h2 className="text-2xl font-serif text-teal-900 mb-6">Rutina Diaria Sugerida</h2>
          <div className="space-y-4">
            {[
              { time: 'Mañana', action: 'Respiración 4-7-8 (5 min) + Hidratación' },
              { time: 'Tarde', action: 'Ejercicio recomendado (20-30 min)' },
              { time: 'Noche', action: 'Meditación u Ondas Theta antes de dormir' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-teal-50/50 border border-teal-100">
                <div className="w-24 font-medium text-teal-800">{item.time}</div>
                <div className="flex-1 text-gray-700">{item.action}</div>
                <CheckCircle2 className="w-5 h-5 text-teal-400" />
              </div>
            ))}
          </div>
        </div>

        {/* Emergency Contacts */}
        <div className="bg-rose-50 rounded-3xl p-6 md:p-8 border border-rose-100">
          <div className="flex items-center gap-3 mb-4">
            <Phone className="w-6 h-6 text-rose-600" />
            <h2 className="text-xl font-medium text-rose-900">Líneas de Ayuda en Guadalajara, Jalisco</h2>
          </div>
          <p className="text-rose-800 mb-4 text-sm">
            Si sientes que vas a recaer o los síntomas son inmanejables, no dudes en pedir ayuda profesional.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-xl shadow-sm border border-rose-100">
              <h4 className="font-medium text-gray-900">Línea de la Vida (Nacional)</h4>
              <p className="text-rose-600 font-mono text-lg mt-1">800 911 2000</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm border border-rose-100">
              <h4 className="font-medium text-gray-900">SALME Jalisco (Crisis)</h4>
              <p className="text-rose-600 font-mono text-lg mt-1">33 3833 3838</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
