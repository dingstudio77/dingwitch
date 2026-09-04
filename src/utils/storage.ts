import { PreRegistrationItem, PreRegStatus, YouTubeVideoItem, CollaborationInquiryItem, InquiryCategory } from '../types';
import { INITIAL_YOUTUBE_VIDEOS } from '../data/mockData';
import { saveYouTubeVideosToCloud, savePreRegistrationsToCloud, saveInquiriesToCloud } from './firebaseSync';

const PRE_REG_KEY = 'ding_pre_registrations_v1';
const ADMIN_PASSWORD_KEY = 'ding_admin_password_v1';
const ADMIN_SESSION_KEY = 'ding_admin_session_v1';
const YOUTUBE_VIDEOS_KEY = 'ding_youtube_videos_v1';

const INITIAL_SAMPLE_DATA: PreRegistrationItem[] = [
  {
    id: 'PR-20260831-001',
    orderNumber: 1,
    name: '김서연',
    email: 'sy.kim@naver.com',
    phone: '010-3849-2104',
    targetCourse: '로고디자인',
    message: '비전공자인데 브랜딩과 로고 디자인으로 첫 외주를 수주해보고 싶습니다! 일정 나오면 바로 등록하겠습니다.',
    createdAt: '2026-08-31 14:20:00',
    status: '신청접수',
    adminNote: '1순위 배정 - 포트폴리오 준비 가이드 발송 예정',
  },
  {
    id: 'PR-20260831-002',
    orderNumber: 2,
    name: '이준우',
    email: 'junwoo.lee@gmail.com',
    phone: '010-8291-7402',
    targetCourse: '바이브코딩',
    message: '코딩 지식이 거의 없는데 AI와 Cursor로 제 아이디어 서비스를 직접 웹으로 런칭하고 싶습니다. 딩마녀님 영상 보고 신청합니다!',
    createdAt: '2026-08-31 15:45:12',
    status: '1차연락완료',
    adminNote: '카톡 사전 질문지 전달 완료',
  },
  {
    id: 'PR-20260831-003',
    orderNumber: 3,
    name: '박민지',
    email: 'minji.park92@daum.net',
    phone: '010-4492-1083',
    targetCourse: '홈페이지 제작',
    message: '아임웹으로 자사몰과 랜딩페이지를 직접 만들어서 프리랜서로 전향하고 싶습니다.',
    createdAt: '2026-08-31 17:10:30',
    status: '신청접수',
    adminNote: '',
  },
  {
    id: 'PR-20260831-004',
    orderNumber: 4,
    name: '최현우',
    email: 'hw.choi@kakao.com',
    phone: '010-9102-3349',
    targetCourse: '상세페이지',
    message: '스마트스토어 운영 중인데 매출이 안 나와서 설득력 있는 상세페이지 구성과 디자인을 꼭 배우고 싶어요.',
    createdAt: '2026-08-31 19:05:40',
    status: '수강확정',
    adminNote: '수강 확정 안내문 및 슬랙 초대 완료',
  },
  {
    id: 'PR-20260831-005',
    orderNumber: 5,
    name: '정유진',
    email: 'yj.jung@gmail.com',
    phone: '010-5510-8842',
    targetCourse: '로고디자인',
    message: '디자인 기초부터 실전 납품 프로세스까지 1:1 피드백 꼭 받고 싶습니다!',
    createdAt: '2026-08-31 20:30:15',
    status: '신청접수',
    adminNote: '',
  }
];

export function getPreRegistrations(): PreRegistrationItem[] {
  if (typeof window === 'undefined') return INITIAL_SAMPLE_DATA;
  try {
    const raw = localStorage.getItem(PRE_REG_KEY);
    if (!raw) {
      localStorage.setItem(PRE_REG_KEY, JSON.stringify(INITIAL_SAMPLE_DATA));
      return INITIAL_SAMPLE_DATA;
    }
    return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to parse pre-registrations from storage', e);
    return INITIAL_SAMPLE_DATA;
  }
}

export function savePreRegistration(data: {
  name: string;
  email: string;
  phone: string;
  targetCourse: string;
  message?: string;
}): PreRegistrationItem {
  const currentList = getPreRegistrations();
  
  // Format current date KST
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  const dateStr = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

  const nextOrderNumber = currentList.length > 0 
    ? Math.max(...currentList.map(item => item.orderNumber || 0)) + 1 
    : 1;

  const newItem: PreRegistrationItem = {
    id: `PR-${year}${month}${day}-${String(nextOrderNumber).padStart(3, '0')}`,
    orderNumber: nextOrderNumber,
    name: data.name.trim(),
    email: data.email.trim(),
    phone: data.phone.trim(),
    targetCourse: data.targetCourse,
    message: data.message?.trim() || '',
    createdAt: dateStr,
    status: '신청접수',
    adminNote: '',
  };

  const updatedList = [newItem, ...currentList];
  if (typeof window !== 'undefined') {
    localStorage.setItem(PRE_REG_KEY, JSON.stringify(updatedList));
    window.dispatchEvent(new CustomEvent('ding_registrations_updated', { detail: updatedList }));
    savePreRegistrationsToCloud(updatedList).catch(err => console.warn('Cloud save pre-reg warning:', err));
  }
  return newItem;
}

export function updatePreRegistration(id: string, updates: Partial<PreRegistrationItem>): PreRegistrationItem[] {
  const currentList = getPreRegistrations();
  const updatedList = currentList.map(item => {
    if (item.id === id) {
      return { ...item, ...updates };
    }
    return item;
  });
  if (typeof window !== 'undefined') {
    localStorage.setItem(PRE_REG_KEY, JSON.stringify(updatedList));
    window.dispatchEvent(new CustomEvent('ding_registrations_updated', { detail: updatedList }));
    savePreRegistrationsToCloud(updatedList).catch(err => console.warn('Cloud save pre-reg warning:', err));
  }
  return updatedList;
}

export function deletePreRegistration(id: string): PreRegistrationItem[] {
  const currentList = getPreRegistrations();
  const updatedList = currentList.filter(item => item.id !== id);
  if (typeof window !== 'undefined') {
    localStorage.setItem(PRE_REG_KEY, JSON.stringify(updatedList));
    window.dispatchEvent(new CustomEvent('ding_registrations_updated', { detail: updatedList }));
    savePreRegistrationsToCloud(updatedList).catch(err => console.warn('Cloud save pre-reg warning:', err));
  }
  return updatedList;
}

export function resetPreRegistrations(): PreRegistrationItem[] {
  if (typeof window !== 'undefined') {
    localStorage.setItem(PRE_REG_KEY, JSON.stringify(INITIAL_SAMPLE_DATA));
    window.dispatchEvent(new CustomEvent('ding_registrations_updated', { detail: INITIAL_SAMPLE_DATA }));
    savePreRegistrationsToCloud(INITIAL_SAMPLE_DATA).catch(err => console.warn('Cloud save pre-reg warning:', err));
  }
  return INITIAL_SAMPLE_DATA;
}

export function getAdminPassword(): string {
  if (typeof window === 'undefined') return '1234';
  return localStorage.getItem(ADMIN_PASSWORD_KEY) || '1234';
}

export function setAdminPassword(newPassword: string): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(ADMIN_PASSWORD_KEY, newPassword);
  }
}

export function isAdminAuthenticated(): boolean {
  if (typeof window === 'undefined') return false;
  return sessionStorage.getItem(ADMIN_SESSION_KEY) === 'true';
}

export function setAdminAuthenticated(auth: boolean): void {
  if (typeof window !== 'undefined') {
    if (auth) {
      sessionStorage.setItem(ADMIN_SESSION_KEY, 'true');
    } else {
      sessionStorage.removeItem(ADMIN_SESSION_KEY);
    }
  }
}

export function exportRegistrationsToCsv(items: PreRegistrationItem[]): void {
  // UTF-8 BOM for Excel Korean support
  const bom = '\uFEFF';
  const headers = ['순번', '접수번호', '이름', '신청강의', '연락처', '이메일', '딩마녀에게 하고싶은 말', '신청일시', '상태', '관리자메모'];
  
  const rows = items.map(item => [
    item.orderNumber,
    `"${item.id}"`,
    `"${item.name.replace(/"/g, '""')}"`,
    `"${item.targetCourse.replace(/"/g, '""')}"`,
    `"${item.phone.replace(/"/g, '""')}"`,
    `"${item.email.replace(/"/g, '""')}"`,
    `"${(item.message || '').replace(/"/g, '""').replace(/\n/g, ' ')}"`,
    `"${item.createdAt}"`,
    `"${item.status}"`,
    `"${(item.adminNote || '').replace(/"/g, '""').replace(/\n/g, ' ')}"`,
  ]);

  const csvContent = bom + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `ding_studio_registrations_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// ----------------------------------------------------
// YouTube Videos Management Helpers
// ----------------------------------------------------

export function extractYouTubeVideoId(url: string): string | null {
  if (!url) return null;
  // Match youtube.com/watch?v=XXXX, youtu.be/XXXX, youtube.com/shorts/XXXX, or /embed/XXXX
  const patterns = [
    /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([a-zA-Z0-9_-]{11})/,
    /^([a-zA-Z0-9_-]{11})$/
  ];
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }
  return null;
}

export function generateYouTubeThumbnail(url: string): string {
  const vid = extractYouTubeVideoId(url);
  if (vid) {
    return `https://i.ytimg.com/vi/${vid}/hqdefault.jpg`;
  }
  return '';
}

export function getYouTubeVideos(): YouTubeVideoItem[] {
  if (typeof window === 'undefined') return INITIAL_YOUTUBE_VIDEOS;
  try {
    const raw = localStorage.getItem(YOUTUBE_VIDEOS_KEY);
    if (!raw) {
      localStorage.setItem(YOUTUBE_VIDEOS_KEY, JSON.stringify(INITIAL_YOUTUBE_VIDEOS));
      return INITIAL_YOUTUBE_VIDEOS;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
    return INITIAL_YOUTUBE_VIDEOS;
  } catch (e) {
    console.error('Failed to parse YouTube videos from storage', e);
    return INITIAL_YOUTUBE_VIDEOS;
  }
}

export function saveYouTubeVideos(videos: YouTubeVideoItem[]): YouTubeVideoItem[] {
  if (typeof window !== 'undefined') {
    localStorage.setItem(YOUTUBE_VIDEOS_KEY, JSON.stringify(videos));
    window.dispatchEvent(new CustomEvent('ding_youtube_videos_updated', { detail: videos }));
    saveYouTubeVideosToCloud(videos).catch(err => console.warn('Cloud save youtube warning:', err));
  }
  return videos;
}

export function updateYouTubeVideo(id: string, updates: Partial<YouTubeVideoItem>): YouTubeVideoItem[] {
  const current = getYouTubeVideos();
  const updated = current.map(item => (item.id === id ? { ...item, ...updates } : item));
  return saveYouTubeVideos(updated);
}

export function addYouTubeVideo(video: YouTubeVideoItem): YouTubeVideoItem[] {
  const current = getYouTubeVideos();
  const updated = [video, ...current];
  return saveYouTubeVideos(updated);
}

export function deleteYouTubeVideo(id: string): YouTubeVideoItem[] {
  const current = getYouTubeVideos();
  const updated = current.filter(item => item.id !== id);
  return saveYouTubeVideos(updated);
}

export function resetYouTubeVideos(): YouTubeVideoItem[] {
  return saveYouTubeVideos(INITIAL_YOUTUBE_VIDEOS);
}

// ----------------------------------------------------
// Collaboration & Design Inquiries Storage Helpers
// ----------------------------------------------------

const INQUIRIES_KEY = 'ding_collaboration_inquiries_v1';

const INITIAL_INQUIRIES_SAMPLE: CollaborationInquiryItem[] = [
  {
    id: 'INQ-20260901-001',
    orderNumber: 1,
    name: '김서진 팀장 (패스트그로스)',
    phone: '010-3849-2104',
    email: 'seojin.kim@fastgrowth.kr',
    category: '강의 문의',
    message: '스타트업 마케터 및 신입 디자이너 20명을 대상으로 하는 비전공자 실무 브랜딩 및 로고 디자인 기업 출강(4주 오프라인 워크숍) 문의드립니다.',
    createdAt: '2026-09-01 11:30:00',
    status: '상담진행',
    adminNote: '커리큘럼 및 견적서 송부 완료 / 9월 중순 미팅 일정 조율 중',
  },
  {
    id: 'INQ-20260902-002',
    orderNumber: 2,
    name: '이도현 마케팅 리드 (모던홈)',
    phone: '010-8291-7402',
    email: 'dh.lee@modernhome.co.kr',
    category: '협업 제안',
    message: '딩마녀 유튜브 채널 내 데스크테리어 & 디자이너 업무 생산성 툴 소개 영상 협업 및 PPL 스폰서십 제휴 제안을 드리고자 합니다.',
    createdAt: '2026-09-02 14:15:30',
    status: '접수대기',
    adminNote: '',
  },
  {
    id: 'INQ-20260902-003',
    orderNumber: 3,
    name: '박수아 대표 (카페 르베르)',
    phone: '010-4492-1083',
    email: 'sooa.park@levertcafe.com',
    category: '디자인 의뢰',
    message: '신규 런칭 예정인 유기농 비건 디저트 카페 브랜드의 로고(BI), 컵/패키지 슬리브 그래픽 및 반응형 소개 웹사이트 전체 제작 견적 의뢰드립니다.',
    createdAt: '2026-09-02 17:40:12',
    status: '접수대기',
    adminNote: '',
  },
];

export function getInquiries(): CollaborationInquiryItem[] {
  if (typeof window === 'undefined') return INITIAL_INQUIRIES_SAMPLE;
  try {
    const raw = localStorage.getItem(INQUIRIES_KEY);
    if (!raw) {
      localStorage.setItem(INQUIRIES_KEY, JSON.stringify(INITIAL_INQUIRIES_SAMPLE));
      return INITIAL_INQUIRIES_SAMPLE;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : INITIAL_INQUIRIES_SAMPLE;
  } catch (e) {
    console.error('Failed to parse inquiries from storage', e);
    return INITIAL_INQUIRIES_SAMPLE;
  }
}

export function saveInquiry(data: {
  name: string;
  phone: string;
  email: string;
  category: InquiryCategory;
  message: string;
}): CollaborationInquiryItem {
  const currentList = getInquiries();
  
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  const dateStr = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

  const nextOrderNumber = currentList.length > 0 
    ? Math.max(...currentList.map(item => item.orderNumber || 0)) + 1 
    : 1;

  const newItem: CollaborationInquiryItem = {
    id: `INQ-${year}${month}${day}-${String(nextOrderNumber).padStart(3, '0')}`,
    orderNumber: nextOrderNumber,
    name: data.name.trim(),
    phone: data.phone.trim(),
    email: data.email.trim(),
    category: data.category,
    message: data.message.trim(),
    createdAt: dateStr,
    status: '접수대기',
    adminNote: '',
  };

  const updatedList = [newItem, ...currentList];
  if (typeof window !== 'undefined') {
    localStorage.setItem(INQUIRIES_KEY, JSON.stringify(updatedList));
    window.dispatchEvent(new CustomEvent('ding_inquiries_updated', { detail: updatedList }));
    saveInquiriesToCloud(updatedList).catch(err => console.warn('Cloud save inquiries warning:', err));
  }
  return newItem;
}

export function updateInquiry(id: string, updates: Partial<CollaborationInquiryItem>): CollaborationInquiryItem[] {
  const currentList = getInquiries();
  const updatedList = currentList.map(item => {
    if (item.id === id) {
      return { ...item, ...updates };
    }
    return item;
  });
  if (typeof window !== 'undefined') {
    localStorage.setItem(INQUIRIES_KEY, JSON.stringify(updatedList));
    window.dispatchEvent(new CustomEvent('ding_inquiries_updated', { detail: updatedList }));
    saveInquiriesToCloud(updatedList).catch(err => console.warn('Cloud save inquiries warning:', err));
  }
  return updatedList;
}

export function deleteInquiry(id: string): CollaborationInquiryItem[] {
  const currentList = getInquiries();
  const updatedList = currentList.filter(item => item.id !== id);
  if (typeof window !== 'undefined') {
    localStorage.setItem(INQUIRIES_KEY, JSON.stringify(updatedList));
    window.dispatchEvent(new CustomEvent('ding_inquiries_updated', { detail: updatedList }));
    saveInquiriesToCloud(updatedList).catch(err => console.warn('Cloud save inquiries warning:', err));
  }
  return updatedList;
}

export function resetInquiries(): CollaborationInquiryItem[] {
  if (typeof window !== 'undefined') {
    localStorage.setItem(INQUIRIES_KEY, JSON.stringify(INITIAL_INQUIRIES_SAMPLE));
    window.dispatchEvent(new CustomEvent('ding_inquiries_updated', { detail: INITIAL_INQUIRIES_SAMPLE }));
    saveInquiriesToCloud(INITIAL_INQUIRIES_SAMPLE).catch(err => console.warn('Cloud save inquiries warning:', err));
  }
  return INITIAL_INQUIRIES_SAMPLE;
}

export function exportInquiriesToCsv(items: CollaborationInquiryItem[]): void {
  const bom = '\uFEFF';
  const headers = ['순번', '접수번호', '이름', '연락처', '이메일', '선택(분류)', '문의내용', '접수일시', '상태', '관리자메모'];
  
  const rows = items.map(item => [
    item.orderNumber,
    `"${item.id}"`,
    `"${item.name.replace(/"/g, '""')}"`,
    `"${item.phone.replace(/"/g, '""')}"`,
    `"${item.email.replace(/"/g, '""')}"`,
    `"${item.category.replace(/"/g, '""')}"`,
    `"${(item.message || '').replace(/"/g, '""').replace(/\n/g, ' ')}"`,
    `"${item.createdAt}"`,
    `"${item.status}"`,
    `"${(item.adminNote || '').replace(/"/g, '""').replace(/\n/g, ' ')}"`,
  ]);

  const csvContent = bom + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `ding_studio_inquiries_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

