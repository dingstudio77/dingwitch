import React, { useState, useRef } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote, Sparkles, MessageSquarePlus, Pause, Play } from 'lucide-react';
import { motion } from 'motion/react';
import { REVIEWS_DATA } from '../data/mockData';
import { StudentReview } from '../types';
import { triggerSafeConfetti } from '../utils/confetti';

interface ReviewSectionProps {
  onNotify: (msg: string) => void;
}

// Mask author name or preserve pre-formatted author with age/gender
const formatMaskedName = (name: string) => {
  if (!name) return '수강생 님';
  if (name.includes('*') || name.includes('(')) {
    return name;
  }
  const clean = name.replace(/\s*님$/, '').trim();
  if (!clean) return '수강생 님';
  if (clean.length === 1) return `${clean} 님`;
  if (clean.length === 2) return `${clean[0]}* 님`;
  return `${clean[0]}** 님`;
};

export const ReviewSection: React.FC<ReviewSectionProps> = ({ onNotify }) => {
  const [reviewsList, setReviewsList] = useState<StudentReview[]>(REVIEWS_DATA);
  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Review form state
  const [authorName, setAuthorName] = useState('');
  const [courseChoice, setCourseChoice] = useState('왕초보 로고 & 브랜딩 마스터클래스');
  const [ratingScore, setRatingScore] = useState(5);
  const [highlightText, setHighlightText] = useState('');
  const [reviewContent, setReviewContent] = useState('');

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -420, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 420, behavior: 'smooth' });
    }
  };

  const handleWriteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName || !reviewContent || !highlightText) {
      alert('후기 내용과 이름을 모두 입력해 주세요.');
      return;
    }

    const newRev: StudentReview = {
      id: `custom-rev-${Date.now()}`,
      author: authorName,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      courseName: courseChoice,
      rating: ratingScore,
      date: '방금 전',
      highlight: highlightText,
      content: reviewContent,
    };

    setReviewsList([newRev, ...reviewsList]);
    setIsWriteModalOpen(false);
    triggerSafeConfetti({ particleCount: 60, spread: 60 });
    onNotify('소중한 수강 후기가 성공적으로 등록되었습니다!');
    // Reset form
    setAuthorName('');
    setHighlightText('');
    setReviewContent('');
  };

  // Duplicate reviews for seamless infinite gliding loop
  const displayReviews = [...reviewsList, ...reviewsList];

  return (
    <section
      id="review"
      className="relative py-20 sm:py-32 bg-slate-50/60 border-t border-slate-200/80 overflow-hidden"
    >
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-purple-100/30 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12 sm:mb-16"
        >
          <div>
            <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
              수강생 후기
            </h2>
          </div>

          {/* Actions: Controls */}
          <div className="flex items-center gap-3">
            <button
              id="review-play-pause-btn"
              onClick={() => setIsPaused(!isPaused)}
              title={isPaused ? '슬라이드 재생' : '슬라이드 일시정지'}
              className="p-2.5 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 shadow-xs transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-semibold"
            >
              {isPaused ? (
                <>
                  <Play className="w-3.5 h-3.5 text-[#580096]" />
                  <span className="hidden sm:inline">재생</span>
                </>
              ) : (
                <>
                  <Pause className="w-3.5 h-3.5 text-[#580096]" />
                  <span className="hidden sm:inline">일시정지</span>
                </>
              )}
            </button>

            <div className="flex items-center gap-1.5">
              <button
                id="review-scroll-left-btn"
                onClick={scrollLeft}
                className="p-2.5 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 shadow-xs transition-colors cursor-pointer active:scale-95"
                aria-label="Previous reviews"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                id="review-scroll-right-btn"
                onClick={scrollRight}
                className="p-2.5 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 shadow-xs transition-colors cursor-pointer active:scale-95"
                aria-label="Next reviews"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>

      </div>

      {/* 3-Card Continuous Gliding Marquee Track with Side Fade Masks */}
      <div className="relative w-full overflow-hidden">
        {/* Left & Right Soft Fade Gradients */}
        <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none" />

        {/* Scrolling Viewport with generous bottom padding so hover shadows don't clip */}
        <div
          ref={scrollContainerRef}
          className="overflow-x-auto scrollbar-none pt-4 pb-14 sm:pb-16"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          <div
            className={`flex gap-6 px-6 py-1 ${
              isPaused ? '' : 'animate-marquee-left'
            } hover:[animation-play-state:paused]`}
            style={{ width: 'max-content' }}
          >
            {displayReviews.map((rev, index) => (
              <div
                key={`${rev.id}-${index}`}
                id={`review-marquee-card-${rev.id}-${index}`}
                className="w-[350px] sm:w-[420px] lg:w-[450px] shrink-0 bg-white rounded-3xl p-7 sm:p-8 border border-slate-200 shadow-xs hover:shadow-xl hover:shadow-purple-950/10 hover:border-purple-300 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Top: Course badge & Rating */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="px-3 py-1 rounded-lg text-xs font-bold bg-purple-50 text-[#580096] border border-purple-200">
                      {rev.courseName}
                    </span>

                    <div className="flex items-center gap-0.5 shrink-0">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3.5 h-3.5 ${
                            i < rev.rating
                              ? 'text-amber-400 fill-amber-400'
                              : 'text-slate-200'
                          }`}
                        />
                      ))}
                      <span className="text-xs font-bold text-slate-800 ml-1">
                        {rev.rating.toFixed(1)}
                      </span>
                    </div>
                  </div>

                  {/* Highlight Headline */}
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug mb-3 group-hover:text-[#580096] transition-colors">
                    "{rev.highlight}"
                  </h3>

                  {/* Detailed Review Text - Full content visible without truncation */}
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-5 whitespace-pre-line">
                    {rev.content}
                  </p>
                </div>

                {/* Bottom: Author Info & Project Thumbnail if any */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-100 mt-2">
                  <div className="flex items-center gap-3">
                    <img
                      src={rev.avatar}
                      alt={rev.author}
                      className="w-10 h-10 rounded-full object-cover border border-purple-200"
                    />
                    <div>
                      <div className="text-xs sm:text-sm font-bold text-slate-900">
                        {formatMaskedName(rev.author)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Write Review Modal */}
      {isWriteModalOpen && (
        <div
          id="write-review-modal"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in"
          onClick={() => setIsWriteModalOpen(false)}
        >
          <div
            className="relative w-full max-w-lg bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-2xl text-left"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#580096]" />
                <span>수강생 후기 남기기</span>
              </h3>
              <button
                id="close-write-review-btn"
                onClick={() => setIsWriteModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 text-lg p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleWriteSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  이름 / 닉네임 *
                </label>
                <input
                  type="text"
                  required
                  placeholder="예: 김민서 님"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-purple-600 focus:bg-white"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  수강한 강의
                </label>
                <select
                  value={courseChoice}
                  onChange={(e) => setCourseChoice(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-purple-600 focus:bg-white"
                >
                  <option value="왕초보 로고 & 브랜딩 마스터클래스">
                    왕초보 로고 &amp; 브랜딩 마스터클래스
                  </option>
                  <option value="노코드 & 반응형 웹 디자인 클래스">
                    노코드 &amp; 반응형 웹 디자인 클래스
                  </option>
                  <option value="SNS 퍼스널 브랜딩 & 1인 스튜디오">
                    SNS 퍼스널 브랜딩 &amp; 1인 스튜디오
                  </option>
                  <option value="상세페이지 제작 과정">
                    상세페이지 제작 과정
                  </option>
                  <option value="바이브코딩 마스터반">
                    바이브코딩 마스터반
                  </option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  별점 (1~5점)
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setRatingScore(star)}
                      className="p-1 cursor-pointer"
                    >
                      <Star
                        className={`w-6 h-6 ${
                          star <= ratingScore
                            ? 'text-amber-400 fill-amber-400'
                            : 'text-slate-300'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="text-xs text-slate-800 font-bold ml-2">
                    {ratingScore}점 만점
                  </span>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  한 줄 요약 / 성과 하이라이트 *
                </label>
                <input
                  type="text"
                  required
                  placeholder="예: 3주 만에 첫 로고 외주 수주 성공했습니다!"
                  value={highlightText}
                  onChange={(e) => setHighlightText(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-purple-600 focus:bg-white"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  상세 후기 내용 *
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="강의에서 가장 좋았던 점이나 피드백 후기를 솔직하게 남겨주세요."
                  value={reviewContent}
                  onChange={(e) => setReviewContent(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-purple-600 focus:bg-white resize-none"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsWriteModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 cursor-pointer"
                >
                  취소
                </button>
                <button
                  id="submit-new-review-btn"
                  type="submit"
                  className="px-6 py-2 rounded-xl text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 shadow-xs cursor-pointer"
                >
                  후기 등록하기
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </section>
  );
};
