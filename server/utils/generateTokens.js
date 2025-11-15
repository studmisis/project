import 'dotenv/config';
import jwt from 'jsonwebtoken';
import jwtConfig from '../config/jwtConfig.js';

export default function generateTokens(payload) {
  return {
    accessToken: jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: jwtConfig.access.expiresIn,
    }),
    refreshToken: jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: jwtConfig.refresh.expiresIn,
    }),
  };
}
