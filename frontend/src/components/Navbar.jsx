import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Bars3Icon, 
  XMarkIcon,
  SunIcon,
  MoonIcon,
  BookOpenIcon,
  AcademicCapIcon,
  PencilSquareIcon,
  HomeIcon,
  BriefcaseIcon,
  ChevronRightIcon,
  ClipboardDocumentListIcon
} from '@heroicons/react/24/outline';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Dark mode toggle
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDark(false);
      document.documentElement.classList.remove('dark');
    }
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

  const navigation = [
    { name: 'Ana Sayfa', href: '/', icon: HomeIcon, current: location.pathname === '/' },
    { name: 'Müfredat', href: '/mufredat', icon: ClipboardDocumentListIcon, current: location.pathname === '/mufredat' },
    { name: 'Ders Notları', href: '/ders-notlari', icon: BookOpenIcon, current: location.pathname === '/ders-notlari' },
    { name: 'Sınav Simülasyonu', href: '/sinav-simulasyonu', icon: AcademicCapIcon, current: location.pathname === '/sinav-simulasyonu' },
    { name: 'Not Alanı', href: '/not-alani', icon: PencilSquareIcon, current: location.pathname === '/not-alani' }
  ];

  // Body scroll lock for mobile menu
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <>
      {/* Mobile Menu Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
      
      <nav className={`navbar-professional ${isDark ? 'dark' : ''}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 lg:h-16">
            
            {/* Sol: Logo + Brand Name */}
            <div className="flex items-center space-x-3">
              <Link 
                to="/" 
                className="flex items-center group z-50"
                style={{ pointerEvents: 'auto', position: 'relative', zIndex: 50 }}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  console.log("Navigating to home");
                  navigate("/");
                }}
              >
                <div className="relative w-8 h-8 lg:w-10 lg:h-10 rounded-full overflow-hidden bg-transparent">
                  <img 
                    src="/u6718478283_A_minimal_professional_single-line_vector_icon_lo_f44348c4-9f8a-4c77-82f1-260b518d4b3b_0.png" 
                    alt="YBS Buddy Logo" 
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-all duration-300 drop-shadow-lg dark:brightness-100 brightness-0 dark:invert-0 invert scale-150"
                    style={{
                      filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1))'
                    }}
                    onError={(e) => {
                      // Fallback to briefcase icon if image fails to load
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'block';
                    }}
                  />
                  <BriefcaseIcon className="w-6 h-6 lg:w-8 lg:h-8 text-slate-600 dark:text-slate-400 group-hover:scale-105 transition-transform duration-300 drop-shadow-lg absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" style={{ display: 'none' }} />
                </div>
              </Link>
              <h1 className="text-lg sm:text-xl lg:text-2xl font-black whitespace-nowrap gradient-premium">YBS BUDDY</h1>
            </div>

            {/* Orta: Navigation - Tam Ortada */}
            <div className="hidden lg:flex items-center justify-center flex-1">
              {/* XL Desktop Navigation - Full Text */}
              <div className="hidden xl:flex items-center">
                <div className="flex items-center bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-xl px-1.5 py-1.5 shadow-lg border border-white/20 dark:border-slate-700/50">
                  {navigation.map((item, index) => (
                    <React.Fragment key={item.name}>
                      <Link
                        to={item.href}
                        className={`navbar-item-spaced ${item.current ? 'active' : ''}`}
                        style={{ pointerEvents: 'auto', position: 'relative', zIndex: 10 }}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          console.log(`XL Desktop navigating to: ${item.href}`);
                          navigate(item.href);
                        }}
                      >
                        <item.icon className="w-4 h-4 mr-2" />
                        <span className="text-sm font-medium whitespace-nowrap">{item.name}</span>
                      </Link>
                      {index < navigation.length - 1 && (
                        <div className="navbar-separator">
                          <ChevronRightIcon className="w-3 h-3 text-slate-300 dark:text-slate-600" />
                        </div>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>

              {/* Large Desktop Navigation - Short Text */}
              <div className="flex xl:hidden items-center">
                <div className="flex items-center bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-xl px-1.5 py-1.5 shadow-lg border border-white/20 dark:border-slate-700/50">
                  {navigation.map((item, index) => (
                    <React.Fragment key={item.name}>
                      <Link
                        to={item.href}
                        className={`navbar-item-medium ${item.current ? 'active' : ''}`}
                        title={item.name}
                        style={{ pointerEvents: 'auto', position: 'relative', zIndex: 10 }}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          console.log(`Large Desktop navigating to: ${item.href}`);
                          navigate(item.href);
                        }}
                      >
                        <item.icon className="w-4 h-4" />
                        <span className="text-xs font-medium ml-1.5">{item.name.split(' ')[0]}</span>
                      </Link>
                      {index < navigation.length - 1 && (
                        <div className="navbar-separator-small">
                          <div className="w-0.5 h-0.5 bg-slate-300 dark:bg-slate-600 rounded-full"></div>
                        </div>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>

            {/* Sağ: Controls */}
            <div className="flex items-center space-x-2 z-50">
              {/* Dark Mode Toggle */}
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-lg bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl hover:bg-white dark:hover:bg-slate-700 transition-all duration-300 group shadow-lg border border-white/20 dark:border-slate-700/50"
                title={isDark ? 'Light Mode' : 'Dark Mode'}
              >
                {isDark ? (
                  <SunIcon className="w-4 h-4 text-yellow-500 group-hover:rotate-180 transition-transform duration-500" />
                ) : (
                  <MoonIcon className="w-4 h-4 text-slate-600 group-hover:rotate-12 transition-transform duration-300" />
                )}
              </button>

              {/* Mobile menu button */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden p-2 rounded-lg bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl hover:bg-white dark:hover:bg-slate-700 transition-all duration-300 shadow-lg border border-white/20 dark:border-slate-700/50"
              >
                {isOpen ? (
                  <XMarkIcon className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                ) : (
                  <Bars3Icon className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div className={`lg:hidden overflow-hidden transition-all duration-500 ease-in-out ${
          isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="px-4 sm:px-6 lg:px-8 pb-6">
            <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-2xl p-6 shadow-2xl border border-white/20 dark:border-slate-700/50 mt-4">

              {/* Mobile Navigation Items */}
              <div className="space-y-2">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      console.log(`Mobile navigating to: ${item.href}`);
                      navigate(item.href);
                      setIsOpen(false);
                    }}
                    className={`mobile-nav-item ${item.current ? 'active' : ''}`}
                    style={{ pointerEvents: 'auto', position: 'relative', zIndex: 10 }}
                  >
                    <item.icon className="w-6 h-6 mr-4" />
                    <span className="font-medium">{item.name}</span>
                    {item.current && (
                      <div className="ml-auto w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                    )}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar; 