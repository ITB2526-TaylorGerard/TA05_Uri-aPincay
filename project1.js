const projectData = {
    title: "Sistema de Gestión IT",
    description: `Proyecto desarrollado como parte del portfolio personal.
Incluye diseño moderno, estructura clara y funcionalidades en JavaScript.`,
    image: "img/project1.png",
    code: "https://github.com/Taylor-Portfolio",
    twitter: "https://twitter.com/TU_USUARIO",
    linkedin: "https://www.linkedin.com/in/TU_USUARIO"
};

document.addEventListener("DOMContentLoaded", () => {

    document.getElementById("project-title").textContent = projectData.title;
    document.getElementById("project-description").textContent = projectData.description;

    if (projectData.image) {
        document.getElementById("project-img").src = projectData.image;
    }

    document.getElementById("twitter-link").href = projectData.twitter;
    document.getElementById("linkedin-link").href = projectData.linkedin;

    document.getElementById("code-btn").addEventListener("click", () => {
        window.open(projectData.code, "_blank");
    });
});
