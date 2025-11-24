import { Router } from 'express';
import FavorController from '../controllers/FavorController.js';

const router = Router();

router.get('/', (req, res) => FavorController.getAll(req, res));
router.get('/:id', (req, res) => FavorController.getById(req, res));
router.post('/', (req, res) => FavorController.create(req, res));
router.delete('/:id', (req, res) => FavorController.delete(req, res));
router.delete('/user-book/remove', (req, res) => FavorController.deleteByUserAndBook(req, res));

export default router;

