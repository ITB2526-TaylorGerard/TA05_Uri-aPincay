document.addEventListener("DOMContentLoaded", () => {
    const filterInput = document.getElementById("filterInput");
    const languageFilter = document.getElementById("languageFilter");
    const yearFilter = document.getElementById("yearFilter");
    const projectRows = document.querySelectorAll(".project-row");

    // Si algo no existe, no seguimos (evita que "no haga nada" por error silencioso)
    if (!filterInput || !languageFilter || !yearFilter || projectRows.length === 0) {
        return;
    }

    filterInput.addEventListener("input", filterProjects);
    languageFilter.addEventListener("change", filterProjects);
    yearFilter.addEventListener("change", filterProjects);

    // Ejecuta una primera vez al cargar
    filterProjects();

    function normalizeLanguages(str) {
        // Soporta: "HTML, CSS, JS" y también "HTML / CSS / JS"
        return str
            .split(/[,/]/g)
            .map(s => s.trim().toLowerCase())
            .filter(Boolean);
    }

    function filterProjects() {
        const nameValue = filterInput.value.toLowerCase().trim();
        const languageValue = languageFilter.value.toLowerCase();
        const yearValue = yearFilter.value;

        projectRows.forEach(row => {
            const projectName = row.querySelector(".project-name")?.textContent.toLowerCase() || "";
            const projectYear = row.dataset.year || "";

            const rawLang = row.dataset.language || "";
            const langs = normalizeLanguages(rawLang);

            const nameMatch = projectName.includes(nameValue);
            const languageMatch = (languageValue === "all") || langs.includes(languageValue);
            const yearMatch = (yearValue === "all") || (projectYear === yearValue);

            row.style.display = (nameMatch && languageMatch && yearMatch) ? "grid" : "none";
        });
    }
});
