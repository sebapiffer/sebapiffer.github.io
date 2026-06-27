const contactWrapper = document.getElementById('contact-showcase-wrapper');

function triggerContactAnim(id) {
    anime.remove('#contact-showcase-wrapper *');
    contactWrapper.innerHTML = '';

    switch (id) {
        case 1: // Mappa & Pin Animato
            contactWrapper.innerHTML = `
                <div class="contact-map-layout">
                    <div class="contact-map-box">
                        <div class="map-pulse"></div>
                        <div class="map-pin"></div>
                    </div>
                    <div class="contact-info-box">
                        <h3>Dove Siamo</h3>
                        <p class="contact-info-row">Via dei Cocktail 12, Torino</p>
                        <p class="contact-info-row">+39 011 123 4567</p>
                        <p class="contact-info-row brand-email-slot">info@${slugify(window.siteState.brandName)}.it</p>
                    </div>
                </div>
            `;
            anime.timeline()
                .add({ targets: '.map-pin', scale: [0, 1], translateY: [-30, 0], duration: 600, easing: 'easeOutBounce' })
                .add({ targets: '.contact-info-row', opacity: [0, 1], translateX: [15, 0], delay: anime.stagger(120), duration: 500, easing: 'easeOutQuad' }, '-=300');
            anime({
                targets: '.map-pulse',
                scale: [1, 3],
                opacity: [0.5, 0],
                duration: 1600,
                loop: true,
                easing: 'easeOutQuad',
                delay: 600
            });
            break;

        case 2: { // Orari Live
            const days = [
                { d: 'Lunedì', h: 'Chiuso', today: false },
                { d: 'Martedì', h: '18:30 – 23:30', today: false },
                { d: 'Mercoledì', h: '18:30 – 23:30', today: true },
                { d: 'Giovedì', h: '18:30 – 23:30', today: false },
                { d: 'Venerdì', h: '18:30 – 00:30', today: false },
                { d: 'Sabato', h: '12:30 – 00:30', today: false },
                { d: 'Domenica', h: '12:30 – 22:30', today: false }
            ];
            const rowsHtml = days.map(day => `
                <div class="hours-row ${day.today ? 'today' : ''}">
                    <span class="hours-day">${day.d}</span>
                    <span class="hours-time">${day.h}</span>
                </div>
            `).join('');
            contactWrapper.innerHTML = `
                <div class="status-badge"><span class="status-dot"></span> Aperto Ora</div>
                <div class="hours-list">${rowsHtml}</div>
            `;
            anime.timeline()
                .add({ targets: '.status-badge', opacity: [0, 1], translateY: [-10, 0], duration: 400, easing: 'easeOutQuad' })
                .add({ targets: '.hours-row', opacity: [0, 1], translateX: [-20, 0], delay: anime.stagger(70), duration: 450, easing: 'easeOutQuad' }, '-=100');
            anime({ targets: '.status-dot', scale: [1, 1.4], opacity: [1, 0.5], duration: 900, direction: 'alternate', loop: true, easing: 'easeInOutSine', delay: 1200 });
            break;
        }
        case 3: { // Social Magnetici
            const icons = ['IG', 'FB', 'TT'];
            contactWrapper.innerHTML = `
                <p style="text-align:center; color:#718096; font-size:0.85rem; margin-bottom:24px;">Passa il mouse sopra le icone per vedere l'effetto hover</p>
                <div class="social-row">
                    ${icons.map(i => `<div class="social-icon">${i}</div>`).join('')}
                </div>
            `;
            anime({ targets: '.social-icon', scale: [0, 1], delay: anime.stagger(100), duration: 500, easing: 'easeOutBack' });
            setTimeout(() => previewSocialHover(), 700);
            break;
        }
        case 4: // Newsletter
            contactWrapper.innerHTML = `
                <div class="newsletter-box">
                    <h3>Resta Aggiornato</h3>
                    <p class="newsletter-desc">Eventi speciali, nuovi piatti di stagione e serate a tema direttamente nella tua inbox.</p>
                    <div class="newsletter-form">
                        <input type="email" id="newsletter-email" placeholder="La tua email">
                        <button class="newsletter-btn" id="newsletter-btn" onclick="submitNewsletter()">Iscriviti</button>
                    </div>
                    <p class="newsletter-feedback" id="newsletter-feedback">Iscrizione confermata! Controlla la tua inbox.</p>
                </div>
            `;
            anime.timeline()
                .add({ targets: '.newsletter-box h3', opacity: [0, 1], translateY: [15, 0], duration: 500, easing: 'easeOutQuad' })
                .add({ targets: '.newsletter-desc', opacity: [0, 1], duration: 500, easing: 'easeOutQuad' }, '-=300')
                .add({ targets: '.newsletter-form', opacity: [0, 1], translateY: [10, 0], duration: 500, easing: 'easeOutQuad' }, '-=300');
            break;
    }
}

function previewSocialHover() {
    const icons = document.querySelectorAll('.social-icon');
    icons.forEach((icon, i) => {
        setTimeout(() => {
            icon.classList.add('demo-hover');
            setTimeout(() => icon.classList.remove('demo-hover'), 500);
        }, i * 350);
    });
}

function submitNewsletter() {
    const btn = document.getElementById('newsletter-btn');
    const input = document.getElementById('newsletter-email');
    const feedback = document.getElementById('newsletter-feedback');
    btn.textContent = 'Invio...';
    setTimeout(() => {
        btn.textContent = '✓ Iscritto';
        input.classList.add('success');
        anime({ targets: feedback, opacity: [0, 1], translateY: [8, 0], duration: 400, easing: 'easeOutQuad' });
    }, 700);
}
