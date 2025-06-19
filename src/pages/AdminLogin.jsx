// ========================
// Archivo: src/pages/AdminLogin.jsx
// ========================
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
      console.log("DATA DEL LOGIN:", data);

      if (!res.ok) {
        setMensaje(data.error || 'Error al iniciar sesión');
        return;
      }

      // Guardar token y rol
      sessionStorage.setItem('token', data.token);
      sessionStorage.setItem('rol', data.rol);

      // Redirigir según el rol
      if (data.rol === 'admin') {
        navigate('/admin');
      } else if (data.rol === 'recepcion') {
        navigate('/admin/clientes');
      } else {
        navigate('/');
      }
    } catch (error) {
      console.error('Error en login:', error);
      setMensaje('Error al conectar con el servidor');
    }
  };

  return (
    <div className="flex items-start justify-center h-screen bg-gray-100 pt-20">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded p-6 w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Login Admin</h2>

        {mensaje && (
          <p className="text-red-600 text-sm text-center mb-4">{mensaje}</p>
        )}

        <label className="block mb-2 text-sm font-semibold">Usuario</label>
        <input
          type="text"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
          className="w-full px-3 py-2 mb-4 border rounded"
          required
        />

        <label className="block mb-2 text-sm font-semibold">Contraseña</label>
        <input
          type="password"
          value={contrasena}
          onChange={(e) => setContrasena(e.target.value)}
          className="w-full px-3 py-2 mb-4 border rounded"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Iniciar sesión
        </button>
      </form>
    </div>
  );
}
