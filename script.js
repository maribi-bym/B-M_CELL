// script.js adaptado para el nuevo diseño B&M
// Puedes agregar aquí funciones globales para interacción y experiencia

// Ejemplo: Dark mode toggle (si decides agregarlo en el futuro)
// function toggleDarkMode() {
//     document.body.classList.toggle('dark-mode');
// }

// Ejemplo: Mensaje de bienvenida en consola
document.addEventListener("DOMContentLoaded", () => {
    console.log("Bienvenido a B&M - Electrónica y servicios en Achuapa");
    // Menú hamburguesa
    const hamburger = document.getElementById('hamburger-menu');
    const navLinks = document.getElementById('nav-links');
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                navLinks.classList.add('closing');
                setTimeout(() => {
                    navLinks.classList.remove('closing');
                }, 300); // Duración igual a la animación CSS
            } else {
                navLinks.classList.add('active');
            }
        });
    }
});
