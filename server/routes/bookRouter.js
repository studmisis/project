import { Router } from 'express';
import BookController from '../controllers/BookController.js';

const router = Router();

router.get('/', (req, res) => BookController.getAll(req, res));
router.get('/:id', (req, res) => BookController.getById(req, res));
router.post('/', (req, res) => BookController.create(req, res));
router.put('/:id', (req, res) => BookController.update(req, res));
router.delete('/:id', (req, res) => BookController.delete(req, res));

export default router;

