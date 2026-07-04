'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { NicknameBookmark, NicknameHistory, NicknameItem } from '../types';
import { NICKNAME_STYLES } from '../constants';
import { Trash2, Star, Clock, Copy, Inbox, Calendar } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';

interface HistoryListProps {
  history: NicknameHistory[];
  bookmarks: NicknameBookmark[];
  onBookmarkToggle: (item: NicknameItem, params: any) => void;
  onRemoveHistory: (id: string) => void;
  onClearHistory: () => void;
  onCopy: (text: string, onFail: (t: string) => void) => void;
  lastCopiedText: string | null;
}

export function HistoryList({
  history,
  bookmarks,
  onBookmarkToggle,
  onRemoveHistory,
  onClearHistory,
  onCopy,
  lastCopiedText,
}: HistoryListProps) {
  const [activeTab, setActiveTab] = useState<'bookmarks' | 'history'>('bookmarks');
  const [fallbackCopyText, setFallbackCopyText] = useState<string | null>(null);

  // Translate filter values to Korean labels
  const getStyleLabel = (style: string) =>
    NICKNAME_STYLES.find((s) => s.value === style)?.label || style;

  return (
    <div className="w-full bg-white dark:bg-zinc-900 rounded-2xl p-6 shadow-md border border-brand-neutral-100 dark:border-zinc-800 flex flex-col space-y-6">
      {/* Dynamic Slide Tab Buttons */}
      <div className="flex border-b border-brand-neutral-100 dark:border-zinc-800 pb-1 relative">
        <button
          type="button"
          onClick={() => setActiveTab('bookmarks')}
          className={cn(
            'flex-1 pb-3 text-sm font-bold text-center cursor-pointer transition-colors relative z-10 flex items-center justify-center gap-1.5',
            activeTab === 'bookmarks' ? 'text-brand-primary-500 font-extrabold' : 'text-brand-neutral-400 hover:text-brand-neutral-900'
          )}
        >
          <Star className="w-4 h-4" />
          <span>보관함 ({bookmarks.length})</span>
          {activeTab === 'bookmarks' && (
            <motion.div
              layoutId="activeTabUnderline"
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-primary-500"
            />
          )}
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('history')}
          className={cn(
            'flex-1 pb-3 text-sm font-bold text-center cursor-pointer transition-colors relative z-10 flex items-center justify-center gap-1.5',
            activeTab === 'history' ? 'text-brand-primary-500 font-extrabold' : 'text-brand-neutral-400 hover:text-brand-neutral-900'
          )}
        >
          <Clock className="w-4 h-4" />
          <span>생성 이력 ({history.length})</span>
          {activeTab === 'history' && (
            <motion.div
              layoutId="activeTabUnderline"
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-primary-500"
            />
          )}
        </button>
      </div>

      {/* Tab Panels */}
      <div className="flex-1 overflow-y-auto max-h-[500px] pr-1 scrollbar-thin">
        <AnimatePresence mode="wait">
          {/* Tab 1: Bookmarks Panel */}
          {activeTab === 'bookmarks' && (
            <motion.div
              key="bookmarks-panel"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-3"
            >
              {bookmarks.length === 0 ? (
                <div className="py-12 flex flex-col items-center justify-center text-center space-y-3 text-brand-neutral-400">
                  <Inbox className="w-12 h-12 stroke-[1.5]" />
                  <div className="space-y-1">
                    <p className="font-bold text-brand-neutral-900 dark:text-zinc-200 text-sm">보관함이 비어있습니다</p>
                    <p className="text-xs">마음에 드는 닉네임 옆의 별 아이콘을 눌러보세요.</p>
                  </div>
                </div>
              ) : (
                bookmarks.map((bm) => {
                  const copied = lastCopiedText === bm.text;
                  return (
                    <motion.div
                      key={bm.id}
                      layout
                      className={cn(
                        'p-4 bg-brand-neutral-100/50 dark:bg-zinc-800/40 hover:bg-brand-primary-100/30 rounded-xl flex items-center justify-between border border-transparent transition-all cursor-pointer group',
                        copied && 'border-brand-primary-500/30 bg-brand-primary-100/20'
                      )}
                      onClick={() => onCopy(bm.text, (t) => setFallbackCopyText(t))}
                    >
                      <div className="space-y-1.5 flex-1 pr-4">
                        <div className="flex items-baseline gap-2 flex-wrap">
                          {bm.style !== 'ko' && bm.subText ? (
                            <>
                              <span className="text-sm font-extrabold text-brand-neutral-900 dark:text-zinc-100">
                                {bm.subText}
                              </span>
                              <span className="text-xs font-semibold text-brand-neutral-400">
                                ({bm.text})
                              </span>
                            </>
                          ) : (
                            <>
                              <span className="text-sm font-extrabold text-brand-neutral-900 dark:text-zinc-100">
                                {bm.text}
                              </span>
                              {bm.subText && (
                                <span className="text-xs font-semibold text-brand-neutral-400">
                                  ({bm.subText})
                                </span>
                              )}
                            </>
                          )}
                          <span className="text-[10px] bg-brand-neutral-100 dark:bg-zinc-800 border border-brand-neutral-200 dark:border-zinc-700 text-brand-neutral-400 px-1.5 py-0.5 rounded-md font-semibold ml-2">
                            {getStyleLabel(bm.style)}
                          </span>
                        </div>
                        <p className="text-[11px] text-brand-neutral-400 font-medium leading-relaxed">
                          {bm.meaning}
                        </p>
                      </div>

                      <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                        <button
                          type="button"
                          onClick={() =>
                            onBookmarkToggle(
                              { text: bm.text, meaning: bm.meaning, subText: bm.subText },
                              { style: bm.style, length: bm.text.length }
                            )
                          }
                          className="p-1.5 rounded-lg hover:bg-brand-neutral-200/60 dark:hover:bg-zinc-800 text-brand-neutral-400 hover:text-red-500 transition-colors cursor-pointer"
                          aria-label="북마크 제거"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </motion.div>
                  );
                })
              )}
            </motion.div>
          )}

          {/* Tab 2: Recent History Panel */}
          {activeTab === 'history' && (
            <motion.div
              key="history-panel"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-4"
            >
              {history.length === 0 ? (
                <div className="py-12 flex flex-col items-center justify-center text-center space-y-3 text-brand-neutral-400">
                  <Calendar className="w-12 h-12 stroke-[1.5]" />
                  <div className="space-y-1">
                    <p className="font-bold text-brand-neutral-900 dark:text-zinc-200 text-sm">최근 이력이 존재하지 않습니다</p>
                    <p className="text-xs">원하는 키워드를 조합하여 닉네임을 생성해 보세요.</p>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex justify-end pb-1 border-b border-brand-neutral-100/50 dark:border-zinc-800">
                    <button
                      type="button"
                      onClick={onClearHistory}
                      className="text-xs text-brand-neutral-400 hover:text-red-500 font-bold flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      전체 삭제
                    </button>
                  </div>

                  <div className="space-y-4">
                    {history.map((hist) => (
                      <motion.div
                        key={hist.id}
                        layout
                        className="p-4 bg-brand-neutral-100/30 dark:bg-zinc-800/20 border border-brand-neutral-100/60 dark:border-zinc-800 rounded-xl space-y-3"
                      >
                        {/* History Header */}
                        <div className="flex justify-between items-start gap-4">
                          <div className="space-y-0.5">
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <span className="text-xs font-bold text-brand-neutral-900 dark:text-zinc-200">
                                {getStyleLabel(hist.parameters.style)} · {hist.parameters.length}자
                              </span>
                            </div>
                            <span className="text-[10px] text-brand-neutral-400 block">
                              {formatDistanceToNow(new Date(hist.createdAt), {
                                addSuffix: true,
                                locale: ko,
                              })}
                            </span>
                          </div>

                          <button
                            type="button"
                            onClick={() => onRemoveHistory(hist.id)}
                            className="p-1 rounded-lg hover:bg-brand-neutral-200/60 dark:hover:bg-zinc-800 text-brand-neutral-400 hover:text-red-500 cursor-pointer transition-colors"
                            aria-label="이력 개별 제거"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* History Nicknames list in batch */}
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {hist.nicknames.map((item, idx) => {
                            const copied = lastCopiedText === item.text;
                            return (
                              <button
                                key={`${item.text}-${idx}`}
                                type="button"
                                onClick={() => onCopy(item.text, (t) => setFallbackCopyText(t))}
                                className={cn(
                                  'px-2.5 py-1 rounded-lg text-xs font-semibold border flex items-center gap-1 transition-all duration-200 cursor-pointer',
                                  copied
                                    ? 'bg-brand-primary-500 border-brand-primary-500 text-white shadow-sm font-extrabold'
                                    : 'bg-white dark:bg-zinc-800 border-brand-neutral-100 dark:border-zinc-700 text-brand-neutral-900 dark:text-zinc-100 hover:border-brand-primary-500 hover:text-brand-primary-500'
                                )}
                                title={
                                  hist.parameters.style !== 'ko' && item.subText
                                    ? `${item.subText} (${item.text}) - ${item.meaning}`
                                    : `${item.text}${item.subText ? ` (${item.subText})` : ''} - ${item.meaning}`
                                }
                              >
                                <span>
                                  {hist.parameters.style !== 'ko' && item.subText ? (
                                    <>
                                      {item.subText} ({item.text})
                                    </>
                                  ) : (
                                    <>
                                      {item.text}
                                      {item.subText ? ` (${item.subText})` : ''}
                                    </>
                                  )}
                                </span>
                                <Copy className="w-2.5 h-2.5 opacity-60" />
                              </button>
                            );
                          })}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Manual fallback Copy Modal */}
      <AnimatePresence>
        {fallbackCopyText && (
          <div className="fixed inset-0 bg-brand-neutral-900/60 dark:bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-sm bg-white dark:bg-zinc-900 rounded-2xl p-6 shadow-xl space-y-4 border border-brand-neutral-100 dark:border-zinc-800"
            >
              <div className="flex flex-col items-center text-center space-y-2">
                <div className="p-3 bg-brand-primary-100 dark:bg-brand-primary-900/20 rounded-full text-brand-primary-500">
                  <Copy className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-brand-neutral-900 dark:text-zinc-200">
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
                className="w-full p-3 bg-brand-neutral-100 dark:bg-zinc-800 border border-brand-neutral-200 dark:border-zinc-700 rounded-xl text-center font-extrabold text-brand-neutral-900 dark:text-zinc-100 focus:outline-none"
              />

              <button
                type="button"
                onClick={() => setFallbackCopyText(null)}
                className="w-full py-2.5 rounded-full bg-brand-neutral-900 dark:bg-zinc-800 text-white font-bold text-sm hover:bg-brand-neutral-800 dark:hover:bg-zinc-700 transition-all cursor-pointer"
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
