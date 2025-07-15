const express = require('express');
const PersonalNote = require('../models/PersonalNote');
const { auth } = require('../middleware/auth');
const router = express.Router();

// @route   GET /api/personal
// @desc    Kullanıcının tüm aktif kişisel notlarını getir
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const { 
      type, 
      folder, 
      priority, 
      search, 
      page = 1, 
      limit = 20,
      sortBy = 'createdAt',
      sortOrder = 'desc',
      includeArchived = false
    } = req.query;

    // Filtre objesi oluştur
    let filter = { 
      owner: req.user._id, 
      isDeleted: false 
    };

    if (!includeArchived || includeArchived === 'false') {
      filter.isArchived = false;
    }

    if (type && type !== 'all') {
      filter.type = type;
    }

    if (folder && folder !== 'all') {
      filter.folder = folder;
    }

    if (priority && priority !== 'all') {
      filter.priority = priority;
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
    if (sortBy === 'priority') {
      sortObj = { isPinned: -1, priority: 1, createdAt: -1 };
    } else {
      sortObj.isPinned = -1;
      sortObj[sortBy] = sortOrder === 'desc' ? -1 : 1;
    }

    // Pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const notes = await PersonalNote.find(filter)
      .sort(sortObj)
      .skip(skip)
      .limit(parseInt(limit))
      .lean();

    const total = await PersonalNote.countDocuments(filter);

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
    console.error('Kişisel notları getirme hatası:', error);
    res.status(500).json({
      success: false,
      message: 'Notlar getirilirken hata oluştu'
    });
  }
});

// @route   GET /api/personal/:id
// @desc    Tek kişisel not detayını getir
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    const note = await PersonalNote.findOne({
      _id: req.params.id,
      owner: req.user._id,
      isDeleted: false
    });

    if (!note) {
      return res.status(404).json({
        success: false,
        message: 'Not bulunamadı'
      });
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

// @route   POST /api/personal
// @desc    Yeni kişisel not oluştur
// @access  Private
router.post('/', auth, async (req, res) => {
  try {
    const { 
      title, 
      content, 
      type, 
      priority, 
      color, 
      tags, 
      folder, 
      isTaskList,
      tasks,
      reminders
    } = req.body;

    if (!title || !content) {
      return res.status(400).json({
        success: false,
        message: 'Başlık ve içerik gereklidir'
      });
    }

    const note = new PersonalNote({
      title,
      content,
      type: type || 'Genel Not',
      priority: priority || 'Orta',
      color: color || 'blue',
      tags: tags || [],
      folder: folder || 'Genel',
      isTaskList: isTaskList || false,
      tasks: tasks || [],
      reminders: reminders || [],
      owner: req.user._id
    });

    await note.save();

    res.status(201).json({
      success: true,
      message: 'Kişisel not başarıyla oluşturuldu',
      data: { note }
    });
  } catch (error) {
    console.error('Kişisel not oluşturma hatası:', error);
    
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

// @route   PUT /api/personal/:id
// @desc    Kişisel not güncelle
// @access  Private
router.put('/:id', auth, async (req, res) => {
  try {
    const note = await PersonalNote.findOne({
      _id: req.params.id,
      owner: req.user._id,
      isDeleted: false
    });

    if (!note) {
      return res.status(404).json({
        success: false,
        message: 'Not bulunamadı'
      });
    }

    const { 
      title, 
      content, 
      type, 
      priority, 
      color, 
      tags, 
      folder,
      isTaskList,
      tasks,
      reminders
    } = req.body;

    // Güncellenebilir alanları kontrol et ve güncelle
    if (title) note.title = title;
    if (content) note.content = content;
    if (type) note.type = type;
    if (priority) note.priority = priority;
    if (color) note.color = color;
    if (tags !== undefined) note.tags = tags;
    if (folder) note.folder = folder;
    if (isTaskList !== undefined) note.isTaskList = isTaskList;
    if (tasks !== undefined) note.tasks = tasks;
    if (reminders !== undefined) note.reminders = reminders;

    await note.save();

    res.json({
      success: true,
      message: 'Not başarıyla güncellendi',
      data: { note }
    });
  } catch (error) {
    console.error('Kişisel not güncelleme hatası:', error);
    
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

// @route   DELETE /api/personal/:id
// @desc    Kişisel not sil (soft delete)
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const note = await PersonalNote.findOne({
      _id: req.params.id,
      owner: req.user._id,
      isDeleted: false
    });

    if (!note) {
      return res.status(404).json({
        success: false,
        message: 'Not bulunamadı'
      });
    }

    await note.softDelete();

    res.json({
      success: true,
      message: 'Not başarıyla silindi'
    });
  } catch (error) {
    console.error('Kişisel not silme hatası:', error);
    res.status(500).json({
      success: false,
      message: 'Not silinirken hata oluştu'
    });
  }
});

// @route   POST /api/personal/:id/pin
// @desc    Notu sabitle/sabitlemeyi kaldır
// @access  Private
router.post('/:id/pin', auth, async (req, res) => {
  try {
    const note = await PersonalNote.findOne({
      _id: req.params.id,
      owner: req.user._id,
      isDeleted: false
    });

    if (!note) {
      return res.status(404).json({
        success: false,
        message: 'Not bulunamadı'
      });
    }

    await note.togglePin();

    res.json({
      success: true,
      message: note.isPinned ? 'Not sabitlendi' : 'Not sabitleme kaldırıldı',
      data: { isPinned: note.isPinned }
    });
  } catch (error) {
    console.error('Sabitleme hatası:', error);
    res.status(500).json({
      success: false,
      message: 'Sabitleme işlemi sırasında hata oluştu'
    });
  }
});

// @route   POST /api/personal/:id/archive
// @desc    Notu arşivle
// @access  Private
router.post('/:id/archive', auth, async (req, res) => {
  try {
    const note = await PersonalNote.findOne({
      _id: req.params.id,
      owner: req.user._id,
      isDeleted: false
    });

    if (!note) {
      return res.status(404).json({
        success: false,
        message: 'Not bulunamadı'
      });
    }

    await note.archive();

    res.json({
      success: true,
      message: 'Not arşivlendi'
    });
  } catch (error) {
    console.error('Arşivleme hatası:', error);
    res.status(500).json({
      success: false,
      message: 'Arşivleme işlemi sırasında hata oluştu'
    });
  }
});

// @route   POST /api/personal/:id/unarchive
// @desc    Notu arşivden çıkar
// @access  Private
router.post('/:id/unarchive', auth, async (req, res) => {
  try {
    const note = await PersonalNote.findOne({
      _id: req.params.id,
      owner: req.user._id,
      isArchived: true
    });

    if (!note) {
      return res.status(404).json({
        success: false,
        message: 'Arşivlenmiş not bulunamadı'
      });
    }

    await note.unarchive();

    res.json({
      success: true,
      message: 'Not arşivden çıkarıldı'
    });
  } catch (error) {
    console.error('Arşivden çıkarma hatası:', error);
    res.status(500).json({
      success: false,
      message: 'Arşivden çıkarma işlemi sırasında hata oluştu'
    });
  }
});

// @route   POST /api/personal/:id/tasks
// @desc    Nota görev ekle
// @access  Private
router.post('/:id/tasks', auth, async (req, res) => {
  try {
    const { title, description, priority, dueDate } = req.body;

    if (!title) {
      return res.status(400).json({
        success: false,
        message: 'Görev başlığı gereklidir'
      });
    }

    const note = await PersonalNote.findOne({
      _id: req.params.id,
      owner: req.user._id,
      isDeleted: false
    });

    if (!note) {
      return res.status(404).json({
        success: false,
        message: 'Not bulunamadı'
      });
    }

    await note.addTask({
      title,
      description,
      priority,
      dueDate
    });

    res.status(201).json({
      success: true,
      message: 'Görev başarıyla eklendi',
      data: { note }
    });
  } catch (error) {
    console.error('Görev ekleme hatası:', error);
    res.status(500).json({
      success: false,
      message: 'Görev eklenirken hata oluştu'
    });
  }
});

// @route   PUT /api/personal/:id/tasks/:taskId/complete
// @desc    Görevi tamamla/tamamlamayı geri al
// @access  Private
router.put('/:id/tasks/:taskId/complete', auth, async (req, res) => {
  try {
    const { isCompleted } = req.body;

    const note = await PersonalNote.findOne({
      _id: req.params.id,
      owner: req.user._id,
      isDeleted: false
    });

    if (!note) {
      return res.status(404).json({
        success: false,
        message: 'Not bulunamadı'
      });
    }

    if (isCompleted) {
      await note.completeTask(req.params.taskId);
    } else {
      await note.uncompleteTask(req.params.taskId);
    }

    res.json({
      success: true,
      message: isCompleted ? 'Görev tamamlandı' : 'Görev tamamlanması geri alındı',
      data: { note }
    });
  } catch (error) {
    console.error('Görev tamamlama hatası:', error);
    res.status(500).json({
      success: false,
      message: 'Görev durumu güncellenirken hata oluştu'
    });
  }
});

// @route   DELETE /api/personal/:id/tasks/:taskId
// @desc    Görevi sil
// @access  Private
router.delete('/:id/tasks/:taskId', auth, async (req, res) => {
  try {
    const note = await PersonalNote.findOne({
      _id: req.params.id,
      owner: req.user._id,
      isDeleted: false
    });

    if (!note) {
      return res.status(404).json({
        success: false,
        message: 'Not bulunamadı'
      });
    }

    await note.removeTask(req.params.taskId);

    res.json({
      success: true,
      message: 'Görev silindi',
      data: { note }
    });
  } catch (error) {
    console.error('Görev silme hatası:', error);
    res.status(500).json({
      success: false,
      message: 'Görev silinirken hata oluştu'
    });
  }
});

// @route   POST /api/personal/:id/reminders
// @desc    Nota hatırlatma ekle
// @access  Private
router.post('/:id/reminders', auth, async (req, res) => {
  try {
    const { title, description, reminderDate, reminderType } = req.body;

    if (!title || !reminderDate) {
      return res.status(400).json({
        success: false,
        message: 'Hatırlatma başlığı ve tarihi gereklidir'
      });
    }

    const note = await PersonalNote.findOne({
      _id: req.params.id,
      owner: req.user._id,
      isDeleted: false
    });

    if (!note) {
      return res.status(404).json({
        success: false,
        message: 'Not bulunamadı'
      });
    }

    await note.addReminder({
      title,
      description,
      reminderDate,
      reminderType
    });

    res.status(201).json({
      success: true,
      message: 'Hatırlatma başarıyla eklendi',
      data: { note }
    });
  } catch (error) {
    console.error('Hatırlatma ekleme hatası:', error);
    res.status(500).json({
      success: false,
      message: 'Hatırlatma eklenirken hata oluştu'
    });
  }
});

// @route   GET /api/personal/folders
// @desc    Kullanıcının klasörlerini getir
// @access  Private
router.get('/folders/list', auth, async (req, res) => {
  try {
    const folders = await PersonalNote.distinct('folder', {
      owner: req.user._id,
      isDeleted: false
    });

    res.json({
      success: true,
      data: { folders }
    });
  } catch (error) {
    console.error('Klasör listesi hatası:', error);
    res.status(500).json({
      success: false,
      message: 'Klasörler getirilirken hata oluştu'
    });
  }
});

// @route   GET /api/personal/stats
// @desc    Kullanıcının kişisel not istatistikleri
// @access  Private
router.get('/stats/overview', auth, async (req, res) => {
  try {
    const totalNotes = await PersonalNote.countDocuments({
      owner: req.user._id,
      isDeleted: false,
      isArchived: false
    });

    const archivedNotes = await PersonalNote.countDocuments({
      owner: req.user._id,
      isDeleted: false,
      isArchived: true
    });

    const taskNotes = await PersonalNote.countDocuments({
      owner: req.user._id,
      isDeleted: false,
      isTaskList: true
    });

    const pinnedNotes = await PersonalNote.countDocuments({
      owner: req.user._id,
      isDeleted: false,
      isPinned: true
    });

    const typeStats = await PersonalNote.aggregate([
      { 
        $match: { 
          owner: req.user._id, 
          isDeleted: false, 
          isArchived: false 
        } 
      },
      { $group: { _id: '$type', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    const priorityStats = await PersonalNote.aggregate([
      { 
        $match: { 
          owner: req.user._id, 
          isDeleted: false, 
          isArchived: false 
        } 
      },
      { $group: { _id: '$priority', count: { $sum: 1 } } }
    ]);

    res.json({
      success: true,
      data: {
        totalNotes,
        archivedNotes,
        taskNotes,
        pinnedNotes,
        typeStats,
        priorityStats
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

// @route   GET /api/personal/reminders/upcoming
// @desc    Yaklaşan hatırlatmaları getir
// @access  Private
router.get('/reminders/upcoming', auth, async (req, res) => {
  try {
    const notes = await PersonalNote.getUpcomingReminders(req.user._id);

    const upcomingReminders = [];
    notes.forEach(note => {
      note.reminders.forEach(reminder => {
        if (reminder.isActive && !reminder.isCompleted) {
          const now = new Date();
          const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000);
          
          if (reminder.reminderDate >= now && reminder.reminderDate <= tomorrow) {
            upcomingReminders.push({
              noteId: note._id,
              noteTitle: note.title,
              reminder: reminder
            });
          }
        }
      });
    });

    res.json({
      success: true,
      data: { reminders: upcomingReminders }
    });
  } catch (error) {
    console.error('Yaklaşan hatırlatmalar hatası:', error);
    res.status(500).json({
      success: false,
      message: 'Hatırlatmalar getirilirken hata oluştu'
    });
  }
});

module.exports = router; 