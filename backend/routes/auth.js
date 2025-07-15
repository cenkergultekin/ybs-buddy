const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { validate, authSchemas } = require('../middleware/validation');
const router = express.Router();

// JWT Token oluşturma helper function
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d'
  });
};

// @route   POST /api/auth/register
// @desc    Kullanıcı kaydı
// @access  Public
router.post('/register', validate(authSchemas.register), async (req, res) => {
  try {
    const { firstName, lastName, email, password, studentNumber } = req.body;

    // Email zaten var mı kontrol et
    const existingUser = await User.findOne({ 
      $or: [
        { email: email.toLowerCase() },
        { studentNumber }
      ]
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: existingUser.email === email.toLowerCase() 
          ? 'Bu email adresi zaten kullanımda' 
          : 'Bu öğrenci numarası zaten kullanımda'
      });
    }

    // Yeni kullanıcı oluştur
    const user = new User({
      firstName,
      lastName,
      email: email.toLowerCase(),
      password,
      studentNumber
    });

    await user.save();

    // Token oluştur
    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      message: 'Kayıt başarılı! Hoş geldiniz!',
      data: {
        token,
        user: {
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          fullName: user.fullName,
          email: user.email,
          studentNumber: user.studentNumber,
          profileImage: user.profileImage,
          createdAt: user.createdAt
        }
      }
    });
  } catch (error) {
    console.error('Kayıt hatası:', error);
    
    // Validation errors
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: 'Geçersiz bilgiler',
        errors
      });
    }

    res.status(500).json({
      success: false,
      message: 'Sunucu hatası. Lütfen tekrar deneyiniz.'
    });
  }
});

// @route   POST /api/auth/login
// @desc    Kullanıcı girişi
// @access  Public
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Email ve şifre kontrolü
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email ve şifre gereklidir'
      });
    }

    // Kullanıcıyı bul (şifre dahil)
    const user = await User.findOne({ 
      email: email.toLowerCase(),
      isActive: true 
    }).select('+password');

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Geçersiz email veya şifre'
      });
    }

    // Şifre kontrolü
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Geçersiz email veya şifre'
      });
    }

    // Son giriş tarihini güncelle
    user.lastLogin = new Date();
    await user.save();

    // Token oluştur
    const token = generateToken(user._id);

    res.json({
      success: true,
      message: 'Giriş başarılı! Hoş geldiniz!',
      data: {
        token,
        user: {
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          fullName: user.fullName,
          email: user.email,
          studentNumber: user.studentNumber,
          profileImage: user.profileImage,
          lastLogin: user.lastLogin,
          createdAt: user.createdAt
        }
      }
    });
  } catch (error) {
    console.error('Giriş hatası:', error);
    res.status(500).json({
      success: false,
      message: 'Sunucu hatası. Lütfen tekrar deneyiniz.'
    });
  }
});

// @route   GET /api/auth/me
// @desc    Mevcut kullanıcı bilgilerini al
// @access  Private
router.get('/me', async (req, res) => {
  try {
    // Token kontrolü
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Erişim reddedildi. Token gerekli.'
      });
    }

    // Token'ı doğrula
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select('-password');

    if (!user || !user.isActive) {
      return res.status(401).json({
        success: false,
        message: 'Geçersiz token'
      });
    }

    res.json({
      success: true,
      data: {
        user: {
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          fullName: user.fullName,
          email: user.email,
          studentNumber: user.studentNumber,
          profileImage: user.profileImage,
          lastLogin: user.lastLogin,
          createdAt: user.createdAt
        }
      }
    });
  } catch (error) {
    console.error('Token doğrulama hatası:', error);
    res.status(401).json({
      success: false,
      message: 'Geçersiz token'
    });
  }
});

// @route   PUT /api/auth/profile
// @desc    Profil bilgilerini güncelle
// @access  Private
router.put('/profile', async (req, res) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Erişim reddedildi. Token gerekli.'
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user || !user.isActive) {
      return res.status(401).json({
        success: false,
        message: 'Geçersiz token'
      });
    }

    const { firstName, lastName, profileImage } = req.body;

    // Güncellenebilir alanları kontrol et ve güncelle
    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (profileImage !== undefined) user.profileImage = profileImage;

    await user.save();

    res.json({
      success: true,
      message: 'Profil başarıyla güncellendi',
      data: {
        user: {
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          fullName: user.fullName,
          email: user.email,
          studentNumber: user.studentNumber,
          profileImage: user.profileImage,
          lastLogin: user.lastLogin,
          createdAt: user.createdAt
        }
      }
    });
  } catch (error) {
    console.error('Profil güncelleme hatası:', error);
    res.status(500).json({
      success: false,
      message: 'Sunucu hatası. Lütfen tekrar deneyiniz.'
    });
  }
});

module.exports = router; 