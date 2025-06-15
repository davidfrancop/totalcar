// src/components/BannerPromocion.jsx

import { motion } from "framer-motion";
import { Sparkles, X, Snowflake, SunSnow, Zap, Sun, ArrowBigRight } from "lucide-react";
import { useState } from "react";

export default function BannerPromocion() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative bg-blue-100 border border-blue-400 text-blue-800 rounded-2xl shadow-md p-6 flex flex-col sm:flex-row items-center justify-between gap-4 mb-8"
    >
      {/* Botón de cerrar */}
      <button
        className="absolute top-2 right-2 text-blue-600 hover:text-red-600"
        onClick={() => setVisible(false)}
        aria-label="Cerrar promoción"
      >
        <X className="w-5 h-5" />
      </button>

      <div className="flex items-start gap-5 text-left">
        <ArrowBigRight className="text-yellow-500 w-10 h-10 animate-bounce mt-1" />
        <div>
          <p className="text-lg font-semibold">
           ☀️ Promo Verano: ¡Pon tu A/A a punto! ❄️
          </p>
          <p className="text-sm mt-2">
            🔧 Mantenimiento + carga de gas <br />
            🧼 Limpieza de filtros + revisión de fugas <br />
            🎁 Lectura OBD GRATIS<br />
            <span className="font-bold text-blue-900">Todo por solo 400 Euros</span> — ¡Solo en junio!
          </p>
        </div>
      </div>

      <a
        href="https://wa.me/+491745396548" // ← Cambia por tu número real
        target="_blank"
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-xl transition-all"
      >
        ¡Agendar cita!
      </a>
    </motion.div>
  );
}
