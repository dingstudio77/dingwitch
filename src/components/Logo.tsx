import React, { useState } from 'react';

interface LogoProps {
  className?: string;
  variant?: 'white' | 'purple' | 'auto' | 'color' | 'dark';
  alt?: string;
}

export const Logo: React.FC<LogoProps> = ({
  className = 'h-10 w-auto',
  variant = 'purple',
  alt = '딩마녀의 디자인클래스',
}) => {
  const [imgError, setImgError] = useState(false);

  // logo-white-original.png: White text & symbol on transparent/dark background
  // logo-dark-original.png: Purple text & symbol on transparent/light background
  const isDarkText = variant === 'purple' || variant === 'color' || variant === 'dark';
  const primarySrc = isDarkText ? '/logo-dark-original.png' : '/logo-white-original.png';
  const fallbackSvg = isDarkText ? '/logo-purple.svg' : '/logo-white.svg';

  if (imgError) {
    return (
      <img
        src={fallbackSvg}
        alt={alt}
        className={`object-contain select-none pointer-events-none ${className}`}
        loading="eager"
        decoding="async"
      />
    );
  }

  return (
    <img
      src={primarySrc}
      alt={alt}
      onError={() => setImgError(true)}
      className={`object-contain select-none pointer-events-none ${className}`}
      loading="eager"
      decoding="async"
    />
  );
};

