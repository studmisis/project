import { Router } from 'express';
import RatingController from '../controllers/RatingController.js';

const router = Router();

router.get('/', (req, res) => RatingController.getAll(req, res));
router.get('/:id', (req, res) => RatingController.getById(req, res));
router.get('/book/:bookId/average', (req, res) => RatingController.getAverageByBookId(req, res));
router.post('/', (req, res) => RatingController.createOrUpdate(req, res));
router.delete('/:id', (req, res) => RatingController.delete(req, res));

export default router;

