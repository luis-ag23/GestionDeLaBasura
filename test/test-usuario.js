const { crearUsuario, obtenerUsuarios } = require('../Repositories/UsuarioRepository');

async function main() {
  try {
    const nuevoUsuario = await crearUsuario(
      'Luis',
      'luis@gmail.com',
      '123456',
      'usuario'
    );

    console.log('Usuario creado:');
    console.log(nuevoUsuario);

    const usuarios = await obtenerUsuarios();
    console.log('Lista de usuarios:');
    console.log(usuarios);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

main();