'use client';

import React, { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { useNicknameGenerator } from '@/features/nickname/hooks/useNicknameGenerator';
import { GeneratorForm } from '@/features/nickname/components/GeneratorForm';
import { ResultDisplay } from '@/features/nickname/components/ResultDisplay';
import { HistoryList } from '@/features/nickname/components/HistoryList';
import { Sun, Moon, HelpCircle, X, Gamepad2, Heart, Lightbulb, Award, Info, ShieldAlert } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export default function Home() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [showGuide, setShowGuide] = useState(false);

  // Initialize hook states
  const {
    style,
    setStyle,
    length,
    setLength,
    history,
    bookmarks,
    isMounted,
    generatedNicknames,
    generatedStyle,
    isGenerating,
    isError,
    generate,
    resetMutation,
    toggleBookmark,
    isBookmarked,
    clearHistory,
    removeHistoryItem,
    copyToClipboard,
    lastCopiedText,
  } = useNicknameGenerator();

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen flex flex-col font-sans bg-brand-neutral-100 dark:bg-zinc-950 text-brand-neutral-900 dark:text-zinc-100 transition-colors duration-200">
      {/* 1. Navigation Topbar */}
      <header className="sticky top-0 z-40 w-full border-b border-brand-neutral-100/80 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md transition-colors">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <span className="p-2 rounded-xl bg-brand-primary-500 text-white shadow-md shadow-brand-primary-500/20 group-hover:scale-105 transition-transform">
              <Gamepad2 className="w-5 h-5" />
            </span>
            <span className="font-extrabold text-lg tracking-tight text-brand-neutral-900 dark:text-zinc-100">
              닉네임<span className="text-brand-primary-500">.AI</span>
            </span>
          </Link>

          <div className="flex items-center gap-2">
            {/* Service Guide Button */}
            <button
              onClick={() => setShowGuide(true)}
              className="p-2 rounded-xl border border-brand-neutral-100 dark:border-zinc-800 hover:bg-brand-neutral-100 dark:hover:bg-zinc-800 text-brand-neutral-400 hover:text-brand-neutral-900 dark:hover:text-zinc-100 transition-all cursor-pointer flex items-center gap-1 text-xs font-bold"
              aria-label="서비스 정보 가이드"
            >
              <HelpCircle className="w-4 h-4" />
              <span className="hidden sm:inline">이용 안내</span>
            </button>

            {/* Dark Mode Toggle */}
            {mounted && (
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="p-2 rounded-xl border border-brand-neutral-100 dark:border-zinc-800 hover:bg-brand-neutral-100 dark:hover:bg-zinc-800 text-brand-neutral-400 hover:text-brand-neutral-900 dark:hover:text-zinc-100 transition-all cursor-pointer"
                aria-label="화면 테마 변경"
              >
                {theme === 'dark' ? <Sun className="w-4.5 h-4.5" /> : <Moon className="w-4.5 h-4.5" />}
              </button>
            )}
          </div>
        </div>
      </header>

      {/* 2. Main Container Layout */}
      <main className="flex-1 max-w-6xl w-full mx-auto p-4 md:p-6 space-y-6">

        {/* 12-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column (4 Rails): Controls Form */}
          <div className="lg:col-span-4 space-y-6">
            <GeneratorForm
              style={style}
              setStyle={setStyle}
              length={length}
              setLength={setLength}
              onGenerate={() => {
                generate();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              isGenerating={isGenerating}
            />
          </div>

          {/* Right Column (8 Rails): Output & History lists */}
          <div className="lg:col-span-8 space-y-6 flex flex-col">
            {/* AI Generator Output Grid */}
            <ResultDisplay
              generatedNicknames={generatedNicknames}
              isGenerating={isGenerating}
              isError={isError}
              onRetry={generate}
              onBookmarkToggle={toggleBookmark}
              isBookmarked={isBookmarked}
              onCopy={copyToClipboard}
              lastCopiedText={lastCopiedText}
              selectedStyle={generatedStyle}
            />

            {/* Bookmarks storage & Recent history list */}
            {isMounted && (
              <HistoryList
                history={history}
                bookmarks={bookmarks}
                onBookmarkToggle={toggleBookmark}
                onRemoveHistory={removeHistoryItem}
                onClearHistory={clearHistory}
                onCopy={copyToClipboard}
                lastCopiedText={lastCopiedText}
              />
            )}
          </div>
        </div>
      </main>

      {/* 3. Global Footer */}
      <footer className="w-full border-t border-brand-neutral-100/80 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 transition-colors py-6 mt-12">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-brand-neutral-400 font-bold">
          <div className="flex items-center gap-4">
            <Link href="/terms" className="hover:text-brand-primary-500 transition-colors">
              이용약관
            </Link>
            <Link href="/privacy" className="hover:text-brand-primary-500 transition-colors">
              개인정보처리방침
            </Link>
          </div>
          <div className="flex items-center gap-1.5">
            <span>© 2026 닉네임.AI. All rights reserved.</span>
            <span className="flex items-center gap-0.5 text-red-500">
              <Heart className="w-3 h-3 fill-current" />
            </span>
            <span>for Gamers.</span>
          </div>
        </div>
      </footer>

      {/* 4. Service Guide Modal Dialog Overlay */}
      <AnimatePresence>
        {showGuide && (
          <div className="fixed inset-0 bg-brand-neutral-900/60 dark:bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-lg bg-white dark:bg-zinc-900 rounded-2xl p-6 md:p-8 shadow-2xl space-y-6 border border-brand-neutral-100 dark:border-zinc-800"
            >
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                  <span className="p-1.5 rounded-lg bg-brand-primary-100 dark:bg-brand-primary-900/20 text-brand-primary-500 dark:text-brand-primary-400">
                    <Gamepad2 className="w-5 h-5" />
                  </span>
                  <h3 className="text-lg font-extrabold text-brand-neutral-900 dark:text-zinc-100">
                    서비스 이용 안내 가이드
                  </h3>
                </div>
                <button
                  onClick={() => setShowGuide(false)}
                  className="p-1.5 rounded-lg hover:bg-brand-neutral-100 dark:hover:bg-zinc-800 text-brand-neutral-400 hover:text-brand-neutral-900 dark:hover:text-zinc-100 cursor-pointer transition-all"
                  aria-label="이용 안내 닫기"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-6 text-sm leading-relaxed text-brand-neutral-400 font-medium max-h-[400px] overflow-y-auto pr-1.5 scrollbar-thin">
                {/* 1. Q&A Section */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <h4 className="font-extrabold text-brand-neutral-900 dark:text-zinc-200">
                      Q. 어떻게 사용하나요?
                    </h4>
                    <p className="text-xs">
                      좌측 설정 필터 패널에서 원하는 닉네임의 스타일(한글, 영어, 일본어), 글자수 제한, 그리고 장르와 분위기를 선택한 후 <strong>AI 닉네임 생성하기</strong> 단추를 눌러주세요. 인공지능이 조건에 최적화된 고유 닉네임 8개를 연산하여 의미 해석과 함께 반환합니다.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-extrabold text-brand-neutral-900 dark:text-zinc-200">
                      Q. 클립보드 복사는 어떻게 되나요?
                    </h4>
                    <p className="text-xs">
                      생성 완료된 결과 리스트에서 원하는 닉네임 카드를 클릭하시면 디바이스 클립보드에 실시간 복사되며, 안내 토스트 알림창이 뜹니다. 보안 제한으로 자동 복사가 실행되지 않을 경우, 자동으로 길게 누르는 수동 복사 팝업창을 띄워드립니다.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-extrabold text-brand-neutral-900 dark:text-zinc-200">
                      Q. 보관함과 생성 이력의 보관 기간은요?
                    </h4>
                    <p className="text-xs">
                      로그인 없이 사용할 수 있도록 사용자 브라우저의 <strong>LocalStorage</strong>에 즉시 백업 저장됩니다. 웹 브라우저의 데이터를 삭제하지 않는 한 동일 브라우저에서 반영구적으로 기록을 조회할 수 있습니다.
                    </p>
                  </div>
                </div>

                <div className="border-t border-brand-neutral-100 dark:border-zinc-800 my-2" />

                {/* 2. 꿀팁 Section */}
                <div className="space-y-4">
                  <h4 className="font-extrabold text-brand-neutral-900 dark:text-zinc-200 flex items-center gap-2">
                    <Lightbulb className="w-4 h-4 text-brand-primary-500 animate-pulse" />
                    센스 있는 작명 꿀팁
                  </h4>

                  <div className="grid grid-cols-1 gap-3">
                    <div className="p-3 bg-brand-neutral-50 dark:bg-zinc-800/40 rounded-xl space-y-1">
                      <div className="flex items-center gap-1.5 text-brand-primary-600 dark:text-brand-primary-400 font-bold text-xs">
                        <Award className="w-3.5 h-3.5" />
                        <span>1. 부르기 쉽고 직관적인 길이</span>
                      </div>
                      <p className="text-[11px] text-brand-neutral-400 dark:text-zinc-400 leading-normal">
                        인게임 브리핑이 편리하도록 2자에서 6자 사이의 발음하기 편한 글자 수를 적극 추천합니다.
                      </p>
                    </div>

                    <div className="p-3 bg-brand-neutral-50 dark:bg-zinc-800/40 rounded-xl space-y-1">
                      <div className="flex items-center gap-1.5 text-brand-primary-600 dark:text-brand-primary-400 font-bold text-xs">
                        <Info className="w-3.5 h-3.5" />
                        <span>2. 스타일별 정서 매칭</span>
                      </div>
                      <p className="text-[11px] text-brand-neutral-400 dark:text-zinc-400 leading-normal">
                        한국식은 위트 넘치는 단어 유희, 영어식은 세련된 합성어, 일본식은 낭만적인 서브컬처 감성의 독음이 좋습니다.
                      </p>
                    </div>

                    <div className="p-3 bg-brand-neutral-50 dark:bg-zinc-800/40 rounded-xl space-y-1">
                      <div className="flex items-center gap-1.5 text-brand-primary-600 dark:text-brand-primary-400 font-bold text-xs">
                        <ShieldAlert className="w-3.5 h-3.5" />
                        <span>3. 금칙어 및 불쾌감 차단</span>
                      </div>
                      <p className="text-[11px] text-brand-neutral-400 dark:text-zinc-400 leading-normal">
                        정지 처분을 차단하기 위해 타인에게 불쾌감을 주는 비속어나 혐오 표현은 피해야 합니다.
                      </p>
                    </div>

                    <div className="p-3 bg-brand-neutral-50 dark:bg-zinc-800/40 rounded-xl space-y-1">
                      <div className="flex items-center gap-1.5 text-brand-primary-600 dark:text-brand-primary-400 font-bold text-xs">
                        <Award className="w-3.5 h-3.5" />
                        <span>4. 중복 여부 확인</span>
                      </div>
                      <p className="text-[11px] text-brand-neutral-400 dark:text-zinc-400 leading-normal">
                        결과 카드 하단의 게임별(롤, 메이플, 로아) 단추로 외부 전적 검색창에 접속해 중복 사용 여부를 즉시 조회하세요.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowGuide(false)}
                className="w-full py-3 rounded-full bg-brand-primary-500 hover:bg-brand-primary-600 text-white font-extrabold text-sm shadow-md transition-all cursor-pointer"
              >
                가이드 닫기
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
