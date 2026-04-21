import { obtenerListaUsuarios, crearUsuario } from "../api/usuarios.api.js";

function renderizarUsuario(usuario) {
  return `
    <tr class="usuario-row">
      <td>${usuario.id}</td>
      <td>${usuario.nombre}</td>
      <td>${usuario.correo}</td>
      <td><span class="badge badge-${usuario.rol}">${usuario.rol}</span></td>
      <td>${new Date(usuario.created_at).toLocaleDateString("es-BO")}</td>
    </tr>
  `;
}

function renderizarUsuarios(usuarios) {
  const tbody = document.getElementById("usuarios-tbody");
  if (!tbody) return;

  if (!usuarios || usuarios.length === 0) {
    tbody.innerHTML = `<tr><td colspan="5" class="text-center">No hay usuarios registrados.</td></tr>`;
    return;
  }

  tbody.innerHTML = usuarios.map(renderizarUsuario).join("");
}

async function cargarYRenderizarUsuarios() {
  try {
    const usuarios = await obtenerListaUsuarios();
    renderizarUsuarios(usuarios);
  } catch (error) {
    console.error("Error al cargar usuarios:", error);
    const tbody = document.getElementById("usuarios-tbody");
    if (tbody) {
      tbody.innerHTML = `<tr><td colspan="5" class="error">Error al cargar usuarios.</td></tr>`;
    }
  }
}

function obtenerDatosFormulario() {
  return {
    nombre: document.getElementById("nombre")?.value.trim(),
    correo: document.getElementById("correo")?.value.trim(),
    password: document.getElementById("password")?.value,
    rol: document.getElementById("rol")?.value || "usuario"
  };
}

function enlazarFormularioUsuarios() {
  const form = document.getElementById("form-usuario");
  if (!form) return;

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    try {
      const datos = obtenerDatosFormulario();
      
      // La vista delega la validación pesada al backend, pero podemos hacer una básica aquí
      if (!datos.nombre || !datos.correo || !datos.password) {
        throw new Error("Por favor completa todos los campos requeridos.");
      }

      await crearUsuario(datos);
      
      form.reset();
      alert("Usuario creado exitosamente");
      await cargarYRenderizarUsuarios();
      
    } catch (error) {
      console.error("Error:", error);
      alert(error.message);
    }
  });
}

export {
  cargarYRenderizarUsuarios,
  enlazarFormularioUsuarios
};