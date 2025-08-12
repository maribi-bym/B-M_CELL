document.addEventListener("DOMContentLoaded", () => {
    console.log("Página cargada para B&M - Venta y reparación de celulares");
    const darkModeBtn = document.getElementById("darkModeToggle");
    const iconSpan = darkModeBtn.querySelector('.toggle-icon');
    const textSpan = darkModeBtn.querySelector('.toggle-text');
    darkModeBtn.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
        if (document.body.classList.contains("dark-mode")) {
            iconSpan.textContent = "☀️";
            textSpan.textContent = "Modo claro";
        } else {
            iconSpan.textContent = "🌙";
            textSpan.textContent = "Modo oscuro";
        }
    });
});

function scrollToWhatsapp() {
    var whatsappBtn = document.getElementById('whatsapp-footer');
    if (whatsappBtn) {
        whatsappBtn.scrollIntoView({ behavior: 'smooth' });
        whatsappBtn.focus();
    }
}

function showWhatsappBtn() {
    var container = document.getElementById('whatsapp-contact-container');
    if (container) {
        container.style.display = 'block';
    }
}
