const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../db/pool');
const logger = require('../utils/logger');
const { validateRegistration, validateLogin } = require('../utils/validators');
const { PASSWORD_MIN_LENGTH, JWT_EXPIRY, BCRYPT_ROUNDS } = require('../config/constants');

const register = async (req, res, next) => {
  try {
    validateRegistration(req.body);

    const { email, password } = req.body;

    const existingUser = await pool.query(
      'SELECT id FROM users WHERE email = $1',
      [email]
    );

    if (existingUser.rows.length > 0) {
      return res.status(409).json({
        message: 'Такие данные уже существуют в системе.',
      });
    }

    const passwordHash = await bcrypt.hash(password, BCRYPT_ROUNDS);

    const newUser = await pool.query(
      `INSERT INTO users (email, password_hash)
       VALUES ($1, $2)
       RETURNING id, email, created_at`,
      [email, passwordHash]
    );

    const user = newUser.rows[0];

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: JWT_EXPIRY,
      }
    );

    return res.status(201).json({
      message: 'Пользователь зарегистрирован успешно',
      token,
      user: {
        id: user.id,
        email: user.email,
      },
    });
  } catch (error) {
    logger.error('Registration error', error);
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    validateLogin(req.body);
    
    const { email, password } = req.body;

    const userResult = await pool.query(
      'SELECT id, email, password_hash FROM users WHERE email = $1',
      [email]
    );

    if (userResult.rows.length === 0) {
      return res.status(401).json({
        message: 'Неправильный email или пароль',
      });
    }

    const user = userResult.rows[0];

    const isPasswordValid = await bcrypt.compare(
      password,
      user.password_hash
    );

    if (!isPasswordValid) {
      return res.status(401).json({
        message: 'Неправильный email или пароль',
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: JWT_EXPIRY,
      }
    );

    return res.json({
      message: 'Вход успешен',
      token,
      user: {
        id: user.id,
        email: user.email,
      },
    });
  } catch (error) {
    logger.error('Login error', error);
    next(error);
  }
};

module.exports = {
  register,
  login,
};