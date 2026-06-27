const bookingWrapper = document.getElementById('booking-showcase-wrapper');

function triggerBookingAnim(id) {
    anime.remove('#booking-showcase-wrapper *');
    bookingWrapper.innerHTML = '';

    switch (id) {
        case 1: // Form Elegante (Floating Label)
            bookingWrapper.innerHTML = `
                <div class="booking-card">
                    <h2>Prenota il tuo tavolo</h2>
                    <div class="field-elegant"><input type="text" placeholder=" "><label>Nome e Cognome</label></div>
                    <div class="field-row">
                        <div class="field-elegant"><input type="date" placeholder=" "><label>Data</label></div>
                        <div class="field-elegant"><input type="text" placeholder=" "><label>Persone</label></div>
                    </div>
                    <div class="field-elegant"><input type="email" placeholder=" "><label>Email</label></div>
                    <button class="btn-gold" style="width:100%;">Conferma Prenotazione</button>
                </div>
            `;
            anime.timeline()
                .add({ targets: '.booking-card', opacity: [0, 1], translateY: [20, 0], duration: 500, easing: 'easeOutQuad' })
                .add({ targets: '.field-elegant, .booking-card button', opacity: [0, 1], translateY: [15, 0], delay: anime.stagger(90), duration: 500, easing: 'easeOutQuad' }, '-=300');
            break;

        case 2: // Wizard Multi-Step
            bookingWrapper.innerHTML = `
                <div class="booking-card">
                    <h2>Prenota in 3 passi</h2>
                    <div class="wizard-progress">
                        <div class="wizard-progress-step"><div class="wizard-progress-fill" id="wp-1"></div></div>
                        <div class="wizard-progress-step"><div class="wizard-progress-fill" id="wp-2"></div></div>
                        <div class="wizard-progress-step"><div class="wizard-progress-fill" id="wp-3"></div></div>
                    </div>
                    <div class="wizard-panels" id="wizard-panels">
                        <div class="wizard-panel" data-step="1">
                            <p class="group-label" style="margin-bottom:12px;">Scegli l'orario</p>
                            <div class="wizard-options">
                                <div class="wizard-option" onclick="wizardSelect(this)">19:30</div>
                                <div class="wizard-option" onclick="wizardSelect(this)">20:30</div>
                                <div class="wizard-option" onclick="wizardSelect(this)">21:30</div>
                            </div>
                        </div>
                        <div class="wizard-panel" data-step="2" style="opacity:0; pointer-events:none;">
                            <p class="group-label" style="margin-bottom:12px;">Numero di persone</p>
                            <div class="wizard-options">
                                <div class="wizard-option" onclick="wizardSelect(this)">2 persone</div>
                                <div class="wizard-option" onclick="wizardSelect(this)">4 persone</div>
                                <div class="wizard-option" onclick="wizardSelect(this)">6+ persone</div>
                            </div>
                        </div>
                        <div class="wizard-panel" data-step="3" style="opacity:0; pointer-events:none;">
                            <p class="group-label" style="margin-bottom:12px;">I tuoi dati</p>
                            <div class="field-elegant"><input type="text" placeholder=" "><label>Nome e Cognome</label></div>
                            <div class="field-elegant"><input type="tel" placeholder=" "><label>Telefono</label></div>
                        </div>
                    </div>
                    <div class="wizard-nav">
                        <button class="btn-ghost" onclick="wizardNav(-1)">Indietro</button>
                        <button class="btn-gold" onclick="wizardNav(1)">Avanti</button>
                    </div>
                </div>
            `;
            window.wizardStep = 1;
            anime({ targets: '.booking-card', opacity: [0, 1], translateY: [20, 0], duration: 500, easing: 'easeOutQuad' });
            updateWizardProgress();
            break;

        case 3: { // Calendario Animato
            const dayLabels = ['L', 'M', 'M', 'G', 'V', 'S', 'D'];
            const totalDays = 30;
            let daysHtml = dayLabels.map(d => `<div class="calendar-day-label">${d}</div>`).join('');
            for (let d = 1; d <= totalDays; d++) {
                const disabled = d < 10;
                daysHtml += `<div class="calendar-day ${disabled ? 'disabled' : ''}" ${disabled ? '' : `onclick="selectCalendarDay(this, ${d})"`}>${d}</div>`;
            }
            bookingWrapper.innerHTML = `
                <div class="booking-card">
                    <h2>Scegli data e ora</h2>
                    <div class="calendar-grid">${daysHtml}</div>
                    <div class="time-slots" id="time-slots-box"></div>
                </div>
            `;
            anime.timeline()
                .add({ targets: '.booking-card', opacity: [0, 1], translateY: [20, 0], duration: 500, easing: 'easeOutQuad' })
                .add({ targets: '.calendar-day', scale: [0, 1], delay: anime.stagger(12, { grid: [7, 5], from: 'first' }), duration: 400, easing: 'easeOutBack' }, '-=250');
            break;
        }
        case 4: { // Conferma con Coriandoli
            bookingWrapper.innerHTML = `
                <div class="booking-card">
                    <div class="success-box" id="success-box">
                        <div class="success-check-circle">
                            <svg viewBox="0 0 24 24"><path d="M4 12l5 5L20 6"/></svg>
                        </div>
                        <h2 style="margin-bottom:8px;">Tavolo Confermato!</h2>
                        <p style="color:#a0aec0; font-size:0.9rem;">Ti aspettiamo Sabato alle 20:30 per 2 persone.</p>
                    </div>
                </div>
            `;
            anime.timeline()
                .add({ targets: '.success-check-circle', scale: [0, 1], opacity: [0, 1], duration: 500, easing: 'easeOutBack' })
                .add({ targets: '.success-check-circle path', strokeDashoffset: [40, 0], duration: 500, easing: 'easeOutQuad' }, '-=150')
                .add({ targets: '.success-box h2', opacity: [0, 1], translateY: [10, 0], duration: 400, easing: 'easeOutQuad' }, '-=100')
                .add({ targets: '.success-box p', opacity: [0, 1], duration: 400, easing: 'easeOutQuad' }, '-=200');

            const colors = ['var(--color-accent)', '#ff6b6b', '#4dd4ac', '#6ba8e5'];
            let confettiHtml = '';
            for (let i = 0; i < 26; i++) {
                confettiHtml += `<div class="confetti-piece" style="background:${colors[i % colors.length]};"></div>`;
            }
            document.getElementById('success-box').insertAdjacentHTML('beforeend', confettiHtml);
            anime({
                targets: '.confetti-piece',
                translateX: () => anime.random(-160, 160),
                translateY: () => anime.random(-160, 40),
                scale: [1, 0],
                rotate: () => anime.random(0, 360),
                opacity: [1, 0],
                duration: () => anime.random(800, 1300),
                delay: 400,
                easing: 'easeOutExpo'
            });
            break;
        }
    }
}

function wizardSelect(el) {
    el.parentElement.querySelectorAll('.wizard-option').forEach(o => o.classList.remove('selected'));
    el.classList.add('selected');
}

function updateWizardProgress() {
    for (let i = 1; i <= 3; i++) {
        const fill = document.getElementById('wp-' + i);
        if (!fill) continue;
        anime({ targets: fill, width: i <= window.wizardStep ? '100%' : '0%', duration: 400, easing: 'easeOutQuad' });
    }
}

function wizardNav(dir) {
    const panels = document.querySelectorAll('.wizard-panel');
    if (!panels.length) return;
    const current = panels[window.wizardStep - 1];
    const nextStep = Math.min(3, Math.max(1, window.wizardStep + dir));
    if (nextStep === window.wizardStep) return;
    const next = panels[nextStep - 1];

    anime({
        targets: current,
        opacity: [1, 0],
        translateX: dir > 0 ? [0, -30] : [0, 30],
        duration: 300,
        easing: 'easeInQuad',
        complete: () => { current.style.pointerEvents = 'none'; }
    });
    next.style.pointerEvents = 'auto';
    anime({
        targets: next,
        opacity: [0, 1],
        translateX: dir > 0 ? [30, 0] : [-30, 0],
        duration: 350,
        delay: 150,
        easing: 'easeOutQuad'
    });

    window.wizardStep = nextStep;
    updateWizardProgress();
}

function selectCalendarDay(el, day) {
    document.querySelectorAll('.calendar-day').forEach(d => d.classList.remove('selected'));
    el.classList.add('selected');
    const box = document.getElementById('time-slots-box');
    box.innerHTML = ['12:30', '13:00', '19:30', '20:00', '20:30', '21:30'].map(t =>
        `<div class="time-slot" onclick="selectTimeSlot(this)">${t}</div>`
    ).join('');
    anime({ targets: '#time-slots-box .time-slot', opacity: [0, 1], translateY: [10, 0], scale: [0.9, 1], delay: anime.stagger(50), duration: 400, easing: 'easeOutBack' });
}

function selectTimeSlot(el) {
    el.parentElement.querySelectorAll('.time-slot').forEach(t => t.classList.remove('selected'));
    el.classList.add('selected');
    anime({ targets: el, scale: [1.15, 1], duration: 300, easing: 'easeOutBack' });
}
