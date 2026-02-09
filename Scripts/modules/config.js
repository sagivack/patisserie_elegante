export const CONFIG = {
    PRICES: {
        base: { vanille: 10, chocolat: 11 },
        glacage: { vanille: 3, chocolat: 3, fraise: 3 },
        supplement: { creme: 2, cerise: 1 }
    },
    PATHS: {
        IMAGES: 'Images/'
    },
    API_URL: 'http://localhost:3000',
    SHAPES: {
        rond: 'ellipse',
        carre: 'rect'
    },
    // Couleurs par défaut pour les bases prédéfinies (fallback)
    BASE_COLORS: {
        vanille: '#f3e5ab',
        chocolat: '#795548',
        fraise: '#ff80ab'
    }
};
