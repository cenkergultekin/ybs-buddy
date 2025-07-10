import { useState, useRef, useEffect } from 'react';
import { 
  Plus, Search, Filter, FolderPlus, Edit3, Trash2, 
  Save, Bold, Italic, Underline, List, ListOrdered,
  Quote, Calendar, Clock, BookOpen, Tag, Star,
  Grid, Menu, Eye, Copy, Download, Share2
} from 'lucide-react';

const NotAlani = () => {
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
  const editorRef = useRef(null);

  // Örnek klasörler
  const defaultFolders = [
    { id: 'personal', name: 'Kişisel Notlar', color: 'blue', count: 8 },
    { id: 'courses', name: 'Ders Notları', color: 'green', count: 15 },
    { id: 'projects', name: 'Proje Notları', color: 'purple', count: 6 },
    { id: 'research', name: 'Araştırma', color: 'orange', count: 4 }
  ];

  // Örnek notlar
  const defaultNotes = [
    {
      id: 1,
      title: 'Veri Tabanı Tasarımı Notları',
      content: 'ER diyagramları ve normalizasyon kuralları...',
      folder: 'courses',
      tags: ['veritabanı', 'ders'],
      createdAt: '2024-03-15',
      updatedAt: '2024-03-15',
      isFavorite: true,
      wordCount: 245
    },
    {
      id: 2,
      title: 'Proje Yönetimi Stratejileri',
      content: 'Agile metodolojisi ve Scrum framework...',
      folder: 'projects',
      tags: ['proje', 'yönetim'],
      createdAt: '2024-03-10',
      updatedAt: '2024-03-12',
      isFavorite: false,
      wordCount: 189
    }
  ];

  // Etiketler
  const allTags = ['veritabanı', 'ders', 'proje', 'yönetim', 'araştırma', 'önemli'];

  useEffect(() => {
    setFolders(defaultFolders);
    setNotes(defaultNotes);
  }, []);

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
    setShowEditor(true);
    setTimeout(() => editorRef.current?.focus(), 100);
  };

  const editNote = (note) => {
    setEditingNote(note);
    setNewNoteTitle(note.title);
    setNewNoteContent(note.content);
    setShowEditor(true);
    setTimeout(() => {
      editorRef.current.innerHTML = note.content;
      editorRef.current?.focus();
    }, 100);
  };

  const saveNote = () => {
    if (!newNoteTitle.trim() || !newNoteContent.trim()) return;

    const noteData = {
      title: newNoteTitle,
      content: newNoteContent,
      folder: selectedFolder !== 'all' ? selectedFolder : 'personal',
      tags: [],
      updatedAt: new Date().toISOString().split('T')[0],
      wordCount: newNoteContent.replace(/<[^>]*>/g, '').split(' ').length
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

    setShowEditor(false);
    setEditingNote(null);
    setNewNoteTitle('');
    setNewNoteContent('');
    editorRef.current.innerHTML = '';
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
    document.execCommand(command, false, value);
    editorRef.current?.focus();
  };

  return (
    <div className="pt-18 min-h-screen relative z-10">
      {/* Header */}
      <section className="section-premium">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-50 to-violet-50 dark:from-blue-950 dark:to-violet-950 rounded-full border border-blue-200/30 dark:border-blue-800/30 mb-6">
              <Edit3 className="h-4 w-4 text-blue-600 dark:text-blue-400 mr-2" />
              <span className="text-sm font-medium text-primary-premium">Smart Note System</span>
            </div>
            <h1 className="text-4xl md:text-5xl gradient-premium mb-6">
              Not Tutma Alanı
            </h1>
            <p className="text-lg text-secondary-premium max-w-3xl mx-auto">
              Düşüncelerinizi organize edin, notlarınızı kategorize edin ve 
              güçlü editör özellikleriyle yaratıcılığınızı serbest bırakın.
            </p>
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
                    className="btn-premium w-full flex items-center justify-center py-4"
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
                        className="feature-card border border-gray-200/50 dark:border-slate-600/50 group"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <h3 className="font-bold text-primary-premium line-clamp-2 flex-1">
                            {note.title}
                          </h3>
                          <div className="flex items-center space-x-2 ml-2">
                            <button
                              onClick={() => toggleFavorite(note.id)}
                              className={`p-1 rounded transition-colors ${
                                note.isFavorite 
                                  ? 'text-yellow-500' 
                                  : 'text-gray-400 hover:text-yellow-500'
                              }`}
                            >
                              <Star className={`h-4 w-4 ${note.isFavorite ? 'fill-current' : ''}`} />
                            </button>
                            <button
                              onClick={() => editNote(note)}
                              className="p-1 text-blue-500 hover:text-blue-600 transition-colors"
                            >
                              <Edit3 className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => deleteNote(note.id)}
                              className="p-1 text-red-500 hover:text-red-600 transition-colors"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                        
                        <p className="text-secondary-premium mb-4 line-clamp-3">
                          {note.content.replace(/<[^>]*>/g, '')}
                        </p>
                        
                        <div className="flex items-center justify-between text-xs text-secondary-premium">
                          <div className="flex items-center space-x-3">
                            <span className="flex items-center">
                              <Calendar className="h-3 w-3 mr-1" />
                              {note.updatedAt}
                            </span>
                            <span className="flex items-center">
                              <BookOpen className="h-3 w-3 mr-1" />
                              {note.wordCount} kelime
                            </span>
                          </div>
                          <div className="flex space-x-1">
                            {note.tags.map(tag => (
                              <span 
                                key={tag}
                                className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded text-xs"
                              >
                                #{tag}
                              </span>
                            ))}
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

      {/* Note Editor Modal */}
      {showEditor && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={() => setShowEditor(false)} />
          
          <div className="absolute inset-4 max-w-6xl mx-auto bg-white dark:bg-slate-900 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
            
            {/* Editor Header */}
            <div className="p-6 border-b border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-900">
              <div className="flex items-center justify-between">
                <div className="flex-1 mr-4">
                  <input
                    type="text"
                    placeholder="Not başlığı..."
                    value={newNoteTitle}
                    onChange={(e) => setNewNoteTitle(e.target.value)}
                    className="w-full text-2xl font-bold text-primary-premium bg-transparent border-none outline-none placeholder-secondary-premium"
                  />
                </div>
                <div className="flex items-center space-x-3">
                  <button 
                    onClick={saveNote}
                    className="btn-premium flex items-center px-4 py-2"
                    disabled={!newNoteTitle.trim() || !newNoteContent.trim()}
                  >
                    <Save className="h-4 w-4 mr-2" />
                    {editingNote ? 'Güncelle' : 'Kaydet'}
                  </button>
                  <button 
                    onClick={() => setShowEditor(false)}
                    className="btn-secondary-premium px-4 py-2"
                  >
                    İptal
                  </button>
                </div>
              </div>
            </div>

            {/* Toolbar */}
            <div className="p-4 border-b border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-800">
              <div className="flex items-center space-x-2">
                <button 
                  onClick={() => formatText('bold')}
                  className="p-2 hover:bg-white dark:hover:bg-slate-700 rounded-lg transition-colors"
                  title="Kalın"
                >
                  <Bold className="h-4 w-4" />
                </button>
                <button 
                  onClick={() => formatText('italic')}
                  className="p-2 hover:bg-white dark:hover:bg-slate-700 rounded-lg transition-colors"
                  title="İtalik"
                >
                  <Italic className="h-4 w-4" />
                </button>
                <button 
                  onClick={() => formatText('underline')}
                  className="p-2 hover:bg-white dark:hover:bg-slate-700 rounded-lg transition-colors"
                  title="Altı Çizili"
                >
                  <Underline className="h-4 w-4" />
                </button>
                <div className="w-px h-6 bg-gray-300 dark:bg-slate-600 mx-2" />
                <button 
                  onClick={() => formatText('insertUnorderedList')}
                  className="p-2 hover:bg-white dark:hover:bg-slate-700 rounded-lg transition-colors"
                  title="Madde İşareti"
                >
                  <List className="h-4 w-4" />
                </button>
                <button 
                  onClick={() => formatText('insertOrderedList')}
                  className="p-2 hover:bg-white dark:hover:bg-slate-700 rounded-lg transition-colors"
                  title="Numaralı Liste"
                >
                  <ListOrdered className="h-4 w-4" />
                </button>
                <button 
                  onClick={() => formatText('formatBlock', 'blockquote')}
                  className="p-2 hover:bg-white dark:hover:bg-slate-700 rounded-lg transition-colors"
                  title="Alıntı"
                >
                  <Quote className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Editor */}
            <div className="flex-1 p-6 overflow-y-auto">
              <div
                ref={editorRef}
                contentEditable
                className="min-h-full w-full outline-none text-premium leading-relaxed"
                style={{ minHeight: '400px' }}
                onInput={(e) => setNewNoteContent(e.currentTarget.innerHTML)}
                placeholder="Notunuzu buraya yazın..."
                suppressContentEditableWarning={true}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotAlani; 