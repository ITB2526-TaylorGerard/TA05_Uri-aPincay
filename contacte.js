document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contactForm");
    const successMsg = document.getElementById("successMsg");

    const firstName = document.getElementById("firstName");
    const lastName = document.getElementById("lastName");
    const phone = document.getElementById("phone");
    const gmail = document.getElementById("gmail");
    const subject = document.getElementById("subject");
    const message = document.getElementById("message");

    const toEmail = "taylor.urina7e7@itb.cat";

    function setError(inputEl, msg) {
        inputEl.classList.add("input-invalid");
        const box = form.querySelector(`[data-error-for="${inputEl.id}"]`);
        if (box) box.textContent = msg;
    }

    function clearError(inputEl) {
        inputEl.classList.remove("input-invalid");
        const box = form.querySelector(`[data-error-for="${inputEl.id}"]`);
        if (box) box.textContent = "";
    }

    function isValidGmail(value) {
        const v = value.trim();
        return /^[^\s@]+@gmail\.com$/i.test(v);
    }

    function validate() {
        successMsg.textContent = "";
        let ok = true;

        if (!firstName.value.trim()) {
            setError(firstName, "El nombre es obligatorio.");
            ok = false;
        } else clearError(firstName);

        if (!lastName.value.trim()) {
            setError(lastName, "El apellido es obligatorio.");
            ok = false;
        } else clearError(lastName);

        if (!gmail.value.trim()) {
            setError(gmail, "El Gmail es obligatorio.");
            ok = false;
        } else if (!isValidGmail(gmail.value)) {
            setError(gmail, "Introduce un Gmail válido (ej: tunombre@gmail.com).");
            ok = false;
        } else clearError(gmail);

        if (!subject.value.trim()) {
            setError(subject, "El asunto es obligatorio.");
            ok = false;
        } else clearError(subject);

        if (!message.value.trim()) {
            setError(message, "El mensaje es obligatorio.");
            ok = false;
        } else clearError(message);

        return ok;
    }

    [firstName, lastName, gmail, subject, message].forEach(el => {
        el.addEventListener("input", () => clearError(el));
    });

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        if (!validate()) return;

        const fullName = `${firstName.value.trim()} ${lastName.value.trim()}`;
        const phoneValue = phone.value.trim();

        const bodyLines = [
            `Nombre: ${fullName}`,
            `Gmail: ${gmail.value.trim()}`,
            phoneValue ? `Número: ${phoneValue}` : `Número: (no indicado)`,
            ``,
            `Mensaje:`,
            message.value.trim()
        ];

        const mailtoLink =
            `mailto:${encodeURIComponent(toEmail)}` +
            `?subject=${encodeURIComponent(subject.value.trim())}` +
            `&body=${encodeURIComponent(bodyLines.join("\n"))}`;

        successMsg.textContent = "✅ Mensaje preparado. Se abrirá tu correo para enviarlo.";

        window.location.href = mailtoLink;

        setTimeout(() => form.reset(), 700);
    });
});
