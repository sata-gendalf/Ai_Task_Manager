const express = require('express');
const authenticateToken = require('../middlewares/authMiddleware');
const {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} = require('../controllers/tasksController');

const router = express.Router();

router.get('/', authenticateToken, getTasks);
router.post('/', authenticateToken, createTask);
router.put('/:id', authenticateToken, updateTask);
router.delete('/:id', authenticateToken, deleteTask);

module.exports = router;