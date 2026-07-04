import { NextRequest, NextResponse } from 'next/server';
import { getLocalFallbackNicknames } from '../../../features/nickname/constants';
import { NicknameStyle } from '../../../features/nickname/types';

// Simple in-memory request tracker for rate limiting
const ipRequestHistory = new Map<string, number[]>();

// Rate limit helper: max 15 requests per minute
function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const limitWindow = 60 * 1000; // 1 minute
  const requests = ipRequestHistory.get(ip) || [];
  
  // Filter out requests older than the limit window
  const activeRequests = requests.filter((time) => now - time < limitWindow);
  
  if (activeRequests.length >= 15) {
    return false;
  }
  
  activeRequests.push(now);
  ipRequestHistory.set(ip, activeRequests);
  return true;
}

export async function POST(req: NextRequest) {
  try {
    // 1. Get Client IP for Rate Limiting
    const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'anonymous';
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: '과도한 요청이 감지되었습니다. 잠시 후 다시 이용해 주세요.' },
        { status: 429 }
      );
    }

    // 2. Parse request payload
    const body = await req.json();
    const { style, length, exclude = [] } = body as {
      style: NicknameStyle;
      length: number;
      exclude?: string[];
    };

    // 3. Validation
    if (!style || !length) {
      return NextResponse.json(
        { error: '필수 설정 매개변수가 누락되었습니다.' },
        { status: 400 }
      );
    }

    if (length < 2 || length > 14) {
      return NextResponse.json(
        { error: '글자 수는 2자에서 14자 사이여야 합니다.' },
        { status: 400 }
      );
    }

    // 4. Check OpenAI API Key presence
    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      // Graceful Fallback Mode: simulate network lag and generate from high-quality local dictionary
      await new Promise((resolve) => setTimeout(resolve, 800));
      const fallbackResult = getLocalFallbackNicknames(style, length, 8, exclude);
      return NextResponse.json({ nicknames: fallbackResult });
    }

    const systemPrompt = `You are a professional game character nickname generator. You generate exactly 8 unique, catchy, high-quality nicknames in Korean/Japanese. All generated names MUST feel like original anime-style character names (수려한 애니풍 오리지널 캐릭터명) rather than abstract gaming keywords, item names, or titles.
The response MUST be a JSON object containing a 'nicknames' key mapping to an array of objects. Each object must have:
- 'text': the generated nickname string (according to Style)
- 'meaning': a short and unique explanation in Korean of THAT specific nickname's meaning and theme. CRITICAL: Each nickname's meaning MUST be different from all other nicknames in the same response. Write a vivid, specific, and poetic description fitting the phonetic sound and imagery of the specific name (e.g. for a name meaning 'wind', write about swift movement and freedom). The explanation MUST be written strictly in Korean Hangul (한글) and MUST NOT contain any Japanese Kanji (漢字) or Japanese letters (Hiragana/Katakana) whatsoever.
- 'subText': (strictly required when Style is 'ja') represents the EXACT Korean phonetic pronunciation/transliteration of the generated name (e.g. for '竈門炭治郎', subText is '카마도탄지로'). The subText MUST match the exact phonetic sounds of the name, NOT a semantic translation.
- 'surname': (strictly required for Style 'ja') the Japanese Kanji surname prefix part of the name (e.g. '竈門')
- 'givenName': (strictly required for Style 'ja') the Japanese Kanji given name suffix part of the name (e.g. '炭治郎')
- 'surnameKo': (strictly required for Style 'ja') the exact Korean phonetic pronunciation of the Japanese surname (e.g. '카마도')
- 'givenNameKo': (strictly required for Style 'ja') the exact Korean phonetic pronunciation of the Japanese given name (e.g. '탄지로')

Rules for generation:
1. Input parameters & constraints:
   - Style:
     - 'ko' (Korean style): Generate names that sound like natural, cool, or traditional Korean anime character names (애니메이션 캐릭터 스타일 한국 이름 느낌, e.g. '라온', '다온', '가람', '나래'). Do NOT generate object-based compound words, gaming memes, or slang.
       * Length constraint: The generated Korean nickname MUST be between 2 and 3 characters. This is a STRICT constraint.
     - 'ja' (Japanese style): Generate ORIGINAL Japanese-themed anime character names using Japanese Kanji (漢字). Do NOT use famous, well-known, or iconic existing anime character names (e.g. do NOT generate names like 宇智波佐助, 夜神月, 竈門炭治郎, 富岡義勇, 旗木案山子, 結城明日奈, 坂田銀時, 高坂桐乃 or any other character from Naruto, Demon Slayer, Sword Art Online, One Piece, Dragon Ball, Attack on Titan, Death Note, Bleach, etc.). Instead, create ORIGINAL fictional names that FEEL LIKE anime character names.
       * Do NOT use Romaji or English alphabet letters for the generated 'text', 'surname', or 'givenName'.
       * Combination Rule: Strictly forbid combining Japanese words with English words. It must be composed purely of Japanese Kanji words.
       * Length constraint: The total Korean phonetic pronunciation ('subText') MUST be between 2 and 6 characters. This is a STRICT constraint.
2. DO NOT generate any offensive words, slangs, or hate speech.
3. You MUST NOT generate any of the following already used names: ${JSON.stringify(exclude)}. This is a STRICT rule — generating any name from this list is FORBIDDEN.
4. Every single nickname's 'meaning' field MUST be unique and distinct from all other nicknames in the same batch.
5. The response MUST strictly fit the JSON schema below.
Schema:
{
  "nicknames": [
    { 
      "text": "GeneratedNickname", 
      "meaning": "Short explanation in Korean of the nickname's meaning and gaming theme", 
      "subText": "Korean exact phonetic pronunciation (strictly required only for ja style)",
      "surname": "Romaji surname (strictly required only for ja style)",
      "givenName": "Romaji given name (strictly required only for ja style)",
      "surnameKo": "Korean phonetic of surname (strictly required only for ja style)",
      "givenNameKo": "Korean phonetic of given name (strictly required only for ja style)"
    }
  ]
}`;

    const userPrompt = `Generate game nicknames with the following settings:
- Style: ${style}
- Vibe Setting: Anime character style (애니메이션 캐릭터 스타일)

Strict Length Constraint Checklist for Style '${style}':
${
  style === 'ko'
    ? '- Korean character count must be at most 3 characters.'
    : '- Japanese Korean phonetic pronunciation (subText) must be between 2 and 6 characters.'
}`;

    // 6. Request OpenAI Chat Completion (gpt-4o-mini)
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt },
        ],
        response_format: { type: 'json_object' },
        temperature: 0.8,
        max_tokens: 800,
      }),
    });

    if (!response.ok) {
      const errorMsg = await response.text();
      console.error('OpenAI API request failed:', errorMsg);
      // Fallback on OpenAI error
      const fallbackResult = getLocalFallbackNicknames(style, length, 8, exclude);
      return NextResponse.json({ nicknames: fallbackResult });
    }

    const data = await response.json();
    const parsedContent = JSON.parse(data.choices[0].message.content);

    // 7. Verify that length constraints are strictly checked post-AI (Double Defense)
    let nicknamesList = parsedContent.nicknames || [];
    
    // Deduplicate and filter out excluded items case-insensitively
    const uniqueList: { text: string; meaning: string; subText?: string }[] = [];
    const seen = new Set<string>(exclude.map((n) => n.trim().toLowerCase()));

    for (const item of nicknamesList) {
      const word = (item.text || '').trim();
      const sub = (item.subText || '').trim();
      
      let isValid = true;
      
      if (style === 'ko') {
        isValid = word.length >= 2 && word.length <= 3;
      } else if (style === 'ja') {
        const containsLatin = /[a-zA-Z]/.test(word);
        if (containsLatin) {
          isValid = false;
        } else {
          isValid = sub.length >= 2 && sub.length <= 6;
        }
      }
      
      if (!isValid) {
        continue; // Filter out if fails strict constraints
      }
      
      const normWord = word.toLowerCase();
      const normSub = sub.toLowerCase();
      const isDuplicate = seen.has(normWord) || (normSub && seen.has(normSub));
      
      if (!isDuplicate) {
        uniqueList.push({
          text: word,
          meaning: item.meaning || 'AI 추천 닉네임',
          subText: sub || undefined
        });
        seen.add(normWord);
        // Do NOT add normSub to seen — prevents over-blocking Japanese names by pronunciation
      }
    }

    // 8. If count is less than 8, fill with fallback names
    if (uniqueList.length < 8) {
      const neededCount = 8 - uniqueList.length;
      const fillList = getLocalFallbackNicknames(style, length, neededCount, Array.from(seen));
      uniqueList.push(...fillList);
    }

    return NextResponse.json({ nicknames: uniqueList });
  } catch (error) {
    console.error('Internal server error in nickname generator API:', error);
    return NextResponse.json(
      { error: '서버 에러가 발생했습니다. 잠시 후 다시 시도해 주세요.' },
      { status: 500 }
    );
  }
}
