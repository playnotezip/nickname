'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { NICKNAME_STYLES } from '../constants';
import { NicknameStyle } from '../types';
import { Sparkles, Gamepad2, Tag } from 'lucide-react';

interface GeneratorFormProps {
  style: NicknameStyle;
  setStyle: (style: NicknameStyle) => void;
  length: number;
  setLength: (length: number) => void;
  onGenerate: () => void;
  isGenerating: boolean;
}

export function GeneratorForm({
  style,
  setStyle,
  length,
  setLength,
  onGenerate,
  isGenerating,
}: GeneratorFormProps) {

  return (
    <div className="w-full bg-white dark:bg-zinc-900 rounded-2xl p-6 shadow-md border border-brand-neutral-100 dark:border-zinc-800 space-y-6 transition-colors">
      <h2 className="text-xl font-bold text-brand-neutral-900 dark:text-zinc-100 flex items-center gap-2">
        <Gamepad2 className="w-5 h-5 text-brand-primary-500" />
        설정 필터 패널
      </h2>

      {/* Style Selection (Radio-style grid) */}
      <div className="space-y-2">
        <label className="text-sm font-bold text-brand-neutral-900 dark:text-zinc-100 flex items-center gap-1.5">
          <Tag className="w-4 h-4 text-brand-neutral-400" />
          국가별 스타일 선택
        </label>
        <div className="grid grid-cols-3 gap-3">
          {NICKNAME_STYLES.map((item) => {
            const isSelected = style === item.value;
            return (
              <motion.button
                key={item.value}
                type="button"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setStyle(item.value)}
                className={cn(
                  'flex items-center justify-center p-3 rounded-xl border-2 text-center transition-all duration-200 cursor-pointer',
                  isSelected
                    ? 'border-brand-primary-500 bg-brand-primary-100 text-brand-neutral-900 dark:bg-brand-primary-950/20 dark:text-brand-primary-400 font-bold shadow-sm'
                    : 'border-brand-neutral-100 dark:border-zinc-800 bg-brand-neutral-0 dark:bg-zinc-900 text-brand-neutral-400 dark:text-zinc-400 hover:border-brand-neutral-400 dark:hover:border-zinc-600 hover:text-brand-neutral-900 dark:hover:text-zinc-100'
                )}
                title={item.label}
              >
                <span className="text-2xl">{item.icon}</span>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Generate Trigger Button */}
      <motion.button
        type="button"
        whileHover={{ y: -2, boxShadow: '0 8px 16px rgba(0, 153, 255, 0.25)' }}
        whileTap={{ scale: 0.98 }}
        disabled={isGenerating}
        onClick={onGenerate}
        className={cn(
          'w-full py-4 rounded-full text-white font-extrabold flex items-center justify-center gap-2 transition-all duration-300 shadow-md cursor-pointer',
          isGenerating
            ? 'bg-brand-primary-500/60 cursor-not-allowed'
            : 'bg-brand-primary-500 hover:bg-brand-primary-600'
        )}
      >
        {isGenerating ? (
          <>
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            <span>인공지능 조합 연산 중...</span>
          </>
        ) : (
          <>
            <Sparkles className="w-5 h-5 animate-pulse" />
            <span>AI 애니 닉네임 생성</span>
          </>
        )}
      </motion.button>
    </div>
  );
}
