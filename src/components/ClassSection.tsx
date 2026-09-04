import React, { useState } from 'react';
import { BookOpen, Clock, Sparkles, CheckCircle2, ArrowRight, Star, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';
import { CLASSES_DATA } from '../data/mockData';
import { DesignClass } from '../types';
import { CurriculumModal } from './CurriculumModal';

interface ClassSectionProps {
  onNotify: (msg: string) => void;
  onNavigate?: (pageOrSection: string) => void;
}

export const ClassSection: React.FC<ClassSectionProps> = ({ onNotify, onNavigate }) => {
  const [selectedCourse, setSelectedCourse] = useState<DesignClass | null>(null);

  const handleEnrollSuccess = (courseTitle: string) => {
    onNotify(`'${courseTitle}' 수강 신청이 완료되었습니다! 등록하신 이메일로 수강 안내서가 발송됩니다.`);
  };

  const handleNavigateToPreReg = (courseTitle?: string) => {
    setSelectedCourse(null);
    if (onNavigate) {
      onNavigate('class');
      setTimeout(() => {
        const section = document.getElementById('pre-registration-section');
        if (section) {
          section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 300);
    }
  };

  return (
    <section
      id="class"
      className="relative py-20 sm:py-32 bg-white overflow-hidden border-t border-slate-200/80"
    >
      {/* Background Ambience */}
      <div className="absolute top-1/3 -right-20 w-[500px] h-[500px] bg-purple-100/40 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 -left-20 w-[500px] h-[500px] bg-amber-100/30 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 text-left"
        >
          <h2 className="relative inline-flex items-center text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            <span>CLASS</span>
            <span className="w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full bg-gradient-to-tr from-[#580096] via-[#7B1FA2] to-[#A855F7] -translate-y-3 sm:-translate-y-4 translate-x-1.5" />
          </h2>
        </motion.div>

        {/* Course Cards Grid with Staggered Entrance */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CLASSES_DATA.map((course, idx) => {
            const discountPercent = Math.round((1 - course.discountPrice / course.originalPrice) * 100);

            return (
              <motion.div
                key={course.id}
                id={`class-card-${course.id}`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.8,
                  delay: idx * 0.16,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
                className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-xs hover:shadow-xl hover:border-purple-300 transition-shadow duration-300 flex flex-col justify-between group"
              >
                {/* Card Thumbnail */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      if (course.id === 'logo-masterclass') {
                        (e.currentTarget as HTMLImageElement).src =
                          'https://postfiles.pstatic.net/MjAyNjA5MDNfMTQ3/MDAxNzg4NDE3MDQxNjYw.HptkbrpH0hD00pyypRJR9tQYqtJpgP0nxPRCwvJGN1Yg.2fk4gonxpbrvHy_MpC3iRwzmTjX3yQvtOQ7tX9CZCMcg.PNG/1c5c9bb5-94b1-47d1-8a35-d4779e57a7a2.png?type=w3840';
                      } else if (course.id === 'web-nocode-class') {
                        (e.currentTarget as HTMLImageElement).src =
                          'https://postfiles.pstatic.net/MjAyNjA5MDNfMTg3/MDAxNzg4NDE3MDM5MjA5.iss9iy26fP4JNpzq56PN9wk1j3MCuAXN171x3wsSDhAg.71QJpvzSYTJRESkiXQzAv7Q_LvrKn19Rll4Q1OY7tGAg.PNG/b0da440d-b91a-4f26-a3f9-af617fe09924.png?type=w3840';
                      } else if (course.id === 'personal-branding-class') {
                        (e.currentTarget as HTMLImageElement).src =
                          'https://postfiles.pstatic.net/MjAyNjA5MDNfMjA2/MDAxNzg4NDE3MDM3MjEz.uZ6FaFblZcp52O9f3l25SWiolACAqwgr6_-IGNmt1WUg.YWy7yKHz8PpBYcJ6uwhG1oM_kC3G0gzyQhTAmCMGR5kg.PNG/Frame_1.png?type=w3840';
                      }
                    }}
                  />
                  
                  {/* Meta pill on thumbnail bottom */}
                  <div className="absolute bottom-3 right-3 flex items-center gap-1.5 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-lg text-[11px] font-semibold text-slate-800 border border-slate-200 shadow-xs">
                    <Clock className="w-3 h-3 text-[#580096]" />
                    <span>{course.duration}</span>
                  </div>
                </div>

                {/* Card Content Body */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[11px] font-bold text-[#580096] bg-purple-50 border border-purple-100 px-2 py-0.5 rounded-md">
                        {course.level}
                      </span>
                      <span className="text-xs text-slate-500">
                        총 {course.lessonsCount}강 VOD + 과제 피드백
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#580096] transition-colors leading-snug mb-2">
                      {course.title}
                    </h3>
                    <p className="text-xs text-slate-500 whitespace-pre-line leading-relaxed mb-4">
                      {course.subtitle}
                    </p>
                  </div>

                  {/* Action Button */}
                  <div className="pt-4 border-t border-slate-100">
                    <motion.button
                      id={`class-enroll-btn-${course.id}`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setSelectedCourse(course)}
                      className="w-full py-3 rounded-xl text-sm font-bold text-white bg-[#580096] hover:bg-[#48007d] shadow-sm transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <span>자세히 보기</span>
                      <ArrowRight className="w-4 h-4 text-white" />
                    </motion.button>
                  </div>

                </div>

              </motion.div>
            );
          })}
        </div>

      </div>

      {/* Curriculum Modal */}
      <CurriculumModal
        course={selectedCourse}
        onClose={() => setSelectedCourse(null)}
        onEnrollSuccess={handleEnrollSuccess}
        onNavigateToPreReg={handleNavigateToPreReg}
      />
    </section>
  );
};
