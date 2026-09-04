import React, { useState } from 'react';
import { 
  Gift, 
  Download, 
  Sparkles, 
  ExternalLink, 
  CheckCircle2, 
  FileText, 
  Mail, 
  MessageCircle, 
  BookOpen,
  Layers,
  Palette,
  ArrowRight,
  Share2,
  Lock,
  Search
} from 'lucide-react';
import { triggerSafeConfetti } from '../utils/confetti';
import { STUDIO_INFO } from '../data/mockData';

interface FreeResourcePageProps {
  onNotify: (msg: string) => void;
}

interface FreeResourceItem {
  id: string;
  title: string;
  category: 'cheatsheet' | 'template' | 'guide' | 'newsletter';
  categoryLabel: string;
  badgeText: string;
  description: string;
  downloadsCount: number;
  format: string;
  fileSize: string;
  thumbnail: string;
  features: string[];
  downloadUrl?: string;
  isExternalLink?: boolean;
}

const FREE_RESOURCES: FreeResourceItem[] = [
  {
    id: 'res-ai-prompts',
    title: '미드저니 & 생성형 AI 실전 로고·그래픽 프롬프트 100선',
    category: 'cheatsheet',
    categoryLabel: 'AI 치트시트',
    badgeText: '인기 1위',
    description: '상업적 퀄리티의 그래픽과 로고를 3초 만에 생성할 수 있는 실전 프롬프트 템플릿 100종과 스타일 키워드 모음집입니다.',
    downloadsCount: 3840,
    format: 'PDF (24p)',
    fileSize: '4.8 MB',
    thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
    features: [
      '미드저니 v6 상업용 로고 프롬프트 40선',
      '웹사이트 일러스트 & 3D 아이콘 프롬프트 30선',
      '수익화 가능한 그래픽 키워드 치트시트',
    ],
  },
  {
    id: 'res-color-palette',
    title: '디자이너가 즐겨찾는 고감도 브랜드 컬러 & 폰트 조합집',
    category: 'guide',
    categoryLabel: '디자인 가이드',
    badgeText: '추천',
    description: '색 조합이 어려운 초보 디자이너를 위해 업종별(뷰티, IT, F&B, 교육) 최적의 컬러 코드와 상업용 무료 폰트 조합을 정리했습니다.',
    downloadsCount: 2950,
    format: 'PDF + Figma File',
    fileSize: '12.4 MB',
    thumbnail: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=800&q=80',
    features: [
      '업종별 50가지 럭셔리 & 모던 컬러 팔레트 (HEX/RGB)',
      '클라이언트 눈길을 사로잡는 상업용 무료 한글/영문 폰트 20선',
      'Figma 스타일 라이브러리 파일 즉시 복사 지원',
    ],
  },
  {
    id: 'res-side-job-checklist',
    title: '디자인 부업으로 첫 100만원 버는 실전 체크리스트',
    category: 'template',
    categoryLabel: '부업 & 외주 템플릿',
    badgeText: '필수 소장',
    description: '새벽 4시 부업에서 월매출 수백만원 크몽 상위 디자이너가 되기까지의 전 과정(프로필 세팅, 단가 책정, 고객 응대 템플릿)을 담았습니다.',
    downloadsCount: 4120,
    format: 'Notion 템플릿 + PDF',
    fileSize: '2.1 MB',
    thumbnail: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=80',
    features: [
      '외주 플랫폼(크몽, 숨고) 프로필 등록 황금 공식',
      '거절 없는 클라이언트 상담 & 견적서 작성 템플릿',
      '단계별 수정 횟수 및 분쟁 예방 약관 가이드',
    ],
  },
  {
    id: 'res-figma-starter',
    title: '초보자도 10분 만에 완성하는 반응형 웹 레이아웃 키트',
    category: 'template',
    categoryLabel: 'Figma 템플릿',
    badgeText: '실습용',
    description: '오토레이아웃과 컴포넌트가 세팅되어 있어 드래그 앤 드롭으로 완성하는 원페이지 랜딩페이지 피그마 스타터 킷입니다.',
    downloadsCount: 1890,
    format: '.fig 파일',
    fileSize: '8.7 MB',
    thumbnail: 'https://images.unsplash.com/photo-1581291518655-9523c932edcf?auto=format&fit=crop&w=800&q=80',
    features: [
      '모바일 / 태블릿 / PC 반응형 그리드 시스템 기본 탑재',
      'Hero 섹션, 포트폴리오, 가격표 등 15개 섹션 블록',
      'Figma 오토레이아웃 100% 적용으로 수정 용이',
    ],
  },
];

export const FreeResourcePage: React.FC<FreeResourcePageProps> = ({ onNotify }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [emailInput, setEmailInput] = useState('');
  const [activeDownloadModal, setActiveDownloadModal] = useState<FreeResourceItem | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const categories = [
    { id: 'all', label: '전체 자료' },
    { id: 'cheatsheet', label: 'AI 프롬프트' },
    { id: 'guide', label: '디자인 가이드' },
    { id: 'template', label: '부업/Figma 템플릿' },
  ];

  const filteredResources = selectedCategory === 'all' 
    ? FREE_RESOURCES 
    : FREE_RESOURCES.filter(r => r.category === selectedCategory);

  const handleOpenDownload = (resource: FreeResourceItem) => {
    setActiveDownloadModal(resource);
    setDownloadSuccess(false);
    setEmailInput('');
  };

  const handleDownloadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput || !emailInput.includes('@')) {
      onNotify('올바른 이메일 주소를 입력해 주세요.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setDownloadSuccess(true);
      triggerSafeConfetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
      onNotify(`[${activeDownloadModal?.title}] 다운로드 링크가 ${emailInput}으로 발송되었습니다!`);
    }, 800);
  };

  return (
    <div id="free-resource-page" className="min-h-screen bg-[#FAFAFC] pb-24 pt-24 sm:pt-28">
      
      {/* Top Hero Banner */}
      <section className="relative overflow-hidden py-12 sm:py-16 bg-white border-b border-slate-200/80">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-100/50 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-amber-100/40 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-50 border border-purple-200/80 text-[#580096] text-xs sm:text-sm font-bold mb-4 shadow-xs">
            <Gift className="w-4 h-4 text-[#580096]" />
            <span>딩스튜디오 디자이너 무료 나눔 리소스</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-4">
            디자인 실력과 수익을 끌어올리는 <br className="hidden sm:inline" />
            <span className="text-[#580096]">100% 무료 자료실</span>
          </h1>

          <p className="max-w-2xl mx-auto text-slate-600 text-sm sm:text-base leading-relaxed">
            비전공자도 바로 적용할 수 있는 AI 프롬프트 치트시트부터 컬러 가이드, 외주 부업 체크리스트까지 누구나 무료로 다운로드받아 활용하세요.
          </p>

          {/* Quick Stats Badges */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs sm:text-sm text-slate-600 font-medium">
            <div className="flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-xl border border-slate-200/80">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>누적 무료 다운로드 <strong>12,800+회</strong></span>
            </div>
            <div className="flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-xl border border-slate-200/80">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>상업적 실무 활용 가능</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14">
        
        {/* Category Filters */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap mb-10">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-[#580096] text-white shadow-md shadow-purple-950/20 scale-105'
                  : 'bg-white text-slate-600 border border-slate-200 hover:border-purple-300 hover:text-slate-900'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Resource Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-16">
          {filteredResources.map((res) => (
            <div
              key={res.id}
              className="bg-white rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-purple-300 transition-all duration-300 overflow-hidden flex flex-col justify-between group"
            >
              <div>
                {/* Image Header with Badge */}
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-100">
                  <img 
                    src={res.thumbnail} 
                    alt={res.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                  
                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-xs text-[#580096] text-xs font-bold shadow-xs">
                      {res.categoryLabel}
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-amber-400 text-slate-950 text-xs font-black shadow-xs">
                      {res.badgeText}
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-white/90 font-medium">
                    <span>{res.format} ({res.fileSize})</span>
                    <span>📥 {res.downloadsCount.toLocaleString()}명 다운로드</span>
                  </div>
                </div>

                {/* Content Body */}
                <div className="p-6 sm:p-7">
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug group-hover:text-[#580096] transition-colors mb-3">
                    {res.title}
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-5">
                    {res.description}
                  </p>

                  {/* Highlights Bullet points */}
                  <div className="space-y-2 pt-2 border-t border-slate-100">
                    {res.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs sm:text-[13px] text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-[#580096] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Action Footer */}
              <div className="p-6 pt-0 sm:p-7 sm:pt-0">
                <button
                  onClick={() => handleOpenDownload(res)}
                  className="w-full py-3.5 px-5 rounded-2xl bg-purple-50 hover:bg-[#580096] text-[#580096] hover:text-white font-bold text-sm transition-all duration-200 flex items-center justify-center gap-2 shadow-xs group/btn cursor-pointer"
                >
                  <Download className="w-4 h-4 group-hover/btn:-translate-y-0.5 transition-transform" />
                  <span>무료로 다운로드받기</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Direct Newsletter & Community Banner */}
        <div className="rounded-3xl bg-gradient-to-br from-[#580096] via-[#6A169C] to-[#430076] p-8 sm:p-12 text-white shadow-2xl shadow-purple-950/20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-3 text-left">
              <span className="px-3 py-1 rounded-full bg-amber-400 text-slate-950 text-xs font-black inline-block mb-1">
                실시간 업데이트
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight">
                매주 새로운 무료 템플릿 & 디자인 꿀팁을 <br />
                가장 먼저 받아보세요
              </h2>
              <p className="text-purple-200 text-sm leading-relaxed max-w-xl">
                스티비 뉴스레터 및 카카오 오픈채팅방을 통해 매달 정기적으로 제공되는 무료 라이브 특강과 추가 자료 알림을 실시간으로 확인하세요.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3">
              <a
                href={STUDIO_INFO.newsletter}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-6 rounded-2xl bg-white text-[#580096] hover:bg-purple-50 font-bold text-sm text-center transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <Mail className="w-4 h-4 text-[#580096]" />
                <span>뉴스레터 무료 구독하기</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-60" />
              </a>

              <a
                href={STUDIO_INFO.kakao}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-6 rounded-2xl bg-[#FEE500] hover:bg-[#FDD835] text-amber-950 font-bold text-sm text-center transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 text-amber-950" />
                <span>카카오 오픈채팅 참여 (비번: ding)</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-60" />
              </a>
            </div>
          </div>
        </div>

      </div>

      {/* Modal for Free Download Email Submission */}
      {activeDownloadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-purple-100 relative animate-in zoom-in-95 duration-200">
            <button
              onClick={() => setActiveDownloadModal(null)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 p-1.5 rounded-full hover:bg-slate-100 transition-colors"
            >
              ✕
            </button>

            {!downloadSuccess ? (
              <div>
                <div className="w-12 h-12 rounded-2xl bg-purple-50 text-[#580096] flex items-center justify-center mb-4">
                  <Gift className="w-6 h-6" />
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  무료 자료 다운로드
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-5">
                  <strong>{activeDownloadModal.title}</strong><br />
                  자료를 전달받으실 이메일 주소를 입력하시면 다운로드 링크가 즉시 발송됩니다.
                </p>

                <form onSubmit={handleDownloadSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      이메일 주소 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="example@naver.com"
                      value={emailInput}
                      onChange={(e) => setEmailInput(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-[#580096] focus:ring-2 focus:ring-purple-200 transition-all"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 rounded-xl bg-[#580096] hover:bg-[#6A169C] text-white font-bold text-sm shadow-lg shadow-purple-950/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>발송 처리 중...</span>
                    ) : (
                      <>
                        <Download className="w-4 h-4" />
                        <span>즉시 무료 다운로드</span>
                      </>
                    )}
                  </button>

                  <p className="text-[11px] text-center text-slate-400">
                    스팸 메일은 절대 발송되지 않으며 언제든 구독 해제 가능합니다.
                  </p>
                </form>
              </div>
            ) : (
              <div className="text-center py-4 space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-bold text-slate-900">
                  발송이 완료되었습니다!
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  <strong>{emailInput}</strong>(으)로 다운로드 링크와 가이드 문서가 전송되었습니다. 메일함을 확인해 주세요.
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => setActiveDownloadModal(null)}
                    className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm transition-all"
                  >
                    확인
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
};
