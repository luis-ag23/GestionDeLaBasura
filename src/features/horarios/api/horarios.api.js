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
}

async function obtenerListaHorarios(codigo = "") {
  const query = codigo ? `?codigo=${encodeURIComponent(codigo)}` : "";
  const horarios = await requestJson(`/horarios${query}`);
  return horariosPresenter.formatearHorarios(horarios, obtenerDiaActual());
}

module.exports = {
  obtenerListaHorarios
};