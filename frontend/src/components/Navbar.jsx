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

// Logo neon animation styles
const logoNeonStyles = `
  @keyframes neon-rotate {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  @keyframes mode-transition-glow {
    0% { 
      box-shadow: 0 0 5px #3ec3d3, 0 0 10px #3ec3d3, 0 0 15px #3ec3d3;
    }
    50% { 
      box-shadow: 0 0 10px #3ec3d3, 0 0 20px #3ec3d3, 0 0 30px #3ec3d3;
    }
    100% { 
      box-shadow: 0 0 5px #3ec3d3, 0 0 10px #3ec3d3, 0 0 15px #3ec3d3;
    }
  }



  .logo-neon-container {
    transition: all 0.5s ease-in-out;
  }

  .logo-neon-container.theme-transitioning {
    animation: mode-transition-glow 0.8s ease-in-out;
  }

  .logo-neon-container::before {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    background: conic-gradient(
      from 0deg,
      transparent 75%,
      #3ec3d3 82%,
      #3ec3d3 88%,
      transparent 95%
    );
    border-radius: 50%;
    mask: radial-gradient(circle, transparent 80%, black 83%, black 100%);
    -webkit-mask: radial-gradient(circle, transparent 80%, black 83%, black 100%);
    animation: neon-rotate 4s linear infinite;
    animation-delay: 2s;
    z-index: 10;
    pointer-events: none;
    transition: all 0.3s ease;
  }

  .logo-neon-container::after {
    content: '';
    position: absolute;
    top: -1px;
    left: -1px;
    right: -1px;
    bottom: -1px;
    background: conic-gradient(
      from 180deg,
      transparent 80%,
      rgba(62, 195, 211, 0.6) 85%,
      rgba(62, 195, 211, 0.9) 90%,
      transparent 95%
    );
    border-radius: 50%;
    mask: radial-gradient(circle, transparent 82%, black 85%, black 100%);
    -webkit-mask: radial-gradient(circle, transparent 82%, black 85%, black 100%);
    animation: neon-rotate 4s linear infinite reverse;
    animation-delay: 1s;
    z-index: 10;
    pointer-events: none;
    transition: all 0.3s ease;
  }

  .logo-neon-container.theme-transitioning::before {
    mask: radial-gradient(circle, transparent 75%, black 78%, black 100%);
    -webkit-mask: radial-gradient(circle, transparent 75%, black 78%, black 100%);
    box-shadow: 0 0 15px #3ec3d3;
  }

  .logo-neon-container.theme-transitioning::after {
    mask: radial-gradient(circle, transparent 77%, black 80%, black 100%);
    -webkit-mask: radial-gradient(circle, transparent 77%, black 80%, black 100%);
    box-shadow: 0 0 10px rgba(62, 195, 211, 0.7);
  }

  .logo-neon-container img {
    transition: all 0.5s ease-in-out;
  }
`;

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
    
    // Theme geçiş efekti için logo container'ına class ekle
    const logoContainer = document.querySelector('.logo-neon-container');
    if (logoContainer) {
      logoContainer.classList.add('theme-transitioning');
      setTimeout(() => {
        logoContainer.classList.remove('theme-transitioning');
      }, 800); // Animasyon süresi ile eşleş
    }
    
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
      {/* Logo Neon Animation Styles */}
      <style dangerouslySetInnerHTML={{ __html: logoNeonStyles }} />
      
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
                <div className="relative w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-white/90 dark:bg-[#110f2c]/90 backdrop-blur-sm border border-white/50 dark:border-[#110f2c]/70 shadow-lg shadow-blue-500/20 dark:shadow-purple-400/20 hover:shadow-xl hover:shadow-blue-500/30 dark:hover:shadow-purple-400/30 transition-all duration-300 flex items-center justify-center logo-neon-container">
                  {/* Dark Mode Logo */}
                  <img 
                    src="/ybs-buddy-icon-dm.png" 
                    alt="YBS Buddy Logo" 
                    className={`w-8 h-8 lg:w-9 lg:h-9 object-contain group-hover:scale-110 transition-all duration-300 ${isDark ? 'block' : 'hidden'}`}
                    style={{ transform: 'translateX(1px)' }}
                  />
                  {/* Light Mode Logo */}
                  <img 
                    src="/ybs-buddy-icon-lm.png" 
                    alt="YBS Buddy Logo" 
                    className={`w-8 h-8 lg:w-9 lg:h-9 object-contain group-hover:scale-110 transition-all duration-300 ${!isDark ? 'block' : 'hidden'}`}
                    style={{ transform: 'translateX(1px)' }}
                  />
                  {/* Loading Spinner - Always Available */}
                  <img 
                    src="/ybs-buddy-loading.gif" 
                    alt="Loading..." 
                    className="absolute w-4 h-4 lg:w-5 lg:h-5 opacity-0 pointer-events-none transition-opacity duration-300"
                    id="navbar-loading-spinner"
                  />
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