import React from 'react';

const InlineLoadingSpinner = ({ size = 'sm', text = 'Yükleniyor...', className = '' }) => {
  const sizeClasses = {
    xs: 'w-8 h-8',
    sm: 'w-10 h-10',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  return (
    <div className={`flex items-center justify-center space-x-2 ${className}`}>
      <div className="relative">
        <div className={`${sizeClasses[size]} relative overflow-hidden`}>
          <img 
            src="/ybs-buddy-loading.gif" 
            alt="YBS Buddy Loading" 
            className="w-full h-full object-cover rounded-full gif-loading loading-transition"
            style={{
              clipPath: 'circle(35% at 50% 50%)',
              filter: 'contrast(1.1) brightness(1.1)'
            }}
            onError={(e) => {
              // Fallback to simple spinner if GIF fails to load
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'block';
            }}
          />
          {/* Fallback simple spinner */}
          <div className="w-full h-full border-2 border-blue-500 border-t-transparent rounded-full spin-smooth" style={{ display: 'none' }}></div>
        </div>
      </div>
      {text && (
        <span className="text-sm text-slate-600 dark:text-slate-400 animate-pulse">
          {text}
        </span>
      )}
    </div>
  );
};

export default InlineLoadingSpinner; 