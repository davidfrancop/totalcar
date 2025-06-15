// Archivo: src/components/Header.jsx

import { useState } from "react";
import { Link } from 'react-router-dom';
import {
  HomeIcon, UserIcon, TagIcon, PhoneIcon,
  Bars3Icon, XMarkIcon, WrenchScrewdriverIcon, LockClosedIcon
} from '@heroicons/react/24/outline';
import { motion } from "framer-motion";

export default function Header() {
  const [menuAbierto, setMenuAbierto] = useState(false);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-[#002B5B] text-white shadow-md fixed w-full z-50"
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-3">
        {/* LOGO como imagen */}
        <Link to="/" className="flex items-center gap-3">
          <img
            src="/img/TotalCar_Logo_Transparent.png"
            alt="TotalCar Logo"
            className="h-14 w-auto object-contain"
          />
          <span className="text-4xl font-bold">
            <span className="text-[#FF6B00]">Total</span>
            <span className="text-white">Car</span>
          </span>
        </Link>

        {/* Botón hamburguesa */}
        <button
          className="md:hidden text-white"
          onClick={() => setMenuAbierto(!menuAbierto)}
          aria-label="Abrir menú"
        >
          {menuAbierto ? (
            <XMarkIcon className="w-7 h-7" />
          ) : (
            <Bars3Icon className="w-7 h-7" />
          )}
        </button>

        {/* Menú en escritorio */}
        <nav className="hidden md:flex space-x-6 text-sm font-medium">
          <Link to="/" className="flex items-center gap-1 hover:text-[#FF6B00]"><HomeIcon className="h-5 w-5" />Inicio</Link>
          <Link to="/nosotros" className="flex items-center gap-1 hover:text-[#FF6B00]"><UserIcon className="h-5 w-5" />Nosotros</Link>
          <Link to="/promociones" className="flex items-center gap-1 hover:text-[#FF6B00]"><TagIcon className="h-5 w-5" />Promociones</Link>
          <Link to="/servicios" className="flex items-center gap-1 hover:text-[#FF6B00]"><WrenchScrewdriverIcon className="h-5 w-5" />Servicios</Link>
          <Link to="/contacto" className="flex items-center gap-1 hover:text-[#FF6B00]"><PhoneIcon className="h-5 w-5" />Contacto</Link>
          <Link to="/admin" className="flex items-center gap-1 hover:text-[#FF6B00]">
            <LockClosedIcon className="h-5 w-5" /> Login
          </Link>
        </nav>
      </div>

      {/* Menú móvil */}
      {menuAbierto && (
        <nav className="md:hidden bg-[#002B5B] px-6 pb-4 pt-2 flex flex-col space-y-3 text-sm font-semibold">
          <Link to="/" onClick={() => setMenuAbierto(false)} className="flex items-center gap-2 hover:text-[#FF6B00]"><HomeIcon className="h-5 w-5" />Inicio</Link>
          <Link to="/nosotros" onClick={() => setMenuAbierto(false)} className="flex items-center gap-2 hover:text-[#FF6B00]"><UserIcon className="h-5 w-5" />Nosotros</Link>
          <Link to="/promociones" onClick={() => setMenuAbierto(false)} className="flex items-center gap-2 hover:text-[#FF6B00]"><TagIcon className="h-5 w-5" />Promociones</Link>
          <Link to="/servicios" onClick={() => setMenuAbierto(false)} className="flex items-center gap-2 hover:text-[#FF6B00]"><WrenchScrewdriverIcon className="h-5 w-5" />Servicios</Link>
          <Link to="/contacto" onClick={() => setMenuAbierto(false)} className="flex items-center gap-2 hover:text-[#FF6B00]"><PhoneIcon className="h-5 w-5" />Contacto</Link>
          <Link to="/admin" onClick={() => setMenuAbierto(false)} className="flex items-center gap-2 hover:text-[#FF6B00]">
            <LockClosedIcon className="h-5 w-5" /> Login
          </Link>
        </nav>
      )}
    </motion.header>
  );
}
