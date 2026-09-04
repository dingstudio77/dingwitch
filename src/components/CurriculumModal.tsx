import React, { useEffect, useState } from 'react';
import { X, CheckCircle2, Clock, BookOpen, Sparkles, ShieldCheck, ArrowRight } from 'lucide-react';
import { triggerSafeConfetti } from '../utils/confetti';
import { DesignClass } from '../types';

interface CurriculumModalProps {
  course: DesignClass | null;
  onClose: () => void;
  onEnrollSuccess?: (courseTitle: string) => void;
  onNavigateToPreReg?: (courseTitle?: string) => void;
}

export const CurriculumModal: React.FC<CurriculumModalProps> = ({ 
  course, 
  onClose, 
  onEnrollSuccess,
  onNavigateToPreReg 
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (course) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [course, onClose]);

  if (!course) return null;

  const handleEnrollClick = () => {
    if (onNavigateToPreReg) {
      onNavigateToPreReg(course.title);
    } else {
      onClose();
      const preRegEl = document.getElementById('pre-registration-section');
      if (preRegEl) {
        preRegEl.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div
      id="curriculum-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white border border-slate-200 rounded-3xl shadow-2xl text-left my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          id="close-curriculum-modal-btn"
          onClick={onClose}
          className="absolute top-5 right-5 z-20 p-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Course Banner */}
        <div className="p-6 sm:p-8 border-b border-purple-100 bg-gradient-to-r from-purple-50 via-purple-100/40 to-purple-50">
          <div className="flex items-center gap-2 mb-3">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-400 text-slate-950">
              {course.badge || '클래스'}
            </span>
            <span className="text-xs text-purple-900 font-semibold flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> {course.duration}
            </span>
            <span className="text-xs text-purple-900 font-semibold flex items-center gap-1">
              <BookOpen className="w-3.5 h-3.5" /> {course.lessonsCount}강 VOD
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug mb-2">
            {course.title}
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            {course.subtitle}
          </p>

          {/* Pricing bar */}
          <div className="flex items-baseline gap-3 mt-4 pt-4 border-t border-purple-200/60">
            <span className="text-2xl sm:text-3xl font-black text-[#580096]">
              {course.discountPrice.toLocaleString()}원
            </span>
            <span className="text-sm line-through text-slate-400">
              {course.originalPrice.toLocaleString()}원
            </span>
            <span className="text-xs font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded-full border border-red-200">
              {Math.round((1 - course.discountPrice / course.originalPrice) * 100)}% 할인
            </span>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-8">
          
          {/* Target Audience */}
          <div>
            <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>이런 분께 강력 추천합니다</span>
            </h3>
            <div className="grid grid-cols-1 gap-2.5">
              {course.targetAudience.map((target, idx) => (
                <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-purple-50/60 border border-purple-200/70 text-sm text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <span>{target}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Week-by-Week Syllabus */}
          <div>
            <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#580096]" />
              <span>주차별 상세 커리큘럼</span>
            </h3>
            <div className="space-y-3">
              {course.curriculum.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 sm:p-4.5 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-purple-300 hover:bg-purple-50/20 transition-all"
                >
                  <div className="flex items-start gap-3">
                    <span className="px-2.5 py-1 rounded-lg text-xs font-extrabold bg-purple-100 text-[#580096] border border-purple-200 shrink-0 mt-0.5">
                      {item.week}
                    </span>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-bold text-slate-900 leading-snug">
                        {item.title}
                      </h4>
                      {item.description && (
                        <p className="mt-1.5 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                          {item.description}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bonus Features: 정규강의를 들으면 얻을 수 있는 혜택 */}
          <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-amber-50/90 via-amber-50/50 to-orange-50/60 border border-amber-200/90 shadow-xs">
            <h3 className="text-sm sm:text-base font-extrabold text-amber-950 mb-3.5 flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-amber-400/30 border border-amber-300 flex items-center justify-center text-amber-800 shrink-0">
                <ShieldCheck className="w-4 h-4 text-amber-700" />
              </div>
              <span>정규강의를 들으면 얻을 수 있는 혜택</span>
            </h3>

            <div className="flex flex-col gap-2 pt-1">
              {course.features.map((feature, i) => {
                // Parse benefit title and value (e.g., "(120만 원 상당)" or "(50만 원)")
                const match = feature.match(/^(.*?)\s*(\([^)]+\))$/);
                const title = match ? match[1] : feature;
                const value = match && match[2] ? match[2].replace(/[()]/g, '') : null;

                return (
                  <div
                    key={i}
                    className="p-3 sm:px-4 sm:py-3 rounded-xl bg-white/95 border border-amber-200/80 hover:border-amber-400 hover:shadow-xs transition-all flex items-center justify-between gap-3 text-xs sm:text-sm text-slate-800"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="text-amber-500 font-bold text-sm leading-none shrink-0">✦</span>
                      <span className="font-semibold leading-normal text-slate-800 truncate sm:whitespace-normal">{title}</span>
                    </div>
                    {value && (
                      <span className="shrink-0 px-2.5 py-1 rounded-md bg-amber-100/90 text-amber-900 font-bold text-xs border border-amber-200 whitespace-nowrap">
                        {value}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Action Button / Enrollment confirmation */}
          <div className="pt-4 border-t border-slate-200 flex items-center justify-end">
            <button
              id="modal-enroll-submit-btn"
              onClick={handleEnrollClick}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold text-sm bg-amber-400 hover:bg-amber-300 text-slate-950 shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98]"
            >
              <span>사전 신청하기</span>
              <ArrowRight className="w-4 h-4 text-slate-950" />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
