// llenar.js - Genera el catálogo de productos dinámicamente

const productos = [
    {
        nombre: "infinix note 50 pro",
        descripcion: "Android, iPhone, nuevos y reacondicionados.",
        imagen: "img/smartphones/infinix note 50 pro.jpg",
        alt: "Smartphones"
    },
    {
        nombre: "Teclados para PC",
        descripcion: "Mecánicos",
        imagen: "img/teclados/teclado.jpg",
        alt: "Teclados"
    },
    {
        nombre: "cascos",
        descripcion: "Bluetooth, cable, gaming.",
        imagen: "img/audifonos/cascos.jpg",
        alt: "cascos"
    },
    {
        nombre: "Memorias usb adata",
        descripcion: "Memorias USB de alta velocidad.",
        imagen: "img/memorias/memoria usb.jpg",
        alt: "Memorias"
    },
    {
        nombre: "Micrófono gamer",
        descripcion: "Streaming, clases, podcast.",
        imagen: "img/microfonos/microfono gamer.jpg",
        alt: "Micrófono gamer"
    },
    {
        nombre: "Funda de free fire",
        descripcion: "Funda de free fire",
        imagen: "img/fundas/funda de free fire.jpg",
        alt: "Funda de free fire"
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
    `;
        card.querySelector('img').addEventListener('click', function (e) {
            e.stopPropagation();
            const modal = crearModalImagen();
            modal.querySelector('#modal-img').src = producto.imagen;
        });
        cardsContainer.appendChild(card);
    });
}

document.addEventListener('DOMContentLoaded', renderProductos);
