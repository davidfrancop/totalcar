// src/pages/AdminUsuarios.jsx

import { useEffect, useState } from "react";
import axios from "axios";
import { Pencil, Trash2, LogOut, ArrowLeft, UserPlus } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function AdminUsuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [editando, setEditando] = useState(null);
  const [form, setForm] = useState({
    rol: "",
    activo: true,
  });

  const navigate = useNavigate();
  const rol = localStorage.getItem("rol");

  useEffect(() => {
    cargarUsuarios();
  }, []);

  const cargarUsuarios = async () => {
    try {
      const res = await axios.get("http://localhost:4000/usuarios");
      setUsuarios(res.data);
    } catch (error) {
      console.error("Error al cargar usuarios:", error);
    }
  };

  const handleEditar = (usuario) => {
    setEditando(usuario.id_usuario);
    setForm({
      rol: usuario.rol,
      activo: usuario.activo,
    });
  };

  const handleGuardar = async () => {
    try {
      await axios.put(`http://localhost:4000/usuarios/${editando}`, form);
      setEditando(null);
      setForm({ rol: "", activo: true });
      cargarUsuarios();
    } catch (error) {
      console.error("Error al guardar usuario:", error);
    }
  };

  const handleEliminar = async (id) => {
    if (confirm("¿Seguro que quieres eliminar este usuario?")) {
      try {
        await axios.delete(`http://localhost:4000/usuarios/${id}`);
        cargarUsuarios();
      } catch (error) {
        console.error("Error al eliminar usuario:", error);
      }
    }
  };

  const handleNuevoUsuario = () => {
    navigate("/admin/crear-usuario");
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
      {/* Botón Atrás (solo admin) */}
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
            onClick={handleNuevoUsuario}
            className="flex items-center gap-1 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition"
          >
            <UserPlus size={18} /> Nuevo Usuario
          </button>
        </div>
        <button
          onClick={handleCerrarSesion}
          className="flex items-center gap-1 px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded transition"
        >
          <LogOut size={18} /> Cerrar sesión
        </button>
      </div>

      <h1 className="text-2xl font-bold mb-4">Gestión de Usuarios</h1>

      <table className="w-full border border-gray-300 rounded shadow text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 text-left">ID</th>
            <th className="p-2 text-left">Usuario</th>
            <th className="p-2 text-left">Nombre</th>
            <th className="p-2 text-left">Apellido</th>
            <th className="p-2 text-left">Rol</th>
            <th className="p-2 text-left">Activo</th>
            <th className="p-2 text-left">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario) => (
            <tr key={usuario.id_usuario} className="border-t">
              <td className="p-2">{usuario.id_usuario}</td>
              <td className="p-2">{usuario.nombre_usuario}</td>
              <td className="p-2">{usuario.nombre}</td>
              <td className="p-2">{usuario.apellido}</td>
              <td className="p-2">{usuario.rol}</td>
              <td className="p-2">{usuario.activo ? "Sí" : "No"}</td>
              <td className="p-2 flex gap-2">
                <button
                  className="text-blue-600 hover:text-blue-800"
                  onClick={() => handleEditar(usuario)}
                >
                  <Pencil size={18} />
                </button>
                <button
                  className="text-red-600 hover:text-red-800"
                  onClick={() => handleEliminar(usuario.id_usuario)}
                >
                  <Trash2 size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editando && (
        <div className="mt-6 border-t pt-4">
          <h2 className="text-lg font-semibold mb-2">Editar Usuario #{editando}</h2>
          <div className="flex flex-col gap-3">
            <select
              className="border p-2 rounded"
              value={form.rol}
              onChange={(e) => setForm({ ...form, rol: e.target.value })}
            >
              <option value="usuario">Usuario</option>
              <option value="admin">Admin</option>
              <option value="mecanico">Mecánico</option>
              <option value="recepcion">Recepción</option>
            </select>
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
