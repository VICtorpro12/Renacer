import { motion } from 'motion/react';
import { ArrowLeft, Brain, Activity, Zap } from 'lucide-react';

interface EducationProps {
  onBack: () => void;
}

export default function Education({ onBack }: EducationProps) {
  return (
    <div className="min-h-screen bg-teal-50/50 p-4 md:p-8 font-sans">
      <div className="max-w-4xl mx-auto space-y-8">
        
        <button
          onClick={onBack}
          className="flex items-center text-teal-700 hover:text-teal-900 transition-colors mb-8"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Volver a mi plan
        </button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-teal-100"
        >
          <h1 className="text-4xl font-serif text-teal-900 mb-6">
            La Ciencia de la Recuperación
          </h1>
          <p className="text-xl text-teal-700 font-light mb-12">
            Entiende cómo la meditación y la hipnosis ayudan a tu cerebro a sanar durante el síndrome de abstinencia.
          </p>

          <div className="space-y-12">
            
            {/* Section 1: Neurotransmitters */}
            <section>
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-amber-100 p-3 rounded-2xl">
                  <Zap className="w-8 h-8 text-amber-600" />
                </div>
                <h2 className="text-2xl font-medium text-gray-900">
                  El Déficit de Neurotransmisores
                </h2>
              </div>
              <div className="prose prose-teal max-w-none text-gray-600">
                <p className="mb-4">
                  Cuando consumes sustancias adictivas, tu cerebro se inunda artificialmente de neurotransmisores como la <strong>dopamina</strong> (placer y recompensa), <strong>serotonina</strong> (estado de ánimo) y <strong>endorfinas</strong> (alivio del dolor).
                </p>
                <p className="mb-4">
                  Con el tiempo, el cerebro deja de producir estas sustancias por sí mismo porque se acostumbra a recibirlas de forma externa. Al dejar la sustancia (abstinencia), te encuentras en un estado de déficit profundo. Esto causa depresión, ansiedad, fatiga y antojos intensos.
                </p>
              </div>
            </section>

            {/* Section 2: How Meditation Helps */}
            <section>
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-emerald-100 p-3 rounded-2xl">
                  <Brain className="w-8 h-8 text-emerald-600" />
                </div>
                <h2 className="text-2xl font-medium text-gray-900">
                  ¿Por qué ayuda la Meditación y la Hipnosis?
                </h2>
              </div>
              <div className="prose prose-teal max-w-none text-gray-600">
                <p className="mb-4">
                  La meditación y la hipnosis no son solo relajación; son herramientas neuroplásticas. Ayudan a "reiniciar" la fábrica química de tu cerebro:
                </p>
                <ul className="list-disc pl-6 space-y-3 mb-6">
                  <li>
                    <strong>Generación natural de Dopamina:</strong> Estudios demuestran que la meditación profunda (especialmente enfocada en la respiración y la atención plena) aumenta la liberación de dopamina en el cuerpo estriado del cerebro hasta en un 65%.
                  </li>
                  <li>
                    <strong>Reducción de Cortisol:</strong> El síndrome de abstinencia dispara el cortisol (hormona del estrés). La respiración profunda activa el nervio vago, reduciendo drásticamente el cortisol y calmando la ansiedad.
                  </li>
                  <li>
                    <strong>Aumento de GABA:</strong> El ácido gamma-aminobutírico (GABA) es el principal neurotransmisor inhibidor (calmante). La meditación aumenta sus niveles, ayudando con el insomnio y la irritabilidad.
                  </li>
                </ul>
              </div>
            </section>

            {/* Section 3: Brain Waves */}
            <section>
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-indigo-100 p-3 rounded-2xl">
                  <Activity className="w-8 h-8 text-indigo-600" />
                </div>
                <h2 className="text-2xl font-medium text-gray-900">
                  El Poder de las Ondas Cerebrales
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-teal-50 p-6 rounded-2xl border border-teal-100">
                  <h3 className="font-bold text-teal-900 mb-2">Ondas Alpha (8-12 Hz)</h3>
                  <p className="text-sm text-teal-800">
                    Estado de relajación despierta. Ayudan a generar serotonina y reducir el estrés agudo. Ideales para la mañana o cuando sientes ansiedad leve.
                  </p>
                </div>
                <div className="bg-purple-50 p-6 rounded-2xl border border-purple-100">
                  <h3 className="font-bold text-purple-900 mb-2">Ondas Theta (4-8 Hz)</h3>
                  <p className="text-sm text-purple-800">
                    Estado meditativo profundo e hipnosis. Aquí es donde ocurre la reprogramación subconsciente para vencer los antojos (craving) y sanar traumas.
                  </p>
                </div>
                <div className="bg-sky-50 p-6 rounded-2xl border border-sky-100">
                  <h3 className="font-bold text-sky-900 mb-2">Ondas Gamma (30-100 Hz)</h3>
                  <p className="text-sm text-sky-800">
                    Alta concentración y procesamiento cognitivo. Ayudan a combatir la "niebla mental" y la fatiga extrema común en la abstinencia de estimulantes.
                  </p>
                </div>
              </div>
            </section>

          </div>
        </motion.div>
      </div>
    </div>
  );
}
