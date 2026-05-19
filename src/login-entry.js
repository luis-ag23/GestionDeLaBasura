// src/login-entry.js
import { autenticarUsuario } from './features/usuarios/api/usuarios.api.js';

document.addEventListener('DOMContentLoaded', () => {
    const formLogin = document.getElementById('form-login');

    if (!formLogin) return;

    formLogin.addEventListener('submit', async (event) => {
        event.preventDefault();

        const correo = document.getElementById('correo').value.trim();
        const password = document.getElementById('password').value;

        try {
            const authResponse = await autenticarUsuario({ correo, password });
            
            guardarSesionLocal(authResponse);

            alert('Inicio de sesión exitoso.');
            window.location.href = '../home/home.html';
        } catch (error) {
            console.error('[Auth Error]:', error);
            alert(error.message || 'Credenciales inválidas. Por favor, intenta de nuevo.');
        }
    });
});

/**
 * @param {Object} userData 
 */
function guardarSesionLocal(userData) {
    localStorage.setItem('usuarioActivo', JSON.stringify(userData));
}