# YBS Buddy

YBS öğrencileri için kapsamlı eğitim platformu (React + Tailwind + Firebase)

## 📁 Proje Yapısı

```
ybs-buddy/
├── frontend/                    # Frontend React uygulaması
│   ├── src/                    # React kaynak kodları
│   │   ├── components/         # Yeniden kullanılabilir bileşenler
│   │   ├── pages/             # Sayfa bileşenleri
│   │   ├── data/              # Static veriler (müfredat vb.)
│   │   └── assets/            # Statik dosyalar
│   ├── public/                # Public dosyalar
│   ├── index.html             # Ana HTML dosyası
│   └── vite.config.js         # Vite konfigürasyonu
├── docs/                      # Proje dokümantasyonu
│   ├── buddy.prd              # Ürün Gereksinim Dokümanı
│   ├── LOGO-INTEGRATION.md    # Logo entegrasyon kılavuzu
│   └── yapilacaklar.md        # Geliştirme planı
├── backend/                   # Backend dosyaları (gelecekte)
└── package.json              # Proje bağımlılıkları
```

## 🚀 Kurulum

```bash
# Proje dizinine git
cd ybs-buddy

# Bağımlılıkları yükle
npm install

# Geliştirme sunucusunu başlat
npm run dev

# Build al
npm run build
```

## 🛠️ Teknoloji Stack

- **Frontend:** React.js + Vite
- **Styling:** Tailwind CSS  
- **Icons:** Heroicons + Lucide React
- **Backend:** Firebase (Auth + Firestore) - Planlanıyor
- **Deployment:** Vercel

## 📋 Özellikler

- ✅ Responsive tasarım
- ✅ Dark/Light theme desteği
- ✅ Müfredat sistemi
- ✅ Ders notları bölümü
- ✅ Sınav simülasyonu
- ✅ Kişisel not alma
- 🔄 Backend entegrasyonu (devam ediyor)

## 🎯 Backend Hazırlığı

Proje backend entegrasyonuna hazır durumda:
- Static datalar temizlendi
- Müfredat verisi `frontend/src/data/curriculum.js`'de saklanıyor
- API endpoint'leri için placeholder'lar mevcut
