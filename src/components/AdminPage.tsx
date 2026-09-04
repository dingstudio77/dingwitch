import React, { useState, useEffect } from 'react';
import { 
  Lock, 
  Unlock, 
  Eye, 
  EyeOff, 
  ShieldCheck, 
  Users, 
  Download, 
  Search, 
  Filter, 
  Trash2, 
  CheckCircle2, 
  Clock, 
  Phone, 
  Mail, 
  MessageSquare, 
  KeyRound, 
  RefreshCw, 
  ArrowLeft, 
  Sparkles, 
  Edit3, 
  X, 
  Copy, 
  AlertCircle,
  ExternalLink,
  ChevronRight,
  Youtube,
  Plus,
  Play,
  ArrowUp,
  ArrowDown,
  Image as ImageIcon,
  Link2,
  Tag,
  Check,
  RotateCcw
} from 'lucide-react';
import { PreRegistrationItem, PreRegStatus, YouTubeVideoItem, CollaborationInquiryItem } from '../types';
import { 
  getPreRegistrations, 
  updatePreRegistration, 
  deletePreRegistration, 
  resetPreRegistrations, 
  getAdminPassword, 
  setAdminPassword, 
  isAdminAuthenticated, 
  setAdminAuthenticated, 
  exportRegistrationsToCsv,
  getYouTubeVideos,
  saveYouTubeVideos,
  addYouTubeVideo,
  updateYouTubeVideo,
  deleteYouTubeVideo,
  resetYouTubeVideos,
  extractYouTubeVideoId,
  generateYouTubeThumbnail,
  getInquiries,
  updateInquiry,
  deleteInquiry,
  resetInquiries,
  exportInquiriesToCsv
} from '../utils/storage';
import { ThumbnailUploader } from './ThumbnailUploader';

interface AdminPageProps {
  onNotify: (msg: string) => void;
  onNavigateHome: () => void;
  onNavigatePage?: (page: string) => void;
}

export const AdminPage: React.FC<AdminPageProps> = ({ onNotify, onNavigateHome, onNavigatePage }) => {
  // Navigation tabs
  const [activeTab, setActiveTab] = useState<'registrations' | 'inquiries' | 'youtube'>('registrations');

  // Auth state
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [passwordInput, setPasswordInput] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [authError, setAuthError] = useState<string>('');

  // Pre-Registration Data & Filters
  const [registrations, setRegistrations] = useState<PreRegistrationItem[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [courseFilter, setCourseFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Collaboration / Design Inquiries State & Filters
  const [inquiries, setInquiries] = useState<CollaborationInquiryItem[]>([]);
  const [inquirySearchQuery, setInquirySearchQuery] = useState<string>('');
  const [inquiryCategoryFilter, setInquiryCategoryFilter] = useState<string>('all');
  const [inquiryStatusFilter, setInquiryStatusFilter] = useState<string>('all');
  const [selectedInquiry, setSelectedInquiry] = useState<CollaborationInquiryItem | null>(null);

  // YouTube Video Management State
  const [youtubeVideos, setYoutubeVideos] = useState<YouTubeVideoItem[]>([]);
  const [editingVideo, setEditingVideo] = useState<YouTubeVideoItem | null>(null);
  const [isNewVideoModalOpen, setIsNewVideoModalOpen] = useState<boolean>(false);
  const [newVideoForm, setNewVideoForm] = useState<{
    title: string;
    url: string;
    thumbnail: string;
    tag: string;
    duration: string;
    views: string;
    publishedAt: string;
  }>({
    title: '',
    url: '',
    thumbnail: '',
    tag: '디자인 실전',
    duration: '',
    views: '조회수',
    publishedAt: '최근 영상',
  });

  // Modals & Active items
  const [selectedItem, setSelectedItem] = useState<PreRegistrationItem | null>(null);
  const [passwordModalOpen, setPasswordModalOpen] = useState<boolean>(false);
  const [oldPassword, setOldPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [passwordChangeError, setPasswordChangeError] = useState<string>('');

  // Course capacity limits
  const COURSE_QUOTA = 10;
  const courseList = ['로고디자인', '홈페이지 제작', '바이브코딩', '상세페이지'];

  // Check initial auth & load data
  useEffect(() => {
    const authed = isAdminAuthenticated();
    setIsAuthenticated(authed);
    if (authed) {
      loadData();
    }
  }, []);

  useEffect(() => {
    const handleInquiriesUpdated = (e: any) => {
      if (e.detail) {
        setInquiries(e.detail);
      } else {
        setInquiries(getInquiries());
      }
    };
    window.addEventListener('ding_inquiries_updated', handleInquiriesUpdated);
    return () => window.removeEventListener('ding_inquiries_updated', handleInquiriesUpdated);
  }, []);

  const loadData = () => {
    const list = getPreRegistrations();
    setRegistrations(list);
    const ytList = getYouTubeVideos();
    setYoutubeVideos(ytList);
    const inqList = getInquiries();
    setInquiries(inqList);
  };

  // YouTube Video Handlers
  const handleAutoExtractNewThumbnail = () => {
    if (!newVideoForm.url) {
      onNotify('영상 주소를 먼저 입력해 주세요.');
      return;
    }
    const thumb = generateYouTubeThumbnail(newVideoForm.url);
    if (thumb) {
      setNewVideoForm(prev => ({ ...prev, thumbnail: thumb }));
      onNotify('✨ 유튜브 썸네일 주소가 자동으로 추출되어 적용되었습니다!');
    } else {
      onNotify('유튜브 영상 주소에서 ID를 찾을 수 없습니다. 직접 이미지 URL을 입력해 주세요.');
    }
  };

  const handleAutoExtractEditThumbnail = () => {
    if (!editingVideo || !editingVideo.url) {
      onNotify('영상 주소를 먼저 입력해 주세요.');
      return;
    }
    const thumb = generateYouTubeThumbnail(editingVideo.url);
    if (thumb) {
      setEditingVideo(prev => prev ? ({ ...prev, thumbnail: thumb }) : null);
      onNotify('✨ 유튜브 썸네일 주소가 자동으로 추출되어 적용되었습니다!');
    } else {
      onNotify('유튜브 영상 주소에서 ID를 찾을 수 없습니다. 직접 이미지 URL을 입력해 주세요.');
    }
  };

  const handleSaveNewVideo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newVideoForm.title.trim() || !newVideoForm.url.trim()) {
      onNotify('영상 제목과 영상 주소는 필수 입력 항목입니다.');
      return;
    }

    let thumb = newVideoForm.thumbnail.trim();
    if (!thumb) {
      thumb = generateYouTubeThumbnail(newVideoForm.url) || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80';
    }

    const newVideo: YouTubeVideoItem = {
      id: `ding-yt-${Date.now()}`,
      title: newVideoForm.title.trim(),
      url: newVideoForm.url.trim(),
      thumbnail: thumb,
      tag: newVideoForm.tag.trim() || '디자인 실전',
      duration: newVideoForm.duration.trim() || '15:00',
      views: newVideoForm.views.trim() || 'NEW',
      publishedAt: newVideoForm.publishedAt.trim() || '방금 등록',
    };

    const updated = addYouTubeVideo(newVideo);
    setYoutubeVideos(updated);
    setIsNewVideoModalOpen(false);
    setNewVideoForm({
      title: '',
      url: '',
      thumbnail: '',
      tag: '디자인 실전',
      duration: '',
      views: '조회수',
      publishedAt: '최근 영상',
    });
    onNotify('🎉 새로운 유튜브 영상이 성공적으로 등록되었습니다!');
  };

  const handleUpdateVideo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingVideo) return;
    if (!editingVideo.title.trim() || !editingVideo.url.trim()) {
      onNotify('영상 제목과 영상 주소는 필수 입력 항목입니다.');
      return;
    }

    let thumb = editingVideo.thumbnail.trim();
    if (!thumb) {
      thumb = generateYouTubeThumbnail(editingVideo.url) || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80';
    }

    const updatedList = updateYouTubeVideo(editingVideo.id, {
      ...editingVideo,
      thumbnail: thumb,
    });
    setYoutubeVideos(updatedList);
    setEditingVideo(null);
    onNotify('✅ 유튜브 영상 정보가 성공적으로 수정되었습니다.');
  };

  const handleDeleteVideoItem = (id: string, title: string) => {
    if (window.confirm(`'${title}' 영상을 유튜브 섹션에서 삭제하시겠습니까?`)) {
      const updated = deleteYouTubeVideo(id);
      setYoutubeVideos(updated);
      onNotify('영상이 삭제되었습니다.');
    }
  };

  const handleMoveVideoItem = (index: number, direction: 'up' | 'down') => {
    const newIdx = direction === 'up' ? index - 1 : index + 1;
    if (newIdx < 0 || newIdx >= youtubeVideos.length) return;

    const newList = [...youtubeVideos];
    const [moved] = newList.splice(index, 1);
    newList.splice(newIdx, 0, moved);

    saveYouTubeVideos(newList);
    setYoutubeVideos(newList);
    onNotify(`영상 표시 순서가 변경되었습니다. (#${newIdx + 1})`);
  };

  const handleResetYouTubeData = () => {
    if (window.confirm('유튜브 영상 목록을 딩마녀 추천 기본 6개 영상으로 초기화하시겠습니까?')) {
      const reset = resetYouTubeVideos();
      setYoutubeVideos(reset);
      onNotify('유튜브 영상 목록이 기본 데이터로 복원되었습니다.');
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const currentPassword = getAdminPassword();
    if (passwordInput === currentPassword) {
      setAdminAuthenticated(true);
      setIsAuthenticated(true);
      setAuthError('');
      loadData();
      onNotify('관리자 로그인 성공! 신청 내역 관리 대시보드로 이동합니다.');
    } else {
      setAuthError('비밀번호가 일치하지 않습니다. 다시 입력해 주세요.');
    }
  };

  const handleLogout = () => {
    setAdminAuthenticated(false);
    setIsAuthenticated(false);
    setPasswordInput('');
    onNotify('관리자 계정에서 로그아웃되었습니다.');
  };

  const handleStatusChange = (id: string, newStatus: PreRegStatus) => {
    const updated = updatePreRegistration(id, { status: newStatus });
    setRegistrations(updated);
    if (selectedItem && selectedItem.id === id) {
      setSelectedItem({ ...selectedItem, status: newStatus });
    }
    onNotify(`신청 상태가 [${newStatus}] (으)로 변경되었습니다.`);
  };

  const handleNoteChange = (id: string, note: string) => {
    const updated = updatePreRegistration(id, { adminNote: note });
    setRegistrations(updated);
    if (selectedItem && selectedItem.id === id) {
      setSelectedItem({ ...selectedItem, adminNote: note });
    }
  };

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`'${name}' 님의 신청 내역을 정말 삭제하시겠습니까?`)) {
      const updated = deletePreRegistration(id);
      setRegistrations(updated);
      if (selectedItem && selectedItem.id === id) {
        setSelectedItem(null);
      }
      onNotify(`${name} 님의 신청 내역이 삭제되었습니다.`);
    }
  };

  const handleResetData = () => {
    if (window.confirm('기본 샘플 데이터로 복구하시겠습니까? 기존에 추가된 데이터가 초기화됩니다.')) {
      const reset = resetPreRegistrations();
      setRegistrations(reset);
      onNotify('신청 데이터가 초기 샘플 데이터로 복원되었습니다.');
    }
  };

  const handleExportCsv = () => {
    exportRegistrationsToCsv(registrations);
    onNotify('사전 신청자 전체 명단이 CSV 파일로 다운로드되었습니다.');
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    onNotify(`${label} '${text}' 복사 완료!`);
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    const currentPass = getAdminPassword();
    if (oldPassword !== currentPass) {
      setPasswordChangeError('현재 비밀번호가 일치하지 않습니다.');
      return;
    }
    if (newPassword.length < 4) {
      setPasswordChangeError('새 비밀번호는 최소 4자 이상이어야 합니다.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordChangeError('새 비밀번호와 확인 비밀번호가 일치하지 않습니다.');
      return;
    }

    setAdminPassword(newPassword);
    setPasswordModalOpen(false);
    setOldPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setPasswordChangeError('');
    onNotify('관리자 비밀번호가 성공적으로 변경되었습니다!');
  };

  // Filtered registrations
  const filteredList = registrations.filter(item => {
    const matchCourse = courseFilter === 'all' || item.targetCourse === courseFilter;
    const matchStatus = statusFilter === 'all' || item.status === statusFilter;
    const query = searchQuery.toLowerCase().trim();
    const matchQuery = !query || 
      item.name.toLowerCase().includes(query) ||
      item.phone.includes(query) ||
      item.email.toLowerCase().includes(query) ||
      (item.message && item.message.toLowerCase().includes(query)) ||
      item.id.toLowerCase().includes(query);

    return matchCourse && matchStatus && matchQuery;
  });

  // Collaboration / Design Inquiries Handlers
  const handleUpdateInquiryStatus = (id: string, status: any) => {
    const updated = updateInquiry(id, { status });
    setInquiries(updated);
    if (selectedInquiry?.id === id) {
      setSelectedInquiry(prev => prev ? ({ ...prev, status }) : null);
    }
    onNotify(`문의 상태가 '${status}'(으)로 변경되었습니다.`);
  };

  const handleUpdateInquiryNote = (id: string, adminNote: string) => {
    const updated = updateInquiry(id, { adminNote });
    setInquiries(updated);
    if (selectedInquiry?.id === id) {
      setSelectedInquiry(prev => prev ? ({ ...prev, adminNote }) : null);
    }
    onNotify('관리자 메모가 저장되었습니다.');
  };

  const handleDeleteInquiry = (id: string) => {
    if (confirm('해당 협업/디자인 문의 내역을 삭제하시겠습니까?')) {
      const updated = deleteInquiry(id);
      setInquiries(updated);
      if (selectedInquiry?.id === id) setSelectedInquiry(null);
      onNotify('문의 내역이 삭제되었습니다.');
    }
  };

  const handleResetInquiriesData = () => {
    if (confirm('협업/디자인 문의 목록을 기본 샘플 데이터로 복원하시겠습니까?')) {
      const resetList = resetInquiries();
      setInquiries(resetList);
      onNotify('문의 목록이 기본 샘플 데이터로 복원되었습니다.');
    }
  };

  const handleExportInquiriesCsv = () => {
    exportInquiriesToCsv(inquiries);
    onNotify('협업/디자인 문의 목록이 엑셀(CSV)로 다운로드되었습니다.');
  };

  // Filtered Inquiries
  const filteredInquiries = inquiries.filter(item => {
    const matchCategory = inquiryCategoryFilter === 'all' || item.category === inquiryCategoryFilter;
    const matchStatus = inquiryStatusFilter === 'all' || item.status === inquiryStatusFilter;
    const query = inquirySearchQuery.toLowerCase().trim();
    const matchQuery = !query || 
      item.name.toLowerCase().includes(query) ||
      item.phone.includes(query) ||
      item.email.toLowerCase().includes(query) ||
      (item.message && item.message.toLowerCase().includes(query)) ||
      item.id.toLowerCase().includes(query);

    return matchCategory && matchStatus && matchQuery;
  });

  // Calculate course quotas and ranks
  const getCourseCount = (courseName: string) => {
    return registrations.filter(r => r.targetCourse === courseName && r.status !== '취소/보류').length;
  };

  // Get quota status badge for an item
  const getQuotaRankBadge = (item: PreRegistrationItem) => {
    if (item.status === '취소/보류') {
      return (
        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-500">
          취소/보류
        </span>
      );
    }

    // Find all items of this course sorted by date/orderNumber
    const sameCourseItems = registrations
      .filter(r => r.targetCourse === item.targetCourse && r.status !== '취소/보류')
      .sort((a, b) => (a.orderNumber || 0) - (b.orderNumber || 0));

    const rankInCourse = sameCourseItems.findIndex(r => r.id === item.id) + 1;

    if (rankInCourse > 0 && rankInCourse <= COURSE_QUOTA) {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-100 text-amber-900 border border-amber-300 shadow-xs">
          <span>👑 정원 10명 내 배정</span>
          <span className="bg-amber-300 text-amber-950 px-1 rounded-sm text-[9px]">#{rankInCourse}</span>
        </span>
      );
    } else {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-50 text-purple-700 border border-purple-200">
          <span>대기 예비</span>
          <span className="font-extrabold">+{rankInCourse - COURSE_QUOTA}번</span>
        </span>
      );
    }
  };

  // Status color helper
  const getStatusBadge = (status: PreRegStatus) => {
    switch (status) {
      case '신청접수':
        return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200">신청접수</span>;
      case '1차연락완료':
        return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-800 border border-amber-200">1차연락완료</span>;
      case '수강확정':
        return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">수강확정</span>;
      case '취소/보류':
        return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-500 border border-slate-200">취소/보류</span>;
      default:
        return null;
    }
  };

  // ==========================================
  // 1. Password Lock View (Not Authenticated)
  // ==========================================
  if (!isAuthenticated) {
    return (
      <div id="admin-auth-container" className="min-h-[80vh] flex items-center justify-center px-4 py-16 bg-slate-50">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/90 shadow-2xl shadow-purple-950/10 text-center relative overflow-hidden">
          {/* Top Decorative Banner */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#580096] via-[#7B1FA2] to-amber-400" />
          
          <div className="w-16 h-16 rounded-2xl bg-purple-100 text-[#580096] flex items-center justify-center mx-auto mb-6 shadow-xs">
            <Lock className="w-8 h-8" />
          </div>

          <h2 className="text-2xl font-black text-slate-900 mb-2 tracking-tight">
            딩스튜디오 관리자 보안 인증
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mb-6 leading-relaxed">
            사전 신청 내역 및 수강생 정보는 관리자만 접근할 수 있습니다. 비밀번호를 입력해 주세요.
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                autoFocus
                value={passwordInput}
                onChange={(e) => {
                  setPasswordInput(e.target.value);
                  setAuthError('');
                }}
                placeholder="관리자 비밀번호 입력"
                className="w-full px-4 py-3.5 pr-11 rounded-xl border border-slate-200 text-center text-sm sm:text-base font-bold text-slate-900 tracking-wider placeholder:tracking-normal placeholder:font-normal focus:outline-none focus:border-[#580096] focus:ring-2 focus:ring-purple-100 transition-all bg-slate-50/50"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
                aria-label="Toggle password visibility"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            {authError && (
              <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs font-semibold text-red-700 flex items-center justify-center gap-1.5">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{authError}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-[#580096] hover:bg-[#430076] text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Unlock className="w-4 h-4" />
              <span>관리자 페이지 접속</span>
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-slate-100">
            <button
              onClick={onNavigateHome}
              className="text-xs text-slate-500 hover:text-slate-900 font-medium inline-flex items-center gap-1 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>메인 홈으로 돌아가기</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // 2. Authenticated Admin Dashboard View
  // ==========================================
  const totalCount = registrations.length;
  const activeCount = registrations.filter(r => r.status !== '취소/보류').length;
  const unhandledCount = registrations.filter(r => r.status === '신청접수').length;
  const confirmedCount = registrations.filter(r => r.status === '수강확정').length;

  return (
    <div id="admin-dashboard-container" className="min-h-screen bg-slate-100/70 pb-24 text-slate-900">
      
      {/* Top Header Bar */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4">
          
          <div className="flex items-center gap-3">
            <button
              onClick={onNavigateHome}
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer text-xs font-semibold flex items-center gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">사이트로 돌아가기</span>
            </button>
            <div className="h-5 w-px bg-slate-200" />
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#580096] text-white flex items-center justify-center font-bold text-sm shadow-xs">
                딩
              </div>
              <div>
                <h1 className="text-base sm:text-lg font-black text-slate-900 leading-none flex items-center gap-2">
                  <span>딩스튜디오 통합 관리자</span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-100 text-[#580096]">
                    Admin Mode
                  </span>
                </h1>
                <p className="text-[11px] text-slate-500 mt-0.5">사전 신청자 및 메인 유튜브 영상 실시간 관리</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {activeTab === 'registrations' && (
              <button
                onClick={handleExportCsv}
                className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>엑셀(CSV) 다운로드</span>
              </button>
            )}

            {activeTab === 'inquiries' && (
              <button
                onClick={handleExportInquiriesCsv}
                className="px-3.5 py-2 rounded-xl bg-purple-700 hover:bg-purple-600 text-white font-bold text-xs shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>엑셀(CSV) 다운로드</span>
              </button>
            )}

            {activeTab === 'youtube' && (
              <button
                onClick={() => setIsNewVideoModalOpen(true)}
                className="px-3.5 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>+ 새 영상 등록</span>
              </button>
            )}

            <button
              onClick={() => setPasswordModalOpen(true)}
              className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
              title="비밀번호 변경"
            >
              <KeyRound className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">비번 변경</span>
            </button>

            <button
              onClick={handleLogout}
              className="px-3 py-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>로그아웃</span>
            </button>
          </div>

        </div>

        {/* Tab Switcher */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-slate-100 flex items-center gap-2 pt-1.5 pb-2">
          <button
            type="button"
            onClick={() => setActiveTab('registrations')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'registrations'
                ? 'bg-[#580096] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>정규강의 사전 신청</span>
            <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
              activeTab === 'registrations' ? 'bg-purple-800 text-purple-100' : 'bg-slate-200 text-slate-700'
            }`}>
              {registrations.length}명
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('inquiries')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'inquiries'
                ? 'bg-[#580096] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>협업 문의 / 디자인 의뢰</span>
            <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
              activeTab === 'inquiries' ? 'bg-purple-800 text-purple-100' : 'bg-purple-100 text-[#580096]'
            }`}>
              {inquiries.length}건
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('youtube')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'youtube'
                ? 'bg-red-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Youtube className="w-4 h-4" />
            <span>메인 유튜브 영상</span>
            <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
              activeTab === 'youtube' ? 'bg-red-800 text-red-100' : 'bg-red-100 text-red-700'
            }`}>
              {youtubeVideos.length}개
            </span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">

        {/* ========================================================
            TAB 1: PRE-REGISTRATIONS MANAGEMENT
        ======================================================== */}
        {activeTab === 'registrations' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            {/* 1. Summary Metrics & Course Quotas */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <div className="text-xs font-bold text-slate-500 mb-1">총 사전 신청 건수</div>
            <div className="text-2xl sm:text-3xl font-black text-slate-900 flex items-baseline gap-2">
              <span>{totalCount}</span>
              <span className="text-xs font-medium text-slate-500">명</span>
            </div>
            <div className="text-[11px] text-purple-700 mt-2 font-semibold">
              유효 신청: {activeCount}명
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <div className="text-xs font-bold text-slate-500 mb-1">신규 미확인 접수</div>
            <div className="text-2xl sm:text-3xl font-black text-blue-600 flex items-baseline gap-2">
              <span>{unhandledCount}</span>
              <span className="text-xs font-medium text-slate-500">건 대기중</span>
            </div>
            <div className="text-[11px] text-blue-600 mt-2 font-semibold">
              빠른 1차 연락 필요
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <div className="text-xs font-bold text-slate-500 mb-1">수강 확정 인원</div>
            <div className="text-2xl sm:text-3xl font-black text-emerald-600 flex items-baseline gap-2">
              <span>{confirmedCount}</span>
              <span className="text-xs font-medium text-slate-500">명 완료</span>
            </div>
            <div className="text-[11px] text-emerald-600 mt-2 font-semibold">
              정규 기수 배정 완료
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between">
            <div>
              <div className="text-xs font-bold text-slate-500 mb-1">데이터 관리</div>
              <div className="text-xs text-slate-600">실시간 로컬 동기화 활성화됨</div>
            </div>
            <div className="flex items-center gap-2 mt-3">
              <button
                onClick={loadData}
                className="flex-1 py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>새로고침</span>
              </button>
              <button
                onClick={handleResetData}
                className="py-2 px-3 rounded-xl bg-purple-50 hover:bg-purple-100 text-[#580096] text-xs font-bold transition-colors cursor-pointer"
                title="샘플 데이터 복구"
              >
                샘플 복구
              </button>
            </div>
          </div>
        </div>

        {/* 2. Course Quota Tracker (선착순 10명 정원 배정 현황) */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-xs">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-500" />
                <span>4대 정규강의 선착순 10명 정원 배정 현황</span>
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                강의별 신청 순서 상위 10명에게 정원 우선 배정 혜택이 적용됩니다. (10명 초과 시 예비 순번 부여)
              </p>
            </div>
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-purple-50 text-[#580096] border border-purple-200">
              정원 기준: 강의당 10명
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {courseList.map(cName => {
              const count = getCourseCount(cName);
              const percent = Math.min(100, Math.round((count / COURSE_QUOTA) * 100));
              const isFull = count >= COURSE_QUOTA;

              return (
                <div 
                  key={cName}
                  onClick={() => setCourseFilter(courseFilter === cName ? 'all' : cName)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                    courseFilter === cName
                      ? 'bg-purple-50/80 border-[#580096] ring-2 ring-[#580096]/20'
                      : 'bg-slate-50/60 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs sm:text-sm font-bold text-slate-900">{cName}</span>
                    <span className={`text-xs font-extrabold px-2 py-0.5 rounded-md ${
                      isFull 
                        ? 'bg-red-100 text-red-800' 
                        : count >= 7 
                        ? 'bg-amber-100 text-amber-900' 
                        : 'bg-purple-100 text-[#580096]'
                    }`}>
                      {count} / {COURSE_QUOTA}명
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden mb-2">
                    <div 
                      className={`h-full rounded-full transition-all duration-500 ${
                        isFull 
                          ? 'bg-gradient-to-r from-purple-600 to-red-500' 
                          : 'bg-gradient-to-r from-[#580096] to-amber-400'
                      }`}
                      style={{ width: `${percent}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-500">
                    <span>{isFull ? '정원 마감 (예비 대기중)' : `잔여: ${COURSE_QUOTA - count}석`}</span>
                    <span className="font-semibold text-purple-700">{percent}% 달성</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 3. Registrations Filter & Table */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
          
          {/* Filter Bar */}
          <div className="p-5 sm:p-6 border-b border-slate-200 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="이름, 연락처, 이메일, 작성 내용 검색..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-[#580096] focus:ring-2 focus:ring-purple-100 transition-all bg-slate-50/50"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Filter Selects */}
            <div className="flex flex-wrap items-center gap-2.5">
              <div className="flex items-center gap-1 text-xs text-slate-500 font-medium">
                <Filter className="w-3.5 h-3.5" />
                <span>필터:</span>
              </div>

              {/* Course Select */}
              <select
                value={courseFilter}
                onChange={(e) => setCourseFilter(e.target.value)}
                className="px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 bg-slate-50 focus:outline-none focus:border-[#580096] cursor-pointer"
              >
                <option value="all">전체 강의 ({registrations.length})</option>
                {courseList.map(c => (
                  <option key={c} value={c}>{c} ({registrations.filter(r => r.targetCourse === c).length})</option>
                ))}
              </select>

              {/* Status Select */}
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 bg-slate-50 focus:outline-none focus:border-[#580096] cursor-pointer"
              >
                <option value="all">전체 상태</option>
                <option value="신청접수">신청접수 ({registrations.filter(r => r.status === '신청접수').length})</option>
                <option value="1차연락완료">1차연락완료 ({registrations.filter(r => r.status === '1차연락완료').length})</option>
                <option value="수강확정">수강확정 ({registrations.filter(r => r.status === '수강확정').length})</option>
                <option value="취소/보류">취소/보류 ({registrations.filter(r => r.status === '취소/보류').length})</option>
              </select>
            </div>

          </div>

          {/* Table Container */}
          <div className="overflow-x-auto">
            {filteredList.length === 0 ? (
              <div className="py-16 text-center text-slate-500">
                <Users className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                <p className="text-sm font-semibold text-slate-700">해당 조건에 맞는 사전 신청 내역이 없습니다.</p>
                <p className="text-xs text-slate-400 mt-1">검색어 또는 필터 설정을 변경해 보세요.</p>
              </div>
            ) : (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/80 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    <th className="py-3.5 px-4 sm:px-6">순번 / 정원 배정</th>
                    <th className="py-3.5 px-4">신청자 정보</th>
                    <th className="py-3.5 px-4">신청 강의</th>
                    <th className="py-3.5 px-4">딩마녀에게 하고싶은 말</th>
                    <th className="py-3.5 px-4">신청 일시</th>
                    <th className="py-3.5 px-4">진행 상태</th>
                    <th className="py-3.5 px-4">관리자 메모</th>
                    <th className="py-3.5 px-4 sm:px-6 text-right">관리</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs">
                  {filteredList.map((item) => (
                    <tr 
                      key={item.id}
                      className="hover:bg-purple-50/30 transition-colors group"
                    >
                      {/* 1. Order & Quota Badge */}
                      <td className="py-4 px-4 sm:px-6">
                        <div className="font-mono font-bold text-slate-900 text-xs mb-1">
                          #{item.orderNumber || 1}
                        </div>
                        {getQuotaRankBadge(item)}
                      </td>

                      {/* 2. Applicant Info */}
                      <td className="py-4 px-4">
                        <div className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                          <span>{item.name}</span>
                          <button
                            onClick={() => setSelectedItem(item)}
                            className="text-purple-600 hover:text-purple-900 text-[11px] underline font-medium cursor-pointer"
                          >
                            상세
                          </button>
                        </div>
                        
                        <div className="flex flex-col gap-0.5 mt-1 text-[11px] text-slate-500">
                          <div className="flex items-center gap-1">
                            <Phone className="w-3 h-3 text-slate-400" />
                            <a 
                              href={`tel:${item.phone}`} 
                              className="hover:text-purple-700 hover:underline font-mono"
                            >
                              {item.phone}
                            </a>
                            <button
                              onClick={() => copyToClipboard(item.phone, '연락처')}
                              className="text-slate-400 hover:text-slate-700 p-0.5 cursor-pointer"
                              title="연락처 복사"
                            >
                              <Copy className="w-2.5 h-2.5" />
                            </button>
                          </div>

                          <div className="flex items-center gap-1">
                            <Mail className="w-3 h-3 text-slate-400" />
                            <a 
                              href={`mailto:${item.email}`} 
                              className="hover:text-purple-700 hover:underline truncate max-w-[150px]"
                            >
                              {item.email}
                            </a>
                            <button
                              onClick={() => copyToClipboard(item.email, '이메일')}
                              className="text-slate-400 hover:text-slate-700 p-0.5 cursor-pointer"
                              title="이메일 복사"
                            >
                              <Copy className="w-2.5 h-2.5" />
                            </button>
                          </div>
                        </div>
                      </td>

                      {/* 3. Target Course */}
                      <td className="py-4 px-4">
                        <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-purple-50 text-[#580096] border border-purple-200 inline-block">
                          {item.targetCourse}
                        </span>
                      </td>

                      {/* 4. Message */}
                      <td className="py-4 px-4 max-w-[200px]">
                        {item.message ? (
                          <div 
                            onClick={() => setSelectedItem(item)}
                            className="p-2 rounded-xl bg-slate-50 hover:bg-purple-50 text-slate-700 text-xs line-clamp-2 cursor-pointer transition-colors border border-slate-200/60"
                            title="클릭하여 전체 내용 보기"
                          >
                            "{item.message}"
                          </div>
                        ) : (
                          <span className="text-slate-400 text-[11px] italic">남긴 말 없음</span>
                        )}
                      </td>

                      {/* 5. Date */}
                      <td className="py-4 px-4 text-slate-500 whitespace-nowrap text-[11px]">
                        {item.createdAt}
                      </td>

                      {/* 6. Status Selector */}
                      <td className="py-4 px-4 whitespace-nowrap">
                        <select
                          value={item.status}
                          onChange={(e) => handleStatusChange(item.id, e.target.value as PreRegStatus)}
                          className={`px-2.5 py-1.5 rounded-xl text-xs font-bold border transition-colors cursor-pointer focus:outline-none ${
                            item.status === '신청접수' 
                              ? 'bg-blue-50 text-blue-800 border-blue-200' 
                              : item.status === '1차연락완료' 
                              ? 'bg-amber-50 text-amber-900 border-amber-300' 
                              : item.status === '수강확정' 
                              ? 'bg-emerald-50 text-emerald-800 border-emerald-300' 
                              : 'bg-slate-100 text-slate-600 border-slate-300'
                          }`}
                        >
                          <option value="신청접수">신청접수</option>
                          <option value="1차연락완료">1차연락완료</option>
                          <option value="수강확정">수강확정</option>
                          <option value="취소/보류">취소/보류</option>
                        </select>
                      </td>

                      {/* 7. Admin Memo */}
                      <td className="py-4 px-4 min-w-[160px]">
                        <input
                          type="text"
                          placeholder="메모 입력 (자동저장)"
                          defaultValue={item.adminNote || ''}
                          onBlur={(e) => handleNoteChange(item.id, e.target.value)}
                          className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs placeholder:text-slate-400 focus:outline-none focus:border-[#580096] bg-transparent hover:bg-white focus:bg-white transition-all"
                        />
                      </td>

                      {/* 8. Actions */}
                      <td className="py-4 px-4 sm:px-6 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => setSelectedItem(item)}
                            className="p-1.5 rounded-lg bg-slate-100 hover:bg-purple-100 text-slate-600 hover:text-purple-900 transition-colors cursor-pointer"
                            title="상세 보기"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDelete(item.id, item.name)}
                            className="p-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 transition-colors cursor-pointer"
                            title="삭제"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* Table Footer Stats */}
          <div className="p-4 bg-slate-50 border-t border-slate-200 text-xs text-slate-500 flex flex-wrap items-center justify-between gap-2">
            <span>표시 중인 신청 건수: <strong>{filteredList.length}</strong> / 전체 {registrations.length}건</span>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-blue-500" /> 접수대기</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-500" /> 1차연락</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500" /> 확정</span>
            </div>
          </div>

        </div>
      </div>
    )}

        {/* ========================================================
            TAB: COLLABORATION & DESIGN INQUIRIES MANAGEMENT
        ======================================================== */}
        {activeTab === 'inquiries' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            
            {/* Top Summary Banner */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 border border-purple-200 text-[#580096] text-xs font-bold">
                  <Sparkles className="w-3.5 h-3.5 text-[#580096]" />
                  <span>실시간 메인 홈페이지 연동</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                  <span>협업 문의 / 디자인 의뢰 접수 내역</span>
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
                  메인 화면 맨 하단 <strong>'협업 문의 / 디자인 의뢰'</strong> 폼을 통해 접수된 <strong>강의 문의, 협업 제안, 디자인 의뢰</strong> 건을 실시간으로 확인하고 진행 상태 및 메모를 관리합니다.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2.5 shrink-0">
                <button
                  type="button"
                  onClick={handleResetInquiriesData}
                  className="px-3.5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                  title="기본 샘플 데이터로 복구"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>샘플 복원</span>
                </button>
                <button
                  type="button"
                  onClick={handleExportInquiriesCsv}
                  className="px-4 py-2.5 rounded-xl bg-[#580096] hover:bg-[#47007a] text-white text-xs font-bold shadow-md hover:shadow-lg transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>엑셀(CSV) 다운로드</span>
                </button>
              </div>
            </div>

            {/* Inquiries Stats Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
                <div className="text-xs font-bold text-slate-500 mb-1">전체 문의 접수</div>
                <div className="text-2xl font-black text-slate-900">{inquiries.length}건</div>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
                <div className="text-xs font-bold text-purple-600 mb-1">강의 문의</div>
                <div className="text-2xl font-black text-purple-700">
                  {inquiries.filter(i => i.category === '강의 문의').length}건
                </div>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
                <div className="text-xs font-bold text-blue-600 mb-1">협업 제안</div>
                <div className="text-2xl font-black text-blue-700">
                  {inquiries.filter(i => i.category === '협업 제안').length}건
                </div>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
                <div className="text-xs font-bold text-emerald-600 mb-1">디자인 의뢰</div>
                <div className="text-2xl font-black text-emerald-700">
                  {inquiries.filter(i => i.category === '디자인 의뢰').length}건
                </div>
              </div>
            </div>

            {/* Filter & Search Bar */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
              <div className="p-4 sm:p-5 border-b border-slate-200 bg-slate-50/50 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
                
                {/* Search input */}
                <div className="relative flex-1 max-w-md">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="이름, 연락처, 이메일, 내용 검색..."
                    value={inquirySearchQuery}
                    onChange={(e) => setInquirySearchQuery(e.target.value)}
                    className="w-full pl-9 pr-8 py-2.5 rounded-xl bg-white border border-slate-200 text-xs font-medium focus:outline-none focus:border-[#580096] focus:ring-2 focus:ring-purple-600/20"
                  />
                  {inquirySearchQuery && (
                    <button
                      onClick={() => setInquirySearchQuery('')}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {/* Filters */}
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  {/* Category Filter */}
                  <select
                    value={inquiryCategoryFilter}
                    onChange={(e) => setInquiryCategoryFilter(e.target.value)}
                    className="px-3 py-2 rounded-xl bg-white border border-slate-200 font-bold text-slate-700 focus:outline-none focus:border-[#580096]"
                  >
                    <option value="all">모든 분류 전체</option>
                    <option value="강의 문의">강의 문의</option>
                    <option value="협업 제안">협업 제안</option>
                    <option value="디자인 의뢰">디자인 의뢰</option>
                  </select>

                  {/* Status Filter */}
                  <select
                    value={inquiryStatusFilter}
                    onChange={(e) => setInquiryStatusFilter(e.target.value)}
                    className="px-3 py-2 rounded-xl bg-white border border-slate-200 font-bold text-slate-700 focus:outline-none focus:border-[#580096]"
                  >
                    <option value="all">모든 진행상태</option>
                    <option value="접수대기">접수대기</option>
                    <option value="상담진행">상담진행</option>
                    <option value="답변완료">답변완료</option>
                    <option value="보류">보류</option>
                  </select>
                </div>
              </div>

              {/* Inquiries Table */}
              <div className="overflow-x-auto">
                {filteredInquiries.length === 0 ? (
                  <div className="py-16 text-center text-slate-400 space-y-2">
                    <MessageSquare className="w-8 h-8 mx-auto text-slate-300" />
                    <p className="text-sm font-semibold text-slate-600">접수된 문의 내역이 없습니다.</p>
                    <p className="text-xs">필터 조건을 변경하거나 메인 화면에서 새로운 문의를 접수해 보세요.</p>
                  </div>
                ) : (
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-slate-200 bg-slate-50 text-[11px] font-extrabold text-slate-500 uppercase tracking-wider">
                        <th className="py-3 px-4 w-12 text-center">순번</th>
                        <th className="py-3 px-4">접수번호 / 신청자</th>
                        <th className="py-3 px-4">연락처 / 이메일</th>
                        <th className="py-3 px-4">선택 (분류)</th>
                        <th className="py-3 px-4">문의내용</th>
                        <th className="py-3 px-4">접수일시</th>
                        <th className="py-3 px-4">상태</th>
                        <th className="py-3 px-4 text-center">관리</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-xs">
                      {filteredInquiries.map((item) => (
                        <tr key={item.id} className="hover:bg-purple-50/30 transition-colors">
                          <td className="py-4 px-4 text-center font-bold text-slate-400">
                            {item.orderNumber}
                          </td>
                          <td className="py-4 px-4">
                            <div className="font-bold text-slate-900">{item.name}</div>
                            <div className="text-[10px] text-slate-400 font-mono">{item.id}</div>
                          </td>
                          <td className="py-4 px-4">
                            <div className="font-semibold text-slate-800">{item.phone}</div>
                            <div className="text-slate-500 text-[11px]">{item.email}</div>
                          </td>
                          <td className="py-4 px-4">
                            <span className={`inline-block px-2.5 py-1 rounded-lg text-xs font-bold border ${
                              item.category === '강의 문의'
                                ? 'bg-purple-50 border-purple-200 text-[#580096]'
                                : item.category === '협업 제안'
                                ? 'bg-blue-50 border-blue-200 text-blue-700'
                                : 'bg-emerald-50 border-emerald-200 text-emerald-700'
                            }`}>
                              {item.category}
                            </span>
                          </td>
                          <td className="py-4 px-4 max-w-[220px]">
                            <div 
                              onClick={() => setSelectedInquiry(item)}
                              className="p-2 rounded-xl bg-slate-50 hover:bg-purple-50 text-slate-700 text-xs line-clamp-2 cursor-pointer transition-colors border border-slate-200/60"
                              title="클릭하여 상세 보기 및 메모 작성"
                            >
                              "{item.message}"
                            </div>
                            {item.adminNote && (
                              <div className="text-[10px] text-purple-700 font-medium mt-1 truncate">
                                📝 {item.adminNote}
                              </div>
                            )}
                          </td>
                          <td className="py-4 px-4 text-slate-500 whitespace-nowrap text-[11px]">
                            {item.createdAt}
                          </td>
                          <td className="py-4 px-4 whitespace-nowrap">
                            <select
                              value={item.status}
                              onChange={(e) => handleUpdateInquiryStatus(item.id, e.target.value as any)}
                              className={`text-xs font-bold px-2.5 py-1.5 rounded-xl border focus:outline-none cursor-pointer ${
                                item.status === '접수대기'
                                  ? 'bg-blue-50 border-blue-200 text-blue-700'
                                  : item.status === '상담진행'
                                  ? 'bg-amber-50 border-amber-200 text-amber-800'
                                  : item.status === '답변완료'
                                  ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                                  : 'bg-slate-100 border-slate-200 text-slate-600'
                              }`}
                            >
                              <option value="접수대기">접수대기</option>
                              <option value="상담진행">상담진행</option>
                              <option value="답변완료">답변완료</option>
                              <option value="보류">보류</option>
                            </select>
                          </td>
                          <td className="py-4 px-4 text-center whitespace-nowrap">
                            <div className="flex items-center justify-center gap-1.5">
                              <button
                                type="button"
                                onClick={() => setSelectedInquiry(item)}
                                className="p-1.5 rounded-lg bg-slate-100 hover:bg-purple-100 text-slate-600 hover:text-[#580096] transition-colors cursor-pointer"
                                title="상세보기"
                              >
                                <ExternalLink className="w-3.5 h-3.5" />
                              </button>
                              <button
                                type="button"
                                onClick={() => handleDeleteInquiry(item.id)}
                                className="p-1.5 rounded-lg bg-slate-100 hover:bg-red-100 text-slate-400 hover:text-red-600 transition-colors cursor-pointer"
                                title="삭제"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>

              {/* Table Footer */}
              <div className="p-4 bg-slate-50 border-t border-slate-200 text-xs text-slate-500 flex flex-wrap items-center justify-between gap-2">
                <span>표시 중인 문의 건수: <strong>{filteredInquiries.length}</strong> / 전체 {inquiries.length}건</span>
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-blue-500" /> 접수대기</span>
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-500" /> 상담진행</span>
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500" /> 답변완료</span>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* ========================================================
            TAB 2: YOUTUBE VIDEOS MANAGEMENT
        ======================================================== */}
        {activeTab === 'youtube' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            
            {/* Header Banner & Stats */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 border border-red-200 text-red-700 text-xs font-bold">
                  <Youtube className="w-3.5 h-3.5 text-red-600" />
                  <span>실시간 메인 섹션 연동</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                  <span>유튜브 영상 관리 ({youtubeVideos.length}개)</span>
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
                  메인 홈페이지 유튜브 섹션 및 유튜브 전용 메뉴에 노출될 영상의 <strong>썸네일 이미지, 영상 링크, 제목, 카테고리 태그</strong>를 관리합니다. 수정 시 메인화면과 유튜브 메뉴에 즉시 실시간 반영됩니다.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2.5 shrink-0">
                {onNavigatePage && (
                  <>
                    <button
                      type="button"
                      onClick={() => onNavigatePage('home')}
                      className="px-3.5 py-2.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-[#580096] text-xs font-bold border border-purple-200 transition-all flex items-center gap-1.5 cursor-pointer"
                      title="홈 화면 유튜브 섹션 확인"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>메인화면 확인</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => onNavigatePage('youtube')}
                      className="px-3.5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                      title="유튜브 메뉴 페이지 확인"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>유튜브 메뉴 확인</span>
                    </button>
                  </>
                )}
                <button
                  type="button"
                  onClick={handleResetYouTubeData}
                  className="px-3.5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                  title="기본 추천 6개 영상으로 복구"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>기본값 복원</span>
                </button>
                <button
                  type="button"
                  onClick={() => setIsNewVideoModalOpen(true)}
                  className="px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold shadow-md hover:shadow-lg transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>+ 새 영상 등록</span>
                </button>
              </div>
            </div>

            {/* Video Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {youtubeVideos.map((video, idx) => (
                <div 
                  key={video.id} 
                  className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
                >
                  {/* Thumbnail & Quick Play Overlay */}
                  <div>
                    <div className="relative aspect-video bg-slate-900 overflow-hidden">
                      <img 
                        src={video.thumbnail} 
                        alt={video.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          // Fallback on broken image
                          (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80';
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />
                      
                      {/* Badge Top Left */}
                      <div className="absolute top-3 left-3 flex items-center gap-1.5">
                        <span className="px-2.5 py-0.5 rounded-md bg-black/75 backdrop-blur-xs text-white text-[11px] font-extrabold border border-white/20">
                          #{idx + 1}
                        </span>
                        {video.tag && (
                          <span className="px-2.5 py-0.5 rounded-md bg-red-600 text-white text-[11px] font-bold shadow-xs">
                            {video.tag}
                          </span>
                        )}
                      </div>

                      {/* Video Duration / Published Bottom */}
                      <div className="absolute bottom-3 right-3 flex items-center gap-2">
                        {video.duration && (
                          <span className="px-2 py-0.5 rounded bg-black/80 text-white text-[10px] font-mono font-semibold">
                            {video.duration}
                          </span>
                        )}
                      </div>

                      {/* Play Button Center Overlay */}
                      <a 
                        href={video.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30 backdrop-blur-xs"
                      >
                        <div className="w-12 h-12 rounded-full bg-red-600 text-white flex items-center justify-center shadow-xl hover:scale-110 transition-transform">
                          <Play className="w-5 h-5 fill-current ml-0.5" />
                        </div>
                      </a>
                    </div>

                    {/* Card Content */}
                    <div className="p-5">
                      <h3 className="font-extrabold text-slate-900 text-sm leading-snug line-clamp-2 min-h-[2.5rem] mb-3">
                        {video.title}
                      </h3>

                      <div className="space-y-2 text-[11px] text-slate-500 bg-slate-50 rounded-2xl p-3 border border-slate-100">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-slate-600 flex items-center gap-1">
                            <Link2 className="w-3 h-3 text-red-500" />
                            영상 주소:
                          </span>
                          <a 
                            href={video.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-red-600 hover:underline truncate max-w-[170px] font-mono inline-flex items-center gap-1"
                            title={video.url}
                          >
                            <span>{video.url}</span>
                            <ExternalLink className="w-2.5 h-2.5 shrink-0" />
                          </a>
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-slate-600 flex items-center gap-1">
                            <ImageIcon className="w-3 h-3 text-purple-500" />
                            썸네일:
                          </span>
                          <span className="truncate max-w-[170px] font-mono text-slate-400" title={video.thumbnail}>
                            {video.thumbnail}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card Bottom Actions */}
                  <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-2">
                    {/* Reorder Buttons */}
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => handleMoveVideoItem(idx, 'up')}
                        disabled={idx === 0}
                        className="p-1.5 rounded-lg bg-white border border-slate-200 text-slate-600 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-colors"
                        title="앞으로 순서 이동"
                      >
                        <ArrowUp className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleMoveVideoItem(idx, 'down')}
                        disabled={idx === youtubeVideos.length - 1}
                        className="p-1.5 rounded-lg bg-white border border-slate-200 text-slate-600 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-colors"
                        title="뒤로 순서 이동"
                      >
                        <ArrowDown className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Edit & Delete */}
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => setEditingVideo(video)}
                        className="px-3 py-1.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-[#580096] text-xs font-bold border border-purple-200 transition-colors flex items-center gap-1 cursor-pointer"
                      >
                        <Edit3 className="w-3 h-3" />
                        <span>수정</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteVideoItem(video.id, video.title)}
                        className="p-1.5 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 transition-colors cursor-pointer"
                        title="삭제"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                </div>
              ))}
            </div>

            {youtubeVideos.length === 0 && (
              <div className="py-20 text-center bg-white rounded-3xl border border-slate-200 p-8">
                <Youtube className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <h3 className="text-base font-bold text-slate-700 mb-1">등록된 유튜브 영상이 없습니다.</h3>
                <p className="text-xs text-slate-400 mb-4">새 영상을 등록하거나 기본 추천 영상으로 복원하세요.</p>
                <button
                  type="button"
                  onClick={handleResetYouTubeData}
                  className="px-4 py-2 rounded-xl bg-[#580096] text-white text-xs font-bold cursor-pointer"
                >
                  기본 추천 영상 불러오기
                </button>
              </div>
            )}

          </div>
        )}

      </div>

      {/* ==========================================
          New Video Registration Modal
      ========================================== */}
      {isNewVideoModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 border border-slate-200 shadow-2xl animate-in zoom-in-95 duration-200 my-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center">
                  <Youtube className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-900">새 유튜브 영상 등록</h3>
                  <p className="text-xs text-slate-500">영상 주소와 썸네일을 입력하여 메인에 노출합니다.</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsNewVideoModalOpen(false)}
                className="p-2 rounded-full text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveNewVideo} className="space-y-4 text-xs">
              
              {/* 1. Video Title */}
              <div>
                <label className="block font-bold text-slate-900 mb-1">
                  영상 제목 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="예: 핀터레스트보다 좋은 디자이너 레퍼런스 사이트 5가지"
                  value={newVideoForm.title}
                  onChange={(e) => setNewVideoForm({ ...newVideoForm, title: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100"
                />
              </div>

              {/* 2. Video URL */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block font-bold text-slate-900">
                    유튜브 영상 주소 (URL) <span className="text-red-500">*</span>
                  </label>
                  <button
                    type="button"
                    onClick={handleAutoExtractNewThumbnail}
                    className="text-[11px] font-bold text-purple-700 hover:text-purple-900 hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <Sparkles className="w-3 h-3 text-amber-500" />
                    <span>✨ URL에서 썸네일 자동 추출</span>
                  </button>
                </div>
                <input
                  type="text"
                  required
                  placeholder="예: https://www.youtube.com/watch?v=XXXX 또는 https://youtu.be/XXXX"
                  value={newVideoForm.url}
                  onChange={(e) => {
                    const url = e.target.value;
                    setNewVideoForm(prev => {
                      const autoThumb = !prev.thumbnail ? generateYouTubeThumbnail(url) : prev.thumbnail;
                      return { ...prev, url, thumbnail: autoThumb || prev.thumbnail };
                    });
                  }}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-mono focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100"
                />
                <p className="text-[10px] text-slate-400 mt-1">
                  유튜브 영상 주소를 입력하면 썸네일 주소가 자동으로 생성됩니다.
                </p>
              </div>

              {/* 3. Thumbnail (Local File Upload & URL) */}
              <ThumbnailUploader
                idPrefix="new-video"
                value={newVideoForm.thumbnail}
                onChange={(thumb) => setNewVideoForm(prev => ({ ...prev, thumbnail: thumb }))}
                videoUrl={newVideoForm.url}
                onNotify={onNotify}
              />

              {/* 4. Tag / Category & Duration */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-900 mb-1">카테고리 뱃지 / 태그</label>
                  <input
                    type="text"
                    placeholder="예: AI 웹사이트 제작"
                    value={newVideoForm.tag}
                    onChange={(e) => setNewVideoForm({ ...newVideoForm, tag: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-red-500"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-900 mb-1">재생 시간</label>
                  <input
                    type="text"
                    placeholder="예: 14:20"
                    value={newVideoForm.duration}
                    onChange={(e) => setNewVideoForm({ ...newVideoForm, duration: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-mono focus:outline-none focus:border-red-500"
                  />
                </div>
              </div>

              {/* 5. Published Text */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-900 mb-1">공개 일자/상태 표시</label>
                  <input
                    type="text"
                    placeholder="예: 최근 영상, 인기 영상"
                    value={newVideoForm.publishedAt}
                    onChange={(e) => setNewVideoForm({ ...newVideoForm, publishedAt: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-red-500"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-900 mb-1">조회수 뱃지</label>
                  <input
                    type="text"
                    placeholder="예: 2.5만회"
                    value={newVideoForm.views}
                    onChange={(e) => setNewVideoForm({ ...newVideoForm, views: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-red-500"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsNewVideoModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 cursor-pointer"
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs shadow-md cursor-pointer"
                >
                  영상 등록하기
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* ==========================================
          Edit Video Modal
      ========================================== */}
      {editingVideo && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 border border-slate-200 shadow-2xl animate-in zoom-in-95 duration-200 my-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-purple-100 text-[#580096] flex items-center justify-center">
                  <Edit3 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-900">유튜브 영상 정보 수정</h3>
                  <p className="text-xs text-slate-500">제목, 영상 주소, 썸네일 링크를 변경합니다.</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setEditingVideo(null)}
                className="p-2 rounded-full text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUpdateVideo} className="space-y-4 text-xs">
              
              {/* 1. Video Title */}
              <div>
                <label className="block font-bold text-slate-900 mb-1">
                  영상 제목 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={editingVideo.title}
                  onChange={(e) => setEditingVideo({ ...editingVideo, title: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:border-[#580096] focus:ring-2 focus:ring-purple-100"
                />
              </div>

              {/* 2. Video URL */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block font-bold text-slate-900">
                    유튜브 영상 주소 (URL) <span className="text-red-500">*</span>
                  </label>
                  <button
                    type="button"
                    onClick={handleAutoExtractEditThumbnail}
                    className="text-[11px] font-bold text-purple-700 hover:text-purple-900 hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <Sparkles className="w-3 h-3 text-amber-500" />
                    <span>✨ URL에서 썸네일 자동 추출</span>
                  </button>
                </div>
                <input
                  type="text"
                  required
                  value={editingVideo.url}
                  onChange={(e) => setEditingVideo({ ...editingVideo, url: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-mono focus:outline-none focus:border-[#580096] focus:ring-2 focus:ring-purple-100"
                />
              </div>

              {/* 3. Thumbnail (Local File Upload & URL) */}
              <ThumbnailUploader
                idPrefix="edit-video"
                value={editingVideo.thumbnail}
                onChange={(thumb) => setEditingVideo(prev => prev ? ({ ...prev, thumbnail: thumb }) : null)}
                videoUrl={editingVideo.url}
                onNotify={onNotify}
              />

              {/* 4. Tag / Category & Duration */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-900 mb-1">카테고리 뱃지 / 태그</label>
                  <input
                    type="text"
                    value={editingVideo.tag || ''}
                    onChange={(e) => setEditingVideo({ ...editingVideo, tag: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#580096]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-900 mb-1">재생 시간</label>
                  <input
                    type="text"
                    value={editingVideo.duration || ''}
                    onChange={(e) => setEditingVideo({ ...editingVideo, duration: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-mono focus:outline-none focus:border-[#580096]"
                  />
                </div>
              </div>

              {/* 5. Published Text */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-900 mb-1">공개 일자/상태 표시</label>
                  <input
                    type="text"
                    value={editingVideo.publishedAt || ''}
                    onChange={(e) => setEditingVideo({ ...editingVideo, publishedAt: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#580096]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-900 mb-1">조회수 뱃지</label>
                  <input
                    type="text"
                    value={editingVideo.views || ''}
                    onChange={(e) => setEditingVideo({ ...editingVideo, views: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#580096]"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <a
                  href={editingVideo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold text-red-600 hover:underline inline-flex items-center gap-1"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>새 탭에서 영상 열기</span>
                </a>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setEditingVideo(null)}
                    className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 cursor-pointer"
                  >
                    취소
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-[#580096] hover:bg-[#430076] text-white font-bold text-xs shadow-md cursor-pointer"
                  >
                    변경사항 저장
                  </button>
                </div>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* ==========================================
          Detail View Modal
      ========================================== */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 border border-slate-200 shadow-2xl animate-in zoom-in-95 duration-200 relative">
            
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl bg-purple-100 text-[#580096] flex items-center justify-center font-bold text-sm">
                #{selectedItem.orderNumber}
              </div>
              <div>
                <h3 className="text-lg font-black text-slate-900">{selectedItem.name} 님의 사전 신청서</h3>
                <p className="text-xs text-slate-500">{selectedItem.createdAt} 접수 (접수번호: {selectedItem.id})</p>
              </div>
            </div>

            <div className="space-y-4 my-6 text-xs">
              
              {/* Quota & Course info */}
              <div className="p-3.5 rounded-2xl bg-purple-50/70 border border-purple-200 flex items-center justify-between">
                <div>
                  <div className="text-[11px] text-purple-700 font-bold mb-0.5">신청 희망 강좌</div>
                  <div className="text-sm font-black text-[#580096]">{selectedItem.targetCourse}</div>
                </div>
                <div>{getQuotaRankBadge(selectedItem)}</div>
              </div>

              {/* Contact info card */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="text-slate-500 text-[11px] mb-1 font-semibold">연락처</div>
                  <div className="font-bold text-slate-900 text-sm mb-2">{selectedItem.phone}</div>
                  <div className="flex items-center gap-1.5">
                    <a
                      href={`tel:${selectedItem.phone}`}
                      className="px-2.5 py-1 rounded-md bg-[#580096] text-white text-[11px] font-bold hover:bg-[#430076]"
                    >
                      전화걸기
                    </a>
                    <button
                      onClick={() => copyToClipboard(selectedItem.phone, '연락처')}
                      className="px-2 py-1 rounded-md bg-slate-200 hover:bg-slate-300 text-slate-700 text-[11px] font-medium"
                    >
                      복사
                    </button>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="text-slate-500 text-[11px] mb-1 font-semibold">이메일</div>
                  <div className="font-bold text-slate-900 text-xs truncate mb-2" title={selectedItem.email}>
                    {selectedItem.email}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <a
                      href={`mailto:${selectedItem.email}`}
                      className="px-2.5 py-1 rounded-md bg-purple-100 text-[#580096] text-[11px] font-bold hover:bg-purple-200"
                    >
                      메일작성
                    </a>
                    <button
                      onClick={() => copyToClipboard(selectedItem.email, '이메일')}
                      className="px-2 py-1 rounded-md bg-slate-200 hover:bg-slate-300 text-slate-700 text-[11px] font-medium"
                    >
                      복사
                    </button>
                  </div>
                </div>
              </div>

              {/* Message from applicant */}
              <div>
                <label className="block font-bold text-slate-900 mb-1.5">
                  딩마녀에게 하고싶은 말:
                </label>
                <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 text-slate-800 text-xs leading-relaxed whitespace-pre-line font-medium">
                  {selectedItem.message || '(작성된 내용이 없습니다)'}
                </div>
              </div>

              {/* Status and Admin Note */}
              <div className="space-y-3 pt-2">
                <div>
                  <label className="block font-bold text-slate-900 mb-1.5">신청 상태 변경:</label>
                  <div className="grid grid-cols-4 gap-2">
                    {(['신청접수', '1차연락완료', '수강확정', '취소/보류'] as PreRegStatus[]).map((st) => (
                      <button
                        key={st}
                        type="button"
                        onClick={() => handleStatusChange(selectedItem.id, st)}
                        className={`py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                          selectedItem.status === st
                            ? 'bg-[#580096] text-white border-[#580096] shadow-xs'
                            : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {st}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-900 mb-1.5">관리자 메모:</label>
                  <textarea
                    rows={2}
                    placeholder="수강생 특이사항, 상담 내용 등을 기록하세요."
                    value={selectedItem.adminNote || ''}
                    onChange={(e) => handleNoteChange(selectedItem.id, e.target.value)}
                    className="w-full p-3 rounded-xl border border-slate-200 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#580096] bg-slate-50/50"
                  />
                </div>
              </div>

            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <button
                onClick={() => handleDelete(selectedItem.id, selectedItem.name)}
                className="text-xs font-semibold text-red-600 hover:text-red-800 flex items-center gap-1 cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>신청 내역 삭제</span>
              </button>
              <button
                onClick={() => setSelectedItem(null)}
                className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs cursor-pointer"
              >
                닫기
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ==========================================
          Password Change Modal
      ========================================== */}
      {passwordModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 sm:p-7 border border-slate-200 shadow-2xl animate-in zoom-in-95 duration-200">
            <h3 className="text-lg font-black text-slate-900 mb-1 flex items-center gap-2">
              <KeyRound className="w-5 h-5 text-[#580096]" />
              <span>관리자 비밀번호 변경</span>
            </h3>
            <p className="text-xs text-slate-500 mb-5">
              관리자 페이지 접근 시 사용할 새 비밀번호를 설정합니다.
            </p>

            <form onSubmit={handleChangePassword} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">현재 비밀번호</label>
                <input
                  type="password"
                  required
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#580096]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">새 비밀번호 (최소 4자)</label>
                <input
                  type="password"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#580096]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">새 비밀번호 확인</label>
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#580096]"
                />
              </div>

              {passwordChangeError && (
                <div className="text-xs text-red-600 font-semibold bg-red-50 p-2.5 rounded-xl border border-red-200">
                  {passwordChangeError}
                </div>
              )}

              <div className="flex items-center justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => {
                    setPasswordModalOpen(false);
                    setPasswordChangeError('');
                  }}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 cursor-pointer"
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-[#580096] hover:bg-[#430076] text-white text-xs font-bold cursor-pointer"
                >
                  변경 저장
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Inquiry Detail Modal */}
      {selectedInquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-slate-200 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-purple-100 text-[#580096] flex items-center justify-center">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-black text-slate-900">협업 / 의뢰 문의 상세 정보</h3>
                  <p className="text-xs text-slate-400">{selectedInquiry.id} • {selectedInquiry.createdAt}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedInquiry(null)}
                className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3.5 text-xs text-slate-700">
              <div className="grid grid-cols-2 gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                <div>
                  <span className="text-slate-400 font-semibold block mb-0.5">신청자명 (담당자)</span>
                  <strong className="text-slate-900 text-sm">{selectedInquiry.name}</strong>
                </div>
                <div>
                  <span className="text-slate-400 font-semibold block mb-0.5">문의 분류</span>
                  <span className="inline-block px-2.5 py-0.5 rounded-md text-xs font-bold bg-purple-100 text-[#580096]">
                    {selectedInquiry.category}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 font-semibold block mb-0.5">연락처</span>
                  <a href={`tel:${selectedInquiry.phone}`} className="text-[#580096] font-bold hover:underline">
                    {selectedInquiry.phone}
                  </a>
                </div>
                <div>
                  <span className="text-slate-400 font-semibold block mb-0.5">이메일</span>
                  <a href={`mailto:${selectedInquiry.email}`} className="text-[#580096] font-bold hover:underline">
                    {selectedInquiry.email}
                  </a>
                </div>
              </div>

              <div>
                <span className="text-slate-500 font-bold block mb-1">문의 내용</span>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-slate-800 text-xs leading-relaxed whitespace-pre-wrap max-h-48 overflow-y-auto">
                  {selectedInquiry.message}
                </div>
              </div>

              <div>
                <span className="text-slate-500 font-bold block mb-1">관리자 메모 (내부 기록용)</span>
                <textarea
                  rows={3}
                  defaultValue={selectedInquiry.adminNote || ''}
                  onBlur={(e) => handleUpdateInquiryNote(selectedInquiry.id, e.target.value)}
                  placeholder="상담 메모, 견적서 발송 여부, 미팅 일정 등을 기록하세요."
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-[#580096] focus:bg-white"
                />
              </div>

              <div>
                <span className="text-slate-500 font-bold block mb-1">진행 상태 변경</span>
                <div className="flex gap-2">
                  {(['접수대기', '상담진행', '답변완료', '보류'] as const).map(st => (
                    <button
                      key={st}
                      type="button"
                      onClick={() => handleUpdateInquiryStatus(selectedInquiry.id, st)}
                      className={`flex-1 py-2 rounded-xl text-xs font-bold border transition-colors cursor-pointer ${
                        selectedInquiry.status === st
                          ? 'bg-[#580096] text-white border-[#580096]'
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between border-t border-slate-100">
              <button
                type="button"
                onClick={() => handleDeleteInquiry(selectedInquiry.id)}
                className="text-xs text-red-600 hover:text-red-700 font-bold hover:underline cursor-pointer"
              >
                문의 삭제
              </button>
              <button
                type="button"
                onClick={() => setSelectedInquiry(null)}
                className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs cursor-pointer"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
