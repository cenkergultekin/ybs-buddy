import React from 'react';

const LoadingSpinner = ({ size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-32 h-32',
    xl: 'w-40 h-40'
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className="relative">
        {/* GIF Logo container with cropping */}
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
              // Fallback to gradient icon if GIF fails to load
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }}
          />
          {/* Fallback gradient icon */}
          <div className="w-full h-full bg-gradient-to-br from-blue-500 via-purple-500 to-cyan-500 rounded-full flex items-center justify-center shadow-lg" style={{ display: 'none' }}>
            <div className="w-1/2 h-1/2 bg-white rounded-lg opacity-90"></div>
          </div>
        </div>
        
        {/* Subtle glow effect */}
        <div className={`absolute inset-0 ${sizeClasses[size]} rounded-full bg-gradient-to-br from-blue-500/10 to-purple-500/10 blur-sm pulse-glow`}></div>
      </div>
    </div>
  );
};

export default LoadingSpinner; 