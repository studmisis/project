import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import userRouter from './routes/userRouter.js';
import tokensRouter from './routes/tokensRouter.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({ credentials: true, origin: true }));
app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', userRouter);
app.use('/api/tokens', tokensRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
