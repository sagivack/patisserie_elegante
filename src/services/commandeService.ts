import Commande, { ICommande } from '../models/commande';

export const getAllCommandes = async (): Promise<ICommande[]> => {
    return await Commande.find({});
};

export const addCommande = async (commandeData: Partial<ICommande>): Promise<ICommande> => {
    // Génération de l'ID ici si nécessaire, ou on laisse MongoDB gérer _id.
    // Pour rester compatible avec le frontend qui s'attend à 'id', on le génère.
    const newCommande = new Commande({
        ...commandeData,
        id: Date.now() // Simple ID numérique
    });
    return await newCommande.save();
};

export const deleteCommande = async (id: number): Promise<boolean> => {
    const result = await Commande.deleteOne({ id: id });
    return result.deletedCount === 1;
};
