import React, { useState } from 'react';
import { 
  BookOpen, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  Star, 
  Download, 
  Clock, 
  ShieldCheck, 
  FileText, 
  CreditCard, 
  Lock, 
  X, 
  MessageSquare, 
  Gift, 
  Check, 
  Zap, 
  ExternalLink, 
  ChevronDown,
  ArrowLeft,
  Share2
} from 'lucide-react';
import { EBOOKS_DATA } from '../data/mockData';
import { EBook } from '../types';
import { triggerSafeConfetti } from '../utils/confetti';

interface EBookPageProps {
  onNotify: (msg: string) => void;
}

export const EBookPage: React.FC<EBookPageProps> = ({ onNotify }) => {
  const [selectedEBook, setSelectedEBook] = useState<EBook | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'toc' | 'excerpt'>('overview');

  // Checkout modal states
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);
  const [purchasingBook, setPurchasingBook] = useState<EBook | null>(null);
  const [checkoutForm, setCheckoutForm] = useState({
    name: '',
    email: '',
    phone: '',
    paymentMethod: '신용카드',
    agreeTerms: true,
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [purchaseComplete, setPurchaseComplete] = useState(false);

  const [openFaqIndices, setOpenFaqIndices] = useState<number[]>([0]);

  const toggleFaq = (index: number) => {
    setOpenFaqIndices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const openDetailPage = (book: EBook) => {
    setSelectedEBook(book);
    setActiveTab('overview');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const closeDetailPage = () => {
    setSelectedEBook(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const EBOOK_FAQS = [
    {
      q: 'Q. 결제 후 전자책은 어떻게 받나요?',
      a: '결제를 누르면 즉시 PDF 파일을 다운로드 할 수 있습니다.'
    },
    {
      q: 'Q. 스마트폰이나 태블릿(아이패드)에서도 볼 수 있나요?',
      a: '네, 표준 PDF 형식으로 제작되어 PC, Mac, 아이패드, 갤럭시탭, 스마트폰의 기본 PDF 뷰어나 굿노트(GoodNotes), 노타빌리티 등에서 자유롭게 열람하실 수 있습니다.'
    }
  ];

  const openCheckout = (book: EBook) => {
    setPurchasingBook(book);
    setCheckoutModalOpen(true);
    setPurchaseComplete(false);
    setIsProcessing(false);
  };

  const handlePurchaseSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    onNotify('실제 결제창(PG사 연동)으로 연결될 예정입니다.');
  };

  const downloadSamplePDF = (title: string) => {
    onNotify(`'${title}' 샘플 PDF 다운로드가 시작되었습니다.`);
  };

  // Reusable Checkout Modal Component (Matching User's Reference Image)
  const renderCheckoutModal = () => {
    if (!checkoutModalOpen || !purchasingBook) return null;

    const discountAmount = purchasingBook.originalPrice - purchasingBook.discountPrice;
    const formattedTitle = purchasingBook.title.startsWith('[전자책]')
      ? purchasingBook.title
      : `[전자책] ${purchasingBook.title}`;

    return (
      <div
        id="ebook-checkout-modal"
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200 overflow-y-auto"
        onClick={() => {
          if (!isProcessing) setCheckoutModalOpen(false);
        }}
      >
        <div
          className="relative w-full max-w-4xl bg-[#f4f5f8] rounded-2xl p-4 sm:p-7 shadow-2xl border border-slate-200 text-left my-auto max-h-[95vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={() => {
              if (!isProcessing) setCheckoutModalOpen(false);
            }}
            className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-colors z-10 cursor-pointer"
            aria-label="닫기"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Order Form View (Exact Match to User Reference Image) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-start">
              {/* Left Column */}
              <div className="lg:col-span-7 space-y-5">
                {/* 1. 주문 상품 정보 */}
                <div className="bg-white p-5 sm:p-6 shadow-sm border border-slate-200/80">
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-4">
                    주문 상품 정보
                  </h3>
                  <div className="border border-slate-200 p-4 flex items-center gap-4 bg-white">
                    <div className="w-20 h-24 bg-black flex items-center justify-center shrink-0 border border-slate-200 overflow-hidden shadow-inner">
                      <img
                        src={purchasingBook.coverImage}
                        alt={purchasingBook.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm sm:text-base font-semibold text-slate-900 leading-snug mb-2 line-clamp-2">
                        {formattedTitle}
                      </h4>
                      <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-2">
                        <span className="border border-slate-300 text-slate-500 text-[11px] px-1.5 py-0.5 rounded-sm font-medium">
                          필수
                        </span>
                        <span>1개</span>
                      </div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-base sm:text-lg font-bold text-slate-900">
                          {purchasingBook.discountPrice.toLocaleString()}원
                        </span>
                        <span className="text-sm sm:text-base text-slate-400 line-through font-normal">
                          {purchasingBook.originalPrice.toLocaleString()}원
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2. 주문자 정보 */}
                <div className="bg-white p-5 sm:p-6 shadow-sm border border-slate-200/80">
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-4">
                    주문자 정보
                  </h3>
                  <div className="space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <input
                        type="text"
                        value={checkoutForm.name}
                        onChange={(e) => setCheckoutForm({ ...checkoutForm, name: e.target.value })}
                        placeholder="이름"
                        className="w-full px-4 py-3 border border-slate-200 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#7a0099] transition-colors"
                      />
                      <input
                        type="tel"
                        value={checkoutForm.phone}
                        onChange={(e) => setCheckoutForm({ ...checkoutForm, phone: e.target.value })}
                        placeholder="연락처"
                        className="w-full px-4 py-3 border border-slate-200 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#7a0099] transition-colors"
                      />
                    </div>
                    <div className="relative">
                      <input
                        type="email"
                        value={checkoutForm.email}
                        onChange={(e) => setCheckoutForm({ ...checkoutForm, email: e.target.value })}
                        placeholder="이메일"
                        className="w-full px-4 py-3 pr-14 border border-slate-200 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#7a0099] transition-colors"
                      />
                      <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none flex items-center">
                        <div className="px-1.5 py-1 bg-slate-300 rounded flex items-center gap-0.5">
                          <span className="w-1 h-1 bg-white rounded-full"></span>
                          <span className="w-1 h-1 bg-white rounded-full"></span>
                          <span className="w-1 h-1 bg-white rounded-full"></span>
                          <span className="w-0.5 h-2 bg-white rounded-full ml-0.5"></span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="lg:col-span-5 space-y-5">
                {/* 1. 주문 요약 */}
                <div className="bg-white p-5 sm:p-6 shadow-sm border border-slate-200/80">
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-4">
                    주문 요약
                  </h3>
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center text-sm py-0.5">
                      <span className="text-slate-500">상품가격</span>
                      <span className="text-slate-800 font-medium">
                        {purchasingBook.originalPrice.toLocaleString()}원
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-sm py-0.5">
                      <span className="text-slate-500">상품 할인금액</span>
                      <span className="text-slate-800 font-medium">
                        - {discountAmount.toLocaleString()}원
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-xs py-0.5 text-slate-400">
                      <span className="pl-0.5">즉시/기간 할인</span>
                      <span>- {discountAmount.toLocaleString()}원</span>
                    </div>
                  </div>

                  <div className="border-t border-slate-100 my-4" />

                  <div className="flex justify-between items-center pt-1">
                    <span className="font-bold text-sm sm:text-base text-slate-900">
                      총 주문금액
                    </span>
                    <span className="font-bold text-xl sm:text-2xl text-[#7a0099]">
                      {purchasingBook.discountPrice.toLocaleString()}원
                    </span>
                  </div>
                </div>

                {/* 2. 결제 수단 */}
                <div className="bg-white p-5 sm:p-6 shadow-sm border border-slate-200/80">
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-3">
                    결제 수단
                  </h3>
                  <div className="space-y-2">
                    {['신용카드', '가상계좌', '실시간계좌이체', '무통장입금', 'PAYCO', '삼성페이'].map((method) => {
                      const isSelected = checkoutForm.paymentMethod === method;
                      return (
                        <label
                          key={method}
                          onClick={() => setCheckoutForm({ ...checkoutForm, paymentMethod: method })}
                          className="flex items-center gap-3 py-1 cursor-pointer group select-none"
                        >
                          <div
                            className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${
                              isSelected ? 'border-[#7a0099]' : 'border-slate-300 group-hover:border-slate-400'
                            }`}
                          >
                            {isSelected && (
                              <div className="w-2.5 h-2.5 rounded-full bg-[#7a0099]" />
                            )}
                          </div>
                          <span
                            className={`text-sm ${
                              isSelected ? 'text-slate-900 font-medium' : 'text-slate-700'
                            }`}
                          >
                            {method}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </div>

                {/* 3. 이용 및 정보 제공 약관 */}
                <div className="bg-white p-5 sm:p-6 shadow-sm border border-slate-200/80 space-y-4">
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2">
                      이용 및 정보 제공 약관
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      결제 전 이용 및 정보 제공 약관 등의 내용을 확인했으며 이에 동의합니다.
                    </p>
                  </div>

                  <div className="text-xs sm:text-sm text-slate-700 py-1">
                    구매조건 확인 및 결제진행 동의
                  </div>

                  <button
                    type="button"
                    onClick={handlePurchaseSubmit}
                    disabled={isProcessing}
                    className="w-full py-4 bg-[#7a0099] hover:bg-[#680082] active:bg-[#580070] text-white font-bold text-base transition-colors shadow-sm disabled:opacity-50 cursor-pointer text-center"
                  >
                    {isProcessing ? '결제 처리 중...' : '결제하기'}
                  </button>
                </div>
              </div>
            </div>
        </div>
      </div>
    );
  };

  // -------------------------------------------------------------
  // 1. FULL-PAGE DETAIL VIEW (새로운 전체창/상세페이지)
  // -------------------------------------------------------------
  if (selectedEBook) {
    const discountPercent = Math.round((1 - selectedEBook.discountPrice / selectedEBook.originalPrice) * 100);

    return (
      <div id="ebook-detail-page" className="pt-20 pb-20 bg-slate-50 min-h-screen animate-in fade-in duration-300">
        {/* Book Header Section */}
        <section className="bg-white border-b border-slate-200 py-8 sm:py-12">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Back Button */}
            <button
              onClick={closeDetailPage}
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-500 hover:text-[#580096] transition-colors cursor-pointer mb-6 py-1.5 px-3 rounded-xl bg-slate-100 hover:bg-purple-50"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>전자책 목록으로 돌아가기</span>
            </button>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              
              {/* Cover Visual */}
              <div className="md:col-span-5 flex justify-center">
                <div className="relative w-56 sm:w-64 aspect-[3/4] rounded-r-2xl rounded-l-xs overflow-hidden shadow-2xl border-r-4 border-b-4 border-slate-300 transform hover:scale-102 transition-transform duration-300">
                  <img
                    src={selectedEBook.coverImage}
                    alt={selectedEBook.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute left-0 top-0 bottom-0 w-4 bg-gradient-to-r from-black/40 via-black/15 to-transparent pointer-events-none" />
                </div>
              </div>

              {/* Info & Buy Box */}
              <div className="md:col-span-7 space-y-4 text-left">
                <div className="flex flex-wrap items-center gap-2">
                  {selectedEBook.badge && (
                    <span className="px-3 py-1 rounded-full text-xs font-black bg-amber-400 text-slate-950 shadow-xs">
                      {selectedEBook.badge}
                    </span>
                  )}
                </div>

                <h1 className="text-2xl sm:text-4xl font-black text-slate-900 leading-tight">
                  {selectedEBook.title}
                </h1>

                <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed">
                  {selectedEBook.subtitle}
                </p>

                <div className="flex items-center gap-3 pt-2 text-xs sm:text-sm text-slate-500">
                  <div className="flex items-center text-amber-500 font-bold">
                    <Star className="w-4 h-4 fill-current mr-1" />
                    <span>{selectedEBook.rating}</span>
                  </div>
                  <span>·</span>
                  <span>구매 후기 <strong>{selectedEBook.reviewsCount}개</strong></span>
                </div>

                {/* Price Box */}
                <div className="p-5 rounded-2xl bg-purple-50/70 border border-purple-100/80 space-y-3">
                  <div className="flex items-baseline justify-between">
                    <div>
                      <span className="text-sm text-slate-400 line-through mr-2">
                        {selectedEBook.originalPrice.toLocaleString()}원
                      </span>
                      <span className="text-3xl font-black text-[#580096]">
                        {selectedEBook.discountPrice.toLocaleString()}원
                      </span>
                    </div>
                    <span className="text-xs font-extrabold text-red-600 bg-red-50 border border-red-200 px-2.5 py-1 rounded-full">
                      {discountPercent}% 특별 할인
                    </span>
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={() => openCheckout(selectedEBook)}
                      className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#580096] via-purple-700 to-[#7b1fa2] hover:from-[#48007d] hover:via-purple-800 hover:to-[#6a1b9a] text-white font-black text-sm sm:text-base shadow-lg shadow-purple-900/25 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
                    >
                      <span>전자책 구매하기</span>
                      <ArrowRight className="w-4 h-4 text-amber-300" />
                    </button>
                  </div>
                </div>

              </div>

            </div>
          </div>
        </section>

        {/* Main Content Area */}
        <main className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-10 text-left">
          
          {/* 1. Story & Introduction Paragraphs */}
          {selectedEBook.storyParagraphs && selectedEBook.storyParagraphs.length > 0 && (
            <div className="bg-white rounded-3xl p-7 sm:p-10 border border-slate-200 shadow-sm space-y-6">
              {selectedEBook.storyParagraphs.map((para, pIdx) => (
                <div
                  key={pIdx}
                  className="text-base sm:text-lg text-slate-800 font-normal leading-relaxed whitespace-pre-line"
                >
                  {para}
                </div>
              ))}
            </div>
          )}

          {/* 2. Content Image or Content Images */}
          {selectedEBook.contentImage && (
            <div className="bg-white rounded-3xl border border-slate-200/80 shadow-md overflow-hidden">
              <img
                src={selectedEBook.contentImage}
                alt={`${selectedEBook.title} 상세 안내`}
                referrerPolicy="no-referrer"
                loading="lazy"
                className="w-full h-auto object-contain block select-none"
              />
            </div>
          )}

          {selectedEBook.contentImages && selectedEBook.contentImages.length > 0 && (
            <div className="bg-white rounded-3xl border border-slate-200/80 shadow-md overflow-hidden flex flex-col">
              {selectedEBook.contentImages.map((imgUrl, imgIdx) => (
                <img
                  key={imgIdx}
                  src={imgUrl}
                  alt={`${selectedEBook.title} 상세 이미지 ${imgIdx + 1}`}
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  className="w-full h-auto object-contain block select-none"
                />
              ))}
            </div>
          )}

          {/* Optional Mid Section Heading */}
          {selectedEBook.midSectionHeading && (
            <div className="text-center py-4">
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 leading-snug whitespace-pre-line">
                {selectedEBook.midSectionHeading}
              </h3>
            </div>
          )}

          {/* 3. 💜 전자책에서 배울 수 있는 내용 */}
          {selectedEBook.learningPoints && selectedEBook.learningPoints.length > 0 && (
            <div className="bg-white rounded-3xl p-7 sm:p-9 border border-purple-100 shadow-sm space-y-5">
              <h3 className="text-lg sm:text-xl font-black text-slate-900 flex items-center gap-2">
                <span className="text-purple-600">💜</span>
                <span>{selectedEBook.learningHeading || '전자책에서 배울 수 있는 내용'}</span>
              </h3>
              <div className="space-y-3">
                {selectedEBook.learningPoints.map((point, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-purple-50/60 border border-purple-100/80 text-sm sm:text-base font-bold text-slate-800 flex items-center gap-3"
                  >
                    <div className="w-6 h-6 rounded-full bg-[#580096] text-white flex items-center justify-center shrink-0 text-xs font-black">
                      ✓
                    </div>
                    <span className="leading-snug">{point}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 4. 💜 이런 분들에게 전자책을 추천드려요! */}
          {selectedEBook.storyParagraphs && selectedEBook.targetAudience && selectedEBook.targetAudience.length > 0 && (
            <div className="bg-white rounded-3xl p-7 sm:p-9 border border-purple-100 shadow-sm space-y-5">
              <h3 className="text-lg sm:text-xl font-black text-slate-900 flex items-center gap-2">
                <span className="text-purple-600">💜</span>
                <span>이런 분들에게 전자책을 추천드려요!</span>
              </h3>
              <div className="space-y-3">
                {selectedEBook.targetAudience.map((target, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 text-sm sm:text-base font-bold text-slate-900 flex items-center gap-3"
                  >
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shrink-0" />
                    <span className="leading-snug">{target}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 5. Official Detail Page Images (고화질 통이미지 연속 렌더링) */}
          {selectedEBook.detailImages && selectedEBook.detailImages.length > 0 && (
            <div className="space-y-4">
              <div className="bg-white rounded-3xl border border-slate-200/80 shadow-md overflow-hidden flex flex-col">
                {selectedEBook.detailImages.map((imgUrl, imgIdx) => (
                  <img
                    key={imgIdx}
                    src={imgUrl}
                    alt={`${selectedEBook.title} 상세페이지 ${imgIdx + 1}`}
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    className="w-full h-auto object-contain block select-none"
                  />
                ))}
              </div>
            </div>
          )}

          {/* 6. Fallback Summary if nothing else */}
          {!selectedEBook.storyParagraphs && !selectedEBook.detailImages && !selectedEBook.contentImage && (
            <div className="p-7 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3 text-left">
              <h3 className="text-xs font-black text-[#580096] uppercase tracking-wider flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                <span>핵심 요약</span>
              </h3>
              <p className="text-base sm:text-lg font-bold text-slate-900 leading-relaxed">
                {selectedEBook.summary}
              </p>
            </div>
          )}

        </main>

        {/* Checkout Modal */}
        {renderCheckoutModal()}

      </div>
    );
  }

  // -------------------------------------------------------------
  // 2. DEFAULT CATALOG VIEW (전자책 전체 목록)
  // -------------------------------------------------------------
  return (
    <div id="ebook-page-container" className="pt-24 pb-24 bg-white text-slate-900 animate-in fade-in duration-300">
      
      {/* 1. E-Book Hero Section */}
      <section className="relative py-12 sm:py-20 bg-gradient-to-b from-purple-50/70 via-white to-white overflow-hidden border-b border-slate-100">
        <div className="absolute top-0 right-10 w-96 h-96 bg-purple-200/40 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-96 h-96 bg-amber-100/40 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-100/80 border border-purple-200 text-[#580096] text-xs font-bold mb-5 shadow-xs">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Dingwitch E-Book</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-tight">
            딩마녀의 노하우를 담은<br />
            <span className="bg-gradient-to-r from-[#580096] via-[#7B1FA2] to-[#A855F7] bg-clip-text text-transparent">
              실전 시크릿 전자책
            </span>
          </h1>

        </div>
      </section>

      {/* 2. E-Book Cards List */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {EBOOKS_DATA.map((book) => {
            const discountPercent = Math.round((1 - book.discountPrice / book.originalPrice) * 100);

            return (
              <div
                key={book.id}
                id={`ebook-card-${book.id}`}
                onClick={() => openDetailPage(book)}
                className="bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-purple-300 transition-all duration-300 overflow-hidden flex flex-col justify-between p-6 sm:p-7 group cursor-pointer relative"
              >
                <div>
                  {/* Book Mockup Visual */}
                  <div className="flex flex-col items-center justify-center p-6 bg-gradient-to-br from-purple-50/70 via-slate-50 to-purple-100/30 rounded-2xl border border-purple-100/70 relative mb-6">
                    {book.badge && (
                      <div className="absolute top-3 left-3 z-10">
                        <span className="px-2.5 py-1 rounded-full text-[11px] font-extrabold bg-amber-400 text-slate-950 shadow-xs">
                          {book.badge}
                        </span>
                      </div>
                    )}

                    <div className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#580096] text-white shadow-xs flex items-center gap-1">
                        <span>상세보기</span>
                        <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>

                    {/* 3D Book Container */}
                    <div className="relative my-2 w-44 sm:w-52 aspect-[3/4] rounded-r-xl rounded-l-xs overflow-hidden shadow-xl border-r-2 border-b-2 border-slate-300 transform group-hover:scale-105 transition-transform duration-300">
                      <img
                        src={book.coverImage}
                        alt={book.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                      
                      {/* Spine Shadow Effect */}
                      <div className="absolute left-0 top-0 bottom-0 w-3 bg-gradient-to-r from-black/30 via-black/10 to-transparent pointer-events-none" />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg sm:text-xl font-black text-slate-900 leading-snug mb-2 min-h-[56px] flex items-center group-hover:text-[#580096] transition-colors">
                    {book.title}
                  </h3>

                  {/* Subtitle / Summary */}
                  <p className="text-xs text-slate-500 line-clamp-2 mb-4 leading-relaxed">
                    {book.subtitle}
                  </p>
                </div>

                {/* Price */}
                <div className="pt-4 border-t border-slate-100">
                  <div className="flex items-baseline justify-between">
                    <div className="flex items-baseline gap-2">
                      <span className="text-xs sm:text-sm line-through text-slate-400">
                        {book.originalPrice.toLocaleString()}원
                      </span>
                      <span className="text-xl sm:text-2xl font-black text-[#580096]">
                        {book.discountPrice.toLocaleString()}원
                      </span>
                    </div>
                    <span className="text-xs font-bold text-red-600 bg-red-50 border border-red-200 px-2 py-0.5 rounded-full">
                      {discountPercent}% 할인
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. E-Book Purchase FAQ */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            자주 묻는 질문
          </h2>
        </div>

        <div className="space-y-3">
          {EBOOK_FAQS.map((faq, index) => {
            const isOpen = openFaqIndices.includes(index);
            return (
              <div
                key={index}
                id={`faq-item-${index}`}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden bg-white ${
                  isOpen ? 'border-purple-200 shadow-md ring-1 ring-purple-100' : 'border-slate-200 shadow-xs hover:border-slate-300'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer select-none focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <h4 className={`text-sm sm:text-base font-bold transition-colors ${
                    isOpen ? 'text-[#580096]' : 'text-slate-900'
                  }`}>
                    {faq.q}
                  </h4>
                  <div className={`p-1.5 rounded-full transition-transform duration-300 shrink-0 ${
                    isOpen ? 'rotate-180 bg-purple-100 text-[#580096]' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                  }`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100/80 animate-in fade-in duration-200">
                    <p className="whitespace-pre-line">{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Checkout / Purchase Modal */}
      {renderCheckoutModal()}

    </div>
  );
};
