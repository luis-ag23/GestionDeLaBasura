const DISTRITOS = {
  default: {
    nombre: "Cochabamba Centro",
    descripcion: "Vista general de la ciudad para que ubiques los distritos desde una referencia real.",
    lat: -17.38,
    lng: -66.157
  },
  d1: {
    nombre: "Distrito 1 · Centro Histórico",
    descripcion: "Centro y casco histórico de Cochabamba.",
    lat: -17.3895,
    lng: -66.1568
  },
  d2: {
    nombre: "Distrito 2 · Queru Queru / Sarco",
    descripcion: "Zona norte con conexión a avenidas principales.",
    lat: -17.3742,
    lng: -66.175
  },
  d3: {
    nombre: "Distrito 3 · Mayorazgo / Temporal",
    descripcion: "Sector residencial del sur-este de la ciudad.",
    lat: -17.408,
    lng: -66.165
  },
  d4: {
    nombre: "Distrito 4 · Hipódromo / Norte",
    descripcion: "Zona norte con áreas mixtas y residenciales.",
    lat: -17.367,
    lng: -66.16
  },
  d5: {
    nombre: "Distrito 5 · Sud / Alalay",
    descripcion: "Sector sur cercano al Parque Alalay.",
    lat: -17.4105,
    lng: -66.1465
  },
  d6: {
    nombre: "Distrito 6 · Villa Coronilla",
    descripcion: "Zona urbana cercana al centro tradicional.",
    lat: -17.387,
    lng: -66.152
  },
  d7: {
    nombre: "Distrito 7 · Zona Sud-Oeste",
    descripcion: "Área al suroeste con calles principales de acceso.",
    lat: -17.422,
    lng: -66.172
  },
  d8: {
    nombre: "Distrito 8 · Pacata / Itocta",
    descripcion: "Zona en expansión al este de la ciudad.",
    lat: -17.332,
    lng: -66.125
  },
  d9: {
    nombre: "Distrito 9 · Alto Cochabamba",
    descripcion: "Sector alto con vista sobre el valle.",
    lat: -17.3,
    lng: -66.135
  },
  d10: {
    nombre: "Distrito 10 · Casco Viejo / Cancha",
    descripcion: "Parte central y comercial de la ciudad.",
    lat: -17.393,
    lng: -66.1555
  },
  d11: {
    nombre: "Distrito 11 · Cala Cala",
    descripcion: "Zona residencial al norte de Cochabamba.",
    lat: -17.361,
    lng: -66.14
  },
  d12: {
    nombre: "Distrito 12 · Recoleta",
    descripcion: "Sector tradicional y céntrico del norte.",
    lat: -17.3735,
    lng: -66.151
  },
  d13: {
    nombre: "Distrito 13 · Tupuraya",
    descripcion: "Zona urbana consolidada cercana al centro.",
    lat: -17.363,
    lng: -66.16
  },
  d14: {
    nombre: "Distrito 14 · Valle Hermoso",
    descripcion: "Área alta y residencial al este de la ciudad.",
    lat: -17.396,
    lng: -66.125
  }
};

function obtenerDestino(codigo) {
  return DISTRITOS[codigo] || DISTRITOS.default;
}

function construirUrlEmbed(destino) {
  const margen = 0.012;
  const oeste = (destino.lng - margen).toFixed(6);
  const sur = (destino.lat - margen).toFixed(6);
  const este = (destino.lng + margen).toFixed(6);
  const norte = (destino.lat + margen).toFixed(6);

  return `https://www.openstreetmap.org/export/embed.html?bbox=${oeste}%2C${sur}%2C${este}%2C${norte}&layer=mapnik&marker=${destino.lat}%2C${destino.lng}`;
}

function construirUrlRuta(destino) {
  return `https://www.google.com/maps/dir/?api=1&destination=${destino.lat}%2C${destino.lng}&travelmode=driving`;
}

function actualizarMapa(codigo) {
  const iframe = document.getElementById("mapa-zona");
  const titulo = document.getElementById("mapa-zona-nombre");
  const texto = document.getElementById("mapa-zona-descripcion");
  const enlace = document.getElementById("mapa-ruta");

  if (!iframe || !titulo || !texto || !enlace) {
    return;
  }

  const destino = obtenerDestino(codigo);
  iframe.src = construirUrlEmbed(destino);
  titulo.textContent = destino.nombre;
  texto.textContent = destino.descripcion;
  enlace.href = construirUrlRuta(destino);
}

function enlazarMapaZonas() {
  const select = document.getElementById("select-distrito");

  if (!select) {
    return;
  }

  const sincronizarMapa = () => actualizarMapa(select.value);

  select.addEventListener("change", sincronizarMapa);
  sincronizarMapa();
}

module.exports = {
  enlazarMapaZonas,
  actualizarMapa
};