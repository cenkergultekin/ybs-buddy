import React, { useState } from 'react';
import { 
  GraduationCap, 
  BookOpen, 
  Calendar, 
  Clock, 
  CheckCircle, 
  Star,
  Filter,
  List,
  Grid,
  Users,
  Award,
  Target,
  AlertTriangle,
  ChevronDown,
  ChevronRight
} from 'lucide-react';
import { curriculum } from '../data/curriculum';

const Mufredat = () => {
  const [selectedClass, setSelectedClass] = useState('1');
  const [selectedSemester, setSelectedSemester] = useState('Güz');
  const [selectedType, setSelectedType] = useState('all'); // 'all', 'zorunlu', 'seçmeli'
  const [expandedCourses, setExpandedCourses] = useState(new Set());

  const getFilteredCourses = () => {
    const semesterData = curriculum[selectedClass]?.[selectedSemester];
    if (!semesterData) return [];

    if (selectedType === 'zorunlu') {
      return semesterData.zorunlu.map(course => ({ 
        name: course, 
        type: course.includes('Üniversite Seçmeli Ders') ? 'usd' : 'zorunlu' 
      }));
    } else if (selectedType === 'seçmeli') {
      return semesterData.seçmeli.map(course => ({ name: course, type: 'seçmeli' }));
    } else {
      const allCourses = [
        ...semesterData.zorunlu.map(course => ({ 
          name: course, 
          type: course.includes('Üniversite Seçmeli Ders') ? 'usd' : 'zorunlu' 
        })),
        ...semesterData.seçmeli.map(course => ({ name: course, type: 'seçmeli' }))
      ];
      
      return allCourses;
    }
  };

  const toggleCourseExpansion = (courseId) => {
    const newExpanded = new Set(expandedCourses);
    if (newExpanded.has(courseId)) {
      newExpanded.delete(courseId);
    } else {
      newExpanded.add(courseId);
    }
    setExpandedCourses(newExpanded);
  };

  const getSemesterLabel = (semester) => {
    return semester === 'Güz' ? 'Güz Dönemi' : 'Bahar Dönemi';
  };

  const getCourseTypeColor = (type, courseName = '') => {
    if (courseName === 'Staj') {
      return 'from-orange-500 to-red-600';
    }
    
    switch (type) {
      case 'zorunlu':
        return 'from-blue-500 to-cyan-600';
      case 'seçmeli':
        return 'from-emerald-500 to-teal-600';
      case 'usd':
        return 'from-yellow-500 to-amber-600';
      default:
        return 'from-slate-500 to-slate-600';
    }
  };

  const getCourseTypeIcon = (type, courseName = '') => {
    if (courseName === 'Staj') {
      return <Target className="h-4 w-4" />;
    }
    
    switch (type) {
      case 'zorunlu':
        return <CheckCircle className="h-4 w-4" />;
      case 'seçmeli':
        return <Star className="h-4 w-4" />;
      case 'usd':
        return <Award className="h-4 w-4" />;
      default:
        return <BookOpen className="h-4 w-4" />;
    }
  };

  const filteredCourses = getFilteredCourses();

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      {/* Background Decorations */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-20 right-10 w-64 h-64 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 left-10 w-80 h-80 bg-gradient-to-br from-emerald-400/10 to-cyan-400/10 rounded-full animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header */}
        <div className="text-center mb-6 animate-slide-up">
          <div className="inline-flex items-center px-3 py-1.5 mb-3 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 rounded-full border border-blue-200/30 dark:border-blue-800/30">
            <GraduationCap className="h-4 w-4 text-blue-600 dark:text-blue-400 mr-2" />
            <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
              Akademik Müfredat
            </span>
          </div>
          
          <h1 className="text-2xl md:text-3xl font-bold mb-2 text-slate-800 dark:text-slate-200">
            YBS Müfredatı
          </h1>
          
          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-lg mx-auto">
            <strong className="text-slate-800 dark:text-slate-200">Bandırma Onyedi Eylül Üniversitesi</strong> YBS ders programı
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl border border-slate-200/50 dark:border-slate-700/50 shadow-sm mb-4 animate-fade-in">
          <div className="p-4">
            <div className="flex items-center space-x-2 mb-3">
              <Filter className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <h2 className="text-base font-semibold text-slate-800 dark:text-slate-200">Filtreler</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {/* Sınıf Seçimi */}
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Sınıf
                </label>
                <div className="grid grid-cols-2 gap-1.5">
                  {['1', '2', '3', '4'].map(classNum => (
                    <button
                      key={classNum}
                      onClick={() => {
                        setSelectedClass(classNum);
                        // 1. sınıfta seçmeli ders yok, seçmeli modundaysak all moduna geç
                        if (classNum === '1' && selectedType === 'seçmeli') {
                          setSelectedType('all');
                        }
                      }}
                      className={`py-1.5 px-2 rounded-md font-medium transition-all duration-200 text-xs ${
                        selectedClass === classNum
                          ? 'bg-blue-500 text-white shadow-sm'
                          : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-600'
                      }`}
                    >
                      {classNum}. Sınıf
                    </button>
                  ))}
                </div>
              </div>

              {/* Dönem Seçimi */}
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Dönem
                </label>
                <div className="grid grid-cols-1 gap-1.5">
                  {['Güz', 'Bahar'].map(semester => (
                    <button
                      key={semester}
                      onClick={() => setSelectedSemester(semester)}
                      className={`py-1.5 px-2 rounded-md font-medium transition-all duration-200 flex items-center justify-center text-xs ${
                        selectedSemester === semester
                          ? 'bg-emerald-500 text-white shadow-sm'
                          : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-600'
                      }`}
                    >
                      <Calendar className="h-3 w-3 mr-1.5" />
                      {getSemesterLabel(semester)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Ders Türü Seçimi */}
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Ders Türü
                </label>
                <div className="grid grid-cols-1 gap-1.5">
                  {[
                    { key: 'all', label: 'Tümü', icon: BookOpen },
                    { key: 'zorunlu', label: 'Zorunlu', icon: CheckCircle },
                    { key: 'seçmeli', label: 'Seçmeli', icon: Star }
                  ].map(type => {
                    // Hangi türlerin hangi sınıflarda aktif olacağını belirle
                    let isDisabled = false;
                    if (type.key === 'seçmeli' && selectedClass === '1') {
                      isDisabled = true; // 1. sınıfta seçmeli ders yok
                    }
                    
                    return (
                      <button
                        key={type.key}
                        onClick={() => !isDisabled && setSelectedType(type.key)}
                        disabled={isDisabled}
                        className={`py-1.5 px-2 rounded-md font-medium transition-all duration-200 flex items-center justify-center text-xs ${
                          isDisabled
                            ? 'bg-slate-200 dark:bg-slate-600 text-slate-400 dark:text-slate-500 cursor-not-allowed opacity-50'
                            : selectedType === type.key
                            ? 'bg-purple-500 text-white shadow-sm'
                            : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-600'
                        }`}
                      >
                        <type.icon className="h-3 w-3 mr-1.5" />
                        {type.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Current Selection Info */}
        <div className="bg-gradient-to-r from-blue-50/80 to-purple-50/80 dark:from-blue-950/30 dark:to-purple-950/30 rounded-lg border border-blue-200/30 dark:border-blue-800/30 p-3 mb-4 animate-fade-in">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1.5">
                <Target className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                <span className="font-medium text-slate-800 dark:text-slate-200 text-sm">
                  {selectedClass}. Sınıf • {getSemesterLabel(selectedSemester)}
                </span>
              </div>
              <div className="flex items-center space-x-1.5">
                <Users className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                <span className="text-slate-600 dark:text-slate-400 text-sm">
                  {filteredCourses.length} ders
                </span>
              </div>
            </div>
          </div>
          
          {/* Seçmeli Ders Bilgisi */}
          <div className="mt-2 pt-2 border-t border-blue-200/20 dark:border-blue-800/20">
            <span className="text-xs text-slate-600 dark:text-slate-400">
              {(() => {
                if (selectedClass === '1') {
                  return 'Bu dönemde seçmeli ders bulunmamaktadır.';
                } else if (selectedClass === '2') {
                  return 'Bu dönemde 1 seçmeli ders alınır.';
                } else if (selectedClass === '3') {
                  return 'Bu dönemde 2 seçmeli + 1 üniversite seçmeli ders alınır.';
                } else if (selectedClass === '4') {
                  return 'Bu dönemde 3 seçmeli ders alınır.';
                }
                return '';
              })()}
            </span>
          </div>
        </div>

        {/* Courses Display - Kompakt Liste */}
        <div className="space-y-2 animate-fade-in">
          {filteredCourses.map((course, index) => (
            <div
              key={`${course.name}-${index}`}
              className="group bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-lg border border-slate-200/50 dark:border-slate-700/50 shadow-sm hover:shadow-md transition-all duration-200 p-3"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3 flex-1">
                  {/* Course Type Badge */}
                  <div className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium text-white bg-gradient-to-r ${getCourseTypeColor(course.type, course.name)} shadow-sm flex-shrink-0`}>
                    {getCourseTypeIcon(course.type, course.name)}
                    <span className="ml-1">
                      {course.type === 'zorunlu' ? 'Zorunlu' : 
                       course.type === 'seçmeli' ? 'Seçmeli' : 
                       course.type === 'usd' ? 'USD' : course.type}
                    </span>
                  </div>

                  {/* Course Name */}
                  <h3 className="font-medium text-slate-800 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors text-sm flex-1">
                    {course.name}
                  </h3>

                  {/* Course Info */}
                  <div className="flex items-center text-xs text-slate-500 dark:text-slate-400 space-x-2 flex-shrink-0">
                    <Clock className="h-3 w-3" />
                    <span>{selectedClass}. Sınıf • {getSemesterLabel(selectedSemester)}</span>
                  </div>
                </div>

                {/* Expand Button */}
                <button
                  onClick={() => toggleCourseExpansion(`${course.name}-${index}`)}
                  className="ml-3 p-1.5 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-md transition-all duration-200 text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 flex-shrink-0"
                >
                  {expandedCourses.has(`${course.name}-${index}`) ? (
                    <ChevronDown className="h-3 w-3" />
                  ) : (
                    <ChevronRight className="h-3 w-3" />
                  )}
                </button>
              </div>

              {/* Expanded Content */}
              {expandedCourses.has(`${course.name}-${index}`) && (
                <div className="mt-3 p-3 bg-slate-50 dark:bg-slate-700/50 rounded-md border border-slate-200/50 dark:border-slate-600/50">
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    Bu ders {selectedClass}. sınıf {getSemesterLabel(selectedSemester).toLowerCase()} döneminde 
                    {course.type === 'zorunlu' ? ' zorunlu' : 
                     course.type === 'seçmeli' ? ' seçmeli' : 
                     course.type === 'usd' ? ' üniversite seçmeli' : ''} ders olarak verilmektedir.
                  </p>
                  {course.type === 'seçmeli' && (
                    <div className="mt-2 text-xs text-amber-600 dark:text-amber-400 font-medium">
                      💡 Bu seçmeli dersi almak için danışmanınızla görüşünüz.
                    </div>
                  )}
                  {course.name === 'Staj' && (
                    <div className="mt-2 text-xs text-orange-600 dark:text-orange-400 font-medium">
                      💼 Staj dersi için uygun işyeri bulmanız ve staj koordinatörüyle iletişime geçmeniz gerekmektedir.
                    </div>
                  )}
                  {course.type === 'usd' && (
                    <div className="mt-2 text-xs text-yellow-600 dark:text-yellow-400 font-medium">
                      🎓 Bu üniversite seçmeli dersi tüm üniversite derslerinden seçilebilir.
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* No Courses Message */}
        {filteredCourses.length === 0 && (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen className="h-8 w-8 text-slate-500 dark:text-slate-400" />
            </div>
            <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-2">
              Bu filtrelere uygun ders bulunamadı
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto">
              Farklı filtre seçenekleri deneyerek diğer dersleri görüntüleyebilirsiniz.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Mufredat; 