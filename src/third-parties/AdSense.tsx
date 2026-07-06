'use client';

import Script from 'next/script';
import { usePathname } from 'next/navigation';

export const ADSENSE_CLIENT_ID = 'ca-pub-4315383149069646';

export default function AdSense() {
  const pathname = usePathname();

  // 프로덕션 환경에서만 스크립트 로드
  if (process.env.NODE_ENV !== 'production') {
    return null;
  }

  // 광고 게재에서 제외할 경로 정의 (콘텐츠가 없는 단순 약관 및 개인정보처리방침 페이지)
  const excludedPaths = ['/terms', '/privacy'];
  if (excludedPaths.includes(pathname)) {
    return null;
  }

  return (
    <>
      <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4315383149069646"
        crossOrigin="anonymous"></script>
    </>
  );
}

// AdSense 광고 컴포넌트
export function AdSenseAd({ slot, style = {} }: { slot: string; style?: React.CSSProperties }) {
  // 프로덕션 환경에서만 광고 표시
  if (process.env.NODE_ENV !== 'production') {
    return null;
  }

  return (
    <div style={{ display: 'block', textAlign: 'center', ...style }}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={ADSENSE_CLIENT_ID}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
      <Script id={`adsense-ad-${slot}`} strategy="afterInteractive">
        {
          `(adsbygoogle = window.adsbygoogle || []).push({});`
        }
      </Script>
    </div>
  );
}
