'use client';

import { useState, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { generateNicknames } from '../api';
import {
  GenerateRequest,
  NicknameStyle,
  NicknameItem,
  NicknameBookmark,
  NicknameHistory,
} from '../types';
import { useToast } from '@/hooks/use-toast';

const HISTORY_KEY = 'game_nickname_generator_history';
const BOOKMARKS_KEY = 'game_nickname_generator_bookmarks';

export function useNicknameGenerator() {
  const { toast } = useToast();

  // Form selections state
  const [style, setStyle] = useState<NicknameStyle>('ko');
  const [length, setLength] = useState<number>(3);

  // Automatically update active style's maximum length rules
  useEffect(() => {
    if (style === 'ko') {
      setLength(3);
    } else {
      setLength(6); // ja: Surname (2) + Given name (4) = 6
    }
  }, [style]);

  // History & Bookmarks states (with mount hydration safety)
  const [history, setHistory] = useState<NicknameHistory[]>([]);
  const [bookmarks, setBookmarks] = useState<NicknameBookmark[]>([]);
  const [isMounted, setIsMounted] = useState<boolean>(false);

  // Copy state tracker
  const [lastCopiedText, setLastCopiedText] = useState<string | null>(null);

  // Load from local storage upon mount
  useEffect(() => {
    try {
      const savedHistory = localStorage.getItem(HISTORY_KEY);
      const savedBookmarks = localStorage.getItem(BOOKMARKS_KEY);

      if (savedHistory) setHistory(JSON.parse(savedHistory));
      if (savedBookmarks) setBookmarks(JSON.parse(savedBookmarks));
    } catch (error) {
      console.error('Failed to load local storage data:', error);
    }
    setIsMounted(true);
  }, []);

  // Sync state changes to local storage
  const saveHistory = (newHistory: NicknameHistory[]) => {
    setHistory(newHistory);
    try {
      localStorage.setItem(HISTORY_KEY, JSON.stringify(newHistory));
    } catch (e) {
      console.error('Failed to write history to local storage:', e);
    }
  };

  const saveBookmarks = (newBookmarks: NicknameBookmark[]) => {
    setBookmarks(newBookmarks);
    try {
      localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(newBookmarks));
    } catch (e) {
      console.error('Failed to write bookmarks to local storage:', e);
    }
  };

  // TanStack React Query Mutation for AI generation
  const mutation = useMutation({
    mutationFn: (params: GenerateRequest) => generateNicknames(params),
    onSuccess: (data, variables) => {
      // Add results to local history
      const newHistoryItem: NicknameHistory = {
        id: crypto.randomUUID(),
        parameters: { ...variables },
        nicknames: data.nicknames,
        createdAt: new Date().toISOString(),
      };

      // Keep only top 20 items in history
      const updatedHistory = [newHistoryItem, ...history].slice(0, 20);
      saveHistory(updatedHistory);

      toast({
        title: '🎉 생성 완료!',
        description: '새로운 AI 게임 닉네임이 성공적으로 생성되었습니다.',
        className: 'border-brand-primary-500 bg-brand-primary-100 text-brand-neutral-900',
        duration: 3000,
      });
    },
    onError: (error: any) => {
      console.error('Mutation error:', error);
      toast({
        title: '⚠️ 오류 발생',
        description: 'AI 생성 과정에서 통신 지연이 발생했습니다. 다시 시도해 주세요.',
        variant: 'destructive',
      });
    },
  });

  const generate = () => {
    // Only exclude by primary text (kanji / Korean name), not phonetic pronunciation,
    // to avoid over-blocking Japanese name generation on repeated calls.
    const exclude = history.flatMap((h) =>
      h.nicknames.map((n) => n.text)
    ).filter(Boolean);
    mutation.mutate({
      style,
      length,
      exclude,
    });
  };

  // Add/remove bookmark
  const toggleBookmark = (item: NicknameItem, params?: GenerateRequest) => {
    const activeParams = params || { style, length };
    const existingIndex = bookmarks.findIndex((b) => b.text === item.text);

    if (existingIndex > -1) {
      // Remove bookmark
      const updated = bookmarks.filter((b) => b.text !== item.text);
      saveBookmarks(updated);
      toast({
        description: '북마크 목록에서 제외되었습니다.',
      });
    } else {
      // Add bookmark
      const newBookmark: NicknameBookmark = {
        id: crypto.randomUUID(),
        text: item.text,
        meaning: item.meaning,
        subText: item.subText,
        style: activeParams.style,
        createdAt: new Date().toISOString(),
      };
      saveBookmarks([newBookmark, ...bookmarks]);
      toast({
        title: '⭐ 북마크 완료',
        description: `"${item.text}"이(가) 보관함에 저장되었습니다.`,
      });
    }
  };

  const isBookmarked = (text: string) => {
    return bookmarks.some((b) => b.text === text);
  };

  // Clear history
  const clearHistory = () => {
    saveHistory([]);
    toast({
      description: '최근 생성 내역이 모두 삭제되었습니다.',
    });
  };

  // Remove single history item
  const removeHistoryItem = (id: string) => {
    saveHistory(history.filter((h) => h.id !== id));
  };

  // Copy to clipboard with success toast
  const copyToClipboard = async (text: string, onFail?: (txt: string) => void) => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
        setLastCopiedText(text);
        toast({
          title: '📋 복사 완료',
          description: `🎉 성공! "${text}"이(가) 클립보드에 복사되었습니다.`,
          className: 'bg-brand-neutral-900 text-white rounded-xl shadow-lg border-none',
        });
      } else {
        throw new Error('Clipboard API not supported or permitted');
      }
    } catch (e) {
      console.warn('Clipboard writeText failed, calling fallback', e);
      if (onFail) {
        onFail(text);
      } else {
        toast({
          title: '⚠️ 복사 실패',
          description: `자동 복사를 지원하지 않는 환경입니다. 직접 드래그해서 복사해 주세요: ${text}`,
          variant: 'destructive',
        });
      }
    }
  };

  return {
    style,
    setStyle,
    length,
    setLength,

    // Storage States
    history,
    bookmarks,
    isMounted,

    // Mutation states
    generatedNicknames: mutation.data?.nicknames || null,
    generatedStyle: mutation.variables?.style || style,
    isGenerating: mutation.isPending,
    isError: mutation.isError,
    generate,
    resetMutation: mutation.reset,

    // Actions
    toggleBookmark,
    isBookmarked,
    clearHistory,
    removeHistoryItem,
    copyToClipboard,
    lastCopiedText,
  };
}
