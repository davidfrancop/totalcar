// ========================
// Archivo: src/pages/CrearVehiculo.jsx
// ========================
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { getToken, isAuthenticated, logout } from "../utils/auth";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export default function CrearVehiculo() {
  const { id } = useParams(); // id_cliente
  const navigate = useNavigate();
  const [vehiculo, setVehiculo] = useState({
    matricula: "",
    marca: "",
    modelo: "",
    anio: "",
    vin: ""
  });

  useEffect(() => {
    if (!isAuthenticated()) {
      logout();
      navigate("/login");
    }
  }, [navigate]);

  const handleChange = (e) => {
    setVehiculo({ ...vehiculo, [e.target.name]: e.target.value });
  };

  const guardarVehiculo = async () => {
    try {
      const token = getToken();
      const nuevoVehiculo = { ...vehiculo, id_cliente: id };
      await axios.post(`${BASE_URL}/vehiculos`, nuevoVehiculo, {
        headers: { Authorization: `Bearer ${token}` }
      });
      navigate(`/admin/clientes/${id}/editar`);
    } catch (err) {
      console.error("Error al guardar vehículo:", err);
      alert("No se pudo registrar el vehículo");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      {/* .src/pages/CrearVehiculo.jsx */}
      <h2 className="text-xl font-bold mb-4">Registrar Vehículo</h2>

      <div className="space-y-4">
        <input
          type="text"
          name="matricula"
          placeholder="Matrícula"
          value={vehiculo.matricula}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />
        <input
          type="text"
          name="marca"
          placeholder="Marca"
          value={vehiculo.marca}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />
        <input
          type="text"
          name="modelo"
          placeholder="Modelo"
          value={vehiculo.modelo}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />
        <input
          type="text"
          name="anio"
          placeholder="Año"
          value={vehiculo.anio}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />
        <input
          type="text"
          name="vin"
          placeholder="VIN"
          value={vehiculo.vin}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      <button
        onClick={guardarVehiculo}
        className="mt-6 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Guardar Vehículo
      </button>
    </div>
  );
}
