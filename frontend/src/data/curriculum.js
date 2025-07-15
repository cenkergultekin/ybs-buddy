// Bandırma Onyedi Eylül Üniversitesi YBS Müfredatı
// Bu veri backend entegrasyonunda kullanılacak

export const curriculum = {
  '1': {
    'Güz': [
      'Atatürk İlkeleri ve İnkılap Tarihi I',
      'Kariyer Planlama',
      'Türk Dili I',
      'Bilgisayar Programlamaya Giriş',
      'Matematik I',
      'Yönetim Bilişim Sistemlerine Giriş',
      'Davranış Bilimleri',
      'Genel İşletme',
      'Bilgisayar Donanımı',
      'Yabancı Dil I (İngilizce)'
    ],
    'Bahar': [
      'Atatürk İlkeleri ve İnkılap Tarihi II',
      'Türk Dili II',
      'Matematik II',
      'İnsan Bilgisayar Etkileşimi',
      'Ofis Programları',
      'Yönetim ve Organizasyon',
      'Veri Yapıları',
      'Bilgisayar Ağları ve Yönetimi',
      'Yabancı Dil II (İngilizce)'
    ]
  },
  '2': {
    'Güz': [
      'Nesne Tabanlı Programlama',
      'Veri Tabanı Yönetim Sistemleri',
      'İstatistik',
      'Bilgisayarlı Muhasebe',
      'Hukukun Temel Kavramları',
      'Pazarlama Yönetimi',
      'Akademik Türkçe',
      'Yazılım Mimarileri',
      'Yönetim Bilişim ve Haberleşme Sistemleri',
      'Oyun Teorisi',
      'Nicel Veri Analizi Uygulamaları',
      'Grafik Tasarımı'
    ],
    'Bahar': [
      'Görsel Programlama',
      'İşletim Sistemleri Yönetimi',
      'Veri Tabanı Programlama',
      'Üretim Yönetimi',
      'Bilişim Hukuku ve Etiği',
      'Mesleki İngilizce',
      'Yöneylem Araştırması',
      'Genel Ekonomi',
      'İşletme Enformatiği',
      'Python Programlama',
      'Süreç Analizi',
      'Satranç'
    ]
  },
  '3': {
    'Güz': [
      'Veri Madenciliği',
      'Web Tasarım ve İnternet Programlama I',
      'Finansal Yönetim',
      'Toplam Kalite Yönetimi',
      'Coğrafi Bilgi Sistemleri',
      'Siber Güvenlik',
      'Tedarik Zinciri Yönetimi',
      'Karar Destek Sistemleri',
      'Maliyet Muhasebesi',
      'Dijital Okuryazarlık',
      'Tüketici Davranışları'
    ],
    'Bahar': [
      'Mobil Programlama',
      'Web Tasarım ve İnternet Programlama II',
      'Örgütsel Davranış',
      'Araştırma Yöntemleri',
      'Yapay Zeka',
      'Girişimcilik',
      'Sistem Analizi ve Tasarımı',
      'Yönetim Muhasebesi',
      'Müşteri İlişkileri Yönetimi (CRM)',
      'Örgütsel İletişim',
      'Sektör Buluşmaları'
    ]
  },
  '4': {
    'Güz': [
      'Stratejik Yönetim',
      'Ağ ve Sistem Güvenliği',
      'Veri Raporlama Uygulamaları',
      'UML Modelleme',
      'Çağdaş Yönetim Yaklaşımları',
      'Üretim-Planlama-Kontrol',
      'Oyun Programlama',
      'Depolama ve Envanter Yönetimi',
      'İletişim ve Etkili Sunum Teknikleri',
      'Zaman Serileri',
      'Proje Yönetimi',
      'Yazılım Sınama ve Doğrulama',
      'İş Süreçleri Analizi'
    ],
    'Bahar': [
      'İnsan Kaynakları Yönetimi',
      'E-Ticaret ve E-Devlet',
      'Bilişim Projesi Yönetimi',
      'Kurumsal Kaynak Planlama',
      'Örgütsel Performans ve Yönetimi',
      'Bilişim Teknolojilerinin Afet Yönetiminde Kullanımı',
      'İş ve Sosyal Güvenlik Hukuku',
      'Kurumsal Yönetişim',
      'Nesnelerin İnterneti',
      'Uluslararası İşletmecilik',
      'Sosyal Medya',
      'Hedef Pazar Planlama',
      'Büyük Veri'
    ]
  }
};

// Müfredat için yardımcı fonksiyonlar
export const getCoursesForSemester = (classNum, semester) => {
  if (!classNum || !semester) return [];
  const classKey = classNum.toString().charAt(0); // '1. Sınıf' -> '1' veya '1' -> '1'
  return curriculum[classKey]?.[semester] || [];
};

export const getAllCourses = () => {
  const allCourses = [];
  Object.values(curriculum).forEach(classData => {
    Object.values(classData).forEach(courses => {
      courses.forEach(course => {
        if (!allCourses.includes(course)) {
          allCourses.push(course);
        }
      });
    });
  });
  return allCourses.sort((a, b) => a.localeCompare(b, 'tr'));
};

export const getCoursesForClass = (classNum) => {
  if (!curriculum[classNum]) return [];
  const courses = [];
  Object.values(curriculum[classNum]).forEach(semesterCourses => {
    semesterCourses.forEach(course => {
      if (!courses.includes(course)) {
        courses.push(course);
      }
    });
  });
  return courses.sort((a, b) => a.localeCompare(b, 'tr'));
}; 