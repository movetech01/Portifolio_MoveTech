document.addEventListener("DOMContentLoaded", () => {


/* =========================
   LUCIDE
========================= */

if (typeof lucide !== "undefined") {
    lucide.createIcons();
}


/* =========================
   HEADER
========================= */

const header = document.getElementById("header");

function updateHeader() {

    if (window.scrollY > 40) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }

}

window.addEventListener("scroll", updateHeader);

updateHeader();


/* =========================
   MENU MOBILE
========================= */

const menuButton = document.getElementById("menuButton");
const navLinks = document.getElementById("navLinks");

if (menuButton && navLinks) {

    menuButton.addEventListener("click", () => {

        navLinks.classList.toggle("open");

    });


    navLinks.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", () => {

            navLinks.classList.remove("open");

        });

    });

}


/* =========================
   BARRA DE PROGRESSO
========================= */

const progressBar = document.getElementById("progressBar");

function updateProgress() {

    const scrollTop = window.scrollY;

    const documentHeight =
        document.documentElement.scrollHeight -
        window.innerHeight;

    if (documentHeight <= 0) {
        return;
    }

    const progress =
        (scrollTop / documentHeight) * 100;

    progressBar.style.width = `${progress}%`;

}

window.addEventListener("scroll", updateProgress);

updateProgress();


/* =========================
   REVEAL
========================= */

const revealElements =
    document.querySelectorAll(".reveal");

const revealObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    revealObserver.unobserve(
                        entry.target
                    );

                }

            });

        },
        {
            threshold: 0.12
        }
    );


revealElements.forEach(element => {

    revealObserver.observe(element);

});


/* =========================
   SENSOR DATA
========================= */

const phValues = [
    "6.8",
    "6.9",
    "7.0",
    "6.7",
    "6.8"
];

const tempValues = [
    "23.5",
    "24.1",
    "22.8",
    "23.7",
    "24.0"
];

let sensorIndex = 0;


function updateSensorData() {

    const phElement =
        document.querySelector(".sensor-ph strong");

    const tempElement =
        document.querySelector(".sensor-temp strong");

    if (!phElement || !tempElement) {
        return;
    }

    phElement.textContent =
        phValues[sensorIndex];

    tempElement.textContent =
        `${tempValues[sensorIndex]}°`;

    sensorIndex++;

    if (sensorIndex >= phValues.length) {
        sensorIndex = 0;
    }

}


updateSensorData();

setInterval(updateSensorData, 2500);


/* =========================
   INTERAÇÃO DA MALETA
========================= */

const device =
    document.querySelector(".solobox-device");

if (device) {

    device.addEventListener("mousemove", event => {

        const rect =
            device.getBoundingClientRect();

        const x =
            event.clientX - rect.left;

        const y =
            event.clientY - rect.top;

        const rotateY =
            ((x / rect.width) - .5) * 8;

        const rotateX =
            ((y / rect.height) - .5) * -8;

        device.style.animation = "none";

        device.style.transform =
            `perspective(900px)
             rotateX(${rotateX}deg)
             rotateY(${rotateY}deg)
             translateY(-8px)`;

    });


    device.addEventListener("mouseleave", () => {

        device.style.animation =
            "productFloat 5s ease-in-out infinite";

        device.style.transform = "";

    });

}


/* =========================
   GALERIA / MODAL
========================= */

const modal =
    document.getElementById("imageModal");

const modalImage =
    document.getElementById("modalImage");

const modalClose =
    document.getElementById("modalClose");

const galleryItems =
    document.querySelectorAll(".gallery-item");


galleryItems.forEach(item => {

    item.addEventListener("click", () => {

        const image =
            item.getAttribute("data-image");

        if (!image) {
            return;
        }

        modalImage.src = image;

        modal.classList.add("active");

        modal.setAttribute(
            "aria-hidden",
            "false"
        );

        document.body.style.overflow = "hidden";

    });

});


function closeModal() {

    modal.classList.remove("active");

    modal.setAttribute(
        "aria-hidden",
        "true"
    );

    modalImage.src = "";

    document.body.style.overflow = "";

}


if (modalClose) {
    modalClose.addEventListener(
        "click",
        closeModal
    );
}


if (modal) {

    modal.addEventListener(
        "click",
        event => {

            if (event.target === modal) {
                closeModal();
            }

        }
    );

}


document.addEventListener(
    "keydown",
    event => {

        if (event.key === "Escape") {
            closeModal();
        }

    }
);


/* =========================
   PARALLAX DOS ORBITS
========================= */

const heroProduct =
    document.querySelector(".hero-product");

if (heroProduct) {

    window.addEventListener(
        "scroll",
        () => {

            const scroll =
                window.scrollY;

            const orbits =
                document.querySelectorAll(
                    ".orbit"
                );

            orbits.forEach(
                (orbit, index) => {

                    const direction =
                        index % 2 === 0
                            ? 1
                            : -1;

                    orbit.style.translate =
                        `0 ${scroll * 0.025 * direction}px`;

                }
            );

        }
    );

}


/* =========================
   STATUS DA SOLOBOX
========================= */

const status =
    document.querySelector(".product-label");

if (status) {

    const messages = [
        "SYSTEM ONLINE",
        "SENSOR READY",
        "FIELD MODE",
        "DATA ACTIVE"
    ];

    let index = 0;

    setInterval(() => {

        index++;

        if (index >= messages.length) {
            index = 0;
        }

        const text =
            status.lastChild;

        if (text) {
            text.textContent =
                ` ${messages[index]}`;
        }

    }, 3000);

}


});
