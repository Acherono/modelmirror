import React, { useState, useRef, useEffect, useCallback } from 'react';
import CarouselCard from './CarouselCard';
import { useIsMobile } from '../hooks/use-mobile';

export interface CarouselContent {
  title: string;
  description: string;
  imageUrl?: string;
}

export interface HeroCarouselProps {
  items: CarouselContent[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
  className?: string;
}

const HeroCarousel: React.FC<HeroCarouselProps> = ({
  items,
  autoPlay = true,
  autoPlayInterval = 5000,
  className = '',
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const [animationInProgress, setAnimationInProgress] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const autoPlayTimerRef = useRef<NodeJS.Timeout | null>(null);
  const isMobile = useIsMobile();

  const cardWidth = isMobile ? window.innerWidth * 0.85 : 416; // 26rem = 416px
  const visibleItems = isMobile ? 1 : 3;
  const totalItems = items.length;

  // Calculate the initial offset to center cards
  const getCardOffset = useCallback(() => {
    if (!carouselRef.current) return 0;
    const containerWidth = carouselRef.current.offsetWidth;
    const cardsPerView = visibleItems;
    const cardGap = 16; // 1rem gap
    return (containerWidth - (cardWidth * cardsPerView + cardGap * (cardsPerView - 1))) / 2;
  }, [cardWidth, visibleItems]);

  // Determine translateX based on active index and offset
  const getTranslateX = useCallback(() => {
    const offset = getCardOffset();
    const cardGap = 16;
    return -(activeIndex * (cardWidth + cardGap)) + offset;
  }, [activeIndex, cardWidth, getCardOffset]);

  // Initialize carousel position and add keyboard navigation
  useEffect(() => {
    setTranslateX(getTranslateX());

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        goToPrevious();
      } else if (e.key === 'ArrowRight') {
        goToNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current);
    };
  }, []);

  // Update position when activeIndex changes
  useEffect(() => {
    setTranslateX(getTranslateX());
  }, [activeIndex, getTranslateX]);

  // Auto play management
  useEffect(() => {
    if (autoPlay && !isDragging) {
      startAutoPlay();
    } else {
      stopAutoPlay();
    }
    return () => stopAutoPlay();
  }, [autoPlay, isDragging, activeIndex]);

  const startAutoPlay = () => {
    if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current);
    autoPlayTimerRef.current = setInterval(() => {
      if (!isDragging && !animationInProgress) {
        goToNext();
      }
    }, autoPlayInterval);
  };

  const stopAutoPlay = () => {
    if (autoPlayTimerRef.current) {
      clearInterval(autoPlayTimerRef.current);
      autoPlayTimerRef.current = null;
    }
  };

  // Navigation handling with wrap-around
  const goToIndex = (index: number) => {
    if (animationInProgress) return;
    setAnimationInProgress(true);
    let targetIndex = index;
    if (index < 0) targetIndex = totalItems - 1;
    else if (index >= totalItems) targetIndex = 0;
    setActiveIndex(targetIndex);
    setTimeout(() => setAnimationInProgress(false), 300);
  };

  const goToPrevious = () => goToIndex(activeIndex - 1);
  const goToNext = () => goToIndex(activeIndex + 1);

  // Drag handling (mouse & touch)
  const handleDragStart = (clientX: number) => {
    setIsDragging(true);
    setStartX(clientX);
  };

  const handleDragMove = (clientX: number) => {
    if (!isDragging || animationInProgress) return;
    const deltaX = clientX - startX;
    const newTranslateX = getTranslateX() + deltaX;
    const maxDragDistance = cardWidth / 2;
    const resistance = 0.5;
    if (activeIndex === 0 && deltaX > 0) {
      setTranslateX(getTranslateX() + deltaX * resistance);
    } else if (activeIndex === totalItems - 1 && deltaX < 0) {
      setTranslateX(getTranslateX() + deltaX * resistance);
    } else {
      setTranslateX(newTranslateX);
    }
  };

  const handleDragEnd = (clientX: number) => {
    if (!isDragging) return;
    const deltaX = clientX - startX;
    const threshold = cardWidth / 3;
    if (Math.abs(deltaX) > threshold) {
      deltaX > 0 ? goToPrevious() : goToNext();
    } else {
      setTranslateX(getTranslateX());
    }
    setIsDragging(false);
  };

  // Mouse events
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => handleDragStart(e.clientX);
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => isDragging && handleDragMove(e.clientX);
  const handleMouseUp = (e: React.MouseEvent<HTMLDivElement>) => handleDragEnd(e.clientX);
  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => isDragging && handleDragEnd(e.clientX);

  // Touch events
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => handleDragStart(e.touches[0].clientX);
  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => isDragging && handleDragMove(e.touches[0].clientX);
  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => handleDragEnd(e.changedTouches[0].clientX);

  // Card styling based on position relative to activeIndex
  const getCardStyle = (index: number) => {
    const indexDiff = Math.abs(index - activeIndex);
    const scale = 1 - (indexDiff * 0.05);
    const zIndex = totalItems - indexDiff;
    return {
      transform: `scale(${scale})`,
      zIndex,
      marginRight: index < totalItems - 1 ? '1rem' : 0,
    };
  };

  return (
    <div className={`carousel-container relative ${className}`} ref={carouselRef}>
      {/* Carousel Track */}
      <div
        ref={trackRef}
        className="carousel-track flex select-none"
        style={{
          transform: `translateX(${translateX}px)`,
          transition: isDragging ? 'none' : 'transform 0.3s cubic-bezier(0.22, 1, 0.36, 1)',
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {items.map((item, index) => (
          <CarouselCard
            key={`carousel-card-${index}`}
            index={index}
            content={item}
            isActive={index === activeIndex}
            style={getCardStyle(index)}
          />
        ))}
      </div>

      {/* Navigation Buttons */}
      <div className="carousel-navigation absolute inset-0 flex items-center justify-between pointer-events-none">
        <button
          className="carousel-button pointer-events-auto p-2 bg-white/20 rounded-full hover:bg-white/30 ml-4"
          onClick={(e) => {
            e.stopPropagation();
            goToPrevious();
          }}
          aria-label="Previous slide"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M15 19L8 12L15 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <button
          className="carousel-button pointer-events-auto p-2 bg-white/20 rounded-full hover:bg-white/30 mr-4"
          onClick={(e) => {
            e.stopPropagation();
            goToNext();
          }}
          aria-label="Next slide"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M9 5L16 12L9 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      {/* Pagination Indicators */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
        {items.map((_, index) => (
          <button
            key={`carousel-indicator-${index}`}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === activeIndex ? 'bg-white w-6' : 'bg-white/50 hover:bg-white/80'
            }`}
            onClick={() => goToIndex(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;
