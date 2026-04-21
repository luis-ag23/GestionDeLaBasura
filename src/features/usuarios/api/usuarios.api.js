async function obtenerListaUsuarios() {
  const response = await fetch("http://localhost:3000/api/usuarios");

  if (!response.ok) {
    throw new Error("No se pudieron cargar los usuarios");
  }

  return response.json();
}

async function crearUsuario(usuario) {
  const response = await fetch("http://localhost:3000/api/usuarios", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(usuario)
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "No se pudo crear el usuario");
  }

  return response.json();
}

export { obtenerListaUsuarios, crearUsuario };