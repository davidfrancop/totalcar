// Archivo: src/components/RutaProtegida.jsx

import { Navigate } from 'react-router-dom';
import { isAuthenticated, getRol } from '../utils/auth';

/**
 * Componente para proteger rutas según autenticación y rol.
 * @param {ReactNode} children - Contenido a renderizar si la ruta está permitida.
 * @param {string} rolPermitido - Rol necesario para acceder a la ruta.
 */
export default function RutaProtegida({ children, rolPermitido }) {
  const tokenValido = isAuthenticated();
  const rol = getRol();

  // No autenticado: manda al login
  if (!tokenValido) return <Navigate to="/login" replace />;

  // Validación de rol si se pide un rol específico
  if (rolPermitido && rol !== rolPermitido) {
    // Permitir que admin acceda a rutas de recepción
    if (rolPermitido === 'recepcion' && rol === 'admin') {
      return children;
    }

    // Redirección lógica por rol
    if (rol === 'recepcion') return <Navigate to="/admin/clientes" replace />;
    if (rol === 'admin') return <Navigate to="/admin" replace />;
    // Rol desconocido: manda a inicio
    return <Navigate to="/" replace />;
  }

  // Autenticado y autorizado
  return children;
}
