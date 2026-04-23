const API_URL = "https://gestiondelabasura.onrender.com";

async function obtenerListaHorarios(codigo = "") {
  const url = codigo
    ? `${API_URL}/api/horarios?codigo=${encodeURIComponent(codigo)}`
    : `${API_URL}/api/horarios`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("No se pudieron cargar los horarios");
  }

  return response.json();
}
module.exports = { obtenerListaHorarios };