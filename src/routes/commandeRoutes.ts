import { Router } from 'express';
import * as commandeController from '../controllers/commandeController';

const router = Router();

router.get('/commandes', commandeController.getCommandes);
router.post('/commande', commandeController.createCommande);
router.delete('/commande/:id', commandeController.deleteCommande);

export default router;
