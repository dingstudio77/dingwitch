import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  BookOpen, 
  Clock, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  Star, 
  ShieldCheck, 
  Users, 
  Award, 
  HelpCircle,
  Download,
  MessageCircle,
  Zap,
  PlayCircle
} from 'lucide-react';
import { CLASSES_DATA, REVIEWS_DATA, FAQS_DATA } from '../data/mockData';
import { DesignClass } from '../types';
import { CurriculumModal } from './CurriculumModal';
import { savePreRegistration } from '../utils/storage';
import { triggerSafeConfetti } from '../utils/confetti';

interface ClassPageProps {
  onNotify: (msg: string) => void;
  onNavigateToRequest?: () => void;
}

export const ClassPage: React.FC<ClassPageProps> = ({ onNotify, onNavigateToRequest }) => {
  const [selectedCourse, setSelectedCourse] = useState<DesignClass | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [waitlistModalOpen, setWaitlistModalOpen] = useState(false);
  const [waitlistForm, setWaitlistForm] = useState({
    name: '',
    phone: '',
    email: '',
    selectedClass: CLASSES_DATA[0].title,
    message: '',
  });
  const [waitlistSubmitted, setWaitlistSubmitted] = useState(false);

  // Pre-registration inline section state
  const [preRegForm, setPreRegForm] = useState({
    name: '',
    email: '',
    phone: '',
    targetCourse: '로고디자인',
    message: '',
  });
  const [isSubmittingPreReg, setIsSubmittingPreReg] = useState(false);
  const [preRegSubmitted, setPreRegSubmitted] = useState(false);

  const courseOptions = ['로고디자인', '홈페이지 제작', '바이브코딩', '상세페이지'];

  const handlePreRegSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!preRegForm.name.trim() || !preRegForm.email.trim() || !preRegForm.phone.trim()) {
      onNotify('이름, 이메일, 연락처를 모두 입력해 주세요.');
      return;
    }

    setIsSubmittingPreReg(true);
    setTimeout(() => {
      // Persist to storage
      const savedItem = savePreRegistration({
        name: preRegForm.name,
        email: preRegForm.email,
        phone: preRegForm.phone,
        targetCourse: preRegForm.targetCourse,
        message: preRegForm.message,
      });

      setIsSubmittingPreReg(false);
      setPreRegSubmitted(true);
      triggerSafeConfetti();
      onNotify(`${preRegForm.name} 님의 [${preRegForm.targetCourse}] 정규과정 사전 신청이 완료되었습니다! (선착순 배정 번호: #${savedItem.orderNumber})`);
    }, 600);
  };

  const filterOptions = [
    { id: 'all', label: '전체 클래스' },
    { id: 'logo', label: '로고 & 브랜딩' },
    { id: 'web', label: '아임웹 & 웹디자인' },
    { id: 'vibe', label: 'AI 바이브코딩' },
    { id: 'detail', label: '상세페이지' },
  ];

  const filteredCourses = CLASSES_DATA.filter((course) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'logo') return course.id.includes('logo');
    if (activeFilter === 'web') return course.id.includes('web');
    if (activeFilter === 'detail') return course.id.includes('detail') || course.id.includes('personal');
    if (activeFilter === 'vibe') return course.id.includes('vibe');
    return true;
  });

  const handleNavigateToPreReg = (courseTitle?: string) => {
    if (courseTitle) {
      if (courseTitle.includes('로고')) {
        setPreRegForm((prev) => ({ ...prev, targetCourse: '로고디자인' }));
      } else if (courseTitle.includes('홈페이지') || courseTitle.includes('웹') || courseTitle.includes('아임웹')) {
        setPreRegForm((prev) => ({ ...prev, targetCourse: '홈페이지 제작' }));
      } else if (courseTitle.includes('바이브') || courseTitle.includes('코딩') || courseTitle.includes('AI')) {
        setPreRegForm((prev) => ({ ...prev, targetCourse: '바이브코딩' }));
      } else if (courseTitle.includes('상세페이지') || courseTitle.includes('퍼스널')) {
        setPreRegForm((prev) => ({ ...prev, targetCourse: '상세페이지' }));
      }
    }
    
    // Unlock body scroll immediately so smooth scrolling starts without layout pause
    document.body.style.overflow = 'unset';
    setSelectedCourse(null);

    requestAnimationFrame(() => {
      const section = document.getElementById('pre-registration-section');
      if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setTimeout(() => {
          const nameInput = document.getElementById('prereg-name');
          if (nameInput) {
            nameInput.focus({ preventScroll: true });
          }
        }, 600);
      }
    });
  };

  const handleEnrollSuccess = (courseTitle: string) => {
    onNotify(`'${courseTitle}' 수강 신청이 완료되었습니다! 안내 연락처로 상세 안내문이 발송됩니다.`);
  };

  const handleWaitlistSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!waitlistForm.name || !waitlistForm.phone) {
      onNotify('이름과 연락처를 입력해 주세요.');
      return;
    }
    setWaitlistSubmitted(true);
    setTimeout(() => {
      onNotify(`${waitlistForm.name} 님의 '${waitlistForm.selectedClass}' 대기 신청이 접수되었습니다!`);
      setWaitlistModalOpen(false);
      setWaitlistSubmitted(false);
      setWaitlistForm({
        name: '',
        phone: '',
        email: '',
        selectedClass: CLASSES_DATA[0].title,
        message: '',
      });
    }, 1500);
  };

  return (
    <div id="class-page-container" className="pt-24 pb-24 bg-white text-slate-900 animate-in fade-in duration-300">
      
      {/* 1. Page Header Hero */}
      <section className="relative py-12 sm:py-20 bg-gradient-to-b from-purple-50/70 via-white to-white overflow-hidden border-b border-slate-100">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-200/40 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-amber-100/40 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-100/80 border border-purple-200 text-[#580096] text-xs font-bold mb-5 shadow-xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>딩마녀의 정규과정 소개</span>
          </div>

          <h1 className="text-[32px] sm:text-[40px] font-bold text-slate-900 tracking-tight leading-tight mb-8">
            왕초보도 가능!<br />
            <span className="text-[32px] sm:text-[44px] lg:text-[48px] font-bold bg-gradient-to-r from-[#580096] via-[#7B1FA2] to-[#A855F7] bg-clip-text text-transparent inline-block mt-2">
              4주 만에<br />
              디자인 기초부터 포트폴리오 완성까지
            </span>
          </h1>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto pt-4">
            <div className="p-4 rounded-2xl bg-white border border-purple-100 shadow-xs text-center">
              <div className="text-2xl font-black text-[#580096]">500명+</div>
              <div className="text-xs text-slate-500 font-medium mt-0.5">누적 수강생</div>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-purple-100 shadow-xs text-center">
              <div className="text-2xl font-black text-amber-500">⭐ 5.0/5.0</div>
              <div className="text-xs text-slate-500 font-medium mt-0.5">수강 만족도</div>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-purple-100 shadow-xs text-center">
              <div className="text-2xl font-black text-[#580096]">1:1 밀착</div>
              <div className="text-xs text-slate-500 font-medium mt-0.5">딩마녀 과제 피드백</div>
            </div>
          </div>

        </div>
      </section>

      {/* 2. Course Filter & Course Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        <div className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            정규과정 소개
          </h2>
        </div>

        {/* Course Cards Detailed Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredCourses.map((course, idx) => {
            const discountPercent = Math.round((1 - course.discountPrice / course.originalPrice) * 100);

            return (
              <motion.div
                key={course.id}
                id={`course-detail-card-${course.id}`}
                initial={{ opacity: 0, y: 45 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.75,
                  delay: idx * 0.15,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-purple-300 transition-all duration-300 flex flex-col overflow-hidden group"
              >
                {/* Card Top Image & Badge */}
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-100">
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
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  {/* Badge top left */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-400 text-slate-950 shadow-sm">
                      {course.badge || '정규과정'}
                    </span>
                  </div>

                  {/* Level & Duration bottom left */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white text-xs font-semibold">
                    <span className="bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/20">
                      난이도: {course.level}
                    </span>
                    <span className="bg-[#580096]/80 backdrop-blur-md px-2.5 py-1 rounded-lg border border-purple-300/30 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {course.duration} ({course.lessonsCount}강 VOD)
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-black text-slate-900 group-hover:text-[#580096] transition-colors leading-snug mb-2">
                      {course.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed whitespace-pre-line mb-6">
                      {course.subtitle}
                    </p>

                    {/* Target Audience Bullet list */}
                    <div className="space-y-2">
                      <div className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                        <span>이런 분들에게 추천합니다</span>
                      </div>
                      <div className="space-y-1.5">
                        {course.targetAudience.slice(0, 3).map((target, idx) => (
                          <div key={idx} className="flex items-start gap-2 text-xs text-slate-600">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#580096] shrink-0 mt-0.5" />
                            <span>{target}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Pricing & CTA Buttons */}
                  <div className="mt-8 sm:mt-10 pt-6 border-t border-slate-100 flex flex-col gap-4">
                    <div className="flex items-baseline justify-between">
                      <div>
                        <span className="text-xs text-slate-400 line-through mr-2">
                          {course.originalPrice.toLocaleString()}원
                        </span>
                        <span className="text-2xl font-black text-[#580096]">
                          {course.discountPrice.toLocaleString()}원
                        </span>
                      </div>
                      <span className="text-xs font-bold text-red-600 bg-red-50 border border-red-200 px-2.5 py-0.5 rounded-full">
                        {discountPercent}% 특별할인
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2.5">
                      <button
                        id={`view-curriculum-btn-${course.id}`}
                        onClick={() => setSelectedCourse(course)}
                        className="py-3 px-4 rounded-xl text-xs sm:text-sm font-bold text-[#580096] bg-purple-50 hover:bg-purple-100 border border-purple-200 transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                      >
                        <BookOpen className="w-4 h-4" />
                        <span>커리큘럼</span>
                      </button>
                      <button
                        id={`apply-course-btn-${course.id}`}
                        onClick={() => handleNavigateToPreReg(course.title)}
                        className="py-3 px-4 rounded-xl text-xs sm:text-sm font-bold text-white bg-[#580096] hover:bg-[#48007d] shadow-sm transition-all cursor-pointer flex items-center justify-center gap-1.5 active:scale-[0.98]"
                      >
                        <span>사전 신청하기</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                </div>
              </motion.div>
            );
          })}
        </div>

      </section>

      {/* 3. Student Outcomes & Testimonials (Slow continuous marquee stream) */}
      <section className="py-20 bg-slate-50/60 border-t border-slate-200/80 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 text-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            수강생들이 증명하는 리얼 수기
          </h2>
        </div>

        {/* Continuous Slow Glide Review Track */}
        <div className="relative w-full overflow-hidden">
          {/* Side Fade Masks */}
          <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none" />

          {/* Scrolling Viewport with generous bottom padding so hover shadows don't clip */}
          <div
            className="overflow-x-auto scrollbar-none pt-4 pb-14 sm:pb-16"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            <div
              className="flex gap-6 px-6 py-1 animate-marquee-slow hover:[animation-play-state:paused]"
              style={{ width: 'max-content' }}
            >
              {[...REVIEWS_DATA, ...REVIEWS_DATA].map((review, idx) => (
                <div
                  key={`${review.id}-${idx}`}
                  className="w-[340px] sm:w-[420px] shrink-0 p-6 sm:p-7 rounded-2xl bg-white border border-slate-200 shadow-xs hover:shadow-xl hover:shadow-purple-950/10 hover:border-purple-300 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-purple-50 text-[#580096] border border-purple-200">
                        {review.courseName}
                      </span>
                      <div className="flex items-center gap-0.5 text-amber-400 text-xs shrink-0">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                        ))}
                      </div>
                    </div>
                    <h4 className="text-sm sm:text-base font-bold text-slate-900 mb-2 leading-snug">
                      "{review.highlight}"
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed whitespace-pre-line mb-4">
                      {review.content}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 pt-4 mt-4 border-t border-slate-100">
                    <img
                      src={review.avatar}
                      alt={review.author}
                      className="w-9 h-9 rounded-full object-cover border border-purple-200"
                    />
                    <div>
                      <div className="text-xs font-bold text-slate-900">{review.author}</div>
                      {review.role && (
                        <div className="text-[11px] text-purple-700">{review.role}</div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. Pre-registration (사전 신청하기) Section */}
      <section id="pre-registration-section" className="py-20 bg-gradient-to-b from-white via-purple-50/40 to-white border-t border-slate-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-3.5">
              사전 신청하기
            </h2>
            <p className="text-sm sm:text-base text-slate-600 font-medium max-w-xl mx-auto leading-relaxed">
              정규강의 일정이 확정되면 가장 먼저 안내드리고,<br className="hidden sm:block" />
              <strong className="text-[#580096] font-bold"> 정원은 10명 신청 순서대로 배정</strong>합니다.
            </p>
          </div>

          {/* Form Box */}
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-xl shadow-purple-950/5 relative overflow-hidden">
            {/* Top Accent Gradient Line */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#580096] via-[#7B1FA2] to-amber-400" />

            {preRegSubmitted ? (
              <div className="py-12 text-center animate-in zoom-in-95 duration-300">
                <div className="w-16 h-16 rounded-full bg-purple-100 text-[#580096] flex items-center justify-center mx-auto mb-5">
                  <CheckCircle2 className="w-9 h-9" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">
                  사전 신청이 완료되었습니다!
                </h3>
                <p className="text-sm text-slate-600 max-w-md mx-auto mb-6 leading-relaxed">
                  <strong>{preRegForm.name}</strong> 님, <strong>[{preRegForm.targetCourse}]</strong> 과정의 사전 등록이 정상 접수되었습니다. 일정 확정 시 입력해주신 연락처(<strong>{preRegForm.phone}</strong>)와 이메일로 우선 안내드리겠습니다.
                </p>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs font-bold">
                  <span>✦ 선착순 10명 우선 배정 대기 순번이 등록되었습니다.</span>
                </div>
                <div className="mt-8">
                  <button
                    type="button"
                    onClick={() => {
                      setPreRegSubmitted(false);
                      setPreRegForm({
                        name: '',
                        email: '',
                        phone: '',
                        targetCourse: '로고디자인',
                        message: '',
                      });
                    }}
                    className="px-6 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-50 text-xs font-semibold text-slate-700 transition-all cursor-pointer"
                  >
                    추가 신청하기
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handlePreRegSubmit} className="space-y-6">
                
                {/* 1. 신청하고 싶은 강의 (Radio / Pill Cards) */}
                <div>
                  <label className="block text-xs sm:text-sm font-bold text-slate-900 mb-2.5">
                    신청하고 싶은 강의 <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {courseOptions.map((courseName) => {
                      const isSelected = preRegForm.targetCourse === courseName;
                      return (
                        <button
                          key={courseName}
                          type="button"
                          onClick={() => setPreRegForm({ ...preRegForm, targetCourse: courseName })}
                          className={`p-3 sm:py-3.5 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1.5 ${
                            isSelected
                              ? 'bg-purple-50/80 border-[#580096] text-[#580096] font-bold shadow-xs ring-2 ring-[#580096]/20'
                              : 'bg-slate-50/70 border-slate-200 text-slate-700 hover:bg-slate-100/80 hover:border-slate-300 font-medium'
                          }`}
                        >
                          <span className="text-xs sm:text-sm leading-tight">{courseName}</span>
                          {isSelected ? (
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#580096]" />
                          ) : (
                            <span className="w-3.5 h-3.5 rounded-full border border-slate-300 inline-block" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 2. 이름 */}
                <div>
                  <label htmlFor="prereg-name" className="block text-xs sm:text-sm font-bold text-slate-900 mb-1.5">
                    이름 <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="prereg-name"
                    type="text"
                    required
                    placeholder="이름을 입력해 주세요 (예: 홍길동)"
                    value={preRegForm.name}
                    onChange={(e) => setPreRegForm({ ...preRegForm, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#580096] focus:ring-2 focus:ring-purple-100 transition-all bg-slate-50/50 hover:bg-white focus:bg-white"
                  />
                </div>

                {/* 3. 이메일 */}
                <div>
                  <label htmlFor="prereg-email" className="block text-xs sm:text-sm font-bold text-slate-900 mb-1.5">
                    이메일 <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="prereg-email"
                    type="email"
                    required
                    placeholder="이메일 주소를 입력해 주세요 (예: user@example.com)"
                    value={preRegForm.email}
                    onChange={(e) => setPreRegForm({ ...preRegForm, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#580096] focus:ring-2 focus:ring-purple-100 transition-all bg-slate-50/50 hover:bg-white focus:bg-white"
                  />
                </div>

                {/* 4. 연락처 */}
                <div>
                  <label htmlFor="prereg-phone" className="block text-xs sm:text-sm font-bold text-slate-900 mb-1.5">
                    연락처 <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="prereg-phone"
                    type="tel"
                    required
                    placeholder="연락처를 입력해 주세요 (예: 010-1234-5678)"
                    value={preRegForm.phone}
                    onChange={(e) => setPreRegForm({ ...preRegForm, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#580096] focus:ring-2 focus:ring-purple-100 transition-all bg-slate-50/50 hover:bg-white focus:bg-white"
                  />
                </div>

                {/* 5. 딩마녀에게 하고싶은 말 */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label htmlFor="prereg-message" className="block text-xs sm:text-sm font-bold text-slate-900">
                      딩마녀에게 하고싶은 말
                    </label>
                    <span className="text-[11px] text-slate-400 font-medium">선택 사항</span>
                  </div>
                  <textarea
                    id="prereg-message"
                    rows={3}
                    placeholder="현재 실력 수준, 배우고 싶은 방향, 고민 등 딩마녀에게 전하고 싶은 이야기를 자유롭게 남겨주세요."
                    value={preRegForm.message}
                    onChange={(e) => setPreRegForm({ ...preRegForm, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#580096] focus:ring-2 focus:ring-purple-100 transition-all bg-slate-50/50 hover:bg-white focus:bg-white resize-none"
                  />
                </div>

                {/* Privacy & Quota Notice */}
                <div className="p-3.5 rounded-xl bg-purple-50/60 border border-purple-100 text-xs text-purple-900 flex items-start gap-2.5 leading-relaxed">
                  <ShieldCheck className="w-4 h-4 text-[#580096] shrink-0 mt-0.5" />
                  <span>
                    수집된 개인정보는 정규강의 일정 안내 및 선착순 10명 정원 배정 목적으로만 사용되며, 일정 안내 후 안전하게 관리됩니다.
                  </span>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmittingPreReg}
                  className="w-full py-4 px-6 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-sm sm:text-base shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                >
                  {isSubmittingPreReg ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                      <span>신청 접수 중...</span>
                    </div>
                  ) : (
                    <>
                      <span>사전 신청하기</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Curriculum Modal */}
      <CurriculumModal
        course={selectedCourse}
        onClose={() => setSelectedCourse(null)}
        onEnrollSuccess={handleEnrollSuccess}
        onNavigateToPreReg={handleNavigateToPreReg}
      />

      {/* Waitlist Modal */}
      {waitlistModalOpen && (
        <div
          id="waitlist-modal"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setWaitlistModalOpen(false)}
        >
          <div
            className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-2xl text-left"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-bold text-slate-900 mb-1">
              정규과정 상시 대기 신청
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              정규과정이 오픈되면 가장 먼저 할인 혜택 및 수강 안내 문자를 보내드립니다.
            </p>

            <form onSubmit={handleWaitlistSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  관심 클래스 <span className="text-red-500">*</span>
                </label>
                <select
                  value={waitlistForm.selectedClass}
                  onChange={(e) => setWaitlistForm({ ...waitlistForm, selectedClass: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:border-[#580096]"
                >
                  {CLASSES_DATA.map((c) => (
                    <option key={c.id} value={c.title}>
                      {c.title}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  성함 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="예: 홍길동"
                  value={waitlistForm.name}
                  onChange={(e) => setWaitlistForm({ ...waitlistForm, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:border-[#580096]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  연락처 (휴대폰 번호) <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  placeholder="예: 010-1234-5678"
                  value={waitlistForm.phone}
                  onChange={(e) => setWaitlistForm({ ...waitlistForm, phone: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:border-[#580096]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  이메일 주소 (선택)
                </label>
                <input
                  type="email"
                  placeholder="example@email.com"
                  value={waitlistForm.email}
                  onChange={(e) => setWaitlistForm({ ...waitlistForm, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:border-[#580096]"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setWaitlistModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
                >
                  취소
                </button>
                <button
                  type="submit"
                  disabled={waitlistSubmitted}
                  className="px-6 py-2.5 rounded-xl text-xs font-bold bg-[#580096] text-white hover:bg-[#48007d] disabled:opacity-50"
                >
                  {waitlistSubmitted ? '접수 중...' : '대기 등록 완료'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
