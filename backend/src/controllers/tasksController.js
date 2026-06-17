const axios = require('axios');
const pool = require('../db/pool');

const allowedStatuses = ['todo', 'in_progress', 'done'];

const analyzeTaskText = async (title) => {
  try {
    const pythonServiceUrl = process.env.PYTHON_SERVICE_URL || 'http://localhost:8000';

    const response = await axios.post(`${pythonServiceUrl}/analyze`, {
      text: title,
    });

    return {
      priority: response.data.priority || 'medium',
      category: response.data.category || 'general',
    };
  } catch (error) {
    console.error('Python service error:', error.message);
    return {
      priority: 'medium',
      category: 'general',
    };
  }
};

const getTasks = async (req, res) => {
  try {
    const userId = req.user.id;

    const tasks = await pool.query(
      `SELECT id, title, status, priority, category, created_at, updated_at
       FROM tasks
       WHERE user_id = $1
       ORDER BY created_at DESC`,
      [userId]
    );

    return res.json(tasks.rows);
  } catch (error) {
    return res.status(500).json({
      message: 'Failed to get tasks',
      error: error.message,
    });
  }
};

const createTask = async (req, res) => {
  try {
    const userId = req.user.id;
    const { title, status } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({ message: 'Task title is required' });
    }

    const taskStatus = status || 'todo';

    if (!allowedStatuses.includes(taskStatus)) {
      return res.status(400).json({ message: 'Invalid task status' });
    }

    const analysis = await analyzeTaskText(title);

    const newTask = await pool.query(
      `INSERT INTO tasks (user_id, title, status, priority, category)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id, title, status, priority, category, created_at, updated_at`,
      [userId, title, taskStatus, analysis.priority, analysis.category]
    );

    return res.status(201).json({
      message: 'Task created successfully',
      task: newTask.rows[0],
      analysis,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Failed to create task',
      error: error.message,
    });
  }
};

const updateTask = async (req, res) => {
  try {
    const userId = req.user.id;
    const taskId = req.params.id;
    const { title, status } = req.body;

    if (!title && !status) {
      return res.status(400).json({ message: 'Title or status is required for update' });
    }

    if (status && !allowedStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid task status' });
    }

    const updatedTask = await pool.query(
      `UPDATE tasks
       SET
         title = COALESCE($1, title),
         status = COALESCE($2, status),
         updated_at = CURRENT_TIMESTAMP
       WHERE id = $3 AND user_id = $4
       RETURNING id, title, status, priority, category, created_at, updated_at`,
      [title || null, status || null, taskId, userId]
    );

    if (updatedTask.rows.length === 0) {
      return res.status(404).json({ message: 'Task not found' });
    }

    return res.json({
      message: 'Task updated successfully',
      task: updatedTask.rows[0],
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Failed to update task',
      error: error.message,
    });
  }
};

const deleteTask = async (req, res) => {
  try {
    const userId = req.user.id;
    const taskId = req.params.id;

    const deletedTask = await pool.query(
      `DELETE FROM tasks
       WHERE id = $1 AND user_id = $2
       RETURNING id, title`,
      [taskId, userId]
    );

    if (deletedTask.rows.length === 0) {
      return res.status(404).json({ message: 'Task not found' });
    }

    return res.json({
      message: 'Task deleted successfully',
      task: deletedTask.rows[0],
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Failed to delete task',
      error: error.message,
    });
  }
};

module.exports = {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
};