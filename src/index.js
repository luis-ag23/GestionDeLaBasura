
import { 
  cargarYRenderizarUsuarios, 
  enlazarFormularioUsuarios 
} from './features/usuarios/view/usuarios.view.js';

document.addEventListener("DOMContentLoaded", async () => {
  console.log("Iniciando aplicación frontend...");

  await cargarYRenderizarUsuarios();
  
  enlazarFormularioUsuarios();
});