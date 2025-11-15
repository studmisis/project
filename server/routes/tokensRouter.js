import { Router } from 'express';
import { verifyRefreshToken } from '../middlewares/tokenVerifier.js';
import generateTokens from '../utils/generateTokens.js';
import cookiesConfig from '../config/cookiesConfig.js';

const router = Router();

router.get('/refresh', verifyRefreshToken, async (req, res) => {
  const { accessToken, refreshToken } = generateTokens({
    user: res.locals.user,
  });
  res
    .cookie('refreshToken', refreshToken, cookiesConfig.refresh)
    .status(200)
    .json({ accessToken, user: res.locals.user });
});

export default router;
