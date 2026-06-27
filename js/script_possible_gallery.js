const galleryWrapper = document.getElementById('gallery-showcase-wrapper');

const galleryItems = [
    { label: "Tagliata al Rosmarino", cat: "piatti", tile: "tile-amber" },
    { label: "Negroni Affumicato", cat: "drink", tile: "tile-wine" },
    { label: "Sala Principale", cat: "ambiente", tile: "tile-charcoal" },
    { label: "Risotto allo Zafferano", cat: "piatti", tile: "tile-olive" },
    { label: "Banco Bar", cat: "ambiente", tile: "tile-espresso" },
    { label: "Tiramisù della Casa", cat: "piatti", tile: "tile-gold" },
    { label: "Old Fashioned Riserva", cat: "drink", tile: "tile-wine" },
    { label: "Dehors Serale", cat: "ambiente", tile: "tile-charcoal" }
];

function galleryTileHtml(item, idx, clickable) {
    const onclickAttr = clickable ? ` onclick="openGalleryLightbox(${idx})"` : '';
    return `<div class="gallery-tile ${item.tile}" data-cat="${item.cat}"${onclickAttr}>
        <span class="gallery-tile-label">${item.label}</span>
    </div>`;
}

function triggerGalleryAnim(id) {
    anime.remove('#gallery-showcase-wrapper *');
    galleryWrapper.innerHTML = '';

    switch (id) {
        case 1: { // Masonry + Lightbox
            const tilesHtml = galleryItems.slice(0, 6).map((it, i) => galleryTileHtml(it, i, true)).join('');
            galleryWrapper.innerHTML = `<div class="gallery-masonry">${tilesHtml}</div>`;
            anime({
                targets: '.gallery-masonry .gallery-tile',
                opacity: [0, 1],
                scale: [0.85, 1],
                delay: anime.stagger(90),
                duration: 600,
                easing: 'easeOutBack'
            });
            break;
        }
        case 2: // Carosello 3D (Coverflow)
            galleryWrapper.innerHTML = `
                <div class="gallery-coverflow-stage" id="coverflow-stage"></div>
                <div class="gallery-coverflow-nav">
                    <button class="nav-arrow-btn" onclick="coverflowMove(-1)">&#8592;</button>
                    <button class="nav-arrow-btn" onclick="coverflowMove(1)">&#8594;</button>
                </div>
            `;
            window.coverflowIndex = 0;
            renderCoverflow();
            break;

        case 3: { // Filmstrip Infinito (Marquee)
            const loopItems = [...galleryItems, ...galleryItems];
            const tilesHtml = loopItems.map((it, i) => galleryTileHtml(it, i, false)).join('');
            galleryWrapper.innerHTML = `
                <div class="gallery-marquee-viewport">
                    <div class="gallery-marquee-track" id="marquee-track">${tilesHtml}</div>
                </div>
            `;
            anime({
                targets: '#marquee-track',
                translateX: ['0%', '-50%'],
                duration: 18000,
                easing: 'linear',
                loop: true
            });
            break;
        }
        case 4: { // Griglia con Filtro Categoria
            const tilesHtml = galleryItems.map((it, i) => galleryTileHtml(it, i, false)).join('');
            galleryWrapper.innerHTML = `
                <div class="gallery-filter-bar">
                    <button class="filter-pill active" onclick="filterGallery('tutti', this)">Tutti</button>
                    <button class="filter-pill" onclick="filterGallery('piatti', this)">Piatti</button>
                    <button class="filter-pill" onclick="filterGallery('drink', this)">Drink</button>
                    <button class="filter-pill" onclick="filterGallery('ambiente', this)">Ambiente</button>
                </div>
                <div class="gallery-filter-grid">${tilesHtml}</div>
            `;
            anime({
                targets: '.gallery-filter-grid .gallery-tile',
                opacity: [0, 1],
                translateY: [20, 0],
                delay: anime.stagger(70),
                duration: 550,
                easing: 'easeOutQuad'
            });
            break;
        }
    }
}

function openGalleryLightbox(idx) {
    const item = galleryItems[idx];
    const overlay = document.createElement('div');
    overlay.className = 'gallery-lightbox-backdrop';
    overlay.style.opacity = 0;
    overlay.innerHTML = `
        <div class="gallery-lightbox-tile ${item.tile}">
            <button class="gallery-lightbox-close" onclick="closeGalleryLightbox()">&times;</button>
            <span class="gallery-tile-label" style="font-size:1.1rem;">${item.label}</span>
        </div>
    `;
    galleryWrapper.appendChild(overlay);
    anime({ targets: overlay, opacity: [0, 1], duration: 300, easing: 'easeOutQuad' });
    anime({ targets: '.gallery-lightbox-tile', scale: [0.7, 1], duration: 400, easing: 'easeOutBack' });
}

function closeGalleryLightbox() {
    const overlay = document.querySelector('.gallery-lightbox-backdrop');
    if (!overlay) return;
    anime({ targets: overlay, opacity: [1, 0], duration: 250, easing: 'easeInQuad', complete: () => overlay.remove() });
}

function renderCoverflow() {
    const stage = document.getElementById('coverflow-stage');
    if (!stage) return;
    stage.innerHTML = galleryItems.map((it, i) =>
        `<div class="coverflow-tile gallery-tile ${it.tile}" data-i="${i}"><span class="gallery-tile-label">${it.label}</span></div>`
    ).join('');
    updateCoverflowTransforms();
}

function updateCoverflowTransforms() {
    const total = galleryItems.length;
    document.querySelectorAll('.coverflow-tile').forEach((tile, i) => {
        let offset = i - window.coverflowIndex;
        if (offset > total / 2) offset -= total;
        if (offset < -total / 2) offset += total;
        const tx = offset * 180;
        const rotY = offset * -35;
        const scale = offset === 0 ? 1 : 0.75;
        const tz = -Math.abs(offset) * 100;
        const opacity = Math.abs(offset) > 2 ? 0 : 1;
        tile.style.zIndex = 10 - Math.abs(offset);
        anime({
            targets: tile,
            translateX: tx,
            translateZ: tz,
            rotateY: rotY,
            scale: scale,
            opacity: opacity,
            duration: 500,
            easing: 'easeOutQuad'
        });
    });
}

function coverflowMove(dir) {
    const total = galleryItems.length;
    window.coverflowIndex = (window.coverflowIndex + dir + total) % total;
    updateCoverflowTransforms();
}

function filterGallery(cat, btnEl) {
    document.querySelectorAll('.filter-pill').forEach(b => b.classList.remove('active'));
    btnEl.classList.add('active');
    document.querySelectorAll('.gallery-filter-grid .gallery-tile').forEach(tile => {
        const match = (cat === 'tutti' || tile.dataset.cat === cat);
        if (match) tile.style.display = '';
        anime({
            targets: tile,
            opacity: match ? [0.2, 1] : [1, 0],
            scale: match ? [0.9, 1] : [1, 0.85],
            duration: 350,
            easing: 'easeOutQuad',
            complete: () => { if (!match) tile.style.display = 'none'; }
        });
    });
}
