import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { STUDIO_INFO } from '../data/mockData';
import { Logo } from './Logo';

interface HeaderProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ activeSection, onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'class', label: '강의' },
    { id: 'ebook', label: '전자책' },
    { id: 'youtube', label: '유튜브' },
    { id: 'inquiry', label: '의뢰문의' },
  ];

  const handleItemClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || mobileMenuOpen
          ? 'bg-white/95 backdrop-blur-md border-b border-slate-200/80 py-1.5 shadow-xs'
          : 'bg-transparent border-b border-transparent py-2 sm:py-2.5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <button
          id="header-logo-btn"
          onClick={() => handleItemClick('home')}
          className="flex items-center gap-2 text-left cursor-pointer focus:outline-none group py-0.5"
        >
          <Logo className="h-16 sm:h-20 md:h-[84px] w-auto transition-transform duration-200 group-hover:scale-105" variant="purple" />
        </button>

        {/* Desktop Navigation */}
        <nav id="desktop-nav" className="hidden md:flex items-center gap-6 lg:gap-8">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                id={`nav-link-${item.id}`}
                onClick={() => handleItemClick(item.id)}
                className={`group relative py-2 px-1 text-sm sm:text-[15px] font-semibold transition-colors duration-200 cursor-pointer ${
                  isActive
                    ? 'text-[#580096] font-bold'
                    : 'text-slate-700 hover:text-[#580096]'
                }`}
              >
                <span>{item.label}</span>
                {/* Purple underline indicator with smooth expansion animation */}
                <span
                  className={`absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#580096] rounded-full transition-all duration-300 origin-left ${
                    isActive
                      ? 'scale-x-100 opacity-100'
                      : 'scale-x-0 group-hover:scale-x-100 opacity-0 group-hover:opacity-100'
                  }`}
                />
              </button>
            );
          })}
        </nav>

        {/* Mobile Menu Trigger */}
        <div className="flex md:hidden items-center gap-2">
          <button
            id="mobile-menu-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-slate-700 hover:text-slate-950 hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-drawer"
          className="md:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 animate-in slide-in-from-top-2 duration-200 shadow-xl"
        >
          <div className="flex flex-col gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                id={`mobile-nav-link-${item.id}`}
                onClick={() => handleItemClick(item.id)}
                className={`w-full text-left px-4 py-3 rounded-xl text-sm font-semibold flex items-center justify-between transition-colors ${
                  activeSection === item.id
                    ? 'bg-purple-50 text-[#580096] font-bold border-l-4 border-[#580096]'
                    : 'text-slate-700 hover:bg-slate-50 hover:text-[#580096]'
                }`}
              >
                <span>{item.label}</span>
                <span className="text-xs text-[#580096]">→</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};
