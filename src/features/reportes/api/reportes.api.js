async function obtenerListaReportes() {
  const response = await fetch("http://localhost:3000/api/reportes");

  if (!response.ok) {
    throw new Error("No se pudieron cargar los reportes");
  }

  return response.json();
}

async function crearReporte(reporte) {
  const response = await fetch("http://localhost:3000/api/reportes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(reporte)
  });

  if (!response.ok) {
    throw new Error("No se pudo crear el reporte");
  }

  return response.json();
}

export { obtenerListaReportes, crearReporte };