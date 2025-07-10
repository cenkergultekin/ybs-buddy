import React, { useState, useRef, useEffect } from 'react';
import { 
  XMarkIcon, 
  PencilIcon, 
  DocumentTextIcon,
  TrashIcon,
  StarIcon,
  TagIcon,
  CalendarIcon,
  ClockIcon,
  BookmarkIcon,
  FolderIcon,
  MagnifyingGlassIcon,
  SparklesIcon,
  HeartIcon,
  ShareIcon,
  EyeIcon
} from '@heroicons/react/24/outline';
import { StarIcon as StarSolidIcon, HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';

function PersonalNoteEditor({ isOpen, onClose }) {
  const [activeNote, setActiveNote] = useState(null);
  const [notes, setNotes] = useState([
    {
      id: 1,
      title: 'Java OOP Konuları',
      content: 'Encapsulation, Inheritance, Polymorphism ve Abstraction konuları...',
      category: 'Ders',
      tags: ['Java', 'OOP', 'Programlama'],
      favorite: true,
      createdAt: '2024-01-15',
      updatedAt: '2024-01-16',
      wordCount: 248
    },
    {
      id: 2,
      title: 'Proje Fikirlerim',
      content: 'E-ticaret platformu, sosyal medya analizi, blockchain uygulaması...',
      category: 'Proje',
      tags: ['Proje', 'Fikir', 'Geliştirme'],
      favorite: false,
      createdAt: '2024-01-10',
      updatedAt: '2024-01-14',
      wordCount: 156
    },
    {
      id: 3,
      title: 'Kariyer Hedefleri',
      content: 'Full-stack developer olma yolunda atılacak adımlar ve teknolojiler...',
      category: 'Kişisel',
      tags: ['Kariyer', 'Hedef', 'Planlama'],
      favorite: true,
      createdAt: '2024-01-08',
      updatedAt: '2024-01-12',
      wordCount: 423
    }
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tümü');
  const [viewMode, setViewMode] = useState('grid');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newNote, setNewNote] = useState({
    title: '',
    content: '',
    category: 'Kişisel',
    tags: []
  });
  const [tagInput, setTagInput] = useState('');

  const editorRef = useRef(null);

  const categories = ['Tümü', 'Kişisel', 'Ders', 'Proje', 'Araştırma'];
  const categoryIcons = {
    'Kişisel': '👤',
    'Ders': '📚',
    'Proje': '🚀',
    'Araştırma': '🔬'
  };

  const filteredNotes = notes.filter(note => {
    const matchesSearch = !searchTerm || 
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'Tümü' || note.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const formatText = (command, value = null) => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
  };

  const getWordCount = (text) => {
    return text.trim().split(/\s+/).filter(word => word.length > 0).length;
  };

  const saveNote = () => {
    if (!newNote.title.trim() || !newNote.content.trim()) return;

    const note = {
      id: activeNote?.id || Date.now(),
      ...newNote,
      favorite: activeNote?.favorite || false,
      createdAt: activeNote?.createdAt || new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
      wordCount: getWordCount(newNote.content),
      tags: tagInput.split(',').map(tag => tag.trim()).filter(tag => tag)
    };

    if (activeNote) {
      setNotes(notes.map(n => n.id === activeNote.id ? note : n));
    } else {
      setNotes([note, ...notes]);
    }

    resetForm();
  };

  const deleteNote = (noteId) => {
    setNotes(notes.filter(n => n.id !== noteId));
    if (activeNote?.id === noteId) {
      resetForm();
    }
  };

  const toggleFavorite = (noteId) => {
    setNotes(notes.map(n => 
      n.id === noteId ? { ...n, favorite: !n.favorite } : n
    ));
  };

  const resetForm = () => {
    setActiveNote(null);
    setNewNote({ title: '', content: '', category: 'Kişisel', tags: [] });
    setTagInput('');
    setShowCreateForm(false);
  };

  const editNote = (note) => {
    setActiveNote(note);
    setNewNote({
      title: note.title,
      content: note.content,
      category: note.category,
      tags: note.tags
    });
    setTagInput(note.tags.join(', '));
    setShowCreateForm(true);
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Kişisel': 'from-blue-400 to-cyan-500',
      'Ders': 'from-green-400 to-emerald-500',
      'Proje': 'from-purple-400 to-pink-500',
      'Araştırma': 'from-orange-400 to-red-500'
    };
    return colors[category] || 'from-gray-400 to-gray-500';
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="card-modern w-full max-w-7xl h-[90vh] flex flex-col overflow-hidden animate-scale-in">
        
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-slate-200/50 dark:border-slate-700/50">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
              <PencilIcon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gradient">Not Defteri</h2>
              <p className="text-slate-600 dark:text-slate-400">
                {filteredNotes.length} not • {notes.filter(n => n.favorite).length} favorili
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="mobile-friendly p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all duration-300 hover:scale-110"
          >
            <XMarkIcon className="w-6 h-6 text-slate-600 dark:text-slate-400" />
          </button>
        </div>

        <div className="flex flex-1 overflow-hidden">
          
          {/* Sidebar */}
          <div className="w-1/3 border-r border-slate-200/50 dark:border-slate-700/50 flex flex-col">
            
            {/* Controls */}
            <div className="p-4 space-y-4">
              <button
                onClick={() => setShowCreateForm(true)}
                className="btn-modern w-full mobile-friendly"
              >
                <SparklesIcon className="w-5 h-5 mr-2" />
                Yeni Not
              </button>

              {/* Search */}
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Notlarda ara..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="input-modern pl-10 text-sm"
                />
              </div>

              {/* Category Filter */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Kategori
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {categories.map(category => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`text-sm p-2 rounded-lg transition-all duration-300 mobile-friendly ${
                        selectedCategory === category
                          ? 'bg-blue-500 text-white'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                      }`}
                    >
                      {categoryIcons[category] || '📁'} {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* View Mode */}
              <div className="flex space-x-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`btn-ghost flex-1 text-sm ${viewMode === 'grid' ? 'bg-blue-500 text-white' : ''}`}
                >
                  Kart
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`btn-ghost flex-1 text-sm ${viewMode === 'list' ? 'bg-blue-500 text-white' : ''}`}
                >
                  Liste
                </button>
              </div>
            </div>

            {/* Notes List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {filteredNotes.length === 0 ? (
                <div className="text-center py-8">
                  <DocumentTextIcon className="w-12 h-12 text-slate-400 mx-auto mb-3" />
                  <p className="text-slate-500 dark:text-slate-400 text-sm">
                    {searchTerm ? 'Arama sonucu bulunamadı' : 'Henüz not bulunmuyor'}
                  </p>
                </div>
              ) : (
                filteredNotes.map(note => (
                  <div
                    key={note.id}
                    className={`glass-card dark:glass-card-dark rounded-xl p-4 transition-all duration-300 cursor-pointer hover:scale-[1.02] mobile-friendly ${
                      activeNote?.id === note.id ? 'ring-2 ring-blue-500' : ''
                    }`}
                    onClick={() => editNote(note)}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-semibold text-slate-800 dark:text-slate-200 text-sm line-clamp-1">
                        {note.title}
                      </h3>
                      <div className="flex space-x-1">
                        {note.favorite && (
                          <StarSolidIcon className="w-4 h-4 text-yellow-500" />
                        )}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleFavorite(note.id);
                          }}
                          className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        >
                          <StarIcon className="w-4 h-4 text-slate-400 hover:text-yellow-500" />
                        </button>
                      </div>
                    </div>
                    
                    <p className="text-slate-600 dark:text-slate-400 text-xs mb-3 line-clamp-2">
                      {note.content}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium text-white bg-gradient-to-r ${getCategoryColor(note.category)}`}>
                        {categoryIcons[note.category]} {note.category}
                      </span>
                      <span className="text-xs text-slate-500">
                        {note.wordCount} kelime
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-200/50 dark:border-slate-700/50">
                      <span className="text-xs text-slate-500">
                        {note.updatedAt}
                      </span>
                      <div className="flex space-x-1">
                        {note.tags.slice(0, 2).map((tag, index) => (
                          <span key={index} className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-xs rounded">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Editor */}
          <div className="flex-1 flex flex-col">
            {showCreateForm ? (
              <div className="flex-1 flex flex-col">
                
                {/* Editor Header */}
                <div className="p-4 border-b border-slate-200/50 dark:border-slate-700/50">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200">
                      {activeNote ? 'Notu Düzenle' : 'Yeni Not Oluştur'}
                    </h3>
                    <div className="flex space-x-2">
                      <button
                        onClick={saveNote}
                        disabled={!newNote.title.trim() || !newNote.content.trim()}
                        className="btn-modern mobile-friendly disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        💾 Kaydet
                      </button>
                      <button
                        onClick={resetForm}
                        className="btn-ghost mobile-friendly"
                      >
                        ❌ İptal
                      </button>
                      {activeNote && (
                        <button
                          onClick={() => deleteNote(activeNote.id)}
                          className="mobile-friendly p-2 rounded-xl bg-red-100 dark:bg-red-900/30 text-red-600 hover:bg-red-200 dark:hover:bg-red-900/50 transition-all duration-300"
                        >
                          <TrashIcon className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Title Input */}
                  <input
                    type="text"
                    placeholder="Not başlığı..."
                    value={newNote.title}
                    onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
                    className="input-modern mb-4 text-xl font-semibold"
                  />

                  {/* Category & Tags */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Kategori
                      </label>
                      <select
                        value={newNote.category}
                        onChange={(e) => setNewNote({ ...newNote, category: e.target.value })}
                        className="select-modern"
                      >
                        {categories.filter(c => c !== 'Tümü').map(category => (
                          <option key={category} value={category}>
                            {categoryIcons[category]} {category}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Etiketler (virgülle ayırın)
                      </label>
                      <input
                        type="text"
                        placeholder="java, oop, programlama..."
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        className="input-modern"
                      />
                    </div>
                  </div>

                  {/* Toolbar */}
                  <div className="flex flex-wrap gap-2 p-3 glass-card dark:glass-card-dark rounded-xl">
                    <button
                      onClick={() => formatText('bold')}
                      className="mobile-friendly p-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all duration-300"
                      title="Kalın"
                    >
                      <strong>B</strong>
                    </button>
                    <button
                      onClick={() => formatText('italic')}
                      className="mobile-friendly p-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all duration-300"
                      title="İtalik"
                    >
                      <em>I</em>
                    </button>
                    <button
                      onClick={() => formatText('underline')}
                      className="mobile-friendly p-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all duration-300"
                      title="Altı Çizili"
                    >
                      <u>U</u>
                    </button>
                    <div className="w-px h-8 bg-slate-300 dark:bg-slate-600"></div>
                    <button
                      onClick={() => formatText('insertUnorderedList')}
                      className="mobile-friendly p-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all duration-300"
                      title="Liste"
                    >
                      •
                    </button>
                    <button
                      onClick={() => formatText('insertOrderedList')}
                      className="mobile-friendly p-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all duration-300"
                      title="Numaralı Liste"
                    >
                      1.
                    </button>
                    <div className="w-px h-8 bg-slate-300 dark:bg-slate-600"></div>
                    <button
                      onClick={() => formatText('justifyLeft')}
                      className="mobile-friendly p-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all duration-300"
                      title="Sola Hizala"
                    >
                      ⬅
                    </button>
                    <button
                      onClick={() => formatText('justifyCenter')}
                      className="mobile-friendly p-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all duration-300"
                      title="Ortaya Hizala"
                    >
                      ↔
                    </button>
                    <button
                      onClick={() => formatText('justifyRight')}
                      className="mobile-friendly p-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all duration-300"
                      title="Sağa Hizala"
                    >
                      ➡
                    </button>
                  </div>
                </div>

                {/* Editor Content */}
                <div className="flex-1 p-4">
                  <div
                    ref={editorRef}
                    contentEditable
                    className="w-full h-full p-6 glass-card dark:glass-card-dark rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800 dark:text-slate-200 leading-relaxed"
                    style={{ minHeight: '400px' }}
                    onInput={(e) => setNewNote({ ...newNote, content: e.target.innerHTML })}
                    dangerouslySetInnerHTML={{ __html: newNote.content }}
                    placeholder="Notunuzu buraya yazın..."
                  />
                </div>

                {/* Editor Footer */}
                <div className="p-4 border-t border-slate-200/50 dark:border-slate-700/50">
                  <div className="flex justify-between items-center text-sm text-slate-600 dark:text-slate-400">
                    <div className="flex items-center space-x-4">
                      <span>📝 {getWordCount(newNote.content)} kelime</span>
                      <span>🏷️ {tagInput.split(',').filter(t => t.trim()).length} etiket</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <ClockIcon className="w-4 h-4" />
                      <span>{new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center max-w-md">
                  <DocumentTextIcon className="w-24 h-24 text-slate-400 mx-auto mb-6" />
                  <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-4">
                    Not Defteri
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
                    Sol panelden bir not seçin veya yeni bir not oluşturun. 
                    Notlarınızı düzenleyebilir, kategorize edebilir ve etiketleyebilirsiniz.
                  </p>
                  <button
                    onClick={() => setShowCreateForm(true)}
                    className="btn-modern mobile-friendly"
                  >
                    <SparklesIcon className="w-5 h-5 mr-2" />
                    İlk Notunu Oluştur
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PersonalNoteEditor; 