export interface StatItem {
  id: string;
  label: string;
  value: number;
  suffix: string;
  prefix?: string;
  description: string;
  iconName: string;
}

export interface PortfolioProject {
  id: string;
  title: string;
  category: 'logo' | 'web' | 'branding' | 'package';
  categoryLabel: string;
  client: string;
  year: string;
  thumbnail: string;
  coverImage: string;
  images: string[];
  summary: string;
  description: string;
  tags: string[];
  tools: string[];
  highlights: string[];
  featured?: boolean;
}

export interface DesignClass {
  id: string;
  title: string;
  subtitle: string;
  thumbnail: string;
  level: '초급' | '중급' | '올인원' | '초급-상급' | string;
  duration: string;
  lessonsCount: number;
  originalPrice: number;
  discountPrice: number;
  badge?: string;
  targetAudience: string[];
  features: string[];
  curriculum: {
    week: string;
    title: string;
    description: string;
  }[];
}

export interface StudentReview {
  id: string;
  author: string;
  role?: string;
  avatar: string;
  courseName: string;
  rating: number;
  date: string;
  content: string;
  highlight: string;
  projectThumbnail?: string;
}

export interface EBook {
  id: string;
  title: string;
  subtitle: string;
  author: string;
  coverImage: string;
  pages: number;
  format: string;
  lastUpdated: string;
  rating: number;
  reviewsCount: number;
  originalPrice: number;
  discountPrice: number;
  badge?: string;
  summary: string;
  targetAudience: string[];
  features: string[];
  tableOfContents: {
    chapter: string;
    title: string;
    subtopics: string[];
  }[];
  sampleExcerpt: {
    chapterTitle: string;
    text: string;
  };
  detailImages?: string[];
  storyParagraphs?: string[];
  contentImage?: string;
  contentImages?: string[];
  midSectionHeading?: string;
  learningHeading?: string;
  learningPoints?: string[];
}

export interface DesignServicePackage {
  id: string;
  title: string;
  category: 'logo' | 'web' | 'detail' | 'all-in-one';
  badge?: string;
  tagline: string;
  deliverables: string[];
  duration: string;
  revisionCount: string;
  basePrice: number;
  recommendedFor: string;
}

export type InquiryCategory = '강의 문의' | '협업 제안' | '디자인 의뢰';

export interface CollaborationInquiryItem {
  id: string;
  orderNumber: number;
  name: string;
  phone: string;
  email: string;
  category: InquiryCategory;
  message: string;
  createdAt: string;
  status: '접수대기' | '상담진행' | '답변완료' | '보류';
  adminNote?: string;
}

export interface InquiryFormData {
  name: string;
  company?: string;
  email: string;
  phone: string;
  serviceType?: string;
  schedule?: string;
  budget?: string;
  message: string;
  category?: InquiryCategory;
  styleKeywords?: string[];
  referenceLink?: string;
}

export type PreRegStatus = '신청접수' | '1차연락완료' | '수강확정' | '취소/보류';

export interface PreRegistrationItem {
  id: string;
  orderNumber: number;
  name: string;
  email: string;
  phone: string;
  targetCourse: string;
  message?: string;
  createdAt: string;
  status: PreRegStatus;
  adminNote?: string;
}

export interface YouTubeVideoItem {
  id: string;
  title: string;
  thumbnail: string;
  url: string;
  publishedAt?: string;
  views?: string;
  duration?: string;
  tag?: string;
}
