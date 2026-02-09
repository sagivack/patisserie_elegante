import { CONFIG } from './config.js';

export const renderCake = (state) => {
    const visualContainer = document.getElementById('cake-visual');
    const stage = document.getElementById('cake-container');

    if (!visualContainer) return;

    if (stage) {
        stage.style.transform = `rotateX(50deg) rotateZ(${state.rotation}deg)`;
    }

    visualContainer.innerHTML = '';

    // --- COULEURS ---
    let baseColor = state.couleur;
    if (state.base && CONFIG.BASE_COLORS[state.base] && state.base !== 'custom') {
        baseColor = CONFIG.BASE_COLORS[state.base];
    }

    // Glaçage
    let icingColor = null;
    if (state.glacage && state.glacage !== 'aucun' && state.glacage !== '') {
        icingColor = CONFIG.BASE_COLORS[state.glacage] || '#ffffff';
    }

    const svgNS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("viewBox", "0 0 200 200");
    svg.classList.add("cake-svg-layer");
    svg.style.overflow = "visible";

    // --- DEFS (Filtres) ---
    const defs = document.createElementNS(svgNS, "defs");
    // Filtre Bruit
    const filterNoise = document.createElementNS(svgNS, "filter");
    filterNoise.setAttribute("id", "biscuitTexture");
    filterNoise.innerHTML = `<feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" result="noise"/><feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.3 0" in="noise" result="coloredNoise"/><feComposite operator="in" in="coloredNoise" in2="SourceGraphic" result="composite"/><feBlend mode="multiply" in="composite" in2="SourceGraphic"/>`;
    defs.appendChild(filterNoise);
    // Dégradé Ombre Côté
    const gradSide = document.createElementNS(svgNS, "linearGradient");
    gradSide.setAttribute("id", "gradSide");
    gradSide.innerHTML = `<stop offset="0%" stop-color="black" stop-opacity="0.3"/><stop offset="100%" stop-color="black" stop-opacity="0.1"/>`;
    defs.appendChild(gradSide);
    svg.appendChild(defs);

    // --- DESSIN DU GÂTEAU ---
    const gCake = document.createElementNS(svgNS, "g");

    const h = 40; // Hauteur
    const cx = 100;
    const cy = 100;

    // Chemins selon la forme
    let pathSideD = "";
    let pathTopD = "";
    let pathIcingD = "";

    if (state.forme === 'rond') {
        const r = 70;
        const ry = r * 0.4;

        // Côté bas
        pathSideD = `M ${cx - r} ${cy} A ${r} ${ry} 0 0 0 ${cx + r} ${cy} L ${cx + r} ${cy + h} A ${r} ${ry} 0 0 1 ${cx - r} ${cy + h} Z`;
        // Top
        pathTopD = `M ${cx - r} ${cy} A ${r} ${ry} 0 0 1 ${cx + r} ${cy} A ${r} ${ry} 0 0 1 ${cx - r} ${cy} Z`;

        if (icingColor) {
            pathIcingD = `M ${cx - r} ${cy} A ${r} ${ry} 0 0 1 ${cx + r} ${cy} A ${r} ${ry} 0 0 1 ${cx - r} ${cy}`;
            // Drips
            pathIcingD += ` L ${cx + r} ${cy + 10} Q ${cx + r * 0.8} ${cy + 20} ${cx + r * 0.6} ${cy + 5} Q ${cx + r * 0.4} ${cy + 25} ${cx + r * 0.2} ${cy + 8} Q ${cx} ${cy + 20} ${cx - r * 0.2} ${cy + 5} Q ${cx - r * 0.5} ${cy + 18} ${cx - r * 0.8} ${cy + 8} L ${cx - r} ${cy + 10} Z`;
        }

    } else if (state.forme === 'carre') {
        const s = 120; // Size
        const s2 = s / 2;
        // Face avant
        pathSideD = `M ${cx - s2} ${cy + s2 * 0.3} L ${cx + s2} ${cy + s2 * 0.3} L ${cx + s2} ${cy + s2 * 0.3 + h} L ${cx - s2} ${cy + s2 * 0.3 + h} Z`;
        // Dessus
        pathTopD = `M ${cx - s2} ${cy - s2 * 0.3} L ${cx + s2} ${cy - s2 * 0.3} L ${cx + s2} ${cy + s2 * 0.3} L ${cx - s2} ${cy + s2 * 0.3} Z`;

        if (icingColor) {
            pathIcingD = `M ${cx - s2} ${cy - s2 * 0.3} L ${cx + s2} ${cy - s2 * 0.3} L ${cx + s2} ${cy + s2 * 0.3} `;
            // Drips
            for (let i = 1; i <= 6; i++) {
                let x = cx + s2 - (s / 6) * i;
                let y = cy + s2 * 0.3;
                let dropH = (i % 2 === 0) ? 15 : 8;
                pathIcingD += `L ${x + (s / 12)} ${y + dropH} L ${x} ${y} `;
            }
            pathIcingD += `L ${cx - s2} ${cy + s2 * 0.3} Z`;
        }

    } else if (state.forme === 'rectangle') {
        const w = 140;
        const d = 80;
        const w2 = w / 2;
        const d2 = d / 2;

        pathSideD = `M ${cx - w2} ${cy + d2 * 0.4} L ${cx + w2} ${cy + d2 * 0.4} L ${cx + w2} ${cy + d2 * 0.4 + h} L ${cx - w2} ${cy + d2 * 0.4 + h} Z`;
        pathTopD = `M ${cx - w2} ${cy - d2 * 0.4} L ${cx + w2} ${cy - d2 * 0.4} L ${cx + w2} ${cy + d2 * 0.4} L ${cx - w2} ${cy + d2 * 0.4} Z`;

        if (icingColor) {
            pathIcingD = `M ${cx - w2} ${cy - d2 * 0.4} L ${cx + w2} ${cy - d2 * 0.4} L ${cx + w2} ${cy + d2 * 0.4} `;
            // Drips
            for (let i = 1; i <= 8; i++) {
                let x = cx + w2 - (w / 8) * i;
                let y = cy + d2 * 0.4;
                let dropH = (i % 2 !== 0) ? 12 : 5;
                pathIcingD += `L ${x + (w / 16)} ${y + dropH} L ${x} ${y} `;
            }
            pathIcingD += `L ${cx - w2} ${cy + d2 * 0.4} Z`;
        }

    } else if (state.forme === 'coeur') {
        // Forme Coeur
        const heartPath = `M 100 170 C 100 170 160 130 160 90 C 160 60 135 60 120 75 C 100 95 100 95 100 95 C 100 95 100 95 80 75 C 65 60 40 60 40 90 C 40 130 100 170 100 170 Z`;

        // Stack pour volume
        for (let i = h; i > 0; i -= 2) {
            const layer = document.createElementNS(svgNS, "path");
            layer.setAttribute("d", heartPath);
            layer.setAttribute("transform", `translate(0, ${i})`);
            layer.setAttribute("fill", baseColor);
            layer.setAttribute("filter", "brightness(0.8)");
            gCake.appendChild(layer);
        }

        pathTopD = heartPath;

        if (icingColor) {
            pathIcingD = heartPath;
        }
    }

    // --- RENDU DES COUCHES ---
    // 1. Côté
    if (state.forme !== 'coeur') {
        const sideEl = document.createElementNS(svgNS, "path");
        sideEl.setAttribute("d", pathSideD);
        sideEl.setAttribute("fill", baseColor);
        const sideShade = sideEl.cloneNode();
        sideShade.setAttribute("fill", "url(#gradSide)");
        gCake.appendChild(sideEl);
        gCake.appendChild(sideShade);
    }

    // 2. Dessus
    const topEl = document.createElementNS(svgNS, "path");
    topEl.setAttribute("d", pathTopD);
    topEl.setAttribute("fill", baseColor);
    const topTexture = topEl.cloneNode();
    topTexture.setAttribute("filter", "url(#biscuitTexture)");
    topTexture.setAttribute("opacity", "0.4");
    gCake.appendChild(topEl);
    gCake.appendChild(topTexture);

    // 3. Glaçage
    if (icingColor && pathIcingD) {
        const icingEl = document.createElementNS(svgNS, "path");
        icingEl.setAttribute("d", pathIcingD);
        icingEl.setAttribute("fill", icingColor);
        icingEl.setAttribute("opacity", "0.95");
        if (state.forme === 'coeur') {
            icingEl.setAttribute("transform", "scale(0.95) translate(2.5, 2.5)");
        }
        gCake.appendChild(icingEl);
    }

    svg.appendChild(gCake);

    // --- TEXTE ---
    if (state.texte) {
        const textEl = document.createElementNS(svgNS, "text");
        textEl.setAttribute("x", "100");
        let ty = (state.forme === 'coeur') ? 110 : 100;
        textEl.setAttribute("y", ty.toString());
        textEl.setAttribute("text-anchor", "middle");
        textEl.setAttribute("dominant-baseline", "middle");
        textEl.setAttribute("fill", state.texteCouleur);
        textEl.setAttribute("font-family", "'Brush Script MT', cursive");
        textEl.setAttribute("font-size", "16");
        textEl.setAttribute("font-weight", "bold");
        textEl.textContent = state.texte;
        svg.appendChild(textEl);
    }

    visualContainer.appendChild(svg);

    // --- TOPPINGS ---
    // --- TOPPINGS ---
    // Ajustement de la hauteur (Y translation) en fonction de la forme pour toucher le dessus
    // Le centre du gâteau est à CY=100. Le dessus est décalé visuellement.
    // Rond: Top ~100
    // Coeur: Top ~100 mais forme creuse en haut
    // Rectangle/Carré: Top ~80 (perspective)

    let topY = -60; // Défaut (Rond)
    if (state.forme === 'coeur') topY = -50;
    if (state.forme === 'rectangle' || state.forme === 'carre') topY = -70; // Plus plat

    if (state.supplements.creme) {
        const cremeImg = document.createElement('img');
        cremeImg.src = `${CONFIG.PATHS.IMAGES}creme_fouettee.png`;
        cremeImg.classList.add('creme-img');

        let yTrans = topY;
        // Si coeur, on veut peut-être être un peu plus bas pour pas flotter
        if (state.forme === 'coeur') yTrans = -45;

        // "Billboard" inversé
        cremeImg.style.transform = `translate(-50%, ${yTrans}%) rotateX(-50deg) scale(0.8)`;
        visualContainer.appendChild(cremeImg);
    }

    if (state.supplements.cerise) {
        const ceriseImg = document.createElement('img');
        ceriseImg.src = `${CONFIG.PATHS.IMAGES}cerise.png`;
        ceriseImg.classList.add('cerise-img');

        // La cerise se pose sur la crème ou sur le gâteau
        let yBase = topY;
        if (state.supplements.creme) {
            yBase = topY - 30; // Monte sur la crème
        } else {
            if (state.forme === 'coeur') yBase = -45; // Sur gâteau directement
            if (state.forme === 'rectangle' || state.forme === 'carre') yBase = -80; // Sur plat
        }

        ceriseImg.style.transform = `translate(-50%, ${yBase}%) rotateX(-50deg) scale(0.5)`;
        visualContainer.appendChild(ceriseImg);
    }
};

export const renderOrderList = (orders) => {
    const list = document.getElementById('orders-list');
    if (!list) return;

    list.innerHTML = '';
    if (orders.length === 0) {
        list.innerHTML = '<div class="col-12 text-center text-muted"><p>Aucune commande pour le moment.</p></div>';
        return;
    }

    orders.forEach(order => {
        const card = document.createElement('div');
        card.className = 'col-md-4 mb-4';
        card.innerHTML = `
            <div class="card h-100 shadow-sm border-0">
                <div class="card-header bg-transparent border-0 d-flex justify-content-between align-items-center">
                    <span class="badge bg-primary rounded-pill">#${order.id}</span>
                    <span class="text-muted small">${new Date(order.date).toLocaleDateString()}</span>
                </div>
                <div class="card-body">
                    <h5 class="card-title text-dark">
                        <span class="text-capitalize">${order.forme || 'Rond'}</span> 
                        ${order.base}
                    </h5>
                    <p class="card-text text-secondary small">
                        ${order.glacage && order.glacage !== 'aucun' ? `Glaçage: ${order.glacage}<br>` : ''}
                        ${order.texte ? `Message: "<strong>${order.texte}</strong>"<br>` : ''}
                    </p>
                    <div class="d-flex flex-wrap gap-1 mb-3">
                        ${order.creme === 'oui' ? '<span class="badge bg-light text-dark border">Crème</span>' : ''}
                        ${order.cerise === 'oui' ? '<span class="badge bg-danger text-white">Cerise</span>' : ''}
                    </div>
                    <h4 class="text-primary fw-bold">${order.prix} $</h4>
                </div>
                <div class="card-footer bg-white border-0 text-end">
                    <button class="btn btn-sm btn-outline-danger" onclick="window.appDeleteOrder(${order.id})">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </div>
            </div>
        `;
        list.appendChild(card);
    });
};
