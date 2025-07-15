const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const compression = require('compression');
const dotenv = require('dotenv');

// Environment variables'ları yükle
dotenv.config();

// Production configuration
const { mongooseConfig, corsConfig, jsonConfig, urlencodedConfig } = require('./config/production');
const { helmetConfig, generalLimiter, authLimiter } = require('./middleware/security');
const { morganConfig, logger } = require('./utils/logger');

// Routes import
const authRoutes = require('./routes/auth');
const notesRoutes = require('./routes/notes');
const personalRoutes = require('./routes/personal');
const examsRoutes = require('./routes/exams');

// Error handlers import
const { errorHandler, notFoundHandler } = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 3000;

// MongoDB bağlantısı
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('✅ MongoDB Atlas bağlantısı başarılı!');
    console.log(`📊 Database: ${mongoose.connection.name}`);
  })
  .catch((error) => {
    console.error('❌ MongoDB bağlantı hatası:', error.message);
    process.exit(1);
  });

// MongoDB bağlantı olayları
mongoose.connection.on('connected', () => {
  console.log('🔗 Mongoose MongoDB Atlas\'a bağlandı');
});

mongoose.connection.on('error', (err) => {
  console.error('⚠️  Mongoose bağlantı hatası:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('❌ Mongoose MongoDB Atlas bağlantısı kesildi');
});

// Middleware
app.use(cors(corsConfig));
app.use(express.json(jsonConfig));
app.use(express.urlencoded(urlencodedConfig));
app.use(compression()); // Compression middleware
app.use(helmetConfig); // Helmet middleware
app.use(generalLimiter); // General API rate limiter
app.use(authLimiter); // Auth rate limiter
app.use(morganConfig); // Morgan logger middleware

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/notes', notesRoutes);
app.use('/api/personal', personalRoutes);
app.use('/api/exams', examsRoutes);

// Test route
app.get('/', (req, res) => {
  res.json({ 
    message: '🚀 YBS Buddy Backend API',
    status: 'Server is running!',
    version: '1.0.0',
    database: {
      status: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected',
      name: mongoose.connection.name || 'Not connected'
    },
    endpoints: {
      health: '/health',
      auth: '/api/auth',
      notes: '/api/notes',
      exams: '/api/exams',
      personal: '/api/personal'
    }
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Error handling middleware (MUST be after all routes)
app.use(notFoundHandler);
app.use(errorHandler);

// Server başlat
app.listen(PORT, () => {
  console.log(`🚀 YBS Buddy Backend running on port ${PORT}`);
  console.log(`📍 Server URL: http://localhost:${PORT}`);
  console.log(`🏥 Health check: http://localhost:${PORT}/health`);
  console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
});

module.exports = app; 