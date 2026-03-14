'use client';

import React from 'react';

interface YouTubeEmbedProps {
  videoId: string;
  title?: string;
  width?: string;
  height?: string;
}

const YouTubeEmbed: React.FC<YouTubeEmbedProps> = ({ 
  videoId, 
  title = "YouTube video player", 
  width = "560", 
  height = "315" 
}) => {
  return (
    <div className="video-container my-6">
      <iframe
        width={width}
        height={height}
        src={`https://www.youtube.com/embed/${videoId}`}
        title={title}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        className="rounded-lg shadow-lg"
      />
      <style jsx>{`
        .video-container {
          position: relative;
          overflow: hidden;
          border-radius: 0.5rem;
        }
        @media (max-width: 768px) {
          .video-container iframe {
            width: 100%;
            height: auto;
            aspect-ratio: 16/9;
          }
        }
      `}</style>
    </div>
  );
};

export default YouTubeEmbed;
