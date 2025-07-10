import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  BookOpenIcon, 
  AcademicCapIcon, 
  PencilSquareIcon, 
  UserGroupIcon, 
  BriefcaseIcon,
  ChartBarIcon,
  FireIcon,
  TrophyIcon,
  BeakerIcon,
  CpuChipIcon,
  CodeBracketIcon,
  LightBulbIcon,
  RocketLaunchIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';

function AnaSayfa() {
  const [currentTheme, setCurrentTheme] = useState('blue');
  const [userStats, setUserStats] = useState({
    questionsToday: 23,
    studyStreak: 7,
    totalNotes: 45,
    averageScore: 87
  });
  const [notifications, setNotifications] = useState([]);

  // Theme system
  const themes = {
    blue: { name: 'Mavi', primary: '#3b82f6', secondary: '#8b5cf6' },
    purple: { name: 'Mor', primary: '#8b5cf6', secondary: '#ec4899' },
    green: { name: 'Yeşil', primary: '#10b981', secondary: '#3b82f6' }
  };

  // Apply theme
  useEffect(() => {
    document.body.className = `theme-${currentTheme} ${document.body.className.replace(/theme-\w+/g, '')}`;
  }, [currentTheme]);

  // Simulate progress notifications
  useEffect(() => {
    const welcomeNotification = {
      id: 1,
      type: 'info',
      title: 'Hoş Geldin! 🚀',
      message: 'Bugün 23 soru çözdün, harika!',
      time: new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })
    };
    
    setNotifications([welcomeNotification]);
    
    // Show notification
    setTimeout(() => {
      const notification = document.querySelector('.notification');
      if (notification) notification.classList.add('show');
    }, 1000);
  }, []);

  const modules = [
    {
      id: 'ders-notlari',
      title: 'Ders Notları',
      description: 'Tüm YBS derslerinin kapsamlı notları ve materyalleri',
      icon: BookOpenIcon,
      path: '/ders-notlari',
      color: 'from-blue-500 to-cyan-500',
      stats: '150+ Not',
      badge: 'Popüler',
      features: ['PDF İndirme', 'Hızlı Arama', 'Kategori Filtresi']
    },
    {
      id: 'sinav-simulasyonu',
      title: 'Sınav Simülasyonu',
      description: 'Gerçek sınav ortamında pratik yapın ve kendinizi test edin',
      icon: AcademicCapIcon,
      path: '/sinav-simulasyonu',
      color: 'from-purple-500 to-pink-500',
      stats: '500+ Soru',
      badge: 'Yeni',
      features: ['Gerçek Zamanlı', 'Detaylı Analiz', 'Çoklu Format']
    },
    {
      id: 'not-alma',
      title: 'Not Alma Alanı',
      description: 'Kişisel notlarınızı organize edin ve paylaşın',
      icon: PencilSquareIcon,
      path: '/not-alma',
      color: 'from-green-500 to-teal-500',
      stats: '45 Notun',
      badge: 'Güncel',
      features: ['Rich Editor', 'Klasör Sistemi', 'Arama']
    },
    {
      id: 'mezun-tavsiyeleri',
      title: 'Mezun Tavsiyeleri',
      description: 'Deneyimli mezunlardan kariyer ve akademik tavsiyeleri',
      icon: UserGroupIcon,
      path: '/mezun-tavsiyeleri',
      color: 'from-orange-500 to-red-500',
      stats: '50+ Tavsiye',
      badge: 'Trend',
      features: ['Gerçek Mezunlar', 'Kategori Filtresi', 'Etkileşim']
    },
    {
      id: 'staj-ilanlari',
      title: 'YBS Staj',
      description: 'YBS öğrencileri için özel staj fırsatları ve rehberlik',
      icon: BriefcaseIcon,
      path: '/staj-ilanlari',
      color: 'from-violet-500 to-purple-500',
      stats: '25+ İlan',
      badge: 'Özel',
      features: ['Filtreleme', 'Başvuru Takip', 'CV Şablonu']
    }
  ];

  const quickStats = [
    { label: 'Bugün Çözülen', value: userStats.questionsToday, icon: FireIcon, color: 'text-red-500' },
    { label: 'Çalışma Serisi', value: `${userStats.studyStreak} Gün`, icon: TrophyIcon, color: 'text-yellow-500' },
    { label: 'Toplam Not', value: userStats.totalNotes, icon: PencilSquareIcon, color: 'text-blue-500' },
    { label: 'Ortalama Skor', value: `%${userStats.averageScore}`, icon: ChartBarIcon, color: 'text-green-500' }
  ];

  const techFeatures = [
    { icon: CpuChipIcon, title: 'AI Destekli', desc: 'Yapay zeka ile kişiselleştirilmiş öğrenme' },
    { icon: CodeBracketIcon, title: 'Modern Stack', desc: 'React, Node.js ve modern teknolojiler' },
    { icon: LightBulbIcon, title: 'Akıllı Öneriler', desc: 'Performansınıza göre özel öneriler' },
    { icon: RocketLaunchIcon, title: 'Hızlı & Güvenilir', desc: 'Kesintisiz öğrenme deneyimi' }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-72 h-72 bg-blue-400/10 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-purple-400/10 rounded-full animate-pulse delay-700"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-green-400/10 rounded-full animate-pulse delay-1000"></div>
      </div>
      
      {/* Notifications */}
      {notifications.map(notification => (
        <div key={notification.id} className={`notification ${notification.type}`}>
          <div className="flex items-center space-x-3">
            <SparklesIcon className="w-6 h-6 text-blue-500" />
            <div>
              <h4 className="font-semibold text-slate-800 dark:text-slate-200">{notification.title}</h4>
              <p className="text-sm text-slate-600 dark:text-slate-400">{notification.message}</p>
            </div>
            <span className="text-xs text-slate-500">{notification.time}</span>
          </div>
        </div>
      ))}

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Hero Section */}
        <section className="py-16 pb-20 text-center">
          <div className="animate-slide-up">
            <div className="flex items-center justify-center space-x-4 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg">
                YBS
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-slate-800 dark:text-slate-200">
                YBS-Buddy
              </h1>
              <span className="px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm font-semibold rounded-full shadow-lg">
                Professional
              </span>
            </div>
            <p className="text-lg text-slate-600 dark:text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
              Yönetim Bilişim Sistemleri alanında liderlik yapmak isteyen profesyoneller için 
              tasarlanmış gelişmiş eğitim platformu. Üniversite müfredatından endüstri 
              standartlarına kadar kapsamlı öğrenme deneyimi.
            </p>
            
            {/* Quick Access Buttons */}
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              <Link to="/ders-notlari" className="btn-modern text-sm">Platfom Keşfet</Link>
              <a href="#career-guide" className="btn-ghost text-sm">📈 Kariyer Rehberi</a>
            </div>
            
            {/* Theme Selector */}
            <div className="flex justify-center">
              <div className="glass-card dark:glass-card-dark rounded-xl p-3">
                <span className="text-xs text-slate-600 dark:text-slate-400 mb-2 block">Tema:</span>
                <div className="flex space-x-2">
                  {Object.entries(themes).map(([key, theme]) => (
                    <button
                      key={key}
                      onClick={() => setCurrentTheme(key)}
                      className={`w-6 h-6 rounded-full transition-all duration-300 hover:scale-110 ${
                        currentTheme === key ? 'ring-3 ring-white/50 scale-110' : ''
                      }`}
                      style={{ background: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})` }}
                      title={theme.name}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Stats Dashboard */}
        <section className="mb-16 animate-fade-in">
          <h2 className="text-2xl font-bold text-center mb-8 text-slate-800 dark:text-slate-200">📊 Günlük Özet</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {quickStats.map((stat, index) => (
              <div key={index} className="stat-card card-glow animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <stat.icon className={`w-8 h-8 ${stat.color} mx-auto mb-3`} />
                <div className="stat-number">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Main Modules */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-center mb-10 text-slate-800 dark:text-slate-200">🚀 Öğrenme Modülleri</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {modules.map((module, index) => (
              <Link
                key={module.id}
                to={module.path}
                className="card-modern card-hover-float card-glow group animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Badge */}
                <div className="absolute -top-3 -right-3 z-10">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r ${module.color} shadow-lg`}>
                    {module.badge}
                  </span>
                </div>
                
                {/* Icon & Title */}
                <div className="flex items-center space-x-4 mb-6">
                  <div className={`p-4 rounded-2xl bg-gradient-to-br ${module.color} text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <module.icon className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 group-hover:text-gradient transition-all duration-300">
                      {module.title}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">{module.stats}</p>
                  </div>
                </div>
                
                {/* Description */}
                <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                  {module.description}
                </p>
                
                {/* Features */}
                <div className="space-y-2 mb-6">
                  {module.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center text-sm text-slate-500 dark:text-slate-500">
                      <div className="w-1.5 h-1.5 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full mr-3"></div>
                      {feature}
                    </div>
                  ))}
                </div>
                
                {/* Action Button */}
                <div className="flex justify-between items-center">
                  <span className="btn-ghost mobile-friendly">
                    Keşfet →
                  </span>
                  <div className="w-12 h-1 bg-gradient-to-r from-transparent via-slate-300 to-transparent opacity-50"></div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Tech Features */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-center mb-10 text-slate-800 dark:text-slate-200">⚡ Teknoloji Özellikleri</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {techFeatures.map((feature, index) => (
              <div key={index} className="card-modern text-center binary-bg animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <feature.icon className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-2">{feature.title}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">{feature.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Progress Section */}
        <section className="mb-16 text-center">
          <div className="card-modern max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-8 text-slate-800 dark:text-slate-200">📈 Gelişim Takibi</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="space-y-4">
                <div className="progress-ring">
                  <svg className="w-24 h-24 transform -rotate-90">
                    <circle
                      cx="48"
                      cy="48"
                      r="40"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="none"
                      className="text-slate-200 dark:text-slate-700"
                    />
                    <circle
                      cx="48"
                      cy="48"
                      r="40"
                      stroke="url(#gradient1)"
                      strokeWidth="8"
                      fill="none"
                      strokeLinecap="round"
                      strokeDasharray={`${2 * Math.PI * 40 * 0.75} ${2 * Math.PI * 40}`}
                    />
                    <defs>
                      <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#3b82f6" />
                        <stop offset="100%" stopColor="#8b5cf6" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                <div>
                  <div className="text-2xl font-bold text-gradient">75%</div>
                  <div className="text-slate-600 dark:text-slate-400">Ders Tamamlama</div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="progress-ring">
                  <svg className="w-24 h-24 transform -rotate-90">
                    <circle
                      cx="48"
                      cy="48"
                      r="40"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="none"
                      className="text-slate-200 dark:text-slate-700"
                    />
                    <circle
                      cx="48"
                      cy="48"
                      r="40"
                      stroke="url(#gradient2)"
                      strokeWidth="8"
                      fill="none"
                      strokeLinecap="round"
                      strokeDasharray={`${2 * Math.PI * 40 * 0.87} ${2 * Math.PI * 40}`}
                    />
                    <defs>
                      <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#10b981" />
                        <stop offset="100%" stopColor="#3b82f6" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                <div>
                  <div className="text-2xl font-bold text-gradient">87%</div>
                  <div className="text-slate-600 dark:text-slate-400">Sınav Başarısı</div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="progress-ring">
                  <svg className="w-24 h-24 transform -rotate-90">
                    <circle
                      cx="48"
                      cy="48"
                      r="40"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="none"
                      className="text-slate-200 dark:text-slate-700"
                    />
                    <circle
                      cx="48"
                      cy="48"
                      r="40"
                      stroke="url(#gradient3)"
                      strokeWidth="8"
                      fill="none"
                      strokeLinecap="round"
                      strokeDasharray={`${2 * Math.PI * 40 * 0.92} ${2 * Math.PI * 40}`}
                    />
                    <defs>
                      <linearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#ec4899" />
                        <stop offset="100%" stopColor="#8b5cf6" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                <div>
                  <div className="text-2xl font-bold text-gradient">92%</div>
                  <div className="text-slate-600 dark:text-slate-400">Aktivite Puanı</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center pb-16">
          <div className="card-modern max-w-2xl mx-auto circuit-pattern">
            <h2 className="text-3xl font-bold mb-4 text-slate-800 dark:text-slate-200">Hazır mısın? 🎯</h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 mb-8">
              YBS kariyerinde bir adım öne geç. Hemen öğrenmeye başla!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/ders-notlari" className="btn-modern mobile-friendly">
                <BeakerIcon className="w-5 h-5 mr-2" />
                Dersleri Keşfet
              </Link>
              <Link to="/sinav-simulasyonu" className="btn-ghost mobile-friendly">
                <AcademicCapIcon className="w-5 h-5 mr-2" />
                Sınavlara Hazırlan
              </Link>
            </div>
          </div>
        </section>
      </div>

      {/* Quick Access Floating Menu */}
      <div className="quick-access">
        <Link to="/ders-notlari" className="quick-btn" title="Ders Notları">
          <BookOpenIcon className="w-6 h-6" />
        </Link>
        <Link to="/sinav-simulasyonu" className="quick-btn" title="Sınav Simülasyonu">
          <AcademicCapIcon className="w-6 h-6" />
        </Link>
        <Link to="/not-alma" className="quick-btn" title="Not Al">
          <PencilSquareIcon className="w-6 h-6" />
        </Link>
        <Link to="/mezun-tavsiyeleri" className="quick-btn" title="Mezun Tavsiyeleri">
          <UserGroupIcon className="w-6 h-6" />
        </Link>
      </div>

      {/* Mobile Thumb Zone */}
      <div className="thumb-zone md:hidden">
        <ChartBarIcon className="w-6 h-6" />
      </div>
    </div>
  );
}

export default AnaSayfa; 