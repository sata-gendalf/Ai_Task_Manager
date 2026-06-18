const axios = require('axios');
const pool = require('../db/pool');
const logger = require('../utils/logger');
const { validateTaskCreate, validateTaskUpdate } = require('../utils/validators');
const { TASK_STATUSES } = require('../config/constants');
const { NotFoundError } = require('../utils/errors');

const analyzeTaskText = async (title) => {
  try {
    const pythonServiceUrl = process.env.PYTHON_SERVICE_URL || 'http://localhost:8000';

    const response = await axios.post(`${pythonServiceUrl}/analyze`, {
      text: title,
    }, {
      timeout: 5000
    });

    return {
      priority: response.data.priority || 'medium',
      category: response.data.category || 'general',
      analyzed: true
    };
  } catch (error) {
    logger.warn('Python service unavailable, using defaults', error.message);
    return {
      priority: 'medium',
      category: 'general',
      analyzed: false
    };
  }
};

const getTasks = async (req, res, next) => {
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
    logger.error('Get tasks error', error);
    next(error);
  }
};

const createTask = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { title, status } = req.body;

    validateTaskCreate({ title });

    const taskStatus = status || 'todo';

    if (!TASK_STATUSES.includes(taskStatus)) {
      return res.status(400).json({ message: 'Некорректный статус задачи' });
    }

    const analysis = await analyzeTaskText(title);

    const newTask = await pool.query(
      `INSERT INTO tasks (user_id, title, status, priority, category)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id, title, status, priority, category, created_at, updated_at`,
      [userId, title, taskStatus, analysis.priority, analysis.category]
    );

    return res.status(201).json({
      message: 'Задача создана успешно',
      task: newTask.rows[0],
      analysis: {
        priority: analysis.priority,
        category: analysis.category,
        analyzed: analysis.analyzed
      }
    });
  } catch (error) {
    logger.error('Create task error', error);
    next(error);
  }
};

const updateTask = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const taskId = req.params.id;
    const { title, status } = req.body;

    if (!title && !status) {
      return res.status(400).json({ message: 'Требуется название или статус для обновления' });
    }

    if (title) {
      validateTaskUpdate({ title });
    }

    if (status && !TASK_STATUSES.includes(status)) {
      return res.status(400).json({ message: 'Некорректный статус задачи' });
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
      throw new NotFoundError('Задача не найдена');
    }

    return res.json({
      message: 'Задача обновлена успешно',
      task: updatedTask.rows[0],
    });
  } catch (error) {
    logger.error('Update task error', error);
    next(error);
  }
};

const deleteTask = async (req, res, next) => {
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
      throw new NotFoundError('Задача не найдена');
    }

    return res.json({
      message: 'Задача удалена успешно',
      task: deletedTask.rows[0],
    });
  } catch (error) {
    logger.error('Delete task error', error);
    next(error);
  }
};

module.exports = {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
};