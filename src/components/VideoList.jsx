import React, { useRef } from 'react';
import VideoCard from './VideoCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import '../styles/VideoList.css';

const VideoList = ({ videos, onEditVideo, onDeleteVideo }) => {
  const scrollContainerRef = useRef(null);

  const scroll = (direction) => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollAmount = container.clientWidth * 0.8;
      const newScrollPosition = container.scrollLeft + (direction === 'right' ? scrollAmount : -scrollAmount);
      container.scrollTo({
        left: newScrollPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="video-list-container">
      {videos.length > 0 && (
        <button 
          className="scroll-button left-button" 
          onClick={() => scroll('left')}
          aria-label="Scroll left"
        >
          <ChevronLeft size={40} />
        </button>
      )}
      
      <div className="video-list" ref={scrollContainerRef}>
        {videos.map(video => (
          <VideoCard 
            key={video.id} 
            video={video} 
            onEdit={() => onEditVideo(video)}
            onDelete={() => onDeleteVideo(video.id)}
          />
        ))}
      </div>

      {videos.length > 0 && (
        <button 
          className="scroll-button right-button" 
          onClick={() => scroll('right')}
          aria-label="Scroll right"
        >
          <ChevronRight size={40} />
        </button>
      )}
    </div>
  );
};

export default VideoList;

