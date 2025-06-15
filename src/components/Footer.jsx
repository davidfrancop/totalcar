// src/components/Footer.jsx

import { MapPinIcon, PhoneIcon, ClockIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-[#002B5B] text-white py-10 px-6 mt-12">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-10">

        {/* Logo + nombre */}
        <div>
          <h2 className="text-xl font-bold flex items-center gap-2 mb-2">
            <span className="text-[#FFD500]">🔧</span> TotalCar
          </h2>
          <p className="text-sm text-[#F4F4F4]">
            Expertos en lo que tu auto necesita.
          </p>
        </div>

        {/* Enlaces */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-[#FFD500]">Enlaces</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-[#FFD500]">Inicio</Link></li>
            <li><Link to="/servicios" className="hover:text-[#FFD500]">Servicios</Link></li>
            <li><Link to="/promociones" className="hover:text-[#FFD500]">Promociones</Link></li>
            <li><Link to="/contacto" className="hover:text-[#FFD500]">Contacto</Link></li>
          </ul>
        </div>

        {/* Contacto */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-[#FFD500]">Contacto</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2"><MapPinIcon className="w-4 h-4" /> Calle Taller 123, Berlín</li>
            <li className="flex items-center gap-2"><PhoneIcon className="w-4 h-4" /> +49 174 5396548</li>
            <li><a href="https://wa.me/491745396548" target="_blank" className="hover:text-[#FFD500]">Escríbenos por WhatsApp</a></li>
          </ul>
        </div>

        {/* Horario */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-[#FFD500]">Horario</h3>
          <ul className="text-sm space-y-1">
            <li className="flex items-center gap-2"><ClockIcon className="w-4 h-4" /> Lun–Vie: 7:30–17:30</li>
            <li className="flex items-center gap-2"><ClockIcon className="w-4 h-4" /> Sáb y Dom: Cerrado</li>
          </ul>
        </div>
      </div>

      <div className="text-center text-xs text-[#F4F4F4] mt-10 border-t border-[#F4F4F4]/20 pt-4">
        © 2025 TotalCar. Todos los derechos reservados.
      </div>
    </footer>
  );
}
