document.addEventListener('DOMContentLoaded', () => {
    // Array con las rutas de tus imágenes
    const images = [
        "img/project1-web.png",
        "img/project1-2web.png",
        "img/project1-3web.png"
    ];

    let currentIndex = 0;

    const carouselImg = document.getElementById('carouselImage');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const counter = document.getElementById('carouselCounter');

    // Función para actualizar la vista
    function updateCarousel() {
        carouselImg.src = images[currentIndex];
        counter.textContent = `${currentIndex + 1} / ${images.length}`;
    }

    // Eventos de botones
    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % images.length;
        updateCarousel();
    });

    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        updateCarousel();
    });
});