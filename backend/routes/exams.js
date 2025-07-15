const express = require('express');
const { Exam, ExamResult } = require('../models/Exam');
const { auth, optionalAuth } = require('../middleware/auth');
const router = express.Router();

// @route   GET /api/exams
// @desc    Tüm public sınavları getir (filtreleme ile)
// @access  Public
router.get('/', optionalAuth, async (req, res) => {
  try {
    const { 
      subject, 
      category,
      difficulty, 
      search, 
      creator, 
      page = 1, 
      limit = 12,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    // Filtre objesi oluştur
    let filter = { 
      'settings.isPublic': true, 
      isActive: true, 
      isPublished: true 
    };

    if (subject && subject !== 'all') {
      filter.subject = subject;
    }

    if (category && category !== 'all') {
      filter.category = category;
    }

    if (difficulty && difficulty !== 'all') {
      filter.difficulty = difficulty;
    }

    if (creator) {
      filter.creator = creator;
    }

    // Arama terimi varsa
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    // Sıralama objesi
    let sortObj = {};
    sortObj[sortBy] = sortOrder === 'desc' ? -1 : 1;

    // Pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const exams = await Exam.find(filter)
      .populate('creator', 'firstName lastName studentNumber profileImage')
      .select('-questions.correctAnswers -questions.explanation') // Cevapları gizle
      .sort(sortObj)
      .skip(skip)
      .limit(parseInt(limit))
      .lean();

    const total = await Exam.countDocuments(filter);

    res.json({
      success: true,
      data: {
        exams,
        pagination: {
          current: parseInt(page),
          total: Math.ceil(total / parseInt(limit)),
          totalExams: total,
          hasNext: skip + exams.length < total,
          hasPrev: parseInt(page) > 1
        }
      }
    });
  } catch (error) {
    console.error('Sınavları getirme hatası:', error);
    res.status(500).json({
      success: false,
      message: 'Sınavlar getirilirken hata oluştu'
    });
  }
});

// @route   GET /api/exams/my
// @desc    Kullanıcının oluşturduğu sınavları getir
// @access  Private
router.get('/my', auth, async (req, res) => {
  try {
    const { page = 1, limit = 12, sortBy = 'createdAt', sortOrder = 'desc' } = req.query;

    const skip = (parseInt(page) - 1) * parseInt(limit);

    let sortObj = {};
    sortObj[sortBy] = sortOrder === 'desc' ? -1 : 1;

    const exams = await Exam.find({ 
      creator: req.user._id,
      isActive: true 
    })
      .sort(sortObj)
      .skip(skip)
      .limit(parseInt(limit))
      .lean();

    const total = await Exam.countDocuments({ 
      creator: req.user._id,
      isActive: true 
    });

    res.json({
      success: true,
      data: {
        exams,
        pagination: {
          current: parseInt(page),
          total: Math.ceil(total / parseInt(limit)),
          totalExams: total,
          hasNext: skip + exams.length < total,
          hasPrev: parseInt(page) > 1
        }
      }
    });
  } catch (error) {
    console.error('Kendi sınavları getirme hatası:', error);
    res.status(500).json({
      success: false,
      message: 'Sınavlarınız getirilirken hata oluştu'
    });
  }
});

// @route   GET /api/exams/:id
// @desc    Tek sınav detayını getir
// @access  Public (ama cevapları gizle)
router.get('/:id', optionalAuth, async (req, res) => {
  try {
    const exam = await Exam.findById(req.params.id)
      .populate('creator', 'firstName lastName studentNumber profileImage createdAt');

    if (!exam || !exam.isActive) {
      return res.status(404).json({
        success: false,
        message: 'Sınav bulunamadı'
      });
    }

    // Eğer sınav public değilse ve sahibi değilse erişim engelle
    if (!exam.settings.isPublic && (!req.user || exam.creator._id.toString() !== req.user._id.toString())) {
      return res.status(403).json({
        success: false,
        message: 'Bu sınava erişim yetkiniz yok'
      });
    }

    // Sınav sahibi değilse cevapları gizle
    let examData = exam.toObject();
    if (!req.user || exam.creator._id.toString() !== req.user._id.toString()) {
      examData.questions = examData.questions.map(q => ({
        ...q,
        correctAnswers: undefined,
        explanation: undefined
      }));
    }

    res.json({
      success: true,
      data: { exam: examData }
    });
  } catch (error) {
    console.error('Sınav detayı getirme hatası:', error);
    res.status(500).json({
      success: false,
      message: 'Sınav detayı getirilirken hata oluştu'
    });
  }
});

// @route   POST /api/exams
// @desc    Yeni sınav oluştur
// @access  Private
router.post('/', auth, async (req, res) => {
  try {
    const { 
      title, 
      description, 
      subject, 
      category, 
      difficulty, 
      duration,
      questions,
      settings
    } = req.body;

    if (!title || !subject || !category || !duration || !questions || questions.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Başlık, ders konusu, kategori, süre ve en az bir soru gereklidir'
      });
    }

    // Soruları validate et
    for (let i = 0; i < questions.length; i++) {
      const question = questions[i];
      if (!question.questionText || !question.questionType || !question.points) {
        return res.status(400).json({
          success: false,
          message: `${i + 1}. soruda eksik bilgiler var`
        });
      }

      // Çoktan seçmeli sorularda seçenekleri kontrol et
      if (question.questionType === 'multiple_choice') {
        if (!question.options || question.options.length < 2) {
          return res.status(400).json({
            success: false,
            message: `${i + 1}. soruda en az 2 seçenek olmalıdır`
          });
        }

        const correctOptions = question.options.filter(opt => opt.isCorrect);
        if (correctOptions.length === 0) {
          return res.status(400).json({
            success: false,
            message: `${i + 1}. soruda en az bir doğru cevap seçmelisiniz`
          });
        }
      }
    }

    const exam = new Exam({
      title,
      description,
      subject,
      category,
      difficulty: difficulty || 'Orta',
      duration,
      questions,
      settings: {
        isPublic: settings?.isPublic || false,
        allowReview: settings?.allowReview !== false,
        showCorrectAnswers: settings?.showCorrectAnswers !== false,
        shuffleQuestions: settings?.shuffleQuestions || false,
        shuffleOptions: settings?.shuffleOptions || false,
        allowMultipleAttempts: settings?.allowMultipleAttempts || false,
        maxAttempts: settings?.maxAttempts || 1,
        timeLimit: settings?.timeLimit !== false,
        passScore: settings?.passScore || 60
      },
      creator: req.user._id
    });

    await exam.save();
    await exam.populate('creator', 'firstName lastName studentNumber profileImage');

    res.status(201).json({
      success: true,
      message: 'Sınav başarıyla oluşturuldu',
      data: { exam }
    });
  } catch (error) {
    console.error('Sınav oluşturma hatası:', error);
    
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
      message: 'Sınav oluşturulurken hata oluştu'
    });
  }
});

// @route   PUT /api/exams/:id
// @desc    Sınav güncelle
// @access  Private (sadece sahip)
router.put('/:id', auth, async (req, res) => {
  try {
    const exam = await Exam.findById(req.params.id);

    if (!exam || !exam.isActive) {
      return res.status(404).json({
        success: false,
        message: 'Sınav bulunamadı'
      });
    }

    // Sadece sınav sahibi güncelleyebilir
    if (exam.creator.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Bu sınavı güncelleme yetkiniz yok'
      });
    }

    const { 
      title, 
      description, 
      subject, 
      category, 
      difficulty, 
      duration,
      questions,
      settings
    } = req.body;

    // Güncellenebilir alanları kontrol et ve güncelle
    if (title) exam.title = title;
    if (description !== undefined) exam.description = description;
    if (subject) exam.subject = subject;
    if (category) exam.category = category;
    if (difficulty) exam.difficulty = difficulty;
    if (duration) exam.duration = duration;
    if (questions) exam.questions = questions;
    if (settings) {
      exam.settings = { ...exam.settings, ...settings };
    }

    await exam.save();
    await exam.populate('creator', 'firstName lastName studentNumber profileImage');

    res.json({
      success: true,
      message: 'Sınav başarıyla güncellendi',
      data: { exam }
    });
  } catch (error) {
    console.error('Sınav güncelleme hatası:', error);
    
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
      message: 'Sınav güncellenirken hata oluştu'
    });
  }
});

// @route   DELETE /api/exams/:id
// @desc    Sınav sil (soft delete)
// @access  Private (sadece sahip)
router.delete('/:id', auth, async (req, res) => {
  try {
    const exam = await Exam.findById(req.params.id);

    if (!exam || !exam.isActive) {
      return res.status(404).json({
        success: false,
        message: 'Sınav bulunamadı'
      });
    }

    // Sadece sınav sahibi silebilir
    if (exam.creator.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Bu sınavı silme yetkiniz yok'
      });
    }

    exam.isActive = false;
    await exam.save();

    res.json({
      success: true,
      message: 'Sınav başarıyla silindi'
    });
  } catch (error) {
    console.error('Sınav silme hatası:', error);
    res.status(500).json({
      success: false,
      message: 'Sınav silinirken hata oluştu'
    });
  }
});

// @route   POST /api/exams/:id/publish
// @desc    Sınavı yayınla/yayından kaldır
// @access  Private (sadece sahip)
router.post('/:id/publish', auth, async (req, res) => {
  try {
    const { isPublished } = req.body;

    const exam = await Exam.findById(req.params.id);

    if (!exam || !exam.isActive) {
      return res.status(404).json({
        success: false,
        message: 'Sınav bulunamadı'
      });
    }

    if (exam.creator.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Bu sınavı yayınlama yetkiniz yok'
      });
    }

    if (isPublished) {
      await exam.publish();
    } else {
      await exam.unpublish();
    }

    res.json({
      success: true,
      message: isPublished ? 'Sınav yayınlandı' : 'Sınav yayından kaldırıldı',
      data: { isPublished: exam.isPublished }
    });
  } catch (error) {
    console.error('Sınav yayınlama hatası:', error);
    res.status(500).json({
      success: false,
      message: 'Sınav yayınlama işlemi sırasında hata oluştu'
    });
  }
});

// @route   POST /api/exams/:id/take
// @desc    Sınav başlat
// @access  Private
router.post('/:id/take', auth, async (req, res) => {
  try {
    const exam = await Exam.findById(req.params.id);

    if (!exam || !exam.isActive || !exam.isPublished) {
      return res.status(404).json({
        success: false,
        message: 'Sınav bulunamadı veya aktif değil'
      });
    }

    // Geçerlilik tarihi kontrolü
    if (exam.isExpired) {
      return res.status(400).json({
        success: false,
        message: 'Sınav süresi dolmuş'
      });
    }

    // Önceki denemeleri kontrol et
    const previousAttempts = await ExamResult.countDocuments({
      exam: exam._id,
      student: req.user._id
    });

    if (!exam.settings.allowMultipleAttempts && previousAttempts > 0) {
      return res.status(400).json({
        success: false,
        message: 'Bu sınavı sadece bir kez alabilirsiniz'
      });
    }

    if (previousAttempts >= exam.settings.maxAttempts) {
      return res.status(400).json({
        success: false,
        message: `Bu sınavı en fazla ${exam.settings.maxAttempts} kez alabilirsiniz`
      });
    }

    // Sınavı kullanıcıya göster (cevapları gizle)
    let examData = exam.toObject();
    examData.questions = examData.questions.map((q, index) => ({
      index,
      questionText: q.questionText,
      questionType: q.questionType,
      points: q.points,
      options: q.options ? q.options.map(opt => ({ text: opt.text })) : [],
      image: q.image,
      tags: q.tags
    }));

    // Sorular karıştırılacaksa
    if (exam.settings.shuffleQuestions) {
      examData.questions.sort(() => Math.random() - 0.5);
    }

    // Seçenekler karıştırılacaksa
    if (exam.settings.shuffleOptions) {
      examData.questions.forEach(q => {
        if (q.options) {
          q.options.sort(() => Math.random() - 0.5);
        }
      });
    }

    res.json({
      success: true,
      data: { 
        exam: {
          _id: examData._id,
          title: examData.title,
          description: examData.description,
          duration: examData.duration,
          totalQuestions: examData.totalQuestions,
          totalPoints: examData.totalPoints,
          settings: examData.settings,
          questions: examData.questions,
          attemptNumber: previousAttempts + 1
        }
      }
    });
  } catch (error) {
    console.error('Sınav başlatma hatası:', error);
    res.status(500).json({
      success: false,
      message: 'Sınav başlatılırken hata oluştu'
    });
  }
});

// @route   POST /api/exams/:id/submit
// @desc    Sınav cevaplarını gönder ve değerlendir
// @access  Private
router.post('/:id/submit', auth, async (req, res) => {
  try {
    const { answers, timeSpent, startedAt } = req.body;

    if (!answers || !timeSpent || !startedAt) {
      return res.status(400).json({
        success: false,
        message: 'Cevaplar, geçen süre ve başlama zamanı gereklidir'
      });
    }

    const exam = await Exam.findById(req.params.id);

    if (!exam || !exam.isActive || !exam.isPublished) {
      return res.status(404).json({
        success: false,
        message: 'Sınav bulunamadı'
      });
    }

    // Önceki denemeler
    const previousAttempts = await ExamResult.countDocuments({
      exam: exam._id,
      student: req.user._id
    });

    // Cevapları değerlendir
    let totalScore = 0;
    let evaluatedAnswers = [];

    for (let i = 0; i < answers.length; i++) {
      const studentAnswer = answers[i];
      const question = exam.questions[studentAnswer.questionIndex];
      
      if (!question) continue;

      let isCorrect = false;
      let pointsEarned = 0;

      // Soru tipine göre değerlendirme
      if (question.questionType === 'multiple_choice') {
        const correctOptions = question.options.filter(opt => opt.isCorrect);
        const studentOptions = studentAnswer.answers || [];
        
        // Basit kontrol: tüm doğru cevaplar seçildiyse ve yanlış cevap yoksa
        isCorrect = correctOptions.length === studentOptions.length &&
                   correctOptions.every(opt => studentOptions.includes(opt.text));
      } else if (question.questionType === 'true_false') {
        isCorrect = question.correctAnswers.includes(studentAnswer.answers[0]);
      } else if (question.questionType === 'short_answer' || question.questionType === 'fill_blank') {
        // Basit string karşılaştırması (case-insensitive)
        const studentAns = (studentAnswer.answers[0] || '').toLowerCase().trim();
        isCorrect = question.correctAnswers.some(correct => 
          correct.toLowerCase().trim() === studentAns
        );
      }
      // Essay tipindeki sorular manuel değerlendirme gerektirir

      if (isCorrect) {
        pointsEarned = question.points;
        totalScore += pointsEarned;
      }

      evaluatedAnswers.push({
        questionIndex: studentAnswer.questionIndex,
        studentAnswer: studentAnswer.answers,
        isCorrect,
        pointsEarned,
        timeSpent: studentAnswer.timeSpent || 0
      });
    }

    const percentage = Math.round((totalScore / exam.totalPoints) * 100);
    const isPassed = percentage >= exam.settings.passScore;

    // Sonucu kaydet
    const examResult = new ExamResult({
      exam: exam._id,
      student: req.user._id,
      answers: evaluatedAnswers,
      score: totalScore,
      percentage,
      isPassed,
      timeSpent,
      startedAt: new Date(startedAt),
      completedAt: new Date(),
      attemptNumber: previousAttempts + 1
    });

    await examResult.save();
    
    // Sınav istatistiklerini güncelle
    await exam.updateStats(examResult);

    // Populate ederek döndür
    await examResult.populate('exam', 'title subject category settings');

    res.status(201).json({
      success: true,
      message: 'Sınav başarıyla tamamlandı',
      data: { 
        result: examResult,
        feedback: {
          totalQuestions: exam.totalQuestions,
          correctAnswers: evaluatedAnswers.filter(a => a.isCorrect).length,
          incorrectAnswers: evaluatedAnswers.filter(a => !a.isCorrect).length,
          isPassed,
          passScore: exam.settings.passScore
        }
      }
    });
  } catch (error) {
    console.error('Sınav teslim hatası:', error);
    res.status(500).json({
      success: false,
      message: 'Sınav teslim edilirken hata oluştu'
    });
  }
});

// @route   GET /api/exams/:id/results
// @desc    Sınav sonuçlarını getir (sınav sahibi için)
// @access  Private (sadece sahip)
router.get('/:id/results', auth, async (req, res) => {
  try {
    const exam = await Exam.findById(req.params.id);

    if (!exam || !exam.isActive) {
      return res.status(404).json({
        success: false,
        message: 'Sınav bulunamadı'
      });
    }

    if (exam.creator.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Bu sınavın sonuçlarını görme yetkiniz yok'
      });
    }

    const results = await ExamResult.findByExam(exam._id);

    res.json({
      success: true,
      data: { results }
    });
  } catch (error) {
    console.error('Sınav sonuçları getirme hatası:', error);
    res.status(500).json({
      success: false,
      message: 'Sınav sonuçları getirilirken hata oluştu'
    });
  }
});

// @route   GET /api/exams/results/my
// @desc    Kullanıcının sınav sonuçlarını getir
// @access  Private
router.get('/results/my', auth, async (req, res) => {
  try {
    const { page = 1, limit = 20 } = req.query;

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const results = await ExamResult.find({ student: req.user._id })
      .populate('exam', 'title subject category difficulty totalPoints duration')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await ExamResult.countDocuments({ student: req.user._id });

    res.json({
      success: true,
      data: {
        results,
        pagination: {
          current: parseInt(page),
          total: Math.ceil(total / parseInt(limit)),
          totalResults: total,
          hasNext: skip + results.length < total,
          hasPrev: parseInt(page) > 1
        }
      }
    });
  } catch (error) {
    console.error('Kendi sonuçları getirme hatası:', error);
    res.status(500).json({
      success: false,
      message: 'Sonuçlarınız getirilirken hata oluştu'
    });
  }
});

// @route   GET /api/exams/stats/overview
// @desc    Sınav istatistikleri
// @access  Public
router.get('/stats/overview', async (req, res) => {
  try {
    const totalExams = await Exam.countDocuments({ 
      'settings.isPublic': true, 
      isActive: true, 
      isPublished: true 
    });

    const totalResults = await ExamResult.countDocuments();

    const subjectStats = await Exam.aggregate([
      { 
        $match: { 
          'settings.isPublic': true, 
          isActive: true, 
          isPublished: true 
        } 
      },
      { $group: { _id: '$subject', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 }
    ]);

    const difficultyStats = await Exam.aggregate([
      { 
        $match: { 
          'settings.isPublic': true, 
          isActive: true, 
          isPublished: true 
        } 
      },
      { $group: { _id: '$difficulty', count: { $sum: 1 } } }
    ]);

    res.json({
      success: true,
      data: {
        totalExams,
        totalResults,
        subjectStats,
        difficultyStats
      }
    });
  } catch (error) {
    console.error('İstatistik hatası:', error);
    res.status(500).json({
      success: false,
      message: 'İstatistikler getirilirken hata oluştu'
    });
  }
});

module.exports = router; 