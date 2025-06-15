// src/components/ServicioCard.jsx

import { motion } from "framer-motion";

export default function ServicioCard({ icono, titulo, descripcion }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-white rounded-xl shadow-md border border-[#F4F4F4] p-6 flex flex-col items-start gap-4 transition"
    >
      <div className="text-[#002B5B]">{icono}</div>
      <h3 className="text-lg font-bold text-[#2B2B2B]">{titulo}</h3>
      <p className="text-sm text-gray-600">{descripcion}</p>
    </motion.div>
  );
}
