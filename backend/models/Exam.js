const mongoose = require('mongoose');

const examSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Sınav başlığı gereklidir'],
    trim: true,
    maxlength: [200, 'Başlık 200 karakterden uzun olamaz']
  },
  description: {
    type: String,
    trim: true,
    maxlength: [500, 'Açıklama 500 karakterden uzun olamaz']
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
      'Genel Bilgisayar Bilimi',
      'Diğer'
    ]
  },
  category: {
    type: String,
    required: [true, 'Kategori gereklidir'],
    enum: [
      'Vize Sınavı',
      'Final Sınavı',
      'Quiz',
      'Ödev Değerlendirme',
      'Proje Sunumu',
      'Laboratuvar Sınavı',
      'Ara Sınav',
      'Kapsamlı Sınav',
      'Pratik Uygulama',
      'Teorik Değerlendirme'
    ]
  },
  difficulty: {
    type: String,
    enum: ['Başlangıç', 'Orta', 'İleri', 'Uzman'],
    required: true,
    default: 'Orta'
  },
  duration: {
    type: Number,
    required: [true, 'Sınav süresi gereklidir (dakika)'],
    min: [5, 'Sınav süresi en az 5 dakika olmalıdır'],
    max: [180, 'Sınav süresi en fazla 180 dakika olabilir']
  },
  totalQuestions: {
    type: Number,
    required: true,
    min: [1, 'En az 1 soru olmalıdır'],
    max: [100, 'En fazla 100 soru olabilir']
  },
  totalPoints: {
    type: Number,
    required: true,
    min: [1, 'Toplam puan en az 1 olmalıdır']
  },
  questions: [{
    questionText: {
      type: String,
      required: [true, 'Soru metni gereklidir'],
      trim: true,
      maxlength: [1000, 'Soru metni 1000 karakterden uzun olamaz']
    },
    questionType: {
      type: String,
      required: true,
      enum: ['multiple_choice', 'true_false', 'short_answer', 'essay', 'fill_blank']
    },
    points: {
      type: Number,
      required: true,
      min: [1, 'Soru puanı en az 1 olmalıdır'],
      max: [50, 'Soru puanı en fazla 50 olabilir']
    },
    // Çoktan seçmeli sorular için
    options: [{
      text: {
        type: String,
        required: true,
        trim: true
      },
      isCorrect: {
        type: Boolean,
        default: false
      }
    }],
    // Doğru cevaplar (çeşitli soru tipları için)
    correctAnswers: [{
      type: String,
      trim: true
    }],
    explanation: {
      type: String,
      trim: true,
      maxlength: [500, 'Açıklama 500 karakterden uzun olamaz']
    },
    // Soru görseli
    image: {
      url: String,
      alt: String
    },
    // Soru zorluğu
    difficulty: {
      type: String,
      enum: ['Kolay', 'Orta', 'Zor'],
      default: 'Orta'
    },
    // Soru kategorisi
    tags: [{
      type: String,
      trim: true,
      maxlength: [30, 'Etiket 30 karakterden uzun olamaz']
    }]
  }],
  // Sınav ayarları
  settings: {
    isPublic: {
      type: Boolean,
      default: false
    },
    allowReview: {
      type: Boolean,
      default: true
    },
    showCorrectAnswers: {
      type: Boolean,
      default: true
    },
    shuffleQuestions: {
      type: Boolean,
      default: false
    },
    shuffleOptions: {
      type: Boolean,
      default: false
    },
    allowMultipleAttempts: {
      type: Boolean,
      default: false
    },
    maxAttempts: {
      type: Number,
      default: 1,
      min: 1,
      max: 10
    },
    timeLimit: {
      type: Boolean,
      default: true
    },
    passScore: {
      type: Number,
      default: 60,
      min: 0,
      max: 100
    }
  },
  // Sınav oluşturan
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  // Sınav durumu
  isActive: {
    type: Boolean,
    default: true
  },
  isPublished: {
    type: Boolean,
    default: false
  },
  // İstatistikler
  stats: {
    totalAttempts: {
      type: Number,
      default: 0
    },
    averageScore: {
      type: Number,
      default: 0
    },
    passRate: {
      type: Number,
      default: 0
    },
    lastAttempt: {
      type: Date,
      default: null
    }
  },
  // Geçerlilik tarihleri
  validFrom: {
    type: Date,
    default: Date.now
  },
  validUntil: {
    type: Date,
    default: null
  }
}, {
  timestamps: true
});

// Sınav sonuçları için ayrı şema
const examResultSchema = new mongoose.Schema({
  exam: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Exam',
    required: true
  },
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  answers: [{
    questionIndex: {
      type: Number,
      required: true
    },
    studentAnswer: [{
      type: String
    }],
    isCorrect: {
      type: Boolean,
      required: true
    },
    pointsEarned: {
      type: Number,
      required: true,
      default: 0
    },
    timeSpent: {
      type: Number, // saniye cinsinden
      default: 0
    }
  }],
  score: {
    type: Number,
    required: true,
    min: 0
  },
  percentage: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  isPassed: {
    type: Boolean,
    required: true
  },
  timeSpent: {
    type: Number, // dakika cinsinden
    required: true
  },
  startedAt: {
    type: Date,
    required: true
  },
  completedAt: {
    type: Date,
    required: true
  },
  attemptNumber: {
    type: Number,
    required: true,
    min: 1
  },
  // Sınav durumu
  status: {
    type: String,
    enum: ['completed', 'abandoned', 'time_expired'],
    default: 'completed'
  },
  // Gözden geçirme notları
  reviewNotes: {
    type: String,
    trim: true,
    maxlength: [1000, 'Gözden geçirme notları 1000 karakterden uzun olamaz']
  }
}, {
  timestamps: true
});

// İndeksler
examSchema.index({ subject: 1, category: 1 });
examSchema.index({ creator: 1, createdAt: -1 });
examSchema.index({ 'settings.isPublic': 1, isActive: 1, isPublished: 1 });
examSchema.index({ difficulty: 1 });
examSchema.index({ title: 'text', description: 'text' });

examResultSchema.index({ exam: 1, student: 1, attemptNumber: 1 });
examResultSchema.index({ student: 1, createdAt: -1 });
examResultSchema.index({ exam: 1, percentage: -1 });

// Virtual fields
examSchema.virtual('averageTimePerQuestion').get(function() {
  return this.duration / this.totalQuestions;
});

examSchema.virtual('isExpired').get(function() {
  if (!this.validUntil) return false;
  return new Date() > this.validUntil;
});

examSchema.virtual('questionsCount').get(function() {
  return this.questions ? this.questions.length : 0;
});

examResultSchema.virtual('correctAnswersCount').get(function() {
  return this.answers ? this.answers.filter(answer => answer.isCorrect).length : 0;
});

examResultSchema.virtual('incorrectAnswersCount').get(function() {
  return this.answers ? this.answers.filter(answer => !answer.isCorrect).length : 0;
});

// Pre-save middleware
examSchema.pre('save', function(next) {
  // Toplam soru sayısını güncelle
  if (this.questions) {
    this.totalQuestions = this.questions.length;
    
    // Toplam puanı hesapla
    this.totalPoints = this.questions.reduce((sum, question) => sum + question.points, 0);
  }
  
  next();
});

examResultSchema.pre('save', function(next) {
  // Yüzdeyi hesapla
  if (this.score && this.exam) {
    // exam referansından totalPoints alınacak, şimdilik score'dan hesaplıyoruz
    this.percentage = Math.round((this.score / 100) * 100);
  }
  
  next();
});

// Instance methods - Exam
examSchema.methods.addQuestion = function(questionData) {
  this.questions.push(questionData);
  return this.save();
};

examSchema.methods.removeQuestion = function(questionIndex) {
  if (questionIndex >= 0 && questionIndex < this.questions.length) {
    this.questions.splice(questionIndex, 1);
  }
  return this.save();
};

examSchema.methods.updateStats = function(newResult) {
  this.stats.totalAttempts += 1;
  this.stats.lastAttempt = new Date();
  
  // Ortalama skoru güncelle (basit ortalama)
  // Gerçek uygulamada tüm sonuçları aggregate etmek daha doğru olur
  this.stats.averageScore = ((this.stats.averageScore * (this.stats.totalAttempts - 1)) + newResult.percentage) / this.stats.totalAttempts;
  
  // Geçme oranını güncelle
  if (newResult.isPassed) {
    // Başarılı denemeler / toplam denemeler
    const passedAttempts = Math.round(this.stats.passRate * (this.stats.totalAttempts - 1) / 100) + 1;
    this.stats.passRate = (passedAttempts / this.stats.totalAttempts) * 100;
  } else {
    const passedAttempts = Math.round(this.stats.passRate * (this.stats.totalAttempts - 1) / 100);
    this.stats.passRate = (passedAttempts / this.stats.totalAttempts) * 100;
  }
  
  return this.save();
};

examSchema.methods.publish = function() {
  this.isPublished = true;
  return this.save();
};

examSchema.methods.unpublish = function() {
  this.isPublished = false;
  return this.save();
};

// Static methods - Exam
examSchema.statics.findPublicExams = function(subject = null, difficulty = null) {
  let filter = {
    'settings.isPublic': true,
    isActive: true,
    isPublished: true
  };
  
  if (subject && subject !== 'all') {
    filter.subject = subject;
  }
  
  if (difficulty && difficulty !== 'all') {
    filter.difficulty = difficulty;
  }
  
  return this.find(filter)
    .populate('creator', 'firstName lastName studentNumber')
    .sort({ createdAt: -1 });
};

examSchema.statics.findByCreator = function(creatorId) {
  return this.find({ creator: creatorId, isActive: true })
    .sort({ createdAt: -1 });
};

// Static methods - ExamResult
examResultSchema.statics.findByStudent = function(studentId) {
  return this.find({ student: studentId })
    .populate('exam', 'title subject category difficulty totalPoints duration')
    .sort({ createdAt: -1 });
};

examResultSchema.statics.findByExam = function(examId) {
  return this.find({ exam: examId })
    .populate('student', 'firstName lastName studentNumber')
    .sort({ percentage: -1, createdAt: -1 });
};

examResultSchema.statics.getStudentStats = function(studentId) {
  return this.aggregate([
    { $match: { student: new mongoose.Types.ObjectId(studentId) } },
    {
      $group: {
        _id: '$student',
        totalExams: { $sum: 1 },
        averageScore: { $avg: '$percentage' },
        passedExams: { 
          $sum: { $cond: ['$isPassed', 1, 0] } 
        },
        totalTimeSpent: { $sum: '$timeSpent' }
      }
    }
  ]);
};

// Models
const Exam = mongoose.model('Exam', examSchema);
const ExamResult = mongoose.model('ExamResult', examResultSchema);

module.exports = { Exam, ExamResult }; 