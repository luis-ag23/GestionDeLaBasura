function formatearRol(rol) {
  if (!rol) return "usuario"; 
  return rol;
}

function formatearUsuario(usuario) {
  return {
    id: usuario.id,
    nombre: usuario.nombre,
    correo: usuario.correo,
    rol: formatearRol(usuario.rol), 
    created_at: new Date(usuario.created_at).toISOString()
  };
}

module.exports = { formatearUsuario };