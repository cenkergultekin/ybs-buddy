const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

// Rate Limiting Configuration
const createRateLimit = (windowMs, max, message) => {
  return rateLimit({
    windowMs,
    max,
    message: {
      success: false,
      message,
      retryAfter: Math.ceil(windowMs / 1000)
    },
    standardHeaders: true,
    legacyHeaders: false,
  });
};

// General API Rate Limit
const generalLimiter = createRateLimit(
  15 * 60 * 1000, // 15 minutes
  100, // 100 requests per 15 minutes
  'Çok fazla istek gönderdiniz. 15 dakika sonra tekrar deneyiniz.'
);

// Auth Rate Limit (More strict)
const authLimiter = createRateLimit(
  15 * 60 * 1000, // 15 minutes
  10, // 10 attempts per 15 minutes
  'Çok fazla giriş denemesi. 15 dakika sonra tekrar deneyiniz.'
);

// Password Reset Rate Limit
const passwordResetLimiter = createRateLimit(
  60 * 60 * 1000, // 1 hour
  3, // 3 attempts per hour
  'Çok fazla şifre sıfırlama isteği. 1 saat sonra tekrar deneyiniz.'
);

// Helmet Security Configuration
const helmetConfig = helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'"],
      fontSrc: ["'self'"],
      objectSrc: ["'none'"],
      mediaSrc: ["'self'"],
      frameSrc: ["'none'"],
    },
  },
  crossOriginEmbedderPolicy: false,
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true
  }
});

module.exports = {
  helmetConfig,
  generalLimiter,
  authLimiter,
  passwordResetLimiter
}; 