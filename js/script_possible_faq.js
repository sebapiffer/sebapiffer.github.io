const faqWrapper = document.getElementById('faq-showcase-wrapper');

const faqData = [
    { cat: 'prenotazioni', q: "Posso prenotare per gruppi numerosi?", a: "Sì, per gruppi oltre le 8 persone contattaci telefonicamente per organizzare il tavolo ideale." },
    { cat: 'prenotazioni', q: "Quanto tempo prima devo prenotare nel weekend?", a: "Consigliamo di prenotare almeno 2-3 giorni prima per venerdì e sabato sera." },
    { cat: 'menu', q: "Il menù cambia con le stagioni?", a: "Sì, rinnoviamo la carta ogni stagione per usare ingredienti sempre freschi e locali." },
    { cat: 'menu', q: "Avete opzioni vegetariane e vegane?", a: "Certamente, ogni sezione del menù include alternative vegetariane e vegane." },
    { cat: 'allergie', q: "Gestite intolleranze e allergie alimentari?", a: "Sì, comunicacelo al momento della prenotazione e il nostro chef preparerà un piatto su misura." },
    { cat: 'eventi', q: "Organizzate eventi privati?", a: "Sì, il nostro spazio è disponibile per cene private, compleanni e piccoli eventi aziendali." }
];

function faqItemHtml(item, mode) {
    const handler = mode === 'single' ? 'toggleFaqItemSingle(this)' : 'toggleFaqItemMulti(this)';
    return `
        <div class="faq-item" data-cat="${item.cat}">
            <div class="faq-question" onclick="${handler}">
                <span>${item.q}</span>
                <span class="faq-icon">+</span>
            </div>
            <div class="faq-answer">${item.a}</div>
        </div>
    `;
}

function triggerFaqAnim(id) {
    anime.remove('#faq-showcase-wrapper *');
    faqWrapper.innerHTML = '';

    switch (id) {
        case 1: // Accordion Classico (uno alla volta)
            faqWrapper.innerHTML = `<div class="faq-list">${faqData.map(d => faqItemHtml(d, 'single')).join('')}</div>`;
            anime({ targets: '.faq-item', opacity: [0, 1], translateY: [15, 0], delay: anime.stagger(80), duration: 500, easing: 'easeOutQuad' });
            break;

        case 2: // Accordion Libero (più aperti, icone animate)
            faqWrapper.innerHTML = `<div class="faq-list">${faqData.map(d => faqItemHtml(d, 'multi')).join('')}</div>`;
            anime({ targets: '.faq-item', opacity: [0, 1], translateY: [15, 0], delay: anime.stagger(80), duration: 500, easing: 'easeOutQuad' });
            break;

        case 3: // Due Colonne Categorie (Tabs)
            faqWrapper.innerHTML = `
                <div class="faq-tabs">
                    <button class="faq-tab active" onclick="filterFaqByCategory('tutti', this)">Tutte</button>
                    <button class="faq-tab" onclick="filterFaqByCategory('prenotazioni', this)">Prenotazioni</button>
                    <button class="faq-tab" onclick="filterFaqByCategory('menu', this)">Menù</button>
                    <button class="faq-tab" onclick="filterFaqByCategory('allergie', this)">Allergie</button>
                    <button class="faq-tab" onclick="filterFaqByCategory('eventi', this)">Eventi</button>
                </div>
                <div class="faq-list">${faqData.map(d => faqItemHtml(d, 'multi')).join('')}</div>
            `;
            anime({ targets: '.faq-item', opacity: [0, 1], translateY: [15, 0], delay: anime.stagger(80), duration: 500, easing: 'easeOutQuad' });
            break;

        case 4: // Ricerca & Filtro
            faqWrapper.innerHTML = `
                <div class="faq-search-box">
                    <input type="text" placeholder="Cerca una domanda..." oninput="searchFaq(this.value)">
                </div>
                <div class="faq-list" id="faq-search-list">${faqData.map(d => faqItemHtml(d, 'multi')).join('')}</div>
                <p class="faq-no-results" id="faq-no-results">Nessuna domanda trovata, provare con altri termini.</p>
            `;
            anime({ targets: '.faq-item', opacity: [0, 1], translateY: [15, 0], delay: anime.stagger(80), duration: 500, easing: 'easeOutQuad' });
            break;
    }
}

function toggleFaqItemSingle(questionEl) {
    const item = questionEl.parentElement;
    item.parentElement.querySelectorAll('.faq-item.open').forEach(i => {
        if (i !== item) i.classList.remove('open');
    });
    item.classList.toggle('open');
}

function toggleFaqItemMulti(questionEl) {
    questionEl.parentElement.classList.toggle('open');
}

function filterFaqByCategory(cat, btnEl) {
    document.querySelectorAll('.faq-tab').forEach(b => b.classList.remove('active'));
    btnEl.classList.add('active');
    document.querySelectorAll('.faq-list .faq-item').forEach(item => {
        const match = (cat === 'tutti' || item.dataset.cat === cat);
        item.style.display = match ? '' : 'none';
    });
}

function searchFaq(query) {
    const q = query.trim().toLowerCase();
    const items = document.querySelectorAll('#faq-search-list .faq-item');
    let anyVisible = false;
    items.forEach(item => {
        const text = item.querySelector('.faq-question span').textContent.toLowerCase();
        const match = text.includes(q);
        item.style.display = match ? '' : 'none';
        if (match) anyVisible = true;
    });
    const noResults = document.getElementById('faq-no-results');
    if (noResults) noResults.style.display = anyVisible ? 'none' : 'block';
}
