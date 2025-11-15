import 'dotenv/config';
import jwt from 'jsonwebtoken';

class TokenVerifier {
  constructor(secret, tokenType, source = 'header') {
    this.secret = secret;
    this.tokenType = tokenType;
    this.source = source;
  }

  middleware() {
    return (req, res, next) => {
      try {
        let token;

        if (this.source === 'header') {
          if (!req.headers.authorization) {
            return res.status(401).send('Authorization header missing');
          }

          token = req.headers.authorization.split(' ')[1];
        } else {
          token = req.cookies.refreshToken;

          if (!token) {
            return res.status(401).send('Refresh token missing');
          }
        }

        const { user } = jwt.verify(token, this.secret);
        res.locals.user = user;
        next();
      } catch (error) {
        console.log(`no ${this.tokenType} token`);
        if (this.source === 'cookie') {
          res.clearCookie('refreshToken');
        }
        res.status(403).send(`Invalid ${this.tokenType} token`);
      }
    };
  }
}

const verifyAccessToken = new TokenVerifier(
  process.env.ACCESS_TOKEN_SECRET,
  'access',
  'header',
).middleware();

const verifyRefreshToken = new TokenVerifier(
  process.env.REFRESH_TOKEN_SECRET,
  'refresh',
  'cookie',
).middleware();

export { verifyAccessToken, verifyRefreshToken };
