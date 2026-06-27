const chefWrapper = document.getElementById('chef-showcase-wrapper');

const teamData = [
    { name: "Marco Ferrari", role: "Executive Chef", bio: "20 anni di esperienza tra Italia e Francia, specializzato in cucina di mare." },
    { name: "Giulia Conti", role: "Sous Chef", bio: "Cresciuta tra i fornelli di famiglia, oggi guida la brigata dei primi piatti." },
    { name: "Luca Bianchi", role: "Head Bartender", bio: "Pluripremiato bartender, crea cocktail signature ispirati alla cucina del locale." },
    { name: "Sara Moretti", role: "Pastry Chef", bio: "Dolci artigianali con un occhio all'estetica e uno al gusto." }
];

function getChefCareerData() {
    return [
        { year: "2005", text: "Diploma all'Istituto Alberghiero e primo stage in Costa Azzurra." },
        { year: "2012", text: "Sous Chef in un ristorante stellato a Lione." },
        { year: "2018", text: `Diventa Executive Chef di ${window.siteState.brandName}.` },
        { year: "2023", text: "Premio 'Cucina dell'Anno' dalla guida regionale." }
    ];
}

function triggerChefAnim(id) {
    anime.remove('#chef-showcase-wrapper *');
    chefWrapper.innerHTML = '';

    switch (id) {
        case 1: // Spotlight Singolo
            chefWrapper.innerHTML = `
                <div class="chef-spotlight">
                    <div class="chef-portrait"></div>
                    <div class="chef-spotlight-info">
                        <h2>Marco Ferrari</h2>
                        <div class="chef-role">Executive Chef</div>
                        <p class="chef-bio">"La cucina è il punto d'incontro tra memoria e creatività: ogni piatto deve raccontare qualcosa di vero."</p>
                    </div>
                </div>
            `;
            anime.timeline()
                .add({ targets: '.chef-portrait', opacity: [0, 1], translateX: [-40, 0], duration: 700, easing: 'easeOutExpo' })
                .add({ targets: '.chef-spotlight-info h2', opacity: [0, 1], translateY: [15, 0], duration: 600, easing: 'easeOutQuad' }, '-=400')
                .add({ targets: '.chef-role', opacity: [0, 1], duration: 500, easing: 'easeOutQuad' }, '-=300')
                .add({ targets: '.chef-bio', opacity: [0, 1], translateY: [10, 0], duration: 600, easing: 'easeOutQuad' }, '-=250');
            break;

        case 2: // Team Grid Cards
            chefWrapper.innerHTML = `
                <div class="team-grid">
                    ${teamData.map(m => `
                        <div class="team-card" onclick="flipTeamCard(this)">
                            <div class="team-card-avatar"></div>
                            <strong>${m.name}</strong>
                            <span>${m.role}</span>
                            <p class="team-card-bio">${m.bio}</p>
                        </div>
                    `).join('')}
                </div>
            `;
            anime({ targets: '.team-card', opacity: [0, 1], translateY: [20, 0], delay: anime.stagger(100), duration: 600, easing: 'easeOutBack' });
            break;

        case 3: // Carosello Membri
            chefWrapper.innerHTML = `
                <div class="chef-carousel-stage" id="chef-carousel-stage"></div>
                <div class="chef-carousel-nav">
                    <button class="nav-arrow-btn" onclick="chefCarouselMove(-1)">&#8592;</button>
                    <button class="nav-arrow-btn" onclick="chefCarouselMove(1)">&#8594;</button>
                </div>
            `;
            window.chefCarouselIndex = 0;
            renderChefCarousel();
            break;

        case 4: // Credentials Timeline
            const chefCareerData = getChefCareerData();
            chefWrapper.innerHTML = `
                <div class="chef-timeline">
                    <div class="chef-timeline-line"></div>
                    ${chefCareerData.map(c => `
                        <div class="chef-timeline-row">
                            <div class="chef-timeline-node"></div>
                            <strong>${c.year}</strong>
                            <p>${c.text}</p>
                        </div>
                    `).join('')}
                </div>
            `;
            anime.timeline()
                .add({ targets: '.chef-timeline-line', height: ['0%', '100%'], duration: 1400, easing: 'easeInOutQuad' })
                .add({ targets: '.chef-timeline-node', scale: [0, 1], delay: anime.stagger(280), duration: 400, easing: 'easeOutBack' }, '-=1200')
                .add({ targets: '.chef-timeline-row strong, .chef-timeline-row p', opacity: [0, 1], translateX: [20, 0], delay: anime.stagger(280), duration: 500, easing: 'easeOutQuad' }, '-=1200');
            break;
    }
}

function flipTeamCard(card) {
    card.classList.toggle('flipped');
}

function renderChefCarousel() {
    const stage = document.getElementById('chef-carousel-stage');
    if (!stage) return;
    const m = teamData[window.chefCarouselIndex];
    const wrap = document.createElement('div');
    wrap.innerHTML = `
        <div class="chef-carousel-card">
            <div class="team-card-avatar" style="margin:0 auto 14px auto;"></div>
            <strong>${m.name}</strong><br><span>${m.role}</span>
            <p style="color:#a0aec0; font-size:0.82rem; margin-top:10px;">${m.bio}</p>
        </div>
    `;
    const cardEl = wrap.firstElementChild;
    cardEl.style.opacity = 0;
    cardEl.style.transform = 'translateX(30px)';
    stage.innerHTML = '';
    stage.appendChild(cardEl);
    anime({ targets: cardEl, opacity: [0, 1], translateX: [30, 0], duration: 400, easing: 'easeOutQuad' });
}

function chefCarouselMove(dir) {
    const total = teamData.length;
    const stage = document.getElementById('chef-carousel-stage');
    const current = stage.firstElementChild;
    if (!current) return;
    anime({
        targets: current,
        opacity: [1, 0],
        translateX: dir > 0 ? [0, -30] : [0, 30],
        duration: 250,
        easing: 'easeInQuad',
        complete: () => {
            window.chefCarouselIndex = (window.chefCarouselIndex + dir + total) % total;
            renderChefCarousel();
        }
    });
}
