import { GraduationCap, Users, Building2, Lightbulb, ArrowRight, TrendingUp, Shield, Target, Star, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';

const Home = () => {
  const [visibleSections, setVisibleSections] = useState(new Set());
  const sectionRefs = useRef({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections(prev => new Set([...prev, entry.target.id]));
          } else {
            setVisibleSections(prev => {
              const newSet = new Set(prev);
              newSet.delete(entry.target.id);
              return newSet;
            });
          }
        });
      },
      { 
        threshold: 0.2,
        rootMargin: '-50px 0px -50px 0px'
      }
    );

    Object.values(sectionRefs.current).forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const isVisible = (sectionId) => visibleSections.has(sectionId);

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-gray-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      {/* 1. CLEAN HERO SECTION - Just Welcome & Teaser */}
      <section 
        id="hero"
        ref={el => sectionRefs.current.hero = el}
        className={`relative py-8 md:py-12 min-h-[60vh] flex items-center overflow-hidden transition-all duration-1000 ${
          isVisible('hero') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        {/* Decorative Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 left-1/4 w-64 h-64 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full opacity-15 blur-3xl"></div>
          <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full opacity-10 blur-3xl"></div>
        </div>
        
        <div className="max-w-6xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="text-center">
            {/* Professional Badge */}
            <div className={`inline-flex items-center px-4 py-2 mb-6 feature-card transition-all duration-700 delay-200 ${
              isVisible('hero') ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95'
            }`}>
              <Star className="h-4 w-4 mr-2 text-blue-600 dark:text-blue-400" />
              <span className="text-slate-700 dark:text-slate-300 text-sm">Yönetim Bilişim Sistemleri • Professional Platform</span>
            </div>
            
            {/* Main Heading */}
            <h1 className={`text-2xl md:text-4xl lg:text-5xl font-black mb-4 max-w-4xl mx-auto gradient-premium transition-all duration-700 delay-400 ${
              isVisible('hero') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}>
              Dijital Çağın Yönetim Liderleri
            </h1>
            
            {/* Clean Description */}
            <p className={`text-base md:text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto mb-6 leading-relaxed transition-all duration-700 delay-600 ${
              isVisible('hero') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}>
              <strong className="text-slate-800 dark:text-slate-200">Yönetim Bilişim Sistemleri</strong> alanında uzmanlaşarak, 
              teknoloji ve stratejiyi harmanlayan geleceğin 
              <span className="text-blue-600 dark:text-blue-400"> dijital liderlerini </span>
              yetiştiren kapsamlı eğitim ekosistemi.
            </p>

            {/* University Info Message */}
            <div className={`mt-4 mb-4 transition-all duration-700 delay-800 ${
              isVisible('hero') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}>
              <div className="inline-flex items-center px-4 py-2 feature-card border-2 border-blue-200/30 dark:border-blue-700/30">
                <div className="w-2 h-2 rounded-full mr-2 bg-gradient-to-br from-blue-500 to-cyan-500 shadow-sm shadow-blue-500/40"></div>
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  📍 Şu an için Bandırma Onyedi Eylül Üniversitesi bazında çalışıyoruz :)
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. YBS NEDİR? - DEPARTMENT INTRODUCTION */}
      <section 
        id="ybs-definition"
        ref={el => sectionRefs.current['ybs-definition'] = el}
        className={`py-8 md:py-12 relative transition-all duration-1000 ${
          isVisible('ybs-definition') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        }`}
      >
        {/* Background Stripe */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 dark:via-slate-700/5 to-transparent"></div>
        <div className="absolute inset-0 opacity-20">
          <div className="h-full w-full bg-gradient-to-r from-transparent via-blue-50/20 dark:via-blue-900/20 to-transparent"></div>
        </div>
        
        {/* Decorative Lines */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-200/30 dark:via-blue-700/30 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-200/30 dark:via-blue-700/30 to-transparent"></div>
        
        <div className="max-w-6xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="text-center mb-8">
            {/* Special Badge */}
            <div className={`inline-flex items-center px-6 py-3 mb-6 card-premium border-2 border-blue-200/30 dark:border-blue-700/30 transition-all duration-700 delay-200 ${
              isVisible('ybs-definition') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}>
              <div className="w-2 h-2 rounded-full mr-3 bg-gradient-to-br from-blue-500 to-cyan-500 shadow-sm shadow-blue-500/40"></div>
              <span className="text-base font-semibold text-slate-700 dark:text-slate-300">
                Management Information Systems • Academic Discipline
              </span>
            </div>
            
            <h2 className={`gradient-premium mb-4 text-2xl md:text-3xl lg:text-4xl transition-all duration-700 delay-400 ${
              isVisible('ybs-definition') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}>
              Yönetim Bilişim Sistemleri Nedir?
            </h2>
            <div className={`max-w-4xl mx-auto space-y-4 transition-all duration-700 delay-600 ${
              isVisible('ybs-definition') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}>
              <p className="text-base md:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                <strong className="text-blue-600 dark:text-blue-400">21. yüzyılın en stratejik disiplini:</strong> Teknoloji ve yönetim biliminin mükemmel entegrasyonu ile 
                <strong className="text-teal-600 dark:text-teal-400"> dijital çağın lider yöneticilerini</strong> yetiştiren kapsamlı eğitim programı.
              </p>
              
              <div className={`bg-gradient-to-br from-slate-50/90 via-blue-50/80 to-indigo-50/90 dark:from-slate-800/50 dark:via-slate-800/60 dark:to-indigo-950/50 rounded-2xl p-6 border border-slate-200/40 dark:border-slate-700/40 shadow-lg backdrop-blur-sm transition-all duration-700 delay-800 ${
                isVisible('ybs-definition') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}>
                <div className="text-center mb-6">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl mb-3 shadow-lg">
                    <Target className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-black bg-gradient-to-r from-slate-700 via-blue-600 to-indigo-600 dark:from-slate-200 dark:via-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
                    YBS Bölümünün Temel Amacı
                  </h3>
                  <div className="w-16 h-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto mt-2 rounded-full"></div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="text-center p-4 bg-white/60 dark:bg-slate-700/30 rounded-xl border border-white/50 dark:border-slate-600/30">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-lg">🎯</span>
                    </div>
                    <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-3 text-base">Stratejik Hedef</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      Bilişim teknolojilerini iş süreçleriyle entegre edebilen, veri odaklı karar verebilen ve dijital dönüşümü yönetebilen uzmanlar yetiştirmek
                    </p>
                  </div>
                  
                  <div className="text-center p-4 bg-white/60 dark:bg-slate-700/30 rounded-xl border border-white/50 dark:border-slate-600/30">
                    <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-lg">💡</span>
                    </div>
                    <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-3 text-base">Vizyon</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      Teknoloji ile iş dünyası arasında köprü görevi görecek, analitik düşünce yapısına sahip geleceğin yöneticilerini hazırlamak
                    </p>
                  </div>
                </div>
                
                <div className="mt-6 text-center">
                  <h5 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
                    📋 Ana Yetenek Alanları
                  </h5>
                  <div className="flex flex-wrap justify-center gap-2">
                    {[
                      'İş Süreç Analizi', 'Dijital Dönüşüm Yönetimi', 'Veri Analizi & İş Zekası', 
                      'Proje Yönetimi', 'Sistem Tasarımı', 'Kurumsal Kaynak Planlama'
                    ].map((skill, index) => (
                      <span key={index} className="px-3 py-1.5 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 dark:from-blue-400/20 dark:to-indigo-400/20 text-blue-700 dark:text-blue-300 border border-blue-200/50 dark:border-blue-600/30 rounded-full text-xs font-medium hover:scale-105 transition-transform duration-200">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CAREER AREAS - What Graduates Do */}
      <section 
        id="career-areas"
        ref={el => sectionRefs.current['career-areas'] = el}
        className={`py-8 md:py-12 relative transition-all duration-1000 ${
          isVisible('career-areas') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 lg:px-8 relative z-10">
          <div className={`transition-all duration-700 delay-200 ${
            isVisible('career-areas') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <div className="text-center mb-8">
              <div className="inline-flex items-center px-4 py-2 mb-4 feature-card">
                <Building2 className="h-5 w-5 text-slate-600 dark:text-slate-400 mr-2" />
                <span className="text-base font-semibold text-slate-800 dark:text-slate-200">
                  YBS Mezunlarının Yetkinlikleri ve Kariyer Alanları
                </span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-3 gradient-premium">
                Mezunlarımız Neler Yapabilir?
              </h2>
              <p className="text-base text-premium max-w-3xl mx-auto">
                YBS mezunları <strong style={{color: 'var(--electric-blue)'}}>teknoloji ve iş dünyasının kesişiminde </strong> 
                liderlik pozisyonlarında görev alırlar
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              {/* Sistem Yönetimi ve Analizi */}
              <div className="text-center p-4 bg-white/70 dark:bg-slate-800/70 rounded-xl border border-white/50 dark:border-slate-700/50 hover:scale-105 transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <span className="text-xl">🔧</span>
                </div>
                <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-2 text-base">Sistem Mimarı & Analisti</h4>
                <p className="text-xs text-slate-600 dark:text-slate-400">Kurumsal sistem tasarımı, iş süreç analizi, ERP implementasyonu ve sistem entegrasyonu alanlarında uzmanlaşır</p>
              </div>

              {/* Veri Bilimi ve İş Zekası */}
              <div className="text-center p-4 bg-white/70 dark:bg-slate-800/70 rounded-xl border border-white/50 dark:border-slate-700/50 hover:scale-105 transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <span className="text-xl">📊</span>
                </div>
                <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-2 text-base">Veri Bilimci & İş Zekası Uzmanı</h4>
                <p className="text-xs text-slate-600 dark:text-slate-400">Büyük veri analizi, iş zekası çözümleri, makine öğrenmesi ve veri madenciliği projelerini yönetir</p>
              </div>

              {/* Dijital Dönüşüm Yöneticisi */}
              <div className="text-center p-4 bg-white/70 dark:bg-slate-800/70 rounded-xl border border-white/50 dark:border-slate-700/50 hover:scale-105 transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <span className="text-xl">🚀</span>
                </div>
                <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-2 text-base">Dijital Dönüşüm Lideri</h4>
                <p className="text-xs text-slate-600 dark:text-slate-400">Organizasyonlarda teknoloji stratejisi geliştirme, dijital dönüşüm süreçlerini yönetme ve inovasyon liderliği</p>
              </div>

              {/* IT Proje Yöneticisi */}
              <div className="text-center p-4 bg-white/70 dark:bg-slate-800/70 rounded-xl border border-white/50 dark:border-slate-700/50 hover:scale-105 transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <span className="text-xl">🎯</span>
                </div>
                <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-2 text-base">IT Proje Yöneticisi</h4>
                <p className="text-xs text-slate-600 dark:text-slate-400">Teknoloji projelerinin planlama, koordinasyon ve uygulamadan sorumlu, Agile ve Scrum metodolojilerinde uzman</p>
              </div>

              {/* Siber Güvenlik Uzmanı */}
              <div className="text-center p-4 bg-white/70 dark:bg-slate-800/70 rounded-xl border border-white/50 dark:border-slate-700/50 hover:scale-105 transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-pink-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <span className="text-xl">🔐</span>
                </div>
                <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-2 text-base">Siber Güvenlik Uzmanı</h4>
                <p className="text-xs text-slate-600 dark:text-slate-400">Bilgi güvenliği politikaları, risk yönetimi, güvenlik denetimi ve kurumsal güvenlik stratejilerinde uzmanlaşır</p>
              </div>

              {/* İş Geliştirme Uzmanı */}
              <div className="text-center p-4 bg-white/70 dark:bg-slate-800/70 rounded-xl border border-white/50 dark:border-slate-700/50 hover:scale-105 transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <span className="text-xl">💼</span>
                </div>
                <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-2 text-base">İş Geliştirme & Stratejist</h4>
                <p className="text-xs text-slate-600 dark:text-slate-400">Teknoloji şirketlerinde iş geliştirme, stratejik ortaklıklar ve kurumsal satış süreçlerini yönetir</p>
              </div>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-slate-500/20 to-blue-500/20 rounded-full border border-slate-300/30 dark:border-slate-700/30">
                <TrendingUp className="h-5 w-5 text-slate-600 dark:text-slate-400 mr-3" />
                <span className="font-medium text-slate-700 dark:text-slate-300 text-base">
                  <strong className="text-blue-600 dark:text-blue-400">Teknoloji ve iş dünyasının kesişiminde</strong> liderlik pozisyonlarına hazır mezunlar
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. TECHNOLOGY FOCUS - What Technologies */}
      <section 
        id="tech-gallery"
        ref={el => sectionRefs.current['tech-gallery'] = el}
        className={`py-6 md:py-8 relative overflow-hidden transition-all duration-1000 ${
          isVisible('tech-gallery') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className={`text-center mb-8 transition-all duration-700 delay-200 ${
            isVisible('tech-gallery') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}>
            <div className="inline-flex items-center px-4 py-2 mb-4 feature-card">
              <div className="w-1.5 h-1.5 rounded-full mr-2" style={{backgroundColor: 'var(--electric-blue)'}}></div>
              <span className="text-xs font-medium" style={{color: 'var(--teal-600)'}}>Professional Technology Focus</span>
            </div>
            <h3 className="text-lg md:text-xl font-bold mb-2" style={{
              background: 'linear-gradient(135deg, var(--navy-800) 0%, var(--electric-blue) 50%, var(--teal-600) 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent'
            }}>
              Hangi Teknolojilerle Çalışıyoruz?
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              <strong className="text-slate-800 dark:text-slate-200">Yapay zeka, siber güvenlik, veri analizi</strong> ve 
              <strong className="text-blue-600 dark:text-blue-400"> kurumsal stratejilerin mükemmel uyumu</strong>
            </p>
          </div>
          
          <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 transition-all duration-700 delay-400 ${
            isVisible('tech-gallery') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
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
                className="group relative feature-card text-center p-4 cursor-pointer transform transition-all duration-300 hover:scale-105 hover:z-10"
              >
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-10 rounded-20 transition-opacity duration-500`}></div>
                
                {/* Icon */}
                <div className="text-2xl md:text-3xl mb-3 transform group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </div>
                
                {/* Content */}
                <h4 className="text-xs md:text-sm font-bold text-primary-premium mb-1.5 group-hover:text-electric-blue transition-colors duration-300">
                  {item.title}
                </h4>
                <p className="text-xs text-premium opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                  {item.description}
                </p>
                
                {/* Hover Effect Circle */}
                <div className="absolute inset-0 rounded-20 bg-gradient-to-br from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. YBS BUDDY GUIDE - How to Use Application */}
      <section 
        id="app-guide"
        ref={el => sectionRefs.current['app-guide'] = el}
        className={`py-8 md:py-10 relative transition-all duration-1000 ${
          isVisible('app-guide') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        }`}
      >
        <div className="max-w-5xl mx-auto px-6 lg:px-8 relative z-10">
          <div className={`transition-all duration-700 delay-200 ${
            isVisible('app-guide') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <div className="bg-gradient-to-r from-blue-50/80 to-purple-50/80 dark:from-blue-950/50 dark:to-purple-950/50 rounded-2xl border border-blue-200/30 dark:border-blue-800/30 p-6">
              <div className="text-center mb-6">
                <div className="inline-flex items-center px-4 py-2 mb-4 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-full border border-blue-200/50 dark:border-blue-800/50">
                  <GraduationCap className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2" />
                  <span className="text-base font-semibold text-slate-800 dark:text-slate-200">
                    YBS Buddy ile Eğitim Yolculuğunuz
                  </span>
                </div>
                <h3 className="text-lg md:text-xl font-bold bg-gradient-to-r from-slate-800 via-blue-600 to-purple-600 dark:from-slate-200 dark:via-blue-400 dark:to-purple-400 bg-clip-text text-transparent mb-2">
                  Uygulamayı Nasıl Kullanırım?
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  YBS eğitim sürecinizi optimize etmek için tasarlanmış <strong className="text-blue-600 dark:text-blue-400">kapsamlı eğitim ekosistemi</strong>
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="text-center p-6 bg-white/70 dark:bg-slate-800/70 rounded-2xl border border-white/50 dark:border-slate-700/50">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <span className="text-xl">📚</span>
                  </div>
                  <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-2 text-sm">1. Müfredatı Keşfet</h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mb-2">Sınıf ve döneme göre dersleri incele, zorunlu/seçmeli ayrımını gör</p>
                  <Link to="/mufredat" className="inline-block mt-2 text-blue-600 dark:text-blue-400 text-xs font-medium hover:underline">
                    Müfredata Git →
                  </Link>
                </div>

                <div className="text-center p-4 bg-white/70 dark:bg-slate-800/70 rounded-xl border border-white/50 dark:border-slate-700/50">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <span className="text-xl">📝</span>
                  </div>
                  <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-2 text-sm">2. Ders Notlarını İncele</h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mb-2">Öğretmen ve öğrenci notlarına eriş, favorile ve indir</p>
                  <Link to="/ders-notlari" className="inline-block mt-2 text-emerald-600 dark:text-emerald-400 text-xs font-medium hover:underline">
                    Notlara Git →
                  </Link>
                </div>

                <div className="text-center p-4 bg-white/70 dark:bg-slate-800/70 rounded-xl border border-white/50 dark:border-slate-700/50">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <span className="text-xl">✏️</span>
                  </div>
                  <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-2 text-sm">3. Kendi Notlarını Tut</h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mb-2">Güçlü editör ile notlar oluştur, kategorize et ve organize et</p>
                  <Link to="/not-alani" className="inline-block mt-2 text-purple-600 dark:text-purple-400 text-xs font-medium hover:underline">
                    Not Alanına Git →
                  </Link>
                </div>

                <div className="text-center p-4 bg-white/70 dark:bg-slate-800/70 rounded-xl border border-white/50 dark:border-slate-700/50">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <span className="text-xl">🎯</span>
                  </div>
                  <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-2 text-sm">4. Sınav Simülasyonu Yap</h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mb-2">Gerçekçi sınav ortamında kendini test et ve performansını ölç</p>
                  <Link to="/sinav-simulasyonu" className="inline-block mt-2 text-orange-600 dark:text-orange-400 text-xs font-medium hover:underline">
                    Simülasyona Git →
                  </Link>
                </div>
              </div>

              <div className="text-center">
                <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full border border-blue-300/30 dark:border-blue-700/30">
                  <Target className="h-4 w-4 text-blue-600 dark:text-blue-400 mr-2" />
                  <span className="font-medium text-slate-700 dark:text-slate-300 text-sm">
                    <strong className="text-blue-600 dark:text-blue-400">YBS uzmanlığınızı geliştirmek</strong> için ihtiyacınız olan her şey bir arada!
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Career Guide - Ultra Modern */}
      <section 
        id="career-guide"
        ref={el => sectionRefs.current['career-guide'] = el}
        className={`py-6 md:py-8 relative overflow-hidden transition-all duration-1000 ${
          isVisible('career-guide') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        }`}
      >
        {/* Animated Background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-5 left-1/4 w-24 h-24 bg-gradient-to-r from-purple-400/15 to-pink-400/15 rounded-full animate-pulse"></div>
          <div className="absolute bottom-5 right-1/4 w-32 h-32 bg-gradient-to-r from-blue-400/15 to-cyan-400/15 rounded-full animate-pulse delay-700"></div>
          <div className="absolute top-1/2 left-5 w-16 h-16 bg-gradient-to-r from-green-400/15 to-emerald-400/15 rounded-full animate-pulse delay-1000"></div>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
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
              
              <div className="relative z-10 p-6 md:p-8">
                {/* Header */}
                <div className="text-center mb-8">
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
                  
                  <h2 className="text-2xl md:text-3xl font-black bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent mb-4 leading-tight">
                    AI Destekli Kariyer Rehberi
                  </h2>
                  <div className="w-16 h-1 bg-gradient-to-r from-purple-500 to-cyan-500 mx-auto mb-6 rounded-full"></div>
                </div>

                {/* Features Grid */}
                <div className="grid md:grid-cols-3 gap-4 mb-8">
                  <div className="group p-4 rounded-xl bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border border-white/40 dark:border-slate-700/40 hover:scale-105 transition-all duration-300">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mb-3 group-hover:rotate-12 transition-transform duration-300">
                      <Users className="h-5 w-5 text-white" />
                    </div>
                    <h3 className="font-bold text-slate-800 dark:text-slate-200 mb-2 text-sm">Kişilik Analizi</h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400">Benzersiz kişilik özelliklerinizi AI ile keşfedin</p>
                  </div>

                                        <div className="group p-3 rounded-xl bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border border-white/40 dark:border-slate-700/40 hover:scale-105 transition-all duration-300">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center mb-2 group-hover:rotate-12 transition-transform duration-300">
                          <TrendingUp className="h-4 w-4 text-white" />
                        </div>
                        <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-1 text-xs">Yetenek Değerlendirmesi</h3>
                        <p className="text-xs text-slate-600 dark:text-slate-400">Güçlü yönlerinizi ve potansiyelinizi belirleyin</p>
                      </div>

                      <div className="group p-3 rounded-xl bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border border-white/40 dark:border-slate-700/40 hover:scale-105 transition-all duration-300">
                        <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mb-2 group-hover:rotate-12 transition-transform duration-300">
                          <Target className="h-4 w-4 text-white" />
                        </div>
                        <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-1 text-xs">Kariyer Hedefleme</h3>
                        <p className="text-xs text-slate-600 dark:text-slate-400">Size en uygun uzmanlık alanını keşfedin</p>
                      </div>
                    </div>

                                    {/* Main Description */}
                    <div className="text-center mb-4">
                      <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                        Hangi YBS uzmanlık alanında kariyer yapacağınızı belirleme konusunda profesyonel rehberlik mi arıyorsunuz? 
                        <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600"> Yapay zeka destekli değerlendirme sistemimiz</span> ile 
                        kişilik analizi, yetenek değerlendirmesi ve kariyer hedeflerinize en uygun uzmanlık alanını keşfedin.
                      </p>
                    </div>

                                    {/* Coming Soon Badge */}
                    <div className="text-center">
                      <div className="inline-flex items-center px-4 py-3 bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-cyan-500/20 backdrop-blur-sm rounded-xl border border-white/30 dark:border-slate-700/30 shadow-lg">
                        <div className="flex items-center space-x-2">
                          <div className="relative">
                            <Lightbulb className="h-4 w-4 text-purple-600 dark:text-purple-400 animate-pulse" />
                            <div className="absolute -inset-1 bg-purple-500/30 rounded-full blur animate-ping"></div>
                          </div>
                          <div className="text-center">
                            <div className="text-sm font-bold text-slate-800 dark:text-slate-200">Geliştirme Aşamasında</div>
                            <div className="text-xs text-slate-600 dark:text-slate-400">2024 Yılında Sizlerle</div>
                          </div>
                          <div className="flex space-x-1">
                            <div className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-bounce"></div>
                            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce delay-100"></div>
                            <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-bounce delay-200"></div>
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