
import { crearUsuario } from './features/usuarios/api/usuarios.api.js';

document.addEventListener("DOMContentLoaded", () => {
    console.log("Pantalla de registro lista y escuchando...");

    const formRegistro = document.getElementById("form-registro");

    if (!formRegistro) {
        console.error("No se encontró el formulario de registro en el HTML");
        return;
    }

    formRegistro.addEventListener("submit", async (event) => {
        event.preventDefault(); 
        console.log("Intentando registrar usuario...");

        const nombre = document.getElementById("nombre").value.trim();
        const correo = document.getElementById("correo").value.trim();
        const password = document.getElementById("password").value;

        try {
            const nuevoUsuario = await crearUsuario({
                nombre: nombre,
                correo: correo,
                password: password,
                rol: "usuario" // Rol por defecto
            });

            console.log("Respuesta del servidor:", nuevoUsuario);
            
            alert("¡Cuenta creada con éxito! Bienvenido a GestiónBasura.");
            window.location.href = "../home/home.html";

        } catch (error) {
            console.error("Error al registrar:", error);
            alert("Ocurrió un error: " + error.message);
        }
    });
});