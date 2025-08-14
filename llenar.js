// llenar.js - Genera el catálogo de productos dinámicamente

const productos = [
    {
        nombre: "infinix note 50 pro",
        descripcion: "Android, iPhone, nuevos y reacondicionados.",
        imagen: "img/smartphones/infinix note 50 pro.jpg",
        alt: "Smartphones",
        precio: "C$0.00"
    },
    {
        nombre: "Teclados para PC",
        descripcion: "Mecánicos",
        imagen: "img/teclados/teclado.jpg",
        alt: "Teclados",
        precio: "C$0.00"
    },
    {
        nombre: "cascos",
        descripcion: "Bluetooth, cable, gaming.",
        imagen: "img/audifonos/cascos.jpg",
        alt: "cascos",
        precio: "C$0.00"
    },
    {
        nombre: "Memorias usb adata",
        descripcion: "Memorias USB de alta velocidad.",
        imagen: "img/memorias/memoria usb.jpg",
        alt: "Memorias",
        precio: "C$0.00"
    },
    {
        nombre: "Micrófono gamer",
        descripcion: "Streaming, clases, podcast.",
        imagen: "img/microfonos/microfono gamer.jpg",
        alt: "Micrófono gamer",
        precio: "C$0.00"
    },
    {
        nombre: "Funda de free fire",
        descripcion: "Funda de free fire",
        imagen: "img/fundas/funda de free fire.jpg",
        alt: "Funda de free fire",
        precio: "C$0.00"
    }
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
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
      <img src="${producto.imagen}" alt="${producto.alt}" class="icon" style="cursor:zoom-in;">
      <h3>${producto.nombre}</h3>
      <p>${producto.descripcion}</p>
      <p style='color:#e60023;font-weight:bold;'>${producto.precio}</p>
      <button class="btn" style="margin-top:1em;" type="button">Agregar al carrito</button>
    `;
        card.querySelector('img').addEventListener('click', function (e) {
            e.stopPropagation();
            const modal = crearModalImagen();
            modal.querySelector('#modal-img').src = producto.imagen;
        });
        card.querySelector('button').addEventListener('click', function () {
            agregarAlCarrito(producto);
        });
        cardsContainer.appendChild(card);
    });
}

document.addEventListener('DOMContentLoaded', function () {
    renderProductos();
    actualizarCarritoCantidad();
});
