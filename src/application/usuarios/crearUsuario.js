async function crearUsuario({ usuarioRepo, hashService, usuarioPresenter }, datos) {
  if (!datos.nombre || !datos.nombre.trim()) {
    throw new Error("El nombre es obligatorio.");
  }
  if (!datos.correo || !datos.correo.trim()) {
    throw new Error("El correo es obligatorio.");
  }
  if (!datos.password) {
    throw new Error("La contraseña es obligatoria.");
  }

  const usuarioExistente = await usuarioRepo.getUsuarioByCorreo(datos.correo.trim());
  if (usuarioExistente) {
    throw new Error("El correo ya está registrado.");
  }

  const salt = await hashService.genSalt(10);
  const password_hash = await hashService.hash(datos.password, salt);

  const usuarioCreado = await usuarioRepo.createUsuario({
    nombre: datos.nombre.trim(),
    correo: datos.correo.trim(),
    password_hash,
    rol: datos.rol || "usuario"
  });

  return usuarioPresenter.formatearUsuario(usuarioCreado);
}

module.exports = crearUsuario;
