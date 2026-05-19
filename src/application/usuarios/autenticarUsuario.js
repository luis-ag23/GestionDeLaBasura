async function autenticarUsuario(dependencias, credenciales) {
  const { usuarioRepo, hashService, tokenService, usuarioPresenter } = dependencias;

  if (!credenciales.correo || !credenciales.correo.trim()) {
    throw new Error("El correo es obligatorio.");
  }
  if (!credenciales.password) {
    throw new Error("La contraseña es obligatoria.");
  }

  const correoLimpio = credenciales.correo.trim();
  
  const usuario = await usuarioRepo.getUsuarioByCorreo(correoLimpio);
  if (!usuario) {
    throw new Error("Credenciales inválidas.");
  }

  const passwordCoincide = await hashService.compare(credenciales.password, usuario.password_hash);
  if (!passwordCoincide) {
    throw new Error("Credenciales inválidas.");
  }

  const token = tokenService.generarToken(usuario);

  const usuarioFormateado = usuarioPresenter.formatearUsuario(usuario);

  return {
    usuario: usuarioFormateado,
    token
  };
}

module.exports = autenticarUsuario;