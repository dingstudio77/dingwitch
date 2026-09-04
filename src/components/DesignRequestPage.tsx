import React, { useState } from 'react';
import { 
  Palette, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  Clock, 
  ShieldCheck, 
  Layers, 
  Globe, 
  FileCode, 
  HelpCircle,
  MessageSquare,
  Send,
  Check,
  Zap,
  Calculator,
  Eye,
  Plus
} from 'lucide-react';
import { DESIGN_PACKAGES_DATA, PORTFOLIO_DATA } from '../data/mockData';
import { DesignServicePackage, PortfolioProject } from '../types';
import { ProjectModal } from './ProjectModal';
import { triggerSafeConfetti } from '../utils/confetti';

interface DesignRequestPageProps {
  onNotify: (msg: string) => void;
}

export const DesignRequestPage: React.FC<DesignRequestPageProps> = ({ onNotify }) => {
  // Selected Package for detail or calculator
  const [selectedPackageId, setSelectedPackageId] = useState<string>(DESIGN_PACKAGES_DATA[0].id);
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null);

  // Estimator Add-ons
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);

  // Request Brief Form State
  const [formData, setFormData] = useState({
    clientName: '',
    brandName: '',
    industry: 'F&B / 카페 / 식음료',
    serviceType: 'logo',
    budget: '50만원 ~ 100만원',
    deadline: '2주 이내',
    styleKeywords: ['미니멀', '모던 & 심플'],
    projectDescription: '',
    referenceLink: '',
    contactPhone: '',
    contactEmail: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Addon list for estimator
  const ADDONS_LIST = [
    { id: 'extra-logo', name: '로고 시안 2종 추가 제안 (+25만원)', price: 250000 },
    { id: 'multilingual-web', name: '영문/일문 다국어 페이지 추가 (+35만원)', price: 350000 },
    { id: '3d-mockup', name: '고화질 3D 패키지/굿즈 렌더링 (+20만원)', price: 200000 },
    { id: 'fast-track', name: '긴급 패스트트랙 급행 제작 (일정 50% 단축) (+30만원)', price: 300000 },
  ];

  const currentPackage = DESIGN_PACKAGES_DATA.find((p) => p.id === selectedPackageId) || DESIGN_PACKAGES_DATA[0];

  const calculateTotalEstimate = () => {
    let total = currentPackage.basePrice;
    selectedAddons.forEach((addonId) => {
      const addon = ADDONS_LIST.find((a) => a.id === addonId);
      if (addon) total += addon.price;
    });
    return total;
  };

  const toggleAddon = (addonId: string) => {
    if (selectedAddons.includes(addonId)) {
      setSelectedAddons(selectedAddons.filter((id) => id !== addonId));
    } else {
      setSelectedAddons([...selectedAddons, addonId]);
    }
  };

  const availableStyleKeywords = [
    '미니멀', '모던 & 심플', '따뜻한 감성', '럭셔리 & 하이엔드', 
    '볼드 & 키치', '자연주의 & 오가닉', '테크 & 사이버', '빈티지 & 클래식'
  ];

  const toggleStyleKeyword = (kw: string) => {
    if (formData.styleKeywords.includes(kw)) {
      setFormData({
        ...formData,
        styleKeywords: formData.styleKeywords.filter((k) => k !== kw),
      });
    } else {
      setFormData({
        ...formData,
        styleKeywords: [...formData.styleKeywords, kw],
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.clientName || !formData.contactPhone || !formData.projectDescription) {
      onNotify('성함, 연락처, 프로젝트 내용을 입력해 주세요.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      triggerSafeConfetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.5 },
      });
      onNotify(`${formData.clientName} 님의 디자인 의뢰서가 접수되었습니다! 담당 디렉터가 24시간 이내에 상담 연락을 드립니다.`);
    }, 1500);
  };

  return (
    <div id="design-request-page" className="pt-24 pb-24 bg-white text-slate-900 animate-in fade-in duration-300">
      
      {/* 1. Hero Section */}
      <section className="relative py-12 sm:py-20 bg-gradient-to-b from-purple-50/70 via-white to-white overflow-hidden border-b border-slate-100">
        <div className="absolute top-0 right-10 w-96 h-96 bg-purple-200/40 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-96 h-96 bg-amber-100/40 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-100/80 border border-purple-200 text-[#580096] text-xs font-bold mb-5 shadow-xs">
            <Palette className="w-3.5 h-3.5" />
            <span>딩스튜디오 맞춤 디자인 외주 &amp; 브랜딩 컨설팅</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-tight mb-5">
            보는 순간 각인되는 로고부터<br />
            <span className="bg-gradient-to-r from-[#580096] via-[#7B1FA2] to-[#A855F7] bg-clip-text text-transparent">
              전환율 높은 웹사이트까지 맞춤 제작
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed mb-8">
            단순히 예쁜 그림을 그리는 것이 아닌, 브랜드의 가치를 시각화하고 고객의 지갑을 열게 만드는 실전 브랜딩 디자인을 제공합니다.
          </p>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto pt-2">
            <div className="p-4 rounded-2xl bg-white border border-purple-100 shadow-xs">
              <div className="text-2xl font-black text-[#580096]">350+</div>
              <div className="text-xs text-slate-500 mt-0.5">누적 외주 프로젝트</div>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-purple-100 shadow-xs">
              <div className="text-2xl font-black text-amber-500">⭐ 99.4%</div>
              <div className="text-xs text-slate-500 mt-0.5">클라이언트 만족도</div>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-purple-100 shadow-xs">
              <div className="text-2xl font-black text-[#580096]">100% 원본</div>
              <div className="text-xs text-slate-500 mt-0.5">AI/PSD/SVG 상업용 파일 제공</div>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-purple-100 shadow-xs">
              <div className="text-2xl font-black text-amber-500">24시간 내</div>
              <div className="text-xs text-slate-500 mt-0.5">신속한 견적 &amp; 1:1 상담</div>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#design-brief-form"
              className="px-6 py-3 rounded-xl bg-[#580096] hover:bg-[#48007d] text-white font-bold text-sm shadow-sm transition-all flex items-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>지금 온라인 의뢰서 작성하기</span>
            </a>
            <a
              href="https://open.kakao.com/o/gQqm78Pf"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-sm shadow-sm transition-all flex items-center gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              <span>카카오톡 1:1 실시간 상담</span>
            </a>
          </div>

        </div>
      </section>

      {/* 2. Service Packages Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        <div className="mb-10 text-left">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            디자인 서비스 패키지 (PACKAGES)
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            대표적인 4가지 디자인 패키지를 확인하고 프로젝트에 맞는 상품을 선택해보세요.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {DESIGN_PACKAGES_DATA.map((pkg) => (
            <div
              key={pkg.id}
              id={`package-card-${pkg.id}`}
              className="bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-purple-300 transition-all duration-300 flex flex-col justify-between p-6 sm:p-8"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-purple-100 text-[#580096]">
                    {pkg.badge || '맞춤 제작'}
                  </span>
                  <span className="text-xs text-slate-500 font-medium">
                    {pkg.duration}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-black text-slate-900 mb-2">
                  {pkg.title}
                </h3>
                <p className="text-xs sm:text-sm text-purple-900 font-semibold mb-6">
                  {pkg.tagline}
                </p>

                {/* Deliverables */}
                <div className="space-y-2 mb-6">
                  <div className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                    제공 내역 (Deliverables)
                  </div>
                  <div className="space-y-1.5">
                    {pkg.deliverables.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-600">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#580096] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recommended for */}
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-600 mb-6">
                  <strong className="text-slate-900">추천 대상:</strong> {pkg.recommendedFor}
                </div>
              </div>

              {/* Price & Select Button */}
              <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-400">기본 시작가</span>
                  <div className="text-2xl font-black text-[#580096]">
                    {pkg.basePrice.toLocaleString()}원~
                  </div>
                </div>

                <a
                  href="#design-brief-form"
                  onClick={() => {
                    setSelectedPackageId(pkg.id);
                    setFormData({
                      ...formData,
                      serviceType: pkg.category,
                    });
                  }}
                  className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs sm:text-sm transition-all"
                >
                  이 패키지로 의뢰하기
                </a>
              </div>
            </div>
          ))}
        </div>

      </section>

      {/* 3. Interactive Quotation Calculator */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="p-8 rounded-3xl bg-purple-50/70 border border-purple-200">
          <div className="flex items-center gap-2 mb-2">
            <Calculator className="w-5 h-5 text-[#580096]" />
            <h3 className="text-xl font-bold text-slate-900">
              실시간 견적 &amp; 옵션 계산기
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 mb-6">
            필요한 기본 패키지와 추가 옵션을 선택해 예상 견적을 즉시 확인해보세요.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left: Package Selector */}
            <div className="lg:col-span-6 space-y-4">
              <label className="block text-xs font-bold text-slate-700">1. 기본 패키지 선택</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {DESIGN_PACKAGES_DATA.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setSelectedPackageId(p.id)}
                    className={`p-3.5 rounded-2xl text-left border transition-all cursor-pointer ${
                      selectedPackageId === p.id
                        ? 'border-[#580096] bg-white shadow-sm ring-2 ring-[#580096]/20'
                        : 'border-slate-200 bg-white/60 hover:bg-white text-slate-600'
                    }`}
                  >
                    <div className="text-xs font-bold text-slate-900">{p.title}</div>
                    <div className="text-xs font-black text-[#580096] mt-1">
                      {p.basePrice.toLocaleString()}원
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Right: Add-ons & Total */}
            <div className="lg:col-span-6 space-y-4">
              <label className="block text-xs font-bold text-slate-700">2. 추가 옵션 선택 (선택 사항)</label>
              <div className="space-y-2">
                {ADDONS_LIST.map((addon) => {
                  const isChecked = selectedAddons.includes(addon.id);
                  return (
                    <button
                      key={addon.id}
                      onClick={() => toggleAddon(addon.id)}
                      className={`w-full p-3 rounded-xl text-left border text-xs flex items-center justify-between transition-colors cursor-pointer ${
                        isChecked
                          ? 'border-[#580096] bg-white text-slate-900'
                          : 'border-slate-200 bg-white/60 text-slate-600 hover:bg-white'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <div className={`w-4 h-4 rounded flex items-center justify-center ${isChecked ? 'bg-[#580096] text-white' : 'border border-slate-300'}`}>
                          {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                        <span>{addon.name}</span>
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Total Box */}
              <div className="p-4 rounded-2xl bg-white border border-purple-200 flex items-center justify-between mt-4">
                <div>
                  <div className="text-xs text-slate-500">예상 견적 금액</div>
                  <div className="text-2xl font-black text-[#580096]">
                    {calculateTotalEstimate().toLocaleString()}원
                  </div>
                </div>
                <a
                  href="#design-brief-form"
                  className="px-5 py-2.5 rounded-xl bg-[#580096] hover:bg-[#48007d] text-white font-bold text-xs"
                >
                  이 견적으로 작성하기
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Past Client Portfolio Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            딩스튜디오 포트폴리오
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-2">
            다양한 브랜드와 함께한 성공적인 디자인 프로젝트 사례를 확인해보세요.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {PORTFOLIO_DATA.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedProject(item)}
              className="group bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 cursor-pointer"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <span className="text-white text-xs font-bold flex items-center gap-1">
                    <Eye className="w-3.5 h-3.5" />
                    <span>자세히 보기</span>
                  </span>
                </div>
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-white/90 text-slate-900 backdrop-blur-xs">
                    {item.categoryLabel}
                  </span>
                </div>
              </div>

              <div className="p-4">
                <h4 className="text-base font-bold text-slate-900 group-hover:text-[#580096] transition-colors">
                  {item.title}
                </h4>
                <p className="text-xs text-slate-500 mt-1 line-clamp-1">
                  {item.client} · {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Design Request Brief Form (스마트 온라인 의뢰서) */}
      <section id="design-brief-form" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 scroll-mt-24">
        
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-6 sm:p-10">
          
          <div className="text-center max-w-lg mx-auto mb-8">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-purple-100 text-[#580096]">
              온라인 프로젝트 의뢰서
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
              프로젝트 의뢰 및 견적 요청
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              아래 항목을 작성해주시면 내용을 검토한 후 24시간 이내에 전담 디렉터가 맞춤 제안 및 상세 견적을 안내해 드립니다.
            </p>
          </div>

          {isSubmitted ? (
            <div className="py-12 text-center space-y-4 animate-in fade-in duration-300">
              <div className="w-16 h-16 rounded-full bg-green-100 text-green-600 mx-auto flex items-center justify-center">
                <Check className="w-8 h-8 stroke-[3]" />
              </div>
              <h4 className="text-2xl font-black text-slate-900">
                의뢰서가 성공적으로 접수되었습니다!
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                작성해주신 <strong>{formData.brandName || formData.clientName}</strong> 프로젝트 내용을 확인 후<br />
                <strong>{formData.contactPhone}</strong> 번호로 신속히 연락드리겠습니다.
              </p>

              <div className="pt-4 flex justify-center">
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-bold transition-colors"
                >
                  새로운 의뢰서 작성
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Row 1: Client Name & Brand Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    의뢰자/담당자 성함 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="예: 김디자인"
                    value={formData.clientName}
                    onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:border-[#580096]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    브랜드 / 회사명 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="예: 딩카페 (미정이면 가칭 입력)"
                    value={formData.brandName}
                    onChange={(e) => setFormData({ ...formData, brandName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:border-[#580096]"
                  />
                </div>
              </div>

              {/* Row 2: Service Type & Industry */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    의뢰 서비스 분야 <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.serviceType}
                    onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:border-[#580096]"
                  >
                    <option value="logo">로고 &amp; 브랜드 아이덴티티 (BI/CI)</option>
                    <option value="web">반응형 웹사이트 &amp; 랜딩페이지 (아임웹)</option>
                    <option value="detail">상세페이지 &amp; 프로모션 그래픽</option>
                    <option value="all-in-one">올인원 풀 브랜딩 솔루션</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    업종 / 카테고리
                  </label>
                  <select
                    value={formData.industry}
                    onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:border-[#580096]"
                  >
                    <option value="F&B / 카페 / 식음료">F&B / 카페 / 식음료</option>
                    <option value="뷰티 / 코스메틱 / 패션">뷰티 / 코스메틱 / 패션</option>
                    <option value="IT / 테크 / 스타트업">IT / 테크 / 스타트업</option>
                    <option value="교육 / 컨설팅 / 전문직">교육 / 컨설팅 / 전문직</option>
                    <option value="이커머스 / 쇼핑몰">이커머스 / 쇼핑몰</option>
                    <option value="기타">기타 업종</option>
                  </select>
                </div>
              </div>

              {/* Row 3: Style & Mood Keywords */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  선호하는 스타일 &amp; 무드 키워드 (복수 선택 가능)
                </label>
                <div className="flex flex-wrap gap-2">
                  {availableStyleKeywords.map((kw) => {
                    const isSelected = formData.styleKeywords.includes(kw);
                    return (
                      <button
                        type="button"
                        key={kw}
                        onClick={() => toggleStyleKeyword(kw)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${
                          isSelected
                            ? 'bg-[#580096] text-white border-[#580096]'
                            : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {kw}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Row 4: Budget & Deadline */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    예상 예산 범위
                  </label>
                  <select
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:border-[#580096]"
                  >
                    <option value="50만원 ~ 100만원">50만원 ~ 100만원</option>
                    <option value="100만원 ~ 200만원">100만원 ~ 200만원</option>
                    <option value="200만원 ~ 300만원">200만원 ~ 300만원</option>
                    <option value="300만원 이상">300만원 이상</option>
                    <option value="상담 후 결정">상담 후 결정</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    희망 론칭 / 납품 마감일
                  </label>
                  <select
                    value={formData.deadline}
                    onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:border-[#580096]"
                  >
                    <option value="1주일 이내 (급행 협의)">1주일 이내 (급행 협의)</option>
                    <option value="2주 이내">2주 이내</option>
                    <option value="1달 이내">1달 이내</option>
                    <option value="일정 여유 있음">일정 여유 있음</option>
                  </select>
                </div>
              </div>

              {/* Row 5: Project Description & Reference */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  프로젝트 상세 내용 및 요청사항 <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="브랜드에 대한 간단한 소개, 원하는 디자인 방향성, 필수 요청사항 등을 자유롭게 작성해주세요."
                  value={formData.projectDescription}
                  onChange={(e) => setFormData({ ...formData, projectDescription: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:border-[#580096]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  참고 레퍼런스 링크 (선택)
                </label>
                <input
                  type="text"
                  placeholder="참고하고 싶은 웹사이트 URL, 핀터레스트 무드보드 링크 등"
                  value={formData.referenceLink}
                  onChange={(e) => setFormData({ ...formData, referenceLink: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:border-[#580096]"
                />
              </div>

              {/* Row 6: Contact Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    연락처 (휴대폰 번호) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="010-1234-5678"
                    value={formData.contactPhone}
                    onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:border-[#580096]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    이메일 주소 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="example@company.com"
                    value={formData.contactEmail}
                    onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:border-[#580096]"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <p className="text-xs text-slate-500">
                  * 접수된 정보는 상담 목적 외에 사용되지 않습니다.
                </p>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-8 py-3.5 rounded-xl bg-[#580096] hover:bg-[#48007d] text-white font-bold text-sm shadow-md flex items-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? '접수 처리 중...' : '디자인 의뢰서 제출하기'}</span>
                </button>
              </div>

            </form>
          )}

        </div>

      </section>

      {/* 6. Studio Process Timeline */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-slate-50 rounded-3xl my-12 border border-slate-200">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            프로젝트 진행 프로세스
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-2">
            체계적이고 투명한 4단계 프로세스로 만족스러운 결과물을 완성합니다.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <div className="text-xs font-black text-[#580096] mb-1">STEP 01</div>
            <h4 className="text-base font-bold text-slate-900 mb-2">의뢰 접수 &amp; 심층 상담</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              의뢰서를 바탕으로 브랜드 방향성, 일정, 예산을 조율하고 정식 견적 및 계약서를 작성합니다.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <div className="text-xs font-black text-[#580096] mb-1">STEP 02</div>
            <h4 className="text-base font-bold text-slate-900 mb-2">무드보드 &amp; 기획 수립</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              타겟 시장 분석 후 컬러 팔레트, 폰트 무드보드 및 와이어프레임 구조를 확정합니다.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <div className="text-xs font-black text-[#580096] mb-1">STEP 03</div>
            <h4 className="text-base font-bold text-slate-900 mb-2">시안 개발 &amp; 피드백</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              독창적인 시안을 제안하고, 클라이언트의 피드백을 반영하여 디테일을 정교하게 보정합니다.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <div className="text-xs font-black text-[#580096] mb-1">STEP 04</div>
            <h4 className="text-base font-bold text-slate-900 mb-2">최종 납품 &amp; 가이드북</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              인쇄/웹용 원본 파일(AI, SVG, PSD) 및 브랜드 가이드북, 도메인 연결을 완료합니다.
            </p>
          </div>
        </div>
      </section>

      {/* Project Detail Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onInquire={() => {
          setSelectedProject(null);
          const el = document.getElementById('design-brief-form');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />

    </div>
  );
};
