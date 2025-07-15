// Global Error Handler Middleware

const errorHandler = (err, req, res, next) => {
  console.error('🚨 Error Details:', {
    message: err.message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
    url: req.originalUrl,
    method: req.method,
    ip: req.ip,
    timestamp: new Date().toISOString()
  });

  let error = { ...err };
  error.message = err.message;

  // Mongoose CastError (Geçersiz ObjectId)
  if (err.name === 'CastError') {
    const message = 'Geçersiz ID formatı';
    error = { message, statusCode: 400 };
  }

  // Mongoose Duplicate Key Error (E11000)
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    const message = `${field} zaten kullanımda`;
    error = { message, statusCode: 400 };
  }

  // Mongoose Validation Error
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors)
      .map(val => val.message)
      .join(', ');
    error = { message, statusCode: 400 };
  }

  // JWT Errors
  if (err.name === 'JsonWebTokenError') {
    const message = 'Geçersiz token';
    error = { message, statusCode: 401 };
  }

  if (err.name === 'TokenExpiredError') {
    const message = 'Token süresi dolmuş';
    error = { message, statusCode: 401 };
  }

  // MongoDB Connection Error
  if (err.name === 'MongoNetworkError') {
    const message = 'Veritabanı bağlantı hatası';
    error = { message, statusCode: 503 };
  }

  // Rate Limit Error
  if (err.status === 429) {
    const message = 'Çok fazla istek. Lütfen daha sonra tekrar deneyiniz.';
    error = { message, statusCode: 429 };
  }

  res.status(error.statusCode || 500).json({
    success: false,
    message: error.message || 'Sunucu hatası',
    ...(process.env.NODE_ENV === 'development' && {
      error: err,
      stack: err.stack
    })
  });
};

// 404 Not Found Handler
const notFoundHandler = (req, res, next) => {
  const message = `Route bulunamadı: ${req.method} ${req.originalUrl}`;
  
  res.status(404).json({
    success: false,
    message,
    availableRoutes: {
      auth: '/api/auth',
      notes: '/api/notes',
      personal: '/api/personal',
      exams: '/api/exams',
      health: '/health'
    }
  });
};

// Async Error Wrapper
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

module.exports = {
  errorHandler,
  notFoundHandler,
  asyncHandler
}; 