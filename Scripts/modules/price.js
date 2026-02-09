import { CONFIG } from './config.js';

export const calculateTotal = (state) => {
    let total = 0;
    const { base, glacage, supplements } = state;

    if (base) total += CONFIG.PRICES.base[base] || 0;
    if (glacage) total += CONFIG.PRICES.glacage[glacage] || 0;
    if (supplements.creme) total += CONFIG.PRICES.supplement.creme;
    if (supplements.cerise) total += CONFIG.PRICES.supplement.cerise;

    return total;
};
