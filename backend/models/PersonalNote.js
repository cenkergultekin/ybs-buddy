const mongoose = require('mongoose');

const personalNoteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Not başlığı gereklidir'],
    trim: true,
    maxlength: [150, 'Başlık 150 karakterden uzun olamaz']
  },
  content: {
    type: String,
    required: [true, 'Not içeriği gereklidir'],
    trim: true
  },
  type: {
    type: String,
    required: [true, 'Not tipi gereklidir'],
    enum: [
      'Genel Not',
      'Görev Listesi',
      'Ders Planı',
      'Ödev Takibi',
      'Proje Notları',
      'Sınav Programı',
      'Kişisel Hedefler',
      'Önemli Bilgiler',
      'Hatırlatmalar',
      'Fikirler'
    ],
    default: 'Genel Not'
  },
  priority: {
    type: String,
    enum: ['Düşük', 'Orta', 'Yüksek', 'Kritik'],
    default: 'Orta'
  },
  color: {
    type: String,
    enum: ['blue', 'green', 'yellow', 'red', 'purple', 'pink', 'indigo', 'gray'],
    default: 'blue'
  },
  tags: [{
    type: String,
    trim: true,
    maxlength: [25, 'Etiket 25 karakterden uzun olamaz']
  }],
  // Görev listesi özellikleri
  isTaskList: {
    type: Boolean,
    default: false
  },
  tasks: [{
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: [200, 'Görev başlığı 200 karakterden uzun olamaz']
    },
    description: {
      type: String,
      trim: true,
      maxlength: [500, 'Görev açıklaması 500 karakterden uzun olamaz']
    },
    isCompleted: {
      type: Boolean,
      default: false
    },
    priority: {
      type: String,
      enum: ['Düşük', 'Orta', 'Yüksek'],
      default: 'Orta'
    },
    dueDate: {
      type: Date,
      default: null
    },
    completedAt: {
      type: Date,
      default: null
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  // Hatırlatma özellikleri
  reminders: [{
    title: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      trim: true
    },
    reminderDate: {
      type: Date,
      required: true
    },
    isActive: {
      type: Boolean,
      default: true
    },
    isCompleted: {
      type: Boolean,
      default: false
    },
    reminderType: {
      type: String,
      enum: ['Bir kez', 'Günlük', 'Haftalık', 'Aylık'],
      default: 'Bir kez'
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  // Dosya ekleri
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
  // Sıralama ve organizasyon
  position: {
    type: Number,
    default: 0
  },
  folder: {
    type: String,
    trim: true,
    maxlength: [50, 'Klasör adı 50 karakterden uzun olamaz'],
    default: 'Genel'
  },
  // Notun sahibi
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  // Durum bilgileri
  isPinned: {
    type: Boolean,
    default: false
  },
  isArchived: {
    type: Boolean,
    default: false
  },
  isDeleted: {
    type: Boolean,
    default: false
  },
  lastModified: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// İndeksler
personalNoteSchema.index({ owner: 1, createdAt: -1 });
personalNoteSchema.index({ owner: 1, type: 1 });
personalNoteSchema.index({ owner: 1, folder: 1 });
personalNoteSchema.index({ owner: 1, isPinned: -1, createdAt: -1 });
personalNoteSchema.index({ tags: 1 });
personalNoteSchema.index({ title: 'text', content: 'text' });

// Virtual fields
personalNoteSchema.virtual('taskCount').get(function() {
  return this.tasks ? this.tasks.length : 0;
});

personalNoteSchema.virtual('completedTaskCount').get(function() {
  return this.tasks ? this.tasks.filter(task => task.isCompleted).length : 0;
});

personalNoteSchema.virtual('pendingTaskCount').get(function() {
  return this.tasks ? this.tasks.filter(task => !task.isCompleted).length : 0;
});

personalNoteSchema.virtual('activeReminderCount').get(function() {
  return this.reminders ? this.reminders.filter(reminder => reminder.isActive && !reminder.isCompleted).length : 0;
});

personalNoteSchema.virtual('attachmentCount').get(function() {
  return this.attachments ? this.attachments.length : 0;
});

personalNoteSchema.virtual('progress').get(function() {
  if (!this.isTaskList || this.taskCount === 0) return 0;
  return Math.round((this.completedTaskCount / this.taskCount) * 100);
});

// Pre-save middleware
personalNoteSchema.pre('save', function(next) {
  if (this.isModified() && !this.isNew) {
    this.lastModified = new Date();
  }
  
  // Görev tamamlandığında tarihi kaydet
  this.tasks.forEach(task => {
    if (task.isCompleted && !task.completedAt) {
      task.completedAt = new Date();
    } else if (!task.isCompleted && task.completedAt) {
      task.completedAt = null;
    }
  });
  
  next();
});

// Instance methods
personalNoteSchema.methods.addTask = function(taskData) {
  this.tasks.push({
    title: taskData.title,
    description: taskData.description || '',
    priority: taskData.priority || 'Orta',
    dueDate: taskData.dueDate || null
  });
  
  if (!this.isTaskList) {
    this.isTaskList = true;
  }
  
  return this.save();
};

personalNoteSchema.methods.completeTask = function(taskId) {
  const task = this.tasks.id(taskId);
  if (task) {
    task.isCompleted = true;
    task.completedAt = new Date();
  }
  return this.save();
};

personalNoteSchema.methods.uncompleteTask = function(taskId) {
  const task = this.tasks.id(taskId);
  if (task) {
    task.isCompleted = false;
    task.completedAt = null;
  }
  return this.save();
};

personalNoteSchema.methods.removeTask = function(taskId) {
  this.tasks.pull(taskId);
  
  if (this.tasks.length === 0) {
    this.isTaskList = false;
  }
  
  return this.save();
};

personalNoteSchema.methods.addReminder = function(reminderData) {
  this.reminders.push({
    title: reminderData.title,
    description: reminderData.description || '',
    reminderDate: reminderData.reminderDate,
    reminderType: reminderData.reminderType || 'Bir kez'
  });
  return this.save();
};

personalNoteSchema.methods.completeReminder = function(reminderId) {
  const reminder = this.reminders.id(reminderId);
  if (reminder) {
    reminder.isCompleted = true;
    reminder.isActive = false;
  }
  return this.save();
};

personalNoteSchema.methods.togglePin = function() {
  this.isPinned = !this.isPinned;
  return this.save();
};

personalNoteSchema.methods.archive = function() {
  this.isArchived = true;
  this.isPinned = false;
  return this.save();
};

personalNoteSchema.methods.unarchive = function() {
  this.isArchived = false;
  return this.save();
};

personalNoteSchema.methods.softDelete = function() {
  this.isDeleted = true;
  this.isPinned = false;
  return this.save();
};

personalNoteSchema.methods.restore = function() {
  this.isDeleted = false;
  return this.save();
};

// Static methods
personalNoteSchema.statics.findActiveNotes = function(userId) {
  return this.find({
    owner: userId,
    isDeleted: false,
    isArchived: false
  }).sort({ isPinned: -1, createdAt: -1 });
};

personalNoteSchema.statics.findByFolder = function(userId, folder) {
  return this.find({
    owner: userId,
    folder: folder,
    isDeleted: false,
    isArchived: false
  }).sort({ isPinned: -1, createdAt: -1 });
};

personalNoteSchema.statics.findByType = function(userId, type) {
  return this.find({
    owner: userId,
    type: type,
    isDeleted: false,
    isArchived: false
  }).sort({ isPinned: -1, createdAt: -1 });
};

personalNoteSchema.statics.searchNotes = function(userId, searchTerm) {
  return this.find({
    $and: [
      { owner: userId },
      { isDeleted: false },
      {
        $or: [
          { title: { $regex: searchTerm, $options: 'i' } },
          { content: { $regex: searchTerm, $options: 'i' } },
          { tags: { $in: [new RegExp(searchTerm, 'i')] } }
        ]
      }
    ]
  }).sort({ isPinned: -1, createdAt: -1 });
};

personalNoteSchema.statics.getUpcomingReminders = function(userId) {
  const now = new Date();
  const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000);
  
  return this.find({
    owner: userId,
    isDeleted: false,
    'reminders.isActive': true,
    'reminders.isCompleted': false,
    'reminders.reminderDate': {
      $gte: now,
      $lte: tomorrow
    }
  });
};

module.exports = mongoose.model('PersonalNote', personalNoteSchema); 