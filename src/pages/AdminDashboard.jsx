// src/pages/AdminDashboard.jsx

import { useNavigate } from 'react-router-dom';
import { logout } from '../utils/auth';

export default function AdminDashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  return (
    <section className="max-w-4xl mx-auto px-6 py-12 text-center">
      {/* .src/pages/AdminDashboard.jsx */}
      <h2 className="text-3xl font-bold text-totalcar-azul mb-8">
        Panel Principal de Administración
      </h2>

      <div className="flex flex-col md:flex-row justify-center gap-6 mb-10">
        <button
          type="button"
          onClick={() => navigate('/admin/usuarios')}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow-md"
        >
          Gestionar Usuarios
        </button>

        <button
          type="button"
          onClick={() => navigate('/admin/clientes')}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg shadow-md"
        >
          Ver Clientes
        </button>
      </div>

      <button
        type="button"
        onClick={handleLogout}
        className="text-sm text-red-600 underline hover:text-red-800"
      >
        Cerrar sesión
      </button>
    </section>
  );
}
