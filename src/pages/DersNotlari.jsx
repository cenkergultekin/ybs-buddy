import React, { useState } from 'react';
import { 
  FunnelIcon, 
  MagnifyingGlassIcon, 
  DocumentArrowDownIcon, 
  EyeIcon,
  StarIcon,
  UserIcon,
  CalendarIcon,
  ClockIcon,
  AcademicCapIcon,
  PencilSquareIcon,
  HeartIcon,
  BookmarkIcon,
  ShareIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';
import { StarIcon as StarSolidIcon, HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';
import PersonalNoteEditor from '../components/PersonalNoteEditor';

function DersNotlari() {
  const [selectedUniversity, setSelectedUniversity] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [favoriteNotes, setFavoriteNotes] = useState(new Set());
  const [likedNotes, setLikedNotes] = useState(new Set());
  const [showNoteEditor, setShowNoteEditor] = useState(false);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [noteFilter, setNoteFilter] = useState('all'); // 'all', 'main', 'student'
  const [showSummary, setShowSummary] = useState(null); // noteId for summary

  const universities = ['Bandırma On Yedi Eylül Üniversitesi', 'İstanbul Üniversitesi', 'Ankara Üniversitesi'];
  const classes = ['1. Sınıf', '2. Sınıf', '3. Sınıf', '4. Sınıf'];
  
  const courses = {
    '1. Sınıf': ['Atatürk İlkeleri ve İnkılap Tarihi', 'Türk Dili', 'Programlama Temelleri', 'Matematik I', 'YBS Giriş'],
    '2. Sınıf': ['Nesne Yönelimli Programlama', 'Veritabanı Yönetimi', 'İstatistik', 'Görsel Programlama'],
    '3. Sınıf': ['Veri Madenciliği', 'Web Programlama', 'Mobil Programlama', 'Yapay Zeka', 'Sistem Analizi'],
    '4. Sınıf': ['Stratejik Yönetim', 'Siber Güvenlik', 'Proje Yönetimi', 'E-ticaret', 'Büyük Veri']
  };

  const sampleNotes = [
    {
      id: 1,
      title: 'Programlama Temelleri - Java Giriş',
      course: 'Programlama Temelleri',
      class: '1. Sınıf',
      instructor: 'Prof. Dr. Mehmet Yılmaz',
      rating: 4.8,
      downloads: 1250,
      views: 3420,
      date: '2024-01-15',
      fileSize: '2.5 MB',
      pages: 45,
      tags: ['Java', 'OOP', 'Temel Kavramlar'],
      description: 'Java programlama diline giriş, değişkenler, döngüler ve temel yapılar',
      difficulty: 'Başlangıç',
      isMainNote: true,
      isStudentNote: false
    },
    {
      id: 2,
      title: 'Veritabanı Tasarımı ve Normalizasyon',
      course: 'Veritabanı Yönetimi',
      class: '2. Sınıf',
      instructor: 'Doç. Dr. Ayşe Kılıç',
      rating: 4.9,
      downloads: 980,
      views: 2150,
      date: '2024-01-10',
      fileSize: '3.8 MB',
      pages: 67,
      tags: ['SQL', 'Normalizasyon', 'ERD'],
      description: 'Veritabanı tasarım prensipleri, normalizasyon kuralları ve SQL sorguları',
      difficulty: 'Orta',
      isMainNote: true,
      isStudentNote: false
    },
    {
      id: 3,
      title: 'Yapay Zeka ve Makine Öğrenmesi',
      course: 'Yapay Zeka',
      class: '3. Sınıf',
      instructor: 'Prof. Dr. Can Özkan',
      rating: 4.7,
      downloads: 756,
      views: 1890,
      date: '2023-12-28',
      fileSize: '5.2 MB',
      pages: 89,
      tags: ['AI', 'ML', 'Python', 'Algoritmalar'],
      description: 'Yapay zeka temelleri, makine öğrenmesi algoritmaları ve uygulamaları',
      difficulty: 'İleri',
      isMainNote: false,
      isStudentNote: true,
      studentName: 'Ahmet Yıldız'
    },
    {
      id: 4,
      title: 'Web Programlama - React ve Node.js',
      course: 'Web Programlama',
      class: '3. Sınıf',
      instructor: 'Dr. Elif Demir',
      rating: 4.6,
      downloads: 642,
      views: 1456,
      date: '2024-01-05',
      fileSize: '4.1 MB',
      pages: 72,
      tags: ['React', 'Node.js', 'JavaScript', 'Full-Stack'],
      description: 'Modern web geliştirme teknolojileri ve full-stack uygulamalar',
      difficulty: 'Orta',
      isMainNote: false,
      isStudentNote: true,
      studentName: 'Zeynep Kaya'
    },
    {
      id: 5,
      title: 'Siber Güvenlik Temelleri',
      course: 'Siber Güvenlik',
      class: '4. Sınıf',
      instructor: 'Prof. Dr. Murat Güler',
      rating: 4.8,
      downloads: 523,
      views: 1234,
      date: '2023-12-20',
      fileSize: '3.5 MB',
      pages: 58,
      tags: ['Security', 'Encryption', 'Network'],
      description: 'Bilgi güvenliği prensipleri, şifreleme yöntemleri ve ağ güvenliği',
      difficulty: 'İleri',
      isMainNote: true,
      isStudentNote: false
    }
  ];

  const filteredNotes = sampleNotes.filter(note => {
    const matchesClass = !selectedClass || note.class === selectedClass;
    const matchesCourse = !selectedCourse || note.course === selectedCourse;
    const matchesSearch = !searchTerm || 
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.course.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesNoteFilter = noteFilter === 'all' || 
      (noteFilter === 'main' && note.isMainNote) ||
      (noteFilter === 'student' && note.isStudentNote);
    
    return matchesClass && matchesCourse && matchesSearch && matchesNoteFilter;
  });

  const toggleFavorite = (noteId) => {
    const newFavorites = new Set(favoriteNotes);
    if (newFavorites.has(noteId)) {
      newFavorites.delete(noteId);
    } else {
      newFavorites.add(noteId);
    }
    setFavoriteNotes(newFavorites);
  };

  const toggleLike = (noteId) => {
    const newLikes = new Set(likedNotes);
    if (newLikes.has(noteId)) {
      newLikes.delete(noteId);
    } else {
      newLikes.add(noteId);
    }
    setLikedNotes(newLikes);
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Başlangıç': return 'from-green-400 to-emerald-500';
      case 'Orta': return 'from-yellow-400 to-orange-500';
      case 'İleri': return 'from-red-400 to-pink-500';
      default: return 'from-gray-400 to-gray-500';
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-20 right-10 w-64 h-64 bg-purple-400/10 rounded-full animate-pulse delay-500"></div>
        <div className="absolute bottom-20 left-10 w-80 h-80 bg-blue-400/10 rounded-full animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header */}
        <div className="text-center mb-12 animate-slide-up">
          <h1 className="heading-lg mb-4">📚 Ders Notları</h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            YBS derslerinin kapsamlı notları, örnekleri ve materyalleri
          </p>
        </div>

        {/* Filters */}
        <div className="card-modern mb-8 animate-fade-in">
          <div className="flex items-center space-x-4 mb-6">
            <FunnelIcon className="w-6 h-6 text-blue-500" />
            <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200">Filtreler</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Not Türü
              </label>
              <select
                value={noteFilter}
                onChange={(e) => setNoteFilter(e.target.value)}
                className="select-modern"
              >
                <option value="all">Tüm Notlar</option>
                <option value="main">🎓 Hocanın Ana Notları</option>
                <option value="student">👥 Öğrenci Notları</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Üniversite
              </label>
              <select
                value={selectedUniversity}
                onChange={(e) => setSelectedUniversity(e.target.value)}
                className="select-modern"
              >
                <option value="">Tüm Üniversiteler</option>
                {universities.map(uni => (
                  <option key={uni} value={uni}>{uni}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Sınıf
              </label>
              <select
                value={selectedClass}
                onChange={(e) => {
                  setSelectedClass(e.target.value);
                  setSelectedCourse('');
                }}
                className="select-modern"
              >
                <option value="">Tüm Sınıflar</option>
                {classes.map(cls => (
                  <option key={cls} value={cls}>{cls}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Ders
              </label>
              <select
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
                className="select-modern"
                disabled={!selectedClass}
              >
                <option value="">Tüm Dersler</option>
                {selectedClass && courses[selectedClass]?.map(course => (
                  <option key={course} value={course}>{course}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Görünüm
              </label>
              <div className="flex space-x-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`btn-ghost flex-1 ${viewMode === 'grid' ? 'bg-blue-500 text-white' : ''}`}
                >
                  Kart
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`btn-ghost flex-1 ${viewMode === 'list' ? 'bg-blue-500 text-white' : ''}`}
                >
                  Liste
                </button>
              </div>
            </div>
          </div>

          {/* Search */}
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Not ara... (başlık, ders, eğitmen, etiket)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-modern pl-12"
            />
          </div>
        </div>

        {/* Results Count & Quick Actions */}
        <div className="flex justify-between items-center mb-8">
          <div className="text-slate-600 dark:text-slate-400">
            <span className="font-semibold text-slate-800 dark:text-slate-200">{filteredNotes.length}</span> not bulundu
          </div>
          <button
            onClick={() => setShowNoteEditor(true)}
            className="btn-modern mobile-friendly"
          >
            <PencilSquareIcon className="w-5 h-5 mr-2" />
            Not Al
          </button>
        </div>

        {/* Notes Grid/List */}
        <div className={`${viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8' : 'space-y-6'}`}>
          {filteredNotes.map((note, index) => (
            <div 
              key={note.id} 
              className={`card-modern card-hover-float card-glow group animate-scale-in ${
                viewMode === 'list' ? 'flex items-center space-x-6' : ''
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Note Header */}
              <div className={`${viewMode === 'list' ? 'flex-1' : 'mb-6'}`}>
                {/* Main Note Badge */}
                {note.isMainNote && (
                  <div className="mb-3">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-yellow-400 to-orange-500 text-white shadow-lg">
                      ⭐ Ana Ders Notu
                    </span>
                  </div>
                )}
                
                {/* Student Note Badge */}
                {note.isStudentNote && (
                  <div className="mb-3">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-blue-400 to-purple-500 text-white shadow-lg">
                      👥 Öğrenci Notu
                    </span>
                  </div>
                )}
                
                <div className="flex justify-between items-start mb-4">
                  <div className={`${viewMode === 'list' ? 'flex-1' : ''}`}>
                    <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 group-hover:text-gradient transition-all duration-300 mb-2">
                      {note.title}
                    </h3>
                    <div className="flex items-center space-x-2 text-sm text-slate-600 dark:text-slate-400">
                      <AcademicCapIcon className="w-4 h-4" />
                      <span>{note.course}</span>
                      <span>•</span>
                      <span>{note.class}</span>
                    </div>
                  </div>

                  {/* Difficulty Badge */}
                  <div className={`px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r ${getDifficultyColor(note.difficulty)}`}>
                    {note.difficulty}
                  </div>
                </div>

                {/* Instructor/Student Info */}
                <div className="flex items-center space-x-2 mb-4">
                  {note.isMainNote ? (
                    <>
                      <AcademicCapIcon className="w-4 h-4 text-blue-500" />
                      <span className="text-sm text-slate-600 dark:text-slate-400 font-medium">{note.instructor}</span>
                      <span className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-2 py-1 rounded-full">Eğitmen</span>
                    </>
                  ) : (
                    <>
                      <UserIcon className="w-4 h-4 text-purple-500" />
                      <span className="text-sm text-slate-600 dark:text-slate-400">{note.studentName}</span>
                      <span className="text-xs text-slate-500">tarafından paylaşıldı</span>
                    </>
                  )}
                </div>

                {/* Description */}
                <p className="text-slate-600 dark:text-slate-400 text-sm mb-4 leading-relaxed">
                  {note.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {note.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-3 py-1 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 text-blue-800 dark:text-blue-300 text-xs rounded-full font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center space-x-2">
                    <StarSolidIcon className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">{note.rating}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <DocumentArrowDownIcon className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-slate-600 dark:text-slate-400">{note.downloads}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <EyeIcon className="w-4 h-4 text-blue-500" />
                    <span className="text-sm text-slate-600 dark:text-slate-400">{note.views}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CalendarIcon className="w-4 h-4 text-purple-500" />
                    <span className="text-sm text-slate-600 dark:text-slate-400">{note.date}</span>
                  </div>
                </div>

                {/* File Info */}
                <div className="glass-card dark:glass-card-dark rounded-xl p-3 mb-6">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-600 dark:text-slate-400">
                      📄 {note.pages} sayfa • {note.fileSize}
                    </span>
                    <span className="text-slate-500 dark:text-slate-500">PDF</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className={`${viewMode === 'list' ? 'flex flex-col space-y-2' : 'flex flex-wrap gap-2'}`}>
                <button className="btn-modern flex-1 mobile-friendly">
                  <DocumentArrowDownIcon className="w-4 h-4 mr-2" />
                  İndir
                </button>
                <button className="btn-ghost flex-1 mobile-friendly">
                  <EyeIcon className="w-4 h-4 mr-2" />
                  Önizle
                </button>
                <button 
                  onClick={() => setShowSummary(note.id)}
                  className="btn-ghost flex-1 mobile-friendly bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-purple-200 dark:border-purple-700 text-purple-700 dark:text-purple-300 hover:from-purple-100 hover:to-pink-100"
                >
                  <SparklesIcon className="w-4 h-4 mr-2" />
                  Özetle
                </button>
                
                {/* Quick Actions */}
                <div className="flex space-x-2">
                  <button
                    onClick={() => toggleFavorite(note.id)}
                    className={`mobile-friendly p-2 rounded-xl transition-all duration-300 hover:scale-110 ${
                      favoriteNotes.has(note.id)
                        ? 'bg-yellow-500 text-white'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    <BookmarkIcon className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => toggleLike(note.id)}
                    className={`mobile-friendly p-2 rounded-xl transition-all duration-300 hover:scale-110 ${
                      likedNotes.has(note.id)
                        ? 'bg-red-500 text-white'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    {likedNotes.has(note.id) ? (
                      <HeartSolidIcon className="w-4 h-4" />
                    ) : (
                      <HeartIcon className="w-4 h-4" />
                    )}
                  </button>
                  <button className="mobile-friendly p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 transition-all duration-300 hover:scale-110">
                    <ShareIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredNotes.length === 0 && (
          <div className="text-center py-16">
            <div className="card-modern max-w-md mx-auto">
              <SparklesIcon className="w-16 h-16 text-slate-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-2">
                Not bulunamadı
              </h3>
              <p className="text-slate-600 dark:text-slate-400 mb-6">
                Arama kriterlerinize uygun not bulunamadı. Filtreleri değiştirmeyi deneyin.
              </p>
              <button
                onClick={() => {
                  setSelectedClass('');
                  setSelectedCourse('');
                  setSearchTerm('');
                }}
                className="btn-ghost"
              >
                Filtreleri Temizle
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Personal Note Editor Modal */}
      {showNoteEditor && (
        <PersonalNoteEditor
          isOpen={showNoteEditor}
          onClose={() => setShowNoteEditor(false)}
        />
      )}

      {/* Summary Modal */}
      {showSummary && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="card-modern max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-scale-in">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-500 rounded-xl flex items-center justify-center">
                  <SparklesIcon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200">
                    Ders Notu Özeti
                  </h2>
                  <p className="text-slate-600 dark:text-slate-400">
                    AI destekli özet çıkarma
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowSummary(null)}
                className="mobile-friendly p-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all duration-300"
              >
                ✕
              </button>
            </div>

            {(() => {
              const note = sampleNotes.find(n => n.id === showSummary);
              if (!note) return null;

              return (
                <>
                  <div className="glass-card dark:glass-card-dark rounded-xl p-4 mb-6">
                    <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-2">
                      {note.title}
                    </h3>
                    <div className="flex items-center space-x-4 text-sm text-slate-600 dark:text-slate-400">
                      <span>{note.course} - {note.class}</span>
                      <span>•</span>
                      <span>{note.pages} sayfa</span>
                      <span>•</span>
                      <span>{note.difficulty}</span>
                    </div>
                  </div>

                  <div className="space-y-6">
                    {/* Ana Konular */}
                    <div className="glass-card dark:glass-card-dark rounded-xl p-6">
                      <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-4 flex items-center">
                        🎯 Ana Konular
                      </h4>
                      <ul className="space-y-2">
                        <li className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                          <span className="text-slate-700 dark:text-slate-300">Programlama temel kavramları ve değişken türleri</span>
                        </li>
                        <li className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                          <span className="text-slate-700 dark:text-slate-300">Kontrol yapıları (if-else, döngüler)</span>
                        </li>
                        <li className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                          <span className="text-slate-700 dark:text-slate-300">Fonksiyon tanımlama ve kullanımı</span>
                        </li>
                        <li className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                          <span className="text-slate-700 dark:text-slate-300">Nesne yönelimli programlama temelleri</span>
                        </li>
                      </ul>
                    </div>

                    {/* Önemli Noktalar */}
                    <div className="glass-card dark:glass-card-dark rounded-xl p-6">
                      <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-4 flex items-center">
                        ⚡ Önemli Noktalar
                      </h4>
                      <div className="space-y-3">
                        <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 p-3 rounded">
                          <p className="text-slate-700 dark:text-slate-300 text-sm">
                            Java'da String sınıfı immutable'dır, değiştirilemeyen bir veri yapısıdır.
                          </p>
                        </div>
                        <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-400 p-3 rounded">
                          <p className="text-slate-700 dark:text-slate-300 text-sm">
                            Döngülerde sonsuz döngüye düşmemek için döngü koşulunun değişmesi gerekir.
                          </p>
                        </div>
                        <div className="bg-green-50 dark:bg-green-900/20 border-l-4 border-green-400 p-3 rounded">
                          <p className="text-slate-700 dark:text-slate-300 text-sm">
                            Fonksiyonlar kod tekrarını önler ve programın okunabilirliğini artırır.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Özet */}
                    <div className="glass-card dark:glass-card-dark rounded-xl p-6">
                      <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-4 flex items-center">
                        📋 Kısa Özet
                      </h4>
                      <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                        Bu ders notunda Java programlama dilinin temel kavramları ele alınmaktadır. 
                        Değişken türleri, kontrol yapıları, döngüler ve fonksiyonlar konularında 
                        detaylı açıklamalar ve örnekler yer almaktadır. Özellikle nesne yönelimli 
                        programlama konusuna giriş yapılarak, ileriki derslerin temeli atılmaktadır.
                      </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3">
                      <button 
                        onClick={() => setShowSummary(null)}
                        className="btn-modern flex-1"
                      >
                        📖 Tam Notu Görüntüle
                      </button>
                      <button className="btn-ghost flex-1">
                        📋 Özeti Kaydet
                      </button>
                      <button className="btn-ghost flex-1">
                        📤 Özeti Paylaş
                      </button>
                    </div>
                  </div>
                </>
              );
            })()}
          </div>
        </div>
      )}
    </div>
  );
}

export default DersNotlari; 