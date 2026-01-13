const filterInput = document.getElementById("filterInput");
const languageFilter = document.getElementById("languageFilter");
const yearFilter = document.getElementById("yearFilter");
const projectRows = document.querySelectorAll(".project-row");

filterInput.addEventListener("keyup", filterProjects);
languageFilter.addEventListener("change", filterProjects);
yearFilter.addEventListener("change", filterProjects);

projectRows.forEach(row => {
    row.addEventListener("click", () => {
        const link = row.dataset.link;
        if (link) window.location.href = link;
    });
});

function filterProjects() {
    const nameValue = filterInput.value.toLowerCase().trim();
    const languageValue = languageFilter.value.toLowerCase();
    const yearValue = yearFilter.value;

    projectRows.forEach(row => {
        const projectName = row.querySelector(".project-name").textContent.toLowerCase();
        const projectLanguage = (row.dataset.language || "").toLowerCase();
        const projectYear = row.dataset.year || "";

        const nameMatch = projectName.includes(nameValue);

        // ✅ FIX: language can be "HTML, CSS, JS"
        const languageMatch =
            languageValue === "all" ||
            projectLanguage.split(",").map(x => x.trim()).includes(languageValue);

        const yearMatch = yearValue === "all" || projectYear === yearValue;

        row.style.display = (nameMatch && languageMatch && yearMatch) ? "grid" : "none";
    });
}
