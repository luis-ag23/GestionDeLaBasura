const BASE_URL = "http://localhost:3000/api";

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
    throw new Error(data?.message || data?.error || "No se pudo completar la solicitud de reportes.");
  }

  return data;
}

async function obtenerListaReportes() {
  return requestJson("/reportes");
}

async function crearReporte(datos) {
  return requestJson("/reportes", {
    method: "POST",
    body: JSON.stringify(datos)
  });
}

export {
  obtenerListaReportes,
  crearReporte
};