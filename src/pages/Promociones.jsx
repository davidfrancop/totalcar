// src/pages/Promociones.jsx

import { BoltIcon, TagIcon, GiftIcon, Battery100Icon } from '@heroicons/react/24/solid';
import { Snowflake } from 'lucide-react';
import { GiCarWheel } from 'react-icons/gi';

const promociones = [
  {
    titulo: "Revisión GRATIS del aire",
    descripcion: "Incluida con el mantenimiento general.",
    icono: <Snowflake className="h-8 w-8 text-[#4FA3D1]" />,
  },
  {
    titulo: "Cambio de aceite + limpieza básica",
    descripcion: "Mantén tu auto en forma sin coste adicional.",
    icono: <TagIcon className="h-8 w-8 text-[#FFD500]" />,
  },
  {
    titulo: "Oferta flash: Diagnóstico GRATIS",
    descripcion: "¡Solo por 48 horas! Agenda ya.",
    icono: <BoltIcon className="h-8 w-8 text-[#FF6B00]" />,
  },
  {
    titulo: "Regalo: Lectura de códigos OBD",
    descripcion: "Incluido con tu próximo mantenimiento.",
    icono: <GiftIcon className="h-8 w-8 text-[#2B2B2B]" />,
  },
  {
    titulo: "Descuento en baterías",
    descripcion: "Si tu batería tiene +3 años, te damos precio especial.",
    icono: <Battery100Icon className="h-8 w-8 text-[#27AE60]" />,
  },
];

export default function Promociones() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-center text-[#002B5B] mb-10">
        Promociones
      </h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {promociones.map((promo, index) => (
          <div
            key={index}
            className="flex items-start gap-4 p-5 bg-[#F4F4F4] border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition"
          >
            {promo.icono}
            <div>
              <h3 className="text-xl font-semibold text-[#002B5B]">{promo.titulo}</h3>
              <p className="text-[#2B2B2B] text-sm">{promo.descripcion}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
