async function obtenerListaHorarios(codigo = "") {
  const url = codigo
    ? `http://localhost:3000/api/horarios?codigo=${encodeURIComponent(codigo)}`
    : "http://localhost:3000/api/horarios";

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("No se pudieron cargar los horarios");
  }

  return response.json();
}

module.exports = {
  obtenerListaHorarios
};