class Usuario {
  constructor({ id, nombre, correo, rol, created_at }) {
    this.id = id;
    this.nombre = nombre;
    this.correo = correo;
    this.rol = rol || "usuario";
    this.created_at = created_at ? new Date(created_at) : new Date();
  }

  toPlain() {
    return {
      id: this.id,
      nombre: this.nombre,
      correo: this.correo,
      rol: this.rol,
      created_at: this.created_at.toISOString()
    };
  }
}

module.exports = Usuario;
