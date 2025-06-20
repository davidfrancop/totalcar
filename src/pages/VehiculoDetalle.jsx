// ========================
// Archivo: src/pages/VehiculoDetalle.jsx
// ========================

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  ArrowLeft,
  Calendar,
  Car,
  BatteryCharging,
  Fuel,
  Wrench,
  Edit
} from "lucide-react";
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
    <div className="p-4 max-w-3xl mx-auto">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-blue-600 hover:underline mb-4"
      >
        <ArrowLeft size={16} className="mr-1" />
        Volver
      </button>

      <div className="flex justify-between items-center mb-2">
        <h1 className="text-xl font-bold">Ficha del Vehículo</h1>
        <button
          onClick={() => navigate(`/admin/vehiculos/${vehiculo.id_vehiculo}/editar`)}
          className="flex items-center gap-1 text-green-600 hover:underline"
        >
          <Edit size={16} /> Editar
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
        <p><Car size={14} className="inline mr-1" /><strong>Matrícula:</strong> {vehiculo.matricula}</p>
        <p><strong>Marca:</strong> {vehiculo.marca}</p>
        <p><strong>Modelo:</strong> {vehiculo.modelo}</p>
        <p><strong>Año:</strong> {vehiculo.anio || "-"}</p>
        <p><strong>VIN:</strong> {vehiculo.vin}</p>
        <p><strong>Combustible:</strong> {vehiculo.tipo_combustible || "-"}</p>
        <p><strong>Kilometraje:</strong> {vehiculo.kilometraje || "-"} km</p>
        <p><strong>Transmisión:</strong> {vehiculo.transmision || "-"}</p>
        <p><strong>Color:</strong> {vehiculo.color || "-"}</p>
        <p><strong>HSN/TSN:</strong> {vehiculo.hsn_tsn || "-"}</p>
        <p><BatteryCharging size={14} className="inline mr-1" /><strong>Batería:</strong> {vehiculo.bateria_estado || "-"}%</p>
        <p><strong>TÜV válido hasta:</strong> {vehiculo.tuv_valido_hasta || "-"}</p>
        <p><Calendar size={14} className="inline mr-1" /><strong>Ingreso taller:</strong> {vehiculo.fecha_ingreso_taller || "-"}</p>
        <p><strong>Próximo servicio:</strong> {vehiculo.proximo_servicio || "-"}</p>
        <p><strong>Estado:</strong> {vehiculo.estado}</p>
        <p><strong>Cliente:</strong> {vehiculo.nombre_cliente}</p>
      </div>

      <div className="mt-6">
        <h2 className="text-lg font-semibold mb-2 flex items-center">
          <Wrench size={16} className="mr-1" /> Historial de Servicios
        </h2>
        {vehiculo.historial_servicios ? (
          <pre className="bg-gray-100 p-2 rounded text-xs whitespace-pre-wrap">
            {vehiculo.historial_servicios}
          </pre>
        ) : (
          <p className="text-gray-500 text-sm">No hay historial disponible.</p>
        )}
      </div>
    </div>
  );
}
