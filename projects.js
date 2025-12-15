const filterInput = document.getElementById("filterInput");
const languageFilter = document.getElementById("languageFilter");
const yearFilter = document.getElementById("yearFilter");
const projectRows = document.querySelectorAll(".project-row");

filterInput.addEventListener("keyup", () => {
    filterProjects();
});

languageFilter.addEventListener("change", () => {
    filterProjects();
});

yearFilter.addEventListener("change", () => {
    filterProjects();
});

function filterProjects() {
    const nameValue = filterInput.value.toLowerCase();
    const languageValue = languageFilter.value.toLowerCase();
    const yearValue = yearFilter.value;

    projectRows.forEach(row => {
        const projectName = row.querySelector(".project-name").textContent.toLowerCase();
        const projectLanguage = row.dataset.language.toLowerCase();
        const projectYear = row.dataset.year;

        const nameMatch = projectName.includes(nameValue);
        const languageMatch = languageValue === "all" || projectLanguage.includes(languageValue);
        const yearMatch = yearValue === "all" || projectYear === yearValue;

        if (nameMatch && languageMatch && yearMatch) {
            row.style.display = "grid";
        } else {
            row.style.display = "none";
        }
    });
}
