// Archivo: src/components/RutaProtegida.jsx

import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated, getRol, logout } from '../utils/auth';

/**
 * Componente para proteger rutas según autenticación y rol.
 * @param {{ children: ReactNode, rolPermitido?: string }} props
 */
export default function RutaProtegida({ children, rolPermitido }) {
  const tokenValido = isAuthenticated();
  const rol = getRol();

  // Si no está autenticado, limpia sesión y redirige al login
  if (!tokenValido) {
    logout();
    return <Navigate to="/login" replace />;
  }

  // Validación de rol si se especifica uno
  if (rolPermitido && rol !== rolPermitido) {
    // Permitir que admin acceda a rutas de recepción
    if (rolPermitido === 'recepcion' && rol === 'admin') {
      return <>{children}</>;
    }

    // Redirecciones por rol
    switch (rol) {
      case 'recepcion':
        return <Navigate to="/admin/clientes" replace />;
      case 'admin':
        return <Navigate to="/admin" replace />;
      default:
        // Si el rol no está contemplado, cerrar sesión
        logout();
        return <Navigate to="/login" replace />;
    }
  }

  // Autenticado y autorizado
  return <>{children}</>;
}
