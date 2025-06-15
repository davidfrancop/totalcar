// src/pages/AdminClientes.jsx

import { useEffect, useState } from "react";
import axios from "axios";
import { Pencil, Trash2, LogOut, UserPlus, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function AdminClientes() {
  const [clientes, setClientes] = useState([]);
  const [editando, setEditando] = useState(null);
  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    email: "",
    telefono_movil: "",
    activo: true,
  });

  const navigate = useNavigate();
  const rol = localStorage.getItem("rol");

  useEffect(() => {
    cargarClientes();
  }, []);

  const cargarClientes = async () => {
    try {
      const res = await axios.get("http://localhost:4000/clientes");
      setClientes(res.data);
    } catch (error) {
      console.error("Error al cargar clientes:", error);
    }
  };

  const handleEditar = (cliente) => {
    setEditando(cliente.id_cliente);
    setForm({
      nombre: cliente.nombre,
      apellido: cliente.apellido,
      email: cliente.email,
      telefono_movil: cliente.telefono_movil || "",
      activo: cliente.estado === "activo" || cliente.activo,
    });
  };

  const handleGuardar = async () => {
    try {
      await axios.put(`http://localhost:4000/clientes/${editando}`, form);
      setEditando(null);
      setForm({
        nombre: "",
        apellido: "",
        email: "",
        telefono_movil: "",
        activo: true,
      });
      cargarClientes();
    } catch (error) {
      console.error("Error al guardar cliente:", error);
    }
  };

  const handleEliminar = async (id) => {
    if (confirm("¿Seguro que quieres eliminar este cliente?")) {
      try {
        await axios.delete(`http://localhost:4000/clientes/${id}`);
        cargarClientes();
      } catch (error) {
        console.error("Error al eliminar cliente:", error);
      }
    }
  };

  const handleNuevoCliente = () => {
    navigate("/admin/crear-cliente");
  };

  const handleCerrarSesion = () => {
    localStorage.removeItem("adminLogueado");
    localStorage.removeItem("rol");
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleAtras = () => {
    navigate("/admin");
  };

  return (
    <div className="p-4 max-w-6xl mx-auto">
      {/* Botón Atrás (solo para admin) */}
      {rol === "admin" && (
        <button
          onClick={handleAtras}
          className="mb-4 flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm"
        >
          <ArrowLeft size={18} /> Volver al Panel
        </button>
      )}

      {/* Barra de botones */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-2">
          <button
            onClick={handleNuevoCliente}
            className="flex items-center gap-1 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition"
          >
            <UserPlus size={18} /> Nuevo Cliente
          </button>
        </div>
        <button
          onClick={handleCerrarSesion}
          className="flex items-center gap-1 px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded transition"
        >
          <LogOut size={18} /> Cerrar sesión
        </button>
      </div>

      <h1 className="text-2xl font-bold mb-4">Gestión de Clientes</h1>

      <table className="w-full border border-gray-300 rounded shadow text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 text-left">ID</th>
            <th className="p-2 text-left">Nombre</th>
            <th className="p-2 text-left">Apellido</th>
            <th className="p-2 text-left">Email</th>
            <th className="p-2 text-left">Teléfono</th>
            <th className="p-2 text-left">Activo</th>
            <th className="p-2 text-left">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map((cliente) => (
            <tr key={cliente.id_cliente} className="border-t">
              <td className="p-2">{cliente.id_cliente}</td>
              <td className="p-2">{cliente.nombre}</td>
              <td className="p-2">{cliente.apellido}</td>
              <td className="p-2">{cliente.email}</td>
              <td className="p-2">{cliente.telefono_movil || "-"}</td>
              <td className="p-2">
                {cliente.activo || cliente.estado === "activo" ? "Sí" : "No"}
              </td>
              <td className="p-2 flex gap-2">
                <button
                  className="text-blue-600 hover:text-blue-800"
                  onClick={() => handleEditar(cliente)}
                >
                  <Pencil size={18} />
                </button>
                <button
                  className="text-red-600 hover:text-red-800"
                  onClick={() => handleEliminar(cliente.id_cliente)}
                >
                  <Trash2 size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editando && (
        <div className="mt-6 border-t pt-4 bg-gray-50 rounded-lg shadow-lg p-4">
          <h2 className="text-lg font-semibold mb-2">Editar Cliente #{editando}</h2>
          <div className="flex flex-col gap-3">
            <input
              className="border p-2 rounded"
              placeholder="Nombre"
              value={form.nombre}
              onChange={(e) => setForm({ ...form, nombre: e.target.value })}
            />
            <input
              className="border p-2 rounded"
              placeholder="Apellido"
              value={form.apellido}
              onChange={(e) => setForm({ ...form, apellido: e.target.value })}
            />
            <input
              className="border p-2 rounded"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            <input
              className="border p-2 rounded"
              placeholder="Teléfono"
              value={form.telefono_movil}
              onChange={(e) => setForm({ ...form, telefono_movil: e.target.value })}
            />
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={form.activo}
                onChange={(e) => setForm({ ...form, activo: e.target.checked })}
              />
              Activo
            </label>
            <div className="flex gap-2">
              <button
                onClick={handleGuardar}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Guardar
              </button>
              <button
                onClick={() => setEditando(null)}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
