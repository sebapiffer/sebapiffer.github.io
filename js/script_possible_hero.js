const heroWrapper = document.getElementById('hero-showcase-wrapper');

function heroBaseContent(suffix) {
    return `
        <div class="hero-vignette"></div>
        <div class="hero-content">
            <span class="hero-eyebrow"><span class="brand-name-slot">${window.siteState.brandName}</span> · ${suffix}</span>
            <h1 class="hero-title">Un'esperienza<br>da assaporare</h1>
            <p class="hero-sub">Cucina di ricerca, materie prime selezionate e un'atmosfera che racconta una storia ad ogni tavolo.</p>
            <button class="btn-gold" id="hero-cta">Prenota il tuo tavolo</button>
        </div>
    `;
}

function triggerHeroAnim(id) {
    anime.remove('#hero-showcase-wrapper *');
    heroWrapper.innerHTML = '';

    switch (id) {
        case 1: // Parallax Ken Burns + Glow CTA
            heroWrapper.innerHTML = `
                <div class="hero-stage">
                    <div class="hero-bg"></div>
                    ${heroBaseContent("Bistrot & Cocktail Bar")}
                </div>
            `;
            anime({
                targets: '.hero-bg',
                scale: [1, 1.18],
                duration: 9000,
                easing: 'easeInOutSine',
                direction: 'alternate',
                loop: true
            });
            anime.timeline()
                .add({ targets: '.hero-eyebrow', opacity: [0, 1], translateY: [10, 0], duration: 600, easing: 'easeOutQuad' })
                .add({ targets: '.hero-title', opacity: [0, 1], translateY: [25, 0], duration: 800, easing: 'easeOutQuad' }, '-=350')
                .add({ targets: '.hero-sub', opacity: [0, 1], translateY: [15, 0], duration: 700, easing: 'easeOutQuad' }, '-=500')
                .add({ targets: '#hero-cta', opacity: [0, 1], scale: [0.9, 1], duration: 600, easing: 'easeOutBack' }, '-=400');
            const accentRgb = getAccentRGB();
            anime({
                targets: '#hero-cta',
                boxShadow: [`0 0 0px rgba(${accentRgb},0.6)`, `0 0 28px rgba(${accentRgb},0.6)`],
                duration: 1400,
                direction: 'alternate',
                loop: true,
                easing: 'easeInOutSine',
                delay: 2200
            });
            break;

        case 2: // Sipario che si Apre (Curtain Reveal)
            heroWrapper.innerHTML = `
                <div class="hero-stage">
                    <div class="hero-bg"></div>
                    ${heroBaseContent("Apertura Serale")}
                    <div class="curtain-left curtain-panel"></div>
                    <div class="curtain-right curtain-panel"></div>
                    <div class="curtain-emblem brand-initials-slot">${getInitials(window.siteState.brandName)}</div>
                </div>
            `;
            document.querySelector('.hero-content').style.opacity = 0;
            anime.timeline()
                .add({ targets: '.curtain-emblem', opacity: [0, 1], scale: [0.5, 1], duration: 500, easing: 'easeOutBack' })
                .add({ targets: '.curtain-emblem', opacity: [1, 0], scale: [1, 0.6], duration: 350, easing: 'easeInQuad' }, 500)
                .add({ targets: '.curtain-left', translateX: ['0%', '-100%'], duration: 900, easing: 'easeInOutExpo' }, 550)
                .add({ targets: '.curtain-right', translateX: ['0%', '100%'], duration: 900, easing: 'easeInOutExpo' }, 550)
                .add({ targets: '.hero-content', opacity: [0, 1], translateY: [20, 0], duration: 700, easing: 'easeOutQuad' }, 950);
            break;

        case 3: { // Atmosfera Fumo (Particles)
            let particlesHtml = '';
            for (let i = 0; i < 24; i++) {
                const size = anime.random(4, 10);
                particlesHtml += `<div class="particle" style="left:${anime.random(0, 100)}%; width:${size}px; height:${size}px;"></div>`;
            }
            heroWrapper.innerHTML = `
                <div class="hero-stage">
                    <div class="hero-bg"></div>
                    ${particlesHtml}
                    ${heroBaseContent("Atmosfera Avvolgente")}
                </div>
            `;
            anime({
                targets: '.particle',
                translateY: () => anime.random(-500, -700),
                translateX: () => anime.random(-40, 40),
                opacity: [0, 0.7, 0],
                duration: () => anime.random(4000, 7000),
                delay: anime.stagger(220),
                easing: 'easeOutSine',
                loop: true
            });
            anime.timeline()
                .add({ targets: '.hero-eyebrow', opacity: [0, 1], duration: 600 })
                .add({ targets: '.hero-title', opacity: [0, 1], duration: 1000, easing: 'easeOutQuad' }, '-=300')
                .add({ targets: '.hero-sub', opacity: [0, 1], duration: 700 }, '-=500')
                .add({ targets: '#hero-cta', opacity: [0, 1], duration: 600 }, '-=400');
            break;
        }

        case 4: // Aurora Notturna (Gradient Animato)
            heroWrapper.innerHTML = `
                <div class="hero-stage">
                    <div class="aurora-bg"></div>
                    ${heroBaseContent("Mood Notturno")}
                </div>
            `;
            anime({
                targets: '.aurora-bg',
                rotate: 360,
                duration: 24000,
                loop: true,
                easing: 'linear'
            });
            anime.timeline()
                .add({ targets: '.hero-eyebrow', opacity: [0, 1], letterSpacing: ['10px', '4px'], duration: 900, easing: 'easeOutExpo' })
                .add({ targets: '.hero-title', opacity: [0, 1], scale: [0.92, 1], duration: 900, easing: 'easeOutExpo' }, '-=500')
                .add({ targets: '.hero-sub', opacity: [0, 1], duration: 700 }, '-=400')
                .add({ targets: '#hero-cta', opacity: [0, 1], translateY: [10, 0], duration: 600 }, '-=300');
            break;
    }
}
