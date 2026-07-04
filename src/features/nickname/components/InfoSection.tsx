'use client';

import React from 'react';
import { Lightbulb, Info, ShieldAlert, Award } from 'lucide-react';

export function InfoSection() {
  return (
    <div className="w-full bg-white dark:bg-zinc-900 rounded-2xl p-6 shadow-md border border-brand-neutral-100 dark:border-zinc-800 space-y-6">
      <h2 className="text-xl font-bold text-brand-neutral-900 dark:text-zinc-100 flex items-center gap-2">
        <Lightbulb className="w-5 h-5 text-brand-primary-500 animate-pulse" />
        센스 있는 닉네임 작명 꿀팁
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Tip 1 */}
        <div className="p-4 bg-brand-neutral-100/50 dark:bg-zinc-800/40 rounded-xl space-y-2">
          <div className="flex items-center gap-2 text-brand-primary-600 dark:text-brand-primary-400 font-bold text-sm">
            <Award className="w-4 h-4" />
            <span>1. 부르기 쉽고 직관적인 길이</span>
          </div>
          <p className="text-xs text-brand-neutral-400 dark:text-zinc-400 font-medium leading-relaxed">
            인게임에서 아군이 브리핑하거나 소리 내어 부르기 편리하도록 **2자에서 6자 사이**의 글자 수를 적극 추천합니다. 발음이 간결할수록 타인에게 더 잘 기억됩니다.
          </p>
        </div>

        {/* Tip 2 */}
        <div className="p-4 bg-brand-neutral-100/50 dark:bg-zinc-800/40 rounded-xl space-y-2">
          <div className="flex items-center gap-2 text-brand-primary-600 dark:text-brand-primary-400 font-bold text-sm">
            <Info className="w-4 h-4" />
            <span>2. 스타일별 정서 매칭</span>
          </div>
          <p className="text-xs text-brand-neutral-400 dark:text-zinc-400 font-medium leading-relaxed">
            * **한국식**: 위트 넘치는 단어 유희나 동화적인 예쁜 명사 조합.<br />
            * **영어식**: 영단어 합성어로 구성된 세련되고 글로벌한 텍스트.<br />
            * **일본식**: 낭만적이고 신비로운 서브컬처 감성의 발음 표현.
          </p>
        </div>

        {/* Tip 3 */}
        <div className="p-4 bg-brand-neutral-100/50 dark:bg-zinc-800/40 rounded-xl space-y-2">
          <div className="flex items-center gap-2 text-brand-primary-600 dark:text-brand-primary-400 font-bold text-sm">
            <ShieldAlert className="w-4 h-4" />
            <span>3. 금칙어 및 불쾌감 차단</span>
          </div>
          <p className="text-xs text-brand-neutral-400 dark:text-zinc-400 font-medium leading-relaxed">
            타인에게 불쾌감을 주는 비속어, 정치적 논란, 혐오 표현을 피해야 정지 처분 없이 영구적으로 계정을 유지할 수 있습니다. 저희 AI는 사전에 2중 필터링을 거쳐 안심하고 사용할 수 있습니다.
          </p>
        </div>

        {/* Tip 4 */}
        <div className="p-4 bg-brand-neutral-100/50 dark:bg-zinc-800/40 rounded-xl space-y-2">
          <div className="flex items-center gap-2 text-brand-primary-600 dark:text-brand-primary-400 font-bold text-sm">
            <Award className="w-4 h-4" />
            <span>4. 중복 여부 확인</span>
          </div>
          <p className="text-xs text-brand-neutral-400 dark:text-zinc-400 font-medium leading-relaxed">
            생성된 결과 카드 하단의 게임별 검색 단추(롤, 메이플, 로아)를 클릭하면, 외부 전적 전투정보실 페이지로 바로 연결되어 현재 사용 중인 유저가 있는지 중복 상태를 즉시 확인할 수 있습니다.
          </p>
        </div>
      </div>
    </div>
  );
}
