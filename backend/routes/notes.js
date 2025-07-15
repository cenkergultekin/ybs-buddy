const express = require('express');
const Note = require('../models/Note');
const { auth, optionalAuth } = require('../middleware/auth');
const router = express.Router();

// @route   GET /api/notes
// @desc    Tüm public notları getir (filtreleme ve arama ile)
// @access  Public
router.get('/', optionalAuth, async (req, res) => {
  try {
    const { 
      subject, 
      category, 
      difficulty, 
      search, 
      author, 
      page = 1, 
      limit = 12,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    // Filtre objesi oluştur
    let filter = { isPublic: true, isActive: true };

    if (subject && subject !== 'all') {
      filter.subject = subject;
    }

    if (category && category !== 'all') {
      filter.category = category;
    }

    if (difficulty && difficulty !== 'all') {
      filter.difficulty = difficulty;
    }

    if (author) {
      filter.author = author;
    }

    // Arama terimi varsa
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } }
      ];
    }

    // Sıralama objesi
    let sortObj = {};
    sortObj[sortBy] = sortOrder === 'desc' ? -1 : 1;

    // Pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Notları getir
    const notes = await Note.find(filter)
      .populate('author', 'firstName lastName studentNumber profileImage')
      .populate('comments.user', 'firstName lastName profileImage')
      .sort(sortObj)
      .skip(skip)
      .limit(parseInt(limit))
      .lean();

    // Toplam not sayısı
    const total = await Note.countDocuments(filter);

    res.json({
      success: true,
      data: {
        notes,
        pagination: {
          current: parseInt(page),
          total: Math.ceil(total / parseInt(limit)),
          totalNotes: total,
          hasNext: skip + notes.length < total,
          hasPrev: parseInt(page) > 1
        }
      }
    });
  } catch (error) {
    console.error('Notları getirme hatası:', error);
    res.status(500).json({
      success: false,
      message: 'Notlar getirilirken hata oluştu'
    });
  }
});

// @route   GET /api/notes/my
// @desc    Kullanıcının kendi notlarını getir
// @access  Private
router.get('/my', auth, async (req, res) => {
  try {
    const { page = 1, limit = 12, sortBy = 'createdAt', sortOrder = 'desc' } = req.query;

    const skip = (parseInt(page) - 1) * parseInt(limit);

    let sortObj = {};
    sortObj[sortBy] = sortOrder === 'desc' ? -1 : 1;

    const notes = await Note.find({ 
      author: req.user._id,
      isActive: true 
    })
      .sort(sortObj)
      .skip(skip)
      .limit(parseInt(limit))
      .lean();

    const total = await Note.countDocuments({ 
      author: req.user._id,
      isActive: true 
    });

    res.json({
      success: true,
      data: {
        notes,
        pagination: {
          current: parseInt(page),
          total: Math.ceil(total / parseInt(limit)),
          totalNotes: total,
          hasNext: skip + notes.length < total,
          hasPrev: parseInt(page) > 1
        }
      }
    });
  } catch (error) {
    console.error('Kendi notları getirme hatası:', error);
    res.status(500).json({
      success: false,
      message: 'Notlarınız getirilirken hata oluştu'
    });
  }
});

// @route   GET /api/notes/:id
// @desc    Tek not detayını getir
// @access  Public (görüntüleme sayısını artır)
router.get('/:id', optionalAuth, async (req, res) => {
  try {
    const note = await Note.findById(req.params.id)
      .populate('author', 'firstName lastName studentNumber profileImage createdAt')
      .populate('comments.user', 'firstName lastName profileImage')
      .populate('likes.user', 'firstName lastName');

    if (!note || !note.isActive) {
      return res.status(404).json({
        success: false,
        message: 'Not bulunamadı'
      });
    }

    // Eğer not public değilse ve sahibi değilse erişim engelle
    if (!note.isPublic && (!req.user || note.author._id.toString() !== req.user._id.toString())) {
      return res.status(403).json({
        success: false,
        message: 'Bu nota erişim yetkiniz yok'
      });
    }

    // Görüntülenme sayısını artır (kendi notunu görüntülerse artırma)
    if (!req.user || note.author._id.toString() !== req.user._id.toString()) {
      await note.incrementView();
    }

    res.json({
      success: true,
      data: { note }
    });
  } catch (error) {
    console.error('Not detayı getirme hatası:', error);
    res.status(500).json({
      success: false,
      message: 'Not detayı getirilirken hata oluştu'
    });
  }
});

// @route   POST /api/notes
// @desc    Yeni not oluştur
// @access  Private
router.post('/', auth, async (req, res) => {
  try {
    const { title, content, subject, category, tags, difficulty, isPublic } = req.body;

    // Gerekli alanları kontrol et
    if (!title || !content || !subject || !category) {
      return res.status(400).json({
        success: false,
        message: 'Başlık, içerik, ders konusu ve kategori gereklidir'
      });
    }

    const note = new Note({
      title,
      content,
      subject,
      category,
      tags: tags || [],
      difficulty: difficulty || 'Orta',
      isPublic: isPublic || false,
      author: req.user._id
    });

    await note.save();

    // Populate ederek döndür
    await note.populate('author', 'firstName lastName studentNumber profileImage');

    res.status(201).json({
      success: true,
      message: 'Not başarıyla oluşturuldu',
      data: { note }
    });
  } catch (error) {
    console.error('Not oluşturma hatası:', error);
    
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
      message: 'Not oluşturulurken hata oluştu'
    });
  }
});

// @route   PUT /api/notes/:id
// @desc    Not güncelle
// @access  Private (sadece sahip)
router.put('/:id', auth, async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note || !note.isActive) {
      return res.status(404).json({
        success: false,
        message: 'Not bulunamadı'
      });
    }

    // Sadece not sahibi güncelleyebilir
    if (note.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Bu notu güncelleme yetkiniz yok'
      });
    }

    const { title, content, subject, category, tags, difficulty, isPublic } = req.body;

    // Güncellenebilir alanları kontrol et ve güncelle
    if (title) note.title = title;
    if (content) note.content = content;
    if (subject) note.subject = subject;
    if (category) note.category = category;
    if (tags !== undefined) note.tags = tags;
    if (difficulty) note.difficulty = difficulty;
    if (isPublic !== undefined) note.isPublic = isPublic;

    await note.save();
    await note.populate('author', 'firstName lastName studentNumber profileImage');

    res.json({
      success: true,
      message: 'Not başarıyla güncellendi',
      data: { note }
    });
  } catch (error) {
    console.error('Not güncelleme hatası:', error);
    
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
      message: 'Not güncellenirken hata oluştu'
    });
  }
});

// @route   DELETE /api/notes/:id
// @desc    Not sil (soft delete)
// @access  Private (sadece sahip)
router.delete('/:id', auth, async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note || !note.isActive) {
      return res.status(404).json({
        success: false,
        message: 'Not bulunamadı'
      });
    }

    // Sadece not sahibi silebilir
    if (note.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Bu notu silme yetkiniz yok'
      });
    }

    // Soft delete
    note.isActive = false;
    await note.save();

    res.json({
      success: true,
      message: 'Not başarıyla silindi'
    });
  } catch (error) {
    console.error('Not silme hatası:', error);
    res.status(500).json({
      success: false,
      message: 'Not silinirken hata oluştu'
    });
  }
});

// @route   POST /api/notes/:id/like
// @desc    Notu beğen/beğenmekten vazgeç
// @access  Private
router.post('/:id/like', auth, async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note || !note.isActive || !note.isPublic) {
      return res.status(404).json({
        success: false,
        message: 'Not bulunamadı'
      });
    }

    // Kendi notunu beğenemez
    if (note.author.toString() === req.user._id.toString()) {
      return res.status(400).json({
        success: false,
        message: 'Kendi notunuzu beğenemezsiniz'
      });
    }

    const existingLike = note.likes.find(like => like.user.toString() === req.user._id.toString());

    if (existingLike) {
      // Beğeniyi kaldır
      await note.removeLike(req.user._id);
      res.json({
        success: true,
        message: 'Beğeni kaldırıldı',
        data: { liked: false, likeCount: note.likeCount }
      });
    } else {
      // Beğeni ekle
      await note.addLike(req.user._id);
      res.json({
        success: true,
        message: 'Not beğenildi',
        data: { liked: true, likeCount: note.likeCount }
      });
    }
  } catch (error) {
    console.error('Beğeni hatası:', error);
    res.status(500).json({
      success: false,
      message: 'Beğeni işlemi sırasında hata oluştu'
    });
  }
});

// @route   POST /api/notes/:id/comment
// @desc    Nota yorum ekle
// @access  Private
router.post('/:id/comment', auth, async (req, res) => {
  try {
    const { content } = req.body;

    if (!content || content.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Yorum içeriği gereklidir'
      });
    }

    const note = await Note.findById(req.params.id);

    if (!note || !note.isActive || !note.isPublic) {
      return res.status(404).json({
        success: false,
        message: 'Not bulunamadı'
      });
    }

    await note.addComment(req.user._id, content.trim());
    await note.populate('comments.user', 'firstName lastName profileImage');

    const newComment = note.comments[note.comments.length - 1];

    res.status(201).json({
      success: true,
      message: 'Yorum başarıyla eklendi',
      data: { 
        comment: newComment,
        commentCount: note.commentCount 
      }
    });
  } catch (error) {
    console.error('Yorum ekleme hatası:', error);
    res.status(500).json({
      success: false,
      message: 'Yorum eklenirken hata oluştu'
    });
  }
});

// @route   GET /api/notes/stats/overview
// @desc    İstatistik özeti
// @access  Public
router.get('/stats/overview', async (req, res) => {
  try {
    const totalNotes = await Note.countDocuments({ isPublic: true, isActive: true });
    const totalSubjects = await Note.distinct('subject', { isPublic: true, isActive: true });
    const totalCategories = await Note.distinct('category', { isPublic: true, isActive: true });
    
    const popularSubjects = await Note.aggregate([
      { $match: { isPublic: true, isActive: true } },
      { $group: { _id: '$subject', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 }
    ]);

    res.json({
      success: true,
      data: {
        totalNotes,
        totalSubjects: totalSubjects.length,
        totalCategories: totalCategories.length,
        popularSubjects
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