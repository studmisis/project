import { Router } from 'express';
import GenreController from '../controllers/GenreController.js';

const router = Router();

router.get('/', (req, res) => GenreController.getAll(req, res));
router.get('/:id', (req, res) => GenreController.getById(req, res));
router.post('/', (req, res) => GenreController.create(req, res));
router.put('/:id', (req, res) => GenreController.update(req, res));
router.delete('/:id', (req, res) => GenreController.delete(req, res));

export default router;

