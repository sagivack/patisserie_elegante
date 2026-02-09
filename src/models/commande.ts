import mongoose, { Schema, Document } from 'mongoose';

// Interface TypeScript pour le typage
export interface ICommande extends Document {
    id: number; // On garde l'ID numérique pour compatibilité ou on peut utiliser _id
    base: string;
    glacage: string;
    creme: string;
    cerise: string;
    // Nouveaux champs
    forme: string;
    couleur: string;
    texte: string;

    prix: number;
    nom: string;
    adresse: string;
    date: string;
}

// Schéma Mongoose
const CommandeSchema: Schema = new Schema({
    id: { type: Number, required: true },
    base: { type: String, required: true },
    glacage: { type: String, required: false },
    creme: { type: String, required: true },
    cerise: { type: String, required: true },

    // Nouveaux champs
    forme: { type: String, default: 'rond' },
    couleur: { type: String, required: false },
    texte: { type: String, required: false },

    prix: { type: Number, required: true },
    nom: { type: String, required: true },
    adresse: { type: String, required: true },
    date: { type: String, required: true }
});

// Modèle Mongoose
export default mongoose.model<ICommande>('Commande', CommandeSchema);
