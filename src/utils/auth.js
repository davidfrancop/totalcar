// Archivo: src/utils/auth.js

/**
 * Guarda datos de sesión en sessionStorage: token, rol y usuario
 * @param {object} sessionData - { token, rol, usuario }
 */
export function setSession({ token, rol, usuario }) {
  sessionStorage.setItem('token', token);
  sessionStorage.setItem('rol', rol);
  sessionStorage.setItem('usuario', JSON.stringify(usuario));
}

/**
 * Obtiene el token JWT de sessionStorage
 * @returns {string|null}
 */
export function getToken() {
  return sessionStorage.getItem('token');
}

/**
 * Comprueba si el usuario está autenticado (token presente)
 * @returns {boolean}
 */
export function isAuthenticated() {
  return Boolean(getToken());
}

/**
 * Obtiene el rol del usuario actual desde sessionStorage
 * @returns {string|null}
 */
export function getRol() {
  return sessionStorage.getItem('rol');
}

/**
 * Devuelve la información completa del usuario logueado (o null si no hay)
 * @returns {object|null}
 */
export function getUsuario() {
  const user = sessionStorage.getItem('usuario');
  return user ? JSON.parse(user) : null;
}

/**
 * Elimina todos los datos de sesión
 */
export function logout() {
  sessionStorage.clear();
  window.location.href = '/login';
}
