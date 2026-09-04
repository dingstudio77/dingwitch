import React, { useState } from 'react';
import { 
  Send, 
  CheckCircle2, 
  GraduationCap, 
  Handshake, 
  Palette, 
  Check, 
  ArrowRight
} from 'lucide-react';
import { motion } from 'motion/react';
import { STUDIO_INFO } from '../data/mockData';
import { triggerSafeConfetti } from '../utils/confetti';
import { saveInquiry } from '../utils/storage';
import { InquiryCategory } from '../types';

interface ContactSectionProps {
  onNotify: (msg: string) => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onNotify }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [category, setCategory] = useState<InquiryCategory>('강의 문의');
  const [message, setMessage] = useState('');

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
      desc: '브랜드 제휴, 유튜브 PPL·광고 협업',
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
      // Save locally to storage for admin records
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
    setCategory('강의 문의');
    setMessage('');
    setSubmittedData(null);
  };

  return (
    <section
      id="collaboration-inquiry-section"
      className="relative py-20 sm:py-28 bg-gradient-to-b from-slate-50/60 via-white to-purple-50/30 border-t border-slate-200/80 overflow-hidden scroll-mt-16 sm:scroll-mt-20"
    >
      {/* Ambience Glows */}
      <div className="absolute top-1/4 left-10 w-[500px] h-[500px] bg-purple-100/40 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-amber-100/40 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-10 sm:mb-12"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            협업 문의 / 디자인 의뢰
          </h2>
        </motion.div>

        {/* Centered Inquiry Form */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.7, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mx-auto"
        >
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xl shadow-purple-950/5 p-6 sm:p-10 relative">
            
            {isSubmitted && submittedData ? (
              <div className="py-10 text-center space-y-5 animate-in zoom-in-95 duration-300">
                <div className="w-16 h-16 rounded-full bg-emerald-100 border-2 border-emerald-500 mx-auto flex items-center justify-center text-emerald-600 shadow-sm">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                
                <div>
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-purple-100 text-[#580096] mb-2">
                    {submittedData.category}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                    문의가 성공적으로 접수되었습니다!
                  </h3>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                  <strong className="text-slate-900">{submittedData.name}</strong> 님, 소중한 문의 감사합니다.<br />
                  작성해 주신 이메일(<strong className="text-[#580096]">{submittedData.email}</strong>) 및 연락처({submittedData.phone})로 
                  24시간 이내에 담당 디렉터가 확인 후 안내 연락을 드리겠습니다.
                </p>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 max-w-sm mx-auto text-left text-xs space-y-1.5 text-slate-600">
                  <div><span className="font-semibold text-slate-400">문의 항목:</span> {submittedData.category}</div>
                  <div><span className="font-semibold text-slate-400">성함 / 담당자:</span> {submittedData.name}</div>
                  <div><span className="font-semibold text-slate-400">연락처:</span> {submittedData.phone}</div>
                  <div><span className="font-semibold text-slate-400">이메일:</span> {submittedData.email}</div>
                </div>

                <div className="pt-4 flex items-center justify-center">
                  <button
                    id="reset-collaboration-form-btn"
                    type="button"
                    onClick={handleResetForm}
                    className="px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-slate-900 hover:bg-slate-800 transition-colors cursor-pointer shadow-xs"
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
                
                {/* 1. 이름 : */}
                <div>
                  <label 
                    htmlFor="inquiry-name-input"
                    className="block text-xs sm:text-sm font-bold text-slate-800 mb-1.5"
                  >
                    이름 : <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="inquiry-name-input"
                    name="name"
                    type="text"
                    required
                    placeholder="성함 또는 기업/담당자명을 입력해 주세요"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-[#580096] focus:bg-white focus:ring-2 focus:ring-purple-600/20 transition-all placeholder:text-slate-400"
                  />
                </div>

                {/* 2. 연락처 : & 3. 이메일 : (2 Columns) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label 
                      htmlFor="inquiry-phone-input"
                      className="block text-xs sm:text-sm font-bold text-slate-800 mb-1.5"
                    >
                      연락처 : <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="inquiry-phone-input"
                      name="phone"
                      type="tel"
                      required
                      placeholder="010-0000-0000"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-[#580096] focus:bg-white focus:ring-2 focus:ring-purple-600/20 transition-all placeholder:text-slate-400"
                    />
                  </div>

                  <div>
                    <label 
                      htmlFor="inquiry-email-input"
                      className="block text-xs sm:text-sm font-bold text-slate-800 mb-1.5"
                    >
                      이메일 : <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="inquiry-email-input"
                      name="email"
                      type="email"
                      required
                      placeholder="example@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-[#580096] focus:bg-white focus:ring-2 focus:ring-purple-600/20 transition-all placeholder:text-slate-400"
                    />
                  </div>
                </div>

                {/* Hidden input for category */}
                <input type="hidden" name="category" value={category} />

                {/* 4. 선택 : 강의 문의 / 협업 제안 / 디자인 의뢰 */}
                <div>
                  <label className="block text-xs sm:text-sm font-bold text-slate-800 mb-2">
                    선택 : <span className="text-[#580096] font-semibold">강의 문의 / 협업 제안 / 디자인 의뢰</span> <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {categoryOptions.map((opt) => {
                      const isSelected = category === opt.value;
                      return (
                        <button
                          type="button"
                          key={opt.value}
                          id={`inquiry-category-btn-${opt.value}`}
                          onClick={() => setCategory(opt.value)}
                          className={`p-3.5 rounded-2xl text-left border transition-all cursor-pointer relative ${
                            isSelected
                              ? 'bg-purple-50/80 border-[#580096] shadow-sm ring-2 ring-purple-600/20 text-[#580096]'
                              : 'bg-slate-50/70 border-slate-200 hover:border-purple-300 hover:bg-slate-50 text-slate-700'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1.5">
                            <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                              isSelected ? 'bg-[#580096] text-white' : 'bg-slate-200 text-slate-600'
                            }`}>
                              {opt.icon}
                            </div>
                            {isSelected && (
                              <div className="w-5 h-5 rounded-full bg-[#580096] text-white flex items-center justify-center text-[10px]">
                                <Check className="w-3 h-3 stroke-[3]" />
                              </div>
                            )}
                          </div>
                          <div className="text-xs sm:text-sm font-bold text-slate-900">
                            {opt.title}
                          </div>
                          <div className="text-[11px] text-slate-500 mt-0.5 line-clamp-1 leading-snug">
                            {opt.desc}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 5. 문의내용을 적어주세요 */}
                <div>
                  <label 
                    htmlFor="inquiry-message-textarea"
                    className="block text-xs sm:text-sm font-bold text-slate-800 mb-1.5"
                  >
                    문의내용을 적어주세요 <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="inquiry-message-textarea"
                    name="message"
                    required
                    rows={5}
                    placeholder="문의하시고자 하는 내용(프로젝트 개요, 희망 일정, 예산 범위, 참고 레퍼런스 등)을 자유롭게 적어주세요."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-[#580096] focus:bg-white focus:ring-2 focus:ring-purple-600/20 transition-all placeholder:text-slate-400 resize-none leading-relaxed"
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <motion.button
                    id="inquiry-submit-btn"
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-4 rounded-2xl font-black text-sm sm:text-base bg-[#580096] hover:bg-[#47007a] text-white shadow-lg shadow-purple-950/20 transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    <Send className="w-4 h-4" />
                    <span>{isSubmitting ? '문의 접수 처리 중...' : '문의 접수하기'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                  <p className="text-[11px] text-slate-400 text-center mt-2.5">
                    * 입력해 주신 정보는 문의 회신 목적으로만 안전하게 보관되며, 외부에 공개되지 않습니다.
                  </p>
                </div>

              </form>
            )}

          </div>
        </motion.div>

      </div>
    </section>
  );
};
