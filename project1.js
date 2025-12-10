// Datos del proyecto (ejemplo)
const projectData = {
    title: "Sistema de Gestión IT",
    description: `Proyecto avanzado desarrollado en HTML, CSS y JavaScript.
Incluye visualización moderna, efectos y diseño responsive.`,
    image: "img/project1.png",
    code: "https://github.com/Taylor-Portfolio",
};

// Cargar datos
document.addEventListener("DOMContentLoaded", () => {

    // Nombre fijo
    document.getElementById("project-name").textContent =
        "TAYLOR GERARD URIÑA PINCAY";

    // Datos dinámicos del proyecto
    document.getElementById("project-title").textContent = projectData.title;
    document.getElementById("project-description").textContent = projectData.description;

    if (projectData.image) {
        document.getElementById("project-img").src = projectData.image;
    }

    // Enlace al código
    document.getElementById("code-btn").addEventListener("click", () => {
        window.open(projectData.code, "_blank");
    });
});
