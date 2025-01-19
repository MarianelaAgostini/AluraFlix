import React, { useState, useEffect } from 'react';
import '../styles/VideoCard.css';

const VideoCard = ({ video, onEdit, onDelete }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    // Cargar el API de YouTube
    const tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  }, []);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const getYoutubeId = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const renderVideo = () => {
    const youtubeId = getYoutubeId(video.videoUrl);
    if (youtubeId) {
      return (
        <iframe
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/${youtubeId}?autoplay=${isPlaying ? 1 : 0}`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      );
    } else {
      return (
        <video
          src={video.videoUrl}
          controls={isPlaying}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onEnded={() => setIsPlaying(false)}
        >
          Tu navegador no soporta el elemento de video.
        </video>
      );
    }
  };

  return (
    <div className="video-card">
      <div className="video-container">
        {isPlaying ? (
          renderVideo()
        ) : (
          <img
            src={video.image || "/placeholder.svg"}
            alt={video.title}
            onClick={togglePlay}
          />
        )}
        {!isPlaying && (
          <button
            onClick={togglePlay}
            className="play-button"
            aria-label="Reproducir video"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="48" height="48">
              <path d="M8 5v14l11-7z"/>
            </svg>
          </button>
        )}
      </div>
      <h3>{video.title}</h3>
      <div className="actions">
        <button 
          onClick={onEdit}
          className="edit-button"
        >
          Editar
        </button>
        <button 
          onClick={onDelete}
          className="delete-button"
        >
          Borrar
        </button>
      </div>
    </div>
  );
};

export default VideoCard;

