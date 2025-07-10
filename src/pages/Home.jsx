import { GraduationCap, Users, Building2, Lightbulb, ArrowRight, TrendingUp, Shield, Target, Star } from 'lucide-react';

const Home = () => {
  return (
    <div className="min-h-screen relative">
      {/* YBS Professional Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-1/4 w-72 h-72 rounded-full opacity-20 blur-3xl"
               style={{background: 'linear-gradient(135deg, var(--electric-blue), var(--teal-500))'}}></div>
          <div className="absolute bottom-20 right-1/4 w-96 h-96 rounded-full opacity-15 blur-3xl"
               style={{background: 'linear-gradient(135deg, var(--modern-purple), var(--accent-cyan))'}}></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="text-center">
            {/* Professional Badge */}
            <div className="inline-flex items-center px-6 py-3 mb-8 feature-card">
              <Star className="h-5 w-5 mr-3" style={{color: 'var(--electric-blue)'}} />
              <span className="text-primary-premium">Yönetim Bilişim Sistemleri • Professional Platform</span>
            </div>
            
            {/* Main Heading */}
            <h1 className="gradient-premium mb-8 max-w-4xl mx-auto">
              Dijital Çağın Yönetim Liderleri
            </h1>
            
            {/* Description */}
            <p className="text-xl md:text-2xl text-premium max-w-4xl mx-auto mb-12 leading-relaxed">
              <strong style={{color: 'var(--navy-700)'}}>Yönetim Bilişim Sistemleri</strong> alanında uzmanlaşarak, 
              teknoloji ve stratejiyi harmanlayan geleceğin 
              <span style={{color: 'var(--electric-blue)'}}> dijital liderlerini </span>
              yetiştiren kapsamlı eğitim ekosistemi.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
              <button className="btn-premium group px-10 py-4 text-lg font-bold">
                <span className="flex items-center justify-center">
                  Eğitime Başla
                  <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-2 transition-transform" />
                </span>
              </button>
              <button className="btn-secondary-premium px-10 py-4 text-lg font-semibold">
                <span className="flex items-center justify-center">
                  <TrendingUp className="mr-3 h-5 w-5" />
                  Kariyer Yolları
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* YBS Professional Definition - Featured Section */}
      <section className="py-16 md:py-24 relative">
        {/* Background Stripe */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
        <div className="absolute inset-0 opacity-30">
          <div className="h-full w-full bg-gradient-to-r from-transparent via-blue-50/20 to-transparent"></div>
        </div>
        
        {/* Decorative Lines */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-200/30 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-200/30 to-transparent"></div>
        
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            {/* Special Badge */}
            <div className="inline-flex items-center px-8 py-4 mb-8 card-premium border-2" style={{borderColor: 'rgba(14, 165, 233, 0.2)'}}>
              <div className="w-3 h-3 rounded-full mr-4" style={{
                background: 'linear-gradient(135deg, var(--electric-blue), var(--teal-500))',
                boxShadow: '0 0 12px rgba(14, 165, 233, 0.4)'
              }}></div>
              <span className="text-lg font-bold" style={{color: 'var(--navy-700)'}}>
                Management Information Systems • Professional Discipline
              </span>
            </div>
            
            <h2 className="gradient-premium mb-8 text-4xl md:text-5xl lg:text-6xl">
              Yönetim Bilişim Sistemleri
            </h2>
            <p className="text-xl md:text-2xl text-premium max-w-4xl mx-auto leading-relaxed">
              Modern iş dünyasının <strong style={{color: 'var(--electric-blue)'}}>dijital dönüşüm liderleri</strong> yetiştiren 
              stratejik disiplin. <strong style={{color: 'var(--teal-600)'}}>Teknoloji ve yönetim biliminin</strong> mükemmel entegrasyonu.
            </p>
          </div>
        </div>
      </section>

      {/* Visual Technology Gallery */}
      <section className="py-12 md:py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-6 py-3 mb-6 feature-card">
              <div className="w-2 h-2 rounded-full mr-3" style={{backgroundColor: 'var(--electric-blue)'}}></div>
              <span className="text-sm font-medium" style={{color: 'var(--teal-600)'}}>Professional Technology Focus</span>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold mb-4" style={{
              background: 'linear-gradient(135deg, var(--navy-800) 0%, var(--electric-blue) 50%, var(--teal-600) 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent'
            }}>
              Teknoloji ve Yönetimin Buluşması
            </h3>
            <p className="text-lg text-premium max-w-2xl mx-auto">
              <strong style={{color: 'var(--navy-700)'}}>Yapay zeka, siber güvenlik, veri analizi</strong> ve 
              <strong style={{color: 'var(--electric-blue)'}}> kurumsal stratejilerin mükemmel uyumu</strong>
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {[
              {
                icon: '🧠',
                title: 'Yapay Zeka & ML',
                description: 'Akıllı Sistemler',
                gradient: 'from-purple-500 to-indigo-600'
              },
              {
                icon: '🔐',
                title: 'Siber Güvenlik',
                description: 'Kurumsal Koruma',
                gradient: 'from-red-500 to-pink-600'
              },
              {
                icon: '📊',
                title: 'Veri Bilimi',
                description: 'İş Zekası',
                gradient: 'from-blue-500 to-cyan-600'
              },
              {
                icon: '🏢',
                title: 'Kurumsal Yönetim',
                description: 'Stratejik Liderlik',
                gradient: 'from-emerald-500 to-teal-600'
              },
              {
                icon: '⚡',
                title: 'Dijital Dönüşüm',
                description: 'İnovasyon',
                gradient: 'from-yellow-500 to-orange-600'
              },
              {
                icon: '🌐',
                title: 'Bulut Teknolojileri',
                description: 'Ölçeklenebilir Çözümler',
                gradient: 'from-sky-500 to-blue-600'
              },
              {
                icon: '🔧',
                title: 'Yazılım Mimarisi',
                description: 'Sistem Tasarımı',
                gradient: 'from-violet-500 to-purple-600'
              },
              {
                icon: '📈',
                title: 'İş Analizi',
                description: 'Performans Optimizasyonu',
                gradient: 'from-green-500 to-emerald-600'
              }
            ].map((item, index) => (
              <div 
                key={index}
                className="group relative feature-card text-center p-6 cursor-pointer transform transition-all duration-500 hover:scale-110 hover:z-10"
              >
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-10 rounded-20 transition-opacity duration-500`}></div>
                
                {/* Icon */}
                <div className="text-4xl md:text-5xl mb-4 transform group-hover:scale-125 transition-transform duration-300">
                  {item.icon}
                </div>
                
                {/* Content */}
                <h4 className="text-sm md:text-base font-bold text-primary-premium mb-2 group-hover:text-electric-blue transition-colors duration-300">
                  {item.title}
                </h4>
                <p className="text-xs md:text-sm text-premium opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                  {item.description}
                </p>
                
                {/* Hover Effect Circle */}
                <div className="absolute inset-0 rounded-20 bg-gradient-to-br from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* YBS Comprehensive Information - Compact */}
      <section className="py-12 md:py-16 relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="card-premium">
            {/* Section Header - Compact */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center px-4 py-2 mb-4 feature-card">
                <Building2 className="h-4 w-4 mr-2" style={{color: 'var(--teal-600)'}} />
                <span className="text-base font-semibold text-primary-premium">Akademik Mükemmellik & Kariyer Vizyonu</span>
              </div>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-8 items-start">
              {/* Left Column - Academic Information */}
              <div className="space-y-4">
                <p className="text-base text-premium leading-relaxed mb-6">
                  <strong style={{color: 'var(--navy-700)'}}>Yönetim Bilişim Sistemleri</strong>, teknoloji ve iş stratejilerini 
                  harmanlayarak <strong style={{color: 'var(--electric-blue)'}}> analitik düşünce ile yönetim vizyonunu birleştiren </strong>
                  geleceğin liderlerini yetiştirmektedir.
                </p>
                
                <div className="space-y-4">
                  <div className="feature-card group">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg transition-all duration-300 group-hover:scale-110">
                        <GraduationCap className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-primary-premium mb-2">Akademik Mükemmellik</h3>
                        <p className="text-sm text-premium">1990'lı yıllardan bu yana Türkiye'de sürekli büyüyen ve gelişen 
                        <strong style={{color: 'var(--teal-600)'}}> stratejik öneme sahip </strong> akademik disiplin.</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="feature-card group">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg transition-all duration-300 group-hover:scale-110">
                        <Building2 className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-primary-premium mb-2">Geniş Akademik Ekosistem</h3>
                        <p className="text-sm text-premium">Türkiye'de <strong style={{color: 'var(--electric-blue)'}}>50'den fazla</strong> 
                        prestijli üniversitede aktif programa sahip güçlü akademik ağ.</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="feature-card group">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-violet-600 rounded-xl flex items-center justify-center shadow-lg transition-all duration-300 group-hover:scale-110">
                        <Users className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-primary-premium mb-2">Üst Düzey Kariyer Fırsatları</h3>
                        <p className="text-sm text-premium">Sistem mimarlığı, dijital strateji, iş analizi, veri bilimi, 
                        teknoloji yönetimi gibi <strong style={{color: 'var(--teal-600)'}}>yüksek katma değerli</strong> pozisyonlar.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Right Column - Professional Focus Areas */}
              <div className="space-y-4">
                <div className="feature-card group">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg transition-all duration-300 group-hover:scale-110">
                      <Lightbulb className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-primary-premium mb-2">Teknoloji Liderliği</h3>
                      <p className="text-sm text-premium">Gelişen teknolojileri iş süreçlerine entegre eden, 
                      <strong style={{color: 'var(--electric-blue)'}}> teknoloji vizyoneri </strong> yaklaşım.</p>
                    </div>
                  </div>
                </div>
                
                <div className="feature-card group">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg transition-all duration-300 group-hover:scale-110">
                      <TrendingUp className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-primary-premium mb-2">Stratejik Yönetim Vizyonu</h3>
                      <p className="text-sm text-premium">Kurumsal hedefleri teknoloji ile buluşturan, 
                      <strong style={{color: 'var(--teal-600)'}}> stratejik düşünce </strong> becerileri.</p>
                    </div>
                  </div>
                </div>
                
                <div className="feature-card group">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-rose-600 rounded-xl flex items-center justify-center shadow-lg transition-all duration-300 group-hover:scale-110">
                      <Star className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-primary-premium mb-2">İnovasyon & Dönüşüm</h3>
                      <p className="text-sm text-premium">Organizasyonlarda dijital dönüşümü yöneten, 
                      <strong style={{color: 'var(--electric-blue)'}}> inovasyon odaklı </strong> liderlik anlayışı.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Career Guide - Ultra Modern */}
      <section className="py-20 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 left-1/4 w-32 h-32 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full animate-pulse"></div>
          <div className="absolute bottom-10 right-1/4 w-48 h-48 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 rounded-full animate-pulse delay-700"></div>
          <div className="absolute top-1/2 left-10 w-24 h-24 bg-gradient-to-r from-green-400/20 to-emerald-400/20 rounded-full animate-pulse delay-1000"></div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="relative">
            {/* Neural Network Background Pattern */}
            <div className="absolute inset-0 opacity-10 dark:opacity-20">
              <svg className="w-full h-full" viewBox="0 0 400 400" fill="none">
                <defs>
                  <linearGradient id="neural-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#8b5cf6" />
                    <stop offset="50%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#06b6d4" />
                  </linearGradient>
                </defs>
                {/* Neural connections */}
                <g stroke="url(#neural-gradient)" strokeWidth="1" fill="none">
                  <circle cx="100" cy="100" r="3" fill="url(#neural-gradient)" opacity="0.8">
                    <animate attributeName="r" values="3;6;3" dur="2s" repeatCount="indefinite" />
                  </circle>
                  <circle cx="200" cy="80" r="3" fill="url(#neural-gradient)" opacity="0.6">
                    <animate attributeName="r" values="3;5;3" dur="2.5s" repeatCount="indefinite" />
                  </circle>
                  <circle cx="300" cy="120" r="3" fill="url(#neural-gradient)" opacity="0.7">
                    <animate attributeName="r" values="3;7;3" dur="1.8s" repeatCount="indefinite" />
                  </circle>
                  <line x1="100" y1="100" x2="200" y2="80" opacity="0.4">
                    <animate attributeName="opacity" values="0.2;0.8;0.2" dur="3s" repeatCount="indefinite" />
                  </line>
                  <line x1="200" y1="80" x2="300" y2="120" opacity="0.4">
                    <animate attributeName="opacity" values="0.2;0.6;0.2" dur="2.5s" repeatCount="indefinite" />
                  </line>
                </g>
              </svg>
            </div>

            {/* Main AI Card */}
            <div className="relative bg-gradient-to-br from-slate-50/95 via-blue-50/90 to-purple-50/95 dark:from-slate-900/95 dark:via-blue-950/90 dark:to-purple-950/95 backdrop-blur-xl rounded-3xl border border-white/20 dark:border-slate-700/30 shadow-2xl overflow-hidden">
              
              {/* Floating Orbs */}
              <div className="absolute top-6 right-6 w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full opacity-20 animate-bounce"></div>
              <div className="absolute bottom-6 left-6 w-12 h-12 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full opacity-30 animate-pulse"></div>
              
              <div className="relative z-10 p-8 md:p-12">
                {/* Header */}
                <div className="text-center mb-12">
                  <div className="inline-flex items-center justify-center mb-6">
                    <div className="relative">
                      {/* Rotating AI Icon */}
                      <div className="w-20 h-20 bg-gradient-to-br from-purple-500 via-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-2xl animate-pulse">
                        <Target className="h-10 w-10 text-white animate-spin" style={{animationDuration: '10s'}} />
                      </div>
                      <div className="absolute -inset-2 bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 rounded-2xl opacity-20 blur-lg animate-pulse"></div>
                      {/* Orbiting dots */}
                      <div className="absolute -inset-8">
                        <div className="w-3 h-3 bg-purple-400 rounded-full absolute top-0 left-1/2 transform -translate-x-1/2 animate-ping"></div>
                        <div className="w-2 h-2 bg-blue-400 rounded-full absolute bottom-0 right-0 animate-pulse delay-500"></div>
                        <div className="w-2 h-2 bg-cyan-400 rounded-full absolute top-1/2 left-0 animate-pulse delay-1000"></div>
                      </div>
                    </div>
                  </div>
                  
                  <h2 className="text-4xl md:text-6xl font-black bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent mb-6 leading-tight">
                    AI Destekli Kariyer Rehberi
                  </h2>
                  <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-cyan-500 mx-auto mb-8 rounded-full"></div>
                </div>

                {/* Features Grid */}
                <div className="grid md:grid-cols-3 gap-6 mb-12">
                  <div className="group p-6 rounded-2xl bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border border-white/40 dark:border-slate-700/40 hover:scale-105 transition-all duration-300">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-4 group-hover:rotate-12 transition-transform duration-300">
                      <Users className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="font-bold text-slate-800 dark:text-slate-200 mb-2">Kişilik Analizi</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Benzersiz kişilik özelliklerinizi AI ile keşfedin</p>
                  </div>

                  <div className="group p-6 rounded-2xl bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border border-white/40 dark:border-slate-700/40 hover:scale-105 transition-all duration-300">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mb-4 group-hover:rotate-12 transition-transform duration-300">
                      <TrendingUp className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="font-bold text-slate-800 dark:text-slate-200 mb-2">Yetenek Değerlendirmesi</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Güçlü yönlerinizi ve potansiyelinizi belirleyin</p>
                  </div>

                  <div className="group p-6 rounded-2xl bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border border-white/40 dark:border-slate-700/40 hover:scale-105 transition-all duration-300">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mb-4 group-hover:rotate-12 transition-transform duration-300">
                      <Target className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="font-bold text-slate-800 dark:text-slate-200 mb-2">Kariyer Hedefleme</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Size en uygun uzmanlık alanını keşfedin</p>
                  </div>
                </div>

                {/* Main Description */}
                <div className="text-center mb-12">
                  <p className="text-lg md:text-xl text-slate-700 dark:text-slate-300 leading-relaxed max-w-4xl mx-auto">
                    Hangi YBS uzmanlık alanında kariyer yapacağınızı belirleme konusunda profesyonel rehberlik mi arıyorsunuz? 
                    <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600"> Yapay zeka destekli değerlendirme sistemimiz</span> ile 
                    kişilik analizi, yetenek değerlendirmesi ve kariyer hedeflerinize en uygun uzmanlık alanını keşfedin.
                  </p>
                </div>

                {/* Coming Soon Badge */}
                <div className="text-center">
                  <div className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-cyan-500/20 backdrop-blur-sm rounded-2xl border border-white/30 dark:border-slate-700/30 shadow-xl">
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <Lightbulb className="h-6 w-6 text-purple-600 dark:text-purple-400 animate-pulse" />
                        <div className="absolute -inset-1 bg-purple-500/30 rounded-full blur animate-ping"></div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-slate-800 dark:text-slate-200">Geliştirme Aşamasında</div>
                        <div className="text-sm text-slate-600 dark:text-slate-400">2024 Yılında Sizlerle</div>
                      </div>
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce delay-100"></div>
                        <div className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce delay-200"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home; 