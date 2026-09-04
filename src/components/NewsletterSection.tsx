import React from 'react';
import { Send, ExternalLink } from 'lucide-react';
import { motion } from 'motion/react';
import { triggerSafeConfetti } from '../utils/confetti';

interface NewsletterSectionProps {
  onNotify: (msg: string) => void;
}

export const NewsletterSection: React.FC<NewsletterSectionProps> = ({ onNotify }) => {
  const STIBEE_SUBSCRIBE_URL = 'https://dingwitch.stibee.com/subscribe';

  const handleSubscribeClick = () => {
    triggerSafeConfetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.7 },
    });

    window.open(STIBEE_SUBSCRIBE_URL, '_blank', 'noopener,noreferrer');
    onNotify('스티비 뉴스레터 구독 페이지로 이동합니다.');
  };

  return (
    <section
      id="newsletter-section"
      className="relative py-12 sm:py-16 bg-white overflow-hidden"
    >
      {/* Decorative glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[250px] bg-purple-100/40 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-3xl bg-gradient-to-br from-[#8B5CF6] via-[#7C3AED] to-[#580096] px-6 py-6 sm:px-10 sm:py-8 lg:px-12 lg:py-9 border border-purple-300/40 shadow-2xl shadow-purple-900/15 overflow-hidden"
        >
          
          {/* Luminous background ambient lights */}
          <div className="absolute -top-16 -right-16 w-60 h-60 bg-white/20 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-16 -left-16 w-60 h-60 bg-amber-300/20 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.15)_0%,_transparent_70%)] pointer-events-none" />

          <div className="relative z-10 flex flex-row items-center justify-between gap-4 sm:gap-8">
            {/* Left Content Area */}
            <div className="flex-1 text-left min-w-0">
              {/* Main Headline */}
              <h2 className="text-lg sm:text-2xl md:text-3xl lg:text-[32px] font-black text-white tracking-tight leading-snug sm:leading-snug mb-4 sm:mb-5 drop-shadow-xs">
                뉴스레터를 구독하시면 <br />
                <span className="text-[#FEF08A] drop-shadow-xs">AI디자인 / 디자인 사업 / 무료특강 공지</span>를 <br />
                받아보실 수 있습니다
              </h2>

              {/* Direct CTA Button with Spring Hover & Tap */}
              <div className="flex justify-start">
                <motion.a
                  id="newsletter-subscribe-btn"
                  href={STIBEE_SUBSCRIBE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={(e) => {
                    e.preventDefault();
                    handleSubscribeClick();
                  }}
                  className="group inline-flex items-center justify-center gap-2 px-5 py-2.5 sm:px-7 sm:py-3.5 rounded-xl sm:rounded-2xl font-black text-xs sm:text-base bg-white hover:bg-white/95 text-[#6D28D9] shadow-lg hover:shadow-xl shadow-purple-950/20 transition-colors cursor-pointer whitespace-nowrap"
                >
                  <span>무료 구독하기</span>
                  <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5 text-[#6D28D9] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </motion.a>
              </div>
            </div>

            {/* Right Character Image with Flying Broomstick Levitation */}
            <div className="w-28 sm:w-44 md:w-52 lg:w-60 shrink-0 flex items-center justify-center relative self-center">
              <motion.img
                src="https://postfiles.pstatic.net/MjAyNjA5MDFfOTgg/MDAxNzg4MjMwMDA5Nzg5.kfhlJw9opH8LEcV_lDUSWH9-CB2ORD3lCKqERpzGvt4g.FR67pB6eNq4oKbmeb_j-XtyYCeNZPPWPts6I2z_InyMg.PNG/%EB%94%A9%EB%A7%88%EB%85%80_%EC%BA%90%EB%A6%AD%ED%84%B0_%EB%B9%97%EC%9E%90%EB%A3%A8.png?type=w3840"
                alt="딩마녀 빗자루 캐릭터"
                animate={{
                  y: [-5, 6, -5],
                  rotate: [-1.5, 2, -1.5],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="relative z-10 w-full max-h-40 sm:max-h-56 lg:max-h-64 object-contain pointer-events-none select-none drop-shadow-md"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

        </motion.div>
      </div>
    </section>
  );
};

