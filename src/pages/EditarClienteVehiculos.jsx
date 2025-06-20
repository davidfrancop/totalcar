// ========================
// Archivo: src/pages/EditarClienteVehiculos.jsx
// ========================

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { ArrowLeft, Pencil, Trash2, Plus } from "lucide-react";
import { isAuthenticated, getRol, logout, getToken } from "../utils/auth";

export default function EditarClienteVehiculos() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cliente, setCliente] = useState(null);
  const [vehiculos, setVehiculos] = useState([]);
  const [mensaje, setMensaje] = useState("");
  const rol = getRol();

  useEffect(() => {
    if (!isAuthenticated()) return navigate("/login");
    cargarDetalle();
    // eslint-disable-next-line
  }, []);

  const cargarDetalle = async () => {
    try {
      const token = getToken();
      const res = await axios.get(`http://localhost:4000/clientes/${id}/detalle`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCliente(res.data);
      cargarVehiculos(id);
      console.log("✅ Cliente cargado:", res.data);
    } catch (error) {
      console.error("❌ Error al cargar datos del cliente", error);
      console.error("➡️ Detalle:", error.response?.data);
      setMensaje("No se pudo cargar el cliente.");
    }
  };

  const cargarVehiculos = async (idCliente) => {
    try {
      const token = getToken();
      const res = await axios.get(`http://localhost:4000/vehiculos/cliente/${idCliente}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setVehiculos(res.data);
    } catch (error) {
      console.error("Error al cargar vehículos del cliente:", error);
    }
  };

  return (
    <div className="p-4">
      {rol === "admin" && (
        <button
          className="flex items-center mb-4 text-sm text-blue-600 hover:underline"
          onClick={() => navigate("/admin")}
        >
          <ArrowLeft className="mr-1 h-4 w-4" />
          Volver al panel
        </button>
      )}

      <h1 className="text-xl font-bold mb-4">Editar Cliente</h1>

      {mensaje && <p className="text-red-600 mb-4">{mensaje}</p>}

      {cliente && (
        <div className="bg-white p-4 rounded shadow mb-6">
          <p><strong>Nombre:</strong> {cliente.nombre} {cliente.apellido}</p>
          <p><strong>DNI:</strong> {cliente.dni}</p>
          <p><strong>Email:</strong> {cliente.email || "-"}</p>
          <p><strong>Teléfono:</strong> {cliente.telefono_movil || "-"}</p>
          {cliente.empresa && (
            <p><strong>Empresa:</strong> {cliente.nombre_empresa || "-"}</p>
          )}
        </div>
      )}

      <h2 className="text-lg font-semibold mb-2">Vehículos</h2>
      <div className="space-y-2">
        {vehiculos.map((vehiculo) => (
          <div key={vehiculo.id_vehiculo} className="bg-gray-100 p-3 rounded flex justify-between items-center">
            <div>
              <p><strong>Matrícula:</strong> {vehiculo.matricula}</p>
              <p><strong>Marca:</strong> {vehiculo.marca}</p>
              <p><strong>Modelo:</strong> {vehiculo.modelo}</p>
            </div>
            <div className="flex space-x-2">
              <button
                className="text-blue-600 hover:text-blue-800"
                onClick={() => navigate(`/vehiculos/${vehiculo.id_vehiculo}`)}
              >
                <Pencil size={18} />
              </button>
              <button
                className="text-red-600 hover:text-red-800"
                onClick={() => console.log("Eliminar vehículo", vehiculo.id_vehiculo)}
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <button
        className="mt-4 inline-flex items-center px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        onClick={() => navigate(`/admin/clientes/${id}/vehiculo-nuevo`)}
      >
        <Plus className="mr-1" size={16} />
        Agregar Vehículo
      </button>
    </div>
  );
}
