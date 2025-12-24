
import React from 'react';
import { Flame } from 'lucide-react';

interface PromoBannerProps {
  title: React.ReactNode;
  promoName: string;
  watermark: string;
  subtitle: string;
  onClick: () => void;
}

const PromoBanner: React.FC<PromoBannerProps> = ({ 
  title, 
  promoName, 
  watermark, 
  subtitle, 
  onClick 
}) => {
  return (
    <button 
      onClick={onClick}
      className="relative w-full h-52 rounded-[3.5rem] overflow-hidden group transition-all transform active:scale-[0.98] special-glow border-2 border-orange-500/50 shadow-2xl bg-black"
    >
      {/* Background Core Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-600/90 via-orange-500/80 to-red-800/90 mix-blend-screen opacity-90" />
      
      {/* Scanning Effect */}
      <div className="scanline" />
      
      {/* Technical Grid Overlay */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.1"/>
            </pattern>
            <radialGradient id="button-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(251, 191, 36, 0.4)" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
          </defs>
          <rect width="100" height="100" fill="url(#grid)" />
          <rect width="100" height="100" fill="url(#button-glow)" />
        </svg>
      </div>

      {/* Reusable Large Watermark */}
      <div className="absolute inset-0 flex items-center justify-center font-black text-white text-[26rem] -rotate-[15deg] translate-x-28 translate-y-4 opacity-20 pointer-events-none select-none blur-[0.5px]">
        {watermark}
      </div>
      
      {/* Dynamic Visual Accents (Flames) - Relocated to avoid text overlap */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-400/20 blur-[80px] rounded-full animate-pulse" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-red-700/20 blur-[100px] rounded-full animate-pulse delay-500" />
        
        {/* Right side clusters */}
        <Flame className="absolute top-3 right-6 w-10 h-10 text-yellow-300 drop-shadow-[0_0_10px_rgba(253,224,71,0.8)] animate-pulse opacity-100" />
        <Flame className="absolute top-2 right-12 w-6 h-6 text-orange-400 drop-shadow-[0_0_8px_rgba(251,146,60,0.8)] animate-bounce opacity-100 delay-300" />
        <Flame className="absolute bottom-4 right-4 w-12 h-12 text-orange-200 drop-shadow-[0_0_12px_rgba(255,255,255,0.8)] animate-bounce opacity-100" />
        <Flame className="absolute bottom-16 right-2 w-7 h-7 text-red-500 drop-shadow-[0_0_10px_rgba(239,68,68,0.8)] animate-pulse delay-300 opacity-100" />
        
        {/* Top edge accents */}
        <Flame className="absolute top-2 right-1/3 w-8 h-8 text-yellow-500 drop-shadow-[0_0_10px_rgba(234,179,8,0.8)] animate-pulse delay-700 opacity-100" />
        <Flame className="absolute top-2 left-2 w-6 h-6 text-red-300 drop-shadow-[0_0_8px_rgba(252,165,165,0.8)] animate-pulse delay-500 opacity-90" />
        
        {/* Bottom edge accents - Shifted away from text */}
        <Flame className="absolute bottom-2 right-1/2 w-9 h-9 text-orange-600 drop-shadow-[0_0_12px_rgba(234,88,12,0.8)] animate-bounce delay-150 opacity-100" />
        <Flame className="absolute bottom-2 left-2 w-9 h-9 text-yellow-200 drop-shadow-[0_0_15px_rgba(254,240,138,0.8)] animate-bounce delay-1000 opacity-100" />

        <svg className="absolute inset-0 w-full h-full opacity-60" viewBox="0 0 400 300">
          <g className="animate-pulse">
            <circle cx="370" cy="50" r="2" fill="white" className="animate-ping" />
            <rect x="350" y="250" width="30" height="2" fill="white" opacity="0.2" rx="1" />
            <circle cx="200" cy="270" r="40" fill="none" stroke="white" strokeWidth="0.1" strokeDasharray="4,8" />
          </g>
        </svg>
      </div>

      {/* Main Content Area */}
      <div className="relative z-20 px-10 flex flex-col justify-center h-full text-left">
         <h2 className="text-3xl font-black text-white italic leading-none uppercase tracking-tighter drop-shadow-2xl mb-3">
           {title}
         </h2>
         <div className="flex flex-col gap-0.5">
           <span className="text-3xl font-black text-white uppercase tracking-wider drop-shadow-2xl leading-none" style={{ fontFamily: 'Staatliches, sans-serif' }}>
             {promoName}
           </span>
           <span className="text-[11px] font-black text-white/80 uppercase tracking-[0.3em] italic animate-pulse opacity-90">
             {subtitle}
           </span>
         </div>
      </div>
    </button>
  );
};

export default PromoBanner;
