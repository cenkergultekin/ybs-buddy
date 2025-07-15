const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'Ad gereklidir'],
    trim: true,
    maxlength: [50, 'Ad 50 karakterden uzun olamaz']
  },
  lastName: {
    type: String,
    required: [true, 'Soyad gereklidir'],
    trim: true,
    maxlength: [50, 'Soyad 50 karakterden uzun olamaz']
  },
  email: {
    type: String,
    required: [true, 'Email gereklidir'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Geçerli bir email adresi giriniz']
  },
  password: {
    type: String,
    required: [true, 'Şifre gereklidir'],
    minlength: [6, 'Şifre en az 6 karakter olmalıdır']
  },
  studentNumber: {
    type: String,
    required: [true, 'Öğrenci numarası gereklidir'],
    unique: true,
    trim: true,
    match: [/^\d{8,10}$/, 'Öğrenci numarası 8-10 haneli olmalıdır']
  },
  profileImage: {
    type: String,
    default: null
  },
  isActive: {
    type: Boolean,
    default: true
  },
  lastLogin: {
    type: Date,
    default: null
  }
}, {
  timestamps: true
});

// Şifre hash'leme (kayıt sırasında)
userSchema.pre('save', async function(next) {
  // Sadece şifre değiştirildiğinde hash'le
  if (!this.isModified('password')) return next();
  
  try {
    // Şifreyi hash'le
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Şifre karşılaştırma methodu
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// JSON response'da şifreyi gizle
userSchema.methods.toJSON = function() {
  const user = this.toObject();
  delete user.password;
  return user;
};

// Full name virtual field
userSchema.virtual('fullName').get(function() {
  return `${this.firstName} ${this.lastName}`;
});

module.exports = mongoose.model('User', userSchema); 