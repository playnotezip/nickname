'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

export default function TermsPage() {
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
          <div className="flex items-center gap-1 text-brand-primary-500 font-extrabold text-sm">
            <Shield className="w-4 h-4" />
            이용약관
          </div>
        </div>

        {/* Article Body */}
        <div className="space-y-6 text-brand-neutral-900 leading-relaxed">
          <h1 className="text-2xl font-extrabold text-brand-neutral-900 border-l-4 border-brand-primary-500 pl-3">
            서비스 이용약관
          </h1>
          <p className="text-xs text-brand-neutral-400 font-medium">
            최종 수정일: 2026년 7월 4일
          </p>

          <div className="space-y-4 text-sm font-medium">
            <section className="space-y-2">
              <h2 className="text-base font-bold text-brand-neutral-900">제 1 조 (목적)</h2>
              <p className="text-brand-neutral-400">
                본 약관은 닉네임.AI(이하 &quot;회사&quot; 또는 &quot;서비스&quot;)가 제공하는 AI 기반 게임 캐릭터 닉네임 생성 및 관련 제반 서비스의 이용에 대한 조건 및 절차, 이용자와 서비스의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-brand-neutral-900">제 2 조 (용어의 정의)</h2>
              <p className="text-brand-neutral-400">
                본 약관에서 사용하는 용어의 정의는 다음과 같습니다.
                <br />
                1. &quot;이용자&quot;: 서비스에 접속하여 본 약관에 따라 회사가 제공하는 서비스를 이용하는 고객을 말합니다.
                <br />
                2. &quot;콘텐츠&quot;: 회사가 이용자에게 제공하는 닉네임 목록 및 그에 따르는 설명 정보 일체를 포함합니다.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-brand-neutral-900">제 3 조 (이용계약의 성립 및 회원 탈퇴)</h2>
              <p className="text-brand-neutral-400">
                본 서비스는 별도의 로그인이나 회원가입 절차 없이 전면 무료로 개방된 비인증식 서비스입니다. 이용자가 서비스 메인 화면에 접속하여 서비스를 활용하는 시점부터 본 이용약관에 동의한 것으로 간주합니다.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-brand-neutral-900">제 4 조 (서비스의 제공 및 이용제한)</h2>
              <p className="text-brand-neutral-400">
                1. 회사는 이용자에게 AI 기술을 이용한 게임 닉네임 조합 및 생성 서비스를 실시간으로 제공합니다.
                <br />
                2. 회사는 컴퓨터 등 정보통신설비의 보수점검, 교체 및 고장, 통신의 두절 또는 운영상 상당한 이유가 있는 경우 서비스 제공을 일시적으로 중단할 수 있습니다.
                <br />
                3. 이용자의 과도한 반복 요청(DDoS 유사 행위)이 감지될 경우, 시스템의 안전을 위해 IP 기준 서비스 이용제한을 수행할 수 있습니다.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-brand-neutral-900">제 5 조 (생성된 결과의 소유권 및 면책사항)</h2>
              <p className="text-brand-neutral-400">
                1. AI를 통해 생성된 닉네임은 무작위적이고 창의적인 조합의 결과물로써, 특정 인물이나 단체, 기존 저작권과의 일치 여부를 사전 검증하지 않습니다. 
                <br />
                2. 이용자는 생성된 닉네임을 상업적 혹은 비상업적 게임 이용에 자유롭게 활용할 수 있으나, 해당 닉네임이 타인의 상표권, 저작권 등을 침해하여 발생하는 법적 분쟁에 대해 회사는 일절 책임을 지지 않습니다.
                <br />
                3. 회사는 AI 결과물의 유효성, 중복 없음, 또는 절대적인 사용 적합성을 보증하지 않습니다.
              </p>
            </section>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
