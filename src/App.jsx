// Archivo: src/App.jsx

import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';

// Páginas públicas
import Inicio from './pages/Inicio';
import Promociones from './pages/Promociones';
import Nosotros from './pages/Nosotros';
import Servicios from './pages/Servicios';
import Contacto from './pages/Contacto';

// Páginas administrativas
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import AdminClientes from './pages/AdminClientes';
import AdminUsuarios from './pages/AdminUsuarios';
import CrearUsuario from './pages/CrearUsuario';
import CrearCliente from './pages/CrearClienteVehiculo'; // Ya renombrado correctamente

export default function App() {
  return (
    <>
      <Header />

      {/* Espacio para compensar el header fijo */}
      <main className="pt-24">
        <Routes>

          {/* Rutas públicas */}
          <Route path="/" element={<Inicio />} />
          <Route path="/promociones" element={<Promociones />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/servicios" element={<Servicios />} />
          <Route path="/contacto" element={<Contacto />} />

          {/* Login acceso */}
          <Route path="/login" element={<AdminLogin />} />

          {/* Redirección: /admin va a /admin/dashboard */}
          <Route path="/admin" element={<Navigate to="/admin/dashboard" />} />

          {/* Rutas admin */}
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/clientes" element={<AdminClientes />} />
          <Route path="/admin/usuarios" element={<AdminUsuarios />} />
          <Route path="/admin/crear-usuario" element={<CrearUsuario />} />
          <Route path="/admin/crear-cliente" element={<CrearCliente />} />

        </Routes>
      </main>

      <Footer />
    </>
  );
}
