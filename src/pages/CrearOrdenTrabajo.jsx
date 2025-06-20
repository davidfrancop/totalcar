// ========================
// Archivo: src/pages/CrearOrdenTrabajo.jsx
// ========================
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { isAuthenticated, logout } from "../utils/auth";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export default function CrearOrdenTrabajo() {
  const location = useLocation();
  const navigate = useNavigate();
  const { id_cliente, id_vehiculo } = location.state || {};

  const [cliente, setCliente] = useState(null);
  const [vehiculo, setVehiculo] = useState(null);
  const [descripcion, setDescripcion] = useState("");
  const [estado, setEstado] = useState("pendiente");

  useEffect(() => {
    if (!isAuthenticated()) {
      logout();
      navigate("/login");
    } else {
      if (id_cliente) cargarCliente();
      if (id_vehiculo) cargarVehiculo();
    }
  }, [id_cliente, id_vehiculo]);

  const cargarCliente = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/clientes/${id_cliente}`);
      setCliente(res.data);
    } catch (err) {
      console.error("Error al cargar cliente", err);
    }
  };

  const cargarVehiculo = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/vehiculos/${id_vehiculo}`);
      setVehiculo(res.data);
    } catch (err) {
      console.error("Error al cargar vehículo", err);
    }
  };

  const guardarOrden = async () => {
    try {
      const nuevaOrden = {
        id_cliente,
        id_vehiculo,
        descripcion,
        estado,
        fecha_ingreso: new Date().toISOString().slice(0, 10),
      };
      await axios.post(`${BASE_URL}/ordenes`, nuevaOrden);
      navigate("/admin/vehiculos");
    } catch (err) {
      console.error("Error al guardar orden", err);
      alert("Hubo un problema al guardar la orden");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      {/* .src/pages/CrearOrdenTrabajo.jsx */}
      <h2 className="text-2xl font-bold mb-6">Crear Orden de Trabajo</h2>

      {cliente && (
        <div className="mb-4 p-4 bg-gray-100 rounded-xl">
          <p><strong>Cliente:</strong> {cliente.nombre} {cliente.apellido}</p>
          <p><strong>Email:</strong> {cliente.email}</p>
        </div>
      )}

      {vehiculo && (
        <div className="mb-4 p-4 bg-gray-100 rounded-xl">
          <p><strong>Vehículo:</strong> {vehiculo.marca} {vehiculo.modelo}</p>
          <p><strong>Matrícula:</strong> {vehiculo.matricula}</p>
          <p><strong>VIN:</strong> {vehiculo.vin}</p>
        </div>
      )}

      <div className="mb-6">
        <label className="block mb-2 font-medium">Descripción del problema / trabajo</label>
        <textarea
          className="w-full border border-gray-300 rounded-xl p-2"
          rows="4"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
        ></textarea>
      </div>

      <button
        onClick={guardarOrden}
        className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700"
      >
        Guardar Orden
      </button>
    </div>
  );
}
