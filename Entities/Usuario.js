class Usuario {
  constructor({ id = null, nombre, correo, password_hash, rol = "usuario", created_at = null }) {
    this.id = id;
    this.nombre = nombre;
    this.correo = correo;
    this.password_hash = password_hash;
    this.rol = rol;
    this.created_at = created_at;
  }
}

module.exports = Usuario;