const form = document.getElementById("contactForm");

const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const phone = document.getElementById("phone");
const gmail = document.getElementById("gmail");
const subject = document.getElementById("subject");
const message = document.getElementById("message");

const errFirstName = document.getElementById("errFirstName");
const errLastName = document.getElementById("errLastName");
const errGmail = document.getElementById("errGmail");
const errSubject = document.getElementById("errSubject");
const errMessage = document.getElementById("errMessage");

const overlay = document.getElementById("successOverlay");
const snowCanvas = document.getElementById("snowCanvas");

const TO_EMAIL = "taylor.urina7e7@itb.cat";

// ---------- VALIDATION ----------
function setError(el, msg) {
    el.textContent = msg;
}

function clearErrors() {
    setError(errFirstName, "");
    setError(errLastName, "");
    setError(errGmail, "");
    setError(errSubject, "");
    setError(errMessage, "");
}

function isValidGmail(value) {
    const v = value.trim().toLowerCase();
    return /^[a-z0-9._%+-]+@gmail\.com$/.test(v);
}

function validate() {
    clearErrors();
    let ok = true;

    if (!firstName.value.trim()) {
        setError(errFirstName, "Nombre obligatorio.");
        ok = false;
    }

    if (!lastName.value.trim()) {
        setError(errLastName, "Apellido obligatorio.");
        ok = false;
    }

    if (!gmail.value.trim()) {
        setError(errGmail, "Gmail obligatorio.");
        ok = false;
    } else if (!isValidGmail(gmail.value)) {
        setError(errGmail, "Introduce un Gmail válido (termina en @gmail.com).");
        ok = false;
    }

    if (!subject.value.trim()) {
        setError(errSubject, "Asunto obligatorio.");
        ok = false;
    }

    if (!message.value.trim()) {
        setError(errMessage, "Mensaje obligatorio.");
        ok = false;
    }

    return ok;
}

// ---------- SNOW ANIMATION ----------
let snowRAF = null;
let snowStopTimer = null;

function startSnow(durationMs = 5000) {
    const ctx = snowCanvas.getContext("2d");
    const dpr = window.devicePixelRatio || 1;

    function resizeCanvas() {
        const rect = snowCanvas.getBoundingClientRect();
        snowCanvas.width = Math.floor(rect.width * dpr);
        snowCanvas.height = Math.floor(rect.height * dpr);
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    resizeCanvas();

    const W = snowCanvas.getBoundingClientRect().width;
    const H = snowCanvas.getBoundingClientRect().height;

    const flakesCount = Math.min(160, Math.max(70, Math.floor((W * H) / 12000)));
    const flakes = Array.from({ length: flakesCount }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        r: 1 + Math.random() * 3.2,
        vy: 0.8 + Math.random() * 2.3,
        vx: -0.4 + Math.random() * 0.8,
        drift: Math.random() * Math.PI * 2
    }));

    let lastT = performance.now();

    function draw(t) {
        const dt = Math.min(32, t - lastT);
        lastT = t;

        ctx.clearRect(0, 0, W, H);

        ctx.save();
        ctx.globalAlpha = 0.95;

        for (const f of flakes) {
            f.drift += 0.0025 * dt;

            f.x += f.vx + Math.sin(f.drift) * 0.25;
            f.y += f.vy * (dt / 16);

            if (f.y > H + 10) {
                f.y = -10;
                f.x = Math.random() * W;
            }
            if (f.x < -10) f.x = W + 10;
            if (f.x > W + 10) f.x = -10;

            ctx.beginPath();
            ctx.fillStyle = "rgba(234, 243, 255, 0.90)";
            ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
            ctx.fill();
        }

        ctx.restore();
        snowRAF = requestAnimationFrame(draw);
    }

    snowRAF = requestAnimationFrame(draw);

    const onResize = () => resizeCanvas();
    window.addEventListener("resize", onResize, { passive: true });

    snowStopTimer = setTimeout(() => {
        stopSnow();
        window.removeEventListener("resize", onResize);
    }, durationMs);
}

function stopSnow() {
    if (snowRAF) cancelAnimationFrame(snowRAF);
    snowRAF = null;
    if (snowStopTimer) clearTimeout(snowStopTimer);
    snowStopTimer = null;

    const ctx = snowCanvas.getContext("2d");
    const rect = snowCanvas.getBoundingClientRect();
    ctx.clearRect(0, 0, rect.width, rect.height);
}

// ---------- OVERLAY ----------
function showSuccessOverlay() {
    overlay.classList.add("active");
    overlay.setAttribute("aria-hidden", "false");

    startSnow(5000);

    setTimeout(() => {
        overlay.classList.remove("active");
        overlay.setAttribute("aria-hidden", "true");
        stopSnow();
    }, 5000);
}

// ---------- SUBMIT ----------
form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (!validate()) return;

    const fullName = `${firstName.value.trim()} ${lastName.value.trim()}`.trim();
    const phoneText = phone.value.trim() ? `Phone: ${phone.value.trim()}\n` : "";
    const fromText = `From: ${fullName}\nGmail: ${gmail.value.trim()}\n${phoneText}\n`;

    const body = `${fromText}Message:\n${message.value.trim()}`;

    const mailto = `mailto:${encodeURIComponent(TO_EMAIL)}?subject=${encodeURIComponent(subject.value.trim())}&body=${encodeURIComponent(body)}`;

    showSuccessOverlay();
    window.location.href = mailto;
    form.reset();
});
