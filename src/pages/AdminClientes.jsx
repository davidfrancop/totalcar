// Archivo: src/pages/AdminClientes.jsx

import { useEffect, useState } from "react";
import axios from "axios";
import { Pencil, Trash2, LogOut, UserPlus, ArrowLeft, Car } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { isAuthenticated, getRol, logout } from "../utils/auth";

export default function AdminClientes() {
  const [clientes, setClientes] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const navigate = useNavigate();
  const rol = getRol();

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/login");
      return;
    }
    cargarClientes();
    // eslint-disable-next-line
  }, []);

  const cargarClientes = async () => {
    try {
      const res = await axios.get("http://localhost:4000/clientes-autos");
      setClientes(res.data);
    } catch (error) {
      console.error("Error al cargar clientes:", error);
    }
  };

  const clientesFiltrados = clientes.filter((c) =>
    `${c.nombre} ${c.apellido}`.toLowerCase().includes(busqueda.toLowerCase())
  );

  const handleVolver = () => {
    navigate("/admin/dashboard");
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Listado de Clientes</h1>
        <div className="flex gap-4">
          {rol === "admin" && (
            <button
              onClick={handleVolver}
              className="flex items-center gap-1 text-blue-600 hover:underline"
            >
              <ArrowLeft size={18} /> Volver
            </button>
          )}
          <button
            onClick={handleLogout}
            className="flex items-center gap-1 text-red-600 hover:underline"
          >
            <LogOut size={18} /> Cerrar sesión
          </button>
        </div>
      </div>

      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Buscar por nombre o apellido..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="border px-2 py-1 rounded w-full max-w-md"
        />
        <button
          onClick={() => navigate("/admin/crear-cliente")}
          className="flex items-center gap-1 bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 ml-4"
        >
          <UserPlus size={16} /> Nuevo cliente
        </button>
      </div>

      <table className="w-full border-collapse border text-sm">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-2 py-1">Nombre</th>
            <th className="border px-2 py-1">Email</th>
            <th className="border px-2 py-1">Teléfono</th>
            <th className="border px-2 py-1">Estado</th>
            <th className="border px-2 py-1">Autos</th>
            <th className="border px-2 py-1">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {clientesFiltrados.map((cliente) => (
            <tr key={cliente.id_cliente} className="hover:bg-gray-100">
              <td className="border px-2 py-1">
                {cliente.nombre} {cliente.apellido}
              </td>
              <td className="border px-2 py-1">{cliente.email}</td>
              <td className="border px-2 py-1">{cliente.telefono_movil}</td>
              <td className="border px-2 py-1">
                {cliente.activo ? "Activo" : "Inactivo"}
              </td>
              <td className="border px-2 py-1">{cliente.cantidad_autos}</td>
              <td className="border px-2 py-1 space-x-2">
                <button
                  onClick={() =>
                    navigate(`/admin/clientes/${cliente.id_cliente}/editar`)
                  }
                  className="text-blue-600 hover:underline"
                >
                  <Pencil size={16} />
                </button>
                <button
                  onClick={() =>
                    navigate(`/admin/clientes/${cliente.id_cliente}/editar`)
                  }
                  className="text-green-600 hover:underline"
                >
                  <Car size={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
