export const showPage = (pageId, loadHistoryCallback) => {
    // Cacher toutes les sections
    document.querySelectorAll('.page-section').forEach(section => {
        section.classList.add('d-none');
        section.classList.remove('active');
    });

    // Montrer la section cible
    const target = document.getElementById(`${pageId}-page`);
    if (target) {
        target.classList.remove('d-none');
        target.classList.add('active');
    }

    // Mettre à jour la barre de navigation
    document.querySelectorAll('.nav-link, .navbar-brand').forEach(link => {
        link.classList.remove('active');
        // Vérification simple basée sur l'attribut onclick ou href
        // Note: Dans la nouvelle version, on utilisera des écouteurs d'événements
        if (link.dataset.page === pageId) {
            link.classList.add('active');
        }
    });

    if (pageId === 'history' && loadHistoryCallback) {
        loadHistoryCallback();
    }
};

export const bindNavigation = (callback) => {
    document.querySelectorAll('[data-page]').forEach(element => {
        element.addEventListener('click', (e) => {
            e.preventDefault();
            const pageId = element.dataset.page;
            callback(pageId);
        });
    });
};
