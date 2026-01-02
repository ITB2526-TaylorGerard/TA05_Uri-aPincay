const images = [
    "img/project1-web.png",
    "img/project1-web-2.png",
    "img/project1-web-3.png"
];

let currentIndex = 0;

const carouselImage = document.getElementById("carouselImage");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const counter = document.getElementById("carouselCounter");

function updateCarousel() {
    carouselImage.src = images[currentIndex];
    carouselImage.alt = `Project image ${currentIndex + 1}`;
    counter.textContent = `${currentIndex + 1} / ${images.length}`;
}

prevBtn.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateCarousel();
});

nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % images.length;
    updateCarousel();
});

updateCarousel();
