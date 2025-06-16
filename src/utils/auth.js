// src/utils/auth.js

// Verifica si el usuario está autenticado (solo requiere token)
export const isAuthenticated = () => {
  const token = sessionStorage.getItem("token");
  return !!token;
};

// Devuelve el rol del usuario actual
export const getRol = () => sessionStorage.getItem("rol");

// Devuelve los datos completos del usuario logueado (o null si no hay)
export const getUsuario = () => {
  const user = sessionStorage.getItem("usuario");
  return user ? JSON.parse(user) : null;
};

// Cierra la sesión y limpia los datos del storage
export const logout = () => {
  sessionStorage.clear();
};
