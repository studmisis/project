import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import userRouter from './routes/userRouter.js';
import tokensRouter from './routes/tokensRouter.js';
import bookRouter from './routes/bookRouter.js';
import commentRouter from './routes/commentRouter.js';
import ratingRouter from './routes/ratingRouter.js';
import favorRouter from './routes/favorRouter.js';
import authorRouter from './routes/authorRouter.js';
import genreRouter from './routes/genreRouter.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({ credentials: true, origin: true }));
app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use('/api/auth', userRouter);
app.use('/api/tokens', tokensRouter);
app.use('/api/books', bookRouter);
app.use('/api/comments', commentRouter);
app.use('/api/ratings', ratingRouter);
app.use('/api/favors', favorRouter);
app.use('/api/authors', authorRouter);
app.use('/api/genres', genreRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
