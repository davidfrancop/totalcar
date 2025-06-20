// ========================
// Archivo: src/pages/AdminVehiculos.jsx
// ========================

import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { isAuthenticated, getRol, logout, getToken } from "../utils/auth";
import { LogOut, ArrowLeft, Eye } from "lucide-react";

export default function AdminVehiculos() {
  const [vehiculos, setVehiculos] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const navigate = useNavigate();
  const rol = getRol();

  useEffect(() => {
    if (!isAuthenticated()) return navigate("/login");
    cargarVehiculos();
    // eslint-disable-next-line
  }, []);

  const cargarVehiculos = async () => {
    try {
      const token = getToken();
      const res = await axios.get("/vehiculos", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setVehiculos(res.data);
      console.log("🚗 Vehículos cargados:", res.data);
    } catch (error) {
      console.error("Error al cargar vehículos:", error);
    }
  };

  const vehiculosFiltrados = vehiculos.filter((v) =>
    v.matricula.toLowerCase().includes(busqueda.toLowerCase())
  );

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleVolver = () => {
    navigate("/admin/dashboard");
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Gestión de Vehículos</h1>
        <div className="flex gap-4">
          <button
            onClick={handleVolver}
            className="flex items-center gap-1 text-blue-600 hover:underline"
          >
            <ArrowLeft size={18} /> Volver
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1 text-red-600 hover:underline"
          >
            <LogOut size={18} /> Cerrar sesión
          </button>
        </div>
      </div>

      <input
        type="text"
        placeholder="Buscar por matrícula..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        className="border px-2 py-1 rounded w-full max-w-md mb-4"
      />

      <table className="w-full border-collapse border text-sm">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-2 py-1">Matrícula</th>
            <th className="border px-2 py-1">Marca</th>
            <th className="border px-2 py-1">Modelo</th>
            <th className="border px-2 py-1">Año</th>
            <th className="border px-2 py-1">Cliente</th>
            <th className="border px-2 py-1">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {vehiculosFiltrados.map((v) => (
            <tr key={v.id_vehiculo} className="hover:bg-gray-100">
              <td className="border px-2 py-1">{v.matricula}</td>
              <td className="border px-2 py-1">{v.marca}</td>
              <td className="border px-2 py-1">{v.modelo}</td>
              <td className="border px-2 py-1">{v.anio || "-"}</td>
              <td className="border px-2 py-1">{v.nombre_cliente || "-"}</td>
              <td className="border px-2 py-1">
                <button
                  onClick={() => navigate(`/vehiculos/${v.id_vehiculo}`)}
                  className="text-blue-600 hover:underline flex items-center gap-1"
                >
                  <Eye size={16} /> Ver ficha
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
