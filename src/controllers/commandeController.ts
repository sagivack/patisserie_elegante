import { Request, Response } from 'express';
import * as commandeService from '../services/commandeService';
import { ICommande } from '../models/commande';

export const getCommandes = async (req: Request, res: Response) => {
    try {
        const commandes = await commandeService.getAllCommandes();
        res.json(commandes);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la lecture des données' });
    }
};

export const createCommande = async (req: Request, res: Response) => {
    try {
        const nouvelleCommande: ICommande = req.body;
        const commandeCreee = await commandeService.addCommande(nouvelleCommande);
        res.status(201).json({ message: 'Commande créée', order: commandeCreee });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur lors de la sauvegarde des données' });
    }
};

export const deleteCommande = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id as string);
        const success = await commandeService.deleteCommande(id);

        if (!success) {
            res.status(404).json({ error: 'Commande non trouvée' });
            return;
        }

        res.json({ message: 'Commande supprimée' });
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la suppression des données' });
    }
};
