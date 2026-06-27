const titleEl = document.getElementById('animated-title');
const subtitleEl = document.querySelector('.brand-subtitle');
const logoEl = document.querySelector('.logo-icon');

function prepareLetters() {
    const txt = (window.siteState && window.siteState.brandName) ? window.siteState.brandName.toUpperCase() : 'THE LOUNGE';
    titleEl.innerHTML = txt.replace(/\S/g, "<span class='letter'>$&</span>");
    if (subtitleEl) {
        subtitleEl.textContent = ((window.siteState && window.siteState.tagline) || 'BISTROT & COCKTAIL BAR').toUpperCase();
    }
}

function triggerTitleAnim(id) {
    window.currentTitleVariant = id;
    anime.remove([logoEl, '.letter', subtitleEl, titleEl]);
    prepareLetters();
    
    // Hard Reset stili inline CSS
    logoEl.style.transform = "none"; logoEl.style.opacity = "1"; logoEl.style.filter = "none";
    titleEl.style.transform = "none"; titleEl.style.filter = "none";
    subtitleEl.style.opacity = "0"; subtitleEl.style.transform = "none";

    switch(id) {
        case 1: // Elegante Fade
            anime.timeline().add({ targets: [logoEl, titleEl], opacity: [0, 1], scale: [0.7, 1], duration: 1200, easing: 'easeOutCubic', delay: anime.stagger(150) })
            .add({ targets: subtitleEl, opacity: [0, 1], translateY: [10, 0], duration: 800, easing: 'easeOutQuad' }, '-=400');
            break;
        case 2: // Stagger Lettere
            anime.timeline().add({ targets: logoEl, translateY: [-40, 0], opacity: [0, 1], duration: 700, easing: 'easeOutBack' })
            .add({ targets: '.letter', translateY: [30, 0], opacity: [0, 1], rotateX: [-90, 0], duration: 550, easing: 'easeOutBack', delay: anime.stagger(50) }, '-=300')
            .add({ targets: subtitleEl, opacity: [0, 1], duration: 800 }, '-=200');
            break;
        case 3: // Mask Slide
            anime.timeline().add({ targets: logoEl, translateY: ['100%', '0%'], duration: 800, easing: 'easeOutExpo' })
            .add({ targets: '.letter', translateY: ['1.1em', '0em'], delay: anime.stagger(30), duration: 700, easing: 'easeOutExpo' }, '-=500')
            .add({ targets: subtitleEl, opacity: [0, 1], letterSpacing: ['18px', '10px'], duration: 1000, easing: 'easeOutExpo' }, '-=400');
            break;
        case 4: // Cinema Focus
            anime.timeline().add({ targets: logoEl, opacity: [0, 1], scale: [1.8, 1], filter: ['blur(12px)', 'blur(0px)'], duration: 1300, easing: 'easeOutQuad' })
            .add({ targets: titleEl, opacity: [0, 1], filter: ['blur(10px)', 'blur(0px)'], letterSpacing: ['22px', '6px'], duration: 1800, easing: 'easeOutQuart' }, '-=1000')
            .add({ targets: subtitleEl, opacity: [0, 1], duration: 800 }, '-=700');
            break;
        case 5: // Dinamico Pop
            anime.timeline().add({ targets: logoEl, rotate: '1turn', scale: [0, 1], duration: 900, easing: 'easeOutElastic(1, .6)' })
            .add({ targets: '.letter', scale: [0, 1], rotate: () => anime.random(-25, 25), duration: 500, easing: 'easeOutBack', delay: anime.stagger(40) }, '-=400')
            .add({ targets: '.letter', rotate: 0, duration: 300 })
            .add({ targets: subtitleEl, opacity: [0, 1], scale: [0.9, 1], duration: 500 }, '-=100');
            break;
        case 6: // Neon Night
            anime.timeline().add({ targets: logoEl, opacity: [0, 0.4, 0.1, 1, 0.3, 1], duration: 700, easing: 'linear' })
            .add({ targets: [titleEl, subtitleEl], opacity: [0, 1, 0.2, 1, 0.4, 1], duration: 900, easing: 'linear' }, 150);
            break;
        case 7: // Split Verticale
            anime.timeline().add({ targets: logoEl, translateY: [-80, 0], opacity: [0, 1], duration: 600, easing: 'easeOutQuad' })
            .add({ targets: titleEl, translateY: [80, 0], opacity: [0, 1], duration: 600, easing: 'easeOutQuad' }, '-=600')
            .add({ targets: subtitleEl, opacity: [0, 1], duration: 600 });
            break;
    }
}