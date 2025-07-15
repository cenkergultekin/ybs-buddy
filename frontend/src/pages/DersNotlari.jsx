import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
import { curriculum } from '../data/curriculum';

function DersNotlari() {
  const navigate = useNavigate();
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSemester, setSelectedSemester] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [favoriteNotes, setFavoriteNotes] = useState(new Set());
  const [likedNotes, setLikedNotes] = useState(new Set());

  const classes = ['1. Sınıf', '2. Sınıf', '3. Sınıf', '4. Sınıf'];
  const semesters = ['Güz', 'Bahar'];
  
  // Seçili sınıf ve döneme göre dersları getir
  const getCoursesForSemesterLocal = (classNum, semester) => {
    if (!classNum || !semester) return [];
    const classKey = classNum.charAt(0); // '1. Sınıf' -> '1'
    return curriculum[classKey]?.[semester] || [];
  };

  // Backend'den gelecek - şimdilik boş array
  const notes = [];

  // Filtreleme - notes boş olduğu için boş array döner
  const filteredNotes = notes.filter(note => {
    if (selectedClass && note.class !== selectedClass) return false;
    if (selectedSemester && note.semester !== selectedSemester) return false;
    if (selectedCourse && note.course !== selectedCourse) return false;
    if (searchTerm && !note.title.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !note.course.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  const toggleFavorite = (noteId) => {
    setFavoriteNotes(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(noteId)) {
        newFavorites.delete(noteId);
      } else {
        newFavorites.add(noteId);
      }
      return newFavorites;
    });
  };

  const toggleLike = (noteId) => {
    setLikedNotes(prev => {
      const newLikes = new Set(prev);
      if (newLikes.has(noteId)) {
        newLikes.delete(noteId);
      } else {
        newLikes.add(noteId);
      }
      return newLikes;
    });
  };

  const getRatingStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating - fullStars >= 0.5;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<StarSolidIcon key={i} className="w-4 h-4 text-yellow-400" />);
    }
    
    if (hasHalfStar) {
      stars.push(<StarSolidIcon key="half" className="w-4 h-4 text-yellow-400" />);
    }
    
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<StarIcon key={`empty-${i}`} className="w-4 h-4 text-gray-300 dark:text-gray-600" />);
    }
    
    return stars;
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Başlangıç': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'Orta': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'İleri': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
    }
  };

  const getAvailableCourses = () => {
    if (!selectedClass || !selectedSemester) return [];
    return getCoursesForSemesterLocal(selectedClass, selectedSemester);
  };

  return (
    <div className="pt-18 min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      {/* Header */}
      <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-slate-700/50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 rounded-full mb-4 border border-blue-200/30 dark:border-blue-800/30">
              <AcademicCapIcon className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-2" />
              <span className="text-sm font-medium text-blue-800 dark:text-blue-300">Academic Resources</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 dark:from-blue-400 dark:via-purple-400 dark:to-blue-200 bg-clip-text text-transparent mb-2">
              Ders Notları
            </h1>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Sınıf ve derse göre organize edilmiş kapsamlı ders notları koleksiyonu
            </p>
          </div>
        </div>
      </div>

      {/* Simplified Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl border border-slate-200/50 dark:border-slate-700/50 shadow-sm mb-6">
          <div className="p-4">
            
            {/* Search Bar - Main Focus */}
            <div className="mb-4">
              <div className="relative max-w-2xl">
                <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  className="w-full pl-12 pr-4 py-3 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-600 rounded-xl text-slate-900 dark:text-slate-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Not veya ders adı ara..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* Quick Filters */}
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center space-x-2">
                <FunnelIcon className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Filtreler:</span>
              </div>

              {/* Class Filter - Buttons */}
              <div className="flex items-center space-x-2">
                <span className="text-sm text-slate-600 dark:text-slate-400">Sınıf:</span>
                <div className="flex space-x-1">
                  <button
                    onClick={() => setSelectedClass('')}
                    className={`px-3 py-1 rounded-md text-sm font-medium transition-all ${
                      selectedClass === '' 
                        ? 'bg-blue-500 text-white shadow-sm' 
                        : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-600'
                    }`}
                  >
                    Tümü
                  </button>
                  {classes.map(cls => (
                    <button
                      key={cls}
                      onClick={() => setSelectedClass(cls)}
                      className={`px-3 py-1 rounded-md text-sm font-medium transition-all ${
                        selectedClass === cls 
                          ? 'bg-blue-500 text-white shadow-sm' 
                          : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-600'
                      }`}
                    >
                      {cls}
                    </button>
                  ))}
                </div>
              </div>

              {/* Semester Filter */}
              <div className="flex items-center space-x-2">
                <span className="text-sm text-slate-600 dark:text-slate-400">Dönem:</span>
                <div className="flex space-x-1">
                  <button
                    onClick={() => setSelectedSemester('')}
                    className={`px-3 py-1 rounded-md text-sm font-medium transition-all ${
                      selectedSemester === '' 
                        ? 'bg-green-500 text-white shadow-sm' 
                        : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-600'
                    }`}
                  >
                    Tümü
                  </button>
                  {semesters.map(sem => (
                    <button
                      key={sem}
                      onClick={() => setSelectedSemester(sem)}
                      className={`px-3 py-1 rounded-md text-sm font-medium transition-all ${
                        selectedSemester === sem 
                          ? 'bg-green-500 text-white shadow-sm' 
                          : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-600'
                      }`}
                    >
                      {sem}
                    </button>
                  ))}
                </div>
              </div>

              {/* Course Filter - Dropdown (only if class selected) */}
              {selectedClass && (
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-slate-600 dark:text-slate-400">Ders:</span>
                  <select 
                    className="px-3 py-1 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-600 rounded-md text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    value={selectedCourse}
                    onChange={(e) => setSelectedCourse(e.target.value)}
                  >
                    <option value="">Tüm Dersler</option>
                    {getAvailableCourses().map(course => (
                      <option key={course} value={course}>{course}</option>
                    ))}
                  </select>
                </div>
              )}

              {/* Clear Filters */}
              {(selectedClass || selectedSemester || selectedCourse || searchTerm) && (
                <button
                  onClick={() => {
                    setSelectedClass('');
                    setSelectedSemester('');
                    setSelectedCourse('');
                    setSearchTerm('');
                  }}
                  className="px-3 py-1 bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-slate-400 rounded-md text-sm hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors"
                >
                  Temizle
                </button>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 mt-4 pt-3 border-t border-gray-200 dark:border-slate-600">
              <button
                onClick={() => navigate('/not-alani', { state: { openNewNote: true } })}
                className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium"
              >
                <PencilSquareIcon className="w-4 h-4 mr-2" />
                Yeni Not Ekle
              </button>
              <button className="flex items-center px-4 py-2 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors text-sm font-medium">
                <DocumentArrowDownIcon className="w-4 h-4 mr-2" />
                Toplu İndir
              </button>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            {filteredNotes.length} not bulundu
          </h3>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Son güncelleme: {new Date().toLocaleDateString('tr-TR')}
          </div>
        </div>

        {/* Notes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNotes.map((note) => (
            <div key={note.id} className="group bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200/50 dark:border-slate-700/50 hover:border-blue-200 dark:hover:border-blue-700 transform hover:-translate-y-1">
              
              {/* Note Header */}
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getDifficultyColor(note.difficulty)}`}>
                      {note.difficulty}
                    </span>
                    {note.isMainNote && (
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 text-xs font-medium rounded-full">
                        Ana Not
                      </span>
                    )}
                    {note.isStudentNote && (
                      <span className="px-2 py-1 bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400 text-xs font-medium rounded-full">
                        Öğrenci
                      </span>
                    )}
                  </div>
                  <h3 className="font-bold text-gray-900 dark:text-gray-100 text-lg mb-2 line-clamp-2">
                    {note.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">{note.course}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{note.class} • {note.semester}</p>
                </div>
                
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleFavorite(note.id)}
                    className={`p-2 rounded-lg transition-all ${
                      favoriteNotes.has(note.id) 
                        ? 'text-yellow-500 bg-yellow-50 dark:bg-yellow-900/30' 
                        : 'text-gray-400 hover:text-yellow-500 hover:bg-yellow-50 dark:hover:bg-yellow-900/30'
                    }`}
                  >
                    {favoriteNotes.has(note.id) ? (
                      <BookmarkIcon className="w-4 h-4 fill-current" />
                    ) : (
                      <BookmarkIcon className="w-4 h-4" />
                    )}
                  </button>
                  <button
                    onClick={() => toggleLike(note.id)}
                    className={`p-2 rounded-lg transition-all ${
                      likedNotes.has(note.id) 
                        ? 'text-red-500 bg-red-50 dark:bg-red-900/30' 
                        : 'text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30'
                    }`}
                  >
                    {likedNotes.has(note.id) ? (
                      <HeartSolidIcon className="w-4 h-4" />
                    ) : (
                      <HeartIcon className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Note Content */}
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
                {note.description}
              </p>

              {/* Rating and Stats */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="flex items-center">
                    {getRatingStars(note.rating)}
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {note.rating}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                  <span className="flex items-center gap-1">
                    <EyeIcon className="w-3 h-3" />
                    {note.views}
                  </span>
                  <span className="flex items-center gap-1">
                    <DocumentArrowDownIcon className="w-3 h-3" />
                    {note.downloads}
                  </span>
                </div>
              </div>

              {/* Meta Info */}
              <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400 mb-4">
                <span className="flex items-center gap-1">
                  <UserIcon className="w-3 h-3" />
                  {note.instructor}
                </span>
                <span className="flex items-center gap-1">
                  <CalendarIcon className="w-3 h-3" />
                  {note.date}
                </span>
              </div>

              {/* File Info */}
              <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400 mb-4">
                <span>{note.pages} sayfa</span>
                <span>{note.fileSize}</span>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1 mb-4">
                {note.tags.map((tag, index) => (
                  <span key={index} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded-full">
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <button className="flex-1 btn-premium text-sm py-2">
                  <EyeIcon className="w-4 h-4 mr-2" />
                  Görüntüle
                </button>
                <button className="flex-1 btn-secondary-premium text-sm py-2">
                  <DocumentArrowDownIcon className="w-4 h-4 mr-2" />
                  İndir
                </button>
                <button className="px-3 py-2 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                  <ShareIcon className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredNotes.length === 0 && (
          <div className="text-center py-12">
            <AcademicCapIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
              Not bulunamadı
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Seçtiğiniz kriterlere uygun not bulunmamaktadır.
            </p>
            <button 
              onClick={() => {
                setSelectedClass('');
                setSelectedSemester('');
                setSelectedCourse('');
                setSearchTerm('');
              }}
              className="btn-premium"
            >
              Filtreleri Temizle
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default DersNotlari; 