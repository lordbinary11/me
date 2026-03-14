'use client';

import React, { useState, useRef } from 'react';

interface VideoEmbedProps {
  src: string;
  type?: string;
  poster?: string;
  width?: string;
  height?: string;
  controls?: boolean;
  autoplay?: boolean;
  muted?: boolean;
  loop?: boolean;
  className?: string;
}

const VideoEmbed: React.FC<VideoEmbedProps> = ({ 
  src, 
  type = 'video/mp4',
  poster,
  width = '100%',
  height = 'auto',
  controls = true,
  autoplay = false,
  muted = false,
  loop = false,
  className = ''
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState<string>('');
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVideoError = () => {
    setError('Failed to load video. Please check the URL and try again.');
  };

  return (
    <div className={`video-container my-6 ${className}`}>
      {error ? (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
          <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
          <a 
            href={src} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 text-sm underline mt-2 inline-block"
          >
            Open video in new tab
          </a>
        </div>
      ) : (
        <div className="relative rounded-lg overflow-hidden shadow-lg bg-black">
          <video
            ref={videoRef}
            width={width}
            height={height}
            poster={poster}
            controls={controls}
            autoPlay={autoplay}
            muted={muted}
            loop={loop}
            onError={handleVideoError}
            className="w-full h-auto max-w-4xl mx-auto block"
            style={{ maxHeight: '500px' }}
          >
            <source src={src} type={type} />
            Your browser does not support the video tag.
          </video>
          
          {!controls && (
            <button
              onClick={handlePlay}
              className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 hover:bg-opacity-40 transition-all"
            >
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg">
                {isPlaying ? (
                  <svg className="w-8 h-8 text-gray-800" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg className="w-8 h-8 text-gray-800 ml-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
            </button>
          )}
        </div>
      )}
      
      <style jsx>{`
        .video-container {
          position: relative;
          max-width: 100%;
        }
        
        .video-container video {
          border-radius: 0.5rem;
        }
        
        @media (max-width: 768px) {
          .video-container video {
            height: auto;
            aspect-ratio: 16/9;
          }
        }
      `}</style>
    </div>
  );
};

export default VideoEmbed;
