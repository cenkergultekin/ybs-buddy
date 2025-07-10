import React, { useState } from 'react';
import { 
  MagnifyingGlassIcon, 
  FunnelIcon, 
  PlusIcon,
  Squares2X2Icon,
  ListBulletIcon,
  FolderIcon,
  DocumentTextIcon,
  StarIcon,
  TagIcon,
  CalendarIcon,
  ClockIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
  ShareIcon,
  HeartIcon,
  BookmarkIcon,
  SparklesIcon,
  AcademicCapIcon
} from '@heroicons/react/24/outline';
import { StarIcon as StarSolidIcon, HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';
import PersonalNoteEditor from '../components/PersonalNoteEditor';

function NotAlma() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFolder, setSelectedFolder] = useState('Tümü');
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('updated');
  const [showFavorites, setShowFavorites] = useState(false);
  const [showNoteEditor, setShowNoteEditor] = useState(false);
  const [favoriteNotes, setFavoriteNotes] = useState(new Set([1, 3, 6]));
  const [likedNotes, setLikedNotes] = useState(new Set([2, 4, 5]));

  const folders = [
    { name: 'Tümü', count: 12, icon: '📁', color: 'from-gray-400 to-gray-500' },
    { name: 'Kişisel', count: 4, icon: '👤', color: 'from-blue-400 to-cyan-500' },
    { name: 'Ders', count: 5, icon: '📚', color: 'from-green-400 to-emerald-500' },
    { name: 'Proje', count: 2, icon: '🚀', color: 'from-purple-400 to-pink-500' },
    { name: 'Araştırma', count: 1, icon: '🔬', color: 'from-orange-400 to-red-500' }
  ];

  const notes = [
    {
      id: 1,
      title: 'Java OOP Prensipleri',
      content: 'Encapsulation, Inheritance, Polymorphism ve Abstraction konuları üzerine detaylı notlarım. Bu dört temel prensip...',
      folder: 'Ders',
      tags: ['Java', 'OOP', 'Programlama', 'Encapsulation'],
      createdAt: '2024-01-15',
      updatedAt: '2024-01-16',
      wordCount: 567,
      readTime: '3 dk',
      favorite: true,
      views: 24
    },
    {
      id: 2,
      title: 'Veritabanı Normalizasyon Kuralları',
      content: '1NF, 2NF, 3NF ve BCNF normalizasyon formları. Veritabanı tasarımında en önemli konulardan biri olan normalizasyon...',
      folder: 'Ders',
      tags: ['Veritabanı', 'Normalizasyon', 'SQL', 'Tasarım'],
      createdAt: '2024-01-12',
      updatedAt: '2024-01-14',
      wordCount: 423,
      readTime: '2 dk',
      favorite: false,
      views: 18
    },
    {
      id: 3,
      title: 'React Hooks Kullanımı',
      content: 'useState, useEffect, useContext ve custom hooks konularında deneyimlerim. Modern React geliştirme için...',
      folder: 'Ders',
      tags: ['React', 'Hooks', 'JavaScript', 'Frontend'],
      createdAt: '2024-01-10',
      updatedAt: '2024-01-13',
      wordCount: 789,
      readTime: '4 dk',
      favorite: true,
      views: 31
    },
    {
      id: 4,
      title: 'E-ticaret Projesi Planı',
      content: 'Full-stack e-ticaret uygulaması geliştirme süreci. MERN stack kullanarak modern bir e-ticaret platformu...',
      folder: 'Proje',
      tags: ['Proje', 'E-ticaret', 'MERN', 'Full-stack'],
      createdAt: '2024-01-08',
      updatedAt: '2024-01-11',
      wordCount: 1243,
      readTime: '6 dk',
      favorite: false,
      views: 42
    },
    {
      id: 5,
      title: 'Kariyer Hedefleri 2024',
      content: 'Bu yıl ulaşmak istediğim hedefler ve gelişim planım. Senior developer olmak için atılacak adımlar...',
      folder: 'Kişisel',
      tags: ['Kariyer', 'Hedefler', 'Gelişim', 'Planlama'],
      createdAt: '2024-01-05',
      updatedAt: '2024-01-09',
      wordCount: 856,
      readTime: '4 dk',
      favorite: false,
      views: 15
    },
    {
      id: 6,
      title: 'Makine Öğrenmesi Temelleri',
      content: 'ML algoritmaları, supervised/unsupervised learning, neural networks konularında araştırmalarım...',
      folder: 'Araştırma',
      tags: ['ML', 'AI', 'Algoritmalar', 'Python'],
      createdAt: '2024-01-02',
      updatedAt: '2024-01-07',
      wordCount: 1567,
      readTime: '8 dk',
      favorite: true,
      views: 67
    },
    {
      id: 7,
      title: 'CSS Grid ve Flexbox',
      content: 'Modern CSS layout sistemleri. Grid ve Flexbox kullanarak responsive tasarım teknikleri...',
      folder: 'Ders',
      tags: ['CSS', 'Grid', 'Flexbox', 'Layout'],
      createdAt: '2023-12-28',
      updatedAt: '2024-01-05',
      wordCount: 634,
      readTime: '3 dk',
      favorite: false,
      views: 29
    },
    {
      id: 8,
      title: 'Node.js API Geliştirme',
      content: 'Express.js ile RESTful API oluşturma, middleware kullanımı, authentication ve error handling...',
      folder: 'Ders',
      tags: ['Node.js', 'Express', 'API', 'Backend'],
      createdAt: '2023-12-25',
      updatedAt: '2024-01-03',
      wordCount: 945,
      readTime: '5 dk',
      favorite: false,
      views: 38
    },
    {
      id: 9,
      title: 'Mobil Uygulama Fikirleri',
      content: 'React Native ve Flutter ile geliştirebileceğim mobil uygulama projeleri ve pazar analizi...',
      folder: 'Proje',
      tags: ['Mobil', 'React Native', 'Flutter', 'Uygulama'],
      createdAt: '2023-12-20',
      updatedAt: '2024-01-01',
      wordCount: 721,
      readTime: '4 dk',
      favorite: false,
      views: 22
    },
    {
      id: 10,
      title: 'Günlük Motivasyon',
      content: 'Her gün kendimi motive etmek için yazdığım notlar ve başarı hikayeleri...',
      folder: 'Kişisel',
      tags: ['Motivasyon', 'Günlük', 'Başarı', 'Gelişim'],
      createdAt: '2023-12-15',
      updatedAt: '2023-12-30',
      wordCount: 412,
      readTime: '2 dk',
      favorite: false,
      views: 11
    }
  ];

  const filteredNotes = notes.filter(note => {
    const matchesSearch = !searchTerm || 
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesFolder = selectedFolder === 'Tümü' || note.folder === selectedFolder;
    const matchesFavorites = !showFavorites || favoriteNotes.has(note.id);
    
    return matchesSearch && matchesFolder && matchesFavorites;
  });

  const sortedNotes = [...filteredNotes].sort((a, b) => {
    switch (sortBy) {
      case 'updated':
        return new Date(b.updatedAt) - new Date(a.updatedAt);
      case 'created':
        return new Date(b.createdAt) - new Date(a.createdAt);
      case 'title':
        return a.title.localeCompare(b.title);
      case 'views':
        return b.views - a.views;
      case 'words':
        return b.wordCount - a.wordCount;
      default:
        return 0;
    }
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

  const getFolderColor = (folder) => {
    const folderData = folders.find(f => f.name === folder);
    return folderData?.color || 'from-gray-400 to-gray-500';
  };

  const getPopularityBadge = (views) => {
    if (views >= 50) return { text: '🔥 Popüler', color: 'from-red-400 to-orange-500' };
    if (views >= 30) return { text: '⭐ Trending', color: 'from-yellow-400 to-orange-500' };
    if (views >= 20) return { text: '📈 Yükselen', color: 'from-blue-400 to-cyan-500' };
    return null;
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
          <h1 className="heading-lg mb-4">📝 Not Alma Alanı</h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Kişisel notlarınızı organize edin, kategorize edin ve kolayca erişin
          </p>
        </div>

        {/* Controls & Filters */}
        <div className="card-modern mb-8 animate-fade-in">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            
            {/* Search */}
            <div className="lg:col-span-2">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Arama
              </label>
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Başlık, içerik veya etiketlerde ara..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="input-modern pl-12"
                />
              </div>
            </div>

            {/* Sort */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Sıralama
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="select-modern"
              >
                <option value="updated">Son Güncelleme</option>
                <option value="created">Oluşturma Tarihi</option>
                <option value="title">Başlık (A-Z)</option>
                <option value="views">Görüntülenme</option>
                <option value="words">Kelime Sayısı</option>
              </select>
            </div>

            {/* View Mode */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Görünüm
              </label>
              <div className="flex space-x-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`btn-ghost flex-1 ${viewMode === 'grid' ? 'bg-blue-500 text-white' : ''}`}
                >
                  <Squares2X2Icon className="w-4 h-4 mr-1" />
                  Kart
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`btn-ghost flex-1 ${viewMode === 'list' ? 'bg-blue-500 text-white' : ''}`}
                >
                  <ListBulletIcon className="w-4 h-4 mr-1" />
                  Liste
                </button>
              </div>
            </div>
          </div>

          {/* Additional Filters */}
          <div className="flex flex-wrap items-center gap-4 mt-6 pt-6 border-t border-slate-200/50 dark:border-slate-700/50">
            <button
              onClick={() => setShowFavorites(!showFavorites)}
              className={`mobile-friendly px-4 py-2 rounded-xl font-medium transition-all duration-300 flex items-center space-x-2 ${
                showFavorites 
                  ? 'bg-yellow-500 text-white' 
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              <StarIcon className="w-4 h-4" />
              <span>Favoriler</span>
            </button>
            
            <button
              onClick={() => setShowNoteEditor(true)}
              className="btn-modern mobile-friendly ml-auto"
            >
              <PlusIcon className="w-5 h-5 mr-2" />
              Yeni Not
            </button>
          </div>
        </div>

        {/* Folders */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-4 flex items-center">
            <FolderIcon className="w-6 h-6 mr-3 text-blue-500" />
            Klasörler
          </h2>
          <div className="flex flex-wrap gap-3">
            {folders.map((folder) => (
              <button
                key={folder.name}
                onClick={() => setSelectedFolder(folder.name)}
                className={`mobile-friendly px-6 py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105 ${
                  selectedFolder === folder.name
                    ? `bg-gradient-to-r ${folder.color} text-white shadow-lg`
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                <span className="mr-2">{folder.icon}</span>
                {folder.name}
                <span className="ml-2 text-sm opacity-75">({folder.count})</span>
              </button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <div className="flex justify-between items-center mb-6">
          <div className="text-slate-600 dark:text-slate-400">
            <span className="font-semibold text-slate-800 dark:text-slate-200">{sortedNotes.length}</span> not bulundu
            {showFavorites && <span className="text-yellow-600 ml-2">• Sadece favoriler</span>}
          </div>
          <div className="text-sm text-slate-500">
            Toplam kelime: {sortedNotes.reduce((sum, note) => sum + note.wordCount, 0)}
          </div>
        </div>

        {/* Notes Grid/List */}
        {sortedNotes.length === 0 ? (
          <div className="text-center py-16">
            <div className="card-modern max-w-md mx-auto">
              <DocumentTextIcon className="w-16 h-16 text-slate-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-2">
                Not bulunamadı
              </h3>
              <p className="text-slate-600 dark:text-slate-400 mb-6">
                {searchTerm || showFavorites 
                  ? 'Arama kriterlerinize uygun not bulunamadı.' 
                  : 'Henüz hiç notunuz yok.'}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                {(searchTerm || showFavorites) && (
                  <button
                    onClick={() => {
                      setSearchTerm('');
                      setShowFavorites(false);
                      setSelectedFolder('Tümü');
                    }}
                    className="btn-ghost"
                  >
                    Filtreleri Temizle
                  </button>
                )}
                <button
                  onClick={() => setShowNoteEditor(true)}
                  className="btn-modern"
                >
                  <SparklesIcon className="w-5 h-5 mr-2" />
                  İlk Notunu Oluştur
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className={`${viewMode === 'grid' 
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8' 
            : 'space-y-6'
          }`}>
            {sortedNotes.map((note, index) => {
              const popularityBadge = getPopularityBadge(note.views);
              
              return (
                <div 
                  key={note.id} 
                  className={`card-modern card-hover-float card-glow group animate-scale-in ${
                    viewMode === 'list' ? 'flex items-start space-x-6' : ''
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  
                  {/* Note Content */}
                  <div className={`${viewMode === 'list' ? 'flex-1' : ''}`}>
                    
                    {/* Header */}
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 group-hover:text-gradient transition-all duration-300 mb-2">
                          {note.title}
                        </h3>
                        <div className="flex items-center space-x-2 text-sm text-slate-600 dark:text-slate-400">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium text-white bg-gradient-to-r ${getFolderColor(note.folder)}`}>
                            {folders.find(f => f.name === note.folder)?.icon} {note.folder}
                          </span>
                          {popularityBadge && (
                            <span className={`px-2 py-1 rounded-full text-xs font-medium text-white bg-gradient-to-r ${popularityBadge.color}`}>
                              {popularityBadge.text}
                            </span>
                          )}
                        </div>
                      </div>
                      
                      {/* Quick Actions */}
                      <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <button
                          onClick={() => toggleFavorite(note.id)}
                          className={`mobile-friendly p-2 rounded-xl transition-all duration-300 hover:scale-110 ${
                            favoriteNotes.has(note.id)
                              ? 'bg-yellow-500 text-white'
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                          }`}
                        >
                          {favoriteNotes.has(note.id) ? (
                            <StarSolidIcon className="w-4 h-4" />
                          ) : (
                            <StarIcon className="w-4 h-4" />
                          )}
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
                      </div>
                    </div>

                    {/* Content Preview */}
                    <p className="text-slate-600 dark:text-slate-400 text-sm mb-4 leading-relaxed line-clamp-3">
                      {note.content}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {note.tags.slice(0, 4).map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="px-3 py-1 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 text-blue-800 dark:text-blue-300 text-xs rounded-full font-medium"
                        >
                          #{tag}
                        </span>
                      ))}
                      {note.tags.length > 4 && (
                        <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-xs rounded-full">
                          +{note.tags.length - 4}
                        </span>
                      )}
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div className="flex items-center space-x-2">
                        <ClockIcon className="w-4 h-4 text-purple-500" />
                        <span className="text-sm text-slate-600 dark:text-slate-400">{note.readTime}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <DocumentTextIcon className="w-4 h-4 text-blue-500" />
                        <span className="text-sm text-slate-600 dark:text-slate-400">{note.wordCount} kelime</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <EyeIcon className="w-4 h-4 text-green-500" />
                        <span className="text-sm text-slate-600 dark:text-slate-400">{note.views} görüntüleme</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CalendarIcon className="w-4 h-4 text-orange-500" />
                        <span className="text-sm text-slate-600 dark:text-slate-400">{note.updatedAt}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className={`${viewMode === 'list' ? 'flex flex-col space-y-2' : 'flex flex-wrap gap-2'}`}>
                    <button className="btn-modern flex-1 mobile-friendly">
                      <PencilIcon className="w-4 h-4 mr-2" />
                      Düzenle
                    </button>
                    <button className="btn-ghost flex-1 mobile-friendly">
                      <EyeIcon className="w-4 h-4 mr-2" />
                      Görüntüle
                    </button>
                    
                    {/* Additional Actions */}
                    <div className="flex space-x-2">
                      <button className="mobile-friendly p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 transition-all duration-300 hover:scale-110">
                        <ShareIcon className="w-4 h-4" />
                      </button>
                      <button className="mobile-friendly p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 transition-all duration-300 hover:scale-110">
                        <BookmarkIcon className="w-4 h-4" />
                      </button>
                      <button className="mobile-friendly p-2 rounded-xl bg-red-100 dark:bg-red-900/30 text-red-600 hover:bg-red-200 dark:hover:bg-red-900/50 transition-all duration-300 hover:scale-110">
                        <TrashIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Quick Tips */}
        <div className="card-modern mt-16 text-center">
          <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-6">
            💡 Not Alma İpuçları
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center mx-auto">
                <TagIcon className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-slate-800 dark:text-slate-200">Etiketler Kullanın</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Notlarınızı etiketleyerek daha kolay bulabilirsiniz
              </p>
            </div>
            <div className="space-y-3">
              <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center mx-auto">
                <FolderIcon className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-slate-800 dark:text-slate-200">Organize Edin</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Klasörleri kullanarak notlarınızı kategorize edin
              </p>
            </div>
            <div className="space-y-3">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl flex items-center justify-center mx-auto">
                <AcademicCapIcon className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-slate-800 dark:text-slate-200">Düzenli Gözden Geçirin</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Eski notlarınızı gözden geçirerek öğrenmenizi pekiştirin
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Personal Note Editor Modal */}
      {showNoteEditor && (
        <PersonalNoteEditor
          isOpen={showNoteEditor}
          onClose={() => setShowNoteEditor(false)}
        />
      )}
    </div>
  );
}

export default NotAlma; 