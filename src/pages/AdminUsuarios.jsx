// ========================
// Archivo: src/pages/AdminUsuarios.jsx
// ========================
import { useEffect, useState } from "react";
import axios from "axios";
import { Pencil, Trash2, LogOut, ArrowLeft, UserPlus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { isAuthenticated, getRol, logout } from "../utils/auth";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export default function AdminUsuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [editando, setEditando] = useState(null);
  const [form, setForm] = useState({
    nombre_usuario: "",
    nombre: "",
    apellido: "",
    rol: "",
    activo: true,
  });

  const navigate = useNavigate();
  const rol = getRol();

  useEffect(() => {
    if (!isAuthenticated()) {
      logout();
      navigate("/login");
    } else {
      cargarUsuarios();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const cargarUsuarios = async () => {
    try {
      const token = sessionStorage.getItem("token");
      const res = await axios.get(`${BASE_URL}/usuarios`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsuarios(res.data);
    } catch (error) {
      console.error("❌ Error al cargar usuarios:", error);
    }
  };

  const handleEditar = (usuario) => {
    setEditando(usuario.id_usuario);
    setForm({
      nombre_usuario: usuario.nombre_usuario,
      nombre: usuario.nombre,
      apellido: usuario.apellido,
      rol: usuario.rol,
      activo: usuario.activo,
    });
  };

  const handleGuardar = async () => {
    try {
      const token = sessionStorage.getItem("token");
      await axios.put(`${BASE_URL}/usuarios/${editando}`, form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEditando(null);
      setForm({ nombre_usuario: "", nombre: "", apellido: "", rol: "", activo: true });
      cargarUsuarios();
    } catch (error) {
      console.error("❌ Error al guardar usuario:", error);
    }
  };

  const handleEliminar = async (id) => {
    if (confirm("¿Seguro que quieres eliminar este usuario?")) {
      try {
        const token = sessionStorage.getItem("token");
        await axios.delete(`${BASE_URL}/usuarios/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        cargarUsuarios();
      } catch (error) {
        console.error("❌ Error al eliminar usuario:", error);
      }
    }
  };

  const handleNuevo = () => navigate("/admin/crear-usuario");
  const handleVolver = () => navigate(rol === "admin" ? "/admin" : "/");
  const handleLogout = () => logout();

  // Filtrar usuarios según búsqueda
  const usuariosFiltrados = usuarios.filter(u => {
    const term = busqueda.toLowerCase();
    return (
      u.nombre_usuario.toLowerCase().includes(term) ||
      u.nombre.toLowerCase().includes(term) ||
      u.apellido.toLowerCase().includes(term)
    );
  });

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Gestión de Usuarios</h1>
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

      <div className="flex justify-between items-center mb-6">
        <input
          type="text"
          placeholder="Buscar usuarios..."
          value={busqueda}
          onChange={e => setBusqueda(e.target.value)}
          className="border px-2 py-1 rounded w-full max-w-md"
        />
        <button
          onClick={handleNuevo}
          className="flex items-center gap-1 text-green-600 hover:underline"
        >
          <UserPlus size={18} /> Nuevo Usuario
        </button>
      </div>

      <table className="w-full border-collapse border text-sm">
        <thead className="bg-gray-200">
          <tr>
            <th className="border px-2 py-1">Usuario</th>
            <th className="border px-2 py-1">Nombre</th>
            <th className="border px-2 py-1">Apellido</th>
            <th className="border px-2 py-1">Rol</th>
            <th className="border px-2 py-1">Activo</th>
            <th className="border px-2 py-1">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuariosFiltrados.map((u) => (
            <tr key={u.id_usuario} className="hover:bg-gray-100">
              <td className="border px-2 py-1">{u.nombre_usuario}</td>
              <td className="border px-2 py-1">{u.nombre}</td>
              <td className="border px-2 py-1">{u.apellido}</td>
              <td className="border px-2 py-1">{u.rol}</td>
              <td className="border px-2 py-1">{u.activo ? "Sí" : "No"}</td>
              <td className="border px-2 py-1 space-x-2">
                <button
                  onClick={() => handleEditar(u)}
                  className="text-blue-600 hover:underline"
                >
                  <Pencil size={16} />
                </button>
                <button
                  onClick={() => handleEliminar(u.id_usuario)}
                  className="text-red-600 hover:underline"
                >
                  <Trash2 size={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editando && (
        <div className="mt-6 border-t pt-4">
          <h2 className="text-lg font-semibold mb-2">Editar Usuario</h2>
          <div className="flex flex-col gap-3">
            <input
              className="border p-2 rounded"
              placeholder="Nombre de usuario"
              value={form.nombre_usuario}
              onChange={(e) => setForm({ ...form, nombre_usuario: e.target.value })}
            />
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
              <input type="checkbox" checked={form.activo} onChange={(e) => setForm({ ...form, activo: e.target.checked })} /> Activo
            </label>
            <div className="flex gap-2">
              <button onClick={handleGuardar} className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700">Guardar</button>
              <button onClick={() => setEditando(null)} className="bg-gray-300 text-gray-800 px-3 py-1 rounded hover:bg-gray-400">Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
