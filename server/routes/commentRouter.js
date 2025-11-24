import { Router } from 'express';
import CommentController from '../controllers/CommentController.js';

const router = Router();

router.get('/', (req, res) => CommentController.getAll(req, res));
router.get('/:id', (req, res) => CommentController.getById(req, res));
router.post('/', (req, res) => CommentController.create(req, res));
router.put('/:id', (req, res) => CommentController.update(req, res));
router.delete('/:id', (req, res) => CommentController.delete(req, res));

export default router;

