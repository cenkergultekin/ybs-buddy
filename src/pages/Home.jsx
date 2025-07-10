import { GraduationCap, Users, Building2, Lightbulb, ArrowRight, TrendingUp, Shield, Target, Star } from 'lucide-react';

const Home = () => {
  return (
    <div className="pt-18 min-h-screen relative z-10">
      {/* Premium Hero Section */}
      <section className="py-16 pb-24 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-50 to-violet-50 dark:from-blue-950 dark:to-violet-950 rounded-full border border-blue-200/30 dark:border-blue-800/30 mb-8">
              <Star className="h-4 w-4 text-blue-600 dark:text-blue-400 mr-2" />
              <span className="text-sm font-medium text-primary-premium">Premium Learning Platform</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl gradient-premium mb-8 leading-tight">
              YBS-Buddy Professional
            </h1>
            <p className="text-lg md:text-xl text-secondary-premium mb-12 max-w-3xl mx-auto leading-relaxed">
              Yönetim Bilişim Sistemleri alanında liderlik yapmak isteyen profesyoneller için tasarlanmış 
              gelişmiş eğitim platformu. Üniversite müfredatından endüstri standartlarına kadar kapsamlı öğrenme deneyimi.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-8">
              <button className="btn-premium group">
                <span className="flex items-center">
                  Platformu Keşfet 
                  <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
              <button className="btn-secondary-premium">
                <span className="flex items-center">
                  <TrendingUp className="mr-3 h-5 w-5" />
                  Kariyer Rehberi
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Premium YBS Information */}
      <section className="py-16 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="card-premium">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl gradient-premium mb-6">
                Yönetim Bilişim Sistemleri
              </h2>
              <p className="text-base text-secondary-premium max-w-2xl mx-auto">
                Modern iş dünyasının dijital dönüşüm liderleri yetiştiren stratejik disiplin
              </p>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <p className="text-lg md:text-xl text-premium leading-relaxed">
                  <strong className="text-primary-premium">Yönetim Bilişim Sistemleri (YBS)</strong>, teknoloji ve iş stratejilerini 
                  harmanlayarak kurumsal çözümler üreten, dijital çağın en prestijli mesleki alanlarından biridir. 
                  Analitik düşünce ile yönetim vizyonunu birleştiren geleceğin liderlerini yetiştirmektedir.
                </p>
                
                <div className="grid gap-6">
                  <div className="feature-card">
                    <div className="flex items-start space-x-4">
                      <div className="icon-premium">
                        <GraduationCap className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-primary-premium mb-2">Akademik Gelişim</h3>
                        <p className="text-secondary-premium">1990'lı yıllardan bu yana Türkiye'de sürekli büyüyen ve gelişen akademik bir disiplin.</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="feature-card">
                    <div className="flex items-start space-x-4">
                      <div className="icon-premium">
                        <Building2 className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-primary-premium mb-2">Geniş Akademik Ağ</h3>
                        <p className="text-secondary-premium">Türkiye'de <strong className="text-accent-premium">50'den fazla</strong> prestijli üniversitede aktif programa sahip.</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="feature-card">
                    <div className="flex items-start space-x-4">
                      <div className="icon-premium">
                        <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-primary-premium mb-2">Premium Kariyer Fırsatları</h3>
                        <p className="text-secondary-premium">
                          Sistem mimarlığı, dijital strateji, iş analizi, veri bilimi, 
                          teknoloji yönetimi gibi yüksek katma değerli pozisyonlar.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="card-premium bg-gradient-to-br from-blue-50/50 to-violet-100/50 dark:from-blue-950/50 dark:to-violet-900/50 border border-blue-200/30 dark:border-blue-800/30">
                <div className="text-center space-y-8">
                  <div className="w-32 h-32 mx-auto bg-gradient-to-br from-blue-100 to-violet-100 dark:from-blue-900 dark:to-violet-900 rounded-full flex items-center justify-center shadow-lg">
                    <Lightbulb className="h-16 w-16 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-primary-premium">
                    Uzmanlık Alanları
                  </h3>
                  <div className="grid grid-cols-2 gap-4 text-left">
                    {[
                      'Kurumsal Yönetim', 'Bilgi Teknolojileri', 'Sistem Mimarisi', 'Veri Bilimi',
                      'Proje Liderliği', 'E-İş Stratejileri', 'Dijital Dönüşüm', 'İş Zekası & Analitik'
                    ].map((item, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Shield className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                        <span className="text-premium text-sm font-medium">{item}</span>
                      </div>
                    ))}
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