const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Not başlığı gereklidir'],
    trim: true,
    maxlength: [200, 'Başlık 200 karakterden uzun olamaz']
  },
  content: {
    type: String,
    required: [true, 'Not içeriği gereklidir'],
    trim: true
  },
  subject: {
    type: String,
    required: [true, 'Ders konusu gereklidir'],
    trim: true,
    enum: [
      'Bilgisayar Programlama',
      'Veri Yapıları ve Algoritmalar',
      'Veritabanı Yönetim Sistemleri',
      'Web Tasarımı ve Programlama',
      'Bilgisayar Ağları',
      'İşletim Sistemleri',
      'Yazılım Mühendisliği',
      'Sistem Analizi ve Tasarımı',
      'Mobil Uygulama Geliştirme',
      'E-Ticaret ve Güvenlik',
      'Proje Yönetimi',
      'İş Zekası ve Veri Madenciliği',
      'Bulut Bilişim',
      'Yapay Zeka',
      'Diğer'
    ]
  },
  category: {
    type: String,
    required: [true, 'Kategori gereklidir'],
    enum: [
      'Ders Notları',
      'Ödev Çözümleri',
      'Proje Dokümantasyonu',
      'Sınav Hazırlık',
      'Kod Örnekleri',
      'Teorik Bilgiler',
      'Pratik Uygulamalar',
      'Araştırma Notları'
    ]
  },
  tags: [{
    type: String,
    trim: true,
    maxlength: [30, 'Etiket 30 karakterden uzun olamaz']
  }],
  difficulty: {
    type: String,
    enum: ['Başlangıç', 'Orta', 'İleri', 'Uzman'],
    default: 'Orta'
  },
  isPublic: {
    type: Boolean,
    default: false,
    required: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  viewCount: {
    type: Number,
    default: 0
  },
  likeCount: {
    type: Number,
    default: 0
  },
  likes: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    likedAt: {
      type: Date,
      default: Date.now
    }
  }],
  comments: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    content: {
      type: String,
      required: [true, 'Yorum içeriği gereklidir'],
      trim: true,
      maxlength: [500, 'Yorum 500 karakterden uzun olamaz']
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  attachments: [{
    fileName: {
      type: String,
      required: true
    },
    fileUrl: {
      type: String,
      required: true
    },
    fileType: {
      type: String,
      enum: ['image', 'pdf', 'document', 'code', 'other'],
      required: true
    },
    fileSize: {
      type: Number,
      required: true
    },
    uploadedAt: {
      type: Date,
      default: Date.now
    }
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  lastModified: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// İndeksler
noteSchema.index({ subject: 1, category: 1 });
noteSchema.index({ author: 1, createdAt: -1 });
noteSchema.index({ isPublic: 1, isActive: 1 });
noteSchema.index({ tags: 1 });
noteSchema.index({ title: 'text', content: 'text' });

// Virtual fields
noteSchema.virtual('commentCount').get(function() {
  return this.comments ? this.comments.length : 0;
});

noteSchema.virtual('attachmentCount').get(function() {
  return this.attachments ? this.attachments.length : 0;
});

// Pre-save middleware
noteSchema.pre('save', function(next) {
  if (this.isModified() && !this.isNew) {
    this.lastModified = new Date();
  }
  next();
});

// Instance methods
noteSchema.methods.addLike = function(userId) {
  const existingLike = this.likes.find(like => like.user.toString() === userId.toString());
  
  if (!existingLike) {
    this.likes.push({ user: userId });
    this.likeCount = this.likes.length;
  }
  
  return this.save();
};

noteSchema.methods.removeLike = function(userId) {
  this.likes = this.likes.filter(like => like.user.toString() !== userId.toString());
  this.likeCount = this.likes.length;
  return this.save();
};

noteSchema.methods.addComment = function(userId, content) {
  this.comments.push({
    user: userId,
    content: content
  });
  return this.save();
};

noteSchema.methods.incrementView = function() {
  this.viewCount += 1;
  return this.save();
};

// Static methods
noteSchema.statics.findBySubject = function(subject) {
  return this.find({ 
    subject: subject, 
    isPublic: true, 
    isActive: true 
  }).populate('author', 'firstName lastName studentNumber');
};

noteSchema.statics.findByCategory = function(category) {
  return this.find({ 
    category: category, 
    isPublic: true, 
    isActive: true 
  }).populate('author', 'firstName lastName studentNumber');
};

noteSchema.statics.searchNotes = function(searchTerm) {
  return this.find({
    $and: [
      { isPublic: true },
      { isActive: true },
      {
        $or: [
          { title: { $regex: searchTerm, $options: 'i' } },
          { content: { $regex: searchTerm, $options: 'i' } },
          { tags: { $in: [new RegExp(searchTerm, 'i')] } }
        ]
      }
    ]
  }).populate('author', 'firstName lastName studentNumber');
};

module.exports = mongoose.model('Note', noteSchema); 