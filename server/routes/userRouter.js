import { Router } from 'express';
import { verifyRefreshToken } from '../middlewares/tokenVerifier.js';
import UserController from '../controllers/UserController.js';

const router = Router();

router.post('/signup', (req, res) => UserController.signup(req, res));
router.post('/login', (req, res) => UserController.login(req, res));
router.get('/logout', (req, res) => UserController.logout(req, res));
router.get('/check', verifyRefreshToken, (req, res) => UserController.check(req, res));

export default router;
