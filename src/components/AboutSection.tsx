import React, { useState } from 'react';
import { Monitor, PenTool, BarChart3, Star, Heart } from 'lucide-react';
import { motion } from 'motion/react';

const DING_DIRECTOR_IMAGE = "https://postfiles.pstatic.net/MjAyNjA4MzFfMjEg/MDAxNzg4MTYyMTk4Mzc4.e62CEwgXUE03u-M4x8p3sfdIFesLjbm5tnF7JfHBE8Qg.6ZcRXN-pIauy3tX2PF5vPOH3zPXUZUDNcy7NIAlKOoEg.JPEG/IMG_6975.JPG?type=w3840";
const FALLBACK_DIRECTOR_IMAGE = "/ding-director.jpg";

interface AboutSectionProps {
  onNavigate?: (sectionId: string) => void;
}

export const AboutSection: React.FC<AboutSectionProps> = () => {
  const [imgSrc, setImgSrc] = useState(DING_DIRECTOR_IMAGE);

  const storyItems = [
    {
      icon: <Monitor className="w-5 h-5" strokeWidth={1.8} />,
      content: (
        <>
          저는 <strong className="text-[#580096] font-semibold">15년</strong> 동안 방송국 디자이너로 일했고,<br />
          지금은 <strong className="text-[#580096] font-semibold">500명 이상의 수강생</strong>과 함께 디자인을 통해<br className="hidden sm:inline" />
          수익과 성장을 만들어가는 일을 하고 있어요.
        </>
      ),
    },
    {
      icon: <PenTool className="w-5 h-5" strokeWidth={1.8} />,
      content: (
        <>
          회사에 다닐 땐, 새벽 4시에 일어나 로고디자인 부업을 하고<br />
          아이 어린이집 보내고, 정신없이 출근을 하기도 했습니다.
        </>
      ),
    },
    {
      icon: <BarChart3 className="w-5 h-5" strokeWidth={1.8} />,
      content: (
        <>
          그렇게 틈틈히 만든 포트폴리오로 크몽에 로고디자인 서비스를 등록했고,<br />
          어느새 <strong className="text-[#580096] font-semibold">누적 175건 이상의 프로젝트</strong>를 진행하게 되었습니다.<br />
          부업이 사업으로 성장해, 현재는 퇴사까지 하게되었습니다.
        </>
      ),
    },
    {
      icon: <Star className="w-5 h-5" strokeWidth={1.8} />,
      content: (
        <>
          처음엔 디자인을 나만 잘하면 된다고 생각했지만,<br />
          나의 경험과 노하우를 통해 누군가의 시작을 도와줄 수 있다는 사실을 알게 되면서<br className="hidden sm:inline" />
          강의를 시작하게 되었어요.
        </>
      ),
    },
    {
      icon: <Heart className="w-5 h-5" strokeWidth={1.8} />,
      content: (
        <div className="space-y-1">
          <p>“딩마녀님 수업 듣고 인생이 바뀌었어요” 라고 많은 수강생 분들이 말씀하십니다.</p>
          <p>여러분도 디자인으로 인생의 전환점을 만드시길 바랍니다.</p>
          <p className="text-[#580096] font-semibold">당신의 가능성을 딩마녀가 진심으로 응원합니다.</p>
        </div>
      ),
      isLast: true,
    },
  ];

  return (
    <section
      id="about"
      className="relative py-20 sm:py-28 bg-[#FAFAFC] overflow-hidden border-b border-slate-100"
    >
      {/* Soft lavender curved blob on the left background */}
      <div 
        className="absolute -left-[15%] -top-[10%] w-[55%] h-[120%] bg-[#E8E5F7] rounded-r-[50%] pointer-events-none opacity-80"
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          
          {/* Left Column: 딩마녀 사진 카드 with Clean Fade In */}
          <div className="lg:col-span-5 flex justify-center">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-sm sm:max-w-md bg-white rounded-[2.5rem] p-3 sm:p-4 shadow-2xl shadow-purple-900/5 border border-purple-100/60 transition-shadow duration-300 hover:shadow-purple-900/15"
            >
              {/* Vertical DINGWITCH tag on top-left of image */}
              <div className="absolute top-8 left-6 z-20 flex flex-col items-center gap-2 pointer-events-none select-none">
                <span className="text-[#7E14C8] text-xs">✦</span>
                <span className="text-[10px] font-bold tracking-[0.3em] text-[#8C7DA7] uppercase [writing-mode:vertical-lr]">
                  DINGWITCH
                </span>
              </div>

              {/* Portrait Image Container */}
              <div className="relative aspect-[3.8/5] rounded-[2rem] overflow-hidden bg-slate-50 group">
                <img
                  src={imgSrc}
                  alt="디자이너 딩마녀"
                  referrerPolicy="no-referrer"
                  onError={() => setImgSrc(FALLBACK_DIRECTOR_IMAGE)}
                  className="w-full h-full object-cover object-top filter contrast-[1.02] group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </motion.div>
          </div>

          {/* Right Column: 스토리 및 메시지 */}
          <div className="lg:col-span-7 space-y-7">
            
            {/* Header / Main Headline with Sparkle */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-3"
            >
              <div className="text-[#580096]">
                <svg className="w-6 h-6 fill-current text-[#580096]" viewBox="0 0 24 24">
                  <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
                </svg>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold tracking-tight text-slate-900 leading-[1.3]">
                디자인으로 인생의<br />
                <span className="text-[#580096]">전환점</span>을 함께 만듭니다.
              </h2>
            </motion.div>

            {/* Structured Story List with Staggered Motion */}
            <div className="space-y-4 pt-1">
              {storyItems.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{ duration: 0.6, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  className={`flex items-start gap-4 sm:gap-5 pb-4 transition-transform duration-200 ${
                    item.isLast ? 'pt-0.5' : 'border-b border-dashed border-slate-200'
                  }`}
                >
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#F0ECF9] flex items-center justify-center text-[#6A169C] shrink-0 mt-0.5 shadow-sm group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <div className="text-slate-800 text-[15px] sm:text-[16px] leading-relaxed font-normal">
                    {item.content}
                  </div>
                </motion.div>
              ))}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};


