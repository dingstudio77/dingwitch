import React, { useState, useEffect } from 'react';
import { 
  Youtube, 
  Play, 
  ExternalLink, 
  Clock, 
  Eye, 
  Share2
} from 'lucide-react';
import { motion } from 'motion/react';
import { YouTubeVideoItem } from '../types';
import { getYouTubeVideos } from '../utils/storage';

interface YouTubePageProps {
  onNotify: (msg: string) => void;
}

export const YouTubePage: React.FC<YouTubePageProps> = ({ onNotify }) => {
  const [videos, setVideos] = useState<YouTubeVideoItem[]>(() => getYouTubeVideos());

  useEffect(() => {
    const handleUpdate = () => {
      setVideos(getYouTubeVideos());
    };
    window.addEventListener('ding_youtube_videos_updated', handleUpdate);
    window.addEventListener('storage', handleUpdate);
    return () => {
      window.removeEventListener('ding_youtube_videos_updated', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  const handleOpenVideo = (video: YouTubeVideoItem) => {
    const targetUrl = video.url || 'https://www.youtube.com/@dingwitch7/videos';
    window.open(targetUrl, '_blank', 'noopener,noreferrer');
  };

  const handleShare = (video: YouTubeVideoItem, e: React.MouseEvent) => {
    e.stopPropagation();
    const targetUrl = video.url || 'https://www.youtube.com/@dingwitch7/videos';
    if (navigator.clipboard) {
      navigator.clipboard.writeText(targetUrl);
      onNotify('유튜브 영상 링크가 클립보드에 복사되었습니다.');
    } else {
      window.open(targetUrl, '_blank');
    }
  };

  return (
    <div id="youtube-page" className="pt-24 pb-28 bg-slate-50/50 text-slate-900 animate-in fade-in duration-300">
      
      {/* Top Hero Banner */}
      <section className="relative overflow-hidden py-14 sm:py-20 bg-gradient-to-b from-purple-50/70 via-white to-slate-50/50 border-b border-slate-200/80">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-red-100/50 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 left-0 w-80 h-80 bg-purple-100/40 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-4">
              딩마녀의 유튜브 채널
            </h1>
            <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed mb-6">
              로고디자인, 홈페이지 제작, AI 디자인를 공부하고 싶으신 분이라면
            </p>
            
            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              <a
                href="https://www.youtube.com/@dingwitch7"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-sm sm:text-base shadow-sm hover:shadow-md transition-all cursor-pointer"
              >
                <Youtube className="w-5 h-5" strokeWidth={2.2} />
                <span>채널 보러가기</span>
                <ExternalLink className="w-4 h-4 opacity-80" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area: Video Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 sm:mt-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {videos.map((video, index) => (
            <motion.article
              key={video.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              onClick={() => handleOpenVideo(video)}
              className="group flex flex-col bg-white rounded-2xl border border-slate-200/90 overflow-hidden hover:shadow-xl hover:border-purple-300 transition-all duration-300 cursor-pointer"
            >
              {/* Thumbnail Container */}
              <div className="relative aspect-video w-full bg-slate-900 overflow-hidden">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-slate-900/30 transition-colors duration-300" />

                {/* Play Overlay Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-red-600/90 text-white flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:bg-red-600 transition-transform duration-300">
                    <Play className="w-6 h-6 fill-current translate-x-0.5" />
                  </div>
                </div>

                {/* Duration Badge */}
                {video.duration && (
                  <span className="absolute bottom-2.5 right-2.5 px-2 py-0.5 bg-slate-950/80 backdrop-blur-xs text-white text-[11px] font-bold rounded-md flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-300" />
                    <span>{video.duration}</span>
                  </span>
                )}

                {/* Tag badge */}
                {video.tag && (
                  <span className="absolute top-2.5 left-2.5 px-2.5 py-1 bg-white/95 backdrop-blur-xs text-[#580096] text-[11px] font-bold rounded-md shadow-xs">
                    {video.tag}
                  </span>
                )}
              </div>

              {/* Video Info */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-base sm:text-[17px] font-bold text-slate-900 group-hover:text-[#580096] transition-colors leading-snug line-clamp-2 mb-3">
                    {video.title}
                  </h3>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <div className="flex items-center gap-2">
                    {video.views && (
                      <span className="flex items-center gap-1">
                        <Eye className="w-3.5 h-3.5 text-slate-400" />
                        <span>조회수 {video.views}</span>
                      </span>
                    )}
                    {video.publishedAt && (
                      <span>· {video.publishedAt}</span>
                    )}
                  </div>

                  <button
                    onClick={(e) => handleShare(video, e)}
                    className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                    title="영상 링크 복사"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

    </div>
  );
};
