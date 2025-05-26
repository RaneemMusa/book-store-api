import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import booksRoutes from './routes/books.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use('/api/books', booksRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to Books API');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
