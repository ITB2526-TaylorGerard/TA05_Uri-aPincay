const searchInput = document.getElementById("searchInput");
const projectItems = document.querySelectorAll(".project-item");

searchInput.addEventListener("keyup", () => {
    const value = searchInput.value.toLowerCase();

    projectItems.forEach(item => {
        item.style.display = item.textContent.toLowerCase().includes(value)
            ? "block"
            : "none";
    });
});
