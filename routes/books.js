import express from 'express';
import pool from '../db.js';

const router = express.Router();

// GET all books
router.get('/', async (req, res) => {
  const result = await pool.query('SELECT * FROM book');
  res.json(result.rows);
});

// GET book by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const result = await pool.query('SELECT * FROM book WHERE id = $1', [id]);
  if (result.rows.length === 0) {
    res.status(404).json({ message: 'Book not found' });
  } else {
    res.json(result.rows[0]);
  }
});

// POST a new book
router.post('/', async (req, res) => {
  const { title, author, year } = req.body;
  const result = await pool.query(
    'INSERT INTO book (title, author, year) VALUES ($1, $2, $3) RETURNING *',
    [title, author, year]
  );
  res.status(201).json(result.rows[0]);
});

// PUT update book
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { title, author, year } = req.body;
  const result = await pool.query(
    'UPDATE book SET title = $1, author = $2, year = $3 WHERE id = $4 RETURNING *',
    [title, author, year, id]
  );
  if (result.rows.length === 0) {
    res.status(404).json({ message: 'Book not found' });
  } else {
    res.json(result.rows[0]);
  }
});

// DELETE book
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const result = await pool.query('DELETE FROM book WHERE id = $1 RETURNING *', [id]);
  if (result.rows.length === 0) {
    res.status(404).json({ message: 'Book not found' });
  } else {
    res.json({ message: 'Book deleted successfully' });
  }
});

export default router;
