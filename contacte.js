const form = document.getElementById("contactForm");
const successMsg = document.getElementById("successMsg");

const nameInput = document.getElementById("name");
const surnameInput = document.getElementById("surname");
const phoneInput = document.getElementById("phone");
const gmailInput = document.getElementById("gmail");
const subjectInput = document.getElementById("subject");
const messageInput = document.getElementById("message");

const errName = document.getElementById("errName");
const errSurname = document.getElementById("errSurname");
const errGmail = document.getElementById("errGmail");
const errSubject = document.getElementById("errSubject");
const errMessage = document.getElementById("errMessage");

function clearErrors() {
    errName.textContent = "";
    errSurname.textContent = "";
    errGmail.textContent = "";
    errSubject.textContent = "";
    errMessage.textContent = "";
}

function isValidGmail(email) {
    return /^[^\s@]+@gmail\.com$/i.test(email.trim());
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    clearErrors();
    successMsg.classList.remove("show");

    let ok = true;

    if (nameInput.value.trim() === "") {
        errName.textContent = "Nombre obligatorio.";
        ok = false;
    }

    if (surnameInput.value.trim() === "") {
        errSurname.textContent = "Apellido obligatorio.";
        ok = false;
    }

    if (!isValidGmail(gmailInput.value)) {
        errGmail.textContent = "Introduce un Gmail válido (termina en @gmail.com).";
        ok = false;
    }

    if (subjectInput.value.trim() === "") {
        errSubject.textContent = "Asunto obligatorio.";
        ok = false;
    }

    if (messageInput.value.trim() === "") {
        errMessage.textContent = "Mensaje obligatorio.";
        ok = false;
    }

    if (!ok) return;

    const to = "taylor.urina7e7@itb.cat";
    const fullName = `${nameInput.value.trim()} ${surnameInput.value.trim()}`.trim();
    const phone = phoneInput.value.trim();

    const subject = `Contacto: ${subjectInput.value.trim()}`;

    const bodyLines = [
        `Nombre: ${fullName}`,
        `Gmail: ${gmailInput.value.trim()}`,
        phone ? `Número: ${phone}` : null,
        "",
        "Mensaje:",
        messageInput.value.trim()
    ].filter(Boolean);

    const body = bodyLines.join("\n");

    const mailto = `mailto:${encodeURIComponent(to)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    window.location.href = mailto;

    successMsg.classList.add("show");
    form.reset();
});
