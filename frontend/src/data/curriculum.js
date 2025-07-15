// Bandırma Onyedi Eylül Üniversitesi YBS Müfredatı
// Bu veri backend entegrasyonunda kullanılacak

export const curriculum = {
  '1': {
    'Güz': {
      title: '1. Sınıf Güz Dönemi',
      zorunlu: [
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
      seçmeli: [],
      staj: [],
      usd: []
    },
    'Bahar': {
      title: '1. Sınıf Bahar Dönemi',
      zorunlu: [
        'Atatürk İlkeleri ve İnkılap Tarihi II',
        'Türk Dili II',
        'Matematik II',
        'İnsan Bilgisayar Etkileşimi',
        'Ofis Programları',
        'Yönetim ve Organizasyon',
        'Veri Yapıları',
        'Bilgisayar Ağları ve Yönetimi',
        'Yabancı Dil II (İngilizce)'
      ],
      seçmeli: [],
      staj: [],
      usd: []
    }
  },
  '2': {
    'Güz': {
      title: '2. Sınıf Güz Dönemi',
      zorunlu: [
        'Nesne Tabanlı Programlama',
        'Veri Tabanı Yönetim Sistemleri',
        'İstatistik',
        'Bilgisayarlı Muhasebe',
        'Hukukun Temel Kavramları',
        'Pazarlama Yönetimi'
      ],
      seçmeli: [
        'Akademik Türkçe',
        'Yazılım Mimarileri',
        'Yönetim Bilişim ve Haberleşme Sistemleri',
        'Oyun Teorisi',
        'Nicel Veri Analizi Uygulamaları',
        'Grafik Tasarımı'
      ],
      staj: [],
      usd: []
    },
    'Bahar': {
      title: '2. Sınıf Bahar Dönemi',
      zorunlu: [
        'Görsel Programlama',
        'İşletim Sistemleri Yönetimi',
        'Veri Tabanı Programlama',
        'Üretim Yönetimi',
        'Bilişim Hukuku ve Etiği',
        'Mesleki İngilizce'
      ],
      seçmeli: [
        'Akademik Türkçe',
        'Yöneylem Araştırması',
        'Genel Ekonomi',
        'İşletme Enformatiği',
        'Python Programlama',
        'Süreç Analizi',
        'Satranç'
      ],
      staj: [],
      usd: []
    }
  },
  '3': {
    'Güz': {
      title: '3. Sınıf Güz Dönemi',
      zorunlu: [
        'Staj',
        'Veri Madenciliği',
        'Web Tasarım ve İnternet Programlama I',
        'Finansal Yönetim',
        'Üniversite Seçmeli Ders (Güz Dönemi)'
      ],
      seçmeli: [
        'Toplam Kalite Yönetimi',
        'Coğrafi Bilgi Sistemleri',
        'Siber Güvenlik',
        'Tedarik Zinciri Yönetimi',
        'Karar Destek Sistemleri',
        'Maliyet Muhasebesi',
        'Dijital Okuryazarlık',
        'Tüketici Davranışları'
      ],
      staj: [],
      usd: []
    },
    'Bahar': {
      title: '3. Sınıf Bahar Dönemi',
      zorunlu: [
        'Staj',
        'Mobil Programlama',
        'Web Tasarım ve İnternet Programlama II',
        'Örgütsel Davranış',
        'Üniversite Seçmeli Ders (Bahar Dönemi)'
      ],
      seçmeli: [
        'Araştırma Yöntemleri',
        'Yapay Zeka',
        'Girişimcilik',
        'Sistem Analizi ve Tasarımı',
        'Yönetim Muhasebesi',
        'Müşteri İlişkileri Yönetimi (CRM)',
        'Örgütsel İletişim',
        'Sektör Buluşmaları'
      ],
      staj: [],
      usd: []
    }
  },
  '4': {
    'Güz': {
      title: '4. Sınıf Güz Dönemi',
      zorunlu: [
        'Stratejik Yönetim',
        'Ağ ve Sistem Güvenliği',
        'Veri Raporlama Uygulamaları'
      ],
      seçmeli: [
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
      staj: [],
      usd: []
    },
    'Bahar': {
      title: '4. Sınıf Bahar Dönemi',
      zorunlu: [
        'İnsan Kaynakları Yönetimi',
        'E-Ticaret ve E-Devlet',
        'Bilişim Projesi Yönetimi'
      ],
      seçmeli: [
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
      ],
      staj: [],
      usd: []
    }
  }
};

// Müfredat için yardımcı fonksiyonlar
export const getCoursesForSemester = (classNum, semester, type = 'all') => {
  if (!classNum || !semester) return [];
  const classKey = classNum.toString().charAt(0);
  const semesterData = curriculum[classKey]?.[semester];
  
  if (!semesterData) return [];
  
  switch (type) {
    case 'zorunlu':
      return semesterData.zorunlu || [];
    case 'seçmeli':
      return semesterData.seçmeli || [];
    case 'staj':
      return semesterData.staj || [];
    case 'usd':
      return semesterData.usd || [];
    case 'all':
    default:
      return [
        ...semesterData.zorunlu,
        ...semesterData.seçmeli,
        ...semesterData.staj,
        ...semesterData.usd
      ];
  }
};

export const getAllCourses = () => {
  const allCourses = [];
  Object.values(curriculum).forEach(classData => {
    Object.values(classData).forEach(semesterData => {
      const courses = [
        ...semesterData.zorunlu,
        ...semesterData.seçmeli,
        ...semesterData.staj,
        ...semesterData.usd
      ];
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
  Object.values(curriculum[classNum]).forEach(semesterData => {
    const semesterCourses = [
      ...semesterData.zorunlu,
      ...semesterData.seçmeli,
      ...semesterData.staj,
      ...semesterData.usd
    ];
    semesterCourses.forEach(course => {
      if (!courses.includes(course)) {
        courses.push(course);
      }
    });
  });
  return courses.sort((a, b) => a.localeCompare(b, 'tr'));
};

export const getSemesterTitle = (classNum, semester) => {
  const classKey = classNum.toString().charAt(0);
  return curriculum[classKey]?.[semester]?.title || '';
};

export const getCoursesByType = (classNum, semester) => {
  const classKey = classNum.toString().charAt(0);
  const semesterData = curriculum[classKey]?.[semester];
  
  if (!semesterData) return null;
  
  return {
    title: semesterData.title,
    zorunlu: semesterData.zorunlu,
    seçmeli: semesterData.seçmeli,
    staj: semesterData.staj,
    usd: semesterData.usd
  };
}; 