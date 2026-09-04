import React from 'react';

interface ToolItem {
  name: string;
  category: string;
  color: string;
  bgLight: string;
  borderColor: string;
  badgeBg: string;
  badgeText: string;
  svgIcon: React.ReactNode;
}

const TOOLS_DATA: ToolItem[] = [
  {
    name: 'Photoshop',
    category: '포토샵',
    color: '#31A8FF',
    bgLight: 'bg-[#31A8FF]/5',
    borderColor: 'border-[#31A8FF]/30',
    badgeBg: 'bg-[#001E36]',
    badgeText: 'text-[#31A8FF]',
    svgIcon: (
      <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="5" fill="#001E36" />
        <path d="M6 6.5h4.2c2.1 0 3.3 1.1 3.3 2.8s-1.2 2.8-3.3 2.8H8v4.4H6V6.5zm2 4h2.1c.9 0 1.4-.5 1.4-1.2 0-.7-.5-1.2-1.4-1.2H8v2.4z" fill="#31A8FF" />
        <path d="M14.5 13.7c.5-.4 1.2-.7 2-.7 1 0 1.6.5 1.6 1.3 0 .7-.4 1.1-1.4 1.5l-.8.3c-1.3.5-1.9 1.2-1.9 2.2 0 1.3 1.1 2.2 2.7 2.2 1 0 1.9-.3 2.5-.9l-.6-1.3c-.5.4-1.2.7-1.9.7-.9 0-1.4-.4-1.4-1.1 0-.6.4-1 1.4-1.4l.8-.3c1.4-.5 2-1.2 2-2.3 0-1.4-1.1-2.2-2.8-2.2-.9 0-1.8.3-2.3.8l.5 1.2z" fill="#31A8FF" />
      </svg>
    ),
  },
  {
    name: 'Illustrator',
    category: '일러스트레이터',
    color: '#FF9A00',
    bgLight: 'bg-[#FF9A00]/5',
    borderColor: 'border-[#FF9A00]/30',
    badgeBg: 'bg-[#330000]',
    badgeText: 'text-[#FF9A00]',
    svgIcon: (
      <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="5" fill="#330000" />
        <path d="M6.5 16.5L9.6 6.5h1.9l3.1 10h-1.9l-.6-2.2h-3l-.6 2.2H6.5zm3.5-3.8h2.2L11.1 9.4h-.1l-1 3.3z" fill="#FF9A00" />
        <path d="M16.5 8.5c0-.6.4-1 1-1s1 .4 1 1-.4 1-1 1-1-.4-1-1zm.1 2.3h1.8v5.7h-1.8v-5.7z" fill="#FF9A00" />
      </svg>
    ),
  },
  {
    name: 'Figma',
    category: '피그마',
    color: '#F24E1E',
    bgLight: 'bg-[#F24E1E]/5',
    borderColor: 'border-[#F24E1E]/30',
    badgeBg: 'bg-slate-900',
    badgeText: 'text-[#F24E1E]',
    svgIcon: (
      <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="5" fill="#1E1E1E" />
        <path d="M12 12a3 3 0 1 1 6 0 3 3 0 0 1-6 0z" fill="#1ABCFE" />
        <path d="M6 18a3 3 0 0 0 3 3 3 3 0 0 0 3-3v-3H9a3 3 0 0 0-3 3z" fill="#0ACF83" />
        <path d="M12 3H9a3 3 0 1 0 0 6h3V3z" fill="#F24E1E" />
        <path d="M12 9H9a3 3 0 1 0 0 6h3V9z" fill="#A259FF" />
        <path d="M12 3h3a3 3 0 1 1 0 6h-3V3z" fill="#FF7262" />
      </svg>
    ),
  },
  {
    name: 'Imweb',
    category: '아임웹',
    color: '#111111',
    bgLight: 'bg-slate-900/5',
    borderColor: 'border-slate-300',
    badgeBg: 'bg-black',
    badgeText: 'text-white',
    svgIcon: (
      <div className="w-7 h-7 rounded-[6px] bg-white border border-slate-200/90 flex items-center justify-center p-0.5 overflow-hidden shrink-0 shadow-xs">
        <img
          src="/images/imweb-symbol.png"
          alt="아임웹 (Imweb)"
          className="w-full h-full object-contain"
          referrerPolicy="no-referrer"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src =
              'https://postfiles.pstatic.net/MjAyNjA5MDRfMzMg/MDAxNzg4NDg3MzUyNTA2.LveYvUzROFz27zlC6p7V0EmxXYnQy-hKDs5xOyFvZUQg.4oRI1xgvgOEENK8eAZfSBtrfgc92h51BWl1zo6bJ4TAg.PNG/image.png?type=w966';
          }}
        />
      </div>
    ),
  },
  {
    name: 'Google AI Studio',
    category: '구글 AI 스튜디오',
    color: '#4285F4',
    bgLight: 'bg-[#4285F4]/5',
    borderColor: 'border-[#4285F4]/30',
    badgeBg: 'bg-[#1a1f36]',
    badgeText: 'text-[#4285F4]',
    svgIcon: (
      <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="5" fill="#131314" />
        <path d="M12 4L13.8 8.2L18 10L13.8 11.8L12 16L10.2 11.8L6 10L10.2 8.2L12 4Z" fill="url(#gemini_grad)" />
        <path d="M17 14L17.9 16.1L20 17L17.9 17.9L17 20L16.1 17.9L14 17L16.1 16.1L17 14Z" fill="url(#gemini_grad2)" />
        <defs>
          <linearGradient id="gemini_grad" x1="6" y1="4" x2="18" y2="16" gradientUnits="userSpaceOnUse">
            <stop stopColor="#4285F4" />
            <stop offset="0.5" stopColor="#9B72CB" />
            <stop offset="1" stopColor="#D96570" />
          </linearGradient>
          <linearGradient id="gemini_grad2" x1="14" y1="14" x2="20" y2="20" gradientUnits="userSpaceOnUse">
            <stop stopColor="#9B72CB" />
            <stop offset="1" stopColor="#D96570" />
          </linearGradient>
        </defs>
      </svg>
    ),
  },
  {
    name: 'Kmong',
    category: '크몽',
    color: '#76F066',
    bgLight: 'bg-[#76F066]/10',
    borderColor: 'border-[#76F066]/40',
    badgeBg: 'bg-[#111111]',
    badgeText: 'text-[#76F066]',
    svgIcon: (
      <img
        src="/images/kmong-logo.png"
        alt="크몽 (Kmong)"
        className="w-7 h-7 rounded-[6px] object-cover shrink-0"
        referrerPolicy="no-referrer"
      />
    ),
  },
];

export const ToolsTickerSection: React.FC = () => {
  return (
    <section
      id="tools-section"
      className="relative py-12 sm:py-16 bg-white border-b border-slate-100 overflow-hidden"
    >
      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 text-left">
        <h2 className="relative inline-flex items-center text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
          <span>TOOL</span>
          <span className="w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full bg-gradient-to-tr from-[#580096] via-[#7B1FA2] to-[#A855F7] -translate-y-3 sm:-translate-y-4 translate-x-1.5" />
        </h2>
      </div>

      {/* Infinite Flowing Marquee Carousel */}
      <div className="w-full overflow-hidden py-3 select-none">
        <div className="animate-marquee-left flex items-center gap-6 whitespace-nowrap">
          {/* First set */}
          {TOOLS_DATA.map((tool, idx) => (
            <div
              key={`tool-1-${idx}`}
              className="flex items-center gap-3.5 px-5 py-3 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:shadow-md hover:border-purple-200 transition-all duration-300 group cursor-default min-w-[210px]"
            >
              <div className="shrink-0 transition-transform duration-300 group-hover:scale-110">
                {tool.svgIcon}
              </div>
              <div className="flex flex-col text-left">
                <span className="text-sm font-bold text-slate-900 group-hover:text-[#580096] transition-colors">
                  {tool.name}
                </span>
                <span className="text-xs text-slate-500 font-medium">
                  {tool.category}
                </span>
              </div>
            </div>
          ))}

          {/* Duplicate set for seamless infinite loop */}
          {TOOLS_DATA.map((tool, idx) => (
            <div
              key={`tool-2-${idx}`}
              className="flex items-center gap-3.5 px-5 py-3 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:shadow-md hover:border-purple-200 transition-all duration-300 group cursor-default min-w-[210px]"
            >
              <div className="shrink-0 transition-transform duration-300 group-hover:scale-110">
                {tool.svgIcon}
              </div>
              <div className="flex flex-col text-left">
                <span className="text-sm font-bold text-slate-900 group-hover:text-[#580096] transition-colors">
                  {tool.name}
                </span>
                <span className="text-xs text-slate-500 font-medium">
                  {tool.category}
                </span>
              </div>
            </div>
          ))}

          {/* Triplicate set to ensure seamless wide screens */}
          {TOOLS_DATA.map((tool, idx) => (
            <div
              key={`tool-3-${idx}`}
              className="flex items-center gap-3.5 px-5 py-3 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:shadow-md hover:border-purple-200 transition-all duration-300 group cursor-default min-w-[210px]"
            >
              <div className="shrink-0 transition-transform duration-300 group-hover:scale-110">
                {tool.svgIcon}
              </div>
              <div className="flex flex-col text-left">
                <span className="text-sm font-bold text-slate-900 group-hover:text-[#580096] transition-colors">
                  {tool.name}
                </span>
                <span className="text-xs text-slate-500 font-medium">
                  {tool.category}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
