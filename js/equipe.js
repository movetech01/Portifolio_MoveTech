document.addEventListener("DOMContentLoaded", () => {

    const body = document.body;
    const loader = document.querySelector(".loader");
    const header = document.querySelector("header");

    /* =====================================================
       LOADER
    ===================================================== */

    setTimeout(() => {

        if (loader) {
            loader.classList.add("hide");
        }

        body.classList.add("loaded");

    }, 1500);


    /* =====================================================
       HEADER AO ROLAR
    ===================================================== */

    function updateHeader() {

        if (!header) return;

        if (window.scrollY > 30) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    }

    window.addEventListener("scroll", updateHeader);

    updateHeader();


    /* =====================================================
       MENU MOBILE
    ===================================================== */

    const menuButton = document.getElementById("menuButton");
    const navLinks = document.getElementById("navLinks");

    if (menuButton && navLinks) {

        menuButton.addEventListener("click", () => {

            navLinks.classList.toggle("open");

            const aberto = navLinks.classList.contains("open");

            menuButton.setAttribute(
                "aria-expanded",
                aberto ? "true" : "false"
            );

        });


        navLinks.querySelectorAll("a").forEach(link => {

            link.addEventListener("click", () => {

                navLinks.classList.remove("open");

                menuButton.setAttribute(
                    "aria-expanded",
                    "false"
                );

            });

        });

    }


    /* =====================================================
       LINK ATIVO AUTOMÁTICO
    ===================================================== */

    const currentPage =
        window.location.pathname
            .split("/")
            .pop()
            .toLowerCase();

    document.querySelectorAll(".nav-links a").forEach(link => {

        const href = link.getAttribute("href");

        if (!href) return;

        const linkPage =
            href.split("/")
                .pop()
                .split("#")[0]
                .toLowerCase();

        link.classList.remove("active");

        if (
            currentPage === "equipe.html" &&
            linkPage === "equipe.html"
        ) {
            link.classList.add("active");
        }

        if (
            (currentPage === "" || currentPage === "index.html") &&
            linkPage === "index.html"
        ) {
            link.classList.add("active");
        }

    });


    /* =====================================================
       CURSOR PERSONALIZADO
    ===================================================== */

    const cursor = document.querySelector(".cursor");
    const follower = document.querySelector(".cursor-follower");

    if (
        cursor &&
        follower &&
        window.matchMedia("(pointer: fine)").matches
    ) {

        body.classList.add("cursor-active");

        let mouseX = 0;
        let mouseY = 0;

        let followerX = 0;
        let followerY = 0;

        document.addEventListener("mousemove", event => {

            mouseX = event.clientX;
            mouseY = event.clientY;

            cursor.style.left = `${mouseX}px`;
            cursor.style.top = `${mouseY}px`;

        });


        function animateFollower() {

            followerX += (mouseX - followerX) * 0.14;
            followerY += (mouseY - followerY) * 0.14;

            follower.style.left = `${followerX}px`;
            follower.style.top = `${followerY}px`;

            requestAnimationFrame(animateFollower);
        }

        animateFollower();


        document.querySelectorAll("a, button, .member-card").forEach(element => {

            element.addEventListener("mouseenter", () => {

                follower.style.width = "50px";
                follower.style.height = "50px";
                follower.style.borderColor = "rgba(255, 90, 0, 0.9)";

            });


            element.addEventListener("mouseleave", () => {

                follower.style.width = "34px";
                follower.style.height = "34px";
                follower.style.borderColor = "rgba(255, 90, 0, 0.6)";

            });

        });

    }


    /* =====================================================
       REVEAL DOS ELEMENTOS
    ===================================================== */

    const elementsToReveal = [

        ".section-header",
        ".team-intro",
        ".member-card",
        ".team-gallery-image",
        ".team-final"

    ];

    elementsToReveal.forEach(selector => {

        document.querySelectorAll(selector).forEach(element => {

            element.classList.add("reveal");

        });

    });


    const revealElements =
        document.querySelectorAll(".reveal");


    if ("IntersectionObserver" in window) {

        const revealObserver = new IntersectionObserver(
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

    } else {

        revealElements.forEach(element => {

            element.classList.add("visible");

        });

    }


    /* =====================================================
       EFEITO PARALLAX NA FOTO PRINCIPAL
    ===================================================== */

    const mainImage =
        document.querySelector(".team-main-image");

    if (
        mainImage &&
        window.matchMedia("(pointer: fine)").matches
    ) {

        mainImage.addEventListener("mousemove", event => {

            const rect =
                mainImage.getBoundingClientRect();

            const x =
                event.clientX - rect.left;

            const y =
                event.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateY =
                ((x - centerX) / centerX) * 3;

            const rotateX =
                ((centerY - y) / centerY) * 3;

            mainImage.style.transform =
                `perspective(1000px)
                 rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)
                 translateY(-5px)`;
        });


        mainImage.addEventListener("mouseleave", () => {

            mainImage.style.transform =
                "rotate(1deg)";

        });

    }


    /* =====================================================
       EFEITO NOS CARDS
    ===================================================== */

    const cards =
        document.querySelectorAll(".member-card");

    cards.forEach(card => {

        card.addEventListener("mouseenter", () => {

            cards.forEach(otherCard => {

                if (otherCard !== card) {
                    otherCard.style.opacity = "0.7";
                }

            });

        });


        card.addEventListener("mouseleave", () => {

            cards.forEach(otherCard => {

                otherCard.style.opacity = "1";

            });

        });

    });


    /* =====================================================
       SCROLL SUAVE PARA ÂNCORAS
    ===================================================== */

    document.querySelectorAll('a[href^="#"]').forEach(link => {

        link.addEventListener("click", event => {

            const targetId =
                link.getAttribute("href");

            if (
                !targetId ||
                targetId === "#"
            ) {
                return;
            }

            const target =
                document.querySelector(targetId);

            if (!target) return;

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    });


    /* =====================================================
       ÍCONES LUCIDE
    ===================================================== */

    if (window.lucide) {
        lucide.createIcons();
    }


    /* =====================================================
       DESTAQUE DAS FUNÇÕES
    ===================================================== */

    const roleCards =
        document.querySelectorAll(".member-card");

    roleCards.forEach((card, index) => {

        card.style.transitionDelay =
            `${index * 70}ms`;

    });


    /* =====================================================
       MOVIMENTO DO TEXTO FINAL
    ===================================================== */

    const finalSection =
        document.querySelector(".team-final");

    if (
        finalSection &&
        window.matchMedia("(pointer: fine)").matches
    ) {

        finalSection.addEventListener("mousemove", event => {

            const rect =
                finalSection.getBoundingClientRect();

            const x =
                (event.clientX - rect.left) /
                rect.width;

            const y =
                (event.clientY - rect.top) /
                rect.height;

            const moveX =
                (x - 0.5) * 10;

            const moveY =
                (y - 0.5) * 10;

            const title =
                finalSection.querySelector("h2");

            if (title) {

                title.style.transform =
                    `translate(${moveX}px, ${moveY}px)`;

            }

        });


        finalSection.addEventListener("mouseleave", () => {

            const title =
                finalSection.querySelector("h2");

            if (title) {

                title.style.transform =
                    "translate(0, 0)";

            }

        });

    }

});