// Archivo: src/pages/AdminLogin.jsx

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { isAuthenticated, getRol } from '../utils/auth';

export default function AdminLogin() {
  const [usuario, setUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [mensaje, setMensaje] = useState('');
  const navigate = useNavigate();

  // Redirección automática si ya está autenticado
  useEffect(() => {
    if (isAuthenticated()) {
      const rol = getRol();
      if (rol === 'admin') {
        navigate('/admin', { replace: true });
      } else if (rol === 'recepcion') {
        navigate('/admin/clientes', { replace: true });
      }
    }
    // eslint-disable-next-line
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje('');

    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ usuario, contrasena }),
      });

      const data = await res.json();

      if (res.ok) {
        const { token, rol } = data;
        if (token && rol) {
          sessionStorage.setItem('token', token);
          sessionStorage.setItem('rol', rol);
          sessionStorage.setItem('usuario', JSON.stringify(data));

          if (rol === 'admin') {
            navigate('/admin', { replace: true });
          } else if (rol === 'recepcion') {
            navigate('/admin/clientes', { replace: true });
          } else {
            setMensaje('Rol no autorizado.');
          }
        } else {
          setMensaje('Respuesta inválida del servidor.');
        }
      } else {
        setMensaje(data?.error || 'Credenciales inválidas');
      }
    } catch (error) {
      setMensaje('Error de conexión con el servidor');
      console.error('Error de red:', error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen px-4 py-10">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md mx-auto mt-20">
        <h1 className="text-2xl font-bold mb-6 text-center">Acceso Administrativo</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="usuario"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            placeholder="Usuario"
            className="w-full border border-gray-300 p-2 rounded"
            autoFocus
            required
          />
          <input
            type="password"
            name="contrasena"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
            placeholder="Contraseña"
            className="w-full border border-gray-300 p-2 rounded"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Iniciar sesión
          </button>
        </form>
        {mensaje && (
          <div className="mt-4 text-center text-red-600 font-semibold">{mensaje}</div>
        )}
      </div>
    </div>
  );
}
