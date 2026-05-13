class Horario {
  constructor({ codigo, nombre_distrito, zona, turno, hora_inicio, hora_fin, tipo_servicio, dias, nota, color, created_at }) {
    this.codigo = codigo;
    this.nombre_distrito = nombre_distrito;
    this.zona = zona;
    this.turno = turno;
    this.hora_inicio = hora_inicio;
    this.hora_fin = hora_fin;
    this.tipo_servicio = tipo_servicio;
    this.dias = dias || [];
    this.nota = nota;
    this.color = color;
    this.created_at = created_at ? new Date(created_at) : new Date();
  }
}

module.exports = Horario;
