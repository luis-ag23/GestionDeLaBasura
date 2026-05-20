const {
  obtenerListaReportes,
  crearReporte,
  editarReporte
} = require("../api/reportes.api");

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
          esImagenValida(reporte.imagen_url)
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

        <button
          type="button"
          class="btn-editar-reporte"
          data-id="${reporte.id}"
        >
          Editar
        </button>
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

function esImagenValida(imagenUrl) {
  if (!imagenUrl) {
    return false;
  }

  return (
    imagenUrl.startsWith("http://") ||
    imagenUrl.startsWith("https://")
  );
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

  enlazarBotonesEditar(reportes);
}

function enlazarBotonesEditar(reportes) {
  const botonesEditar = document.querySelectorAll(".btn-editar-reporte");

  botonesEditar.forEach((boton) => {
    boton.addEventListener("click", () => {
      const reporteId = Number(boton.dataset.id);

      const reporteSeleccionado = reportes.find(
        (reporte) => Number(reporte.id) === reporteId
      );

      if (!reporteSeleccionado) {
        console.error("No se encontró el reporte seleccionado");
        return;
      }

      abrirModalEditar(reporteSeleccionado);
    });
  });
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
  modal.classList.remove("modal--hidden");
}


function abrirModalCrear() {
  limpiarFormulario();

  const modalTitle = document.getElementById("modal-title");
  const btnGuardar = document.getElementById("btn-guardar");
  const reporteIdInput = document.getElementById("reporte_id");

  if (modalTitle) {
    modalTitle.textContent = "Nuevo reporte";
  }

  if (btnGuardar) {
    btnGuardar.textContent = "Guardar";
  }

  if (reporteIdInput) {
    reporteIdInput.value = "";
  }

  abrirModal();
}

function abrirModalEditar(reporte) {
  const modalTitle = document.getElementById("modal-title");
  const btnGuardar = document.getElementById("btn-guardar");

  const reporteIdInput = document.getElementById("reporte_id");
  const descripcionInput = document.getElementById("descripcion");
  const ubicacionInput = document.getElementById("ubicacion");
  const imagenUrlInput = document.getElementById("imagen_url");

  if (modalTitle) {
    modalTitle.textContent = "Editar reporte";
  }

  if (btnGuardar) {
    btnGuardar.textContent = "Actualizar";
  }

  if (reporteIdInput) {
    reporteIdInput.value = reporte.id;
  }

  if (descripcionInput) {
    descripcionInput.value = reporte.descripcion || "";
  }

  if (ubicacionInput) {
    ubicacionInput.value = reporte.ubicacion || "";
  }

  if (imagenUrlInput) {
    imagenUrlInput.value = reporte.imagen_url || "";
  }

  abrirModal();
}

function cerrarModal() {
  const modal = document.getElementById("modal");

  if (!modal) {
    console.error("No existe #modal");
    return;
  }

  modal.classList.add("hidden");
  modal.classList.add("modal--hidden");
  limpiarFormulario();
}

function limpiarFormulario() {
  const form = document.getElementById("form-reporte");
  const reporteIdInput = document.getElementById("reporte_id");

  if (!form) {
    console.error("No existe #form-reporte");
    return;
  }

  form.reset();

  if (reporteIdInput) {
    reporteIdInput.value = "";
  }
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
    abrirModalCrear();
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

function obtenerReporteIdFormulario() {
  const reporteIdInput = document.getElementById("reporte_id");

  if (!reporteIdInput || !reporteIdInput.value) {
    return null;
  }

  return Number(reporteIdInput.value);
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
      const reporteId = obtenerReporteIdFormulario();

      validarFormulario(datos);

      if (reporteId) {
        await editarReporte(reporteId, datos);
      } else {
        await crearReporte(datos);
      }

      cerrarModal();
      limpiarFormulario();
      await cargarYRenderizarReportes();
    } catch (error) {
      console.error("Error al guardar reporte:", error);
      alert(error.message || "No se pudo guardar el reporte.");
    }
  });
}

module.exports = {
  renderizarReportes,
  cargarYRenderizarReportes,
  enlazarEventosModal,
  enlazarFormulario,
  abrirModal,
  abrirModalCrear,
  abrirModalEditar,
  cerrarModal
};
