const reviewWrapper = document.getElementById('reviews-showcase-wrapper');

const reviewsData = [
    { name: "Giulia R.", stars: 5, text: "Atmosfera incredibile e il cocktail affumicato è uno spettacolo. Torneremo!" },
    { name: "Marco T.", stars: 5, text: "Servizio impeccabile, la tartare di tonno è la migliore che abbia mai mangiato in città." },
    { name: "Elena B.", stars: 4, text: "Locale curato in ogni dettaglio, prezzi giusti per la qualità offerta." },
    { name: "Davide P.", stars: 5, text: "Cena perfetta per un'occasione speciale, staff attento e cucina di livello." },
    { name: "Sara M.", stars: 5, text: "Il risotto allo zafferano merita da solo la visita. Consigliatissimo." }
];

function starsHtml(n) { return '★'.repeat(n) + '☆'.repeat(5 - n); }

function reviewCardHtml(r) {
    return `
        <div class="review-card">
            <div class="review-stars">${starsHtml(r.stars)}</div>
            <p class="review-text">"${r.text}"</p>
            <div class="review-author">${r.name}</div>
        </div>
    `;
}

function triggerReviewsAnim(id) {
    anime.remove('#reviews-showcase-wrapper *');
    reviewWrapper.innerHTML = '';

    switch (id) {
        case 1: // Carosello Auto
            reviewWrapper.innerHTML = `
                <div class="reviews-carousel-stage" id="carousel-stage"></div>
                <div class="reviews-carousel-nav">
                    <button class="nav-arrow-btn" onclick="reviewsCarouselMove(-1)">&#8592;</button>
                    <button class="nav-arrow-btn" onclick="reviewsCarouselMove(1)">&#8594;</button>
                </div>
            `;
            window.reviewsCarouselIndex = 0;
            renderReviewsCarousel();
            break;

        case 2: { // Marquee Infinito
            const loop = [...reviewsData, ...reviewsData];
            reviewWrapper.innerHTML = `
                <div class="reviews-marquee-viewport">
                    <div class="reviews-marquee-track" id="reviews-marquee-track">
                        ${loop.map(reviewCardHtml).join('')}
                    </div>
                </div>
            `;
            anime({ targets: '#reviews-marquee-track', translateX: ['0%', '-50%'], duration: 22000, easing: 'linear', loop: true });
            break;
        }
        case 3: // Punteggio Hero (Count-Up)
            reviewWrapper.innerHTML = `
                <div class="reviews-summary">
                    <div class="reviews-score" id="reviews-score">0.0</div>
                    <div class="reviews-stars-big">${'★'.repeat(5).split('').map(s => `<span>${s}</span>`).join('')}</div>
                    <p style="color:#718096; font-size:0.8rem;">Basato su 312 recensioni</p>
                </div>
                <div class="reviews-snippet-grid">
                    ${reviewsData.slice(0, 3).map(reviewCardHtml).join('')}
                </div>
            `;
            anime({ targets: '.reviews-stars-big span', scale: [0, 1], rotate: [-30, 0], delay: anime.stagger(120), duration: 500, easing: 'easeOutBack' });
            anime({
                targets: '#reviews-score',
                innerHTML: [0, 4.9],
                round: 10,
                duration: 1400,
                easing: 'easeOutExpo',
                delay: 300
            });
            anime({ targets: '.reviews-snippet-grid .review-card', opacity: [0, 1], translateY: [20, 0], delay: anime.stagger(120, { start: 900 }), duration: 600, easing: 'easeOutQuad' });
            break;

        case 4: // Stack Swipe (Carte 3D)
            reviewWrapper.innerHTML = `
                <div class="reviews-stack" id="reviews-stack"></div>
                <div class="reviews-stack-nav">
                    <button class="btn-ghost" onclick="reviewsStackNext()">Prossima recensione →</button>
                </div>
            `;
            window.reviewsStackIndex = 0;
            renderReviewsStack();
            break;
    }
}

function renderReviewsCarousel() {
    const stage = document.getElementById('carousel-stage');
    if (!stage) return;
    const r = reviewsData[window.reviewsCarouselIndex];
    const wrap = document.createElement('div');
    wrap.innerHTML = reviewCardHtml(r);
    const cardEl = wrap.firstElementChild;
    cardEl.style.opacity = 0;
    cardEl.style.transform = 'translateX(40px)';
    stage.innerHTML = '';
    stage.appendChild(cardEl);
    anime({ targets: cardEl, opacity: [0, 1], translateX: [40, 0], duration: 450, easing: 'easeOutQuad' });
}

function reviewsCarouselMove(dir) {
    const total = reviewsData.length;
    const stage = document.getElementById('carousel-stage');
    const current = stage.firstElementChild;
    if (!current) return;
    anime({
        targets: current,
        opacity: [1, 0],
        translateX: dir > 0 ? [0, -40] : [0, 40],
        duration: 300,
        easing: 'easeInQuad',
        complete: () => {
            window.reviewsCarouselIndex = (window.reviewsCarouselIndex + dir + total) % total;
            renderReviewsCarousel();
        }
    });
}

function renderReviewsStack() {
    const stack = document.getElementById('reviews-stack');
    if (!stack) return;
    stack.innerHTML = '';
    const front = reviewsData[window.reviewsStackIndex % reviewsData.length];
    const back = reviewsData[(window.reviewsStackIndex + 1) % reviewsData.length];

    const backWrap = document.createElement('div');
    backWrap.innerHTML = reviewCardHtml(back);
    const backEl = backWrap.firstElementChild;
    backEl.style.transform = 'translateY(14px) scale(0.94)';
    backEl.style.opacity = '0.55';
    backEl.style.zIndex = '1';
    backEl.className += ' review-card-back';

    const frontWrap = document.createElement('div');
    frontWrap.innerHTML = reviewCardHtml(front);
    const frontEl = frontWrap.firstElementChild;
    frontEl.style.zIndex = '2';
    frontEl.className += ' review-card-front';

    stack.appendChild(backEl);
    stack.appendChild(frontEl);
}

function reviewsStackNext() {
    const stack = document.getElementById('reviews-stack');
    const frontEl = stack.querySelector('.review-card-front');
    const backEl = stack.querySelector('.review-card-back');
    if (!frontEl || !backEl) return;

    anime({ targets: frontEl, translateX: 380, rotate: 16, opacity: 0, duration: 420, easing: 'easeInQuad' });
    anime({
        targets: backEl,
        translateY: [14, 0],
        scale: [0.94, 1],
        opacity: [0.55, 1],
        duration: 420,
        easing: 'easeOutQuad',
        complete: () => {
            window.reviewsStackIndex = (window.reviewsStackIndex + 1) % reviewsData.length;
            renderReviewsStack();
        }
    });
}
