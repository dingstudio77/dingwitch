import React from 'react';
import { ArrowUp, Lock } from 'lucide-react';
import { STUDIO_INFO } from '../data/mockData';
import { Logo } from './Logo';

interface FooterProps {
  onNavigate?: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="main-footer" className="relative bg-gradient-to-b from-[#430076] via-[#35005E] to-[#250043] border-t border-purple-900/60 pt-14 pb-12 overflow-hidden text-purple-200 text-xs">
      {/* Decorative ambient radial glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-fuchsia-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Brand & Studio Info */}
        <div className="pb-10 border-b border-white/10 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-4">
            <div className="flex items-center">
              <Logo className="h-16 sm:h-20 w-auto drop-shadow-sm" variant="white" />
            </div>

            <div className="space-y-1.5 text-xs text-purple-200/80 leading-relaxed font-light">
              <p>업체명 : 딩스튜디오</p>
              <p>대표자명 : 강은영</p>
              <p>사업자번호 : 372-44-01102</p>
              <p>사업장 주소 : 경기도 분당구 수내로 201</p>
            </div>
          </div>
        </div>

        {/* Bottom copyright, Admin lock button & Scroll To Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-purple-300/70 text-xs">
          <div className="flex items-center gap-4">
            <p>© {new Date().getFullYear()} DING STUDIO. All rights reserved.</p>
            
            {/* Discreet Admin Lock Access */}
            <button
              id="footer-admin-link"
              onClick={() => {
                onNavigate?.('admin');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-purple-300/40 hover:text-white hover:bg-white/10 transition-all text-[11px] cursor-pointer"
              title="딩스튜디오 관리자 모드"
            >
              <Lock className="w-3 h-3" />
              <span>관리자</span>
            </button>
          </div>

          <button
            id="back-to-top-btn"
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-white transition-all duration-200 cursor-pointer text-xs font-medium backdrop-blur-sm hover:scale-105 active:scale-95 shadow-sm"
          >
            <span>Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
};
