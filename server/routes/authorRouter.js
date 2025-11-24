import { Router } from 'express';
import AuthorController from '../controllers/AuthorController.js';

const router = Router();

router.get('/', (req, res) => AuthorController.getAll(req, res));
router.get('/:id', (req, res) => AuthorController.getById(req, res));
router.post('/', (req, res) => AuthorController.create(req, res));
router.put('/:id', (req, res) => AuthorController.update(req, res));
router.delete('/:id', (req, res) => AuthorController.delete(req, res));

export default router;
