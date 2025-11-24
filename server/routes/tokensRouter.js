import { Router } from 'express';
import { verifyRefreshToken } from '../middlewares/tokenVerifier.js';
import TokensController from '../controllers/TokensController.js';

const router = Router();

router.get('/refresh', verifyRefreshToken, (req, res) => TokensController.refresh(req, res));

export default router;
