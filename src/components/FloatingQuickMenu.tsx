import React from 'react';
import { MessageCircle, Sparkles, Send } from 'lucide-react';
import { STUDIO_INFO } from '../data/mockData';

interface FloatingQuickMenuProps {
  onInquire: () => void;
}

export const FloatingQuickMenu: React.FC<FloatingQuickMenuProps> = ({ onInquire }) => {
  return (
    <div id="floating-quick-menu" className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2.5">
      {/* Floating Kakao Consultation Tooltip Button */}
      <button
        id="floating-inquiry-btn"
        onClick={onInquire}
        className="group relative flex items-center gap-2 px-4 py-3 rounded-full bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 text-slate-950 font-bold text-xs shadow-xl shadow-amber-500/30 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
        aria-label="Quick inquiry"
      >
        <span className="flex h-2 w-2 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-slate-950 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-slate-950"></span>
        </span>
        <Send className="w-3.5 h-3.5 text-slate-950" />
        <span className="hidden sm:inline">디자인 의뢰 상담</span>
        <span className="sm:hidden">의뢰</span>
      </button>
    </div>
  );
};
