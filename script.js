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

function crearModalImagen() {
    const modal = document.createElement('div');
    modal.id = 'modal-imagen';
    modal.style.position = 'fixed';
    modal.style.top = '0';
    modal.style.left = '0';
    modal.style.width = '100vw';
    modal.style.height = '100vh';
    modal.style.background = 'rgba(0,0,0,0.8)';
    modal.style.display = 'flex';
    modal.style.alignItems = 'center';
    modal.style.justifyContent = 'center';
    modal.style.zIndex = '9999';
    modal.style.cursor = 'pointer';
    modal.style.transition = 'opacity 0.2s';
    modal.innerHTML = '<img id="modal-img" src="" style="max-width:90vw;max-height:80vh;border-radius:16px;box-shadow:0 8px 32px rgba(0,0,0,0.25);">';
    modal.addEventListener('click', () => {
        modal.style.opacity = '0';
        setTimeout(() => modal.remove(), 200);
    });
    document.body.appendChild(modal);
    setTimeout(() => { modal.style.opacity = '1'; }, 10);
    return modal;
}

function renderCarrito() {
    // ...existing code...
    // Al renderizar cada producto en el carrito:
    let imagenes = Array.isArray(producto.imagen) ? producto.imagen : [producto.imagen];
    let imagenActual = 0;
    const imgEl = document.createElement('img');
    imgEl.src = imagenes[0];
    imgEl.alt = producto.alt;
    imgEl.className = 'icon';
    let longPressTimer;
    imgEl.addEventListener('mousedown', function (e) {
        e.preventDefault();
        longPressTimer = setTimeout(function () {
            const modal = crearModalImagen();
            modal.querySelector('#modal-img').src = imgEl.src;
        }, 500);
    });
    imgEl.addEventListener('mouseup', function (e) {
        clearTimeout(longPressTimer);
    });
    imgEl.addEventListener('mouseleave', function (e) {
        clearTimeout(longPressTimer);
    });
    imgEl.addEventListener('touchstart', function (e) {
        e.preventDefault();
        longPressTimer = setTimeout(function () {
            const modal = crearModalImagen();
            modal.querySelector('#modal-img').src = imgEl.src;
        }, 500);
    });
    imgEl.addEventListener('touchend', function (e) {
        clearTimeout(longPressTimer);
    });
    imgEl.addEventListener('click', function (e) {
        e.stopPropagation();
        if (imagenes.length > 1) {
            imagenActual = (imagenActual + 1) % imagenes.length;
            imgEl.src = imagenes[imagenActual];
        }
    });
    // ...agrega imgEl al card del producto en el carrito...
    // ...existing code...
}
