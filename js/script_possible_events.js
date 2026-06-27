const eventsWrapper = document.getElementById('events-showcase-wrapper');

const eventsData = [
    { day: "12", month: "Lug", title: "Serata Jazz & Cocktail", desc: "Live music e drink list dedicata, dalle 20:00." },
    { day: "19", month: "Lug", title: "Cena con il Vignaiolo", desc: "Menu degustazione abbinato a vini naturali selezionati." },
    { day: "03", month: "Ago", title: "Notte di San Lorenzo", desc: "Aperitivo sotto le stelle in terrazza." }
];

const eventsSlidesData = [
    { title: "Serata Jazz & Cocktail", desc: "Live music dalle 20:00, drink list dedicata.", grad: "linear-gradient(135deg, #2b1b0a, #0b0c10)" },
    { title: "Cena con il Vignaiolo", desc: "Menu degustazione con vini naturali selezionati.", grad: "linear-gradient(135deg, #3e1622, #0b0c10)" },
    { title: "Notte di San Lorenzo", desc: "Aperitivo in terrazza sotto le stelle.", grad: "linear-gradient(135deg, #142035, #0b0c10)" }
];

function triggerEventsAnim(id) {
    anime.remove('#events-showcase-wrapper *');
    if (window.eventsCountdownInterval) clearInterval(window.eventsCountdownInterval);
    eventsWrapper.innerHTML = '';

    switch (id) {
        case 1: // Card Eventi Stagione
            eventsWrapper.innerHTML = `
                <div class="events-grid">
                    ${eventsData.map(e => `
                        <div class="event-card">
                            <div class="event-card-banner">
                                <div class="event-date-badge"><span class="day">${e.day}</span><span class="month">${e.month}</span></div>
                            </div>
                            <div class="event-card-body">
                                <h3>${e.title}</h3>
                                <p>${e.desc}</p>
                            </div>
                        </div>
                    `).join('')}
                </div>
            `;
            anime({ targets: '.event-card', opacity: [0, 1], translateY: [25, 0], delay: anime.stagger(120), duration: 600, easing: 'easeOutBack' });
            break;

        case 2: { // Calendario Eventi Interattivo
            const eventDays = [12, 19, 27];
            let daysHtml = ['L', 'M', 'M', 'G', 'V', 'S', 'D'].map(d => `<div class="calendar-day-label">${d}</div>`).join('');
            for (let d = 1; d <= 30; d++) {
                const hasEvent = eventDays.includes(d);
                daysHtml += `<div class="events-cal-day ${hasEvent ? 'has-event' : ''}" onclick="showEventDetail(${d}, ${hasEvent})">${d}</div>`;
            }
            eventsWrapper.innerHTML = `
                <div class="events-cal-grid">${daysHtml}</div>
                <div class="events-detail-panel" id="events-detail-panel">Seleziona un giorno con il pallino dorato per vedere i dettagli dell'evento.</div>
            `;
            anime.timeline()
                .add({ targets: '.events-cal-day', scale: [0, 1], delay: anime.stagger(10, { grid: [7, 5], from: 'first' }), duration: 400, easing: 'easeOutBack' })
                .add({ targets: '#events-detail-panel', opacity: [0, 1], duration: 400, easing: 'easeOutQuad' }, '-=200');
            break;
        }
        case 3: // Countdown Prossimo Evento
            eventsWrapper.innerHTML = `
                <div class="events-countdown-box">
                    <h2>Prossimo Evento: Serata Jazz & Cocktail</h2>
                    <div class="countdown-units">
                        <div class="countdown-unit"><span class="num" id="cd-days">00</span><span class="label">Giorni</span></div>
                        <div class="countdown-unit"><span class="num" id="cd-hours">00</span><span class="label">Ore</span></div>
                        <div class="countdown-unit"><span class="num" id="cd-mins">00</span><span class="label">Minuti</span></div>
                        <div class="countdown-unit"><span class="num" id="cd-secs">00</span><span class="label">Secondi</span></div>
                    </div>
                    <button class="btn-gold">Prenota il tuo posto</button>
                </div>
            `;
            anime({ targets: '.countdown-unit', opacity: [0, 1], scale: [0.8, 1], delay: anime.stagger(100), duration: 500, easing: 'easeOutBack' });
            startEventsCountdown();
            break;

        case 4: // Slider Eventi Full-bleed
            eventsWrapper.innerHTML = `
                <div class="events-slider-stage" id="events-slider-stage"></div>
                <div class="events-slider-dots" id="events-slider-dots"></div>
            `;
            window.eventsSlideIndex = 0;
            renderEventsSlide(true);
            break;
    }
}

function showEventDetail(day, hasEvent) {
    const panel = document.getElementById('events-detail-panel');
    if (!panel) return;
    anime.remove(panel);
    if (hasEvent) {
        const e = eventsData.find(ev => parseInt(ev.day, 10) === day) || eventsData[0];
        panel.innerHTML = `<strong style="color:var(--color-accent);">${e.title}</strong><p style="color:#a0aec0; margin-top:6px; font-size:0.85rem;">${e.desc}</p>`;
    } else {
        panel.innerHTML = `Nessun evento programmato per il giorno ${day}.`;
    }
    panel.style.opacity = 0;
    anime({ targets: panel, opacity: [0, 1], translateY: [10, 0], duration: 350, easing: 'easeOutQuad' });
}

function startEventsCountdown() {
    const target = new Date().getTime() + (3 * 24 * 60 * 60 * 1000) + (7 * 60 * 60 * 1000) + (22 * 60 * 1000);
    function update() {
        const now = new Date().getTime();
        const diff = Math.max(0, target - now);
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const mins = Math.floor((diff / (1000 * 60)) % 60);
        const secs = Math.floor((diff / 1000) % 60);
        const dEl = document.getElementById('cd-days');
        if (!dEl) { clearInterval(window.eventsCountdownInterval); return; }
        dEl.textContent = String(days).padStart(2, '0');
        document.getElementById('cd-hours').textContent = String(hours).padStart(2, '0');
        document.getElementById('cd-mins').textContent = String(mins).padStart(2, '0');
        document.getElementById('cd-secs').textContent = String(secs).padStart(2, '0');
    }
    if (window.eventsCountdownInterval) clearInterval(window.eventsCountdownInterval);
    update();
    window.eventsCountdownInterval = setInterval(update, 1000);
}

function renderEventsSlide(animate) {
    const stage = document.getElementById('events-slider-stage');
    const dotsBox = document.getElementById('events-slider-dots');
    if (!stage || !dotsBox) return;
    const s = eventsSlidesData[window.eventsSlideIndex];
    stage.innerHTML = `
        <div class="events-slide">
            <div class="events-slide-bg" style="background:${s.grad};"></div>
            <div class="events-slide-content">
                <h3>${s.title}</h3>
                <p>${s.desc}</p>
            </div>
        </div>
    `;
    dotsBox.innerHTML = eventsSlidesData.map((_, i) =>
        `<div class="events-slider-dot ${i === window.eventsSlideIndex ? 'active' : ''}" onclick="goToEventsSlide(${i})"></div>`
    ).join('');
    if (animate) {
        const slide = stage.firstElementChild;
        slide.style.opacity = 0;
        anime({ targets: slide, opacity: [0, 1], duration: 500, easing: 'easeOutQuad' });
    }
}

function goToEventsSlide(i) {
    window.eventsSlideIndex = i;
    renderEventsSlide(true);
}
