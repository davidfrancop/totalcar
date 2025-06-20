// ========================
// Archivo: src/pages/AdminOrdenes.jsx
// ========================
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { isAuthenticated, logout } from "../utils/auth";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export default function AdminOrdenes() {
  const [ordenes, setOrdenes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated()) {
      logout();
      navigate("/login");
    } else {
      cargarOrdenes();
    }
  }, []);

  const cargarOrdenes = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/ordenes`);
      setOrdenes(res.data);
    } catch (error) {
      console.error("Error al cargar órdenes:", error);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      {/* .src/pages/AdminOrdenes.jsx */}
      <h2 className="text-2xl font-bold mb-6">Órdenes de Trabajo</h2>

      <div className="grid grid-cols-1 gap-4">
        {ordenes.map((orden) => (
          <div
            key={orden.id_orden}
            className="border rounded-xl p-4 bg-white shadow hover:shadow-md transition"
          >
            <p><strong>Orden:</strong> #{orden.id_orden}</p>
            <p><strong>Cliente ID:</strong> {orden.id_cliente}</p>
            <p><strong>Vehículo ID:</strong> {orden.id_vehiculo}</p>
            <p><strong>Fecha de ingreso:</strong> {orden.fecha_ingreso}</p>
            <p><strong>Estado:</strong> {orden.estado}</p>
            <p><strong>Descripción:</strong> {orden.descripcion}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
