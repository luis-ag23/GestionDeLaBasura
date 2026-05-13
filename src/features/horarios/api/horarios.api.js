const API_BASE = process.env.API_BASE_URL || "http://localhost:3000";
const BASE_URL = `${API_BASE}/api`;
const horariosPresenter = require("../../../adapters/presenter/jsonHorarioPresenter");

function obtenerDiaActual() {
  const dias = [
    "Domingo",
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado"
  ];

  return dias[new Date().getDay()];
}

async function requestJson(path, options = {}) {
  try {
    const response = await fetch(`${BASE_URL}${path}`, {
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {})
      },
      ...options
    });

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      throw new Error(data?.message || data?.error || "No se pudo completar la solicitud de horarios.");
    }

    return data;
  } catch (err) {
    // No queremos que un error de red detenga la inicialización de la UI.
    // Logueamos para debugging y devolvemos null para que el llamador lo maneje.
    console.error("horarios.api requestJson error:", err);
    return null;
  }
}

async function obtenerListaHorarios(codigo = "") {
  const query = codigo ? `?codigo=${encodeURIComponent(codigo)}` : "";
  const horarios = await requestJson(`/horarios${query}`);
  if (!horarios) {
    return [];
  }

  return horariosPresenter.formatearHorarios(horarios, obtenerDiaActual());
}

module.exports = {
  obtenerListaHorarios
};