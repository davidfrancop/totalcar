// Archivo: src/pages/EditarClienteVehiculos.jsx

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { ArrowLeft, Pencil, Eye } from "lucide-react";
import { isAuthenticated, getRol } from "../utils/auth";

export default function EditarClienteVehiculos() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cliente, setCliente] = useState(null);
  const [vehiculos, setVehiculos] = useState([]);
  const [form, setForm] = useState({});
  const [mensaje, setMensaje] = useState("");
  const rol = getRol();

  useEffect(() => {
    if (!isAuthenticated()) return navigate("/login");
    cargarDetalle();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const cargarDetalle = async () => {
    try {
      const res = await axios.get(`http://localhost:4000/clientes/${id}/detalle`);
      setCliente(res.data.cliente);
      setForm({
        nombre: res.data.cliente.nombre || "",
        apellido: res.data.cliente.apellido || "",
        email: res.data.cliente.email || "",
        telefono_movil: res.data.cliente.telefono_movil || "",
        dni: res.data.cliente.dni || "",
        empresa: res.data.cliente.empresa || "No",
        nombre_empresa: res.data.cliente.nombre_empresa || "",
      });
      setVehiculos(res.data.vehiculos);
    } catch (error) {
      console.error("Error al cargar datos del cliente", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje("");

    try {
      await axios.put(`http://localhost:4000/clientes/${id}`, form);
      setMensaje("Datos actualizados con éxito");
    } catch (error) {
      console.error("Error al actualizar cliente", error);
      setMensaje("Error al guardar los cambios");
    }
  };

  if (!cliente) return <p className="p-4">Cargando cliente...</p>;

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Editar cliente</h2>
        {rol === "admin" && (
          <button
            onClick={() => navigate("/admin")}
            className="text-blue-600 hover:underline"
          >
            <ArrowLeft size={18} className="inline mr-1" />
            Volver al panel
          </button>
        )}
      </div>

      {mensaje && <div className="text-green-600 mb-2">{mensaje}</div>}

      <form onSubmit={handleSubmit} className="grid gap-4 mb-8">
        <div className="grid grid-cols-2 gap-4">
          <input
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
            placeholder="Nombre"
            className="border px-2 py-1 rounded"
          />
          <input
            name="apellido"
            value={form.apellido}
            onChange={handleChange}
            placeholder="Apellido"
            className="border px-2 py-1 rounded"
          />
        </div>
        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Correo electrónico"
          className="border px-2 py-1 rounded"
        />
        <input
          name="telefono_movil"
          value={form.telefono_movil}
          onChange={handleChange}
          placeholder="Teléfono móvil"
          className="border px-2 py-1 rounded"
        />
        <input
          name="dni"
          value={form.dni}
          onChange={handleChange}
          placeholder="DNI"
          className="border px-2 py-1 rounded"
        />
        <div className="grid grid-cols-2 gap-4">
          <select
            name="empresa"
            value={form.empresa}
            onChange={handleChange}
            className="border px-2 py-1 rounded"
          >
            <option value="No">Particular</option>
            <option value="Sí">Empresa</option>
          </select>
          {form.empresa === "Sí" && (
            <input
              name="nombre_empresa"
              value={form.nombre_empresa}
              onChange={handleChange}
              placeholder="Nombre de la empresa"
              className="border px-2 py-1 rounded"
            />
          )}
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Guardar cambios
        </button>
      </form>

      <h3 className="text-xl font-semibold mb-2">Vehículos del cliente</h3>
      <ul className="divide-y">
        {vehiculos.map((v) => (
          <li key={v.id_vehiculo} className="py-2 flex justify-between items-center">
            <div>
              <strong>{v.marca} {v.modelo}</strong> – {v.matricula} ({v.anio})
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => navigate(`/vehiculos/${v.id_vehiculo}`)}
                className="text-blue-600 hover:underline text-sm flex items-center"
              >
                <Eye className="w-4 h-4 mr-1" /> Ver
              </button>
              <button
                onClick={() => navigate(`/admin/vehiculos/${v.id_vehiculo}/editar`)}
                className="text-green-600 hover:underline text-sm flex items-center"
              >
                <Pencil className="w-4 h-4 mr-1" /> Editar
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
