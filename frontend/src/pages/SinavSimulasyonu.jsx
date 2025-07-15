import React, { useState } from 'react';
import { 
  AcademicCapIcon, 
  ClockIcon, 
  MagnifyingGlassIcon,
  RocketLaunchIcon,
  LightBulbIcon,
  TrophyIcon,
  SparklesIcon,
  FireIcon,
  DocumentTextIcon
} from '@heroicons/react/24/outline';
import { getAllCourses, getCoursesForClass } from '../data/curriculum';

const SinavSimulasyonu = () => {
  // States
  const [selectedClass, setSelectedClass] = useState('');
  const [courseSearchTerm, setCourseSearchTerm] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedExamType, setSelectedExamType] = useState('');
  const [selectedExamFormat, setSelectedExamFormat] = useState('');
  const [includeVize, setIncludeVize] = useState('');

  // Get filtered courses based on class and search
  const getFilteredCourses = () => {
    const coursesToFilter = selectedClass ? getCoursesForClass(selectedClass) : getAllCourses();
    return coursesToFilter
      .filter(course => course.toLowerCase().includes(courseSearchTerm.toLowerCase()))
      .slice(0, 8); // Limit to 8 for better display
  };

  // Exam types
  const examTypes = [
    { name: 'Vize', duration: 90, questionCount: 25 },
    { name: 'Final', duration: 120, questionCount: 40 },
    { name: 'Quiz', duration: 30, questionCount: 15 }
  ];

  // Exam formats
  const examFormats = [
    { id: 'test', name: 'Test', icon: '📝', description: 'Çoktan seçmeli' },
    { id: 'boşluk', name: 'Boşluk Doldurma', icon: '✏️', description: 'Fill in the blank' },
    { id: 'dy', name: 'Doğru/Yanlış', icon: '✅', description: 'True/False' },
    { id: 'klasik', name: 'Klasik', icon: '📖', description: 'Açık uçlu' },
    { id: 'hepsi', name: 'Hepsi', icon: '🎯', description: 'Karışık format' }
  ];

  // Reset dependent selections
  const handleClassChange = (classNum) => {
    setSelectedClass(classNum);
    setSelectedCourse('');
    setCourseSearchTerm('');
  };

  const handleCourseSelect = (course) => {
    setSelectedCourse(course);
    setCourseSearchTerm('');
  };

  const handleExamTypeChange = (examType) => {
    setSelectedExamType(examType);
    setIncludeVize('');
  };

  const startExam = () => {
    // Backend'e sınav başlatma request'i gönderilecek
    console.log('Sınav parametreleri:', {
      course: selectedCourse,
      examType: selectedExamType,
      examFormat: selectedExamFormat,
      includeVize: includeVize
    });
    
    // Şimdilik alert göster - backend entegrasyonunda API call olacak
    alert(`Backend'e sınav başlatma request'i gönderilecek!\nDers: ${selectedCourse}\nTür: ${selectedExamType}\nFormat: ${examFormats.find(f => f.id === selectedExamFormat)?.name}`);
  };

  const canStartExam = selectedCourse && selectedExamType && selectedExamFormat && (selectedExamType !== 'Final' || includeVize);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-800 dark:text-slate-100 mb-4">
            🎯 Sınav Simülasyonu
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Gerçek sınav deneyimi yaşayın. Ders, sınav türü ve formatı seçerek 
            sınav simülasyonu başlatın.
          </p>
        </div>

        {/* Step 1: Course Selection */}
        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl border border-slate-200/50 dark:border-slate-700/50 shadow-lg p-6 mb-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">1</div>
            <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200">Ders Seçimi</h2>
          </div>

          {/* Class Filter Buttons */}
          <div className="mb-6">
            <div className="flex flex-wrap gap-2">
              {['Tümü', '1. Sınıf', '2. Sınıf', '3. Sınıf', '4. Sınıf'].map((label, index) => {
                const classValue = index === 0 ? '' : index.toString();
                return (
                  <button
                    key={label}
                    onClick={() => handleClassChange(classValue)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                      selectedClass === classValue
                        ? 'bg-blue-500 text-white shadow-lg scale-105'
                        : 'bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-600 hover:border-blue-300 hover:scale-102'
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Course Search */}
          <div className="mb-4">
            <div className="relative">
              <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-3 text-slate-400" />
              <input
                type="text"
                placeholder="Ders ara... (ör: programlama, veritabanı)"
                value={courseSearchTerm}
                onChange={(e) => setCourseSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Course List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-64 overflow-y-auto">
            {getFilteredCourses().map((course) => (
              <label
                key={course}
                onClick={() => handleCourseSelect(course)}
                className={`block p-3 rounded-lg border-2 transition-all duration-200 cursor-pointer ${
                  selectedCourse === course
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/30 shadow-md'
                    : 'border-slate-200 dark:border-slate-700 hover:border-blue-300 bg-white dark:bg-slate-700 hover:shadow-sm'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-4 h-4 rounded-full border-2 ${
                    selectedCourse === course
                      ? 'border-blue-500 bg-blue-500'
                      : 'border-slate-300 dark:border-slate-600'
                  }`}>
                    {selectedCourse === course && (
                      <div className="w-full h-full rounded-full bg-white transform scale-50"></div>
                    )}
                  </div>
                  <span className="font-medium text-slate-700 dark:text-slate-300 text-sm">
                    {course}
                  </span>
                </div>
              </label>
            ))}
          </div>

          {getFilteredCourses().length === 0 && (
            <div className="text-center py-8 text-slate-500">
              <AcademicCapIcon className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>Arama kriterinize uygun ders bulunamadı</p>
            </div>
          )}
        </div>

        {/* Step 2: Exam Parameters */}
        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl border border-slate-200/50 dark:border-slate-700/50 shadow-lg p-6 mb-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold">2</div>
            <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200">Sınav Türü ve Şekli</h2>
          </div>

          <div className="space-y-6">
            {/* Exam Type Selection */}
            <div>
              <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-4 flex items-center">
                <ClockIcon className="w-5 h-5 mr-2 text-purple-500" />
                Sınav Türü
              </h3>
              
              <div className="space-y-3">
                {examTypes.map((examType) => (
                  <div key={examType.name}>
                    <label
                      className={`block p-4 rounded-lg border-2 transition-all duration-200 cursor-pointer ${
                        selectedExamType === examType.name
                          ? 'border-purple-500 bg-purple-50 dark:bg-purple-950/30'
                          : 'border-slate-200 dark:border-slate-700 hover:border-purple-300 bg-white dark:bg-slate-700'
                      }`}
                    >
                      <input
                        type="radio"
                        name="examType"
                        value={examType.name}
                        checked={selectedExamType === examType.name}
                        onChange={(e) => handleExamTypeChange(e.target.value)}
                        className="sr-only"
                      />
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className={`w-4 h-4 rounded-full border-2 ${
                            selectedExamType === examType.name
                              ? 'border-purple-500 bg-purple-500'
                              : 'border-slate-300 dark:border-slate-600'
                          }`}>
                            {selectedExamType === examType.name && (
                              <div className="w-full h-full rounded-full bg-white transform scale-50"></div>
                            )}
                          </div>
                          <span className="font-semibold text-slate-700 dark:text-slate-300">
                            {examType.name}
                          </span>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-slate-600 dark:text-slate-400">
                            {examType.duration} dk
                          </div>
                          <div className="text-xs text-slate-500">
                            {examType.questionCount} soru
                          </div>
                        </div>
                      </div>
                    </label>
                    
                    {/* Final Exam Vize Options */}
                    {selectedExamType === 'Final' && examType.name === 'Final' && (
                      <div className="mt-3 ml-6 p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                        <div className="flex space-x-3">
                          {[
                            { value: 'dahil', label: 'Vize Dahil', emoji: '📚' },
                            { value: 'dahil-degil', label: 'Vize Dahil Değil', emoji: '📖' }
                          ].map((option) => (
                            <label
                              key={option.value}
                              className={`flex items-center space-x-2 p-2 rounded-md cursor-pointer transition-all ${
                                includeVize === option.value
                                  ? 'bg-orange-500 text-white'
                                  : 'bg-white dark:bg-slate-600 text-slate-700 dark:text-slate-300 hover:bg-orange-100'
                              }`}
                            >
                              <input
                                type="radio"
                                name="includeVize"
                                value={option.value}
                                checked={includeVize === option.value}
                                onChange={(e) => setIncludeVize(e.target.value)}
                                className="sr-only"
                              />
                              <span className="text-sm">{option.emoji}</span>
                              <span className="text-sm font-medium">{option.label}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Exam Format Selection */}
            <div>
              <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-4 flex items-center">
                <DocumentTextIcon className="w-5 h-5 mr-2 text-green-500" />
                Sınav Şekli
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {examFormats.map((format) => (
                  <label
                    key={format.id}
                    className={`block p-3 rounded-lg border-2 transition-all duration-200 cursor-pointer ${
                      selectedExamFormat === format.id
                        ? 'border-green-500 bg-green-50 dark:bg-green-950/30'
                        : 'border-slate-200 dark:border-slate-700 hover:border-green-300 bg-white dark:bg-slate-700'
                    }`}
                  >
                    <input
                      type="radio"
                      name="examFormat"
                      value={format.id}
                      checked={selectedExamFormat === format.id}
                      onChange={(e) => setSelectedExamFormat(e.target.value)}
                      className="sr-only"
                    />
                    <div className="flex items-center space-x-3">
                      <div className={`w-4 h-4 rounded-full border-2 ${
                        selectedExamFormat === format.id
                          ? 'border-green-500 bg-green-500'
                          : 'border-slate-300 dark:border-slate-600'
                      }`}>
                        {selectedExamFormat === format.id && (
                          <div className="w-full h-full rounded-full bg-white transform scale-50"></div>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <span className="text-lg">{format.icon}</span>
                          <span className="font-medium text-slate-700 dark:text-slate-300 text-sm">
                            {format.name}
                          </span>
                        </div>
                        <div className="text-xs text-slate-500 mt-1">{format.description}</div>
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Step 3: Start Exam */}
        {canStartExam && (
          <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl border border-slate-200/50 dark:border-slate-700/50 shadow-lg p-6 text-center animate-fade-in">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold">3</div>
              <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200">Sınav Başlatma</h2>
            </div>

            {/* Selected Options Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-white/70 dark:bg-slate-700/70 backdrop-blur-sm rounded-xl border border-slate-200/50 dark:border-slate-600/50 p-4 shadow-sm">
                <AcademicCapIcon className="w-6 h-6 text-blue-500 mx-auto mb-2" />
                <div className="font-semibold text-slate-800 dark:text-slate-200 text-sm mb-1">Ders</div>
                <div className="text-xs text-slate-600 dark:text-slate-400">{selectedCourse}</div>
              </div>
              <div className="bg-white/70 dark:bg-slate-700/70 backdrop-blur-sm rounded-xl border border-slate-200/50 dark:border-slate-600/50 p-4 shadow-sm">
                <ClockIcon className="w-6 h-6 text-purple-500 mx-auto mb-2" />
                <div className="font-semibold text-slate-800 dark:text-slate-200 text-sm mb-1">
                  {selectedExamType} ({examTypes.find(e => e.name === selectedExamType)?.duration} dk)
                </div>
                <div className="text-xs text-slate-600 dark:text-slate-400">
                  {examTypes.find(e => e.name === selectedExamType)?.questionCount} soru
                </div>
              </div>
              <div className="bg-white/70 dark:bg-slate-700/70 backdrop-blur-sm rounded-xl border border-slate-200/50 dark:border-slate-600/50 p-4 shadow-sm">
                <DocumentTextIcon className="w-6 h-6 text-green-500 mx-auto mb-2" />
                <div className="font-semibold text-slate-800 dark:text-slate-200 text-sm mb-1">Sınav Şekli</div>
                <div className="text-xs text-slate-600 dark:text-slate-400">
                  {examFormats.find(f => f.id === selectedExamFormat)?.name}
                </div>
              </div>
            </div>

            <button
              onClick={startExam}
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 text-lg"
            >
              <RocketLaunchIcon className="w-6 h-6 mr-3" />
              Sınavı Başlat
            </button>
          </div>
        )}

        {/* Tips Section */}
        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl border border-slate-200/50 dark:border-slate-700/50 shadow-lg p-6 mt-8">
          <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200 text-center mb-6">
            💡 Başarı İpuçları
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center space-y-3 p-4 bg-white/50 dark:bg-slate-700/50 rounded-lg border border-slate-200/30 dark:border-slate-600/30">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center mx-auto">
                <ClockIcon className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-slate-800 dark:text-slate-200">Zaman Yönetimi</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Her soruya eşit zaman ayırın ve zor soruları sonraya bırakın
              </p>
            </div>
            <div className="text-center space-y-3 p-4 bg-white/50 dark:bg-slate-700/50 rounded-lg border border-slate-200/30 dark:border-slate-600/30">
              <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto">
                <LightBulbIcon className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-slate-800 dark:text-slate-200">Dikkatli Okuma</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Soruları ve şıkları dikkatlice okuyun, anahtar kelimelere odaklanın
              </p>
            </div>
            <div className="text-center space-y-3 p-4 bg-white/50 dark:bg-slate-700/50 rounded-lg border border-slate-200/30 dark:border-slate-600/30">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center mx-auto">
                <TrophyIcon className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-slate-800 dark:text-slate-200">Kendine Güven</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                İlk seçtiğiniz cevap genellikle doğrudur, gereksiz değişiklik yapmayın
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SinavSimulasyonu; 