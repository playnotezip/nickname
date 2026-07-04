'use client';

import React from 'react';
import { Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export function HeaderSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative w-full rounded-2xl overflow-hidden shadow-xl bg-brand-neutral-900 border border-brand-primary-500/20"
    >
      {/* Background Graphic Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-brand-neutral-900 via-brand-neutral-900/80 to-transparent z-10" />
      
      {/* Hero Image */}
      <img
        src="https://picsum.photos/id/180/1200/400"
        alt="Game Hero Banner"
        className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-luminosity"
      />

      {/* Hero Content */}
      <div className="relative z-20 px-6 py-12 md:px-12 md:py-16 flex flex-col items-start max-w-2xl space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-primary-500/20 border border-brand-primary-500/30 text-brand-primary-500 text-xs font-semibold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 animate-spin-slow" />
          <span>AI-Powered Gaming Companion</span>
        </div>
        
        <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
          대체 불가능한 <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary-500 to-brand-secondary-500">
            나만의 게임 아이디
          </span>
        </h1>
        
        <p className="text-sm md:text-base text-brand-neutral-400 font-medium">
          인공지능(LLM)이 각 나라별 고유한 발음 정서와 게임 장르를 정밀하게 분석하여, 중복되지 않는 독창적이고 세련된 캐릭터 닉네임을 추천합니다.
        </p>
      </div>
    </motion.div>
  );
}
