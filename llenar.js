// llenar.js - Genera el catálogo de productos dinámicamente

const productos = [
    {
        nombre: "Spacrk 60C",
        descripcion: "64 GB de almacenamiento 6 GB de RAM",
        imagen: ["img/smartphones/spacrk Go2.png",
            "img/smartphones/spacrk Go2 1.png"],
        alt: "Smartphones",
        precio: "C$0.00"
    },
];

// Modal para mostrar imagen elegante
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

function actualizarCarritoCantidad() {
    const span = document.getElementById('carrito-cantidad');
    if (span) {
        let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        let cantidadTotal = carrito.reduce((acc, p) => acc + p.cantidad, 0);
        span.textContent = cantidadTotal;
    }
}

function agregarAlCarrito(producto) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    let existente = carrito.find(p => p.nombre === producto.nombre);
    if (existente) {
        existente.cantidad = (existente.cantidad || 1) + 1;
    } else {
        producto.cantidad = 1;
        carrito.push(producto);
    }
    localStorage.setItem('carrito', JSON.stringify(carrito));
    mostrarNotificacion(producto.nombre + ' agregado al carrito');
    actualizarCarritoCantidad();
}

function mostrarNotificacion(mensaje) {
    let notif = document.createElement('div');
    notif.textContent = mensaje;
    notif.style.position = 'fixed';
    notif.style.bottom = '30px';
    notif.style.left = '50%';
    notif.style.transform = 'translateX(-50%)';
    notif.style.background = '#e60023';
    notif.style.color = '#fff';
    notif.style.padding = '0.7em 2em';
    notif.style.borderRadius = '18px';
    notif.style.fontWeight = 'bold';
    notif.style.zIndex = '99999';
    notif.style.boxShadow = '0 2px 8px rgba(230,0,35,0.12)';
    document.body.appendChild(notif);
    setTimeout(() => notif.remove(), 1500);
}

function renderProductos() {
    const cardsContainer = document.querySelector('.cards');
    if (!cardsContainer) return;
    cardsContainer.innerHTML = '';
    productos.forEach(producto => {
        let imagenes = Array.isArray(producto.imagen) ? producto.imagen : [producto.imagen];
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
      <img src="${imagenes[0]}" alt="${producto.alt}" class="icon" style="cursor:zoom-in;">
      <h3>${producto.nombre}</h3>
      <p>${producto.descripcion}</p>
      <div style="display:flex; flex-direction:column; align-items:center; gap:0.7em; margin-top:1em;">
        <button class="btn consultar-btn" type="button">Consultar</button>
        <button class="btn carrito-btn" type="button">Agregar al carrito</button>
      </div>
    `;
        const imgEl = card.querySelector('img');
        imgEl.imagenActual = 0;
        imgEl.imagenes = imagenes;
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
            // Alternar imagen en móvil
            if (imgEl.imagenes.length > 1) {
                imgEl.imagenActual = (imgEl.imagenActual + 1) % imgEl.imagenes.length;
                imgEl.src = imgEl.imagenes[imgEl.imagenActual];
            }
        });
        imgEl.addEventListener('click', function (e) {
            e.stopPropagation();
            if (imgEl.imagenes.length > 1) {
                imgEl.imagenActual = (imgEl.imagenActual + 1) % imgEl.imagenes.length;
                imgEl.src = imgEl.imagenes[imgEl.imagenActual];
            }
        });
        card.querySelector('.consultar-btn').addEventListener('click', function () {
            const mensaje = encodeURIComponent(`Hola, quiero consultar por el producto: ${producto.nombre}`);
            window.open(`https://wa.me/50587153450?text=${mensaje}`, '_blank');
        });
        card.querySelector('.carrito-btn').addEventListener('click', function () {
            agregarAlCarrito(producto);
        });
        cardsContainer.appendChild(card);
    });
}

document.addEventListener('DOMContentLoaded', function () {
    renderProductos();
    actualizarCarritoCantidad();
});


// simon