const Joi = require('joi');

// Auth Validation Schemas
const authSchemas = {
  register: Joi.object({
    firstName: Joi.string()
      .min(2)
      .max(50)
      .pattern(/^[a-zA-ZğüşıöçĞÜŞİÖÇ\s]+$/)
      .required()
      .messages({
        'string.pattern.base': 'İsim sadece harf içerebilir',
        'string.min': 'İsim en az 2 karakter olmalıdır',
        'string.max': 'İsim en fazla 50 karakter olmalıdır'
      }),
    
    lastName: Joi.string()
      .min(2)
      .max(50)
      .pattern(/^[a-zA-ZğüşıöçĞÜŞİÖÇ\s]+$/)
      .required()
      .messages({
        'string.pattern.base': 'Soyisim sadece harf içerebilir',
        'string.min': 'Soyisim en az 2 karakter olmalıdır',
        'string.max': 'Soyisim en fazla 50 karakter olmalıdır'
      }),
    
    email: Joi.string()
      .email()
      .required()
      .messages({
        'string.email': 'Geçerli bir email adresi giriniz'
      }),
    
    password: Joi.string()
      .min(6)
      .max(128)
      .required()
      .messages({
        'string.min': 'Şifre en az 6 karakter olmalıdır',
        'string.max': 'Şifre en fazla 128 karakter olmalıdır'
      }),
    
    studentNumber: Joi.string()
      .pattern(/^[0-9]{8,12}$/)
      .required()
      .messages({
        'string.pattern.base': 'Öğrenci numarası 8-12 basamaklı sayı olmalıdır'
      })
  }),

  login: Joi.object({
    email: Joi.string()
      .email()
      .required()
      .messages({
        'string.email': 'Geçerli bir email adresi giriniz'
      }),
    
    password: Joi.string()
      .required()
      .messages({
        'any.required': 'Şifre gereklidir'
      })
  })
};

// Notes Validation Schemas
const noteSchemas = {
  create: Joi.object({
    title: Joi.string()
      .min(3)
      .max(200)
      .required()
      .messages({
        'string.min': 'Başlık en az 3 karakter olmalıdır',
        'string.max': 'Başlık en fazla 200 karakter olmalıdır'
      }),
    
    content: Joi.string()
      .min(10)
      .max(50000)
      .required()
      .messages({
        'string.min': 'İçerik en az 10 karakter olmalıdır',
        'string.max': 'İçerik en fazla 50.000 karakter olmalıdır'
      }),
    
    subject: Joi.string()
      .valid('matematik', 'fizik', 'kimya', 'biyoloji', 'tarih', 'cografya', 'edebiyat', 'felsefe', 'diger')
      .required()
      .messages({
        'any.only': 'Geçerli bir ders seçiniz'
      }),
    
    category: Joi.string()
      .valid('konu-anlatimi', 'ornek-sorular', 'formul-liste', 'ozet', 'diger')
      .required()
      .messages({
        'any.only': 'Geçerli bir kategori seçiniz'
      }),
    
    difficulty: Joi.string()
      .valid('baslangic', 'orta', 'ileri')
      .default('orta'),
    
    tags: Joi.array()
      .items(Joi.string().min(2).max(30))
      .max(10)
      .default([])
      .messages({
        'array.max': 'En fazla 10 etiket ekleyebilirsiniz'
      }),
    
    isPublic: Joi.boolean().default(true)
  }),

  update: Joi.object({
    title: Joi.string()
      .min(3)
      .max(200)
      .messages({
        'string.min': 'Başlık en az 3 karakter olmalıdır',
        'string.max': 'Başlık en fazla 200 karakter olmalıdır'
      }),
    
    content: Joi.string()
      .min(10)
      .max(50000)
      .messages({
        'string.min': 'İçerik en az 10 karakter olmalıdır',
        'string.max': 'İçerik en fazla 50.000 karakter olmalıdır'
      }),
    
    subject: Joi.string()
      .valid('matematik', 'fizik', 'kimya', 'biyoloji', 'tarih', 'cografya', 'edebiyat', 'felsefe', 'diger'),
    
    category: Joi.string()
      .valid('konu-anlatimi', 'ornek-sorular', 'formul-liste', 'ozet', 'diger'),
    
    difficulty: Joi.string()
      .valid('baslangic', 'orta', 'ileri'),
    
    tags: Joi.array()
      .items(Joi.string().min(2).max(30))
      .max(10),
    
    isPublic: Joi.boolean()
  })
};

// Personal Notes Validation Schemas
const personalNoteSchemas = {
  create: Joi.object({
    title: Joi.string()
      .min(1)
      .max(200)
      .required()
      .messages({
        'string.min': 'Başlık en az 1 karakter olmalıdır',
        'string.max': 'Başlık en fazla 200 karakter olmalıdır'
      }),
    
    content: Joi.string()
      .min(1)
      .max(100000)
      .required()
      .messages({
        'string.min': 'İçerik boş olamaz',
        'string.max': 'İçerik en fazla 100.000 karakter olmalıdır'
      }),
    
    type: Joi.string()
      .valid('not', 'hatirlatici', 'yapilacak', 'fikir', 'diger')
      .default('not'),
    
    folder: Joi.string()
      .max(50)
      .default('Genel')
      .messages({
        'string.max': 'Klasör adı en fazla 50 karakter olmalıdır'
      }),
    
    priority: Joi.string()
      .valid('dusuk', 'orta', 'yuksek')
      .default('orta'),
    
    tags: Joi.array()
      .items(Joi.string().min(1).max(30))
      .max(15)
      .default([])
  }),

  update: Joi.object({
    title: Joi.string()
      .min(1)
      .max(200),
    
    content: Joi.string()
      .min(1)
      .max(100000),
    
    type: Joi.string()
      .valid('not', 'hatirlatici', 'yapilacak', 'fikir', 'diger'),
    
    folder: Joi.string()
      .max(50),
    
    priority: Joi.string()
      .valid('dusuk', 'orta', 'yuksek'),
    
    tags: Joi.array()
      .items(Joi.string().min(1).max(30))
      .max(15),
    
    isArchived: Joi.boolean()
  })
};

// Validation Middleware
const validate = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body, {
      abortEarly: false, // Tüm hataları göster
      stripUnknown: true, // Bilinmeyen alanları kaldır
      convert: true // Type conversion yap
    });

    if (error) {
      const errors = error.details.map(detail => ({
        field: detail.path.join('.'),
        message: detail.message
      }));

      return res.status(400).json({
        success: false,
        message: 'Validation hatası',
        errors
      });
    }

    // Validated data'yı req.body'ye ata
    req.body = value;
    next();
  };
};

// Query Validation (GET requests için)
const validateQuery = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.query, {
      abortEarly: false,
      stripUnknown: true,
      convert: true
    });

    if (error) {
      const errors = error.details.map(detail => ({
        field: detail.path.join('.'),
        message: detail.message
      }));

      return res.status(400).json({
        success: false,
        message: 'Query validation hatası',
        errors
      });
    }

    req.query = value;
    next();
  };
};

module.exports = {
  validate,
  validateQuery,
  authSchemas,
  noteSchemas,
  personalNoteSchemas
}; 