const morgan = require('morgan');

// Custom Morgan Format
const morganFormat = process.env.NODE_ENV === 'production'
  ? 'combined'
  : 'dev';

// Custom Morgan Configuration
const morganConfig = morgan(morganFormat, {
  skip: (req, res) => {
    // Skip logging for health checks in production
    if (process.env.NODE_ENV === 'production' && req.url === '/health') {
      return true;
    }
    return false;
  },
  stream: {
    write: (message) => {
      console.log(message.trim());
    }
  }
});

// Application Logger
const logger = {
  info: (message, data = {}) => {
    console.log(`ℹ️  ${new Date().toISOString()} [INFO]: ${message}`, data);
  },
  
  error: (message, error = {}) => {
    console.error(`❌ ${new Date().toISOString()} [ERROR]: ${message}`, {
      message: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
      ...error
    });
  },
  
  warn: (message, data = {}) => {
    console.warn(`⚠️  ${new Date().toISOString()} [WARN]: ${message}`, data);
  },
  
  success: (message, data = {}) => {
    console.log(`✅ ${new Date().toISOString()} [SUCCESS]: ${message}`, data);
  }
};

module.exports = {
  morganConfig,
  logger
}; 