class Reporte {
  constructor({ id, descripcion, ubicacion, imagen_url, estado, usuario_id, created_at }) {
    this.id = id;
    this.descripcion = descripcion;
    this.ubicacion = ubicacion;
    this.imagen_url = imagen_url || null;
    this.estado = estado || "pendiente";
    this.usuario_id = usuario_id;
    this.created_at = created_at ? new Date(created_at) : new Date();
  }
}

module.exports = Reporte;
