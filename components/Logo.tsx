
import React from 'react';

interface LogoProps {
  className?: string;
  showText?: boolean;
  size?: number;
}

const Logo: React.FC<LogoProps> = ({ className = "", showText = true, size = 120 }) => {
  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <div 
        className="relative flex items-center justify-center rounded-full bg-[#1a1a1a] shadow-[inset_0_2px_4px_rgba(255,255,255,0.1),0_10px_20px_rgba(0,0,0,0.5)]"
        style={{ width: size, height: size }}
      >
        <svg 
          viewBox="0 0 100 100" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="w-3/5 h-3/5 drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)]"
        >
          <defs>
            <linearGradient id="metal-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4a4a4a" />
              <stop offset="50%" stopColor="#2a2a2a" />
              <stop offset="100%" stopColor="#0f0f0f" />
            </linearGradient>
            <filter id="bevel">
              <feGaussianBlur in="SourceAlpha" stdDeviation="1" result="blur" />
              <feSpecularLighting in="blur" surfaceScale="5" specularConstant="0.8" specularExponent="20" lightingColor="#ffffff" result="specOut">
                <fePointLight x="-50" y="-100" z="200" />
              </feSpecularLighting>
              <feComposite in="specOut" in2="SourceAlpha" operator="in" result="specOut" />
              <feComposite in="SourceGraphic" in2="specOut" operator="arithmetic" k1="0" k2="1" k3="1" k4="0" />
            </filter>
          </defs>
          
          {/* Stylized Winged V */}
          <path 
            d="M30 30 C 20 40, 20 50, 35 55 C 25 60, 25 70, 45 65 L 55 85 L 85 25 C 80 40, 70 75, 55 75 L 45 55 C 40 45, 45 35, 30 30 Z" 
            fill="url(#metal-grad)"
            filter="url(#bevel)"
          />
          {/* Wings detail */}
          <path 
            d="M25 35 Q 15 45 28 50 M22 45 Q 12 55 25 60" 
            stroke="#111" 
            strokeWidth="1.5" 
            strokeLinecap="round" 
          />
        </svg>
      </div>
      {showText && (
        <h1 className="mt-4 text-sm font-bold tracking-[0.3em] text-[#888] uppercase drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
          VIRTUALVISION
        </h1>
      )}
    </div>
  );
};

export default Logo;
