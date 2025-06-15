// Archivo: src/pages/AdminDashboard.jsx

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminDashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const logueado = localStorage.getItem('adminLogueado');
    const rol = localStorage.getItem('rol');

    if (!logueado || rol !== 'admin') {
      navigate('/login'); // Redirige al login si no está logueado o no es admin
    }
  }, [navigate]);

  const handleLogout = () => {
    console.log("Logout ejecutado");
    localStorage.removeItem('adminLogueado');
    localStorage.removeItem('rol');
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <section className="max-w-4xl mx-auto px-6 py-12 text-center">
      <h2 className="text-3xl font-bold text-totalcar-azul mb-8">
        Panel Principal de Administración
      </h2>

      <div className="flex flex-col md:flex-row justify-center gap-6 mb-10">
        <button
          onClick={() => navigate('/admin/usuarios')}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow-md"
        >
          Gestionar Usuarios
        </button>

        <button
          onClick={() => navigate('/admin/clientes')}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg shadow-md"
        >
          Ver Clientes
        </button>
      </div>

      <button
        onClick={handleLogout}
        className="text-sm text-red-600 underline hover:text-red-800"
      >
        Cerrar sesión
      </button>
    </section>
  );
}
