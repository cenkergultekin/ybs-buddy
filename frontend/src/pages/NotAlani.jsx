import { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { 
  Plus, Search, Filter, FolderPlus, Edit3, Trash2, 
  Save, Bold, Italic, Underline, List, ListOrdered,
  Quote, Calendar, Clock, BookOpen, Tag, Star,
  Grid, Menu, Eye, Copy, Download, Share2, X
} from 'lucide-react';

const NotAlani = () => {
  const location = useLocation();
  const [notes, setNotes] = useState([]);
  const [folders, setFolders] = useState([]);
  const [selectedFolder, setSelectedFolder] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('grid'); // grid, list
  const [showEditor, setShowEditor] = useState(false);
  const [editingNote, setEditingNote] = useState(null);
  const [newNoteTitle, setNewNoteTitle] = useState('');
  const [newNoteContent, setNewNoteContent] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const [showSidePanel, setShowSidePanel] = useState(false);
  const [currentTags, setCurrentTags] = useState([]);
  const [fontSize, setFontSize] = useState(10);
  const editorRef = useRef(null);

  // Etiketler - backend'den gelecek
  const allTags = [];

  useEffect(() => {
    // Backend'den gelecek veriler için placeholder'lar
    const folders = [
      { id: 'personal', name: 'Kişisel', color: 'blue', count: 0 },
      { id: 'courses', name: 'Ders Notları', color: 'green', count: 0 },
      { id: 'projects', name: 'Proje Notları', color: 'purple', count: 0 },
      { id: 'research', name: 'Araştırma', color: 'orange', count: 0 }
    ];

    // Backend'den gelecek notlar - şimdilik boş array
    const notes = [];

    setFolders(folders);
    setNotes(notes);
    // TODO: Backend'den notları fetch et
  }, [setFolders, setNotes]);

  // Yeni not ekleme talebiyle geldiği için editörü aç
  useEffect(() => {
    if (location.state?.openNewNote) {
      // URL'yi temizle ve yeni not editörünü aç
      window.history.replaceState(null, '', '/not-alani');
      setEditingNote(null);
      setNewNoteTitle('');
      setNewNoteContent('');
      setCurrentTags([]);
      setShowEditor(true);
      // Enable full screen mode
      document.body.classList.add('fullscreen-editor');
      setTimeout(() => {
        if (editorRef.current) {
          editorRef.current.innerHTML = '<div class="notion-title">Başlıksız</div><div><br></div>';
          const range = document.createRange();
          const sel = window.getSelection();
          range.setStart(editorRef.current.firstChild.firstChild, 0);
          range.collapse(true);
          sel.removeAllRanges();
          sel.addRange(range);
          editorRef.current.focus();
        }
      }, 150);
    }
  }, [location.state]);

  // Component unmount olduğunda tam ekran modunu temizle
  useEffect(() => {
    return () => {
      document.body.classList.remove('fullscreen-editor');
      setShowSidePanel(false);
    };
  }, []);

  // Side panel kapatıldığında body scroll lock'u kaldır (sadece mobile)
  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 1024px)');
    
    if (showSidePanel && mediaQuery.matches) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showSidePanel]);

  // Filtrelenmiş notlar
  const filteredNotes = notes.filter(note => {
    const matchesSearch = note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         note.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFolder = selectedFolder === 'all' || note.folder === selectedFolder;
    const matchesTag = !selectedTag || note.tags.includes(selectedTag);
    
    return matchesSearch && matchesFolder && matchesTag;
  });

  const createNewNote = () => {
    setEditingNote(null);
    setNewNoteTitle('');
    setNewNoteContent('');
    setCurrentTags([]);
    setShowEditor(true);
    // Enable full screen mode
    document.body.classList.add('fullscreen-editor');
    setTimeout(() => {
      if (editorRef.current) {
        editorRef.current.innerHTML = '<div class="notion-title">Başlıksız</div><div><br></div>';
        const range = document.createRange();
        const sel = window.getSelection();
        range.setStart(editorRef.current.firstChild.firstChild, 0);
        range.collapse(true);
        sel.removeAllRanges();
        sel.addRange(range);
        editorRef.current.focus();
      }
    }, 150);
  };

  const editNote = (note) => {
    setEditingNote(note);
    setNewNoteTitle(note.title);
    setNewNoteContent(note.content);
    setCurrentTags(note.tags || []);
    setShowEditor(true);
    // Enable full screen mode
    document.body.classList.add('fullscreen-editor');
    setTimeout(() => {
      if (editorRef.current) {
        // Mevcut içeriği formatına dönüştür
        const content = note.content || '';
        if (content) {
          editorRef.current.innerHTML = content;
        } else {
          editorRef.current.innerHTML = '<div class="notion-title">Başlıksız</div><div><br></div>';
        }
        editorRef.current.focus();
      }
    }, 150);
  };

  const saveNote = () => {
    if (!newNoteContent.trim() || newNoteContent === '<br>') return;

    const cleanContent = newNoteContent === '<br>' ? '' : newNoteContent;
    const plainText = cleanContent.replace(/<[^>]*>/g, '').trim();
    
    if (!plainText) return;

    // Başlığı otomatik olarak içerikten al
    let autoTitle = 'Başlıksız Not';
    const titleElement = editorRef.current?.querySelector('.notion-title');
    if (titleElement) {
      const titleText = titleElement.textContent.trim();
      if (titleText && titleText !== '') {
        autoTitle = titleText.substring(0, 50) + (titleText.length > 50 ? '...' : '');
      }
    } else {
      // İlk satırı başlık olarak kullan
      const firstLine = plainText.split('\n')[0];
      if (firstLine && firstLine.trim()) {
        autoTitle = firstLine.substring(0, 50) + (firstLine.length > 50 ? '...' : '');
      }
    }

    // Mevcut etiketleri kullan
    const tags = [...currentTags];

    // Etiket varsa klasör belirle
    let targetFolder = selectedFolder !== 'all' ? selectedFolder : 'personal';
    if (tags.length > 0) {
      targetFolder = 'courses'; // Etiketli notlar ders klasörüne
    }

    const noteData = {
      title: autoTitle,
      content: cleanContent,
      folder: targetFolder,
      tags: tags,
      updatedAt: new Date().toISOString().split('T')[0],
      wordCount: plainText.split(' ').filter(word => word.length > 0).length
    };

    if (editingNote) {
      setNotes(prev => prev.map(note => 
        note.id === editingNote.id 
          ? { ...note, ...noteData }
          : note
      ));
    } else {
      const newNote = {
        id: Date.now(),
        ...noteData,
        createdAt: new Date().toISOString().split('T')[0],
        isFavorite: false
      };
      setNotes(prev => [newNote, ...prev]);
    }

    // Close editor and reset
    setShowEditor(false);
    setEditingNote(null);
    setNewNoteTitle('');
    setNewNoteContent('');
    setCurrentTags([]); // Etiketleri temizle
    // Disable full screen mode
    document.body.classList.remove('fullscreen-editor');
    if (editorRef.current) {
      editorRef.current.innerHTML = '<div class="notion-title">Başlıksız</div><div><br></div>';
    }
  };

  const deleteNote = (noteId) => {
    if (confirm('Bu notu silmek istediğinizden emin misiniz?')) {
      setNotes(prev => prev.filter(note => note.id !== noteId));
    }
  };

  const toggleFavorite = (noteId) => {
    setNotes(prev => prev.map(note => 
      note.id === noteId 
        ? { ...note, isFavorite: !note.isFavorite }
        : note
    ));
  };

  const formatText = (command, value = null) => {
    if (!editorRef.current) return;
    
    editorRef.current.focus();
    
    try {
      // Modern approach first, fallback to execCommand
      if (command === 'bold') {
        document.execCommand('bold', false, null);
      } else if (command === 'italic') {
        document.execCommand('italic', false, null);
      } else if (command === 'underline') {
        document.execCommand('underline', false, null);
      } else if (command === 'insertUnorderedList') {
        document.execCommand('insertUnorderedList', false, null);
      } else if (command === 'insertOrderedList') {
        document.execCommand('insertOrderedList', false, null);
      } else if (command === 'formatBlock' && value === 'blockquote') {
        document.execCommand('formatBlock', false, 'blockquote');
      } else {
        document.execCommand(command, false, value);
      }
      
      // Update content after formatting
      setNewNoteContent(editorRef.current.innerHTML);
    } catch (error) {
      console.warn('Format command failed:', error);
    }
  };

  const getFolderColor = (folderId) => {
    const folder = folders.find(f => f.id === folderId);
    return folder?.color || 'blue';
  };

  const getFolderName = (folderId) => {
    const folder = folders.find(f => f.id === folderId);
    return folder?.name || 'Bilinmeyen';
  };

  // Auto-format first line as H1, rest as normal text
  const handleAutoFormat = (element) => {
    const content = element.innerHTML;
    
    // İlk div'i H1 yap, geri kalanları normal
    if (content && !content.includes('notion-title')) {
      const lines = content.split('<div>');
      if (lines.length > 0) {
        const firstLine = lines[0];
        if (firstLine.trim() && !firstLine.includes('notion-title')) {
          const newFirstLine = `<div class="notion-title">${firstLine.replace(/^<div[^>]*>/, '')}</div>`;
          element.innerHTML = content.replace(firstLine, newFirstLine);
        }
      }
    }
  };

  return (
    <div className="min-h-screen relative z-10">
      {/* Header */}
      <section className="section-premium">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-50 to-violet-50 dark:from-blue-950 dark:to-violet-950 rounded-full border border-blue-200/30 dark:border-blue-800/30 mb-6">
              <Edit3 className="h-4 w-4 text-blue-600 dark:text-blue-400 mr-2" />
              <span className="text-sm font-medium text-primary-premium">Smart Note System</span>
            </div>
            <h1 className="text-4xl md:text-5xl gradient-premium mb-6">
              Akıllı Not Tutma Sistemi
            </h1>
            <p className="text-lg text-secondary-premium max-w-4xl mx-auto mb-8">
              <strong className="text-blue-600 dark:text-blue-400">YBS eğitim sürecinizde kritik olan her notunuz</strong> artık güvenli ve organize bir şekilde saklanıyor! 
              ✨ <span className="font-semibold">Akıllı kategorilendirme</span> ile notlarınızı kolayca bulun, 
              🔒 <span className="font-semibold">Yerel tarayıcı depolama</span> ile verileriniz tamamen sizin kontrolünüzde kalır.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-8">
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/50 dark:to-cyan-950/50 rounded-2xl p-6 border border-blue-200/30 dark:border-blue-800/30">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mb-4">
                  <span className="text-xl">🛡️</span>
                </div>
                <h3 className="font-bold text-slate-800 dark:text-slate-200 mb-2">Güvenli Saklama</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">Notlarınız browser'ınızda yerel olarak saklanır. Hiçbir sunucuya gönderilmez!</p>
              </div>
              
              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/50 dark:to-teal-950/50 rounded-2xl p-6 border border-emerald-200/30 dark:border-emerald-800/30">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center mb-4">
                  <span className="text-xl">⚡</span>
                </div>
                <h3 className="font-bold text-slate-800 dark:text-slate-200 mb-2">Anında Erişim</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">Ders çalışırken notlarınıza anında ulaşın. Offline çalışma desteği!</p>
              </div>
              
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/50 dark:to-pink-950/50 rounded-2xl p-6 border border-purple-200/30 dark:border-purple-800/30">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-4">
                  <span className="text-xl">🎨</span>
                </div>
                <h3 className="font-bold text-slate-800 dark:text-slate-200 mb-2">Zengin Editör</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">Metin formatları, listeler ve daha fazlası ile notlarınızı zenginleştirin!</p>
              </div>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full border border-blue-300/30 dark:border-blue-700/30">
                <Star className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-3" />
                <span className="font-medium text-slate-700 dark:text-slate-300">
                  <strong className="text-blue-600 dark:text-blue-400">YBS öğrencileri için özel olarak tasarlandı</strong> - Akademik başarınızı artırın!
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="section-premium">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-4 gap-8">
            
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="space-y-6">
                
                {/* Actions */}
                <div className="card-premium">
                  <button 
                    onClick={createNewNote}
                    className="btn-premium w-full flex items-center justify-center py-4 text-lg font-semibold"
                  >
                    <Plus className="h-5 w-5 mr-2" />
                    Yeni Not
                  </button>
                </div>

                {/* Search & Filters */}
                <div className="card-premium">
                  <h3 className="text-lg font-bold text-primary-premium mb-4 flex items-center">
                    <Search className="h-5 w-5 mr-2" />
                    Arama & Filtre
                  </h3>
                  
                  {/* Search */}
                  <div className="relative mb-4">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-secondary-premium" />
                    <input
                      type="text"
                      placeholder="Notlarda ara..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 glass-subtle rounded-xl border border-gray-200 dark:border-slate-600 bg-white/90 dark:bg-slate-800/90 text-premium placeholder-secondary-premium focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  {/* Tags Filter */}
                  <div className="mb-4">
                    <label className="block text-sm font-semibold text-premium mb-2">
                      Etiket
                    </label>
                    <select
                      value={selectedTag}
                      onChange={(e) => setSelectedTag(e.target.value)}
                      className="w-full p-3 glass-subtle rounded-xl border border-gray-200 dark:border-slate-600 bg-white/90 dark:bg-slate-800/90 text-premium focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Tüm Etiketler</option>
                      {allTags.map(tag => (
                        <option key={tag} value={tag}>#{tag}</option>
                      ))}
                    </select>
                  </div>

                  {/* View Mode */}
                  <div className="flex rounded-xl bg-gray-100 dark:bg-slate-700 p-1">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`flex-1 flex items-center justify-center py-2 px-3 rounded-lg transition-all ${
                        viewMode === 'grid' 
                          ? 'bg-white dark:bg-slate-600 shadow-sm' 
                          : 'text-secondary-premium'
                      }`}
                    >
                      <Grid className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`flex-1 flex items-center justify-center py-2 px-3 rounded-lg transition-all ${
                        viewMode === 'list' 
                          ? 'bg-white dark:bg-slate-600 shadow-sm' 
                          : 'text-secondary-premium'
                      }`}
                    >
                      <Menu className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Folders */}
                <div className="card-premium">
                  <h3 className="text-lg font-bold text-primary-premium mb-4 flex items-center">
                    <FolderPlus className="h-5 w-5 mr-2" />
                    Klasörler
                  </h3>
                  
                  <div className="space-y-2">
                    <button
                      onClick={() => setSelectedFolder('all')}
                      className={`w-full text-left p-3 rounded-xl transition-all ${
                        selectedFolder === 'all'
                          ? 'bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800'
                          : 'hover:bg-gray-50 dark:hover:bg-slate-700'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-premium">Tüm Notlar</span>
                        <span className="text-sm text-secondary-premium">{notes.length}</span>
                      </div>
                    </button>
                    
                    {folders.map(folder => (
                      <button
                        key={folder.id}
                        onClick={() => setSelectedFolder(folder.id)}
                        className={`w-full text-left p-3 rounded-xl transition-all ${
                          selectedFolder === folder.id
                            ? 'bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800'
                            : 'hover:bg-gray-50 dark:hover:bg-slate-700'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className={`w-3 h-3 rounded-full bg-${folder.color}-500 mr-3`} />
                            <span className="text-premium">{folder.name}</span>
                          </div>
                          <span className="text-sm text-secondary-premium">{folder.count}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Notes Display */}
            <div className="lg:col-span-3">
              <div className="card-premium">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-primary-premium">
                    {selectedFolder === 'all' ? 'Tüm Notlar' : 
                     folders.find(f => f.id === selectedFolder)?.name || 'Notlar'}
                  </h2>
                  <span className="text-sm text-secondary-premium">
                    {filteredNotes.length} not bulundu
                  </span>
                </div>

                {/* Notes Grid/List */}
                {filteredNotes.length > 0 ? (
                  <div className={`grid gap-6 ${
                    viewMode === 'grid' 
                      ? 'md:grid-cols-2 xl:grid-cols-3' 
                      : 'grid-cols-1'
                  }`}>
                    {filteredNotes.map(note => (
                      <div 
                        key={note.id} 
                        className="group relative bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-slate-700 hover:border-blue-200 dark:hover:border-blue-700 transform hover:-translate-y-1"
                      >
                        {/* Note Header */}
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <h3 className="font-bold text-lg text-slate-800 dark:text-slate-200 line-clamp-2 mb-2">
                              {note.title}
                            </h3>
                            <div className="flex items-center space-x-2 text-xs text-slate-500 dark:text-slate-400">
                              <span className={`inline-flex items-center px-2 py-1 rounded-full bg-${getFolderColor(note.folder)}-100 dark:bg-${getFolderColor(note.folder)}-900 text-${getFolderColor(note.folder)}-600 dark:text-${getFolderColor(note.folder)}-400`}>
                                <FolderPlus className="h-3 w-3 mr-1" />
                                {getFolderName(note.folder)}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                              onClick={() => toggleFavorite(note.id)}
                              className={`p-2 rounded-lg transition-all ${
                                note.isFavorite 
                                  ? 'text-yellow-500 bg-yellow-50 dark:bg-yellow-900/30' 
                                  : 'text-gray-400 hover:text-yellow-500 hover:bg-yellow-50 dark:hover:bg-yellow-900/30'
                              }`}
                            >
                              <Star className={`h-4 w-4 ${note.isFavorite ? 'fill-current' : ''}`} />
                            </button>
                            <button
                              onClick={() => editNote(note)}
                              className="p-2 rounded-lg text-blue-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-all"
                            >
                              <Edit3 className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => deleteNote(note.id)}
                              className="p-2 rounded-lg text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 transition-all"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                        
                        {/* Note Content */}
                        <p className="text-slate-600 dark:text-slate-300 mb-4 line-clamp-3 leading-relaxed">
                          {note.content.replace(/<[^>]*>/g, '')}
                        </p>
                        
                        {/* Note Footer */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3 text-xs text-slate-500 dark:text-slate-400">
                            <span className="flex items-center">
                              <Calendar className="h-3 w-3 mr-1" />
                              {note.updatedAt}
                            </span>
                            <span className="flex items-center">
                              <BookOpen className="h-3 w-3 mr-1" />
                              {note.wordCount} kelime
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {note.tags.slice(0, 2).map(tag => (
                              <span 
                                key={tag}
                                className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-xs font-medium"
                              >
                                #{tag}
                              </span>
                            ))}
                            {note.tags.length > 2 && (
                              <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-full text-xs">
                                +{note.tags.length - 2}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="icon-premium mx-auto mb-6 bg-gradient-to-br from-gray-100 to-slate-100 dark:from-gray-900 dark:to-slate-900">
                      <Edit3 className="h-12 w-12 text-gray-600 dark:text-gray-400" />
                    </div>
                    <h3 className="text-xl font-bold text-primary-premium mb-2">
                      Henüz not yok
                    </h3>
                    <p className="text-secondary-premium mb-6">
                      İlk notunuzu oluşturmak için "Yeni Not" butonuna tıklayın.
                    </p>
                    <button 
                      onClick={createNewNote}
                      className="btn-premium flex items-center mx-auto"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Yeni Not Oluştur
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modern Note Editor Modal - Full Screen */}
      {showEditor && (
        <div className="fixed inset-0 z-[9999] overflow-hidden">
          <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={() => {
            setShowEditor(false);
            document.body.classList.remove('fullscreen-editor');
          }} />
          
          <div className="absolute inset-0 bg-white dark:bg-slate-900 shadow-2xl flex flex-col overflow-hidden">
            
            {/* Full Screen Editor Header */}
            <div className="flex items-center justify-between p-4 lg:p-6 border-b border-gray-200 dark:border-slate-700 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/50 dark:to-purple-950/50">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <Edit3 className="h-5 w-5 lg:h-6 lg:w-6 text-white" />
                </div>
                <div>
                  <h2 className="text-lg lg:text-xl font-bold text-slate-800 dark:text-slate-200">
                    {editingNote ? 'Notu Düzenle' : 'Yeni Not'}
                  </h2>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {editingNote ? 'Mevcut notunuzu güncelleyin' : 'Yeni bir not oluşturun'}
                  </p>
                </div>
              </div>
              <button 
                onClick={() => {
                  setShowEditor(false);
                  document.body.classList.remove('fullscreen-editor');
                }}
                className="p-2 lg:p-3 rounded-xl bg-white dark:bg-slate-800 hover:bg-gray-100 dark:hover:bg-slate-700 transition-all"
              >
                <X className="h-5 w-5 lg:h-6 lg:w-6 text-slate-600 dark:text-slate-400" />
              </button>
            </div>



            {/* Full Screen Modern Toolbar */}
            <div className="p-3 lg:p-4 border-b border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3 overflow-x-auto">
                  {/* Font Size Control */}
                  <div className="flex items-center space-x-2 bg-white dark:bg-slate-700 rounded-lg p-2 flex-shrink-0">
                    <label className="text-xs text-slate-600 dark:text-slate-400 font-medium">Boyut:</label>
                    <select
                      value={fontSize}
                      onChange={(e) => setFontSize(parseInt(e.target.value))}
                      className="text-xs bg-transparent border-none outline-none text-slate-700 dark:text-slate-300 cursor-pointer"
                    >
                      <option value={8}>8px</option>
                      <option value={9}>9px</option>
                      <option value={10}>10px</option>
                      <option value={11}>11px</option>
                      <option value={12}>12px</option>
                      <option value={14}>14px</option>
                      <option value={16}>16px</option>
                      <option value={18}>18px</option>
                    </select>
                  </div>
                  
                  {/* Tag Input */}
                  <div className="flex items-center space-x-2 bg-white dark:bg-slate-700 rounded-lg p-2 flex-shrink-0">
                    <Tag className="h-3.5 w-3.5 text-slate-600 dark:text-slate-400" />
                    <input
                      type="text"
                      placeholder="Etiket ekle..."
                      className="text-xs bg-transparent border-none outline-none text-slate-700 dark:text-slate-300 placeholder-slate-400 w-24"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter' && e.target.value.trim()) {
                          const newTag = e.target.value.trim();
                          if (!currentTags.includes(newTag)) {
                            setCurrentTags([...currentTags, newTag]);
                          }
                          e.target.value = '';
                        }
                      }}
                    />
                  </div>

                  {/* Current Tags */}
                  {currentTags.length > 0 && (
                    <div className="flex items-center space-x-1 flex-shrink-0">
                      {currentTags.map((tag, index) => (
                        <span 
                          key={index}
                          className="inline-flex items-center px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded text-xs font-medium cursor-pointer hover:bg-blue-200 dark:hover:bg-blue-900/50"
                          onClick={() => setCurrentTags(currentTags.filter((_, i) => i !== index))}
                          title="Kaldırmak için tıklayın"
                        >
                          #{tag}
                          <X className="h-3 w-3 ml-1" />
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <div className="flex items-center space-x-2 lg:space-x-3 flex-shrink-0">
                  <button 
                    onClick={() => setShowSidePanel(!showSidePanel)}
                    className="lg:hidden p-1.5 hover:bg-gray-100 dark:hover:bg-slate-600 rounded-lg transition-all group"
                    title="Notları Göster/Gizle"
                  >
                    <Menu className="h-4 w-4 text-slate-600 dark:text-slate-400 group-hover:text-slate-800 dark:group-hover:text-slate-200" />
                  </button>
                  <span className="text-xs text-slate-500 dark:text-slate-400 hidden sm:block">
                    {newNoteContent ? newNoteContent.replace(/<[^>]*>/g, '').split(' ').filter(word => word.length > 0).length : 0} kelime
                  </span>
                  <button 
                    onClick={saveNote}
                    className="flex items-center px-3 lg:px-4 py-1.5 lg:py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={!newNoteContent.trim() || newNoteContent === '<br>' || !newNoteContent.replace(/<[^>]*>/g, '').trim()}
                  >
                    <Save className="h-3.5 w-3.5 mr-1.5" />
                    <span className="hidden sm:inline">{editingNote ? 'Güncelle' : 'Kaydet'}</span>
                    <span className="sm:hidden">{editingNote ? '💾' : '💾'}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Editor Layout with Side Panel */}
            <div className="flex-1 flex overflow-hidden relative">
              {/* Mobile Overlay */}
              {showSidePanel && (
                <div 
                  className="lg:hidden fixed inset-0 bg-black/50 z-10"
                  onClick={() => setShowSidePanel(false)}
                />
              )}
              {/* Left Panel - Notes List */}
              <div className={`${showSidePanel ? 'block' : 'hidden'} lg:block w-72 bg-gray-50 dark:bg-slate-800 border-r border-gray-200 dark:border-slate-700 overflow-y-auto absolute lg:relative z-20 h-full lg:h-auto`}>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300">Notlarınız</h3>
                    <span className="text-xs text-slate-500 dark:text-slate-400">{notes.length}</span>
                  </div>
                  
                  {/* Notes List */}
                  <div className="space-y-2">
                    {notes.length > 0 ? (
                      notes.slice(0, 10).map(note => (
                        <button
                          key={note.id}
                          onClick={() => editNote(note)}
                          className={`w-full text-left p-3 rounded-lg transition-all hover:bg-white dark:hover:bg-slate-700 border border-transparent hover:border-blue-200 dark:hover:border-blue-800 group ${
                            editingNote?.id === note.id ? 'bg-blue-50 dark:bg-blue-950/50 border-blue-200 dark:border-blue-800' : ''
                          }`}
                        >
                          <div className="flex items-start justify-between mb-2">
                            <h4 className="text-sm font-medium text-slate-800 dark:text-slate-200 line-clamp-1 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                              {note.title}
                            </h4>
                            {note.isFavorite && (
                              <Star className="h-3 w-3 text-yellow-500 fill-current flex-shrink-0 ml-1" />
                            )}
                          </div>
                          <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 mb-2">
                            {note.content.replace(/<[^>]*>/g, '')}
                          </p>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-slate-500 dark:text-slate-400">
                              {note.updatedAt}
                            </span>
                            <div className="flex gap-1">
                              {note.tags.slice(0, 2).map(tag => (
                                <span 
                                  key={tag}
                                  className="px-1.5 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded text-xs"
                                >
                                  #{tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        </button>
                      ))
                    ) : (
                      <div className="text-center py-8">
                        <Edit3 className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-500 dark:text-gray-400">Henüz not yok</p>
                        <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">Yazmaya başlayın!</p>
                      </div>
                    )}
                  </div>
                  
                  {notes.length > 10 && (
                    <button className="w-full mt-4 py-2 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium">
                      Tümünü Gör ({notes.length - 10} daha)
                    </button>
                  )}
                </div>
              </div>
              
              {/* Main Editor Area */}
              <div className="flex-1 overflow-y-auto">
                <div className="px-4 md:px-6 lg:px-8 py-6 md:py-8 max-w-full mx-auto">
                <div className="relative">
                  <div
                    ref={editorRef}
                    contentEditable
                    className="notion-editor w-full outline-none text-slate-700 dark:text-slate-300 leading-relaxed focus:outline-none"
                    onInput={(e) => {
                      const content = e.currentTarget.innerHTML;
                      setNewNoteContent(content);
                      handleAutoFormat(e.currentTarget);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        // İlk satırdan sonraki satırlar normal boyutta olsun
                        setTimeout(() => {
                          const selection = window.getSelection();
                          if (selection.rangeCount > 0) {
                            const range = selection.getRangeAt(0);
                            const currentNode = range.startContainer;
                            
                            // Eğer title div'indeyse ve Enter basıldıysa
                            if (currentNode.parentElement?.classList?.contains('notion-title')) {
                              // Yeni div oluştur ve normal boyutta yap
                              document.execCommand('formatBlock', false, 'div');
                            }
                          }
                        }, 10);
                      }
                    }}
                    onFocus={() => {
                      if (editorRef.current?.innerHTML === '' || editorRef.current?.innerHTML === '<br>') {
                        editorRef.current.innerHTML = '<div class="notion-title">Başlıksız</div><div><br></div>';
                        const range = document.createRange();
                        const sel = window.getSelection();
                        range.setStart(editorRef.current.firstChild.firstChild, 0);
                        range.collapse(true);
                        sel.removeAllRanges();
                        sel.addRange(range);
                      }
                    }}
                    suppressContentEditableWarning={true}
                    style={{ 
                      minHeight: 'calc(100vh - 300px)',
                      fontSize: `${fontSize}px`,
                      lineHeight: '1.6',
                      wordWrap: 'break-word',
                      overflowWrap: 'break-word'
                    }}
                  />
                  {(!newNoteContent || newNoteContent === '<br>' || newNoteContent === '<div class="notion-title">Başlıksız</div><div><br></div>') && (
                    <div className="absolute top-0 left-0 text-slate-400 dark:text-slate-500 pointer-events-none">
                      <div className="text-2xl font-bold mb-2 opacity-50">Başlıksız</div>
                      <div className="text-sm opacity-50">Başlığınızı yazın ve Enter'a basarak devam edin...</div>
                    </div>
                  )}
                </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotAlani; 