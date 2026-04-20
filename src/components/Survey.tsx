import { useState } from 'react';
import { motion } from 'motion/react';
import { UserData, Substance, Stage } from '../types';
import { ChevronRight, ArrowLeft } from 'lucide-react';

interface SurveyProps {
  onComplete: (data: UserData) => void;
}

const SUBSTANCES: Substance[] = [
  'Metanfetamina',
  'Cocaína',
  'Anfetaminas',
  'Opioides',
  'Nicotina',
  'Marihuana',
  'Azúcares/Otras',
];

const STAGES: Stage[] = [
  '1-3 días',
  '1 semana',
  '1 mes',
  '3 meses',
  '6 meses',
  '1 año',
];

const SYMPTOMS_BY_SUBSTANCE: Record<Substance, string[]> = {
  'Metanfetamina': [
    'Fatiga extrema severa (Crash)', 
    'Depresión profunda', 
    'Aumento excesivo del apetito',
    'Paranoia o alucinaciones', 
    'Insomnio o somnolencia excesiva', 
    'Ansiedad severa',
    'Falta de motivación (Anhedonia)', 
    'Antojos intensos (Craving)'
  ],
  'Cocaína': [
    'Agitación e Irritabilidad', 
    'Depresión profunda', 
    'Fatiga extrema',
    'Lentitud física y mental', 
    'Aumento del apetito', 
    'Sueños vívidos y desagradables',
    'Antojos intensos (Craving)'
  ],
  'Anfetaminas': [
    'Fatiga extrema', 
    'Depresión', 
    'Aumento del apetito', 
    'Irritabilidad constante',
    'Dolores musculares y articulares', 
    'Trastornos del sueño (Insomnio/Pesadillas)',
    'Problemas cardíacos o palpitaciones', 
    'Antojos intensos (Craving)'
  ],
  'Opioides': [
    'Ansiedad y agitación', 
    'Náuseas, vómitos o diarrea', 
    'Dolores musculares y óseos profundos',
    'Sudoración extrema y escalofríos', 
    'Insomnio', 
    'Pérdida severa de apetito', 
    'Lagrimeo constante y secreción nasal', 
    'Antojos intensos (Craving)'
  ],
  'Nicotina': [
    'Irritabilidad, enojo y frustración', 
    'Ansiedad intensa', 
    'Dificultad para concentrarse',
    'Aumento del apetito (especialmente dulces)', 
    'Insomnio', 
    'Dolor de cabeza', 
    'Antojos intensos (Craving)'
  ],
  'Marihuana': [
    'Inquietud y ansiedad', 
    'Irritabilidad o agresividad', 
    'Insomnio y pesadillas vívidas',
    'Pérdida de apetito o pérdida de peso', 
    'Sudoración (especialmente nocturna)', 
    'Depresión leve',
    'Molestias estomacales', 
    'Antojos intensos (Craving)'
  ],
  'Azúcares/Otras': [
    'Dolor de cabeza agudo', 
    'Fatiga y falta de energía', 
    'Niebla mental (Dificultad para concentrarse)',
    'Irritabilidad y cambios de humor', 
    'Ansiedad moderada', 
    'Alteraciones del sueño',
    'Antojos intensos (Craving)'
  ]
};

export default function Survey({ onComplete }: SurveyProps) {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<UserData>({
    substance: null,
    stage: null,
    symptoms: [],
    dailyCost: 0,
    cleanDays: null,
  });

  const handleNext = () => setStep((s) => s + 1);
  const handlePrev = () => setStep((s) => s - 1);

  const toggleSymptom = (symptom: string) => {
    setData((prev) => ({
      ...prev,
      symptoms: prev.symptoms.includes(symptom)
        ? prev.symptoms.filter((s) => s !== symptom)
        : [...prev.symptoms, symptom],
    }));
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-serif text-teal-900 mb-6">
              ¿De qué sustancia te estás recuperando?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {SUBSTANCES.map((sub) => (
                <button
                  key={sub}
                  onClick={() => setData({ ...data, substance: sub, symptoms: [] })}
                  className={`p-4 rounded-xl border-2 text-left transition-all ${
                    data.substance === sub
                      ? 'border-teal-500 bg-teal-50 text-teal-900'
                      : 'border-gray-200 hover:border-teal-300 hover:bg-teal-50/50 text-gray-700'
                  }`}
                >
                  {sub}
                </button>
              ))}
            </div>
          </motion.div>
        );
      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-serif text-teal-900 mb-6">
              ¿En qué etapa de abstinencia te encuentras?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {STAGES.map((stage) => (
                <button
                  key={stage}
                  onClick={() => setData({ ...data, stage })}
                  className={`p-4 rounded-xl border-2 text-left transition-all ${
                    data.stage === stage
                      ? 'border-teal-500 bg-teal-50 text-teal-900'
                      : 'border-gray-200 hover:border-teal-300 hover:bg-teal-50/50 text-gray-700'
                  }`}
                >
                  {stage}
                </button>
              ))}
            </div>
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Días exactos limpio <span className="text-rose-500">*Obligatorio</span>
              </label>
              <input
                type="number"
                min="0"
                required
                value={data.cleanDays === null ? '' : data.cleanDays}
                onChange={(e) =>
                  setData({ ...data, cleanDays: e.target.value === '' ? null : parseInt(e.target.value) })
                }
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-teal-500 focus:ring-0"
                placeholder="Ej. 5"
              />
            </div>
          </motion.div>
        );
      case 3:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-serif text-teal-900 mb-6">
              ¿Qué síntomas estás experimentando?
            </h2>
            <p className="text-gray-600 mb-4">Selecciona todos los que apliquen para {data.substance}.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {(data.substance ? SYMPTOMS_BY_SUBSTANCE[data.substance] : []).map((symptom) => (
                <button
                  key={symptom}
                  onClick={() => toggleSymptom(symptom)}
                  className={`p-3 rounded-xl border-2 text-left transition-all text-sm ${
                    data.symptoms.includes(symptom)
                      ? 'border-teal-500 bg-teal-50 text-teal-900'
                      : 'border-gray-200 hover:border-teal-300 hover:bg-teal-50/50 text-gray-700'
                  }`}
                >
                  <div className="flex items-center">
                    <div
                      className={`w-5 h-5 rounded border mr-3 flex items-center justify-center ${
                        data.symptoms.includes(symptom)
                          ? 'bg-teal-500 border-teal-500'
                          : 'border-gray-300'
                      }`}
                    >
                      {data.symptoms.includes(symptom) && (
                        <svg
                          className="w-3 h-3 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={3}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      )}
                    </div>
                    {symptom}
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        );
      case 4:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-serif text-teal-900 mb-6">
              Costo aproximado
            </h2>
            <p className="text-gray-600 mb-6">
              Para ayudarte a visualizar tu progreso, ¿cuánto gastabas
              aproximadamente al día en esta sustancia? (en MXN)
            </p>
            <div>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium text-lg">
                  $
                </span>
                <input
                  type="number"
                  min="0"
                  value={data.dailyCost || ''}
                  onChange={(e) =>
                    setData({
                      ...data,
                      dailyCost: parseFloat(e.target.value) || 0,
                    })
                  }
                  className="w-full p-4 pl-8 border-2 border-gray-200 rounded-xl focus:border-teal-500 focus:ring-0 text-lg"
                  placeholder="0.00"
                />
              </div>
            </div>
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-teal-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-3xl shadow-xl p-8 md:p-12">
        <div className="mb-8 flex justify-between items-center">
          <div className="flex space-x-2">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className={`h-2 w-12 rounded-full transition-colors ${
                  i <= step ? 'bg-teal-500' : 'bg-gray-200'
                }`}
              />
            ))}
          </div>
          <span className="text-sm font-medium text-teal-600">
            Paso {step} de 4
          </span>
        </div>

        <div className="min-h-[400px]">{renderStep()}</div>

        <div className="mt-8 flex justify-between pt-6 border-t border-gray-100">
          <button
            onClick={handlePrev}
            disabled={step === 1}
            className={`flex items-center px-6 py-3 rounded-xl font-medium transition-colors ${
              step === 1
                ? 'text-gray-300 cursor-not-allowed'
                : 'text-teal-700 hover:bg-teal-50'
            }`}
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Atrás
          </button>

          {step < 4 ? (
            <button
              onClick={handleNext}
              disabled={
                (step === 1 && !data.substance) || 
                (step === 2 && (!data.stage || data.cleanDays === null || Number.isNaN(data.cleanDays)))
              }
              className={`flex items-center px-8 py-3 rounded-xl font-medium transition-all ${
                (step === 1 && !data.substance) || (step === 2 && (!data.stage || data.cleanDays === null || Number.isNaN(data.cleanDays)))
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-teal-600 text-white hover:bg-teal-700 shadow-md hover:shadow-lg'
              }`}
            >
              Siguiente
              <ChevronRight className="w-5 h-5 ml-2" />
            </button>
          ) : (
            <button
              onClick={() => onComplete(data)}
              className="flex items-center px-8 py-3 rounded-xl font-medium bg-emerald-600 text-white hover:bg-emerald-700 shadow-md hover:shadow-lg transition-all"
            >
              Ver mi plan
              <ChevronRight className="w-5 h-5 ml-2" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
