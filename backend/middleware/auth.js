const jwt = require('jsonwebtoken');
const User = require('../models/User');

// JWT Token doğrulama middleware'i
const auth = async (req, res, next) => {
  try {
    // Header'dan token'ı al
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Erişim reddedildi. Token gerekli.'
      });
    }

    // Token'ı doğrula
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Kullanıcıyı bul
    const user = await User.findById(decoded.userId).select('-password');
    
    if (!user || !user.isActive) {
      return res.status(401).json({
        success: false,
        message: 'Geçersiz token. Kullanıcı bulunamadı.'
      });
    }

    // Kullanıcıyı request'e ekle
    req.user = user;
    next();
    
  } catch (error) {
    console.error('Token doğrulama hatası:', error);
    
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        success: false,
        message: 'Geçersiz token formatı'
      });
    }
    
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Token süresi dolmuş. Lütfen tekrar giriş yapınız.'
      });
    }
    
    res.status(401).json({
      success: false,
      message: 'Token doğrulama başarısız'
    });
  }
};

// Optional auth middleware (token varsa doğrula, yoksa devam et)
const optionalAuth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.userId).select('-password');
      
      if (user && user.isActive) {
        req.user = user;
      }
    }
    
    next();
  } catch (error) {
    // Optional auth'da hata olursa sadece devam et
    next();
  }
};

module.exports = { auth, optionalAuth }; 