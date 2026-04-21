// Iteración 1: usuarios.presenter.js
// ESTADO: Pasa Test 1 (Formateo básico). Falla Test 2 (Rol por defecto).

function formatearUsuario(usuario) {
  return {
    id: usuario.id,
    nombre: usuario.nombre,
    correo: usuario.correo,
    rol: usuario.rol, // No estamos manejando el caso de rol null o undefined aún
    created_at: new Date(usuario.created_at).toISOString()
  };
}

module.exports = { formatearUsuario };