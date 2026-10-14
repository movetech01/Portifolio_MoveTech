document.addEventListener('DOMContentLoaded', () => {
    // 1. BARRA DE PROGRESSO DE ROLAGEM
    const progressBar = document.getElementById('progress');
    window.addEventListener('scroll', () => {
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (window.scrollY / totalHeight) * 100;
        if (progressBar) {
            progressBar.style.width = `${progress}%`;
        }
    });

    // 2. BOTÃO VOLTAR AO TOPO
    const topButton = document.getElementById('topButton');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            topButton.classList.add('visible');
        } else {
            topButton.classList.remove('visible');
        }
    });

    topButton.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // 3. MENU MOBILE TOGGLE
    const menuButton = document.getElementById('menuButton');
    const navLinks = document.getElementById('navLinks');

    if (menuButton && navLinks) {
        menuButton.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // 4. INTERATIVIDADE 3D NA SOLOBOX (PARALLAX TILT AO PASSAR O MOUSE)
    const soloboxCase = document.getElementById('soloboxCase');
    const phVal = document.getElementById('phVal');
    const tempVal = document.getElementById('tempVal');

    if (soloboxCase) {
        const container = soloboxCase.parentElement;

        container.addEventListener('mousemove', (e) => {
            const rect = container.getBoundingClientRect();
            const x = e.clientX - rect.left - (rect.width / 2);
            const y = e.clientY - rect.top - (rect.height / 2);

            const rotateX = (-y / rect.height) * 30;
            const rotateY = (x / rect.width) * 30;

            soloboxCase.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
        });

        container.addEventListener('mouseleave', () => {
            soloboxCase.style.transform = `perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)`;
        });

        // Simulação dinâmica de leitura de solo
        setInterval(() => {
            if (phVal && tempVal) {
                const randomPh = (6.5 + Math.random() * 0.8).toFixed(1);
                const randomTemp = (22.0 + Math.random() * 3.0).toFixed(1);
                phVal.textContent = randomPh;
                tempVal.textContent = `${randomTemp}°C`;
            }
        }, 3000);
    }

    // 5. ROBÔ FUTURISTA INTERATIVO (REAGE AO CURSOR)
    const interactiveRobot = document.getElementById('interactiveRobot');
    const screenText = document.getElementById('screenText');

    if (interactiveRobot) {
        document.addEventListener('mousemove', (e) => {
            const windowWidth = window.innerWidth;
            const windowHeight = window.innerHeight;

            const mouseX = (e.clientX / windowWidth - 0.5) * 20;
            const mouseY = (e.clientY / windowHeight - 0.5) * 20;

            interactiveRobot.style.transform = `translate(${mouseX}px, ${mouseY}px) rotate(${mouseX * 0.2}deg)`;
        });

        const robotPhrases = ["BIOGLOW", "CE263", "SOLOBOX", "MT 2026", "FLL 2026"];
        let phraseIndex = 0;

        interactiveRobot.addEventListener('click', () => {
            phraseIndex = (phraseIndex + 1) % robotPhrases.length;
            if (screenText) {
                screenText.textContent = robotPhrases[phraseIndex];
            }
        });
    }

    // 6. ANIMAÇÕES REVEAL AO ROLAR A PÁGINA (SCROLL REVEAL)
    const reveals = document.querySelectorAll('.reveal');

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        reveals.forEach((el) => {
            const elementTop = el.getBoundingClientRect().top;
            const elementVisible = 100;

            if (elementTop < windowHeight - elementVisible) {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
                el.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
            }
        });
    };

    // Estilos iniciais do Reveal
    reveals.forEach((el) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
    });

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Executa na inicialização
});