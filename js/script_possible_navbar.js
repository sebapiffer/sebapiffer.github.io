const navbarWrapper = document.getElementById('navbar-showcase-wrapper');

function triggerNavbarAnim(id) {
    anime.remove('#navbar-showcase-wrapper *');
    navbarWrapper.innerHTML = '';

    switch (id) {
        case 1: // Classic Sticky (Shrink on Scroll)
            navbarWrapper.innerHTML = `
                <div class="navbar-demo-page">
                    <div class="navbar-bar" id="navbar-bar-1">
                        <span class="navbar-logo brand-name-slot brand-caps">${window.siteState.brandName}</span>
                        <div class="navbar-links">
                            <a>Menù</a><a>Galleria</a><a>Storia</a><a>Contatti</a>
                        </div>
                        <button class="navbar-cta-mini">Prenota</button>
                    </div>
                    <button class="btn-ghost" style="position:absolute; bottom:60px; left:50%; transform:translateX(-50%);" onclick="toggleNavbarScrolled()">Simula Scroll</button>
                    <p class="navbar-helper-text">Premi il bottone per vedere la navbar restringersi sullo scroll</p>
                </div>
            `;
            anime({ targets: '.navbar-bar', opacity: [0, 1], translateY: [-15, 0], duration: 500, easing: 'easeOutQuad' });
            break;

        case 2: // Mega Menu Dropdown
            navbarWrapper.innerHTML = `
                <div class="navbar-demo-page">
                    <div class="navbar-bar">
                        <span class="navbar-logo brand-name-slot brand-caps">${window.siteState.brandName}</span>
                        <div class="navbar-links">
                            <span class="navbar-link-item" onclick="toggleMegaMenu()">Menù ▾</span><a>Storia</a><a>Contatti</a>
                        </div>
                        <button class="navbar-cta-mini">Prenota</button>
                    </div>
                    <div class="navbar-megamenu" id="navbar-megamenu">
                        <div class="megamenu-card"><strong>Antipasti</strong><span>Stuzzichini e crudi</span></div>
                        <div class="megamenu-card"><strong>Primi</strong><span>Pasta e risotti</span></div>
                        <div class="megamenu-card"><strong>Secondi</strong><span>Carne e pesce</span></div>
                        <div class="megamenu-card"><strong>Cocktail</strong><span>Selezione del bar</span></div>
                    </div>
                </div>
            `;
            anime({ targets: '.navbar-bar', opacity: [0, 1], translateY: [-15, 0], duration: 500, easing: 'easeOutQuad' });
            break;

        case 3: // Hamburger Fullscreen Overlay
            navbarWrapper.innerHTML = `
                <div class="navbar-demo-page">
                    <div class="navbar-bar">
                        <span class="navbar-logo brand-name-slot brand-caps">${window.siteState.brandName}</span>
                        <div class="navbar-hamburger" onclick="toggleHamburgerMenu()">
                            <span style="top:0;"></span><span style="top:9px;"></span><span style="top:18px;"></span>
                        </div>
                    </div>
                    <div class="navbar-fullscreen-overlay" id="navbar-fullscreen">
                        <button class="navbar-fullscreen-close" onclick="toggleHamburgerMenu()">&times;</button>
                        <span class="navbar-fullscreen-link">Home</span>
                        <span class="navbar-fullscreen-link">Menù</span>
                        <span class="navbar-fullscreen-link">Galleria</span>
                        <span class="navbar-fullscreen-link">Contatti</span>
                    </div>
                </div>
            `;
            anime({ targets: '.navbar-bar', opacity: [0, 1], translateY: [-15, 0], duration: 500, easing: 'easeOutQuad' });
            break;

        case 4: // Pill Floating Navigation
            navbarWrapper.innerHTML = `
                <div class="navbar-demo-page">
                    <div class="navbar-pill-wrap" id="navbar-pill-wrap">
                        <div class="navbar-pill-indicator" id="navbar-pill-indicator"></div>
                        <div class="navbar-pill-link active" onclick="movePillIndicator(this)">Home</div>
                        <div class="navbar-pill-link" onclick="movePillIndicator(this)">Menù</div>
                        <div class="navbar-pill-link" onclick="movePillIndicator(this)">Storia</div>
                        <div class="navbar-pill-link" onclick="movePillIndicator(this)">Contatti</div>
                    </div>
                </div>
            `;
            anime({ targets: '.navbar-pill-wrap', opacity: [0, 1], translateY: [-15, 0], duration: 500, easing: 'easeOutQuad' });
            setTimeout(() => {
                const first = document.querySelector('.navbar-pill-link.active');
                if (first) positionPillIndicator(first, false);
            }, 520);
            break;
    }
}

function toggleNavbarScrolled() {
    const bar = document.getElementById('navbar-bar-1');
    if (!bar) return;
    bar.classList.toggle('scrolled');
}

function toggleMegaMenu() {
    const menu = document.getElementById('navbar-megamenu');
    if (!menu) return;
    const isOpen = menu.classList.contains('open');
    if (isOpen) {
        anime({ targets: menu, opacity: [1, 0], translateY: [0, -10], duration: 250, easing: 'easeInQuad', complete: () => menu.classList.remove('open') });
    } else {
        menu.classList.add('open');
        anime({ targets: menu, opacity: [0, 1], translateY: [-10, 0], duration: 350, easing: 'easeOutQuad' });
        anime({ targets: '#navbar-megamenu .megamenu-card', opacity: [0, 1], translateY: [10, 0], delay: anime.stagger(70, { start: 100 }), duration: 350, easing: 'easeOutQuad' });
    }
}

function toggleHamburgerMenu() {
    const overlay = document.getElementById('navbar-fullscreen');
    if (!overlay) return;
    const isOpen = overlay.classList.contains('open');
    if (isOpen) {
        anime({ targets: overlay, opacity: [1, 0], duration: 300, easing: 'easeInQuad', complete: () => overlay.classList.remove('open') });
    } else {
        overlay.classList.add('open');
        anime({ targets: overlay, opacity: [0, 1], duration: 300, easing: 'easeOutQuad' });
        anime({ targets: '.navbar-fullscreen-link', opacity: [0, 1], translateY: [20, 0], delay: anime.stagger(90, { start: 150 }), duration: 500, easing: 'easeOutQuad' });
    }
}

function positionPillIndicator(linkEl, animate) {
    const wrap = document.getElementById('navbar-pill-wrap');
    const indicator = document.getElementById('navbar-pill-indicator');
    if (!wrap || !indicator || !linkEl) return;
    const wrapRect = wrap.getBoundingClientRect();
    const linkRect = linkEl.getBoundingClientRect();
    const left = linkRect.left - wrapRect.left;
    const width = linkRect.width;
    if (animate) {
        anime({ targets: indicator, left: left, width: width, duration: 350, easing: 'easeOutQuad' });
    } else {
        indicator.style.left = left + 'px';
        indicator.style.width = width + 'px';
    }
}

function movePillIndicator(linkEl) {
    document.querySelectorAll('.navbar-pill-link').forEach(l => l.classList.remove('active'));
    linkEl.classList.add('active');
    positionPillIndicator(linkEl, true);
}
