import React, { useEffect, useState, useRef } from 'react';
import { Users, Star, Sparkles, Award } from 'lucide-react';
import { motion } from 'motion/react';
import { STATS_DATA } from '../data/mockData';
import { StatItem } from '../types';

export const StatsCounter: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isScrolledIn, setIsScrolledIn] = useState(false);
  const [counts, setCounts] = useState<{ [key: string]: number }>({
    students: 0,
    rating: 0,
    followers: 0,
    projects: 0,
  });
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    const handleScrollOrResize = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight;

      // Trigger animation when the section has scrolled into the comfortable viewport reading area
      // (top of section is in the upper 70% of viewport, and bottom hasn't completely left)
      const inViewZone = rect.top <= viewportHeight * 0.70 && rect.bottom >= viewportHeight * 0.15;
      
      // Prevent premature triggering on initial page load at scrollY=0 for tall screens
      const hasActuallyScrolled = window.scrollY > 30 || rect.top < viewportHeight * 0.45;

      if (inViewZone && hasActuallyScrolled) {
        setIsScrolledIn(true);
      } else if (rect.top > viewportHeight * 0.85 || window.scrollY < 15) {
        // Reset when user scrolls back up so the animation triggers every time user scrolls to this section
        setIsScrolledIn(false);
      }
    };

    window.addEventListener('scroll', handleScrollOrResize, { passive: true });
    window.addEventListener('resize', handleScrollOrResize, { passive: true });
    
    // Initial check (in case page opened already scrolled down)
    handleScrollOrResize();

    return () => {
      window.removeEventListener('scroll', handleScrollOrResize);
      window.removeEventListener('resize', handleScrollOrResize);
    };
  }, []);

  useEffect(() => {
    if (!isScrolledIn) {
      setCounts({
        students: 0,
        rating: 0,
        followers: 0,
        projects: 0,
      });
      setIsCompleted(false);
      return;
    }

    const duration = 1500; // ms
    const startTime = performance.now();
    let animFrameId: number;

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Continuous smooth easeOutCubic deceleration
      const ease = 1 - Math.pow(1 - progress, 3);

      const nextCounts: { [key: string]: number } = {};
      STATS_DATA.forEach((stat) => {
        if (stat.id === 'rating') {
          nextCounts[stat.id] = Number((stat.value * ease).toFixed(1));
        } else {
          nextCounts[stat.id] = Math.floor(stat.value * ease);
        }
      });

      setCounts(nextCounts);

      if (progress < 1) {
        animFrameId = requestAnimationFrame(animate);
      } else {
        const finalCounts: { [key: string]: number } = {};
        STATS_DATA.forEach((stat) => {
          finalCounts[stat.id] = stat.value;
        });
        setCounts(finalCounts);
        setIsCompleted(true);
      }
    };

    animFrameId = requestAnimationFrame(animate);

    return () => {
      if (animFrameId) cancelAnimationFrame(animFrameId);
    };
  }, [isScrolledIn]);

  const CARD_THEMES: Record<string, {
    gradient: string;
    glow: string;
    iconBg: string;
    accent: string;
    borderGlow: string;
  }> = {
    students: {
      gradient: 'bg-gradient-to-br from-[#3b0764] via-[#580096] to-[#7e14c8]',
      glow: 'bg-purple-300/20',
      iconBg: 'bg-white/15 border-white/25',
      accent: 'text-amber-300',
      borderGlow: 'hover:border-purple-300/60',
    },
    rating: {
      gradient: 'bg-gradient-to-br from-[#4a044e] via-[#580096] to-[#a21caf]',
      glow: 'bg-amber-300/20',
      iconBg: 'bg-amber-400/20 border-amber-300/40',
      accent: 'text-amber-300',
      borderGlow: 'hover:border-amber-300/60',
    },
    followers: {
      gradient: 'bg-gradient-to-br from-[#2e1065] via-[#580096] to-[#4338ca]',
      glow: 'bg-indigo-300/20',
      iconBg: 'bg-white/15 border-white/25',
      accent: 'text-amber-300',
      borderGlow: 'hover:border-indigo-300/60',
    },
    projects: {
      gradient: 'bg-gradient-to-br from-[#3b0764] via-[#6b09b5] to-[#c026d3]',
      glow: 'bg-fuchsia-300/20',
      iconBg: 'bg-white/15 border-white/25',
      accent: 'text-amber-300',
      borderGlow: 'hover:border-fuchsia-300/60',
    },
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Users':
        return <Users className="w-5 h-5 text-white group-hover:scale-110 transition-transform duration-300" />;
      case 'Star':
        return <Star className="w-5 h-5 text-amber-300 fill-amber-300 group-hover:scale-110 transition-transform duration-300" />;
      case 'Sparkles':
        return <Sparkles className="w-5 h-5 text-amber-200 group-hover:scale-110 transition-transform duration-300" />;
      case 'Award':
        return <Award className="w-5 h-5 text-purple-100 group-hover:scale-110 transition-transform duration-300" />;
      default:
        return <Sparkles className="w-5 h-5 text-white group-hover:scale-110 transition-transform duration-300" />;
    }
  };

  const formatDisplayValue = (stat: StatItem, currentVal: number) => {
    if (stat.id === 'followers') {
      if (currentVal >= 10000) return '1만';
      if (currentVal === 0) return '0';
      return currentVal.toLocaleString();
    }
    if (stat.id === 'rating') {
      return currentVal.toFixed(1);
    }
    return currentVal.toLocaleString();
  };

  return (
    <section
      id="stats-section"
      ref={sectionRef}
      className="relative py-12 sm:py-16 bg-slate-50/90 border-y border-purple-100 overflow-hidden"
    >
      {/* Background glow lines */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-purple-100/30 blur-[130px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 4 Stats Grid Cards with Synchronized Scroll Entrance & Number Animation */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {STATS_DATA.map((stat, idx) => {
            const displayVal = formatDisplayValue(stat, counts[stat.id] ?? 0);
            const theme = CARD_THEMES[stat.id] || {
              gradient: 'bg-gradient-to-br from-[#3b0764] via-[#580096] to-[#7e14c8]',
              glow: 'bg-purple-300/20',
              iconBg: 'bg-white/15 border-white/25',
              accent: 'text-amber-300',
              borderGlow: 'hover:border-purple-300/60',
            };

            return (
              <motion.div
                key={stat.id}
                id={`stat-card-${stat.id}`}
                initial={{ opacity: 0 }}
                animate={
                  isScrolledIn
                    ? { opacity: 1 }
                    : { opacity: 0 }
                }
                transition={{
                  duration: 0.7,
                  delay: idx * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={`relative overflow-hidden group ${theme.gradient} rounded-3xl p-6 sm:p-7 min-h-[160px] sm:min-h-[175px] text-left flex flex-col justify-between border border-white/20 ${theme.borderGlow} shadow-lg shadow-purple-950/15 hover:shadow-2xl hover:shadow-purple-900/25 transition-all duration-300 cursor-default`}
              >
                {/* Decorative background ambient light glow */}
                <div
                  className={`pointer-events-none absolute -top-10 -right-10 w-36 h-36 rounded-full ${theme.glow} blur-2xl group-hover:scale-150 transition-transform duration-500`}
                />
                <div className="pointer-events-none absolute -bottom-10 -left-10 w-32 h-32 rounded-full bg-white/5 blur-xl" />

                {/* Top: Label and Icon */}
                <div className="relative z-10 flex items-center justify-between mb-4">
                  <span className="text-xs sm:text-sm font-semibold tracking-wider text-purple-100/90">
                    {stat.label}
                  </span>
                  <motion.div
                    animate={isCompleted ? { scale: [1, 1.15, 1] } : { scale: 1 }}
                    transition={{ duration: 0.4, delay: idx * 0.08 }}
                    className={`w-11 h-11 rounded-2xl ${theme.iconBg} backdrop-blur-md border shadow-inner flex items-center justify-center transition-all duration-300`}
                  >
                    {getIcon(stat.iconName)}
                  </motion.div>
                </div>

                {/* Bottom: Big Metric Number & Subtitle */}
                <div className="relative z-10 mt-auto pt-2">
                  <div className="flex items-baseline gap-1">
                    {stat.prefix && (
                      <span className={`text-xl sm:text-2xl font-bold ${theme.accent} drop-shadow-sm`}>
                        {stat.prefix}
                      </span>
                    )}
                    <span className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight drop-shadow-sm tabular-nums">
                      {displayVal}
                    </span>
                    <span className={`text-xl sm:text-2xl font-bold ${theme.accent} ml-0.5 drop-shadow-sm`}>
                      {stat.suffix}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
