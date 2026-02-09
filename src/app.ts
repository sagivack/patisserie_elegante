import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';
import connectDB from './config/database';
import commandeRoutes from './routes/commandeRoutes';

const app = express();
const PORT = process.env.PORT || 3000;

// Connexion Database
connectDB();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Servir les fichiers statiques (remonte de dist/ vers racine pour trouver HTML/CSS/JS)
// Note: En production, on séparerait souvent le build frontend du backend, mais ici on sert tout ensemble.
app.use(express.static(path.join(__dirname, '../')));

// Routes API
app.use('/', commandeRoutes);

// Démarrer le serveur
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
