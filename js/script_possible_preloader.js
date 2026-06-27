const preloaderWrapper = document.getElementById('preloader-showcase-wrapper');

function preloaderRevealContent() {
    return `
        <div class="preloader-reveal-content">
            <h2>Bentornati a <span class="brand-name-slot">${window.siteState.brandName}</span></h2>
            <p>Il sito è pronto, buona navigazione.</p>
        </div>
    `;
}

function triggerPreloaderAnim(id) {
    anime.remove('#preloader-showcase-wrapper *');
    preloaderWrapper.innerHTML = '';

    switch (id) {
        case 1: // Logo Reveal Minimal
            preloaderWrapper.innerHTML = `
                <div class="preloader-stage">
                    ${preloaderRevealContent()}
                    <div class="preloader-overlay" id="pl-overlay">
                        <div class="preloader-logo-circle brand-initials-slot">${getInitials(window.siteState.brandName)}</div>
                        <span class="preloader-logo-label brand-name-slot">${window.siteState.brandName}</span>
                    </div>
                </div>
            `;
            document.querySelector('.preloader-reveal-content').style.opacity = 0;
            anime.timeline()
                .add({ targets: '.preloader-logo-circle', scale: [0.6, 1], opacity: [0, 1], duration: 600, easing: 'easeOutBack' })
                .add({ targets: '.preloader-logo-label', opacity: [0, 1], duration: 500, easing: 'easeOutQuad' }, '-=200')
                .add({ targets: '.preloader-logo-circle', scale: [1, 1.08], duration: 500, direction: 'alternate', loop: 2, easing: 'easeInOutSine' })
                .add({ targets: '#pl-overlay', opacity: [1, 0], duration: 500, easing: 'easeInQuad' })
                .add({ targets: '.preloader-reveal-content', opacity: [0, 1], translateY: [10, 0], duration: 600, easing: 'easeOutQuad' }, '-=300');
            break;

        case 2: // Progress Bar Elegante
            preloaderWrapper.innerHTML = `
                <div class="preloader-stage">
                    ${preloaderRevealContent()}
                    <div class="preloader-overlay" id="pl-overlay">
                        <div class="preloader-progress-track"><div class="preloader-progress-fill" id="pl-fill"></div></div>
                        <div class="preloader-progress-percent"><span id="pl-percent">0</span>%</div>
                    </div>
                </div>
            `;
            document.querySelector('.preloader-reveal-content').style.opacity = 0;
            anime({ targets: '#pl-fill', width: ['0%', '100%'], duration: 1800, easing: 'easeInOutQuad' });
            anime({
                targets: '#pl-percent',
                innerHTML: [0, 100],
                round: 1,
                duration: 1800,
                easing: 'easeInOutQuad',
                complete: () => {
                    anime({ targets: '#pl-overlay', opacity: [1, 0], duration: 450, easing: 'easeInQuad' });
                    anime({ targets: '.preloader-reveal-content', opacity: [0, 1], translateY: [10, 0], duration: 600, easing: 'easeOutQuad', delay: 200 });
                }
            });
            break;

        case 3: // Sipario di Caricamento
            preloaderWrapper.innerHTML = `
                <div class="preloader-stage">
                    ${preloaderRevealContent()}
                    <div class="preloader-curtain-panel preloader-curtain-left"></div>
                    <div class="preloader-curtain-panel preloader-curtain-right"></div>
                </div>
            `;
            document.querySelector('.preloader-reveal-content').style.opacity = 0;
            anime.timeline()
                .add({ targets: '.preloader-curtain-left', translateX: ['0%', '-100%'], duration: 800, easing: 'easeInOutExpo', delay: 700 })
                .add({ targets: '.preloader-curtain-right', translateX: ['0%', '100%'], duration: 800, easing: 'easeInOutExpo' }, '-=800')
                .add({ targets: '.preloader-reveal-content', opacity: [0, 1], duration: 600, easing: 'easeOutQuad' }, '-=400');
            break;

        case 4: { // Piatto & Fumo
            let steamHtml = '';
            for (let i = 0; i < 3; i++) {
                steamHtml += `<div class="preloader-steam" style="left:${30 + i * 8}px;"></div>`;
            }
            preloaderWrapper.innerHTML = `
                <div class="preloader-stage">
                    ${preloaderRevealContent()}
                    <div class="preloader-overlay" id="pl-overlay">
                        <div style="position:relative;">
                            ${steamHtml}
                            <div class="preloader-plate"></div>
                        </div>
                        <span class="preloader-logo-label" style="margin-top:18px;">Preparazione in corso...</span>
                    </div>
                </div>
            `;
            document.querySelector('.preloader-reveal-content').style.opacity = 0;
            anime({
                targets: '.preloader-steam',
                translateY: [0, -40],
                opacity: [0.6, 0],
                duration: 1400,
                delay: anime.stagger(300),
                loop: true,
                easing: 'easeOutSine'
            });
            anime({ targets: '.preloader-plate', scale: [0.9, 1], opacity: [0, 1], duration: 500, easing: 'easeOutBack' });
            setTimeout(() => {
                anime.remove('.preloader-steam');
                anime({ targets: '#pl-overlay', opacity: [1, 0], duration: 450, easing: 'easeInQuad' });
                anime({ targets: '.preloader-reveal-content', opacity: [0, 1], translateY: [10, 0], duration: 600, easing: 'easeOutQuad', delay: 150 });
            }, 2200);
            break;
        }
    }
}
