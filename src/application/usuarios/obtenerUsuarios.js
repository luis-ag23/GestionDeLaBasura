async function obtenerUsuarios({ usuarioRepo, usuarioPresenter }) {
  const usuarios = await usuarioRepo.getAllUsuarios();
  return usuarios.map(usuarioPresenter.formatearUsuario);
}

module.exports = obtenerUsuarios;
