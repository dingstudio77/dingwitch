import React from 'react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { EBOOKS_DATA } from '../data/mockData';

interface BookSectionProps {
  onNotify: (msg: string) => void;
  onNavigate?: (pageOrSection: string) => void;
}

export const BookSection: React.FC<BookSectionProps> = ({ onNavigate }) => {
  const handleGoToEBook = () => {
    if (onNavigate) {
      onNavigate('ebook');
    }
  };

  return (
    <section
      id="book-section"
      className="relative py-20 sm:py-32 bg-white overflow-hidden border-t border-slate-200/80"
    >
      {/* Background Ambience */}
      <div className="absolute top-1/4 -left-20 w-[500px] h-[500px] bg-purple-100/40 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 -right-20 w-[500px] h-[500px] bg-amber-100/30 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12 sm:mb-16 text-left"
        >
          <div>
            <h2 className="relative inline-flex items-center text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
              <span>BOOK</span>
              <span className="w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full bg-gradient-to-tr from-[#580096] via-[#7B1FA2] to-[#A855F7] -translate-y-3 sm:-translate-y-4 translate-x-1.5" />
            </h2>
          </div>

          <motion.button
            whileTap={{ scale: 0.96 }}
            onClick={handleGoToEBook}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#580096] hover:text-[#450075] transition-colors group cursor-pointer"
          >
            <span>전체 전자책 보러가기</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </motion.div>

        {/* Clean EBook Images - 3 Books with Pure Fade In */}
        <div className="grid grid-cols-3 gap-3 sm:gap-6 md:gap-8 lg:gap-10 max-w-5xl mx-auto">
          {EBOOKS_DATA.slice(0, 3).map((book, idx) => (
            <motion.div
              key={book.id}
              id={`book-card-${book.id}`}
              onClick={handleGoToEBook}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.7, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ scale: 1.03 }}
              className="group cursor-pointer flex flex-col items-center"
            >
              <div className="relative w-full aspect-[3/4] rounded-xl sm:rounded-2xl overflow-hidden shadow-md sm:shadow-xl group-hover:shadow-2xl group-hover:shadow-purple-900/20 transition-all duration-300 border border-slate-200/80 bg-slate-50">
                <img
                  src={book.coverImage}
                  alt={book.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Subtle sheen highlight traversing across on hover */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
