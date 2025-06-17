// Archivo: src/pages/AdminDashboard.jsx

import { useState, useEffect } from "react";
import axios from "axios";
import { getRol, isAuthenticated, logout } from "../utils/auth";
import { useNavigate } from "react-router-dom";
import {
  LogOut,
  Users,
  Car,
  UserPlus,
  Settings,
  LayoutDashboard,
} from "lucide-react";

export default function AdminDashboard() {
  const [resumen, setResumen] = useState(null);
  const navigate = useNavigate();
  const rol = getRol();

  useEffect(() => {
    if (!isAuthenticated()) return navigate("/login");
    cargarResumen();
  }, []);

  const cargarResumen = async () => {
    try {
      const res = await axios.get("http://localhost:4000/resumen-dashboard");
      setResumen(res.data);
    } catch (error) {
      console.error("Error al cargar resumen:", error);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const Tarjeta = ({ icono: Icono, texto, ruta }) => (
    <div
      onClick={() => navigate(ruta)}
      className="cursor-pointer bg-white border rounded-xl shadow hover:shadow-md p-6 flex items-center gap-4 transition"
    >
      <Icono size={28} className="text-blue-600" />
      <div className="text-sm font-medium text-gray-800">{texto}</div>
    </div>
  );

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <LayoutDashboard size={26} />
          TotalCar – Panel de Administración
        </h1>
        <button
          onClick={handleLogout}
          className="flex items-center gap-1 text-red-600 hover:underline"
        >
          <LogOut size={18} /> Cerrar sesión
        </button>
      </div>

      {resumen && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="bg-blue-100 text-blue-800 p-4 rounded-xl font-semibold">
            🚗 Vehículos: {resumen.total_vehiculos}
          </div>
          <div className="bg-green-100 text-green-800 p-4 rounded-xl font-semibold">
            👥 Clientes: {resumen.total_clientes}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <Tarjeta icono={Car} texto="Ver vehículos" ruta="/admin/vehiculos" />
        <Tarjeta icono={Users} texto="Ver clientes" ruta="/admin/clientes" />
        <Tarjeta icono={UserPlus} texto="Crear cliente" ruta="/admin/crear-cliente" />
        {rol === "admin" && (
          <>
            <Tarjeta icono={Settings} texto="Gestión de usuarios" ruta="/admin/usuarios" />
          </>
        )}
      </div>
    </div>
  );
}
