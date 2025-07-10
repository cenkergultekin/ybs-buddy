import { useState } from 'react';
import { 
  Briefcase, MapPin, Clock, Calendar, Building, Users, 
  GraduationCap, Filter, Search, Star, BookOpen, Download,
  Send, CheckCircle, AlertCircle, FileText, Target, TrendingUp,
  ChevronDown, Award, BadgeCheck, ExternalLink, Heart
} from 'lucide-react';

const YBSStaj = () => {
  const [selectedSector, setSelectedSector] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [appliedInternships, setAppliedInternships] = useState(new Set());
  const [savedInternships, setSavedInternships] = useState(new Set());
  const [activeTab, setActiveTab] = useState('listings');

  const sectors = [
    { value: 'all', label: 'Tüm Sektörler', icon: Target },
    { value: 'tech', label: 'Teknoloji', icon: Building },
    { value: 'finance', label: 'Finans & Bankacılık', icon: TrendingUp },
    { value: 'consulting', label: 'Danışmanlık', icon: Users },
    { value: 'government', label: 'Kamu', icon: Award },
    { value: 'ecommerce', label: 'E-Ticaret', icon: Star }
  ];

  const internshipTypes = [
    { value: 'all', label: 'Tüm Türler' },
    { value: 'software', label: 'Yazılım Geliştirme' },
    { value: 'data', label: 'Veri Analizi' },
    { value: 'pm', label: 'Proje Yönetimi' },
    { value: 'business', label: 'İş Analizi' },
    { value: 'system', label: 'Sistem Analizi' },
    { value: 'cyber', label: 'Siber Güvenlik' }
  ];

  const locations = ['İstanbul', 'Ankara', 'İzmir', 'Bursa', 'Antalya', 'Adana', 'Remote'];

  const internships = [
    {
      id: 1,
      company: 'Microsoft Türkiye',
      position: 'Software Development Intern',
      type: 'software',
      sector: 'tech',
      location: 'İstanbul',
      duration: '3 ay',
      startDate: '2024-06-01',
      deadline: '2024-04-15',
      salary: '8.000 TL',
      description: 'Azure servislerinin geliştirilmesinde rol alacak, C# ve .NET teknolojileri ile çalışacak stajyer arıyoruz.',
      requirements: ['C# programlama', '.NET Framework', 'SQL Server', 'Azure temel bilgisi'],
      benefits: ['Mentorship programı', 'Sertifikasyon imkanı', 'Tam zamanlı işe geçiş fırsatı'],
      applicants: 342,
      rating: 4.9,
      featured: true,
      logo: '🟦'
    },
    {
      id: 2,
      company: 'Akbank',
      position: 'Data Science Intern',
      type: 'data',
      sector: 'finance',
      location: 'İstanbul',
      duration: '4 ay',
      startDate: '2024-06-15',
      deadline: '2024-04-20',
      salary: '7.500 TL',
      description: 'Müşteri davranış analizi ve risk modelleme projelerinde Python ile veri analizi yapacak stajyer aranıyor.',
      requirements: ['Python', 'SQL', 'İstatistik bilgisi', 'Makine öğrenmesi temelleri'],
      benefits: ['Finans sektörü deneyimi', 'Veri bilimi eğitimi', 'Network imkanı'],
      applicants: 198,
      rating: 4.7,
      featured: true,
      logo: '🏦'
    },
    {
      id: 3,
      company: 'Trendyol',
      position: 'Product Management Intern',
      type: 'pm',
      sector: 'ecommerce',
      location: 'İstanbul',
      duration: '3 ay',
      startDate: '2024-07-01',
      deadline: '2024-05-01',
      salary: '9.000 TL',
      description: 'E-ticaret platformunun ürün geliştirme süreçlerinde yer alacak, kullanıcı deneyimi odaklı çalışmalar yapacak stajyer.',
      requirements: ['Analitik düşünce', 'SQL bilgisi', 'A/B test anlayışı', 'Product roadmap bilgisi'],
      benefits: ['E-ticaret uzmanlığı', 'Agile metodoloji deneyimi', 'Startup kültürü'],
      applicants: 267,
      rating: 4.8,
      featured: false,
      logo: '🛒'
    },
    {
      id: 4,
      company: 'Deloitte Türkiye',
      position: 'Business Analyst Intern',
      type: 'business',
      sector: 'consulting',
      location: 'İstanbul',
      duration: '6 ay',
      startDate: '2024-06-01',
      deadline: '2024-04-10',
      salary: '8.500 TL',
      description: 'Kurumsal danışmanlık projelerinde iş süreçleri analizi, süreç iyileştirme çalışmalarında yer alacak stajyer.',
      requirements: ['Excel ileri seviye', 'PowerBI', 'Süreç analizi', 'İngilizce B2'],
      benefits: ['Büyük 4 deneyimi', 'Uluslararası projeler', 'Sertifikasyon programları'],
      applicants: 456,
      rating: 4.6,
      featured: true,
      logo: '📊'
    },
    {
      id: 5,
      company: 'Aselsan',
      position: 'Cyber Security Intern',
      type: 'cyber',
      sector: 'government',
      location: 'Ankara',
      duration: '4 ay',
      startDate: '2024-07-15',
      deadline: '2024-05-15',
      salary: '6.500 TL',
      description: 'Savunma sanayi projeleri kapsamında siber güvenlik çözümleri geliştirme ekibinde çalışacak stajyer.',
      requirements: ['Ağ güvenliği', 'Linux/Windows', 'Penetration testing', 'Güvenlik açığı analizi'],
      benefits: ['Savunma sanayi deneyimi', 'Güvenlik sertifikaları', 'Uzman mentor desteği'],
      applicants: 123,
      rating: 4.5,
      featured: false,
      logo: '🛡️'
    },
    {
      id: 6,
      company: 'Hepsiburada',
      position: 'System Analyst Intern',
      type: 'system',
      sector: 'ecommerce',
      location: 'İstanbul',
      duration: '3 ay',
      startDate: '2024-06-20',
      deadline: '2024-04-25',
      salary: '8.000 TL',
      description: 'E-ticaret platformunun sistem mimarisi ve entegrasyon projelerinde yer alacak sistem analisti stajyeri.',
      requirements: ['UML modelleme', 'API tasarımı', 'Sistem analizi', 'Agile/Scrum'],
      benefits: ['Sistem mimarisi deneyimi', 'Microservices bilgisi', 'DevOps kültürü'],
      applicants: 189,
      rating: 4.4,
      featured: false,
      logo: '⚙️'
    },
    {
      id: 7,
      company: 'Turkcell',
      position: 'Data Analytics Intern',
      type: 'data',
      sector: 'tech',
      location: 'İstanbul',
      duration: '4 ay',
      startDate: '2024-06-10',
      deadline: '2024-04-30',
      salary: '7.000 TL',
      description: 'Telekom sektöründe müşteri veri analizi, churn prediction ve business intelligence projelerinde çalışacak stajyer.',
      requirements: ['Python/R', 'SQL', 'Tableau/PowerBI', 'İstatistik'],
      benefits: ['Telekom sektörü deneyimi', 'Big Data teknolojileri', 'BI araçları uzmanlığı'],
      applicants: 234,
      rating: 4.3,
      featured: false,
      logo: '📱'
    },
    {
      id: 8,
      company: 'Garanti BBVA',
      position: 'Digital Banking Intern',
      type: 'software',
      sector: 'finance',
      location: 'İstanbul',
      duration: '5 ay',
      startDate: '2024-07-01',
      deadline: '2024-05-10',
      salary: '8.200 TL',
      description: 'Dijital bankacılık uygulamalarının geliştirilmesi ve mobile banking projelerinde yer alacak yazılım stajyeri.',
      requirements: ['Java/Spring', 'React/Angular', 'RESTful API', 'Git/Jenkins'],
      benefits: ['Fintech deneyimi', 'Agile development', 'Bankacılık sektörü bilgisi'],
      applicants: 298,
      rating: 4.7,
      featured: true,
      logo: '💳'
    }
  ];

  const handleApply = (internshipId) => {
    setAppliedInternships(prev => {
      const newApplied = new Set(prev);
      newApplied.add(internshipId);
      return newApplied;
    });
  };

  const handleSave = (internshipId) => {
    setSavedInternships(prev => {
      const newSaved = new Set(prev);
      if (newSaved.has(internshipId)) {
        newSaved.delete(internshipId);
      } else {
        newSaved.add(internshipId);
      }
      return newSaved;
    });
  };

  const filteredInternships = internships.filter(internship => {
    const sectorMatch = selectedSector === 'all' || internship.sector === selectedSector;
    const typeMatch = selectedType === 'all' || internship.type === selectedType;
    const locationMatch = selectedLocation === 'all' || internship.location === selectedLocation;
    const searchMatch = searchTerm === '' || 
      internship.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      internship.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      internship.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    return sectorMatch && typeMatch && locationMatch && searchMatch;
  });

  const featuredInternships = internships.filter(internship => internship.featured);

  // CV Tips
  const cvTips = [
    {
      title: 'YBS Özel Beceriler',
      content: 'Teknik ve business becerilerinizi ayrı bölümlerde listeleyin. SQL, Python gibi teknik yeteneklerin yanında proje yönetimi, sistem analizi gibi YBS özel becerilerinizi vurgulayın.',
      icon: '🎯'
    },
    {
      title: 'Proje Deneyimleri',
      content: 'Üniversitede yaptığınız projeleri detaylandırın. Kullandığınız teknolojiler, takım çalışması ve proje sonuçlarını ölçülebilir şekilde yazın.',
      icon: '📈'
    },
    {
      title: 'İnterdisipliner Yaklaşım',
      content: 'YBS\'nin interdisipliner yapısını öne çıkarın. Hem teknik hem de business tarafını anlayabildiğinizi gösteren deneyimlerinizi paylaşın.',
      icon: '🔗'
    },
    {
      title: 'Sertifikalar ve Kurslar',
      content: 'Online kurslar, sertifikasyonlar ve eğitimleri mutlaka ekleyin. Coursera, Udemy, LinkedIn Learning gibi platformlardan aldığınız sertifikaları belirtin.',
      icon: '🏆'
    }
  ];

  return (
    <div className="pt-18 min-h-screen relative z-10">
      {/* Header */}
      <section className="section-premium">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-50 to-violet-50 dark:from-blue-950 dark:to-violet-950 rounded-full border border-blue-200/30 dark:border-blue-800/30 mb-6">
              <Briefcase className="h-4 w-4 text-blue-600 dark:text-blue-400 mr-2" />
              <span className="text-sm font-medium text-primary-premium">Internship Portal</span>
            </div>
            <h1 className="text-4xl md:text-5xl gradient-premium mb-6">
              YBS Staj İlanları
            </h1>
            <p className="text-lg text-secondary-premium max-w-3xl mx-auto mb-8">
              YBS öğrencileri için özel seçilmiş staj fırsatları. İdeal pozisyonunuzu bulun, 
              başvurunuzu takip edin ve kariyerinizde ilk adımı atın.
            </p>
            
            {/* Quick Stats */}
            <div className="grid md:grid-cols-4 gap-6 max-w-3xl mx-auto">
              <div className="feature-card">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {internships.length}
                </div>
                <div className="text-sm text-secondary-premium">Aktif İlan</div>
              </div>
              <div className="feature-card">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {featuredInternships.length}
                </div>
                <div className="text-sm text-secondary-premium">Öne Çıkan</div>
              </div>
              <div className="feature-card">
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                  {new Set(internships.map(i => i.company)).size}
                </div>
                <div className="text-sm text-secondary-premium">Farklı Şirket</div>
              </div>
              <div className="feature-card">
                <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                  {appliedInternships.size}
                </div>
                <div className="text-sm text-secondary-premium">Başvurularım</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="section-premium">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center mb-8">
            <div className="flex bg-gray-100 dark:bg-slate-800 rounded-xl p-1">
              <button
                onClick={() => setActiveTab('listings')}
                className={`px-6 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                  activeTab === 'listings'
                    ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
                }`}
              >
                <Briefcase className="h-4 w-4 mr-2 inline" />
                Staj İlanları
              </button>
              <button
                onClick={() => setActiveTab('applications')}
                className={`px-6 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                  activeTab === 'applications'
                    ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
                }`}
              >
                <CheckCircle className="h-4 w-4 mr-2 inline" />
                Başvurularım
              </button>
              <button
                onClick={() => setActiveTab('cv-tips')}
                className={`px-6 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                  activeTab === 'cv-tips'
                    ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
                }`}
              >
                <FileText className="h-4 w-4 mr-2 inline" />
                CV Rehberi
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Content based on active tab */}
      {activeTab === 'listings' && (
        <>
          {/* Featured Internships */}
          <section className="section-premium">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-primary-premium mb-6 flex items-center">
                  <Star className="h-6 w-6 mr-3 text-yellow-500" />
                  Öne Çıkan Staj Fırsatları
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {featuredInternships.slice(0, 3).map((internship) => (
                    <div key={internship.id} className="card-premium bg-gradient-to-br from-yellow-50/60 to-orange-50/60 dark:from-yellow-950/60 dark:to-orange-950/60 border border-yellow-200/50 dark:border-yellow-800/50">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="text-2xl">{internship.logo}</div>
                          <div>
                            <h3 className="font-bold text-primary-premium">{internship.company}</h3>
                            <p className="text-sm text-secondary-premium">{internship.position}</p>
                          </div>
                        </div>
                        <button
                          onClick={() => handleSave(internship.id)}
                          className={`p-2 rounded-lg transition-colors duration-200 ${
                            savedInternships.has(internship.id)
                              ? 'text-red-500 bg-red-50 dark:bg-red-950'
                              : 'text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950'
                          }`}
                        >
                          <Heart className={`h-4 w-4 ${savedInternships.has(internship.id) ? 'fill-current' : ''}`} />
                        </button>
                      </div>
                      
                      <div className="space-y-2 text-sm text-secondary-premium mb-4">
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-2" />
                          {internship.location}
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-2" />
                          {internship.duration}
                        </div>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2" />
                          Son başvuru: {new Date(internship.deadline).toLocaleDateString('tr-TR')}
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-green-600 dark:text-green-400">
                          {internship.salary}
                        </span>
                        <div className="flex items-center space-x-2">
                          <div className="flex items-center text-yellow-500">
                            <Star className="h-4 w-4 fill-current" />
                            <span className="text-sm ml-1">{internship.rating}</span>
                          </div>
                          <span className="text-xs text-secondary-premium">
                            {internship.applicants} başvuru
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Filters */}
          <section className="section-premium">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="card-premium mb-8">
                <h2 className="text-2xl font-bold text-primary-premium mb-8 flex items-center">
                  <Filter className="h-6 w-6 mr-3" />
                  Staj Arama ve Filtreleme
                </h2>
                
                <div className="grid md:grid-cols-4 gap-6 mb-6">
                  {/* Sektör */}
                  <div>
                    <label className="block text-sm font-semibold text-premium mb-2">
                      Sektör
                    </label>
                    <div className="relative">
                      <select 
                        value={selectedSector}
                        onChange={(e) => setSelectedSector(e.target.value)}
                        className="w-full p-4 glass-subtle rounded-xl border border-gray-200 dark:border-slate-600 bg-white/90 dark:bg-slate-800/90 text-premium focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                      >
                        {sectors.map((sector) => (
                          <option key={sector.value} value={sector.value}>
                            {sector.label}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-secondary-premium pointer-events-none" />
                    </div>
                  </div>

                  {/* Staj Türü */}
                  <div>
                    <label className="block text-sm font-semibold text-premium mb-2">
                      Staj Türü
                    </label>
                    <div className="relative">
                      <select 
                        value={selectedType}
                        onChange={(e) => setSelectedType(e.target.value)}
                        className="w-full p-4 glass-subtle rounded-xl border border-gray-200 dark:border-slate-600 bg-white/90 dark:bg-slate-800/90 text-premium focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                      >
                        {internshipTypes.map((type) => (
                          <option key={type.value} value={type.value}>
                            {type.label}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-secondary-premium pointer-events-none" />
                    </div>
                  </div>

                  {/* Lokasyon */}
                  <div>
                    <label className="block text-sm font-semibold text-premium mb-2">
                      Lokasyon
                    </label>
                    <div className="relative">
                      <select 
                        value={selectedLocation}
                        onChange={(e) => setSelectedLocation(e.target.value)}
                        className="w-full p-4 glass-subtle rounded-xl border border-gray-200 dark:border-slate-600 bg-white/90 dark:bg-slate-800/90 text-premium focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                      >
                        <option value="all">Tüm Lokasyonlar</option>
                        {locations.map((location) => (
                          <option key={location} value={location}>{location}</option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-secondary-premium pointer-events-none" />
                    </div>
                  </div>

                  {/* Arama */}
                  <div>
                    <label className="block text-sm font-semibold text-premium mb-2">
                      Arama
                    </label>
                    <div className="relative">
                      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-secondary-premium" />
                      <input
                        type="text"
                        placeholder="Şirket veya pozisyon ara..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-12 pr-4 py-4 glass-subtle rounded-xl border border-gray-200 dark:border-slate-600 bg-white/90 dark:bg-slate-800/90 text-premium placeholder-secondary-premium focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>

                <div className="text-sm text-secondary-premium">
                  <strong>{filteredInternships.length}</strong> staj ilanı bulundu
                </div>
              </div>
            </div>
          </section>

          {/* Internship Listings */}
          <section className="section-premium">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="space-y-6">
                {filteredInternships.map((internship) => {
                  const isApplied = appliedInternships.has(internship.id);
                  const isSaved = savedInternships.has(internship.id);
                  const daysLeft = Math.ceil((new Date(internship.deadline) - new Date()) / (1000 * 60 * 60 * 24));
                  
                  return (
                    <div key={internship.id} className="card-premium hover:shadow-xl transition-all duration-300">
                      {/* Header */}
                      <div className="flex items-start justify-between mb-6">
                        <div className="flex items-start space-x-4">
                          <div className="text-3xl">{internship.logo}</div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <h3 className="text-xl font-bold text-primary-premium">{internship.company}</h3>
                              {internship.featured && (
                                <span className="px-2 py-1 bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300 rounded text-xs font-medium">
                                  Öne Çıkan
                                </span>
                              )}
                            </div>
                            <h4 className="text-lg font-semibold text-premium mb-2">{internship.position}</h4>
                            <div className="grid md:grid-cols-4 gap-4 text-sm text-secondary-premium">
                              <div className="flex items-center">
                                <MapPin className="h-4 w-4 mr-2" />
                                {internship.location}
                              </div>
                              <div className="flex items-center">
                                <Clock className="h-4 w-4 mr-2" />
                                {internship.duration}
                              </div>
                              <div className="flex items-center">
                                <Calendar className="h-4 w-4 mr-2" />
                                {new Date(internship.startDate).toLocaleDateString('tr-TR')}
                              </div>
                              <div className="flex items-center">
                                <Users className="h-4 w-4 mr-2" />
                                {internship.applicants} başvuru
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleSave(internship.id)}
                            className={`p-3 rounded-xl transition-colors duration-200 ${
                              isSaved
                                ? 'text-red-500 bg-red-50 dark:bg-red-950'
                                : 'text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950'
                            }`}
                          >
                            <Heart className={`h-5 w-5 ${isSaved ? 'fill-current' : ''}`} />
                          </button>
                          <div className="text-right">
                            <div className="text-lg font-bold text-green-600 dark:text-green-400">
                              {internship.salary}
                            </div>
                            <div className="flex items-center text-yellow-500">
                              <Star className="h-4 w-4 fill-current mr-1" />
                              <span className="text-sm">{internship.rating}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-premium mb-6 leading-relaxed">
                        {internship.description}
                      </p>

                      {/* Requirements */}
                      <div className="grid md:grid-cols-2 gap-6 mb-6">
                        <div>
                          <h5 className="font-semibold text-premium mb-3">Aranan Özellikler:</h5>
                          <div className="flex flex-wrap gap-2">
                            {internship.requirements.map((req, index) => (
                              <span key={index} className="px-3 py-1 bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 rounded-lg text-sm">
                                {req}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h5 className="font-semibold text-premium mb-3">Avantajlar:</h5>
                          <div className="flex flex-wrap gap-2">
                            {internship.benefits.map((benefit, index) => (
                              <span key={index} className="px-3 py-1 bg-green-50 dark:bg-green-950 text-green-700 dark:text-green-300 rounded-lg text-sm">
                                {benefit}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center justify-between pt-6 border-t border-gray-200 dark:border-slate-600">
                        <div className="flex items-center space-x-4 text-sm text-secondary-premium">
                          {daysLeft > 0 ? (
                            <span className={`flex items-center ${daysLeft <= 7 ? 'text-red-500' : 'text-orange-500'}`}>
                              <AlertCircle className="h-4 w-4 mr-1" />
                              {daysLeft} gün kaldı
                            </span>
                          ) : (
                            <span className="flex items-center text-red-500">
                              <AlertCircle className="h-4 w-4 mr-1" />
                              Süresi doldu
                            </span>
                          )}
                        </div>
                        <div className="flex items-center space-x-3">
                          {isApplied ? (
                            <span className="flex items-center px-4 py-2 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-xl">
                              <CheckCircle className="h-4 w-4 mr-2" />
                              Başvuru Yapıldı
                            </span>
                          ) : daysLeft > 0 ? (
                            <button
                              onClick={() => handleApply(internship.id)}
                              className="btn-premium px-6 py-3 flex items-center"
                            >
                              <Send className="h-4 w-4 mr-2" />
                              Başvur
                            </button>
                          ) : (
                            <button disabled className="btn-secondary-premium px-6 py-3 opacity-50 cursor-not-allowed">
                              Başvuru Süresi Doldu
                            </button>
                          )}
                          <button className="btn-secondary-premium px-4 py-3 flex items-center">
                            <ExternalLink className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        </>
      )}

      {/* Applications Tab */}
      {activeTab === 'applications' && (
        <section className="section-premium">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            {appliedInternships.size === 0 ? (
              <div className="text-center py-12">
                <div className="icon-premium mx-auto mb-6 bg-gradient-to-br from-gray-100 to-slate-100 dark:from-gray-900 dark:to-slate-900">
                  <Briefcase className="h-12 w-12 text-gray-400" />
                </div>
                <h3 className="text-xl font-bold text-primary-premium mb-2">
                  Henüz Başvuru Yapmadınız
                </h3>
                <p className="text-secondary-premium mb-6">
                  Staj ilanlarına göz atın ve ilginizi çeken pozisyonlara başvurun.
                </p>
                <button
                  onClick={() => setActiveTab('listings')}
                  className="btn-premium px-6 py-3"
                >
                  Staj İlanlarını Görüntüle
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-primary-premium mb-6">
                  Başvurularım ({appliedInternships.size})
                </h2>
                {Array.from(appliedInternships).map(internshipId => {
                  const internship = internships.find(i => i.id === internshipId);
                  return (
                    <div key={internshipId} className="card-premium">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="text-2xl">{internship.logo}</div>
                          <div>
                            <h3 className="font-bold text-primary-premium">{internship.company}</h3>
                            <p className="text-secondary-premium">{internship.position}</p>
                            <p className="text-sm text-secondary-premium">{internship.location}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="inline-flex items-center px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-lg text-sm font-medium">
                            <Clock className="h-4 w-4 mr-1" />
                            İnceleniyor
                          </span>
                          <p className="text-xs text-secondary-premium mt-1">
                            Başvuru tarihi: {new Date().toLocaleDateString('tr-TR')}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </section>
      )}

      {/* CV Tips Tab */}
      {activeTab === 'cv-tips' && (
        <section className="section-premium">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-primary-premium mb-4">
                YBS Öğrencileri için CV Rehberi
              </h2>
              <p className="text-lg text-secondary-premium">
                Yönetim Bilişim Sistemleri öğrencisi olarak CV'nizde neler olması gerektiğini öğrenin.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {cvTips.map((tip, index) => (
                <div key={index} className="card-premium">
                  <div className="flex items-start space-x-4">
                    <div className="text-3xl">{tip.icon}</div>
                    <div>
                      <h3 className="text-lg font-bold text-primary-premium mb-3">
                        {tip.title}
                      </h3>
                      <p className="text-secondary-premium leading-relaxed">
                        {tip.content}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* CV Template Download */}
            <div className="card-premium bg-gradient-to-r from-blue-50/60 to-violet-50/60 dark:from-blue-950/60 dark:to-violet-950/60 text-center">
              <h3 className="text-xl font-bold text-primary-premium mb-4">
                YBS Özel CV Şablonu
              </h3>
              <p className="text-secondary-premium mb-6">
                YBS öğrencileri için özel olarak tasarlanmış CV şablonunu indirin ve kendi bilgilerinizle güncelleyin.
              </p>
              <button className="btn-premium px-8 py-4 inline-flex items-center">
                <Download className="h-5 w-5 mr-2" />
                CV Şablonunu İndir
              </button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default YBSStaj; 