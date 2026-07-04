'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ShieldAlert } from 'lucide-react';
import { motion } from 'framer-motion';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-brand-neutral-100/50 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-3xl mx-auto bg-white rounded-2xl p-6 md:p-10 shadow-md border border-brand-neutral-100 space-y-8"
      >
        {/* Navigation back */}
        <div className="flex justify-between items-center border-b border-brand-neutral-100 pb-5">
          <Link
            href="/"
            className="flex items-center gap-1.5 text-sm font-bold text-brand-neutral-400 hover:text-brand-primary-500 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            메인 페이지로 돌아가기
          </Link>
          <div className="flex items-center gap-1 text-brand-accent-500 font-extrabold text-sm">
            <ShieldAlert className="w-4 h-4" />
            개인정보처리방침
          </div>
        </div>

        {/* Article Body */}
        <div className="space-y-6 text-brand-neutral-900 leading-relaxed">
          <h1 className="text-2xl font-extrabold text-brand-neutral-900 border-l-4 border-brand-accent-500 pl-3">
            개인정보처리방침
          </h1>
          <p className="text-xs text-brand-neutral-400 font-medium">
            최종 수정일: 2026년 7월 4일
          </p>

          <div className="space-y-4 text-sm font-medium">
            <section className="space-y-2">
              <h2 className="text-base font-bold text-brand-neutral-900">1. 개인정보 수집에 대한 원칙</h2>
              <p className="text-brand-neutral-400">
                본 서비스는 비인증 기반(`auth-type: none`)의 도구 서비스로써, 사용자의 이름, 이메일, 생년월일, 소셜 미디어 계정 토큰 등 어떠한 **개인식별정보(PII)**도 수집하거나 요구하지 않음을 원칙으로 합니다.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-brand-neutral-900">2. 수집하는 정보의 종류 및 목적</h2>
              <p className="text-brand-neutral-400">
                서비스 제공 중 시스템 보안 유지, 과도한 Rate Limiting 차단, 서비스 사용 추세 분석을 위해 아래와 같은 비식별 기술 정보가 기록될 수 있습니다.
                <br />
                * **수집 항목**: 접속 국가 위치(IP 주소 기반 식별), 브라우저 사용자 에이전트(User Agent), 요청 전송 시각.
                <br />
                * **이용 목적**: 디도스(DDoS) 및 비정상 매크로 접근 방지, 국가별 선택 선호도 익명 통계.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-brand-neutral-900">3. 쿠키(Cookie) 및 로컬스토리지(LocalStorage) 사용</h2>
              <p className="text-brand-neutral-400">
                1. 본 서비스는 개인 브라우저 세션 상태 및 설정 정보를 유지하기 위해 이용자의 브라우저 내 **로컬 스토리지(LocalStorage)**를 활용합니다.
                <br />
                2. 저장되는 데이터는 이용자가 직접 설정한 최근 생성 이력(최대 20건) 및 사용자가 수동으로 저장한 북마크 리스트에 한정됩니다.
                <br />
                3. 해당 정보는 전적으로 이용자의 로컬 기기에만 저장되며, 회사나 타사 서버로 절대 자동 전송되지 않습니다. 브라우저 쿠키 청소 또는 캐시 초기화를 통해 언제든지 데이터를 즉시 삭제할 수 있습니다.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-brand-neutral-900">4. 외부 API 제공업체 정보 전송</h2>
              <p className="text-brand-neutral-400">
                닉네임의 실시간 인공지능 추천 연산을 위해 사용자가 지정한 옵션(스타일, 글자수, 장르 등)을 OpenAI 시스템(BFF API 경유)에 전송합니다. 전송되는 프롬프트 정보에는 사용자의 어떠한 개인 식별 데이터도 포함되지 않습니다.
              </p>
            </section>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
