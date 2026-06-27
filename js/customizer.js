// =====================================================================
// PERSONALIZZAZIONE LOCALE — nome, slogan, font e colore accento
// Applica le modifiche live su tutto il sito tramite CSS custom properties
// =====================================================================

window.siteState = {
    brandName: 'The Lounge',
    tagline: 'Bistrot & Cocktail Bar'
};

// ---------------------------------------------------------------------
// NOME DEL LOCALE / SLOGAN
// ---------------------------------------------------------------------
function slugify(str) {
    return str
        .toLowerCase()
        .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '')
        .slice(0, 20) || 'illocale';
}

function getInitials(name) {
    const initials = name.trim().split(/\s+/).map(w => w[0]).join('').slice(0, 2).toUpperCase();
    return initials || 'TL';
}

function isModuleVisible(moduleName) {
    const viewport = document.getElementById('viewport-' + moduleName);
    return !!viewport && !viewport.classList.contains('hidden');
}

function updateBrandName(value) {
    const name = value.trim() || 'The Lounge';
    window.siteState.brandName = name;

    document.querySelectorAll('.brand-name-slot').forEach(el => { el.textContent = name; });
    document.querySelectorAll('.brand-email-slot').forEach(el => { el.textContent = 'info@' + slugify(name) + '.it'; });
    document.querySelectorAll('.brand-initials-slot').forEach(el => { el.textContent = getInitials(name); });

    // Se il modulo Logo/Titolo è attualmente in vista, ri-genera l'animazione
    // con il nuovo testo mantenendo lo stile correntemente selezionato
    if (isModuleVisible('title') && typeof triggerTitleAnim === 'function') {
        triggerTitleAnim(window.currentTitleVariant || 1);
    }
}

function updateTagline(value) {
    const tagline = value.trim() || 'Bistrot & Cocktail Bar';
    window.siteState.tagline = tagline;

    document.querySelectorAll('.tagline-name-slot').forEach(el => { el.textContent = tagline; });

    if (isModuleVisible('title') && typeof triggerTitleAnim === 'function') {
        triggerTitleAnim(window.currentTitleVariant || 1);
    }
}

// ---------------------------------------------------------------------
// FONT DEL SITO — coppie curate (titolo + testo) con relativo Google Font
// ---------------------------------------------------------------------
const fontPairings = {
    elegante: {
        display: "'Playfair Display', serif",
        body: "'Montserrat', sans-serif",
        url: null // già caricato di default
    },
    minimal: {
        display: "'Poppins', sans-serif",
        body: "'Inter', sans-serif",
        url: "https://fonts.googleapis.com/css2?family=Poppins:wght@500;600;700&family=Inter:wght@300;400;500;600&display=swap"
    },
    boutique: {
        display: "'Cormorant Garamond', serif",
        body: "'Lato', sans-serif",
        url: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;1,500&family=Lato:wght@300;400;700&display=swap"
    },
    bold: {
        display: "'Fraunces', serif",
        body: "'Work Sans', sans-serif",
        url: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,700&family=Work+Sans:wght@300;400;500;600&display=swap"
    },
    artigianale: {
        display: "'Abril Fatface', serif",
        body: "'Nunito Sans', sans-serif",
        url: "https://fonts.googleapis.com/css2?family=Abril+Fatface&family=Nunito+Sans:wght@300;400;600;700&display=swap"
    }
};
const loadedFontUrls = new Set();

function applyFontPairing(key) {
    const pairing = fontPairings[key];
    if (!pairing) return;

    if (pairing.url && !loadedFontUrls.has(pairing.url)) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = pairing.url;
        document.head.appendChild(link);
        loadedFontUrls.add(pairing.url);
    }

    document.documentElement.style.setProperty('--font-display', pairing.display);
    document.documentElement.style.setProperty('--font-body', pairing.body);
}

// ---------------------------------------------------------------------
// COLORE ACCENTO — palette curate + selettore colore libero
// ---------------------------------------------------------------------
function hexToRgb(hex) {
    const clean = hex.replace('#', '');
    const full = clean.length === 3 ? clean.split('').map(c => c + c).join('') : clean;
    const bigint = parseInt(full, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `${r}, ${g}, ${b}`;
}

function getAccentRGB() {
    const value = getComputedStyle(document.documentElement).getPropertyValue('--color-accent-rgb').trim();
    return value || '229, 192, 123';
}

function applyAccentColor(hex, swatchEl) {
    document.documentElement.style.setProperty('--color-accent', hex);
    document.documentElement.style.setProperty('--color-accent-rgb', hexToRgb(hex));

    document.querySelectorAll('.swatch').forEach(s => s.classList.remove('active'));
    if (swatchEl) swatchEl.classList.add('active');

    const colorInput = document.getElementById('customizer-color-input');
    if (colorInput) colorInput.value = hex;
}
