const aboutWrapper = document.getElementById('about-showcase-wrapper');

function getAboutTimelineData() {
    return [
        { year: "1998", text: "Apre le porte un piccolo bistrot di quartiere, con dieci tavoli e una grande passione." },
        { year: "2010", text: `Rinnoviamo la sala e introduciamo il banco cocktail: nasce ${window.siteState.brandName} come lo conoscete oggi.` },
        { year: "2018", text: "Il nostro chef ottiene il primo riconoscimento della guida regionale." },
        { year: "2023", text: "Apertura del dehors estivo e ampliamento della carta dei vini naturali." }
    ];
}

function triggerAboutAnim(id) {
    anime.remove('#about-showcase-wrapper *');
    aboutWrapper.innerHTML = '';

    switch (id) {
        case 1: { // Timeline Verticale
            const aboutTimelineData = getAboutTimelineData();
            const rowsHtml = aboutTimelineData.map((item, i) => `
                <div class="timeline-row ${i % 2 === 0 ? 'left' : 'right'}">
                    <div class="timeline-node"></div>
                    <div class="timeline-content">
                        <div class="timeline-year">${item.year}</div>
                        <p class="timeline-text">${item.text}</p>
                    </div>
                </div>
            `).join('');
            aboutWrapper.innerHTML = `
                <div class="about-timeline">
                    <div class="timeline-line"></div>
                    ${rowsHtml}
                </div>
            `;
            anime.timeline()
                .add({ targets: '.timeline-line', height: ['0%', '100%'], duration: 1600, easing: 'easeInOutQuad' })
                .add({ targets: '.timeline-node', scale: [0, 1], delay: anime.stagger(300), duration: 450, easing: 'easeOutBack' }, '-=1400')
                .add({ targets: '.timeline-row.left .timeline-content', opacity: [0, 1], translateX: [40, 0], delay: anime.stagger(300), duration: 600, easing: 'easeOutQuad' }, '-=1500')
                .add({ targets: '.timeline-row.right .timeline-content', opacity: [0, 1], translateX: [-40, 0], delay: anime.stagger(300), duration: 600, easing: 'easeOutQuad' }, '-=1500');
            break;
        }
        case 2: // Split Image/Testo
            aboutWrapper.innerHTML = `
                <div class="about-split">
                    <div class="about-split-media"></div>
                    <div class="about-split-text">
                        <h2>La Nostra Storia</h2>
                        <p>Tutto nasce da un'idea semplice: trattare ogni ospite come si tratterebbe un amico a cena. Da allora selezioniamo produttori locali, ricette di famiglia e un servizio che non dimentica mai il calore dell'accoglienza.</p>
                    </div>
                </div>
            `;
            anime.timeline()
                .add({ targets: '.about-split-media', opacity: [0, 1], translateX: [-60, 0], duration: 800, easing: 'easeOutExpo' })
                .add({ targets: '.about-split-text h2', opacity: [0, 1], translateX: [60, 0], duration: 700, easing: 'easeOutExpo' }, '-=600')
                .add({ targets: '.about-split-text p', opacity: [0, 1], translateY: [20, 0], duration: 700, easing: 'easeOutQuad' }, '-=400');
            break;

        case 3: { // Citazione Typewriter
            const quote = "La buona cucina non si limita a nutrire il corpo: racconta una storia, un luogo, una famiglia.";
            aboutWrapper.innerHTML = `
                <div class="about-quote-box">
                    <p class="about-quote-text"><span id="quote-typed"></span><span class="about-quote-cursor">&nbsp;</span></p>
                    <p class="about-quote-author" style="opacity:0;">— Marco Ferrari, Executive Chef</p>
                </div>
            `;
            const typedEl = document.getElementById('quote-typed');
            let i = 0;
            const typeInterval = setInterval(() => {
                typedEl.textContent = quote.slice(0, i + 1);
                i++;
                if (i >= quote.length) {
                    clearInterval(typeInterval);
                    anime({ targets: '.about-quote-author', opacity: [0, 1], translateY: [10, 0], duration: 600, easing: 'easeOutQuad' });
                }
            }, 35);
            anime({
                targets: '.about-quote-cursor',
                opacity: [1, 0],
                duration: 500,
                loop: true,
                easing: 'steps(1)'
            });
            break;
        }
        case 4: // Storytelling a Strati (Parallax Layers)
            aboutWrapper.innerHTML = `
                <div class="about-layers">
                    <div class="about-layer about-layer-bg"></div>
                    <div class="about-layer about-layer-glow"></div>
                    <div class="about-layer about-layer-text">
                        <h2>Ogni piatto<br>ha una storia</h2>
                        <p>Dalla scelta dei fornitori alla mise en place: raccontiamo il territorio in ogni dettaglio dell'esperienza.</p>
                    </div>
                </div>
            `;
            anime.timeline()
                .add({ targets: '.about-layer-bg', opacity: [0, 1], scale: [1.15, 1], duration: 1400, easing: 'easeOutQuad' })
                .add({ targets: '.about-layer-glow', opacity: [0, 1], duration: 1200, easing: 'easeOutQuad' }, '-=1000')
                .add({ targets: '.about-layer-text h2', opacity: [0, 1], translateY: [30, 0], duration: 800, easing: 'easeOutQuad' }, '-=800')
                .add({ targets: '.about-layer-text p', opacity: [0, 1], translateY: [20, 0], duration: 700, easing: 'easeOutQuad' }, '-=500');
            anime({
                targets: '.about-layer-glow',
                translateX: [-15, 15],
                translateY: [-10, 10],
                duration: 6000,
                direction: 'alternate',
                loop: true,
                easing: 'easeInOutSine',
                delay: 1400
            });
            break;
    }
}
