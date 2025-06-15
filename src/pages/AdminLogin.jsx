// Archivo: src/pages/AdminLogin.jsx

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminLogin() {
  const [usuario, setUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [mensaje, setMensaje] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje('');

    try {
      const res = await fetch('http://localhost:4000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ usuario, contrasena }),
      });

      const data = await res.json();
      console.log('DATA DEL LOGIN:', data);

      if (res.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('rol', data.rol);
        localStorage.setItem('adminLogueado', JSON.stringify(data));

        if (data.rol === 'admin') {
          navigate('/admin/dashboard'); // 🔁 Ruta real para admin
        } else if (data.rol === 'recepcion') {
          navigate('/admin/panel'); // 🔁 Ruta real para recepcion
        } else {
          setMensaje('Rol no autorizado');
        }
      } else {
        setMensaje(data.error || 'Error al iniciar sesión');
      }
    } catch (error) {
      console.error('Error al intentar login:', error);
      setMensaje('Error de conexión con el servidor');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white shadow-lg rounded-xl">
      {/* .src/pages/AdminLogin.jsx */}
      <h2 className="text-2xl font-bold text-center mb-6">Iniciar Sesión</h2>
      {mensaje && <p className="mb-4 text-red-600 text-center">{mensaje}</p>}
      <form onSubmit={handleSubmit} className="grid gap-4">
        <input
          type="text"
          placeholder="Usuario"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
          className="border rounded p-2 w-full"
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={contrasena}
          onChange={(e) => setContrasena(e.target.value)}
          className="border rounded p-2 w-full"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Iniciar sesión
        </button>
      </form>
    </div>
  );
}
