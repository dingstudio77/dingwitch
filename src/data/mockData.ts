import { StatItem, PortfolioProject, DesignClass, StudentReview, EBook, DesignServicePackage, YouTubeVideoItem } from '../types';

export const STUDIO_INFO = {
  name: '딩스튜디오',
  enName: 'DING STUDIO',
  director: '딩마녀 (Ding Witch)',
  tagline: '디자인 몰라도 OK! 4주 안에 로고·홈페이지로 수익 만들기',
  subTagline: '보는 순간 각인되는 독창적인 비주얼, 매출로 증명되는 실전 브랜딩 & 디자인 클래스',
  email: 'dingstudio77@gmail.com',
  instagram: 'https://www.instagram.com/_dingwitch/',
  instagramHandle: '@_dingwitch',
  youtube: 'https://www.youtube.com/@dingwitch7',
  youtubeHandle: '@dingwitch7',
  blog: 'https://blog.naver.com/design413_',
  newsletter: 'https://dingwitch.stibee.com/subscribe/',
  kakao: 'https://open.kakao.com/o/gQqm78Pf',
  kakaoPassword: 'ding',
  location: 'Seoul, Korea (Online Global Class & Studio)',
  operatingHours: 'Mon - Fri 09:00 - 18:00 (KST)',
};

export const STATS_DATA: StatItem[] = [
  {
    id: 'students',
    label: '누적 수강생 수',
    value: 500,
    suffix: '명+',
    description: '비전공자부터 스타트업 대표까지 검증된 실전 교육',
    iconName: 'Users',
  },
  {
    id: 'rating',
    label: '강의 만족도',
    value: 4.9,
    suffix: '점',
    prefix: '⭐ ',
    description: '수강생 98% 이상이 만점을 부여한 압도적 퀄리티 (5.0 만점)',
    iconName: 'Star',
  },
  {
    id: 'followers',
    label: 'SNS 팔로워 수',
    value: 10000,
    suffix: '명+',
    prefix: '총 ',
    description: '인스타그램·유튜브 디자이너 커뮤니티 활성 구독자',
    iconName: 'Sparkles',
  },
  {
    id: 'projects',
    label: '성공 프로젝트',
    value: 120,
    suffix: '건+',
    description: '스타트업 및 글로벌 브랜드 로고·웹사이트 완성 실적',
    iconName: 'Award',
  },
];

export const PORTFOLIO_DATA: PortfolioProject[] = [
  {
    id: 'aura-botanic',
    title: 'Aura Botanic 오가닉 뷰티 BI & Web',
    category: 'branding',
    categoryLabel: '브랜딩 & 웹',
    client: 'Aura Botanic Labs',
    year: '2025',
    thumbnail: 'https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&w=1000&q=80',
    coverImage: 'https://images.unsplash.com/photo-1608248597359-5b79659b85c1?auto=format&fit=crop&w=1600&q=80',
    images: [
      'https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1000&q=80',
    ],
    summary: '자연에서 영감을 얻은 고감도 비건 스킨케어 브랜드 아이덴티티와 D2C 반응형 커머스 웹 구축',
    description: '신규 론칭하는 프리미엄 비건 뷰티 브랜드 Aura Botanic의 심볼 로고, 컬러 팔레트, 패키지 가이드라인과 전환율 중심의 공식 스토어를 원스톱으로 디자인했습니다.',
    tags: ['로고 디자인', '브랜드 가이드', '반응형 웹', '패키지'],
    tools: ['Figma', 'Illustrator', 'React', 'Tailwind CSS'],
    highlights: ['론칭 1개월 차 사전 예약 3,000건 달성', '브랜드 인지도 설문 94% 긍정 평가', '모바일 쇼핑 경험 최적화'],
    featured: true,
  },
  {
    id: 'nova-space-tech',
    title: 'Nova Tech AI 테크 브랜딩 & 인터랙티브 웹',
    category: 'web',
    categoryLabel: '홈페이지 제작',
    client: 'Nova Intelligence Inc.',
    year: '2025',
    thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1000&q=80',
    coverImage: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1600&q=80',
    images: [
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80',
    ],
    summary: '차세대 생성형 AI 솔루션 테크 스타트업의 글로벌 IR 및 제품 랜딩 페이지 리뉴얼',
    description: '복잡한 AI 기술을 직관적이고 매력적인 인터랙션 모션으로 시각화하여 글로벌 투자자와 엔터프라이즈 고객의 신뢰를 확보했습니다.',
    tags: ['인터랙티브 웹', 'UI/UX 디자인', '다크 테마', '3D 모션'],
    tools: ['Framer', 'Figma', 'TypeScript', 'Motion'],
    highlights: ['투자 유치용 글로벌 IR 웹사이트 공개 후 시리즈 A 성공', '평균 체류 시간 3.2배 증가'],
    featured: true,
  },
  {
    id: 'cafe-mystique',
    title: 'Café Mystique 감성 로스터리 BI & 패키지',
    category: 'logo',
    categoryLabel: '로고 디자인',
    client: 'Café Mystique Roastery',
    year: '2024',
    thumbnail: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1000&q=80',
    coverImage: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=1600&q=80',
    images: [
      'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1000&q=80',
    ],
    summary: '신비로운 보랏빛 밤하늘의 무드를 담은 스페셜티 커피 로스터리의 엠블럼 로고 및 원두 패키지',
    description: '몽환적이면서도 세련된 타이포그래피와 밤하늘의 별자리를 모티브로 한 엠블럼을 통해 프리미엄 원두 브랜드의 깊은 풍미를 표현했습니다.',
    tags: ['엠블럼 로고', '원두 패키지', '굿즈 디자인', '인쇄 감리'],
    tools: ['Illustrator', 'Photoshop', 'InDesign'],
    highlights: ['텀블벅 펀딩 1200% 달성', '성수동 플래그십 스토어 메인 비주얼 적용'],
    featured: true,
  },
  {
    id: 'sol-luna-jewelry',
    title: 'Sol & Luna 하이엔드 아틀리에 브랜딩 & 웹',
    category: 'branding',
    categoryLabel: '브랜딩 & 웹',
    client: 'Sol & Luna Atelier',
    year: '2024',
    thumbnail: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1000&q=80',
    coverImage: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1600&q=80',
    images: [
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1000&q=80',
    ],
    summary: '태양과 달의 조화를 담은 수제 파인 주얼리 아틀리에의 시그니처 아이덴티티 및 룩북 웹사이트',
    description: '절제된 미니멀리즘과 섬세한 클래식 세리프 서체를 결합하여 주얼리 장인의 헤리티지를 온라인 쇼룸으로 완벽하게 구현했습니다.',
    tags: ['하이엔드 브랜딩', '온라인 쇼룸', '에디토리얼 레이아웃'],
    tools: ['Figma', 'Photoshop', 'Webflow'],
    highlights: ['온라인 VIP 고객 주문율 45% 신장', '해외 패션 매거진 수록'],
    featured: false,
  },
  {
    id: 'nextwave-vc',
    title: 'NextWave Ventures 벤처캐피털 웹 플랫폼',
    category: 'web',
    categoryLabel: '홈페이지 제작',
    client: 'NextWave Partners',
    year: '2024',
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1000&q=80',
    coverImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80',
    images: [
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1000&q=80',
    ],
    summary: '초기 기술 스타트업을 육성하는 벤처캐피털의 혁신적 포트폴리오 쇼케이스 플랫폼',
    description: '포트폴리오 스타트업들의 최신 뉴스와 투자 데이터를 동적으로 탐색할 수 있는 데이터 중심의 모던 웹 플랫폼을 구축했습니다.',
    tags: ['기업 웹사이트', 'IR 플랫폼', '포트폴리오 아카이브'],
    tools: ['Figma', 'Next.js', 'Tailwind CSS'],
    highlights: ['모바일 접근성 및 웹 표준 최우수 등급', '신규 스타트업 피칭 신청 200% 증가'],
    featured: false,
  },
  {
    id: 'moonlight-fragrance',
    title: 'Moonlight Elixir 니치 향수 패키지 & 로고',
    category: 'package',
    categoryLabel: '패키지 & 그래픽',
    client: 'Elixir Parfums',
    year: '2024',
    thumbnail: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=1000&q=80',
    coverImage: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=1600&q=80',
    images: [
      'https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=1000&q=80',
    ],
    summary: '달빛과 오리엔탈 우디 노트를 시각화한 프리미엄 니치 향수 패키지 박스 및 바틀 라벨링',
    description: '신비로운 엠보싱 금박과 딥 바이올렛 텍스처 페이퍼를 결합하여 언박싱의 모든 순간이 하나의 의식이 되도록 설계했습니다.',
    tags: ['패키지 디자인', '박 가공', '3D 렌더링', '인쇄 가이드'],
    tools: ['Illustrator', 'Cinema 4D', 'Photoshop'],
    highlights: ['글로벌 패키지 디자인 어워드 노미네이트', '출시 첫 주 완판'],
    featured: false,
  },
];

export const CLASSES_DATA: DesignClass[] = [
  {
    id: 'logo-masterclass',
    title: '로고디자인 수익화 정규과정',
    subtitle: '디자인이 처음이라도 OK!\n로고디자인 기초부터 수익화까지 모든 방법을 알려드려요',
    thumbnail: '/images/class-logo-masterclass.png',
    level: '초급-상급',
    duration: '4주 완성',
    lessonsCount: 16,
    originalPrice: 800000,
    discountPrice: 550000,
    badge: '👑 누적 수강생 1위',
    targetAudience: [
      '디자인을 한 번도 안해본 왕초보',
      '퇴근후, 육퇴후 시간을 활용해 부수입을 만들고 싶은 분',
      '내 브랜드 로고를 직접 만들어보고 싶은 분',
    ],
    features: [
      '로고디자인 수익화 정규과정 4주 VOD 강의 (120만 원 상당)',
      '매주 과제 실시간 피드백 강의 (80만원 상당)',
      '퀄리티 있어보이는 시안용 템플릿 (50만 원)',
      '로고 쉽게 만들 수 있는 AI 프롬프트 (50만 원)',
      '로고디자인에 자주 사용하는 폰트와 컬러칩 (50만원)',
      '주문이 들어올 수 밖에 없는 상세페이지 문구 (50만원)',
      '로고디자인 수강생 단톡방 운영 (40만원)',
      '크몽 승인 후 첫 거래까지 무제한 질문권 (30만 원)',
    ],
    curriculum: [
      {
        week: '1주차',
        title: '로고디자인 기본기 & 툴 마스터',
        description: '일러스트레이터 셋팅, 핵심 기능 소개, 텍스트형 로고 제작 실습',
      },
      {
        week: '2주차',
        title: '완성도 높은 로고 제작 기법',
        description: '디자인 심화 노하우, 로고 제작 기법, 심볼 및 엠블럼형 로고 제작',
      },
      {
        week: '3주차',
        title: '실무 프로세스 & AI 활용',
        description: '아이디어 발상법, 컬러 선정 방법, 저작권, AI 활용법, 포트폴리오 제작',
      },
      {
        week: '4주차',
        title: '크몽 수익화 & 클라이언트 관리',
        description: '크몽 세일즈 전략, 썸네일 및 상세페이지, 단가 책정, 명함 디자인, 클라이언트 응대법',
      },
    ],
  },
  {
    id: 'web-nocode-class',
    title: '홈페이지 수익화 정규과정',
    subtitle: '홈페이지를 처음 만들어 보는 분들도 OK!\n아임웹 기초부터 크몽 서비스 런칭하는 방법까지',
    thumbnail: '/images/class-web-nocode.png',
    level: '초급-상급',
    duration: '4주 완성',
    lessonsCount: 14,
    originalPrice: 800000,
    discountPrice: 550000,
    badge: '🔥 인기 폭발',
    targetAudience: [
      '왕초보지만 홈페이지 제작을 배우고 싶은 분',
      '건당 100만원 이상 수익 올리는 방법이 궁금한 분',
      '아임웹으로 포트폴리오 만들어 크몽 런칭까지 배우고 싶은 분',
    ],
    features: [
      '홈페이지 제작 4주 VOD강의 + 과제 실시간 피드백 (200만 원 상당)',
      '2배 더 부르는 견적서 폼 (70만 원 상당)',
      '고객에게 전달드리는 스케쥴 노션 템플릿 (50만 원 상당)',
      '홈페이지 쉽게 디자인 하는 AI 프롬프트 (70만원 상당)',
      '의뢰를 부르는 상세페이지 템플릿 (50만원 상당)',
      '홈페이지 제작 수강생 단톡방 운영 (50만원 상당)',
      '크몽 승인 후 첫 거래까지 무제한 질문권 (60만 원 상당)',
    ],
    curriculum: [
      {
        week: '사전강의',
        title: '아임웹 전문가 등록, 피그마 기초강의',
        description: '아임웹 전문가 계정 등록 및 피그마 핵심 인터페이스와 기초 툴 사용법',
      },
      {
        week: '1주차',
        title: '아임웹 기본기능 익히기 / 원페이지 사이트 제작',
        description: '아임웹 주요 섹션 블록 구성 및 반응형 원페이지 웹사이트 완성',
      },
      {
        week: '2주차',
        title: '쇼핑몰 / 숙박 홈페이지 (예약기능) / 카드결제 / 도메인 / SSL / 검색등록',
        description: '실전 이커머스 및 예약 시스템 구축, PG사 결제 연동, 도메인 연결 및 검색엔진 등록',
      },
      {
        week: '3주차',
        title: '회사 / 강의 홈페이지 / 상담연결 / 챗GPT,미드저니,구글AI스튜디오 활용법',
        description: '기업·교육용 웹사이트 구축, 카카오톡 상담 채널 연동, 생성형 AI를 활용한 제작 효율 극대화',
      },
      {
        week: '4주차',
        title: '제작프로세스 / 단가전략 / 상세페이지 / 크몽 런칭 / 수익화 방법 / 세금계산서',
        description: '실전 외주 프로세스, 고단가 견적 전략, 크몽 서비스 등록 및 전자세금계산서 발행 실무',
      },
    ],
  },
  {
    id: 'vibe-coding-class',
    title: '바이브코딩 마스터반',
    subtitle: '구글AI스튜디오로 자사 홈페이지, 포트폴리오 만드는 법을 알려드립니다',
    thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
    level: '초급-상급',
    duration: '4주 완성',
    lessonsCount: 10,
    originalPrice: 550000,
    discountPrice: 300000,
    badge: '🚀 신규 오픈',
    targetAudience: [
      '구글 AI 스튜디오로 기획부터 사이트 배포까지 배우고 싶은 분',
      '나의 브랜딩 / 회사 홈페이지를 직접 만들어 보고 싶은 분',
      '코딩과 디자인은 못하지만, 홈페이지 제작을 해보고 싶은 분',
    ],
    features: [
      '4주 VOD강의 + 실시간 피드백 강의(200만원 상당)',
      '1년 무제한 수강 / 질문권 (50만)',
      '구글AI스튜디오 프롬프트 챗봇 (30만)',
      '챗GPT 이미지 생성 프롬프트 리스트 (20만)',
      '홈페이지용 추천 폰트 리스트 (10만)',
      '퀄리티 올리는 인터렉션/애니메이션 프롬프트 (20만)',
      '홈페이지 완성도 셀프 체크리스트 (10만)',
    ],
    curriculum: [
      {
        week: '1주차',
        title: '꽃집 홈페이지',
        description: '프롬프트 작성법, 배포(구글, Netlify), 도메인, 에러수정',
      },
      {
        week: '2주차',
        title: '필라테스 홈페이지',
        description: '브랜딩, 미드저니 생성, 상담신청폼, DB관리',
      },
      {
        week: '3주차',
        title: '인테리어 회사 홈페이지',
        description: '인터렉션, 애니메이션 적용',
      },
      {
        week: '4주차',
        title: '포트폴리오 회사 홈페이지',
        description: '유지보수, 코딩수정, 사이트 전달',
      },
    ],
  },
  {
    id: 'personal-branding-class',
    title: '상세페이지 제작 과정',
    subtitle: '디자인 기초부터 상세페이지 제작까지\n완성하는 방법을 알려드립니다',
    thumbnail: '/images/class-personal-branding.png',
    level: '초급',
    duration: '4주 완성',
    lessonsCount: 8,
    originalPrice: 650000,
    discountPrice: 450000,
    badge: '✨ 실전 노하우',
    targetAudience: [
      '디자인 기초를 쌓고 싶은 분',
      '상세페이지 제작방법을 배우고 싶은 분',
      '상세페이지 제작으로 수익을 만들고 싶은 분',
    ],
    features: [
      '디자인 레벨업 정규과정 총 4강 - 1년 (200만원)',
      '모든 과제 디자인 피드백 (40만원)',
      '피그마 단축키 정리',
      '챗GPT 이미지 생성 프롬프트 리스트 (20만원)',
      '디자인에 사용하면 좋은 유료, 무료 폰트 리스트 (30만원)',
      '수강생 단톡방 운영 (30만원)',
      '크몽 상세페이지 템플릿 (20만원)',
    ],
    curriculum: [
      {
        week: '1주차',
        title: '썸네일 디자인',
        description: '피그마 기초, 레이아웃 기본, 폰트 선정, 컬러 선정 방법',
      },
      {
        week: '2주차',
        title: '배너 / 광고 디자인',
        description: '챗GPT 이미지 생성기법, 상품, 모델이미지, 합성기법',
      },
      {
        week: '3주차',
        title: '상세페이지 디자인 1',
        description: '디자인 심화, 벤치마킹 하는 법, 피그마 플러그인 활용법',
      },
      {
        week: '4주차',
        title: '상세페이지 디자인 2',
        description: '다양한 디자인 스타일 만들어보기, 포트폴리오 정리법, 크몽 런칭',
      },
    ],
  },
];

export const REVIEWS_DATA: StudentReview[] = [
  {
    id: 'rev-1',
    author: '최**님 (20대 / 남자)',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=150&q=80',
    courseName: '로고디자인 수익화 정규과정',
    rating: 5.0,
    date: '2025.02.20',
    highlight: '로고 기술 판매를 위한 크몽입점부터 상세페이지, 썸네일 작성 등 다 알려주셨습니다😄',
    content: `로고 기술을 판매할 수 있도록 크몽입점부터 상세페이지, 썸네일 작성 등 다 알려주셨습니다😄\n\n항상 강의 하나하나 정성스럽게 준비하시고 모든 걸 다 알려주시는 딩마녀님께 배울 수 있어서 행복하고 좋았습니다❤️`,
  },
  {
    id: 'rev-2',
    author: '박** (50대 / 남자)',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    courseName: '홈페이지 수익화 정규과정',
    rating: 5.0,
    date: '2025.02.18',
    highlight: '코딩 1도 모르는 제가 2시간 안에 고퀄의 홈피를 손쉽게 만들 수 있다는 게 너무 신기했습니다.',
    content: `첫 강의에 웹프로그래머만 제작 할 줄 알았던 홈피, 코딩 1도 모르는 제가 2시간안에 고퀄의 홈피를 손쉽게 만들 수 있다는 게 너무 신기했습니다.\n\n홈피강의는 우리기수까지에서 끝내는걸로 하시죠ㅋ '나만알고 싶은 딩마녀님 홈피' 강의 후기였습니다.`,
  },
  {
    id: 'rev-3',
    author: '룰*님 (40대 / 여자)',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80',
    courseName: '로고+홈페이지 수익화 정규과정',
    rating: 5.0,
    date: '2025.02.15',
    highlight: '전에 250 주고 맡긴 홈페이지가 너무 엉망이라며.. 저에게 다시 맡기셨네요~',
    content: `로고+홈페이지 수익화 정규과정 수강 후기입니다.\n전에 250 주고 맡긴 홈페이지가 너무 엉망이라고.. 저에게 다시 맡기셨네요~\n\n로고디자인과 홈페이지 같이 해드리기로 하고 70불렀는데 더 주신다고 하네요~!`,
  },
  {
    id: 'rev-4',
    author: '하*님 (30대 / 여자)',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    courseName: '홈페이지 수익화 정규과정',
    rating: 5.0,
    date: '2025.02.12',
    highlight: '이 강의를 듣고 한 달 동안 정말 많은 변화와 수익화 자신감이 생겼습니다.',
    content: `이 강의를 듣고 한 달 동안 정말 많은 변화가 일어났어요. 일단 수업을 듣고 수익화 할 수 있겠다는 자신감이 생겼습니다.\n\n평소에 디자인에 관심이 많았었는데 이렇게 바로 디자인을 활용할 수 있는 수업이라니.. 그것도 단가가 높다니! 저에겐 정말 도움이 많이 되는 강의였네요. 감사합니다!❤️`,
  },
  {
    id: 'rev-5',
    author: '김**님 (50대 / 여자)',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80',
    courseName: '로고디자인+홈페이지 수익화 정규과정',
    rating: 5.0,
    date: '2025.02.08',
    highlight: '실제로 전달하시는 내용, 주의사항과 매출을 처음부터 올릴 수 있는 단계별 지도까지!',
    content: `실제로 전달하시는 내용, 주의사항과 심지어 매출을 처음부터 올릴 수 있는 단계별 지도까지 알려주셨어요.\n\n고생스러워도 리뷰 작업을 위해 저가부터 해보고 명함까지 그리고 가능하다면 홈페이지 디자인까지 나아가는 딩마녀님의 수익화 풀코스!\n아름다운 목소리처럼 아름다웠던 강의 너무 감사합니다.`,
  },
  {
    id: 'rev-6',
    author: '우*님 (30대 / 여자)',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
    courseName: '홈페이지 수익화 정규과정',
    rating: 5.0,
    date: '2025.02.04',
    highlight: '개업 보름만에 90만원 달성했습니다!! 바빠졌지만 그래도 기쁘네요😭',
    content: `저 어제밤에도 35만원 결제 받았습니다.\n주신 자료로 견적도 내고, 일정표도 짜드리고 응대해드리니 너무 좋아하시더라구요.\n\n개업 보름만에 90만원 달성했습니다!! 바빠졌지만 그래도 기쁘네요😭 감사합니다!\n\n바빠져서 너무 행복합니다~ 감사해요!😆`,
  },
];

export const FAQS_DATA = [
  {
    q: '포토샵/일러스트 툴을 전혀 모르는 왕초보도 수강 가능한가요?',
    a: `네, 물론입니다! 제 수업은 왕초보 분들을 기준으로 알려드리기 때문에,
디자인을 하나도 모르셔도 괜찮습니다.
왕초보 수준에 맞춰서 아주 기초적인 내용부터 알려드리고 있습니다. 
누적 수강생 90% 이상이 디자인 비전공자였습니다.`,
  },
  {
    q: '정규과정은 언제 신청 가능한가요?',
    a: '대기 신청은 홈페이지를 통해 상시로 받고 있습니다. 정규과정이 열리면 안내문을 연락처로 보내드립니다.',
  },
  {
    q: '무료특강 공지는 어떻게 받나요?',
    a: `아래 3개의 채널을 통해 공지드리고 있습니다.
오픈카톡방 : https://open.kakao.com/o/gQqm78Pf (비번 : ding)
뉴스레터 : https://dingwitch.stibee.com/subscribe/
블로그 : https://blog.naver.com/design413_`,
  },
  {
    q: '수익화까지 얼마나 걸리나요?',
    a: `개인의 역량에 따라 차이가 있습니다.
가장 빠르신 분들은 4주 정규수업을 듣고 서비스 런칭하셔서 2주 이내에 수익을 만드시는 분들도 계십니다.`,
  },
];

export const EBOOKS_DATA: EBook[] = [
  {
    id: 'ebook-blog-design',
    title: '홈페이지형블로그 제작비법서',
    subtitle: '홈페이지형 블로그 기획부터 디자인, 위젯 스킨 적용까지',
    author: '딩마녀',
    coverImage: 'https://postfiles.pstatic.net/MjAyNjA5MDFfMTI5/MDAxNzg4MjY1NjM3ODMy.9TpiPeMivNL6c2HfMLa4YzcocbRuV1hwSrnvPMMCTY0g.V8pNeCYdMWHiiHEs1vsJowA94sgbb211YK0BxZj1qOcg.PNG/%EC%8A%A4%ED%81%AC%EB%A6%B0%EC%83%B7_2026-09-01_%EC%98%A4%ED%9B%84_9.26.28.png?type=w3840',
    pages: 120,
    format: 'PDF 전자책 (즉시 다운로드)',
    lastUpdated: '최신 개정판',
    rating: 4.9,
    reviewsCount: 248,
    originalPrice: 70000,
    discountPrice: 35000,
    badge: '👑 베스트',
    summary: '단순한 블로그를 브랜드 공식 웹사이트처럼 완성하는 홈페이지형 블로그 제작의 A to Z. 포토샵 레이아웃 기획, 투명 위젯 좌표 설정, 모바일 최적화 스킨, 실전 외주 수주 가이드까지 모두 담았습니다.',
    targetAudience: [
      '블로그를 전문 브랜드 웹사이트처럼 고급스럽게 꾸미고 싶은 1인 사업자/크리에이터',
      '포토샵을 이용해 홈페이지형 블로그 제작 스킬을 단기간에 마스터하고 싶은 분',
      '건당 20~50만원의 블로그 스킨 제작 외주 수익을 창출하고 싶은 디자이너 및 부업 희망자',
      '위젯 링크, 카테고리 이동 등 기능형 버튼 코드를 쉽게 구현하고 싶은 초보자'
    ],
    features: [
      '포토샵(PSD) 실전 제작 가이드 & 템플릿 원본 파일 5종 제공',
      '위젯 링크 연결을 위한 HTML/투명 태그 코드 완벽 치트시트',
      'PC와 모바일 화면 동시 최적화 레이아웃 배치 노하우',
      '실제 클라이언트 외주 견적서 및 커뮤니케이션 템플릿 수록'
    ],
    tableOfContents: [
      {
        chapter: 'Chapter 01',
        title: '홈페이지형 블로그의 기초와 환경 세팅',
        subtopics: [
          '일반 블로그 vs 홈페이지형 블로그 구조 및 장단점',
          '해상도별 캔버스 세팅과 레이아웃 그리드 시스템',
          '네이버 블로그 관리자 기본 설정과 세부 디자인 세팅'
        ]
      },
      {
        chapter: 'Chapter 02',
        title: '포토샵으로 완성하는 비주얼 메인 스킨',
        subtopics: [
          '헤더 메뉴바와 로고 비주얼 배치 공식',
          '고급스러운 텍스처와 컬러 무드보드 설정법',
          '배경 슬라이스(Slice)와 이미지 웹 최적화 저장 노하우'
        ]
      },
      {
        chapter: 'Chapter 03',
        title: '투명 위젯과 HTML 코드 연결 실전',
        subtopics: [
          '네이버 블로그 레이아웃 투명 위젯 5개 분할 원리',
          '투명 이미지 생성 및 좌표값(Map Tag) 링크 매핑',
          '모바일 타이틀 커버와 외부 링크(카톡/인스타/예약) 연동'
        ]
      },
      {
        chapter: 'Chapter 04',
        title: '외주 수주와 고수익 포트폴리오 전략',
        subtopics: [
          '크몽/숨고/블로그를 통한 첫 고객 유치 파이프라인',
          '클라이언트 요구사항 분석 및 견적 산정 기준표',
          '작업 검수 및 스킨 이전 세팅 표준 매뉴얼'
        ]
      }
    ],
    sampleExcerpt: {
      chapterTitle: 'Part 2. 클릭률을 3배 높이는 투명 위젯 배치 전략',
      text: `많은 분들이 홈페이지형 블로그를 제작할 때 비주얼 디자인에만 신경을 쓰고, 방문자가 실제로 클릭하는 동선(UX)을 놓치곤 합니다.

홈페이지형 블로그의 핵심은 '직관성'입니다. 상단 메인 비주얼에 핵심 슬로건을 명확히 두고, 바로 아래 5개의 균등 분할 위젯 영역에 [서비스 소개 / 포트폴리오 / 견적 문의 / 카카오톡 상담 / 오시는 길]과 같은 필수 버튼을 배치해야 이탈률이 급감하고 실제 문의 전환율이 극대화됩니다.

이 책에서는 초보자도 10분 만에 따라 할 수 있는 투명 좌표값 복사-붙여넣기 코드와 실제 업종별 맞춤 레이아웃 가이드를 제공합니다.`
    },
    detailImages: [
      'https://postfiles.pstatic.net/MjAyNjA5MDFfMjA2/MDAxNzg4MjY0NjkzNTc0.MAj4dLcaraYqzxLnP9NHz03ICg_axmyl79xy2Nby0tYg.rYkOCCc_4K2PP_fOMZSay2kBI3n8_bYHvEj5hzECGFMg.PNG/01.png?type=w3840',
      'https://postfiles.pstatic.net/MjAyNjA5MDFfMjAw/MDAxNzg4MjY0NjkzNzU2.T-CHLGSayfWN6py1wHNWx71eMwCzOsuOXI6euFO01eUg.AKMK_dp1EZ0PoiH1W4oBt_FnFs8viE_JdefTs2fRhrsg.PNG/02.png?type=w3840',
      'https://postfiles.pstatic.net/MjAyNjA5MDFfMjc2/MDAxNzg4MjY0NjkzNDky._rCqE4D2lPb7sen1gs4ZiyPrPuQMofd50tZ53AjgVFAg.sg7ry9AGOReHKIdvrprPpPyq1XTDpmEowi7dTWB60w8g.PNG/03.png?type=w3840',
      'https://postfiles.pstatic.net/MjAyNjA5MDFfMTQy/MDAxNzg4MjY0NjkzNDc3.G3-044GKgOH4uuhLMXzusr6-M_8nDODBMSS4KLmP-oYg.FClOTT0SJPNCZ7CsKlolde9UdB2dGvzgg8l3OM5XeaQg.PNG/04.png?type=w3840'
    ]
  },
  {
    id: 'ebook-design-business-500',
    title: '1인 디자인 사업으로 월 500만드는 법',
    subtitle: '디자인 외주 수주부터 단가 인상, 고정 고객 확보 공식',
    author: '딩마녀',
    coverImage: 'https://postfiles.pstatic.net/MjAyNjA5MDFfODUg/MDAxNzg4MjY2Mjg1Mjc0.O2XfecL3eNWgIVKl4x2oshEi463iiIJtwfPZKrdg3bYg.19aQ7VbbLfpOJ96ug6uhNnNTYSnjMt_ZvQcNyOyP_9kg.PNG/2.png?type=w3840',
    pages: 150,
    format: 'PDF 전자책 (즉시 다운로드)',
    lastUpdated: '최신 개정판',
    rating: 5.0,
    reviewsCount: 382,
    originalPrice: 30000,
    discountPrice: 9000,
    badge: '🔥 인기',
    summary: '디자인 전공자가 아니어도, 퇴사 후 방구석 1인 디자이너로 월 500만원 이상 안정적인 수익을 만드는 전 과정. 저단가 경쟁에서 탈출하는 브랜딩 및 세일즈 실전 비법서.',
    storyParagraphs: [
      `저는 디자인 경력 15년,\n로고디자인으로 월 500만원 수익,\n홈페이지 제작으로 건당 200만원 이상을 받고 있으며,\n1건에 1000만원 프로젝트를 제작해 본 노하우를 알려드리고 있습니다.\n현재 저에게 배운 디자인수강생은 500명 이상이 됩니다.`,
      `작년만 해도 회사를 다니는 평범한 워킹맘이었지만,\n지금은 1인 사업가로 월 1000만원 이상을 꾸준히 벌고 있습니다.`,
      `저도 첫걸음은 쉽지는 않았습니다.\n처음엔 포트폴리오도 없고, 고객도 어떻게 찾는지 모르고, 단가도 제대로 책정할 줄 몰라서 막막했습니다.\n하지만 지금은 로고디자인, 홈페이지 제작, 강의, 그리고 에어비앤비 사업까지 하면서 안정적인 수익을 만들고 있습니다.`,
      `이 과정에서 쌓아온 노하우를 여러분들에게 알려드리려고 합니다.\n이 책을 읽으면, 당신도 할 수 있습니다.\n\n이 전자책은 초보단계에서 벗어나 상위레벨로 갈 수 있는 방법을 담았습니다.`
    ],
    contentImage: 'https://cdn-optimized.imweb.me/upload/S20240808137a5b5a0486b/14a48a0473102.png?w=1536',
    learningPoints: [
      '크몽에서 벗어나 고단가로 가는 방법',
      '디자인으로 수익화하는 구체적인 방법',
      '프리랜서에서 1인 사업자로 성장하는 방법',
      '부업에서 사업으로 진화시키는 방법',
      '단골고객으로 만드는 방법'
    ],
    targetAudience: [
      '디자인을 배웠지만, 수익 올리는 법을 모르는 분',
      '단순한 프리랜서가 아니라, 1인 사업자가 되고 싶은 분',
      '디자인을 활용해 월 500이상 수익을 내고 싶은 분',
      '디자인 왕초보 딱지를 떼고 상위레벨로 가고 싶은 분'
    ],
    features: [
      '단가 3배 올리는 제안서 및 견적서 실제 템플릿 포함',
      '재구매율 80% 달성하는 클라이언트 커뮤니케이션 스크립트',
      '블로그/인스타그램을 통한 오가닉 고객 유입 파이프라인 구축법',
      '1인 기업 세무, 계약서 작성, 전자계약 실무 노하우'
    ],
    tableOfContents: [
      {
        chapter: 'Chapter 01',
        title: '1인 디자인 사업의 마인드셋 & 포지셔닝',
        subtopics: [
          '단순 "외주 노동자"에서 "비즈니스 파트너"로 포지셔닝하기',
          '나만의 킬러 서비스 정의와 경쟁자 없는 차별화 공식',
          '월 500만원 수익 달성을 위한 포트폴리오 재구성 전략'
        ]
      },
      {
        chapter: 'Chapter 02',
        title: '고단가 고객을 끌어당기는 유입 시스템',
        subtopics: [
          '플랫폼 수수료 0% 독립 채널(블로그/인스타) 브랜딩',
          '포트폴리오 비포&애프터 스토리텔링 기법',
          '검색 유입을 폭발시키는 디자인 키워드 선점 전략'
        ]
      },
      {
        chapter: 'Chapter 03',
        title: '단가 협상과 거절 없는 계약 클로징',
        subtopics: [
          '"너무 비싸요"에 대응하는 확신을 주는 설득 스크립트',
          '패키지 상품화로 건당 단가 300만원 만들기',
          '선금 100% 또는 50%를 당당하게 받는 안전 계약 절차'
        ]
      },
      {
        chapter: 'Chapter 04',
        title: '지속 가능한 월 500+ 자동화 & 파이프라인',
        subtopics: [
          '단골 고객의 월 관리형 리테이너(Retainer) 계약 체결법',
          '디자인 템플릿/전자책 등 디지털 자산 패시브 인컴',
          '작업 시간을 1/3로 줄여주는 워크플로우 템플릿화'
        ]
      }
    ],
    sampleExcerpt: {
      chapterTitle: 'Chapter 3. 왜 고객은 당신의 견적을 깎으려 할까요?',
      text: `고객이 견적을 깎는 이유는 당신의 디자인 실력이 부족해서가 아닙니다. 그 디자인이 "얼마의 비즈니스 가치를 돌려줄지" 확신하지 못하기 때문입니다.

"로고 하나에 50만원입니다"라고 말하는 순간 가격 비교의 늪에 빠집니다.

반면 "이 로고와 브랜드 시스템을 통해 귀사의 신뢰도를 높여 첫인상 문의 전환율을 2배로 만듭니다"라고 제안하면 고객은 비용이 아닌 투자의 관점으로 바라보게 됩니다. 이 작은 관점의 전환이 단가를 3배로 올리는 비결입니다.`
    },
  },
  {
    id: 'ebook-midjourney-design',
    title: '미드저니로 매력적인 디자인 만드는 법',
    subtitle: 'AI 미드저니 프롬프트와 실전 디자인 그래픽 완성 치트키',
    author: '딩마녀',
    coverImage: 'https://postfiles.pstatic.net/MjAyNjA5MDFfNyAg/MDAxNzg4MjY2Mjg1MjQx.EDL-9R9JPb8BcK3EZrxGwEGc3m_gVcmPquXS93YWcCwg.opbL1wN8yFWT_shDMr9qv1MxyvW6pcS5b4X2zAgEMgEg.PNG/1.png?type=w3840',
    pages: 110,
    format: 'PDF 전자책 (즉시 다운로드)',
    lastUpdated: '최신 개정판',
    rating: 4.9,
    reviewsCount: 195,
    originalPrice: 45000,
    discountPrice: 30000,
    badge: '🚀 신규',
    summary: '명령어 몇 줄로 상업용 수준의 감각적인 그래픽을 뽑아내는 미드저니 실전 가이드. 브랜드 무드보드, 패키지 목업, 3D 일러스트, 웹 배너 제작 프롬프트 100+ 치트시트 수록.',
    storyParagraphs: [
      `'디자인을 말로 그릴 수 있다면 얼마나 좋을까요?'\n\n이제 그게 가능합니다.\n바로 AI 이미지 생성툴, 미드저니 덕분입니다.`,
      `디자인 감각이 부족해도, 그림을 못 그려도,\n한 줄의 프롬프트만 잘 쓰면, 감각적인 로고, 홈페이지 시안, 브랜딩 이미지까지 만들어줍니다.`,
      `제가 직접 써보고, 실무에 적용해 본 실전 노하우를 무료전자책으로 정리했습니다.\n디자인 잘하고 싶으신 분들은 구매하셔도 좋습니다!`
    ],
    contentImages: [
      'https://cdn-optimized.imweb.me/upload/S20240808137a5b5a0486b/31811cd7faa88.png?w=1536',
      'https://cdn-optimized.imweb.me/upload/S20240808137a5b5a0486b/d1fd408c4712f.png?w=1536'
    ],
    midSectionHeading: '누구나 따라할 수 있는\n미드저니 디자인 실전 노하우!',
    learningHeading: '이 무료전자책에서 배울 수 있는 내용',
    learningPoints: [
      '미드저니 기본사용 방법',
      '프롬프트 구조와 구성요소',
      '좋은 프롬프트 작성법과 실전예시',
      '로고디자인/ 홈페이지 시안 생성방법',
      '매력적인 이미지 뽑아내는 프롬프트 작성법'
    ],
    targetAudience: [
      '미드저니를 처음 사용하시는 분',
      '디자인에 미드저니를 활용하고 싶은 분',
      '시간 적게 들이고 빠르게 결과물을 만들고 싶은 분',
      '로고, 홈페이지 사업에 미드저니를 적용하고 싶은 분',
      '미드저니에 대해 자세히 배우고 싶은 분'
    ],
    features: [
      '업종별 즉시 복사해서 쓰는 상업용 프롬프트 100+ 치트시트',
      '미드저니 v6 핵심 파라미터(--ar, --s, --v, --cw, --cref) 완벽 분석',
      'AI 생성 이미지의 해상도 업스케일링 & 포토샵 후가공 워크플로우',
      '실전 웹사이트/상세페이지/SNS 카드뉴스 적용 레퍼런스'
    ],
    tableOfContents: [
      {
        chapter: 'Chapter 01',
        title: '미드저니 기본 설정 & 프롬프트 문법 마스터',
        subtopics: [
          '디스코드 세팅 및 최적 설정값 가이드',
          '프롬프트 구조: 주제 + 스타일 + 조명 + 카메라 앵글',
          '가장 많이 쓰는 핵심 파라미터 완전 정복'
        ]
      },
      {
        chapter: 'Chapter 02',
        title: '디자이너처럼 연출하는 스타일 키워드',
        subtopics: [
          '미니멀리즘, 3D 렌더링, 수채화, 사이버펑크 스타일 구현',
          '빛과 질감(Lighting & Texture) 키워드 30선',
          '원하는 색감(Palette) 정확히 고정하는 팁'
        ]
      },
      {
        chapter: 'Chapter 03',
        title: '일관성 있는 캐릭터 & 브랜드 비주얼 만들기',
        subtopics: [
          '동일한 인물/캐릭터 표정 및 각도 유지법 (--cref)',
          '브랜드 스타일 레퍼런스 고정법 (--sref)',
          '패키지 디자인 목업 및 제품 사진 합성 테크닉'
        ]
      },
      {
        chapter: 'Chapter 04',
        title: '상업적 결과물로 완성하는 후가공 스킬',
        subtopics: [
          '무손실 고해상도 4K/8K 업스케일링 툴 활용법',
          '포토샵 배경 지우기(누끼)와 텍스트 레이아웃 합성',
          '실제 상세페이지 배너 및 유튜브 썸네일 완성'
        ]
      }
    ],
    sampleExcerpt: {
      chapterTitle: 'Chapter 2. "감성적인 디자인"을 AI가 이해하는 단어로 바꾸기',
      text: `우리가 "예쁘고 감성적인 카페 인테리어"라고 입력하면 미드저니는 너무나 광범위한 해석을 내놓습니다.

대신 "Warm cinematic sunlight, soft architectural shadows, modern Scandinavian minimal aesthetic, 35mm lens, f/1.8"과 같이 빛의 성격, 렌즈 스펙, 디자인 사조를 조합하면 전문 포토그래퍼가 촬영한 듯한 압도적인 퀄리티의 결과물이 즉시 생성됩니다.

이 책에서는 디자이너의 언어를 미드저니 프롬프트로 치환하는 100가지 실전 키워드 사전을 제공합니다.`
    },
  },
];

export const DESIGN_PACKAGES_DATA: DesignServicePackage[] = [
  {
    id: 'package-logo',
    title: '로고 & 브랜드 아이덴티티 (BI/CI)',
    category: 'logo',
    badge: '👑 최다 의뢰',
    tagline: '보는 순간 각인되는 독창적인 심볼과 브랜드 전용 아이덴티티 구축',
    deliverables: [
      '시그니처 심볼 & 워드마크 로고 시안 3종 제안',
      '브랜드 컬러 시스템 (CMYK, RGB, HEX 코덱)',
      '타이포그래피 및 전용 서체 페어링 가이드',
      '명함, 봉투, 소셜미디어 프로필 키트',
      '고해상도 원본 파일 (AI, EPS, SVG, PNG, PDF)',
      '브랜드 가이드북 PDF (사용 규정서)',
    ],
    duration: '7~10 영업일 소요',
    revisionCount: '선택 시안 내 무제한 세부 수정',
    basePrice: 650000,
    recommendedFor: '신규 창업 스타트업, 카페/F&B, 뷰티, 패션, 프리미엄 1인 브랜드',
  },
  {
    id: 'package-web',
    title: '반응형 홈페이지 & 랜딩페이지 (아임웹)',
    category: 'web',
    badge: '🔥 전환율 극대화',
    tagline: 'PC·모바일 완벽 반응형, 이탈률을 낮추고 매출로 직결되는 고감도 웹사이트',
    deliverables: [
      '전환율 중심 맞춤형 UI/UX 와이어프레임 기획',
      '모바일·태블릿·PC 100% 반응형 최적화',
      '고화질 인터랙티브 비주얼 및 마이크로 인터랙션 연출',
      '고객 실시간 문의 폼 및 카카오톡 채널 연동',
      '네이버/구글 검색엔진 최적화 (SEO) 세팅',
      '도메인 연결 및 SSL 보안 인증서 설정',
      '사이트 직접 관리 가능한 운영 가이드 영상 제공',
    ],
    duration: '2~3주 소요',
    revisionCount: '단계별 3회 상세 피드백 수정',
    basePrice: 1500000,
    recommendedFor: '공식 자사몰, 브랜드 소개 사이트, IR 투자 유치 웹, 서비스 랜딩페이지',
  },
  {
    id: 'package-detail',
    title: '고효율 상세페이지 & 프로모션 그래픽',
    category: 'detail',
    tagline: '고객의 구매 심리를 자극하는 스토리텔링과 압도적인 비주얼 연출',
    deliverables: [
      '제품 소구점 분석 및 5단계 구매 설득 스토리보드 기획',
      '감각적인 제품 합성 및 3D/GIF 모션 그래픽',
      '스마트스토어, 쿠팡, 와디즈 규격 맞춤 분할 파일',
      '썸네일 3종 (클릭률 테스트용 A/B 시안)',
      '수정 가능한 PSD/Figma 원본 파일 제공',
    ],
    duration: '5~7 영업일 소요',
    revisionCount: '2회 상세 수정',
    basePrice: 550000,
    recommendedFor: '스마트스토어 입점 셀러, 텀블벅/와디즈 펀딩 프로젝트, 신제품 론칭 브랜드',
  },
  {
    id: 'package-all-in-one',
    title: '올인원 풀 브랜딩 솔루션 (Total Branding)',
    category: 'all-in-one',
    badge: '✨ 토탈 솔루션',
    tagline: '로고 디자인부터 브랜드 웹사이트, 패키지, 브랜드 가이드까지 원스톱 완성',
    deliverables: [
      '프리미엄 BI/CI 로고 시안 4종 제안 및 가이드북',
      '반응형 공식 웹사이트 풀 커스텀 구축 (5페이지 내외)',
      '패키지 박스 or 시그니처 굿즈 디자인',
      '명함/봉투/스티커/SNS 템플릿 풀세트',
      '상세페이지 1개 무료 제작 지원',
      '1:1 딩마녀 디렉터 전담 브랜딩 컨설팅',
    ],
    duration: '3~4주 소요',
    revisionCount: '무제한 1:1 맞춤 피드백',
    basePrice: 2800000,
    recommendedFor: '성공적인 론칭을 원하는 기업, 브랜드 리브랜딩, 법인 및 스타트업',
  },
];

export const INITIAL_YOUTUBE_VIDEOS: YouTubeVideoItem[] = [
  {
    id: 'ding-yt-1',
    title: '핀터레스트보다 좋은? 디자이너들이 숨겨두는 디자인 레퍼런스 사이트 5가지',
    thumbnail: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80',
    publishedAt: '최근 영상',
    url: 'https://www.youtube.com/@dingwitch7/videos',
    views: '1.2만회',
    duration: '11:45',
    tag: '디자인 레퍼런스 5선',
  },
  {
    id: 'ding-yt-2',
    title: '너무 많은 AI 툴 쓰다가 결국 여기에 정착했습니다 (16년차 디자이너 추천)',
    thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
    publishedAt: '인기 영상',
    url: 'https://www.youtube.com/@dingwitch7/videos',
    views: '5.8만회',
    duration: '14:20',
    tag: 'AI 디자인 툴 정착기',
  },
  {
    id: 'ding-yt-3',
    title: 'ChatGPT + CODEX로 끝내는 웹사이트 제작! 기획·디자인부터 배포까지',
    thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
    publishedAt: '인기 강좌',
    url: 'https://www.youtube.com/@dingwitch7/videos',
    views: '1.9만회',
    duration: '16:50',
    tag: 'AI 웹사이트 제작',
  },
  {
    id: 'ding-yt-4',
    title: '16년 차 디자이너의 AI 카페 브랜딩 & 로고 디자인 전체 제작과정 공개',
    thumbnail: 'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?auto=format&fit=crop&w=800&q=80',
    publishedAt: '추천 영상',
    url: 'https://www.youtube.com/@dingwitch7/videos',
    views: '2.2만회',
    duration: '19:35',
    tag: '카페 브랜딩 / 로고',
  },
  {
    id: 'ding-yt-5',
    title: '(왕초보도 30분 만에 가능!) 아임웹으로 노코딩 웹사이트 & 쇼핑몰 만들기',
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    publishedAt: '실전 튜토리얼',
    url: 'https://www.youtube.com/@dingwitch7/videos',
    views: '2.1만회',
    duration: '23:10',
    tag: '아임웹 노코딩 제작',
  },
  {
    id: 'ding-yt-6',
    title: '비전공자 경단녀에서 1인 디자인 외주로 월 500만원 달성한 현실 로드맵',
    thumbnail: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
    publishedAt: '외주 성공기',
    url: 'https://www.youtube.com/@dingwitch7/videos',
    views: '3.4만회',
    duration: '18:15',
    tag: '디자인 외주 수익화',
  },
  {
    id: 'ding-yt-7',
    title: '미드저니(Midjourney) 실무 로고 디자인 프롬프트 공식 7가지 총정리',
    thumbnail: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=800&q=80',
    publishedAt: '추천 강좌',
    url: 'https://www.youtube.com/@dingwitch7/videos',
    views: '2.8만회',
    duration: '15:40',
    tag: '로고 디자인 프롬프트',
  },
  {
    id: 'ding-yt-8',
    title: '피그마(Figma) 초보자가 하루 만에 반응형 웹디자인 끝내는 핵심 기초',
    thumbnail: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=800&q=80',
    publishedAt: '기초 완성',
    url: 'https://www.youtube.com/@dingwitch7/videos',
    views: '1.7만회',
    duration: '21:05',
    tag: '피그마 반응형 웹',
  },
  {
    id: 'ding-yt-9',
    title: '디자이너가 절대 놓치면 안 되는 상업용 무료 폰트 & 폰트 조합 치트키',
    thumbnail: 'https://images.unsplash.com/photo-1516962215378-7fa2e137ae93?auto=format&fit=crop&w=800&q=80',
    publishedAt: '실전 팁',
    url: 'https://www.youtube.com/@dingwitch7/videos',
    views: '4.1만회',
    duration: '13:20',
    tag: '무료 폰트 조합법',
  },
  {
    id: 'ding-yt-10',
    title: 'AI로 상세페이지 기획부터 카피라이팅, 비주얼 완성까지 1시간 컷!',
    thumbnail: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&w=800&q=80',
    publishedAt: 'AI 제작기',
    url: 'https://www.youtube.com/@dingwitch7/videos',
    views: '2.5만회',
    duration: '17:30',
    tag: '상세페이지 AI 완성',
  },
  {
    id: 'ding-yt-11',
    title: '크몽 & 숨고에서 단번에 계약되는 1인 디자이너 외주 견적서 & 제안서 작성법',
    thumbnail: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=800&q=80',
    publishedAt: '수익화 노하우',
    url: 'https://www.youtube.com/@dingwitch7/videos',
    views: '3.9만회',
    duration: '19:45',
    tag: '외주 견적 & 제안서',
  },
  {
    id: 'ding-yt-12',
    title: '16년 차가 알려주는 실패 없는 브랜드 컬러 팔레트 & 무드보드 조합법',
    thumbnail: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80',
    publishedAt: '브랜딩 노하우',
    url: 'https://www.youtube.com/@dingwitch7/videos',
    views: '1.8만회',
    duration: '14:50',
    tag: '컬러 팔레트 가이드',
  },
];

