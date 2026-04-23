const API_URL = "https://gestiondelabasura.onrender.com";

async function obtenerListaReportes() {
  const response = await fetch(`${API_URL}/api/reportes`);

  if (!response.ok) {
    throw new Error("No se pudieron cargar los reportes");
  }

  return response.json();
}

async function crearReporte(reporte) {
  const response = await fetch(`${API_URL}/api/reportes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(reporte)
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.message || "No se pudo crear el reporte");
  }

  return response.json();
}

export { obtenerListaReportes, crearReporte };