import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Moon, Sun, Menu, X, Award } from 'lucide-react';

const Header = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const navItems = [
    { path: '/', name: 'Anasayfa' },
    { path: '/ders-notlari', name: 'Ders Notları' },
    { path: '/sinav-simulasyonu', name: 'Sınav Simülasyonu' },
    { path: '/not-alani', name: 'Not Alanı' },
    { path: '/mezun-tavsiyeleri', name: 'Mezun Tavsiyeleri' },
    { path: '/ybs-staj', name: 'YBS Staj' },
  ];

  return (
    <header className="fixed top-0 w-full z-50 header-premium">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-18">
          {/* Premium Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="icon-premium group-hover:scale-110 transition-transform duration-300">
              <Award className="h-7 w-7 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold gradient-premium tracking-tight">YBS-Buddy</span>
              <span className="text-xs text-secondary-premium font-medium tracking-wider uppercase">Professional Edition</span>
            </div>
          </Link>

          {/* Premium Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`nav-item-premium ${
                  location.pathname === item.path
                    ? 'nav-item-active'
                    : 'nav-item-inactive'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Controls */}
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="icon-premium hover:scale-110 transition-all duration-300"
            >
              {darkMode ? (
                <Sun className="h-5 w-5 text-amber-500" />
              ) : (
                <Moon className="h-5 w-5 text-slate-600" />
              )}
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden icon-premium hover:scale-110 transition-all duration-300"
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5 text-secondary-premium" />
              ) : (
                <Menu className="h-5 w-5 text-secondary-premium" />
              )}
            </button>
          </div>
        </div>

        {/* Premium Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden absolute top-18 left-0 right-0 card-premium mx-4 mt-2 border-0">
            <div className="px-4 py-6 space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block nav-item-premium ${
                    location.pathname === item.path
                      ? 'nav-item-active'
                      : 'nav-item-inactive'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header; 