const API_BASE = process.env.API_BASE_URL || "http://localhost:3000";
const BASE_URL = `${API_BASE}/api`;

async function requestJson(path, options = {}) {
  const response = await fetch(`${BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {})
    },
    ...options
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(data?.message || data?.error || "No se pudo completar la solicitud de usuarios.");
  }

  return data;
}

async function obtenerListaUsuarios() {
  return requestJson("/usuarios");
}

async function crearUsuario(datos) {
  return requestJson("/usuarios", {
    method: "POST",
    body: JSON.stringify(datos)
  });
}

/**
 * @param {Object} credenciales 
 */
async function autenticarUsuario(credenciales) {
  return requestJson("/usuarios/login", {
    method: "POST",
    body: JSON.stringify(credenciales)
  });
}

module.exports = {
  obtenerListaUsuarios,
  crearUsuario,
  autenticarUsuario
};