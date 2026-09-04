import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { StatsCounter } from './components/StatsCounter';
import { AboutSection } from './components/AboutSection';
import { ToolsTickerSection } from './components/ToolsTickerSection';
import { BookSection } from './components/BookSection';
import { ClassSection } from './components/ClassSection';
import { ReviewSection } from './components/ReviewSection';
import { YouTubeSection } from './components/YouTubeSection';
import { NewsletterSection } from './components/NewsletterSection';
import { FAQSection } from './components/FAQSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ClassPage } from './components/ClassPage';
import { EBookPage } from './components/EBookPage';
import { YouTubePage } from './components/YouTubePage';
import { InquiryPage } from './components/InquiryPage';
import { DesignRequestPage } from './components/DesignRequestPage';
import { FreeResourcePage } from './components/FreeResourcePage';
import { AdminPage } from './components/AdminPage';
import { Sparkles, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { YouTubeVideoItem } from './types';
import { getYouTubeVideos } from './utils/storage';
import { 
  initYouTubeFirebaseSync, 
  initPreRegistrationsFirebaseSync, 
  initInquiriesFirebaseSync 
} from './utils/firebaseSync';

export default function App() {
  const [activePage, setActivePage] = useState<string>('home');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [ebookResetKey, setEbookResetKey] = useState<number>(0);
  const [youtubeVideos, setYoutubeVideos] = useState<YouTubeVideoItem[]>(() => getYouTubeVideos());

  React.useEffect(() => {
    // 1. Initialize Firebase Cloud Database Real-time Listeners
    const unsubYouTube = initYouTubeFirebaseSync((updated) => {
      setYoutubeVideos(updated);
    });
    const unsubPreReg = initPreRegistrationsFirebaseSync();
    const unsubInq = initInquiriesFirebaseSync();

    // 2. Local update listeners
    const handleYouTubeUpdate = (e: Event) => {
      const customEvent = e as CustomEvent<YouTubeVideoItem[]>;
      if (customEvent.detail && Array.isArray(customEvent.detail)) {
        setYoutubeVideos(customEvent.detail);
      } else {
        setYoutubeVideos(getYouTubeVideos());
      }
    };

    window.addEventListener('ding_youtube_videos_updated', handleYouTubeUpdate);
    window.addEventListener('storage', handleYouTubeUpdate);
    return () => {
      unsubYouTube();
      unsubPreReg();
      unsubInq();
      window.removeEventListener('ding_youtube_videos_updated', handleYouTubeUpdate);
      window.removeEventListener('storage', handleYouTubeUpdate);
    };
  }, []);

  React.useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '');
      if (['home', 'class', 'ebook', 'youtube', 'inquiry', 'free', 'request', 'admin'].includes(hash)) {
        setActivePage(hash);
        if (hash === 'ebook') {
          setEbookResetKey((prev) => prev + 1);
        }
      }
    };
    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const handleNavigate = (pageOrSectionId: string) => {
    if (pageOrSectionId === 'ebook') {
      setEbookResetKey((prev) => prev + 1);
    }

    // Direct multi-page routes
    if (['home', 'class', 'ebook', 'youtube', 'inquiry', 'free', 'request', 'admin'].includes(pageOrSectionId)) {
      setActivePage(pageOrSectionId);
      window.location.hash = pageOrSectionId;
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // Section anchor aliases redirect to new dedicated pages
    if (pageOrSectionId === 'youtube-section') {
      setActivePage('youtube');
      window.location.hash = 'youtube';
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (pageOrSectionId === 'collaboration-inquiry-section' || pageOrSectionId === 'contact') {
      setActivePage('inquiry');
      window.location.hash = 'inquiry';
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // If on subpage and clicked a home anchor
    if (activePage !== 'home') {
      setActivePage('home');
      window.location.hash = '';
      setTimeout(() => {
        const targetEl = document.getElementById(pageOrSectionId);
        if (targetEl) {
          targetEl.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
      return;
    }

    // Scroll to section on home page
    const targetEl = document.getElementById(pageOrSectionId);
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 5000);
  };

  return (
    <div id="ding-studio-app" className="min-h-screen bg-white text-slate-900 relative selection:bg-purple-600 selection:text-white flex flex-col justify-between">
      
      {/* Sticky Global Navigation (Hidden on Admin page) */}
      {activePage !== 'admin' && (
        <Header activeSection={activePage} onNavigate={handleNavigate} />
      )}

      {/* Main Content Pages with Smooth Transition */}
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={activePage + (activePage === 'ebook' ? `-${ebookResetKey}` : '')}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
          >
            {activePage === 'home' && (
              <div>
                {/* HOME / Hero Section */}
                <Hero onNavigate={handleNavigate} />

                {/* Social Proof / Big Numbers Counter */}
                <StatsCounter />

                {/* ABOUT / Designer Influencer Profile */}
                <AboutSection onNavigate={handleNavigate} />

                {/* TOOLS / Design & Business Tool Stack Marquee */}
                <ToolsTickerSection />

                {/* BOOK / Design E-Books */}
                <BookSection onNotify={showToast} onNavigate={handleNavigate} />

                {/* CLASS / Online Design Masterclass */}
                <ClassSection onNotify={showToast} onNavigate={handleNavigate} />

                {/* REVIEW / Student Testimonials & Slider */}
                <ReviewSection onNotify={showToast} />

                {/* YOUTUBE / YouTube Videos */}
                <YouTubeSection 
                  videos={youtubeVideos.slice(0, 6)}
                  totalVideoCount={youtubeVideos.length}
                  onNotify={showToast} 
                  onNavigate={handleNavigate} 
                />

                {/* NEWSLETTER / Weekly Design Insights */}
                <NewsletterSection onNotify={showToast} />

                {/* FAQ Section */}
                <FAQSection />

                {/* INQUIRY / Collaboration & Design Request Form */}
                <ContactSection onNotify={showToast} />
              </div>
            )}

            {activePage === 'class' && (
              <ClassPage 
                onNotify={showToast} 
                onNavigateToRequest={() => handleNavigate('request')} 
              />
            )}

            {activePage === 'ebook' && (
              <EBookPage 
                key={ebookResetKey}
                onNotify={showToast} 
              />
            )}

            {activePage === 'youtube' && (
              <YouTubePage 
                videos={youtubeVideos}
                onNotify={showToast} 
              />
            )}

            {activePage === 'inquiry' && (
              <InquiryPage 
                onNotify={showToast} 
              />
            )}

            {activePage === 'free' && (
              <FreeResourcePage 
                onNotify={showToast} 
              />
            )}

            {activePage === 'request' && (
              <DesignRequestPage 
                onNotify={showToast} 
              />
            )}

            {activePage === 'admin' && (
              <AdminPage 
                onNotify={showToast} 
                onNavigateHome={() => handleNavigate('home')} 
                onNavigatePage={handleNavigate}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Global Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Toast Notification Banner */}
      {toastMessage && (
        <div
          id="global-toast-notification"
          className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 max-w-md w-[92%] sm:w-auto px-5 py-3.5 rounded-2xl bg-slate-900 border border-purple-500/50 shadow-2xl shadow-purple-950/40 flex items-center justify-between gap-3 text-xs sm:text-sm text-white animate-in slide-in-from-bottom-4 duration-300"
        >
          <div className="flex items-center gap-2.5">
            <Sparkles className="w-4 h-4 text-amber-300 shrink-0" />
            <span className="leading-snug">{toastMessage}</span>
          </div>
          <button
            onClick={() => setToastMessage(null)}
            className="text-slate-400 hover:text-white p-1 cursor-pointer"
            aria-label="Close notification"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

    </div>
  );
}
