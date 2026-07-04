'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { NicknameItem, NicknameStyle } from '../types';
import { SEARCH_GAMES } from '../constants';
import {
  Star,
  Copy,
  Check,
  ExternalLink,
  AlertCircle,
  RefreshCw,
  Lightbulb,
  Gamepad,
} from 'lucide-react';

interface ResultDisplayProps {
  generatedNicknames: NicknameItem[] | null;
  isGenerating: boolean;
  isError: boolean;
  onRetry: () => void;
  onBookmarkToggle: (item: NicknameItem) => void;
  isBookmarked: (text: string) => boolean;
  onCopy: (text: string, onFail: (t: string) => void) => void;
  lastCopiedText: string | null;
  selectedStyle: NicknameStyle;
}

export function ResultDisplay({
  generatedNicknames,
  isGenerating,
  isError,
  onRetry,
  onBookmarkToggle,
  isBookmarked,
  onCopy,
  lastCopiedText,
  selectedStyle,
}: ResultDisplayProps) {
  // Safe UI fallback copy helper
  const [fallbackCopyText, setFallbackCopyText] = useState<string | null>(null);

  // Trigger fallback manually copy UI
  const handleCopyFail = (text: string) => {
    setFallbackCopyText(text);
  };

  return (
    <div className="w-full flex-1 flex flex-col space-y-6">
      <AnimatePresence mode="wait">
        {/* State A: Loading Skeleton */}
        {isGenerating && (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="w-full p-5 bg-white border border-brand-neutral-100 rounded-2xl animate-pulse space-y-3"
              >
                <div className="h-5 w-1/3 bg-brand-neutral-100 rounded-md" />
                <div className="h-4 w-3/4 bg-brand-neutral-100/60 rounded-md" />
                <div className="flex gap-2 pt-2">
                  <div className="h-6 w-12 bg-brand-neutral-100/40 rounded-full" />
                  <div className="h-6 w-12 bg-brand-neutral-100/40 rounded-full" />
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {/* State B: Error Screen */}
        {!isGenerating && isError && (
          <motion.div
            key="error"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="w-full py-16 px-6 bg-red-50/50 border border-red-100 rounded-2xl flex flex-col items-center justify-center text-center space-y-4"
          >
            <div className="p-3 bg-red-100 rounded-full text-red-500">
              <AlertCircle className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-brand-neutral-900">
                AI 서버와의 통신이 원활하지 않습니다
              </h3>
              <p className="text-sm text-brand-neutral-400 max-w-md">
                네트워크 요청 지연이 발생했거나 일시적으로 서버 응답을 가져올 수 없습니다. 아래 다시 시도하기 단추를 눌러주세요.
              </p>
            </div>
            <button
              onClick={onRetry}
              className="px-6 py-2.5 rounded-full bg-red-500 hover:bg-red-600 text-white font-bold text-sm shadow-md transition-all duration-200 cursor-pointer flex items-center gap-1.5"
            >
              <RefreshCw className="w-4 h-4" />
              다시 시도하기
            </button>
          </motion.div>
        )}

        {/* State C: Empty/Initial Screen */}
        {!isGenerating && !isError && generatedNicknames === null && (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full bg-white border border-brand-neutral-100 rounded-2xl overflow-hidden shadow-sm flex flex-col"
          >
            <div className="h-48 md:h-64 relative w-full bg-brand-neutral-900">
              <div className="absolute inset-0 bg-gradient-to-t from-brand-neutral-900 via-brand-neutral-900/60 to-transparent z-10" />
              <img
                src="/hero-banner.png"
                alt="애니메이션 캐릭터 닉네임 생성기"
                className="w-full h-full object-cover opacity-60"
              />
              <div className="absolute bottom-4 left-6 z-20 flex items-center gap-2">
                <span className="p-2 bg-brand-primary-500 rounded-xl text-white">
                  <Gamepad className="w-5 h-5" />
                </span>
                <span className="text-white text-sm font-bold tracking-wide">
                  준비 완료
                </span>
              </div>
            </div>
            <div className="p-6 md:p-8 text-center space-y-2">
              <h3 className="text-lg font-bold text-brand-neutral-900">
                원하는 조건을 선택한 후 생성 버튼을 눌러주세요!
              </h3>
              <p className="text-sm text-brand-neutral-400 max-w-sm mx-auto">
                한국식 또는 일본식 애니메이션 분위기를 선택하여 내 마음에 쏙 드는 캐릭터 이름을 얻을 수 있습니다.
              </p>
            </div>

          </motion.div>
        )}

        {/* State D: Results Display Grid */}
        {!isGenerating && !isError && generatedNicknames !== null && (
          <motion.div
            key="results"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-4"
          >
            <div className="flex justify-between items-center px-1">
              <span className="text-xs text-brand-neutral-400 font-bold flex items-center gap-1">
                <Lightbulb className="w-3.5 h-3.5 text-brand-primary-500" />
                💡 카드를 클릭하면 클립보드로 즉시 복사됩니다!
              </span>
              <span className="text-xs text-brand-neutral-400 font-bold">
                총 {generatedNicknames.length}개 추천됨
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {generatedNicknames.map((item, idx) => {
                const bookmarked = isBookmarked(item.text);
                const copied = lastCopiedText === item.text;
                return (
                  <motion.div
                    key={`${item.text}-${idx}`}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25, delay: idx * 0.04, ease: 'easeOut' }}
                    className={cn(
                      'group relative p-5 bg-white border rounded-2xl cursor-pointer flex flex-col justify-between',
                      'will-change-transform transition-[transform,box-shadow] duration-150 ease-out',
                      'hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)]',
                      'active:scale-[0.98] active:translate-y-0',
                      copied
                        ? 'border-brand-primary-500 shadow-sm'
                        : 'border-brand-neutral-100'
                    )}
                    onClick={() => onCopy(item.text, handleCopyFail)}
                  >
                    <div className="space-y-2">
                      {/* Name Header & Copy/Bookmark triggers */}
                      <div className="flex justify-between items-start gap-4">
                        <h4 className="text-lg font-extrabold text-brand-neutral-900 group-hover:text-brand-primary-500 transition-colors flex items-baseline gap-1.5 flex-wrap">
                          {selectedStyle !== 'ko' && item.subText ? (
                            <>
                              <span>{item.subText}</span>
                              <span className="text-xs font-semibold text-brand-neutral-400">
                                ({item.text})
                              </span>
                            </>
                          ) : (
                            <>
                              <span>{item.text}</span>
                              {item.subText && (
                                <span className="text-xs font-semibold text-brand-neutral-400">
                                  ({item.subText})
                                </span>
                              )}
                            </>
                          )}
                        </h4>
                        
                        <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                          {/* Bookmark Star button */}
                          <button
                            type="button"
                            onClick={() => onBookmarkToggle(item)}
                            className={cn(
                              'p-1.5 rounded-lg border transition-all duration-200 cursor-pointer',
                              bookmarked
                                ? 'border-amber-300 bg-amber-50 text-amber-500'
                                : 'border-brand-neutral-100 hover:border-amber-400 hover:text-amber-500 text-brand-neutral-400'
                            )}
                            aria-label="북마크 토글"
                          >
                            <Star className="w-4 h-4" fill={bookmarked ? 'currentColor' : 'none'} />
                          </button>
                        </div>
                      </div>

                      {/* Explanation meaning */}
                      <p className="text-xs text-brand-neutral-400 leading-relaxed font-medium">
                        {item.meaning}
                      </p>
                    </div>

                    {/* Game search links list */}
                    <div
                      className="flex items-center gap-2 pt-4 mt-2 border-t border-brand-neutral-50/50 justify-between"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="flex gap-1">
                        {SEARCH_GAMES.map((game) => (
                          <a
                            key={game.id}
                            href={game.urlTemplate.replace('{nickname}', encodeURIComponent(item.text))}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 px-2.5 py-1 text-[10px] font-bold bg-brand-neutral-100 hover:bg-brand-primary-100 hover:text-brand-primary-600 rounded-lg text-brand-neutral-400 transition-colors"
                          >
                            <span>{game.logo}</span>
                            <span>{game.id === 'lol' ? '롤검색' : game.id === 'maple' ? '메이플' : '로아'}</span>
                            <ExternalLink className="w-2.5 h-2.5" />
                          </a>
                        ))}
                      </div>
                      
                      <div className="text-brand-neutral-400 group-hover:text-brand-primary-500 transition-colors">
                        {copied ? (
                          <span className="flex items-center gap-1 text-[11px] font-bold text-brand-primary-500">
                            <Check className="w-3.5 h-3.5" />
                            복사됨
                          </span>
                        ) : (
                          <Copy className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Fallback Manual Copy Modal Popup */}
      <AnimatePresence>
        {fallbackCopyText && (
          <div className="fixed inset-0 bg-brand-neutral-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-sm bg-white rounded-2xl p-6 shadow-xl space-y-4 border border-brand-neutral-100"
            >
              <div className="flex flex-col items-center text-center space-y-2">
                <div className="p-3 bg-brand-primary-100 rounded-full text-brand-primary-500">
                  <Copy className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-brand-neutral-900">
                  수동 복사 안내
                </h3>
                <p className="text-xs text-brand-neutral-400">
                  자동 복사가 지원되지 않는 웹뷰 환경입니다. 아래 텍스트 입력창을 길게 터치하여 직접 복사해주세요.
                </p>
              </div>

              <input
                type="text"
                readOnly
                value={fallbackCopyText}
                onClick={(e) => (e.target as HTMLInputElement).select()}
                className="w-full p-3 bg-brand-neutral-100 border border-brand-neutral-200 rounded-xl text-center font-extrabold text-brand-neutral-900 focus:outline-none"
              />

              <button
                type="button"
                onClick={() => setFallbackCopyText(null)}
                className="w-full py-2.5 rounded-full bg-brand-neutral-900 text-white font-bold text-sm hover:bg-brand-neutral-800 transition-all cursor-pointer"
              >
                닫기
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
