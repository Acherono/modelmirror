import React from 'react';
import { getGradientClass } from '../utils/gradients';

interface CarouselCardProps {
  index: number;
  content: {
    title: string;
    description: string;
    imageUrl?: string;
  };
  isActive: boolean;
  style?: React.CSSProperties;
}

const CarouselCard: React.FC<CarouselCardProps> = ({ 
  index, 
  content, 
  isActive,
  style 
}) => {
  const { title, description, imageUrl } = content;
  const gradientClass = getGradientClass(index);
  
  return (
    <div 
      className={`carousel-card relative flex flex-col overflow-hidden rounded-2xl shadow-xl 
        ${isActive ? 'active' : 'inactive'}`}
      style={{
        width: '100%',
        height: '28rem',
        maxWidth: '26rem',
        transformStyle: 'preserve-3d',
        ...style,
      }}
    >
      <div 
        className={`absolute inset-0 ${gradientClass}`}
        aria-hidden="true"
      />
      
      {imageUrl && (
        <div className="absolute inset-0 z-0 opacity-20">
          <img 
            src={imageUrl} 
            alt=""
            className="w-full h-full object-cover" 
            loading="lazy"
          />
        </div>
      )}
      
      <div className="relative z-10 flex flex-col justify-end h-full p-8 text-white">
        <div className="transform-gpu transition-transform duration-300" 
          style={{ 
            transform: isActive ? 'translateY(0)' : 'translateY(10px)',
            opacity: isActive ? 1 : 0.9,
            transition: 'transform 0.4s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.4s cubic-bezier(0.22, 1, 0.36, 1)'
          }}
        >
          <span className="inline-block px-3 py-1 mb-3 text-xs font-medium tracking-wider uppercase rounded-full bg-white/20 backdrop-blur-sm">
            Featured
          </span>
          <h3 className="mb-2 text-3xl font-bold tracking-tight">{title}</h3>
          <p className="mb-6 text-white/80">{description}</p>
          <button 
            className="inline-flex items-center px-4 py-2 font-medium transition-all rounded-lg bg-white/10 backdrop-blur-sm hover:bg-white/20"
          >
            Learn more
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CarouselCard;
