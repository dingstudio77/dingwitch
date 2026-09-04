import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { FAQS_DATA } from '../data/mockData';

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      id="faq-section"
      className="relative py-16 sm:py-24 bg-white"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <h2 className="relative inline-flex items-center justify-center text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            <span>자주 묻는 질문</span>
            <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-gradient-to-tr from-[#580096] via-[#7B1FA2] to-[#A855F7] -translate-y-2.5 sm:-translate-y-3.5 translate-x-1.5" />
          </h2>
        </motion.div>

        {/* Accordion List */}
        <div className="space-y-3.5">
          {FAQS_DATA.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <motion.div
                key={idx}
                id={`faq-item-${idx}`}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.6, delay: idx * 0.06, ease: [0.16, 1, 0.3, 1] }}
                className="rounded-2xl bg-white border border-slate-200 shadow-xs overflow-hidden transition-all duration-200 hover:border-purple-300"
              >
                <button
                  onClick={() => toggleFAQ(idx)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                >
                  <span className="text-sm sm:text-base font-bold text-slate-900 flex items-center gap-3">
                    <span className="text-[#580096] font-display font-black">Q.</span>
                    <span>{faq.q}</span>
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 text-[#580096]' : ''
                    }`}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: [0.04, 0.62, 0.23, 0.98] }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pt-2 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                        <div className="flex items-start gap-3 mt-1">
                          <span className="text-[#580096] font-bold font-display shrink-0 mt-0.5">A.</span>
                          <div className="flex-1 whitespace-pre-line space-y-1">
                            {faq.a.split('\n').map((line, lineIdx) => {
                              const urlMatch = line.match(/(https?:\/\/[^\s)]+)/);
                              if (urlMatch) {
                                const [fullUrl] = urlMatch;
                                const parts = line.split(fullUrl);
                                return (
                                  <p key={lineIdx}>
                                    {parts[0]}
                                    <a
                                      href={fullUrl}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-[#580096] font-semibold underline underline-offset-2 hover:text-[#7B1FA2] transition-colors break-all"
                                    >
                                      {fullUrl}
                                    </a>
                                    {parts[1]}
                                  </p>
                                );
                              }
                              return <p key={lineIdx}>{line}</p>;
                            })}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
