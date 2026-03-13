document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Elements ---
    const startBtn = document.getElementById('start-btn');
    const splash = document.getElementById('splash-screen');
    const mainPortfolio = document.getElementById('main-portfolio');
    const roamingBg = document.getElementById('roaming-background');
    const typeText = document.getElementById('typewriter-text');

    // --- 2. Typewriter Logic ---
    const phrases = [
        "I build websites.",
        "I solve problems.",
        "I innovate.",
        "Welcome to the future of digital design."
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function type() {
        const currentPhrase = phrases[phraseIndex];
        if (isDeleting) {
            typeText.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 50;
        } else {
            typeText.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 100;
        }

        if (!isDeleting && charIndex === currentPhrase.length) {
            isDeleting = true;
            typeSpeed = 2000;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typeSpeed = 500;
        }
        setTimeout(type, typeSpeed);
    }
    type();

    // --- 3. Transition (Splash to Portfolio) ---
    if (startBtn) {
        startBtn.addEventListener('click', () => {
            splash.style.opacity = '0';
            splash.style.transition = '1s ease';
            setTimeout(() => {
                splash.style.display = 'none';
                mainPortfolio.style.display = 'block';
                window.scrollTo(0, 0);
            }, 1000);
        });
    }

    // --- 4. Roaming Background Text ---
    const words = ["MYCHA", "WEB DEV", "IT Support Specialist", "Database Administrator", "CODE", "DESIGN", "LOGIC", "INNOVATE", "GAME DEVELOPER", "Software Engineer", "Systems Analyst"];
    
    for (let i = 0; i < 15; i++) {
        let span = document.createElement('span');
        span.className = 'roaming-text';
        span.innerText = words[Math.floor(Math.random() * words.length)];
        span.style.left = Math.random() * 100 + "vw";
        span.style.top = Math.random() * 100 + "vh";
        roamingBg.appendChild(span);
        
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const duration = Math.random() * 10 + 10;

        span.animate([
            { left: span.style.left, top: span.style.top },
            { left: x + "vw", top: y + "vh" }
        ], {
            duration: duration * 1000,
            iterations: Infinity,
            direction: "alternate",
            easing: "ease-in-out"
        });
    }

    // --- 5. Smooth Scrolling & Scroll Reveal ---
    document.querySelectorAll('.nav-links a, .hero .btn').forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetElement = document.querySelector(href);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    const revealOnScroll = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.15 });

    document.querySelectorAll('section, .project-card').forEach(el => {
        el.classList.add('reveal-item');
        revealOnScroll.observe(el);
    });
});
