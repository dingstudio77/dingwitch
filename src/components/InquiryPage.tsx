import React, { useState } from 'react';
import { 
  Send, 
  CheckCircle2, 
  GraduationCap, 
  Handshake, 
  Palette, 
  Phone, 
  Mail, 
  Clock, 
  ShieldCheck, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { InquiryCategory } from '../types';
import { saveInquiry } from '../utils/storage';
import { triggerSafeConfetti } from '../utils/confetti';

interface InquiryPageProps {
  onNotify: (msg: string) => void;
}

export const InquiryPage: React.FC<InquiryPageProps> = ({ onNotify }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [category, setCategory] = useState<InquiryCategory>('강의 문의');
  const [message, setMessage] = useState('');
  const [agreePrivacy, setAgreePrivacy] = useState(true);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState<{
    name: string;
    category: InquiryCategory;
    email: string;
    phone: string;
  } | null>(null);

  const categoryOptions: {
    value: InquiryCategory;
    title: string;
    desc: string;
    icon: React.ReactNode;
  }[] = [
    {
      value: '강의 문의',
      title: '강의 문의',
      desc: '기업 출강, 대학 특강, 단체 워크숍',
      icon: <GraduationCap className="w-4 h-4" />,
    },
    {
      value: '협업 제안',
      title: '협업 제안',
      desc: '브랜드 제휴, 유튜브 협업/스폰서십',
      icon: <Handshake className="w-4 h-4" />,
    },
    {
      value: '디자인 의뢰',
      title: '디자인 의뢰',
      desc: '로고 브랜딩, 반응형 웹, 상세페이지',
      icon: <Palette className="w-4 h-4" />,
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      onNotify('이름(성함 또는 기업/담당자명)을 입력해 주세요.');
      return;
    }
    if (!phone.trim()) {
      onNotify('연락처(휴대폰 번호)를 입력해 주세요.');
      return;
    }
    if (!email.trim()) {
      onNotify('이메일 주소를 입력해 주세요.');
      return;
    }
    if (!message.trim()) {
      onNotify('문의내용을 적어주세요.');
      return;
    }

    setIsSubmitting(true);

    try {
      // Send form data to Formspree endpoint
      await fetch('https://formspree.io/f/mpqwgepo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.trim(),
          email: email.trim(),
          category,
          message: message.trim(),
          _subject: `[딩스튜디오 문의] ${name.trim()} 님의 ${category}`,
          성함: name.trim(),
          연락처: phone.trim(),
          이메일: email.trim(),
          문의항목: category,
          문의내용: message.trim(),
          접수일시: new Date().toLocaleString('ko-KR'),
        }),
      });
    } catch (error) {
      console.warn('Formspree submission error:', error);
    } finally {
      // Save to storage
      saveInquiry({
        name: name.trim(),
        phone: phone.trim(),
        email: email.trim(),
        category,
        message: message.trim(),
      });

      setIsSubmitting(false);
      setIsSubmitted(true);
      setSubmittedData({
        name: name.trim(),
        category,
        email: email.trim(),
        phone: phone.trim(),
      });

      triggerSafeConfetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });

      onNotify(`${name} 님의 [${category}] 문의가 성공적으로 접수되었습니다. 24시간 이내에 회신드리겠습니다!`);
    }
  };

  const handleResetForm = () => {
    setIsSubmitted(false);
    setName('');
    setPhone('');
    setEmail('');
    setMessage('');
    setCategory('강의 문의');
  };

  return (
    <div id="inquiry-page" className="pt-24 pb-28 bg-slate-50/50 text-slate-900 animate-in fade-in duration-300">
      
      {/* Top Banner Header */}
      <section className="relative overflow-hidden py-14 sm:py-20 bg-gradient-to-b from-purple-50/70 via-white to-slate-50/50 border-b border-slate-200/80">
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-purple-100/50 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 left-0 w-80 h-80 bg-amber-50/40 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-purple-100/90 border border-purple-200 text-[#580096] text-xs font-bold uppercase tracking-wider mb-4 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-[#580096]" />
            <span>Collaboration &amp; Design Inquiry</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            협업 문의 / 디자인 의뢰
          </h1>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 sm:mt-12">
        
        {/* The Inquiry Form Card */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-lg p-6 sm:p-10 lg:p-12 relative overflow-hidden">
          
          {isSubmitted && submittedData ? (
            <div className="text-center py-10 sm:py-14 animate-in fade-in zoom-in-95 duration-300">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-5 shadow-xs">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mb-2">
                문의가 성공적으로 접수되었습니다
              </h3>
              <p className="text-slate-600 text-sm sm:text-base max-w-md mx-auto mb-6">
                <strong>{submittedData.name}</strong> 님, 남겨주신 [<strong>{submittedData.category}</strong>] 문의를 정성껏 검토한 후 24시간 이내에 <strong>{submittedData.email}</strong> 또는 <strong>{submittedData.phone}</strong>으로 연락드리겠습니다.
              </p>

              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-50 text-[#580096] text-xs font-semibold mb-8">
                <Clock className="w-4 h-4" />
                <span>영업일 기준 평균 3~6시간 이내 1차 회신</span>
              </div>

              <div>
                <button
                  onClick={handleResetForm}
                  className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm transition-colors cursor-pointer"
                >
                  추가 문의 작성하기
                </button>
              </div>
            </div>
          ) : (
            <form 
              action="https://formspree.io/f/mpqwgepo" 
              method="POST" 
              onSubmit={handleSubmit} 
              className="space-y-6"
            >
              
              {/* 1. 이름 */}
              <div>
                <label className="block text-sm font-bold text-slate-900 mb-2">
                  이름 : <span className="text-purple-600">*</span>
                </label>
                <input
                  name="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="성함 또는 기업/브랜드명과 담당자 직함을 적어주세요"
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#580096] transition-all"
                  required
                />
              </div>

              {/* 2. 연락처 & 3. 이메일 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-bold text-slate-900 mb-2">
                    연락처 : <span className="text-purple-600">*</span>
                  </label>
                  <input
                    name="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="010-0000-0000"
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#580096] transition-all"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-900 mb-2">
                    이메일 : <span className="text-purple-600">*</span>
                  </label>
                  <input
                    name="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="example@email.com"
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#580096] transition-all"
                    required
                  />
                </div>
              </div>

              {/* Hidden input for category */}
              <input type="hidden" name="category" value={category} />

              {/* 4. 선택 : 강의 문의 / 협업 제안 / 디자인 의뢰 */}
              <div>
                <label className="block text-sm font-bold text-slate-900 mb-2">
                  선택 : <span className="text-purple-600">*</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {categoryOptions.map((opt) => {
                    const isSelected = category === opt.value;
                    return (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => setCategory(opt.value)}
                        className={`p-4 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                          isSelected
                            ? 'bg-purple-50/90 border-[#580096] ring-2 ring-[#580096]/20 shadow-xs'
                            : 'bg-slate-50/60 hover:bg-white border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className={`p-1.5 rounded-lg ${isSelected ? 'bg-[#580096] text-white' : 'bg-slate-200 text-slate-700'}`}>
                            {opt.icon}
                          </span>
                          <span className={`w-4 h-4 rounded-full border flex items-center justify-center ${isSelected ? 'border-[#580096] bg-[#580096]' : 'border-slate-300'}`}>
                            {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                          </span>
                        </div>
                        <div>
                          <div className={`font-bold text-sm ${isSelected ? 'text-[#580096]' : 'text-slate-900'}`}>
                            {opt.title}
                          </div>
                          <div className="text-xs text-slate-500 mt-0.5">
                            {opt.desc}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 5. 문의내용을 적어주세요 */}
              <div>
                <label className="block text-sm font-bold text-slate-900 mb-2">
                  문의내용을 적어주세요 : <span className="text-purple-600">*</span>
                </label>
                <textarea
                  name="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={6}
                  placeholder={`문의하시고자 하는 내용을 자유롭게 작성해 주세요.
예) 
- 프로젝트 개요 및 희망 일정
- 원하시는 디자인 스타일 또는 참고 레퍼런스
- 강의 대상 인원 및 희망 주제/장소
- 대략적인 예산 범위`}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#580096] transition-all resize-y leading-relaxed"
                  required
                />
              </div>

              {/* 개인정보 처리 동의 */}
              <div className="pt-2 flex items-start gap-2.5">
                <input
                  type="checkbox"
                  id="agree-privacy-inquiry-page"
                  checked={agreePrivacy}
                  onChange={(e) => setAgreePrivacy(e.target.checked)}
                  className="mt-1 h-4 w-4 rounded border-slate-300 text-[#580096] focus:ring-[#580096] cursor-pointer"
                  required
                />
                <label htmlFor="agree-privacy-inquiry-page" className="text-xs text-slate-600 leading-normal cursor-pointer">
                  (필수) 문의 응대 및 일정 조율을 위한 성함, 연락처, 이메일 정보 수집 및 이용에 동의합니다.
                </label>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting || !agreePrivacy}
                  className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-[#580096] to-[#7B1FA2] hover:from-[#49007e] hover:to-[#6a188e] text-white font-black text-base shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>문의를 접수하는 중...</span>
                    </div>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>문의 접수하기</span>
                    </>
                  )}
                </button>
              </div>

            </form>
          )}

        </div>

      </div>

    </div>
  );
};
