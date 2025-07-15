import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import LoadingSpinner from './LoadingSpinner';

const PageTransition = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Show loading when location changes
    setIsLoading(true);
    
    // Simulate page load time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [location]);

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-white dark:bg-slate-900 z-50 flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner size="lg" className="mb-6" />
          <p className="text-slate-600 dark:text-slate-400 text-lg font-medium">
            Yükleniyor...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="transition-opacity duration-300 opacity-100">
      {children}
    </div>
  );
};

export default PageTransition; 