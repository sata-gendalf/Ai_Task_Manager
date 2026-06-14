const express = require('express');
const cors = require('cors');
require('dotenv').config();

const pool = require('./db/pool');
const authRoutes = require('./routes/authRoutes');
const tasksRoutes = require('./routes/tasksRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/tasks', tasksRoutes);

app.get('/', (req, res) => {
  res.json({
    message: 'AI Task Assistant backend is running',
  });
});

app.get('/db-test', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');

    res.json({
      message: 'Database connection successful',
      time: result.rows[0].now,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Database connection failed',
      error: error.message,
    });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});