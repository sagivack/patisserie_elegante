// État initial
const initialState = {
    base: 'vanille', // Défaut
    glacage: null,
    forme: 'rond',
    couleur: '#f3e5ab', // Vanille défaut
    texte: '',
    texteCouleur: '#000000',
    rotation: 0,
    supplements: {
        creme: false,
        cerise: false
    },
    totalPrice: 0
};

// État courant (clonage pour éviter les mutations directes accidentelles)
let currentState = { ...initialState, supplements: { ...initialState.supplements } };

export const getState = () => currentState;

export const updateState = (key, value) => {
    if (key === 'creme' || key === 'cerise') {
        currentState.supplements[key] = value;
    } else {
        currentState[key] = value;
    }
};

export const updatePrice = (price) => {
    currentState.totalPrice = price;
};

export const resetState = () => {
    currentState = {
        base: 'vanille',
        glacage: null,
        forme: 'rond',
        couleur: '#f3e5ab',
        texte: '',
        texteCouleur: '#000000',
        rotation: 0,
        supplements: {
            creme: false,
            cerise: false
        },
        totalPrice: 0
    };
};
