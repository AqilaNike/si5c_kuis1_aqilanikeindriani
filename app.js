require('dotenv').config();

const express = require('express');
const cors = require('cors');

const logger = require('./middlewares/logger');
const { notFoundHandler, errorHandler } = require('./middlewares/errorHandler');

const taskRoutes = require('./routes/taskRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// ---------- Middleware global ----------
app.use(logger);
app.use(cors({
  origin: process.env.CORS_ORIGIN,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));
app.use(express.json());

// ---------- Route dasar: info API ----------
app.get('/', (req, res) => {
  res.json({
    nama: 'Aqila Nike Indriani',
    nim: '2428240130',
    kelas: 'SI5C',
    topik: '18 - Produktivitas: Daftar Tugas',
    endpoints: [
      'GET /tasks',
      'GET /tasks/:id',
      'GET /tasks?prioritas=nilai',
      'POST /tasks',
      'PUT /tasks/:id',
      'DELETE /tasks/:id',
    ],
  });
});

// ---------- Route per modul ----------
app.use('/tasks', taskRoutes);

// ---------- Handler 404 dan error handler (paling bawah) ----------
app.use(notFoundHandler);
app.use(errorHandler);

// Menjalankan server hanya saat bukan di lingkungan production (Vercel)
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
  });
}

// Ekspor app agar bisa dijalankan sebagai serverless function di Vercel
module.exports = app;