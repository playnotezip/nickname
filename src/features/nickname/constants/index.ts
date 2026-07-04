import { NicknameStyle, NicknameItem } from '../types';

export const NICKNAME_STYLES: { value: NicknameStyle; label: string; icon: string }[] = [
  { value: 'ko', label: '한국식', icon: '🇰🇷' },
  { value: 'ja', label: '일어식', icon: '🇯🇵' },
];

export interface SearchGame {
  id: string;
  name: string;
  urlTemplate: string;
  logo: string;
}

export const SEARCH_GAMES: SearchGame[] = [
  {
    id: 'lol',
    name: '리그 오브 레전드',
    urlTemplate: 'https://www.op.gg/summoners/kr/{nickname}',
    logo: '🎮',
  },
  {
    id: 'maple',
    name: '메이플스토리',
    urlTemplate: 'https://maple.gg/search?q={nickname}',
    logo: '🍁',
  },
  {
    id: 'lostark',
    name: '로스트아크',
    urlTemplate: 'https://loawa.com/char/{nickname}',
    logo: '🛡️',
  },
];

// ──────────────────────────────────────────────────────
// Korean style pools (무한 조합 가능)
// ──────────────────────────────────────────────────────
const koPrefixes = [
  '하', '아', '나', '다', '가', '새', '한', '은', '라', '시',
  '마', '람', '소', '이', '유', '도', '로', '사', '바', '자',
  '오', '우', '미', '비', '리', '기', '여', '수', '루', '누',
];
const koSuffixes2 = [
  '람', '온', '래', '울', '론', '빛', '찬', '율', '윤', '우',
  '진', '아', '현', '솔', '린', '나', '름', '인', '준', '은',
  '서', '연', '경', '윤', '빈', '민', '율', '루', '도', '비',
];
const koSuffixes3 = [
  '람온', '래울', '론빛', '찬율', '윤우', '진아', '현오', '희경',
  '이슬', '아라', '솔비', '린아', '나온', '름빛', '인솔', '준서',
  '은별', '서연', '경민', '윤서', '빈나', '민율', '율서', '루나',
  '도린', '비온', '현아', '솔아', '린솔', '나린',
];

const koMeanings = [
  '맑은 하늘을 닮은 청아한 기운으로 세상을 밝히는 영웅',
  '깊은 산속 새벽빛처럼 고요하고 강인한 의지를 지닌 전사',
  '봄날 바람처럼 부드럽지만 흔들리지 않는 신념의 소유자',
  '별빛을 모아 만든 이름처럼 특별한 운명을 타고난 존재',
  '깊은 강물처럼 조용하지만 누구도 막을 수 없는 힘을 가진 자',
  '새벽이슬처럼 순수하고 투명한 마음을 지닌 순백의 수호자',
  '빛과 어둠의 경계에서 균형을 잡는 조화로운 심판자',
  '폭풍의 눈처럼 고요한 중심으로 모든 혼란을 다스리는 지도자',
  '은하수처럼 끝없이 펼쳐진 가능성을 품은 자유로운 탐험가',
  '불꽃처럼 타오르는 열정과 얼음처럼 냉철한 판단력의 소유자',
];

// ──────────────────────────────────────────────────────
// Japanese style pools (무한 조합 가능 - 오리지널 이름만)
// ──────────────────────────────────────────────────────
// Prefix: [한자, 한국발음]
const jaPrefixPairs: [string, string][] = [
  ['黒', '쿠로'], ['白', '시로'], ['蒼', '아오'], ['紅', '쿠레나이'],
  ['風', '카제'], ['雷', '라이'], ['氷', '코오리'], ['炎', '호노오'],
  ['影', '카게'], ['月', '츠키'], ['星', '호시'], ['霧', '키리'],
  ['龍', '류우'], ['鳳', '호우'], ['狼', '오오카미'], ['鷹', '타카'],
  ['雪', '유키'], ['花', '하나'], ['桜', '사쿠라'], ['嵐', '아라시'],
  ['鉄', '테츠'], ['金', '킨'], ['銀', '긴'], ['翼', '츠바사'],
  ['空', '소라'], ['海', '우미'], ['山', '야마'], ['川', '카와'],
  ['暁', '아카츠키'], ['夜', '요루'], ['朝', '아사'], ['霞', '카스미'],
  ['天', '텐'], ['地', '치'], ['水', '미즈'], ['火', '카'],
];

// Suffix: [한자, 한국발음]
const jaSuffixPairs: [string, string][] = [
  ['狼', '로우'], ['牙', '키바'], ['刃', '하'], ['鋭', '에이'],
  ['鋼', '하가네'], ['翼', '요쿠'], ['蒼', '소우'], ['零', '레이'],
  ['煌', '코우'], ['凛', '린'], ['哉', '야'], ['真', '신'],
  ['蓮', '렌'], ['嵐', '란'], ['輝', '키'], ['颯', '소우'],
  ['碧', '헤키'], ['魁', '카이'], ['瑛', '에이'], ['玲', '레이'],
  ['朔', '사쿠'], ['悠', '유우'], ['迅', '진'], ['烈', '레츠'],
  ['誠', '세이'], ['剛', '고우'], ['武', '타케'], ['峰', '미네'],
  ['久', '히사'], ['凰', '오우'], ['昴', '스바루'], ['颯', '하야테'],
];

const jaMeanings = [
  '어둠 속에서도 빛을 잃지 않는 고독한 투사',
  '폭풍 속에서 홀로 우뚝 서는 불굴의 의지를 지닌 전사',
  '차가운 겨울밤처럼 냉철하지만 내면에 뜨거운 열정을 품은 검객',
  '달빛 아래 홀로 검을 닦는 고요한 수행자',
  '번개처럼 빠르고 강렬하게 나타나 순식간에 사라지는 자객',
  '봄꽃처럼 화려하지만 가을잎처럼 단호하게 지는 혁명가',
  '새벽을 깨우는 매처럼 날카롭고 자유로운 정찰자',
  '깊은 안개 속에서 길을 찾는 신비로운 길잡이',
  '불사의 봉황처럼 어떤 좌절에서도 다시 일어서는 자',
  '은하의 끝에서 홀로 여행하는 고독한 탐험가',
  '태풍의 눈 속처럼 고요한 곳에서 세상을 내려다보는 지략가',
  '얼음 결정처럼 완벽한 아름다움과 냉혹함을 동시에 지닌 자',
];

// ──────────────────────────────────────────────────────
// Static curated fallback list (가장 먼저 소진)
// ──────────────────────────────────────────────────────
export const FALLBACK_NICKNAMES: Record<NicknameStyle, NicknameItem[]> = {
  ko: [
    { text: '라온', meaning: '즐거운 모험을 즐기며 언제나 긍정적으로 나아가는 명랑한 영웅' },
    { text: '다온', meaning: '모든 행운과 축복이 흘러들어오는 신비로운 운명을 개척하는 캐릭터' },
    { text: '가온', meaning: '혼란스러운 세상의 중심을 올곧게 지켜내는 용기 있는 파수꾼' },
    { text: '나래', meaning: '창공을 가로지르며 빛의 날개를 활짝 펴고 비상하는 바람의 사수' },
    { text: '하람', meaning: '하늘이 세상을 위해 내린 소중하고 은혜로운 능력을 품은 존재' },
    { text: '로운', meaning: '슬기롭고 정의로운 신념을 굳건하게 다지는 전장의 인도자' },
    { text: '아라', meaning: '깊고 푸른 바다처럼 거대한 마나의 물결을 다스리는 파도의 마법사' },
    { text: '마루', meaning: '가장 높은 하늘의 경지에 오른 무결한 검술을 보유한 은빛 검사' },
    { text: '가람', meaning: '푸른 강물처럼 유유하고 푸르게 전진하는 자연스러운 맑은 검술사' },
    { text: '한울', meaning: '드넓은 우주와 대지처럼 크고 호방한 뜻을 지닌 전장의 수호요정' },
    { text: '도경', meaning: '올바른 진리의 길을 열며 눈부신 서광을 개척하는 영웅' },
    { text: '새론', meaning: '언제나 새롭고 참신한 매력으로 모험을 선도하는 여행자' },
  ],
  ja: [
    { text: '黒瀬蒼', meaning: '어두운 바다 위 창공을 홀로 가르는 냉정하고 예리한 검의 고수', subText: '쿠로세아오' },
    { text: '風間零', meaning: '바람처럼 흔적 없이 사라지고 나타나는 신출귀몰한 무형의 자객', subText: '카자마레이' },
    { text: '秋月凛', meaning: '가을 달빛처럼 차갑고 고요한 기운 속에 빛나는 지략의 책사', subText: '아키즈키린' },
    { text: '龍神煌', meaning: '불꽃 같은 투지를 품고 전장을 뒤흔드는 용신의 후예', subText: '류신코우' },
    { text: '白鳥雪', meaning: '순백의 날개를 펼치고 눈보라 속에서도 굳건히 나아가는 수호자', subText: '시라토리유키' },
    { text: '鉄心剛', meaning: '철처럼 단단한 의지와 굳건한 마음으로 역경을 돌파하는 전사', subText: '테츠신코우' },
    { text: '花岡翼', meaning: '꽃의 향기처럼 온화하지만 날개처럼 자유롭게 비상하는 몽상가', subText: '하나오카츠바사' },
    { text: '水野蒼真', meaning: '물처럼 유연하게 흐르면서도 푸른 하늘을 향한 진실을 추구하는 현자', subText: '미즈노소우마' },
    { text: '影狼牙', meaning: '달빛 없는 밤에 홀로 숲을 달리는 고독한 이리의 이빨', subText: '카게로우가' },
    { text: '雷電蒼', meaning: '번개와 천둥을 내리는 하늘의 분노를 담은 창공의 전사', subText: '라이덴아오' },
    { text: '緋色朱', meaning: '붉은 노을처럼 타오르는 정의의 불꽃을 품은 투사', subText: '히이로슈' },
    { text: '霧島蒼', meaning: '안개 낀 섬처럼 신비롭고 감춰진 진실을 추적하는 탐정', subText: '키리시마아오' },
    { text: '天羽真', meaning: '하늘의 깃털처럼 가볍고 순수한 영혼으로 세상을 지키는 수호신', subText: '아마하신' },
    { text: '紫炎凰', meaning: '보랏빛 화염을 두르고 봉황처럼 부활하는 불사의 투사', subText: '시엔오우' },
    { text: '星河流', meaning: '은하수처럼 끝없이 흐르는 운명 속에서 빛나는 별의 의지를 가진 자', subText: '호시카와류' },
    { text: '銀翼狼', meaning: '은빛 날개를 단 이리처럼 빠르고 자유로운 고독한 방랑자', subText: '긴요쿠오우카미' },
  ],
};

// ──────────────────────────────────────────────────────
// Infinite fallback generator
// ──────────────────────────────────────────────────────
export function getLocalFallbackNicknames(
  style: NicknameStyle,
  length: number,
  count: number = 8,
  exclude: string[] = []
): NicknameItem[] {
  // Only exclude by kanji text — NOT by subText pronunciation to avoid over-blocking
  const excludeSet = new Set<string>(
    exclude
      .filter((n) => n.trim().length > 0)
      .map((n) => n.trim().toLowerCase())
  );

  const result: NicknameItem[] = [];

  if (style === 'ko') {
    // Step 1: Static curated list first
    const staticList = [...FALLBACK_NICKNAMES.ko].sort(() => Math.random() - 0.5);
    for (const item of staticList) {
      if (result.length >= count) break;
      const word = item.text.trim();
      if (word.length < 2 || word.length > 3) continue;
      if (excludeSet.has(word.toLowerCase())) continue;
      result.push({ ...item });
      excludeSet.add(word.toLowerCase());
    }

    // Step 2: Dynamic infinite generation
    const targetLen = length >= 2 && length <= 3 ? length : 2;
    const suffixes = targetLen === 3 ? koSuffixes3 : koSuffixes2;
    let attempts = 0;
    while (result.length < count && attempts < 2000) {
      attempts++;
      const p = koPrefixes[Math.floor(Math.random() * koPrefixes.length)];
      const s = suffixes[Math.floor(Math.random() * suffixes.length)];
      const combined = p + s;
      if (combined.length !== targetLen) continue;
      if (excludeSet.has(combined.toLowerCase())) continue;
      const meaning = koMeanings[result.length % koMeanings.length];
      result.push({ text: combined, meaning });
      excludeSet.add(combined.toLowerCase());
    }
  } else if (style === 'ja') {
    // Step 1: Static curated list first
    const staticList = [...FALLBACK_NICKNAMES.ja].sort(() => Math.random() - 0.5);
    for (const item of staticList) {
      if (result.length >= count) break;
      const word = item.text.trim();
      const sub = (item.subText || '').trim();
      const subLen = sub.length;
      if (subLen < 2 || subLen > 6) continue;
      // Only block if the kanji text itself was already generated
      if (excludeSet.has(word.toLowerCase())) continue;
      result.push({ ...item });
      excludeSet.add(word.toLowerCase());
    }

    // Step 2: Dynamic infinite combination generator
    let attempts = 0;
    while (result.length < count && attempts < 2000) {
      attempts++;
      const [pKanji, pKo] = jaPrefixPairs[Math.floor(Math.random() * jaPrefixPairs.length)];
      const [sKanji, sKo] = jaSuffixPairs[Math.floor(Math.random() * jaSuffixPairs.length)];

      // Avoid same kanji used for both prefix and suffix
      if (pKanji === sKanji) continue;

      const combinedKanji = pKanji + sKanji;
      const combinedKo = pKo + sKo;
      const subLen = combinedKo.length;

      if (subLen < 2 || subLen > 6) continue;
      if (excludeSet.has(combinedKanji.toLowerCase())) continue;

      const meaning = jaMeanings[result.length % jaMeanings.length];
      result.push({
        text: combinedKanji,
        meaning,
        subText: combinedKo,
      });
      excludeSet.add(combinedKanji.toLowerCase());
    }
  }

  return result.slice(0, count);
}
