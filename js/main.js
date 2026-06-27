// =====================================================================
// MOTORE PRINCIPALE — gestisce il passaggio tra le sezioni del sito
// =====================================================================

// Mappa modulo -> funzione che fa partire l'animazione di default (1)
const moduleConfig = {
    preloader: () => triggerPreloaderAnim(1),
    navbar:    () => triggerNavbarAnim(1),
    title:     () => triggerTitleAnim(1),
    hero:      () => triggerHeroAnim(1),
    menu:      () => triggerMenuAnim(1),
    chef:      () => triggerChefAnim(1),
    gallery:   () => triggerGalleryAnim(1),
    about:     () => triggerAboutAnim(1),
    events:    () => triggerEventsAnim(1),
    booking:   () => triggerBookingAnim(1),
    reviews:   () => triggerReviewsAnim(1),
    faq:       () => triggerFaqAnim(1),
    contact:   () => triggerContactAnim(1)
};

// Ferma tutte le animazioni "loop: true" che potrebbero essere rimaste
// attive in background quando si abbandona un modulo senza richiamare
// la sua funzione di trigger (es. saltando direttamente da Hero a Galleria).
function stopAllLoopingAnimations() {
    anime.remove(
        '.hero-bg, #hero-cta, .particle, .aurora-bg, ' +
        '.gallery-marquee-track, .reviews-marquee-track, ' +
        '.map-pulse, .status-dot, .about-layer-glow, .about-quote-cursor, ' +
        '.preloader-steam'
    );
    if (window.eventsCountdownInterval) clearInterval(window.eventsCountdownInterval);
}

// Funzione di switch macroscopico tra le sezioni del sito
function switchModule(moduleName) {
    stopAllLoopingAnimations();

    // Gestione pulsanti attivi della Sidebar
    document.querySelectorAll('.macro-btn').forEach(btn => btn.classList.remove('active'));
    // Gestione gruppi di controllo visibili
    document.querySelectorAll('.controls-group').forEach(group => group.classList.add('hidden'));
    // Gestione viewport visibili
    document.querySelectorAll('.view-container').forEach(view => view.classList.add('hidden'));

    document.getElementById('tab-btn-' + moduleName).classList.add('active');
    document.getElementById('controls-' + moduleName).classList.remove('hidden');
    document.getElementById('viewport-' + moduleName).classList.remove('hidden');

    if (moduleConfig[moduleName]) {
        moduleConfig[moduleName](); // Fa partire l'animazione di default del modulo
    }
}

// Inizializzazione automatica all'avvio della pagina
window.onload = () => {
    switchModule('preloader');
};
