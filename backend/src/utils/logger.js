const logger = {
  info: (message, data = null) => {
    const timestamp = new Date().toISOString();
    if (data) {
      console.log(`[${timestamp}] [INFO] ${message}`, data);
    } else {
      console.log(`[${timestamp}] [INFO] ${message}`);
    }
  },

  error: (message, error = null) => {
    const timestamp = new Date().toISOString();
    if (error) {
      console.error(`[${timestamp}] [ERROR] ${message}`, error);
    } else {
      console.error(`[${timestamp}] [ERROR] ${message}`);
    }
  },

  warn: (message, data = null) => {
    const timestamp = new Date().toISOString();
    if (data) {
      console.warn(`[${timestamp}] [WARN] ${message}`, data);
    } else {
      console.warn(`[${timestamp}] [WARN] ${message}`);
    }
  },

  debug: (message, data = null) => {
    if (process.env.NODE_ENV === 'development') {
      const timestamp = new Date().toISOString();
      if (data) {
        console.debug(`[${timestamp}] [DEBUG] ${message}`, data);
      } else {
        console.debug(`[${timestamp}] [DEBUG] ${message}`);
      }
    }
  }
};

module.exports = logger;
