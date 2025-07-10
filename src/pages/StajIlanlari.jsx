import React, { useState } from 'react';
import {
  MagnifyingGlassIcon,
  FunnelIcon,
  MapPinIcon,
  CurrencyDollarIcon,
  ClockIcon,
  BuildingOfficeIcon,
  StarIcon,
  BookmarkIcon,
  EyeIcon,
  ShareIcon,
  PaperAirplaneIcon,
  DocumentTextIcon,
  AcademicCapIcon,
  BriefcaseIcon,
  UserGroupIcon,
  ChartBarIcon,
  ShieldCheckIcon,
  ComputerDesktopIcon,
  SparklesIcon,
  FireIcon,
  TrophyIcon
} from '@heroicons/react/24/outline';
import { StarIcon as StarSolidIcon, BookmarkIcon as BookmarkSolidIcon } from '@heroicons/react/24/solid';

function StajIlanlari() {
  const [selectedSector, setSelectedSector] = useState('Tümü');
  const [selectedType, setSelectedType] = useState('Tümü');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('ilanlar');
  const [savedJobs, setSavedJobs] = useState(new Set([1, 3, 5]));
  const [appliedJobs, setAppliedJobs] = useState(new Set([2, 4]));

  const sectors = [
    { name: 'Tümü', count: 25, icon: '💼', color: 'from-gray-400 to-gray-500' },
    { name: 'Teknoloji', count: 12, icon: '💻', color: 'from-blue-400 to-cyan-500' },
    { name: 'Finans', count: 6, icon: '💰', color: 'from-green-400 to-emerald-500' },
    { name: 'Danışmanlık', count: 4, icon: '📊', color: 'from-purple-400 to-pink-500' },
    { name: 'Kamu', count: 2, icon: '🏛️', color: 'from-orange-400 to-red-500' },
    { name: 'E-ticaret', count: 1, icon: '🛒', color: 'from-indigo-400 to-purple-500' }
  ];

  const internshipTypes = [
    'Tümü', 'Yazılım Geliştirme', 'Veri Analizi', 'Proje Yönetimi', 
    'İş Analizi', 'Sistem Analizi', 'Siber Güvenlik'
  ];

  const locations = ['Tümü', 'İstanbul', 'Ankara', 'İzmir', 'Bursa', 'Antalya', 'Remote'];

  const internships = [
    {
      id: 1,
      title: 'Yazılım Geliştirme Stajyeri',
      company: 'Microsoft Turkey',
      location: 'İstanbul',
      sector: 'Teknoloji',
      type: 'Yazılım Geliştirme',
      duration: '3 ay',
      salary: '8,000 TL/ay',
      description: 'C#, .NET Core ve Azure teknolojileri ile enterprise yazılım geliştirme projelerinde yer alacaksınız.',
      requirements: ['C# programlama', '.NET Framework', 'SQL', 'Git'],
      benefits: ['Mentörlük programı', 'Teknoloji eğitimleri', 'Flexible çalışma', 'Staj sonrası iş fırsatı'],
      postedDate: '2024-01-15',
      deadline: '2024-02-15',
      views: 245,
      applications: 89,
      featured: true,
      urgent: false,
      remote: false
    },
    {
      id: 2,
      title: 'Veri Analisti Stajyeri',
      company: 'Akbank',
      location: 'İstanbul',
      sector: 'Finans',
      type: 'Veri Analizi',
      duration: '4 ay',
      salary: '7,500 TL/ay',
      description: 'Bankacılık verilerini analiz edecek, dashboard\'lar oluşturacak ve raporlama süreçlerinde yer alacaksınız.',
      requirements: ['Python/R', 'SQL', 'Excel', 'Tableau/Power BI'],
      benefits: ['Finansal ürün eğitimleri', 'Veri bilimi sertifikaları', 'Networking fırsatları'],
      postedDate: '2024-01-12',
      deadline: '2024-02-10',
      views: 198,
      applications: 67,
      featured: false,
      urgent: true,
      remote: false
    },
    {
      id: 3,
      title: 'İş Analisti Stajyeri',
      company: 'Trendyol',
      location: 'İstanbul',
      sector: 'E-ticaret',
      type: 'İş Analizi',
      duration: '6 ay',
      salary: '9,000 TL/ay',
      description: 'E-ticaret süreçlerini analiz edecek, iyileştirme önerileri geliştirecek ve proje takibi yapacaksınız.',
      requirements: ['İş analizi', 'Process mapping', 'BPMN', 'Agile metodolojileri'],
      benefits: ['E-ticaret sektör deneyimi', 'Agile coaching', 'Startup kültürü', 'Hızlı kariyer gelişimi'],
      postedDate: '2024-01-10',
      deadline: '2024-02-05',
      views: 312,
      applications: 124,
      featured: true,
      urgent: false,
      remote: true
    },
    {
      id: 4,
      title: 'Proje Yönetimi Stajyeri',
      company: 'Deloitte',
      location: 'Ankara',
      sector: 'Danışmanlık',
      type: 'Proje Yönetimi',
      duration: '3 ay',
      salary: '8,500 TL/ay',
      description: 'Danışmanlık projelerinde proje koordinasyonu, müşteri iletişimi ve raporlama süreçlerinde destek olacaksınız.',
      requirements: ['MS Project', 'Excel', 'Proje yönetimi bilgisi', 'İngilizce'],
      benefits: ['Uluslararası müşteri deneyimi', 'PMP sertifika desteği', 'Global kariyer fırsatları'],
      postedDate: '2024-01-08',
      deadline: '2024-01-30',
      views: 156,
      applications: 43,
      featured: false,
      urgent: true,
      remote: false
    },
    {
      id: 5,
      title: 'Sistem Analisti Stajyeri',
      company: 'Aselsan',
      location: 'Ankara',
      sector: 'Kamu',
      type: 'Sistem Analizi',
      duration: '4 ay',
      salary: '7,000 TL/ay',
      description: 'Savunma sanayi projelerinde sistem gereksinimleri analizi ve dokümantasyon süreçlerinde yer alacaksınız.',
      requirements: ['UML', 'Sistem analizi', 'Dokümantasyon', 'Güvenlik izni'],
      benefits: ['Savunma sanayi deneyimi', 'Güvenlik clearance', 'Teknik eğitimler'],
      postedDate: '2024-01-05',
      deadline: '2024-01-25',
      views: 89,
      applications: 28,
      featured: false,
      urgent: false,
      remote: false
    },
    {
      id: 6,
      title: 'Siber Güvenlik Stajyeri',
      company: 'İş Bankası',
      location: 'İstanbul',
      sector: 'Finans',
      type: 'Siber Güvenlik',
      duration: '5 ay',
      salary: '8,200 TL/ay',
      description: 'Bankacılık sistemlerinin güvenlik analizleri, penetration testing ve güvenlik politikaları geliştirme.',
      requirements: ['Network güvenliği', 'Penetration testing', 'Python', 'Linux'],
      benefits: ['Siber güvenlik sertifikaları', 'Ethical hacking eğitimleri', 'SOC deneyimi'],
      postedDate: '2024-01-03',
      deadline: '2024-01-20',
      views: 278,
      applications: 91,
      featured: true,
      urgent: false,
      remote: false
    }
  ];

  const filteredInternships = internships.filter(internship => {
    const matchesSector = selectedSector === 'Tümü' || internship.sector === selectedSector;
    const matchesType = selectedType === 'Tümü' || internship.type === selectedType;
    const matchesLocation = !selectedLocation || selectedLocation === 'Tümü' || internship.location === selectedLocation;
    const matchesSearch = !searchTerm || 
      internship.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      internship.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      internship.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      internship.requirements.some(req => req.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesSector && matchesType && matchesLocation && matchesSearch;
  });

  const featuredInternships = filteredInternships.filter(internship => internship.featured);
  const urgentInternships = filteredInternships.filter(internship => internship.urgent);

  const toggleSave = (internshipId) => {
    const newSaved = new Set(savedJobs);
    if (newSaved.has(internshipId)) {
      newSaved.delete(internshipId);
    } else {
      newSaved.add(internshipId);
    }
    setSavedJobs(newSaved);
  };

  const toggleApply = (internshipId) => {
    const newApplied = new Set(appliedJobs);
    if (newApplied.has(internshipId)) {
      newApplied.delete(internshipId);
    } else {
      newApplied.add(internshipId);
    }
    setAppliedJobs(newApplied);
  };

  const getSectorColor = (sector) => {
    const sectorData = sectors.find(s => s.name === sector);
    return sectorData?.color || 'from-gray-400 to-gray-500';
  };

  const renderInternshipCard = (internship, index) => (
    <div 
      key={internship.id} 
      className="card-modern card-hover-float animate-scale-in relative"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {/* Badges */}
      <div className="absolute -top-3 -left-3 flex flex-col space-y-2">
        {internship.featured && (
          <span className="px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r from-yellow-400 to-orange-500 shadow-lg">
            ⭐ Öne Çıkan
          </span>
        )}
        {internship.urgent && (
          <span className="px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r from-red-400 to-pink-500 shadow-lg">
            🔥 Acil
          </span>
        )}
        {internship.remote && (
          <span className="px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r from-green-400 to-emerald-500 shadow-lg">
            🌐 Remote
          </span>
        )}
      </div>

      {/* Company & Title */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-2 group-hover:text-gradient transition-all duration-300">
            {internship.title}
          </h3>
          <div className="flex items-center space-x-2 mb-2">
            <BuildingOfficeIcon className="w-5 h-5 text-blue-500" />
            <span className="font-semibold text-slate-700 dark:text-slate-300">{internship.company}</span>
          </div>
          <div className="flex items-center space-x-4 text-sm text-slate-600 dark:text-slate-400">
            <div className="flex items-center space-x-1">
              <MapPinIcon className="w-4 h-4" />
              <span>{internship.location}</span>
            </div>
            <div className="flex items-center space-x-1">
              <ClockIcon className="w-4 h-4" />
              <span>{internship.duration}</span>
            </div>
            <div className="flex items-center space-x-1">
              <CurrencyDollarIcon className="w-4 h-4" />
              <span className="font-semibold text-green-600 dark:text-green-400">{internship.salary}</span>
            </div>
          </div>
        </div>
        
        {/* Quick Actions */}
        <div className="flex space-x-2">
          <button
            onClick={() => toggleSave(internship.id)}
            className={`mobile-friendly p-2 rounded-xl transition-all duration-300 hover:scale-110 ${
              savedJobs.has(internship.id)
                ? 'bg-blue-500 text-white'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
            }`}
          >
            {savedJobs.has(internship.id) ? (
              <BookmarkSolidIcon className="w-5 h-5" />
            ) : (
              <BookmarkIcon className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Sector Badge */}
      <div className="mb-4">
        <span className={`px-4 py-2 rounded-full text-sm font-medium text-white bg-gradient-to-r ${getSectorColor(internship.sector)}`}>
          {sectors.find(s => s.name === internship.sector)?.icon} {internship.sector}
        </span>
      </div>

      {/* Description */}
      <p className="text-slate-600 dark:text-slate-400 text-sm mb-4 leading-relaxed line-clamp-3">
        {internship.description}
      </p>

      {/* Requirements */}
      <div className="mb-4">
        <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-2">Gereksinimler:</h4>
        <div className="flex flex-wrap gap-2">
          {internship.requirements.slice(0, 4).map((req, reqIndex) => (
            <span
              key={reqIndex}
              className="px-3 py-1 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 text-blue-800 dark:text-blue-300 text-xs rounded-full font-medium"
            >
              {req}
            </span>
          ))}
          {internship.requirements.length > 4 && (
            <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-xs rounded-full">
              +{internship.requirements.length - 4}
            </span>
          )}
        </div>
      </div>

      {/* Benefits */}
      <div className="mb-6">
        <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-2">Avantajlar:</h4>
        <div className="space-y-1">
          {internship.benefits.slice(0, 3).map((benefit, benefitIndex) => (
            <div key={benefitIndex} className="flex items-center text-sm text-slate-600 dark:text-slate-400">
              <div className="w-1.5 h-1.5 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full mr-3"></div>
              {benefit}
            </div>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center">
          <div className="text-lg font-bold text-slate-800 dark:text-slate-200">{internship.views}</div>
          <div className="text-xs text-slate-600 dark:text-slate-400">Görüntüleme</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-slate-800 dark:text-slate-200">{internship.applications}</div>
          <div className="text-xs text-slate-600 dark:text-slate-400">Başvuru</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-slate-800 dark:text-slate-200">{internship.deadline}</div>
          <div className="text-xs text-slate-600 dark:text-slate-400">Son Tarih</div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex space-x-3">
        <button
          onClick={() => toggleApply(internship.id)}
          className={`btn-modern flex-1 mobile-friendly ${
            appliedJobs.has(internship.id) ? 'bg-green-500' : ''
          }`}
        >
          <PaperAirplaneIcon className="w-4 h-4 mr-2" />
          {appliedJobs.has(internship.id) ? 'Başvuruldu' : 'Başvur'}
        </button>
        <button className="btn-ghost mobile-friendly">
          <EyeIcon className="w-4 h-4 mr-2" />
          Detay
        </button>
        <button className="mobile-friendly p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 transition-all duration-300 hover:scale-110">
          <ShareIcon className="w-4 h-4" />
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-20 right-10 w-64 h-64 bg-blue-400/10 rounded-full animate-pulse delay-500"></div>
        <div className="absolute bottom-20 left-10 w-80 h-80 bg-purple-400/10 rounded-full animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header */}
        <div className="text-center mb-12 animate-slide-up">
          <h1 className="heading-lg mb-4">💼 YBS Staj İlanları</h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            YBS öğrencileri için özel staj fırsatları ve kariyer rehberliği
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <div className="glass-card dark:glass-card-dark rounded-2xl p-2">
            <div className="flex space-x-2">
              {[
                { id: 'ilanlar', name: 'Staj İlanları', icon: BriefcaseIcon },
                { id: 'basvurular', name: 'Başvurularım', icon: DocumentTextIcon },
                { id: 'cv-rehber', name: 'CV Rehberi', icon: AcademicCapIcon }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`nav-item mobile-friendly ${activeTab === tab.id ? 'active' : ''}`}
                >
                  <tab.icon className="w-4 h-4 mr-2" />
                  {tab.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'ilanlar' && (
          <>
            {/* Filters */}
            <div className="card-modern mb-8 animate-fade-in">
              <div className="flex items-center space-x-4 mb-6">
                <FunnelIcon className="w-6 h-6 text-blue-500" />
                <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200">Filtreler</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Staj Türü
                  </label>
                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="select-modern"
                  >
                    {internshipTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Lokasyon
                  </label>
                  <select
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className="select-modern"
                  >
                    {locations.map(location => (
                      <option key={location} value={location}>{location}</option>
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
                      placeholder="Pozisyon, şirket veya teknoloji ara..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="input-modern pl-12"
                    />
                  </div>
                </div>
              </div>

              {/* Sectors */}
              <div className="flex flex-wrap gap-3">
                {sectors.map((sector) => (
                  <button
                    key={sector.name}
                    onClick={() => setSelectedSector(sector.name)}
                    className={`mobile-friendly px-6 py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105 ${
                      selectedSector === sector.name
                        ? `bg-gradient-to-r ${sector.color} text-white shadow-lg`
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                    }`}
                  >
                    <span className="mr-2">{sector.icon}</span>
                    {sector.name}
                    <span className="ml-2 text-sm opacity-75">({sector.count})</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Featured & Urgent */}
            {(featuredInternships.length > 0 || urgentInternships.length > 0) && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                {featuredInternships.length > 0 && (
                  <div>
                    <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-4 flex items-center">
                      <StarSolidIcon className="w-6 h-6 mr-3 text-yellow-500" />
                      Öne Çıkan İlanlar
                    </h2>
                    <div className="space-y-4">
                      {featuredInternships.slice(0, 2).map((internship, index) => (
                        <div key={`featured-${internship.id}`} className="card-modern border-2 border-yellow-200 dark:border-yellow-800">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-bold text-slate-800 dark:text-slate-200">{internship.title}</h3>
                              <p className="text-slate-600 dark:text-slate-400">{internship.company} • {internship.location}</p>
                              <p className="text-green-600 dark:text-green-400 font-semibold">{internship.salary}</p>
                            </div>
                            <span className="px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r from-yellow-400 to-orange-500">
                              ⭐ Öne Çıkan
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {urgentInternships.length > 0 && (
                  <div>
                    <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-4 flex items-center">
                      <FireIcon className="w-6 h-6 mr-3 text-red-500" />
                      Acil İlanlar
                    </h2>
                    <div className="space-y-4">
                      {urgentInternships.slice(0, 2).map((internship, index) => (
                        <div key={`urgent-${internship.id}`} className="card-modern border-2 border-red-200 dark:border-red-800">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-bold text-slate-800 dark:text-slate-200">{internship.title}</h3>
                              <p className="text-slate-600 dark:text-slate-400">{internship.company} • {internship.location}</p>
                              <p className="text-red-600 dark:text-red-400 font-semibold">Son: {internship.deadline}</p>
                            </div>
                            <span className="px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r from-red-400 to-pink-500">
                              🔥 Acil
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Results Count */}
            <div className="flex justify-between items-center mb-6">
              <div className="text-slate-600 dark:text-slate-400">
                <span className="font-semibold text-slate-800 dark:text-slate-200">{filteredInternships.length}</span> staj ilanı bulundu
              </div>
            </div>

            {/* Internships Grid */}
            {filteredInternships.length === 0 ? (
              <div className="text-center py-16">
                <div className="card-modern max-w-md mx-auto">
                  <BriefcaseIcon className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-2">
                    İlan bulunamadı
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 mb-6">
                    Arama kriterlerinize uygun staj ilanı bulunamadı. Filtreleri değiştirmeyi deneyin.
                  </p>
                  <button
                    onClick={() => {
                      setSelectedSector('Tümü');
                      setSelectedType('Tümü');
                      setSelectedLocation('');
                      setSearchTerm('');
                    }}
                    className="btn-ghost"
                  >
                    Filtreleri Temizle
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredInternships.map((internship, index) => renderInternshipCard(internship, index))}
              </div>
            )}
          </>
        )}

        {/* Applications Tab */}
        {activeTab === 'basvurular' && (
          <div className="card-modern">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-6">Başvurularım</h2>
            {appliedJobs.size === 0 ? (
              <div className="text-center py-12">
                <DocumentTextIcon className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-2">
                  Henüz başvuru yapmadınız
                </h3>
                <p className="text-slate-600 dark:text-slate-400 mb-6">
                  İlginizi çeken staj ilanlarına başvurmaya başlayın
                </p>
                <button
                  onClick={() => setActiveTab('ilanlar')}
                  className="btn-modern"
                >
                  <BriefcaseIcon className="w-5 h-5 mr-2" />
                  İlanları Görüntüle
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {internships.filter(i => appliedJobs.has(i.id)).map((internship) => (
                  <div key={internship.id} className="glass-card dark:glass-card-dark rounded-xl p-6 flex justify-between items-center">
                    <div>
                      <h3 className="font-bold text-slate-800 dark:text-slate-200">{internship.title}</h3>
                      <p className="text-slate-600 dark:text-slate-400">{internship.company} • {internship.location}</p>
                      <span className="inline-block px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 text-sm rounded-full mt-2">
                        ✅ Başvuru Gönderildi
                      </span>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-slate-500">Başvuru Tarihi</p>
                      <p className="font-semibold text-slate-800 dark:text-slate-200">15 Ocak 2024</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* CV Guide Tab */}
        {activeTab === 'cv-rehber' && (
          <div className="space-y-8">
            <div className="card-modern">
              <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-6">
                📋 YBS Öğrencileri İçin CV Rehberi
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-4">✅ CV'de Olması Gerekenler</h3>
                  <div className="space-y-3">
                    {[
                      'Kişisel bilgiler ve iletişim',
                      'Eğitim geçmişi (GPA dahil)',
                      'Teknik beceriler (programlama dilleri)',
                      'Projeler ve portfolyo',
                      'İş deneyimi (varsa)',
                      'Sertifikalar ve kurslar',
                      'Yabancı dil seviyen'
                    ].map((item, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-slate-600 dark:text-slate-400">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-4">❌ CV'de Olmaması Gerekenler</h3>
                  <div className="space-y-3">
                    {[
                      'Fotoğraf (zorunlu değilse)',
                      'Çok detaylı kişisel bilgiler',
                      'Gereksiz tasarım öğeleri',
                      'Alakasız iş deneyimleri',
                      'Çok uzun açıklamalar',
                      'Yanlış yazım ve dilbilgisi',
                      'Güncel olmayan teknolojiler'
                    ].map((item, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                        <span className="text-slate-600 dark:text-slate-400">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-200/50 dark:border-slate-700/50">
                <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-4">
                  🚀 YBS Öğrencileri İçin Özel İpuçları
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <ComputerDesktopIcon className="w-12 h-12 text-blue-500 mx-auto mb-3" />
                    <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-2">Teknik Beceriler</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Programlama dillerini ve araçları seviyenizle birlikte belirtin
                    </p>
                  </div>
                  <div className="text-center">
                    <ChartBarIcon className="w-12 h-12 text-green-500 mx-auto mb-3" />
                    <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-2">Analitik Düşünce</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Veri analizi ve problem çözme becerilerinizi vurgulayın
                    </p>
                  </div>
                  <div className="text-center">
                    <UserGroupIcon className="w-12 h-12 text-purple-500 mx-auto mb-3" />
                    <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-2">İş Analizi</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Süreç analizi ve geliştirme deneyimlerinizi öne çıkarın
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="card-modern text-center">
              <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-4">
                📄 CV Şablonu İndir
              </h3>
              <p className="text-slate-600 dark:text-slate-400 mb-6">
                YBS öğrencileri için özel olarak hazırlanmış CV şablonunu indirin
              </p>
              <button className="btn-modern mobile-friendly">
                <DocumentTextIcon className="w-5 h-5 mr-2" />
                CV Şablonunu İndir (.docx)
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default StajIlanlari; 