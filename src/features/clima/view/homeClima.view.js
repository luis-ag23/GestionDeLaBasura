const COCHABAMBA = {
  latitude: -17.3895,
  longitude: -66.1568,
  city: "Cochabamba, Bolivia"
};

const WEATHER_LABELS = {
  0: { icon: "☀️", label: "Cielo despejado" },
  1: { icon: "🌤️", label: "Mayormente despejado" },
  2: { icon: "⛅", label: "Parcialmente nublado" },
  3: { icon: "☁️", label: "Nublado" },
  45: { icon: "🌫️", label: "Niebla" },
  48: { icon: "🌫️", label: "Niebla con escarcha" },
  51: { icon: "🌦️", label: "Llovizna ligera" },
  53: { icon: "🌦️", label: "Llovizna moderada" },
  55: { icon: "🌧️", label: "Llovizna intensa" },
  61: { icon: "🌧️", label: "Lluvia ligera" },
  63: { icon: "🌧️", label: "Lluvia moderada" },
  65: { icon: "🌧️", label: "Lluvia intensa" },
  71: { icon: "🌨️", label: "Nieve ligera" },
  73: { icon: "🌨️", label: "Nieve moderada" },
  75: { icon: "❄️", label: "Nieve intensa" },
  80: { icon: "🌦️", label: "Chubascos ligeros" },
  81: { icon: "🌧️", label: "Chubascos moderados" },
  82: { icon: "⛈️", label: "Chubascos fuertes" },
  95: { icon: "⛈️", label: "Tormenta" }
};

function obtenerEtiquetaClima(codigo) {
  return WEATHER_LABELS[codigo] || { icon: "⛅", label: "Condiciones variables" };
}

function formatearHora(fechaIso) {
  if (!fechaIso) {
    return "--:--";
  }

  const fecha = new Date(fechaIso);
  return new Intl.DateTimeFormat("es-BO", {
    hour: "2-digit",
    minute: "2-digit"
  }).format(fecha);
}

function formatearTiempoActual(fechaIso) {
  if (!fechaIso) {
    return "Actualizado hace un momento";
  }

  const fecha = new Date(fechaIso);
  return new Intl.DateTimeFormat("es-BO", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit"
  }).format(fecha);
}

async function obtenerClimaActual() {
  const url = new URL("https://api.open-meteo.com/v1/forecast");
  url.searchParams.set("latitude", String(COCHABAMBA.latitude));
  url.searchParams.set("longitude", String(COCHABAMBA.longitude));
  url.searchParams.set("current", "temperature_2m,weather_code,wind_speed_10m");
  url.searchParams.set("hourly", "relative_humidity_2m");
  url.searchParams.set("timezone", "auto");

  const response = await fetch(url.toString());

  if (!response.ok) {
    throw new Error("No se pudo consultar el clima en este momento.");
  }

  return response.json();
}

function obtenerHumedadActual(data) {
  const hourly = data?.hourly;
  const currentTime = data?.current?.time;

  if (!hourly || !currentTime || !Array.isArray(hourly.time)) {
    return null;
  }

  const index = hourly.time.indexOf(currentTime);

  if (index === -1) {
    return null;
  }

  return hourly.relative_humidity_2m?.[index] ?? null;
}

function pintarClima(data) {
  const icono = document.getElementById("clima-icon");
  const temperatura = document.getElementById("clima-temp");
  const descripcion = document.getElementById("clima-desc");
  const humedad = document.getElementById("clima-humedad");
  const viento = document.getElementById("clima-viento");
  const hora = document.getElementById("clima-hora");
  const ciudad = document.querySelector(".clima-card__city");

  if (!icono || !temperatura || !descripcion || !humedad || !viento || !hora) {
    return;
  }

  const current = data?.current;
  const clima = obtenerEtiquetaClima(current?.weather_code);
  const humedadActual = obtenerHumedadActual(data);

  icono.textContent = clima.icon;
  temperatura.textContent = `${Math.round(current?.temperature_2m ?? 0)}°C`;
  descripcion.textContent = clima.label;
  humedad.textContent = `💧 ${humedadActual ?? "--"}%`;
  viento.textContent = `💨 ${Math.round(current?.wind_speed_10m ?? 0)} km/h`;
  hora.textContent = `🕐 ${formatearTiempoActual(current?.time)}`;

  if (ciudad) {
    ciudad.textContent = `📍 ${COCHABAMBA.city}`;
  }
}

function mostrarErrorClima(error) {
  const icono = document.getElementById("clima-icon");
  const temperatura = document.getElementById("clima-temp");
  const descripcion = document.getElementById("clima-desc");
  const humedad = document.getElementById("clima-humedad");
  const viento = document.getElementById("clima-viento");
  const hora = document.getElementById("clima-hora");

  if (!icono || !temperatura || !descripcion || !humedad || !viento || !hora) {
    return;
  }

  console.error("Error cargando el clima:", error);
  icono.textContent = "⚠️";
  temperatura.textContent = "--°C";
  descripcion.textContent = "No se pudo cargar el clima ahora";
  humedad.textContent = "💧 --%";
  viento.textContent = "💨 -- km/h";
  hora.textContent = `🕐 ${formatearHora(new Date().toISOString())}`;
}

async function cargarClimaEnTiempoReal() {
  try {
    const data = await obtenerClimaActual();
    pintarClima(data);
  } catch (error) {
    mostrarErrorClima(error);
  }
}

function enlazarClimaHome() {
  cargarClimaEnTiempoReal();
  setInterval(cargarClimaEnTiempoReal, 10 * 60 * 1000);
}

module.exports = {
  enlazarClimaHome,
  cargarClimaEnTiempoReal
};