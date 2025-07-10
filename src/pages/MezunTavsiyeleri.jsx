import React, { useState } from 'react';
import {
  HeartIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  ShareIcon,
  StarIcon,
  FunnelIcon,
  MagnifyingGlassIcon,
  UserCircleIcon,
  BuildingOfficeIcon,
  CalendarIcon,
  MapPinIcon,
  AcademicCapIcon,
  BriefcaseIcon,
  FireIcon,
  TrophyIcon,
  BookmarkIcon,
  EyeIcon,
  SparklesIcon,
  CheckBadgeIcon
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon, StarIcon as StarSolidIcon } from '@heroicons/react/24/solid';

function MezunTavsiyeleri() {
  const [selectedCategory, setSelectedCategory] = useState('Tümü');
  const [selectedCompany, setSelectedCompany] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [likedPosts, setLikedPosts] = useState(new Set([1, 3, 5]));
  const [savedPosts, setSavedPosts] = useState(new Set([2, 4]));
  const [followedUsers, setFollowedUsers] = useState(new Set([1, 3]));

  const categories = [
    { name: 'Tümü', count: 24, icon: '📋', color: 'from-gray-400 to-gray-500' },
    { name: 'Kariyer', count: 8, icon: '💼', color: 'from-blue-400 to-cyan-500' },
    { name: 'Akademik', count: 6, icon: '🎓', color: 'from-green-400 to-emerald-500' },
    { name: 'Staj', count: 7, icon: '🚀', color: 'from-purple-400 to-pink-500' },
    { name: 'Genel', count: 3, icon: '💡', color: 'from-orange-400 to-red-500' }
  ];

  const companies = ['Tümü', 'Microsoft Turkey', 'Akbank', 'Trendyol', 'Deloitte', 'Aselsan', 'İş Bankası', 'Turkcell', 'Garanti BBVA'];
  const graduationYears = ['Tümü', '2023', '2022', '2021', '2020', '2019', '2018'];

  const adviceData = [
    {
      id: 1,
      author: {
        name: 'Ahmet Yılmaz',
        graduationYear: 2022,
        currentPosition: 'Senior Software Engineer',
        company: 'Microsoft Turkey',
        location: 'İstanbul',
        avatar: '👨‍💻',
        verified: true,
        followers: 1250,
        following: 340
      },
      category: 'Kariyer',
      title: 'Microsoft\'ta Çalışmak ve Teknoloji Dünyasındaki Deneyimlerim',
      content: 'YBS mezunu olarak Microsoft\'ta çalışmaya başladığımda, teknik bilgilerin yanında iş analizi ve proje yönetimi becerilerimin ne kadar değerli olduğunu fark ettim. Özellikle stakeholder\'larla iletişim kurma ve iş gereksinimlerini teknik çözümlere dönüştürme konusunda YBS eğitimi çok işime yaradı...',
      tags: ['Microsoft', 'Yazılım Geliştirme', 'Kariyer', 'İş Analizi'],
      likes: 147,
      comments: 23,
      shares: 8,
      views: 890,
      timeAgo: '2 gün önce',
      trending: true,
      featured: true
    },
    {
      id: 2,
      author: {
        name: 'Elif Demir',
        graduationYear: 2021,
        currentPosition: 'Business Analyst',
        company: 'Akbank',
        location: 'İstanbul',
        avatar: '👩‍💼',
        verified: true,
        followers: 890,
        following: 210
      },
      category: 'Kariyer',
      title: 'Bankacılık Sektöründe YBS Mezunu Olmak',
      content: 'Akbank\'ta Business Analyst olarak çalışırken, YBS eğitiminin bana sağladığı hem teknik hem de iş perspektifi çok büyük avantaj sağlıyor. Finansal süreçleri analiz etme, dijital dönüşüm projelerine katkı sağlama ve veri analitiği konularında kendimi şanslı hissediyorum...',
      tags: ['Bankacılık', 'İş Analizi', 'Finans', 'Dijital Dönüşüm'],
      likes: 89,
      comments: 15,
      shares: 12,
      views: 654,
      timeAgo: '1 hafta önce',
      trending: false,
      featured: false
    },
    {
      id: 3,
      author: {
        name: 'Mehmet Özkan',
        graduationYear: 2020,
        currentPosition: 'Product Manager',
        company: 'Trendyol',
        location: 'İstanbul',
        avatar: '🧑‍💻',
        verified: true,
        followers: 2100,
        following: 450
      },
      category: 'Staj',
      title: 'E-ticaret Dünyasında Staj Deneyimi ve Kariyer Gelişimi',
      content: 'Trendyol\'da stajyer olarak başladığım yolculukta, e-ticaret platformlarının kompleks yapısını anlama fırsatı buldum. YBS\'den gelen sistem düşüncesi ve analitik yaklaşım, product management alanında çok işime yaradı. Staj döneminde aldığım mentörlük ve projeler sayesinde...',
      tags: ['E-ticaret', 'Staj', 'Product Management', 'Mentörlük'],
      likes: 203,
      comments: 34,
      shares: 19,
      views: 1240,
      timeAgo: '3 gün önce',
      trending: true,
      featured: true
    },
    {
      id: 4,
      author: {
        name: 'Ayşe Kara',
        graduationYear: 2023,
        currentPosition: 'Consultant',
        company: 'Deloitte',
        location: 'Ankara',
        avatar: '👩‍🎓',
        verified: false,
        followers: 340,
        following: 180
      },
      category: 'Akademik',
      title: 'Yüksek Lisans ve Danışmanlık Kariyeri',
      content: 'YBS lisans eğitimim sonrası Deloitte\'ta consultant olarak çalışmaya başladım. Aynı zamanda yüksek lisans eğitimime devam ediyorum. Akademik düşünce ile pratik iş deneyimini harmanlama konusunda YBS\'nin multidisipliner yapısı...',
      tags: ['Danışmanlık', 'Yüksek Lisans', 'Akademik', 'Deloitte'],
      likes: 67,
      comments: 11,
      shares: 6,
      views: 423,
      timeAgo: '5 gün önce',
      trending: false,
      featured: false
    },
    {
      id: 5,
      author: {
        name: 'Can Yıldız',
        graduationYear: 2019,
        currentPosition: 'Systems Engineer',
        company: 'Aselsan',
        location: 'Ankara',
        avatar: '👨‍🔧',
        verified: true,
        followers: 750,
        following: 290
      },
      category: 'Kariyer',
      title: 'Savunma Sanayinde Sistem Mühendisliği',
      content: 'Aselsan\'da sistem mühendisi olarak çalışırken, YBS eğitimimin bana sağladığı sistem bakış açısı ve proje yönetimi becerileri büyük fark yaratıyor. Karmaşık savunma projelerinde farklı disiplinleri koordine etme...',
      tags: ['Savunma Sanayi', 'Sistem Mühendisliği', 'Proje Yönetimi'],
      likes: 156,
      comments: 28,
      shares: 14,
      views: 780,
      timeAgo: '1 gün önce',
      trending: true,
      featured: false
    },
    {
      id: 6,
      author: {
        name: 'Zeynep Aksoy',
        graduationYear: 2022,
        currentPosition: 'Data Analyst',
        company: 'İş Bankası',
        location: 'İstanbul',
        avatar: '👩‍📊',
        verified: true,
        followers: 620,
        following: 150
      },
      category: 'Staj',
      title: 'Bankacılıkta Veri Analizi ve Staj Süreci',
      content: 'İş Bankası\'nda veri analisti olarak çalışırken, üniversite dönemindeki staj deneyimlerimin ne kadar önemli olduğunu anlıyorum. YBS müfredatındaki istatistik ve veri tabanı dersleri, günlük işimde...',
      tags: ['Veri Analizi', 'Bankacılık', 'Staj', 'İstatistik'],
      likes: 98,
      comments: 17,
      shares: 9,
      views: 567,
      timeAgo: '4 gün önce',
      trending: false,
      featured: false
    },
    {
      id: 7,
      author: {
        name: 'Emre Özgür',
        graduationYear: 2021,
        currentPosition: 'Digital Marketing Specialist',
        company: 'Turkcell',
        location: 'İstanbul',
        avatar: '👨‍💼',
        verified: false,
        followers: 430,
        following: 320
      },
      category: 'Genel',
      title: 'Telekomünikasyon Sektöründe Dijital Pazarlama',
      content: 'Turkcell\'de dijital pazarlama uzmanı olarak çalışırken, YBS eğitiminin bana kazandırdığı analitik düşünce ve teknoloji anlayışı çok işime yaradı. Müşteri verilerini analiz etme, campaign performance\'ı ölçme...',
      tags: ['Dijital Pazarlama', 'Telekomünikasyon', 'Analitik', 'Müşteri Analizi'],
      likes: 112,
      comments: 19,
      shares: 7,
      views: 645,
      timeAgo: '6 gün önce',
      trending: false,
      featured: false
    },
    {
      id: 8,
      author: {
        name: 'Selin Kaya',
        graduationYear: 2020,
        currentPosition: 'Risk Analyst',
        company: 'Garanti BBVA',
        location: 'İstanbul',
        avatar: '👩‍💻',
        verified: true,
        followers: 890,
        following: 240
      },
      category: 'Akademik',
      title: 'Risk Yönetimi ve Akademik Çalışmalar',
      content: 'Garanti BBVA\'da risk analisti olarak çalışırken, aynı zamanda akademik araştırmalarıma devam ediyorum. YBS\'nin interdisipliner yapısı, risk modellemesi ve finansal analiz konularında...',
      tags: ['Risk Yönetimi', 'Akademik Araştırma', 'Finansal Analiz'],
      likes: 134,
      comments: 22,
      shares: 11,
      views: 712,
      timeAgo: '1 hafta önce',
      trending: false,
      featured: true
    }
  ];

  const filteredAdvice = adviceData.filter(advice => {
    const matchesCategory = selectedCategory === 'Tümü' || advice.category === selectedCategory;
    const matchesCompany = !selectedCompany || selectedCompany === 'Tümü' || advice.author.company === selectedCompany;
    const matchesYear = !selectedYear || selectedYear === 'Tümü' || advice.author.graduationYear.toString() === selectedYear;
    const matchesSearch = !searchTerm || 
      advice.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      advice.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      advice.author.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      advice.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesCategory && matchesCompany && matchesYear && matchesSearch;
  });

  const featuredAdvice = filteredAdvice.filter(advice => advice.featured);
  const trendingAdvice = filteredAdvice.filter(advice => advice.trending);

  const toggleLike = (adviceId) => {
    const newLikes = new Set(likedPosts);
    if (newLikes.has(adviceId)) {
      newLikes.delete(adviceId);
    } else {
      newLikes.add(adviceId);
    }
    setLikedPosts(newLikes);
  };

  const toggleSave = (adviceId) => {
    const newSaved = new Set(savedPosts);
    if (newSaved.has(adviceId)) {
      newSaved.delete(adviceId);
    } else {
      newSaved.add(adviceId);
    }
    setSavedPosts(newSaved);
  };

  const toggleFollow = (authorId) => {
    const newFollowed = new Set(followedUsers);
    if (newFollowed.has(authorId)) {
      newFollowed.delete(authorId);
    } else {
      newFollowed.add(authorId);
    }
    setFollowedUsers(newFollowed);
  };

  const getCategoryColor = (category) => {
    const categoryData = categories.find(cat => cat.name === category);
    return categoryData?.color || 'from-gray-400 to-gray-500';
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-green-400/10 rounded-full animate-pulse delay-300"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-purple-400/10 rounded-full animate-pulse delay-700"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header */}
        <div className="text-center mb-12 animate-slide-up">
          <h1 className="heading-lg mb-4">👥 Mezun Tavsiyeleri</h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Deneyimli mezunlardan kariyer, akademik ve staj tavsiyeleri alın
          </p>
        </div>

        {/* Filters */}
        <div className="card-modern mb-8 animate-fade-in">
          <div className="flex items-center space-x-4 mb-6">
            <FunnelIcon className="w-6 h-6 text-blue-500" />
            <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200">Filtreler</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Şirket
              </label>
              <select
                value={selectedCompany}
                onChange={(e) => setSelectedCompany(e.target.value)}
                className="select-modern"
              >
                {companies.map(company => (
                  <option key={company} value={company}>{company}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Mezuniyet Yılı
              </label>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="select-modern"
              >
                {graduationYears.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Arama
              </label>
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Başlık, içerik, yazar veya etiketlerde ara..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="input-modern pl-12"
                />
              </div>
            </div>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category.name}
                onClick={() => setSelectedCategory(category.name)}
                className={`mobile-friendly px-6 py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105 ${
                  selectedCategory === category.name
                    ? `bg-gradient-to-r ${category.color} text-white shadow-lg`
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                <span className="mr-2">{category.icon}</span>
                {category.name}
                <span className="ml-2 text-sm opacity-75">({category.count})</span>
              </button>
            ))}
          </div>
        </div>

        {/* Featured Advice */}
        {featuredAdvice.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-4 flex items-center">
              <StarSolidIcon className="w-6 h-6 mr-3 text-yellow-500" />
              Öne Çıkan Tavsiyeler
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {featuredAdvice.slice(0, 2).map((advice) => (
                <div key={`featured-${advice.id}`} className="card-modern card-hover-float card-glow border-2 border-yellow-200 dark:border-yellow-800">
                  <div className="absolute -top-3 -right-3">
                    <span className="px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r from-yellow-400 to-orange-500 shadow-lg">
                      ⭐ Öne Çıkan
                    </span>
                  </div>
                  
                  {/* Author Info - Compact */}
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white text-xl font-bold">
                      {advice.author.avatar}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h3 className="font-semibold text-slate-800 dark:text-slate-200">{advice.author.name}</h3>
                        {advice.author.verified && (
                          <CheckBadgeIcon className="w-4 h-4 text-blue-500" />
                        )}
                      </div>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        {advice.author.currentPosition} • {advice.author.company}
                      </p>
                    </div>
                  </div>

                  <h4 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-3 line-clamp-2">
                    {advice.title}
                  </h4>
                  <p className="text-slate-600 dark:text-slate-400 text-sm mb-4 line-clamp-3">
                    {advice.content}
                  </p>

                  {/* Stats - Compact */}
                  <div className="flex items-center justify-between text-sm text-slate-500">
                    <div className="flex items-center space-x-4">
                      <span>❤️ {advice.likes}</span>
                      <span>💬 {advice.comments}</span>
                      <span>👁️ {advice.views}</span>
                    </div>
                    <span>{advice.timeAgo}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Trending */}
        {trendingAdvice.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-4 flex items-center">
              <FireIcon className="w-6 h-6 mr-3 text-red-500" />
              Trend Olan Tavsiyeler
            </h2>
            <div className="flex overflow-x-auto space-x-4 pb-4">
              {trendingAdvice.map((advice) => (
                <div key={`trending-${advice.id}`} className="min-w-[300px] card-modern">
                  <div className="flex items-center space-x-2 mb-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-red-400 to-orange-500 rounded-full flex items-center justify-center text-white text-sm">
                      {advice.author.avatar}
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-800 dark:text-slate-200 text-sm">{advice.author.name}</h4>
                      <p className="text-xs text-slate-600 dark:text-slate-400">{advice.author.company}</p>
                    </div>
                  </div>
                  <h5 className="font-bold text-slate-800 dark:text-slate-200 text-sm mb-2 line-clamp-2">
                    {advice.title}
                  </h5>
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span>🔥 {advice.likes} beğeni</span>
                    <span>{advice.timeAgo}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Results Count */}
        <div className="flex justify-between items-center mb-6">
          <div className="text-slate-600 dark:text-slate-400">
            <span className="font-semibold text-slate-800 dark:text-slate-200">{filteredAdvice.length}</span> tavsiye bulundu
          </div>
        </div>

        {/* Main Advice Feed */}
        {filteredAdvice.length === 0 ? (
          <div className="text-center py-16">
            <div className="card-modern max-w-md mx-auto">
              <UserCircleIcon className="w-16 h-16 text-slate-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-2">
                Tavsiye bulunamadı
              </h3>
              <p className="text-slate-600 dark:text-slate-400 mb-6">
                Arama kriterlerinize uygun tavsiye bulunamadı. Filtreleri değiştirmeyi deneyin.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('Tümü');
                  setSelectedCompany('');
                  setSelectedYear('');
                  setSearchTerm('');
                }}
                className="btn-ghost"
              >
                Filtreleri Temizle
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            {filteredAdvice.map((advice, index) => (
              <div 
                key={advice.id} 
                className="card-modern card-hover-float animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                
                {/* Author Header */}
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                      {advice.author.avatar}
                    </div>
                    <div>
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">
                          {advice.author.name}
                        </h3>
                        {advice.author.verified && (
                          <CheckBadgeIcon className="w-5 h-5 text-blue-500" />
                        )}
                        {advice.trending && (
                          <span className="px-2 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r from-red-400 to-orange-500">
                            🔥 Trend
                          </span>
                        )}
                      </div>
                      <p className="text-slate-600 dark:text-slate-400 mb-2">
                        {advice.author.currentPosition} • {advice.author.company}
                      </p>
                      <div className="flex items-center space-x-4 text-sm text-slate-500">
                        <div className="flex items-center space-x-1">
                          <CalendarIcon className="w-4 h-4" />
                          <span>Mezun: {advice.author.graduationYear}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MapPinIcon className="w-4 h-4" />
                          <span>{advice.author.location}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <UserCircleIcon className="w-4 h-4" />
                          <span>{advice.author.followers} takipçi</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <button
                      onClick={() => toggleFollow(advice.author.id || advice.id)}
                      className={`mobile-friendly px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                        followedUsers.has(advice.author.id || advice.id)
                          ? 'bg-blue-500 text-white'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                      }`}
                    >
                      {followedUsers.has(advice.author.id || advice.id) ? 'Takip Ediliyor' : 'Takip Et'}
                    </button>
                    <button
                      onClick={() => toggleSave(advice.id)}
                      className={`mobile-friendly p-2 rounded-xl transition-all duration-300 hover:scale-110 ${
                        savedPosts.has(advice.id)
                          ? 'bg-blue-500 text-white'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      <BookmarkIcon className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Category Badge */}
                <div className="mb-4">
                  <span className={`px-4 py-2 rounded-full text-sm font-medium text-white bg-gradient-to-r ${getCategoryColor(advice.category)}`}>
                    {categories.find(cat => cat.name === advice.category)?.icon} {advice.category}
                  </span>
                </div>

                {/* Content */}
                <div className="mb-6">
                  <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-4 leading-tight">
                    {advice.title}
                  </h2>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    {advice.content}
                  </p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {advice.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-3 py-1 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 text-blue-800 dark:text-blue-300 text-sm rounded-full font-medium"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Stats & Actions */}
                <div className="flex justify-between items-center pt-4 border-t border-slate-200/50 dark:border-slate-700/50">
                  <div className="flex items-center space-x-6 text-slate-600 dark:text-slate-400">
                    <div className="flex items-center space-x-1">
                      <EyeIcon className="w-4 h-4" />
                      <span className="text-sm">{advice.views}</span>
                    </div>
                    <span className="text-sm">{advice.timeAgo}</span>
                  </div>

                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => toggleLike(advice.id)}
                      className={`mobile-friendly flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 hover:scale-105 ${
                        likedPosts.has(advice.id)
                          ? 'bg-red-500 text-white'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                      }`}
                    >
                      {likedPosts.has(advice.id) ? (
                        <HeartSolidIcon className="w-5 h-5" />
                      ) : (
                        <HeartIcon className="w-5 h-5" />
                      )}
                      <span className="font-medium">{advice.likes}</span>
                    </button>

                    <button className="mobile-friendly flex items-center space-x-2 px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all duration-300 hover:scale-105">
                      <ChatBubbleOvalLeftEllipsisIcon className="w-5 h-5" />
                      <span className="font-medium">{advice.comments}</span>
                    </button>

                    <button className="mobile-friendly flex items-center space-x-2 px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all duration-300 hover:scale-105">
                      <ShareIcon className="w-5 h-5" />
                      <span className="font-medium">{advice.shares}</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Call to Action */}
        <div className="card-modern mt-16 text-center">
          <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-6">
            💡 Mezun Toplulukları
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center mx-auto">
                <AcademicCapIcon className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-slate-800 dark:text-slate-200">LinkedIn Grubu</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                YBS mezunları LinkedIn grubuna katılın
              </p>
            </div>
            <div className="space-y-3">
              <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center mx-auto">
                <ChatBubbleOvalLeftEllipsisIcon className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-slate-800 dark:text-slate-200">WhatsApp Grubu</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Günlük sohbet ve bilgi paylaşımı
              </p>
            </div>
            <div className="space-y-3">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl flex items-center justify-center mx-auto">
                <BriefcaseIcon className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-slate-800 dark:text-slate-200">Kariyer Etkinlikleri</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Aylık kariyer etkinlikleri ve networking
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MezunTavsiyeleri; 