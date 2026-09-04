import React, { useEffect } from 'react';
import { X, ExternalLink, Calendar, User, Tag, CheckCircle2, ArrowRight } from 'lucide-react';
import { PortfolioProject } from '../types';

interface ProjectModalProps {
  project: PortfolioProject | null;
  onClose: () => void;
  onInquire: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose, onInquire }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      id="project-detail-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white border border-slate-200 rounded-3xl shadow-2xl text-left my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          id="close-project-modal-btn"
          onClick={onClose}
          className="absolute top-5 right-5 z-20 p-2.5 rounded-full bg-black/60 hover:bg-black/80 text-white transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Cover Hero */}
        <div className="relative aspect-[16/9] sm:aspect-[21/9] w-full overflow-hidden bg-slate-100">
          <img
            src={project.coverImage || project.thumbnail}
            alt={project.title}
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
          
          <div className="absolute bottom-6 left-6 right-6">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-400 text-slate-950 uppercase tracking-wider mb-2 inline-block">
              {project.categoryLabel}
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              {project.title}
            </h2>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-8">
          
          {/* Metadata Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-purple-50/60 border border-purple-200">
            <div>
              <div className="text-xs text-slate-500 flex items-center gap-1 mb-0.5">
                <User className="w-3.5 h-3.5 text-[#580096]" /> Client
              </div>
              <div className="text-sm font-semibold text-slate-900">{project.client}</div>
            </div>
            <div>
              <div className="text-xs text-slate-500 flex items-center gap-1 mb-0.5">
                <Calendar className="w-3.5 h-3.5 text-[#580096]" /> Year
              </div>
              <div className="text-sm font-semibold text-slate-900">{project.year}</div>
            </div>
            <div>
              <div className="text-xs text-slate-500 flex items-center gap-1 mb-0.5">
                <Tag className="w-3.5 h-3.5 text-[#580096]" /> Scope
              </div>
              <div className="text-sm font-semibold text-slate-900">{project.categoryLabel}</div>
            </div>
            <div>
              <div className="text-xs text-slate-500 mb-0.5">Tools</div>
              <div className="text-sm font-semibold text-[#580096]">{project.tools.slice(0, 2).join(', ')}</div>
            </div>
          </div>

          {/* Project Summary & Narrative */}
          <div className="space-y-3">
            <h3 className="text-lg font-bold text-slate-900">프로젝트 개요</h3>
            <p className="text-base text-slate-600 leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Key Achievements / Highlights */}
          {project.highlights && project.highlights.length > 0 && (
            <div className="p-5 rounded-2xl bg-purple-50 border border-purple-200">
              <h3 className="text-sm font-bold text-[#580096] mb-3 uppercase tracking-wider">
                Key Deliverables &amp; Results
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {project.highlights.map((h, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Project Image Gallery */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-slate-900">디테일 비주얼 갤러리</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {project.images.map((img, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 aspect-[4/3]"
                >
                  <img
                    src={img}
                    alt={`${project.title} detail ${idx + 1}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Tools & Tags */}
          <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-200">
            {project.tags.map((t, idx) => (
              <span
                key={idx}
                className="px-3 py-1 rounded-lg text-xs bg-purple-50 text-[#580096] border border-purple-200 font-medium"
              >
                #{t}
              </span>
            ))}
          </div>

          {/* Bottom Action CTA inside Modal */}
          <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-slate-500 text-center sm:text-left">
              이런 스타일의 로고 또는 웹사이트 제작을 원하시나요?
            </div>
            <button
              id="modal-inquire-project-btn"
              onClick={() => {
                onClose();
                onInquire();
              }}
              className="w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-xs sm:text-sm bg-amber-400 hover:bg-amber-300 text-slate-950 shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>이 프로젝트 스타일로 의뢰하기</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
