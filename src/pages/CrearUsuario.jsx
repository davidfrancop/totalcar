// src/pages/CrearUsuario.jsx

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from "lucide-react";

export default function CrearUsuario() {
  const [form, setForm] = useState({
    usuario: '',
    contrasena: '',
    email: '',
    rol: 'Mecánico',
    nombre: '',
    apellido: '',
  });

  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Obtenemos el rol actual del usuario (para decidir si mostrar el botón)
  const rol = localStorage.getItem('rol');
  const mostrarAtras = rol === "admin" || rol === "recepcion";

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje('');
    setError('');

    try {
      const res = await fetch('http://localhost:4000/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        setMensaje('Usuario creado con éxito');
        setForm({
          usuario: '',
          contrasena: '',
          email: '',
          rol: 'Mecánico',
          nombre: '',
          apellido: '',
        });
      } else {
        setError(data.error || 'Error al crear usuario');
      }
    } catch (err) {
      setError('Error al conectar con el servidor');
    }
  };

  // Botón ATRÁS: solo para admin y recepcion, navega según el rol
  const handleAtras = () => {
    if (rol === 'admin') {
      navigate('/admin/usuarios');
    } else if (rol === 'recepcion') {
      navigate('/admin/panel');
    }
    // Si no es ninguno, no hay botón, así que no pasa nada.
  };

  return (
    <section className="max-w-md mx-auto px-6 py-12">
      <div className="flex items-center mb-6">
        {mostrarAtras && (
          <button
            onClick={handleAtras}
            className="flex items-center gap-1 px-3 py-2 bg-gray-200 hover:bg-gray-300 rounded transition text-gray-800"
          >
            <ArrowLeft size={18} /> Atrás
          </button>
        )}
        <h2 className={`text-2xl font-bold text-totalcar-azul ${mostrarAtras ? "ml-4" : ""}`}>
          Registrar nuevo usuario
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="usuario"
          placeholder="Nombre de usuario"
          value={form.usuario}
          onChange={handleChange}
          className="w-full border border-gray-300 p-3 rounded-lg"
          required
        />
        <input
          type="password"
          name="contrasena"
          placeholder="Contraseña"
          value={form.contrasena}
          onChange={handleChange}
          className="w-full border border-gray-300 p-3 rounded-lg"
          required
        />
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={form.nombre}
          onChange={handleChange}
          className="w-full border border-gray-300 p-3 rounded-lg"
        />
        <input
          type="text"
          name="apellido"
          placeholder="Apellido"
          value={form.apellido}
          onChange={handleChange}
          className="w-full border border-gray-300 p-3 rounded-lg"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full border border-gray-300 p-3 rounded-lg"
        />
        <select
          name="rol"
          value={form.rol}
          onChange={handleChange}
          className="w-full border border-gray-300 p-3 rounded-lg"
        >
          <option value="admin">Admin</option>
          <option value="Mecánico">Mecánico</option>
          <option value="Recepción">Recepción</option>
        </select>
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
        >
          Crear usuario
        </button>
        {mensaje && <p className="text-green-600">{mensaje}</p>}
        {error && <p className="text-red-600">{error}</p>}
      </form>
    </section>
  );
}
