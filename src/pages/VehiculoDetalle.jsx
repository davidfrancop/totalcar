// Archivo: src/pages/VehiculoDetalle.jsx

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { ArrowLeft } from "lucide-react";
import { isAuthenticated } from "../utils/auth";

export default function VehiculoDetalle() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [vehiculo, setVehiculo] = useState(null);

  useEffect(() => {
    if (!isAuthenticated()) return navigate("/login");
    cargarVehiculo();
    // eslint-disable-next-line
  }, []);

  const cargarVehiculo = async () => {
    try {
      const token = sessionStorage.getItem("token");
      const res = await axios.get(`http://localhost:4000/vehiculos/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setVehiculo(res.data);
    } catch (error) {
      console.error("Error al cargar vehículo:", error);
    }
  };

  if (!vehiculo) return <div className="p-4">Cargando...</div>;

  return (
    <div className="p-4">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-blue-600 hover:underline mb-4"
      >
        <ArrowLeft size={16} className="mr-1" />
        Volver
      </button>

      <h1 className="text-xl font-bold mb-2">Ficha del Vehículo</h1>

      <div className="space-y-2 text-sm">
        <p><strong>Matrícula:</strong> {vehiculo.matricula}</p>
        <p><strong>Marca:</strong> {vehiculo.marca}</p>
        <p><strong>Modelo:</strong> {vehiculo.modelo}</p>
        <p><strong>Año:</strong> {vehiculo.anio || "-"}</p>
        <p><strong>VIN:</strong> {vehiculo.vin}</p>
        <p><strong>Identificación:</strong> {vehiculo.codigo_identificacion}</p>
        <p><strong>Fecha de ingreso:</strong> {vehiculo.fecha_ingreso?.split("T")[0]}</p>
        <p><strong>Cliente:</strong> {vehiculo.nombre_cliente}</p>
        <p><strong>Historial:</strong> {vehiculo.historial_servicios || "—"}</p>
      </div>
    </div>
  );
}
