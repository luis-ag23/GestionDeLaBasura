import { obtenerListaReportes, crearReporte } from "../api/reportes.api.js";

const USUARIO_ID = 2;

function renderizarReporte(reporte) {
  return `
    <article class="reporte-card">
      <div class="reporte-card__contenido">
        <h3 class="reporte-card__titulo">Reporte #${reporte.id}</h3>
        <p class="reporte-card__descripcion">${reporte.descripcion}</p>
        <p class="reporte-card__ubicacion">
          <strong>Ubicación:</strong> ${reporte.ubicacion}
        </p>
        <p class="reporte-card__estado">
          <strong>Estado:</strong> ${reporte.estado}
        </p>
        <p class="reporte-card__fecha">
          <strong>Fecha:</strong> ${formatearFecha(reporte.created_at)}
        </p>
        ${
          reporte.imagen_url
            ? `
              <div class="reporte-card__imagen-wrapper">
                <img
                  class="reporte-card__imagen"
                  src="${reporte.imagen_url}"
                  alt="Imagen del reporte ${reporte.id}"
                />
              </div>
            `
            : ""
        }
      </div>
    </article>
  `;
}

function renderizarEstadoVacio() {
  return `
    <div class="reportes-empty">
      <p>No tienes reportes registrados.</p>
    </div>
  `;
}

function formatearFecha(fecha) {
  if (!fecha) {
    return "Sin fecha";
  }

  const fechaObj = new Date(fecha);

  if (Number.isNaN(fechaObj.getTime())) {
    return fecha;
  }

  return fechaObj.toLocaleString("es-BO");
}

function renderizarReportes(reportes) {
  const contenedor = document.getElementById("reportes-lista");

  if (!contenedor) {
    console.error("No existe #reportes-lista");
    return;
  }

  if (!reportes || reportes.length === 0) {
    contenedor.innerHTML = renderizarEstadoVacio();
    return;
  }

  contenedor.innerHTML = reportes.map(renderizarReporte).join("");
}

async function cargarYRenderizarReportes() {
  try {
    const reportes = await obtenerListaReportes();
    const misReportes = reportes.filter(
      (reporte) => Number(reporte.usuario_id) === USUARIO_ID
    );

    renderizarReportes(misReportes);
  } catch (error) {
    console.error("Error al cargar reportes:", error);

    const contenedor = document.getElementById("reportes-lista");
    if (contenedor) {
      contenedor.innerHTML = `
        <div class="reportes-empty">
          <p>No se pudieron cargar tus reportes.</p>
        </div>
      `;
    }
  }
}

function abrirModal() {
  const modal = document.getElementById("modal");

  if (!modal) {
    console.error("No existe #modal");
    return;
  }

  modal.classList.remove("hidden");
}

function cerrarModal() {
  const modal = document.getElementById("modal");

  if (!modal) {
    console.error("No existe #modal");
    return;
  }

  modal.classList.add("hidden");
}

function limpiarFormulario() {
  const form = document.getElementById("form-reporte");

  if (!form) {
    console.error("No existe #form-reporte");
    return;
  }

  form.reset();
}

function enlazarEventosModal() {
  console.log("enlazarEventosModal ejecutado");

  const btnAgregar = document.getElementById("btn-agregar-reporte");
  const btnCerrar = document.getElementById("btn-cerrar");
  const overlay = document.getElementById("overlay");

  if (!btnAgregar) {
    console.error("No existe #btn-agregar-reporte");
    return;
  }

  btnAgregar.addEventListener("click", () => {
    console.log("click en Agregar reporte");
    abrirModal();
  });

  if (btnCerrar) {
    btnCerrar.addEventListener("click", cerrarModal);
  }

  if (overlay) {
    overlay.addEventListener("click", cerrarModal);
  }
}

function obtenerDatosFormulario() {
  const descripcion = document.getElementById("descripcion")?.value.trim();
  const ubicacion = document.getElementById("ubicacion")?.value.trim();
  const imagenUrl = document.getElementById("imagen_url")?.value.trim();

  return {
    descripcion,
    ubicacion,
    imagen_url: imagenUrl || null,
    usuario_id: USUARIO_ID
  };
}

function validarFormulario(datos) {
  if (!datos.descripcion) {
    throw new Error("La descripción es obligatoria.");
  }

  if (!datos.ubicacion) {
    throw new Error("La ubicación es obligatoria.");
  }
}

function enlazarFormulario() {
  const form = document.getElementById("form-reporte");

  if (!form) {
    console.error("No existe #form-reporte");
    return;
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    try {
      const datos = obtenerDatosFormulario();
      validarFormulario(datos);

      await crearReporte(datos);

      cerrarModal();
      limpiarFormulario();
      await cargarYRenderizarReportes();
    } catch (error) {
      console.error("Error al crear reporte:", error);
      alert(error.message || "No se pudo crear el reporte.");
    }
  });
}

export {
  renderizarReportes,
  cargarYRenderizarReportes,
  enlazarEventosModal,
  enlazarFormulario,
  abrirModal,
  cerrarModal
};