// Archivo: src/pages/AdminDashboard.jsx

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isAuthenticated, getRol, logout } from "../utils/auth";
import {
  Users,
  Car,
  ClipboardList,
  Wrench,
  LogOut,
} from "lucide-react";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const rol = getRol();

  useEffect(() => {
    if (!isAuthenticated() || rol !== "admin") {
      navigate("/login");
    }
  }, [navigate, rol]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const opciones = [
    {
      titulo: "Clientes y Vehículos",
      icono: <Car className="w-6 h-6 text-gray-700" />,
      onClick: () => navigate("/admin/clientes"),
    },
    {
      titulo: "Usuarios",
      icono: <Users className="w-6 h-6 text-gray-700" />,
      onClick: () => navigate("/admin/usuarios"),
    },
    {
      titulo: "Historial de Servicios",
      icono: <ClipboardList className="w-6 h-6 text-gray-700" />,
      onClick: () => navigate("/admin/servicios"),
    },
    {
      titulo: "Tareas del Taller",
      icono: <Wrench className="w-6 h-6 text-gray-700" />,
      onClick: () => navigate("/admin/taller"),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      {/* .src/pages/AdminDashboard.jsx */}
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow p-8">
        <h1 className="text-3xl font-bold text-center mb-10 text-gray-800">
          Centro de Operaciones - TotalCar
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {opciones.map((opcion, i) => (
            <div
              key={i}
              onClick={opcion.onClick}
              className="cursor-pointer border border-gray-200 rounded-xl p-5 flex items-center gap-4 hover:shadow-md transition"
            >
              <div className="bg-gray-100 p-3 rounded-full">{opcion.icono}</div>
              <span className="text-gray-800 font-medium text-sm">{opcion.titulo}</span>
            </div>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-sm text-gray-600 hover:text-red-600 transition"
          >
            <LogOut className="w-5 h-5" />
            Cerrar sesión
          </button>
        </div>
      </div>
    </div>
  );
}
