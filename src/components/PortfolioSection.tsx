import React, { useState } from 'react';
import { Layers, ArrowUpRight, Sparkles, Filter, Eye } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/mockData';
import { PortfolioProject } from '../types';
import { ProjectModal } from './ProjectModal';

interface PortfolioSectionProps {
  onInquire: () => void;
}

export const PortfolioSection: React.FC<PortfolioSectionProps> = ({ onInquire }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeProject, setActiveProject] = useState<PortfolioProject | null>(null);

  const categories = [
    { id: 'all', label: '전체 (ALL)' },
    { id: 'logo', label: '로고 디자인' },
    { id: 'web', label: '홈페이지 제작' },
    { id: 'branding', label: '브랜딩 & 웹' },
    { id: 'package', label: '패키지 & 그래픽' },
  ];

  const filteredProjects = selectedCategory === 'all'
    ? PORTFOLIO_DATA
    : PORTFOLIO_DATA.filter((p) => p.category === selectedCategory);

  return (
    <section
      id="portfolio"
      className="relative py-20 sm:py-32 bg-slate-50/50 border-t border-slate-200/80 overflow-hidden"
    >
      {/* Ambient background glow */}
      <div className="absolute top-1/4 left-10 w-[500px] h-[500px] bg-purple-100/40 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-[500px] h-[500px] bg-indigo-100/30 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header & Subtitle */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-purple-50 border border-purple-200 text-purple-900 text-xs font-semibold uppercase tracking-wider mb-3">
              <Layers className="w-3.5 h-3.5 text-[#580096]" />
              <span>Selected Works</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
              보는 순간 시선을 사로잡는 <br />
              <span className="text-[#580096]">대표 디자인 포트폴리오</span>
            </h2>
          </div>

          <p className="text-sm sm:text-base text-slate-600 max-w-md">
            로고 브랜딩부터 반응형 인터랙티브 웹까지, 비즈니스의 가치를 극대화한 대표 프로젝트 아카이브입니다.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 scrollbar-none">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                id={`portfolio-filter-${cat.id}`}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-150 whitespace-nowrap cursor-pointer ${
                  isSelected
                    ? 'bg-[#580096] text-white shadow-xs'
                    : 'bg-white hover:bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-200'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Portfolio Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              id={`portfolio-card-${project.id}`}
              onClick={() => setActiveProject(project)}
              className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-xs hover:shadow-lg hover:border-purple-300 transition-all duration-200 cursor-pointer flex flex-col group"
            >
              {/* Thumbnail Container */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
                <img
                  src={project.thumbnail}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />

                {/* Hover overlay with interactive reveal */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-5 flex flex-col justify-between">
                  {/* Top tags */}
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-amber-400 text-slate-950">
                      {project.categoryLabel}
                    </span>
                    <span className="w-8 h-8 rounded-lg bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
                      <ArrowUpRight className="w-4 h-4" />
                    </span>
                  </div>

                  {/* Bottom reveal info */}
                  <div>
                    <div className="text-xs text-amber-300 font-semibold mb-1">
                      {project.client} • {project.year}
                    </div>
                    <h3 className="text-base font-bold text-white leading-tight">
                      {project.title}
                    </h3>
                  </div>
                </div>

                {/* Always visible category badge for mobile/quick view */}
                <div className="absolute top-3 left-3 group-hover:opacity-0 transition-opacity">
                  <span className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-white/95 text-[#580096] border border-purple-100 shadow-xs">
                    {project.categoryLabel}
                  </span>
                </div>
              </div>

              {/* Card Meta Content (Visible under thumbnail) */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="text-xs font-semibold text-purple-700 mb-1">
                    {project.client}
                  </div>
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-[#580096] transition-colors leading-snug mb-2">
                    {project.title}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    {project.summary}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-3 mt-3 border-t border-slate-100">
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.slice(0, 2).map((tag, idx) => (
                      <span key={idx} className="text-[11px] text-purple-600 font-medium">
                        #{tag}
                      </span>
                    ))}
                  </div>
                  <span className="text-xs font-bold text-[#580096] group-hover:text-purple-800 flex items-center gap-1">
                    상세보기
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Bottom Portfolio CTA Bar */}
        <div className="mt-14 p-6 sm:p-8 rounded-2xl bg-purple-50/60 border border-purple-100 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-1">
              원하시는 스타일의 프로젝트를 찾으셨나요?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600">
              브랜드의 콘셉트와 예산에 맞춘 맞춤형 로고 &amp; 웹사이트 제작 상담을 무료로 진행해 드립니다.
            </p>
          </div>
          <button
            id="portfolio-bottom-inquire-btn"
            onClick={onInquire}
            className="px-6 py-3 rounded-xl font-bold text-xs sm:text-sm bg-amber-400 hover:bg-amber-300 text-slate-950 shadow-sm transition-all whitespace-nowrap cursor-pointer"
          >
            맞춤 프로젝트 의뢰하기
          </button>
        </div>

      </div>

      {/* Detail Project Modal */}
      <ProjectModal
        project={activeProject}
        onClose={() => setActiveProject(null)}
        onInquire={onInquire}
      />
    </section>
  );
};
