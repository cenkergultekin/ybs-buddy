import React, { useState, useEffect } from 'react';
import { 
  ClockIcon, 
  CheckCircleIcon, 
  XCircleIcon,
  PlayIcon,
  PauseIcon,
  ForwardIcon,
  BackwardIcon,
  AcademicCapIcon,
  ChartBarIcon,
  TrophyIcon,
  FireIcon,
  StarIcon,
  LightBulbIcon,
  RocketLaunchIcon,
  SparklesIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';

function SinavSimulasyonu() {
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedExamType, setSelectedExamType] = useState('');
  const [includeVize, setIncludeVize] = useState(''); // 'dahil' or 'dahil-degil'
  const [examStarted, setExamStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [examFinished, setExamFinished] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const courses = [
    'Programlama Temelleri',
    'Veritabanı Yönetimi',
    'Web Programlama',
    'Yapay Zeka',
    'Siber Güvenlik',
    'Veri Madenciliği'
  ];

  const examTypes = [
    { name: 'Vize', duration: 90, questionCount: 25 },
    { name: 'Final', duration: 120, questionCount: 40 },
    { name: 'Quiz', duration: 30, questionCount: 15 }
  ];

  const sampleQuestions = [
    {
      id: 1,
      type: 'multiple',
      question: 'Java programlama dilinde "String" veri tipinin özelliği nedir?',
      options: [
        'Mutable (değiştirilebilir) bir veri tipidir',
        'Immutable (değiştirilemez) bir veri tipidir',
        'Primitive (ilkel) bir veri tipidir',
        'Sadece sayısal değerler içerebilir'
      ],
      correct: 1,
      explanation: 'Java\'da String sınıfı immutable\'dır, yani bir kez oluşturulduktan sonra değiştirilemez.',
      difficulty: 'Orta',
      points: 4
    },
    {
      id: 2,
      type: 'truefalse',
      question: 'Normalizasyon, veritabanı tasarımında veri tekrarını azaltmak için kullanılan bir tekniktir.',
      correct: true,
      explanation: 'Normalizasyon, veri tekrarını minimize etmek ve veri bütünlüğünü sağlamak için kullanılır.',
      difficulty: 'Kolay',
      points: 2
    },
    {
      id: 3,
      type: 'fillin',
      question: 'HTML\'de bir tablonun başlık satırını tanımlamak için _______ etiketi kullanılır.',
      correct: ['thead', '<thead>', 'THEAD'],
      explanation: '<thead> etiketi, tablonun başlık bölümünü gruplandırmak için kullanılır.',
      difficulty: 'Kolay',
      points: 3
    },
    {
      id: 4,
      type: 'multiple',
      question: 'Makine öğrenmesinde "overfitting" sorunu ne anlama gelir?',
      options: [
        'Model eğitim verisine çok iyi uyar ama test verisinde kötü performans gösterir',
        'Model hiçbir veriye uyum sağlayamaz',
        'Eğitim süresi çok uzun sürer',
        'Model çok basit kalır'
      ],
      correct: 0,
      explanation: 'Overfitting, modelin eğitim verisini ezberlemesi ve yeni verilerde genelleme yapamaması durumudur.',
      difficulty: 'İleri',
      points: 5
    },
    {
      id: 5,
      type: 'truefalse',
      question: 'HTTPS protokolü, HTTP protokolünün güvenli versiyonudur ve SSL/TLS şifreleme kullanır.',
      correct: true,
      explanation: 'HTTPS, HTTP üzerine SSL/TLS şifreleme katmanı ekleyerek güvenli iletişim sağlar.',
      difficulty: 'Orta',
      points: 3
    }
  ];

  // Timer effect
  useEffect(() => {
    let interval = null;
    if (examStarted && !examFinished && !isPaused && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0 && examStarted) {
      setExamFinished(true);
      setShowResults(true);
    }
    return () => clearInterval(interval);
  }, [examStarted, examFinished, isPaused, timeLeft]);

  const startExam = () => {
    const examType = examTypes.find(type => type.name === selectedExamType);
    setTimeLeft(examType.duration * 60);
    setExamStarted(true);
    setCurrentQuestion(0);
    setAnswers({});
  };

  const handleAnswer = (questionId, answer) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const nextQuestion = () => {
    if (currentQuestion < sampleQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const finishExam = () => {
    setExamFinished(true);
    setShowResults(true);
  };

  const calculateResults = () => {
    let correct = 0;
    let totalPoints = 0;
    let earnedPoints = 0;

    sampleQuestions.forEach(question => {
      totalPoints += question.points;
      const userAnswer = answers[question.id];
      
      if (question.type === 'multiple' && userAnswer === question.correct) {
        correct++;
        earnedPoints += question.points;
      } else if (question.type === 'truefalse' && userAnswer === question.correct) {
        correct++;
        earnedPoints += question.points;
      } else if (question.type === 'fillin' && question.correct.includes(userAnswer?.toLowerCase())) {
        correct++;
        earnedPoints += question.points;
      }
    });

    return {
      correct,
      total: sampleQuestions.length,
      percentage: Math.round((correct / sampleQuestions.length) * 100),
      earnedPoints,
      totalPoints
    };
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getPerformanceMessage = (percentage) => {
    if (percentage >= 90) return { text: 'Mükemmel! 🏆', color: 'text-yellow-500' };
    if (percentage >= 80) return { text: 'Harika! 🌟', color: 'text-green-500' };
    if (percentage >= 70) return { text: 'İyi! 👏', color: 'text-blue-500' };
    if (percentage >= 60) return { text: 'Geçer 📚', color: 'text-orange-500' };
    return { text: 'Çalışmaya devam! 💪', color: 'text-red-500' };
  };

  const currentQ = sampleQuestions[currentQuestion];
  const results = showResults ? calculateResults() : null;
  const performanceMessage = results ? getPerformanceMessage(results.percentage) : null;

  if (showResults) {
    return (
      <div className="min-h-screen relative overflow-hidden">
        {/* Background Elements */}
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-10 left-10 w-72 h-72 bg-green-400/10 rounded-full animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-400/10 rounded-full animate-pulse delay-700"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center mb-8 animate-slide-up">
            <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-glow">
              <TrophyIcon className="w-12 h-12 text-white" />
            </div>
            <h1 className="heading-lg mb-4">Sınav Tamamlandı! 🎉</h1>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              {selectedCourse} - {selectedExamType} {selectedExamType === 'Final' && includeVize ? `(${includeVize === 'dahil' ? 'Vize Dahil' : 'Vize Dahil Değil'})` : ''} Sınavı Sonuçları
            </p>
          </div>

          {/* Results Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="stat-card animate-scale-in">
              <div className="text-4xl mb-3">🎯</div>
              <div className="stat-number">{results.correct}/{results.total}</div>
              <div className="stat-label">Doğru Cevap</div>
            </div>
            <div className="stat-card animate-scale-in" style={{ animationDelay: '0.1s' }}>
              <div className="text-4xl mb-3">📊</div>
              <div className="stat-number">%{results.percentage}</div>
              <div className="stat-label">Başarı Oranı</div>
            </div>
            <div className="stat-card animate-scale-in" style={{ animationDelay: '0.2s' }}>
              <div className="text-4xl mb-3">⭐</div>
              <div className="stat-number">{results.earnedPoints}/{results.totalPoints}</div>
              <div className="stat-label">Puan</div>
            </div>
            <div className="stat-card animate-scale-in" style={{ animationDelay: '0.3s' }}>
              <div className="text-4xl mb-3">⏱️</div>
              <div className="stat-number">{formatTime(timeLeft)}</div>
              <div className="stat-label">Kalan Süre</div>
            </div>
          </div>

          {/* Performance Message */}
          <div className="card-modern text-center mb-8 animate-fade-in">
            <h2 className={`text-3xl font-bold mb-4 ${performanceMessage.color}`}>
              {performanceMessage.text}
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              {results.percentage >= 70 
                ? 'Tebrikler! Başarılı bir performans sergiledins.' 
                : 'Endişelenme, pratik yaparak gelişebilirsin.'}
            </p>
            
            {/* Progress Bar */}
            <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-4 mb-6">
              <div 
                className="h-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${results.percentage}%` }}
              ></div>
            </div>
          </div>

          {/* Detailed Results */}
          <div className="card-modern mb-8">
            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-6 flex items-center">
              <ChartBarIcon className="w-6 h-6 mr-3 text-blue-500" />
              Detaylı Analiz
            </h3>
            
            <div className="space-y-4">
              {sampleQuestions.map((question, index) => {
                const userAnswer = answers[question.id];
                const isCorrect = question.type === 'multiple' 
                  ? userAnswer === question.correct
                  : question.type === 'truefalse'
                  ? userAnswer === question.correct
                  : question.correct.includes(userAnswer?.toLowerCase());

                return (
                  <div key={question.id} className="glass-card dark:glass-card-dark rounded-xl p-4">
                    <div className="flex items-start space-x-4">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        isCorrect ? 'bg-green-500' : 'bg-red-500'
                      }`}>
                        {isCorrect ? (
                          <CheckCircleIcon className="w-5 h-5 text-white" />
                        ) : (
                          <XCircleIcon className="w-5 h-5 text-white" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-slate-800 dark:text-slate-200 mb-2">
                          Soru {index + 1}: {question.question}
                        </p>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          {question.explanation}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className={`text-sm font-bold ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                          {isCorrect ? `+${question.points}` : '0'} puan
                        </div>
                        <div className="text-xs text-slate-500">{question.difficulty}</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => {
                setShowResults(false);
                setExamStarted(false);
                setExamFinished(false);
                setCurrentQuestion(0);
                setAnswers({});
                setTimeLeft(0);
                setIncludeVize('');
              }}
              className="btn-modern mobile-friendly"
            >
              <RocketLaunchIcon className="w-5 h-5 mr-2" />
              Yeni Sınav
            </button>
            <button
              onClick={() => window.print()}
              className="btn-ghost mobile-friendly"
            >
              <StarIcon className="w-5 h-5 mr-2" />
              Sonuçları Kaydet
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (examStarted && !examFinished) {
    return (
      <div className="min-h-screen relative overflow-hidden">
        {/* Timer Background Effect */}
        <div className="fixed inset-0 pointer-events-none">
          <div 
            className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-purple-500/5 transition-all duration-1000"
            style={{ 
              opacity: timeLeft < 300 ? 0.3 : 0.1,
              animation: timeLeft < 60 ? 'pulse 1s infinite' : 'none'
            }}
          ></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          
          {/* Exam Header */}
          <div className="card-modern mb-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-xl font-bold text-slate-800 dark:text-slate-200">
                  {selectedCourse} - {selectedExamType} {selectedExamType === 'Final' && includeVize ? `(${includeVize === 'dahil' ? 'Vize Dahil' : 'Vize Dahil Değil'})` : ''}
                </h1>
                <p className="text-slate-600 dark:text-slate-400">
                  Soru {currentQuestion + 1} / {sampleQuestions.length}
                </p>
              </div>
              
              {/* Timer */}
              <div className={`flex items-center space-x-3 ${timeLeft < 300 ? 'animate-pulse' : ''}`}>
                <ClockIcon className={`w-6 h-6 ${timeLeft < 60 ? 'text-red-500' : 'text-blue-500'}`} />
                <span className={`text-2xl font-mono font-bold ${
                  timeLeft < 60 ? 'text-red-500' : timeLeft < 300 ? 'text-orange-500' : 'text-slate-800 dark:text-slate-200'
                }`}>
                  {formatTime(timeLeft)}
                </span>
                <button
                  onClick={() => setIsPaused(!isPaused)}
                  className="mobile-friendly p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all duration-300"
                >
                  {isPaused ? (
                    <PlayIcon className="w-5 h-5 text-green-500" />
                  ) : (
                    <PauseIcon className="w-5 h-5 text-orange-500" />
                  )}
                </button>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mt-4">
              <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                <div 
                  className="h-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all duration-300"
                  style={{ width: `${((currentQuestion + 1) / sampleQuestions.length) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Warning for low time */}
          {timeLeft < 300 && (
            <div className="card-modern mb-6 border-l-4 border-orange-500 animate-slide-up">
              <div className="flex items-center space-x-3">
                <ExclamationTriangleIcon className="w-6 h-6 text-orange-500" />
                <p className="text-orange-700 dark:text-orange-400 font-medium">
                  {timeLeft < 60 ? 'Son 1 dakika!' : 'Son 5 dakika! Hızlanmalısın.'}
                </p>
              </div>
            </div>
          )}

          {/* Question Card */}
          <div className="card-modern card-glow mb-6">
            <div className="flex items-start space-x-4 mb-6">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold bg-gradient-to-br ${
                currentQ.difficulty === 'Kolay' ? 'from-green-400 to-emerald-500' :
                currentQ.difficulty === 'Orta' ? 'from-yellow-400 to-orange-500' :
                'from-red-400 to-pink-500'
              }`}>
                {currentQuestion + 1}
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r ${
                    currentQ.difficulty === 'Kolay' ? 'from-green-400 to-emerald-500' :
                    currentQ.difficulty === 'Orta' ? 'from-yellow-400 to-orange-500' :
                    'from-red-400 to-pink-500'
                  }`}>
                    {currentQ.difficulty}
                  </span>
                  <span className="text-sm text-slate-600 dark:text-slate-400">
                    {currentQ.points} puan
                  </span>
                </div>
                <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-200 leading-relaxed">
                  {currentQ.question}
                </h2>
              </div>
            </div>

            {/* Answer Options */}
            <div className="space-y-3">
              {currentQ.type === 'multiple' && (
                <>
                  {currentQ.options.map((option, index) => (
                    <label
                      key={index}
                      className={`block p-4 rounded-xl border-2 transition-all duration-300 cursor-pointer hover:scale-[1.02] mobile-friendly ${
                        answers[currentQ.id] === index
                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/30'
                          : 'border-slate-200 dark:border-slate-700 hover:border-blue-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name={`question-${currentQ.id}`}
                        value={index}
                        checked={answers[currentQ.id] === index}
                        onChange={() => handleAnswer(currentQ.id, index)}
                        className="sr-only"
                      />
                      <div className="flex items-center space-x-3">
                        <div className={`w-5 h-5 rounded-full border-2 ${
                          answers[currentQ.id] === index
                            ? 'border-blue-500 bg-blue-500'
                            : 'border-slate-300 dark:border-slate-600'
                        }`}>
                          {answers[currentQ.id] === index && (
                            <div className="w-full h-full rounded-full bg-white transform scale-50"></div>
                          )}
                        </div>
                        <span className="text-slate-700 dark:text-slate-300 font-medium">
                          {String.fromCharCode(65 + index)}. {option}
                        </span>
                      </div>
                    </label>
                  ))}
                </>
              )}

              {currentQ.type === 'truefalse' && (
                <div className="grid grid-cols-2 gap-4">
                  {[true, false].map((value) => (
                    <label
                      key={value.toString()}
                      className={`block p-6 rounded-xl border-2 transition-all duration-300 cursor-pointer hover:scale-105 mobile-friendly text-center ${
                        answers[currentQ.id] === value
                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/30'
                          : 'border-slate-200 dark:border-slate-700 hover:border-blue-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name={`question-${currentQ.id}`}
                        value={value.toString()}
                        checked={answers[currentQ.id] === value}
                        onChange={() => handleAnswer(currentQ.id, value)}
                        className="sr-only"
                      />
                      <div className="text-2xl mb-2">
                        {value ? '✅' : '❌'}
                      </div>
                      <div className="font-semibold text-slate-700 dark:text-slate-300">
                        {value ? 'Doğru' : 'Yanlış'}
                      </div>
                    </label>
                  ))}
                </div>
              )}

              {currentQ.type === 'fillin' && (
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Cevabınızı yazın..."
                    value={answers[currentQ.id] || ''}
                    onChange={(e) => handleAnswer(currentQ.id, e.target.value)}
                    className="input-modern text-lg font-semibold"
                    autoFocus
                  />
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    💡 İpucu: Cevabınızı HTML etiketi olarak yazabilirsiniz
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <button
              onClick={prevQuestion}
              disabled={currentQuestion === 0}
              className={`btn-ghost mobile-friendly flex items-center ${
                currentQuestion === 0 ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              <BackwardIcon className="w-5 h-5 mr-2" />
              Önceki
            </button>

            <div className="text-center">
              <div className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                İlerleme: {Object.keys(answers).length} / {sampleQuestions.length} cevaplandı
              </div>
              <div className="flex space-x-1">
                {sampleQuestions.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentQuestion(index)}
                    className={`w-8 h-8 rounded-lg text-sm font-semibold transition-all duration-300 mobile-friendly ${
                      index === currentQuestion
                        ? 'bg-blue-500 text-white scale-110'
                        : answers[sampleQuestions[index].id] !== undefined
                        ? 'bg-green-500 text-white'
                        : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
            </div>

            {currentQuestion === sampleQuestions.length - 1 ? (
              <button
                onClick={finishExam}
                className="btn-modern mobile-friendly"
              >
                <CheckCircleIcon className="w-5 h-5 mr-2" />
                Bitir
              </button>
            ) : (
              <button
                onClick={nextQuestion}
                className="btn-modern mobile-friendly"
              >
                Sonraki
                <ForwardIcon className="w-5 h-5 ml-2" />
              </button>
            )}
          </div>

          {/* Pause Overlay */}
          {isPaused && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
              <div className="card-modern max-w-md text-center">
                <PauseIcon className="w-16 h-16 text-orange-500 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-4">
                  Sınav Duraklatıldı
                </h2>
                <p className="text-slate-600 dark:text-slate-400 mb-6">
                  Devam etmek için butona tıklayın
                </p>
                <button
                  onClick={() => setIsPaused(false)}
                  className="btn-modern mobile-friendly"
                >
                  <PlayIcon className="w-5 h-5 mr-2" />
                  Devam Et
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-blue-400/10 rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-purple-400/10 rounded-full animate-pulse delay-700"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header */}
        <div className="text-center mb-12 animate-slide-up">
          <h1 className="heading-lg mb-4">🎯 Sınav Simülasyonu</h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Gerçek sınav ortamında kendinizi test edin ve hazırlığınızı ölçün
          </p>
        </div>

        {/* Selection Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          
          {/* Course Selection */}
          <div className="card-modern card-hover-float animate-scale-in">
            <div className="flex items-center space-x-3 mb-6">
              <AcademicCapIcon className="w-8 h-8 text-blue-500" />
              <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200">
                Ders Seçimi
              </h2>
            </div>
            <div className="space-y-3">
              {courses.map((course) => (
                <label
                  key={course}
                  className={`block p-4 rounded-xl border-2 transition-all duration-300 cursor-pointer hover:scale-[1.02] mobile-friendly ${
                    selectedCourse === course
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/30'
                      : 'border-slate-200 dark:border-slate-700 hover:border-blue-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="course"
                    value={course}
                    checked={selectedCourse === course}
                    onChange={(e) => setSelectedCourse(e.target.value)}
                    className="sr-only"
                  />
                  <div className="flex items-center space-x-3">
                    <div className={`w-5 h-5 rounded-full border-2 ${
                      selectedCourse === course
                        ? 'border-blue-500 bg-blue-500'
                        : 'border-slate-300 dark:border-slate-600'
                    }`}>
                      {selectedCourse === course && (
                        <div className="w-full h-full rounded-full bg-white transform scale-50"></div>
                      )}
                    </div>
                    <span className="font-medium text-slate-700 dark:text-slate-300">
                      {course}
                    </span>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Exam Type Selection */}
          <div className="card-modern card-hover-float animate-scale-in" style={{ animationDelay: '0.1s' }}>
            <div className="flex items-center space-x-3 mb-6">
              <ClockIcon className="w-8 h-8 text-purple-500" />
              <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200">
                Sınav Türü
              </h2>
            </div>
            <div className="space-y-3">
              {/* Vize */}
              {examTypes.filter(e => e.name === 'Vize').map((examType) => (
                <label
                  key={examType.name}
                  className={`block p-4 rounded-xl border-2 transition-all duration-300 cursor-pointer hover:scale-[1.02] mobile-friendly ${
                    selectedExamType === examType.name
                      ? 'border-purple-500 bg-purple-50 dark:bg-purple-950/30'
                      : 'border-slate-200 dark:border-slate-700 hover:border-purple-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="examType"
                    value={examType.name}
                    checked={selectedExamType === examType.name}
                    onChange={(e) => setSelectedExamType(e.target.value)}
                    className="sr-only"
                  />
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-5 h-5 rounded-full border-2 ${
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
                        {examType.duration} dakika
                      </div>
                      <div className="text-xs text-slate-500">
                        {examType.questionCount} soru
                      </div>
                    </div>
                  </div>
                </label>
              ))}
              
              {/* Final */}
              {examTypes.filter(e => e.name === 'Final').map((examType) => (
                <div key={examType.name}>
                  <label
                    className={`block p-4 rounded-xl border-2 transition-all duration-300 cursor-pointer hover:scale-[1.02] mobile-friendly ${
                      selectedExamType === examType.name
                        ? 'border-purple-500 bg-purple-50 dark:bg-purple-950/30'
                        : 'border-slate-200 dark:border-slate-700 hover:border-purple-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="examType"
                      value={examType.name}
                      checked={selectedExamType === examType.name}
                      onChange={(e) => setSelectedExamType(e.target.value)}
                      className="sr-only"
                    />
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-5 h-5 rounded-full border-2 ${
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
                          {examType.duration} dakika
                        </div>
                        <div className="text-xs text-slate-500">
                          {examType.questionCount} soru
                        </div>
                      </div>
                    </div>
                  </label>
                  
                  {/* Vize Dahil/Değil for Final Exam - Compact */}
                  {selectedExamType === 'Final' && (
                    <div className="mt-3 p-3 bg-gradient-to-r from-orange-50 to-yellow-50 dark:from-orange-900/20 dark:to-yellow-900/20 rounded-lg border border-orange-200 dark:border-orange-700">
                      <div className="flex items-center space-x-2 mb-3">
                        <AcademicCapIcon className="w-5 h-5 text-orange-500" />
                        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Final Sınav Kapsamı:</span>
                      </div>
                      <div className="flex space-x-4">
                        {[
                          { value: 'dahil', label: 'Vize Dahil', emoji: '📚' },
                          { value: 'dahil-degil', label: 'Vize Dahil Değil', emoji: '📖' }
                        ].map((option) => (
                          <label
                            key={option.value}
                            className={`flex items-center space-x-2 p-2 rounded-lg cursor-pointer transition-all duration-200 ${
                              includeVize === option.value
                                ? 'bg-orange-500 text-white shadow-md'
                                : 'bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-orange-100 dark:hover:bg-orange-900/30'
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
              
              {/* Quiz */}
              {examTypes.filter(e => e.name === 'Quiz').map((examType) => (
                <label
                  key={examType.name}
                  className={`block p-4 rounded-xl border-2 transition-all duration-300 cursor-pointer hover:scale-[1.02] mobile-friendly ${
                    selectedExamType === examType.name
                      ? 'border-purple-500 bg-purple-50 dark:bg-purple-950/30'
                      : 'border-slate-200 dark:border-slate-700 hover:border-purple-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="examType"
                    value={examType.name}
                    checked={selectedExamType === examType.name}
                    onChange={(e) => setSelectedExamType(e.target.value)}
                    className="sr-only"
                  />
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-5 h-5 rounded-full border-2 ${
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
                        {examType.duration} dakika
                      </div>
                      <div className="text-xs text-slate-500">
                        {examType.questionCount} soru
                      </div>
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Exam Info */}
        {selectedCourse && selectedExamType && (selectedExamType !== 'Final' || includeVize) && (
          <div className="card-modern mb-8 animate-fade-in">
            <div className="flex items-center space-x-3 mb-6">
              <LightBulbIcon className="w-8 h-8 text-yellow-500" />
              <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200">
                Sınav Bilgileri
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="text-center p-4 glass-card dark:glass-card-dark rounded-xl">
                <ClockIcon className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                <div className="font-semibold text-slate-800 dark:text-slate-200">
                  {examTypes.find(e => e.name === selectedExamType)?.duration} Dakika
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Süre</div>
              </div>
              <div className="text-center p-4 glass-card dark:glass-card-dark rounded-xl">
                <AcademicCapIcon className="w-8 h-8 text-green-500 mx-auto mb-2" />
                <div className="font-semibold text-slate-800 dark:text-slate-200">
                  {examTypes.find(e => e.name === selectedExamType)?.questionCount} Soru
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Toplam</div>
              </div>
              <div className="text-center p-4 glass-card dark:glass-card-dark rounded-xl">
                <FireIcon className="w-8 h-8 text-red-500 mx-auto mb-2" />
                <div className="font-semibold text-slate-800 dark:text-slate-200">
                  Karışık
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Soru Türü</div>
              </div>
            </div>

            <div className="glass-card dark:glass-card-dark rounded-xl p-4 mb-6">
              <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-3 flex items-center">
                <SparklesIcon className="w-5 h-5 mr-2 text-purple-500" />
                Sınav Kuralları
              </h3>
              <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                <li className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                  <span>Süre dolduğunda sınav otomatik olarak bitirilir</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                  <span>Sorular arasında geri dönebilir ve cevaplarınızı değiştirebilirsiniz</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                  <span>Sınav sonunda detaylı analiz ve açıklamalar gösterilir</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                  <span>İhtiyaç halinde sınavı duraklatabilirsiniz</span>
                </li>
              </ul>
            </div>

            <div className="text-center">
              <button
                onClick={startExam}
                className="btn-modern mobile-friendly text-lg px-12 py-4"
              >
                <RocketLaunchIcon className="w-6 h-6 mr-3" />
                Sınavı Başlat
              </button>
            </div>
          </div>
        )}

        {/* Quick Tips */}
        <div className="card-modern text-center">
          <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-6">
            💡 Başarı İpuçları
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center mx-auto">
                <ClockIcon className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-slate-800 dark:text-slate-200">Zaman Yönetimi</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Her soruya eşit zaman ayırın ve zor soruları sonraya bırakın
              </p>
            </div>
            <div className="space-y-3">
              <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center mx-auto">
                <LightBulbIcon className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-slate-800 dark:text-slate-200">Dikkatli Okuma</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Soruları ve şıkları dikkatlice okuyun, anahtar kelimelere odaklanın
              </p>
            </div>
            <div className="space-y-3">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl flex items-center justify-center mx-auto">
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
}

export default SinavSimulasyonu; 