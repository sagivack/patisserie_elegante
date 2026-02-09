import { getState, updateState, updatePrice, resetState } from './modules/state.js';
import { calculateTotal } from './modules/price.js';
import { renderCake, renderOrderList } from './modules/render.js';
import { fetchOrders, createOrder, deleteOrder } from './modules/api.js';
import { showPage, bindNavigation } from './modules/ui.js';

// --- Gestion des Événements ---

const handleUpdate = () => {
    // Lire le DOM pour mettre à jour l'état
    const baseSelect = document.getElementById('base-select');
    const glacageSelect = document.getElementById('glacage-select');
    const checkCreme = document.getElementById('check-creme');
    const checkCerise = document.getElementById('check-cerise');

    // Nouveaux inputs
    const baseColorInput = document.getElementById('base-color');
    const formInputs = document.getElementsByName('forme');
    const textInput = document.getElementById('cake-text');
    const textColorInput = document.getElementById('text-color');
    const rotationSlider = document.getElementById('rotation-slider');

    let selectedForme = 'rond';
    for (let r of formInputs) { if (r.checked) selectedForme = r.value; }

    updateState('base', baseSelect.value);
    updateState('glacage', glacageSelect.value);
    updateState('forme', selectedForme);

    // Gestion couleur custom ou preset
    if (baseSelect.value === 'custom') {
        updateState('couleur', baseColorInput.value);
    } else {
        // Optionnel : mettre à jour l'input couleur pour refléter le preset
        // updateState('couleur', ...) géré par render ou config
    }

    updateState('texte', textInput.value);
    updateState('texteCouleur', textColorInput.value);
    updateState('rotation', rotationSlider.value);

    updateState('creme', checkCreme.checked);
    updateState('cerise', checkCerise.checked);

    const state = getState();
    const total = calculateTotal(state);
    updatePrice(total);

    // Mises à jour visuelles
    renderCake(state);
    document.getElementById('total-price').innerText = total;
};

const handleReset = () => {
    document.getElementById('cake-form').reset();
    document.getElementById('base-color').value = '#f3e5ab'; // Reset defaut
    resetState();
    handleUpdate();
};

const handleSubmit = async () => {
    const state = getState();
    const nom = document.getElementById('nom').value;
    const adresse = document.getElementById('adresse').value;

    if (!state.base || !nom || !adresse) {
        alert("Veuillez remplir tous les champs obligatoires (Base, Nom, Adresse).");
        return;
    }

    const order = {
        base: state.base,
        glacage: state.glacage || 'aucun',

        forme: state.forme,
        couleur: state.couleur,
        texte: state.texte,

        creme: state.supplements.creme ? 'oui' : 'non',
        cerise: state.supplements.cerise ? 'oui' : 'non',
        prix: state.totalPrice,
        nom: nom,
        adresse: adresse,
        date: new Date().toISOString()
    };

    await createOrder(order);
    alert("Commande envoyée avec succès !");
    handleReset();
    showPage('history', loadHistory);
};

const loadHistory = async () => {
    const list = document.getElementById('orders-list');
    list.innerHTML = '<div class="col-12 text-center"><div class="spinner-border" role="status"></div></div>';

    const orders = await fetchOrders();
    renderOrderList(orders);
};

const handleDelete = async (id) => {
    if (!confirm("Voulez-vous vraiment supprimer cette commande ?")) return;
    await deleteOrder(id);
    loadHistory();
};

// --- Initialisation ---

const init = () => {
    // Navigation
    bindNavigation((pageId) => {
        showPage(pageId, pageId === 'history' ? loadHistory : null);
    });

    // Formulaire
    const inputs = ['base-select', 'glacage-select', 'check-creme', 'check-cerise', 'base-color', 'cake-text', 'text-color', 'rotation-slider'];
    inputs.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            // Utiliser 'input' pour slider/color pour temps réel, 'change' pour le reste
            const eventType = (id.includes('color') || id.includes('slider') || id.includes('text')) ? 'input' : 'change';
            el.addEventListener(eventType, handleUpdate);
        }
    });

    document.querySelectorAll('input[name="forme"]').forEach(el => {
        el.addEventListener('change', handleUpdate);
    });

    document.querySelector('button[type="reset"]').addEventListener('click', (e) => {
        e.preventDefault();
        handleReset();
    });

    document.getElementById('btn-submit').addEventListener('click', (e) => {
        // Interception du clic car on va retirer le onclick du HTML
        e.preventDefault(); // Si c'était un submit classique
        e.stopImmediatePropagation(); // Pour éviter conflit si onclick reste
        handleSubmit();
    });

    // Exposition globale pour les éléments dynamiques (ex: bouton supprimer dans historique)
    window.appDeleteOrder = handleDelete;

    // État initial
    handleUpdate();
};

// Démarrer quand le DOM est prêt
document.addEventListener('DOMContentLoaded', init);
