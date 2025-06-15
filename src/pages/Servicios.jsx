// src/pages/Servicios.jsx
import ServicioCard from "../components/ServicioCard";
import { ChevronsLeftRightEllipsis, DropletIcon, SnowflakeIcon } from "lucide-react";
import { BoltIcon, WrenchScrewdriverIcon,  } from "@heroicons/react/24/outline";
import { Battery100Icon } from "@heroicons/react/24/solid";
import { GiCarWheel } from 'react-icons/gi';

const servicios = [
  {
    titulo: "Mantenimiento General",
    descripcion: "Servicio periódico con cambio de aceite, filtros y chequeo de sistemas clave.",
    icono: <DropletIcon className="h-8 w-8 text-[#2B2B2B]" />,
  },
  {
    titulo: "Aire Acondicionado",
    descripcion: "Chequeo técnico del compresor, carga de gas y revisión del sistema de climatización.",
    icono: <SnowflakeIcon className="h-8 w-8 text-[#4FA3D1]" />,
  },
  {
    titulo: "Diagnóstico por Escáner OBD2",
    descripcion: "Análisis electrónico con escáner OBD2 y lectura de parámetros del sistema.",
    icono: <ChevronsLeftRightEllipsis className="h-8 w-8 text-[#C0392B]" />,
  },
  {
    titulo: "Vehículos Híbridos y Eléctricos",
    descripcion: "Inspección técnica de sistemas eléctricos, regeneración y control de carga.",
    icono: <BoltIcon className="h-8 w-8 text-[#FF6B00]" />,
  },
  {
    titulo: "Revisión de Baterías",
    descripcion: "Evaluación de carga, voltaje, ciclos de vida y estado del sistema de alimentación.",
    icono: <Battery100Icon className="h-8 w-8 text-[#27AE60]" />,
  },
  {
    titulo: "Neumáticos, Frenos y Suspensión",
    descripcion: "Chequeo técnico de frenos, alineación del eje delantero y verificación del sistema de amortiguación y neumáticos.",
    icono: <GiCarWheel className="h-8 w-8 text-[#2B2B2B]" />,
  },
];

export default function Servicios() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-12">
      <h2 className="text-3xl font-bold text-center text-[#002B5B] mb-10">
        Nuestros Servicios
      </h2>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {servicios.map((servicio, i) => (
          <ServicioCard
            key={i}
            icono={servicio.icono}
            titulo={servicio.titulo}
            descripcion={servicio.descripcion}
          />
        ))}
      </div>
    </section>
  );
}
