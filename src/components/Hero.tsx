import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Youtube, 
  Instagram, 
  BookOpen, 
  Mail, 
  MessageCircle, 
  ExternalLink, 
  Copy, 
  Check 
} from 'lucide-react';

const DING_DIRECTOR_IMAGE = "https://postfiles.pstatic.net/MjAyNjA4MzFfMjEg/MDAxNzg4MTYyMTk4Mzc4.e62CEwgXUE03u-M4x8p3sfdIFesLjbm5tnF7JfHBE8Qg.6ZcRXN-pIauy3tX2PF5vPOH3zPXUZUDNcy7NIAlKOoEg.JPEG/IMG_6975.JPG?type=w3840";
const FALLBACK_DIRECTOR_IMAGE = "/ding-director.jpg";

const HERO_TITLE_LINE1 = ['디', '자', '이', '너'];
const HERO_TITLE_LINE2 = ['딩', '마', '녀', '입', '니', '다', '.'];

interface HeroProps {
  onNavigate: (sectionId: string) => void;
}

interface SnsChannel {
  id: string;
  name: string;
  subLabel: string;
  url: string;
  icon: React.ComponentType<{ className?: string }>;
  imageUrl?: string;
  themeColor: string;
  hoverBorder: string;
  badgeBg: string;
  iconColor: string;
  password?: string;
}

const SNS_CHANNELS: SnsChannel[] = [
  {
    id: 'youtube',
    name: 'YouTube',
    subLabel: '@dingwitch7',
    url: 'https://www.youtube.com/@dingwitch7',
    icon: Youtube,
    imageUrl: 'https://img.magnific.com/premium-vector/red-youtube-logo-social-media-logo_197792-1803.jpg?w=360',
    themeColor: 'hover:bg-red-50 hover:text-red-600',
    hoverBorder: 'hover:border-red-300',
    badgeBg: 'bg-red-50 text-red-600 group-hover:bg-red-600 group-hover:text-white',
    iconColor: 'text-red-500 group-hover:text-white',
  },
  {
    id: 'blog',
    name: 'Blog',
    subLabel: '네이버 블로그',
    url: 'https://blog.naver.com/design413_',
    icon: BookOpen,
    imageUrl: 'https://designcompass.org/wp-content/uploads/2025/09/Naver-blog-rebranding-01.jpg',
    themeColor: 'hover:bg-emerald-50 hover:text-emerald-700',
    hoverBorder: 'hover:border-emerald-300',
    badgeBg: 'bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white',
    iconColor: 'text-emerald-500 group-hover:text-white',
  },
  {
    id: 'instagram',
    name: 'Instagram',
    subLabel: '@_dingwitch',
    url: 'https://www.instagram.com/_dingwitch/',
    icon: Instagram,
    imageUrl: 'https://mblogthumb-phinf.pstatic.net/MjAyMTA5MTlfMjUg/MDAxNjMyMDE3OTA4NTA0.dhHpehPf66HwINvBr6OijefwiqeXdPcbcdCU1m1nZ1Ig.3R8X4ori4uDAxmc535BOc6_M8zQHWSfotX-gO8YX4Mwg.PNG.brotherm1n/Instagram_%25EB%25B8%258C%25EB%259D%25BC%25EB%258D%2594%25EB%25AF%25BC-01.png?type=w966',
    themeColor: 'hover:bg-pink-50 hover:text-pink-600',
    hoverBorder: 'hover:border-pink-300',
    badgeBg: 'bg-gradient-to-tr from-amber-50 via-rose-50 to-purple-50 text-pink-600 group-hover:from-amber-500 group-hover:via-rose-500 group-hover:to-purple-600 group-hover:text-white',
    iconColor: 'text-pink-500 group-hover:text-white',
  },
  {
    id: 'kakao',
    name: 'KakaoTalk',
    subLabel: '오픈채팅 (비번: ding)',
    url: 'https://open.kakao.com/o/gQqm78Pf',
    icon: MessageCircle,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/f/f2/Kakao_logo.jpg?utm_source=ko.wikipedia.org&utm_campaign=index&utm_content=original',
    themeColor: 'hover:bg-amber-50 hover:text-amber-900',
    hoverBorder: 'hover:border-amber-300',
    badgeBg: 'bg-amber-100 text-amber-950 group-hover:bg-[#FEE500] group-hover:text-amber-950',
    iconColor: 'text-amber-800 group-hover:text-amber-950',
    password: 'ding',
  },
];

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  const [imgSrc, setImgSrc] = useState(DING_DIRECTOR_IMAGE);
  const [copiedPassword, setCopiedPassword] = useState(false);

  const handleCopyPassword = (e: React.MouseEvent, pwd: string) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(pwd);
    setCopiedPassword(true);
    setTimeout(() => setCopiedPassword(false), 2500);
  };

  return (
    <section
      id="home-section"
      className="relative flex flex-col items-center justify-center min-h-[calc(100vh-80px)] min-h-[720px] sm:min-h-[820px] pt-32 sm:pt-40 pb-24 sm:pb-32 overflow-hidden bg-white border-b border-slate-100"
    >
      {/* Subtle ambient lighting on white canvas with gentle organic breathing */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.08, 1],
            opacity: [0.35, 0.5, 0.35],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[900px] h-[350px] sm:h-[500px] bg-purple-100/40 rounded-full blur-[140px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.12, 1],
            opacity: [0.25, 0.4, 0.25],
          }}
          transition={{
            duration: 11,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute top-1/2 -right-20 w-[400px] h-[400px] bg-amber-100/30 rounded-full blur-[130px]"
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Main Hero Header */}
        <div className="flex flex-col items-start justify-start pt-[40px] sm:pt-[50px]">
          
          <div className="flex flex-col items-start text-left w-full">
            {/* Main Huge Typography Headline with Character-by-Character Fade-in */}
            <div className="mb-8 w-full text-left">
              <h1 
                className="text-4xl sm:text-6xl md:text-7xl lg:text-[85px] font-black tracking-tight leading-[1.1] sm:leading-[1.08] text-left select-none"
                aria-label="디자이너 딩마녀입니다."
              >
                {/* Line 1: 디자이너 */}
                <span className="block text-slate-900 text-left lg:text-[85px]" aria-hidden="true">
                  {HERO_TITLE_LINE1.map((char, idx) => (
                    <motion.span
                      key={`hero-char-l1-${idx}`}
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.45,
                        delay: 0.12 + idx * 0.075,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className="inline-block"
                    >
                      {char}
                    </motion.span>
                  ))}
                </span>

                {/* Line 2: 딩마녀입니다. */}
                <span className="block mt-1 sm:mt-2 text-[#580096] text-left lg:text-[85px]" aria-hidden="true">
                  {HERO_TITLE_LINE2.map((char, idx) => (
                    <motion.span
                      key={`hero-char-l2-${idx}`}
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.45,
                        delay: 0.46 + idx * 0.075,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className="inline-block"
                    >
                      {char}
                    </motion.span>
                  ))}
                </span>
              </h1>
            </div>

            {/* Subtitle & Career Profile */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 1.05 }}
              className="max-w-2xl text-left"
            >
              <div className="space-y-2 text-[15px] sm:text-base font-normal text-slate-700 tracking-normal">
                <p className="flex items-center gap-2.5">
                  <span className="text-[#580096] text-xs font-bold">✦</span> 디자인 경력 16년차
                </p>
                <p className="flex items-center gap-2.5">
                  <span className="text-[#580096] text-xs font-bold">✦</span> 현 딩스튜디오 대표
                </p>
                <p className="flex items-center gap-2.5">
                  <span className="text-[#580096] text-xs font-bold">✦</span> 전 MBC 문화방송 디자이너
                </p>
              </div>
            </motion.div>
          </div>

        </div>

        {/* SNS Channels Section Bar - Icon Only with Subtle Hover */}
        <motion.div
          id="hero-sns-channels"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.2 }}
          className="mt-8 sm:mt-10 flex flex-wrap items-center gap-3 sm:gap-4"
        >
          {SNS_CHANNELS.map((channel, idx) => {
            const Icon = channel.icon;

            return (
              <motion.a
                key={channel.id}
                id={`sns-link-${channel.id}`}
                href={channel.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${channel.name} (${channel.subLabel})`}
                title={`${channel.name} - ${channel.subLabel}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.35 + idx * 0.05 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`group relative w-12 h-12 sm:w-13 sm:h-13 rounded-2xl bg-white border border-slate-200 shadow-xs hover:shadow-md flex items-center justify-center transition-colors duration-200 overflow-hidden ${channel.hoverBorder} ${channel.themeColor}`}
              >
                {channel.imageUrl ? (
                  <div className="w-full h-full flex items-center justify-center p-1.5 overflow-hidden">
                    <img
                      src={channel.imageUrl}
                      alt={channel.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover rounded-xl transition-transform duration-300 group-hover:scale-105"
                      onError={(e) => {
                        // Fallback to Icon if image fails
                        e.currentTarget.style.display = 'none';
                        const parent = e.currentTarget.parentElement;
                        if (parent && parent.nextElementSibling) {
                          (parent.nextElementSibling as HTMLElement).style.display = 'flex';
                        }
                      }}
                    />
                  </div>
                ) : (
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300 ${channel.badgeBg}`}
                  >
                    <Icon className={`w-5 h-5 transition-transform group-hover:scale-110 ${channel.iconColor}`} />
                  </div>
                )}
              </motion.a>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
};



