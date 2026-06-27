const menuWrapper = document.getElementById('menu-showcase-wrapper');

// Database Mock Piatti (Struttura Dati Pulita)
const mockMenu = [
    { name: "Truffe & Gold Fries", price: "€9.00", desc: "Patate fresche tagliate a mano, olio al tartufo bianco d'Alba, parmigiano reggiano 36 mesi, scaglie d'oro edule." },
    { name: "Smoked Dark Cocktail", price: "€14.00", desc: "Bourbon affumicato al legno di ciliegio, vermouth rosso riserva, bitter al cioccolato fondente e scorza d'arancia caramellata." },
    { name: "Seared Salmon Tataki", price: "€18.00", desc: "Salmone scottato in crosta di sesamo nero, riduzione di salsa ponzu allo zenzero, gel di avocado e germogli d'acqua." }
];

function triggerMenuAnim(layoutId) {
    anime.remove('#menu-showcase-wrapper *'); // Svuota code di animazioni attive
    menuWrapper.innerHTML = ""; // Pulisce il contenitore prima del nuovo rendering

    switch(layoutId) {

        case 1: // 1. Accordion Cascata (Sleek Expand)
            menuWrapper.innerHTML = `
                <div class="menu-accordion-item">
                    <div class="accordion-header">Cocktails & Mixology</div>
                    <div class="accordion-content">${renderItemsHtml()}</div>
                </div>
                <div class="menu-accordion-item">
                    <div class="accordion-header">Special Bistrot Food</div>
                    <div class="accordion-content" style="opacity:0; height:0;"></div>
                </div>
            `;
            // Animazione smooth dell'apertura del primo tab accordion
            anime({
                targets: '.accordion-content',
                height: ['0px', 'auto'],
                opacity: [0, 1],
                duration: 800,
                easing: 'easeOutCubic'
            });
            break;

        case 2: // 2. Grid Stagger Cards (Pop In)
            menuWrapper.innerHTML = `
                <div class="menu-grid">
                    <div class="menu-card">${renderSingleItem(0)}</div>
                    <div class="menu-card">${renderSingleItem(1)}</div>
                    <div class="menu-card">${renderSingleItem(2)}</div>
                    <div class="menu-card">${renderSingleItem(0)}</div>
                </div>
            `;
            // Ingresso a griglia stagger stile Animmaster Lib
            anime({
                targets: '.menu-card',
                opacity: [0, 1],
                scale: [0.85, 1],
                translateY: [20, 0],
                delay: anime.stagger(100),
                duration: 600,
                easing: 'easeOutBack'
            });
            break;

        case 3: // 3. Side Overlay Sheet
            menuWrapper.innerHTML = `
                <div class="menu-sheet-trigger-list">
                    <p style="color:#718096; margin-bottom:10px;">Clicca la categoria per aprire il pannello laterale</p>
                    <div class="sheet-btn" onclick="openSheet()">Apri Menù Drink</div>
                </div>
                <div class="menu-panel-sheet" style="transform: translateX(100%);">
                    <h2 style="font-family:var(--font-display); color:var(--color-accent); margin-bottom:30px;">Premium Drinks</h2>
                    ${renderItemsHtml()}
                    <button onclick="closeSheet()" style="margin-top:40px; background:none; border:1px solid #4a5568; color:#fff; padding:8px 20px; border-radius:4px; cursor:pointer;">Chiudi</button>
                </div>
            `;
            break;

        case 4: // 4. Tab Cinematic Focus (Blur Swapping)
            menuWrapper.innerHTML = `
                <div class="menu-tabs-nav">
                    <span class="tab-nav-item active">Drink</span>
                    <span class="tab-nav-item">Food</span>
                    <span class="tab-nav-item">Wine</span>
                </div>
                <div class="tab-items-box">
                    ${renderItemsHtml()}
                </div>
            `;
            anime({
                targets: '.tab-items-box',
                opacity: [0, 1],
                filter: ['blur(8px)', 'blur(0px)'],
                duration: 700,
                easing: 'easeOutQuad'
            });
            break;

        case 5: // 5. Minimal List Reveal (Slide-Left)
            menuWrapper.innerHTML = `
                <div class="minimal-list-row">${renderSingleItem(0)}</div>
                <div class="minimal-list-row">${renderSingleItem(1)}</div>
                <div class="minimal-list-row">${renderSingleItem(2)}</div>
            `;
            anime({
                targets: '.minimal-list-row',
                opacity: [0, 1],
                translateX: [40, 0],
                delay: anime.stagger(80),
                duration: 650,
                easing: 'easeOutQuad'
            });
            break;

        case 7: // 7. Editorial Magazine (Split Panel)
            menuWrapper.innerHTML = `
                <div class="magazine-container">
                    <div class="magazine-left">
                        <h2 style="font-family:var(--font-display); font-size:3rem; color:var(--color-accent);">IL<br>MENÙ</h2>
                        <p style="color:#718096; font-size:0.9rem; margin-top:10px;">Selezionato con cura, rinnovato ogni stagione.</p>
                    </div>
                    <div class="magazine-right">
                        ${renderItemsHtml()}
                    </div>
                </div>
            `;
            anime({
                targets: '.magazine-left',
                translateX: [-50, 0],
                opacity: [0, 1],
                duration: 900,
                easing: 'easeOutExpo'
            });
            anime({
                targets: '.magazine-right .dish-header, .magazine-right .dish-desc',
                opacity: [0, 1],
                translateY: [15, 0],
                delay: anime.stagger(60),
                duration: 800,
                easing: 'easeOutQuad'
            }, '-=600');
            break;

        case 8: // 8. Prospettiva 3D (Origami Unfold)
            menuWrapper.innerHTML = `
                <div class="perspective-container">
                    <div class="menu-3d-card">
                        <h2>Tavola d'Onore</h2>
                        ${render3DItems()}
                    </div>
                </div>
            `;
            // Il pannello "si apre" dall'alto come un foglio origami, poi i piatti
            // emergono in profondità 3D uno dopo l'altro
            anime.timeline()
                .add({
                    targets: '.menu-3d-card',
                    rotateX: [-100, 0],
                    opacity: [0, 1],
                    duration: 1000,
                    easing: 'easeOutExpo'
                })
                .add({
                    targets: '.menu-3d-item',
                    opacity: [0, 1],
                    translateZ: [-40, 15],
                    translateY: [20, 0],
                    delay: anime.stagger(120),
                    duration: 700,
                    easing: 'easeOutQuad'
                }, '-=500');
            break;

        case 9: // 9. Bento Grid Asimmetrico (Mosaic Reveal)
            menuWrapper.innerHTML = `
                <div class="bento-grid">
                    <div class="bento-item bento-large">${renderSingleItem(0)}</div>
                    <div class="bento-item bento-small">${renderSingleItem(1)}</div>
                    <div class="bento-item bento-small">${renderSingleItem(2)}</div>
                    <div class="bento-item bento-wide">${renderSingleItem(0)}</div>
                </div>
            `;
            anime({
                targets: '.bento-item',
                opacity: [0, 1],
                scale: [0.75, 1],
                translateY: [25, 0],
                rotate: () => anime.random(-2, 2),
                delay: anime.stagger(110),
                duration: 700,
                easing: 'easeOutBack'
            });
            break;
    }
}

// Caso 6 gestito separatamente per preservare lo scope logico dell'effetto neon flicker
function thoughtfulMenuAnim(id) {
    if(id !== 6) return;
    anime.remove('#menu-showcase-wrapper *');
    menuWrapper.innerHTML = `
        <div class="neon-menu-box" style="opacity:0;">
            <h2 class="neon-text-title">SPECIALE DEL MESE</h2>
            ${renderItemsHtml()}
        </div>
    `;
    anime({
        targets: '.neon-menu-box',
        opacity: [0, 1, 0.3, 1, 0.5, 1],
        scale: [0.97, 1],
        duration: 900,
        easing: 'linear'
    });
}

// HELPER FUNCTIONS DI RENDERING VELOCE INTERNO
function renderSingleItem(index) {
    const item = mockMenu[index];
    return `
        <div class="dish-header">
            <span class="dish-name">${item.name}</span>
            <span class="dish-price">${item.price}</span>
        </div>
        <p class="dish-desc">${item.desc}</p>
    `;
}

function renderItemsHtml() {
    return mockMenu.map((_, i) => `<div style="margin-bottom:15px;">${renderSingleItem(i)}</div>`).join('');
}

// Render piatti come "card" 3D singole, usato dal layout 8 (Origami Unfold)
function render3DItems() {
    return mockMenu.map((_, i) => `<div class="menu-3d-item">${renderSingleItem(i)}</div>`).join('');
}

// TRIGGER INTERNI PER IL MODULO 3 (SHEET COMPONENT)
function openSheet() {
    anime({ targets: '.menu-panel-sheet', translateX: ['100%', '0%'], duration: 600, easing: 'easeOutExpo' });
}
function closeSheet() {
    anime({ targets: '.menu-panel-sheet', translateX: ['0%', '100%'], duration: 500, easing: 'easeInSine' });
}