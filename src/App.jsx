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
import AdminVehiculos from './pages/AdminVehiculos';
import CrearUsuario from './pages/CrearUsuario';
import CrearCliente from './pages/CrearCliente';
import EditarClienteVehiculos from './pages/EditarClienteVehiculos';
import VehiculoDetalle from './pages/VehiculoDetalle';

// Componente de protección de rutas
import RutaProtegida from './components/RutaProtegida';

// Página 404 sencilla
function PaginaNoEncontrada() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <h2 className="text-3xl font-bold mb-2">404</h2>
      <p className="text-lg text-gray-500">Página no encontrada</p>
    </div>
  );
}

export default function App() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />

      <main className="pt-24 flex-1">
        <Routes>
          {/* Rutas públicas */}
          <Route path="/" element={<Inicio />} />
          <Route path="/promociones" element={<Promociones />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/servicios" element={<Servicios />} />
          <Route path="/contacto" element={<Contacto />} />

          {/* Login Admin */}
          <Route path="/login" element={<AdminLogin />} />

          {/* Redirección opcional /admin → /admin/dashboard */}
          <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />

          {/* Rutas exclusivas para admin */}
          <Route
            path="/admin/dashboard"
            element={
              <RutaProtegida rolPermitido="admin">
                <AdminDashboard />
              </RutaProtegida>
            }
          />
          <Route
            path="/admin/usuarios"
            element={
              <RutaProtegida rolPermitido="admin">
                <AdminUsuarios />
              </RutaProtegida>
            }
          />
          <Route
            path="/admin/crear-usuario"
            element={
              <RutaProtegida rolPermitido="admin">
                <CrearUsuario />
              </RutaProtegida>
            }
          />

          {/* Rutas para recepción y admin */}
          <Route
            path="/admin/clientes"
            element={
              <RutaProtegida rolPermitido="recepcion">
                <AdminClientes />
              </RutaProtegida>
            }
          />
          <Route
            path="/admin/crear-cliente"
            element={
              <RutaProtegida rolPermitido="recepcion">
                <CrearCliente />
              </RutaProtegida>
            }
          />
          <Route
            path="/admin/clientes/:id/editar"
            element={
              <RutaProtegida rolPermitido="recepcion">
                <EditarClienteVehiculos />
              </RutaProtegida>
            }
          />
          <Route
            path="/admin/vehiculos"
            element={
              <RutaProtegida rolPermitido="recepcion">
                <AdminVehiculos />
              </RutaProtegida>
            }
          />

          {/* Ver ficha de vehículo */}
          <Route
            path="/vehiculos/:id"
            element={
              <RutaProtegida>
                <VehiculoDetalle />
              </RutaProtegida>
            }
          />

          {/* Catch-all: Página no encontrada */}
          <Route path="*" element={<PaginaNoEncontrada />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}
