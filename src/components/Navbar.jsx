import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Bars3Icon, 
  XMarkIcon,
  SunIcon,
  MoonIcon,
  ComputerDesktopIcon,
  BookOpenIcon,
  AcademicCapIcon,
  PencilSquareIcon,
  UserGroupIcon,
  BriefcaseIcon,
  HomeIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [currentTheme, setCurrentTheme] = useState('blue');
  const location = useLocation();

  const themes = {
    blue: { name: 'Mavi', primary: '#3b82f6', secondary: '#8b5cf6' },
    purple: { name: 'Mor', primary: '#8b5cf6', secondary: '#ec4899' },
    green: { name: 'Yeşil', primary: '#10b981', secondary: '#3b82f6' }
  };

  // Dark mode toggle
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const savedColorTheme = localStorage.getItem('colorTheme') || 'blue';
    
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDark(false);
      document.documentElement.classList.remove('dark');
    }
    
    setCurrentTheme(savedColorTheme);
    document.body.className = `theme-${savedColorTheme} ${document.body.className.replace(/theme-\w+/g, '')}`;
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !isDark;
    setIsDark(newDarkMode);
    
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const changeColorTheme = (theme) => {
    setCurrentTheme(theme);
    localStorage.setItem('colorTheme', theme);
    document.body.className = `theme-${theme} ${document.body.className.replace(/theme-\w+/g, '')}`;
  };

  const navigation = [
    { name: 'Ana Sayfa', href: '/', icon: HomeIcon, current: location.pathname === '/' },
    { name: 'Ders Notları', href: '/ders-notlari', icon: BookOpenIcon, current: location.pathname === '/ders-notlari' },
    { name: 'Sınav Simülasyonu', href: '/sinav-simulasyonu', icon: AcademicCapIcon, current: location.pathname === '/sinav-simulasyonu' },
    { name: 'Not Alma', href: '/not-alma', icon: PencilSquareIcon, current: location.pathname === '/not-alma' },
    { name: 'Mezun Tavsiyeleri', href: '/mezun-tavsiyeleri', icon: UserGroupIcon, current: location.pathname === '/mezun-tavsiyeleri' },
    { name: 'Staj İlanları', href: '/staj-ilanlari', icon: BriefcaseIcon, current: location.pathname === '/staj-ilanlari' }
  ];

  const currentPage = navigation.find(item => item.current);

  return (
    <>
      <nav className="nav-modern rounded-2xl mx-4 mt-4 px-8 py-5">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center">
            
            {/* Logo & Brand */}
            <Link to="/" className="flex items-center space-x-4 group">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 via-purple-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                  <SparklesIcon className="w-6 h-6 text-white" />
                </div>
                <div className="absolute -inset-1 bg-gradient-to-br from-blue-500 via-purple-500 to-cyan-500 rounded-xl opacity-0 group-hover:opacity-20 blur transition-all duration-300"></div>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-black text-gradient">YBS Buddy</h1>
                <p className="text-xs text-slate-500 dark:text-slate-400 -mt-1">Akıllı Öğrenme</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`nav-item mobile-friendly ${item.current ? 'active' : ''}`}
                >
                  <item.icon className="w-4 h-4 mr-2" />
                  <span className="text-sm font-medium">{item.name}</span>
                </Link>
              ))}
            </div>

            {/* Theme & Settings */}
            <div className="flex items-center space-x-4">
              
              {/* Color Theme Selector */}
              <div className="hidden md:flex items-center space-x-2 glass-card dark:glass-card-dark rounded-xl px-3 py-2">
                {Object.entries(themes).map(([key, theme]) => (
                  <button
                    key={key}
                    onClick={() => changeColorTheme(key)}
                    className={`w-6 h-6 rounded-full transition-all duration-300 hover:scale-110 ${
                      currentTheme === key ? 'ring-2 ring-white/60 scale-110' : ''
                    }`}
                    style={{ background: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})` }}
                    title={theme.name}
                  />
                ))}
              </div>

              {/* Dark Mode Toggle */}
              <button
                onClick={toggleDarkMode}
                className="mobile-friendly p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all duration-300 group"
                title={isDark ? 'Light Mode' : 'Dark Mode'}
              >
                {isDark ? (
                  <SunIcon className="w-5 h-5 text-yellow-500 group-hover:rotate-180 transition-transform duration-300" />
                ) : (
                  <MoonIcon className="w-5 h-5 text-slate-600 group-hover:rotate-12 transition-transform duration-300" />
                )}
              </button>

              {/* Mobile menu button */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden mobile-friendly p-2 rounded-xl glass-card dark:glass-card-dark hover:scale-105 transition-all duration-300"
              >
                {isOpen ? (
                  <XMarkIcon className="w-6 h-6 text-slate-600 dark:text-slate-400" />
                ) : (
                  <Bars3Icon className="w-6 h-6 text-slate-600 dark:text-slate-400" />
                )}
              </button>
            </div>
          </div>

          {/* Current Page Indicator */}
          {currentPage && (
            <div className="mt-4 flex items-center space-x-2 text-sm text-slate-600 dark:text-slate-400">
              <currentPage.icon className="w-4 h-4" />
              <span>→</span>
              <span className="font-medium text-slate-800 dark:text-slate-200">{currentPage.name}</span>
            </div>
          )}
        </div>

        {/* Mobile Navigation Menu */}
        <div className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-96 opacity-100 mt-6' : 'max-h-0 opacity-0'
        }`}>
          <div className="glass-card dark:glass-card-dark rounded-2xl p-4 space-y-2">
            
            {/* Mobile Color Theme Selector */}
            <div className="flex items-center justify-center space-x-3 mb-4 pb-4 border-b border-slate-200/50 dark:border-slate-700/50">
              <span className="text-sm text-slate-600 dark:text-slate-400">Tema:</span>
              {Object.entries(themes).map(([key, theme]) => (
                <button
                  key={key}
                  onClick={() => changeColorTheme(key)}
                  className={`w-8 h-8 rounded-full transition-all duration-300 hover:scale-110 ${
                    currentTheme === key ? 'ring-2 ring-white/60 scale-110' : ''
                  }`}
                  style={{ background: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})` }}
                  title={theme.name}
                />
              ))}
            </div>

            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setIsOpen(false)}
                className={`nav-item w-full justify-start mobile-friendly ${item.current ? 'active' : ''}`}
              >
                <item.icon className="w-5 h-5 mr-3" />
                <span className="font-medium">{item.name}</span>
                {item.current && (
                  <div className="ml-auto w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full"></div>
                )}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* Mobile Navigation Overlay */}
      {isOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}

export default Navbar; 