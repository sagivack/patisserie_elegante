import { CONFIG } from './config.js';

export const fetchOrders = async () => {
    try {
        const response = await fetch(`${CONFIG.API_URL}/commandes`);
        if (response.ok) {
            return await response.json();
        } else {
            throw new Error("Erreur serveur");
        }
    } catch (e) {
        console.warn("Utilisation de LocalStorage pour l'historique");
        return JSON.parse(localStorage.getItem('orders') || '[]');
    }
};

export const createOrder = async (order) => {
    try {
        const response = await fetch(`${CONFIG.API_URL}/commande`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(order)
        });

        if (response.ok) {
            return true;
        } else {
            console.warn("Serveur non joignable, sauvegarde locale.");
            saveLocalOrder(order);
            return true; // Considéré comme succès en mode dégradé
        }
    } catch (e) {
        console.warn("Serveur non joignable, erreur:", e);
        saveLocalOrder(order);
        return true;
    }
};

export const deleteOrder = async (id) => {
    try {
        const response = await fetch(`${CONFIG.API_URL}/commande/${id}`, {
            method: 'DELETE'
        });
        if (response.ok) {
            return true;
        } else {
            throw new Error("Erreur serveur");
        }
    } catch (e) {
        let orders = JSON.parse(localStorage.getItem('orders') || '[]');
        orders = orders.filter(o => o.id !== id);
        localStorage.setItem('orders', JSON.stringify(orders));
        return true;
    }
};

const saveLocalOrder = (order) => {
    let orders = JSON.parse(localStorage.getItem('orders') || '[]');
    order.id = Date.now();
    orders.push(order);
    localStorage.setItem('orders', JSON.stringify(orders));
};
