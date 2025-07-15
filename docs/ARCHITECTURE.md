# 🏗️ YBS BUDDY - TAM MİMARİ DOKÜMANI

**Proje:** YBS Buddy - Bandırma Onyeli Eylül Üniversitesi YBS Bölümü Eğitim Platformu  
**Tarih:** Aralık 2024  
**Durum:** Backend hazırlık aşaması

---

## 📋 İÇERİK

1. [Tech Stack](#-tech-stack)
2. [Mimari Yapısı](#️-mimari-yapısı)
3. [Veri Akışı](#-veri-akışı)
4. [Deploy & Hosting](#-deploy--hosting)
5. [Geliştirme Ortamı](#️-geliştirme-ortamı)
6. [Veritabanı Tasarımı](#️-veritabanı-tasarımı)
7. [API Endpoints](#-api-endpoints)
8. [Güvenlik](#-güvenlik)
9. [Yapılacaklar](#-yapılacaklar)

---

## 🎯 TECH STACK

### **Frontend**
- **Framework:** React 18 + Vite
- **Styling:** Tailwind CSS
- **Routing:** React Router DOM
- **State Management:** React Hooks (useState, useEffect)
- **HTTP Client:** Axios (eklenecek)
- **Build Tool:** Vite
- **Package Manager:** npm

### **Backend**
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB + Mongoose ODM
- **Authentication:** JWT (JSON Web Token)
- **Password Hashing:** bcryptjs
- **CORS:** cors middleware
- **Environment:** dotenv
- **Dev Tools:** nodemon

### **Database**
- **Primary:** MongoDB Atlas (Cloud)
- **ODM:** Mongoose
- **Collections:** Users, Courses, Notes, Exams, PersonalNotes

### **Deployment**
- **Frontend:** Vercel
- **Backend:** Railway/Render
- **Database:** MongoDB Atlas
- **Domain:** Custom domain (opsiyonel)

---

## 🏗️ MİMARİ YAPISI

### **Proje Klasör Yapısı**
```
ybs-buddy/
├── frontend/                    # React uygulaması
│   ├── src/
│   │   ├── components/         # UI bileşenleri
│   │   ├── pages/             # Sayfa bileşenleri
│   │   ├── data/              # Static veriler
│   │   └── utils/             # Yardımcı fonksiyonlar
│   ├── public/                # Static dosyalar
│   └── dist/                  # Build çıktısı
├── backend/                    # Node.js API (oluşturulacak)
│   ├── models/                # MongoDB modelleri
│   ├── routes/                # API route'ları
│   ├── controllers/           # İş mantığı
│   ├── middleware/            # Auth ve diğer middleware'ler
│   ├── config/                # Veritabanı ve diğer konfigürasyonlar
│   └── server.js              # Ana sunucu dosyası
├── docs/                      # Dökümantasyon
└── dist/                      # Production build
```

### **3-Tier Architecture**
```
┌─────────────────┐
│   PRESENTATION  │  → React Frontend (UI/UX)
│      LAYER      │
└─────────────────┘
          │
┌─────────────────┐
│    BUSINESS     │  → Express.js API (Logic)
│      LAYER      │
└─────────────────┘
          │
┌─────────────────┐
│      DATA       │  → MongoDB (Storage)
│      LAYER      │
└─────────────────┘
```

---

## 📡 VERİ AKIŞI

### **Request Flow**
```
User Action → React Component → API Call (Axios) → Express Route → Controller → MongoDB → Response
```

### **Authentication Flow**
```
Login Request → Credentials Check → JWT Token Generation → Token Storage (localStorage) → Protected Routes Access
```

### **Data Flow Example**
```
1. Kullanıcı "Ders Notları" sayfasını açar
2. React component useEffect ile API'ye istek atar
3. Express /api/notes endpoint'i çalışır
4. MongoDB'den user'a ait notlar çekilir
5. JSON response frontend'e döner
6. React state güncellenir, UI render olur
```

---

## 🌐 DEPLOY & HOSTING

### **Development Environment**
```
Frontend: http://localhost:5175  (Vite dev server)
Backend:  http://localhost:3000  (Express server)
Database: MongoDB Atlas cluster  (Cloud)
```

### **Production Environment**
```
Frontend: https://ybs-buddy.vercel.app
Backend:  https://ybs-buddy-api.railway.app
Database: MongoDB Atlas (same cluster)
```

### **Deployment Strategy**

#### **Frontend (Vercel)**
- **Auto-deploy:** Git push → Vercel build → Live
- **Build Command:** `npm run build`
- **Output Directory:** `frontend/dist`
- **Environment Variables:** API_URL

#### **Backend (Railway/Render)**
- **Auto-deploy:** Git push → Server restart
- **Start Command:** `node server.js`
- **Environment Variables:** 
  - `MONGODB_URI`
  - `JWT_SECRET`
  - `PORT`
  - `NODE_ENV`

#### **Database (MongoDB Atlas)**
- **Cloud hosting:** Automatic scaling
- **Backup:** Daily automated backups
- **Security:** IP whitelist + authentication

---

## 🗄️ VERİTABANI TASARIMI

### **Collections Schema**

#### **Users Collection**
```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  password: String (hashed),
  studentId: String,
  university: String,
  department: String,
  createdAt: Date,
  updatedAt: Date
}
```

#### **Notes Collection**
```javascript
{
  _id: ObjectId,
  title: String,
  content: String,
  courseCode: String,
  courseName: String,
  userId: ObjectId (ref: Users),
  tags: [String],
  isPublic: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

#### **Exams Collection**
```javascript
{
  _id: ObjectId,
  courseCode: String,
  courseName: String,
  questions: [{
    question: String,
    options: [String],
    correctAnswer: Number,
    explanation: String
  }],
  difficulty: String,
  duration: Number,
  createdAt: Date
}
```

#### **PersonalNotes Collection**
```javascript
{
  _id: ObjectId,
  title: String,
  content: String,
  userId: ObjectId (ref: Users),
  category: String,
  priority: String,
  isCompleted: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🔗 API ENDPOINTS

### **Authentication Routes**
```
POST /api/auth/register     # Kullanıcı kaydı
POST /api/auth/login        # Kullanıcı girişi
GET  /api/auth/me          # Profil bilgileri
```

### **Notes Routes**
```
GET    /api/notes          # Tüm notları listele
POST   /api/notes          # Yeni not oluştur
GET    /api/notes/:id      # Belirli not detayı
PUT    /api/notes/:id      # Not güncelle
DELETE /api/notes/:id      # Not sil
GET    /api/notes/course/:code # Ders bazında notlar
```

### **Exams Routes**
```
GET    /api/exams          # Sınav listesi
GET    /api/exams/:id      # Sınav detayı
POST   /api/exams/submit   # Sınav sonucu gönder
GET    /api/exams/results  # Sınav sonuçları
```

### **Personal Notes Routes**
```
GET    /api/personal       # Kişisel notlar
POST   /api/personal       # Yeni kişisel not
PUT    /api/personal/:id   # Kişisel not güncelle
DELETE /api/personal/:id   # Kişisel not sil
```

---

## 🔐 GÜVENLİK

### **Authentication & Authorization**
- **JWT Token:** Her istekte Authorization header'da
- **Password Hashing:** bcryptjs ile şifreleme
- **Protected Routes:** Middleware ile koruma
- **Token Expiry:** 24 saat geçerlilik

### **Data Security**
- **Input Validation:** Mongoose schema validation
- **CORS Policy:** Sadece frontend domain'inden istek
- **Environment Variables:** Hassas bilgiler .env dosyasında
- **HTTPS:** Production'da SSL sertifikası

### **Database Security**
- **MongoDB Atlas:** Built-in security features
- **IP Whitelist:** Sadece belirli IP'lerden erişim
- **Database Authentication:** Username/password
- **Connection String:** Environment variable'da saklı

---

## 🛠️ GELİŞTİRME ORTAMI

### **Local Development Setup**
```bash
# Frontend
cd frontend
npm install
npm run dev

# Backend (kurulacak)
cd backend
npm install
npm run dev

# Environment Variables
cp .env.example .env
# MongoDB URI, JWT Secret vs. ekle
```

### **Development Tools**
- **Code Editor:** VSCode + Extensions
- **API Testing:** Postman/Insomnia
- **Database GUI:** MongoDB Compass
- **Git Workflow:** Feature branches
- **Code Quality:** ESLint + Prettier

### **Scripts**
```json
{
  "dev": "cd frontend && vite",
  "build": "cd frontend && vite build",
  "lint": "cd frontend && eslint .",
  "backend:dev": "cd backend && nodemon server.js",
  "backend:start": "cd backend && node server.js"
}
```

---

## 📋 YAPILACAKLAR

### **Faz 1: Backend Kurulum**
- [ ] Express server kurulumu
- [ ] MongoDB Atlas bağlantısı
- [ ] User model ve authentication
- [ ] JWT middleware
- [ ] Basic API endpoints

### **Faz 2: CRUD Operations**
- [ ] Notes CRUD API
- [ ] Exams API
- [ ] Personal Notes API
- [ ] File upload (notlar için)

### **Faz 3: Frontend Entegrasyon**
- [ ] Axios kurulumu
- [ ] API service katmanı
- [ ] Authentication state management
- [ ] Protected routes
- [ ] Loading states

### **Faz 4: Production**
- [ ] Backend deployment (Railway/Render)
- [ ] Environment variables setup
- [ ] Frontend API URL configuration
- [ ] Testing & debugging
- [ ] Performance optimization

### **Faz 5: Advanced Features**
- [ ] Real-time notifications
- [ ] File upload/download
- [ ] Search functionality
- [ ] User profiles
- [ ] Analytics dashboard

---

## 📊 PERFORMANS & ÖLÇEKLENEBİLİRLİK

### **Performance Optimizations**
- **Frontend:** Code splitting, lazy loading
- **Backend:** Request caching, response compression
- **Database:** Indexing, query optimization

### **Scalability Considerations**
- **Horizontal Scaling:** Multiple backend instances
- **Database Scaling:** MongoDB sharding
- **CDN:** Static asset delivery
- **Caching:** Redis (gelecek feature)

---

## 📝 NOTLAR

- Bu mimari YBS müfredatına uygun olarak tasarlanmıştır
- Modern web development practices kullanılmıştır
- Öğrenme odaklı, anlaşılır kod yapısı benimsenmiştir
- Production-ready çözümler seçilmiştir
- Maliyet-etkin hosting seçenekleri tercih edilmiştir

---

**Son Güncelleme:** Aralık 2024  
**Versiyon:** 1.0  
**Proje Durumu:** Backend Hazırlık Aşaması
