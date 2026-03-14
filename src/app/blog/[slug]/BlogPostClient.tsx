'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import Image from 'next/image';
import { BlogPost } from '@/lib/markdown';

interface BlogPostClientProps {
  post: {
    id: number;
    slug: string;
    title: string;
    excerpt: string;
    date: string;
    category: string;
    image?: string;
    author: string;
    content: string;
  };
  relatedPosts: {
    id: number;
    slug: string;
    title: string;
    excerpt: string;
    date: string;
    category: string;
    image?: string;
    author: string;
  }[];
}

export default function BlogPostClient({ post, relatedPosts }: BlogPostClientProps) {
  const [processedContent, setProcessedContent] = useState<string>('');

  useEffect(() => {
    console.log('BlogPostClient useEffect triggered');
    console.log('Post content:', post.content);
    
    // Process YouTube placeholders
    let content = post.content;
    const youtubeRegex = /\{\{YOUTUBE:([a-zA-Z0-9_-]+)\}\}/g;
    const videoRegex = /\{\{VIDEO:([^{}]+)\}\}/g;
    
    console.log('Original content:', content);
    console.log('Video regex test:', videoRegex.test(content));
    
    // Reset regex for actual processing
    videoRegex.lastIndex = 0;
    
    content = content.replace(youtubeRegex, (match, videoId) => {
      console.log('Processing YouTube placeholder:', match, videoId);
      // Create a placeholder div that we'll replace with the actual component
      return `<div class="youtube-placeholder" data-video-id="${videoId}"></div>`;
    });
    
    content = content.replace(videoRegex, (match, fullContent) => {
      console.log('Processing video placeholder:', match, fullContent);
      
      // Find the first colon that's NOT part of http:// or https://
      let src, optionsStr = '';
      
      // Check if it starts with http:// or https://
      if (fullContent.startsWith('http://')) {
        const afterProtocol = fullContent.substring(7); // Remove 'http://'
        const colonIndex = afterProtocol.indexOf(':');
        if (colonIndex > 0) {
          src = 'http://' + afterProtocol.substring(0, colonIndex);
          optionsStr = afterProtocol.substring(colonIndex + 1);
        } else {
          src = fullContent;
        }
      } else if (fullContent.startsWith('https://')) {
        const afterProtocol = fullContent.substring(8); // Remove 'https://'
        const colonIndex = afterProtocol.indexOf(':');
        if (colonIndex > 0) {
          src = 'https://' + afterProtocol.substring(0, colonIndex);
          optionsStr = afterProtocol.substring(colonIndex + 1);
        } else {
          src = fullContent;
        }
      } else {
        // For non-HTTP URLs, split by first colon
        const colonIndex = fullContent.indexOf(':');
        if (colonIndex > 0) {
          src = fullContent.substring(0, colonIndex);
          optionsStr = fullContent.substring(colonIndex + 1);
        } else {
          src = fullContent;
        }
      }
      
      const opts = optionsStr.split(',').reduce((acc: Record<string, string>, opt: string) => {
        const [key, value] = opt.split('=');
        if (key && value) {
          acc[key.trim()] = value.trim();
        }
        return acc;
      }, {} as Record<string, string>);
      
      console.log('Video src:', src);
      console.log('Video options:', opts);
      return `<div class="video-placeholder" data-src="${src}" data-options='${JSON.stringify(opts)}'></div>`;
    });
    
    console.log('Processed content:', content);
    setProcessedContent(content);
  }, [post.content]);

  useEffect(() => {
    // Replace YouTube placeholders with actual components
    const youtubePlaceholders = document.querySelectorAll('.youtube-placeholder');
    youtubePlaceholders.forEach((placeholder) => {
      const videoId = placeholder.getAttribute('data-video-id');
      if (videoId) {
        const container = document.createElement('div');
        container.className = 'youtube-embed-container my-6';
        placeholder.parentNode?.replaceChild(container, placeholder);
        
        // Render the YouTube component
        const iframe = document.createElement('iframe');
        iframe.width = '560';
        iframe.height = '315';
        iframe.src = `https://www.youtube.com/embed/${videoId}`;
        iframe.title = 'YouTube video player';
        iframe.frameBorder = '0';
        iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
        iframe.allowFullscreen = true;
        iframe.className = 'rounded-lg shadow-lg w-full max-w-2xl';
        
        container.appendChild(iframe);
      }
    });

    // Replace video placeholders with actual components
    const videoPlaceholders = document.querySelectorAll('.video-placeholder');
    console.log('Found video placeholders:', videoPlaceholders.length);
    
    videoPlaceholders.forEach((placeholder) => {
      const src = placeholder.getAttribute('data-src');
      const options = JSON.parse(placeholder.getAttribute('data-options') || '{}');
      
      console.log('Processing video with src:', src);
      
      if (src) {
        const container = document.createElement('div');
        container.className = 'video-embed-container my-6';
        placeholder.parentNode?.replaceChild(container, placeholder);
        
        // Create video element
        const video = document.createElement('video');
        video.width = parseInt(options.width) || 800;
        video.height = parseInt(options.height) || 450;
        video.controls = options.controls !== 'false';
        video.autoplay = options.autoplay === 'true';
        video.muted = options.muted === 'true';
        video.loop = options.loop === 'true';
        video.poster = options.poster || '';
        video.className = 'w-full max-w-4xl mx-auto block rounded-lg shadow-lg';
        video.style.maxHeight = '500px';
        
        // Add source element with proper URL handling
        const source = document.createElement('source');
        // Ensure the URL is absolute and properly encoded
        let videoSrc = src.trim();
        if (!videoSrc.startsWith('http')) {
          videoSrc = videoSrc;
        }
        
        console.log('Final video src:', videoSrc);
        source.src = videoSrc;
        source.type = options.type || 'video/mp4';
        video.appendChild(source);
        
        // Add error handling with detailed logging
        video.addEventListener('error', (e) => {
          console.error('Video error:', e);
          console.error('Video src that failed:', videoSrc);
          
          const errorDiv = document.createElement('div');
          errorDiv.className = 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4';
          errorDiv.innerHTML = `
            <p class="text-red-600 dark:text-red-400 text-sm">Failed to load video. Please check the URL and try again.</p>
            <p class="text-red-600 dark:text-red-400 text-xs mt-1">URL: ${videoSrc}</p>
            <a href="${videoSrc}" target="_blank" rel="noopener noreferrer" class="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 text-sm underline mt-2 inline-block">
              Open video in new tab
            </a>
          `;
          container.replaceChild(errorDiv, video);
        });
        
        // Add load success handling
        video.addEventListener('loadeddata', () => {
          console.log('Video loaded successfully:', videoSrc);
        });
        
        // Add network error handling
        video.addEventListener('stalled', () => {
          console.warn('Video stalled:', videoSrc);
        });
        
        container.appendChild(video);
      }
    });
  }, [processedContent]);

  return (
    <main className="min-h-screen bg-white dark:bg-black">
      <Header />
      <article className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-black">
        <div className="container mx-auto max-w-4xl">
          {/* Back Button */}
          <Link
            href="/blog"
            className="inline-flex items-center text-[#666666] dark:text-gray-400 hover:text-[#ff6b6b] transition-colors mb-8"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M15 19l-7-7 7-7" />
            </svg>
            Back to Blog
          </Link>

          {/* Post Header */}
          <header className="mb-12 animate-fade-in-up">
            <span className="inline-block px-4 py-2 bg-[#ff6b6b] text-white text-sm font-semibold rounded-full mb-4">
              {post.category}
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-[#1f1f1f] dark:text-white mb-4">
              {post.title}
            </h1>
            <div className="flex items-center space-x-4 text-[#666666] dark:text-gray-400 text-sm">
              <span>{post.date}</span>
              <span>•</span>
              <span>By {post.author}</span>
            </div>
          </header>

          {/* Featured Image */}
          {post.image && post.image !== '/api/placeholder/600/400' ? (
            <div className="mb-12 h-96 rounded-lg overflow-hidden relative">
              {post.image.startsWith('http') ? (
                // External image - use regular img tag
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                // Local image - use Next.js Image component
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover"
                  priority
                />
              )}
            </div>
          ) : (
            <div className="mb-12 h-96 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 rounded-lg overflow-hidden">
              {/* Placeholder for featured image */}
            </div>
          )}

          {/* Post Content */}
          <div
            className="blog-content prose prose-lg max-w-none animate-fade-in-up"
            style={{ animationDelay: '0.1s' }}
            dangerouslySetInnerHTML={{ __html: processedContent }}
          />

          <style jsx>{`
            .blog-content h1 {
              @apply text-3xl font-bold text-[#1f1f1f] dark:text-white mb-4 mt-8;
            }
            .blog-content h2 {
              @apply text-2xl font-bold text-[#1f1f1f] dark:text-white mb-4 mt-8;
            }
            .blog-content h3 {
              @apply text-xl font-bold text-[#1f1f1f] dark:text-white mb-3 mt-6;
            }
            .blog-content p {
              @apply mb-6 text-[#666666] dark:text-gray-400 leading-relaxed;
            }
            .blog-content ul, .blog-content ol {
              @apply mb-6 pl-6;
            }
            .blog-content li {
              @apply mb-2 text-[#666666] dark:text-gray-400;
            }
            .blog-content blockquote {
              @apply border-l-4 border-[#ff6b6b] pl-4 italic text-[#666666] dark:text-gray-400 mb-6;
            }
            .blog-content code {
              @apply bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm;
            }
            .blog-content pre {
              @apply bg-gray-100 dark:bg-gray-800 p-4 rounded-lg mb-6 overflow-x-auto;
            }
            .blog-content img {
              @apply w-full h-auto rounded-lg mb-6;
            }
          `}</style>

          {/* Share Section */}
          <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
            <h3 className="text-xl font-bold text-[#1f1f1f] dark:text-white mb-4">Share this post</h3>
            <div className="flex space-x-4">
              <button className="px-4 py-2 bg-[#1f1f1f] text-white rounded-full hover:bg-[#ff6b6b] transition-colors">
                Twitter
              </button>
              <button className="px-4 py-2 bg-[#1f1f1f] text-white rounded-full hover:bg-[#ff6b6b] transition-colors">
                LinkedIn
              </button>
              <button className="px-4 py-2 bg-[#1f1f1f] text-white rounded-full hover:bg-[#ff6b6b] transition-colors">
                Facebook
              </button>
            </div>
          </div>

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-800">
              <h3 className="text-2xl font-bold text-[#1f1f1f] dark:text-white mb-8">Related Posts</h3>
              <div className="grid md:grid-cols-3 gap-6">
                {relatedPosts.map((relatedPost) => (
                  <Link
                    key={relatedPost.id}
                    href={`/blog/${relatedPost.slug}`}
                    className="block p-6 bg-gray-50 dark:bg-gray-900 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    <h4 className="font-bold text-[#1f1f1f] dark:text-white mb-2 hover:text-[#ff6b6b] transition-colors">
                      {relatedPost.title}
                    </h4>
                    <p className="text-sm text-[#666666] dark:text-gray-400">{relatedPost.date}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>
      <Footer />
    </main>
  );
}
