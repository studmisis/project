import { Router } from 'express';
import bcrypt from 'bcrypt';
import { User } from '../db/models/index.js';
import generateTokens from '../utils/generateTokens.js';
import cookiesConfig from '../config/cookiesConfig.js';
import { verifyRefreshToken } from '../middlewares/tokenVerifier.js';

const router = Router();

router.post('/signup', async (req, res) => {
  const { userName, userSurname, userLogin, userEmail, userPassword } = req.body;

  if (userName && userSurname && userLogin && userEmail && userPassword) {
    try {
      const [user, created] = await User.findOrCreate({
        where: { userEmail },
        defaults: {
          userName,
          userSurname,
          userLogin,
          userPassword: await bcrypt.hash(userPassword, 10),
        },
      });

      if (!created) {
        return res.status(403).json({ message: 'User already exists' });
      }

      const plainUser = user.get();
      delete plainUser.userPassword;

      const { accessToken, refreshToken } = generateTokens({ user: plainUser });

      return res
        .cookie('refreshToken', refreshToken, cookiesConfig.refresh)
        .status(200)
        .json({ accessToken, user: plainUser });
    } catch (e) {
      console.log(e);
      return res.sendStatus(500);
    }
  }
  return res.sendStatus(500);
});

router.post('/login', async (req, res) => {
  const { userEmail, userPassword } = req.body;

  if (userEmail && userPassword) {
    try {
      const user = await User.findOne({
        where: { userEmail },
      });

      if (!user) {
        return res.status(401).json({ message: 'User not found' });
      }

      if (!(await bcrypt.compare(userPassword, user.userPassword))) {
        return res.status(401).json({ message: 'Incorrect password' });
      }

      const plainUser = user.get();
      delete plainUser.userPassword;

      const { accessToken, refreshToken } = generateTokens({ user: plainUser });

      return res
        .cookie('refreshToken', refreshToken, cookiesConfig.refresh)
        .status(200)
        .json({ accessToken, user: plainUser });
    } catch (e) {
      console.log(e);
      return res.sendStatus(500);
    }
  }
  return res.sendStatus(500);
});

router.get('/logout', (req, res) => {
  res.clearCookie('refreshToken').sendStatus(200);
});

router.get('/check', verifyRefreshToken, (req, res) => {
  res.json({ user: res.locals.user, accessToken: '' });
});

export default router;
