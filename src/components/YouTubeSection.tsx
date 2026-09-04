import React, { useState, useEffect } from 'react';
import { Youtube, Play, ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';
import { YouTubeVideoItem } from '../types';
import { getYouTubeVideos } from '../utils/storage';

interface YouTubeSectionProps {
  onNotify?: (msg: string) => void;
  onNavigate?: (page: string) => void;
}

export const YouTubeSection: React.FC<YouTubeSectionProps> = ({ onNotify, onNavigate }) => {
  const [videos, setVideos] = useState<YouTubeVideoItem[]>(() => getYouTubeVideos().slice(0, 6));

  useEffect(() => {
    // Initial load from storage
    const current = getYouTubeVideos();
    if (current && current.length > 0) {
      setVideos(current.slice(0, 6));
    }

    const handleUpdate = () => {
      const updated = getYouTubeVideos();
      setVideos(updated.slice(0, 6));
    };

    window.addEventListener('ding_youtube_videos_updated', handleUpdate);
    window.addEventListener('storage', handleUpdate);

    return () => {
      window.removeEventListener('ding_youtube_videos_updated', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  const handleVideoClick = (video: YouTubeVideoItem) => {
    const targetUrl = video.url || 'https://www.youtube.com/@dingwitch7/videos';
    window.open(targetUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <section
      id="youtube-section"
      className="relative py-20 sm:py-28 bg-white border-t border-slate-200/80 overflow-hidden scroll-mt-16 sm:scroll-mt-20"
    >
      {/* Background soft ambient decoration */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-red-50/50 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-96 h-96 bg-purple-50/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-10 sm:mb-12"
        >
          <div className="flex flex-col items-start">
            <h2 className="relative inline-flex items-center text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
              <span>유튜브</span>
              <span className="w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full bg-gradient-to-tr from-[#580096] via-[#7B1FA2] to-[#A855F7] -translate-y-3 sm:-translate-y-4 translate-x-1.5" />
            </h2>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-3 self-start sm:self-auto">
            {onNavigate && (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => onNavigate('youtube')}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs sm:text-sm font-bold transition-colors cursor-pointer"
              >
                <span>영상 전체보기 (12편)</span>
                <span>→</span>
              </motion.button>
            )}
            <motion.a
              id="youtube-channel-direct-link"
              href="https://www.youtube.com/@dingwitch7"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs sm:text-sm font-bold transition-colors shadow-sm hover:shadow-md cursor-pointer"
            >
              <Youtube className="w-4 h-4" strokeWidth={2.2} />
              <span>채널 보러가기</span>
              <ArrowUpRight className="w-3.5 h-3.5 ml-0.5 opacity-80" />
            </motion.a>
          </div>
        </motion.div>

        {/* 6 Video Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {videos.map((video, index) => (
            <motion.div
              key={video.id || index}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.65, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => handleVideoClick(video)}
              className="group cursor-pointer flex flex-col bg-white rounded-2xl border border-slate-200/90 hover:border-red-300 hover:shadow-xl transition-all duration-300 overflow-hidden"
              id={`youtube-video-card-${index + 1}`}
            >
              {/* Thumbnail Container */}
              <div className="relative aspect-video w-full bg-slate-900 overflow-hidden">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80';
                  }}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

                {/* Play Button Icon on Hover */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-red-600 text-white flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                    <Play className="w-5 h-5 sm:w-6 sm:h-6 fill-current translate-x-0.5" />
                  </div>
                </div>
              </div>

              {/* Video Info Body - Title only */}
              <div className="p-4 sm:p-5 flex-1 flex flex-col justify-center bg-white">
                <h3 className="text-base sm:text-lg font-bold text-slate-900 line-clamp-2 leading-snug group-hover:text-red-600 transition-colors">
                  {video.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
