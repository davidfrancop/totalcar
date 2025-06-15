// src/pages/Inicio.jsx

// import BannerPromocion from "../components/BannerPromocion"; //

import BannerPromocion from "../components/BannerPromocion";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Inicio() {
  return (
    <>
      {/* <BannerPromocion /> */}

      <section className="relative bg-gradient-to-br from-[#002B5B] to-[#004080] text-white text-center py-24 px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Bienvenido a <span className="text-[#FF6B00]">Total</span><span className="text-white">Car</span>
          </h1>
          <p className="text-lg md:text-xl text-[#F4F4F4] mb-8">
            Tu taller de confianza para vehículos tradicionales, híbridos y eléctricos.
          </p>
          <Link
            to="/Promociones"
            className="inline-block bg-[#FF6B00] hover:bg-[#cc5500] text-white font-bold py-3 px-6 rounded-xl transition"
          >
            Ver nuestras promociones
          </Link>
        </motion.div>
      </section>
    </>
  );
}
